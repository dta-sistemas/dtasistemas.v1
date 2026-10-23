"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const ITEM_KEYS = ["estrategia", "tecnologia", "datos"] as const;

export function Differentiation() {
  const t = useTranslations("home");
  const ti = useTranslations("diffItems");

  return (
    <Section tone="light">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <h2 className="text-h2 text-dta-black">{t("diffTitle")}</h2>
          <p className="mt-4 max-w-md text-body-lg text-dta-gray-600">{t("diffText")}</p>
        </Reveal>
        {/* Móvil: apiladas (antes 3 columnas con texto de 12px en pantallas de 375px). */}
        <div className="grid gap-4 sm:grid-cols-3">
          {ITEM_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 90} className="h-full">
              <div className="h-full rounded-card border border-dta-gray-200 border-t-2 border-t-dta-blue-600 bg-white p-5 shadow-card">
                <div className="text-sm font-bold uppercase tracking-wide text-dta-blue-600">{ti(`${key}.title`)}</div>
                <div className="mt-2 text-sm leading-relaxed text-dta-gray-600">{ti(`${key}.text`)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
