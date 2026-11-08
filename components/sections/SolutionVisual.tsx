/**
 * Mini-interfaz propia de cada servicio, dibujada en código (sin fotos de stock ni capturas
 * de terceros). Cada una muestra el TIPO de sistema que se construye, con formas abstractas y
 * siglas universales (CRM, API, KPI…): sin cifras ni datos inventados. Mismo código de color
 * de todo el sitio: azul = conectado. Dentro de una <SolutionTile> los elementos azules se
 * intensifican al pasar el cursor (group-hover), de forma sutil y solo en color.
 */
type Props = { slug: string; className?: string };

const skel = "rounded-full bg-white/15";
const mono = "font-mono text-[9px] uppercase tracking-wider text-white/45";

/** Sistemas empresariales: panel de CRM con barra lateral, búsqueda y tabla con estados. */
function Crm() {
  const rows = [
    { a: "w-20", b: "w-12", on: true },
    { a: "w-16", b: "w-14", on: true },
    { a: "w-24", b: "w-10", on: false },
    { a: "w-14", b: "w-12", on: true },
  ];
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-9 shrink-0 flex-col gap-2 border-r border-white/10 pr-3">
        <span className="h-1.5 rounded-full bg-dta-blue-300 transition-colors" />
        <span className={`h-1.5 ${skel}`} />
        <span className={`h-1.5 ${skel}`} />
        <span className={`h-1.5 ${skel}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="h-4 flex-1 rounded border border-white/15 bg-white/5" />
          <span className="grid h-4 w-4 place-items-center rounded bg-dta-blue-600 font-mono text-[10px] leading-none text-white transition-colors group-hover:bg-dta-blue-300 group-hover:text-dta-navy-900">+</span>
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-white/20" />
              <span className={`h-1.5 ${r.a} rounded-full bg-white/30`} />
              <span className={`h-1.5 ${r.b} ${skel}`} />
              <span
                className={`ml-auto h-3.5 w-11 rounded-full border transition-colors ${
                  r.on ? "border-dta-blue-300/60 bg-dta-blue-600/30 group-hover:bg-dta-blue-600/60" : "border-white/20"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Integración: herramientas sueltas a la izquierda, una API al centro y destinos conectados a la derecha. */
function Integration() {
  const left = [
    { y: 14, t: "CRM" },
    { y: 50, t: "WEB" },
    { y: 86, t: "ERP" },
  ];
  const right = [
    { y: 14, t: "BI" },
    { y: 50, t: "APP" },
    { y: 86, t: "IA" },
  ];
  return (
    <svg viewBox="0 0 260 100" className="h-full w-full" aria-hidden="true">
      {left.map((n) => (
        <g key={n.t}>
          <line x1="52" y1={n.y} x2="104" y2="50" className="stroke-dta-blue-300/70" strokeWidth="1.2" />
          <rect x="6" y={n.y - 9} width="46" height="18" rx="4" className="fill-white/10 stroke-white/20" />
          <text x="29" y={n.y + 3.5} textAnchor="middle" className="fill-white/60 font-mono text-[9px]">{n.t}</text>
        </g>
      ))}
      {right.map((n) => (
        <g key={n.t}>
          <line x1="156" y1="50" x2="208" y2={n.y} className="stroke-dta-blue-300/70" strokeWidth="1.2" />
          <rect x="208" y={n.y - 9} width="46" height="18" rx="4" className="fill-white/10 stroke-white/20" />
          <text x="231" y={n.y + 3.5} textAnchor="middle" className="fill-white/60 font-mono text-[9px]">{n.t}</text>
        </g>
      ))}
      <rect x="104" y="34" width="52" height="32" rx="7" className="fill-dta-blue-600 transition-colors group-hover:fill-dta-blue-300" />
      <text x="130" y="54" textAnchor="middle" className="fill-white font-mono text-[11px] font-semibold group-hover:fill-dta-navy-900">API</text>
    </svg>
  );
}

/** Business Intelligence: KPIs a la izquierda y gráfica de barras con tendencia a la derecha. */
function Bi() {
  const heights = [34, 48, 40, 62, 50, 74, 60];
  return (
    <div className="flex h-full gap-4">
      <div className="flex w-16 shrink-0 flex-col justify-between">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded border border-white/15 bg-white/5 px-2 py-1.5">
            <div className={mono}>KPI</div>
            <span className={`mt-1 block h-1.5 ${i === 0 ? "w-8 bg-dta-blue-300" : "w-6 bg-white/30"} rounded-full`} />
          </div>
        ))}
      </div>
      <div className="relative flex h-full flex-1 items-end gap-2 border-b border-white/20">
        {heights.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`flex-1 rounded-t-sm transition-colors ${i === heights.length - 2 ? "bg-dta-blue-600 group-hover:bg-dta-blue-300" : "bg-white/20"}`}
          />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <polyline points="7,70 21,54 36,62 50,36 64,46 79,22 93,34" fill="none" className="stroke-dta-blue-300" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

/** Automatización & IA: entrada → modelo de IA → acción, con un registro de ejecución debajo. */
function Ai() {
  const node = "flex h-12 flex-1 flex-col items-center justify-center rounded-lg border";
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className={`${node} border-white/20 bg-white/5`}>
          <span className={mono}>in</span>
          <span className={`mt-1 h-1.5 w-8 ${skel}`} />
        </div>
        <span aria-hidden="true" className="font-mono text-xs text-dta-blue-300">→</span>
        <div className={`${node} border-dta-blue-300/60 bg-dta-blue-600/30 transition-colors group-hover:bg-dta-blue-600/60`}>
          <span className="font-mono text-[11px] font-semibold text-white">IA</span>
          <span className="mt-1 h-1.5 w-8 rounded-full bg-dta-blue-300" />
        </div>
        <span aria-hidden="true" className="font-mono text-xs text-dta-blue-300">→</span>
        <div className={`${node} border-white/20 bg-white/5`}>
          <span className={mono}>out</span>
          <span className="mt-1 font-mono text-[10px] leading-none text-dta-blue-300">✓</span>
        </div>
      </div>
      <div className="space-y-1.5 font-mono text-[9px] text-white/40">
        <div className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-dta-blue-300" /><span className={`h-1.5 w-24 ${skel}`} /></div>
        <div className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-dta-blue-300" /><span className={`h-1.5 w-32 ${skel}`} /></div>
      </div>
    </div>
  );
}

/** Desarrollo digital: ventana de navegador con barra de dirección y página en construcción. */
function Web() {
  return (
    <div className="relative h-full overflow-hidden rounded-md border border-white/15">
      <div className="flex items-center gap-1.5 border-b border-white/15 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-1.5 flex h-3.5 flex-1 items-center rounded bg-white/10 px-2 font-mono text-[8px] text-white/45">https://</span>
      </div>
      <div className="space-y-2 p-3">
        <span className="block h-2.5 w-2/5 rounded-full bg-white/40" />
        <span className={`block h-1.5 w-3/5 ${skel}`} />
        <span className="mt-1 inline-block h-4 w-16 rounded-full bg-dta-blue-600 transition-colors group-hover:bg-dta-blue-300" />
        <div className="flex gap-2 pt-1">
          <span className="h-8 flex-1 rounded bg-white/10" />
          <span className="h-8 flex-1 rounded bg-white/10" />
          <span className="h-8 flex-1 rounded bg-white/10" />
        </div>
      </div>
      <span className="absolute bottom-2 right-2 rounded border border-dta-blue-300/50 bg-dta-navy-900 px-1.5 py-0.5 font-mono text-[10px] text-dta-blue-300">{"</>"}</span>
    </div>
  );
}

/** DTA Care: línea de tiempo de disponibilidad (todo operativo salvo un punto) y 24/7. */
function Care() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center justify-between">
        <span className={mono}>uptime</span>
        <span className="font-mono text-[10px] text-dta-blue-300">24/7</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className={`h-8 flex-1 rounded-sm ${i === 19 ? "bg-white/25" : "bg-dta-blue-600/80 group-hover:bg-dta-blue-300/90"} transition-colors`} />
        ))}
      </div>
      <div className="flex gap-3">
        <span className={`h-1.5 w-16 ${skel}`} />
        <span className={`h-1.5 w-10 ${skel}`} />
      </div>
    </div>
  );
}

/** Identificador del módulo, estilo ruta: dta/sistemas, dta/integracion… (neutro en idioma). */
export const MODULE_LABEL: Record<string, string> = {
  "sistemas-empresariales": "sistemas",
  "integracion-de-sistemas": "integracion",
  "business-intelligence": "inteligencia",
  "inteligencia-artificial": "automatizacion-ia",
  "desarrollo-digital": "desarrollo",
  "dta-care": "care",
};

export function SolutionVisual({ slug, className = "" }: Props) {
  const Visual =
    {
      "sistemas-empresariales": Crm,
      "integracion-de-sistemas": Integration,
      "business-intelligence": Bi,
      "inteligencia-artificial": Ai,
      "desarrollo-digital": Web,
      "dta-care": Care,
    }[slug] ?? Crm;

  return (
    <div aria-hidden="true" className={`h-44 bg-dta-navy-900 p-5 ${className}`}>
      <Visual />
    </div>
  );
}
