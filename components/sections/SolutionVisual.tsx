/**
 * Mini-interfaces decorativas, una por servicio, dibujadas en código (sin fotos de stock ni
 * capturas de terceros). Muestran el TIPO de sistema que se construye, sin cifras ni datos
 * inventados: formas abstractas. Mismo código de color de todo el sitio: azul = conectado.
 */
type Props = { slug: string; className?: string };

const bar = "rounded-full bg-white/15";

function Crm() {
  const rows = [
    { w: "w-24", on: true },
    { w: "w-20", on: true },
    { w: "w-28", on: false },
    { w: "w-16", on: true },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex gap-3 border-b border-white/10 pb-2">
        <span className={`h-1.5 w-10 ${bar}`} />
        <span className={`h-1.5 w-14 ${bar}`} />
        <span className={`ml-auto h-1.5 w-8 ${bar}`} />
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`h-2 ${r.w} rounded-full bg-white/30`} />
          <span className={`h-2 w-12 ${bar}`} />
          <span
            className={`ml-auto h-4 w-14 rounded-full border ${
              r.on ? "border-dta-blue-300/60 bg-dta-blue-600/30" : "border-white/20"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function Integration() {
  const left = [14, 40, 66];
  return (
    <svg viewBox="0 0 220 80" className="h-full w-full" aria-hidden="true">
      {left.map((y) => (
        <g key={y}>
          <rect x="6" y={y - 7} width="34" height="14" rx="3" className="fill-white/15" />
          <line x1="40" y1={y} x2="92" y2="40" className="stroke-dta-blue-300" strokeWidth="1.2" />
          <line x1="128" y1="40" x2="180" y2={y} className="stroke-dta-blue-300" strokeWidth="1.2" />
          <rect x="180" y={y - 7} width="34" height="14" rx="3" className="fill-white/15" />
        </g>
      ))}
      <rect x="92" y="28" width="36" height="24" rx="5" className="fill-dta-blue-600" />
      <text x="110" y="44" textAnchor="middle" className="fill-white font-mono text-[10px]">
        API
      </text>
    </svg>
  );
}

function Bi() {
  const heights = [34, 52, 40, 64, 48, 72, 58];
  return (
    <div className="flex h-full items-end gap-2.5 border-b border-white/15 pb-0">
      {heights.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className={`flex-1 rounded-t-sm ${i === heights.length - 2 ? "bg-dta-blue-600" : "bg-white/20"}`}
        />
      ))}
    </div>
  );
}

function Ai() {
  return (
    <div className="flex h-full items-center justify-between gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-1 items-center gap-2">
          <div
            className={`flex h-14 flex-1 flex-col justify-center gap-1.5 rounded-lg border px-3 ${
              i === 1 ? "border-dta-blue-300/60 bg-dta-blue-600/30" : "border-white/15 bg-white/5"
            }`}
          >
            <span className={`h-1.5 w-3/4 ${bar}`} />
            <span className={`h-1.5 w-1/2 ${bar}`} />
          </div>
          {i < 2 && <span aria-hidden="true" className="font-mono text-xs text-dta-blue-300">→</span>}
        </div>
      ))}
    </div>
  );
}

function Web() {
  return (
    <div className="h-full overflow-hidden rounded-md border border-white/15">
      <div className="flex items-center gap-2 border-b border-white/15 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className={`ml-2 h-2 flex-1 ${bar}`} />
      </div>
      <div className="space-y-2 p-3">
        <span className="block h-2.5 w-1/2 rounded-full bg-white/35" />
        <span className={`block h-1.5 w-3/4 ${bar}`} />
        <div className="flex gap-2 pt-1.5">
          <span className="h-9 flex-1 rounded bg-white/10" />
          <span className="h-9 flex-1 rounded bg-dta-blue-600/50" />
          <span className="h-9 flex-1 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function Care() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex gap-1.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`h-6 flex-1 rounded-sm ${i === 17 ? "bg-white/25" : "bg-dta-blue-600/80"}`} />
        ))}
      </div>
      <div className="flex gap-3">
        <span className={`h-1.5 w-16 ${bar}`} />
        <span className={`h-1.5 w-10 ${bar}`} />
      </div>
    </div>
  );
}

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
    <div aria-hidden="true" className={`h-40 bg-dta-navy-900 p-5 ${className}`}>
      <Visual />
    </div>
  );
}
