import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Target, Sparkles, Users2, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LocationStrip } from "@/components/sections/LocationStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildAboutPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

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

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: "DTA" }]} />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
            <h1 className="text-display-sm md:text-h2 text-dta-black">
              {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
            </h1>
            <p className="text-dta-gray-600 mt-4">{t("intro")}</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {introPoints.map((it) => (
                <div key={it.title}>
                  <it.icon size={18} className="text-dta-blue-600 mb-2" aria-hidden="true" />
                  <div className="text-xs font-bold text-dta-black">{it.title}</div>
                  <div className="text-[11px] text-dta-gray-600 mt-1">{it.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-card bg-gradient-to-br from-dta-navy-900 to-dta-navy-800 aspect-video flex items-center justify-center text-white/30 text-sm">
            {t("photoPlaceholder")}
          </div>
        </div>
      </Section>

      <ProcessSection title={t("processTitle")} tone="light" />

      <Section tone="subtle">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("whyTitle")}</h2>
            <ul className="space-y-3">
              {why.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-dta-black/80">
                  <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-white border border-dta-gray-200 p-6">
            <div className="font-bold text-dta-black mb-2">{t("missionTitle")}</div>
            <p className="text-sm text-dta-gray-600 leading-relaxed">{t("missionText")}</p>
          </div>
        </div>
      </Section>

      <LocationStrip headline={t("locationHeadline")} />

      <FinalCTA source="dta-page" title={t("finalCtaTitle")} text={t("finalCtaText")} />
    </div>
  );
}
