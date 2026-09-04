import type { Market } from '@/lib/market/config';
import { MARKETS } from '@/lib/market/config';
import type { PlatformId } from '@/types/platform';

/** Shared geo homepage rhythm — CA / AU / US / UK (~48 / 64 / 80px). */
export const CA_HOMEPAGE_SECTION_PADDING = 'py-12 md:py-16 lg:py-20';
export const DEFAULT_HOMEPAGE_SECTION_PADDING = 'py-12 md:py-16';

/** Soft gap between story blocks — no heavy borders/boxes. */
export const CA_STORY_INNER_GAP = 'mt-14 pt-14 md:mt-16 md:pt-16 border-t border-[#F0EBE6]';
export const CA_STORY_FIRST_GAP = '';

/** Enhanced layout for all geo market homepages. */
export function isEnhancedGeoHomepage(market?: Market): boolean {
  return market != null && (MARKETS as readonly string[]).includes(market);
}

/** Alias kept for existing imports — now covers ca/au/us/uk. */
export function isCanadaHomepageDesign(market?: Market): boolean {
  return isEnhancedGeoHomepage(market);
}

export function homepageSectionPadding(market?: Market): string {
  return isEnhancedGeoHomepage(market)
    ? CA_HOMEPAGE_SECTION_PADDING
    : DEFAULT_HOMEPAGE_SECTION_PADDING;
}

const IMG = {
  local: {
    src: '/assets/images/illustrations/homepage/ca/ca-local-business-trust.png',
    alt: 'Local business storefront with Instagram profile, website, map and review trust signals',
  },
  proof: {
    src: '/assets/images/illustrations/homepage/ca/ca-metrics-vs-customer-proof.png',
    alt: 'Social metrics on one side and genuine customer reviews and proof on the other',
  },
  package: {
    src: '/assets/images/illustrations/homepage/ca/ca-package-comparison.png',
    alt: 'Growth package comparison cards with pricing, checklist and order safety indicators',
  },
  process: {
    src: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
    alt: 'Ordering process from package selection to profile details',
  },
  audit: {
    src: '/assets/images/illustrations/homepage/ca/ca-instagram-profile-audit.png',
    alt: 'Profile audit comparing public metrics with content distribution signals',
  },
  why: {
    src: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
    alt: 'Brand and creator partnership review beyond a single public metric',
  },
  profile: {
    src: '/assets/images/illustrations/homepage/instagram-followers-visual.webp',
    alt: 'Profile first impression with audience size and account context',
  },
} as const;

type StoryImage = { src: string; alt: string };

const STORY_PROFILE_IDS = new Set([
  'first-impression',
  'built-for-canada',
  'built-for-us',
  'built-for-uk',
  'built-for-australia',
  'strong-first-glance',
  'stronger-presence',
  'visible-momentum',
  'profile-experience',
  'better-profile-experience',
  'better-profile',
  'page-worth-exploring',
  'better-page',
  'clear-niche',
  'account-you-have',
]);

const STORY_REACH_IDS = new Set([
  'reach-context',
  'organic-reach',
  'fyp-reach',
  'reach-not-same',
  'likes-reach',
  'likes-views-context',
  'views-followers-context',
  'followers-vs-likes',
  'page-likes-vs-followers',
  'likes-vs-views',
  'views-not-likes',
  'metrics-distinction',
  'unique-viewers',
  'platform-rules',
]);

const STORY_PROOF_IDS = new Set([
  'brand-partnerships',
  'brand-credibility',
  'brands-agencies',
  'brand-campaigns',
  'customer-proof',
  'social-proof',
  'real-experience',
  'business-proof',
  'real-activity',
  'genuine-engagement',
  'organic-engagement',
  'organic-growth',
  'monetisation',
  'monetisation-views',
  'creator-rewards',
  // Local/business story art was Instagram-centric; on TT/FB reuse proof family.
  'local-businesses',
  'more-business',
  'business-results',
  'real-business-content',
  'useful-next-step',
  'content-people-need',
]);

const TIKTOK_STORY_IMAGES = {
  profile: {
    src: '/assets/images/illustrations/shared/tiktok-profile-first-impression.webp',
    alt: 'TikTok profile first impression with follower cues and account context',
  },
  reach: {
    src: '/assets/images/illustrations/shared/tiktok-reach-distribution.webp',
    alt: 'TikTok visible metrics versus For You Page distribution',
  },
  proof: {
    src: '/assets/images/illustrations/shared/tiktok-metrics-vs-proof.webp',
    alt: 'TikTok visible metrics versus genuine audience and business proof',
  },
} as const satisfies Record<string, StoryImage>;

