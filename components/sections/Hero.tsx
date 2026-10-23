"use client";

import { useTranslations } from "next-intl";
import { Users, Globe, BarChart3, Database, Cpu, type LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { TrackedButton } from "../analytics/TrackedButton";

type NodeKey = "diagramClients" | "diagramWeb" | "diagramCrm" | "diagramData" | "diagramAI";

const NODES: { key: NodeKey; icon: LucideIcon; x: number; y: number; delay: string }[] = [
  { key: "diagramClients", icon: Users, x: 50, y: 7, delay: "0s" },
  { key: "diagramWeb", icon: Globe, x: 8, y: 38, delay: "0.6s" },
  { key: "diagramCrm", icon: BarChart3, x: 92, y: 38, delay: "1.2s" },
  { key: "diagramData", icon: Database, x: 16, y: 80, delay: "1.8s" },
  { key: "diagramAI", icon: Cpu, x: 84, y: 80, delay: "2.4s" },
];

/**
 * Diagrama decorativo "DTA = el sistema que conecta todo". Ahora sobre navy:
 * líneas animadas que fluyen hacia el núcleo, nodos con vidrio esmerilado y
 * un pulso en el centro. Las etiquetas pasan a 12px (antes 10px, ilegibles en
 * móvil) y se traducen (antes quedaban en español en la versión en inglés).
 * Es decorativo (aria-hidden): el mensaje real está en el H1 y el subtítulo.
 */
function HeroDiagram() {
  const t = useTranslations("home");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] md:max-w-lg" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {NODES.map((n) => (
          <line
            key={n.key}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgb(157 181 247 / 0.45)"
            strokeWidth="0.45"
            strokeDasharray="2 2"
            className="animate-dash"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full bg-dta-blue-600 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-dta-blue-600 animate-pulse-ring [animation-delay:1.4s]" />
        <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-dta-blue-600 text-white shadow-glow md:h-28 md:w-28">
          <div className="text-base font-extrabold leading-none tracking-tight">DTA</div>
          <div className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-white/75">{t("diagramCenter")}</div>
        </div>
      </div>

      {NODES.map((n) => (
        <div
          key={n.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="flex animate-float flex-col items-center gap-1.5" style={{ animationDelay: n.delay }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-dta-navy-700/70 text-dta-blue-300 shadow-lg backdrop-blur md:h-14 md:w-14">
              <n.icon size={20} />
            </div>
            <div className="w-24 text-center text-xs font-medium leading-tight text-white/75">{t(n.key)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-dta-navy-900 text-white">
      {/* Fondo: cuadrícula técnica difuminada + resplandor azul. Puramente decorativo. */}
      <div
        aria-hidden="true"
        className="bg-grid-navy absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-dta-blue-600/25 blur-[130px]"
      />

      <Container className="py-14 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <h1 className="text-display-sm text-white md:text-display">
              {t("heroTitle1")}
              <br />
              <span className="text-dta-blue-300">{t("heroTitle2")}</span>
            </h1>
            <p className="mt-6 max-w-md text-body-lg text-white/70">{t("heroSubtitle")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedButton
                href="/contacto?intent=audit"
                variant="primary"
                trackLabel="analizar-mi-empresa"
                trackSource="hero"
              >
                {tc("analizarMiEmpresa")}
              </TrackedButton>
              <Button href="/dta" variant="ghost-light">
                {tc("conocerDTA")}
              </Button>
            </div>
          </div>
          <HeroDiagram />
        </div>
      </Container>
    </section>
  );
}
