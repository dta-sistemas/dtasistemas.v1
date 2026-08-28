"use server";

import { headers } from "next/headers";
import { getContactFormSchema, type ContactFormValues } from "@/lib/validation/contactSchema";
import { verifyTurnstileToken } from "./verifyTurnstile";
import { sendLeadEmail } from "./sendLeadEmail";
import { syncLeadToCrm } from "./syncToCrm";
import { checkRateLimit } from "@/lib/security/rateLimit";
import type { AppLocale } from "@/i18n/routing";

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

const RATE_LIMIT_MESSAGE = { es: "Demasiados intentos. Intenta de nuevo en", en: "Too many attempts. Try again in" };
const GENERIC_ERROR = { es: "Revisa los campos marcados.", en: "Please check the marked fields." };
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

  const results = await Promise.allSettled([syncLeadToCrm(lead), sendLeadEmail(lead)]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[leads] Falló el paso ${i === 0 ? "syncLeadToCrm" : "sendLeadEmail"}:`, r.reason);
    }
  });

  return { success: true };
}
