import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Headphones, Activity, Wrench, TrendingUp, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";

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

      <Section tone="light">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {careItems.map((it) => (
            <div key={it.title} className="group rounded-card border border-dta-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:shadow-card-hover">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-dta-blue-100 text-dta-blue-600 transition-colors duration-300 group-hover:bg-dta-blue-600 group-hover:text-white">
                <it.icon size={20} aria-hidden="true" />
              </div>
              <div className="font-bold text-dta-black">{it.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-dta-gray-600">{it.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="text-h3 text-dta-black mb-4">{t("includesTitle")}</h2>
        <ul className="space-y-3 max-w-xl">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-dta-black/80">
              <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-xl text-sm text-dta-gray-600">{t("note")}</p>
      </Section>

      <CTABand title={t("finalCtaTitle")} href="/contacto?intent=care" label={t("cta")} />
    </div>
  );
}
