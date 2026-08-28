"use client";

import { useTranslations } from "next-intl";
import { Clock, Folder, BarChart3, Boxes } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

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
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-h2 text-dta-black">{t("problemsTitle")}</h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {ROWS.map((row) => (
          <Link
            key={row.key}
            href={row.href}
            className="rounded-card border border-dta-gray-200 bg-dta-gray-50 p-5 hover:border-dta-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
          >
            <row.icon size={18} className="text-dta-blue-600 mb-3" aria-hidden="true" />
            <p className="text-sm font-medium text-dta-black">{tp(`${row.key}.text`)}</p>
            <div className="text-xs font-semibold text-dta-blue-600 mt-3">{tp(`${row.key}.link`)} →</div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button href="/soluciones" variant="primary">
          {tc("encontrarOportunidades")}
        </Button>
      </div>
    </Section>
  );
}
