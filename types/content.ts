/**
 * Content-layer types (Document 06).
 * Writing nodes come from types/copywriting.ts; this file adds page architecture.
 */

import type { ContentBlock, TocItem } from '@/types/components';
import type {
  BenefitContent,
  CTAContent,
  FAQContent,
  FeatureContent,
  HeroCopy,
  SectionCopy,
  TestimonialContent,
} from '@/types/copywriting';
import type { PlatformId } from '@/types/platform';

export type { CTAContent } from '@/types/copywriting';

/** Compact trust chip under service hero CTAs (Document 09.11). */
export type HeroTrustLabel = {
  id: string;
  label: string;
};

/** Hero block = copywriting HeroCopy + SEO/architecture metadata. */
export type HeroContent = HeroCopy & {
  /** Strategic primary message (editorial reference; not always rendered). */
  primaryMessage?: string;
  purpose?: string;
  primaryKeyword?: string;
  supportingKeywords?: string[];
  suggestedWordCount?: number;
  /** Hero visual asset metadata (architecture — not marketing copy). */
  visual?: HeroVisualContent;
  /** Optional trust labels rendered under service hero CTAs. */
  trustLabels?: HeroTrustLabel[];
};

export type HeroVisualContent = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional figure title for SEO / figcaption context. */
  title?: string;
  /** Optional visible caption under the hero image. */
  caption?: string;
};

/** Section shell = SectionCopy + architecture fields. */
export type SectionContent = SectionCopy & {
  id: string;
  purpose?: string;
  primaryKeyword?: string;
  supportingKeywords?: string[];
  internalLinks?: CTAContent[];
  cta?: CTAContent;
  suggestedWordCount?: number;
};

/** FAQ item — alias of copywriting FAQContent (single structure). */
export type FAQItem = FAQContent;

/** Testimonial — copywriting quote + optional linking metadata. */
export type Testimonial = TestimonialContent & {
  relatedServiceSlug?: string;
  platformId?: PlatformId;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
};

export type TrustBarItemContent = {
  id: string;
  label: string;
  description: string;
  /** Lucide icon key resolved in TrustIcon. */
  iconKey: 'ShieldCheck' | 'BadgeCheck' | 'Headphones' | 'Layers3' | string;
};

/** List item used for features/benefits/why — aligns with FeatureContent / BenefitContent. */
export type ContentListItem = FeatureContent | BenefitContent;

export type ProcessStepContent = {
  id: string;
  title: string;
  description: string;
};

/** Per-platform card copy for the homepage Platform Selector (Document 08.02). */
export type PlatformSelectorCardContent = {
  platformId: PlatformId;
  description: string;
  ctaLabel: string;
  /** Hub destination; defaults to `/{platform.slug}` when omitted. */
  href?: string;
  /**
   * Optional service slugs for the preview list.
   * When omitted, top services are resolved from the Service Registry.
   */
  previewServiceSlugs?: string[];
  previewLimit?: number;
};

