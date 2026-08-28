"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { SolutionCard } from "../cards/SolutionCard";
import { getLocalizedSolutions } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

export function Pillars() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const solutions = getLocalizedSolutions(locale);

  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={t("pillarsEyebrow")} title={t("pillarsTitle")} align="center" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {solutions.map((s) => (
          <SolutionCard
            key={s.slug}
            number={s.pillarNumber}
            icon={s.icon}
            title={s.title}
            description={s.description}
            bullets={s.bullets}
            href={s.href}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button href="/soluciones" variant="secondary">
          {tc("verTodasSoluciones")}
        </Button>
      </div>
    </Section>
  );
}
