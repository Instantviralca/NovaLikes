import { describe, expect, it } from 'vitest';

import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import {
  getUsMarketPermanentRedirects,
  usMarketRedirectDestination,
} from '@/lib/market/us-redirects';

describe('US market redirects to root English', () => {
  it('maps /us homepage and each core service to the unprefixed path', () => {
    expect(usMarketRedirectDestination('/us')).toBe('/');
    expect(usMarketRedirectDestination('/us/')).toBe('/');
    for (const slug of CORE_SERVICE_SLUGS) {
      expect(usMarketRedirectDestination(`/us/${slug}`)).toBe(`/${slug}`);
    }
  });

  it('sends /usa and /united-states to / in a single hop (not via /us)', () => {
    expect(usMarketRedirectDestination('/usa')).toBe('/');
    expect(usMarketRedirectDestination('/usa/')).toBe('/');
    expect(usMarketRedirectDestination('/united-states')).toBe('/');
    expect(usMarketRedirectDestination('/united-states/buy-instagram-followers')).toBe('/');
  });

  it('ignores non-US paths', () => {
    expect(usMarketRedirectDestination('/uk')).toBeNull();
    expect(usMarketRedirectDestination('/ca/buy-instagram-followers')).toBeNull();
    expect(usMarketRedirectDestination('/buy-instagram-followers')).toBeNull();
  });

  it('exports permanent next.config redirects for the 11 /us URLs plus aliases', () => {
    const redirects = getUsMarketPermanentRedirects();
    expect(redirects.every((r) => r.permanent)).toBe(true);
    const bySource = new Map(redirects.map((r) => [r.source, r.destination]));
    expect(bySource.get('/us')).toBe('/');
    expect(bySource.get('/usa')).toBe('/');
    expect(bySource.get('/united-states')).toBe('/');
    for (const slug of CORE_SERVICE_SLUGS) {
      expect(bySource.get(`/us/${slug}`)).toBe(`/${slug}`);
    }
  });
});
