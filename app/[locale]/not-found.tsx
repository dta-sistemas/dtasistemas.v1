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
    <Section tone="subtle" className="relative isolate flex min-h-[65vh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <div className="mx-auto max-w-md text-center">
        <div aria-hidden="true" className="select-none text-[7rem] font-extrabold leading-none tracking-tighter text-dta-blue-600/15 md:text-[9rem]">
          404
        </div>
        <div className="-mt-6 mb-3 inline-flex items-center gap-2 text-label uppercase text-dta-blue-600 md:-mt-8">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {t("eyebrow")}
        </div>
        <h1 className="text-h1 text-dta-black">{t("title")}</h1>
        <p className="mt-4 text-body-lg text-dta-gray-600">{t("text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
