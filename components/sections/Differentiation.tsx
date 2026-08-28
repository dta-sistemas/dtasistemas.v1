"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

const ITEM_KEYS = ["estrategia", "tecnologia", "datos"] as const;

export function Differentiation() {
  const t = useTranslations("home");
  const ti = useTranslations("diffItems");

  return (
    <Section tone="light">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-h2 text-dta-black">{t("diffTitle")}</h2>
          <p className="text-dta-gray-600 mt-3 max-w-md">{t("diffText")}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {ITEM_KEYS.map((key) => (
            <div key={key} className="rounded-card border border-dta-gray-200 p-5 text-center">
              <div className="text-sm font-bold text-dta-blue-600 uppercase tracking-wide">{ti(`${key}.title`)}</div>
              <div className="text-xs text-dta-gray-600 mt-2">{ti(`${key}.text`)}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
