import { describe, expect, it } from 'vitest';

import { WHY_TIKTOK_FOLLOWERS_DROP_ARTICLE as article } from '@/data/learn/articles/why-tiktok-followers-drop';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #22 Why TikTok followers drop', () => {
  it('is published with the original Monday 12 October 2026 editorial date', () => {
    expect(article.slug).toBe('why-tiktok-followers-drop');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-12T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO, one follower CTA, and does not diagnose a penalty from follower loss', () => {
    expect(article.title).toBe(
      'Why Do TikTok Followers Drop? Common Causes Explained',
    );
    expect(article.seo.title).toBe(
      'Why Do TikTok Followers Drop? Common Causes Explained',
    );
    expect(article.seo.canonicalPath).toBe('/learn/why-tiktok-followers-drop');
    expect(article.seo.keywords?.[0]).toBe(
      'why are my TikTok followers dropping',
    );
    expect(article.relatedServices).toEqual(['buy-tiktok-followers']);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'how-to-get-1000-tiktok-followers',
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
          block.heading === 'Compare TikTok Follower Options' &&
          block.label === 'View TikTok Followers' &&
          block.href === '/buy-tiktok-followers',
      ),
    ).toBe(true);
    expect(getLearnArticleClosingCta(article)?.href).toBe(
      '/buy-tiktok-followers',
    );
    expect(article.content).toContain(
      'does not tell you the cause by itself',
    );
    expect(article.content).toContain(
      'username may be reset to a randomized numeric username',
    );
    expect(article.content).toContain(
      'does not prove a shadowban, recommendation restriction, fake-follower purge or algorithm penalty',
    );
    expect(article.content).toContain(
      'avoid absolute claims such as followers can never drop',
    );
    expect(article.content).not.toMatch(/TikTok removes \d+% (bots|monthly)/i);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) => link.href.startsWith('/buy-tiktok-likes')),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/why-tiktok-followers-drop',
    );
    expect(
      urls.some((url) => url.includes('/es/learn/why-tiktok-followers-drop')),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/why-tiktok-followers-drop/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
