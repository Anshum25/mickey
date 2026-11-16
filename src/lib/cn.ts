/** Minimal class-name joiner. No dependency needed for this surface area. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
