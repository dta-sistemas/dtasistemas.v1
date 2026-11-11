"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowRight, Check, ChevronRight, Copy, Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Youtube, type LucideIcon } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useConsent } from "@/components/consent/ConsentProvider";
import { Link } from "@/i18n/navigation";
import { linktreeContent } from "@/lib/i18n/linktreeContent";
import { SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/lib/site";
import { analytics } from "@/lib/analytics/events";
import { withUtm } from "@/lib/utm";

/**
 * Vista de /dta-linktree: pantalla de "link en bio" pensada para abrirse desde el celular
 * (Instagram, WhatsApp…). Mismo lenguaje del sitio, como un panel de control de bolsillo:
 * fondo azul marino plano, titular en serif, módulos con mini-interfaz, y el azul de acento
 * solo cuando algo está "conectado".
 *
 * Qué cambió respecto a la versión anterior:
 *  - WhatsApp y redes salen de lib/site.ts (una sola fuente). Antes el botón apuntaba a un
 *    número inventado y las redes eran URLs adivinadas; ahora, si no hay dato, no se muestra.
 *  - Las filas de soluciones ahora SÍ son enlaces (antes tenían flecha pero no llevaban a nada).
 *  - Cada enlace se mide (`linktree_click`) y lleva utm_* para atribuir la sesión y el lead.
 */
export function LinktreeView() {
  const locale = useLocale() as "es" | "en";
  const t = linktreeContent[locale];
  const { openPreferences } = useConsent();

  const waHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMessage)}` : null;
  const socials = (
    [
      { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { id: "instagram", icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
      { id: "youtube", icon: Youtube, label: "YouTube", href: SOCIAL_LINKS.youtube },
    ] as { id: string; icon: LucideIcon; label: string; href?: string }[]
  ).filter((s) => s.href);

  // Posición de cada enlace en la página (1 = el primero), para saber qué lugar rinde más.
  let position = 0;
  const hit = (id: string) => {
    const pos = ++position;
    return () => analytics.linktreeClick(id, pos, locale);
  };

  const rowBase =
    "flex min-h-14 items-center gap-3 rounded-xl border border-white/10 px-3.5 py-2.5 transition-colors duration-150 hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-300";

  return (
    <div data-tone="dark" className="flex min-h-screen justify-center bg-dta-navy-900 text-white">
      <div className="w-full max-w-sm px-5 pb-28 pt-6">
        <div className="flex items-center justify-between">
          <Image src="/images/logos/dta-sistemas-dark.svg" alt="DTA Sistemas" width={132} height={33} priority unoptimized />
          <LanguageSwitcher tone="dark" />
        </div>

        <h1 className="mt-9 text-[1.75rem] font-medium leading-[1.12] tracking-[-0.01em] text-white">{t.headline}</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{t.sub}</p>

        <div className="mt-6 grid gap-2.5">
          <Link
            href={withUtm("/contacto?intent=audit&source=linktree", "cta-diagnostico")}
            onClick={hit("cta-diagnostico")}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-dta-blue-600 text-sm font-semibold transition-colors duration-150 hover:bg-dta-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.ctaPrimary}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                hit("cta-whatsapp")();
                analytics.whatsappClick();
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 text-sm font-semibold transition-colors duration-150 hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle size={17} aria-hidden="true" />
              {t.ctaWhatsapp}
            </a>
          )}
        </div>

        <MiniSync title={t.syncTitle} status={t.syncStatus} caption={t.syncCaption} />

        <SectionLabel>{t.solutionsLabel}</SectionLabel>
        <ul>
          {t.solutions.slice(0, t.solutionsShown).map((s) => (
            <li key={s.slug} className="border-b border-white/12 last:border-b-0">
              <Link
                href={withUtm(s.href, s.slug)}
                onClick={hit(`solucion-${s.slug}`)}
                className="flex min-h-16 items-center gap-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-300"
              >
                <Glyph slug={s.slug} />
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[1.15rem] leading-tight">{s.title}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-white/60">{s.desc}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-white/40" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={withUtm("/soluciones", "soluciones-todas")}
          onClick={hit("soluciones-todas")}
          className="mt-1 flex min-h-12 items-center gap-1.5 text-sm font-semibold text-dta-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-300"
        >
          {t.moreSolutions}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>

        {/* Digital Audit: la única pieza con peso, porque es la oferta de entrada. */}
        <div className="mt-5 overflow-hidden rounded-xl border border-white/20">
          <div className="flex items-center justify-between bg-dta-navy-800 px-4 py-2 font-mono text-[11px] text-white/55">
            <span>dta/diagnostico</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20" />
          </div>
          <div className="p-4">
            <div className="font-serif text-[1.4rem] leading-[1.15]">{t.auditHeadline}</div>
            <div className="tabular mt-3 flex items-baseline gap-1.5">
              <span className="text-xs text-white/60">{t.auditFrom}</span>
              <span className="font-serif text-3xl text-dta-blue-300">$4,900</span>
              <span className="text-xs text-white/60">MXN</span>
            </div>
            <Link
              href={withUtm("/soluciones/dta-digital-audit", "audit-card")}
              onClick={hit("audit-card")}
              className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-dta-navy-900 transition-colors duration-150 hover:bg-dta-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.auditCta}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <SectionLabel>{t.contactLabel}</SectionLabel>
        <div className="space-y-2">
          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                hit("contacto-whatsapp")();
                analytics.whatsappClick();
              }}
              className={rowBase}
            >
              <MessageCircle size={18} className="shrink-0 text-dta-blue-300" aria-hidden="true" />
              <span className="flex-1">
                <span className="block text-sm font-medium">+{WHATSAPP_NUMBER}</span>
                <span className="block text-xs text-white/55">{t.schedule}</span>
              </span>
            </a>
          )}
          <EmailRow copyLabel={t.emailCopy} copiedLabel={t.emailCopied} onUse={hit("contacto-correo")} rowClass={rowBase} />
          <div className="flex min-h-12 items-center gap-3 px-3.5 text-sm text-white/85">
            <MapPin size={18} className="shrink-0 text-dta-blue-300" aria-hidden="true" />
            Cancún, Quintana Roo, México
          </div>
          <a href={withUtm("/", "sitio-web")} onClick={hit("sitio-web")} className={rowBase}>
            <Globe size={18} className="shrink-0 text-dta-blue-300" aria-hidden="true" />
            <span className="text-sm font-medium">www.dtasistemas.com</span>
          </a>
        </div>

        {socials.length > 0 && (
          <>
            <SectionLabel>{t.followLabel}</SectionLabel>
            <ul className="flex gap-3">
              {socials.map(({ id, icon: Icon, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={hit(`red-${id}`)}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors duration-150 hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10 border-t border-white/12 pt-4 text-xs text-white/55">
          <p className="text-center">{t.cities}</p>
          <div className="mt-3 flex items-center justify-between">
            <span>{t.confidential}</span>
            <span className="flex gap-4">
              <Link href="/aviso-de-privacidad" className="underline underline-offset-2">
                {t.privacy}
              </Link>
              <button type="button" onClick={openPreferences} className="underline underline-offset-2">
                {t.cookies}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-2 mt-8 text-xs font-semibold text-white/55">{children}</div>;
}

/** La idea del Hero del sitio en una línea: cuatro herramientas conectadas = una sola versión. */
function MiniSync({ title, status, caption }: { title: string; status: string; caption: string }) {
  const names = ["Excel", "Booking", "WhatsApp", "Sistema"];
  return (
    <div aria-hidden="true" className="mt-5 overflow-hidden rounded-xl border border-white/12 bg-dta-navy-800">
      <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-1.5 font-mono text-[11px] text-white/55">
        <span>{title}</span>
        <span className="text-dta-blue-300">{status}</span>
      </div>
      <div className="px-3.5 pb-3 pt-3.5">
        <div className="flex items-center">
          {names.map((n, i) => (
            <span key={n} className="flex flex-1 items-center last:flex-none">
              <span className="h-2.5 w-2.5 rounded-full bg-dta-blue-300" />
              {i < names.length - 1 && <span className="h-0.5 flex-1 bg-dta-blue-600" />}
            </span>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-white/60">
          {names.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div className="mt-2.5 font-serif text-lg leading-tight text-dta-blue-300">{caption}</div>
      </div>
    </div>
  );
}

/** Miniatura de 44 px por servicio: la misma mini-interfaz del sitio, reducida. */
function Glyph({ slug }: { slug: string }) {
  const box = "grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/12 bg-dta-navy-800";
  const line = "block h-[2px] rounded-full bg-white/35";
  let inner: ReactNode;
  switch (slug) {
    case "integracion-de-sistemas":
      inner = <span className="rounded bg-dta-blue-600 px-1.5 py-0.5 font-mono text-[10px] text-white">API</span>;
      break;
    case "business-intelligence":
      inner = (
        <span className="flex h-5 items-end gap-[3px]">
          <span className="h-2 w-1 bg-white/35" />
          <span className="h-3 w-1 bg-white/35" />
          <span className="h-5 w-1 bg-dta-blue-600" />
          <span className="h-3 w-1 bg-white/35" />
        </span>
      );
      break;
    case "inteligencia-artificial":
      inner = (
        <span className="flex items-center gap-1 font-mono text-[10px] text-dta-blue-300">
          <span className="h-2.5 w-2.5 rounded-sm border border-white/35" />→<span className="h-2.5 w-2.5 rounded-sm bg-dta-blue-600" />
        </span>
      );
      break;
    case "desarrollo-digital":
      inner = (
        <span className="block w-6 overflow-hidden rounded-[3px] border border-white/35">
          <span className="block h-1 border-b border-white/35" />
          <span className="block space-y-[3px] p-[3px]">
            <span className={`${line} w-3/4`} />
            <span className="block h-2 rounded-[2px] bg-dta-blue-600/70" />
          </span>
        </span>
      );
      break;
    case "dta-care":
      inner = (
        <span className="flex gap-[2px]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`h-4 w-[3px] rounded-sm ${i === 4 ? "bg-white/30" : "bg-dta-blue-600"}`} />
          ))}
        </span>
      );
      break;
    default:
      inner = (
        <span className="block w-6 border-t-2 border-dta-blue-300 pt-[3px]">
          <span className={`${line} mb-[3px]`} />
          <span className={`${line} mb-[3px] w-4/5`} />
          <span className={`${line} w-3/5`} />
        </span>
      );
  }
  return (
    <span aria-hidden="true" className={box}>
      {inner}
    </span>
  );
}

/** Correo: abre el cliente de correo al tocar y, con el botón, se copia (útil dentro del navegador de Instagram). */
function EmailRow({ copyLabel, copiedLabel, onUse, rowClass }: { copyLabel: string; copiedLabel: string; onUse: () => void; rowClass: string }) {
  const [copied, setCopied] = useState(false);
  const email = "contacto@dtasistemas.com";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onUse();
    } catch {
      /* sin permiso del portapapeles: el enlace mailto sigue disponible */
    }
  };

  return (
    <div className="flex items-stretch gap-2">
      <a
        href={`mailto:${email}`}
        onClick={() => {
          onUse();
          analytics.emailClick();
        }}
        className={`${rowClass} flex-1`}
      >
        <Mail size={18} className="shrink-0 text-dta-blue-300" aria-hidden="true" />
        <span className="text-sm font-medium">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        className="grid w-12 shrink-0 place-items-center rounded-xl border border-white/10 transition-colors duration-150 hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-300"
      >
        {copied ? <Check size={17} className="text-dta-blue-300" aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
        <span className="sr-only" aria-live="polite">{copied ? copiedLabel : ""}</span>
      </button>
    </div>
  );
}
