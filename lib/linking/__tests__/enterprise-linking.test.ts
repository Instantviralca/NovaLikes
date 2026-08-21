/**
 * Internal linking SEO report — enterprise crawl graph snapshot.
 */

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getFooterColumns } from '@/data/footer';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { prepareArticleForRender } from '@/lib/learn/article/template';
import {
  applyContextualLinksToBlocks,
  CONTEXTUAL_MAX_LINKS,
  countContextualBridgeParagraphs,
  countContextualInlineLinks,
} from '@/lib/learn/contextual-links';
import { listPublicLearnArticles, toPublicLearnArticle } from '@/lib/learn/getters';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import { buildSitemapEntries, findOrphanSitemapPages } from '@/lib/seo/sitemap';

describe('Enterprise internal linking quality', () => {
  it('keeps auto-injected contextual links within the hard cap and never injects bridges', () => {
    const violations: string[] = [];
    for (const record of getPublishedLearnArticleRecords()) {
      const article = toPublicLearnArticle(record);
      const { blocks, appliedCount } = applyContextualLinksToBlocks(
        article,
        article.blocks,
      );
      const counted = countContextualInlineLinks(blocks);
      const bridges = countContextualBridgeParagraphs(blocks);
      if (appliedCount > CONTEXTUAL_MAX_LINKS || counted > CONTEXTUAL_MAX_LINKS) {
        violations.push(
          `${article.slug}: applied=${appliedCount} counted=${counted} (max ${CONTEXTUAL_MAX_LINKS})`,
        );
      }
      if (bridges > 0) {
        violations.push(`${article.slug}: bridge paragraphs=${bridges}`);
      }

      const hrefs: string[] = [];
      for (const block of blocks) {
        if (block.type === 'paragraph' && block.inlineLinks) {
          for (const link of block.inlineLinks) hrefs.push(link.href);
        }
        if (
          (block.type === 'bulleted_list' || block.type === 'numbered_list') &&
          block.inlineItemLinks
        ) {
          for (const link of block.inlineItemLinks) hrefs.push(link.href);
        }
      }
      const unique = new Set(hrefs);
      if (unique.size !== hrefs.length) {
        violations.push(`${article.slug}: duplicate auto destinations`);
      }
      if (
        hrefs.some(
          (href) => href === article.href || href.endsWith(`/${article.slug}`),
        )
      ) {
        violations.push(`${article.slug}: self-link`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('filters self-references from related article resolution', () => {
    const record = getPublishedLearnArticleRecords().find(
      (item) => item.slug === 'facebook-growth-guide',
    );
    expect(record).toBeTruthy();
    expect(record!.relatedArticles.includes('facebook-growth-guide')).toBe(false);
    const prepared = prepareArticleForRender(toPublicLearnArticle(record!));
    expect(
      prepared.article.relatedArticles.includes('facebook-growth-guide'),
    ).toBe(false);
  });

  it('provides Related Learn (6) and People Also Read (4) without duplicates for services', () => {
    for (const slug of APPROVED_SERVICE_SLUGS) {
      const related = getRelatedArticles(slug, { limit: 6 });
      expect(related.length).toBeGreaterThanOrEqual(6);
      const relatedHrefs = new Set(related.map((item) => item.href));
      const people = getRelatedArticles(slug, { limit: 16 }).filter(
        (item) => !relatedHrefs.has(item.href),
      );
      expect(people.length).toBeGreaterThanOrEqual(4);
      const overlap = people
        .slice(0, 4)
        .filter((item) => relatedHrefs.has(item.href));
      expect(overlap).toHaveLength(0);
    }
  });

  it('keeps current company, support, legal, and FAQ footer links without empty Learn destinations', () => {
    const resources = getFooterColumns().find((column) => column.id === 'resources');
    expect(resources).toBeTruthy();
    const hrefs = new Set(resources!.links.map((link) => link.href));
    expect(hrefs.has('/faq')).toBe(true);
    expect(hrefs.has('/learn')).toBe(true);
    expect(hrefs.has('/learn/instagram')).toBe(false);
    expect(hrefs.has('/learn/tiktok')).toBe(false);
    expect(hrefs.has('/learn/facebook')).toBe(false);
    expect(hrefs.has('/learn/youtube')).toBe(false);
    expect(hrefs.has('/learn/social-media-marketing')).toBe(false);
    expect(hrefs.has('/learn/guides')).toBe(false);
  });

  it('keeps sitemap orphans empty', () => {
    expect(findOrphanSitemapPages(buildSitemapEntries())).toHaveLength(0);
  });

  it('publishes a Learn corpus of 56 live articles for link graph density', () => {
    expect(listPublicLearnArticles().length).toBe(56);
  });
});
