import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

type NumberedItem = { title?: string; text: string };

/**
 * Tarjetas con numeral grande (01, 02…): el mismo patrón de "Casos de uso" de las fichas de
 * solución. Con `title` el punto lleva encabezado en serif y texto de apoyo; sin él, el texto
 * mismo se lee en serif. `itemClassName` permite variar el ancho de cada tarjeta en la cuadrícula.
 */
export function NumberedGrid({
  items,
  className = "md:grid-cols-2",
  itemClassName,
}: {
  items: NumberedItem[];
  className?: string;
  itemClassName?: (index: number) => string;
}) {
  return (
    <ol className={`mt-10 grid gap-5 ${className}`}>
      {items.map((it, i) => (
        <li
          key={it.title ?? it.text}
          className={`flex gap-6 rounded-card border border-dta-gray-200 bg-white p-7 transition-colors duration-150 hover:border-dta-black md:p-8 ${itemClassName?.(i) ?? ""}`}
        >
          <span aria-hidden="true" className="tabular font-serif text-6xl leading-[0.9] text-dta-blue-600">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            {it.title ? (
              <>
                <h3 className="font-serif text-[1.45rem] leading-snug text-dta-black">{it.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-dta-gray-600">{it.text}</p>
              </>
            ) : (
              <p className="pt-1 font-serif text-[1.35rem] leading-snug text-dta-black">{it.text}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Bloque azul marino con lista de verificación (el mismo de "Qué recibe tu empresa"): barra de
 * módulo arriba, título a la izquierda (con `extra` opcional debajo) y los puntos a la derecha.
 */
export function ChecklistPanel({
  module,
  title,
  lead,
  items,
  extra,
}: {
  module: string;
  title: string;
  lead?: string;
  items: string[];
  extra?: ReactNode;
}) {
  return (
    <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
        <span>{module}</span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
      </div>
      <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-12 md:p-10">
        <div className="md:col-span-4">
          <h2 className="text-h2 text-white">{title}</h2>
          {lead && <p className="mt-4 text-white/70">{lead}</p>}
          {extra && <div className="mt-6">{extra}</div>}
        </div>
        <ul className="md:col-span-8">
          {items.map((item, i) => (
            <li key={item} className="flex items-start gap-4 border-b border-white/15 py-5 first:pt-0 last:border-b-0 last:pb-0">
              <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-dta-blue-600 text-white">
                <CheckCircle2 size={16} />
              </span>
              <span className="text-lg leading-snug text-white">{item}</span>
              <span aria-hidden="true" className="ml-auto hidden shrink-0 font-mono text-xs text-white/35 sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
