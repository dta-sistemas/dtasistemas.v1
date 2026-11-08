import type { ContactFormValues } from "@/lib/validation/contactSchema";
import type { AppLocale } from "@/i18n/routing";
import { SITE_URL, LEGAL } from "@/lib/site";
import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

/**
 * Plantillas HTML de los dos correos de un lead, con el membrete de DTA Sistemas:
 * encabezado azul marino con el logo, línea azul de acento, cuerpo blanco y pie con los
 * datos de contacto. Mismos colores del sitio (azul marino, azul, blancos y grises).
 *
 * Construidas con tablas e inline-styles (lo único que respetan Gmail, Outlook y Apple Mail)
 * y fuentes seguras: Georgia en titulares (hermana de la serif del sitio) y Arial en texto.
 * El logo es una imagen alojada en /public/email/logo-dta.png: si el cliente de correo la
 * bloquea, se ve el texto alternativo "DTA Sistemas" en blanco sobre el mismo azul marino.
 *
 * TODO valor que viene del formulario público se escapa antes de entrar al HTML.
 */

const C = {
  navy: "#0B1730",
  blue: "#1B4DE0",
  blueSoft: "#E7EEFD",
  blueLight: "#9DB5F7",
  ink: "#0B1730",
  gray600: "#5B6472",
  gray400: "#9AA2B0",
  gray200: "#E4E7EC",
  gray100: "#EEF0F4",
  gray50: "#F6F7FA",
  white: "#FFFFFF",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";
const MONO = "'Courier New', Courier, monospace";

export type RenderedEmail = { subject: string; html: string; text: string };

/* ----------------------------- utilidades ----------------------------- */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
const e = escapeHtml;
const oneLine = (v: string, max = 120) => v.replace(/\s+/g, " ").trim().slice(0, max);

function helpLabel(helpType: string, locale: AppLocale): string {
  const options = (locale === "en" ? enMessages : esMessages).contactoPage.helpOptions as Record<string, string>;
  return options[helpType] ?? helpType;
}

/** Solo dígitos; con 10 dígitos se asume México (+52). Devuelve "" si no parece un número válido. */
function whatsappDigits(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `52${d}`;
  return d.length >= 11 && d.length <= 15 ? d : "";
}

function formatDateTime(locale: AppLocale, now = new Date()): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
    timeZone: "America/Cancun",
    dateStyle: "long",
    timeStyle: "short",
  }).format(now);
}

/* ------------------------------ estructura ------------------------------ */

type Layout = { lang: AppLocale; preheader: string; title: string; body: string; footerNote: string; privacyLabel: string };

