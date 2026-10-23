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
  const doc = getLegalDoc("privacy", locale);
  return { title: doc.metaTitle, description: doc.metaDescription, alternates: buildAlternates("/aviso-de-privacidad", locale) };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = getLegalDoc("privacy", locale);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: doc.title, path: "/aviso-de-privacidad" }], locale)} />
      <LegalPage doc={doc} kind="privacy" locale={locale} />
    </>
  );
}
