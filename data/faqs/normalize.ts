/**
 * Normalize legacy FAQContent / FAQItem rows into FaqRecord — Document 14.04.
 * Does not invent Q&A copy; only enriches structural metadata.
 */

import type { FAQItem } from '@/types/content';
import type {
  FAQCategoryId,
  FaqPageLocation,
  FaqRecord,
  FaqRelatedLink,
  FaqStatus,
} from '@/types/faq';
import type { PlatformId } from '@/types/platform';
import { routes } from '@/config/routes';
import { faqServiceHref, isAllowedFaqInternalHref } from '@/data/faqs/related-links';

/** Homepage featured FAQ ids — homepage content faqIds. */
export const HOMEPAGE_FEATURED_FAQ_IDS = [
  'faq-home-buy-followers',
  'faq-home-how-buy-followers',
  'faq-home-password',
  'faq-home-where-buy',
  'faq-home-likes-views',
  'faq-home-engagement-guarantee',
  'faq-home-check-before',
  'faq-home-track-order',
] as const;

const SERVICE_PREFIX_TO_SLUG: Array<{ prefix: string; slug: string; platform: PlatformId }> = [
  { prefix: 'faq-ig-followers', slug: 'buy-instagram-followers', platform: 'instagram' },
  { prefix: 'faq-ig-likes', slug: 'buy-instagram-likes', platform: 'instagram' },
  { prefix: 'faq-ig-views', slug: 'buy-instagram-views', platform: 'instagram' },
  { prefix: 'faq-ig-comments', slug: 'buy-instagram-comments', platform: 'instagram' },
  { prefix: 'faq-tt-followers', slug: 'buy-tiktok-followers', platform: 'tiktok' },
  { prefix: 'faq-tt-likes', slug: 'buy-tiktok-likes', platform: 'tiktok' },
  { prefix: 'faq-tt-views', slug: 'buy-tiktok-views', platform: 'tiktok' },
  { prefix: 'faq-fb-followers', slug: 'buy-facebook-followers', platform: 'facebook' },
  { prefix: 'faq-fb-page-likes', slug: 'buy-facebook-page-likes', platform: 'facebook' },
  { prefix: 'faq-fb-post-likes', slug: 'buy-facebook-post-likes', platform: 'facebook' },
  { prefix: 'faq-yt-subscribers', slug: 'buy-youtube-subscribers', platform: 'youtube' },
  { prefix: 'faq-yt-views', slug: 'buy-youtube-views', platform: 'youtube' },
];

const MIGRATION_TIMESTAMP = '2024-01-01T00:00:00.000Z';

function statusFromLegacy(item: FAQItem): FaqStatus {
  return item.active === false ? 'hidden' : 'approved';
}

function resolveServiceMeta(id: string): {
  serviceSlugs: string[];
  platform?: PlatformId;
} {
  const match = SERVICE_PREFIX_TO_SLUG.find((entry) => id.startsWith(entry.prefix));
  if (!match) return { serviceSlugs: [] };
  return { serviceSlugs: [match.slug], platform: match.platform };
}

function inferCategory(item: FAQItem, platform?: PlatformId): FAQCategoryId {
  if (item.category) return item.category;

  if (platform === 'instagram') return 'instagram';
  if (platform === 'tiktok') return 'tiktok';
  if (platform === 'facebook') return 'facebook';
  if (platform === 'youtube') return 'youtube';

  const id = item.id.toLowerCase();
  if (id.includes('payment') || id.includes('checkout')) return 'payments';
  if (id.includes('refund') || id.includes('money-back') || id.includes('refill')) {
    return 'refunds';
  }
  if (id.includes('track')) return 'tracking';
  if (id.includes('delivery') || id.includes('order-start') || id.includes('gradual')) {
    return 'delivery';
  }
  if (id.includes('order') || id.includes('package') || id.includes('ordering')) {
    return 'ordering';
  }
  if (id.includes('password') || id.includes('safe') || id.includes('security')) {
    return 'account_security';
  }
  if (id.includes('support') || id.includes('help') || id.includes('contact')) {
    return 'contact_support';
  }
  if (
    id.includes('privacy') ||
    id.includes('legal') ||
    id.includes('terms') ||
    id.includes('cookie')
  ) {
    return 'privacy_legal';
  }
  return 'general';
}

