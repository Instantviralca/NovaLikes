/**
 * Funnel event allowlist + country helpers for first-party analytics ingest.
 * Includes native canonical names and legacy aliases for consent bypass / admin.
 */

export const FUNNEL_EVENT_NAMES = [
  // Native canonical
  'session_started',
  'page_view',
  'landing_view',
  'service_view',
  'cart_add',
  'cart_remove',
  'cart_quantity_change',
  'cart_view',
  'checkout_started',
  'checkout_email_entered',
  'coupon_applied',
  'coupon_failed',
  'cart_recovery_returned',
  // Legacy (pre-upgrade rows / call sites)
  'home_page_view',
  'service_page_view',
  'cart_item_add',
  'checkout_view',
  'checkout_submit',
  'purchase',
] as const;

export type FunnelEventName = (typeof FUNNEL_EVENT_NAMES)[number];

const FUNNEL_EVENT_SET = new Set<string>(FUNNEL_EVENT_NAMES);

export const LANDING_EVENT_NAMES = new Set<string>([
  'landing_view',
  'session_started',
  'page_view',
  'home_page_view',
  'service_page_view',
  'service_view',
]);

export const CART_EVENT_NAMES = new Set<string>(['cart_add', 'cart_item_add']);

export const CHECKOUT_EVENT_NAMES = new Set<string>([
  'checkout_started',
  'checkout_view',
  'checkout_submit',
]);

export const PURCHASE_EVENT_NAMES = new Set<string>([
  'payment_paid',
  'order_completed',
  'purchase',
]);

export const ORDER_CREATED_EVENT_NAMES = new Set<string>(['order_created']);

export function isFunnelEventName(name: string): boolean {
  return FUNNEL_EVENT_SET.has(name);
}

export function isAdminPath(pagePath: string): boolean {
  return pagePath === '/admin' || pagePath.startsWith('/admin/');
}

export function isCheckoutPath(pagePath: string): boolean {
  return pagePath === '/checkout' || pagePath.startsWith('/checkout/');
}

/** Resolve ISO-3166-1 alpha-2 country from CDN / edge headers. */
export function resolveCountryFromHeaders(headers: Headers): string {
  const candidates = [
    headers.get('x-vercel-ip-country'),
    headers.get('cf-ipcountry'),
    headers.get('cloudfront-viewer-country'),
    headers.get('x-country-code'),
  ];
  for (const raw of candidates) {
    const code = raw?.trim().toUpperCase();
    if (code && /^[A-Z]{2}$/.test(code) && code !== 'XX' && code !== 'T1') {
      return code;
    }
  }
  return 'XX';
}

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  IN: 'India',
  PK: 'Pakistan',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  NL: 'Netherlands',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  IE: 'Ireland',
  NZ: 'New Zealand',
  BR: 'Brazil',
  MX: 'Mexico',
  ES: 'Spain',
  IT: 'Italy',
  PL: 'Poland',
  TR: 'Turkey',
  SG: 'Singapore',
  MY: 'Malaysia',
  PH: 'Philippines',
  ID: 'Indonesia',
  NG: 'Nigeria',
  ZA: 'South Africa',
  XX: 'Unknown',
};

export function countryDisplayName(code: string): string {
  const normalized = code.trim().toUpperCase() || 'XX';
  return COUNTRY_NAMES[normalized] ?? normalized;
}
