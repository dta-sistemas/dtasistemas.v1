import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { PageHero, HeroPanel } from "./PageHero";
import { ConversionCTA } from "./ConversionCTA";
import { SolutionSectorsTabs, type SectorTabItem } from "./SolutionSectorsTabs";
import { getSolutionSectorCase } from "@/data/solutionSectors";
import { SolutionVisual } from "./SolutionVisual";
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

  // Contenido de cada pestaña: problemática, solución y ejemplo de la pareja solución × sector.
  // Si alguna pareja no tuviera contenido propio, se usa la problemática y el enfoque genéricos del sector.
  const sectorTabs: SectorTabItem[] = related.map((s) => {
    const c = getSolutionSectorCase(solution.slug, s.slug, locale);
    const angle = s.relatedSolutions.find((r) => r.slug === solution.slug)?.angle;
    return {
      slug: s.slug,
      name: s.name,
      href: s.href,
      problem: c?.problem ?? s.problems[0],
      solution: c?.solution ?? (angle ? [angle] : []),
      example: c?.example,
    };
  });

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
            <SolutionVisual slug={solution.slug} className="rounded-md" />
            <div className="mt-5 font-serif text-2xl">{solution.title}</div>
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

      {/* Casos de uso: cada punto con su numeral grande, para que no se lea como lista. */}
      <Section tone="light">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("useCasesTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("useCasesLead")}</p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {solution.useCases.map((item, i) => {
            // Cada caso de uso empieza con un verbo de acción: se acentúa para que el punto se lea de un vistazo.
            const [verb, ...rest] = item.split(" ");
            return (
              <li key={item} className="flex gap-6 rounded-card border border-dta-gray-200 bg-white p-7 transition-colors duration-150 hover:border-dta-black md:p-8">
                <span aria-hidden="true" className="tabular font-serif text-6xl leading-[0.9] text-dta-blue-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 font-serif text-[1.35rem] leading-snug text-dta-black">
                  <strong className="font-semibold underline decoration-dta-blue-600 decoration-2 underline-offset-[6px]">{verb}</strong>{" "}
                  {rest.join(" ")}
                </p>
              </li>
            );
          })}
        </ol>

        {solution.technologies && solution.technologies.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-4 text-h3 text-dta-black">{t("technologiesTitle")}</h3>
            <ul className="flex flex-wrap gap-2">
              {solution.technologies.map((techName) => (
                <li key={techName} className="rounded-md border border-dta-gray-300 bg-white px-3 py-1.5 font-mono text-sm text-dta-black">
                  {techName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Qué recibe tu empresa: bloque azul marino para que lo entregable pese. */}
      <Section tone="subtle">
        <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
            <span>{t("deliverablesModule")}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
          </div>
          <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-12 md:p-10">
            <div className="md:col-span-4">
              <h2 className="text-h2 text-white">{t("deliverablesTitle")}</h2>
              <p className="mt-4 text-white/70">{t("deliverablesLead")}</p>
            </div>
            <ul className="md:col-span-8">
              {solution.deliverables.map((item, i) => (
                <li key={item} className="flex items-start gap-4 border-b border-white/15 py-5 first:pt-0 last:border-b-0 last:pb-0">
                  <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-dta-blue-600 text-white">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="text-lg leading-snug text-white">{item}</span>
                  <span aria-hidden="true" className="ml-auto hidden shrink-0 font-mono text-xs text-white/35 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {sectorTabs.length > 0 && (
        <Section tone="light">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-h2 text-dta-black">{t("relatedSectorsTitle")}</h2>
            <p className="mt-3 text-body-lg text-dta-gray-600">{t("sectorsIntro")}</p>
          </div>
          <SolutionSectorsTabs
            idPrefix={solution.slug}
            items={sectorTabs}
            labels={{
              problem: t("sectorProblem"),
              solution: t("sectorSolution"),
              example: t("sectorExample"),
              illustrative: t("sectorIllustrative"),
              viewSector: tc("verSector"),
            }}
          />
        </Section>
      )}

      <ConversionCTA locale={locale} title={t("ctaTitle")} text={t("ctaText")} source={`solution-${solution.slug}`} />
    </div>
  );
}
