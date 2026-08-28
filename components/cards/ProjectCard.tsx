import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

type ProjectCardProps = {
  sector: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

/** Card de "Soluciones en acción" — cada caso enfatiza sector + resultado. */
export function ProjectCard({ sector, title, description, image, href }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-card border border-dta-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
    >
      <div className="relative aspect-video bg-dta-navy-900">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
      </div>
      <div className="p-5">
        <div className="text-label uppercase text-dta-blue-600 mb-2">{sector}</div>
        <div className="font-bold text-dta-black">{title}</div>
        <p className="text-sm text-dta-gray-600 mt-1">{description}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-dta-blue-600">
          Ver proyecto <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
}
