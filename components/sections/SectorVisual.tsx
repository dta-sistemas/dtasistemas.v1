/**
 * Mini-interfaz de cada sector, en código y con formas abstractas (sin fotos de stock): muestra
 * el tipo de sistema que más se conecta en ese sector. Mismo código de color de todo el sitio
 * (azul = conectado). Dentro de una <SectorTile> los azules se intensifican al pasar el cursor.
 */
type Props = { slug: string; className?: string };

const skel = "rounded-full bg-white/15";

/** Turismo: calendario de reservas con barras que cruzan varios días. */
function Turismo() {
  // Cada barra: fila, columna inicial, duración, y si es una reserva ya conectada (azul).
  const bars = [
    { r: 0, c: 0, n: 3, on: true },
    { r: 0, c: 4, n: 3, on: false },
    { r: 1, c: 1, n: 4, on: true },
    { r: 2, c: 0, n: 2, on: false },
    { r: 2, c: 3, n: 4, on: true },
  ];
  return (
    <div className="relative h-full">
      <div className="grid h-full grid-cols-7 grid-rows-3 gap-1">
        {Array.from({ length: 21 }).map((_, i) => (
          <span key={i} className="rounded-sm border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 grid grid-cols-7 grid-rows-3 gap-1 p-[3px]">
        {bars.map((b, i) => (
          <span
            key={i}
            style={{ gridRow: b.r + 1, gridColumn: `${b.c + 1} / span ${b.n}` }}
            className={`rounded-sm transition-colors ${b.on ? "bg-dta-blue-600 group-hover:bg-dta-blue-300" : "bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Hotelería: plano de habitaciones con estado (ocupada, libre, en limpieza). */
function Hoteleria() {
  const rooms = [
    ["101", "on"], ["102", "off"], ["103", "on"], ["104", "wait"],
    ["201", "on"], ["202", "on"], ["203", "off"], ["204", "on"],
    ["301", "off"], ["302", "on"], ["303", "wait"], ["304", "on"],
  ];
  return (
    <div className="grid h-full grid-cols-4 grid-rows-3 gap-1.5">
      {rooms.map(([n, s]) => (
        <span
          key={n}
          className={`flex items-center justify-center rounded font-mono text-[10px] transition-colors ${
            s === "on"
              ? "border border-dta-blue-300/50 bg-dta-blue-600/35 text-white group-hover:bg-dta-blue-600/70"
              : s === "wait"
                ? "border border-white/10 bg-white/15 text-white/60"
                : "border border-white/20 text-white/45"
          }`}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

/** Inmobiliario: embudo comercial en columnas (kanban) con una oportunidad destacada. */
function Inmobiliario() {
  const cols = [3, 2, 2, 1];
  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {cols.map((n, ci) => (
        <div key={ci} className="flex flex-col gap-1.5 rounded border border-white/10 bg-white/[0.03] p-1.5">
          <span className={`h-1 w-1/2 ${skel}`} />
          {Array.from({ length: n }).map((_, i) => {
            const hot = ci === 2 && i === 0;
            return (
              <span
                key={i}
                className={`block rounded-sm px-1.5 py-1.5 transition-colors ${
                  hot ? "bg-dta-blue-600 group-hover:bg-dta-blue-300" : "bg-white/15"
                }`}
              >
                <span className={`block h-1 w-3/4 rounded-full ${hot ? "bg-white/70" : "bg-white/25"}`} />
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Empresas de servicios: cola de tareas / tickets con casillas y avance. */
function Servicios() {
  const rows = [
    { done: true, w: "w-24", p: 100 },
    { done: true, w: "w-20", p: 100 },
    { done: false, w: "w-28", p: 60 },
    { done: false, w: "w-16", p: 25 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <span
            className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border font-mono text-[9px] leading-none transition-colors ${
              r.done ? "border-dta-blue-300 bg-dta-blue-600 text-white group-hover:bg-dta-blue-300 group-hover:text-dta-navy-900" : "border-white/30"
            }`}
          >
            {r.done ? "✓" : ""}
          </span>
          <span className={`h-1.5 ${r.w} rounded-full bg-white/30`} />
          <span className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
            <span style={{ width: `${r.p}%` }} className="block h-full rounded-full bg-dta-blue-300/80" />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Otros sectores: un espacio vacío con borde punteado y un "+": cabe tu empresa. */
function Otros() {
  return (
    <div className="grid h-full place-items-center rounded-md border border-dashed border-white/25">
      <span className="font-mono text-2xl text-dta-blue-300 transition-transform group-hover:scale-110">+</span>
    </div>
  );
}

export const SECTOR_MODULE: Record<string, string> = {
  turismo: "turismo",
  hoteleria: "hoteleria",
  inmobiliario: "inmobiliario",
  servicios: "servicios",
  otros: "otros",
};

export function SectorVisual({ slug, className = "" }: Props) {
  const Visual = { turismo: Turismo, hoteleria: Hoteleria, inmobiliario: Inmobiliario, servicios: Servicios, otros: Otros }[slug] ?? Otros;
  return (
    <div aria-hidden="true" className={`h-36 bg-dta-navy-900 p-5 ${className}`}>
      <Visual />
    </div>
  );
}
