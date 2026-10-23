"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
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

/** "/" solo está activo en la home; el resto también activa sus subrutas (ej. /soluciones/sistemas-empresariales). */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Navbar fija.
 *
 * Mejoras UX/UI sobre la versión anterior:
 *  - Estado activo (`aria-current="page"` + subrayado azul): el usuario sabe dónde está.
 *  - Sombra sutil solo tras hacer scroll, para separar la barra del contenido.
 *  - Menú móvil: se cierra al navegar o con Escape, bloquea el scroll del fondo,
 *    objetivos táctiles de ≥44px y atributos ARIA (`aria-expanded`/`aria-controls`).
 *  - Textos accesibles traducidos (antes "Abrir menú" estaba fijo en español).
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape cierra el menú y se bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-transparent shadow-nav" : "border-dta-gray-200"
      }`}
    >
      <Container className="flex items-center justify-between py-3.5">
        <Link
          href="/"
          aria-label="DTA Sistemas"
          className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dta-blue-600"
        >
          <Logo />
        </Link>

        <nav aria-label={t("primaryLabel")} className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600 ${
                  active ? "text-dta-black" : "text-dta-gray-600 hover:text-dta-black"
                }`}
              >
                {t(NAV_KEY_BY_HREF[item.href] ?? "inicio")}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-dta-blue-600 transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher tone="light" />
          <Button href="/contacto" variant="primary" className="!py-2.5">
            {t("hablemos")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher tone="light" />
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-dta-black transition-colors hover:bg-dta-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-full h-dvh bg-dta-navy-950/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] animate-fade-up overflow-y-auto border-b border-dta-gray-200 bg-white shadow-card-hover md:hidden"
        >
          <nav aria-label={t("primaryLabel")} className="px-5 py-3">
            <ul>
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-12 items-center justify-between rounded-xl px-3 text-base font-medium transition-colors ${
                        active
                          ? "bg-dta-blue-50 text-dta-blue-600"
                          : "text-dta-black hover:bg-dta-gray-50"
                      }`}
                    >
                      {t(NAV_KEY_BY_HREF[item.href] ?? "inicio")}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-dta-blue-600" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pb-3 pt-4">
              <Button href="/contacto" variant="primary" className="w-full">
                {t("hablemos")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
