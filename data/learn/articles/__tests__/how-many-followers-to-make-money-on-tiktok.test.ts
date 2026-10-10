import { describe, expect, it } from 'vitest';

import { HOW_MANY_FOLLOWERS_TO_MAKE_MONEY_ON_TIKTOK_ARTICLE as article } from '@/data/learn/articles/how-many-followers-to-make-money-on-tiktok';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('How many followers to make money on TikTok', () => {
  it('is published and indexable with its real publication date', () => {
    expect(article.slug).toBe('how-many-followers-to-make-money-on-tiktok');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-10-10T15:00:00.000Z');
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(true);
  });

  it('answers first and shows the requirements table', () => {
    expect(article.seo.title).toBe('How Many TikTok Followers Do You Need to Make Money?');
    expect(article.seo.keywords?.[0]).toBe('how many followers on tiktok to make money');
    expect(article.seo.description.length).toBeLessThanOrEqual(160);
    const first = article.blocks[0];
    expect(first.type === 'paragraph' ? first.text : '').toMatch(/1,000 followers/);
    const table = article.blocks.find((block) => block.type === 'comparison_table');
    expect(table && table.type === 'comparison_table' ? table.rows.length : 0).toBeGreaterThanOrEqual(4);
  });

  it('cites TikTok sources and keeps commercial links out of the body', () => {
    const links = article.blocks.flatMap((block) =>
      block.type === 'paragraph' ? block.inlineLinks ?? [] : [],
    );
    expect(links.filter((link) => link.href.startsWith('/buy-'))).toEqual([]);
    expect(links.some((link) => link.external && link.href.includes('tiktok.com'))).toBe(true);
    for (const href of [
      '/learn/how-many-followers-to-go-live-on-tiktok',
      '/learn/how-tiktok-video-views-are-counted',
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

  it('is in the English sitemap only and has a local featured image', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain('https://novalikes.com/learn/how-many-followers-to-make-money-on-tiktok');
    expect(urls.some((url) => url.includes('/es/learn/how-many-followers-to-make-money-on-tiktok'))).toBe(false);
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-many-followers-to-make-money-on-tiktok/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
