import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectorCard } from "@/components/cards/SectorCard";
import { Link } from "@/i18n/navigation";
import { getLocalizedSectors, getLocalizedOtherSectorsCard } from "@/lib/i18n/localizedContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

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

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sectors.map((s) => (
            <SectorCard key={s.slug} name={s.name} tags={s.tags} image={s.image} icon={s.icon} href={s.href} />
          ))}
        </div>

        <div className="mt-6 rounded-card border border-dashed border-dta-gray-200 bg-dta-gray-50 p-6 text-center">
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