const FACEBOOK_STORY_IMAGES = {
  profile: {
    src: '/assets/images/illustrations/shared/facebook-page-first-impression.webp',
    alt: 'Facebook Page first impression with Page metrics and content context',
  },
  reach: {
    src: '/assets/images/illustrations/shared/facebook-reach-distribution.webp',
    alt: 'Facebook Page metrics versus organic feed distribution',
  },
  proof: {
    src: '/assets/images/illustrations/shared/facebook-metrics-vs-proof.webp',
    alt: 'Facebook visible metrics versus genuine customer and business proof',
  },
} as const satisfies Record<string, StoryImage>;

/**
 * Side visuals for geo story sections (followers pattern + aliases for other services).
 * Instagram / homepage default pool — TikTok & Facebook remap via `caStoryFeatureImage`.
 */
export const CA_STORY_FEATURE_IMAGES: Partial<Record<string, StoryImage>> = {
  // Intro / first impression (image right)
  'first-impression': IMG.profile,
  'built-for-canada': IMG.profile,
  'built-for-us': IMG.profile,
  'built-for-uk': IMG.profile,
  'built-for-australia': IMG.profile,
  'strong-first-glance': IMG.profile,
  'stronger-presence': IMG.profile,
  'visible-momentum': IMG.profile,
  'profile-experience': IMG.profile,
  'better-profile-experience': IMG.profile,
  'page-worth-exploring': IMG.profile,
  'better-page': IMG.profile,

  // Reach / metric distinction (image right)
  'reach-context': IMG.audit,
  'organic-reach': IMG.audit,
  'fyp-reach': IMG.audit,
  'reach-not-same': IMG.audit,
  'likes-reach': IMG.audit,
  'likes-views-context': IMG.audit,
  'views-followers-context': IMG.audit,
  'followers-vs-likes': IMG.audit,
  'page-likes-vs-followers': IMG.audit,
  'likes-vs-views': IMG.audit,
  'views-not-likes': IMG.audit,
  'metrics-distinction': IMG.audit,
  'unique-viewers': IMG.audit,

  // Partnerships / proof (image left)
  'brand-partnerships': IMG.why,
  'brand-credibility': IMG.why,
  'brands-agencies': IMG.why,
  'brand-campaigns': IMG.why,
  'customer-proof': IMG.proof,
  'social-proof': IMG.proof,
  'real-experience': IMG.proof,
  'business-proof': IMG.proof,
  'real-activity': IMG.proof,
  'genuine-engagement': IMG.proof,
  'organic-engagement': IMG.proof,
  'organic-growth': IMG.proof,

  // Local / business (wide text + image)
  'local-businesses': IMG.local,
  'more-business': IMG.local,
  'business-results': IMG.local,
  'real-business-content': IMG.local,
  'useful-next-step': IMG.local,
  'content-people-need': IMG.local,

  // Process / packages
  'affordable-growth': IMG.package,
  'account-you-have': IMG.process,
  'hq-premium': IMG.package,
  'platform-rules': IMG.audit,
  'monetisation': IMG.why,
  'monetisation-views': IMG.why,
  'creator-rewards': IMG.why,
};

/** Explicit image side for split stories. `true` = content left / image right. */
export const CA_STORY_IMAGE_RIGHT: Partial<Record<string, boolean>> = {
  'first-impression': true,
  'built-for-canada': true,
  'built-for-us': true,
  'built-for-uk': true,
  'built-for-australia': true,
  'strong-first-glance': true,
  'stronger-presence': true,
  'visible-momentum': true,
  'profile-experience': true,
  'better-profile-experience': true,
  'better-profile': true,
  'clear-niche': true,
  'page-worth-exploring': true,
  'better-page': true,
  'reach-context': true,
  'organic-reach': true,
  'fyp-reach': true,
  'reach-not-same': true,
  'likes-reach': true,
  'likes-views-context': true,
  'views-followers-context': true,
  'followers-vs-likes': true,
  'page-likes-vs-followers': true,
  'likes-vs-views': true,
  'views-not-likes': true,
  'metrics-distinction': true,
  'unique-viewers': true,
  'make-comments-fit': true,
  'brand-partnerships': false,
  'brand-credibility': false,
  'brands-agencies': false,
  'brand-campaigns': false,
  'customer-proof': false,
  'social-proof': false,
  'real-experience': false,
  'reply-genuine': false,
  'business-proof': false,
  'real-activity': false,
  'genuine-engagement': false,
  'organic-engagement': false,
  'organic-growth': false,
};

export function caStoryImageRight(id: string, fallbackIndex: number): boolean {
  if (id in CA_STORY_IMAGE_RIGHT) return Boolean(CA_STORY_IMAGE_RIGHT[id]);
  return fallbackIndex % 2 === 0;
}

