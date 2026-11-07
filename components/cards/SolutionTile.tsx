import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SolutionVisual } from "../sections/SolutionVisual";

type SolutionTileProps = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  className?: string;
};

/**
 * Mosaico de servicios: cada servicio muestra la mini-interfaz del tipo de sistema que
 * construye (en vez de un ícono genérico) y sus capacidades como etiquetas técnicas.
 * Toda la pieza es un solo enlace.
 */
export function SolutionTile({ slug, title, description, bullets, href, className = "" }: SolutionTileProps) {
  const tc = useTranslations("common");

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white transition-colors duration-150 hover:border-dta-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600 ${className}`}
    >
      <SolutionVisual slug={slug} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight text-dta-black">{title}</h3>
        <p className="mt-2 text-dta-gray-700">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {bullets.map((b) => (
            <li key={b} className="rounded border border-dta-gray-200 bg-dta-gray-50 px-2 py-1 font-mono text-xs text-dta-gray-700">
              {b}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-dta-blue-600">
          {tc("verSoluciones")}
          <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
