import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
import { CaseSchematic } from "@/components/sections/CaseSchematic";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
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
  const tHome = await getTranslations({ locale, namespace: "home" });

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

      <PageHero
        breadcrumb={[{ label: tHub("eyebrow"), href: "/proyectos" }, { label: project.title }]}
        eyebrow={project.sectorLabel}
        title={project.title}
        description={project.summary}
        aside={
          <HeroPanel title={`dta · ${project.sectorLabel.toLowerCase()}`}>
            <CaseSchematic dark nodes={4} before={tHome("caseBefore")} after={tHome("caseAfter")} />
            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
              {project.technology.map((techName) => (
                <li key={techName} className="rounded border border-white/20 px-2 py-1 font-mono text-xs text-white/80">
                  {techName}
                </li>
              ))}
            </ul>
          </HeroPanel>
        }
      />

      {/* Cómo se resolvió: problema y solución con numerales grandes, igual que los casos de uso. */}
      <Section tone="light">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("storyTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("storyLead")}</p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { n: "01", title: t("problemTitle"), text: project.problem },
            { n: "02", title: t("solutionTitle"), text: project.solution },
          ].map((b) => (
            <li key={b.n} className="flex gap-6 rounded-card border border-dta-gray-200 bg-white p-7 md:p-8">
              <span aria-hidden="true" className="tabular font-serif text-6xl leading-[0.9] text-dta-blue-600">
                {b.n}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-dta-gray-600">{b.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-dta-black">{b.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Resultado y tecnología: bloque azul marino, igual que "Qué recibe tu empresa". */}
      <Section tone="subtle">
        <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
            <span>{t("resultModule")}</span>
            <span className="flex items-center gap-2">
              <span className="rounded border border-white/20 px-1.5 py-px text-[10px] text-white/70">{tHome("caseBadge")}</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
            </span>
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-10">
            <div className="md:col-span-4">
              <h2 className="text-h2 text-white">{t("resultTitle")}</h2>
              <span aria-hidden="true" className="mt-5 inline-block h-1 w-12 rounded-full bg-dta-blue-600" />
            </div>
            <p className="font-serif text-2xl leading-snug text-white md:col-span-8 md:text-[1.9rem] md:leading-snug">{project.result}</p>
          </div>
          <div className="border-t border-white/15 px-6 py-6 md:px-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="text-sm font-semibold text-white/60">{t("technologyTitle")}</div>
              <ul className="flex flex-wrap gap-2">
                {project.technology.map((techName) => (
                  <li key={techName} className="rounded border border-white/20 px-2.5 py-1 font-mono text-xs text-white/85">
                    {techName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {sector && (
        <Section tone="light" className="!pb-0 md:!pb-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-dta-gray-200 py-6">
            <div className="text-dta-gray-700">
              {t("belongsPrefix")}{" "}
              <Link href={sector.href} className="font-semibold text-dta-blue-600 hover:underline">
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

      <ConversionCTA locale={locale} title={t("ctaTitle")} text={t("ctaText")} source={`project-${project.slug}`} />
    </div>
  );
}
