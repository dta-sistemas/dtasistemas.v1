"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselProps = {
  /** Nombre del carrusel para lectores de pantalla. */
  label: string;
  prevLabel: string;
  nextLabel: string;
  children: ReactNode[];
  /** Clases de ancho de cada elemento (ej. "basis-[80%] lg:basis-1/4"). */
  itemClassName: string;
  /** Muestra botones anterior/siguiente en pantallas ≥ md (en móvil el gesto es deslizar). */
  arrows?: boolean;
  /** A partir de este breakpoint deja de ser carrusel y se vuelve una cuadrícula de N columnas. */
  gridAt?: "lg";
  /** Puntos indicadores de posición (solo mientras se comporta como carrusel). */
  dots?: boolean;
};

/**
 * Carrusel horizontal con desplazamiento táctil nativo (scroll-snap): en el celular se
 * desliza con el dedo, y el siguiente elemento asoma a propósito para que se note que hay más.
 * En escritorio añade botones anterior/siguiente, porque no todos tienen trackpad.
 *
 * Accesible: es una región con nombre, enfocable (las flechas del teclado desplazan), y los
 * botones tienen etiqueta. Con `prefers-reduced-motion` el desplazamiento es instantáneo.
 */
export function Carousel({ label, prevLabel, nextLabel, children, itemClassName, arrows = false, gridAt, dots = false }: CarouselProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const gridClasses = gridAt === "lg" ? "lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0" : "";
  const hideAt = gridAt === "lg" ? "lg:hidden" : "";

  return (
    <div>
      <ul
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dta-blue-600 sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:-mx-16 md:scroll-pl-16 md:px-16 lg:mx-0 lg:scroll-pl-0 lg:px-0 ${gridClasses}`}
      >
        {children.map((child, i) => (
          <li key={i} className={`shrink-0 snap-start ${gridAt === "lg" ? "lg:basis-auto" : ""} ${itemClassName}`}>
            {child}
          </li>
        ))}
      </ul>

      {(dots || arrows) && (
        <div className={`mt-4 flex items-center justify-between gap-4 ${hideAt}`}>
          {dots ? (
            <div className="flex gap-1.5" aria-hidden="true">
              {children.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-150 ${i === active ? "w-6 bg-dta-blue-600" : "w-1.5 bg-dta-gray-300"}`} />
              ))}
            </div>
          ) : (
            <span />
          )}
          {arrows && (
            <div className="hidden gap-2 md:flex">
              {([-1, 1] as const).map((dir) => {
                const disabled = dir === -1 ? !canPrev : !canNext;
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => go(dir)}
                    disabled={disabled}
                    aria-label={dir === -1 ? prevLabel : nextLabel}
                    className="grid h-10 w-10 place-items-center rounded-full border border-dta-gray-300 bg-white text-dta-black transition-colors duration-150 hover:border-dta-black disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600"
                  >
                    {dir === -1 ? <ArrowLeft size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
