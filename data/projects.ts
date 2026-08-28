export type Project = {
  slug: string;
  sectorSlug: string; // referencia a data/sectors.ts
  sectorLabel: string; // etiqueta mostrada en la card (evita resolver el join en cada card)
  title: string;
  /** Resumen corto para cards (Home y hub de /proyectos). */
  summary: string;
  /** Contenido largo — cada campo se muestra como su propia columna en el detalle. */
  problem: string;
  solution: string;
  technology: string[];
  result: string;
  image: string;
  featured?: boolean; // true = aparece en Home
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

/**
 * Casos de estudio — Fase 0, sección 13. Cada caso se enfoca en
 * Problema → Solución → Tecnología → Resultado, no en una galería de
 * screenshots (el objetivo es demostrar capacidad empresarial).
 *
 * NOTA: el contenido de estos 4 casos es ilustrativo, basado en el patrón
 * mostrado en los mockups aprobados. Pendiente de tu confirmación (ya
 * señalado desde Fase 2): ¿son proyectos reales que ya existen y se pueden
 * documentar con datos verídicos, o se mantienen como casos representativos
 * mientras se acumulan los primeros clientes reales? El campo `result` en
 * particular no debe publicarse como métrica real sin verificarla.
 */
export const projects: Project[] = [
  {
    slug: "plataforma-de-reservas",
    sectorSlug: "turismo",
    sectorLabel: "Turismo",
    title: "Plataforma de reservas",
    summary: "Centralización de disponibilidad, reservas e inventario con integración a múltiples canales.",
    problem:
      "El equipo gestionaba disponibilidad e inventario a mano entre distintas OTAs, el sitio propio y WhatsApp. Esto generaba overbooking ocasional y reportes de ocupación que llegaban desactualizados al equipo directivo.",
    solution:
      "Se diseñó un sistema central de reservas conectado a los canales de venta mediante APIs, con sincronización automática de disponibilidad, tarifas e inventario en tiempo real.",
    technology: ["Next.js", "PostgreSQL", "APIs de canales de venta"],
    result:
      "Eliminación de overbooking por desincronización y reportes de ocupación disponibles en tiempo real para el equipo directivo, sin depender de reportes manuales.",
    image: "/images/proyectos/plataforma-reservas.jpg",
    featured: true,
    seo: {
      metaTitle: "Plataforma de reservas — Caso de estudio",
      metaDescription:
        "Cómo centralizamos disponibilidad, reservas e inventario multicanal para una empresa turística, eliminando overbooking.",
    },
  },
  {
    slug: "sistema-de-captacion",
    sectorSlug: "inmobiliario",
    sectorLabel: "Inmobiliario",
    title: "Sistema de captación",
    summary: "Automatización del seguimiento de prospectos y gestión comercial con reportes en tiempo real.",
    problem:
      "Los leads que llegaban desde portales inmobiliarios se distribuían por email entre los asesores, que después les daban seguimiento en Excels individuales. No había visibilidad de qué prospectos se estaban perdiendo ni qué canal realmente generaba ventas.",
    solution:
      "Se implementó un CRM con captación automática de leads desde los portales y el sitio propio, asignación automática por asesor y recordatorios de seguimiento configurados por etapa del embudo.",
    technology: ["CRM a la medida", "Automatización de leads", "Dashboards de conversión"],
    result:
      "Visibilidad completa del embudo comercial para el equipo directivo y reducción del tiempo de primer contacto con cada prospecto.",
    image: "/images/proyectos/sistema-captacion.jpg",
    featured: true,
    seo: {
      metaTitle: "Sistema de captación inmobiliaria — Caso de estudio",
      metaDescription:
        "Automatización de seguimiento de prospectos y gestión comercial para una agencia inmobiliaria, con reportes en tiempo real.",
    },
  },
  {
    slug: "business-intelligence",
    sectorSlug: "servicios",
    sectorLabel: "Servicios",
    title: "Business Intelligence",
    summary: "Consolidación de información y dashboards ejecutivos para mejor toma de decisiones.",
    problem:
      "La información del negocio vivía repartida entre el sistema de facturación, el CRM y hojas de cálculo individuales de cada área. Armar un reporte ejecutivo tomaba días y para cuando estaba listo, los datos ya estaban desactualizados.",
    solution:
      "Se consolidaron las fuentes de datos en un dashboard ejecutivo único, con KPIs definidos junto con la dirección y actualización automática desde los sistemas de origen.",
    technology: ["ETL de fuentes internas", "Dashboards ejecutivos", "Alertas automáticas"],
    result:
      "El equipo directivo pasó de recibir reportes semanales manuales a tener sus KPIs principales disponibles en tiempo real, con alertas cuando un indicador se sale de rango.",
    image: "/images/proyectos/business-intelligence.jpg",
    featured: true,
    seo: {
      metaTitle: "Business Intelligence para empresa de servicios — Caso de estudio",
      metaDescription:
        "Consolidación de información dispersa en un dashboard ejecutivo único para una empresa de servicios B2B.",
    },
  },
  {
    slug: "integracion-de-sistemas",
    sectorSlug: "turismo",
    sectorLabel: "Turismo",
    title: "Integración de sistemas",
    summary: "Conexión de múltiples plataformas mediante APIs para sincronizar datos y procesos.",
    problem:
      "El sistema de reservas, el sistema contable y la plataforma de atención al cliente operaban de forma aislada. El equipo tenía que capturar la misma información hasta tres veces en sistemas distintos.",
    solution:
      "Se construyeron conectores vía API entre las tres plataformas, con sincronización automática de reservas, facturación y datos de cliente en ambas direcciones.",
    technology: ["APIs REST", "Webhooks", "Sincronización bidireccional"],
    result:
      "Eliminación de la doble (y triple) captura de información, reduciendo errores humanos y liberando horas del equipo administrativo cada semana.",
    image: "/images/proyectos/integracion-sistemas.jpg",
    featured: true,
    seo: {
      metaTitle: "Integración de sistemas para empresa turística — Caso de estudio",
      metaDescription:
        "Conexión de reservas, contabilidad y atención al cliente mediante APIs para eliminar la doble captura de información.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
