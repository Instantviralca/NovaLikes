import { describe, expect, it } from 'vitest';

import { WHY_DOES_MY_TIKTOK_HAVE_0_VIEWS_ARTICLE as article } from '@/data/learn/articles/why-does-my-tiktok-have-0-views';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Why does my TikTok have 0 views', () => {
  it('is published and indexable with its real publication date', () => {
    expect(article.slug).toBe('why-does-my-tiktok-have-0-views');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-10-10T08:00:00.000Z');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(true);
  });

  it('keeps informational SEO and answers the question first', () => {
    expect(article.seo.title).toBe('Why Does My TikTok Have 0 Views? 5 Causes and Fixes');
    expect(article.seo.canonicalPath).toBe('/learn/why-does-my-tiktok-have-0-views');
    expect(article.seo.keywords?.[0]).toBe('why does my tiktok have 0 views');
    expect(article.seo.description.length).toBeLessThanOrEqual(160);
    const first = article.blocks[0];
    expect(first.type).toBe('paragraph');
    expect(first.type === 'paragraph' ? first.text : '').toMatch(/0 views/);
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(true);
  });

  it('does not place commercial links inside the body text', () => {
    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([]);
    expect(article.relatedServices).toEqual([
      'buy-tiktok-views',
      'buy-tiktok-likes',
      'buy-tiktok-followers',
    ]);
    expect(article.blocks.some((block) => block.type === 'service_cluster_cta')).toBe(true);
  });

  it('cites TikTok sources and links related Learn guides', () => {
    const links = article.blocks.flatMap((block) =>
      block.type === 'paragraph' ? block.inlineLinks ?? [] : [],
    );
    expect(links.some((link) => link.external && link.href.includes('tiktok.com'))).toBe(true);
    for (const href of [
      '/learn/how-tiktok-video-views-are-counted',
      '/learn/public-vs-private-tiktok-account',
      '/learn/buying-tiktok-followers-fyp-account-safety',
      '/learn/tiktok-seo',
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
    expect(urls).toContain('https://novalikes.com/learn/why-does-my-tiktok-have-0-views');
    expect(urls.some((url) => url.includes('/es/learn/why-does-my-tiktok-have-0-views'))).toBe(false);
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/why-does-my-tiktok-have-0-views/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
