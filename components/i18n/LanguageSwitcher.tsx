"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

type LanguageSwitcherProps = {
  tone?: "light" | "dark";
};

const LABELS = { es: "ES", en: "EN" } as const;

/**
 * Selector de idioma — Fase 13: ahora navega a la URL equivalente en el
 * otro idioma (usePathname/useRouter de next-intl ya conocen la ruta
 * actual "sin locale" y recalculan el prefijo correcto: sin prefijo para
 * es, /en/ para en) en vez de solo cambiar un estado en memoria.
 */
export function LanguageSwitcher({ tone = "light" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchTo(next: "es" | "en") {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const buttonStyles =
    tone === "dark"
      ? "text-white/90 border-white/20 hover:border-white/40"
      : "text-dta-black border-dta-gray-200 hover:border-dta-gray-600";

  const menuStyles = tone === "dark" ? "bg-blue-950 border border-white/10" : "bg-white border border-dta-gray-200";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Cambiar idioma / Change language"
        disabled={isPending}
        className={`flex items-center gap-1.5 text-xs font-semibold border rounded-full px-3 py-1.5 transition-colors disabled:opacity-60 ${buttonStyles}`}
      >
        <Globe size={13} aria-hidden="true" />
        {LABELS[locale as "es" | "en"]}
        <ChevronDown size={11} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute top-full mt-1 right-0 rounded-lg overflow-hidden shadow-lg z-20 w-16 ${menuStyles}`}
        >
          {(Object.keys(LABELS) as Array<keyof typeof LABELS>).map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={locale === l}
              onClick={() => switchTo(l)}
              className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                tone === "dark" ? "text-white hover:bg-white/10" : "text-dta-black hover:bg-dta-gray-50"
              } ${locale === l ? "font-bold" : ""}`}
            >
              {LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
