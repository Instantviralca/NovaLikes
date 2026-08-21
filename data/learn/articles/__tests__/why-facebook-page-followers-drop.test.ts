import { describe, expect, it } from 'vitest';

import { WHY_FACEBOOK_PAGE_FOLLOWERS_DROP_ARTICLE as article } from '@/data/learn/articles/why-facebook-page-followers-drop';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #18 Why Facebook Page followers drop or change', () => {
  it('is published with the original Friday 2 October 2026 editorial date', () => {
    expect(article.slug).toBe('why-facebook-page-followers-drop');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-02T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps diagnostic intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'Why Do Facebook Page Followers Drop or Change?',
    );
    expect(article.seo.title).toBe(
      'Why Do Facebook Page Followers Drop or Change?',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/why-facebook-page-followers-drop',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'why are my Facebook followers dropping',
    );
    expect(article.relatedServices).toEqual(['buy-facebook-followers']);
    expect(article.relatedArticles).toEqual([
      'facebook-followers-vs-page-likes-vs-post-likes',
      'how-facebook-page-reach-works',
      'how-to-get-more-facebook-page-followers',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' },
      { href: '/buy-facebook-followers', label: 'Facebook followers' },
    ]);
    expect(
      commercial.some((link) => link.href === '/buy-facebook-post-likes'),
    ).toBe(false);
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
          block.heading === 'Compare Facebook Follower Options' &&
          block.label === 'View Facebook Followers' &&
          block.href === '/buy-facebook-followers',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'liked a Page but did not follow it',
    );
    expect(article.content).toContain(
      'Page Like Insights have been replaced by Follow Insights',
    );
    expect(article.content).toContain(
      'There is no official Meta rule saying Facebook deletes Page followers merely because a Page did not publish',
    );
    expect(article.content).not.toMatch(/Facebook removes 8%/i);
    expect(article.content).not.toMatch(/shadowban/i);
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
      'https://novalikes.com/learn/why-facebook-page-followers-drop',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/why-facebook-page-followers-drop'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/why-facebook-page-followers-drop/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
