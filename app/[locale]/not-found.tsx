import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section tone="subtle" className="min-h-[60vh] flex items-center">
      <div className="text-center max-w-md mx-auto">
        <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
        <h1 className="text-display-sm text-dta-black">{t("title")}</h1>
        <p className="text-dta-gray-600 mt-4">{t("text")}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Button href="/" variant="primary">
            {t("cta1")}
          </Button>
          <Button href="/soluciones" variant="secondary">
            {t("cta2")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
