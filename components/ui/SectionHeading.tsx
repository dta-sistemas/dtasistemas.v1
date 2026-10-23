type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string; // fragmento del título a resaltar en azul, ej. "trabaje como un sistema"
  subtitle?: string;
  align?: "left" | "center";
  /** "dark" para usar sobre fondos navy. */
  tone?: "light" | "dark";
};

/**
 * Patrón repetido en todos los mockups: eyebrow uppercase azul,
 * headline con fragmento resaltado en azul, subtítulo gris.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";
  const idx = highlight ? title.indexOf(highlight) : -1;

  return (
    <div className={`max-w-2xl ${isCenter ? "text-center mx-auto" : "text-left"}`}>
      {eyebrow && (
        <div
          className={`mb-4 inline-flex items-center gap-2 text-label uppercase ${
            isDark ? "text-dta-blue-300" : "text-dta-blue-600"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {eyebrow}
        </div>
      )}
      <h2 className={isDark ? "text-h2 text-white" : "text-h2 text-dta-black"}>
        {idx >= 0 && highlight ? (
          <>
            {title.slice(0, idx)}
            <span className={isDark ? "text-dta-blue-300" : "text-dta-blue-600"}>{highlight}</span>
            {title.slice(idx + highlight.length)}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className={`text-body-lg mt-4 ${isDark ? "text-white/70" : "text-dta-gray-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}
