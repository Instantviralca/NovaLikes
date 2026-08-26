/**
 * Contextual in-body Learn linking — SEO architecture only.
 * Annotates existing paragraph/list text with inline links (same words).
 * Does not rewrite editorial copy.
 */

import {
  learnArticlePath,
  learnCategoryPath,
  routes,
} from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import {
  getPublicLearnArticleBySlug,
  listPublicLearnArticles,
  listPublicLearnArticlesByCategory,
} from '@/lib/learn/getters';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { PublicLearnArticle } from '@/types/learn';
import type { PlatformId } from '@/types/platform';

export type ContextualLinkTarget = {
  href: string;
  /** Phrases to match in existing copy (case-insensitive, first hit wins). */
  phrases: string[];
  group: 'category' | 'platform' | 'service' | 'pillar' | 'same-category';
};

const PILLAR_BY_CATEGORY: Record<string, string> = {
  instagram: 'how-to-grow-instagram-followers-organically',
  tiktok: 'tiktok-seo',
  facebook: 'facebook-followers-vs-page-likes-vs-post-likes',
  youtube: '',
  'social-media-marketing': 'how-to-grow-instagram-followers-organically',
  guides: 'how-to-grow-instagram-followers-organically',
};

const PLATFORM_PHRASE_BANK: Record<
  PlatformId,
  Array<{ phrases: string[]; articleSlug: string }>
> = {
  instagram: [
    {
      phrases: ['Instagram algorithm', 'the algorithm'],
      articleSlug: 'how-instagram-algorithm-works',
    },
    {
      phrases: ['Instagram followers', 'follower count', 'more Instagram followers'],
      articleSlug: 'how-to-grow-instagram-followers-organically',
    },
    {
      phrases: ['Instagram Reels views', 'Reels views'],
      articleSlug: 'how-instagram-reels-views-are-counted',
    },
    {
      phrases: ['followers drop', 'followers dropping'],
      articleSlug: 'why-instagram-followers-drop',
    },
    {
      phrases: ['private Instagram account', 'public Instagram account'],
      articleSlug: 'public-vs-private-instagram-account',
    },
    {
      phrases: ['followers vs likes', 'likes vs views'],
      articleSlug: 'instagram-followers-vs-likes-vs-views-vs-comments',
    },
  ],
  tiktok: [
    {
      phrases: ['TikTok SEO', 'TikTok search'],
      articleSlug: 'tiktok-seo',
    },
    {
      phrases: ['TikTok views', 'video views are counted'],
      articleSlug: 'how-tiktok-video-views-are-counted',
    },
    {
      phrases: ['TikTok followers', 'more TikTok followers', '1,000 TikTok followers'],
      articleSlug: 'how-to-get-1000-tiktok-followers',
    },
    {
      phrases: ['followers vs likes vs views'],
      articleSlug: 'tiktok-followers-vs-likes-vs-views',
    },
    {
      phrases: ['views but no followers'],
      articleSlug: 'tiktok-views-but-no-followers',
    },
    {
      phrases: ['go LIVE on TikTok', 'LIVE on TikTok'],
      articleSlug: 'how-many-followers-to-go-live-on-tiktok',
    },
    {
      phrases: ['private TikTok account', 'public TikTok account'],
      articleSlug: 'public-vs-private-tiktok-account',
    },
    {
      phrases: ['followers drop', 'followers dropping'],
      articleSlug: 'why-tiktok-followers-drop',
    },
  ],
  facebook: [
    {
      phrases: ['Facebook Page reach', 'Page reach'],
      articleSlug: 'how-facebook-page-reach-works',
    },
    {
      phrases: [
        'Facebook Followers',
        'Page Likes',
        'Post Likes',
        'followers vs Page Likes',
      ],
      articleSlug: 'facebook-followers-vs-page-likes-vs-post-likes',
    },
    {
      phrases: ['Facebook Page followers', 'more Facebook Page followers'],
      articleSlug: 'how-to-get-more-facebook-page-followers',
    },
    {
      phrases: ['likes on a Facebook post', 'Facebook post likes'],
      articleSlug: 'how-to-get-more-likes-on-facebook-post',
    },
    {
      phrases: ['Page followers drop', 'followers drop'],
      articleSlug: 'why-facebook-page-followers-drop',
    },
  ],
  youtube: [],
};

