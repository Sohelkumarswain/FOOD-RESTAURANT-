/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true, // changed from false to true
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sohelkumarswain.github.io',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
