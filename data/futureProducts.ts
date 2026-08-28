import { Search, BarChart3, Brain, Activity, Bot, type LucideIcon } from "lucide-react";

export type FutureProduct = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

/**
 * Catálogo de productos SaaS futuros de DTA (Fase 0, sección 43). Ninguno
 * tiene funcionalidad real todavía — este archivo solo alimenta la página
 * placeholder de /app (Fase 11) para dejar la intención documentada y
 * visible, sin construir lógica de producto antes de tiempo.
 */
export const futureProducts: FutureProduct[] = [
  {
    slug: "dta-audit",
    name: "DTA Audit",
    description: "Versión productizada y autoservicio del diagnóstico tecnológico (hoy DTA Digital Audit se entrega como servicio manual).",
    icon: Search,
  },
  {
    slug: "dta-digital-score",
    name: "DTA Digital Score",
    description: "Puntaje de madurez digital de una empresa, calculado a partir de sus sistemas, datos e integraciones.",
    icon: BarChart3,
  },
  {
    slug: "dta-intelligence",
    name: "DTA Intelligence",
    description: "Plataforma de dashboards y reportes conectados directamente a las fuentes de datos del cliente.",
    icon: Brain,
  },
  {
    slug: "dta-monitoring",
    name: "DTA Monitoring",
    description: "Monitoreo continuo de los sistemas que DTA construye o mantiene, con alertas automáticas.",
    icon: Activity,
  },
  {
    slug: "dta-automation",
    name: "DTA Automation",
    description: "Constructor de flujos de automatización propios, sin depender de un proyecto a la medida para cada cambio.",
    icon: Bot,
  },
];
