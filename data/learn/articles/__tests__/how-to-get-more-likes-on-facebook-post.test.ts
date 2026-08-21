import { describe, expect, it } from 'vitest';

import { HOW_TO_GET_MORE_LIKES_ON_FACEBOOK_POST_ARTICLE as article } from '@/data/learn/articles/how-to-get-more-likes-on-facebook-post';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #15 How to get more likes on a Facebook post without ads', () => {
  it('is published with the original Friday 25 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-to-get-more-likes-on-facebook-post');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-25T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps organic how-to intent separate from buying intent and uses a Post Likes-only CTA', () => {
    expect(article.title).toBe(
      'How to Get More Likes on a Facebook Post Without Ads',
    );
    expect(article.seo.title).toBe(
      'How to Get More Likes on Facebook Posts Without Ads',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-to-get-more-likes-on-facebook-post',
    );
    expect(article.seo.keywords?.[0]).toBe('how to get more likes on Facebook');
    expect(article.relatedServices).toEqual(['buy-facebook-post-likes']);
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
      { href: '/buy-facebook-post-likes', label: 'Facebook Post Likes' },
    ]);
    expect(
      commercial.some((link) => link.href === '/buy-facebook-followers'),
    ).toBe(false);
    expect(
      commercial.some((link) => link.href === '/buy-facebook-page-likes'),
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
          block.heading === 'Compare Facebook Post Like Options' &&
          block.label === 'View Facebook Post Likes' &&
          block.href === '/buy-facebook-post-likes',
      ),
    ).toBe(true);
    expect(article.content).toContain(
      'engagement bait as content that pushes users to interact artificially',
    );
    expect(article.content).toContain(
      'There is no guaranteed algorithm formula.',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) => link.href.startsWith('/tools/')),
      ),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) =>
            link.href.startsWith('https://en-gb.facebook.com'),
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/how-to-get-more-likes-on-facebook-post',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-to-get-more-likes-on-facebook-post'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-get-more-likes-on-facebook-post/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
