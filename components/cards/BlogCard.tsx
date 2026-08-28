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
    <div className="rounded-card border border-dta-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <Link href={href} className="block relative aspect-video bg-dta-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
      </Link>
      <div className="p-5">
        <Link
          href={categoryHref}
          className="text-label uppercase text-dta-blue-600 mb-2 inline-block hover:underline"
        >
          {category}
        </Link>
        <Link href={href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600">
          <h3 className="font-bold text-dta-black leading-snug">{title}</h3>
        </Link>
        <div className="flex items-center gap-3 text-xs text-dta-gray-600 mt-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {readingTime} min
          </span>
        </div>
      </div>
    </div>
  );
}
