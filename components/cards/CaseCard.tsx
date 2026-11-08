import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CaseSchematic } from "../sections/CaseSchematic";

type CaseCardProps = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  result: string;
  nodes?: number;
};

/**
 * Ficha de caso, con el mismo lenguaje de "módulo" que servicios y sectores: barra superior
 * con el identificador del caso (dta/casos/…), esquema antes → después en un panel de sistema y
 * el texto debajo. Rotulada "Caso ilustrativo" mientras no sean proyectos reales documentados
 * con permiso del cliente. Toda la ficha es un solo enlace.
 */
export function CaseCard({ slug, sector, title, summary, result, nodes = 3 }: CaseCardProps) {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <Link
      href={`/proyectos/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white transition-colors duration-150 hover:border-dta-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-dta-navy-800 px-4 py-2 font-mono text-[11px] text-white/55">
        <span className="truncate">
          dta/casos/<span className="text-white/90">{slug}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded border border-white/20 px-1.5 py-px text-[10px] text-white/70">{t("caseBadge")}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20 transition-shadow group-hover:ring-dta-blue-300/40" />
        </span>
      </div>

      <div aria-hidden="true" className="bg-dta-navy-900 px-5 pb-3 pt-5">
        <CaseSchematic dark nodes={nodes} before={t("caseBefore")} after={t("caseAfter")} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="text-sm text-dta-gray-600">{sector}</div>
        <h3 className="mt-1.5 font-serif text-2xl leading-tight text-dta-black">{title}</h3>
        <p className="mt-3 text-dta-gray-700">{summary}</p>
        <p className="mt-4 line-clamp-3 border-t border-dta-gray-200 pt-4 text-sm leading-relaxed text-dta-gray-600">
          <span className="font-semibold text-dta-black">{t("caseResult")}: </span>
          {result}
        </p>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-dta-blue-600">
          <span>{tc("verProyecto")}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-dta-gray-200 transition-colors group-hover:border-dta-blue-600 group-hover:bg-dta-blue-600 group-hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
