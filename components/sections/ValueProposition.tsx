import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

export function ValueProposition() {
  const t = useTranslations("home");

  return (
    <Section tone="light">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <h2 className="text-h2 text-dta-black md:col-span-7">
          {t("valuePropTitle1")} {t("valuePropTitle2")}
        </h2>
        <p className="text-body-lg text-dta-gray-600 md:col-span-5 md:pt-2">{t("valuePropText")}</p>
      </div>
    </Section>
  );
}
