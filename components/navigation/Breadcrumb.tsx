import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string; // el último item no lleva href (página actual)
};

/**
 * Breadcrumb visible. El JSON-LD correspondiente (BreadcrumbList) se genera
 * por separado con lib/seo/schema.ts#buildBreadcrumbSchema para no acoplar
 * presentación con datos estructurados.
 *
 * Mejoras: aria-label e ícono "Inicio" traducidos (antes fijos), lista
 * semántica <ol>, y los eslabones largos (títulos de artículo) se truncan en
 * una sola línea en lugar de romper el layout en móvil.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("breadcrumbLabel")} className="mb-5 text-xs text-dta-gray-600">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li className="flex items-center">
          <Link
            href="/"
            aria-label={t("inicio")}
            className="flex items-center rounded p-0.5 transition-colors hover:text-dta-blue-600"
          >
            <Home size={13} aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight size={11} className="shrink-0 text-dta-gray-400" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-dta-blue-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="max-w-[16rem] truncate font-medium text-dta-black sm:max-w-md">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
