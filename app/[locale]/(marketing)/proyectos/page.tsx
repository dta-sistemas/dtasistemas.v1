import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getLocalizedProjects } from "@/lib/i18n/localizedContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "proyectosHub" });
  return { title: t("title1") + " " + t("title2"), description: t("intro"), alternates: buildAlternates("/proyectos", locale) };
}

export default async function ProyectosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "proyectosHub" });
  const projects = getLocalizedProjects(locale);

  return (
    <div>
      <JsonLd data={buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/proyectos" }], locale)} />

      <PageHero
        breadcrumb={[{ label: t("eyebrow") }]}
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </>
        }
        description={t("intro")}
      />

      <Section tone="light">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.slug} sector={p.sectorLabel} title={p.title} description={p.summary} image={p.image} href={`/proyectos/${p.slug}`} />
          ))}
        </div>
      </Section>
    </div>
  );
}
