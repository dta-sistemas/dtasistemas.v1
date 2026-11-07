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
 * "Así trabajamos": los 5 pasos unidos por UNA línea azul continua (azul = conectado).
 * Es una secuencia real, así que aquí la numeración sí transmite información.
 */
export function ProcessSection({ title, tone = "subtle" }: ProcessSectionProps) {
  const t = useTranslations("processSteps");

  return (
    <Section tone={tone}>
      <h2 className="mx-auto mb-14 max-w-xl text-center text-h2 text-dta-black">{title}</h2>
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
    </Section>
  );
}
