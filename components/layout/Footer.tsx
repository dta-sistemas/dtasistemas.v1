"use client";

import { useTranslations } from "next-intl";
import { Linkedin, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { footerNav } from "@/data/navigation";
import { SOCIAL_LINKS } from "@/lib/site";

const COLUMN_KEY_BY_TITLE: Record<string, "solucionesTitle" | "sectoresTitle" | "empresaTitle"> = {
  Soluciones: "solucionesTitle",
  Sectores: "sectoresTitle",
  Empresa: "empresaTitle",
};

const SOCIALS: { key: keyof typeof SOCIAL_LINKS; label: string; icon: LucideIcon }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "youtube", label: "YouTube", icon: Youtube },
];

const linkStyles =
  "rounded text-sm text-white/65 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-300";

export function Footer() {
  const t = useTranslations("footer");
  const socials = SOCIALS.filter((s) => SOCIAL_LINKS[s.key]);

  return (
    <footer data-tone="dark" className="bg-dta-navy-900 text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-5">
        <div className="sm:col-span-2">
          <Logo tone="dark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{t("tagline")}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={SOCIAL_LINKS[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-300"
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={t(COLUMN_KEY_BY_TITLE[col.title] ?? "empresaTitle")}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              {t(COLUMN_KEY_BY_TITLE[col.title] ?? "empresaTitle")}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkStyles}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <span>
            © {new Date().getFullYear()} DTA Sistemas. {t("rights")}
          </span>
          <div className="flex gap-5">
            <Link href="/aviso-de-privacidad" className="transition-colors hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="/terminos-y-condiciones" className="transition-colors hover:text-white">
              {t("terms")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