function layout({ lang, preheader, title, body, footerNote, privacyLabel }: Layout): string {
  const privacyUrl = `${SITE_URL}${lang === "en" ? "/en" : ""}/aviso-de-privacidad`;
  const tagline = lang === "en" ? "Technology that drives your business." : "Tecnología que impulsa tu negocio.";

  return `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${e(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.gray100};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${e(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.gray100}" style="background:${C.gray100};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.white};border:1px solid ${C.gray200};border-radius:12px;overflow:hidden;">

    <!-- Membrete -->
    <tr><td bgcolor="${C.navy}" style="background:${C.navy};padding:28px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="left" valign="middle">
          <a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_URL}/email/logo-dta.png" width="132" height="62" alt="DTA Sistemas" style="display:block;border:0;outline:none;color:${C.white};font-family:${SANS};font-size:18px;font-weight:bold;line-height:62px;"></a>
        </td>
        <td align="right" valign="middle" style="font-family:${SANS};font-size:12px;line-height:1.5;color:${C.blueLight};">${e(tagline)}</td>
      </tr></table>
    </td></tr>
    <tr><td height="4" bgcolor="${C.blue}" style="background:${C.blue};font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- Cuerpo -->
    <tr><td style="padding:36px 32px 12px 32px;font-family:${SANS};color:${C.ink};">${body}</td></tr>

    <!-- Pie -->
    <tr><td bgcolor="${C.gray50}" style="background:${C.gray50};border-top:1px solid ${C.gray200};padding:24px 32px;font-family:${SANS};font-size:12px;line-height:1.7;color:${C.gray600};">
      <div style="font-weight:bold;color:${C.ink};font-size:13px;">DTA Sistemas</div>
      <div>${e(tagline)}</div>
      <div style="margin-top:8px;">Cancún · Playa del Carmen · Riviera Maya · Mérida</div>
      <div><a href="mailto:${e(LEGAL.privacyEmail)}" style="color:${C.blue};text-decoration:none;">${e(LEGAL.privacyEmail)}</a> · <a href="${SITE_URL}" style="color:${C.blue};text-decoration:none;">dtasistemas.com</a></div>
      <div style="margin-top:12px;color:${C.gray400};">${footerNote} <a href="${e(privacyUrl)}" style="color:${C.gray600};text-decoration:underline;">${e(privacyLabel)}</a>.</div>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function pill(text: string, tone: "blue" | "navy" = "blue"): string {
  const bg = tone === "blue" ? C.blueSoft : C.navy;
  const fg = tone === "blue" ? C.blue : C.white;
  return `<span style="display:inline-block;background:${bg};color:${fg};font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:.04em;padding:5px 12px;border-radius:999px;">${e(text)}</span>`;
}

function folioBadge(label: string, folio: string): string {
  return `<span style="font-family:${MONO};font-size:13px;color:${C.gray600};margin:0 0 0 10px;display:inline-block;white-space:nowrap;">${e(label)} <strong style="color:${C.ink};">${e(folio)}</strong></span>`;
}

function dataRows(rows: [string, string][]): string {
  return rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td valign="top" style="padding:9px 16px 9px 0;font-size:13px;color:${C.gray600};white-space:nowrap;border-bottom:1px solid ${C.gray200};">${e(k)}</td>` +
        `<td valign="top" style="padding:9px 0;font-size:14px;font-weight:bold;color:${C.ink};border-bottom:1px solid ${C.gray200};">${v}</td></tr>`
    )
    .join("");
}

function messageBox(label: string, message: string): string {
  return `<div style="margin:22px 0 0 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.gray600};">${e(label)}</div>
<div style="margin-top:8px;background:${C.gray50};border:1px solid ${C.gray200};border-radius:8px;padding:14px 16px;font-size:14px;line-height:1.65;color:${C.ink};white-space:pre-wrap;">${e(message)}</div>`;
}

function button(href: string, label: string, primary: boolean): string {
  const style = primary
    ? `background:${C.blue};color:${C.white};border:1px solid ${C.blue};`
    : `background:${C.white};color:${C.ink};border:1px solid ${C.gray200};`;
  return `<a href="${e(href)}" style="display:inline-block;${style}font-family:${SANS};font-size:14px;font-weight:bold;text-decoration:none;padding:11px 20px;border-radius:999px;margin:0 8px 8px 0;">${e(label)}</a>`;
}

/* ============================== CLIENTE ============================== */

