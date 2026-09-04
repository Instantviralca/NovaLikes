/**
 * Native first-party analytics event taxonomy.
 * Client may not emit server-only events via /api/analytics/collect.
 */

export const CLIENT_ANALYTICS_EVENTS = [
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
] as const;

export const SERVER_ANALYTICS_EVENTS = [
  'order_created',
  'payment_started',
  'payment_failed',
  'payment_cancelled',
  'payment_paid',
  'order_completed',
] as const;

export type ClientAnalyticsEventName = (typeof CLIENT_ANALYTICS_EVENTS)[number];
export type ServerAnalyticsEventName = (typeof SERVER_ANALYTICS_EVENTS)[number];
export type NativeAnalyticsEventName = ClientAnalyticsEventName | ServerAnalyticsEventName;

const CLIENT_SET = new Set<string>(CLIENT_ANALYTICS_EVENTS);
const SERVER_SET = new Set<string>(SERVER_ANALYTICS_EVENTS);

/** Legacy funnel names → canonical native names (ingest mapping). */
export const LEGACY_FUNNEL_ALIASES: Record<string, NativeAnalyticsEventName | null> = {
  page_view: 'page_view',
  home_page_view: 'page_view',
  service_page_view: 'service_view',
  cart_item_add: 'cart_add',
  checkout_view: 'checkout_started',
  checkout_submit: 'checkout_started',
  /** Client purchase is ignored; paid conversion is server-only. */
  purchase: null,
};

export function isClientAnalyticsEvent(name: string): name is ClientAnalyticsEventName {
  return CLIENT_SET.has(name);
}

export function isServerAnalyticsEvent(name: string): name is ServerAnalyticsEventName {
  return SERVER_SET.has(name);
}

export function canonicalizeClientEventName(raw: string): ClientAnalyticsEventName | null {
  const trimmed = raw.trim();
  if (isServerAnalyticsEvent(trimmed)) return null;
  if (isClientAnalyticsEvent(trimmed)) return trimmed;
  if (Object.prototype.hasOwnProperty.call(LEGACY_FUNNEL_ALIASES, trimmed)) {
    const mapped = LEGACY_FUNNEL_ALIASES[trimmed];
    return mapped && isClientAnalyticsEvent(mapped) ? mapped : null;
  }
  return null;
}

export function eventCategoryFor(name: NativeAnalyticsEventName): string {
  if (name.startsWith('cart_') || name === 'cart_recovery_returned') return 'cart';
  if (name.startsWith('checkout_')) return 'checkout';
  if (name.startsWith('payment_') || name.startsWith('order_')) return 'commerce';
  if (name === 'session_started' || name === 'landing_view' || name === 'page_view') return 'engagement';
  if (name === 'service_view') return 'service';
  if (name.startsWith('coupon_')) return 'coupon';
  return 'other';
}

export function isExcludedAnalyticsPath(pagePath: string): boolean {
  const path = pagePath.split('?')[0] || '/';
  if (path === '/admin' || path.startsWith('/admin/')) return true;
  if (path === '/api' || path.startsWith('/api/')) return true;
  if (path === '/author' || path.startsWith('/author/')) return true;
  if (path === '/robots.txt' || path === '/sitemap.xml' || path === '/sitemap.xsl') return true;
  if (path.startsWith('/sitemaps/')) return true;
  if (path === '/llms.txt' || path === '/manifest.webmanifest') return true;
  if (path === '/unavailable' || path.startsWith('/_next/')) return true;
  if (path.startsWith('/assets/') || path.startsWith('/icons/')) return true;
  return false;
}

const BOT_UA =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|pingdom|uptimerobot|headlesschrome|phantomjs|scrapy|curl\/|wget\/|python-requests|go-http-client|monitoring/i;

export function isLikelyBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua || !ua.trim()) return false;
  return BOT_UA.test(ua);
}
