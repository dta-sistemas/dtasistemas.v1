"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { OPEN_PREFERENCES_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { CookieBanner } from "./CookieBanner";

type ConsentState = {
  /** false hasta que el visitante decide (o mientras se lee su cookie): ningún script analítico carga. */
  analytics: boolean;
  /** true cuando ya hay una decisión guardada. */
  decided: boolean;
  /** true cuando el panel (banner) está visible. */
  open: boolean;
  save: (analytics: boolean) => void;
  openPreferences: () => void;
  closePanel: () => void;
};

const ConsentContext = createContext<ConsentState>({
  analytics: false,
  decided: false,
  open: false,
  save: () => {},
  openPreferences: () => {},
  closePanel: () => {},
});

export const useConsent = () => useContext(ConsentContext);

/**
 * Fuente única de verdad del consentimiento de cookies. Los scripts de analítica (GA4, GTM)
 * leen `analytics` y NO se cargan hasta que sea true. Antes de leer la cookie (render del
 * servidor y primer render del cliente) todo está apagado, así que nunca se carga nada "por
 * si acaso".
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [decided, setDecided] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      setDecided(true);
    } else {
      setOpen(true);
    }
    setReady(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  const save = useCallback(
    (value: boolean) => {
      const wasOn = analytics;
      writeConsent(value);
      setAnalytics(value);
      setDecided(true);
      setOpen(false);
      // Un script ya cargado no puede "descargarse": al retirar el consentimiento se recarga la
      // página para que GA4 y GTM dejen de ejecutarse en esta sesión.
      if (wasOn && !value) window.location.reload();
    },
    [analytics]
  );

  const value = useMemo<ConsentState>(
    () => ({
      analytics: ready && analytics,
      decided,
      open: ready && open,
      save,
      openPreferences: () => setOpen(true),
      closePanel: () => setOpen(false),
    }),
    [ready, analytics, decided, open, save]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <CookieBanner />
    </ConsentContext.Provider>
  );
}
