/**
 * Folio de registro de un lead, ej. "DTA-261107-4F2A": fecha (AAMMDD, hora de Cancún) + 4
 * caracteres aleatorios sin letras ambiguas (sin 0/O ni 1/I). Aparece en el correo del equipo
 * y en el del cliente, para que ambos hablen del mismo registro.
 */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateFolio(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Cancun",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `DTA-${get("year")}${get("month")}${get("day")}-${suffix}`;
}
