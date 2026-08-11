/**
 * Site / checkout host helpers for multi-domain checkout (checkout.novalikes.com).
 * Client-safe: only reads NEXT_PUBLIC_* values.
 */

function trimOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/$/, '');
  return trimmed || undefined;
}

/** Marketing / main site origin (e.g. https://novalikes.com). */
export function getSiteOrigin(): string {
  return (
    trimOrigin(process.env.NEXT_PUBLIC_SITE_URL) ||
    trimOrigin(process.env.SITE_URL) ||
    'http://localhost:3000'
  );
}

/**
 * External checkout origin (e.g. https://checkout.novalikes.com).
 * Falls back to main site `/checkout` path origin when unset (local/dev).
 */
export function getCheckoutOrigin(): string {
  const configured = trimOrigin(process.env.NEXT_PUBLIC_CHECKOUT_URL);
  if (configured) return configured;
  return getSiteOrigin();
}

/** Absolute URL for the checkout experience. */
export function getCheckoutUrl(path = '/'): string {
  const origin = getCheckoutOrigin();
  const site = getSiteOrigin();
  // Same-origin fallback: use /checkout on the main site.
  if (origin === site) {
    const normalized = path === '/' ? '/checkout' : path.startsWith('/') ? path : `/${path}`;
    return `${site}${normalized === '/checkout' ? '/checkout' : normalized}`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized === '/' ? '/' : normalized}`;
}

export function getSiteUrlPath(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Parent cookie domain (e.g. .novalikes.com). Null on localhost. */
export function getCartCookieDomain(): string | null {
  try {
    // Prefer the live browser host so cookies work even if SITE_URL env is wrong.
    const host =
      typeof window !== 'undefined'
        ? window.location.hostname.toLowerCase()
        : new URL(getSiteOrigin()).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return null;
    }
    // Reject public-suffix style hosts where Domain= would be ignored (e.g. vercel.app).
    if (host === 'vercel.app' || host.endsWith('.vercel.app')) {
      return null;
    }
    // checkout.novalikes.com + novalikes.com → .novalikes.com
    const parts = host.split('.');
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join('.')}`;
    }
    return null;
  } catch {
    return null;
  }
}

/** Server-only cookie Domain from configured site origin. */
export function getCartCookieDomainFromSiteOrigin(): string | null {
  try {
    const host = new URL(getSiteOrigin()).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return null;
    }
    if (host === 'vercel.app' || host.endsWith('.vercel.app')) {
      return null;
    }
    const parts = host.split('.');
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join('.')}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function normalizeHost(host: string | null | undefined): string {
  return (host ?? '').split(':')[0]?.toLowerCase() ?? '';
}

export function getCheckoutHostname(): string {
  try {
    return normalizeHost(new URL(getCheckoutOrigin()).hostname);
  } catch {
    return '';
  }
}

export function getSiteHostname(): string {
  try {
    return normalizeHost(new URL(getSiteOrigin()).hostname);
  } catch {
    return '';
  }
}

/**
 * True when a separate checkout subdomain is configured
 * (NEXT_PUBLIC_CHECKOUT_URL differs from the main site origin).
 */
export function isDedicatedCheckoutConfigured(): boolean {
  const checkoutHost = getCheckoutHostname();
  const siteHost = getSiteHostname();
  return Boolean(checkoutHost && siteHost && checkoutHost !== siteHost);
}

/** True when this request Host is the dedicated checkout host. */
export function isCheckoutHostname(host: string | null | undefined): boolean {
  const requestHost = normalizeHost(host);
  const checkoutHost = getCheckoutHostname();
  if (!requestHost || !checkoutHost) return false;
  // Same-origin fallback (no dedicated subdomain configured).
  if (!isDedicatedCheckoutConfigured()) return false;
  return requestHost === checkoutHost;
}

/** Dev-only: ?checkoutHost=1 forces checkout-host behaviour on any host. */
export function isCheckoutHostForced(searchParams: URLSearchParams | string): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  const params =
    typeof searchParams === 'string'
      ? new URLSearchParams(searchParams.startsWith('?') ? searchParams.slice(1) : searchParams)
      : searchParams;
  return params.get('checkoutHost') === '1';
}
