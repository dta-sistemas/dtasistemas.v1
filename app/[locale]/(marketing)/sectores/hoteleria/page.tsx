import type { Metadata } from "next";
import { SectorDetail } from "@/components/sections/SectorDetail";
import { getLocalizedSectorBySlug } from "@/lib/i18n/localizedContent";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sector = getLocalizedSectorBySlug("hoteleria", locale)!;
  return {
    title: sector.seo.metaTitle,
    description: sector.seo.metaDescription,
    alternates: buildAlternates(sector.href, locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const sector = getLocalizedSectorBySlug("hoteleria", locale)!;
  return <SectorDetail sector={sector} locale={locale} />;
}
