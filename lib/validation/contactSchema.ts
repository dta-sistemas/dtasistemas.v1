import { z } from "zod";
import type { AppLocale } from "@/i18n/routing";

const MESSAGES = {
  es: {
    fullName: "Ingresa tu nombre completo.",
    company: "Ingresa el nombre de tu empresa.",
    email: "Ingresa un correo electrónico válido.",
    phone: "Ingresa un teléfono válido.",
    helpType: "Selecciona en qué podemos ayudarte.",
    message: "Cuéntanos un poco más sobre tu proyecto o necesidad.",
    turnstile: "Verificación anti-spam pendiente.",
  },
  en: {
    fullName: "Enter your full name.",
    company: "Enter your company name.",
    email: "Enter a valid email address.",
    phone: "Enter a valid phone number.",
    helpType: "Select what we can help you with.",
    message: "Tell us a bit more about your project or need.",
    turnstile: "Anti-spam verification pending.",
  },
} as const;

const HELP_TYPE_VALUES = [
  "sistemas",
  "integracion",
  "inteligencia",
  "automatizacion-ia",
  "desarrollo-digital",
  "dta-digital-audit",
  "otro",
] as const;

/**
 * Esquema del formulario de contacto — Fase 13: función que genera el
 * schema según el locale, para que los mensajes de error de zod (que
 * viajan tanto al cliente vía @hookform/resolvers/zod como al servidor
 * dentro de submitLead) salgan en el idioma correcto. Se usa tanto en el
 * cliente como en el servidor — nunca se confía solo en la validación del
 * cliente (Fase 0, sección 21).
 */
export function getContactFormSchema(locale: AppLocale) {
  const m = MESSAGES[locale];

  return z.object({
    fullName: z.string({ required_error: m.fullName, invalid_type_error: m.fullName }).trim().min(2, m.fullName),
    // Empresa es opcional (vive en "Más detalles"); si se escribe, debe tener al menos 2 caracteres.
    company: z.string().trim().optional().refine((v) => !v || v.length >= 2, m.company),
    email: z.string({ required_error: m.email, invalid_type_error: m.email }).trim().email(m.email),
    // Teléfono: obligatorio y prioritario (junto al nombre) para que un especialista pueda dar seguimiento.
    // Para volverlo opcional: z.string().trim().optional().refine((v) => !v || v.length >= 8, m.phone)
    phone: z.string({ required_error: m.phone, invalid_type_error: m.phone }).trim().min(8, m.phone),
    city: z.string().trim().optional(),
    helpType: z.enum(HELP_TYPE_VALUES, { errorMap: () => ({ message: m.helpType }) }),
    message: z.string({ required_error: m.message, invalid_type_error: m.message }).trim().min(10, m.message),
    turnstileToken: z.string({ required_error: m.turnstile }).min(1, m.turnstile),
    source: z.string().optional(),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>;

export const HELP_TYPE_KEYS = HELP_TYPE_VALUES;
