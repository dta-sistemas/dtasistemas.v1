"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { mainNav } from "@/data/navigation";

const NAV_KEY_BY_HREF: Record<string, "inicio" | "soluciones" | "sectores" | "proyectos" | "dta" | "blog" | "contacto"> = {
  "/": "inicio",
  "/soluciones": "soluciones",
  "/sectores": "sectores",
  "/proyectos": "proyectos",
  "/dta": "dta",
  "/blog": "blog",
  "/contacto": "contacto",
};

/** Navbar fija — Fase 13: useTranslations("nav") en vez del Context custom de Fase 12. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-dta-gray-200">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-extrabold text-lg tracking-tight text-dta-black">
          DTA <span className="block text-[10px] font-semibold tracking-widest text-dta-gray-600">SISTEMAS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-dta-black">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-dta-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
            >
              {t(NAV_KEY_BY_HREF[item.href] ?? "inicio")}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher tone="light" />
          <Button href="/contacto" variant="primary">
            {t("hablemos")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher tone="light" />
          <button className="p-2" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden border-t border-dta-gray-200 bg-white px-6 py-4 space-y-3">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-dta-black"
              onClick={() => setOpen(false)}
            >
              {t(NAV_KEY_BY_HREF[item.href] ?? "inicio")}
            </Link>
          ))}
          <Button href="/contacto" variant="primary" className="w-full justify-center">
            {t("hablemos")}
          </Button>
        </div>
      )}
    </header>
  );
}
