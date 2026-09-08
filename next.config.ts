import type { NextConfig } from "next";
import path from "path";


const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(self), microphone=(self), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https:",
      "font-src 'self'",
      "connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://*.stream-io-api.com wss://*.stream-io-api.com https://*.stream-io-video.com wss://*.stream-io-video.com https://*.getstream.io wss://*.getstream.io https://njinga-worker.njinga.workers.dev",
      "media-src 'self' blob:",
      "frame-ancestors 'none'",
    ].join('; ')
  }
]
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
async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
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