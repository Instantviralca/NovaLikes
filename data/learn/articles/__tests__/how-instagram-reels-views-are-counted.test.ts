import { describe, expect, it } from 'vitest';

import { HOW_INSTAGRAM_REELS_VIEWS_ARE_COUNTED_ARTICLE as article } from '@/data/learn/articles/how-instagram-reels-views-are-counted';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #11 How Instagram Reels views are counted', () => {
  it('is published with the original Wednesday 16 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-instagram-reels-views-are-counted');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-16T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps views, reach and watch time separate and uses a views-only CTA', () => {
    expect(article.title).toBe('How Are Instagram Reels Views Counted?');
    expect(article.seo.title).toBe('How Are Instagram Reels Views Counted?');
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-instagram-reels-views-are-counted',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'how Instagram Reels views are counted',
    );
    expect(article.relatedServices).toEqual(['buy-instagram-views']);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-instagram-views', label: 'Instagram views' },
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
          block.heading === 'Compare Instagram View Options' &&
          block.label === 'View Instagram View Packages' &&
          block.href === '/buy-instagram-views',
      ),
    ).toBe(true);
    expect(
      article.blocks.some((block) => block.type === 'comparison_table'),
    ).toBe(true);
    expect(article.content).toContain('starts to play or replay');
    expect(article.content).toContain(
      'Views can be higher than Accounts reached because total playback',
    );
    expect(article.content).toContain("So don't insert an unsupported:");
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
      'https://novalikes.com/learn/how-instagram-reels-views-are-counted',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-instagram-reels-views-are-counted'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-instagram-reels-views-are-counted/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
