"use client";

import { useTranslations } from "next-intl";
import { Clock, Folder, BarChart3, Boxes, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const ROWS = [
  { key: "manuales", icon: Clock, href: "/soluciones/inteligencia-artificial" },
  { key: "informacion", icon: Folder, href: "/soluciones/integracion-de-sistemas" },
  { key: "datos", icon: BarChart3, href: "/soluciones/business-intelligence" },
  { key: "sistema", icon: Boxes, href: "/soluciones/sistemas-empresariales" },
] as const;

export function ProblemsSection() {
  const t = useTranslations("home");
  const tp = useTranslations("problems");
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <Reveal className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="text-h2 text-dta-black">{t("problemsTitle")}</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {ROWS.map((row, i) => (
          <Reveal key={row.key} delay={i * 70} className="h-full">
            <Link
              href={row.href}
              className="group flex h-full flex-col rounded-card border border-dta-gray-200 bg-dta-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:bg-white hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-dta-blue-600 shadow-card transition-colors duration-300 group-hover:bg-dta-blue-600 group-hover:text-white">
                <row.icon size={18} aria-hidden="true" />
              </div>
              <p className="mt-4 flex-1 text-[15px] font-medium leading-snug text-dta-black">{tp(`${row.key}.text`)}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-dta-blue-600">
                {tp(`${row.key}.link`)}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/soluciones" variant="primary">
          {tc("encontrarOportunidades")}
        </Button>
      </div>
    </Section>
  );
}
