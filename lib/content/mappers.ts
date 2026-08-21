import { getFaqItemsByIds } from '@/data/content/faq';
import { getHomepageContent } from '@/data/content/homepage';
import { getStatsByIds } from '@/data/content/stats';
import { getTestimonialsByIds } from '@/data/content/testimonials';
import { getBadgeLabel } from '@/data/pricing/badges';
import { resolveServicePackages } from '@/data/pricing/packages';
import { getAllPlatforms } from '@/data/platforms';
import type { PackageCardModel } from '@/components/commerce/pricing/types';
import {
  benefitContentToProps,
  faqContentToProps,
  featureContentToProps,
  finalCtaCopyToProps,
  heroCopyToProps,
  sectionCopyToProps,
  testimonialContentToProps,
  toHeroCopy,
  toSectionCopy,
} from '@/lib/copywriting/adapters';
import { formatMoney } from '@/lib/pricing/format';
import type {
  HomepageContent,
  LearnArticleContent,
  ServiceContent,
  Stat,
} from '@/types/content';
import type {
  BenefitItem,
  CtaProps,
  FaqItem,
  FeatureItem,
  ProcessStep,
  StatItem,
  TestimonialItem,
} from '@/types/components';
import type { Platform } from '@/types/platform';
import type { PricingPackage } from '@/types/pricing';

function toStats(items: Stat[]): StatItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    value: item.value,
  }));
}

function toSteps(
  steps: Array<{ id: string; title: string; description: string }>,
): ProcessStep[] {
  return steps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description,
  }));
}

/** Resolved homepage props ready for marketing section components. */
export type HomepageViewModel = {
  content: HomepageContent;
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    primaryCta?: CtaProps;
    secondaryCta?: CtaProps;
  };
  trustBar: { items: Array<{ id: string; label: string }> };
  platformGrid: {
    title?: string;
    description?: string;
    platforms: Platform[];
  };
  whyChooseUs: {
    title?: string;
    description?: string;
    items: FeatureItem[];
    cta?: CtaProps;
  };
  howItWorks: {
    id?: string;
    title?: string;
    description?: string;
    steps: ProcessStep[];
    cta?: CtaProps;
  };
  stats: {
    title?: string;
    description?: string;
    items: StatItem[];
  };
  testimonials: {
    title?: string;
    description?: string;
    items: TestimonialItem[];
  };
  faq: {
    title?: string;
    description?: string;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    description?: string;
    primaryCta: CtaProps;
    secondaryCta?: CtaProps;
  };
};

/**
 * Maps HomepageContent → component props via copywriting adapters.
 * Does not alter placeholder copy — only normalizes through HeroCopy / SectionCopy / etc.
 */
export function mapHomepageContent(
  content: HomepageContent = getHomepageContent(),
): HomepageViewModel {
  const platforms = getAllPlatforms().filter((platform) =>
    content.platformGrid.platformIds.includes(platform.id),
  );

  const heroCopy = toHeroCopy(content.hero);
  const platformSection = sectionCopyToProps(toSectionCopy(content.platformGrid));
  const whySection = sectionCopyToProps(toSectionCopy(content.whyChooseUs));
  const howSection = sectionCopyToProps(toSectionCopy(content.howItWorks));
  const statsSection = sectionCopyToProps(toSectionCopy(content.stats));
  const testimonialsSection = sectionCopyToProps(toSectionCopy(content.testimonials));
  const faqSection = sectionCopyToProps(toSectionCopy(content.faq));

  return {
    content,
    hero: heroCopyToProps(heroCopy),
    trustBar: { items: content.trustBar.items },
    platformGrid: {
      ...platformSection,
      platforms,
    },
    whyChooseUs: {
      ...whySection,
      items: featureContentToProps(content.whyChooseUs.items),
      cta: content.whyChooseUs.cta
        ? { label: content.whyChooseUs.cta.label, href: content.whyChooseUs.cta.href }
        : undefined,
    },
    howItWorks: {
      id: content.howItWorks.id,
      ...howSection,
      steps: toSteps(content.howItWorks.steps),
      cta: content.howItWorks.cta
        ? { label: content.howItWorks.cta.label, href: content.howItWorks.cta.href }
        : undefined,
    },
    stats: {
      ...statsSection,
      items: toStats(getStatsByIds(content.stats.statIds)),
    },
    testimonials: {
      ...testimonialsSection,
      items: testimonialContentToProps(
        getTestimonialsByIds(content.testimonials.testimonialIds),
      ),
    },
    faq: {
      ...faqSection,
      items: faqContentToProps(getFaqItemsByIds(content.faq.faqIds)),
    },
    finalCta: finalCtaCopyToProps(content.finalCta),
  };
}

