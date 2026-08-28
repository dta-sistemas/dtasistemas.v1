const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifica el token de Cloudflare Turnstile contra la API de Cloudflare.
 * Se ejecuta SIEMPRE en el servidor (dentro de submitLead) — el token del
 * cliente nunca se confía por sí solo. Requiere la variable de entorno
 * TURNSTILE_SECRET_KEY (server-only, nunca NEXT_PUBLIC_).
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // En desarrollo sin la key configurada, no bloqueamos el flujo para no
    // frenar al equipo, pero se registra para que no pase desapercibido.
    console.warn("[leads] TURNSTILE_SECRET_KEY no configurada — verificación omitida.");
    return process.env.NODE_ENV !== "production";
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error("[leads] Error verificando Turnstile:", error);
    return false;
  }
}
