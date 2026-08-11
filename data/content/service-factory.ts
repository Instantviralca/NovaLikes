import { resolveCta } from '@/data/content/cta';
import type { PlatformId } from '@/types/platform';
import type { ServiceContent } from '@/types/content';

type BuildServiceContentInput = {
  slug: string;
  platformId: PlatformId;
  platformName: string;
  shortName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedLearnSlug?: string;
};

/**
 * Builds placeholder ServiceContent from registry fields.
 * Keeps section structure identical across platforms — copy filled later.
 */
export function buildServiceContent(input: BuildServiceContentInput): ServiceContent {
  const { slug, platformId, platformName, shortName, primaryKeyword, secondaryKeywords } = input;
  const serviceLabel = `${platformName} ${shortName}`;

  return {
    slug,
    platformId,
    hero: {
      title: `Buy ${serviceLabel}`,
      description: `Placeholder hero for ${primaryKeyword}. Commercial intent and offer summary come in Document 07.`,
      purpose: 'Convert for this service',
      primaryKeyword,
      supportingKeywords: secondaryKeywords,
      suggestedWordCount: 50,
      primaryCta: resolveCta('getStarted', {
        label: 'View packages',
        href: `#service-pricing`,
      }),
      secondaryCta: resolveCta('readLearn', {
        href: input.relatedLearnSlug
          ? `/learn/${input.relatedLearnSlug}`
          : '/learn',
      }),
    },
    pricing: {
      id: 'service-pricing',
      title: 'Choose a package',
      description: 'Placeholder pricing intro. Package amounts come from the data layer.',
      purpose: 'Present commercial packages for conversion',
      primaryKeyword,
      supportingKeywords: secondaryKeywords,
      suggestedWordCount: 40,
      // Empty → all packages for this service slug from data/packages
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      secondaryCta: resolveCta('browseServices', {
        label: 'View related services',
        href: `#${slug}-related`,
      }),
    },
    benefits: {
      id: `${slug}-benefits`,
      title: `Benefits of ${serviceLabel}`,
      description: 'Placeholder benefits intro.',
      purpose: 'Explain customer outcomes',
      primaryKeyword,
      supportingKeywords: secondaryKeywords,
      suggestedWordCount: 180,
      items: [
        {
          id: `${slug}-benefit-1`,
          title: 'Clear packages',
          description: 'Placeholder benefit copy.',
        },
        {
          id: `${slug}-benefit-2`,
          title: 'Straightforward ordering',
          description: 'Placeholder benefit copy.',
        },
        {
          id: `${slug}-benefit-3`,
          title: 'Support when you need it',
          description: 'Placeholder benefit copy.',
        },
      ],
    },
    features: {
      id: `${slug}-features`,
      title: `Features`,
      description: 'Placeholder features intro.',
      purpose: 'List service capabilities',
      primaryKeyword,
      suggestedWordCount: 160,
      items: [
        {
          id: `${slug}-feature-1`,
          title: 'Flexible quantities',
          description: 'Placeholder feature copy.',
        },
        {
          id: `${slug}-feature-2`,
          title: 'Order tracking',
          description: 'Placeholder feature copy.',
        },
        {
          id: `${slug}-feature-3`,
          title: 'Secure checkout',
          description: 'Placeholder feature copy.',
        },
      ],
    },
    howItWorks: {
      id: `${slug}-how`,
      title: 'How it works',
      description: 'Placeholder process intro.',
      purpose: 'Explain ordering process',
      primaryKeyword,
      suggestedWordCount: 140,
      steps: [
        {
          id: `${slug}-step-1`,
          title: 'Choose a package',
          description: 'Placeholder step copy.',
        },
        {
          id: `${slug}-step-2`,
          title: 'Enter account details',
          description: 'Placeholder step copy.',
        },
        {
          id: `${slug}-step-3`,
          title: 'Complete checkout',
          description: 'Placeholder step copy.',
        },
        {
          id: `${slug}-step-4`,
          title: 'Delivery begins',
          description: 'Placeholder step copy.',
        },
      ],
    },
    whyNovaLikes: {
      id: `${slug}-why`,
      title: 'Why NovaLikes',
      description: 'Placeholder differentiation intro.',
      purpose: 'Differentiate NovaLikes for this service',
      primaryKeyword,
      suggestedWordCount: 150,
      items: [
        {
          id: `${slug}-why-1`,
          title: 'Focused on growth',
          description: 'Placeholder why-us copy.',
        },
        {
          id: `${slug}-why-2`,
          title: 'Transparent options',
          description: 'Placeholder why-us copy.',
        },
        {
          id: `${slug}-why-3`,
          title: 'Helpful support',
          description: 'Placeholder why-us copy.',
        },
      ],
    },
    reviews: {
      id: `${slug}-reviews`,
      title: 'Reviews',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Social proof for this service',
      testimonialIds: defaultTestimonialIds(platformId),
    },
    faq: {
      id: `${slug}-faq`,
      title: 'FAQ',
      description: 'Placeholder service FAQ intro.',
      purpose: 'Answer buying questions',
      primaryKeyword,
      faqIds: [
        'faq-how-ordering-works',
        'faq-is-it-safe',
        'faq-delivery-time',
        categoryFaqId(shortName),
        'faq-refunds',
        'faq-support',
      ],
    },
    relatedServices: {
      id: `${slug}-related`,
      title: 'Related services',
      description: 'Placeholder related services intro.',
      purpose: 'Internal links to sibling offers',
      // Empty → linking helper uses Service Registry
      serviceSlugs: [],
    },
    finalCta: {
      id: `${slug}-cta`,
      title: `Start with ${serviceLabel}`,
      description: 'Placeholder final CTA for this service.',
      purpose: 'Drive conversion',
      primaryCta: resolveCta('getStarted', {
        label: 'Order Now',
        href: `#service-pricing`,
      }),
      secondaryCta: resolveCta('contactSupport'),
    },
  };
}

function defaultTestimonialIds(platformId: PlatformId): string[] {
  const byPlatform: Record<PlatformId, string[]> = {
    instagram: ['t-creator-ig', 't-agency'],
    tiktok: ['t-brand-tt', 't-agency'],
    youtube: ['t-creator-yt', 't-agency'],
    facebook: ['t-business-fb', 't-agency'],
  };
  return byPlatform[platformId];
}

function categoryFaqId(shortName: string): string {
  const engagement = ['Likes', 'Views', 'Comments', 'Post Likes'];
  if (engagement.some((name) => shortName.includes(name))) {
    return 'faq-service-engagement';
  }
  return 'faq-service-followers';
}
