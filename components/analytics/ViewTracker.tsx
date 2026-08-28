"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics/events";

type ViewTrackerProps = {
  event: "solution_view" | "sector_view" | "project_view" | "blog_read";
  slug: string;
};

/**
 * Isla cliente mínima (no renderiza nada visible) que dispara el evento de
 * vista correspondiente al montar. Se usa dentro de páginas de detalle que
 * siguen siendo Server Components (SolutionDetail, SectorDetail, el detalle
 * de proyecto y el de artículo de blog) — evita convertir toda la página en
 * Client Component solo para poder llamar useEffect una vez.
 */
export function ViewTracker({ event, slug }: ViewTrackerProps) {
  useEffect(() => {
    if (event === "solution_view") analytics.solutionView(slug);
    if (event === "sector_view") analytics.sectorView(slug);
    if (event === "project_view") analytics.projectView(slug);
    if (event === "blog_read") analytics.blogRead(slug);
    // Se ejecuta una sola vez por montaje de página (slug/evento fijos).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
