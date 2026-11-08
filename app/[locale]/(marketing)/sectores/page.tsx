import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectorGrid } from "@/components/sections/SectorGrid";
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
            {t("title1")} {t("title2")}
          </>
        }
        description={t("intro")}
      />

      <Section tone="light">
        <SectorGrid rows={sectors} />

        <div className="mt-10 max-w-2xl border-t border-dta-black pt-6">
          <div className="font-serif text-2xl text-dta-black">{t("otherTitle")}</div>
          <p className="mt-2 text-dta-gray-700">
            {t("otherText")}{" "}
            <Link href={otherCard.href} className="font-semibold text-dta-blue-600 underline underline-offset-4">
              {t("otherLink")}
            </Link>
            .
          </p>
        </div>
      </Section>
    </div>
  );
}
