/**
 * Live Learn registry public dates — source data must be truthful and not
 * future editorial calendar targets.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LEARN_ARTICLES } from '@/data/learn/articles';
import { NOVALIKES_EDITORIAL_PLAN } from '@/lib/cms/editorial-plan';
import {
  buildArticleOpenGraph,
  buildArticleSchema,
  getIndexableArticles,
  toArticleSeoRecord,
} from '@/lib/learn/article-seo';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';

const LAUNCH_ISO = '2026-08-22T08:00:00.000Z';
const LAUNCH_MS = Date.parse(LAUNCH_ISO);
const NOW = new Date('2026-08-22T12:00:00.000Z');

const PLANNED_SLUGS = [
  'facebook-page-likes-vs-followers',
  'how-to-save-tiktok-profile-picture-full-size',
  'how-to-download-public-tiktok-video',
  'how-to-download-instagram-videos-reels',
] as const;

describe('live Learn registry public publication dates', () => {
  const live = LEARN_ARTICLES.filter(isPublicLiveArticle);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has exactly 26 live registry articles', () => {
    expect(LEARN_ARTICLES).toHaveLength(26);
    expect(live).toHaveLength(26);
    expect(getIndexableArticles()).toHaveLength(26);
  });

  it('sets publishedAt on or before the NovaLikes launch day for every live article', () => {
    for (const article of live) {
      expect(Date.parse(article.publishedAt), article.slug).toBeLessThanOrEqual(
        LAUNCH_MS,
      );
      expect(article.publishedAt).toBe(LAUNCH_ISO);
    }
  });

  it('never sets updatedAt earlier than publishedAt', () => {
    for (const article of live) {
      expect(
        Date.parse(article.updatedAt),
        `${article.slug} updatedAt`,
      ).toBeGreaterThanOrEqual(Date.parse(article.publishedAt));
      expect(Date.parse(article.updatedAt), article.slug).toBeLessThanOrEqual(
        LAUNCH_MS,
      );
    }
  });

  it('preserves editorial scheduledAt separately from public publishedAt', () => {
    for (const article of live) {
      expect(article.scheduledAt, article.slug).toBeTruthy();
      expect(article.scheduledAt, article.slug).not.toBe(article.publishedAt);
      const plan = NOVALIKES_EDITORIAL_PLAN.find(
        (item) => item.slug === article.slug,
      );
      expect(plan, article.slug).toBeTruthy();
      expect(article.scheduledAt?.startsWith(plan!.date), article.slug).toBe(
        true,
      );
    }
  });

  it('emits no future BlogPosting or Open Graph dates for live articles', () => {
    for (const article of live) {
      const seo = toArticleSeoRecord(article);
      const schemas = buildArticleSchema(seo);
      const blog = schemas.find((item) => item['@type'] === 'BlogPosting') as
        | Record<string, unknown>
        | undefined;
      expect(blog, article.slug).toBeTruthy();
      expect(blog!.datePublished, article.slug).toBe(article.publishedAt);
      expect(blog!.dateModified, article.slug).toBe(article.updatedAt);
      expect(Date.parse(String(blog!.datePublished))).toBeLessThanOrEqual(
        LAUNCH_MS,
      );
      expect(Date.parse(String(blog!.dateModified))).toBeLessThanOrEqual(
        LAUNCH_MS,
      );

      const og = buildArticleOpenGraph(seo) as {
        publishedTime?: string;
        modifiedTime?: string;
      };
      expect(og.publishedTime, article.slug).toBe(article.publishedAt);
      expect(og.modifiedTime, article.slug).toBe(article.updatedAt);
    }
  });

  it('puts all live Learn URLs in the sitemap with lastModified on/before launch', () => {
    const entries = buildSitemapEntries();
    const byUrl = new Map(
      entries.map((entry) => [entry.url, entry] as const),
    );

    for (const article of live) {
      const url = `https://novalikes.com/learn/${article.slug}`;
      const entry = byUrl.get(url);
      expect(entry, url).toBeTruthy();
      expect(entry!.lastModified, url).toBeTruthy();
      const stamp =
        entry!.lastModified instanceof Date
          ? entry!.lastModified
          : new Date(entry!.lastModified as string);
      expect(stamp.getTime(), url).toBeLessThanOrEqual(LAUNCH_MS);
      expect(
        entries.some((item) =>
          item.url.includes(`/es/learn/${article.slug}`),
        ),
      ).toBe(false);
    }
  });

  it('does not register the four remaining planned CMS topics as live Learn articles', () => {
    const liveSlugs = new Set(live.map((article) => article.slug));
    for (const slug of PLANNED_SLUGS) {
      expect(liveSlugs.has(slug)).toBe(false);
      expect(LEARN_ARTICLES.some((article) => article.slug === slug)).toBe(
        false,
      );
    }

    const plannedPlan = NOVALIKES_EDITORIAL_PLAN.filter((item) =>
      (PLANNED_SLUGS as readonly string[]).includes(item.slug),
    );
    expect(plannedPlan.map((item) => item.date)).toEqual([
      '2026-10-23',
      '2026-10-26',
      '2026-10-28',
      '2026-10-30',
    ]);
  });
});
