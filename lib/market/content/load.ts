import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

import type { HomepageHub } from '@/data/content/homepage-hub';
import type { InstagramFollowersPageConfig } from '@/data/content/instagram-followers-page-config';
import type { CoreServiceSlug } from '@/lib/i18n/config';
import {
  getEnglishHomepageSource,
  getEnglishMetadataSource,
  getEnglishServiceBundle,
} from '@/lib/i18n/content/english-source';
import { overlayEnglishWithIssues, type OverlayIssue } from '@/lib/i18n/overlay';
import { localizeMarketHrefsDeep } from '@/lib/market/localize-hrefs';
import { isMarket, type Market } from '@/lib/market/config';
import type { FAQItem } from '@/types/content';

const overlayCache = new Map<string, unknown>();

function overlayPath(market: Market, relative: string): string {
  return path.join(process.cwd(), 'content', 'markets', market, relative);
}

export function readMarketOverlay(market: Market, relative: string): unknown {
  const key = `${market}:${relative}`;
  if (overlayCache.has(key)) return overlayCache.get(key);
  const file = overlayPath(market, relative);
  if (!existsSync(file)) {
    throw new Error(`Missing market file: content/markets/${market}/${relative}`);
  }
  const data = JSON.parse(readFileSync(file, 'utf8')) as unknown;
  overlayCache.set(key, data);
  return data;
}

function assertCompleteOverlay(market: Market, name: string, issues: OverlayIssue[]): void {
  if (issues.length === 0) return;
  const sample = issues
    .slice(0, 12)
    .map((issue) => `${issue.path}: ${issue.message}`)
    .join('; ');
  throw new Error(
    `Incomplete ${market} overlay for ${name} (${issues.length} issues). ${sample}`,
  );
}

function overlayRequired<T>(market: Market, name: string, english: T, overlay: unknown): T {
  const { value, issues } = overlayEnglishWithIssues(english, overlay);
  assertCompleteOverlay(market, name, issues);
  return value;
}

export type MarketMetadataBundle = {
  homepage: { title: string; description: string };
  services: Record<string, { title: string; description: string }>;
};

export const loadMarketMetadataBundle = cache((market: Market): MarketMetadataBundle => {
  if (!isMarket(market)) throw new Error(`Unknown market: ${market}`);
  return readMarketOverlay(market, 'metadata.json') as MarketMetadataBundle;
});

/**
 * Apply market homepage extensions immutably.
 * HomepageHub comes from an `as const` English source, so nested fields are
 * readonly — never assign into the overlay result after creation.
 */
function mergeMarketHomepageExtensions(
  localized: HomepageHub,
  rawOverlay: Record<string, unknown>,
  market: Market,
): HomepageHub {
  const whyRaw = rawOverlay.why;
  const why =
    whyRaw && typeof whyRaw === 'object' && Array.isArray((whyRaw as { points?: unknown }).points)
      ? localizeMarketHrefsDeep(
          { ...localized.why, ...(whyRaw as typeof localized.why) },
          market,
        )
      : localized.why;

  const howRaw = rawOverlay.howItWorks;
  const howItWorks =
    howRaw && typeof howRaw === 'object' && Array.isArray((howRaw as { steps?: unknown }).steps)
      ? localizeMarketHrefsDeep(
          { ...localized.howItWorks, ...(howRaw as typeof localized.howItWorks) },
          market,
        )
      : localized.howItWorks;

  const beforeRaw = rawOverlay.beforeYouBuy;
  const beforeYouBuy =
    beforeRaw &&
    typeof beforeRaw === 'object' &&
    Array.isArray((beforeRaw as { items?: unknown }).items)
      ? localizeMarketHrefsDeep(
          { ...localized.beforeYouBuy, ...(beforeRaw as typeof localized.beforeYouBuy) },
          market,
        )
      : localized.beforeYouBuy;

  const faqRaw = rawOverlay.faq;
  const faq =
    faqRaw && typeof faqRaw === 'object' && Array.isArray((faqRaw as { items?: unknown }).items)
      ? localizeMarketHrefsDeep(
          { ...localized.faq, ...(faqRaw as typeof localized.faq) },
          market,
        )
      : localized.faq;

  return {
    ...localized,
    why,
    howItWorks,
    beforeYouBuy,
    faq,
  };
}

