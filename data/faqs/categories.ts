/**
 * FAQ category navigation metadata — Documents 13.03 + 14.04.
 */

import type { FAQCategoryId } from '@/types/faq';

export type FAQCategoryMeta = {
  id: FAQCategoryId;
  label: string;
  /** Anchor id for in-page navigation. */
  anchor: string;
};

/** Main /faq hub category navigation. */
export const FAQ_CATEGORIES: FAQCategoryMeta[] = [
  { id: 'getting_started', label: 'Getting Started', anchor: 'getting-started' },
  { id: 'account_security', label: 'Account & Safety', anchor: 'account-safety' },
  { id: 'orders_delivery', label: 'Orders & Delivery', anchor: 'orders-delivery' },
  { id: 'instagram', label: 'Instagram', anchor: 'instagram' },
  { id: 'tiktok', label: 'TikTok', anchor: 'tiktok' },
  { id: 'facebook', label: 'Facebook', anchor: 'facebook' },
  { id: 'payments_refunds', label: 'Payments & Refunds', anchor: 'payments-refunds' },
];

/** Labels for all category ids (hub + legacy service FAQ categories). */
export const FAQ_CATEGORY_LABELS: Record<FAQCategoryId, string> = {
  general: 'General',
  getting_started: 'Getting Started',
  ordering: 'Ordering & Packages',
  delivery: 'Delivery & Processing',
  orders_delivery: 'Orders & Delivery',
  payments: 'Payments & Checkout',
  refunds: 'Refunds & Refill',
  payments_refunds: 'Payments & Refunds',
  tracking: 'Order Tracking',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  youtube: 'YouTube',
  privacy_legal: 'Privacy & Legal',
  account_security: 'Account & Safety',
  contact_support: 'Contact & Support',
};

export function getFaqCategoryMeta(id: FAQCategoryId): FAQCategoryMeta | undefined {
  return FAQ_CATEGORIES.find((category) => category.id === id);
}
