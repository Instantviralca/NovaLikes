/**
 * Live Learn registry public dates — source data must be truthful and not
 * future editorial calendar targets.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EXPECTED_LIVE_LEARN_ARTICLE_COUNT,
  LAUNCH_LEARN_ARTICLE_COUNT,
  POST_LAUNCH_LEARN_SLUGS,
  REVISED_LAUNCH_LEARN_ARTICLES,
} from '@/lib/__tests__/fixtures/learn-corpus';

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

/**
 * Articles added after launch carry their real publication date.
 * They are checked separately below instead of being backdated to launch.
 */
const POST_LAUNCH_SLUGS = POST_LAUNCH_LEARN_SLUGS;

/** Launch articles revised after launch; they carry a real modified date. */
const REVISED_SLUGS = Object.keys(REVISED_LAUNCH_LEARN_ARTICLES);
const isRevised = (slug: string) => REVISED_SLUGS.includes(slug);

const PLANNED_SLUGS = [
  'facebook-page-likes-vs-followers',
  'how-to-save-tiktok-profile-picture-full-size',
  'how-to-download-public-tiktok-video',
  'how-to-download-instagram-videos-reels',
] as const;

describe('live Learn registry public publication dates', () => {
  const allLive = LEARN_ARTICLES.filter(isPublicLiveArticle);
  const live = allLive.filter(
    (article) => !(POST_LAUNCH_SLUGS as readonly string[]).includes(article.slug),
  );
  const unrevised = live.filter((article) => !isRevised(article.slug));

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has exactly the launch articles plus the post-launch articles', () => {
    expect(LEARN_ARTICLES).toHaveLength(EXPECTED_LIVE_LEARN_ARTICLE_COUNT);
    expect(allLive).toHaveLength(EXPECTED_LIVE_LEARN_ARTICLE_COUNT);
    expect(live).toHaveLength(LAUNCH_LEARN_ARTICLE_COUNT);
    expect(getIndexableArticles()).toHaveLength(EXPECTED_LIVE_LEARN_ARTICLE_COUNT);
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
      if (isRevised(article.slug)) {
        expect(article.updatedAt, article.slug).toBe(
          REVISED_LAUNCH_LEARN_ARTICLES[article.slug],
        );
        expect(article.showModifiedDate, article.slug).toBe(true);
      } else {
        expect(Date.parse(article.updatedAt), article.slug).toBeLessThanOrEqual(
          LAUNCH_MS,
        );
      }
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
    for (const article of unrevised) {
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

    for (const article of unrevised) {
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

describe('revised launch articles carry a truthful modified date', () => {
  const revised = LEARN_ARTICLES.filter((article) => isRevised(article.slug));

  it('lists only live launch articles', () => {
    expect(revised.map((article) => article.slug).sort()).toEqual(
      [...REVISED_SLUGS].sort(),
    );
    for (const article of revised) {
      expect(isPublicLiveArticle(article), article.slug).toBe(true);
      expect(article.publishedAt, article.slug).toBe(LAUNCH_ISO);
    }
  });

  it('dates the revision after launch and never in the future', () => {
    const now = Date.now();
    for (const article of revised) {
      const updated = Date.parse(article.updatedAt);
      expect(updated, article.slug).toBeGreaterThan(LAUNCH_MS);
      expect(updated, article.slug).toBeLessThanOrEqual(now);
      expect(article.showModifiedDate, article.slug).toBe(true);
    }
  });

  it('emits the revision date in schema, Open Graph and the sitemap', () => {
    const entries = buildSitemapEntries();
    for (const article of revised) {
      const seo = toArticleSeoRecord(article);
      const blog = buildArticleSchema(seo).find((item) => item['@type'] === 'BlogPosting') as
        | Record<string, unknown>
        | undefined;
      expect(blog, article.slug).toBeTruthy();
      expect(blog!.datePublished, article.slug).toBe(article.publishedAt);
      expect(blog!.dateModified, article.slug).toBe(article.updatedAt);
      const og = buildArticleOpenGraph(seo) as { publishedTime?: string; modifiedTime?: string };
      expect(og.publishedTime, article.slug).toBe(article.publishedAt);
      expect(og.modifiedTime, article.slug).toBe(article.updatedAt);

      const url = `https://novalikes.com/learn/${article.slug}`;
      const entry = entries.find((item) => item.url === url);
      expect(entry, url).toBeTruthy();
      const stamp =
        entry!.lastModified instanceof Date
          ? entry!.lastModified
          : new Date(entry!.lastModified as string);
      expect(stamp.getTime(), url).toBe(Date.parse(article.updatedAt));
      expect(entries.some((item) => item.url.includes(`/es/learn/${article.slug}`))).toBe(false);
    }
  });
});

describe('post-launch Learn articles use their real publication date', () => {
  const postLaunch = LEARN_ARTICLES.filter((article) =>
    (POST_LAUNCH_SLUGS as readonly string[]).includes(article.slug),
  );

  it('registers every post-launch slug as a live article', () => {
    expect(postLaunch.map((article) => article.slug).sort()).toEqual(
      [...POST_LAUNCH_SLUGS].sort(),
    );
    for (const article of postLaunch) {
      expect(isPublicLiveArticle(article), article.slug).toBe(true);
    }
  });

  it('dates them after launch and never in the future', () => {
    const now = Date.now();
    for (const article of postLaunch) {
      const published = Date.parse(article.publishedAt);
      expect(published, article.slug).toBeGreaterThan(LAUNCH_MS);
      expect(published, article.slug).toBeLessThanOrEqual(now);
      expect(Date.parse(article.updatedAt), article.slug).toBeGreaterThanOrEqual(published);
      expect(Date.parse(article.updatedAt), article.slug).toBeLessThanOrEqual(now);
    }
  });

  it('emits truthful schema and Open Graph dates', () => {
    for (const article of postLaunch) {
      const seo = toArticleSeoRecord(article);
      const blog = buildArticleSchema(seo).find((item) => item['@type'] === 'BlogPosting') as
        | Record<string, unknown>
        | undefined;
      expect(blog, article.slug).toBeTruthy();
      expect(blog!.datePublished, article.slug).toBe(article.publishedAt);
      expect(blog!.dateModified, article.slug).toBe(article.updatedAt);
      const og = buildArticleOpenGraph(seo) as { publishedTime?: string; modifiedTime?: string };
      expect(og.publishedTime, article.slug).toBe(article.publishedAt);
      expect(og.modifiedTime, article.slug).toBe(article.updatedAt);
    }
  });

  it('lists them in the sitemap without locale-prefixed URLs', () => {
    const entries = buildSitemapEntries();
    for (const article of postLaunch) {
      const url = `https://novalikes.com/learn/${article.slug}`;
      expect(entries.some((entry) => entry.url === url), url).toBe(true);
      expect(entries.some((entry) => entry.url.includes(`/es/learn/${article.slug}`))).toBe(false);
    }
  });
});
