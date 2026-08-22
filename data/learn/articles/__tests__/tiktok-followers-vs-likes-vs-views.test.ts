import { describe, expect, it } from 'vitest';

import { TIKTOK_FOLLOWERS_VS_LIKES_VS_VIEWS_ARTICLE as article } from '@/data/learn/articles/tiktok-followers-vs-likes-vs-views';
import { NAJAF_KHAN } from '@/data/authors/novalikes-editorial-team';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #1 TikTok followers vs likes vs views', () => {
  it('is published with a public launch date and preserved editorial schedule', () => {
    expect(article.slug).toBe('tiktok-followers-vs-likes-vs-views');
    expect(article.status).toBe('published');
    expect(article.publishedAt).toBe('2026-08-22T08:00:00.000Z');
    expect(article.updatedAt).toBe('2026-08-22T08:00:00.000Z');
    expect(article.scheduledAt).toBe('2026-08-24T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO and supports the three TikTok commercial pages once each', () => {
    expect(article.seo.title).toBe(
      'TikTok Followers vs Likes vs Views: Key Differences',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/tiktok-followers-vs-likes-vs-views',
    );
    expect(article.relatedServices).toEqual([
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
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
    ).toBe(true);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/tiktok-followers-vs-likes-vs-views',
    );
    expect(
      urls.some((url) => url.includes('/es/learn/tiktok-followers-vs-likes-vs-views')),
    ).toBe(false);
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/tiktok-followers-vs-likes-vs-views/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });

  it('does not mention YouTube in the editorial author bio', () => {
    expect(NAJAF_KHAN.bio).not.toMatch(/YouTube/i);
  });
});
