/** @type {import('next').NextConfig} */

const nextConfig = {
  // ─── Static Export ───
  output: 'export',

  // ─── Images ───
  images: {
    unoptimized: true,
  },

  // ─── Trailing Slashes ───
  trailingSlash: true,
}

export default nextConfig
