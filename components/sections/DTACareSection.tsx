import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

const ITEM_KEYS = ["soporte", "monitoreo", "evolucion"] as const;

/** DTA Care: franja clara (el azul marino sólido de la Home es solo para el Digital Audit). */
export function DTACareSection() {
  const t = useTranslations("home");
  const ti = useTranslations("careItems");
  const tc = useTranslations("common");

  return (
    <Section tone="light" className="!pb-0 md:!pb-0">
      <div className="grid items-center gap-8 border-y border-dta-gray-200 py-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6">
          <h2 className="text-h2 text-dta-black">{t("careTitle")}</h2>
          <p className="mt-4 text-dta-gray-700">{ITEM_KEYS.map((k) => ti(`${k}.title`)).join(" · ")}</p>
        </div>
        <div className="flex flex-col gap-5 md:col-span-6 md:items-end">
          <div className="tabular font-serif text-3xl text-dta-black">
            <span className="mr-2 font-sans text-sm text-dta-gray-600">{tc("desde")}</span>
            $2,500 <span className="font-sans text-sm text-dta-gray-600">{t("perMonth")}</span>
          </div>
          <Button href="/dta-care" variant="secondary">
            {t("careCta")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
