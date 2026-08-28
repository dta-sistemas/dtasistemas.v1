import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "dark";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-dta-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-white text-dta-black border border-dta-gray-200 hover:border-dta-black",
  dark: "bg-dta-navy-900 text-white hover:bg-dta-navy-800",
};

const base =
  "inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600";

/**
 * Botón de marca DTA. Usar variant="primary" para el CTA principal
 * de cada vista ("Hablemos", "Analizar mi empresa"), "secondary" para
 * CTAs de apoyo, "dark" solo sobre fondos claros cuando se necesita
 * más peso visual que "secondary".
 *
 * Fase 13: hrefs externos (mailto:, tel:, http(s)://, #anchors) usan <a>
 * normal — el <Link> de next-intl asume rutas internas del sitio y les
 * antepondría el prefijo de locale incorrectamente (ej. "/en/mailto:...").
 */
function isExternalHref(href: string): boolean {
  return /^(mailto:|tel:|https?:\/\/|#)/.test(href);
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", showArrow = true, className = "" } = props;
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (isExternalHref(props.href)) {
      return (
        <a href={props.href} className={classes}>
          {children}
          {showArrow && <ArrowRight size={16} aria-hidden="true" />}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        {showArrow && <ArrowRight size={16} aria-hidden="true" />}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes}>
      {children}
      {showArrow && <ArrowRight size={16} aria-hidden="true" />}
    </button>
  );
}
