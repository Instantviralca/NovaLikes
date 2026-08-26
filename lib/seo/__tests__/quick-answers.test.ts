/**
 * Quick Answer blocks — SSR copy, localization, uniqueness, and schema guards.
 */

import { describe, expect, it } from 'vitest';

import {
  ENGLISH_QUICK_ANSWERS,
  QUICK_ANSWER_PAGE_IDS,
  type QuickAnswerPageId,
} from '@/data/quick-answers';
import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { loadQuickAnswer } from '@/lib/i18n/content/load';
import { LOCALIZED_QUICK_ANSWERS } from '@/lib/i18n/content/quick-answers-locales';
import { organizationSchema } from '@/schemas/organization';
import { site } from '@/config/site';

const SERVICE_IDS = [
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
] as const satisfies readonly QuickAnswerPageId[];

const TOOL_IDS = [
  'instagram-profile-viewer',
  'instagram-profile-picture-viewer',
  'instagram-follower-counter',
  'instagram-video-downloader',
  'tiktok-video-downloader',
  'tiktok-profile-picture-downloader',
  'facebook-video-downloader',
  'facebook-reels-downloader',
] as const satisfies readonly QuickAnswerPageId[];

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .split(/\s+/)
      .filter((token) => token.length > 3),
  );
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenSet(a);
  const setB = tokenSet(b);
  const intersection = [...setA].filter((token) => setB.has(token)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

describe('Quick Answer copy coverage', () => {
  it('defines unique English answers for all 20 target pages', () => {
    expect(QUICK_ANSWER_PAGE_IDS).toHaveLength(20);
    for (const pageId of QUICK_ANSWER_PAGE_IDS) {
      expect(ENGLISH_QUICK_ANSWERS[pageId].trim().length).toBeGreaterThan(40);
    }
    expect(new Set(Object.values(ENGLISH_QUICK_ANSWERS)).size).toBe(20);
  });

  it('keeps English Quick Answers within the 40–80 word target range', () => {
    for (const pageId of QUICK_ANSWER_PAGE_IDS) {
      const count = wordCount(ENGLISH_QUICK_ANSWERS[pageId]);
      expect(count, pageId).toBeGreaterThanOrEqual(35);
      expect(count, pageId).toBeLessThanOrEqual(90);
    }
  });

  it('provides localized Quick Answers for every localized locale', () => {
    for (const locale of LOCALIZED_LOCALES) {
      for (const pageId of QUICK_ANSWER_PAGE_IDS) {
        const text = loadQuickAnswer(locale, pageId);
        expect(text.trim().length, `${locale}/${pageId}`).toBeGreaterThan(20);
        expect(text, `${locale}/${pageId}`).not.toBe(ENGLISH_QUICK_ANSWERS[pageId]);
      }
    }
  });

  it('keeps service Quick Answers distinct from one another', () => {
    for (let i = 0; i < SERVICE_IDS.length; i += 1) {
      for (let j = i + 1; j < SERVICE_IDS.length; j += 1) {
        const similarity = jaccardSimilarity(
          ENGLISH_QUICK_ANSWERS[SERVICE_IDS[i]],
          ENGLISH_QUICK_ANSWERS[SERVICE_IDS[j]],
        );
        expect(similarity, `${SERVICE_IDS[i]} vs ${SERVICE_IDS[j]}`).toBeLessThan(0.72);
      }
    }
  });

  it('keeps tool Quick Answers distinct from one another', () => {
    for (let i = 0; i < TOOL_IDS.length; i += 1) {
      for (let j = i + 1; j < TOOL_IDS.length; j += 1) {
        const similarity = jaccardSimilarity(
          ENGLISH_QUICK_ANSWERS[TOOL_IDS[i]],
          ENGLISH_QUICK_ANSWERS[TOOL_IDS[j]],
        );
        expect(similarity, `${TOOL_IDS[i]} vs ${TOOL_IDS[j]}`).toBeLessThan(0.75);
      }
    }
  });

  it('distinguishes Facebook followers, Page Likes, and Post Likes in English copy', () => {
    const followers = ENGLISH_QUICK_ANSWERS['buy-facebook-followers'].toLowerCase();
    const pageLikes = ENGLISH_QUICK_ANSWERS['buy-facebook-page-likes'].toLowerCase();
    const postLikes = ENGLISH_QUICK_ANSWERS['buy-facebook-post-likes'].toLowerCase();
    expect(followers).toContain('follower');
    expect(pageLikes).toContain('page like');
    expect(postLikes).toContain('post');
    expect(followers).not.toEqual(pageLikes);
    expect(pageLikes).not.toEqual(postLikes);
  });

  it('does not reuse one localized template across all locales for the same page', () => {
    for (const pageId of SERVICE_IDS) {
      const texts = LOCALIZED_LOCALES.map((locale) => LOCALIZED_QUICK_ANSWERS[locale][pageId]);
      expect(new Set(texts).size, pageId).toBeGreaterThan(1);
    }
  });
});

describe('Organization schema entity signals', () => {
  it('includes verified contactPoint, logo, knowsAbout, and sameAs only', () => {
    const schema = organizationSchema();
    expect(schema.name).toBe('NovaLikes');
    expect(schema.logo).toBe('https://novalikes.com/assets/logos/logo.svg');
    expect(schema.contactPoint).toMatchObject({
      email: site.supportEmail,
      url: 'https://novalikes.com/contact',
    });
    expect(schema.knowsAbout).toEqual(
      expect.arrayContaining(['Instagram growth services', 'Social media lookup tools']),
    );
    expect(schema.sameAs).toEqual([
      site.socialLinks.instagram,
      site.socialLinks.facebook,
      site.socialLinks.linkedin,
    ]);
    expect(schema).not.toHaveProperty('aggregateRating');
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('telephone');
    expect(schema).not.toHaveProperty('areaServed');
  });
});
