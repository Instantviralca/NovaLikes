import { describe, expect, it } from 'vitest';

import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import { hreflangMapWithMarket, localizeMarketHref, marketSwitcherHref } from '@/lib/market/paths';
import { MARKETS, MARKET_SERVICE_PAGES_INDEXABLE } from '@/lib/market/config';

describe('Geo market routing', () => {
  it('maps core service paths to market-prefixed equivalents', () => {
    expect(localizeMarketHref('/', 'ca')).toBe('/ca/');
    expect(localizeMarketHref('/buy-instagram-followers', 'ca')).toBe(
      '/ca/buy-instagram-followers',
    );
    expect(localizeMarketHref('/', 'au')).toBe('/au/');
    expect(localizeMarketHref('/buy-instagram-followers', 'au')).toBe(
      '/au/buy-instagram-followers',
    );
    expect(localizeMarketHref('/', 'uk')).toBe('/uk/');
    expect(localizeMarketHref('/buy-instagram-followers', 'uk')).toBe(
      '/uk/buy-instagram-followers',
    );
    expect(localizeMarketHref('/about', 'ca')).toBe('/about');
    expect(localizeMarketHref('/faq', 'au')).toBe('/faq');
  });

  it('switches market while preserving the core page path', () => {
    expect(marketSwitcherHref('/uk/buy-instagram-followers', 'ca')).toBe(
      '/ca/buy-instagram-followers',
    );
    expect(marketSwitcherHref('/uk/buy-instagram-followers', null)).toBe('/buy-instagram-followers');
    expect(marketSwitcherHref('/buy-instagram-followers', 'uk')).toBe('/uk/buy-instagram-followers');
    expect(marketSwitcherHref('/about', 'uk')).toBe('/about');
  });

  it('includes primary-market en-GB/en-CA/en-AU (not en-US) in hreflang for homepage; service rows follow MARKET_SERVICE_PAGES_INDEXABLE', () => {
    const serviceMap = hreflangMapWithMarket('/buy-instagram-followers');
    if (MARKET_SERVICE_PAGES_INDEXABLE) {
      expect(serviceMap['en-GB']).toBe('/uk/buy-instagram-followers');
      expect(serviceMap['en-CA']).toBe('/ca/buy-instagram-followers');
      expect(serviceMap['en-AU']).toBe('/au/buy-instagram-followers');
    } else {
      expect(serviceMap['en-GB']).toBeUndefined();
      expect(serviceMap['en-CA']).toBeUndefined();
      expect(serviceMap['en-AU']).toBeUndefined();
    }
    expect(serviceMap['en-US']).toBeUndefined();
    expect(serviceMap.en).toBe('/buy-instagram-followers');
    expect(serviceMap['x-default']).toBe('/buy-instagram-followers');

    const homeMap = hreflangMapWithMarket('/');
    expect(homeMap['en-GB']).toBe('/uk/');
    expect(homeMap['en-CA']).toBe('/ca/');
    expect(homeMap['en-AU']).toBe('/au/');

    const aboutMap = hreflangMapWithMarket('/about');
    expect(aboutMap['en-CA']).toBeUndefined();
    expect(aboutMap['en-AU']).toBeUndefined();
    expect(aboutMap['en-US']).toBeUndefined();
    expect(aboutMap['en-GB']).toBeUndefined();
  });

  it('covers all 11 routes per market', () => {
    const paths = ['/', ...CORE_SERVICE_SLUGS.map((slug) => `/${slug}`)];
    expect(paths).toHaveLength(11);
    for (const market of MARKETS) {
      for (const pathName of paths) {
        expect(localizeMarketHref(pathName, market)).toMatch(new RegExp(`^/${market}/`));
      }
    }
  });
});
