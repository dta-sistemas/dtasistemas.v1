import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Row = { name: string; tags: string[]; href: string };

/** Lista de sectores: nombre en serif y los sistemas que más conectamos ahí, como etiquetas técnicas. */
export function SectorRows({ rows }: { rows: Row[] }) {
  const tc = useTranslations("common");

  return (
    <ul className="border-t border-dta-gray-300">
      {rows.map((s) => (
        <li key={s.name} className="border-b border-dta-gray-300">
          <Link
            href={s.href}
            className="group grid items-center gap-x-8 gap-y-3 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600 md:grid-cols-12 md:py-7"
          >
            <h3 className="font-serif text-2xl leading-tight text-dta-black transition-colors duration-150 group-hover:text-dta-blue-600 md:col-span-4 md:text-[1.75rem]">
              {s.name}
            </h3>
            <ul className="flex flex-wrap gap-1.5 md:col-span-6">
              {s.tags.map((tag) => (
                <li key={tag} className="rounded border border-dta-gray-300 bg-white px-2 py-1 font-mono text-xs text-dta-gray-700">
                  {tag}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-dta-blue-600 md:col-span-2 md:justify-end">
              {tc("verSector")}
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
