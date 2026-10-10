import { describe, expect, it } from 'vitest';

import { HOW_TO_RESET_TIKTOK_FYP_ARTICLE as article } from '@/data/learn/articles/how-to-reset-tiktok-fyp';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('How to reset your TikTok FYP', () => {
  it('is published and indexable with its real publication date', () => {
    expect(article.slug).toBe('how-to-reset-tiktok-fyp');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-10-10T12:00:00.000Z');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(true);
  });

  it('answers first and gives the refresh steps', () => {
    expect(article.seo.title).toBe('How to Reset Your TikTok FYP: Steps and What Changes');
    expect(article.seo.keywords?.[0]).toBe('how to reset tiktok fyp');
    expect(article.seo.description.length).toBeLessThanOrEqual(160);
    const first = article.blocks[0];
    expect(first.type === 'paragraph' ? first.text : '').toMatch(/Refresh your For You feed/);
    expect(article.blocks.some((block) => block.type === 'numbered_list')).toBe(true);
  });

  it('keeps commercial links out of the body and links the 0-views guide', () => {
    const links = article.blocks.flatMap((block) =>
      block.type === 'paragraph' ? block.inlineLinks ?? [] : [],
    );
    expect(links.filter((link) => link.href.startsWith('/buy-'))).toEqual([]);
    expect(links.some((link) => link.href === '/learn/why-does-my-tiktok-have-0-views')).toBe(true);
    expect(links.some((link) => link.external && link.href.includes('tiktok.com'))).toBe(true);
    for (const block of article.blocks) {
      if (block.type !== 'paragraph') continue;
      for (const link of block.inlineLinks ?? []) {
        expect(block.text.includes(link.label), `${block.id}: ${link.label}`).toBe(true);
      }
    }
  });

  it('is in the English sitemap only and has a local featured image', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain('https://novalikes.com/learn/how-to-reset-tiktok-fyp');
    expect(urls.some((url) => url.includes('/es/learn/how-to-reset-tiktok-fyp'))).toBe(false);
    expect(article.featuredImage?.src).toBe('/assets/images/learn/how-to-reset-tiktok-fyp/featured.png');
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
