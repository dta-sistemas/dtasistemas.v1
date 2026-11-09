/**
 * Preferencia de cookies del visitante, guardada en una cookie propia de DTA (necesaria: sin ella
 * habría que preguntar en cada visita). Registra QUÉ se aceptó y CUÁNDO, para poder demostrarlo.
 *
 *  - Necesarias (siempre activas): funcionamiento del sitio, idioma y verificación anti-spam
 *    del formulario (Cloudflare Turnstile).
 *  - Analíticas (solo con consentimiento): Google Analytics 4 y Google Tag Manager.
 *
 * `version` permite volver a preguntar si algún día cambian las categorías o los proveedores.
 */
export const CONSENT_COOKIE = "dta_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180; // 6 meses y se vuelve a preguntar
export const OPEN_PREFERENCES_EVENT = "dta:open-cookie-preferences";

export type StoredConsent = { v: number; analytics: boolean; ts: string };

export function readConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
    return parsed && parsed.v === CONSENT_VERSION && typeof parsed.analytics === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): StoredConsent {
  const value: StoredConsent = { v: CONSENT_VERSION, analytics, ts: new Date().toISOString() };
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 86400
  }; Path=/; SameSite=Lax${secure}`;
  return value;
}
