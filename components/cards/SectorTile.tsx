import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectorVisual, SECTOR_MODULE } from "../sections/SectorVisual";

type SectorTileProps = {
  slug: string;
  name: string;
  tags: string[];
  href: string;
  className?: string;
};

/**
 * Ficha de sector, con el mismo lenguaje de "módulo" que las de servicios: barra superior con
 * el identificador (dta/turismo), mini-interfaz propia del sector, los sistemas que más se
 * conectan ahí y un pie de acción. Toda la ficha es un solo enlace.
 */
export function SectorTile({ slug, name, tags, href, className = "" }: SectorTileProps) {
  const tc = useTranslations("common");
  const module = SECTOR_MODULE[slug] ?? slug;

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white transition-colors duration-150 hover:border-dta-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-dta-navy-800 px-4 py-2 font-mono text-[11px] text-white/55">
        <span className="truncate">
          dta/sector/<span className="text-white/90">{module}</span>
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20 transition-shadow group-hover:ring-dta-blue-300/40" />
      </div>
      <SectorVisual slug={slug} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight text-dta-black">{name}</h3>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded border border-dta-gray-300 bg-dta-gray-50 px-2 py-1 font-mono text-xs text-dta-gray-700">
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-dta-blue-600">
          <span>{tc("verSector")}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-dta-gray-200 transition-colors group-hover:border-dta-blue-600 group-hover:bg-dta-blue-600 group-hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
