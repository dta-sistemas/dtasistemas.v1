type RateLimitResult = { allowed: boolean; retryAfterSeconds?: number };

const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQUESTS = 5; // máximo de envíos por IP en la ventana

/**
 * Rate limiting básico por IP para el formulario de contacto (Fase 0,
 * sección 29 lo exige explícitamente entre los requisitos de seguridad).
 *
 * ⚠️ LIMITACIÓN CONOCIDA: este Map vive en memoria del proceso. En
 * desarrollo o en una sola instancia de servidor funciona correctamente.
 * En un despliegue serverless real (Vercel) con múltiples instancias o
 * cold starts frecuentes, cada instancia puede tener su propio Map vacío
 * — el límite deja de ser estrictamente global entre requests. Sigue
 * siendo una protección real contra scripts simples que golpeen el mismo
 * endpoint repetidamente mientras la instancia esté "tibia", pero NO es
 * la solución definitiva para producción a escala.
 *
 * Para producción robusta, migrar a un store compartido (ver ejemplo
 * comentado abajo con Upstash Redis, que sí es consistente entre
 * instancias serverless) — la firma de `checkRateLimit` no cambiaría, así
 * que submitLead.ts no necesita tocarse al migrar.
 */
const hits = new Map<string, number[]>();

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const recentHits = (hits.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recentHits.length >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - recentHits[0])) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  recentHits.push(now);
  hits.set(identifier, recentHits);
  return { allowed: true };
}

// Ejemplo de migración a Upstash Redis para producción multi-instancia:
//
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
//
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(), // usa UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
//   limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "60 s"),
// });
//
// export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
//   const { success, reset } = await ratelimit.limit(identifier);
//   return success
//     ? { allowed: true }
//     : { allowed: false, retryAfterSeconds: Math.ceil((reset - Date.now()) / 1000) };
// }
