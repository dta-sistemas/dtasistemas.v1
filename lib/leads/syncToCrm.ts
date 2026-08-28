import type { ContactFormValues } from "@/lib/validation/contactSchema";

/**
 * Sincroniza el lead con el CRM de destino. Stub documentado — el CRM final
 * (HubSpot, Pipedrive, uno propio) sigue pendiente de confirmación desde
 * Fase 3. Se aísla en su propia función para que activar la integración
 * real sea reemplazar este archivo, sin tocar submitLead.ts ni el formulario.
 */
export async function syncLeadToCrm(lead: ContactFormValues): Promise<void> {
  if (!process.env.CRM_API_KEY) {
    console.warn("[leads] CRM_API_KEY no configurada — se omite la sincronización con CRM.", {
      company: lead.company,
      helpType: lead.helpType,
    });
    return;
  }

  // Ejemplo de integración real (HubSpot Forms API). Descomentar y ajustar
  // cuando se confirme el CRM final:
  //
  // await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.CRM_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     properties: {
  //       firstname: lead.fullName,
  //       company: lead.company,
  //       email: lead.email,
  //       phone: lead.phone,
  //       lead_source: lead.source,
  //       help_type: lead.helpType,
  //       message: lead.message,
  //     },
  //   }),
  // });
}
