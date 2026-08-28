"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics/events";

/**
 * Dispara el evento `page_view` en cada cambio de ruta. Necesario porque
 * gtag.js se configuró con send_page_view:false (ver GoogleAnalytics.tsx) —
 * sin este componente, GA4 solo registraría la primera página cargada y
 * ninguna navegación interna posterior (Next.js App Router no recarga la
 * página en cada Link).
 *
 * Se monta una sola vez en app/layout.tsx, dentro de <body>.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    analytics.pageView(url);
  }, [pathname, searchParams]);

  return null;
}
