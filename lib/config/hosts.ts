/**
 * Site origin helpers. NovaLikes cart/checkout UI is always same-origin
 * on the main website (novalikes.com/cart, /checkout, /order-success).
 * Third-party payment authorization pages may still be hosted by the processor.
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
 * Checkout origin is the main site. NEXT_PUBLIC_CHECKOUT_URL is ignored so
 * cart/checkout never move onto a NovaLikes checkout subdomain.
 */
export function getCheckoutOrigin(): string {
  return getSiteOrigin();
}

/** Absolute URL for the checkout experience on the main site. */
export function getCheckoutUrl(path = '/'): string {
  const site = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/' || normalized === '/checkout') {
    return `${site}/checkout`;
  }
  return `${site}${normalized}`;
}

export function getSiteUrlPath(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Parent cookie domain (e.g. .novalikes.com). Null on localhost. */
export function getCartCookieDomain(): string | null {
  try {
    const host =
      typeof window !== 'undefined'
        ? window.location.hostname.toLowerCase()
        : new URL(getSiteOrigin()).hostname.toLowerCase();
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

/** Dedicated NovaLikes checkout hosts are not used. */
export function isDedicatedCheckoutConfigured(): boolean {
  return false;
}

/** True when this request Host is a dedicated checkout host (never). */
export function isCheckoutHostname(): boolean {
  return false;
}

/** Dev-only checkout-host override is disabled. */
export function isCheckoutHostForced(): boolean {
  return false;
}
