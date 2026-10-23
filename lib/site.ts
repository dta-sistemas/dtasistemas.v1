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

/**
 * Perfiles sociales de DTA Sistemas, mostrados como íconos en el Footer.
 * Cada ícono solo aparece si su URL está definida (antes se mostraban
 * íconos sin enlace, lo cual parece un error al usuario).
 *
 * TODO: completar con las URLs reales, ej. "https://www.linkedin.com/company/..."
 */
export const SOCIAL_LINKS: { linkedin?: string; instagram?: string; youtube?: string } = {
  linkedin: undefined,
  instagram: undefined,
  youtube: undefined,
};

/**
 * Datos legales de la empresa usados en /aviso-de-privacidad y
 * /terminos-y-condiciones. COMPLETAR antes de publicar: son los únicos
 * datos que cambian en ambos documentos y deben coincidir con tu
 * constancia de situación fiscal / acta constitutiva.
 */
export const LEGAL = {
  /** Razón social completa, ej. "DTA Sistemas, S.A. de C.V." o nombre completo si es persona física. */
  entityName: "[RAZÓN SOCIAL COMPLETA]",
  tradeName: "DTA Sistemas",
  /** Domicilio completo (calle, número, colonia, C.P.) — el aviso de privacidad debe incluirlo. */
  address: "[DOMICILIO COMPLETO], Cancún, Quintana Roo, México",
  /** Correo para solicitudes ARCO y dudas de privacidad. Conviene uno dedicado, ej. privacidad@dtasistemas.com */
  privacyEmail: "contacto@dtasistemas.com",
  /** Jurisdicción de los tribunales competentes. */
  jurisdiction: "Cancún, Quintana Roo",
  /** Fecha de la versión vigente (AAAA-MM-DD). Actualizar con cada cambio. */
  lastUpdated: "2026-10-23",
} as const;
