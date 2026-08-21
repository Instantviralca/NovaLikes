/**
 * Shared FAQ data model — Document 14.04.
 * All FAQ content lives in the data layer; components must not hardcode Q&A.
 */

import type { PlatformId } from '@/types/platform';
import type { CTAContent } from '@/types/copywriting';

export type FaqStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'hidden'
  | 'archived';

/**
 * FAQ categories — Documents 13.03 + 14.04.
 * Legacy hub categories remain; privacy/account/contact added for 14.04.
 */
export type FAQCategoryId =
  | 'general'
  | 'getting_started'
  | 'ordering'
  | 'delivery'
  | 'orders_delivery'
  | 'payments'
  | 'refunds'
  | 'payments_refunds'
  | 'tracking'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'privacy_legal'
  | 'account_security'
  | 'contact_support';

export type FaqPageLocation =
  | 'homepage'
  | 'faq_page'
  | 'contact'
  | 'checkout'
  | 'track_order'
  | 'about'
  | 'service_page'
  | 'platform_group'
  | 'legal_support'
  | 'learn';

export type FaqRelatedLink = CTAContent & {
  id: string;
};

/**
 * Canonical FAQ record (admin + public source).
 */
export type FaqRecord = {
  id: string;
  category: FAQCategoryId;
  question: string;
  answer: string;
  shortAnswer?: string;
  keywords: string[];
  platform?: PlatformId;
  serviceSlugs: string[];
  pageLocations: FaqPageLocation[];
  relatedLinks: FaqRelatedLink[];
  order: number;
  status: FaqStatus;
  featured: boolean;
  schemaEligible: boolean;
  createdAt: string;
  updatedAt: string;
  /** Internal only — never public. */
  moderationNotes?: string[];
};

/**
 * Safe public projection for UI + FAQPage schema (same strings).
 */
export type PublicFaq = {
  id: string;
  category: FAQCategoryId;
  question: string;
  answer: string;
  shortAnswer?: string;
  keywords: string[];
  platform?: PlatformId;
  serviceSlugs: string[];
  pageLocations: FaqPageLocation[];
  relatedLinks: FaqRelatedLink[];
  order: number;
  featured: boolean;
  schemaEligible: boolean;
};

export type FaqDuplicateKind =
  | 'duplicate_id'
  | 'exact_question'
  | 'near_duplicate_question'
  | 'conflicting_answer'
  | 'service_as_general_duplicate';

export type FaqDuplicateReport = {
  kind: FaqDuplicateKind;
  faqIds: string[];
  detail: string;
};

export type FaqLinkValidationResult = {
  faqId: string;
  linkId: string;
  href: string;
  valid: boolean;
  reason?: string;
};

export type FaqModerationActionId =
  | 'create'
  | 'edit'
  | 'approve'
  | 'hide'
  | 'archive'
  | 'assign_category'
  | 'assign_platform'
  | 'assign_service'
  | 'assign_page_location'
  | 'reorder'
  | 'feature'
  | 'toggle_schema_eligible'
  | 'add_related_links';
