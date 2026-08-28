"use client";

import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";
import { TrackedButton } from "../analytics/TrackedButton";

type FinalCTAProps = {
  title: string;
  text: string;
  /** Identifica en qué página vive este CTA para el evento cta_click (Home vs /dta). */
  source?: string;
};

/** Sección de cierre — un solo CTA (regla 46 del brief). Reutilizada en Home y /dta, cada una pasa su propio title/text ya traducido. */
export function FinalCTA({ title, text, source = "final-cta" }: FinalCTAProps) {
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-h2 text-dta-black">{title}</h2>
        <p className="text-dta-gray-600 mt-3">{text}</p>
        <div className="flex justify-center mt-6">
          <TrackedButton href="/contacto" variant="primary" trackLabel="hablar-con-dta" trackSource={source}>
            {tc("hablarConDTA")}
          </TrackedButton>
        </div>
        <div className="text-xs text-dta-gray-600/70 mt-6">
          Cancún · Playa del Carmen · Riviera Maya · Mérida · México
        </div>
      </div>
    </Section>
  );
}
