import { describe, expect, it } from 'vitest';

import { VIEW_INSTAGRAM_PROFILE_PICTURE_FULL_SIZE_ARTICLE as article } from '@/data/learn/articles/view-instagram-profile-picture-full-size';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #20 How to view an Instagram profile picture in full size', () => {
  it('is published with the original Wednesday 7 October 2026 editorial date', () => {
    expect(article.slug).toBe('view-instagram-profile-picture-full-size');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-07T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps utility-tool intent and does not add a service-package CTA', () => {
    expect(article.title).toBe(
      'How to View an Instagram Profile Picture in Full Size',
    );
    expect(article.seo.title).toBe(
      'How to View an Instagram Profile Picture in Full Size',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/view-instagram-profile-picture-full-size',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'view Instagram profile picture full size',
    );
    expect(article.relatedServices).toEqual([]);
    expect(article.relatedArticles).toEqual([
      'public-vs-private-instagram-account',
      'view-instagram-profile-without-login',
    ]);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([]);
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
          block.heading === 'View an Instagram Profile Picture' &&
          block.label === 'Open Profile Picture Viewer' &&
          block.href === '/tools/instagram-profile-picture-viewer',
      ),
    ).toBe(true);
    expect(getLearnArticleClosingCta(article)).toEqual({
      heading: 'View an Instagram Profile Picture',
      text: 'Enter an Instagram username to view the profile picture available from its public profile information. No Instagram password is required.',
      href: '/tools/instagram-profile-picture-viewer',
      label: 'Open Profile Picture Viewer',
    });
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(
      true,
    );
    expect(article.content).toContain(
      'always public, whether the account itself is public or private',
    );
    expect(article.content).toContain(
      'No Instagram password should be required',
    );
    expect(article.content).toContain(
      'should not claim to unlock private photos',
    );
    expect(article.content).toContain(
      'Private, hidden or login-gated profiles can return an error',
    );
    expect(article.content).not.toMatch(/4K original guaranteed/i);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-follower-counter',
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/view-instagram-profile-picture-full-size',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/view-instagram-profile-picture-full-size'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/view-instagram-profile-picture-full-size/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
