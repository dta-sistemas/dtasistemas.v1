import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Envoltorios de next/link y next/navigation conscientes del locale.
 * Se usan en TODO el código en vez de los de next/navigation directos:
 * <Link href="/soluciones"> automáticamente resuelve a "/soluciones" en
 * español (sin prefijo) o "/en/soluciones" en inglés — el resto del código
 * nunca construye el prefijo de idioma a mano.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
