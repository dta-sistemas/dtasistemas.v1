
import Image from "next/image";

type LogoProps = {
  /** "light" = fondos blancos, "dark" = fondos oscuros */
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({
  tone = "light",
  className = "",
}: LogoProps) {
  const logoSrc =
    tone === "dark"
      ? "/images/logos/DTA-B-SF.png"
      : "/images/logos/DTA-NG-SF.png";

  return (
    <span
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={logoSrc}
        alt="DTA Sistemas"
        width={260}
        height={100}
        className="h-auto w-[180px] sm:w-[210px]"
        priority={tone === "light"}
      />
    </span>
  );
}
