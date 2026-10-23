import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Target, Sparkles, Users2, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LocationStrip } from "@/components/sections/LocationStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
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
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
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

      <Section tone="subtle">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("whyTitle")}</h2>
            <ul className="space-y-3">
              {why.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-[15px] text-dta-black/80">
                  <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-dta-gray-200 border-l-4 border-l-dta-blue-600 bg-white p-6 shadow-card">
            <div className="mb-2 text-lg font-bold text-dta-black">{t("missionTitle")}</div>
            <p className="leading-relaxed text-dta-gray-600">{t("missionText")}</p>
          </div>
        </div>
      </Section>

      <LocationStrip headline={t("locationHeadline")} />

      <FinalCTA source="dta-page" title={t("finalCtaTitle")} text={t("finalCtaText")} />
    </div>
  );
}
