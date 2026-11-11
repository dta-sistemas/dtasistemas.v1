/**
 * Parámetros de campaña para los enlaces del Linktree (y futuros enlaces de bio / QR).
 * Google Analytics lee utm_* de la URL de aterrizaje y atribuye la sesión (y el lead que de ella
 * salga) a "linktree / bio", en lugar de "directo". `utm_content` identifica QUÉ enlace se tocó.
 */
export function withUtm(path: string, content: string, source = "linktree", medium = "bio"): string {
  const [base, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set("utm_source", source);
  params.set("utm_medium", medium);
  params.set("utm_campaign", "link-in-bio");
  params.set("utm_content", content);
  return `${base}?${params.toString()}`;
}
