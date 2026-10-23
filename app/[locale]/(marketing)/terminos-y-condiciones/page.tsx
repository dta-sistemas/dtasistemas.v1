import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getLegalDoc } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegalDoc("terms", locale);
  return { title: doc.metaTitle, description: doc.metaDescription, alternates: buildAlternates("/terminos-y-condiciones", locale) };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = getLegalDoc("terms", locale);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: doc.title, path: "/terminos-y-condiciones" }], locale)} />
      <LegalPage doc={doc} kind="terms" locale={locale} />
    </>
  );
}
