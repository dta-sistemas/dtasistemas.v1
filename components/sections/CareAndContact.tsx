import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { TrackedButton } from "../analytics/TrackedButton";
import { WHATSAPP_NUMBER } from "@/lib/site";

const ITEM_KEYS = ["soporte", "monitoreo", "evolucion"] as const;

/**
 * Las dos últimas secciones de la Home en una sola fila, mitad y mitad: a la izquierda DTA Care
 * (el servicio de continuidad) y a la derecha el cierre con la acción principal. En el celular se
 * apilan. Reemplaza a DTACareSection + FinalCTA solo en la Home (FinalCTA sigue en /dta).
 */
export function CareAndContact({ title, text }: { title: string; text: string }) {
  const t = useTranslations("home");
  const ti = useTranslations("careItems");
  const tc = useTranslations("common");

  return (
    <Section tone="light" className="!pt-0 md:!pt-0">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Izquierda: DTA Care */}
        <div className="flex flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-white/10 bg-dta-navy-800 px-5 py-2.5 font-mono text-xs text-white/55">
            <span>{t("careModule")}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20" />
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h2 className="text-h2 text-dta-black">{t("careTitle")}</h2>
            <p className="mt-3 text-dta-gray-700">{t("careLead")}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {ITEM_KEYS.map((k) => (
                <li key={k} className="rounded border border-dta-gray-300 bg-dta-gray-50 px-2 py-1 font-mono text-xs text-dta-gray-700">
                  {ti(`${k}.title`)}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
              <div className="tabular font-serif text-3xl text-dta-black">
                <span className="mr-2 font-sans text-sm text-dta-gray-600">{tc("desde")}</span>
                $2,500 <span className="font-sans text-sm text-dta-gray-600">{t("perMonth")}</span>
              </div>
              <Button href="/dta-care" variant="secondary">
                {t("careCta")}
              </Button>
            </div>
          </div>
        </div>

        {/* Derecha: cierre */}
        <div className="flex flex-col overflow-hidden rounded-card border border-dta-blue-100 bg-dta-blue-50">
          <div className="flex items-center justify-between border-b border-dta-blue-100 px-5 py-2.5 font-mono text-xs text-dta-gray-600">
            <span>dta/contacto</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/20" />
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h2 className="text-h2 text-dta-black">{title}</h2>
            <p className="mt-3 max-w-md text-dta-gray-700">{text}</p>
            <div className="mt-auto pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <TrackedButton href="/contacto" variant="primary" trackLabel="hablar-con-dta" trackSource="final-cta">
                  {tc("hablarConDTA")}
                </TrackedButton>
                {WHATSAPP_NUMBER && (
                  <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="secondary" showArrow={false}>
                    {tc("whatsapp")}
                  </Button>
                )}
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-sm text-dta-gray-600">
                <MapPin size={14} aria-hidden="true" />
                Cancún, Playa del Carmen, Riviera Maya, Mérida
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
