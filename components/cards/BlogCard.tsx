import { Link } from "@/i18n/navigation";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = {
  category: string;
  categoryHref: string;
  title: string;
  date: string; // ya formateada para mostrar
  readingTime: number;
  /** Sin uso: las tarjetas son tipográficas (public/images/blog no existe en el repo y mostraba imágenes rotas). */
  image?: string;
  href: string;
};

/** Artículo del blog: categoría, titular serif, fecha y tiempo de lectura. Sin imagen. */
export function BlogCard({ category, categoryHref, title, date, readingTime, href }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col border-t border-dta-black pt-5">
      <Link href={categoryHref} className="w-fit font-mono text-xs text-dta-blue-600 hover:underline">
        {category}
      </Link>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-dta-black">
        <Link
          href={href}
          className="rounded transition-colors duration-150 group-hover:text-dta-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
        >
          {title}
        </Link>
      </h3>
      <div className="mt-auto flex items-center gap-4 pt-6 text-sm text-dta-gray-600">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} aria-hidden="true" /> {date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} aria-hidden="true" /> {readingTime} min
        </span>
      </div>
    </article>
  );
}
