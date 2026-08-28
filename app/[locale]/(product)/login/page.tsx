import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";

/**
 * /login — shell visual únicamente. NO hay lógica de autenticación
 * implementada (Fase 0, sección 43: "NO desarrollar todavía el SaaS").
 * El formulario está deshabilitado a propósito: existe para reservar la
 * URL y el patrón visual, no para simular una función que no existe.
 */
export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Section tone="subtle" className="min-h-[70vh] flex items-center">
      <div className="max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <div className="font-extrabold text-lg text-dta-black">
            DTA <span className="text-dta-blue-600">Platform</span>
          </div>
          <p className="text-sm text-dta-gray-600 mt-2">
            El acceso a la plataforma todavía no está disponible.
          </p>
        </div>

        <div className="rounded-card bg-white border border-dta-gray-200 p-6">
          <fieldset disabled className="space-y-4 opacity-60">
            <div>
              <label className="text-xs font-semibold text-dta-black" htmlFor="login-email">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="tu@empresa.com"
                className="mt-1 w-full rounded-input border border-dta-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-dta-black" htmlFor="login-password">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-input border border-dta-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <button className="w-full rounded-full bg-dta-blue-600 text-white text-sm font-semibold py-2.5">
              Iniciar sesión
            </button>
          </fieldset>
        </div>

        <p className="text-center text-sm text-dta-gray-600 mt-6">
          ¿Quieres saber cuándo esté disponible?{" "}
          <Link href="/contacto" className="text-dta-blue-600 font-semibold hover:underline">
            Contáctanos
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
