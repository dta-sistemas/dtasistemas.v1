import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt (Fase 0, sección 15 y sección 26). /design-system ya se marca
 * noindex a nivel de página (metadata robots), esto lo refuerza a nivel de
 * crawler para no gastar presupuesto de rastreo ahí.
 *
 * Actualización Fase 11: se agregan /app, /login y /dashboard — el área de
 * producto reservada (sin funcionalidad real todavía) no debe indexarse ni
 * rastrearse como si fuera contenido de marketing.
 *
 * Actualización Fase 12: se agrega /dta-linktree — página "no listada" a
 * propósito (solo accesible compartiendo el link directo, nunca enlazada
 * desde el sitio ni desde ningún menú). No debe indexarse ni aparecer en
 * resultados de búsqueda.
 * Actualización Fase 13: se agregan las versiones /en/ de las mismas
 * rutas — con enrutamiento por locale, "/app" y "/en/app" son URLs
 * distintas y ambas deben excluirse.
 */
export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = ["/design-system", "/app", "/login", "/dashboard", "/dta-linktree"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...disallowedPaths, ...disallowedPaths.map((p) => `/en${p}`)],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
