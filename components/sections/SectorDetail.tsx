import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { PageHero, HeroPanel } from "./PageHero";
import { ConversionCTA } from "./ConversionCTA";
import { SolutionSectorsTabs, type SectorTabItem } from "./SolutionSectorsTabs";
import { getSolutionSectorCase } from "@/data/solutionSectors";
import { SectorVisual } from "./SectorVisual";
import { JsonLd } from "../seo/JsonLd";
import { ViewTracker } from "../analytics/ViewTracker";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { getLocalizedSolutionBySlug } from "@/lib/i18n/localizedContent";
import type { Sector } from "@/data/sectors";
import type { AppLocale } from "@/i18n/routing";

export async function SectorDetail({ sector, locale }: { sector: Sector; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "sectorDetail" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHub = await getTranslations({ locale, namespace: "sectoresHub" });
  const tSolution = await getTranslations({ locale, namespace: "solutionDetail" });

  const resolvedSolutions = sector.relatedSolutions
    .map((rs) => {
      const solution = getLocalizedSolutionBySlug(rs.slug, locale);
      return solution ? { ...solution, angle: rs.angle } : null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  // Contenido de cada pestaña: problemática, solución y ejemplo de la pareja solución × sector
  // (el mismo contenido que se ve en las fichas de solución, leído desde el otro lado).
  const solutionTabs: SectorTabItem[] = resolvedSolutions.map((s) => {
    const c = getSolutionSectorCase(s.slug, sector.slug, locale);
    return {
      slug: s.slug,
      name: s.title,
      href: s.href,
      problem: c?.problem ?? sector.problems[0],
      solution: c?.solution ?? [s.angle],
      example: c?.example,
    };
  });

  return (
    <div>
      <ViewTracker event="sector_view" slug={sector.slug} />
      <JsonLd
        data={[
          buildServiceSchema({ name: sector.seo.metaTitle, description: sector.seo.metaDescription, url: sector.href, locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/sectores" },
              { name: sector.name, path: sector.href },
            ],
            locale
          ),
        ]}
      />

      <PageHero
        breadcrumb={[{ label: tHub("eyebrow"), href: "/sectores" }, { label: sector.name }]}
        eyebrow={sector.name}
        title={sector.headline}
        description={sector.heroDescription}
        actions={
          <Button href="/contacto?intent=audit" variant="primary">
            {tc("analizarMiEmpresa")}
          </Button>
        }
        aside={
          <HeroPanel>
            <SectorVisual slug={sector.slug} className="rounded-md" />
            <div className="mt-5 font-serif text-2xl">{sector.name}</div>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
              {sector.tags.map((tag) => (
                <span key={tag} className="rounded border border-white/20 px-2 py-1 font-mono text-xs text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </HeroPanel>
        }
      />

      {/* Problemas del sector: cada punto con su numeral grande. */}
      <Section tone="light">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-dta-black">
            {t("problemsPrefix")} {sector.name.toLowerCase()}
          </h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("problemsLead")}</p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {sector.problems.map((p, i) => (
            <li key={p} className="flex gap-6 rounded-card border border-dta-gray-200 bg-white p-7 transition-colors duration-150 hover:border-dta-black md:p-8">
              <span aria-hidden="true" className="tabular font-serif text-6xl leading-[0.9] text-dta-blue-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 font-serif text-[1.35rem] leading-snug text-dta-black">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Qué conectamos: bloque azul marino, igual que "Qué recibe tu empresa" en las soluciones. */}
      <Section tone="subtle">
        <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
            <span>{t("systemsModule")}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
          </div>
          <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-12 md:p-10">
            <div className="md:col-span-4">
              <h2 className="text-h2 text-white">
                {t("systemsTitle")} {sector.name.toLowerCase()}
              </h2>
              <p className="mt-4 text-white/70">{t("systemsLead")}</p>
            </div>
            <ul className="md:col-span-8">
              {sector.tags.map((tag, i) => (
                <li key={tag} className="flex items-start gap-4 border-b border-white/15 py-5 first:pt-0 last:border-b-0 last:pb-0">
                  <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-dta-blue-600 text-white">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="text-lg leading-snug text-white">{tag}</span>
                  <span aria-hidden="true" className="ml-auto hidden shrink-0 font-mono text-xs text-white/35 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {solutionTabs.length > 0 && (
        <Section tone="light">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-h2 text-dta-black">
              {t("howWeHelpPrefix")} {sector.name.toLowerCase()}
            </h2>
            <p className="mt-3 text-body-lg text-dta-gray-600">{t("solutionsIntro")}</p>
          </div>
          <SolutionSectorsTabs
            idPrefix={sector.slug}
            headerPrefix="dta/solucion/"
            items={solutionTabs}
            labels={{
              problem: t("problemsPrefix") + " " + sector.name.toLowerCase(),
              solution: tSolution("sectorSolution"),
              example: tSolution("sectorExample"),
              illustrative: tSolution("sectorIllustrative"),
              viewSector: t("viewSolution"),
            }}
          />
        </Section>
      )}

      <ConversionCTA
        locale={locale}
        title={t("ctaTitle")}
        text={`${t("ctaTextPrefix")} ${sector.name.toLowerCase()}.`}
        source={`sector-${sector.slug}`}
      />
    </div>
  );
}
