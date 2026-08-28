import { Waves, Hotel, Building2, Briefcase, type LucideIcon } from "lucide-react";

export type Sector = {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** Tags cortos usados en la card del hub y de la Home. */
  tags: string[];
  image?: string;
  isOther?: boolean;
  href: string;
  /** Headline problema-céntrico, en el lenguaje real del sector. */
  headline: string;
  heroDescription: string;
  /** Problemas específicos del sector — no genéricos, no copiados entre sectores. */
  problems: string[];
  /** Slugs de data/solutions.ts más relevantes para este sector, con el ángulo propio del sector. */
  relatedSolutions: { slug: string; angle: string }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

/**
 * Sectores — Fase 0, sección 11. Cada página debe hablar el lenguaje del
 * sector, no ser la misma plantilla con el título cambiado. El array
 * también alimenta la card de la Home (name/tags/image/href).
 */
export const sectors: Sector[] = [
  {
    slug: "turismo",
    name: "Turismo",
    icon: Waves,
    tags: ["Reservas", "Operación", "Integración", "Datos"],
    image: "/images/sectores/turismo.jpg",
    href: "/sectores/turismo",
    headline: "Tu operación turística merece sistemas tan dinámicos como tu demanda.",
    heroDescription:
      "Reservas, disponibilidad, inventario y datos de cliente cambian todos los días. Diseñamos los sistemas que permiten que tu equipo opere con esa velocidad, sin depender de hojas de cálculo ni de copiar información entre plataformas.",
    problems: [
      "Disponibilidad e inventario que no se actualizan en tiempo real entre canales y OTAs.",
      "Reservas gestionadas manualmente entre OTAs, WhatsApp y el sitio propio.",
      "Reportes de ocupación y ventas armados a mano cada semana.",
      "Datos de clientes dispersos entre reservas, ventas y atención al cliente.",
    ],
    relatedSolutions: [
      { slug: "sistemas-empresariales", angle: "Sistemas de reservas a la medida de tu operación." },
      { slug: "integracion-de-sistemas", angle: "Conexión entre OTAs, canales de venta y tu sistema interno." },
      { slug: "business-intelligence", angle: "Dashboards de ocupación y ventas en tiempo real." },
    ],
    seo: {
      metaTitle: "Tecnología para empresas de turismo",
      metaDescription:
        "Sistemas de reservas, integración con OTAs y dashboards de ocupación para empresas turísticas en Quintana Roo y Yucatán.",
    },
  },
  {
    slug: "hoteleria",
    name: "Hotelería",
    icon: Hotel,
    tags: ["Operación", "Datos", "Integración"],
    image: "/images/sectores/hoteleria.jpg",
    href: "/sectores/hoteleria",
    headline: "Tu PMS no debería ser una isla más en tu operación.",
    heroDescription:
      "Entre el PMS, el channel manager, housekeeping y revenue management, la información de un hotel vive repartida en varios sistemas que casi nunca se hablan entre sí. Conectamos esas piezas para que tu equipo tenga una sola versión de la verdad.",
    problems: [
      "El channel manager y el PMS no sincronizan tarifas y disponibilidad automáticamente.",
      "Housekeeping se coordina por radio o WhatsApp, sin trazabilidad en el sistema.",
      "Revenue management se decide por intuición, sin datos históricos accesibles.",
      "La experiencia del huésped (pre-checkin, encuestas, upsells) queda fuera del sistema central.",
    ],
    relatedSolutions: [
      { slug: "integracion-de-sistemas", angle: "Sincronización entre PMS, channel manager y motor de reservas." },
      { slug: "business-intelligence", angle: "Dashboards de RevPAR, ocupación y desempeño por temporada." },
      { slug: "inteligencia-artificial", angle: "Automatización de comunicación con huéspedes antes y durante su estancia." },
    ],
    seo: {
      metaTitle: "Sistemas para hoteles: PMS, channel manager y datos",
      metaDescription:
        "Integramos PMS, channel manager y revenue management, y construimos dashboards de ocupación para cadenas y hoteles independientes.",
    },
  },
  {
    slug: "inmobiliario",
    name: "Inmobiliario",
    icon: Building2,
    tags: ["Leads", "CRM", "Automatización", "Seguimiento"],
    image: "/images/sectores/inmobiliario.jpg",
    href: "/sectores/inmobiliario",
    headline: "Cada lead que no das seguimiento a tiempo, se lo lleva la competencia.",
    heroDescription:
      "En bienes raíces el ciclo de decisión es largo y el seguimiento es todo. Construimos el CRM y la automatización que aseguran que ningún prospecto se pierda entre el portal, WhatsApp y el Excel del asesor.",
    problems: [
      "Leads de portales inmobiliarios que llegan por email y nadie da seguimiento a tiempo.",
      "Cada asesor lleva su propio Excel de prospectos, sin visibilidad para el equipo comercial.",
      "Expedientes de propiedades y documentación legal dispersos en carpetas y correos.",
      "No hay forma de saber qué canal (portal, redes, referidos) realmente cierra ventas.",
    ],
    relatedSolutions: [
      { slug: "sistemas-empresariales", angle: "CRM inmobiliario con seguimiento de prospectos y propiedades." },
      { slug: "inteligencia-artificial", angle: "Automatización de respuesta y calificación de leads entrantes." },
      { slug: "business-intelligence", angle: "Reportes de origen de leads y desempeño por asesor." },
    ],
    seo: {
      metaTitle: "CRM y automatización para inmobiliarias",
      metaDescription:
        "CRM inmobiliario, automatización de seguimiento de leads y reportes de desempeño comercial para agencias y desarrolladoras.",
    },
  },
  {
    slug: "servicios",
    name: "Empresas de servicios",
    icon: Briefcase,
    tags: ["Procesos", "CRM", "Automatización", "Inteligencia"],
    image: "/images/sectores/servicios.jpg",
    href: "/sectores/servicios",
    headline: "Tu servicio es bueno. Tu operación detrás de él, todavía no.",
    heroDescription:
      "Cotizar, agendar, dar seguimiento y facturar suelen vivir en herramientas distintas que nadie conectó a propósito. Ordenamos ese flujo para que tu equipo pase menos tiempo administrando y más tiempo entregando el servicio.",
    problems: [
      "Cotizaciones y propuestas que se arman manualmente cada vez, sin plantilla ni control de versiones.",
      "Agenda de servicios coordinada por chat, con riesgo de doble booking.",
      "Facturación desconectada del sistema donde se da seguimiento al cliente.",
      "No hay visibilidad de qué clientes están por renovar o en riesgo de irse.",
    ],
    relatedSolutions: [
      { slug: "sistemas-empresariales", angle: "CRM y agenda de servicios en un solo lugar." },
      { slug: "inteligencia-artificial", angle: "Automatización de cotizaciones, recordatorios y facturación." },
      { slug: "business-intelligence", angle: "Reportes de retención, renovación y desempeño por cliente." },
    ],
    seo: {
      metaTitle: "Sistemas para empresas de servicios",
      metaDescription:
        "CRM, automatización de cotizaciones y facturación, y reportes de retención de clientes para empresas de servicios B2B.",
    },
  },
];

/**
 * "Otros sectores" — no es una página real, aparece como 5ta card en Home
 * y en el hub /sectores apuntando directo a contacto (regla: no páginas
 * doorway artificiales, Fase 0 sección 16).
 */
export const otherSectorsCard = {
  slug: "otros",
  name: "Otros sectores",
  tags: ["Hablemos de cómo podemos ayudar"],
  isOther: true as const,
  href: "/contacto",
};

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
