import { describe, expect, it } from 'vitest';

import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import packageDisplayNames from '@/lib/i18n/package-display-names.json';
import type { Locale } from '@/lib/i18n/config';

/** English catalog titles paired with `expected` entries in package-display-names.json. */
const CATALOG_CASES: Record<'es' | 'fr' | 'de' | 'it' | 'pt-br', readonly string[]> = {
  es: [
    '10 Premium Instagram Comments',
    '25 High Quality Instagram Comments',
    '1000 Facebook Page Likes',
    '2500 Instagram Likes',
    '10000 High Quality TikTok Views',
  ],
  fr: [
    '10 Premium Instagram Comments',
    '25 High Quality Instagram Comments',
    '1000 Facebook Page Likes',
    '2500 Instagram Likes',
    '10000 High Quality TikTok Views',
  ],
  de: [
    '10 Premium Instagram Comments',
    '1000 Facebook Page Likes',
    '2500 Instagram Likes',
    '10000 High Quality TikTok Views',
  ],
  it: [
    '10 Premium Instagram Comments',
    '25 High Quality Instagram Comments',
    '1000 Facebook Page Likes',
    '2500 Instagram Likes',
    '10000 High Quality TikTok Views',
  ],
  'pt-br': [
    '10 Premium Instagram Comments',
    '25 High Quality Instagram Comments',
    '1000 Facebook Page Likes',
    '2500 Instagram Likes',
    '10000 High Quality TikTok Views',
  ],
};

describe('localizePackageDisplayName', () => {
  for (const locale of ['es', 'fr', 'de', 'it', 'pt-br'] as const) {
    describe(locale, () => {
      const expected = packageDisplayNames.expected[locale];
      const catalog = CATALOG_CASES[locale];

      it('has the same number of catalog fixtures as expected strings', () => {
        expect(catalog.length).toBe(expected.length);
      });

      for (let i = 0; i < catalog.length; i++) {
        const english = catalog[i]!;
        const want = expected[i]!;

        it(`${english} → ${want}`, () => {
          expect(localizePackageDisplayName(english, locale as Locale)).toBe(want);
        });
      }
    });
  }

  it('leaves English catalog names unchanged', () => {
    expect(localizePackageDisplayName('2500 Instagram Likes', 'en')).toBe(
      '2500 Instagram Likes',
    );
  });
});
