import { describe, expect, it } from 'vitest';

import { HOW_MANY_FOLLOWERS_TO_GO_LIVE_ON_TIKTOK_ARTICLE as article } from '@/data/learn/articles/how-many-followers-to-go-live-on-tiktok';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #19 How many followers to go LIVE on TikTok', () => {
  it('is published with the original Monday 5 October 2026 editorial date', () => {
    expect(article.slug).toBe('how-many-followers-to-go-live-on-tiktok');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-05T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('treats LIVE eligibility as local and 18+, not a universal 1,000 unlock', () => {
    expect(article.title).toBe(
      'How Many Followers Do You Need to Go LIVE on TikTok?',
    );
    expect(article.seo.title).toBe(
      'How Many Followers Do You Need to Go LIVE on TikTok?',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-many-followers-to-go-live-on-tiktok',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'how many followers to go live on TikTok',
    );
    expect(article.relatedServices).toEqual(['buy-tiktok-followers']);
    expect(article.relatedArticles).toEqual([
      'how-to-get-1000-tiktok-followers',
      'tiktok-followers-vs-likes-vs-views',
      'public-vs-private-tiktok-account',
      'tiktok-seo',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-tiktok-followers', label: 'TikTok followers' },
    ]);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' &&
          block.heading === 'Understanding TikTok Follower Options' &&
          block.label === 'View TikTok Followers' &&
          block.href === '/buy-tiktok-followers',
      ),
    ).toBe(true);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' && /unlock LIVE/i.test(block.label),
      ),
    ).toBe(false);
    expect(article.content).toContain('local minimum-follower threshold');
    expect(article.content).toContain('at least 18 years old');
    expect(article.content).toContain(
      'going LIVE is unavailable while Restricted Mode is enabled',
    );
    expect(article.content).not.toMatch(/Reach 1K and Go LIVE/i);
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
      'https://novalikes.com/learn/how-many-followers-to-go-live-on-tiktok',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-many-followers-to-go-live-on-tiktok'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-many-followers-to-go-live-on-tiktok/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
