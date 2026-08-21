/**
 * Shared FAQ system — Document 14.04.
 */

export {
  getApprovedFaqs,
  getFeaturedFaqs,
  getFaqsByCategory,
  getFaqsByPlatform,
  getFaqsByService,
  getFaqsByPageLocation,
  getSchemaEligibleFaqs,
  getFaqById,
} from '@/lib/faqs/getters';

export { searchFaqs, normalizeFaqSearchQuery } from '@/lib/faqs/search';
export { sortFaqs } from '@/lib/faqs/sort';
export { detectDuplicateFaqs } from '@/lib/faqs/duplicates';
export { validateFaqLinks, getInvalidFaqLinks } from '@/lib/faqs/links';
export { sanitizeFaqForPublic, sanitizeFaqsForPublic } from '@/lib/faqs/public';
export {
  selectHomepageFaqs,
  selectServiceFaqs,
  selectMainFaqPageFaqs,
} from '@/lib/faqs/selection';
export {
  buildFaqPageSchemaFromVisible,
  toFaqSchemaItems,
} from '@/lib/faqs/schema';
export {
  enrichFaqAnswer,
  enrichFaqRecord,
  enrichPublicFaq,
  PAYMENT_METHODS_FAQ_ID,
  CURRENCY_FAQ_ID,
} from '@/lib/faqs/enrich';
export {
  hasConditionalRefundOrRefillWording,
  answerMentionsPaymentProvider,
} from '@/lib/faqs/wording';
export {
  isApprovedFaq,
  isPubliclyRenderableFaq,
  isUnsupportedYoutubePurchaseFaq,
  FAQ_STATUS_LABELS,
} from '@/lib/faqs/status';
export { sanitizeFaqText } from '@/lib/faqs/sanitize';
export {
  FAQ_MODERATION_ACTIONS,
  approveFaq,
  hideFaq,
  archiveFaq,
  assignFaqCategory,
  assignFaqPlatform,
  assignFaqServices,
  assignFaqPageLocations,
  reorderFaq,
  setFaqFeatured,
  toggleFaqSchemaEligible,
  addFaqRelatedLinks,
  applyFaqEdit,
} from '@/lib/faqs/actions';
export { filterAdminFaqs, toAdminFaqRow, statusLabel } from '@/lib/faqs/moderation';
