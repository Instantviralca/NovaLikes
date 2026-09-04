import {
  DEFAULT_LOCALE,
  HREFLANG,
  LOCALES,
  type Locale,
} from '@/lib/i18n/config';
import { normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';
import { decodePathname } from '@/lib/i18n/slugs';
import {
  isMarket,
  isMarketCorePath,
  MARKET_BLOCKED_ALIASES,
  MARKET_HREFLANG,
  MARKET_PREFIXES,
  MARKETS,
  type Market,
} from '@/lib/market/config';
import { localizeHref, parseLocalePath, stripLocalePrefix } from '@/lib/i18n/paths';

export type ParsedMarketPath = {
  market: Market | null;
  /** English unprefixed path (`/`, `/buy-instagram-followers`). */
  pathname: string;
};

/** English core path with locale and market prefixes removed. */
export function getBareCorePath(rawPath: string): string {
  const { market, pathname } = parseMarketPath(rawPath);
  if (market) return pathname;
  return parseLocalePath(rawPath).pathname;
}

/**
 * Footer / region switcher destination for global English or a geo market.
 * Non-core paths fall back to the global English URL.
 */
export function marketSwitcherHref(rawPath: string, market: Market | null): string {
  const bare = getBareCorePath(rawPath);
  if (!market) {
    return localizeHref(bare, DEFAULT_LOCALE);
  }
  return localizeMarketHref(bare, market);
}

export function parseMarketPath(rawPath: string): ParsedMarketPath {
  const pathname = normalizeCanonicalPath(decodePathname(rawPath));

  for (const market of MARKETS) {
    const prefix = MARKET_PREFIXES[market];
    if (pathname === `/${prefix}`) {
      return { market, pathname: '/' };
    }
    if (pathname.startsWith(`/${prefix}/`)) {
      const rest = pathname.slice(prefix.length + 1);
      const restPath = rest.startsWith('/') ? rest : `/${rest}`;
      return { market, pathname: restPath };
    }
  }

  return { market: null, pathname: stripLocalePrefix(pathname) };
}

export function stripMarketPrefix(path: string): string {
  return parseMarketPath(path).pathname;
}

export function getMarketFromPath(path: string): Market | null {
  return parseMarketPath(path).market;
}

/**
 * Build the public /ca/ URL for a core English path.
 * Non-market paths (About, FAQ, legal, etc.) stay on global URLs.
 */
export function localizeMarketHref(path: string, market: Market): string {
  const parsed = parseMarketPath(path);
  const bare = parsed.market ? parsed.pathname : parseLocalePath(path).pathname;

  if (!isMarketCorePath(bare)) {
    return bare;
  }

  const prefix = MARKET_PREFIXES[market];
  return bare === '/' ? `/${prefix}/` : `/${prefix}${bare}`;
}

export function marketInternalPath(market: Market, pathname: string): string {
  const bare = pathname === '/' ? '' : pathname;
  return `/geo/${market}${bare}`;
}

export function publicPathsEqual(a: string, b: string): boolean {
  return normalizeCanonicalPath(decodePathname(a)) === normalizeCanonicalPath(decodePathname(b));
}

/**
 * Resolve href for the current locale and optional Canada market.
 * Market takes precedence for core service/home paths.
 */
export function resolvePublicHref(
  path: string,
  options: { locale?: Locale; market?: Market | null },
): string {
  const { locale = DEFAULT_LOCALE, market = null } = options;
  if (market) {
    return localizeMarketHref(path, market);
  }
  return localizeHref(path, locale);
}

/**
 * Full hreflang map including en-CA for market-eligible core paths.
 */
export function hreflangMapWithMarket(pathname: string): Record<string, string> {
  const bare = stripMarketPrefix(pathname);
  const hrefs: Record<string, string> = {};

  for (const locale of LOCALES) {
    hrefs[HREFLANG[locale]] = localizeHref(bare, locale);
  }
  hrefs['x-default'] = localizeHref(bare, DEFAULT_LOCALE);

  if (isMarketCorePath(bare)) {
    for (const market of MARKETS) {
      hrefs[MARKET_HREFLANG[market]] = localizeMarketHref(bare, market);
    }
  }

  return hrefs;
}

export function isBlockedMarketAlias(pathname: string): boolean {
  const first = pathname.split('/').filter(Boolean)[0];
  if (!first) return false;
  const lower = first.toLowerCase();
  if (lower in MARKET_BLOCKED_ALIASES) return true;
  if (first !== lower && isMarket(lower)) return true;
  return false;
}
