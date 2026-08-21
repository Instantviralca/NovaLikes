import { describe, expect, it } from 'vitest';

import { PUBLIC_VS_PRIVATE_TIKTOK_ACCOUNT_ARTICLE as article } from '@/data/learn/articles/public-vs-private-tiktok-account';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #13 Public vs private TikTok accounts', () => {
  it('is published with the original Monday 21 September 2026 editorial date', () => {
    expect(article.slug).toBe('public-vs-private-tiktok-account');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-21T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps privacy/discovery intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'Public vs Private TikTok Accounts: What Actually Changes?',
    );
    expect(article.seo.title).toBe(
      'Public vs Private TikTok Accounts: What Changes?',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/public-vs-private-tiktok-account',
    );
    expect(article.seo.keywords?.[0]).toBe('public vs private TikTok account');
    expect(article.relatedServices).toEqual(['buy-tiktok-followers']);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'tiktok-seo',
      'how-to-get-1000-tiktok-followers',
      'how-many-followers-to-go-live-on-tiktok',
      'why-tiktok-followers-drop',
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
          block.heading === 'Using a Public TikTok Profile?' &&
          block.label === 'View TikTok Followers' &&
          block.href === '/buy-tiktok-followers',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'name, username and profile photo remain visible',
    );
    expect(article.content).toContain(
      'It should not be described as “TikTok penalizes private accounts.”',
    );
    expect(article.content).not.toMatch(/shadowbanned/i);
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
      'https://novalikes.com/learn/public-vs-private-tiktok-account',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/public-vs-private-tiktok-account'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/public-vs-private-tiktok-account/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
