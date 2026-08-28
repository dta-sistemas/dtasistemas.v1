import { SITE_URL } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

const ORG_NAME = "DTA Sistemas";

type BreadcrumbItem = { name: string; path: string };

/**
 * Construye la URL absoluta correcta según el locale (Fase 13). Español no
 * lleva prefijo (localePrefix: "as-needed"), inglés sí lleva /en.
 */
function localizedUrl(path: string, locale: AppLocale = "es"): string {
  const prefixed = locale === "en" ? (path === "/" ? "/en" : `/en${path}`) : path;
  return `${SITE_URL}${prefixed}`;
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  locale?: AppLocale;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: localizedUrl(params.url, params.locale),
    provider: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    areaServed: params.areaServed ?? ["Quintana Roo", "Yucatán", "México"],
  };
}

/**
 * Genera JSON-LD de tipo BreadcrumbList a partir de una lista de items
 * visibles. Antepone automáticamente el nodo "Inicio"/"Home" → "/" (Fase 9).
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[], locale: AppLocale = "es") {
  const homeLabel = locale === "en" ? "Home" : "Inicio";
  const withHome: BreadcrumbItem[] = [{ name: homeLabel, path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: withHome.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrl(item.path, locale),
    })),
  };
}

export function buildOrganizationSchema(locale: AppLocale = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    description:
      locale === "en"
        ? "Technology partner for businesses: systems, integration, intelligence, automation & AI, and digital development."
        : "Partner tecnológico para empresas: sistemas, integración, inteligencia, automatización & IA y desarrollo digital.",
    address: { "@type": "PostalAddress", addressRegion: "Quintana Roo", addressCountry: "MX" },
  };
}

/**
 * CreativeWork schema — usado en /proyectos/[slug]. Se eligió sobre
 * Article porque los casos documentan un proyecto entregado, no contenido
 * editorial (Fase 0, sección 7.2).
 */
export function buildCreativeWorkSchema(params: {
  name: string;
  description: string;
  url: string;
  locale?: AppLocale;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: params.name,
    description: params.description,
    url: localizedUrl(params.url, params.locale),
    creator: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    ...(params.about ? { about: params.about } : {}),
  };
}

export function buildAboutPageSchema(params: { description: string; url: string; locale?: AppLocale }) {
  const name = params.locale === "en" ? `About ${ORG_NAME}` : `Acerca de ${ORG_NAME}`;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name,
    description: params.description,
    url: localizedUrl(params.url, params.locale),
    mainEntity: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  locale?: AppLocale;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: params.image.startsWith("http") ? params.image : `${SITE_URL}${params.image}`,
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    url: localizedUrl(params.url, params.locale),
    author: { "@type": "Organization", name: params.author ?? ORG_NAME },
    publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
  };
}

/**
 * LocalBusiness schema — usado en /contacto. Datos de teléfono/dirección
 * son placeholder hasta confirmar los datos reales de la oficina.
 */
export function buildLocalBusinessSchema(locale: AppLocale = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: ORG_NAME,
    url: SITE_URL,
    telephone: "+52-998-123-4567", // TODO: confirmar teléfono real
    email: "contacto@dtasistemas.com",
    address: { "@type": "PostalAddress", addressLocality: "Cancún", addressRegion: "Quintana Roo", addressCountry: "MX" },
    areaServed: ["Quintana Roo", "Yucatán", "México"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}