const CLIENT_COPY = {
  es: {
    subject: "Recibimos tu registro | DTA Sistemas",
    preheader: "Tu solicitud quedó registrada y un especialista de DTA te dará seguimiento.",
    badge: "Registro recibido",
    folio: "Folio",
    greeting: (n: string) => (n ? `Gracias por registrarte, ${n}.` : "Gracias por registrarte."),
    lead: "Recibimos tu solicitud y quedó registrada en nuestro sistema. Un especialista de nuestro equipo la revisará y te dará seguimiento personalmente.",
    nextTitle: "Qué sigue",
    steps: [
      ["Revisamos tu solicitud", "Analizamos lo que nos cuentas para entender tu caso."],
      ["Un especialista te contacta", "Te escribiremos o llamaremos por el medio de contacto que nos compartiste."],
      ["Definimos el siguiente paso", "Juntos decidimos si conviene un diagnóstico, una propuesta o una llamada."],
    ],
    summary: "Resumen de tu registro",
    labels: { name: "Nombre", phone: "Teléfono", email: "Correo", company: "Empresa", city: "Ciudad", interest: "Te interesa", message: "Tu mensaje" },
    addMore: "¿Quieres agregar algo? Responde a este correo y le llegará directamente a tu especialista.",
    footerNote: "Tu información es confidencial: solo la usamos para atender tu solicitud.",
    privacy: "Aviso de privacidad",
    cta: "Conocer DTA Sistemas",
  },
  en: {
    subject: "We received your registration | DTA Sistemas",
    preheader: "Your request is registered and a DTA specialist will follow up with you.",
    badge: "Registration received",
    folio: "Ref.",
    greeting: (n: string) => (n ? `Thank you for registering, ${n}.` : "Thank you for registering."),
    lead: "We received your request and it is now registered in our system. A specialist from our team will review it and follow up with you personally.",
    nextTitle: "What happens next",
    steps: [
      ["We review your request", "We look at what you told us to understand your case."],
      ["A specialist contacts you", "We will write or call you through the contact details you shared."],
      ["We define the next step", "Together we decide whether an assessment, a proposal or a call makes sense."],
    ],
    summary: "Summary of your registration",
    labels: { name: "Name", phone: "Phone", email: "Email", company: "Company", city: "City", interest: "Interested in", message: "Your message" },
    addMore: "Want to add something? Reply to this email and it will reach your specialist directly.",
    footerNote: "Your information is confidential: we only use it to handle your request.",
    privacy: "Privacy notice",
    cta: "Learn about DTA Sistemas",
  },
} as const;

export function renderClientEmail(lead: ContactFormValues, locale: AppLocale, folio: string): RenderedEmail {
  const c = CLIENT_COPY[locale] ?? CLIENT_COPY.es;
  const firstName = lead.fullName.trim().split(/\s+/)[0] ?? "";
  const interest = helpLabel(lead.helpType, locale);

  const steps = c.steps
    .map(
      ([title, text], i) => `<tr>
<td valign="top" width="44" style="padding:0 0 16px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="30" height="30" bgcolor="${C.blue}" style="background:${C.blue};border-radius:15px;color:${C.white};font-family:${SANS};font-size:14px;font-weight:bold;">${i + 1}</td></tr></table></td>
<td valign="top" style="padding:0 0 16px 0;font-family:${SANS};"><div style="font-size:15px;font-weight:bold;color:${C.ink};">${e(title)}</div><div style="font-size:14px;line-height:1.6;color:${C.gray600};margin-top:2px;">${e(text)}</div></td></tr>`
    )
    .join("");

  const body = `
<div>${pill(c.badge)}${folioBadge(c.folio, folio)}</div>
<h1 style="margin:20px 0 0 0;font-family:${SERIF};font-size:30px;line-height:1.2;font-weight:normal;color:${C.ink};">${e(c.greeting(firstName))}</h1>
<p style="margin:14px 0 0 0;font-size:16px;line-height:1.7;color:${C.gray600};">${e(c.lead)}</p>

<div style="margin:32px 0 14px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.gray600};">${e(c.nextTitle)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${steps}</table>

<div style="margin:18px 0 0 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.gray600};">${e(c.summary)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">${dataRows([
    [c.labels.name, e(lead.fullName)],
    [c.labels.phone, e(lead.phone)],
    [c.labels.email, e(lead.email)],
    [c.labels.company, e(lead.company ?? "")],
    [c.labels.city, e(lead.city ?? "")],
    [c.labels.interest, e(interest)],
  ])}</table>
${messageBox(c.labels.message, lead.message)}

<p style="margin:28px 0 0 0;font-size:14px;line-height:1.7;color:${C.gray600};">${e(c.addMore)}</p>
<div style="margin:22px 0 24px 0;">${button(SITE_URL + (locale === "en" ? "/en" : ""), c.cta, false)}</div>`;

  const text = [
    c.greeting(firstName),
    `${c.folio}: ${folio}`,
    "",
    c.lead,
    "",
    c.nextTitle.toUpperCase(),
    ...c.steps.map(([t, d], i) => `${i + 1}. ${t}: ${d}`),
    "",
    c.summary.toUpperCase(),
    `${c.labels.name}: ${lead.fullName}`,
    `${c.labels.phone}: ${lead.phone}`,
    `${c.labels.email}: ${lead.email}`,
    ...(lead.company ? [`${c.labels.company}: ${lead.company}`] : []),
    ...(lead.city ? [`${c.labels.city}: ${lead.city}`] : []),
    `${c.labels.interest}: ${interest}`,
    "",
    `${c.labels.message}:`,
    lead.message,
    "",
    c.addMore,
    "",
    `${c.footerNote} ${SITE_URL}${locale === "en" ? "/en" : ""}/aviso-de-privacidad`,
    "DTA Sistemas · Cancún · Playa del Carmen · Riviera Maya · Mérida",
  ].join("\n");

  return {
    subject: c.subject,
    html: layout({ lang: locale, preheader: c.preheader, title: c.subject, body, footerNote: c.footerNote, privacyLabel: c.privacy }),
    text,
  };
}

