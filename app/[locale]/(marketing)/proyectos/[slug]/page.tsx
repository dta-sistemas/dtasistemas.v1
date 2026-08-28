import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { buildCreativeWorkSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { projects } from "@/data/projects";
import { getLocalizedProjectBySlug, getLocalizedSectorBySlug } from "@/lib/i18n/localizedContent";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getLocalizedProjectBySlug(slug, locale);
  if (!project) return {};
  return { title: project.seo.metaTitle, description: project.seo.metaDescription, alternates: buildAlternates(`/proyectos/${slug}`, locale) };
}

export default async function ProyectoDetallePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getLocalizedProjectBySlug(slug, locale);
  if (!project) notFound();

  const sector = getLocalizedSectorBySlug(project.sectorSlug, locale);
  const t = await getTranslations({ locale, namespace: "proyectoDetail" });
  const tHub = await getTranslations({ locale, namespace: "proyectosHub" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <div>
      <ViewTracker event="project_view" slug={project.slug} />
      <JsonLd
        data={[
          buildCreativeWorkSchema({ name: project.title, description: project.summary, url: `/proyectos/${project.slug}`, about: project.sectorLabel, locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/proyectos" },
              { name: project.title, path: `/proyectos/${project.slug}` },
            ],
            locale
          ),
        ]}
      />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: tHub("eyebrow"), href: "/proyectos" }, { label: project.title }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{project.sectorLabel}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{project.title}</h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{project.summary}</p>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs font-bold uppercase text-dta-gray-600/70 mb-2">{t("problemTitle")}</div>
            <p className="text-sm text-dta-black/80 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-dta-gray-600/70 mb-2">{t("solutionTitle")}</div>
            <p className="text-sm text-dta-black/80 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <div className="text-xs font-bold uppercase text-dta-gray-600/70 mb-2">{t("technologyTitle")}</div>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((techName) => (
                <span key={techName} className="px-3 py-1 rounded-full bg-dta-gray-50 border border-dta-gray-200 text-xs text-dta-gray-600">
                  {techName}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-dta-gray-600/70 mb-2">{t("resultTitle")}</div>
            <p className="text-sm text-dta-black font-medium leading-relaxed">{project.result}</p>
          </div>
        </div>
      </Section>

      {sector && (
        <Section tone="subtle">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-dta-gray-600">
              {t("belongsPrefix")}{" "}
              <Link href={sector.href} className="text-dta-blue-600 font-semibold hover:underline">
                {sector.name}
              </Link>
              .
            </div>
            <Button href="/proyectos" variant="secondary">
              {tc("verMasProyectos")}
            </Button>
          </div>
        </Section>
      )}

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("ctaTitle")}</h2>
          <div className="flex justify-center mt-5">
            <Button href="/contacto" variant="secondary" className="bg-white/10 text-white border-white/20 hover:border-white/40">
              {tc("hablarConDTA")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
