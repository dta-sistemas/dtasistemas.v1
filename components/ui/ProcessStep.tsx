import { ArrowRight } from "lucide-react";

type ProcessStepProps = {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
};

/**
 * Paso numerado usado en "Así trabajamos en DTA" (Home) y "Cómo trabajamos".
 * Solo usar numeración cuando el contenido es realmente secuencial
 * (proceso real con orden), no como recurso decorativo — ver frontend-design skill.
 */
export function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <div className="flex items-start gap-3 flex-1">
      <div className="w-9 h-9 rounded-full bg-dta-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
        {number}
      </div>
      <div className="pb-2">
        <div className="text-sm font-bold text-dta-black">{title}</div>
        <p className="text-xs text-dta-gray-600 mt-1 leading-relaxed">{description}</p>
      </div>
      {!isLast && <ArrowRight size={16} className="text-dta-gray-200 mt-2 hidden md:block" />}
    </div>
  );
}
