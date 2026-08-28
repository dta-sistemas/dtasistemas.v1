import { defineRouting } from "next-intl/routing";

/**
 * Configuración central de enrutamiento por idioma (Fase 13).
 *
 * localePrefix: "as-needed" es exactamente lo pedido: el locale por
 * defecto (es) NO lleva prefijo en la URL (/soluciones, no /es/soluciones),
 * mientras que cualquier otro locale (en) sí lo lleva (/en/soluciones).
 *
 * FIX post-entrega: localeDetection: false. Sin esto, next-intl detecta
 * automáticamente el idioma del navegador (header Accept-Language) y
 * redirige "/" hacia "/en" cuando el navegador está en inglés — lo que
 * contradice directamente el requisito de que "/" siempre sea la versión
 * en español por defecto. Con la detección desactivada, "/" muestra
 * español siempre, sin importar el idioma del navegador; el visitante
 * solo ve inglés si entra explícitamente a "/en" o usa el selector.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
