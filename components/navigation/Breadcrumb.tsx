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
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-dta-gray-600 mb-4">
      <Link href="/" className="flex items-center hover:text-dta-blue-600" aria-label="Inicio">
        <Home size={12} />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            <ChevronRight size={10} />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-dta-blue-600">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-dta-black font-medium">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