const SERVICE_PHRASE_BANK: Record<
  PlatformId,
  Array<{ phrases: string[]; serviceSlug: string }>
> = {
  instagram: [
    {
      phrases: [
        'Buy Instagram Followers',
        'Instagram follower packages',
        'Instagram growth services',
        'premium Instagram followers',
      ],
      serviceSlug: 'buy-instagram-followers',
    },
    {
      phrases: [
        'Buy Instagram Likes',
        'Instagram likes packages',
        'Instagram engagement services',
      ],
      serviceSlug: 'buy-instagram-likes',
    },
    {
      phrases: ['Buy Instagram Views', 'Instagram views packages'],
      serviceSlug: 'buy-instagram-views',
    },
    {
      phrases: ['Buy Instagram Comments', 'Instagram comment packages'],
      serviceSlug: 'buy-instagram-comments',
    },
  ],
  tiktok: [
    {
      phrases: [
        'Buy TikTok Followers',
        'TikTok follower packages',
        'TikTok growth services',
      ],
      serviceSlug: 'buy-tiktok-followers',
    },
    {
      phrases: ['Buy TikTok Likes', 'TikTok likes packages'],
      serviceSlug: 'buy-tiktok-likes',
    },
    {
      phrases: ['Buy TikTok Views', 'TikTok views packages'],
      serviceSlug: 'buy-tiktok-views',
    },
  ],
  facebook: [
    {
      phrases: [
        'Buy Facebook Followers',
        'Facebook follower packages',
        'Facebook growth services',
      ],
      serviceSlug: 'buy-facebook-followers',
    },
    {
      phrases: ['Buy Facebook Page Likes', 'Facebook Page Likes packages'],
      serviceSlug: 'buy-facebook-page-likes',
    },
    {
      phrases: ['Buy Facebook Post Likes', 'Facebook post likes packages'],
      serviceSlug: 'buy-facebook-post-likes',
    },
  ],
  youtube: [],
};

function shortTitle(title: string): string {
  return title
    .replace(/\s*\(2026\)\s*$/i, '')
    .replace(/^Complete\s+/i, '')
    .replace(/:\s+A Complete Guide.*$/i, '')
    .replace(/\s*\|\s*.*$/, '')
    .trim();
}

/**
 * Build prioritized contextual link targets for an article.
 * Distribution goal: same-category, platform cluster, services, category hub, pillar/home.
 */
