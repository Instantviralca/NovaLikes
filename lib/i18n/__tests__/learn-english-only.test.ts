import { describe, expect, it } from 'vitest';

import { routes } from '@/config/routes';
import { getMainNavigation } from '@/data/navigation';
import {
  LOCALIZED_LOCALES,
  isCoreLocalizedPath,
  isEnglishOnlyLearnPath,
} from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/content/load';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import { getLocalizedFooterColumns } from '@/lib/i18n/footer';
import {
  hreflangMap,
  localeCaseRedirectTarget,
  localePrefixedLearnRedirectTarget,
  localeSwitcherHref,
  localizeHref,
} from '@/lib/i18n/paths';
import { buildPageMetadataForRoute } from '@/lib/seo/metadata';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';

const LEARN_PATHS = ['/learn', '/learn/how-tiktok-views-work', '/learn/instagram'] as const;

describe('Learn is English-only', () => {
  it('is not a core localized path', () => {
    for (const path of LEARN_PATHS) {
      expect(isEnglishOnlyLearnPath(path)).toBe(true);
      expect(isCoreLocalizedPath(path)).toBe(false);
    }
  });

  it('keeps English Learn permalinks unprefixed', () => {
    expect(localizeHref('/learn', 'en')).toBe('/learn');
    expect(localizeHref('/learn/how-tiktok-views-work', 'en')).toBe(
      '/learn/how-tiktok-views-work',
    );
    for (const locale of LOCALIZED_LOCALES) {
      expect(localizeHref('/learn', locale)).toBe('/learn');
      expect(localizeHref('/learn/how-tiktok-views-work', locale)).toBe(
        '/learn/how-tiktok-views-work',
      );
    }
  });

  it('shows Learn in English nav and footer only', () => {
    expect(getMainNavigation('en').some((item) => item.id === 'nav-learn')).toBe(true);
    expect(getMainNavigation('en').some((item) => item.href === routes.learn)).toBe(true);

    const englishFooter = getLocalizedFooterColumns('en', ENGLISH_UI);
    expect(englishFooter.flatMap((column) => column.links).some((link) => link.href === routes.learn)).toBe(
      true,
    );

    for (const locale of LOCALIZED_LOCALES) {
      expect(getMainNavigation(locale).some((item) => item.id === 'nav-learn')).toBe(false);
      const links = getLocalizedFooterColumns(locale, loadUi(locale)).flatMap(
        (column) => column.links,
      );
      expect(links.some((link) => link.href === routes.learn)).toBe(false);
      expect(links.some((link) => link.href.startsWith('/learn'))).toBe(false);
    }
  });

  it('redirects locale-prefixed Learn URLs one hop to English', () => {
    for (const locale of LOCALIZED_LOCALES) {
      expect(localePrefixedLearnRedirectTarget(`/${locale}/learn`)).toBe('/learn');
      expect(
        localePrefixedLearnRedirectTarget(`/${locale}/learn/how-tiktok-views-work`),
      ).toBe('/learn/how-tiktok-views-work');
      expect(localePrefixedLearnRedirectTarget(`/${locale}/faq`)).toBeNull();
    }
    expect(localePrefixedLearnRedirectTarget('/learn')).toBeNull();
    expect(localeCaseRedirectTarget('/ES/learn')).toBe('/learn');
    expect(localeCaseRedirectTarget('/ES/learn/how-tiktok-views-work')).toBe(
      '/learn/how-tiktok-views-work',
    );
  });

  it('does not invent localized Learn destinations in the language switcher', () => {
    expect(localeSwitcherHref('/learn', 'en')).toBe('/learn');
    expect(localeSwitcherHref('/learn/how-tiktok-views-work', 'en')).toBe(
      '/learn/how-tiktok-views-work',
    );
    expect(localeSwitcherHref('/learn/how-tiktok-views-work', 'es')).toBe('/es');
    expect(localeSwitcherHref('/learn', 'de')).toBe('/de');
    expect(localeSwitcherHref('/learn', 'fr')).toBe('/fr');
    expect(localeSwitcherHref('/learn', 'it')).toBe('/it');
    expect(localeSwitcherHref('/learn', 'pt-br')).toBe('/pt-br');
    expect(localeSwitcherHref('/learn', 'ar')).toBe('/ar');
  });

  it('emits no fake Learn hreflang URLs', () => {
    const index = hreflangMap('/learn');
    const article = hreflangMap('/learn/how-tiktok-views-work');
    expect(index).toEqual({ en: '/learn' });
    expect(article).toEqual({ en: '/learn/how-tiktok-views-work' });
    expect(index.es).toBeUndefined();
    expect(article['pt-BR']).toBeUndefined();
    expect(index['x-default']).toBeUndefined();
  });

  it('keeps English Learn metadata self-canonical without locale alternates', () => {
    const meta = buildPageMetadataForRoute('/learn');
    expect(meta.alternates?.canonical).toBe('https://novalikes.com/learn');
    expect(meta.alternates?.languages).toBeUndefined();
  });

  it('puts only English Learn URLs in the sitemap', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(absoluteUrl('/learn'));
    const localizedLearn = urls.filter((url) =>
      /\/(es|de|fr|it|pt-br|ar)\/learn(?:\/|$)/.test(url),
    );
    expect(localizedLearn).toHaveLength(0);
    expect(
      buildSitemapEntries().filter((entry) => entry.url.includes('/learn')).every((entry) => {
        const languages = entry.alternates?.languages ?? {};
        return !Object.keys(languages).some((code) => code !== 'en');
      }),
    ).toBe(true);
  });
});
