import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SolucionesTabsSection } from "@/components/sections/SolucionesTabsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getLocalizedSolutions } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solucionesHub" });
  return { title: t("title1") + " " + t("title2"), description: t("intro"), alternates: buildAlternates("/soluciones", locale) };
}

export default async function SolucionesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solucionesHub" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const solutions = getLocalizedSolutions(locale);
  const tabs = [t("tabAll"), ...solutions.map((s) => s.title)];

  return (
    <div>
      <JsonLd data={buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/soluciones" }], locale)} />

      <PageHero
        breadcrumb={[{ label: t("eyebrow") }]}
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </>
        }
        description={t("intro")}
      />

      <Section tone="light">
        <SolucionesTabsSection tabs={tabs} />

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-card border border-dta-blue-100 bg-dta-blue-50 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-white text-dta-blue-600 shadow-card flex items-center justify-center shrink-0">
              <Search size={20} aria-hidden="true" />
            </div>
            <div>
              <div className="font-bold text-dta-black">{t("auditBoxTitle")}</div>
              <div className="text-sm text-dta-gray-600">{t("auditBoxText")}</div>
            </div>
          </div>
          <Button href="/soluciones/dta-digital-audit" variant="primary">
            {tc("solicitarDiagnostico")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
