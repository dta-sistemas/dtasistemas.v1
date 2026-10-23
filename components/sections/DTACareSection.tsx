"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Clock, BarChart3 } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { IconCircle } from "../ui/Badge";

const ITEM_KEYS = ["soporte", "monitoreo", "evolucion"] as const;
const ICONS = [ShieldCheck, Clock, BarChart3];

export function DTACareSection() {
  const t = useTranslations("home");
  const ti = useTranslations("careItems");
  const tc = useTranslations("common");

  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-dta-blue-600/20 blur-[110px]"
      />
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 text-label uppercase text-dta-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {t("careEyebrow")}
          </div>
          <h2 className="max-w-md text-h2">{t("careTitle")}</h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {ITEM_KEYS.map((key, i) => (
              <div key={key} className="flex items-center gap-3">
                <IconCircle icon={ICONS[i]} tone="dark" />
                <div className="text-sm font-semibold">{ti(`${key}.title`)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-white/10 bg-white/5 p-6 text-left backdrop-blur md:min-w-[18rem]">
          <div className="text-3xl font-extrabold tracking-tight">
            <span className="mr-1.5 text-sm font-medium text-white/60">{tc("desde")}</span>
            <span className="text-dta-blue-300">$2,500</span>{" "}
            <span className="text-sm font-medium text-white/60">{t("perMonth")}</span>
          </div>
          <div className="mt-5">
            <Button href="/dta-care" variant="light" className="w-full">
              {t("careCta")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
