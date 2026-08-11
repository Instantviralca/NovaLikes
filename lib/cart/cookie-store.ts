/**
 * Cross-subdomain cart cookie — Domain=.novalikes.com when on brand hosts.
 * sessionStorage remains a local cache; cookie is the handoff to checkout host.
 */

import { getCartCookieDomain } from '@/lib/config/hosts';
import {
  CART_STORAGE_KEY,
  deserializeCart,
  serializeCart,
} from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

export const CART_COOKIE_NAME = 'iv_cart_v1';

/** Soft browser cookie limit — leave headroom for other cookies. */
export const CART_COOKIE_MAX_CHARS = 3500;

function buildCookieAttributes(maxAgeSeconds: number): string {
  const parts = [`Path=/`, `Max-Age=${maxAgeSeconds}`, `SameSite=Lax`];
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parts.push('Secure');
  }
  const domain = getCartCookieDomain();
  if (domain) {
    parts.push(`Domain=${domain}`);
  }
  return parts.join('; ');
}

export function readCartCookie(): CartState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CART_COOKIE_NAME}=`));
  if (!match) return null;
  const raw = decodeURIComponent(match.slice(CART_COOKIE_NAME.length + 1));
  return deserializeCart(raw);
}

export function writeCartCookie(state: CartState): boolean {
  if (typeof document === 'undefined') return false;
  const payload = serializeCart(state);
  if (payload.length > CART_COOKIE_MAX_CHARS) {
    // Oversized — keep sessionStorage; checkout uses server handoff instead.
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(CART_STORAGE_KEY, payload);
    }
    return false;
  }
  // 7 days
  document.cookie = `${CART_COOKIE_NAME}=${encodeURIComponent(payload)}; ${buildCookieAttributes(60 * 60 * 24 * 7)}`;
  return true;
}

export function clearCartCookie(): void {
  if (typeof document === 'undefined') return;
  // Clear host-only and parent-domain variants.
  document.cookie = `${CART_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  const domain = getCartCookieDomain();
  if (domain) {
    document.cookie = `${CART_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; Domain=${domain}`;
  }
}

/** Prefer cookie (cross-host), then sessionStorage. */
export function hydrateCartFromStores(): CartState | null {
  const fromCookie = readCartCookie();
  if (fromCookie && fromCookie.items.length > 0) return fromCookie;
  if (typeof window === 'undefined') return null;
  return deserializeCart(window.sessionStorage.getItem(CART_STORAGE_KEY));
}
