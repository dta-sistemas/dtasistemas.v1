"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { ProcessStep } from "../ui/ProcessStep";

const STEP_KEYS = ["entender", "disenar", "construir", "conectar", "evolucionar"] as const;

type ProcessSectionProps = {
  /** Home usa el default (dict.home.processTitle); /dta pasa "dtaPage.processTitle" ya resuelto. */
  title: string;
  tone?: "light" | "subtle";
};

/**
 * Sección "De problema a solución" / "Así trabajamos en DTA" — mismos 5
 * pasos (namespace "processSteps"), reutilizada entre Home y /dta. Ambas
 * páginas ahora están completamente traducidas (Fase 13), así que ya no
 * hace falta el caso especial de pasos fijos en español que existía en
 * Fase 12.
 */
export function ProcessSection({ title, tone = "subtle" }: ProcessSectionProps) {
  const t = useTranslations("processSteps");

  return (
    <Section tone={tone}>
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-h2 text-dta-black">{title}</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {STEP_KEYS.map((key, i) => (
          <ProcessStep
            key={key}
            number={String(i + 1)}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            isLast={i === STEP_KEYS.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
