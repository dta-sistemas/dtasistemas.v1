"use client";

import { useTranslations } from "next-intl";
import { Search, CheckCircle2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { TrackedButton } from "../analytics/TrackedButton";

const ITEM_KEYS = ["receive1", "receive2", "receive3", "receive4"] as const;

/**
 * Ilustración decorativa de un "reporte de diagnóstico". Reemplaza el ícono gris
 * sobre caja vacía (se veía como un placeholder sin terminar). Son formas
 * abstractas a propósito: no muestra cifras ni resultados inventados.
 */
export function AuditPreview() {
  const rows = [78, 56, 66, 42];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-dta-blue-100 via-transparent to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-card border border-dta-gray-200 bg-white shadow-card-hover">
        <div className="flex items-center gap-1.5 border-b border-dta-gray-200 bg-dta-gray-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-dta-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-dta-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-dta-gray-300" />
          <span className="ml-3 h-2 w-28 rounded-full bg-dta-gray-200" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-5">
            <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#E4E7EC" strokeWidth="7" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#1B4DE0"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="163.4"
                strokeDashoffset="49"
              />
            </svg>
            <div className="flex-1 space-y-2.5">
              <div className="h-3 w-2/3 rounded-full bg-dta-navy-900" />
              <div className="h-2 w-full rounded-full bg-dta-gray-200" />
              <div className="h-2 w-4/5 rounded-full bg-dta-gray-200" />
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-dta-gray-200 pt-5">
            {rows.map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="shrink-0 text-dta-blue-600" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-dta-gray-100">
                  <div className="h-full rounded-full bg-dta-blue-600/80" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-3 grid h-14 w-14 place-items-center rounded-2xl bg-dta-navy-900 text-white shadow-card-hover ring-4 ring-dta-gray-50 sm:-right-5">
        <Search size={22} />
      </div>
    </div>
  );
}

/** Sección comercial "DTA Digital Audit" en Home — reutiliza las mismas claves que /soluciones/dta-digital-audit. */
export function DigitalAudit() {
  const t = useTranslations("home");
  const ta = useTranslations("auditPage");
  const tc = useTranslations("common");

  return (
    <Section tone="subtle" className="overflow-hidden">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <AuditPreview />
        </Reveal>
        <Reveal delay={100}>
          <div className="mb-3 inline-flex items-center gap-2 text-label uppercase text-dta-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {t("auditEyebrow")}
          </div>
          <h2 className="text-h2 text-dta-black">{t("auditTitle")}</h2>
          <p className="mt-4 text-body-lg text-dta-gray-600">{t("auditText")}</p>
          <ul className="mt-6 space-y-3">
            {ITEM_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2.5 text-[15px] text-dta-gray-700">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-dta-blue-600" aria-hidden="true" /> {ta(key)}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="text-3xl font-extrabold tracking-tight text-dta-black">
              <span className="mr-1.5 text-sm font-medium text-dta-gray-600">{tc("desde")}</span>
              <span className="text-dta-blue-600">$4,900</span>{" "}
              <span className="text-sm font-medium text-dta-gray-600">MXN</span>
            </div>
            {/* Antes era <Button> sin tracking; es un CTA de alto valor, igual que Hero y CTA final. */}
            <TrackedButton
              href="/soluciones/dta-digital-audit"
              variant="primary"
              trackLabel="solicitar-diagnostico"
              trackSource="home-digital-audit"
            >
              {tc("solicitarDiagnostico")}
            </TrackedButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
