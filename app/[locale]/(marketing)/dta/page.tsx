import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Target, Sparkles, Users2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LocationStrip } from "@/components/sections/LocationStrip";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { NumberedGrid } from "@/components/sections/NumberedBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildAboutPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dtaPage" });
  return { title: t("title1") + " " + t("title2"), description: t("intro"), alternates: buildAlternates("/dta", locale) };
}

/**
 * /dta — Fase 0, sección 12. Localizada completamente en Fase 13 (namespace
 * "dtaPage" en messages/{locale}.json).
 */
export default async function DTAPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dtaPage" });

  const introPoints = [
    { icon: Target, title: t("point1Title"), text: t("point1Text") },
    { icon: Sparkles, title: t("point2Title"), text: t("point2Text") },
    { icon: Users2, title: t("point3Title"), text: t("point3Text") },
  ];
  const why = [t("why1"), t("why2"), t("why3"), t("why4"), t("why5")];

  return (
    <div>
      <JsonLd
        data={[
          buildAboutPageSchema({ description: t("intro"), url: "/dta", locale }),
          buildBreadcrumbSchema([{ name: "DTA", path: "/dta" }], locale),
        ]}
      />

      <PageHero
        breadcrumb={[{ label: "DTA" }]}
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title1")} {t("title2")}
          </>
        }
        description={t("intro")}
        aside={
          <HeroPanel>
            <ul className="space-y-6">
              {introPoints.map((it) => (
                <li key={it.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-dta-blue-300">
                    <it.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-bold">{it.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </HeroPanel>
        }
      />


      <ProcessSection title={t("processTitle")} tone="light" />

      {/* Por qué elegir DTA: cinco razones con numeral grande (3 arriba y 2 más anchas abajo) */}
      <Section tone="subtle">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("whyTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("whyLead")}</p>
        </div>
        <NumberedGrid
          className="md:grid-cols-6"
          itemClassName={(i) => (i < 3 ? "md:col-span-2" : "md:col-span-3")}
          items={why.map((w) => ({ text: w }))}
        />
      </Section>

      {/* Misión: bloque azul marino */}
      <Section tone="light">
        <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
            <span>{t("missionModule")}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-10">
            <div className="md:col-span-4">
              <h2 className="text-h2 text-white">{t("missionTitle")}</h2>
              <span aria-hidden="true" className="mt-5 inline-block h-1 w-12 rounded-full bg-dta-blue-600" />
            </div>
            <p className="font-serif text-2xl leading-snug text-white md:col-span-8 md:text-[1.9rem] md:leading-snug">{t("missionText")}</p>
          </div>
        </div>
      </Section>

      <LocationStrip headline={t("locationHeadline")} module={t("locationModule")} />

      <ConversionCTA locale={locale} title={t("finalCtaTitle")} text={t("finalCtaText")} source="dta-page" />
    </div>
  );
}
