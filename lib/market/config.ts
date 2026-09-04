/**
 * Geo market configuration — regional pages at /ca/, /au/, /us/, /uk/, etc.
 * Separate from language locales in lib/i18n/config.ts.
 */

import { CORE_SERVICE_SLUGS, isCoreServiceSlug } from '@/lib/i18n/config';

export const MARKETS = ['ca', 'au', 'us', 'uk'] as const;
export type Market = (typeof MARKETS)[number];

export const MARKET_PREFIXES: Record<Market, string> = {
  ca: 'ca',
  au: 'au',
  us: 'us',
  uk: 'uk',
};

export const MARKET_HREFLANG: Record<Market, string> = {
  ca: 'en-CA',
  au: 'en-AU',
  us: 'en-US',
  uk: 'en-GB',
};

export const MARKET_OG_LOCALE: Record<Market, string> = {
  ca: 'en_CA',
  au: 'en_AU',
  us: 'en_US',
  uk: 'en_GB',
};

/** Schema.org areaServed country name per market. */
export const MARKET_COUNTRY_NAME: Record<Market, string> = {
  ca: 'Canada',
  au: 'Australia',
  us: 'United States',
  uk: 'United Kingdom',
};

/** Region labels for the footer language / market switcher. */
export const MARKET_NATIVE_NAMES: Record<Market, string> = {
  ca: 'Canada (English)',
  au: 'Australia (English)',
  us: 'United States (English)',
  uk: 'United Kingdom (English)',
};

export const MARKET_SHORT_LABELS: Record<Market, string> = {
  ca: 'CA',
  au: 'AU',
  us: 'US',
  uk: 'UK',
};

export const GLOBAL_ENGLISH_LABEL = 'International (English)';

/** Block friendly country slug aliases (e.g. /canada → use /ca/). */
export const MARKET_BLOCKED_ALIASES: Record<string, Market> = {
  canada: 'ca',
  australia: 'au',
  usa: 'us',
  'united-states': 'us',
  'united-kingdom': 'uk',
  britain: 'uk',
  'great-britain': 'uk',
};

export const GEO_INTERNAL_PREFIX = '/geo';
export const MARKET_HEADER = 'x-nl-market';
export const MARKET_PATH_HEADER = 'x-nl-market-pathname';

const MARKET_SET = new Set<string>(MARKETS);

/** Unprefixed paths that have a Canada equivalent. */
export const MARKET_CORE_PATHS = ['/', ...CORE_SERVICE_SLUGS.map((slug) => `/${slug}`)] as const;

export type MarketCorePath = (typeof MARKET_CORE_PATHS)[number];

export function isMarket(value: string | null | undefined): value is Market {
  return Boolean(value && MARKET_SET.has(value));
}

export function isMarketCorePath(pathname: string): boolean {
  const normalized = pathname === '' ? '/' : pathname;
  if (normalized === '/') return true;
  if (normalized.startsWith('/buy-')) {
    return isCoreServiceSlug(normalized.slice(1));
  }
  return false;
}

export function isInternalGeoPath(pathname: string): boolean {
  return pathname === GEO_INTERNAL_PREFIX || pathname.startsWith(`${GEO_INTERNAL_PREFIX}/`);
}
