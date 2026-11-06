/**
 * Next.js config — production defaults for images, compression, and safety headers.
 */

import type { NextConfig } from 'next';

import { getLegacyLocalizedRedirects } from './lib/i18n/slugs';
import { getUsMarketPermanentRedirects } from './lib/market/us-redirects';
import { CONTENT_SECURITY_POLICY_REPORT_ONLY } from './lib/security/csp';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  /**
   * Next injects a trailing-slash → no-slash redirect before middleware runs, which
   * caused legacy product/services-prices URLs to take two hops (308 then our 301/410).
   * We strip trailing slashes in middleware after legacy handling instead.
   */
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/learn/buy-instagram-followers-global',
        destination: '/learn',
        permanent: true,
      },
      {
        source: '/buy-tiktok-followers-likes',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      // Legacy /product/* and *-services-prices → removed here: Next evaluates redirects
      // before middleware, so these blocked single-hop 301/410 from lib/seo/legacy-urls.ts.
      {
        source: '/buy-facebook-likes-followers',
        destination: '/buy-facebook-followers',
        permanent: true,
      },
      {
        source: '/authors/novalikes-editorial-team',
        destination: '/authors/najaf-khan',
        permanent: true,
      },
      ...getUsMarketPermanentRedirects(),
      ...getLegacyLocalizedRedirects(),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
          },
          {
            // Report-Only — CSP ENFORCEMENT REQUIRES BROWSER PRODUCTION OBSERVATION
            key: 'Content-Security-Policy-Report-Only',
            value: CONTENT_SECURITY_POLICY_REPORT_ONLY,
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og-default.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
