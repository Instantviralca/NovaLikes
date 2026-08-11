/**
 * Next.js config — production defaults for images, compression, and safety headers.
 */

import type { NextConfig } from 'next';

/**
 * Content-Security-Policy-Report-Only (not enforced).
 * Monitor violations in the browser console — no report-uri/report-to endpoint configured.
 *
 * Directives:
 * - default-src 'self' — baseline same-origin
 * - base-uri 'self' — block base tag hijacking
 * - object-src 'none' — block plugins
 * - frame-ancestors 'self' — clickjacking mitigation
 * - form-action — allow NovaLikes + Stripe Checkout/hooks posts
 * - img-src — self, data, blob, https images (OG, CDN, analytics pixels)
 * - font-src — self + data fonts
 * - style-src — self + unsafe-inline (Next.js / Tailwind runtime)
 * - script-src — self, inline/eval for Next, Stripe.js, GTM/GA, Clarity
 * - connect-src — APIs for Stripe, GA, Clarity, Vercel vitals
 * - frame-src — Stripe Checkout/js embeds
 * - worker-src — self + blob workers
 * - manifest-src 'self' — PWA manifest
 */
const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com https://hooks.stripe.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",
  "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
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
      {
        source: '/product/buy-100-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-250-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-500-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-1000-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-3000-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-5000-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-10000-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/product/buy-15000-tiktok-followers',
        destination: '/buy-tiktok-followers',
        permanent: true,
      },
      {
        source: '/instagram-services-prices',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-100-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-250-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-500-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-1000-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-2500-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-5000-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-10000-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/product/buy-25000-instagram-followers',
        destination: '/buy-instagram-followers',
        permanent: true,
      },
      {
        source: '/buy-youtube-subscribers-views',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-100-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-200-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-500-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-1000-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-2000-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-3000-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/product/buy-5000-youtube-subscribers',
        destination: '/buy-youtube-subscribers',
        permanent: true,
      },
      {
        source: '/buy-facebook-likes-followers',
        destination: '/buy-facebook-followers',
        permanent: true,
      },
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
