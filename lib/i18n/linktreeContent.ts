export type LinktreeSolution = { slug: string; href: string; title: string; desc: string };

export type LinktreeContent = {
  headline: string;
  sub: string;
  ctaPrimary: string;
  ctaWhatsapp: string;
  /** Mensaje prellenado al abrir WhatsApp desde el Linktree. */
  waMessage: string;
  syncTitle: string;
  syncStatus: string;
  syncCaption: string;
  solutionsLabel: string;
  solutions: LinktreeSolution[];
  /** Cuántas soluciones se muestran antes del enlace "ver todas". */
  solutionsShown: number;
  moreSolutions: string;
  auditHeadline: string;
  auditFrom: string;
  auditCta: string;
  contactLabel: string;
  emailCopy: string;
  emailCopied: string;
  followLabel: string;
  confidential: string;
  privacy: string;
  cookies: string;
  cities: string;
};

/**
 * Contenido de /dta-linktree — independiente del diccionario general porque esta página tiene
 * su propio copy corto. Los nombres de servicio coinciden con los del sitio.
 */
export const linktreeContent: Record<"es" | "en", LinktreeContent> = {
  es: {
    headline: "Tecnología para entender, automatizar y hacer crecer tu empresa.",
    sub: "Diseñamos sistemas, conectamos datos y automatizamos procesos para que tu empresa opere mejor.",
    ctaPrimary: "Solicitar diagnóstico",
    ctaWhatsapp: "Escribir por WhatsApp",
    waMessage: "Hola, vi su Linktree y quiero solicitar un diagnóstico para mi empresa.",
    syncTitle: "dta · sincronización",
    syncStatus: "conectado",
    syncCaption: "4 herramientas, una sola versión",
    solutionsLabel: "Soluciones",
    solutions: [
      { slug: "sistemas-empresariales", href: "/soluciones/sistemas-empresariales", title: "Sistemas Empresariales", desc: "Plataformas y software a la medida" },
      { slug: "integracion-de-sistemas", href: "/soluciones/integracion-de-sistemas", title: "Integración de Sistemas", desc: "Conectamos tus herramientas y datos" },
      { slug: "business-intelligence", href: "/soluciones/business-intelligence", title: "Business Intelligence", desc: "Datos que se convierten en decisiones" },
      { slug: "inteligencia-artificial", href: "/soluciones/inteligencia-artificial", title: "Automatización & IA", desc: "Procesos inteligentes que ahorran tiempo y dinero" },
      { slug: "desarrollo-digital", href: "/soluciones/desarrollo-digital", title: "Desarrollo Digital", desc: "Web, e-commerce y plataformas de alto rendimiento" },
      { slug: "dta-care", href: "/dta-care", title: "DTA Care", desc: "Soporte, monitoreo y evolución continua" },
    ],
    solutionsShown: 3,
    moreSolutions: "Ver todas las soluciones",
    auditHeadline: "Descubre dónde tu empresa está perdiendo tiempo.",
    auditFrom: "Desde",
    auditCta: "Solicitar diagnóstico",
    contactLabel: "Contacto",
    emailCopy: "Copiar correo",
    emailCopied: "Copiado",
    followLabel: "Síguenos",
    confidential: "Tu información es confidencial",
    privacy: "Aviso de privacidad",
    cookies: "Cookies",
    cities: "Cancún · Playa del Carmen · Riviera Maya · Mérida",
  },
  en: {
    headline: "Technology to understand, automate and grow your business.",
    sub: "We design systems, connect data and automate processes so your business runs better.",
    ctaPrimary: "Request an assessment",
    ctaWhatsapp: "Message on WhatsApp",
    waMessage: "Hi, I saw your Linktree and I'd like to request an assessment for my business.",
    syncTitle: "dta · sync",
    syncStatus: "connected",
    syncCaption: "4 tools, one version",
    solutionsLabel: "Solutions",
    solutions: [
      { slug: "sistemas-empresariales", href: "/soluciones/sistemas-empresariales", title: "Enterprise Systems", desc: "Custom platforms and software" },
      { slug: "integracion-de-sistemas", href: "/soluciones/integracion-de-sistemas", title: "System Integration", desc: "We connect your tools and data" },
      { slug: "business-intelligence", href: "/soluciones/business-intelligence", title: "Business Intelligence", desc: "Data that turns into decisions" },
      { slug: "inteligencia-artificial", href: "/soluciones/inteligencia-artificial", title: "Automation & AI", desc: "Smart processes that save time and money" },
      { slug: "desarrollo-digital", href: "/soluciones/desarrollo-digital", title: "Digital Development", desc: "High-performance websites, e-commerce and platforms" },
      { slug: "dta-care", href: "/dta-care", title: "DTA Care", desc: "Support, monitoring and continuous evolution" },
    ],
    solutionsShown: 3,
    moreSolutions: "See all solutions",
    auditHeadline: "Discover where your business is losing time.",
    auditFrom: "From",
    auditCta: "Request an assessment",
    contactLabel: "Contact",
    emailCopy: "Copy email",
    emailCopied: "Copied",
    followLabel: "Follow us",
    confidential: "Your information is confidential",
    privacy: "Privacy notice",
    cookies: "Cookies",
    cities: "Cancún · Playa del Carmen · Riviera Maya · Mérida",
  },
};
