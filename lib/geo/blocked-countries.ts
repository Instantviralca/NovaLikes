/**
 * Geo availability — block public site access by visitor country (CDN headers).
 */

import { resolveCountryFromHeaders } from '@/lib/analytics/funnel-events';

/** ISO-3166-1 alpha-2 codes that must not reach the public storefront. */
export const BLOCKED_COUNTRY_CODES = [] as const;

export type BlockedCountryCode = (typeof BLOCKED_COUNTRY_CODES)[number];

const BLOCKED = new Set<string>(BLOCKED_COUNTRY_CODES);

export function isGeoBlockDisabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  const raw = env.IV_GEO_BLOCK_DISABLED?.trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes';
}

export function isBlockedCountryCode(code: string | null | undefined): boolean {
  if (!code) return false;
  return BLOCKED.has(code.trim().toUpperCase());
}

export function resolveRequestCountry(headers: Headers): string {
  return resolveCountryFromHeaders(headers);
}

/**
 * Paths that remain reachable from blocked countries
 * (admin ops, APIs/webhooks, SEO files, unsubscribe, unavailable page).
 */
export function isGeoBlockExemptPath(pathname: string): boolean {
  if (pathname === '/unavailable' || pathname.startsWith('/unavailable/')) {
    return true;
  }
  if (pathname === '/unsubscribe' || pathname.startsWith('/unsubscribe/')) {
    return true;
  }
  // Crawlers / Search Console must always reach these.
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt'
  ) {
    return true;
  }
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/api/')) return true;
  return false;
}

export function shouldBlockRequest(args: {
  pathname: string;
  headers: Headers;
  env?: NodeJS.ProcessEnv;
}): boolean {
  if (isGeoBlockDisabled(args.env)) return false;
  if (isGeoBlockExemptPath(args.pathname)) return false;
  const country = resolveRequestCountry(args.headers);
  // Missing/unknown country (typical local dev) — do not block.
  if (!country || country === 'XX') return false;
  return isBlockedCountryCode(country);
}
