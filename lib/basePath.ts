/**
 * Asset path helper for GitHub Pages subpath deployment.
 *
 * In GitHub Actions, NEXT_PUBLIC_BASE_PATH is set to "/kinyoubi".
 * Locally or on Vercel, it's empty — assets load from root.
 *
 * Usage: asset('/logos/logo-transparent.svg') → '/kinyoubi/logos/logo-transparent.svg'
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function asset(path: string): string {
  return `${basePath}${path}`
}

export { basePath }
