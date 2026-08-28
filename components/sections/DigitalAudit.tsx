"use client";

import { useTranslations } from "next-intl";
import { Search, CheckCircle2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

const ITEM_KEYS = ["receive1", "receive2", "receive3", "receive4"] as const;

/** Sección comercial "DTA Digital Audit" en Home — reutiliza las mismas claves que /soluciones/dta-digital-audit. */
export function DigitalAudit() {
  const t = useTranslations("home");
  const ta = useTranslations("auditPage");
  const tc = useTranslations("common");

  return (
    <Section tone="subtle">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-card bg-white border border-dta-gray-200 p-6 aspect-video flex items-center justify-center text-dta-gray-200">
          <Search size={48} aria-hidden="true" />
        </div>
        <div>
          <div className="text-label uppercase text-dta-blue-600 mb-2">{t("auditEyebrow")}</div>
          <h2 className="text-h2 text-dta-black">{t("auditTitle")}</h2>
          <p className="text-dta-gray-600 mt-3">{t("auditText")}</p>
          <ul className="mt-4 space-y-2">
            {ITEM_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-dta-black/80">
                <CheckCircle2 size={14} className="text-dta-blue-600 shrink-0" aria-hidden="true" /> {ta(key)}
              </li>
            ))}
          </ul>
          <div className="mt-5 text-2xl font-extrabold text-dta-black">
            {tc("desde")} <span className="text-dta-blue-600">$4,900</span>{" "}
            <span className="text-sm font-medium text-dta-gray-600">MXN</span>
          </div>
          <div className="mt-4">
            <Button href="/soluciones/dta-digital-audit" variant="primary">
              {tc("solicitarDiagnostico")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
