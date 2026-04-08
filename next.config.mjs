/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Static Export ───
  // Generates a fully static site in /out that can be hosted anywhere:
  // GitHub Pages, Vercel, Netlify, S3, or any CDN.
  output: 'export',

  // ─── Images ───
  // Static export can't use Next.js image optimization server.
  // Images are served as-is (still use modern formats via source files).
  images: {
    unoptimized: true,
  },

  // ─── Trailing Slashes ───
  // GitHub Pages expects /about/index.html, not /about.html
  trailingSlash: true,

  // Note: Security headers (X-Frame-Options, etc.) are now handled by
  // the hosting platform. For Vercel, see vercel.json. For GitHub Pages,
  // these are set via the _headers file or Cloudflare.
}

export default nextConfig
