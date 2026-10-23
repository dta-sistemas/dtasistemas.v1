type LogoProps = {
  /** "dark" = versión para fondos navy (footer). */
  tone?: "light" | "dark";
};

/**
 * Marca de DTA Sistemas (isotipo + wordmark) en CSS puro.
 * NOTA: es un isotipo provisional construido con la paleta del sitio.
 * Si ya tienes el logo oficial en SVG, reemplaza solo el contenido de este
 * componente: Navbar y Footer lo consumen desde aquí.
 */
export function Logo({ tone = "light" }: LogoProps) {
  const isDark = tone === "dark";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`relative grid h-9 w-9 place-items-center rounded-[10px] text-[15px] font-extrabold tracking-tight ${
          isDark ? "bg-white/10 text-white ring-1 ring-inset ring-white/15" : "bg-dta-navy-900 text-white"
        }`}
      >
        D
        <span
          className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-dta-blue-600 ring-2 ${
            isDark ? "ring-dta-navy-900" : "ring-white"
          }`}
        />
      </span>
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-tight ${isDark ? "text-white" : "text-dta-black"}`}>
          DTA
        </span>
        <span
          className={`mt-1 block text-[10px] font-semibold tracking-[0.28em] ${
            isDark ? "text-white/60" : "text-dta-gray-600"
          }`}
        >
          SISTEMAS
        </span>
      </span>
    </span>
  );
}
