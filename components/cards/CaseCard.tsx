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
 * Caso resuelto, compartido por la Home y /proyectos: esquema antes → después en un panel
 * de sistema (azul marino) y texto debajo. Rotulado "Caso ilustrativo" mientras no sean
 * proyectos reales documentados con permiso del cliente.
 */
export function CaseCard({ slug, sector, title, summary, result, nodes = 3 }: CaseCardProps) {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const href = `/proyectos/${slug}`;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-card border border-dta-navy-900 bg-dta-navy-900 px-5 pb-3 pt-5"
      >
        <CaseSchematic dark nodes={nodes} before={t("caseBefore")} after={t("caseAfter")} />
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4 text-sm text-dta-gray-600">
        <span>{sector}</span>
        <span className="rounded border border-dta-gray-300 px-2 py-0.5 font-mono text-xs">{t("caseBadge")}</span>
      </div>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-dta-black md:text-[1.75rem]">
        <Link
          href={href}
          className="rounded transition-colors duration-150 hover:text-dta-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-3 max-w-md text-dta-gray-700">{summary}</p>
      <p className="mt-3 line-clamp-3 max-w-md text-sm leading-relaxed text-dta-gray-600">
        <span className="font-semibold text-dta-black">{t("caseResult")}: </span>
        {result}
      </p>
      <Link href={href} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-dta-blue-600">
        {tc("verProyecto")}
        <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
