"use client";

import { Phone, Mail, MapPin, Clock, ChevronRight, type LucideIcon } from "lucide-react";
import { IconCircle } from "../ui/Badge";
import { analytics } from "@/lib/analytics/events";

const ICONS: Record<string, LucideIcon> = { phone: Phone, mail: Mail, mapPin: MapPin, clock: Clock };

type ContactChannelRowProps = {
  /**
   * FIX post-entrega: antes recibía `icon: LucideIcon` (el componente en
   * sí) como prop desde contacto/page.tsx (Server Component) — pasar un
   * componente/función de un Server Component a un Client Component no es
   * válido en React Server Components (mismo tipo de error que el fix
   * anterior de TabsFilter, esta vez con "render: function Phone").
   * Ahora recibe una clave de texto (dato serializable) y resuelve el
   * ícono real aquí adentro, ya del lado del cliente.
   */
  iconKey: "phone" | "mail" | "mapPin" | "clock";
  label: string;
  value: string;
  href?: string; // tel:, mailto:, o undefined para filas informativas (oficina, horario)
  trackEvent?: "whatsapp" | "phone" | "email";
};

/**
 * Fila de canal de contacto (Fase 0, sección 09, bloque "Hablemos").
 * Client Component porque dispara el evento GA4 correspondiente al clic
 * (whatsapp_click / phone_click / email_click, Fase 0 sección 19).
 */
export function ContactChannelRow({ iconKey, label, value, href, trackEvent }: ContactChannelRowProps) {
  const Icon = ICONS[iconKey];

  function handleClick() {
    if (trackEvent === "whatsapp") analytics.whatsappClick();
    if (trackEvent === "phone") analytics.phoneClick();
    if (trackEvent === "email") analytics.emailClick();
  }

  const content = (
    <div className="flex items-center justify-between p-4 rounded-card bg-white border border-dta-gray-200">
      <div className="flex items-center gap-3">
        <IconCircle icon={Icon} />
        <div>
          <div className="text-xs text-dta-gray-600">{label}</div>
          <div className="text-sm font-semibold text-dta-black">{value}</div>
        </div>
      </div>
      {href && <ChevronRight size={16} className="text-dta-gray-600" aria-hidden="true" />}
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600 rounded-card"
    >
      {content}
    </a>
  );
}
