import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

const ROWS = [
  { key: "manuales", href: "/soluciones/inteligencia-artificial" },
  { key: "informacion", href: "/soluciones/integracion-de-sistemas" },
  { key: "datos", href: "/soluciones/business-intelligence" },
  { key: "sistema", href: "/soluciones/sistemas-empresariales" },
] as const;

/**
 * Las frases que de verdad dicen los dueños de empresa, en grande y en primera persona,
 * como una conversación. Cada una lleva a la solución que la resuelve.
 */
export function ProblemsSection() {
  const t = useTranslations("home");
  const tp = useTranslations("problems");
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <h2 className="max-w-2xl text-h2 text-dta-black">{t("problemsTitle")}</h2>
      <ul className="mt-12 border-t border-dta-gray-200">
        {ROWS.map((row) => (
          <li key={row.key} className="border-b border-dta-gray-200">
            <Link
              href={row.href}
              className="group flex items-baseline justify-between gap-6 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600 md:py-8"
            >
              <span className="max-w-3xl font-serif text-2xl leading-snug text-dta-black md:text-[2rem]">
                {tp(`${row.key}.text`)}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-dta-blue-600">
                {tp(`${row.key}.link`)}
                <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button href="/soluciones" variant="primary">
          {tc("encontrarOportunidades")}
        </Button>
      </div>
    </Section>
  );
}
