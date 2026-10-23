type ProcessStepProps = {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
};

/**
 * Paso numerado usado en "Así trabajamos en DTA" (Home), "Cómo trabajamos" y
 * el proceso de Digital Audit. Solo usar numeración cuando el contenido es
 * realmente secuencial (proceso real con orden), no como recurso decorativo.
 *
 * Móvil: línea vertical que une los círculos. Escritorio (md+): paso
 * centrado con una línea horizontal hacia el siguiente círculo. Los
 * `calc()` asumen círculo de 36px y `gap-6` (24px) en el contenedor padre
 * (ver ProcessSection); ajustarlos juntos si cambia alguno.
 *
 * Debe renderizarse dentro de un <ol> (usa <li>).
 */
export function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <li className="relative flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-3 md:text-center">
      <div
        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dta-blue-600 text-sm font-bold text-white shadow-sm"
        aria-hidden="true"
      >
        {number}
      </div>

      {!isLast && (
        <>
          <span
            aria-hidden="true"
            className="absolute left-[17px] top-11 -bottom-6 w-px bg-dta-gray-300 md:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute top-[18px] hidden h-px bg-dta-gray-300 md:block"
            style={{ left: "calc(50% + 26px)", right: "calc(-50% + 2px)" }}
          />
        </>
      )}

      <div className="pb-2 md:px-1">
        <div className="text-base font-bold text-dta-black">
          <span className="sr-only">{number}. </span>
          {title}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-dta-gray-600">{description}</p>
      </div>
    </li>
  );
}
