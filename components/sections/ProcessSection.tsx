"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { ProcessStep } from "../ui/ProcessStep";
import { Reveal } from "../ui/Reveal";

const STEP_KEYS = ["entender", "disenar", "construir", "conectar", "evolucionar"] as const;

type ProcessSectionProps = {
  /** Home usa el default (dict.home.processTitle); /dta pasa "dtaPage.processTitle" ya resuelto. */
  title: string;
  tone?: "light" | "subtle";
};

/**
 * Sección "De problema a solución" / "Así trabajamos en DTA" — mismos 5
 * pasos (namespace "processSteps"), reutilizada entre Home y /dta.
 * Ahora es una lista ordenada real (<ol>) con línea de tiempo visual
 * (vertical en móvil, horizontal en escritorio).
 */
export function ProcessSection({ title, tone = "subtle" }: ProcessSectionProps) {
  const t = useTranslations("processSteps");

  return (
    <Section tone={tone}>
      <Reveal className="mx-auto mb-14 max-w-xl text-center">
        <h2 className="text-h2 text-dta-black">{title}</h2>
      </Reveal>
      <Reveal>
        <ol className="grid gap-6 md:grid-cols-5">
          {STEP_KEYS.map((key, i) => (
            <ProcessStep
              key={key}
              number={String(i + 1)}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              isLast={i === STEP_KEYS.length - 1}
            />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
