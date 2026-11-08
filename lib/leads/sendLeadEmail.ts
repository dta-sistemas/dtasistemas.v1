import type { ContactFormValues } from "@/lib/validation/contactSchema";
import type { AppLocale } from "@/i18n/routing";
import { renderClientEmail, renderTeamEmail } from "./emailTemplates";

/**
 * Notificación por correo al equipo de DTA cuando llega un lead, vía Resend
 * (https://resend.com). Se usa la API REST con fetch: no agrega dependencias.
 *
 * Variables de entorno (todas server-only, nunca NEXT_PUBLIC_):
 *  - EMAIL_PROVIDER_API_KEY    API key de Resend (empieza con "re_").
 *  - LEADS_NOTIFICATION_EMAIL  Destinatario(s), separados por coma.
 *  - LEADS_FROM_EMAIL          Remitente. DEBE ser de un dominio verificado en
 *                              Resend, ej. "DTA Sistemas <leads@dtasistemas.com>".
 *  - RESEND_API_URL            (opcional) solo para pruebas locales con un mock.
 *
 * Comportamiento ante fallos — pensado para NO perder leads en silencio:
 *  - Sin API key en desarrollo o preview: avisa en consola y sigue (no estorba al equipo).
 *  - Sin API key en PRODUCCIÓN real: lanza error (es una mala configuración).
 *  - Resend responde con error o no responde en 10 s: lanza error.
 * submitLead.ts captura el error y le informa al visitante en lugar de mostrar
 * un falso "mensaje enviado".
 */
const DEFAULT_FROM = "DTA Sistemas <leads@dtasistemas.com>";
const DEFAULT_TO = "contacto@dtasistemas.com";
const RESEND_URL = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";

export async function sendLeadEmail(lead: ContactFormValues, locale: AppLocale = "es", folio = "DTA"): Promise<void> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const recipients = notificationRecipients();

  if (!apiKey) {
    // En Vercel los previews también tienen NODE_ENV=production; VERCEL_ENV distingue
    // el despliegue real ("production") de previews y desarrollo.
    const isRealProduction = process.env.VERCEL_ENV
      ? process.env.VERCEL_ENV === "production"
      : process.env.NODE_ENV === "production";
    if (isRealProduction) {
      throw new Error("EMAIL_PROVIDER_API_KEY no está configurada en producción: el lead no se pudo notificar.");
    }
    console.warn(
      `[leads] EMAIL_PROVIDER_API_KEY no configurada — se omite el envío real (${folio}). Habría ido a ${recipients.join(", ")}:`,
      { fullName: lead.fullName, company: lead.company, helpType: lead.helpType }
    );
    return;
  }

  const email = renderTeamEmail(lead, locale, folio);
  await postToResend(apiKey, {
    from: process.env.LEADS_FROM_EMAIL ?? DEFAULT_FROM,
    to: recipients,
    // Al pulsar "Responder" en el correo, la respuesta va directo al prospecto.
    reply_to: lead.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

/**
 * Correo de confirmación al prospecto, con el membrete de DTA. Se envía DESPUÉS de que el
 * aviso al equipo salió bien (ver submitLead.ts): así nadie recibe un "gracias" por un
 * mensaje que DTA no recibió. Si este envío falla NO se le muestra error al visitante
 * —su registro sí llegó— y solo se registra en consola.
 *
 * Las respuestas del prospecto a este correo llegan al equipo (reply_to).
 */
export async function sendLeadConfirmation(lead: ContactFormValues, locale: AppLocale = "es", folio = "DTA"): Promise<void> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey) {
    console.warn("[leads] EMAIL_PROVIDER_API_KEY no configurada — se omite la confirmación al prospecto.");
    return;
  }

  const email = renderClientEmail(lead, locale, folio);
  await postToResend(apiKey, {
    from: process.env.LEADS_FROM_EMAIL ?? DEFAULT_FROM,
    to: [lead.email],
    reply_to: notificationRecipients(),
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

function notificationRecipients(): string[] {
  return (process.env.LEADS_NOTIFICATION_EMAIL ?? DEFAULT_TO)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

/** Llamada única a la API de Resend: error explícito si responde mal o tarda más de 10 s. */
async function postToResend(apiKey: string, payload: Record<string, unknown>): Promise<void> {
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // Evita que el formulario se quede colgado si Resend no responde.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend respondió ${response.status}: ${detail.slice(0, 300)}`);
  }
}
