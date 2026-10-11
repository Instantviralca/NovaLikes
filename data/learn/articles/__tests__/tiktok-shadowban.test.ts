import { describe, expect, it } from 'vitest';

import { TIKTOK_SHADOWBAN_ARTICLE as article } from '@/data/learn/articles/tiktok-shadowban';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('TikTok shadowban', () => {
  it('is published and indexable with its real publication date', () => {
    expect(article.slug).toBe('tiktok-shadowban');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-10-10T20:00:00.000Z');
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(true);
  });

  it('answers first and gives the official check, appeal and duration facts', () => {
    expect(article.seo.keywords?.[0]).toBe('tiktok shadowban');
    expect(article.seo.description.length).toBeLessThanOrEqual(160);
    expect(article.blocks[0].type).toBe('paragraph');
    expect(article.content).toContain('TikTok does not use the word shadowban');
    expect(article.content).toContain('Ineligible for recommendation');
    expect(article.content).toContain('then tap Appeal');
    expect(article.content).toContain('TikTok gives no fixed time');
    const checks = article.blocks.find((block) => block.id === 'ol-check');
    expect(checks?.type === 'numbered_list' ? checks.items : []).toHaveLength(5);
    expect(article.faqs).toHaveLength(6);
  });

  it('links the related TikTok guides and keeps commercial links out of the body', () => {
    const links = article.blocks.flatMap((block) =>
      block.type === 'paragraph' ? block.inlineLinks ?? [] : [],
    );
    expect(links.filter((link) => link.href.startsWith('/buy-'))).toEqual([]);
    for (const href of [
      '/learn/why-does-my-tiktok-have-0-views',
      '/learn/how-to-get-more-views-on-tiktok',
      '/learn/buying-tiktok-followers-fyp-account-safety',
    ]) {
      expect(links.some((link) => link.href === href), href).toBe(true);
    }
    for (const block of article.blocks) {
      if (block.type !== 'paragraph') continue;
      for (const link of block.inlineLinks ?? []) {
        expect(block.text.includes(link.label), `${block.id}: ${link.label}`).toBe(true);
      }
    }
  });

  it('is linked from the 0-views guide', () => {
    const zeroViews = getPublishedLearnArticleBySlug('why-does-my-tiktok-have-0-views');
    const linked = zeroViews?.blocks.some(
      (block) =>
        block.type === 'paragraph' &&
        (block.inlineLinks ?? []).some((link) => link.href === '/learn/tiktok-shadowban'),
    );
    expect(linked).toBe(true);
  });

  it('is in the English sitemap only and has a local featured image', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain('https://novalikes.com/learn/tiktok-shadowban');
    expect(urls.some((url) => url.includes('/es/learn/tiktok-shadowban'))).toBe(false);
    expect(article.featuredImage?.src).toBe('/assets/images/learn/tiktok-shadowban/featured.png');
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
