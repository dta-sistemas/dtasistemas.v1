import { useTranslations } from "next-intl";
import { Search, CheckCircle2 } from "lucide-react";
import { Section } from "../ui/Section";
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

/**
 * Sección comercial "DTA Digital Audit" de la Home, con el mismo lenguaje que el cierre de las
 * fichas de solución: panel azul marino con barra de módulo (dta/diagnostico). En escritorio es
 * horizontal (titular y precio con botón en una fila, y los 4 entregables en otra fila de 4
 * columnas); en el celular se apila: titular, entregables, precio y botón.
 */
export function DigitalAudit() {
  const t = useTranslations("home");
  const ta = useTranslations("auditPage");
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
          <span>dta/diagnostico</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
        </div>

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2 text-white">{t("auditTitle")}</h2>
            <p className="mt-4 max-w-xl text-body-lg text-white/70">{t("auditText")}</p>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
            <div className="tabular font-serif text-4xl leading-none">
              <span className="mr-2 font-sans text-sm font-medium text-white/60">{tc("desde")}</span>
              <span className="text-dta-blue-300">$4,900</span>
              <span className="ml-1.5 font-sans text-sm font-medium text-white/60">MXN</span>
            </div>
            <TrackedButton
              href="/soluciones/dta-digital-audit"
              variant="light"
              className="w-full !px-8 !py-3.5 sm:w-auto"
              trackLabel="solicitar-diagnostico"
              trackSource="home-digital-audit"
            >
              {tc("solicitarDiagnostico")}
            </TrackedButton>
          </div>
        </div>

        <ul className="grid gap-px border-t border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {ITEM_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-3 bg-dta-navy-900 p-5 text-sm leading-relaxed text-white/85 md:p-6">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-dta-blue-300" aria-hidden="true" />
              {ta(key)}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
