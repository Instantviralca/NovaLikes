import { routes } from '@/config/routes';
import type { PlatformId } from '@/types/platform';

export const comparisonSection = {
  id: 'home-comparison',
  eyebrow: 'Why NovaLikes',
  title: 'Why Thousands Choose NovaLikes',
  description:
    'NovaLikes brings package selection, checkout, delivery information and order tracking into one straightforward customer journey across Instagram, TikTok, YouTube and Facebook.',
  proofPoints: [
    'Public profile only',
    'Secure checkout',
    'Transparent delivery',
    'Dedicated support',
    'Clear package details',
  ],
  featureCards: [
    {
      id: 'public-profile',
      title: 'Public profile only',
      description: 'Orders use a public username or content URL — never a social login.',
    },
    {
      id: 'secure-checkout',
      title: 'Secure checkout',
      description: 'Review packages and complete payment through a clear checkout flow.',
    },
    {
      id: 'transparent-delivery',
      title: 'Transparent delivery',
      description: 'Delivery timing and terms are shown before you place an order.',
    },
    {
      id: 'dedicated-support',
      title: 'Dedicated support',
      description: 'Get help with packages, checkout, delivery and existing orders.',
    },
    {
      id: 'customer-experience',
      title: 'Real customer experience',
      description: 'Track available status updates from confirmation through delivery.',
    },
  ],
  cta: {
    label: 'Explore Available Services',
    href: '#featured-services',
  },
  columns: {
    novaLikes: 'NovaLikes',
    typical: 'May Vary Elsewhere',
  },
  rows: [
    {
      id: 'package-info',
      label: 'Package information before checkout',
      novaLikes: true,
      typical: false,
    },
    { id: 'tracking', label: 'Public order tracking', novaLikes: true, typical: false },
    { id: 'platforms', label: 'Four supported platforms', novaLikes: true, typical: false },
    { id: 'package-pages', label: 'Dedicated package pages', novaLikes: true, typical: false },
    { id: 'faqs', label: 'Searchable homepage FAQs', novaLikes: true, typical: false },
    {
      id: 'refund-refill',
      label: 'Clear refund and refill terms',
      novaLikes: true,
      typical: false,
      href: routes.refundPolicy,
    },
  ],
} as const;

export const timelineSection = {
  id: 'home-timeline',
  title: 'Serving Customers Since 2018',
  description:
    'Since launching in 2018, NovaLikes has helped creators, businesses and brands grow across Instagram, TikTok, YouTube and Facebook through secure ordering, transparent delivery and professional support.',
  milestones: [
    { id: 'launch', year: '2018', label: 'NovaLikes launched' },
    { id: 'growing', year: 'Growth', label: 'Growing customer base' },
    { id: 'customers', year: '50,000+', label: 'Customers served' },
    { id: 'delivered', year: 'Millions', label: 'Services delivered' },
    { id: 'today', year: 'Today', label: 'Trusted by creators, businesses and brands' },
  ],
} as const;

export const securitySection = {
  id: 'home-security',
  title: 'Built Around Security & Transparency',
  description:
    'Every order is designed around secure checkout, public profile information only and transparent delivery tracking.',
  cards: [
    {
      id: 'ssl',
      title: 'SSL Secure',
      description: 'Pages and checkout use encrypted connections to help protect your session.',
    },
    {
      id: 'username',
      title: 'Public Username Only',
      description: 'Orders use a public username or profile URL. No social media password is required.',
    },
    {
      id: 'checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through a protected checkout flow with clear order details.',
    },
    {
      id: 'tracking',
      title: 'Order Tracking',
      description: 'Monitor delivery progress on the public order tracking page with your order ID and email.',
      href: routes.trackOrder,
    },
    {
      id: 'support',
      title: 'Dedicated Support',
      description: 'Contact professional customer support for package questions, delivery updates and order help.',
      href: routes.contact,
    },
  ],
} as const;

export type GuideCard = {
  id: string;
  platform: PlatformId;
  title: string;
  description: string;
  href: string;
};

export const guidesSection = {
  id: 'home-guides',
  title: 'Social Media Growth Guides',
  description:
    'Explore practical guides covering Instagram, TikTok, YouTube and Facebook growth, content planning and platform best practices.',
  /** Category placeholder cards — homepage renders published Learn articles only. */
  cards: [] satisfies GuideCard[],
} as const;

export const paymentsSection = {
  id: 'home-payments',
  title: 'Secure Payments',
  description: 'Checkout is protected using secure payment processing.',
  badges: [
    { id: 'visa', label: 'Visa' },
    { id: 'mastercard', label: 'Mastercard' },
    { id: 'paypal', label: 'PayPal' },
    { id: 'stripe', label: 'Stripe' },
    { id: 'ssl', label: 'SSL Secure' },
  ],
} as const;

/** Generated premium illustrations used by homepage extension sections. */
export const extensionIllustrations = {
  comparison: {
    src: '/assets/images/illustrations/extensions/comparison-dashboard.webp',
    alt: 'NovaLikes compared with typical providers — checklist cards with secure ordering highlights',
    width: 1536,
    height: 1024,
  },
  timeline: {
    src: '/assets/images/illustrations/extensions/timeline-milestones.webp',
    alt: 'NovaLikes timeline from 2018 launch to 50,000+ customers and millions delivered',
    width: 1536,
    height: 1024,
  },
  security: {
    src: '/assets/images/illustrations/extensions/security-shield.webp',
    alt: 'Security and transparency illustration with shield, lock, SSL and order tracking cards',
    width: 1536,
    height: 1024,
  },
  guides: {
    src: '/assets/images/illustrations/extensions/knowledge-base-guides.webp',
    alt: 'Learn guides illustration for Instagram, TikTok, YouTube and Facebook growth topics',
    width: 1536,
    height: 1024,
  },
  payments: {
    src: '/assets/images/illustrations/extensions/secure-payments.webp',
    alt: 'Secure payments illustration showing checkout protection and payment method badges',
    width: 1536,
    height: 1024,
  },
} as const;
