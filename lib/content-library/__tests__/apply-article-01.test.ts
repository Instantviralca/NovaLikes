/**
 * Apply Article 01 production assets — merge package v1 FAQs/meta into generator output.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { getPlannedArticleBySlug } from '@/data/content-plan/articles';
import { writeGeneratedAssets } from '@/lib/content-generators/write-assets';
import { estimateReadingTime } from '@/lib/content-generators/seo';
import { syncLibraryStarters } from '@/lib/content-library';
import { runContentQA } from '@/lib/content-qa';
import type { FaqAssets, SeoAssets } from '@/types/content-assets';

const shouldApply = process.env.APPLY_ARTICLE_01 === '1';

const PRODUCTION_FAQ_ANSWERS: Record<string, string> = {
  'How long does Instagram growth take?':
    'It depends on your niche, content quality, consistency, and audience.',
  'Do hashtags still help?':
    'Relevant hashtags can improve discoverability but are only one part of a broader strategy.',
  'Should I post every day?':
    'Consistency is generally more important than frequency alone.',
};

const PRODUCTION_META = {
  metaTitle:
    'How to Get More Instagram Followers: 15 Proven Strategies | NovaLikes',
  metaDescription:
    'Learn practical strategies to grow your Instagram audience through content, engagement, profile optimization, and analytics.',
};

describe('Article 01 production package apply', () => {
  it.skipIf(!shouldApply)('regenerates assets, merges FAQ answers, syncs library', () => {
    const brief = getPlannedArticleBySlug('how-to-get-more-instagram-followers');
    expect(brief).toBeTruthy();
    const packageDir = path.join(
      process.cwd(),
      'content/instagram/how-to-get-more-instagram-followers',
    );
    const body = readFileSync(path.join(packageDir, '03_Article.mdx'), 'utf8');
    const written = writeGeneratedAssets(packageDir, brief!, { publishState: 'draft' });
    expect(written.issues.filter((i) => i.severity === 'blocker')).toEqual([]);

    const seoPath = path.join(packageDir, '04_SEO.json');
    const seo = JSON.parse(readFileSync(seoPath, 'utf8')) as SeoAssets;
    seo.metaTitle = PRODUCTION_META.metaTitle;
    seo.metaDescription = PRODUCTION_META.metaDescription;
    seo.openGraph = {
      ...seo.openGraph,
      title: `${brief!.workingTitle} | NovaLikes Learn`,
      description: PRODUCTION_META.metaDescription.slice(0, 200),
    };
    seo.twitter = {
      ...seo.twitter,
      title: `${brief!.workingTitle} | NovaLikes Learn`,
      description: PRODUCTION_META.metaDescription.slice(0, 200),
    };
    seo.readingTimeMinutes = estimateReadingTime(body);
    seo.robots = { index: false, follow: false };
    seo.publishState = 'draft';
    seo.sitemap = { ...seo.sitemap, eligible: false, lastModified: null };
    writeFileSync(seoPath, `${JSON.stringify(seo, null, 2)}\n`, 'utf8');
    writeFileSync(
      path.join(packageDir, 'assets/seo/seo.json'),
      `${JSON.stringify(seo, null, 2)}\n`,
      'utf8',
    );

    const faqPath = path.join(packageDir, '05_FAQ.json');
    const faq = JSON.parse(readFileSync(faqPath, 'utf8')) as FaqAssets;
    faq.items = faq.items.map((item) => {
      const answer = PRODUCTION_FAQ_ANSWERS[item.question];
      if (!answer) return item;
      return {
        ...item,
        answer,
        schemaEligible: false,
      };
    });
    writeFileSync(faqPath, `${JSON.stringify(faq, null, 2)}\n`, 'utf8');
    writeFileSync(
      path.join(packageDir, 'assets/seo/faq.json'),
      `${JSON.stringify(faq, null, 2)}\n`,
      'utf8',
    );

    const queue = syncLibraryStarters({ cwd: process.cwd() });
    const slot = queue.slots.find((s) => s.slug === brief!.slug);
    expect(slot).toBeTruthy();
    expect(slot!.status).not.toBe('Published');

    const qa = runContentQA(packageDir, { writeReports: true });
    expect(qa.publishEligible).toBe(false);
    expect(qa.slug).toBe(brief!.slug);
  });

  it('documents opt-in when idle', () => {
    if (shouldApply) return;
    expect(shouldApply).toBe(false);
  });
});
