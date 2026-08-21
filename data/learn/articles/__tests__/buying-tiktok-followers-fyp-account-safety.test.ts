import { describe, expect, it } from 'vitest';

import { BUYING_TIKTOK_FOLLOWERS_FYP_ACCOUNT_SAFETY_ARTICLE as article } from '@/data/learn/articles/buying-tiktok-followers-fyp-account-safety';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #7 Buying TikTok followers FYP and account safety', () => {
  it('is published with the original Monday 7 September 2026 editorial date', () => {
    expect(article.slug).toBe('buying-tiktok-followers-fyp-account-safety');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-07T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO, one follower CTA, and no likes/views sales links', () => {
    expect(article.title).toBe(
      'Can Buying TikTok Followers Affect FYP Reach or Account Safety?',
    );
    expect(article.seo.title).toBe(
      'Buying TikTok Followers: FYP & Account Safety Explained',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/buying-tiktok-followers-fyp-account-safety',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'does buying TikTok followers affect your account',
    );
    expect(article.relatedServices).toEqual(['buy-tiktok-followers']);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
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
    expect(commercial.some((link) => link.href === '/buy-tiktok-likes')).toBe(
      false,
    );
    expect(commercial.some((link) => link.href === '/buy-tiktok-views')).toBe(
      false,
    );
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
          block.heading === 'Understand What a Follower Service Does' &&
          block.label === 'View TikTok Followers' &&
          block.href === '/buy-tiktok-followers',
      ),
    ).toBe(true);
    expect(article.content).not.toContain('Compare TikTok Growth Options');
    expect(article.content).toContain(
      'no public TikTok formula that lets someone predict an exact FYP penalty',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/tiktok-video-downloader',
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/buying-tiktok-followers-fyp-account-safety',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/buying-tiktok-followers-fyp-account-safety'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/buying-tiktok-followers-fyp-account-safety/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
