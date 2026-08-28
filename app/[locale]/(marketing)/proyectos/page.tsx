import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getLocalizedProjects } from "@/lib/i18n/localizedContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

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

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>
        </div>
      </Section>

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
