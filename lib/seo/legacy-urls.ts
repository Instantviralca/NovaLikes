/**
 * One-hop handling for legacy InstantViral-era URLs (middleware).
 * Pure: no NextResponse here so it stays easy to test.
 */

import type { NextRequest, NextResponse } from 'next/server';

/**
 * Public site origin for redirects behind a reverse proxy (or direct).
 * Uses X-Forwarded-Proto / X-Forwarded-Host when present; in production
 * defaults proto to https when Forwarded-Proto is missing (typical TLS termination).
 */
export function publicSiteOrigin(request: NextRequest): string {
  const xfProto = request.headers.get('x-forwarded-proto');
  const firstProto = xfProto?.split(',')[0]?.trim();
  const protocol =
    firstProto || (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  const xfHost = request.headers.get('x-forwarded-host');
  const hostHeader = request.headers.get('host');
  const host = (
    xfHost?.split(',')[0]?.trim() ||
    hostHeader?.trim() ||
    'localhost'
  ).replace(/:\d+$/, '');

  return `${protocol}://${host}`;
}

/** Absolute URL for redirects (Location header) using forwarded Host/Proto. */
export function publicAbsoluteUrl(
  request: NextRequest,
  pathname: string,
  search = '',
): URL {
  const origin = publicSiteOrigin(request);
  const url = new URL(pathname === '' ? '/' : pathname, `${origin}/`);
  url.search = search;
  return url;
}

export type LegacyUrlDecision =
  | { kind: 'pass' }
  | { kind: 'redirect'; pathname: string; status: 301 }
  | { kind: 'gone'; body?: string };

/**
 * Normalize path for matching: leading slash, lowercase, no trailing slash (except root).
 */
export function normalizeLegacyPathname(pathname: string): string {
  let p = pathname.trim();
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.toLowerCase();
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

function includesToken(haystack: string, needle: string): boolean {
  return haystack.includes(needle);
}

/**
 * Map `/product/<slug>` to a modern `/buy-...` path, or null for 410.
 */
export function legacyProductRedirectTarget(slug: string): string | null {
  const s = slug.toLowerCase();

  const hasIg = includesToken(s, 'instagram');
  const hasTt = includesToken(s, 'tiktok');
  const hasFb = includesToken(s, 'facebook');
  const platformCount = [hasIg, hasTt, hasFb].filter(Boolean).length;
  if (platformCount !== 1) return null;

  const hasFollowers = includesToken(s, 'followers');
  const hasLikes = includesToken(s, 'likes');
  const hasViews = includesToken(s, 'views');
  const hasComments = includesToken(s, 'comments');
  const metricCount = [hasFollowers, hasLikes, hasViews, hasComments].filter(Boolean).length;
  if (metricCount !== 1) return null;

  if (hasIg) {
    if (hasFollowers) return '/buy-instagram-followers';
    if (hasLikes) return '/buy-instagram-likes';
    if (hasViews) return '/buy-instagram-views';
    if (hasComments) return '/buy-instagram-comments';
  }
  if (hasTt) {
    if (hasFollowers) return '/buy-tiktok-followers';
    if (hasLikes) return '/buy-tiktok-likes';
    if (hasViews) return '/buy-tiktok-views';
  }
  if (hasFb) {
    if (hasFollowers) return '/buy-facebook-followers';
    if (hasLikes) {
      const hasPost = includesToken(s, 'post');
      const hasPage = includesToken(s, 'page');
      if (includesToken(s, 'post-likes') || (hasPost && hasPage)) {
        return '/buy-facebook-post-likes';
      }
      if (
        includesToken(s, 'page-likes') ||
        (hasPage && !hasPost)
      ) {
        return '/buy-facebook-page-likes';
      }
      return '/buy-facebook-post-likes';
    }
  }

  return null;
}

/** `<platform>-services-prices` → redirect or 410 */
export function legacyServicesPricesTarget(platform: string): string | undefined {
  switch (platform) {
    case 'instagram':
      return '/buy-instagram-followers';
    case 'tiktok':
      return '/buy-tiktok-followers';
    case 'facebook':
      return '/buy-facebook-followers';
    default:
      return undefined;
  }
}

/**
 * Decide how to handle a normalized path (after lowercasing; trailing slash stripped).
 */
export function resolveLegacyUrl(normalizedPath: string): LegacyUrlDecision {
  if (!normalizedPath.startsWith('/')) return { kind: 'pass' };

  const servicesPrices = /^\/([\w-]+)-services-prices$/.exec(normalizedPath);
  if (servicesPrices) {
    const platform = servicesPrices[1]!;
    const target = legacyServicesPricesTarget(platform);
    if (target) return { kind: 'redirect', pathname: target, status: 301 };
    return { kind: 'gone', body: 'Gone' };
  }

  const productMatch = /^\/product\/(.+)$/.exec(normalizedPath);
  if (productMatch) {
    const slug = productMatch[1]!;
    const target = legacyProductRedirectTarget(slug);
    if (target !== null) {
      return { kind: 'redirect', pathname: target, status: 301 };
    }
    return { kind: 'gone', body: 'Gone' };
  }

  return { kind: 'pass' };
}

/** Build middleware response for legacy URLs, or null to continue. */
export function legacyUrlMiddlewareResponse(
  request: NextRequest,
  pathname: string,
  NextResponse: typeof import('next/server').NextResponse,
): NextResponse | null {
  const norm = normalizeLegacyPathname(pathname);
  const decision = resolveLegacyUrl(norm);
  if (decision.kind === 'pass') return null;
  if (decision.kind === 'redirect') {
    const url = publicAbsoluteUrl(request, decision.pathname, '');
    return NextResponse.redirect(url, 301);
  }
  const body = decision.body ?? 'Gone';
  return new NextResponse(body, {
    status: 410,
    headers: { 'x-robots-tag': 'noindex' },
  });
}
