import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Pillars } from "@/components/sections/Pillars";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Differentiation } from "@/components/sections/Differentiation";
import { SectorsSection } from "@/components/sections/SectorsSection";
import { ProjectsInAction } from "@/components/sections/ProjectsInAction";
import { DigitalAudit } from "@/components/sections/DigitalAudit";
import { DTACareSection } from "@/components/sections/DTACareSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: { absolute: `DTA Sistemas — ${t("heroTitle1")}` },
    description: t("heroSubtitle"),
    alternates: buildAlternates("/", locale),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <Hero />
      <ValueProposition />
      <Pillars />
      <ProblemsSection />
      <ProcessSection title={t("processTitle")} />
      <Differentiation />
      <SectorsSection />
      <ProjectsInAction />
      <DigitalAudit />
      <DTACareSection />
      <FinalCTA title={t("finalCtaTitle")} text={t("finalCtaText")} source="final-cta" />
    </>
  );
}
