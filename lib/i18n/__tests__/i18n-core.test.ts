import { existsSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { collectLocaleOverlayIssues } from '@/lib/i18n/content/load';
import { overlayEnglishWithIssues } from '@/lib/i18n/overlay';
import {
  getEnglishHomepageSource,
  getEnglishMetadataSource,
} from '@/lib/i18n/content/english-source';
import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import { CORE_PATHS } from '@/lib/i18n/core-paths';
import { HREFLANG, LOCALES, LOCALE_NATIVE_NAMES, LOCALE_SHORT_LABELS } from '@/lib/i18n/config';
import { hreflangMap, localizeHref } from '@/lib/i18n/paths';
import { hreflangMapWithMarket } from '@/lib/market/paths';
import { isMarketCorePath } from '@/lib/market/config';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { getEnglishMetadataBundle } from '@/lib/i18n/metadata';

const REQUIRED_FILES = [
  'homepage.json',
  'faq-page.json',
  'faq-items.json',
  'ui.json',
  'metadata.json',
  ...CORE_SERVICE_SLUGS.map((slug) => `services/${slug}.json`),
  'service-faqs.json',
  'tools.json',
  'about.json',
  'contact.json',
  'reviews.json',
  'privacy.json',
  'refund.json',
  'terms.json',
  'cookies.json',
  'disclaimer.json',
];

describe('i18n translation completeness', () => {
  it('has overlay files for every localized locale and core group', () => {
    for (const locale of LOCALIZED_LOCALES) {
      for (const file of REQUIRED_FILES) {
        const full = path.join(process.cwd(), 'content', 'locales', locale, file);
        expect(existsSync(full), `missing ${locale}/${file}`).toBe(true);
      }
    }
  });

  it('fails when required translation strings are missing', () => {
    for (const locale of LOCALIZED_LOCALES) {
      const issues = collectLocaleOverlayIssues(locale);
      expect(issues, `${locale} missing keys: ${issues.slice(0, 8).map((i) => i.path).join(', ')}`).toEqual([]);
    }
  });

  it('does not silently keep English strings when overlay is empty', () => {
    const { issues } = overlayEnglishWithIssues(getEnglishHomepageSource(), {});
    expect(issues.length).toBeGreaterThan(10);
  });
});

describe('i18n hreflang matrix', () => {
  it('is reciprocal for all 12 core page groups', () => {
    for (const pathName of CORE_PATHS) {
      const map = hreflangMapWithMarket(pathName);
      expect(map['x-default']).toBe(localizeHref(pathName, 'en'));
      for (const locale of LOCALES) {
        expect(map[HREFLANG[locale]]).toBe(localizeHref(pathName, locale));
      }
      const expectedKeys = ['ar', 'de', 'en', 'es', 'fr', 'it', 'pt-BR', 'x-default'];
      if (isMarketCorePath(pathName)) expectedKeys.push('en-AU', 'en-CA', 'en-GB', 'en-US');
      expect(Object.keys(map).sort()).toEqual(expectedKeys.sort());
    }
  });
});

describe('i18n legal hreflang matrix', () => {
  it('is reciprocal for the five legal pages', () => {
    for (const pathName of [
      '/privacy-policy',
      '/refund-policy',
      '/terms-and-conditions',
      '/cookie-policy',
      '/disclaimer',
    ] as const) {
      const map = hreflangMap(pathName);
      expect(map['x-default']).toBe(localizeHref(pathName, 'en'));
      for (const locale of LOCALES) {
        expect(map[HREFLANG[locale]]).toBe(localizeHref(pathName, locale));
      }
    }
  });
});

describe('i18n company hreflang matrix', () => {
  it('is reciprocal for About, Contact and Reviews', () => {
    for (const pathName of ['/about', '/contact', '/reviews'] as const) {
      const map = hreflangMap(pathName);
      expect(map['x-default']).toBe(localizeHref(pathName, 'en'));
      for (const locale of LOCALES) {
        expect(map[HREFLANG[locale]]).toBe(localizeHref(pathName, locale));
      }
      expect(Object.keys(map).sort()).toEqual(
        ['ar', 'de', 'en', 'es', 'fr', 'it', 'pt-BR', 'x-default'].sort(),
      );
    }
  });
});

describe('i18n sitemap', () => {
  it('includes 72 localized core URLs plus English cores', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    let localized = 0;
    for (const locale of LOCALIZED_LOCALES) {
      for (const pathName of CORE_PATHS) {
        const url = absoluteUrl(localizeHref(pathName, locale));
        expect(urls).toContain(url);
        // Native-slug locales must not publish English commercial slugs.
        // Arabic intentionally reuses English canonical slugs under `/ar/…`.
        if (locale !== 'ar') {
          expect(url.includes(`/${locale}/buy-`)).toBe(false);
        }
        localized += 1;
      }
    }
    expect(localized).toBe(72);
    expect(urls).toContain(absoluteUrl('/'));
    expect(urls).toContain(absoluteUrl('/buy-instagram-followers'));
    expect(urls).not.toContain(absoluteUrl('/es/buy-instagram-followers'));
    expect(urls).toContain(absoluteUrl('/es/herramientas/descargar-videos-tiktok'));
    expect(urls).not.toContain(absoluteUrl('/es/tools/tiktok-video-downloader'));
    expect(urls).toContain(absoluteUrl('/es/acerca-de'));
    expect(urls).toContain(absoluteUrl('/es/contacto'));
    expect(urls).toContain(absoluteUrl('/es/resenas'));
    expect(urls).not.toContain(absoluteUrl('/es/about'));
    expect(urls).not.toContain(absoluteUrl('/es/contact'));
    expect(urls).not.toContain(absoluteUrl('/es/reviews'));
    expect(urls).toContain(absoluteUrl('/es/politica-de-privacidad'));
    expect(urls).toContain(absoluteUrl('/de/datenschutz'));
    expect(urls).toContain(absoluteUrl('/ar/privacy-policy'));
    expect(urls).not.toContain(absoluteUrl('/ar/سياسة-الخصوصية'));
    expect(urls).not.toContain(absoluteUrl('/es/privacy-policy'));
    expect(urls).not.toContain(absoluteUrl('/cart'));
    expect(urls).not.toContain(absoluteUrl('/checkout'));
    expect(urls).not.toContain(absoluteUrl('/admin'));
  });
});

describe('English metadata remains the frozen master', () => {
  it('does not rewrite approved English titles and descriptions', () => {
    const english = getEnglishMetadataBundle();
    const dumped = getEnglishMetadataSource();
    expect(english).toEqual(dumped);
  });
});

describe('language switcher labels', () => {
  it('covers every locale with a native name and two-letter trigger code', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_NATIVE_NAMES[locale].length).toBeGreaterThan(1);
      expect(LOCALE_SHORT_LABELS[locale]).toMatch(/^[A-Z]{2}$/);
    }
  });
});