export function buildContextualLinkTargets(
  article: PublicLearnArticle,
): ContextualLinkTarget[] {
  const targets: ContextualLinkTarget[] = [];
  const seenHref = new Set<string>();
  const push = (target: ContextualLinkTarget) => {
    if (!target.href || seenHref.has(target.href)) return;
    if (target.href === article.href) return;
    if (target.phrases.length === 0) return;
    seenHref.add(target.href);
    targets.push(target);
  };

  const category = getLearnCategoryById(article.category);
  const platformId = article.platformId ?? category?.platformId;
  const categorySlug = category?.slug ?? String(article.category);

  // Same-category related articles (preferred metadata first)
  const sameCategoryPreferred = article.relatedArticles
    .map((slug) => getPublicLearnArticleBySlug(slug))
    .filter((item): item is PublicLearnArticle => Boolean(item))
    .filter((item) => item.category === article.category);

  const sameCategoryFill = listPublicLearnArticlesByCategory(categorySlug).filter(
    (item) => item.slug !== article.slug,
  );

  for (const item of [...sameCategoryPreferred, ...sameCategoryFill]) {
    push({
      href: item.href,
      phrases: [shortTitle(item.title), item.title].filter(Boolean),
      group: 'same-category',
    });
  }

  // Platform cluster bank
  if (platformId) {
    for (const entry of PLATFORM_PHRASE_BANK[platformId] ?? []) {
      if (entry.articleSlug === article.slug) continue;
      const related = getPublicLearnArticleBySlug(entry.articleSlug);
      if (!related) continue;
      push({
        href: related.href,
        phrases: entry.phrases,
        group: 'platform',
      });
    }
  }

  // Commercial services (varied phrases)
  const serviceSlugs = [
    ...article.relatedServices,
    ...(platformId
      ? (SERVICE_PHRASE_BANK[platformId] ?? []).map((item) => item.serviceSlug)
      : []),
  ];
  for (const slug of serviceSlugs) {
    if (!isApprovedServiceSlug(slug)) continue;
    const service = getServiceBySlug(slug);
    if (!service) continue;
    const bank =
      platformId != null
        ? (SERVICE_PHRASE_BANK[platformId] ?? []).find(
            (item) => item.serviceSlug === slug,
          )
        : undefined;
    push({
      href: service.url,
      phrases: [
        ...(bank?.phrases ?? []),
        service.navigationLabel,
        service.name,
      ].filter(Boolean),
      group: 'service',
    });
  }

  // Parent Learn category
  if (category) {
    push({
      href: learnCategoryPath(category.slug),
      phrases: [
        `${category.name} guides`,
        `${category.name} Learn`,
        `${category.name} articles`,
        category.name,
      ],
      group: 'category',
    });
  }

  // Pillar guide + homepage
  const pillarSlug = PILLAR_BY_CATEGORY[categorySlug];
  if (pillarSlug && pillarSlug !== article.slug) {
    const pillar = getPublicLearnArticleBySlug(pillarSlug);
    if (pillar) {
      push({
        href: pillar.href,
        phrases: [shortTitle(pillar.title), pillar.title, 'growth guide'],
        group: 'pillar',
      });
    }
  }

  push({
    href: routes.home,
    phrases: ['NovaLikes', 'novalikes.com', 'homepage'],
    group: 'pillar',
  });

  // Cross-cluster guides for sparse categories (live corpus only)
  for (const slug of [
    'tiktok-seo',
    'how-instagram-algorithm-works',
    'facebook-followers-vs-page-likes-vs-post-likes',
    'instagram-followers-vs-likes-vs-views-vs-comments',
  ]) {
    if (slug === article.slug) continue;
    const item = getPublicLearnArticleBySlug(slug);
    if (!item) continue;
    push({
      href: item.href,
      phrases: [shortTitle(item.title), item.title],
      group: 'pillar',
    });
  }

  return targets;
}

export type AppliedInlineLink = {
  href: string;
  start: number;
  end: number;
  label: string;
};

/** Soft target for natural phrase matches — never force links to reach this. */
export const CONTEXTUAL_MIN_LINKS = 3;
/** Hard cap on auto-injected contextual inline links per article body. */
export const CONTEXTUAL_MAX_LINKS = 5;

/**
 * Find non-overlapping phrase matches in text for the given targets.
 */
export function matchContextualLinksInText(
  text: string,
  targets: ContextualLinkTarget[],
  options?: { limit?: number; usedHrefs?: Set<string> },
): AppliedInlineLink[] {
  const limit = options?.limit ?? 1;
  const usedHrefs = options?.usedHrefs ?? new Set<string>();
  const applied: AppliedInlineLink[] = [];
  const occupied: Array<{ start: number; end: number }> = [];

  const overlaps = (start: number, end: number) =>
    occupied.some((range) => start < range.end && end > range.start);

  for (const target of targets) {
    if (applied.length >= limit) break;
    if (usedHrefs.has(target.href)) continue;

    let best: AppliedInlineLink | null = null;
    for (const phrase of target.phrases) {
      if (!phrase || phrase.length < 3) continue;
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      const match = regex.exec(text);
      if (!match || match.index == null) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (overlaps(start, end)) continue;
      if (!best || match[0].length > best.label.length) {
        best = {
          href: target.href,
          start,
          end,
          label: text.slice(start, end),
        };
      }
    }

    if (!best) continue;
    applied.push(best);
    occupied.push({ start: best.start, end: best.end });
    usedHrefs.add(best.href);
  }

  return applied.sort((a, b) => a.start - b.start);
}