/* ============================== EQUIPO ============================== */

export function renderTeamEmail(lead: ContactFormValues, locale: AppLocale, folio: string): RenderedEmail {
  const interest = helpLabel(lead.helpType, "es");
  const when = formatDateTime("es");
  const wa = whatsappDigits(lead.phone);
  const subject = `Nuevo lead ${folio}: ${oneLine(lead.fullName, 60)}${lead.company ? ` · ${oneLine(lead.company, 50)}` : ""} (${interest})`;
  const replySubject = encodeURIComponent(`Tu registro en DTA Sistemas (${folio})`);

  const body = `
<div>${pill("Nuevo lead", "navy")}${folioBadge("Folio", folio)}</div>
<h1 style="margin:20px 0 0 0;font-family:${SERIF};font-size:28px;line-height:1.2;font-weight:normal;color:${C.ink};">Nuevo registro de lead</h1>
<p style="margin:10px 0 0 0;font-size:14px;color:${C.gray600};">${e(when)} (hora de Cancún)</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">${dataRows([
    ["Nombre", e(lead.fullName)],
    ["Teléfono", `<a href="tel:${e(lead.phone.replace(/[^\d+]/g, ""))}" style="color:${C.blue};text-decoration:none;">${e(lead.phone)}</a>`],
    ["Correo", `<a href="mailto:${e(lead.email)}" style="color:${C.blue};text-decoration:none;">${e(lead.email)}</a>`],
    ["Empresa", e(lead.company ?? "")],
    ["Ciudad", e(lead.city ?? "")],
    ["Le interesa", e(interest)],
    ["Origen", e(lead.source ?? "")],
    ["Idioma del sitio", locale === "en" ? "Inglés" : "Español"],
  ])}</table>
${messageBox("Mensaje", lead.message)}

<div style="margin:28px 0 8px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${C.gray600};">Dar seguimiento</div>
<div>
${button(`mailto:${lead.email}?subject=${replySubject}`, "Responder por correo", true)}
${button(`tel:${lead.phone.replace(/[^\d+]/g, "")}`, "Llamar", false)}
${wa ? button(`https://wa.me/${wa}`, "WhatsApp", false) : ""}
</div>
<p style="margin:14px 0 24px 0;font-size:13px;line-height:1.6;color:${C.gray600};">El cliente recibió un correo de confirmación con este mismo folio. Si respondes a este mensaje, la respuesta va directo al prospecto.</p>`;

  const text = [
    `NUEVO LEAD ${folio}`,
    when + " (hora de Cancún)",
    "",
    `Nombre: ${lead.fullName}`,
    `Teléfono: ${lead.phone}`,
    `Correo: ${lead.email}`,
    ...(lead.company ? [`Empresa: ${lead.company}`] : []),
    ...(lead.city ? [`Ciudad: ${lead.city}`] : []),
    `Le interesa: ${interest}`,
    ...(lead.source ? [`Origen: ${lead.source}`] : []),
    `Idioma del sitio: ${locale}`,
    "",
    "Mensaje:",
    lead.message,
  ].join("\n");

  return {
    subject,
    html: layout({
      lang: "es",
      preheader: `${lead.fullName} dejó sus datos: ${interest}.`,
      title: subject,
      body,
      footerNote: "Notificación interna de DTA Sistemas.",
      privacyLabel: "Aviso de privacidad",
    }),
    text,
  };
}
