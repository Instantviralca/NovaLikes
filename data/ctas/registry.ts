/**
 * Shared CTA registry — Document 14.06.
 * All public CTA copy lives here; components must not hardcode labels.
 */

import { brand } from '@/config/brand';
import { routes } from '@/config/routes';
import type { CtaRecord } from '@/types/cta';

const primaryLabel = brand.ctaLabels.primary;
const exploreServices = brand.ctaLabels.secondary[1];
const contactUs = brand.ctaLabels.secondary[2];
const learnMore = brand.ctaLabels.secondary[0];

/**
 * Canonical CTA catalogue.
 * Destinations are internal paths validated against the Internal Linking Engine.
 */
export const ctaRegistry: CtaRecord[] = [
  // —— Primary ——
  {
    id: 'cta-get-started',
    title: 'Ready to grow your social presence?',
    description:
      'Choose a platform, pick a real package, and place your order with clear tracking and support.',
    buttonLabel: primaryLabel,
    destination: '/buy-instagram-followers',
    variant: 'primary',
    icon: 'rocket',
    pageLocations: ['homepage', 'about', 'footer'],
    active: true,
    order: 10,
  },
  {
    id: 'cta-browse-services',
    title: 'Browse growth services',
    description: 'Explore NovaLikes services for Instagram, TikTok, and Facebook.',
    buttonLabel: 'Browse Services',
    destination: '/buy-instagram-followers',
    variant: 'primary',
    icon: 'grid',
    pageLocations: ['homepage', 'about', 'faq', 'learn'],
    active: true,
    order: 20,
  },
  {
    id: 'cta-service-get-started',
    title: 'Choose your package',
    description:
      'Review real package options, delivery details, and service terms before checkout.',
    buttonLabel: primaryLabel,
    destination: '#service-pricing',
    variant: 'primary',
    icon: 'package',
    pageLocations: ['service_page'],
    active: true,
    order: 10,
  },
  {
    id: 'cta-buy-now',
    title: 'Order this service',
    description: 'Select a package and complete checkout with the required public profile or URL.',
    buttonLabel: 'Buy Now',
    destination: '#service-pricing',
    variant: 'primary',
    pageLocations: ['service_page'],
    active: true,
    order: 15,
  },
  {
    id: 'cta-checkout-continue',
    title: 'Continue to checkout',
    description: 'Review your order details and complete payment securely.',
    buttonLabel: 'Continue to Checkout',
    destination: routes.checkout,
    variant: 'primary',
    pageLocations: ['checkout'],
    active: true,
    order: 10,
  },

  // —— Secondary ——
  {
    id: 'cta-contact-support',
    title: 'Need help with an order?',
    description: 'Contact support for order questions, package guidance, or account assistance.',
    buttonLabel: contactUs,
    destination: routes.contact,
    variant: 'secondary',
    icon: 'headset',
    pageLocations: [
      'homepage',
      'service_page',
      'about',
      'contact',
      'faq',
      'legal',
      'track_order',
      'checkout',
      'learn',
      'footer',
    ],
    active: true,
    order: 30,
  },
  {
    id: 'cta-track-order',
    title: 'Track your order',
    description: 'Use your order ID and checkout email to view the latest customer-facing status.',
    buttonLabel: 'Track Your Order',
    destination: routes.trackOrder,
    variant: 'secondary',
    icon: 'search',
    pageLocations: ['homepage', 'service_page', 'faq', 'contact', 'track_order', 'checkout'],
    active: true,
    order: 40,
  },
  {
    id: 'cta-view-pricing',
    title: 'View pricing',
    description: 'Compare real package quantities, prices, and delivery estimates on this page.',
    buttonLabel: 'View Pricing',
    destination: '#service-pricing',
    variant: 'secondary',
    pageLocations: ['service_page'],
    active: true,
    order: 20,
  },
  {
    id: 'cta-explore-services',
    title: 'Explore services',
    description: 'See the services NovaLikes offers across supported platforms.',
    buttonLabel: exploreServices,
    destination: '/buy-instagram-followers',
    variant: 'secondary',
    pageLocations: ['homepage', 'about', 'faq', 'learn', 'footer'],
    active: true,
    order: 25,
  },

  // —— Cross-sell ——
  {
    id: 'cta-cross-sell-related',
    title: 'Explore related services',
    description:
      'Complementary services on the same platform can support a fuller growth plan.',
    buttonLabel: 'Explore More Services',
    destination: '/buy-instagram-likes',
    variant: 'cross_sell',
    pageLocations: ['service_page', 'homepage', 'learn'],
    active: true,
    order: 50,
  },
  {
    id: 'cta-cross-sell-instagram',
    title: 'Grow on Instagram',
    description: 'Browse Instagram follower, likes, views, and comments packages.',
    buttonLabel: 'Buy Instagram Followers',
    destination: '/buy-instagram-followers',
    variant: 'cross_sell',
    platform: 'instagram',
    serviceSlug: 'buy-instagram-followers',
    pageLocations: ['homepage', 'about', 'learn'],
    active: true,
    order: 51,
  },
  {
    id: 'cta-cross-sell-tiktok',
    title: 'Grow on TikTok',
    description: 'Browse TikTok follower, likes, and views packages.',
    buttonLabel: 'Buy TikTok Followers',
    destination: '/buy-tiktok-followers',
    variant: 'cross_sell',
    platform: 'tiktok',
    serviceSlug: 'buy-tiktok-followers',
    pageLocations: ['homepage', 'about', 'learn'],
    active: true,
    order: 52,
  },

  // —— Informational ——
  {
    id: 'cta-read-faq',
    title: 'Have questions?',
    description: 'Browse answers about ordering, delivery, payments, refunds, and tracking.',
    buttonLabel: 'Read FAQ',
    destination: routes.faq,
    variant: 'informational',
    pageLocations: ['homepage', 'service_page', 'about', 'contact', 'legal', 'checkout', 'learn'],
    active: true,
    order: 60,
  },
  {
    id: 'cta-refund-policy',
    title: 'Refund policy',
    description: 'Review eligibility, timelines, and conditions before you order.',
    buttonLabel: 'Refund Policy',
    destination: routes.refundPolicy,
    variant: 'informational',
    pageLocations: ['service_page', 'faq', 'checkout', 'legal', 'track_order'],
    active: true,
    order: 70,
  },
  {
    id: 'cta-contact-informational',
    title: 'Contact us',
    description: 'Reach the NovaLikes support team for help with services or orders.',
    buttonLabel: 'Contact Support',
    destination: routes.contact,
    variant: 'informational',
    pageLocations: ['faq', 'legal', 'track_order', 'about'],
    active: true,
    order: 65,
  },
  {
    id: 'cta-learn-more',
    title: 'Learn growth basics',
    description: 'Read platform-focused guides that explain ordering and growth concepts.',
    buttonLabel: learnMore,
    destination: routes.learn,
    variant: 'informational',
    pageLocations: ['homepage', 'about', 'service_page', 'learn'],
    active: true,
    order: 80,
  },

  // Inactive example (hidden publicly) — kept for admin/testing architecture
  {
    id: 'cta-inactive-placeholder',
    title: 'Inactive CTA',
    description: 'This CTA is intentionally inactive and must never render publicly.',
    buttonLabel: 'Hidden CTA',
    destination: routes.home,
    variant: 'secondary',
    pageLocations: ['homepage'],
    active: false,
    order: 999,
  },
];

export function getCtaRegistry(): CtaRecord[] {
  return ctaRegistry;
}

export function getCtaRecordById(id: string): CtaRecord | undefined {
  return ctaRegistry.find((cta) => cta.id === id);
}
