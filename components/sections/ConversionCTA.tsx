import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { TrackedButton } from "../analytics/TrackedButton";
import { WHATSAPP_NUMBER } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

/**
 * Cierre de conversión de las fichas de solución: centrado y con peso, para el momento en que
 * el visitante ya vio todo. Recuerda qué incluye el diagnóstico (DTA Digital Audit, la oferta
 * de entrada), el precio de partida y un solo botón principal; el secundario (especialista) y
 * el WhatsApp (solo si hay número real configurado) quedan en segundo plano.
 */
export async function ConversionCTA({ locale, title, text, source }: { locale: AppLocale; title: string; text: string; source: string }) {
  const t = await getTranslations({ locale, namespace: "solutionDetail" });
  const ta = await getTranslations({ locale, namespace: "auditPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const includes = [ta("receive1"), ta("receive2"), ta("receive3")];

  return (
    <Section tone="light">
      <div data-tone="dark" className="overflow-hidden rounded-card bg-dta-navy-900 text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/55">
          <span>dta/{locale === "en" ? "assessment" : "diagnostico"}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
        </div>

        <div className="mx-auto max-w-3xl px-6 py-14 text-center md:px-10 md:py-20">
          <h2 className="mx-auto max-w-2xl text-h2 text-white md:text-[3.25rem] md:leading-[1.08]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/70">{text}</p>

          <div className="mt-10 text-left">
            <div className="mb-3 text-center text-sm font-semibold text-white/60">{t("ctaIncludes")}</div>
            <ul className="grid gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 md:grid-cols-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-dta-navy-900 p-5 text-sm leading-relaxed text-white/85">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-dta-blue-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="tabular mt-10 font-serif text-4xl leading-none">
            <span className="mr-2 font-sans text-sm font-medium text-white/60">{tc("desde")}</span>
            <span className="text-dta-blue-300">$4,900</span>
            <span className="ml-1.5 font-sans text-sm font-medium text-white/60">MXN</span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedButton
              href="/contacto?intent=audit"
              variant="light"
              className="w-full !px-8 !py-4 text-base sm:w-auto"
              trackLabel="solicitar-diagnostico"
              trackSource={source}
            >
              {tc("solicitarDiagnostico")}
            </TrackedButton>
            <Button href="/contacto" variant="ghost-light" showArrow={false} className="w-full !py-4 sm:w-auto">
              {t("ctaSecondary")}
            </Button>
            {WHATSAPP_NUMBER && (
              <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="ghost-light" showArrow={false} className="w-full !py-4 sm:w-auto">
                {tc("whatsapp")}
              </Button>
            )}
          </div>

          <p className="mt-6 text-sm text-white/50">{t("ctaNote")}</p>
        </div>
      </div>
    </Section>
  );
}
