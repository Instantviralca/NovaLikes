import { describe, expect, it } from 'vitest';

import { HOW_TO_GET_MORE_VIEWS_ON_TIKTOK_ARTICLE as article } from '@/data/learn/articles/how-to-get-more-views-on-tiktok';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('How to get more views on TikTok', () => {
  it('is published and indexable with its real publication date', () => {
    expect(article.slug).toBe('how-to-get-more-views-on-tiktok');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-10-10T16:00:00.000Z');
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(true);
  });

  it('answers first and lists ten ways', () => {
    expect(article.seo.keywords?.[0]).toBe('how to get more views on tiktok');
    expect(article.seo.description.length).toBeLessThanOrEqual(160);
    expect(article.blocks[0].type).toBe('paragraph');
    const ways = article.blocks.filter(
      (block) => block.type === 'heading' && block.headingLevel === 3 && /^\d+\. /.test(block.text),
    );
    expect(ways).toHaveLength(10);
  });

  it('links the related TikTok guides and keeps commercial links out of the body', () => {
    const links = article.blocks.flatMap((block) =>
      block.type === 'paragraph' ? block.inlineLinks ?? [] : [],
    );
    expect(links.filter((link) => link.href.startsWith('/buy-'))).toEqual([]);
    for (const href of [
      '/learn/why-does-my-tiktok-have-0-views',
      '/learn/tiktok-seo',
      '/learn/tiktok-views-but-no-followers',
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

  it('is in the English sitemap only and has a local featured image', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain('https://novalikes.com/learn/how-to-get-more-views-on-tiktok');
    expect(urls.some((url) => url.includes('/es/learn/how-to-get-more-views-on-tiktok'))).toBe(false);
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-get-more-views-on-tiktok/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
