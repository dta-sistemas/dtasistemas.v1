"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { TrackedButton } from "../analytics/TrackedButton";

/**
 * Botón fijo inferior solo en móvil, tras pasar el primer pantallazo: la acción principal
 * (pedir el diagnóstico) queda siempre a un toque. No aparece en /contacto, donde ya
 * estás haciendo esa acción, ni en las páginas legales.
 */
export function MobileCTA() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = pathname.startsWith("/contacto") || pathname.startsWith("/aviso") || pathname.startsWith("/terminos");
  if (hidden) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-dta-gray-200 bg-white/95 px-5 pt-3 backdrop-blur transition-[transform,visibility] duration-200 md:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <TrackedButton
        href="/contacto?intent=audit"
        variant="primary"
        className="w-full"
        trackLabel="solicitar-diagnostico"
        trackSource="mobile-sticky"
      >
        {t("diagnostico")}
      </TrackedButton>
    </div>
  );
}
