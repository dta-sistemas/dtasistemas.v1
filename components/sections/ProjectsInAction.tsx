"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
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
      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80} className="h-full">
            <ProjectCard
              sector={p.sectorLabel}
              title={p.title}
              description={p.summary}
              image={p.image}
              href={`/proyectos/${p.slug}`}
            />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/proyectos" variant="secondary">
          {tc("verMasProyectos")}
        </Button>
      </div>
    </Section>
  );
}
