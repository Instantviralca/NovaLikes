import { describe, expect, it } from 'vitest';

import { HOW_TO_GET_1000_TIKTOK_FOLLOWERS_ARTICLE as article } from '@/data/learn/articles/how-to-get-1000-tiktok-followers';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #16 How to get your first 1,000 TikTok followers organically', () => {
  it('is published with the original Monday 28 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-to-get-1000-tiktok-followers');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-28T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps organic audience-building intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'How to Get Your First 1,000 TikTok Followers Organically',
    );
    expect(article.seo.title).toBe(
      'How to Get Your First 1,000 TikTok Followers Organically',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-to-get-1000-tiktok-followers',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'how to get 1000 followers on TikTok',
    );
    expect(article.relatedServices).toEqual(['buy-tiktok-followers']);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'tiktok-seo',
      'how-tiktok-video-views-are-counted',
      'public-vs-private-tiktok-account',
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
          block.heading === 'Compare TikTok Follower Options' &&
          block.label === 'View TikTok Followers' &&
          block.href === '/buy-tiktok-followers',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'Searches by followers filter becomes available when you have more than 1,000 followers',
    );
    expect(article.content).toContain(
      'This is a content framework, not a guarantee that you will reach 1,000 followers in 30 days.',
    );
    expect(article.content).not.toMatch(/1,?000 followers in 7 days guaranteed/i);
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
      'https://novalikes.com/learn/how-to-get-1000-tiktok-followers',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-to-get-1000-tiktok-followers'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-get-1000-tiktok-followers/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
