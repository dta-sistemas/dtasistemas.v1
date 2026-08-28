declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Helpers de eventos GA4 (Fase 0, sección 19).
 *
 * Actualización Fase 8: el script de GA4 (gtag.js) ya se instala en
 * app/layout.tsx vía <GoogleAnalytics />, así que estas llamadas ahora
 * disparan de verdad en cuanto NEXT_PUBLIC_GA4_MEASUREMENT_ID esté
 * configurada. Sin esa variable, cada llamada sigue siendo un no-op seguro
 * (útil en desarrollo local sin credenciales).
 */
function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export const analytics = {
  pageView: (path: string) => track("page_view", { page_path: path }),
  contactStart: () => track("contact_start"),
  contactSubmit: (params: { helpType: string; source?: string }) => track("contact_submit", params),
  auditClick: (source: string) => track("audit_click", { source }),
  ctaClick: (label: string, source: string) => track("cta_click", { label, source }),
  whatsappClick: () => track("whatsapp_click"),
  phoneClick: () => track("phone_click"),
  emailClick: () => track("email_click"),
  blogRead: (slug: string) => track("blog_read", { slug }),
  solutionView: (slug: string) => track("solution_view", { slug }),
  sectorView: (slug: string) => track("sector_view", { slug }),
  projectView: (slug: string) => track("project_view", { slug }),
};
