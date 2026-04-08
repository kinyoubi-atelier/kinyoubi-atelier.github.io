/**
 * Asset path helper.
 *
 * With the repo renamed to kinyoubi-atelier.github.io, GitHub Pages
 * serves from root — no subpath prefix needed. This helper is kept
 * as a no-op so existing imports don't break, and it'll be useful
 * again if you ever need a CDN prefix on Vercel.
 */

export function asset(path: string): string {
  return path
}
