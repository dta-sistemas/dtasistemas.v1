"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

/**
 * Widget de Cloudflare Turnstile (Fase 0, sección 21: anti-spam sin
 * fricción, sin CAPTCHA tradicional). Requiere la variable de entorno
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY (pública, distinta de TURNSTILE_SECRET_KEY
 * que solo vive en el servidor).
 */
export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": onExpire,
    });
  }, [siteKey, onVerify, onExpire]);

  if (!siteKey) {
    // En desarrollo sin site key configurada, no bloqueamos el formulario.
    return (
      <p className="text-xs text-dta-gray-600/70">
        Verificación anti-spam pendiente de configurar (NEXT_PUBLIC_TURNSTILE_SITE_KEY).
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onReady={() => {
          if (containerRef.current && window.turnstile) {
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
              sitekey: siteKey,
              callback: onVerify,
              "expired-callback": onExpire,
            });
          }
        }}
      />
      <div ref={containerRef} />
    </>
  );
}
