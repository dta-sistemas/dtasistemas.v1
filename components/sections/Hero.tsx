"use client";

import { useTranslations } from "next-intl";
import { Users, Globe, BarChart3, Database, Cpu } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { TrackedButton } from "../analytics/TrackedButton";

const NODES = [
  { label: "Clientes", icon: Users, x: 50, y: 6 },
  { label: "Web", icon: Globe, x: 4, y: 38 },
  { label: "CRM", icon: BarChart3, x: 96, y: 38 },
  { label: "Datos", icon: Database, x: 12, y: 78 },
  { label: "IA & Automatización", icon: Cpu, x: 88, y: 78 },
];

function HeroDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {NODES.map((n, i) => (
          <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#DBE4FA" strokeWidth="0.6" strokeDasharray="2 2" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-dta-navy-900 text-white flex flex-col items-center justify-center shadow-lg">
        <div className="font-extrabold text-sm leading-none">DTA</div>
        <div className="text-[9px] tracking-widest text-white/60 mt-1">SISTEMA</div>
      </div>
      {NODES.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-dta-gray-200 shadow-sm flex items-center justify-center text-dta-blue-600">
            <n.icon size={18} />
          </div>
          <div className="text-[10px] font-medium text-dta-gray-600 text-center w-20">{n.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <Section tone="subtle" className="pt-14 pb-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-display-sm md:text-display text-dta-black leading-tight">
            {t("heroTitle1")}
            <br />
            <span className="text-dta-blue-600">{t("heroTitle2")}</span>
          </h1>
          <p className="text-body-lg text-dta-gray-600 mt-5 max-w-md">{t("heroSubtitle")}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <TrackedButton href="/contacto?intent=audit" variant="primary" trackLabel="analizar-mi-empresa" trackSource="hero">
              {tc("analizarMiEmpresa")}
            </TrackedButton>
            <Button href="/dta" variant="secondary">
              {tc("conocerDTA")}
            </Button>
          </div>
        </div>
        <HeroDiagram />
      </div>
    </Section>
  );
}
