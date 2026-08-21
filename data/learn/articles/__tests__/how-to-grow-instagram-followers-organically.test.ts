import { describe, expect, it } from 'vitest';

import { HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE as article } from '@/data/learn/articles/how-to-grow-instagram-followers-organically';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #17 How to grow Instagram followers organically in 2026', () => {
  it('is published with the original Wednesday 30 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-to-grow-instagram-followers-organically');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-30T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps organic audience-building intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'How to Grow Instagram Followers Organically in 2026',
    );
    expect(article.seo.title).toBe(
      'How to Grow Instagram Followers Organically in 2026',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-to-grow-instagram-followers-organically',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'how to grow Instagram followers organically',
    );
    expect(article.relatedServices).toEqual(['buy-instagram-followers']);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'how-instagram-reels-views-are-counted',
      'public-vs-private-instagram-account',
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
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' &&
          block.heading === 'Compare Instagram Follower Options' &&
          block.label === 'View Instagram Followers' &&
          block.href === '/buy-instagram-followers',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      '75% of recommendations coming from original posts',
    );
    expect(article.content).toContain(
      'This is a content framework, not a promise that you will gain a specific number of followers in 30 days.',
    );
    expect(article.content).toContain(
      'recommendation eligibility does not guarantee that content will actually be recommended',
    );
    expect(article.content).not.toMatch(/10k in 30 days guaranteed/i);
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
      'https://novalikes.com/learn/how-to-grow-instagram-followers-organically',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-to-grow-instagram-followers-organically'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-grow-instagram-followers-organically/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
