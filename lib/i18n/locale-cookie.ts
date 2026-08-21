import { isLocale, type Locale } from '@/lib/i18n/config';

export const LOCALE_COOKIE = 'nl-locale';

export const COMMERCE_PATHS = ['/cart', '/checkout', '/order-success', '/track-order'] as const;

export function isCommercePath(pathname: string): boolean {
  const path = pathname.split('?')[0] ?? pathname;
  return COMMERCE_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function parseLocaleCookie(value: string | null | undefined): Locale | null {
  return isLocale(value) ? value : null;
}

/**
 * Next.js prefetches every in-viewport locale link. Those requests must not
 * overwrite nl-locale, or the last prefetched language (Arabic) clobbers cart/checkout.
 *
 * Flight headers (`rsc`, `next-router-prefetch`) are stripped before middleware,
 * so skip persistence when the request uses the `_rsc` union query instead.
 */
export function shouldPersistLocaleCookie(headers: Headers, url?: URL): boolean {
  if (url?.searchParams.has('_rsc')) return false;
  if (headers.get('next-url')) return false;
  const accept = (headers.get('accept') ?? '').toLowerCase();
  if (accept.includes('text/x-component')) return false;
  if (headers.get('next-router-prefetch')) return false;
  if (headers.get('next-router-segment-prefetch')) return false;
  if (headers.get('x-middleware-prefetch') === '1') return false;
  const purpose = `${headers.get('purpose') ?? ''} ${headers.get('sec-purpose') ?? ''}`.toLowerCase();
  if (purpose.includes('prefetch')) return false;
  return true;
}

export function localeCookieHeader(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
