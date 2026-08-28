"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ProjectCard } from "../cards/ProjectCard";
import { getLocalizedProjects } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

export function ProjectsInAction() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const featured = getLocalizedProjects(locale).filter((p) => p.featured).slice(0, 4);

  return (
    <Section tone="light">
      <SectionHeading eyebrow={t("projectsEyebrow")} title={t("projectsTitle")} align="center" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        {featured.map((p) => (
          <ProjectCard
            key={p.slug}
            sector={p.sectorLabel}
            title={p.title}
            description={p.summary}
            image={p.image}
            href={`/proyectos/${p.slug}`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button href="/proyectos" variant="secondary">
          {tc("verMasProyectos")}
        </Button>
      </div>
    </Section>
  );
}
