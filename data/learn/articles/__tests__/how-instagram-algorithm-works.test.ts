import { describe, expect, it } from 'vitest';

import { HOW_INSTAGRAM_ALGORITHM_WORKS_ARTICLE as article } from '@/data/learn/articles/how-instagram-algorithm-works';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #5 Instagram algorithm 2026', () => {
  it('is published with the original Wednesday 2 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-instagram-algorithm-works');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-02T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO and does not treat services as ranking tools', () => {
    expect(article.title).toBe(
      'How the Instagram Algorithm Works in 2026: Feed, Reels, Explore & Stories',
    );
    expect(article.seo.title).toBe(
      'Instagram Algorithm 2026: Feed, Reels, Explore & Stories',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-instagram-algorithm-works',
    );
    expect(article.relatedServices).toEqual([
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ]);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'why-instagram-followers-drop',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([]);
    expect(
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' && block.href.startsWith('/buy-'),
      ),
    ).toBe(false);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) => link.href.startsWith('/tools/')),
      ),
    ).toBe(false);
    expect(article.content).toContain(
      'so bought engagement is not a ranking strategy',
    );
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/how-instagram-algorithm-works',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-instagram-algorithm-works'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a positive reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-instagram-algorithm-works/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
