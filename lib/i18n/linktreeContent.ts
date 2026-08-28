import { Boxes, Link2, PieChart, Bot, Monitor, ShieldCheck, type LucideIcon } from "lucide-react";

export type LinktreeSolution = { icon: LucideIcon; title: string; desc: string };

export type LinktreeContent = {
  headline: [string, string, string, string]; // línea 1, palabra1 resaltada, palabra2 resaltada, línea final
  sub: string;
  ctaPrimary: string;
  ctaWhatsapp: string;
  solutionsLabel: string;
  solutions: LinktreeSolution[];
  auditLabel: string;
  auditHeadline: string;
  auditFrom: string;
  auditCta: string;
  contactLabel: string;
  schedule: string;
  followLabel: string;
  footerLine1: string;
  footerLine2: string;
  cities: string;
};

/**
 * Contenido de /dta-linktree — independiente del diccionario general
 * (lib/i18n/dictionaries.ts) porque esta página tiene su propio layout de
 * copy (headline partido en fragmentos resaltados, lista de soluciones con
 * su propio wording corto) que no coincide 1:1 con el de la Home.
 */
export const linktreeContent: Record<"es" | "en", LinktreeContent> = {
  es: {
    headline: ["Tecnología para entender,", "automatizar", "hacer crecer", "tu empresa."],
    sub: "Diseñamos sistemas, conectamos datos y automatizamos procesos para que tu empresa opere mejor.",
    ctaPrimary: "Solicitar diagnóstico",
    ctaWhatsapp: "Hablar por WhatsApp",
    solutionsLabel: "NUESTRAS SOLUCIONES",
    solutions: [
      { icon: Boxes, title: "Sistemas Empresariales", desc: "Plataformas y software a la medida" },
      { icon: Link2, title: "Integración de Sistemas", desc: "Conectamos tus herramientas y datos" },
      { icon: PieChart, title: "Business Intelligence", desc: "Datos que se convierten en decisiones" },
      { icon: Bot, title: "Automatización & IA", desc: "Procesos inteligentes que ahorran tiempo y dinero" },
      { icon: Monitor, title: "Desarrollo Digital", desc: "Web, e-commerce y plataformas de alto rendimiento" },
      { icon: ShieldCheck, title: "DTA Care", desc: "Soporte, monitoreo y evolución continua" },
    ],
    auditLabel: "DTA DIGITAL AUDIT",
    auditHeadline: "Descubre dónde tu empresa está perdiendo tiempo.",
    auditFrom: "Desde",
    auditCta: "Solicitar diagnóstico",
    contactLabel: "CONTÁCTANOS",
    schedule: "Lun - Vie 9:00 - 18:00",
    followLabel: "SÍGUENOS",
    footerLine1: "Tu empresa ya tiene tecnología.",
    footerLine2: "DTA hace que trabaje como un sistema.",
    cities: "Cancún · Playa del Carmen · Riviera Maya · Mérida",
  },
  en: {
    headline: ["Technology to understand,", "automate", "grow", "your business."],
    sub: "We design systems, connect data and automate processes so your business runs better.",
    ctaPrimary: "Request diagnosis",
    ctaWhatsapp: "Chat on WhatsApp",
    solutionsLabel: "OUR SOLUTIONS",
    solutions: [
      { icon: Boxes, title: "Enterprise Systems", desc: "Custom platforms and software" },
      { icon: Link2, title: "System Integration", desc: "We connect your tools and data" },
      { icon: PieChart, title: "Business Intelligence", desc: "Data that turns into decisions" },
      { icon: Bot, title: "Automation & AI", desc: "Smart processes that save time and money" },
      { icon: Monitor, title: "Digital Development", desc: "High-performance websites, e-commerce and platforms" },
      { icon: ShieldCheck, title: "DTA Care", desc: "Support, monitoring and continuous evolution" },
    ],
    auditLabel: "DTA DIGITAL AUDIT",
    auditHeadline: "Discover where your business is losing time.",
    auditFrom: "From",
    auditCta: "Request diagnosis",
    contactLabel: "CONTACT US",
    schedule: "Mon - Fri 9:00 - 18:00",
    followLabel: "FOLLOW US",
    footerLine1: "Your business already has technology.",
    footerLine2: "DTA makes it work as a system.",
    cities: "Cancún · Playa del Carmen · Riviera Maya · Mérida",
  },
};
