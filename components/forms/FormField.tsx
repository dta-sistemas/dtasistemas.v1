import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode, useId } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
};

/**
 * Campos más cómodos de tocar y leer: padding mayor (≥44px de alto), texto de
 * 16px en móvil (evita el zoom automático de iOS al enfocar un input de <16px),
 * borde que se oscurece al hover y anillo + borde azul al foco.
 */
const inputBase =
  "mt-1.5 w-full rounded-input border bg-white px-3.5 py-3 text-base sm:text-sm text-dta-black placeholder:text-dta-gray-400 " +
  "transition-colors hover:border-dta-gray-400 focus:border-dta-blue-600 focus:outline-none focus:ring-2 focus:ring-dta-blue-600/30";

const borderFor = (error?: string) => (error ? "border-red-500 hover:border-red-500" : "border-dta-gray-300");

/**
 * Corrección de accesibilidad (auditoría de Fase 9): el label se asocia al
 * control mediante htmlFor/id, y el mensaje de error vía aria-describedby.
 * Ahora el error además lleva ícono (no depende solo del color rojo) y
 * role="alert" para que los lectores de pantalla lo anuncien al aparecer.
 */
function FieldWrapper({
  id,
  errorId,
  label,
  error,
  required,
  children,
}: BaseProps & { id: string; errorId: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-dta-black">
        {label} {required && <span className="text-dta-blue-600" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * FIX crítico: estos 3 campos eran funciones simples. react-hook-form's
 * `register()` entrega un `ref` para leer el valor del DOM, y React NO pasa
 * `ref` a componentes de función sin forwardRef: RHF nunca veía lo que el
 * usuario escribía, así que el formulario siempre reportaba "Required" y
 * jamás se enviaba.
 */
export const TextField = forwardRef<HTMLInputElement, BaseProps & InputHTMLAttributes<HTMLInputElement>>(function TextField({
  label,
  error,
  required,
  id: idProp,
  ...props
}, ref) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      <input
        {...props}
        ref={ref}
        id={id}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${borderFor(error)}`}
      />
    </FieldWrapper>
  );
});

export const TextareaField = forwardRef<HTMLTextAreaElement, BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextareaField({
  label,
  error,
  required,
  id: idProp,
  ...props
}, ref) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      <textarea
        {...props}
        ref={ref}
        id={id}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} resize-y ${borderFor(error)}`}
      />
    </FieldWrapper>
  );
});

export const SelectField = forwardRef<HTMLSelectElement, BaseProps & SelectHTMLAttributes<HTMLSelectElement>>(function SelectField({
  label,
  error,
  required,
  id: idProp,
  children,
  ...props
}, ref) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      {/* Chevron propio: el nativo varía entre navegadores y rompe la alineación con los demás campos. */}
      <div className="relative">
        <select
          {...props}
          ref={ref}
          id={id}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${inputBase} appearance-none pr-10 ${borderFor(error)}`}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 mt-0.5 -translate-y-1/2 text-dta-gray-600"
          aria-hidden="true"
        />
      </div>
    </FieldWrapper>
  );
});