/** Props bags for service section components (Documents 09.01 / 09.11 order). */
export type ServiceViewModel = {
  content: ServiceContent;
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    primaryCta?: CtaProps;
    secondaryCta?: CtaProps;
    trustLabels?: ServiceContent['hero']['trustLabels'];
    visual?: ServiceContent['hero']['visual'];
  };
  pricing: {
    id?: string;
    title?: string;
    description?: string;
    packages: PackageCardModel[];
    secondaryCta?: CtaProps;
    emptyMessage?: string;
  };
  benefits: {
    id?: string;
    title?: string;
    description?: string;
    items: BenefitItem[];
  };
  features: {
    id?: string;
    title?: string;
    description?: string;
    items: FeatureItem[];
    cta?: CtaProps;
  };
  howItWorks: {
    id?: string;
    title?: string;
    description?: string;
    steps: ProcessStep[];
    cta?: CtaProps;
  };
  whyNovaLikes: {
    id?: string;
    title?: string;
    description?: string;
    items: FeatureItem[];
    cta?: CtaProps;
  };
  deliveryAndSafety?: {
    id?: string;
    title?: string;
    description?: string;
    items: FeatureItem[];
  };
  reviews: {
    title?: string;
    description?: string;
    items: TestimonialItem[];
  };
  faq: {
    id?: string;
    title?: string;
    description?: string;
    items: FaqItem[];
  };
  relatedServices: {
    id?: string;
    title?: string;
    description?: string;
    cta?: CtaProps;
  };
  finalCta: {
    title: string;
    description?: string;
    primaryCta: CtaProps;
    secondaryCta?: CtaProps;
  };
};

/**
 * Maps a package to a card model.
 * CTA selects the package for order configuration — payment is not handled here.
 */
export function mapPackageCard(
  pkg: PricingPackage,
  primaryCtaLabel: string,
): PackageCardModel {
  return {
    package: pkg,
    priceDisplay: formatMoney(pkg.price, pkg.currency),
    compareAtDisplay:
      pkg.compareAtPrice !== undefined && pkg.compareAtPrice > pkg.price
        ? formatMoney(pkg.compareAtPrice, pkg.currency)
        : undefined,
    badgeLabel: pkg.badge ? getBadgeLabel(pkg.badge) : undefined,
    primaryCta: {
      label: primaryCtaLabel,
      href: `#order-configuration?package=${encodeURIComponent(pkg.id)}`,
    },
  };
}

