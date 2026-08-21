import { describe, expect, it } from 'vitest';

import { WHY_INSTAGRAM_FOLLOWERS_DROP_ARTICLE as article } from '@/data/learn/articles/why-instagram-followers-drop';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #8 Why Instagram followers drop', () => {
  it('is published with the original Wednesday 9 September 2026 editorial date', () => {
    expect(article.slug).toBe('why-instagram-followers-drop');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-09T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps informational SEO, one follower CTA, and a public follower-count tool link', () => {
    expect(article.title).toBe(
      'Why Do Instagram Followers Drop? Common Reasons Explained',
    );
    expect(article.seo.title).toBe(
      'Why Do Instagram Followers Drop? Common Reasons Explained',
    );
    expect(article.seo.canonicalPath).toBe('/learn/why-instagram-followers-drop');
    expect(article.seo.keywords?.[0]).toBe(
      'why are my Instagram followers dropping',
    );
    expect(article.relatedServices).toEqual(['buy-instagram-followers']);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-instagram-algorithm-works',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
      'check-instagram-follower-count-without-login',
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
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-follower-counter',
          ),
      ),
    ).toBe(true);
    expect(article.content).not.toMatch(/track exactly who unfollowed you/i);
    expect(article.content).toContain(
      'routinely removes disabled accounts',
    );
    expect(article.content).toContain(
      'does not automatically delete ordinary followers',
    );
    expect(article.content).toContain("Don't make that claim.");
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/why-instagram-followers-drop',
    );
    expect(
      urls.some((url) => url.includes('/es/learn/why-instagram-followers-drop')),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/why-instagram-followers-drop/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
