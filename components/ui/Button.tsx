import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { buttonClasses, arrowClasses, type ButtonVariant } from "./buttonStyles";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
};

/**
 * Botón de marca DTA. Usar variant="primary" para el CTA principal
 * de cada vista ("Hablemos", "Analizar mi empresa"), "secondary" para
 * CTAs de apoyo, "dark" solo sobre fondos claros cuando se necesita
 * más peso visual que "secondary". Sobre fondos navy: "light" (principal)
 * y "ghost-light" (apoyo).
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
  const classes = buttonClasses(variant, className);
  const arrow = showArrow ? <ArrowRight size={16} className={arrowClasses} aria-hidden="true" /> : null;

  if ("href" in props && props.href) {
    if (isExternalHref(props.href)) {
      return (
        <a href={props.href} className={classes}>
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  // Evita pasar al DOM las props propias del componente.
  const { variant: _v, showArrow: _s, className: _c, children: _ch, ...rest } = buttonProps;
  return (
    <button {...rest} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
