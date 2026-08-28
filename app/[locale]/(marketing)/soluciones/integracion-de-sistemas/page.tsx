import type { Metadata } from "next";
import { SolutionDetail } from "@/components/sections/SolutionDetail";
import { getLocalizedSolutionBySlug } from "@/lib/i18n/localizedContent";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const solution = getLocalizedSolutionBySlug("integracion-de-sistemas", locale)!;
  return {
    title: solution.seo.metaTitle,
    description: solution.seo.metaDescription,
    alternates: buildAlternates(solution.href, locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const solution = getLocalizedSolutionBySlug("integracion-de-sistemas", locale)!;
  return <SolutionDetail solution={solution} locale={locale} />;
}
