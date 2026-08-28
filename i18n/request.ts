import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * FIX post-entrega: `hasLocale` no está exportado en todas las versiones
 * de next-intl (el rango de package.json resolvió una que no lo trae).
 * Se reemplaza por una comparación manual contra routing.locales —
 * funcionalmente idéntico, sin depender de un export específico de versión.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && routing.locales.includes(requested as (typeof routing.locales)[number])
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
