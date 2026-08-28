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
    <Section tone="dark">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-md">
          <div className="text-label uppercase text-blue-300 mb-2">{t("careEyebrow")}</div>
          <h2 className="text-h2">{t("careTitle")}</h2>
          <div className="mt-6 flex gap-6">
            {ITEM_KEYS.map((key, i) => (
              <div key={key} className="flex flex-col gap-2">
                <IconCircle icon={ICONS[i]} tone="dark" />
                <div className="text-sm font-semibold">{ti(`${key}.title`)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-left md:text-right">
          <div className="text-2xl font-extrabold">
            {tc("desde")} <span className="text-blue-300">$2,500</span>{" "}
            <span className="text-sm font-medium text-white/60">{t("perMonth")}</span>
          </div>
          <div className="mt-4">
            <Button
              href="/dta-care"
              variant="secondary"
              className="bg-white/10 text-white border-white/20 hover:border-white/40"
            >
              {t("careCta")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
