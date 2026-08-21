import { describe, expect, it } from 'vitest';

import { HOW_FACEBOOK_PAGE_REACH_WORKS_ARTICLE as article } from '@/data/learn/articles/how-facebook-page-reach-works';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #9 How Facebook Page reach works', () => {
  it('is published with the original Friday 11 September 2026 editorial date', () => {
    expect(article.slug).toBe('how-facebook-page-reach-works');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-09-11T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps reach, impressions and Page metrics separate and educational', () => {
    expect(article.title).toBe('How Facebook Page Reach Works in 2026');
    expect(article.seo.title).toBe('How Facebook Page Reach Works in 2026');
    expect(article.seo.canonicalPath).toBe(
      '/learn/how-facebook-page-reach-works',
    );
    expect(article.seo.keywords?.[0]).toBe('Facebook Page reach');
    expect(article.relatedServices).toEqual([
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ]);
    expect(article.relatedArticles).toEqual([
      'facebook-followers-vs-page-likes-vs-post-likes',
      'how-to-get-more-facebook-page-followers',
      'how-to-get-more-likes-on-facebook-post',
      'why-facebook-page-followers-drop',
      'how-to-download-facebook-video',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([
      { href: '/buy-facebook-followers', label: 'Facebook followers' },
      { href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' },
      { href: '/buy-facebook-post-likes', label: 'Facebook Post Likes' },
    ]);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'service_cluster_cta' &&
          block.heading === 'Understand Your Facebook Metrics' &&
          block.serviceSlugs.length === 3,
      ),
    ).toBe(true);
    expect(
      article.blocks.some((block) => block.type === 'comparison_table'),
    ).toBe(true);
    expect(article.content).toContain(
      'estimated number of people who saw content from your Page',
    );
    expect(article.content).not.toMatch(/Facebook only (shows|reaches) posts to \d+%/i);
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
      'https://novalikes.com/learn/how-facebook-page-reach-works',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-facebook-page-reach-works'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-facebook-page-reach-works/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
