type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string; // fragmento del título a resaltar en azul, ej. "trabaje como un sistema"
  subtitle?: string;
  align?: "left" | "center";
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
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <div className="text-label uppercase text-dta-blue-600 mb-3">{eyebrow}</div>
      )}
      <h2 className="text-display-sm md:text-h2 text-dta-black">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-dta-blue-600">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className="text-body-lg text-dta-gray-600 mt-4">{subtitle}</p>}
    </div>
  );
}
