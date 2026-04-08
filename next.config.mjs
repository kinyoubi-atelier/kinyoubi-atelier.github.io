/** @type {import('next').NextConfig} */

// GitHub Pages deploys to a subpath: /kinyoubi/
// When you move to Vercel with a custom domain, remove basePath and assetPrefix.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = 'kinyoubi'

const nextConfig = {
  // ─── Static Export ───
  output: 'export',

  // ─── Base Path (GitHub Pages subpath) ───
  // Remove these two lines when switching to Vercel / custom domain
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',

  // ─── Images ───
  images: {
    unoptimized: true,
  },

  // ─── Trailing Slashes ───
  trailingSlash: true,
}

export default nextConfig
