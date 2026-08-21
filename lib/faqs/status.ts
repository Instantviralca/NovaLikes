/**
 * FAQ publication status helpers — Document 14.04.
 */

import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import type { FaqRecord, FaqStatus } from '@/types/faq';

export const FAQ_STATUS_LABELS: Record<FaqStatus, string> = {
  draft: 'Draft',
  pending_review: 'Pending Review',
  approved: 'Approved',
  hidden: 'Hidden',
  archived: 'Archived',
};

export function isApprovedFaq(faq: FaqRecord): boolean {
  return faq.status === 'approved';
}

type YoutubePurchaseFaqLike = {
  id?: string;
  platform?: string | null;
  category?: string | null;
  serviceSlugs?: readonly string[];
};

/**
 * YouTube purchase FAQs stay in the CMS/legacy pool but must not render
 * on the public site while NovaLikes does not sell YouTube services.
 */
export function isUnsupportedYoutubePurchaseFaq(
  faq: YoutubePurchaseFaqLike,
): boolean {
  const serviceSlugs = faq.serviceSlugs ?? [];
  const offersYoutube = serviceSlugs.some(
    (slug) => slug.includes('youtube') && isApprovedServiceSlug(slug),
  );
  if (offersYoutube) return false;

  if (faq.platform === 'youtube') return true;
  if (faq.category === 'youtube') return true;
  if (faq.id?.startsWith('faq-yt-')) return true;
  if (serviceSlugs.some((slug) => slug.includes('youtube'))) return true;
  return false;
}

export function isPubliclyRenderableFaq(faq: FaqRecord): boolean {
  return isApprovedFaq(faq) && !isUnsupportedYoutubePurchaseFaq(faq);
}
