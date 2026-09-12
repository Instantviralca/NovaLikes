/**
 * Content-Security-Policy inventory for NovaLikes.
 *
 * Status: Report-Only only.
 * CSP ENFORCEMENT REQUIRES BROWSER PRODUCTION OBSERVATION — do not flip to
 * Content-Security-Policy without live violation review (Mollie hosted checkout,
 * GTM/GA/Clarity when enabled, Next inline scripts).
 *
 * Required origins (current application):
 * - Next runtime: 'self', 'unsafe-inline', 'unsafe-eval' (App Router / hydration)
 * - Mollie hosted checkout + optional Components rollback: *.mollie.com, js.mollie.com
 * - Analytics (env-gated but script URLs present): GTM, GA4, Clarity
 * - Images/fonts: https:/data:/blob: (OG, CDN, uploads)
 * - Stripe domains retained while Stripe provider/webhook compatibility code exists (paused)
 */

export const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com https://hooks.stripe.com https://*.mollie.com https://js.mollie.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.mollie.com https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",
  "connect-src 'self' https://api.mollie.com https://*.mollie.com https://api.stripe.com https://checkout.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com",
  "frame-src 'self' https://js.mollie.com https://*.mollie.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

/** Origins that must remain present for current Mollie checkout path. */
export const CSP_REQUIRED_MOLLIE_TOKENS = [
  'https://*.mollie.com',
  'https://js.mollie.com',
  'https://api.mollie.com',
] as const;
