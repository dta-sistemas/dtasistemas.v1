"use client";

import {
  Calendar, MessageCircle, ChevronRight, Phone, Mail, MapPin, Globe,
  Linkedin, Instagram, Youtube, Search,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { linktreeContent } from "@/lib/i18n/linktreeContent";

const SOCIAL_ICONS = [
  { icon: Linkedin, href: "https://linkedin.com/company/dtasistemas", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/dtasistemas", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@dtasistemas", label: "YouTube" },
  { icon: Mail, href: "mailto:contacto@dtasistemas.com", label: "Email" },
];

/**
 * Vista de /dta-linktree. Client Component porque el toggle de idioma
 * necesita estado interactivo — la página en sí (page.tsx) es el Server
 * Component que define metadata (noindex) y renderiza este componente.
 *
 * Diseño: réplica del mockup de referencia compartido por el cliente.
 * Solo versión móvil (max-w-sm centrado, sin breakpoints desktop
 * adicionales) — es una landing tipo "link in bio" pensada para abrirse
 * desde redes sociales en el teléfono, tal como se pidió explícitamente.
 */
export function LinktreeView() {
  const locale = useLocale() as "es" | "en";
  const t = linktreeContent[locale];
  const [line1, word1, word2, line2] = t.headline;

  return (
    <div className="min-h-screen bg-dta-navy-900 text-white flex justify-center">
      <div className="w-full max-w-sm relative">
        {/* Fondo decorativo de puntos, sutil, igual al resto del sitio (Hero) */}
        <div
          className="absolute inset-x-0 top-0 h-72 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative px-6 pt-6 pb-12">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <LanguageSwitcher tone="dark" />
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
              <div className="font-extrabold text-2xl text-dta-navy-900 tracking-tight leading-none">DTA</div>
              <div className="text-[9px] font-semibold tracking-widest text-dta-navy-900/70 mt-1">SISTEMAS</div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-2xl font-extrabold leading-snug">
            {line1}
            <br />
            <span className="text-blue-400">{word1}</span>{" "}
            {locale === "es" ? "y " : "and "}
            <span className="text-blue-400">{word2}</span>
            <br />
            {line2}
          </h1>
          <p className="text-center text-sm text-white/60 mt-4 max-w-xs mx-auto">{t.sub}</p>

          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <Link
              href="/contacto?intent=audit&source=linktree"
              className="w-full flex items-center justify-center gap-2 bg-dta-blue-600 hover:bg-blue-700 transition-colors rounded-full py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Calendar size={16} aria-hidden="true" /> {t.ctaPrimary} <ChevronRight size={14} aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/529981234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-white text-dta-navy-900 hover:bg-gray-100 transition-colors rounded-full py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <MessageCircle size={16} aria-hidden="true" /> {t.ctaWhatsapp}
            </a>
          </div>

          {/* Soluciones */}
          <SectionDivider label={t.solutionsLabel} />

          <div className="space-y-2.5">
            {t.solutions.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0" aria-hidden="true">
                  <s.icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">{s.title}</div>
                  <div className="text-xs text-white/50 mt-0.5 leading-snug">{s.desc}</div>
                </div>
                <ChevronRight size={16} className="text-white/30 shrink-0" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* DTA Digital Audit */}
          <div className="mt-6 rounded-2xl bg-white/[0.06] border border-white/10 p-5 relative overflow-hidden">
            <div className="text-[10px] font-bold tracking-widest text-blue-400 mb-2">{t.auditLabel}</div>
            <div className="text-base font-bold leading-snug max-w-[70%]">{t.auditHeadline}</div>
            <div className="absolute top-4 right-4 text-white/10" aria-hidden="true">
              <Search size={40} />
            </div>
            <div className="text-lg font-extrabold mt-4">
              {t.auditFrom} <span className="text-blue-400">$4,900</span>{" "}
              <span className="text-xs font-medium text-white/50">MXN</span>
            </div>
            <Link
              href="/soluciones/dta-digital-audit"
              className="w-full flex items-center justify-center gap-2 bg-white text-dta-navy-900 hover:bg-gray-100 transition-colors rounded-full py-2.5 text-sm font-semibold mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {t.auditCta} <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Contacto */}
          <SectionDivider label={t.contactLabel} />

          <div className="space-y-3.5 text-sm">
            <a href="tel:+529981234567" className="flex items-center gap-3">
              <Phone size={16} className="text-blue-400 shrink-0" aria-hidden="true" />
              <div>
                <div className="font-medium">+52 998 123 4567</div>
                <div className="text-xs text-white/50">{t.schedule}</div>
              </div>
            </a>
            <a href="mailto:contacto@dtasistemas.com" className="flex items-center gap-3">
              <Mail size={16} className="text-blue-400 shrink-0" aria-hidden="true" />
              <div className="font-medium">contacto@dtasistemas.com</div>
            </a>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-blue-400 shrink-0" aria-hidden="true" />
              <div className="font-medium">Cancún, Quintana Roo, México</div>
            </div>
            <a href="https://www.dtasistemas.com" className="flex items-center gap-3">
              <Globe size={16} className="text-blue-400 shrink-0" aria-hidden="true" />
              <div className="font-medium">www.dtasistemas.com</div>
            </a>
          </div>

          {/* Redes */}
          <SectionDivider label={t.followLabel} />

          <div className="flex justify-center gap-3">
            {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-white/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-10">
            <div className="w-10 h-px bg-white/20 mx-auto mb-5" />
            <p className="text-sm">
              {t.footerLine1}
              <br />
              <span className="text-blue-400 font-semibold">{t.footerLine2}</span>
            </p>
            <p className="text-xs text-white/40 mt-4">{t.cities}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-9 mb-4">
      <div className="h-px bg-white/15 flex-1" />
      <div className="text-[11px] font-semibold tracking-widest text-white/50">{label}</div>
      <div className="h-px bg-white/15 flex-1" />
    </div>
  );
}
