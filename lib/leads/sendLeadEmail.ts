import type { ContactFormValues } from "@/lib/validation/contactSchema";
import type { AppLocale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

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

export async function sendLeadEmail(lead: ContactFormValues, locale: AppLocale = "es"): Promise<void> {
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
      `[leads] EMAIL_PROVIDER_API_KEY no configurada — se omite el envío real. Habría ido a ${recipients.join(", ")}:`,
      { fullName: lead.fullName, company: lead.company, helpType: lead.helpType }
    );
    return;
  }

  await postToResend(apiKey, {
    from: process.env.LEADS_FROM_EMAIL ?? DEFAULT_FROM,
    to: recipients,
    // Al pulsar "Responder" en el correo, la respuesta va directo al prospecto.
    reply_to: lead.email,
    subject: `Nuevo lead: ${oneLine(lead.company)} (${lead.helpType})`,
    text: buildText(lead, locale),
    html: buildHtml(lead, locale),
  });
}

/**
 * Correo de agradecimiento al prospecto. Se envía DESPUÉS de que el aviso al
 * equipo salió bien (ver submitLead.ts): así nadie recibe un "gracias" por un
 * mensaje que DTA no recibió. Si este envío falla NO se le muestra error al
 * visitante —su mensaje sí llegó— y solo se registra en consola.
 *
 * Las respuestas del prospecto a este correo llegan al equipo (reply_to).
 */
export async function sendLeadConfirmation(lead: ContactFormValues, locale: AppLocale = "es"): Promise<void> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey) {
    console.warn("[leads] EMAIL_PROVIDER_API_KEY no configurada — se omite la confirmación al prospecto.");
    return;
  }

  const copy = CONFIRMATION_COPY[locale] ?? CONFIRMATION_COPY.es;
  const firstName = lead.fullName.trim().split(/\s+/)[0] ?? "";
  const privacyUrl = `${SITE_URL}${locale === "en" ? "/en" : ""}/aviso-de-privacidad`;
  const recipients = notificationRecipients();

  await postToResend(apiKey, {
    from: process.env.LEADS_FROM_EMAIL ?? DEFAULT_FROM,
    to: [lead.email],
    reply_to: recipients,
    subject: copy.subject,
    text: [
      `${copy.greeting(firstName)}`,
      "",
      copy.thanks,
      "",
      copy.summaryTitle,
      `${copy.company}: ${lead.company}`,
      `${copy.message}:`,
      lead.message,
      "",
      copy.addMore,
      "",
      `${copy.confidentiality} ${privacyUrl}`,
      "",
      copy.signature,
    ].join("\n"),
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#0F1115;line-height:1.6;font-size:15px">` +
      `<p style="margin:0 0 16px;font-size:18px;font-weight:700">${escapeHtml(copy.greeting(firstName))}</p>` +
      `<p style="margin:0 0 20px">${escapeHtml(copy.thanks)}</p>` +
      `<div style="background:#F6F7FA;border:1px solid #E4E7EC;border-radius:12px;padding:16px 18px;margin:0 0 20px;font-size:14px">` +
      `<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5B6472;margin:0 0 10px">${escapeHtml(copy.summaryTitle)}</div>` +
      `<div><span style="color:#5B6472">${escapeHtml(copy.company)}:</span> <strong>${escapeHtml(lead.company)}</strong></div>` +
      `<div style="margin-top:8px;color:#5B6472">${escapeHtml(copy.message)}:</div>` +
      `<div style="white-space:pre-wrap">${escapeHtml(lead.message)}</div>` +
      `</div>` +
      `<p style="margin:0 0 20px">${escapeHtml(copy.addMore)}</p>` +
      `<p style="margin:0 0 20px;font-size:13px;color:#5B6472">${escapeHtml(copy.confidentiality)} ` +
      `<a href="${escapeHtml(privacyUrl)}" style="color:#1B4DE0">${escapeHtml(copy.privacyLink)}</a>.</p>` +
      `<p style="margin:0;font-weight:600">${escapeHtml(copy.signature)}</p>` +
      `</div>`,
  });
}

const CONFIRMATION_COPY = {
  es: {
    subject: "Recibimos tu mensaje | DTA Sistemas",
    greeting: (name: string) => (name ? `Hola ${name},` : "Hola,"),
    thanks: "Gracias por escribirnos. Recibimos tu mensaje y alguien del equipo de DTA te responderá lo antes posible.",
    summaryTitle: "Resumen de tu solicitud",
    company: "Empresa",
    message: "Tu mensaje",
    addMore: "Si quieres agregar algo, responde directamente a este correo.",
    confidentiality: "Tu información es confidencial: solo la usamos para atender tu solicitud. Consulta nuestro Aviso de privacidad:",
    privacyLink: "Aviso de privacidad",
    signature: "El equipo de DTA Sistemas",
  },
  en: {
    subject: "We received your message | DTA Sistemas",
    greeting: (name: string) => (name ? `Hi ${name},` : "Hi,"),
    thanks: "Thank you for writing to us. We received your message and someone from the DTA team will get back to you as soon as possible.",
    summaryTitle: "Summary of your request",
    company: "Company",
    message: "Your message",
    addMore: "If you'd like to add anything, just reply to this email.",
    confidentiality: "Your information is confidential: we only use it to handle your request. See our Privacy notice:",
    privacyLink: "Privacy notice",
    signature: "The DTA Sistemas team",
  },
} as const;

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

/** Una sola línea, sin saltos: para asuntos de correo. */
function oneLine(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fields(lead: ContactFormValues, locale: AppLocale): [string, string][] {
  return [
    ["Nombre", lead.fullName],
    ["Empresa", lead.company],
    ["Email", lead.email],
    ["Teléfono", lead.phone || "—"],
    ["Ciudad", lead.city || "—"],
    ["¿En qué podemos ayudar?", lead.helpType],
    ["Origen", lead.source || "—"],
    ["Idioma del sitio", locale],
  ];
}

function buildText(lead: ContactFormValues, locale: AppLocale): string {
  return [...fields(lead, locale).map(([k, v]) => `${k}: ${v}`), "", "Mensaje:", lead.message].join("\n");
}

/** Todos los valores provienen de un formulario público: SIEMPRE se escapan antes de ir al HTML. */
function buildHtml(lead: ContactFormValues, locale: AppLocale): string {
  const rows = fields(lead, locale)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5B6472;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#0F1115;font-weight:600">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#0F1115">` +
    `<h2 style="margin:0 0 16px;font-size:18px">Nuevo lead desde dtasistemas.com</h2>` +
    `<table style="border-collapse:collapse;font-size:14px">${rows}</table>` +
    `<h3 style="margin:24px 0 8px;font-size:14px;color:#5B6472">Mensaje</h3>` +
    `<p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(lead.message)}</p>` +
    `<p style="margin:24px 0 0;font-size:12px;color:#9AA2B0">Responde a este correo para escribirle directamente al prospecto.</p>` +
    `</div>`
  );
}
