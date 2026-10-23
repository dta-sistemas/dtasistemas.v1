"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { TrackedButton } from "../analytics/TrackedButton";

type FinalCTAProps = {
  title: string;
  text: string;
  /** Identifica en qué página vive este CTA para el evento cta_click (Home vs /dta). */
  source?: string;
};

/**
 * Sección de cierre — un solo CTA (regla 46 del brief). Reutilizada en Home y /dta,
 * cada una pasa su propio title/text ya traducido.
 *
 * Panel claro con un tinte azul muy suave. Se evita a propósito el navy: la Home
 * ya tiene Hero oscuro + DTA Care oscuro + footer navy, y la regla de marca limita
 * los bloques oscuros por página (Design System, Fase 0 sección 5.1).
 */
export function FinalCTA({ title, text, source = "final-cta" }: FinalCTAProps) {
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-dta-gray-200 bg-gradient-to-br from-dta-blue-50 via-white to-dta-gray-50 px-6 py-14 text-center md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-dta-blue-600/10 blur-3xl"
          />
          <h2 className="mx-auto max-w-xl text-h2 text-dta-black">{title}</h2>
          <p className="mx-auto mt-4 max-w-md text-body-lg text-dta-gray-600">{text}</p>
          <div className="mt-8 flex justify-center">
            <TrackedButton href="/contacto" variant="primary" trackLabel="hablar-con-dta" trackSource={source}>
              {tc("hablarConDTA")}
            </TrackedButton>
          </div>
          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-dta-gray-600">
            <MapPin size={12} aria-hidden="true" />
            Cancún · Playa del Carmen · Riviera Maya · Mérida · México
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
