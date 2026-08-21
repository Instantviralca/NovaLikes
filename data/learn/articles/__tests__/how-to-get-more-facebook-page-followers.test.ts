import { describe, expect, it } from 'vitest';

import { HOW_TO_GET_MORE_FACEBOOK_PAGE_FOLLOWERS_ARTICLE as article } from '@/data/learn/articles/how-to-get-more-facebook-page-followers';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #12 How to get more Facebook Page followers organically', () => {
  it('is published with the original Friday 18 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-to-get-more-facebook-page-followers');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-18T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps organic how-to intent separate from buying intent and uses a followers-only CTA', () => {
    expect(article.title).toBe(
      'How to Get More Facebook Page Followers Organically',
    );
    expect(article.seo.title).toBe(
      'How to Get More Facebook Page Followers Organically',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-to-get-more-facebook-page-followers',
    );
    expect(article.seo.keywords?.[0]).toBe('how to get more Facebook followers');
    expect(article.relatedServices).toEqual(['buy-facebook-followers']);
    expect(article.relatedArticles).toEqual([
      'facebook-followers-vs-page-likes-vs-post-likes',
      'how-facebook-page-reach-works',
      'how-to-get-more-likes-on-facebook-post',
      'why-facebook-page-followers-drop',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-facebook-followers', label: 'Facebook followers' },
    ]);
    expect(
      commercial.some((link) => link.href === '/buy-facebook-page-likes'),
    ).toBe(false);
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
      'Why would someone who discovers this Page choose to keep seeing it?',
    );
    expect(article.content).toContain(
      'This is a planning framework, not a promise of follower numbers.',
    );
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
      'https://novalikes.com/learn/how-to-get-more-facebook-page-followers',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-to-get-more-facebook-page-followers'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-get-more-facebook-page-followers/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
