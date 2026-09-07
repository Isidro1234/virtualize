import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  cacheComponents: true,
  serverExternalPackages: ['firebase-admin'],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'njinga-worker.njinga.workers.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule?.issuer,
      resourceQuery: { not: [/url/] },
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig