/**
 * Fuente única del dominio del sitio (hallazgo de la auditoría de Fase 9):
 * antes SITE_URL estaba duplicado de forma idéntica en 4 archivos
 * (app/sitemap.ts, app/robots.ts, lib/seo/schema.ts, app/layout.tsx) — un
 * riesgo real de que al confirmar el dominio final solo se actualizara en
 * algunos de los 4, dejando canonical/sitemap/schema inconsistentes entre sí.
 *
 * TODO: confirmar dominio final (Fase 0, sección 11, punto 11.5) y
 * actualizar SOLO aquí.
 */
export const SITE_URL = "https://www.dtasistemas.com";
