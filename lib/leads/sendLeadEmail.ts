import type { ContactFormValues } from "@/lib/validation/contactSchema";

/**
 * Envía la notificación por correo al equipo de DTA cuando llega un lead
 * nuevo. Implementado como stub documentado: la Fase 0 (sección 21) pide
 * "prepararse para integración con CRM" sin fijar el proveedor de correo
 * transaccional todavía (pendiente confirmado en Fase 3, punto 11.5).
 *
 * Para activar en producción, reemplazar el cuerpo de esta función por una
 * llamada real a Resend, Postmark o SES — la firma de la función no debería
 * cambiar, así que submitLead.ts no necesita tocarse.
 */
export async function sendLeadEmail(lead: ContactFormValues): Promise<void> {
  const notifyAddress = process.env.LEADS_NOTIFICATION_EMAIL ?? "contacto@dtasistemas.com";

  if (!process.env.EMAIL_PROVIDER_API_KEY) {
    console.warn(
      `[leads] EMAIL_PROVIDER_API_KEY no configurada — se omite el envío real. ` +
        `Lead que se habría notificado a ${notifyAddress}:`,
      { fullName: lead.fullName, company: lead.company, email: lead.email, helpType: lead.helpType }
    );
    return;
  }

  // Ejemplo de integración real (Resend). Descomentar y ajustar cuando se
  // confirme el proveedor:
  //
  // await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.EMAIL_PROVIDER_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "leads@dtasistemas.com",
  //     to: notifyAddress,
  //     subject: `Nuevo lead: ${lead.company} (${lead.helpType})`,
  //     text: buildLeadEmailBody(lead),
  //   }),
  // });
}

function buildLeadEmailBody(lead: ContactFormValues): string {
  return [
    `Nombre: ${lead.fullName}`,
    `Empresa: ${lead.company}`,
    `Email: ${lead.email}`,
    `Teléfono: ${lead.phone ?? "—"}`,
    `Ciudad: ${lead.city ?? "—"}`,
    `¿En qué podemos ayudar?: ${lead.helpType}`,
    `Origen: ${lead.source ?? "—"}`,
    "",
    "Mensaje:",
    lead.message,
  ].join("\n");
}
