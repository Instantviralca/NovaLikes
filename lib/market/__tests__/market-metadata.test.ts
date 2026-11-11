import { describe, expect, it } from 'vitest';

import { MARKET_SERVICE_PAGES_INDEXABLE } from '@/lib/market/config';
import { buildMarketMetadata, marketServiceMetadata } from '@/lib/market/metadata';

describe('market metadata (SEO flag)', () => {
  it('keeps market home hreflang including en-GB/en-CA/en-AU when market services are noindex', () => {
    const m = buildMarketMetadata({
      market: 'uk',
      pathname: '/',
      title: 'T',
      description: 'D',
    });
    const langs = m.alternates?.languages as Record<string, string> | undefined;
    expect(langs?.['en-GB']).toMatch(/\/uk\/?$/);
    expect(langs?.['en-CA']).toMatch(/\/ca\/?$/);
    expect(langs?.['en-AU']).toMatch(/\/au\/?$/);
  });

  it('primary-market service pages: noindex follow and no market hreflang when MARKET_SERVICE_PAGES_INDEXABLE is false', () => {
    expect(MARKET_SERVICE_PAGES_INDEXABLE).toBe(false);
    const m = marketServiceMetadata('uk', 'buy-instagram-followers', 'T', 'D');
    expect(m.robots).toMatchObject({
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    });
    const langs = m.alternates?.languages as Record<string, string> | undefined;
    expect(langs?.['en-GB']).toBeUndefined();
    expect(langs?.['en-CA']).toBeUndefined();
    expect(langs?.['en-AU']).toBeUndefined();
    expect(Object.keys(langs ?? {}).sort()).toEqual(
      ['ar', 'de', 'en', 'es', 'fr', 'it', 'pt-BR', 'x-default'].sort(),
    );
  });
});
