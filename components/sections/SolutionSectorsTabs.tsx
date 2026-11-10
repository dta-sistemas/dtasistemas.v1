"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type SectorTabItem = {
  slug: string;
  name: string;
  href: string;
  problem: string;
  solution: string[];
  example?: string;
};

type Labels = {
  problem: string;
  solution: string;
  example: string;
  illustrative: string;
  viewSector: string;
};

/**
 * Pestañas de master-detalle. En las fichas de solución: "Sectores donde más aplica"; en las de
 * sector: "Cómo ayudamos en…" (lista de soluciones). Es el mismo patrón en ambos sentidos: la lista de sectores a un costado (en móvil, una
 * fila deslizable arriba) y, al elegir uno, un panel con 1) la problemática del sector, 2) la
 * solución para más control y autonomía en puntos principales y 3) un ejemplo práctico.
 *
 * Accesible: patrón WAI-ARIA de pestañas (role tablist/tab/tabpanel), flechas y Home/End para
 * moverse. Todos los paneles están en el HTML (los inactivos con `hidden`), así el contenido es
 * visible para buscadores aunque solo se muestre uno a la vez.
 */
export function SolutionSectorsTabs({
  items,
  labels,
  idPrefix,
  headerPrefix = "dta/sector/",
}: {
  items: SectorTabItem[];
  labels: Labels;
  idPrefix: string;
  /** Prefijo de la barra del panel: "dta/sector/" en las fichas de solución, "dta/solucion/" en las de sector. */
  headerPrefix?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const next = (to + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(items.length - 1);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div role="tablist" aria-label={labels.problem} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:col-span-4 md:mx-0 md:flex-col md:overflow-visible md:px-0">
        {items.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${idPrefix}-tab-${s.slug}`}
              aria-selected={on}
              aria-controls={`${idPrefix}-panel-${s.slug}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group flex shrink-0 items-center justify-between gap-4 rounded-card border px-5 py-4 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600 md:w-full ${
                on
                  ? "border-dta-navy-900 bg-dta-navy-900 text-white"
                  : "border-dta-gray-200 bg-white text-dta-black hover:border-dta-black"
              }`}
            >
              <span className="font-serif text-xl leading-tight">{s.name}</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className={`hidden shrink-0 transition-transform duration-150 md:block ${on ? "translate-x-0 text-dta-blue-300" : "-translate-x-1 text-dta-gray-400 group-hover:translate-x-0"}`}
              />
            </button>
          );
        })}
      </div>

      <div className="min-w-0 md:col-span-8">
        {items.map((s, i) => (
          <div
            key={s.slug}
            role="tabpanel"
            id={`${idPrefix}-panel-${s.slug}`}
            aria-labelledby={`${idPrefix}-tab-${s.slug}`}
            hidden={i !== active}
            className="overflow-hidden rounded-card border border-dta-gray-200 bg-white"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-dta-navy-800 px-5 py-2.5 font-mono text-[11px] text-white/55">
              <span className="min-w-0 truncate">
                {headerPrefix}
                <span className="text-white/90">{s.slug}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded border border-white/20 px-1.5 py-px text-[10px] text-white/70">{labels.illustrative}</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20" />
              </span>
            </div>

            <div className="space-y-8 p-6 md:p-8">
              <section>
                <h3 className="flex items-baseline gap-3 text-sm font-semibold text-dta-gray-600">
                  <span className="font-mono text-xs text-dta-blue-600">01</span>
                  {labels.problem}
                </h3>
                <p className="mt-3 font-serif text-xl leading-snug text-dta-black md:text-2xl">{s.problem}</p>
              </section>

              <section className="border-t border-dta-gray-200 pt-8">
                <h3 className="flex items-baseline gap-3 text-sm font-semibold text-dta-gray-600">
                  <span className="font-mono text-xs text-dta-blue-600">02</span>
                  {labels.solution}
                </h3>
                <ul className="mt-4 grid gap-3">
                  {s.solution.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-dta-black md:text-base">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-dta-blue-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>

              {s.example && (
                <section className="rounded-card bg-dta-gray-50 p-5 md:p-6">
                  <h3 className="flex items-baseline gap-3 text-sm font-semibold text-dta-gray-600">
                    <span className="font-mono text-xs text-dta-blue-600">03</span>
                    {labels.example}
                  </h3>
                  <p className="mt-3 leading-relaxed text-dta-gray-700">{s.example}</p>
                </section>
              )}

              <Link
                href={s.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-dta-blue-600 hover:underline"
              >
                {labels.viewSector}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
