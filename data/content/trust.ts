/**
 * Shared Trust Center content — Document 14.01.
 * Single source for homepage, service pages, checkout, about, contact, and tracking.
 * Do not hardcode these strings inside React components.
 */

import { routes } from '@/config/routes';
import { trustBadgeFlags } from '@/config/trust';
import type { TrustBadgeContent, TrustCenterContent } from '@/types/trust';

const trustBadges: TrustBadgeContent[] = [
  {
    id: 'trusted-since-2018',
    label: 'Trusted Since 2018',
    enabled: trustBadgeFlags['trusted-since-2018'],
  },
  {
    id: 'secure-checkout',
    label: 'Secure Checkout',
    enabled: trustBadgeFlags['secure-checkout'],
  },
  {
    id: 'no-password-required',
    label: 'No Password Required',
    enabled: trustBadgeFlags['no-password-required'],
  },
  {
    id: 'support-24-7',
    label: 'Customer Support',
    enabled: trustBadgeFlags['support-24-7'],
  },
  {
    id: 'real-package-data',
    label: 'Real Package Data',
    enabled: trustBadgeFlags['real-package-data'],
  },
  {
    id: 'refill-protection',
    label: 'Refill Protection',
    enabled: trustBadgeFlags['refill-protection'],
    note: 'Eligible packages only. Refill duration and conditions come from the real package data on the service page.',
  },
  {
    id: 'money-back-guarantee',
    label: '30-Day Money-Back Guarantee',
    enabled: trustBadgeFlags['money-back-guarantee'],
    note: 'Eligible purchases only. 30-Day Money-Back Guarantee subject to the Refund Policy.',
  },
];

/**
 * Canonical Trust Center copy module.
 * Refund and refill claims remain conditional and link to the Refund Policy.
 */
export const trustCenterContent: TrustCenterContent = {
  id: 'trust-center',
  header: {
    title: 'Why Customers Trust NovaLikes',
    subtitle:
      'Clear package data, password-free ordering, secure checkout, published policies, and support when you need help — without unsupported guarantees.',
  },
  badges: trustBadges,
  whyChoose: {
    title: 'Why Choose NovaLikes',
    description:
      'NovaLikes focuses on transparent ordering, real package options, and practical support across Instagram, TikTok, and Facebook services.',
    items: [
      {
        id: 'trust-why-transparency',
        title: 'Transparent Packages',
        description:
          'Compare real quantities, prices, and delivery estimates from NovaLikes.com before you checkout.',
      },
      {
        id: 'trust-why-password-free',
        title: 'Password-Free Process',
        description:
          'Orders use public usernames or URLs only. NovaLikes does not request social media passwords.',
      },
      {
        id: 'trust-why-support',
        title: 'Helpful Support',
        description:
          'Contact support with package questions, order updates, or help during processing.',
      },
      {
        id: 'trust-why-policies',
        title: 'Published Policies',
        description:
          'Review the Refund Policy, Privacy Policy, and Terms before you place an order.',
      },
    ],
  },
  secureCheckout: {
    id: 'trust-secure-checkout',
    title: 'Secure Checkout',
    description:
      'Checkout uses HTTPS and enabled payment providers. NovaLikes does not store complete payment-card details on its own systems. Payment confirmation and status come from the selected provider.',
  },
  noPasswordRequired: {
    id: 'trust-no-password',
    title: 'No Password Required',
    description:
      'NovaLikes does not ask for Instagram, TikTok, or Facebook account passwords. Provide the public username or URL required by the selected service and keep that destination accessible during processing.',
  },
  refundAndRefill: {
    id: 'trust-refund-refill',
    title: 'Refund & Refill Information',
    description:
      'Not every order is automatically refundable. Eligible purchases may be covered under the Refund Policy and the conditions shown for the selected service and package. Refill protection applies only to eligible packages, and refill duration or limits must come from the real package data — NovaLikes does not invent refill periods here.',
    refundPolicyCta: {
      label: 'Read the Refund Policy',
      href: routes.refundPolicy,
    },
  },
  customerSupport: {
    id: 'trust-customer-support',
    title: 'Customer Support',
    description:
      'Support is available for package questions, order updates, and help during processing. Include your order ID and checkout email when asking about an existing order.',
    supportCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
  },
  finalCta: {
    title: 'Ready to Choose a Package?',
    description:
      'Browse NovaLikes services, review real package options, and place an order with a clear, password-free process.',
    primaryCta: {
      label: 'Browse Services',
      href: routes.home,
    },
    secondaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
  },
};

export function getTrustCenterContent(): TrustCenterContent {
  return trustCenterContent;
}

/** Badges currently enabled through configuration. */
export function getEnabledTrustBadges(
  content: TrustCenterContent = trustCenterContent,
): TrustBadgeContent[] {
  return content.badges.filter((badge) => badge.enabled);
}
