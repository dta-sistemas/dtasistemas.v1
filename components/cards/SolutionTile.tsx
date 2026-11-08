import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SolutionVisual, MODULE_LABEL } from "../sections/SolutionVisual";

type SolutionTileProps = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  /** Número del módulo, ej. "01" (se muestra en la barra superior). */
  index?: string;
  /** Ficha ancha: las capacidades se muestran en dos columnas (en las angostas, en una). */
  wide?: boolean;
  className?: string;
};

/**
 * Ficha de servicio como "módulo" de sistema: barra superior con el identificador del módulo
 * (dta/sistemas) y su estado, mini-interfaz propia del servicio, capacidades como lista y un
 * pie de acción. Toda la ficha es un solo enlace; al pasar el cursor el borde se oscurece y
 * los elementos azules de la mini-interfaz se iluminan.
 */
export function SolutionTile({ slug, title, description, bullets, href, index, wide = false, className = "" }: SolutionTileProps) {
  const tc = useTranslations("common");
  const module = MODULE_LABEL[slug] ?? slug;

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white transition-colors duration-150 hover:border-dta-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-dta-navy-800 px-4 py-2 font-mono text-[11px] text-white/55">
        <span className="truncate">
          dta/<span className="text-white/90">{module}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {index && <span className="text-white/40">{index}</span>}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20 transition-shadow group-hover:ring-dta-blue-300/40" />
        </span>
      </div>

      <SolutionVisual slug={slug} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight text-dta-black">{title}</h3>
        <p className="mt-2 text-dta-gray-700">{description}</p>
        <ul className={`mt-5 grid gap-x-4 gap-y-2 border-t border-dta-gray-200 pt-4 ${wide ? "sm:grid-cols-2" : ""}`}>
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-dta-gray-700">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-dta-blue-600" />
              {b}
            </li>
          ))}
        </ul>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-dta-blue-600">
          <span>{tc("verSoluciones")}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-dta-gray-200 transition-colors group-hover:border-dta-blue-600 group-hover:bg-dta-blue-600 group-hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
