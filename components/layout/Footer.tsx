"use client";

import { useTranslations } from "next-intl";
import { Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { footerNav } from "@/data/navigation";

const COLUMN_KEY_BY_TITLE: Record<string, "solucionesTitle" | "sectoresTitle" | "empresaTitle"> = {
  Soluciones: "solucionesTitle",
  Sectores: "sectoresTitle",
  Empresa: "empresaTitle",
};

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-dta-navy-900 text-white">
      <Container className="py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-extrabold text-lg">DTA SISTEMAS</div>
          <p className="text-sm text-white/60 mt-3 max-w-xs">{t("tagline")}</p>
          <div className="flex gap-3 mt-5">
            <Linkedin size={18} className="text-white/60" aria-hidden="true" />
            <Instagram size={18} className="text-white/60" aria-hidden="true" />
            <Youtube size={18} className="text-white/60" aria-hidden="true" />
          </div>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold mb-3">{t(COLUMN_KEY_BY_TITLE[col.title] ?? "empresaTitle")}</div>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} DTA Sistemas. {t("rights")}
          </span>
          <div className="flex gap-4">
            <Link href="/aviso-de-privacidad">{t("privacy")}</Link>
            <Link href="/terminos-y-condiciones">{t("terms")}</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
