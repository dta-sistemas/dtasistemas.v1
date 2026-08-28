import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LucideIcon } from "lucide-react";

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
 * Hotelería, Empresas de servicios) o variante "Otros sectores" en navy
 * sólido sin imagen (Fase 0, sección 07 y sección 16 — no doorway pages).
 *
 * Actualización Fase 4: soporta `icon` (mostrado sobre la imagen o en la
 * variante "otros") e `isOther` para el estilo con borde punteado.
 */
export function SectorCard({ name, tags, image, icon: Icon, href, isOther = false }: SectorCardProps) {
  if (isOther) {
    return (
      <Link
        href={href}
        className="group relative flex flex-col justify-center items-center text-center gap-2 rounded-card overflow-hidden aspect-[4/5] border-2 border-dashed border-dta-gray-200 bg-dta-gray-50 p-5 hover:border-dta-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
      >
        {Icon && <Icon size={22} className="text-dta-gray-600 group-hover:text-dta-blue-600 mb-1" />}
        <div className="font-bold uppercase tracking-wide text-sm text-dta-black">{name}</div>
        <div className="text-xs text-dta-gray-600">{tags.join(" · ")}</div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative block rounded-card overflow-hidden aspect-[4/5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 20vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-dta-navy-900/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-dta-navy-900" />
      )}
      <div className="relative h-full flex flex-col justify-end p-5 text-white">
        {Icon && <Icon size={20} className="mb-2 opacity-80" />}
        <div className="font-bold uppercase tracking-wide text-sm">{name}</div>
        <div className="text-xs text-white/70 mt-1">{tags.join(" · ")}</div>
      </div>
    </Link>
  );
}
