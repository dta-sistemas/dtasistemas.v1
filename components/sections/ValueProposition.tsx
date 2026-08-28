"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

export function ValueProposition() {
  const t = useTranslations("home");

  return (
    <Section tone="light">
      <div className="max-w-2xl">
        <h2 className="text-h2 text-dta-black">
          {t("valuePropTitle1")}
          <br />
          <span className="text-dta-blue-600">{t("valuePropTitle2")}</span>
        </h2>
        <p className="text-body-lg text-dta-gray-600 mt-4">{t("valuePropText")}</p>
      </div>
    </Section>
  );
}
