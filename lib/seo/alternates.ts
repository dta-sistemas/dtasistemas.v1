import type { AppLocale } from "@/i18n/routing";

/**
 * Construye canonical + alternates.languages (hreflang) para una página.
 * `path` es la ruta SIN prefijo de locale (ej. "/soluciones/dta-digital-audit").
 * Español no lleva prefijo (localePrefix: "as-needed"), inglés sí.
 */
export function buildAlternates(path: string, locale: AppLocale) {
  const esPath = path;
  const enPath = path === "/" ? "/en" : `/en${path}`;

  return {
    canonical: locale === "en" ? enPath : esPath,
    languages: {
      es: esPath,
      en: enPath,
      "x-default": esPath,
    },
  };
}
