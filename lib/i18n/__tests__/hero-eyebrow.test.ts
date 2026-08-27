import { describe, expect, it } from 'vitest';

import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { CORE_SERVICE_SLUGS, LOCALES, type LocalizedLocale } from '@/lib/i18n/config';
import {
  getEnglishHomepageSource,
  getEnglishFaqPageSource,
} from '@/lib/i18n/content/english-source';
import { getEnglishReviewsPageSource } from '@/lib/i18n/content/company-english';
import {
  loadFaqPageContent,
  loadHomepageHub,
  loadReviewsPageCopy,
  loadServiceBundle,
  loadToolsBundle,
} from '@/lib/i18n/content/load';
import { TOOLS } from '@/data/tools/registry';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function expectDistinctEyebrowAndH1(eyebrow: string | undefined, h1: string, label: string) {
  expect(eyebrow, `${label} eyebrow`).toBeTruthy();
  expect(h1, `${label} h1`).toBeTruthy();
  expect(normalize(eyebrow!), label).not.toBe(normalize(h1));
}

describe('hero eyebrow / H1 system', () => {
  it('uses approved English homepage hero copy', () => {
    const home = getEnglishHomepageSource();
    expect(home.hero.eyebrow).toBe('INSTAGRAM • TIKTOK • FACEBOOK');
    expect(home.hero.title).toBe('Grow Your Social Presence with NovaLikes');
  });

  it('uses category eyebrows on English service pages, not duplicated H1 phrases', () => {
    const expectedEyebrow: Record<string, string> = {
      'buy-instagram-followers': 'INSTAGRAM SERVICES',
      'buy-instagram-likes': 'INSTAGRAM SERVICES',
      'buy-instagram-views': 'INSTAGRAM SERVICES',
      'buy-instagram-comments': 'INSTAGRAM SERVICES',
      'buy-tiktok-followers': 'TIKTOK SERVICES',
      'buy-tiktok-likes': 'TIKTOK SERVICES',
      'buy-tiktok-views': 'TIKTOK SERVICES',
      'buy-facebook-followers': 'FACEBOOK SERVICES',
      'buy-facebook-page-likes': 'FACEBOOK SERVICES',
      'buy-facebook-post-likes': 'FACEBOOK SERVICES',
    };

    for (const slug of CORE_SERVICE_SLUGS) {
      const bundle = loadServiceBundle('en', slug);
      const { eyebrow, title } = bundle.content.hero;
      expect(eyebrow).toBe(expectedEyebrow[slug]);
      expectDistinctEyebrowAndH1(eyebrow, title, slug);
    }
  });

  it('uses approved English support pages and tools hub copy', () => {
    const faq = getEnglishFaqPageSource();
    expect(faq.hero.eyebrow).toBe('HELP CENTER');
    expect(faq.hero.title).toBe('Frequently Asked Questions');

    const reviews = getEnglishReviewsPageSource();
    expect(reviews.eyebrow).toBe('CUSTOMER FEEDBACK');
    expect(reviews.h1).toBe('NovaLikes Reviews');

    const tools = loadToolsBundle('en');
    expect(tools.hub.eyebrow).toBe('FREE SOCIAL MEDIA TOOLS');
    expect(tools.hub.h1).toBe('Free Instagram, TikTok & Facebook Tools');
    expect(tools.pages['instagram-video-downloader'].h1).toBe(
      'Instagram Video & Reels Downloader',
    );
  });

  it('keeps localized service eyebrow distinct from localized H1', () => {
    for (const locale of LOCALES.filter((l): l is LocalizedLocale => l !== 'en')) {
      for (const slug of CORE_SERVICE_SLUGS) {
        const bundle = loadServiceBundle(locale, slug);
        expectDistinctEyebrowAndH1(
          bundle.content.hero.eyebrow,
          bundle.content.hero.title,
          `${locale}/${slug}`,
        );
      }
    }
  });

  it('localizes FAQ and reviews hero fields without English leakage on eyebrows', () => {
    for (const locale of LOCALES.filter((l): l is LocalizedLocale => l !== 'en')) {
      const faq = loadFaqPageContent(locale);
      expectDistinctEyebrowAndH1(faq.hero.eyebrow, faq.hero.title, `${locale}/faq`);

      const reviews = loadReviewsPageCopy(locale);
      expectDistinctEyebrowAndH1(reviews.eyebrow, reviews.h1, `${locale}/reviews`);
    }
  });

  it('uses compact platform-list homepage eyebrows in every locale', () => {
    for (const locale of LOCALES) {
      const home = loadHomepageHub(locale);
      expect(home.hero.eyebrow).toContain('INSTAGRAM');
      expect(home.hero.eyebrow).toContain('TIKTOK');
      expect(home.hero.eyebrow).toContain('FACEBOOK');
      expect(home.hero.eyebrow).not.toMatch(/SOCIAL MEDIA GROWTH|CRECIMIENTO EN REDES|نمو وسائل/i);
    }
  });

  it('leaves published Learn article titles untouched', () => {
    const before = getPublishedLearnArticleRecords().map((a) => a.title);
    expect(before).toHaveLength(26);
    expect(before).toContain('TikTok SEO in 2026: How to Rank Videos in TikTok Search');
    expect(before).toContain('How the Instagram Algorithm Works in 2026: Feed, Reels, Explore & Stories');
  });

  it('does not add extra tool routes', () => {
    expect(TOOLS).toHaveLength(8);
    expect(TOOLS.map((tool) => tool.slug).some((slug) => slug.includes('youtube'))).toBe(false);
  });
});
