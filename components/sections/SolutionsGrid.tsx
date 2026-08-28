"use client";

import { useLocale, useTranslations } from "next-intl";
import { SolutionCard } from "../cards/SolutionCard";
import { getLocalizedSolutions, getLocalizedDtaCareSummary } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

/**
 * Grid de 6 cards (5 pilares + DTA Care) filtrable por el título del pilar.
 * Fase 13: se volvió Client Component porque necesita el locale actual
 * para resolver el contenido traducido (antes podía ser Server Component
 * recibiendo activeTab ya resuelto desde TabsFilter).
 */
export function SolutionsGrid({ activeTab }: { activeTab: string }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("solucionesHub");
  const solutions = getLocalizedSolutions(locale);
  const dtaCare = getLocalizedDtaCareSummary(locale);

  const all = [
    ...solutions.map((s) => ({
      key: s.slug,
      number: s.pillarNumber,
      icon: s.icon,
      title: s.title,
      description: s.description,
      bullets: s.bullets,
      href: s.href,
    })),
    {
      key: dtaCare.slug,
      number: dtaCare.pillarNumber,
      icon: dtaCare.icon,
      title: dtaCare.title,
      description: dtaCare.description,
      bullets: dtaCare.bullets,
      href: dtaCare.href,
    },
  ];

  const filtered = activeTab === t("tabAll") ? all : all.filter((s) => s.title === activeTab);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {filtered.map((s) => (
        <SolutionCard
          key={s.key}
          number={s.number}
          icon={s.icon}
          title={s.title}
          description={s.description}
          bullets={s.bullets}
          href={s.href}
        />
      ))}
    </div>
  );
}
