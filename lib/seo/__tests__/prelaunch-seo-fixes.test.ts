/**
 * Pre-launch SEO fixes: empty tags, YouTube FAQ, lowercase redirects,
 * service breadcrumbs, and footer service completeness.
 */

import { describe, expect, it } from 'vitest';

import { faqCatalogue } from '@/data/faqs';
import { getFooterColumns } from '@/data/footer';
import { LEARN_TAGS } from '@/data/learn/tags';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getPublicDirectoryHrefs } from '@/data/seo/public-directory';
import {
  isUnsupportedYoutubePurchaseFaq,
  selectMainFaqPageFaqs,
  sanitizeFaqForPublic,
} from '@/lib/faqs';
import { buildBreadcrumb } from '@/lib/linking';
import { getDiscoverableTags, getPopularTags, getTagBySlug } from '@/lib/learn/taxonomy';
import { getLowercasePublicRedirect } from '@/lib/seo/lowercase-public-path';
import { buildLlmsTxt } from '@/lib/seo/llms-txt';
import { buildSitemapEntries, getTagSitemapRoutes } from '@/lib/seo/sitemap';

describe('Learn tag archives', () => {
  it('promotes only tags that have published articles', () => {
    expect(LEARN_TAGS).toHaveLength(13);
    expect(getDiscoverableTags().length).toBeGreaterThan(0);
    expect(getPopularTags(20).length).toBeGreaterThan(0);
    for (const tag of getDiscoverableTags()) {
      expect(tag.articleCount).toBeGreaterThan(0);
    }
    for (const tag of LEARN_TAGS) {
      const count = getTagBySlug(tag.slug)?.articleCount ?? 0;
      if (count === 0) {
        expect(getDiscoverableTags().some((item) => item.slug === tag.slug)).toBe(false);
      }
    }
  });

  it('excludes empty tags from XML sitemap, HTML sitemap, and llms.txt', () => {
    const tagRoutes = getTagSitemapRoutes();
    for (const route of tagRoutes) {
      const slug = route.route.replace('/learn/tag/', '');
      expect(getTagBySlug(slug)?.articleCount ?? 0).toBeGreaterThan(0);
    }
    const emptyTagSlugs = LEARN_TAGS.filter(
      (tag) => (getTagBySlug(tag.slug)?.articleCount ?? 0) === 0,
    ).map((tag) => tag.slug);
    const sitemap = buildSitemapEntries().map((entry) => entry.url).join('\n');
    for (const slug of emptyTagSlugs) {
      expect(sitemap).not.toContain(`/learn/tag/${slug}`);
    }
    expect(getPublicDirectoryHrefs().some((href) => href.includes('/learn/tag/'))).toBe(
      false,
    );
    expect(buildLlmsTxt()).not.toContain('/learn/tag/');
  });
});

describe('Public FAQ YouTube exclusion', () => {
  it('does not expose YouTube purchase FAQs on /faq (content filter)', () => {
    const visible = selectMainFaqPageFaqs();
    expect(visible.some((faq) => isUnsupportedYoutubePurchaseFaq(faq))).toBe(false);
    expect(visible.some((faq) => faq.id.startsWith('faq-yt-'))).toBe(false);
    expect(visible.some((faq) => faq.platform === 'youtube')).toBe(false);
    expect(visible.some((faq) => faq.category === 'youtube')).toBe(false);

    const purchase = visible.filter((faq) =>
      /youtube/i.test(`${faq.question} ${faq.answer}`),
    );
    expect(
      purchase.every((faq) => /not currently offered/i.test(faq.answer)),
    ).toBe(true);
  });

  it('keeps legacy YouTube catalogue rows out of public sanitization', () => {
    const legacy = faqCatalogue.filter((faq) => faq.id.startsWith('faq-yt-'));
    expect(legacy.length).toBeGreaterThan(0);
    for (const faq of legacy) {
      expect(isUnsupportedYoutubePurchaseFaq(faq)).toBe(true);
      expect(sanitizeFaqForPublic(faq)).toBeNull();
    }
  });
});

describe('Lowercase public-route redirects', () => {
  it('permanently maps /FAQ and /About while preserving already-canonical paths', () => {
    expect(getLowercasePublicRedirect('/FAQ')).toBe('/faq');
    expect(getLowercasePublicRedirect('/About')).toBe('/about');
    expect(getLowercasePublicRedirect('/faq')).toBeNull();
    expect(getLowercasePublicRedirect('/about')).toBeNull();
  });

  it('does not rewrite assets, APIs, admin, or unrelated mixed-case paths', () => {
    expect(getLowercasePublicRedirect('/assets/images/Hero.PNG')).toBeNull();
    expect(getLowercasePublicRedirect('/api/Checkout')).toBeNull();
    expect(getLowercasePublicRedirect('/admin/Login')).toBeNull();
    expect(getLowercasePublicRedirect('/Buy-Instagram-Followers')).toBeNull();
  });
});

describe('Service breadcrumbs', () => {
  it('uses Home > Current Service for all 10 live services with no Learn parent', () => {
    expect(APPROVED_SERVICE_SLUGS).toHaveLength(10);
    for (const slug of APPROVED_SERVICE_SLUGS) {
      const crumbs = buildBreadcrumb(slug);
      expect(crumbs).toHaveLength(2);
      expect(crumbs[0]).toEqual({ label: 'Home', href: '/' });
      expect(crumbs[1]?.href).toBeUndefined();
      expect(crumbs[1]?.label).toBeTruthy();
      const blob = JSON.stringify(crumbs);
      expect(blob).not.toContain('/learn/');
      expect(blob).not.toContain('/instagram');
      expect(blob).not.toContain('/tiktok');
      expect(blob).not.toContain('/facebook');
    }
  });
});

describe('Footer service completeness', () => {
  it('links Instagram Likes, Instagram Comments, and TikTok Views without YouTube', () => {
    const services = getFooterColumns().find((column) => column.id === 'services');
    expect(services).toBeTruthy();
    const hrefs = services!.links.map((link) => link.href);
    expect(hrefs).toContain('/buy-instagram-likes');
    expect(hrefs).toContain('/buy-instagram-comments');
    expect(hrefs).toContain('/buy-tiktok-views');
    expect(hrefs).toContain('/buy-instagram-followers');
    expect(hrefs).toContain('/buy-instagram-views');
    expect(hrefs).toContain('/buy-tiktok-followers');
    expect(hrefs).toContain('/buy-tiktok-likes');
    expect(hrefs).toContain('/buy-facebook-followers');
    expect(hrefs).toContain('/buy-facebook-page-likes');
    expect(hrefs).toContain('/buy-facebook-post-likes');
    expect(hrefs.some((href) => href.includes('youtube'))).toBe(false);
    expect(hrefs.some((href) => /twitter|\bx\b/.test(href))).toBe(false);
  });
});