/**
 * Collect destinations already linked by authored cards / CTAs / existing inline
 * annotations so auto-injection does not duplicate them.
 */
function collectAuthoredDestinationHrefs(
  article: PublicLearnArticle,
  blocks: ArticleContentBlock[],
): Set<string> {
  const hrefs = new Set<string>();
  const selfHref = article.href;

  for (const block of blocks) {
    if (block.type === 'related_article_card') {
      const href = learnArticlePath(block.articleSlug);
      if (href !== selfHref) hrefs.add(href);
    }
    if (block.type === 'related_service_card') {
      hrefs.add(`/${block.serviceSlug}`);
    }
    if (block.type === 'internal_cta' && block.href.startsWith('/')) {
      hrefs.add(block.href.split('#')[0] || block.href);
    }
    if (block.type === 'paragraph' && Array.isArray(block.inlineLinks)) {
      for (const link of block.inlineLinks) {
        const href = link.href.split('#')[0] || link.href;
        if (href !== selfHref) hrefs.add(href);
      }
    }
    if (
      (block.type === 'bulleted_list' || block.type === 'numbered_list') &&
      Array.isArray(block.inlineItemLinks)
    ) {
      for (const link of block.inlineItemLinks) {
        const href = link.href.split('#')[0] || link.href;
        if (href !== selfHref) hrefs.add(href);
      }
    }
  }

  // Skip destinations already covered by in-body cards / CTAs.
  // Do not seed the full footer relatedArticles list — that would suppress
  // almost all natural in-body phrase links.
  if (article.serviceCta?.serviceSlug) {
    hrefs.add(`/${article.serviceCta.serviceSlug}`);
  }

  return hrefs;
}

/**
 * Annotate paragraph/list blocks with inline link metadata for rendering.
 * Preserves original text strings unchanged.
 *
 * Natural phrase matches only — never injects synthetic bridge paragraphs.
 * Soft target: CONTEXTUAL_MIN_LINKS. Hard cap: CONTEXTUAL_MAX_LINKS.
 */
export function applyContextualLinksToBlocks(
  article: PublicLearnArticle,
  blocks: ArticleContentBlock[],
  minLinks: number = CONTEXTUAL_MIN_LINKS,
  maxLinks: number = CONTEXTUAL_MAX_LINKS,
): { blocks: ArticleContentBlock[]; appliedCount: number } {
  const softTarget = Math.max(0, Math.min(minLinks, maxLinks));
  const hardCap = Math.max(0, maxLinks);
  const targets = buildContextualLinkTargets(article).filter(
    (target) =>
      target.href !== article.href &&
      !target.href.endsWith(`/${article.slug}`) &&
      target.href !== `/learn/${article.slug}`,
  );

  const usedHrefs = collectAuthoredDestinationHrefs(article, blocks);
  // Never allow self-link even if present in authored data by mistake.
  usedHrefs.add(article.href);
  usedHrefs.add(`/learn/${article.slug}`);
  usedHrefs.add(learnArticlePath(article.slug));

  let appliedCount = 0;
  let previousBlockReceivedLink = false;

  const next: ArticleContentBlock[] = blocks.map((block) => {
    if (appliedCount >= hardCap) return block;

    if (block.type === 'paragraph') {
      // Prefer skipping consecutive paragraphs when soft target already met.
      if (previousBlockReceivedLink && appliedCount >= softTarget) {
        previousBlockReceivedLink = false;
        return block;
      }

      const matches = matchContextualLinksInText(block.text, targets, {
        limit: 1,
        usedHrefs,
      });
      if (matches.length === 0) {
        previousBlockReceivedLink = false;
        return block;
      }

      appliedCount += matches.length;
      previousBlockReceivedLink = true;
      const existingLinks = block.inlineLinks ?? [];
      const mergedLinks = [...existingLinks];
      for (const match of matches) {
        if (!mergedLinks.some((link) => link.href === match.href)) {
          mergedLinks.push({ href: match.href, label: match.label });
        }
      }
      return {
        ...block,
        inlineLinks: mergedLinks,
      };
    }

    if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
      if (appliedCount >= hardCap) {
        previousBlockReceivedLink = false;
        return block;
      }
      if (previousBlockReceivedLink && appliedCount >= softTarget) {
        previousBlockReceivedLink = false;
        return block;
      }

      const itemLinks: Array<{ itemIndex: number; href: string; label: string }> =
        [];
      for (let itemIndex = 0; itemIndex < block.items.length; itemIndex++) {
        if (appliedCount + itemLinks.length >= hardCap) break;
        const item = block.items[itemIndex];
        const matches = matchContextualLinksInText(item, targets, {
          limit: 1,
          usedHrefs,
        });
        if (matches[0]) {
          itemLinks.push({
            itemIndex,
            href: matches[0].href,
            label: matches[0].label,
          });
        }
        // At most one auto-link per list block to keep density low.
        if (itemLinks.length >= 1) break;
      }

      if (itemLinks.length === 0) {
        previousBlockReceivedLink = false;
        return block;
      }

      appliedCount += itemLinks.length;
      previousBlockReceivedLink = true;
      const existingItemLinks = block.inlineItemLinks ?? [];
      const mergedItemLinks = [...existingItemLinks];
      for (const link of itemLinks) {
        if (
          !mergedItemLinks.some(
            (item) => item.itemIndex === link.itemIndex && item.href === link.href,
          )
        ) {
          mergedItemLinks.push(link);
        }
      }
      return {
        ...block,
        inlineItemLinks: mergedItemLinks,
      };
    }

    previousBlockReceivedLink = false;
    return block;
  });

  return { blocks: next, appliedCount };
}

