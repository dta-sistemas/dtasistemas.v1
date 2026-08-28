import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SolucionesTabsSection } from "@/components/sections/SolucionesTabsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getLocalizedSolutions } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

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

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
            <h1 className="text-display-sm md:text-h2 text-dta-black">
              {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
            </h1>
            <p className="text-dta-gray-600 mt-4">{t("intro")}</p>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <SolucionesTabsSection tabs={tabs} />

        <div className="mt-10 rounded-card bg-dta-gray-50 border border-dta-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-dta-blue-100 text-dta-blue-600 flex items-center justify-center shrink-0">
              <Search size={20} aria-hidden="true" />
            </div>
            <div>
              <div className="font-bold text-dta-black">{t("auditBoxTitle")}</div>
              <div className="text-sm text-dta-gray-600">{t("auditBoxText")}</div>
            </div>
          </div>
          <Button href="/soluciones/dta-digital-audit" variant="secondary">
            {tc("solicitarDiagnostico")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
