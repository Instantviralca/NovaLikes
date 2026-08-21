/**
 * Page-specific FAQ selection — Document 14.04.
 *
 * Homepage: 6–8 approved featured FAQs
 * Service: exact service → platform → general order/delivery/refund/tracking
 * Main FAQ page: full approved hub set (caller applies search/category)
 */

import {
  getApprovedFaqs,
  getFeaturedFaqs,
  getFaqsByPageLocation,
  getFaqsByPlatform,
  getFaqsByService,
} from '@/lib/faqs/getters';
import { sortFaqs } from '@/lib/faqs/sort';
import type { FaqRecord, PublicFaq } from '@/types/faq';
import type { PlatformId } from '@/types/platform';

const SERVICE_FALLBACK_CATEGORIES = new Set([
  'ordering',
  'delivery',
  'refunds',
  'tracking',
  'payments',
  'general',
  'account_security',
  'contact_support',
]);

export function selectHomepageFaqs(options?: {
  source?: FaqRecord[];
  min?: number;
  max?: number;
}): PublicFaq[] {
  return getFeaturedFaqs(options);
}

/**
 * Service page FAQ selection with platform fallback and general order FAQs.
 * Preserves priority tiers; excludes FAQs that belong only to a different service.
 */
export function selectServiceFaqs(options: {
  serviceSlug: string;
  platform: PlatformId;
  source?: FaqRecord[];
  limit?: number;
}): PublicFaq[] {
  const { serviceSlug, platform, source, limit = 12 } = options;
  const selectedIds = new Set<string>();
  const tiers: PublicFaq[][] = [[], [], []];

  for (const faq of getFaqsByService(serviceSlug, source)) {
    if (selectedIds.has(faq.id)) continue;
    selectedIds.add(faq.id);
    tiers[0]!.push(faq);
  }

  for (const faq of getFaqsByPlatform(platform, source)) {
    if (selectedIds.has(faq.id)) continue;
    if (
      faq.serviceSlugs.length > 0 &&
      !faq.serviceSlugs.includes(serviceSlug)
    ) {
      continue;
    }
    selectedIds.add(faq.id);
    tiers[1]!.push(faq);
  }

  for (const faq of getApprovedFaqs(source)) {
    if (selectedIds.has(faq.id)) continue;
    if (!SERVICE_FALLBACK_CATEGORIES.has(faq.category)) continue;
    if (faq.platform && faq.platform !== platform) continue;
    if (
      faq.serviceSlugs.length > 0 &&
      !faq.serviceSlugs.includes(serviceSlug)
    ) {
      continue;
    }
    if (
      faq.category === 'instagram' ||
      faq.category === 'tiktok' ||
      faq.category === 'facebook' ||
      faq.category === 'youtube'
    ) {
      continue;
    }
    selectedIds.add(faq.id);
    tiers[2]!.push(faq);
  }

  const ordered = [
    ...sortFaqs(tiers[0]!),
    ...sortFaqs(tiers[1]!),
    ...sortFaqs(tiers[2]!),
  ];
  return ordered.slice(0, limit);
}

/** Full approved hub set for the main FAQ page. */
export function selectMainFaqPageFaqs(source?: FaqRecord[]): PublicFaq[] {
  return getFaqsByPageLocation('faq_page', source).filter(
    (faq) =>
      faq.platform !== 'youtube' &&
      faq.category !== 'youtube' &&
      !faq.id.startsWith('faq-yt-') &&
      !faq.serviceSlugs.some((slug) => slug.includes('youtube')),
  );
}