function platformStoryFamilyImage(
  id: string,
  images: { profile: StoryImage; reach: StoryImage; proof: StoryImage },
): StoryImage | null {
  if (STORY_PROFILE_IDS.has(id)) return images.profile;
  if (STORY_REACH_IDS.has(id)) return images.reach;
  if (STORY_PROOF_IDS.has(id)) return images.proof;
  return null;
}

/**
 * Story side image for geo pages.
 * TikTok / Facebook use shared platform-native assets; Instagram keeps the CA pool.
 * Returns null for carousel-only / unmapped sections (do not force art).
 */
export function caStoryFeatureImage(id: string, platform?: PlatformId) {
  if (platform === 'tiktok') {
    return platformStoryFamilyImage(id, TIKTOK_STORY_IMAGES);
  }
  if (platform === 'facebook') {
    return platformStoryFamilyImage(id, FACEBOOK_STORY_IMAGES);
  }
  return CA_STORY_FEATURE_IMAGES[id] ?? null;
}

export const CA_STORY_BAND_SECTIONS = new Set<string>([]);

export function caStorySectionIsBand(id: string): boolean {
  return CA_STORY_BAND_SECTIONS.has(id);
}

export type CaStoryItemLayout = 'cards' | 'checklist' | 'feature-rows' | 'soft-list' | 'carousel';

const CAMPAIGN_IDS = new Set([
  'campaign-moments',
  'ca-campaign-moments',
  'us-campaign-moments',
  'uk-campaign-moments',
  'business-moments',
  'campaign-content',
  'ca-campaign-content',
  'campaign-presentation',
]);

const FRAMEWORK_IDS = new Set([
  'measure-growth',
  'measure-quality',
  'measure-performance',
  'growth-framework',
  'engagement-framework',
  'content-framework',
  'video-growth-framework',
  'content-performance',
  'video-performance',
  'watch-behaviour',
  'facebook-insights',
  'instagram-insights',
  'tiktok-analytics',
  'comment-strategy',
  'content-engagement',
  'support-content',
]);

export const CA_STORY_ITEM_LAYOUT: Partial<Record<string, CaStoryItemLayout>> = Object.fromEntries([
  ...[...CAMPAIGN_IDS].map((id) => [id, 'carousel' as const]),
  ...[...FRAMEWORK_IDS].map((id) => [id, 'carousel' as const]),
]) as Partial<Record<string, CaStoryItemLayout>>;

export function caStoryItemLayout(id: string): CaStoryItemLayout {
  return CA_STORY_ITEM_LAYOUT[id] ?? 'cards';
}

/** Desktop card columns per section. */
export const CA_STORY_ITEM_COLS: Partial<Record<string, 3 | 4 | 5>> = {
  ...Object.fromEntries([...CAMPAIGN_IDS].map((id) => [id, 4 as const])),
  ...Object.fromEntries([...FRAMEWORK_IDS].map((id) => [id, 3 as const])),
  'profile-growth-table': 4,
  'audience-segments': 5,
  'first-impression': 4,
  'metric-meanings': 5,
};

export function caStoryItemCols(id: string): 3 | 4 | 5 {
  return CA_STORY_ITEM_COLS[id] ?? 3;
}

/**
 * Stacked stories are centered by default (followers pattern).
 * Split/feature-image stories ignore this flag.
 */
export function caStoryIsCentered(_id: string): boolean {
  return true;
}

/** Text-heavy split: more copy, smaller image. */
export const CA_STORY_WIDE_TEXT = new Set([
  'local-businesses',
  'more-business',
  'business-results',
  'real-business-content',
  'useful-next-step',
  'content-people-need',
]);

export function caStoryWideText(id: string): boolean {
  return CA_STORY_WIDE_TEXT.has(id);
}

/** Story ids that merge lead + paragraphs (+ footer when no item cards). */
export const CA_STORY_MERGE_INTRO = new Set([
  'first-impression',
  'built-for-canada',
  'built-for-us',
  'built-for-uk',
  'built-for-australia',
  'strong-first-glance',
  'stronger-presence',
  'campaign-moments',
  'ca-campaign-moments',
  'us-campaign-moments',
  'uk-campaign-moments',
  'business-moments',
  'campaign-content',
  'ca-campaign-content',
  'campaign-presentation',
  'brand-partnerships',
  'brand-credibility',
  'brands-agencies',
  'brand-campaigns',
]);

export function caStoryMergeIntro(id: string): boolean {
  return CA_STORY_MERGE_INTRO.has(id);
}
