"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
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
      {/* Cuadrícula de 6 columnas (cada tarjeta ocupa 2): permite centrar la última fila
          cuando el total no es múltiplo de 3 (5 pilares dejaban un hueco vacío a la derecha). */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-6">
        {solutions.map((s, i) => (
          <Reveal
            key={s.slug}
            delay={(i % 3) * 80}
            className={`h-full md:col-span-2 ${
              solutions.length % 3 === 2 && i === solutions.length - 2 ? "md:col-start-2" : ""
            }`}
          >
            <SolutionCard
              number={s.pillarNumber}
              icon={s.icon}
              title={s.title}
              description={s.description}
              bullets={s.bullets}
              href={s.href}
            />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button href="/soluciones" variant="secondary">
          {tc("verTodasSoluciones")}
        </Button>
      </div>
    </Section>
  );
}
