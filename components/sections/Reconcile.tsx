"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SystemWindow } from "../ui/SystemWindow";

type Source = { name: string; today: string };

const STEP_MS = 150; // retardo entre columna y columna al sincronizar
const AUTOPLAY_MS = 2200; // espera antes de resolver por sí sola
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"; // exponencial: arranca rápido, asienta suave

/**
 * La demostración central del Hero: una misma reserva aparece distinta en cuatro
 * herramientas (Excel, Booking, WhatsApp, el sistema de la recepción) y, al conectarlas,
 * queda una sola versión.
 *
 * Es el ÚNICO momento animado del sitio. La regla de color es el concepto de marca:
 * el azul solo significa "conectado". Lo desconectado va en gris. Se presenta como una
 * consola de sistema (ventana, estados por fuente y registro) sobre el Hero azul marino.
 *
 *  - Se ve el conflicto primero; a los ~2 s la línea se dibuja de izquierda a derecha,
 *    una sola vez. Con `prefers-reduced-motion` aparece ya resuelto, sin movimiento.
 *  - El visitante puede alternar "Hoy" / "Con DTA" cuando quiera; cualquier clic
 *    cancela el autoplay y responde de inmediato (nunca queda esperando una animación).
 *  - Solo se animan transform y grid-template-rows. Todo el texto es DOM real (SEO y
 *    lectores de pantalla); el resultado se anuncia con aria-live.
 */
export function Reconcile() {
  const t = useTranslations("home.ledger");
  const sources = t.raw("sources") as Source[];
  const total = sources.length;

  const [progress, setProgress] = useState(0); // columnas ya conectadas (0..total)
  const [target, setTarget] = useState(false); // ¿hacia dónde va la animación?
  const [reduced, setReduced] = useState(false); // prefers-reduced-motion: saltar la animación
  const touched = useRef(false);

  // Autoplay una sola vez (o directo al estado final con movimiento reducido).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReduced(true);
      setTarget(true);
      return;
    }
    const id = window.setTimeout(() => {
      if (!touched.current) setTarget(true);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [total]);

  // Hacia "Con DTA": una columna cada STEP_MS. Hacia "Hoy": vuelve de inmediato.
  useEffect(() => {
    if (!target) {
      setProgress(0);
      return;
    }
    if (reduced) {
      setProgress(total); // sin pasos intermedios ni transiciones
      return;
    }
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= total) {
          window.clearInterval(id);
          return p;
        }
        return p + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [target, total, reduced]);

  const choose = useCallback((next: boolean) => {
    touched.current = true;
    setTarget(next);
  }, []);

  const resolved = progress >= total;
  const logToday = t.raw("logToday") as string[];
  const logSynced = t.raw("logSynced") as string[];
  // El registro cambia de lugar, no crece: en "Hoy" muestra el conflicto; al sincronizar lo
  // reemplaza por las líneas de resolución, una por cada fuente que se conecta.
  const log = progress === 0 ? logToday : logSynced.slice(0, Math.min(logSynced.length, progress));

  return (
    <div className="h-full" data-resolved={resolved}>
      <SystemWindow title={t("windowTitle")} status={t("windowStatus")} className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 border-b border-white/10 px-5 py-3">
          <p className="text-[15px] font-medium text-white">{t("title")}</p>
          <div role="group" aria-label={`${t("todayLabel")} / ${t("withLabel")}`} className="flex rounded-full border border-white/20 p-0.5 text-sm">
            {[
              { label: t("todayLabel"), value: false },
              { label: t("withLabel"), value: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={target === o.value}
                onClick={() => choose(o.value)}
                className={`rounded-full px-4 py-1 font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-300 ${
                  target === o.value ? "bg-white text-dta-navy-900" : "text-white/65 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <ol className="grid grid-cols-2 lg:grid-cols-4">
          {sources.map((s, i) => {
            const synced = i < progress;
            // En "Hoy" las fuentes que no coinciden con la primera se marcan con subrayado punteado.
            const differs = !synced && s.today !== sources[0].today;
            return (
              <li key={s.name} className="relative px-4 pb-4 pt-4">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-white/15">
                  <span
                    className="absolute inset-0 origin-left bg-dta-blue-600"
                    style={{
                      transform: `scaleX(${synced ? 1 : 0})`,
                      transition: synced && !reduced ? `transform 520ms ${EASE_OUT}` : "none",
                    }}
                  />
                </span>
                <div className="text-[13px] leading-snug text-white/65">{s.name}</div>
                <div
                  className={`tabular mt-2 min-h-[2.6rem] font-serif text-[1.3rem] leading-[1.15] transition-colors duration-150 ${
                    synced ? "text-dta-blue-300" : differs ? "text-white underline decoration-dotted decoration-1 underline-offset-[5px]" : "text-white/70"
                  }`}
                >
                  {synced ? t("nights") : s.today}
                </div>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[11px] transition-colors duration-150 ${
                    synced ? "border-dta-blue-300/50 text-dta-blue-300" : "border-white/20 text-white/50"
                  }`}
                >
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${synced ? "bg-dta-blue-300" : "bg-white/35"}`} />
                  {synced ? t("chipOn") : t("chipOff")}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Espacio reservado: la versión única aparece (opacidad + desplazamiento) sin mover el resto. */}
        <div className="mx-5 flex h-16 items-center border-t-2 border-white/10">
          <div
            className="flex items-baseline gap-4"
            style={{
              opacity: resolved ? 1 : 0,
              transform: resolved ? "translateY(0)" : "translateY(6px)",
              transition: reduced ? "none" : `opacity 300ms ${EASE_OUT}, transform 300ms ${EASE_OUT}`,
            }}
          >
            <span className="text-sm text-white/60">{t("resultLabel")}</span>
            <span className="tabular font-serif text-[1.65rem] leading-tight text-dta-blue-300">{t("nights")}</span>
          </div>
        </div>

        {/* Registro de consola: ocupa el resto de la altura disponible. */}
        <div
          className="mt-auto border-t border-white/10 bg-dta-navy-900/60 px-5 py-3 font-mono text-xs leading-relaxed text-white/60"
          aria-live="polite"
        >
          <div className="mb-1.5 flex items-center justify-between text-white/40">
            <span>{t("logTitle")}</span>
            <span>{t("example")}</span>
          </div>
          <div className="min-h-[6.25rem] space-y-0.5 lg:min-h-[3.9rem]">
            {log.map((l) => (
              <div key={l} className={progress === 0 ? "" : "text-dta-blue-300"}>
                {l}
              </div>
            ))}
          </div>
        </div>
      </SystemWindow>
    </div>
  );
}
