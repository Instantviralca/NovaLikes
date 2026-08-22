import { describe, expect, it } from 'vitest';

import {
  buildArticleSchema,
  resolvePublicArticleTimestamps,
} from '@/lib/learn/article-seo';
import type { ArticleSeoRecord } from '@/types/learn-article-seo';

function makeSeo(overrides: Partial<ArticleSeoRecord> = {}): ArticleSeoRecord {
  return {
    title: 'Grow Instagram Followers Organically',
    metaTitle: 'Grow Instagram Followers Organically | NovaLikes Learn',
    metaDescription: 'Practical organic growth habits for Instagram in 2026.',
    canonicalPath: '/learn/how-to-grow-instagram-followers-organically',
    robots: { index: true, follow: true },
    primaryKeyword: 'grow instagram followers organically',
    secondaryKeywords: [],
    articleSection: 'Instagram',
    publishedAt: '2026-09-30T08:00:00.000Z',
    updatedAt: '2026-09-30T08:00:00.000Z',
    showModifiedDate: false,
    featuredImage: {
      src: '/og-default.png',
      alt: 'Grow Instagram Followers Organically',
      width: 1200,
      height: 630,
    },
    authorId: 'author-missing',
    schemaType: 'BlogPosting',
    faqIds: [],
    active: true,
    published: true,
    noindex: false,
    slug: 'how-to-grow-instagram-followers-organically',
    articleId: 'ig-grow-1',
    categoryId: 'instagram',
    tags: ['followers'],
    excerpt: 'Practical organic growth habits.',
    href: '/learn/how-to-grow-instagram-followers-organically',
    ...overrides,
  };
}

describe('public Learn date metadata', () => {
  const now = new Date('2026-08-22T00:00:00.000Z');

  it('keeps past/present timestamps and omits future editorial target dates', () => {
    const past = resolvePublicArticleTimestamps(
      {
        publishedAt: '2026-07-01T08:00:00.000Z',
        updatedAt: '2026-07-01T08:00:00.000Z',
        showModifiedDate: false,
      },
      now,
    );
    expect(past.datePublished).toBe('2026-07-01T08:00:00.000Z');
    expect(past.dateModified).toBe('2026-07-01T08:00:00.000Z');
    expect(past.sitemapLastModified?.toISOString()).toBe('2026-07-01T08:00:00.000Z');

    const future = resolvePublicArticleTimestamps(
      {
        publishedAt: '2026-09-30T08:00:00.000Z',
        updatedAt: '2026-09-30T08:00:00.000Z',
        showModifiedDate: false,
      },
      now,
    );
    expect(future.datePublished).toBeUndefined();
    expect(future.dateModified).toBeUndefined();
    expect(future.sitemapLastModified).toBeUndefined();
  });

  it('omits future BlogPosting dates for live articles with editorial calendar targets', () => {
    const schemas = buildArticleSchema(makeSeo());
    const article = schemas.find((item) => item['@type'] === 'BlogPosting') as Record<
      string,
      unknown
    >;
    expect(article).not.toHaveProperty('datePublished');
    expect(article).not.toHaveProperty('dateModified');
  });

  it('emits BlogPosting dates when they are already in the past', () => {
    const schemas = buildArticleSchema(
      makeSeo({
        publishedAt: '2026-07-01T08:00:00.000Z',
        updatedAt: '2026-07-15T08:00:00.000Z',
        showModifiedDate: true,
      }),
    );
    const article = schemas.find((item) => item['@type'] === 'BlogPosting') as Record<
      string,
      unknown
    >;
    expect(article.datePublished).toBe('2026-07-01T08:00:00.000Z');
    expect(article.dateModified).toBe('2026-07-15T08:00:00.000Z');
  });

  it('emits public timestamps for the NovaLikes launch-day publishedAt', () => {
    const launchNow = new Date('2026-08-22T12:00:00.000Z');
    const launch = resolvePublicArticleTimestamps(
      {
        publishedAt: '2026-08-22T08:00:00.000Z',
        updatedAt: '2026-08-22T08:00:00.000Z',
        showModifiedDate: false,
      },
      launchNow,
    );
    expect(launch.datePublished).toBe('2026-08-22T08:00:00.000Z');
    expect(launch.dateModified).toBe('2026-08-22T08:00:00.000Z');
    expect(launch.sitemapLastModified?.toISOString()).toBe(
      '2026-08-22T08:00:00.000Z',
    );
  });
});
