import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Boxes, Link2, BarChart3, Bot, Code2, Phone, Mail, MapPin, Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge, IconCircle } from "@/components/ui/Badge";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SolutionCard } from "@/components/cards/SolutionCard";

// Página interna de QA visual — no debe indexarse.
export const metadata: Metadata = {
  title: "Design System — DTA Sistemas",
  robots: { index: false, follow: false },
};

const colorTokens = [
  { name: "Navy 900", hex: "#0B1730", className: "bg-dta-navy-900" },
  { name: "Blue 600 (acento)", hex: "#1B4DE0", className: "bg-dta-blue-600" },
  { name: "Blue 100", hex: "#E7EEFD", className: "bg-dta-blue-100" },
  { name: "Gray 50", hex: "#F6F7FA", className: "bg-dta-gray-50 border border-dta-gray-200" },
  { name: "Gray 200", hex: "#E4E7EC", className: "bg-dta-gray-200" },
  { name: "Gray 600", hex: "#5B6472", className: "bg-dta-gray-600" },
  { name: "Black", hex: "#0F1115", className: "bg-dta-black" },
  { name: "White", hex: "#FFFFFF", className: "bg-dta-white border border-dta-gray-200" },
];

type Props = { params: Promise<{ locale: string }> };

export default async function DesignSystemPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pb-24">
      <Section tone="transparent" className="pt-16">
        <div className="text-label uppercase text-dta-blue-600 mb-3">Design System</div>
        <h1 className="text-display-sm md:text-display text-dta-black">
          Sistema visual de DTA Sistemas
        </h1>
        <p className="text-body-lg text-dta-gray-600 mt-4 max-w-2xl">
          Referencia interna de tokens y componentes, implementados con el mismo código que usa
          el sitio público. Página no indexable — solo para QA de diseño.
        </p>
      </Section>

      <Section tone="light">
        <h2 className="text-h2 mb-6">Color</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colorTokens.map((c) => (
            <div key={c.name} className="rounded-card overflow-hidden border border-dta-gray-200">
              <div className={`h-20 ${c.className}`} />
              <div className="p-3">
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-dta-gray-600">{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="transparent">
        <h2 className="text-h2 mb-6">Botones & badges</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Hablemos</Button>
          <Button variant="secondary">Conocer DTA</Button>
          <Button variant="dark">Analizar mi empresa</Button>
          <Badge>Desde $4,900 MXN</Badge>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-h2 mb-6">Icon circles</h2>
        <div className="flex gap-4">
          <IconCircle icon={Boxes} />
          <IconCircle icon={Link2} />
          <IconCircle icon={BarChart3} />
          <IconCircle icon={Bot} />
          <IconCircle icon={Code2} />
        </div>
      </Section>

      <Section tone="transparent">
        <h2 className="text-h2 mb-6">SolutionCard</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <SolutionCard
            number="01"
            icon={Boxes}
            title="Sistemas empresariales"
            description="Diseñamos y desarrollamos sistemas a la medida de tus procesos."
            bullets={["CRM", "Plataformas internas", "Sistemas de reservas"]}
            href="/soluciones/sistemas-empresariales"
          />
          <SolutionCard
            number="02"
            icon={Link2}
            title="Integración"
            description="Conectamos tus herramientas para que la información fluya."
            bullets={["APIs y conectores", "Sincronización de datos", "Automatización de flujos"]}
            href="/soluciones/integracion-de-sistemas"
          />
          <SolutionCard
            number="03"
            icon={BarChart3}
            title="Inteligencia"
            description="Convertimos tus datos en información para tomar decisiones."
            bullets={["Dashboards ejecutivos", "KPIs y reportes", "Alertas y monitoreo"]}
            href="/soluciones/business-intelligence"
          />
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-h2 mb-6">Process steps</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <ProcessStep number="1" title="Entender" description="Analizamos procesos, herramientas y datos." />
          <ProcessStep number="2" title="Diseñar" description="Definimos la arquitectura de la solución." />
          <ProcessStep number="3" title="Construir" description="Desarrollamos sistemas robustos y escalables." />
          <ProcessStep number="4" title="Conectar" description="Integramos sistemas y automatizamos procesos." />
          <ProcessStep number="5" title="Evolucionar" description="Medimos resultados y mejoramos." isLast />
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-md">
          <h2 className="text-h2 mb-4">Stat strip</h2>
          <p className="text-white/70 text-sm mb-6">
            Tecnología construida desde el corazón de uno de los mercados más dinámicos de México.
          </p>
          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            {["Cancún", "Playa del Carmen", "Riviera Maya", "Quintana Roo", "Yucatán"].map((p) => (
              <span key={p} className="flex items-center gap-1">
                <MapPin size={14} /> {p}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-h2 mb-6">Canales de contacto</h2>
        <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
          {[
            { icon: Phone, label: "Teléfono / WhatsApp", value: "+52 998 123 4567" },
            { icon: Mail, label: "Correo electrónico", value: "contacto@dtasistemas.com" },
            { icon: MapPin, label: "Oficina", value: "Cancún, Quintana Roo" },
            { icon: Clock, label: "Horario", value: "Lun–Vie 09:00–18:00" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 p-4 rounded-card bg-white border border-dta-gray-200">
              <IconCircle icon={c.icon} />
              <div>
                <div className="text-xs text-dta-gray-600">{c.label}</div>
                <div className="text-sm font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
