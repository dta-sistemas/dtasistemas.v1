import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode, useId } from "react";

type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
};

const inputBase =
  "mt-1 w-full rounded-input border px-3 py-2 text-sm text-dta-black placeholder:text-dta-gray-600/50 focus:outline-none focus:ring-2 focus:ring-dta-blue-600 transition-colors";

/**
 * Corrección de accesibilidad (auditoría de Fase 9): el label ahora se
 * asocia al control mediante htmlFor/id (antes solo estaban visualmente
 * adyacentes, sin relación programática — un lector de pantalla no podía
 * anunciar "Nombre completo, campo de texto" al enfocar el input). El
 * mensaje de error se asocia vía aria-describedby, y solo cuando existe.
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
      <label htmlFor={id} className="text-xs font-semibold text-dta-black">
        {label} {required && <span className="text-dta-blue-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  error,
  required,
  id: idProp,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${error ? "border-red-400" : "border-dta-gray-200"}`}
      />
    </FieldWrapper>
  );
}

export function TextareaField({
  label,
  error,
  required,
  id: idProp,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      <textarea
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${error ? "border-red-400" : "border-dta-gray-200"}`}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  error,
  required,
  id: idProp,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldWrapper id={id} errorId={errorId} label={label} error={error} required={required}>
      <select
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} bg-white ${error ? "border-red-400" : "border-dta-gray-200"}`}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
