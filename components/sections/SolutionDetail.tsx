import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { PageHero, HeroPanel } from "./PageHero";
import { CTABand } from "./CTABand";
import { Reveal } from "../ui/Reveal";
import { JsonLd } from "../seo/JsonLd";
import { ViewTracker } from "../analytics/ViewTracker";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { getLocalizedSectors } from "@/lib/i18n/localizedContent";
import type { Solution } from "@/data/solutions";
import type { AppLocale } from "@/i18n/routing";

/**
 * Template compartido por las 6 páginas de /soluciones/[individual].
 * Fase 13: recibe `solution` ya localizado (resuelto por cada page.tsx vía
 * getLocalizedSolutionBySlug) + el locale, para poder traducir el resto
 * del layout (headings fijos, CTAs) vía next-intl.
 */
export async function SolutionDetail({ solution, locale }: { solution: Solution; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "solutionDetail" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHub = await getTranslations({ locale, namespace: "solucionesHub" });
  const sectors = getLocalizedSectors(locale);
  const related = sectors.filter((s) => solution.relatedSectors.includes(s.slug));

  return (
    <div>
      <ViewTracker event="solution_view" slug={solution.slug} />
      <JsonLd
        data={[
          buildServiceSchema({ name: solution.seo.metaTitle, description: solution.seo.metaDescription, url: solution.href, locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/soluciones" },
              { name: solution.title, path: solution.href },
            ],
            locale
          ),
        ]}
      />

      <PageHero
        breadcrumb={[{ label: tHub("eyebrow"), href: "/soluciones" }, { label: solution.title }]}
        eyebrow={solution.title}
        title={solution.problemHeadline}
        description={solution.longDescription}
        actions={
          <Button href="/contacto?intent=audit" variant="primary">
            {tc("analizarMiEmpresa")}
          </Button>
        }
        aside={
          <HeroPanel>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-dta-blue-300">
              <solution.icon size={22} aria-hidden="true" />
            </span>
            <div className="mt-5 text-xl font-bold">{solution.title}</div>
            <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {solution.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-dta-blue-300" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </HeroPanel>
        }
      />

      <Section tone="light">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: t("useCasesTitle"), items: solution.useCases },
            { title: t("deliverablesTitle"), items: solution.deliverables },
          ].map((block, i) => (
            <Reveal key={block.title} delay={i * 90} className="h-full">
              <div className="h-full rounded-card border border-dta-gray-200 bg-white p-6 shadow-card md:p-8">
                <h2 className="mb-5 text-h3 text-dta-black">{block.title}</h2>
                <ul className="space-y-3.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-dta-black/80">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-dta-blue-600" aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {solution.technologies && solution.technologies.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-h3 text-dta-black">{t("technologiesTitle")}</h2>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((techName) => (
                <span key={techName} className="rounded-full border border-dta-gray-200 bg-dta-gray-50 px-3.5 py-1.5 text-sm text-dta-gray-700">
                  {techName}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section tone="subtle">
          <h2 className="mb-5 text-h3 text-dta-black">{t("relatedSectorsTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="inline-flex items-center gap-2 rounded-full border border-dta-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-dta-black shadow-card transition-all hover:-translate-y-0.5 hover:border-dta-blue-600 hover:text-dta-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
              >
                <s.icon size={15} className="text-dta-blue-600" aria-hidden="true" />
                {s.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand title={t("ctaTitle")} text={t("ctaText")} href="/soluciones/dta-digital-audit" label={tc("solicitarDiagnostico")} />
    </div>
  );
}
