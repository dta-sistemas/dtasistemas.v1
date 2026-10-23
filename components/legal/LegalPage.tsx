import { getTranslations } from "next-intl/server";
import { Lock, UserCheck, ShieldOff, FileSignature, ShieldCheck, EyeOff, KeyRound, Handshake } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { PageHero } from "../sections/PageHero";
import { formatDate } from "@/lib/formatDate";
import { LEGAL } from "@/lib/site";
import type { LegalDoc, LegalKind } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";

const HIGHLIGHT_ICONS = {
  privacy: [Lock, UserCheck, ShieldOff, KeyRound],
  terms: [ShieldCheck, FileSignature, Handshake, EyeOff],
} as const;

/**
 * Plantilla de documentos legales: encabezado, tarjetas con los puntos clave
 * de confidencialidad, índice lateral fijo (escritorio) y lectura cómoda
 * (16px, ancho ≈ 70 caracteres). El contenido vive en content/legal.ts.
 */
export async function LegalPage({
  doc,
  kind,
  locale,
}: {
  doc: LegalDoc;
  kind: LegalKind;
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const icons = HIGHLIGHT_ICONS[kind];
  const other = kind === "privacy" ? { href: "/terminos-y-condiciones", label: t("termsLabel") } : { href: "/aviso-de-privacidad", label: t("privacyLabel") };

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: doc.title }]}
        eyebrow={doc.eyebrow}
        title={doc.title}
        description={doc.intro}
        meta={
          <p className="text-sm text-dta-gray-600">
            {t("lastUpdated")}: <time dateTime={LEGAL.lastUpdated}>{formatDate(LEGAL.lastUpdated, locale)}</time>
          </p>
        }
      />

      <Section tone="light" className="!pb-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {doc.highlights.map((h, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={h.title} className="rounded-card border border-dta-gray-200 bg-dta-gray-50 p-5">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-dta-blue-100 text-dta-blue-600">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div className="font-bold text-dta-black">{h.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-dta-gray-600">{h.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="light" className="!pt-8">
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label={t("tocTitle")}>
              <div className="mb-3 text-label uppercase text-dta-gray-600">{t("tocTitle")}</div>
              <ol className="space-y-1 border-l border-dta-gray-200 text-sm">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-dta-gray-600 transition-colors hover:border-dta-blue-600 hover:text-dta-blue-600"
                    >
                      <span className="mr-1.5 tabular-nums text-dta-gray-400">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-[44rem]">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className={i === 0 ? "" : "mt-12"}>
                <h2 className="mb-4 text-h3 text-dta-black">
                  <span className="mr-2 tabular-nums text-dta-blue-600">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="mb-5 list-disc space-y-2.5 pl-5 text-base leading-7 text-dta-black/80 marker:text-dta-blue-600">
                      {block.map((item) => {
                        // Frase inicial corta ("Acceso por necesidad.") en negrita para poder escanear la lista.
                        const m = item.match(/^([^.:]{3,48}[.:])\s(.+)$/);
                        return (
                          <li key={item}>
                            {m ? (
                              <>
                                <strong className="font-semibold text-dta-black">{m[1]}</strong> {m[2]}
                              </>
                            ) : (
                              item
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p key={j} className="mb-5 text-base leading-7 text-dta-black/80">
                      {block}
                    </p>
                  )
                )}
              </section>
            ))}

            <div className="mt-14 rounded-card border border-dta-blue-100 bg-dta-blue-50 p-6 md:p-8">
              <div className="text-lg font-bold text-dta-black">{t("questionsTitle")}</div>
              <p className="mt-2 text-sm leading-relaxed text-dta-gray-600">{t("questionsText")}</p>
              <div className="mt-5">
                <Button href={`mailto:${LEGAL.privacyEmail}`} variant="primary">
                  {t("questionsCta")}
                </Button>
              </div>
            </div>

            <p className="mt-8 text-sm text-dta-gray-600">
              {t("otherDocPrefix")}{" "}
              <Link href={other.href} className="font-semibold text-dta-blue-600 hover:underline">
                {other.label}
              </Link>
            </p>
          </article>
        </div>
      </Section>
    </div>
  );
}