/** Full homepage content document. */
export type HomepageContent = {
  hero: HeroContent;
  trustBar: SectionContent & { items: TrustBarItemContent[] };
  /** Compact verified metrics shown in the hero (approved claims only). */
  heroStats?: SectionContent & { statIds: string[] };
  platformGrid: SectionContent & {
    platformIds: PlatformId[];
    /** Document 08.02 card content — names/icons still come from data/platforms.ts. */
    cards: PlatformSelectorCardContent[];
  };
  /** Mixed featured services (Document 08.05) — not per-platform strips. */
  servicesGrid: SectionContent & {
    serviceSlugs: string[];
    ctaLabel: string;
    benefits?: Record<string, string>;
    descriptions?: Record<string, string>;
    /** Optional one-badge-per-card labels (Popular, Best Seller, etc.). */
    badges?: Record<string, string>;
  };
  whyChooseUs: SectionContent & { items: ContentListItem[] };
  howItWorks: SectionContent & { steps: ProcessStepContent[] };
  stats: SectionContent & { statIds: string[] };
  testimonials: SectionContent & { testimonialIds: string[] };
  faq: SectionContent & { faqIds: string[] };
  finalCta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

/** Optional per-service SEO overrides (Document 09.11 production pages). */
export type ServiceSeoContent = {
  title: string;
  description: string;
};

/** Per-service page content (Documents 06 / 09.01 / 09.11 service structure). */
export type ServiceContent = {
  slug: string;
  platformId: PlatformId;
  /** When set, drives generateMetadata for this service page. */
  seo?: ServiceSeoContent;
  hero: HeroContent;
  /** Conversion block — packages resolved from data/packages (or future API). */
  pricing: SectionContent & {
    /** When empty, all packages for this service slug are shown. */
    packageIds?: string[];
    /** Label for each package card CTA (e.g. Continue / Order Now). */
    primaryCtaLabel: string;
    secondaryCta?: CTAContent;
    /** Shown when no real packages resolve for this service. */
    emptyMessage?: string;
  };
  benefits: SectionContent & { items: ContentListItem[] };
  features: SectionContent & { items: ContentListItem[]; cta?: CTAContent };
  howItWorks: SectionContent & { steps: ProcessStepContent[]; cta?: CTAContent };
  /** Why Choose NovaLikes — rendered on production service pages (09.11). */
  whyNovaLikes: SectionContent & { items: ContentListItem[]; cta?: CTAContent };
  /** Delivery and Safety — optional; when present, rendered after How It Works. */
  deliveryAndSafety?: SectionContent & { items: ContentListItem[] };
  reviews: SectionContent & { testimonialIds: string[] };
  faq: SectionContent & { faqIds: string[] };
  relatedServices: SectionContent & {
    /** When empty, linking helpers resolve from the Service Registry. */
    serviceSlugs?: string[];
    cta?: CTAContent;
  };
  finalCta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

/** Learn article content shell — body filled when production articles land. */
export type LearnArticleContent = {
  slug: string;
  platformId?: PlatformId;
  hero: HeroContent;
  introduction: SectionContent & { text: string };
  tableOfContents: SectionContent & { items: TocItem[] };
  mainContent: SectionContent & { blocks: ContentBlock[] };
  faqs: SectionContent & { items: FAQItem[] };
  relatedServices: SectionContent & { serviceSlugs: string[] };
  relatedArticles: SectionContent & { articleSlugs: string[] };
  cta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
  /** Short card summary for grids / related lists. */
  summary: string;
};

export type CompanyPageContent = {
  id: 'about' | 'reviews' | 'contact' | 'faq';
  path: string;
  hero: HeroContent;
  sections: SectionContent[];
  faqIds?: string[];
  testimonialIds?: string[];
  cta?: CTAContent;
};

/**
 * About Us production page content (Document 13.01).
 * Structured sections stay editable in the content layer.
 */
export type AboutPageContent = {
  id: 'about';
  path: string;
  seo: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  story: SectionContent & { body: string };
  mission: SectionContent & { items: ContentListItem[] };
  whyChoose: SectionContent & { items: ContentListItem[] };
  platforms: SectionContent & { platformIds: PlatformId[] };
  process: SectionContent & { steps: ProcessStepContent[] };
  trust: SectionContent & {
    items: ContentListItem[];
    /** Visible disclaimer — no invented awards, counts, or guarantees. */
    disclaimer: string;
  };
  finalCta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

/**
 * Contact Us production page content (Document 13.02).
 */
export type ContactFormFieldCopy = {
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  orderIdLabel: string;
  orderIdPlaceholder: string;
  orderIdHelper: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  successTitle: string;
  successDescription: string;
};

export type ContactPageContent = {
  id: 'contact';
  path: string;
  seo: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  contactOptions: SectionContent & { items: ContentListItem[] };
  form: SectionContent & {
    fields: ContactFormFieldCopy;
  };
  business: SectionContent & {
    /** Shown when no verified contact details exist in configuration. */
    emptyMessage: string;
  };
  faqPreview: SectionContent & {
    faqIds: string[];
    viewAllCta: CTAContent;
  };
  finalCta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

/**
 * FAQ hub production page content (Document 13.03).
 * FAQ Q&A bodies live in the shared FAQ data layer — not here.
 */
export type FaqPageContent = {
  id: 'faq';
  path: string;
  seo: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  search: {
    label: string;
    placeholder: string;
    clearLabel: string;
    emptyState: string;
  };
  categoriesTitle: string;
  refundPolicyCta: CTAContent;
  finalCta: SectionContent & {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

export type SharedCtaCatalog = {
  getStarted: CTAContent;
  contactSupport: CTAContent;
  browseServices: CTAContent;
  readLearn: CTAContent;
  viewReviews: CTAContent;
};
