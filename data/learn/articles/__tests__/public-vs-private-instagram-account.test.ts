import { describe, expect, it } from 'vitest';

import { PUBLIC_VS_PRIVATE_INSTAGRAM_ACCOUNT_ARTICLE as article } from '@/data/learn/articles/public-vs-private-instagram-account';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #14 Public vs private Instagram accounts', () => {
  it('is published with the original Wednesday 23 September 2026 editorial date', () => {
    expect(article.slug).toBe('public-vs-private-instagram-account');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-23T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps privacy/discovery intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'Public vs Private Instagram Accounts: What Changes for Followers and Reach?',
    );
    expect(article.seo.title).toBe(
      'Public vs Private Instagram Accounts: What Changes?',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/public-vs-private-instagram-account',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'public vs private Instagram account',
    );
    expect(article.relatedServices).toEqual(['buy-instagram-followers']);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'how-instagram-reels-views-are-counted',
      'how-to-grow-instagram-followers-organically',
      'view-instagram-profile-picture-full-size',
      'check-instagram-follower-count-without-login',
      'view-instagram-profile-without-login',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-instagram-followers', label: 'Instagram followers' },
    ]);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some((block) => block.type === 'comparison_table'),
    ).toBe(true);
    expect(
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' &&
          block.heading === 'Using a Public Instagram Profile?' &&
          block.label === 'View Instagram Followers' &&
          block.href === '/buy-instagram-followers',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'posts from a private account are visible only to approved followers',
    );
    expect(article.content).toContain(
      'professional accounts cannot be set to private',
    );
    expect(article.content).toContain(
      'But do not say “Instagram penalizes private accounts.”',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) => link.href.startsWith('/tools/')),
      ),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) =>
            link.href.startsWith('https://m.facebook.com'),
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/public-vs-private-instagram-account',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/public-vs-private-instagram-account'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/public-vs-private-instagram-account/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
