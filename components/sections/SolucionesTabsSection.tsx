"use client";

import { useState } from "react";
import { SolutionsGrid } from "./SolutionsGrid";

type SolucionesTabsSectionProps = {
  tabs: string[];
};

/**
 * FIX post-entrega: reemplaza el patrón anterior (TabsFilter recibiendo
 * una función como `children` desde el Server Component de la página).
 * React Server Components no permite pasar funciones como props a un
 * Client Component — solo datos serializables — lo que causaba:
 * "Functions are not valid as a child of Client Components" y dejaba
 * /soluciones en blanco (error 500).
 *
 * Solución: un solo Client Component que administra el estado de la tab
 * activa Y renderiza el grid directamente (SolutionsGrid ya es Client
 * Component desde Fase 13, así que esta composición es 100%
 * cliente-a-cliente, sin cruzar el límite servidor/cliente con una función).
 * La página (Server Component) solo pasa `tabs: string[]` — dato plano,
 * perfectamente serializable.
 */
export function SolucionesTabsSection({ tabs }: SolucionesTabsSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600 ${
              activeTab === tab
                ? "bg-dta-blue-600 text-white"
                : "bg-white text-dta-black border border-dta-gray-200 hover:border-dta-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <SolutionsGrid activeTab={activeTab} />
    </div>
  );
}
