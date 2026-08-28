import type { AppLocale } from "@/i18n/routing";

/** Formatea "2026-08-12" como "12 ago 2026" (es) o "Aug 12, 2026" (en). */
export function formatDate(isoDate: string, locale: AppLocale = "es"): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-MX", { day: "numeric", month: "short", year: "numeric" });
}
