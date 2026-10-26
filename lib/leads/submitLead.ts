"use server";

import { headers } from "next/headers";
import { getContactFormSchema, type ContactFormValues } from "@/lib/validation/contactSchema";
import { verifyTurnstileToken } from "./verifyTurnstile";
import { sendLeadEmail, sendLeadConfirmation } from "./sendLeadEmail";
import { syncLeadToCrm } from "./syncToCrm";
import { checkRateLimit } from "@/lib/security/rateLimit";
import type { AppLocale } from "@/i18n/routing";

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

const RATE_LIMIT_MESSAGE = { es: "Demasiados intentos. Intenta de nuevo en", en: "Too many attempts. Try again in" };
const GENERIC_ERROR = { es: "Revisa los campos marcados.", en: "Please check the marked fields." };
const DELIVERY_ERROR = {
  es: "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo o escríbenos a contacto@dtasistemas.com.",
  en: "We couldn't send your message right now. Please try again or write to us at contacto@dtasistemas.com.",
};
const TURNSTILE_ERROR = {
  es: "No pudimos verificar que eres una persona. Intenta de nuevo.",
  en: "We couldn't verify you're human. Please try again.",
};

/**
 * Server Action del formulario de contacto — punto único de entrada del
 * flujo de leads (Fase 0, sección 21). Fase 13: recibe `locale` para
 * validar y responder con mensajes de error en el idioma correcto.
 *
 *   FORM → RATE LIMIT → VALIDATION → TURNSTILE → CRM → EMAIL → ANALYTICS
 */
export async function submitLead(values: ContactFormValues & { locale: AppLocale }): Promise<SubmitLeadResult> {
  const { locale, ...rest } = values;
  const seconds = locale === "en" ? "seconds" : "segundos";

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return { success: false, error: `${RATE_LIMIT_MESSAGE[locale]} ${rateLimit.retryAfterSeconds} ${seconds}.` };
  }

  const schema = getContactFormSchema(locale);
  const parsed = schema.safeParse(rest);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormValues;
      fieldErrors[field] = issue.message;
    }
    return { success: false, error: GENERIC_ERROR[locale], fieldErrors };
  }

  const lead = parsed.data;

  const isHuman = await verifyTurnstileToken(lead.turnstileToken);
  if (!isHuman) {
    return { success: false, error: TURNSTILE_ERROR[locale] };
  }

  const [crm, email] = await Promise.allSettled([syncLeadToCrm(lead), sendLeadEmail(lead, locale)]);

  // El CRM es secundario (hoy es un stub): si falla se registra pero no frena al visitante.
  if (crm.status === "rejected") {
    console.error("[leads] Falló syncLeadToCrm:", crm.reason);
  }

  // El correo es el canal que hoy entrega el lead al equipo. Si falla NO se debe mostrar
  // "mensaje enviado": el visitante lo sabe y puede escribir directamente.
  if (email.status === "rejected") {
    console.error("[leads] Falló sendLeadEmail — lead NO notificado:", email.reason, {
      company: lead.company,
      email: lead.email,
    });
    return { success: false, error: DELIVERY_ERROR[locale] };
  }

  // Confirmación al prospecto: solo si el equipo ya fue notificado, y sin afectar el resultado
  // si falla (su mensaje sí llegó). Se espera con await porque en serverless una promesa
  // suelta puede cortarse al terminar la respuesta.
  try {
    await sendLeadConfirmation(lead, locale);
  } catch (error) {
    console.error("[leads] Falló sendLeadConfirmation (el lead sí fue notificado al equipo):", error);
  }

  return { success: true };
}
