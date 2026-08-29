import type { NextConfig } from "next";
import path from "path";


const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),

  // ── External packages (moved out of experimental in Next.js 15+) ──────────
  serverExternalPackages: ['firebase-admin'],

  // ── Experimental ──────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    cacheComponents:true,
  },
  

  // ── Images ────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  'njinga-worker.njinga.workers.dev',
        pathname:  '/**',
      },
      {
        protocol: 'https',
        hostname:  'images.pexels.com',
        pathname:  '/**',
      },
    ],
  },

  // ── Proxy API calls to Express backend ────────────────────────────────────

  // ── Webpack (SVGR support) ─────────────────────────────────────────────────
  webpack(config) {
    // Exclude SVGs from the default file loader
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    // Handle SVGs with SVGR
    config.module.rules.push({
      test:          /\.svg$/i,
      issuer:        fileLoaderRule?.issuer,
      resourceQuery: { not: [/url/] },
      use:           ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig