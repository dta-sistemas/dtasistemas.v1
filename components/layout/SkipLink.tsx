"use client";

import { useTranslations } from "next-intl";

/** Primer elemento enfocable de la página: permite a usuarios de teclado y lectores de pantalla saltar la navegación. */
export function SkipLink() {
  const t = useTranslations("nav");

  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-dta-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      {t("skipToContent")}
    </a>
  );
}
