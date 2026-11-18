import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { NumberedGrid, ChecklistPanel } from "@/components/sections/NumberedBlocks";
import { SolutionVisual } from "@/components/sections/SolutionVisual";
import { SolutionSectorsTabs, type SectorTabItem } from "@/components/sections/SolutionSectorsTabs";
import { getSolutionSectorCase } from "@/data/solutionSectors";
import { getLocalizedSectors } from "@/lib/i18n/localizedContent";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dtaCarePage" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates("/dta-care", locale) };
}

export default async function DTACarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dtaCarePage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tSol = await getTranslations({ locale, namespace: "solutionDetail" });

  const careItems = [
    { title: t("item1Title"), description: t("item1Text") },
    { title: t("item2Title"), description: t("item2Text") },
    { title: t("item3Title"), description: t("item3Text") },
    { title: t("item4Title"), description: t("item4Text") },
  ];

  const sectorTabs: SectorTabItem[] = getLocalizedSectors(locale).map((s) => {
    const c = getSolutionSectorCase("dta-care", s.slug, locale);
    return { slug: s.slug, name: s.name, href: s.href, problem: c?.problem ?? s.problems[0], solution: c?.solution ?? [], example: c?.example };
  });
  const includes = [t("include1"), t("include2"), t("include3"), t("include4"), t("include5")];

  return (
    <div>
      <JsonLd
        data={[
          buildServiceSchema({ name: "DTA Care", description: t("intro"), url: "/dta-care", locale }),
          buildBreadcrumbSchema([{ name: "DTA Care", path: "/dta-care" }], locale),
        ]}
      />

      <PageHero
        breadcrumb={[{ label: "DTA Care" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("intro")}
        aside={
          <HeroPanel>
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="mr-1.5 text-sm font-medium text-white/60">{tc("desde")}</span>
              <span className="text-dta-blue-300">$2,500</span>{" "}
              <span className="text-sm font-medium text-white/60">MXN / {locale === "en" ? "month" : "mes"}</span>
            </div>
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
              {includes.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-dta-blue-300" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/contacto?intent=care" variant="light" className="w-full">
                {t("cta")}
              </Button>
            </div>
          </HeroPanel>
        }
      />


      {/* Cómo cuidamos tus sistemas: cuatro frentes con numeral grande */}
      <Section tone="light">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("itemsTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("itemsLead")}</p>
        </div>
        <NumberedGrid items={careItems.map((it) => ({ title: it.title, text: it.description }))} />
      </Section>

      {/* Qué incluye: bloque azul marino con el panel de disponibilidad */}
      <Section tone="subtle">
        <ChecklistPanel
          module={t("includesModule")}
          title={t("includesTitle")}
          lead={t("includesLead")}
          items={includes}
          extra={<SolutionVisual slug="dta-care" className="rounded-md border border-white/10" />}
        />
        <div className="mt-5 rounded-card border border-dta-gray-200 bg-white p-6 md:p-8">
          <div className="text-sm font-semibold text-dta-gray-600">{t("noteTitle")}</div>
          <p className="mt-2 max-w-3xl leading-relaxed text-dta-black">{t("note")}</p>
        </div>
      </Section>

      {/* Sectores donde más aplica */}
      <Section tone="light">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("sectorsTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("sectorsIntro")}</p>
        </div>
        <SolutionSectorsTabs
          idPrefix="care"
          items={sectorTabs}
          labels={{
            problem: tSol("sectorProblem"),
            solution: t("sectorSolution"),
            example: tSol("sectorExample"),
            illustrative: tSol("sectorIllustrative"),
            viewSector: tc("verSector"),
          }}
        />
      </Section>

      <ConversionCTA
        locale={locale}
        title={t("finalCtaTitle")}
        text={t("ctaText")}
        source="care-page"
        moduleLabel="dta/care"
        includesTitle={t("includesTitle")}
        includes={includes.slice(0, 3)}
        price="$2,500"
        priceSuffix={locale === "en" ? "MXN / month" : "MXN / mes"}
        primaryHref="/contacto?intent=care"
        primaryLabel={t("cta")}
        secondaryHref="/soluciones/dta-digital-audit"
        secondaryLabel={t("ctaSecondary")}
      />
    </div>
  );
}
