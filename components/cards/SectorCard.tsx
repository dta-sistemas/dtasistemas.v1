import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, LucideIcon } from "lucide-react";

type SectorCardProps = {
  name: string;
  tags: string[];
  image?: string;
  icon?: LucideIcon; // usado en la card + en la variante "Otros sectores" (sin imagen)
  href: string;
  isOther?: boolean;
};

/**
 * Card de sector — grid oscuro con imagen de fondo (Turismo, Inmobiliario,
 * Hotelería, Empresas de servicios) o variante "Otros sectores" con borde
 * punteado sin imagen (Fase 0, sección 07 y sección 16 — no doorway pages).
 *
 * Mejoras: degradado de abajo hacia arriba (el texto siempre legible, la imagen
 * se aprecia en la parte superior), flecha que aparece al hover y altura
 * completa para alinear la fila.
 */
export function SectorCard({ name, tags, image, icon: Icon, href, isOther = false }: SectorCardProps) {
  if (isOther) {
    return (
      <Link
        href={href}
        className="group relative flex aspect-[4/5] h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-card border-2 border-dashed border-dta-gray-300 bg-white/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600 hover:bg-white hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
      >
        {Icon && (
          <Icon
            size={24}
            className="mb-1 text-dta-gray-600 transition-colors group-hover:text-dta-blue-600"
            aria-hidden="true"
          />
        )}
        <div className="text-sm font-bold uppercase tracking-wide text-dta-black">{name}</div>
        <div className="text-xs text-dta-gray-600">{tags.join(" · ")}</div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] h-full overflow-hidden rounded-card bg-dta-navy-900 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600"
    >
      {image && (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 20vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-dta-navy-950 via-dta-navy-900/55 to-dta-navy-900/10"
      />
      <ArrowUpRight
        size={18}
        className="absolute right-4 top-4 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-end p-5 text-white">
        {Icon && <Icon size={20} className="mb-2 text-dta-blue-300" aria-hidden="true" />}
        <div className="text-sm font-bold uppercase tracking-wide">{name}</div>
        <div className="mt-1 text-xs text-white/75">{tags.join(" · ")}</div>
      </div>
    </Link>
  );
}
