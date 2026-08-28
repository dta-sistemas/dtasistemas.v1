"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Instalación directa de Google Analytics 4 (gtag.js) — Fase 0, sección 19.
 *
 * `send_page_view: false` es intencional: en una app de Next.js App Router
 * (client-side navigation entre rutas), gtag.js solo detecta la carga
 * inicial de página. Los page_view de navegaciones posteriores los dispara
 * <PageViewTracker /> en cada cambio de ruta — de lo contrario, GA4
 * subregistraría el tráfico interno del sitio.
 *
 * Si NEXT_PUBLIC_GA4_MEASUREMENT_ID no está configurada, este componente no
 * renderiza nada — el sitio sigue funcionando normalmente en desarrollo sin
 * credenciales.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
