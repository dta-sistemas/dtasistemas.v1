import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  sector: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

/** Card de "Soluciones en acción" — cada caso enfatiza sector + resultado. */
export function ProjectCard({ sector, title, description, image, href }: ProjectCardProps) {
  const tc = useTranslations("common");

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-dta-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
    >
      <div className="relative aspect-video overflow-hidden bg-dta-navy-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dta-navy-950/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 text-label uppercase text-dta-blue-600">{sector}</div>
        <div className="font-bold leading-snug text-dta-black">{title}</div>
        <p className="mt-1.5 text-sm leading-relaxed text-dta-gray-600">{description}</p>
        <div className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-dta-blue-600">
          {tc("verProyecto")}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
