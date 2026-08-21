import { describe, expect, it } from 'vitest';

import { TIKTOK_VIEWS_BUT_NO_FOLLOWERS_ARTICLE as article } from '@/data/learn/articles/tiktok-views-but-no-followers';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #2 TikTok views but no followers', () => {
  it('is published with the original Wednesday 26 August 2026 editorial date', () => {
    expect(article.slug).toBe('tiktok-views-but-no-followers');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-08-26T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO and supports TikTok commercial pages once each', () => {
    expect(article.title).toBe(
      'Why Do TikTok Videos Get Views but No Followers?',
    );
    expect(article.seo.title).toBe(
      'TikTok Views but No Followers? 9 Common Reasons',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/tiktok-views-but-no-followers',
    );
    expect(article.relatedServices).toEqual([
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ]);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-seo',
      'public-vs-private-tiktok-account',
      'how-to-get-1000-tiktok-followers',
      'why-tiktok-followers-drop',
      'tiktok-likes-vs-views',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-tiktok-views', label: 'TikTok views' },
      { href: '/buy-tiktok-followers', label: 'TikTok followers' },
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
            (link) => link.href === '/learn/tiktok-followers-vs-likes-vs-views',
          ),
      ),
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
      'https://novalikes.com/learn/tiktok-views-but-no-followers',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/tiktok-views-but-no-followers'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/tiktok-views-but-no-followers/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
