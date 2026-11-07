import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { TrackedButton } from "../analytics/TrackedButton";
import { Reconcile } from "./Reconcile";

/**
 * Hero azul marino compacto: en escritorio, texto y acciones ocupan 1/3 y la consola de
 * sistema 2/3, a la misma altura, para que el primer pantallazo muestre el mensaje y la
 * prueba juntos (cuatro herramientas con tres versiones → una sola). En móvil se apilan.
 * El azul de acento solo aparece cuando algo se conecta.
 */
export function Hero() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <section data-tone="dark" className="bg-dta-navy-900 text-white">
      <Container className="py-10 md:py-12 lg:py-14">
        <div className="grid items-stretch gap-10 lg:grid-cols-3 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-1">
            <h1 className="text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.6rem] lg:text-[2.35rem] xl:text-[2.6rem]">
              {t("heroTitle1")} {t("heroTitle2")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70">{t("heroSubtitle")}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <TrackedButton href="/contacto?intent=audit" variant="primary" trackLabel="analizar-mi-empresa" trackSource="hero">
                {tc("analizarMiEmpresa")}
              </TrackedButton>
              <Link
                href="/dta"
                className="rounded text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-dta-blue-300"
              >
                {tc("conocerDTA")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Reconcile />
          </div>
        </div>
      </Container>
    </section>
  );
}