/** Count contextual inline links annotated on blocks. */
export function countContextualInlineLinks(blocks: ArticleContentBlock[]): number {
  let count = 0;
  for (const block of blocks) {
    if (
      block.type === 'paragraph' &&
      'inlineLinks' in block &&
      Array.isArray(block.inlineLinks)
    ) {
      count += block.inlineLinks.length;
    }
    if (
      (block.type === 'bulleted_list' || block.type === 'numbered_list') &&
      'inlineItemLinks' in block &&
      Array.isArray(block.inlineItemLinks)
    ) {
      count += block.inlineItemLinks.length;
    }
  }
  return count;
}

/** True when any block is a synthetic contextual bridge paragraph. */
export function countContextualBridgeParagraphs(
  blocks: ArticleContentBlock[],
): number {
  return blocks.filter((block) =>
    String(block.id || '').startsWith('ctx-bridge-'),
  ).length;
}

export function getLatestPublicArticles(limit = 6): PublicLearnArticle[] {
  return listPublicLearnArticles()
    .slice()
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, limit);
}

export function getPopularPublicArticles(limit = 6): PublicLearnArticle[] {
  const featured = listPublicLearnArticles().filter((article) => article.featured);
  const rest = listPublicLearnArticles()
    .filter((article) => !article.featured)
    .sort((a, b) => b.relatedArticles.length - a.relatedArticles.length);
  const merged = [...featured, ...rest];
  const seen = new Set<string>();
  const out: PublicLearnArticle[] = [];
  for (const article of merged) {
    if (seen.has(article.slug)) continue;
    seen.add(article.slug);
    out.push(article);
    if (out.length >= limit) break;
  }
  return out;
}

export function getBeginnerPublicArticles(
  categorySlug: string,
  limit = 4,
): PublicLearnArticle[] {
  const articles = listPublicLearnArticlesByCategory(categorySlug);
  const scored = articles
    .map((article) => {
      const hay = `${article.title} ${article.excerpt} ${article.tags.join(' ')}`.toLowerCase();
      const score =
        (hay.includes('beginner') ? 3 : 0) +
        (hay.includes('guide') ? 2 : 0) +
        (hay.includes('complete') ? 1 : 0) +
        (article.featured ? 1 : 0);
      return { article, score };
    })
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title));
  return scored.slice(0, limit).map((item) => item.article);
}

export { learnArticlePath };
