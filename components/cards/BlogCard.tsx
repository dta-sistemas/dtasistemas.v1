import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = {
  category: string;
  categoryHref: string;
  title: string;
  date: string; // ya formateada para mostrar
  readingTime: number;
  image: string;
  href: string;
};

/** Card de artículo — usada en /blog, /blog/categoria/[categoria] y "artículos relacionados". */
export function BlogCard({ category, categoryHref, title, date, readingTime, image, href }: BlogCardProps) {
  return (
    <div className="group overflow-hidden rounded-card border border-dta-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        href={href}
        className="relative block aspect-video overflow-hidden bg-dta-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <Link
          href={categoryHref}
          className="mb-2 inline-block text-label uppercase text-dta-blue-600 hover:underline"
        >
          {category}
        </Link>
        <Link
          href={href}
          className="block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
        >
          <h3 className="font-bold leading-snug text-dta-black transition-colors group-hover:text-dta-blue-600">{title}</h3>
        </Link>
        <div className="mt-3 flex items-center gap-3 text-xs text-dta-gray-600">
          <span className="flex items-center gap-1">
            <Calendar size={12} aria-hidden="true" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden="true" /> {readingTime} min
          </span>
        </div>
      </div>
    </div>
  );
}