function inferPageLocations(
  item: FAQItem,
  featured: boolean,
  serviceSlugs: string[],
): FaqPageLocation[] {
  const locations = new Set<FaqPageLocation>();

  // Only source `category` marks hub (/faq) membership — Document 13.03.
  if (item.category) locations.add('faq_page');
  if (featured) locations.add('homepage');
  // Hub FAQs may list relatedServiceSlugs for contextual links without joining service pages.
  if (serviceSlugs.length > 0 && !item.category) locations.add('service_page');

  return Array.from(locations);
}

function inferRelatedLinks(
  item: FAQItem,
  category: FAQCategoryId,
  serviceSlugs: string[],
): FaqRelatedLink[] {
  const links: FaqRelatedLink[] = [];
  const id = item.id.toLowerCase();
  const answer = item.answer.toLowerCase();
  const seen = new Set<string>();

  const pushLink = (link: FaqRelatedLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    links.push(link);
  };

  for (const slug of serviceSlugs) {
    const href = faqServiceHref(slug);
    if (!isAllowedFaqInternalHref(href)) continue;
    pushLink({
      id: `${item.id}-${slug}`,
      label: slug
        .replace(/^buy-/, '')
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      href,
    });
  }

  if (
    category === 'refunds' ||
    category === 'payments_refunds' ||
    id.includes('refund') ||
    id.includes('money-back') ||
    answer.includes('refund policy')
  ) {
    pushLink({
      id: `${item.id}-refund-policy`,
      label: 'Refund Policy',
      href: routes.refundPolicy,
    });
  }
  if (
    category === 'tracking' ||
    category === 'orders_delivery' ||
    id.includes('track') ||
    answer.includes('track order')
  ) {
    pushLink({
      id: `${item.id}-track-order`,
      label: 'Track Order',
      href: routes.trackOrder,
    });
  }
  if (
    category === 'contact_support' ||
    id.includes('support') ||
    id.includes('help') ||
    answer.includes('contact page') ||
    answer.includes('contact support') ||
    answer.includes('contact novalikes support')
  ) {
    pushLink({
      id: `${item.id}-contact`,
      label: 'Contact Support',
      href: routes.contact,
    });
  }
  if (category === 'privacy_legal' || answer.includes('privacy policy')) {
    pushLink({
      id: `${item.id}-privacy`,
      label: 'Privacy Policy',
      href: routes.privacyPolicy,
    });
  }

  return links;
}

/**
 * Convert a legacy FAQ row into the canonical FaqRecord model.
 */
export function normalizeFaqItem(item: FAQItem, index: number): FaqRecord {
  const { serviceSlugs: inferredSlugs, platform } = resolveServiceMeta(item.id);
  const serviceSlugs =
    item.relatedServiceSlugs && item.relatedServiceSlugs.length > 0
      ? [...item.relatedServiceSlugs]
      : inferredSlugs;
  const featured = (HOMEPAGE_FEATURED_FAQ_IDS as readonly string[]).includes(item.id);
  const category = inferCategory(item, platform);
  const pageLocations = inferPageLocations(item, featured, serviceSlugs);
  const relatedLinks = inferRelatedLinks(item, category, serviceSlugs);
  const status = statusFromLegacy(item);

  return {
    id: item.id,
    category,
    question: item.question,
    answer: item.answer,
    keywords: item.keywords ?? [],
    platform,
    serviceSlugs,
    pageLocations,
    relatedLinks,
    order: item.order ?? index + 1,
    status,
    featured,
    schemaEligible: status === 'approved',
    createdAt: MIGRATION_TIMESTAMP,
    updatedAt: MIGRATION_TIMESTAMP,
  };
}

export function normalizeFaqItems(items: FAQItem[]): FaqRecord[] {
  return items.map((item, index) => normalizeFaqItem(item, index));
}
