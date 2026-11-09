"use client";

import Script from "next/script";
import { useConsent } from "../consent/ConsentProvider";

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

/**
 * Google Tag Manager — Fase 0, sección 06 y 19 ("Tag management").
 *
 * IMPORTANTE — evitar doble conteo: GA4 ya se instala directamente vía
 * <GoogleAnalytics /> (gtag.js) para que los eventos definidos en
 * lib/analytics/events.ts (que llaman window.gtag) funcionen sin depender
 * de configuración externa. GTM aquí se instala VACÍO — como contenedor
 * disponible para que el equipo de marketing agregue píxeles o tags
 * adicionales (Meta Pixel, LinkedIn Insight, etc.) sin tocar código.
 *
 * NO agregar una "Google tag (GA4 Configuration)" dentro de este contenedor
 * de GTM si NEXT_PUBLIC_GA4_MEASUREMENT_ID ya está configurada — haría que
 * cada page_view y evento se cuente dos veces.
 *
 * Si NEXT_PUBLIC_GTM_CONTAINER_ID no está configurada, no renderiza nada.
 */
export function GoogleTagManagerScript() {
  const { analytics } = useConsent();
  // Solo con consentimiento de cookies analíticas (ver ConsentProvider).
  if (!GTM_CONTAINER_ID || !analytics) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
      `}
    </Script>
  );
}

/**
 * Fragmento <noscript> requerido por GTM — debe ir inmediatamente después
 * de la apertura de <body> (ver app/layout.tsx). Cubre a los usuarios con
 * JavaScript deshabilitado.
 */
export function GoogleTagManagerNoScript() {
  // Se retiró a propósito: el <noscript> de GTM carga el contenedor SIN que el visitante pueda
  // dar su consentimiento (sin JavaScript no hay banner), lo que contradice el aviso de cookies.
  return null;
}
