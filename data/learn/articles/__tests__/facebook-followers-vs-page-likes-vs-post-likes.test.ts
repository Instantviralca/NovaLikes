import { describe, expect, it } from 'vitest';

import { FACEBOOK_FOLLOWERS_VS_PAGE_LIKES_VS_POST_LIKES_ARTICLE as article } from '@/data/learn/articles/facebook-followers-vs-page-likes-vs-post-likes';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #6 Facebook followers vs Page Likes vs Post Likes', () => {
  it('is published with the original Friday 4 September 2026 editorial date', () => {
    expect(article.slug).toBe(
      'facebook-followers-vs-page-likes-vs-post-likes',
    );
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-04T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps Page Likes, Followers and Post Likes as separate metrics', () => {
    expect(article.title).toBe(
      'Facebook Followers vs Page Likes vs Post Likes: What’s the Difference?',
    );
    expect(article.seo.title).toBe(
      'Facebook Followers vs Page Likes vs Post Likes',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/facebook-followers-vs-page-likes-vs-post-likes',
    );
    expect(article.content).not.toMatch(/Page Likes no longer exist/i);
    expect(article.content).toContain(
      'Many Page experiences are moving toward follows',
    );
    expect(article.relatedServices).toEqual([
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-facebook-followers', label: 'Facebook followers' },
      { href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' },
      { href: '/buy-facebook-post-likes', label: 'Facebook Post Likes' },
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
          block.inlineLinks?.some((link) => link.href.startsWith('/tools/')),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/facebook-followers-vs-page-likes-vs-post-likes',
    );
    expect(
      urls.some((url) =>
        url.includes(
          '/es/learn/facebook-followers-vs-page-likes-vs-post-likes',
        ),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/facebook-followers-vs-page-likes-vs-post-likes/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
