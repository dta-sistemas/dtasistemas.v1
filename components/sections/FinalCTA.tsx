import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { TrackedButton } from "../analytics/TrackedButton";
import { WHATSAPP_NUMBER } from "@/lib/site";

type FinalCTAProps = {
  title: string;
  text: string;
  /** Identifica en qué página vive este CTA para el evento cta_click (Home vs /dta). */
  source?: string;
};

/**
 * Cierre: un titular, una acción principal y, si hay número configurado, el canal que
 * más usa el mercado local (WhatsApp). Sin paneles ni resplandores.
 */
export function FinalCTA({ title, text, source = "final-cta" }: FinalCTAProps) {
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <div className="max-w-2xl">
        <h2 className="text-h2 text-dta-black">{title}</h2>
        <p className="mt-4 max-w-xl text-body-lg text-dta-gray-600">{text}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <TrackedButton href="/contacto" variant="primary" trackLabel="hablar-con-dta" trackSource={source}>
            {tc("hablarConDTA")}
          </TrackedButton>
          {WHATSAPP_NUMBER && (
            <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="secondary" showArrow={false}>
              {tc("whatsapp")}
            </Button>
          )}
        </div>
        <p className="mt-8 text-sm text-dta-gray-600">Cancún, Playa del Carmen, Riviera Maya, Mérida</p>
      </div>
    </Section>
  );
}
