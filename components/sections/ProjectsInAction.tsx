import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { CaseCard } from "../cards/CaseCard";
import { getLocalizedProjects } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

export function ProjectsInAction() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const featured = getLocalizedProjects(locale).filter((p) => p.featured).slice(0, 4);

  return (
    <Section tone="light">
      <SectionHeading title={t("projectsTitle")} subtitle={t("projectsText")} />
      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {featured.map((p, i) => (
          <CaseCard key={p.slug} slug={p.slug} sector={p.sectorLabel} title={p.title} summary={p.summary} result={p.result} nodes={3 + (i % 2)} />
        ))}
      </div>
      <div className="mt-12">
        <Button href="/proyectos" variant="secondary">
          {tc("verMasProyectos")}
        </Button>
      </div>
    </Section>
  );
}
