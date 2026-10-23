"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en ms para escalonar tarjetas de una misma fila. */
  delay?: number;
};

/**
 * Aparición suave al hacer scroll (fade + subida de 16px).
 *
 * Diseñado para NO perjudicar SEO ni accesibilidad:
 *  - El HTML del servidor llega visible (sin opacity-0), así que buscadores,
 *    lectores de pantalla y usuarios sin JS ven todo el contenido.
 *  - Solo oculta tras montar, y únicamente lo que está FUERA de pantalla (lo
 *    que ya se ve al cargar nunca parpadea).
 *  - Con `prefers-reduced-motion` no anima nada.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // ya visible

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClasses =
    state === "hidden" ? "opacity-0 translate-y-4" : state === "shown" ? "opacity-100 translate-y-0" : "";

  return (
    <div
      ref={ref}
      style={state === "shown" && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-700 ease-out ${stateClasses} ${className}`}
    >
      {children}
    </div>
  );
}
