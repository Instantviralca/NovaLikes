import { describe, expect, it } from 'vitest';

import { TIKTOK_LIKES_VS_VIEWS_ARTICLE as article } from '@/data/learn/articles/tiktok-likes-vs-views';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #25 TikTok likes vs views', () => {
  it('is published with the original Monday 19 October 2026 editorial date', () => {
    expect(article.slug).toBe('tiktok-likes-vs-views');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-19T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps likes and views as separate metrics and uses a two-service CTA', () => {
    expect(article.title).toBe(
      'TikTok Likes vs Views: Which Metric Matters for What?',
    );
    expect(article.seo.title).toBe(
      'TikTok Likes vs Views: Which Metric Matters More?',
    );
    expect(article.seo.canonicalPath).toBe('/learn/tiktok-likes-vs-views');
    expect(article.seo.keywords?.[0]).toBe('TikTok likes vs views');
    expect(article.relatedServices).toEqual([
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ]);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'how-tiktok-video-views-are-counted',
      'tiktok-views-but-no-followers',
      'tiktok-seo',
      'how-to-get-1000-tiktok-followers',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-tiktok-likes', label: 'TikTok Likes' },
      { href: '/buy-tiktok-views', label: 'TikTok Views' },
    ]);
    expect(
      article.blocks.some((block) =>
        block.type === 'paragraph'
          ? (block.inlineLinks ?? []).some(
              (link) => link.href === '/buy-tiktok-followers',
            )
          : false,
      ),
    ).toBe(false);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'service_cluster_cta' &&
          block.heading === 'Compare TikTok Likes and Views' &&
          block.serviceSlugs.join(',') === 'buy-tiktok-likes,buy-tiktok-views',
      ),
    ).toBe(true);
    expect(article.blocks.some((block) => block.type === 'internal_cta')).toBe(
      false,
    );
    expect(getLearnArticleClosingCta(article)).toEqual({
      heading: 'Explore TikTok Services',
      text: 'Compare the available NovaLikes options for TikTok likes and views.',
      href: '/buy-tiktok-likes',
      label: 'Explore TikTok Services',
    });
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(
      true,
    );
    expect(article.content).toContain(
      'Views measure visibility. Likes measure a specific interaction',
    );
    expect(article.content).toContain(
      'recommendation systems use multiple signals',
    );
    expect(article.content).not.toMatch(/100 Likes = another 1,000 views/i);
    expect(article.content).not.toMatch(/watch time = 70%/i);
    expect(article.content).toContain(
      'does not publish a deterministic purchased-Likes-to-extra-reach formula',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) =>
              link.href === '/learn/tiktok-followers-vs-likes-vs-views' &&
              link.label === 'TikTok followers vs likes vs views',
          ),
      ),
    ).toBe(true);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) =>
            link.href.includes('support.tiktok.com/de/'),
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/tiktok-likes-vs-views',
    );
    expect(
      urls.some((url) => url.includes('/es/learn/tiktok-likes-vs-views')),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/tiktok-likes-vs-views/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
