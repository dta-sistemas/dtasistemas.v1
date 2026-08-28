import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Headphones, Activity, Wrench, TrendingUp, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

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

  const careItems = [
    { icon: Headphones, title: t("item1Title"), description: t("item1Text") },
    { icon: Activity, title: t("item2Title"), description: t("item2Text") },
    { icon: Wrench, title: t("item3Title"), description: t("item3Text") },
    { icon: TrendingUp, title: t("item4Title"), description: t("item4Text") },
  ];
  const includes = [t("include1"), t("include2"), t("include3"), t("include4"), t("include5")];

  return (
    <div>
      <JsonLd
        data={[
          buildServiceSchema({ name: "DTA Care", description: t("intro"), url: "/dta-care", locale }),
          buildBreadcrumbSchema([{ name: "DTA Care", path: "/dta-care" }], locale),
        ]}
      />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: "DTA Care" }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{t("title")}</h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>
          <div className="mt-6 text-2xl font-extrabold text-dta-black">
            {tc("desde")} <span className="text-dta-blue-600">$2,500</span>{" "}
            <span className="text-sm font-medium text-dta-gray-600">MXN / {locale === "en" ? "month" : "mes"}</span>
          </div>
          <div className="mt-4">
            <Button href="/contacto?intent=care" variant="primary">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {careItems.map((it) => (
            <div key={it.title} className="rounded-card border border-dta-gray-200 p-5">
              <it.icon size={20} className="text-dta-blue-600 mb-3" aria-hidden="true" />
              <div className="font-bold text-dta-black text-sm">{it.title}</div>
              <p className="text-sm text-dta-gray-600 mt-1">{it.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="text-h3 text-dta-black mb-4">{t("includesTitle")}</h2>
        <ul className="space-y-3 max-w-xl">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-dta-black/80">
              <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-dta-gray-600 mt-6 max-w-xl">{t("note")}</p>
      </Section>

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("finalCtaTitle")}</h2>
          <div className="flex justify-center mt-5">
            <Button
              href="/contacto?intent=care"
              variant="secondary"
              className="bg-white/10 text-white border-white/20 hover:border-white/40"
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
