import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
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
          <div className="relative aspect-video overflow-hidden rounded-card bg-dta-navy-900 shadow-card-hover">
            <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 45vw, 100vw" priority className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dta-navy-950/50 to-transparent" />
          </div>
        }
      />

      <Section tone="light">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { title: t("problemTitle"), text: project.problem },
            { title: t("solutionTitle"), text: project.solution },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 90} className="h-full">
              <div className="h-full rounded-card border border-dta-gray-200 bg-white p-6 shadow-card md:p-7">
                <div className="mb-3 flex items-center gap-2 text-label uppercase text-dta-blue-600">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-dta-blue-100 text-[11px] font-bold">{i + 1}</span>
                  {b.title}
                </div>
                <p className="leading-relaxed text-dta-black/80">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-dta-gray-200 bg-dta-gray-50 p-6 md:p-7">
            <div className="mb-3 text-label uppercase text-dta-gray-600">{t("technologyTitle")}</div>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((techName) => (
                <span key={techName} className="rounded-full border border-dta-gray-200 bg-white px-3.5 py-1.5 text-sm text-dta-gray-700">
                  {techName}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-dta-blue-100 border-l-4 border-l-dta-blue-600 bg-dta-blue-50 p-6 md:p-7">
            <div className="mb-3 text-label uppercase text-dta-blue-600">{t("resultTitle")}</div>
            <p className="text-lg font-semibold leading-snug text-dta-black">{project.result}</p>
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

      <CTABand title={t("ctaTitle")} href="/contacto" label={tc("hablarConDTA")} />
    </div>
  );
}
