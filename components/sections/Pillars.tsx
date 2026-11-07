import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SolutionTile } from "../cards/SolutionTile";
import { getLocalizedSolutions } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

// Mosaico de 12 columnas: 7+5 arriba, 4+4+4 abajo (los dos primeros servicios pesan más).
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4"];

export function Pillars() {
  const t = useTranslations("home");
  const locale = useLocale() as AppLocale;
  const solutions = getLocalizedSolutions(locale);

  return (
    <Section tone="subtle">
      <SectionHeading title={t("pillarsTitle")} />
      <div className="mt-12 grid gap-5 md:grid-cols-12">
        {solutions.map((s, i) => (
          <div key={s.slug} className={SPANS[i] ?? "md:col-span-4"}>
            <SolutionTile slug={s.slug} title={s.title} description={s.description} bullets={s.bullets} href={s.href} />
          </div>
        ))}
      </div>
    </Section>
  );
}
