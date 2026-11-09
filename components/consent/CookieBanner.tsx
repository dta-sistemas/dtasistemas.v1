"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "./ConsentProvider";

/**
 * Aviso de cookies. Aceptar y rechazar tienen el MISMO peso visual (ninguno empuja al visitante
 * a aceptar), y "Personalizar" abre el detalle por categoría. No bloquea la página: es un
 * panel no modal en la esquina; el sitio se puede usar sin decidir y entonces no se carga
 * ninguna analítica.
 */
export function CookieBanner() {
  const t = useTranslations("cookies");
  const { open, analytics, decided, save, closePanel } = useConsent();
  const [custom, setCustom] = useState(false);
  const [draft, setDraft] = useState(false);

  // Al abrir el panel, el interruptor parte del estado actual (o apagado si aún no hay decisión).
  useEffect(() => {
    if (open) setDraft(analytics);
  }, [open, analytics]);

  if (!open) return null;

  const btn =
    "inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-card border border-dta-gray-200 bg-white p-5 shadow-card-hover sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
    >
      <h2 id="cookie-title" className="font-serif text-xl leading-tight text-dta-black">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-dta-gray-700">
        {t("text")}{" "}
        <Link href="/aviso-de-privacidad" className="font-semibold text-dta-blue-600 underline underline-offset-2">
          {t("privacy")}
        </Link>
      </p>

      {custom && (
        <div className="mt-4 divide-y divide-dta-gray-200 rounded-input border border-dta-gray-200 text-sm">
          <div className="flex items-start justify-between gap-4 p-3.5">
            <div>
              <div className="font-semibold text-dta-black">{t("necessaryTitle")}</div>
              <p className="mt-0.5 leading-relaxed text-dta-gray-600">{t("necessaryText")}</p>
            </div>
            <span className="mt-0.5 shrink-0 rounded border border-dta-gray-300 px-1.5 py-0.5 font-mono text-[11px] text-dta-gray-600">{t("alwaysOn")}</span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 p-3.5">
            <div>
              <div className="font-semibold text-dta-black">{t("analyticsTitle")}</div>
              <p className="mt-0.5 leading-relaxed text-dta-gray-600">{t("analyticsText")}</p>
            </div>
            <input
              type="checkbox"
              role="switch"
              checked={draft}
              onChange={(e) => setDraft(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dta-blue-600 ${
                draft ? "bg-dta-blue-600" : "bg-dta-gray-300"
              }`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-150 ${draft ? "left-[22px]" : "left-0.5"}`} />
            </span>
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {custom ? (
          <button type="button" onClick={() => save(draft)} className={`${btn} bg-dta-black text-white hover:bg-dta-navy-800`}>
            {t("save")}
          </button>
        ) : (
          <>
            <button type="button" onClick={() => save(false)} className={`${btn} border border-dta-gray-300 text-dta-black hover:border-dta-black`}>
              {t("reject")}
            </button>
            <button type="button" onClick={() => save(true)} className={`${btn} border border-dta-gray-300 text-dta-black hover:border-dta-black`}>
              {t("accept")}
            </button>
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        {!custom ? (
          <button type="button" onClick={() => setCustom(true)} className="font-semibold text-dta-blue-600 underline underline-offset-2">
            {t("customize")}
          </button>
        ) : (
          <button type="button" onClick={() => setCustom(false)} className="font-semibold text-dta-blue-600 underline underline-offset-2">
            {t("back")}
          </button>
        )}
        {decided && (
          <button type="button" onClick={closePanel} className="text-dta-gray-600 underline underline-offset-2">
            {t("close")}
          </button>
        )}
      </div>
    </div>
  );
}
