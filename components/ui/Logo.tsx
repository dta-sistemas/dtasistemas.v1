
import Image from "next/image";

type LogoProps = {
  /** light = Navbar | dark = Footer */
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({
  tone = "light",
  className = "",
}: LogoProps) {
  const isFooter = tone === "dark";

  // ==========================================
  // CONFIGURACIÓN DE TAMAÑOS
  // ==========================================

  // NAVBAR
  const navbarWidthMobile = 150;
  const navbarWidthDesktop = 270;

  // FOOTER
  const footerWidthMobile = 200;
  const footerWidthDesktop = 350;

  // ==========================================
  // CONFIGURACIÓN DE ESPACIADOS
  // ==========================================

  // Espacio debajo del logo
  const navbarBottomSpace = -10;
  const footerBottomSpace = 0;

  // ==========================================
  // SELECCIÓN DE LOGO
  // ==========================================

  const logoSrc = isFooter
    ? "/images/logos/DTA-B-SF.png"
    : "/images/logos/DTA-NG-SF.png";

  const mobileWidth = isFooter
    ? footerWidthMobile
    : navbarWidthMobile;

  const desktopWidth = isFooter
    ? footerWidthDesktop
    : navbarWidthDesktop;

  const bottomSpace = isFooter
    ? footerBottomSpace
    : navbarBottomSpace;

  return (
  <span
    className={`inline-flex items-center leading-none ${className}`}
    style={{ marginBottom: `${bottomSpace}px` }}
  >
    <Image
      src={logoSrc}
      alt="DTA Sistemas"
      width={desktopWidth}
      height={Math.round(desktopWidth / 3)}
      className="block h-auto max-w-full"
      style={{
        width: `${mobileWidth}px`,
      }}
      priority={!isFooter}
    />

    <style>{`
      @media (min-width: 640px) {
        .dta-logo-${tone} img {
          width: ${desktopWidth}px !important;
        }
      }
    `}</style>
  </span>
);
}
