import { describe, expect, it } from 'vitest';

import { TIKTOK_SEO_ARTICLE as article } from '@/data/learn/articles/tiktok-seo';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #4 TikTok SEO', () => {
  it('is published with the original Monday 31 August 2026 editorial date', () => {
    expect(article.slug).toBe('tiktok-seo');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-08-31T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO and does not treat services as ranking tools', () => {
    expect(article.title).toBe(
      'TikTok SEO in 2026: How to Rank Videos in TikTok Search',
    );
    expect(article.seo.title).toBe(
      'TikTok SEO in 2026: How to Rank in TikTok Search',
    );
    expect(article.seo.canonicalPath).toBe('/learn/tiktok-seo');
    expect(article.relatedServices).toEqual([
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ]);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'public-vs-private-tiktok-account',
      'how-to-get-1000-tiktok-followers',
      'how-many-followers-to-go-live-on-tiktok',
      'why-tiktok-followers-drop',
      'tiktok-likes-vs-views',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-tiktok-followers', label: 'TikTok followers' },
      { href: '/buy-tiktok-likes', label: 'TikTok likes' },
      { href: '/buy-tiktok-views', label: 'TikTok views' },
    ]);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(true);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/tiktok-video-downloader',
          ),
      ),
    ).toBe(false);
    expect(article.content).toContain(
      'not as a guaranteed method of',
    );
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/tiktok-seo');
    expect(urls.some((url) => url.includes('/es/learn/tiktok-seo'))).toBe(
      false,
    );
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/tiktok-seo/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
