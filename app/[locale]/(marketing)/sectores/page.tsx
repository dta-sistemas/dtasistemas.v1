import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectorCard } from "@/components/cards/SectorCard";
import { Link } from "@/i18n/navigation";
import { getLocalizedSectors, getLocalizedOtherSectorsCard } from "@/lib/i18n/localizedContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectoresHub" });
  return { title: t("title1") + " " + t("title2"), description: t("intro"), alternates: buildAlternates("/sectores", locale) };
}

export default async function SectoresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sectoresHub" });
  const sectors = getLocalizedSectors(locale);
  const otherCard = getLocalizedOtherSectorsCard(locale);

  return (
    <div>
      <JsonLd data={buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/sectores" }], locale)} />

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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {sectors.map((s) => (
            <SectorCard key={s.slug} name={s.name} tags={s.tags} image={s.image} icon={s.icon} href={s.href} />
          ))}
        </div>

        <div className="mt-8 rounded-card border-2 border-dashed border-dta-gray-300 bg-dta-gray-50 p-8 text-center">
          <div className="font-bold text-dta-black text-sm">{t("otherTitle")}</div>
          <p className="text-sm text-dta-gray-600 mt-1">
            {t("otherText")}{" "}
            <Link href={otherCard.href} className="text-dta-blue-600 font-semibold hover:underline">
              {t("otherLink")}
            </Link>
            .
          </p>
        </div>
      </Section>
    </div>
  );
}
