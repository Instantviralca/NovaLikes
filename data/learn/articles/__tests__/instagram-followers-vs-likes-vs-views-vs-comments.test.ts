import { describe, expect, it } from 'vitest';

import { INSTAGRAM_FOLLOWERS_VS_LIKES_VS_VIEWS_VS_COMMENTS_ARTICLE as article } from '@/data/learn/articles/instagram-followers-vs-likes-vs-views-vs-comments';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #3 Instagram followers vs likes vs views vs comments', () => {
  it('is published with the original Friday 28 August 2026 editorial date', () => {
    expect(article.slug).toBe(
      'instagram-followers-vs-likes-vs-views-vs-comments',
    );
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-08-28T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO and supports Instagram commercial pages once each', () => {
    expect(article.title).toBe(
      'Instagram Followers vs Likes vs Views vs Comments: What Each Metric Means',
    );
    expect(article.seo.title).toBe(
      'Instagram Followers vs Likes vs Views vs Comments',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
    );
    expect(article.relatedServices).toEqual([
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-instagram-followers', label: 'Instagram followers' },
      { href: '/buy-instagram-likes', label: 'Instagram likes' },
      { href: '/buy-instagram-views', label: 'Instagram views' },
      { href: '/buy-instagram-comments', label: 'Instagram comments' },
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
            (link) => link.href === '/tools/instagram-follower-counter',
          ),
      ),
    ).toBe(true);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/instagram-followers-vs-likes-vs-views-vs-comments',
    );
    expect(
      urls.some((url) =>
        url.includes(
          '/es/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        ),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/instagram-followers-vs-likes-vs-views-vs-comments/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