export const loadMarketHomepageHub = cache((market: Market): HomepageHub => {
  const english = getEnglishHomepageSource();
  const rawOverlay = readMarketOverlay(market, 'homepage.json') as Record<string, unknown>;
  const translated = overlayRequired(market, 'homepage', english, rawOverlay);
  const withHrefs = localizeMarketHrefsDeep(translated, market) as HomepageHub;
  let localized = mergeMarketHomepageExtensions(withHrefs, rawOverlay, market);

  if (rawOverlay.instagramOnly === true) {
    localized = { ...localized, instagramOnly: true };
  }
  if (rawOverlay.hideReviews === true) {
    localized = { ...localized, hideReviews: true };
  }
  if (rawOverlay.crossPlatform && typeof rawOverlay.crossPlatform === 'object') {
    localized = {
      ...localized,
      crossPlatform: localizeMarketHrefsDeep(
        rawOverlay.crossPlatform as NonNullable<HomepageHub['crossPlatform']>,
        market,
      ),
    };
  }
  if (rawOverlay.storySections && Array.isArray(rawOverlay.storySections)) {
    localized = {
      ...localized,
      storySections: localizeMarketHrefsDeep(
        rawOverlay.storySections as NonNullable<HomepageHub['storySections']>,
        market,
      ),
    };
  }

  return { ...localized, market };
});

export type MarketServiceBundle = ReturnType<typeof getEnglishServiceBundle>;

export const loadMarketServiceBundle = cache(
  (market: Market, slug: CoreServiceSlug): MarketServiceBundle => {
    const english = getEnglishServiceBundle(slug);
    const overlay = readMarketOverlay(market, `services/${slug}.json`) as Record<string, unknown>;

    const contentOverlay = overlay.content ?? overlay;
    const translatedContent = overlayRequired(
      market,
      `services/${slug}/content`,
      english.content,
      contentOverlay,
    );

    const overlayFaqIds = (
      contentOverlay && typeof contentOverlay === 'object'
        ? (contentOverlay as { faq?: { faqIds?: string[] } }).faq?.faqIds
        : undefined
    );

    const content = Array.isArray(overlayFaqIds)
      ? {
          ...translatedContent,
          faq: {
            ...translatedContent.faq,
            faqIds: overlayFaqIds,
          },
        }
      : translatedContent;

    let followersAuthority: InstagramFollowersPageConfig | undefined;
    if (english.followersAuthority && overlay.followersAuthority) {
      followersAuthority = localizeMarketHrefsDeep(
        overlay.followersAuthority as InstagramFollowersPageConfig,
        market,
      );
    } else if (english.followersAuthority) {
      followersAuthority = english.followersAuthority;
    }

    let dummy = english.dummy;
    if (english.dummy && overlay.dummy && typeof overlay.dummy === 'object') {
      const overlayDummy = overlay.dummy as Record<string, unknown>;
      const englishDummy = english.dummy as Record<string, unknown>;
      const englishConfig = (englishDummy.config ?? {}) as Record<string, unknown>;
      const overlayConfig = (overlayDummy.config ?? {}) as Record<string, unknown>;
      dummy = localizeMarketHrefsDeep(
        {
          ...englishDummy,
          ...overlayDummy,
          config: {
            ...englishConfig,
            ...overlayConfig,
          },
        } as typeof english.dummy,
        market,
      );
    }

    return localizeMarketHrefsDeep(
      {
        content,
        followersAuthority,
        dummy,
      },
      market,
    );
  },
);

/** Market service FAQ projection used by service page mappers (id/question/answer). */
export type MarketServiceFaqItem = Pick<FAQItem, 'id' | 'question' | 'answer'> & {
  order?: number;
};

export const loadMarketServiceFaqItems = cache(
  (market: Market, ids: string[]): MarketServiceFaqItem[] => {
    const overlayItems = readMarketOverlay(market, 'service-faqs.json');
    if (!Array.isArray(overlayItems)) {
      throw new Error(`service-faqs.json for ${market} must be an array`);
    }

    const overlayById = new Map<string, { id: string; question: string; answer: string }>();
    for (const item of overlayItems) {
      if (item && typeof item === 'object' && 'id' in item && typeof item.id === 'string') {
        overlayById.set(item.id, item as { id: string; question: string; answer: string });
      }
    }

    const issues: OverlayIssue[] = [];
    const items: MarketServiceFaqItem[] = ids.map((id) => {
      const overlay = overlayById.get(id);
      if (!overlay?.question?.trim() || !overlay?.answer?.trim()) {
        issues.push({ path: id, message: 'Missing market service FAQ question/answer' });
        return { id, question: '', answer: '', order: 0 };
      }
      return {
        id,
        question: overlay.question,
        answer: overlay.answer,
        order: 0,
      };
    });
    assertCompleteOverlay(market, 'service-faqs', issues);
    return localizeMarketHrefsDeep(items, market);
  },
);

export function getEnglishMetadataForMarketComparison(): ReturnType<typeof getEnglishMetadataSource> {
  return getEnglishMetadataSource();
}
