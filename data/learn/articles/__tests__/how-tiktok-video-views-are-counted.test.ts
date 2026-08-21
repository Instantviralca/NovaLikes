import { describe, expect, it } from 'vitest';

import { HOW_TIKTOK_VIDEO_VIEWS_ARE_COUNTED_ARTICLE as article } from '@/data/learn/articles/how-tiktok-video-views-are-counted';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #10 How TikTok video views are counted', () => {
  it('is published with the original Monday 14 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-tiktok-video-views-are-counted');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-14T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('tiktok');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps public views separate from qualified views and uses a views-only CTA', () => {
    expect(article.title).toBe('How Are TikTok Video Views Counted?');
    expect(article.seo.title).toBe('How Are TikTok Video Views Counted?');
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-tiktok-video-views-are-counted',
    );
    expect(article.seo.keywords?.[0]).toBe('how TikTok views are counted');
    expect(article.relatedServices).toEqual(['buy-tiktok-views']);
    expect(article.relatedArticles).toEqual([
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'tiktok-seo',
      'how-to-get-1000-tiktok-followers',
      'tiktok-likes-vs-views',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-tiktok-views', label: 'TikTok views' },
    ]);
    expect(commercial.some((link) => link.href === '/buy-tiktok-followers')).toBe(
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
          block.heading === 'Compare TikTok View Options' &&
          block.label === 'View TikTok View Packages' &&
          block.href === '/buy-tiktok-views',
      ),
    ).toBe(true);
    expect(
      article.blocks.some((block) => block.type === 'comparison_table'),
    ).toBe(true);
    expect(article.content).toContain(
      'Public video views ≠ automatically qualified Creator Rewards views',
    );
    expect(article.content).toContain(
      'does not provide a complete ordinary-view counting formula',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) =>
              link.href === '/tools/tiktok-video-downloader' &&
              link.label === 'TikTok Video Downloader',
          ),
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'It does not measure or verify view counts.',
    );
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/how-tiktok-video-views-are-counted',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-tiktok-video-views-are-counted'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-tiktok-video-views-are-counted/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