export function mapServiceContent(
  content: ServiceContent,
  faqItems?: Array<{ id: string; question: string; answer: string }>,
): ServiceViewModel {
  const hero = heroCopyToProps(toHeroCopy(content.hero));
  const pricingSection = sectionCopyToProps(toSectionCopy(content.pricing));
  const packages = resolveServicePackages(content.slug, content.pricing.packageIds).map((pkg) =>
    mapPackageCard(pkg, content.pricing.primaryCtaLabel),
  );

  return {
    content,
    hero: {
      eyebrow: hero.eyebrow,
      title: hero.title,
      description: hero.description,
      primaryCta: hero.primaryCta,
      secondaryCta: hero.secondaryCta,
      trustLabels: content.hero.trustLabels,
      visual: content.hero.visual,
    },
    pricing: {
      id: content.pricing.id ?? 'service-pricing',
      ...pricingSection,
      packages,
      emptyMessage: content.pricing.emptyMessage,
      secondaryCta: content.pricing.secondaryCta
        ? {
            label: content.pricing.secondaryCta.label,
            href: content.pricing.secondaryCta.href,
          }
        : undefined,
    },
    benefits: {
      id: content.benefits.id,
      ...sectionCopyToProps(toSectionCopy(content.benefits)),
      items: benefitContentToProps(content.benefits.items),
    },
    features: {
      id: content.features.id,
      ...sectionCopyToProps(toSectionCopy(content.features)),
      items: featureContentToProps(content.features.items),
      cta: content.features.cta
        ? { label: content.features.cta.label, href: content.features.cta.href }
        : undefined,
    },
    howItWorks: {
      id: content.howItWorks.id,
      ...sectionCopyToProps(toSectionCopy(content.howItWorks)),
      steps: toSteps(content.howItWorks.steps),
      cta: content.howItWorks.cta
        ? { label: content.howItWorks.cta.label, href: content.howItWorks.cta.href }
        : undefined,
    },
    whyNovaLikes: {
      id: content.whyNovaLikes.id,
      ...sectionCopyToProps(toSectionCopy(content.whyNovaLikes)),
      items: featureContentToProps(content.whyNovaLikes.items),
      cta: content.whyNovaLikes.cta
        ? { label: content.whyNovaLikes.cta.label, href: content.whyNovaLikes.cta.href }
        : undefined,
    },
    deliveryAndSafety: content.deliveryAndSafety
      ? {
          id: content.deliveryAndSafety.id,
          ...sectionCopyToProps(toSectionCopy(content.deliveryAndSafety)),
          items: featureContentToProps(content.deliveryAndSafety.items),
        }
      : undefined,
    reviews: {
      ...sectionCopyToProps(toSectionCopy(content.reviews)),
      items: testimonialContentToProps(getTestimonialsByIds(content.reviews.testimonialIds)),
    },
    faq: {
      id: content.faq.id,
      ...sectionCopyToProps(toSectionCopy(content.faq)),
      items: faqContentToProps(faqItems ?? getFaqItemsByIds(content.faq.faqIds)),
    },
    relatedServices: {
      id: content.relatedServices.id,
      ...sectionCopyToProps(toSectionCopy(content.relatedServices)),
      cta: content.relatedServices.cta
        ? {
            label: content.relatedServices.cta.label,
            href: content.relatedServices.cta.href,
          }
        : undefined,
    },
    finalCta: finalCtaCopyToProps(content.finalCta),
  };
}

export type LearnArticleViewModel = {
  content: LearnArticleContent;
  hero: {
    title: string;
    description?: string;
  };
  introduction: { title: string; text: string };
  tableOfContents: {
    title?: string;
    items: LearnArticleContent['tableOfContents']['items'];
  };
  mainContent: {
    blocks: LearnArticleContent['mainContent']['blocks'];
  };
  faqs: {
    title?: string;
    items: FaqItem[];
  };
  relatedServices: {
    title?: string;
    description?: string;
    serviceSlugs: string[];
  };
  relatedArticles: {
    title?: string;
    description?: string;
    articleSlugs: string[];
  };
  cta: {
    title: string;
    description?: string;
    primaryCta: CtaProps;
    secondaryCta?: CtaProps;
  };
  summary: string;
};

export function mapLearnArticleContent(content: LearnArticleContent): LearnArticleViewModel {
  const hero = heroCopyToProps(toHeroCopy(content.hero));
  const introSection = sectionCopyToProps(toSectionCopy(content.introduction));

  return {
    content,
    hero: {
      title: hero.title,
      description: hero.description,
    },
    introduction: {
      title: introSection.title ?? content.introduction.title,
      text: content.introduction.text,
    },
    tableOfContents: {
      title: content.tableOfContents.title,
      items: content.tableOfContents.items,
    },
    mainContent: {
      blocks: content.mainContent.blocks,
    },
    faqs: {
      ...sectionCopyToProps(toSectionCopy(content.faqs)),
      items: faqContentToProps(content.faqs.items),
    },
    relatedServices: {
      ...sectionCopyToProps(toSectionCopy(content.relatedServices)),
      serviceSlugs: content.relatedServices.serviceSlugs,
    },
    relatedArticles: {
      ...sectionCopyToProps(toSectionCopy(content.relatedArticles)),
      articleSlugs: content.relatedArticles.articleSlugs,
    },
    cta: finalCtaCopyToProps(content.cta),
    summary: content.summary,
  };
}
