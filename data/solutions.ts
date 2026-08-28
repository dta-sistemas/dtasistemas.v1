import { Boxes, Link2, BarChart3, Bot, Code2, ShieldCheck, type LucideIcon } from "lucide-react";

export type Solution = {
  slug: string;
  pillarNumber: string;
  icon: LucideIcon;
  title: string;
  /** Headline corto usado en Home (Pillars) y como intro en la página de detalle. */
  description: string;
  /** Headline de "dolor" mostrado arriba del H1 en la página de detalle. */
  problemHeadline: string;
  /** Párrafo largo de introducción en la página de detalle. */
  longDescription: string;
  bullets: string[];
  useCases: string[];
  deliverables: string[];
  /** Opcional — solo si aporta valor real (regla 48 del brief: el cliente compra resultados, no frameworks). */
  technologies?: string[];
  /** Slugs de data/sectors.ts donde esta solución aplica más. */
  relatedSectors: string[];
  href: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

/**
 * Los 5 pilares + DTA Care (visible como 6ta card en el hub /soluciones,
 * tal como en el mockup aprobado). DTA Care mantiene su propia página en
 * /dta-care (Fase 0, sección 23) — aquí solo se referencia para el listado.
 */
export const solutions: Solution[] = [
  {
    slug: "sistemas-empresariales",
    pillarNumber: "01",
    icon: Boxes,
    title: "Sistemas",
    description: "Construimos la infraestructura digital de tu operación.",
    problemHeadline: "Tu operación depende de procesos que nadie diseñó a propósito",
    longDescription:
      "La mayoría de las empresas operan con una mezcla de hojas de cálculo, WhatsApp y sistemas que no se hablan entre sí. Diseñamos y desarrollamos los sistemas que tu operación necesita: desde un CRM a la medida hasta plataformas internas que ordenan cómo trabaja tu equipo.",
    bullets: ["CRM", "Plataformas internas", "Sistemas de reservas", "Portales y más"],
    useCases: [
      "Centralizar la información de clientes y ventas en un solo lugar.",
      "Digitalizar procesos que hoy dependen de hojas de cálculo o papel.",
      "Construir un portal para que tus clientes o proveedores se autoatiendan.",
      "Reemplazar un sistema legado que ya no soporta el crecimiento del negocio.",
    ],
    deliverables: [
      "Diagnóstico de procesos actuales",
      "Arquitectura del sistema propuesto",
      "Sistema funcionando en producción",
      "Documentación y capacitación al equipo",
    ],
    relatedSectors: ["turismo", "inmobiliario", "servicios"],
    href: "/soluciones/sistemas-empresariales",
    seo: {
      metaTitle: "Sistemas empresariales a la medida",
      metaDescription:
        "Diseñamos y desarrollamos sistemas empresariales a la medida de tus procesos: CRM, plataformas internas, sistemas de reservas y portales.",
    },
  },
  {
    slug: "integracion-de-sistemas",
    pillarNumber: "02",
    icon: Link2,
    title: "Integración",
    description: "Conectamos las herramientas que hoy trabajan separadas.",
    problemHeadline: "Tus herramientas no se hablan entre sí, y tu equipo paga el precio",
    longDescription:
      "Cuando cada sistema vive en su propia isla, alguien tiene que copiar información a mano de un lado a otro. Conectamos tus plataformas mediante APIs para que los datos fluyan automáticamente entre ellas, sin doble captura y sin errores humanos.",
    bullets: ["APIs y conectores", "Sincronización de datos", "Integración de sistemas", "Automatización de flujos"],
    useCases: [
      "Sincronizar tu CRM con tu plataforma de reservas o e-commerce.",
      "Conectar tu sistema contable con tus herramientas de operación.",
      "Unificar datos de múltiples sucursales o canales de venta.",
      "Integrar tu sitio web con tu sistema interno de gestión.",
    ],
    deliverables: [
      "Mapa de integraciones necesarias",
      "Conectores y APIs implementados",
      "Monitoreo de sincronización",
      "Documentación técnica",
    ],
    relatedSectors: ["turismo", "hoteleria", "servicios"],
    href: "/soluciones/integracion-de-sistemas",
    seo: {
      metaTitle: "Integración de sistemas y APIs",
      metaDescription:
        "Conectamos las herramientas que tu empresa ya usa: APIs, conectores y sincronización de datos entre sistemas, sin doble captura.",
    },
  },
  {
    slug: "business-intelligence",
    pillarNumber: "03",
    icon: BarChart3,
    title: "Inteligencia",
    description: "Convertimos tus datos en información para decidir.",
    problemHeadline: "Tienes datos, pero nadie tiene tiempo de convertirlos en decisiones",
    longDescription:
      "Tener datos no es lo mismo que tener información. Construimos dashboards y reportes que le muestran a tu equipo directivo exactamente lo que necesita saber, actualizado, sin depender de que alguien arme un Excel cada semana.",
    bullets: ["Dashboards ejecutivos", "KPIs y reportes", "Análisis de datos", "Alertas y monitoreo"],
    useCases: [
      "Un dashboard único con las métricas clave del negocio.",
      "Reportes automáticos que ya no dependen de armarlos a mano.",
      "Alertas cuando un indicador se sale de rango.",
      "Análisis histórico para detectar tendencias y estacionalidad.",
    ],
    deliverables: [
      "Definición de KPIs relevantes",
      "Dashboard implementado y conectado a tus fuentes de datos",
      "Reportes automáticos configurados",
      "Capacitación para interpretar y usar los datos",
    ],
    relatedSectors: ["servicios", "inmobiliario", "hoteleria"],
    href: "/soluciones/business-intelligence",
    seo: {
      metaTitle: "Business Intelligence y dashboards",
      metaDescription:
        "Convertimos tus datos en información para decidir: dashboards ejecutivos, KPIs, reportes automáticos y alertas de monitoreo.",
    },
  },
  {
    slug: "inteligencia-artificial",
    pillarNumber: "04",
    icon: Bot,
    title: "Automatización & IA",
    description: "Quitamos trabajo repetitivo de tus procesos.",
    problemHeadline: "Tu equipo pierde horas en tareas que ya podrían resolverse solas",
    longDescription:
      "Muchas empresas pierden horas al día en tareas manuales y repetitivas. Diseñamos automatizaciones y agentes de inteligencia artificial con una función comercial concreta — nunca IA por moda — que hacen ese trabajo por tu equipo.",
    bullets: ["Automatización de procesos", "Agentes de IA", "Procesamiento de documentos"],
    useCases: [
      "Automatizar el seguimiento de leads y clientes potenciales.",
      "Generar reportes recurrentes sin intervención manual.",
      "Clasificar y procesar documentos con IA.",
      "Responder preguntas frecuentes de clientes con un agente entrenado en tu negocio.",
    ],
    deliverables: [
      "Diagnóstico de procesos automatizables",
      "Flujos de automatización implementados",
      "Documentación técnica del sistema",
      "Capacitación al equipo",
    ],
    relatedSectors: ["turismo", "inmobiliario", "servicios"],
    href: "/soluciones/inteligencia-artificial",
    seo: {
      metaTitle: "Automatización de procesos e Inteligencia Artificial",
      metaDescription:
        "Automatizamos procesos repetitivos y construimos agentes de IA con función comercial concreta para tu empresa.",
    },
  },
  {
    slug: "desarrollo-digital",
    pillarNumber: "05",
    icon: Code2,
    title: "Desarrollo Digital",
    description: "Creamos las experiencias digitales que necesita tu negocio.",
    problemHeadline: "Tu presencia digital no está a la altura de lo que tu empresa realmente hace",
    longDescription:
      "Un sitio web lento, una tienda en línea que no convierte, o un portal de clientes que nadie usa: la experiencia digital es lo primero que ve un cliente potencial. Diseñamos y desarrollamos sitios, e-commerce, portales y plataformas web pensados para performance y SEO desde el día uno.",
    bullets: ["Sitios web corporativos", "E-commerce", "Portales de clientes", "Plataformas web"],
    useCases: [
      "Renovar un sitio web corporativo lento o desactualizado.",
      "Lanzar una tienda en línea conectada a tu inventario real.",
      "Construir un portal donde tus clientes den seguimiento a su servicio.",
      "Desarrollar una plataforma web a la medida de tu operación.",
    ],
    deliverables: [
      "Diseño de experiencia e interfaz",
      "Desarrollo del sitio o plataforma",
      "Optimización de performance y SEO técnico",
      "Capacitación para administrar el contenido",
    ],
    relatedSectors: ["turismo", "inmobiliario", "hoteleria"],
    href: "/soluciones/desarrollo-digital",
    seo: {
      metaTitle: "Desarrollo web y plataformas digitales",
      metaDescription:
        "Diseñamos y desarrollamos sitios web, e-commerce, portales de clientes y plataformas digitales pensadas para performance y SEO.",
    },
  },
];

/** DTA Care — no es un pilar técnico, pero aparece como 6ta card en el hub de soluciones. */
export const dtaCareSummary = {
  slug: "dta-care",
  pillarNumber: "06",
  icon: ShieldCheck,
  title: "DTA Care",
  description: "Mantenemos, monitoreamos y evolucionamos tus sistemas.",
  bullets: ["Soporte técnico", "Monitoreo 24/7", "Mantenimiento preventivo", "Evolución continua"],
  href: "/dta-care",
};

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
