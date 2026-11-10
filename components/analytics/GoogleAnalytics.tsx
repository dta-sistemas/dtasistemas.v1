"use client";

import Script from "next/script";
import { useConsent } from "../consent/ConsentProvider";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Instalación directa de Google Analytics 4 (gtag.js) — Fase 0, sección 19.
 *
 * La página vista de la CARGA INICIAL la envía gtag.js por sí mismo al ejecutar `config`
 * (page_location correcto, y también si el visitante acepta las cookies a mitad de la visita).
 * Las de las navegaciones internas posteriores (App Router no recarga la página) las dispara
 * <PageViewTracker /> en cada cambio de ruta.
 *
 * Antes se usaba `send_page_view: false` y la carga inicial dependía de PageViewTracker, pero
 * ese componente se ejecuta ANTES de que exista window.gtag: la primera página vista de cada
 * visita se perdía, y con ella la página de entrada (la más importante para atribución).
 *
 * Solo se carga si el visitante aceptó las cookies analíticas (ver ConsentProvider): antes de
 * eso, y si las rechaza, no se descarga ningún script de Google.
 *
 * Si NEXT_PUBLIC_GA4_MEASUREMENT_ID no está configurada, este componente no
 * renderiza nada — el sitio sigue funcionando normalmente en desarrollo sin
 * credenciales.
 */
export function GoogleAnalytics() {
  const { analytics } = useConsent();
  if (!GA_MEASUREMENT_ID || !analytics) return null;

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
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
