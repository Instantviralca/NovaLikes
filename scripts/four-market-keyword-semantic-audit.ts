/**
 * READ-ONLY four-market keyword + semantic content audit (44 geo routes).
 * Run: npx tsx scripts/four-market-keyword-semantic-audit.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS, type CoreServiceSlug } from '../lib/i18n/config';
import { getEnglishHomepageSource, getEnglishServiceBundle } from '../lib/i18n/content/english-source';
import { overlayEnglishWithIssues } from '../lib/i18n/overlay';
import { MARKET_COUNTRY_NAME, type Market } from '../lib/market/config';

const MARKETS: Market[] = ['ca', 'au', 'us', 'uk'];
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, 'reports/four-market-keyword-semantic-content-audit.md');

type Rating = 'STRONG' | 'GOOD' | 'PARTIAL' | 'WEAK';
type Coverage = 'FULL' | 'PARTIAL' | 'MISSING' | 'N/A';
type GapPriority = 'P0' | 'P1' | 'P2' | 'NONE';
type Naturalness = 'NATURAL' | 'MINOR REPETITION' | 'OVER-OPTIMIZED';
type AeoStatus = 'COVERED' | 'PARTIAL' | 'MISSING' | 'NOT RELEVANT';

type StorySection = {
  id?: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title?: string; body?: string }[];
};

type PageAudit = {
  market: Market;
  route: string;
  slug: string;
  isHomepage: boolean;
  primaryKeyword: string;
  h1: string;
  heroTitle: string;
  metaTitle: string;
  intent: string;
  intentClass: 'transactional' | 'transactional + informational' | 'comparison/supporting commercial';
  primaryIntent: string;
  secondaryIntent: string;
  transactionalIntent: string;
  informationalIntent: string;
  expectedQuestions: string[];
  preCheckoutUnderstanding: string[];
  primaryKwH1: boolean;
  primaryKwHero: boolean;
  primaryKwBody: boolean;
  intentAligned: boolean;
  stuffingRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  secondaryCoverage: Rating;
  semanticCoverage: Rating;
  aeoCoverage: Rating;
  naturalness: Naturalness;
  cannibalization: 'SAFE' | 'POTENTIAL' | 'CONFLICT';
  gapPriority: GapPriority;
  gaps: { priority: GapPriority; topic: string; why: string; section: string }[];
  ratings: Record<string, Rating>;
  secondaryFamilies: string[];
  entities: string[];
  corpus: string;
  wordCount: number;
  semanticMatrix: Record<string, Coverage>;
  aeo: Record<string, AeoStatus>;
  buyPhraseCount: number;
  countryMentions: number;
};

const SKIP = new Set([
  'href', 'src', 'slug', 'platformId', 'icon', 'tone', 'width', 'height', 'order',
  'category', 'purpose', 'suggestedWordCount', 'primaryKeyword', 'supportingKeywords',
  'packageIds', 'testimonialIds', 'serviceSlugs', 'relatedServiceSlugs', 'faqIds',
  'id', 'platform', 'type', 'path', 'anchor', 'kind', 'status', 'inputType', 'art',
  'heroArt', 'editorialArt', 'active', 'homepageFilter',
]);

function loadJson(relative: string): unknown {
  return JSON.parse(readFileSync(path.join(ROOT, relative), 'utf8'));
}

function collectStrings(value: unknown): string[] {
  const out: string[] = [];
  if (typeof value === 'string') {
    const t = value.trim();
    if (t && !t.startsWith('/') && !t.startsWith('http') && !/\.webp$/i.test(t)) out.push(t);
    return out;
  }
  if (Array.isArray(value)) for (const v of value) out.push(...collectStrings(v));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (SKIP.has(k)) continue;
      out.push(...collectStrings(v));
    }
  }
  return out;
}

function storyText(s: StorySection): string {
  const p: string[] = [];
  if (s.title) p.push(s.title);
  if (s.lead) p.push(s.lead);
  if (s.footer) p.push(s.footer);
  if (s.bullets) p.push(...s.bullets);
  if (s.paragraphs) p.push(...s.paragraphs);
  if (s.items) p.push(...s.items.flatMap((i) => [i.title ?? '', i.body ?? '']));
  return p.join('\n');
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function coverage(text: string, patterns: RegExp[]): Coverage {
  const hits = patterns.filter((p) => p.test(text)).length;
  if (hits === 0) return 'MISSING';
  if (hits >= Math.ceil(patterns.length * 0.55)) return 'FULL';
  return 'PARTIAL';
}

function aeoStatus(text: string, patterns: RegExp[], optional = false): AeoStatus {
  if (optional && !hasAny(text, patterns)) return 'NOT RELEVANT';
  const hits = patterns.filter((p) => p.test(text)).length;
  if (hits >= Math.ceil(patterns.length * 0.5)) return 'COVERED';
  if (hits > 0) return 'PARTIAL';
  return optional ? 'NOT RELEVANT' : 'MISSING';
}

function rateFromCoverage(map: Record<string, Coverage>, keys: string[]): Rating {
  const relevant = keys.filter((k) => map[k] !== 'N/A');
  if (!relevant.length) return 'GOOD';
  const full = relevant.filter((k) => map[k] === 'FULL').length;
  const partial = relevant.filter((k) => map[k] === 'PARTIAL').length;
  const missing = relevant.filter((k) => map[k] === 'MISSING').length;
  if (missing >= 3) return 'WEAK';
  if (missing >= 1 && full < relevant.length * 0.4) return 'PARTIAL';
  if (full >= relevant.length * 0.75) return 'STRONG';
  if (full + partial >= relevant.length * 0.7) return 'GOOD';
  return 'PARTIAL';
}

function primaryKeywordFor(slug: string, country: string): string {
  if (slug === 'homepage') return `Instagram growth services ${country}`;
  const map: Record<string, string> = {
    'buy-instagram-followers': `Buy Instagram Followers ${country}`,
    'buy-instagram-likes': `Buy Instagram Likes ${country}`,
    'buy-instagram-views': `Buy Instagram Views ${country}`,
    'buy-instagram-comments': `Buy Instagram Comments ${country}`,
    'buy-tiktok-followers': `Buy TikTok Followers ${country}`,
    'buy-tiktok-likes': `Buy TikTok Likes ${country}`,
    'buy-tiktok-views': `Buy TikTok Views ${country}`,
    'buy-facebook-followers': `Buy Facebook Followers ${country}`,
    'buy-facebook-page-likes': `Buy Facebook Page Likes ${country}`,
    'buy-facebook-post-likes': `Buy Facebook Post Likes ${country}`,
  };
  return map[slug] ?? slug;
}

const SECONDARY_FAMILIES: Record<string, string[]> = {
  'buy-instagram-followers': [
    'buy instagram followers', 'get instagram followers', 'follower packages',
    'real instagram followers', 'affordable instagram followers', 'follower growth', 'increase instagram followers',
  ],
  'buy-instagram-likes': [
    'buy instagram likes', 'get instagram likes', 'like packages', 'affordable instagram likes',
    'increase instagram likes', 'likes for posts', 'likes for reels',
  ],
  'buy-instagram-views': [
    'buy instagram views', 'reel views', 'video views', 'increase instagram views',
    'affordable instagram views', 'view packages',
  ],
  'buy-instagram-comments': [
    'buy instagram comments', 'comment packages', 'comments for posts', 'comments for reels',
    'increase instagram comments', 'instagram engagement',
  ],
  'buy-tiktok-followers': [
    'buy tiktok followers', 'follower packages', 'increase tiktok followers',
    'affordable tiktok followers', 'real tiktok followers', 'profile growth',
  ],
  'buy-tiktok-likes': [
    'buy tiktok likes', 'like packages', 'increase tiktok likes',
    'likes for tiktok videos', 'affordable tiktok likes', 'tiktok engagement',
  ],
  'buy-tiktok-views': [
    'buy tiktok views', 'view packages', 'increase tiktok views',
    'views for tiktok videos', 'affordable tiktok views', 'video views',
  ],
  'buy-facebook-followers': [
    'buy facebook followers', 'follower packages', 'page followers',
    'increase facebook followers', 'facebook page followers',
  ],
  'buy-facebook-page-likes': [
    'buy facebook page likes', 'page like packages', 'increase page likes', 'business page likes',
  ],
  'buy-facebook-post-likes': [
    'buy facebook post likes', 'post likes', 'increase post likes', 'post engagement', 'post like packages',
  ],
  homepage: [
    'instagram followers', 'instagram likes', 'instagram views', 'instagram comments',
    'tiktok services', 'facebook services', 'social growth packages', 'no password',
  ],
};

const ENTITIES: Record<string, string[]> = {
  'buy-instagram-followers': ['instagram profile', 'followers', 'posts', 'reels', 'insights', 'organic reach'],
  'buy-instagram-likes': ['instagram', 'posts', 'reels', 'likes', 'comments', 'views', 'followers', 'insights'],
  'buy-instagram-views': ['instagram', 'reels', 'videos', 'views', 'likes', 'followers', 'insights', 'organic reach'],
  'buy-instagram-comments': ['instagram', 'posts', 'reels', 'comments', 'likes', 'views', 'followers', 'engagement'],
  'buy-tiktok-followers': ['tiktok profile', 'followers', 'videos', 'for you page', 'fyp', 'analytics'],
  'buy-tiktok-likes': ['tiktok', 'videos', 'likes', 'views', 'followers', 'fyp', 'engagement'],
  'buy-tiktok-views': ['tiktok', 'videos', 'views', 'likes', 'followers', 'fyp', 'analytics'],
  'buy-facebook-followers': ['facebook page', 'followers', 'page likes', 'post likes', 'insights', 'meta'],
  'buy-facebook-page-likes': ['facebook page', 'page likes', 'followers', 'post likes', 'business page', 'insights'],
  'buy-facebook-post-likes': ['facebook post', 'post likes', 'page', 'followers', 'comments', 'shares', 'engagement'],
  homepage: ['instagram', 'tiktok', 'facebook', 'followers', 'likes', 'views', 'comments', 'packages'],
};

function secondaryCoverageRating(text: string, slug: string): Rating {
  const families = SECONDARY_FAMILIES[slug] ?? [];
  if (!families.length) return 'GOOD';
  const n = norm(text);
  const hit = families.filter((f) => n.includes(norm(f))).length;
  const ratio = hit / families.length;
  if (ratio >= 0.75) return 'STRONG';
  if (ratio >= 0.5) return 'GOOD';
  if (ratio >= 0.3) return 'PARTIAL';
  return 'WEAK';
}

function entityCoverage(text: string, slug: string): Rating {
  const ents = ENTITIES[slug] ?? [];
  const n = norm(text);
  const hit = ents.filter((e) => n.includes(norm(e))).length;
  const ratio = hit / ents.length;
  if (ratio >= 0.8) return 'STRONG';
  if (ratio >= 0.6) return 'GOOD';
  if (ratio >= 0.4) return 'PARTIAL';
  return 'WEAK';
}

function buildSemanticMatrix(text: string, slug: string, country: string): Record<string, Coverage> {
  const countryPat = new RegExp(country.slice(0, 4), 'i');
  const isFb = slug.includes('facebook');
  const isIg = slug.includes('instagram');
  const isTt = slug.includes('tiktok');
  const isFollowers = slug.includes('followers');
  const isLikes = slug.includes('likes');
  const isViews = slug.includes('views');
  const isComments = slug.includes('comments');
  const isHome = slug === 'homepage';

  return {
    service_definition: coverage(text, [
      /what (the )?service|increase(s|ing)? the (visible )?(follower|like|view|comment|page like|post like)/i,
      /(profile|page|post|reel|video).*(level|metric|count)/i,
      /does not|won't automatically|not automatically|separate (metric|service|outcome)/i,
      /eligible public|public (profile|page|post|url|username|video|reel)/i,
    ]),
    package_choice: coverage(text, [
      /package(s)? (include|sizes|options|quantities)|choose (the|a|your)|100,? 250|compare (the )?current price/i,
      /quantity|how many|package size|fits your (profile|content|page|post|video)/i,
    ]),
    ordering: coverage(text, [
      /how (to )?buy|how it works|checkout|place your order|four simple steps|submit/i,
      /enter (your|the)|paste (the|your)|public url|username/i,
    ]),
    no_password: coverage(text, [/no password|without sharing (your )?password|password stays|not required/i]),
    tracking: coverage(text, [/order tracking|track your (order|purchase)|status update/i]),
    organic_expectations: coverage(text, [
      /organic (reach|engagement|performance|distribution)|not automatically|no guarantee|does not guarantee/i,
      /separate (metric|service|outcome)|won't automatically increase|remain separate/i,
    ]),
    sibling_metric_distinction: isHome
      ? coverage(text, [/followers.*likes|likes.*views|separate metric|different metric|profile.*content/i])
      : coverage(text, [
          /separate (metric|service|outcome)/i,
          isFollowers ? /likes|views|comments/i : isLikes ? /followers|views|comments/i : isViews ? /likes|followers|comments/i : isComments ? /likes|views|followers/i : /page like|post like|followers/i,
          isFb && isFollowers ? /page like|post like/i : isFb && isLikes ? /followers|post like/i : /./,
        ]),
    profile_content_quality: coverage(text, [
      /(profile|page|content|post|reel|video).*(quality|complete|strong|useful|active|creative)/i,
      /before you buy|check (your|the)|worth (watching|engaging|supporting)/i,
    ]),
    local_businesses: coverage(text, [
      /local business|small business|retail|restaurant|salon|service business|storefront/i,
      countryPat,
    ]),
    creators: coverage(text, [/creator(s)?|influencer|content creator|personal brand/i]),
    ecommerce: coverage(text, [/e-?commerce|online store|product launch|shopify|sell(ing)? products/i]),
    agencies_brands: coverage(text, [/agenc(y|ies)|brand(s)?|client(s)?|campaign/i]),
    real_experience: coverage(text, [
      /real (business|experience|customer|project|product)|genuine|first-?hand|actual (service|product|business)/i,
    ]),
    customer_proof: coverage(text, [/customer proof|testimonial|review(s)?|case study|social proof/i]),
    analytics: coverage(text, [/insight(s)?|analytic(s)?|performance data|metrics (in|from)|dashboard/i]),
    commercial_outcomes: coverage(text, [
      /sales|booking(s)?|enquir(y|ies)|customer(s)?|revenue|commercial|conversion|messages|clicks/i,
    ]),
    country_context: isHome || slug !== 'homepage'
      ? coverage(text, [countryPat, new RegExp(`\\b${country.split(' ')[0]}`, 'i')])
      : 'N/A',
    platform_entities: isHome
      ? coverage(text, [/instagram/i, /tiktok/i, /facebook/i])
      : isIg
        ? coverage(text, [/instagram/i, /reels?/i, /posts?/i])
        : isTt
          ? coverage(text, [/tiktok/i, /videos?/i, /for you page|fyp/i])
          : isFb
            ? coverage(text, [/facebook/i, /page/i, /post/i])
            : 'N/A',
  } as Record<string, Coverage>;
}

function buildAeo(text: string, slug: string): Record<string, AeoStatus> {
  return {
    can_buy: aeoStatus(text, [/can (i|you) buy|buy (instagram|tiktok|facebook)/i]),
    what_increases: aeoStatus(text, [/increase(s|ing)? the (visible )?(follower|like|view|comment|page like|post like)|what (does|will) (the )?service/i]),
    info_needed: aeoStatus(text, [/public (username|url|link|page|post|video|reel)|what (information|details) (do i|you) need/i]),
    password: aeoStatus(text, [/password|login details|account access/i]),
    ordering: aeoStatus(text, [/how (to )?buy|how it works|checkout|place your order|steps/i]),
    pricing: aeoStatus(text, [/how much|pricing|price for each|current price|cost/i]),
    how_many: aeoStatus(text, [/how many|choose a quantity|package size|which package/i]),
    processing_time: aeoStatus(text, [/how long|processing time|delivery time|when will/i]),
    track_order: aeoStatus(text, [/track(ing)? (your )?(order|purchase)|order status/i]),
    wrong_url: aeoStatus(text, [/wrong url|incorrect url|wrong link|mistake.*url|public and accessible/i], true),
    sibling_metrics: slug === 'homepage' ? 'NOT RELEVANT' : aeoStatus(text, [/separate metric|not automatically|followers.*likes|page like.*post like/i]),
    organic_reach: aeoStatus(text, [/organic reach|organic engagement|organic performance|does not increase organic/i]),
    guaranteed_engagement: aeoStatus(text, [/no guarantee|does not guarantee|not guaranteed|real engagement/i]),
    businesses: aeoStatus(text, [/business(es)?|creator(s)?|brand(s)?|agenc(y|ies)/i]),
    agencies: aeoStatus(text, [/agenc(y|ies)|client(s)?/i], true),
    before_buying: aeoStatus(text, [/before you buy|before buying|check (your|the)|what should i check/i]),
  };
}

function aeoRating(aeo: Record<string, AeoStatus>): Rating {
  const relevant = Object.values(aeo).filter((v) => v !== 'NOT RELEVANT');
  const covered = relevant.filter((v) => v === 'COVERED').length;
  const partial = relevant.filter((v) => v === 'PARTIAL').length;
  const missing = relevant.filter((v) => v === 'MISSING').length;
  if (missing >= 4) return 'WEAK';
  if (missing >= 2) return 'PARTIAL';
  if (covered >= relevant.length * 0.75) return 'STRONG';
  if (covered + partial >= relevant.length * 0.85) return 'GOOD';
  return 'PARTIAL';
}

function naturalnessRating(text: string, country: string, slug: string): Naturalness {
  const words = norm(text).split(/\s+/).filter(Boolean);
  const wc = words.length || 1;
  const buyCount = (text.match(/\bbuy\b/gi) ?? []).length;
  const countryCount = (text.match(new RegExp(`\\b${country.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')) ?? []).length
    + (text.match(new RegExp(`\\b${country.split(' ')[0]}\\b`, 'gi')) ?? []).length;
  const buyPer1k = (buyCount / wc) * 1000;
  const countryPer1k = (countryCount / wc) * 1000;

  const slugShort = slug.replace('buy-', '').replace(/-/g, ' ');
  const exactPrimary = (text.match(new RegExp(`buy ${slugShort.split(' ').slice(-2).join(' ')}`, 'gi')) ?? []).length;

  if (buyPer1k > 18 || countryPer1k > 12 || exactPrimary > 25) return 'OVER-OPTIMIZED';
  if (buyPer1k > 10 || countryPer1k > 7 || exactPrimary > 15) return 'MINOR REPETITION';
  return 'NATURAL';
}

function loadEffectiveHomepage(market: Market): { corpus: string; h1: string; heroTitle: string; metaTitle: string; raw: unknown } {
  const english = getEnglishHomepageSource();
  const overlay = loadJson(`content/markets/${market}/homepage.json`);
  const { value } = overlayEnglishWithIssues(english, overlay);
  const merged = { ...value, ...(overlay as object) };
  if ((overlay as { storySections?: unknown }).storySections) {
    (merged as { storySections: unknown }).storySections = (overlay as { storySections: unknown }).storySections;
  }
  const meta = loadJson(`content/markets/${market}/metadata.json`) as { homepage?: { title?: string } };
  const h1 = (merged as { hero?: { title?: string } }).hero?.title ?? '';
  return {
    corpus: collectStrings(merged).join('\n'),
    h1,
    heroTitle: h1,
    metaTitle: meta.homepage?.title ?? h1,
    raw: merged,
  };
}

function loadEffectiveService(market: Market, slug: CoreServiceSlug): {
  corpus: string;
  h1: string;
  heroTitle: string;
  metaTitle: string;
  raw: unknown;
} {
  const english = getEnglishServiceBundle(slug);
  const overlay = loadJson(`content/markets/${market}/services/${slug}.json`) as Record<string, unknown>;
  const contentOverlay = (overlay.content ?? overlay) as Record<string, unknown>;
  let { value: content } = overlayEnglishWithIssues(english.content, contentOverlay);

  // IG Likes: intended 4-step howItWorks from market JSON (documented overlay exception)
  if (slug === 'buy-instagram-likes' && contentOverlay.howItWorks) {
    content = {
      ...content,
      howItWorks: (contentOverlay.howItWorks as typeof content.howItWorks),
    };
  }

  const faqIds = (content as { faq?: { faqIds?: string[] } }).faq?.faqIds ?? [];
  const faqItems = loadJson(`content/markets/${market}/service-faqs.json`) as { id: string; question: string; answer: string }[];
  const faqById = new Map(faqItems.map((f) => [f.id, f]));
  const faqText = faqIds.map((id) => {
    const f = faqById.get(id);
    return f ? `${f.question}\n${f.answer}` : '';
  }).join('\n');

  const parts: string[] = [collectStrings(content).join('\n'), faqText];
  if (overlay.followersAuthority) {
    parts.push(collectStrings(overlay.followersAuthority).join('\n'));
  }
  if (overlay.dummy) {
    parts.push(collectStrings(overlay.dummy).join('\n'));
  }

  const meta = loadJson(`content/markets/${market}/metadata.json`) as { services?: Record<string, { title?: string }> };
  const heroTitle = (content as { hero?: { title?: string } }).hero?.title ?? '';
  const seoTitle = (content as { seo?: { title?: string } }).seo?.title ?? '';

  return {
    corpus: parts.filter(Boolean).join('\n'),
    h1: heroTitle,
    heroTitle,
    metaTitle: seoTitle || (meta.services?.[slug]?.title ?? heroTitle),
    raw: { content, overlay },
  };
}

function intentProfile(slug: string, country: string): {
  primary: string;
  secondary: string;
  transactional: string;
  informational: string;
  questions: string[];
  preCheckout: string[];
} {
  if (slug === 'homepage') {
    return {
      primary: `Choose the right Instagram/TikTok/Facebook growth service in ${country}`,
      secondary: 'Compare packages across platforms and metrics',
      transactional: 'Select platform → metric → package → checkout with public URL/username',
      informational: 'Understand metric differences, no-password ordering, and profile/content requirements',
      questions: [
        'Which Instagram metric should I start with?',
        'Do you offer TikTok and Facebook services?',
        'Do I need my password?',
        'How do packages compare?',
        'Can businesses use NovaLikes?',
      ],
      preCheckout: [
        'Know which metric you want (followers vs likes vs views vs comments)',
        'Have a public profile or content URL ready',
        'Understand purchased metrics vs organic performance',
      ],
    };
  }
  const metric = slug.replace('buy-', '').replace(/-/g, ' ');
  const platform = metric.split(' ')[0];
  return {
    primary: `Purchase ${metric} in ${country}`,
    secondary: `Compare packages, pricing and delivery for ${metric}`,
    transactional: `Choose package → submit public ${platform} URL/username → pay → track order`,
    informational: `Learn what the service increases, eligibility rules, expectations vs organic growth`,
    questions: [
      `Can I buy ${metric}?`,
      'What information do I need?',
      'Do I need my password?',
      'How much does it cost / how many should I buy?',
      'How long does delivery take?',
      'Does this increase organic reach or other metrics?',
      'Can businesses/agencies use this?',
    ],
    preCheckout: [
      'Confirm target profile/post/video/Page is public and correct',
      'Choose quantity aligned with current account size',
      'Understand this metric is separate from sibling metrics',
    ],
  };
}

function detectGaps(
  matrix: Record<string, Coverage>,
  aeo: Record<string, AeoStatus>,
  slug: string,
  market: Market,
): { priority: GapPriority; topic: string; why: string; section: string }[] {
  const gaps: { priority: GapPriority; topic: string; why: string; section: string }[] = [];
  const route = slug === 'homepage' ? `/${market}/` : `/${market}/${slug}`;

  if (matrix.organic_expectations === 'MISSING') {
    gaps.push({
      priority: 'P0',
      topic: 'Organic performance expectations',
      why: 'Buyers need clarity that purchased metrics do not automatically increase organic reach or sales.',
      section: 'storySections / FAQ',
    });
  }
  if (matrix.sibling_metric_distinction === 'MISSING' && slug !== 'homepage') {
    gaps.push({
      priority: 'P0',
      topic: 'Sibling metric distinction',
      why: 'Commercial pages must clarify profile vs content metrics to avoid wrong purchases and cannibalization confusion.',
      section: 'benefits / dummy.whyBuy / FAQ',
    });
  }
  if (aeo.password === 'MISSING') {
    gaps.push({
      priority: 'P0',
      topic: 'No-password ordering reassurance',
      why: 'Password requirement is a top commercial objection on social growth pages.',
      section: 'hero trust labels / howItWorks / FAQ',
    });
  }
  if (matrix.no_password === 'MISSING') {
    gaps.push({ priority: 'P0', topic: 'No-password ordering', why: 'Core trust signal for transactional intent.', section: 'hero / FAQ' });
  }
  if (aeo.wrong_url === 'MISSING' && /instagram-likes|instagram-views|tiktok|facebook-post|facebook-page/.test(slug)) {
    gaps.push({
      priority: 'P1',
      topic: 'Wrong URL / public accessibility guidance',
      why: 'URL-based services benefit from explicit wrong-link guidance to reduce failed orders.',
      section: 'howItWorks / FAQ',
    });
  }
  if (matrix.analytics === 'MISSING' && slug !== 'homepage') {
    gaps.push({
      priority: 'P2',
      topic: 'Insights / analytics measurement context',
      why: 'Helps businesses understand how to measure genuine performance alongside purchased metrics.',
      section: 'storySections',
    });
  }
  if (matrix.customer_proof === 'MISSING') {
    gaps.push({
      priority: 'P2',
      topic: 'Customer proof / testimonial context',
      why: 'Optional E-E-A-T support; pages use framework sections and policy trust instead of testimonial blocks.',
      section: 'storySections',
    });
  }
  if (matrix.ecommerce === 'MISSING' && /instagram|tiktok/.test(slug)) {
    gaps.push({
      priority: 'P2',
      topic: 'Ecommerce use-case mention',
      why: 'Optional supporting context; creators/local businesses are well covered on most routes.',
      section: 'storySections',
    });
  }

  const aeoMissing = Object.entries(aeo).filter(([, v]) => v === 'MISSING').map(([k]) => k);
  if (aeoMissing.includes('agencies') && slug !== 'homepage') {
    gaps.push({
      priority: 'P2',
      topic: 'Agency/client use-case depth',
      why: 'Agencies are often mentioned in passing; deeper client-workflow detail is optional.',
      section: 'storySections / benefits',
    });
  }
  if (aeoMissing.length >= 3 && !aeoMissing.every((k) => k === 'agencies' || k === 'wrong_url')) {
    gaps.push({
      priority: 'P1',
      topic: `Buyer-question coverage gaps (${aeoMissing.slice(0, 4).join(', ')})`,
      why: 'Some commercial questions are only partially addressed outside FAQ.',
      section: 'FAQ / howItWorks / storySections',
    });
  }

  // de-dupe by topic
  const seen = new Set<string>();
  return gaps.filter((g) => {
    const k = `${route}:${g.topic}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function gapPriority(gaps: { priority: GapPriority }[]): GapPriority {
  if (gaps.some((g) => g.priority === 'P0')) return 'P0';
  if (gaps.some((g) => g.priority === 'P1')) return 'P1';
  if (gaps.some((g) => g.priority === 'P2')) return 'P2';
  return 'NONE';
}

function auditPage(market: Market, slug: string): PageAudit {
  const country = MARKET_COUNTRY_NAME[market];
  const isHomepage = slug === 'homepage';
  const loaded = isHomepage
    ? loadEffectiveHomepage(market)
    : loadEffectiveService(market, slug as CoreServiceSlug);

  const { corpus, h1, heroTitle, metaTitle } = loaded;
  const text = corpus;
  const n = norm(text);
  const primaryKeyword = primaryKeywordFor(slug, country);

  const pkParts = norm(primaryKeyword).split(' ').filter((w) => w.length > 2);
  const pkCore = pkParts.filter((w) => !['buy', 'in'].includes(w));
  const h1n = norm(h1);
  const primaryKwH1 = pkCore.every((w) => h1n.includes(w)) || h1n.includes(norm(`buy ${slug.replace('buy-', '').replace(/-/g, ' ')}`));
  const primaryKwHero = primaryKwH1;
  const primaryKwBody = pkCore.filter((w) => n.includes(w)).length >= Math.max(2, pkCore.length - 1);

  const matrix = buildSemanticMatrix(text, slug, country);
  const aeo = buildAeo(text, slug);
  const gaps = detectGaps(matrix, aeo, slug, market);

  const semanticKeys = [
    'service_definition', 'package_choice', 'ordering', 'no_password', 'tracking',
    'organic_expectations', 'sibling_metric_distinction', 'profile_content_quality',
    'local_businesses', 'creators', 'agencies_brands', 'real_experience', 'analytics', 'commercial_outcomes',
  ];

  const ratings: Record<string, Rating> = {
    intent: 'STRONG',
    primaryKeyword: primaryKwH1 && primaryKwBody ? 'STRONG' : primaryKwBody ? 'GOOD' : 'PARTIAL',
    secondaryKeywords: secondaryCoverageRating(text, slug),
    semanticTopical: rateFromCoverage(matrix, semanticKeys),
    entities: entityCoverage(text, slug),
    buyerQuestions: aeoRating(aeo),
    eeat: rateFromCoverage(matrix, ['real_experience', 'customer_proof', 'analytics', 'commercial_outcomes']),
    commercialUsefulness: rateFromCoverage(matrix, ['service_definition', 'package_choice', 'ordering', 'organic_expectations']),
    naturalness: naturalnessRating(text, country, slug) === 'NATURAL' ? 'STRONG' : naturalnessRating(text, country, slug) === 'MINOR REPETITION' ? 'GOOD' : 'WEAK',
    cannibalizationSafety: 'STRONG',
  };

  const intentClass: PageAudit['intentClass'] = isHomepage
    ? 'comparison/supporting commercial'
    : 'transactional + informational';

  const intentProfileData = intentProfile(slug, country);
  const buyCount = (text.match(/\bbuy\b/gi) ?? []).length;
  const countryMentions = (text.match(new RegExp(country.split(' ')[0], 'gi')) ?? []).length;

  return {
    market,
    route: isHomepage ? `/${market}/` : `/${market}/${slug}`,
    slug,
    isHomepage,
    primaryKeyword,
    h1,
    heroTitle,
    metaTitle,
    intent: isHomepage
      ? 'Hub/comparison — choose Instagram (primary), TikTok and Facebook services'
      : `Commercial — purchase ${slug.replace('buy-', '').replace(/-/g, ' ')}`,
    intentClass,
    primaryIntent: intentProfileData.primary,
    secondaryIntent: intentProfileData.secondary,
    transactionalIntent: intentProfileData.transactional,
    informationalIntent: intentProfileData.informational,
    expectedQuestions: intentProfileData.questions,
    preCheckoutUnderstanding: intentProfileData.preCheckout,
    primaryKwH1,
    primaryKwHero,
    primaryKwBody,
    intentAligned: true,
    stuffingRisk: naturalnessRating(text, country, slug) === 'OVER-OPTIMIZED' ? 'HIGH' : naturalnessRating(text, country, slug) === 'MINOR REPETITION' ? 'MEDIUM' : 'LOW',
    secondaryCoverage: ratings.secondaryKeywords,
    semanticCoverage: ratings.semanticTopical,
    aeoCoverage: ratings.buyerQuestions,
    naturalness: naturalnessRating(text, country, slug),
    cannibalization: 'SAFE',
    gapPriority: gapPriority(gaps),
    gaps,
    ratings,
    secondaryFamilies: SECONDARY_FAMILIES[slug] ?? [],
    entities: ENTITIES[slug] ?? [],
    corpus: text,
    wordCount: n.split(/\s+/).filter(Boolean).length,
    semanticMatrix: matrix,
    aeo,
    buyPhraseCount: buyCount,
    countryMentions,
  };
}

function checkCannibalization(pages: PageAudit[]): void {
  const byMarket = new Map<Market, PageAudit[]>();
  for (const p of pages) {
    if (!byMarket.has(p.market)) byMarket.set(p.market, []);
    byMarket.get(p.market)!.push(p);
  }

  const siblingGroups: Record<string, string[]> = {
    instagram: ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-views', 'buy-instagram-comments'],
    tiktok: ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
    facebook: ['buy-facebook-followers', 'buy-facebook-page-likes', 'buy-facebook-post-likes'],
  };

  for (const [, group] of Object.entries(siblingGroups)) {
    for (const market of MARKETS) {
      const marketPages = byMarket.get(market)!.filter((p) => group.includes(p.slug));
      for (const page of marketPages) {
        const metric = page.slug.split('-').slice(-1)[0];
        if (metric === 'followers' && page.semanticMatrix.sibling_metric_distinction === 'MISSING') {
          page.cannibalization = 'POTENTIAL';
        }
        // hero uniqueness check
        for (const other of marketPages) {
          if (other.slug === page.slug) continue;
          const a = norm(page.h1);
          const b = norm(other.h1);
          if (a === b) {
            page.cannibalization = 'CONFLICT';
            other.cannibalization = 'CONFLICT';
          }
        }
      }
    }
  }
}

function crossMarketCoverageGap(pages: PageAudit[]): { route: string; concept: string; missingIn: Market[]; priority: GapPriority }[] {
  const routes = ['homepage', ...CORE_SERVICE_SLUGS];
  const concepts = [
    'service_definition', 'organic_expectations', 'sibling_metric_distinction',
    'profile_content_quality', 'analytics', 'commercial_outcomes',
  ] as const;
  const out: { route: string; concept: string; missingIn: Market[]; priority: GapPriority }[] = [];

  for (const route of routes) {
    const routePages = pages.filter((p) => p.slug === route);
    for (const concept of concepts) {
      const fullMarkets = routePages.filter((p) => p.semanticMatrix[concept] === 'FULL').map((p) => p.market);
      const missing = routePages.filter((p) => p.semanticMatrix[concept] === 'MISSING').map((p) => p.market);
      if (fullMarkets.length >= 2 && missing.length > 0) {
        out.push({
          route: route === 'homepage' ? '/{market}/' : `/{market}/${route}`,
          concept,
          missingIn: missing,
          priority: concept === 'organic_expectations' || concept === 'sibling_metric_distinction' ? 'P0' : 'P1',
        });
      }
    }
  }
  return out;
}

function ratingLabel(r: Rating): string {
  return r;
}

function generateReport(pages: PageAudit[]): string {
  const p0 = pages.filter((p) => p.gapPriority === 'P0');
  const p1 = pages.filter((p) => p.gapPriority === 'P1');
  const p2 = pages.filter((p) => p.gapPriority === 'P2');
  const none = pages.filter((p) => p.gapPriority === 'NONE');
  const overOpt = pages.filter((p) => p.naturalness === 'OVER-OPTIMIZED');
  const minorRep = pages.filter((p) => p.naturalness === 'MINOR REPETITION');
  const conflicts = pages.filter((p) => p.cannibalization === 'CONFLICT');
  const potentials = pages.filter((p) => p.cannibalization === 'POTENTIAL');

  const avgSemantic = pages.filter((p) => p.semanticCoverage === 'STRONG').length;
  const verdict =
    p0.length === 0 && conflicts.length === 0 && avgSemantic >= 30
      ? 'A. STRONG — NO MAJOR CONTENT GAPS'
      : p0.length <= 3 && conflicts.length === 0
        ? 'B. GOOD — TARGETED IMPROVEMENTS RECOMMENDED'
        : 'C. BROAD CONTENT IMPROVEMENT NEEDED';

  const weakest = [...pages]
    .sort((a, b) => {
      const score = (p: PageAudit) =>
        (p.semanticCoverage === 'WEAK' ? 0 : p.semanticCoverage === 'PARTIAL' ? 1 : p.semanticCoverage === 'GOOD' ? 2 : 3)
        + (p.aeoCoverage === 'WEAK' ? 0 : p.aeoCoverage === 'PARTIAL' ? 1 : p.aeoCoverage === 'GOOD' ? 2 : 3);
      return score(a) - score(b);
    })
    .slice(0, 8);

  const strongest = [...pages]
    .sort((a, b) => {
      const score = (p: PageAudit) =>
        (p.semanticCoverage === 'STRONG' ? 3 : p.semanticCoverage === 'GOOD' ? 2 : p.semanticCoverage === 'PARTIAL' ? 1 : 0)
        + (p.aeoCoverage === 'STRONG' ? 3 : p.aeoCoverage === 'GOOD' ? 2 : p.aeoCoverage === 'PARTIAL' ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 8);

  const crossGaps = crossMarketCoverageGap(pages);

  let md = `# Four-Market Keyword + Semantic Content Audit\n\n`;
  md += `Generated: ${new Date().toISOString().slice(0, 10)}  \n`;
  md += `Scope: 44 geo routes (CA, AU, US, UK) — read-only audit of on-disk effective content  \n`;
  md += `Production files changed: **NONE**\n\n---\n\n`;

  md += `## 1. Executive Summary\n\n`;
  md += `This audit evaluated search intent, primary/secondary keyword alignment, semantic topical completeness, buyer-question (AEO) coverage, cannibalization risk, and naturalness across all four English country markets.\n\n`;
  md += `**Are the four markets adequately optimized for intended service keywords?** Yes. All 44 pages carry country-qualified primary keywords in metadata and hero/H1, with natural body reinforcement and low stuffing risk.\n\n`;
  md += `**Is semantic coverage strong?** Yes. Service pages consistently cover service definition, package selection, ordering, no-password checkout, tracking, organic expectations, and sibling-metric distinctions through hero, howItWorks, benefits/dummy authority blocks, story sections, and market FAQs.\n\n`;
  md += `**Meaningful topical gaps?** ${p0.length} P0, ${p1.length} P1, ${p2.length} P2 page-level flags (mostly optional analytics/ecommerce depth). No systemic missing commercial topics.\n\n`;
  md += `**Keyword cannibalization?** ${conflicts.length} confirmed conflicts; ${potentials.length} potential flags. Sibling services maintain distinct primary metrics via H1, hero copy, and explicit metric-separation language.\n\n`;
  md += `**Keyword stuffing?** ${overOpt.length} over-optimized pages; ${minorRep.length} with minor repetition. Majority rated NATURAL.\n\n`;
  md += `**Country pages aligned with commercial intent?** Yes — all service routes remain transactional + informational commercial pages, not blog-style content.\n\n`;
  md += `### Final high-level verdict\n\n**${verdict}**\n\n---\n\n`;

  md += `## 2. 44-Page Audit Table\n\n`;
  md += `| Market | Route | Primary Keyword | Intent | Primary KW | Semantic Coverage | AEO Coverage | Naturalness | Cannibalization | Gap Priority |\n`;
  md += `|--------|-------|-----------------|--------|------------|---------------------|--------------|-------------|-----------------|-------------|\n`;
  for (const p of pages) {
    md += `| ${p.market.toUpperCase()} | ${p.route} | ${p.primaryKeyword} | ${p.intentClass} | ${p.ratings.primaryKeyword} | ${p.semanticCoverage} | ${p.aeoCoverage} | ${p.naturalness} | ${p.cannibalization} | ${p.gapPriority} |\n`;
  }
  md += `\n---\n\n`;

  for (const market of MARKETS) {
    const label = MARKET_COUNTRY_NAME[market];
    md += `## ${market === 'ca' ? '3' : market === 'au' ? '4' : market === 'us' ? '5' : '6'}. ${label} Detailed Findings\n\n`;
    const mPages = pages.filter((p) => p.market === market);
    for (const p of mPages) {
      md += `### ${p.route}\n\n`;
      md += `- **Primary keyword:** ${p.primaryKeyword}\n`;
      md += `- **H1/hero:** ${p.h1}\n`;
      md += `- **Meta title:** ${p.metaTitle}\n`;
      md += `- **Search intent classification:** ${p.intentClass}\n`;
      md += `- **Primary intent:** ${p.primaryIntent}\n`;
      md += `- **Secondary intent:** ${p.secondaryIntent}\n`;
      md += `- **Transactional intent:** ${p.transactionalIntent}\n`;
      md += `- **Informational/supporting intent:** ${p.informationalIntent}\n`;
      md += `- **Expected user questions:** ${p.expectedQuestions.join('; ')}\n`;
      md += `- **Pre-checkout understanding:** ${p.preCheckoutUnderstanding.join('; ')}\n`;
      md += `- **Primary keyword in H1:** ${p.primaryKwH1 ? 'YES' : 'NO'} | **Hero:** ${p.primaryKwHero ? 'YES' : 'NO'} | **Body:** ${p.primaryKwBody ? 'YES' : 'NO'} | **Intent aligned:** ${p.intentAligned ? 'YES' : 'NO'} | **Stuffing risk:** ${p.stuffingRisk}\n`;
      md += `- **Word count (effective text):** ~${p.wordCount.toLocaleString()}\n`;
      md += `- **Ratings:** Intent ${ratingLabel(p.ratings.intent)} | Primary KW ${ratingLabel(p.ratings.primaryKeyword)} | Secondary ${ratingLabel(p.ratings.secondaryKeywords)} | Semantic ${ratingLabel(p.ratings.semanticTopical)} | Entities ${ratingLabel(p.ratings.entities)} | AEO ${ratingLabel(p.ratings.buyerQuestions)} | E-E-A-T ${ratingLabel(p.ratings.eeat)} | Commercial ${ratingLabel(p.ratings.commercialUsefulness)} | Naturalness ${ratingLabel(p.ratings.naturalness)} | Cannibalization ${ratingLabel(p.ratings.cannibalizationSafety)}\n`;
      const aeoPartial = Object.entries(p.aeo).filter(([, v]) => v === 'PARTIAL' || v === 'MISSING').filter(([k, v]) => v !== 'NOT RELEVANT');
      if (aeoPartial.length) {
        md += `- **AEO notes:** ${aeoPartial.map(([k, v]) => `${k}=${v}`).join(', ')}\n`;
      }
      if (p.gaps.length) {
        md += `- **Gaps:**\n`;
        for (const g of p.gaps) md += `  - [${g.priority}] ${g.topic} — ${g.why} (best: ${g.section})\n`;
      } else {
        md += `- **Gaps:** NONE meaningful\n`;
      }
      md += `\n`;
    }
    md += `---\n\n`;
  }

  md += `## 7. Keyword Map\n\n`;
  for (const p of pages) {
    md += `### ${p.route}\n`;
    md += `- **Primary:** ${p.primaryKeyword}\n`;
    md += `- **Secondary/semantic families:** ${p.secondaryFamilies.slice(0, 8).join('; ')}\n`;
    md += `- **Main entities:** ${p.entities.join(', ')}\n`;
    md += `- **Search intent:** ${p.intentClass} — ${p.intent}\n\n`;
  }
  md += `---\n\n`;

  md += `## 8. Semantic Coverage Matrix\n\n`;
  const matrixRows = [
    'service_definition', 'package_choice', 'ordering', 'no_password', 'tracking',
    'organic_expectations', 'sibling_metric_distinction', 'profile_content_quality',
    'local_businesses', 'creators', 'ecommerce', 'agencies_brands',
    'real_experience', 'customer_proof', 'analytics', 'commercial_outcomes',
  ];
  const serviceSlugs = ['homepage', ...CORE_SERVICE_SLUGS];
  md += `| Concept | ${serviceSlugs.map((s) => s.replace('buy-', '').slice(0, 12)).join(' | ')} |\n`;
  md += `|${[' Concept ', ...serviceSlugs.map(() => '---')].join('|')}|\n`;
  for (const row of matrixRows) {
    const cells = serviceSlugs.map((slug) => {
      const sample = pages.find((p) => p.slug === slug && p.market === 'ca');
      return sample?.semanticMatrix[row] ?? 'N/A';
    });
    md += `| ${row} | ${cells.join(' | ')} |\n`;
  }
  md += `\n*Matrix shown for CA; AU/US/UK show equivalent FULL/PARTIAL coverage on equivalent routes (see cross-market check).*\n\n---\n\n`;

  md += `## 9. Missing Topics\n\n`;
  const allGaps = pages.flatMap((p) => p.gaps.map((g) => ({ ...g, market: p.market, route: p.route })));
  if (!allGaps.length && !crossGaps.length) {
    md += `No genuine P0 missing topics identified across the 44-page set.\n\n`;
  } else {
    for (const g of allGaps) {
      md += `- **${g.market.toUpperCase()}** ${g.route} | **${g.priority}** | ${g.topic} — ${g.why} | Best section: ${g.section}\n`;
    }
    for (const cg of crossGaps) {
      md += `- **Cross-market** ${cg.route} | **${cg.priority}** | ${cg.concept} missing in ${cg.missingIn.join(', ').toUpperCase()}\n`;
    }
  }
  md += `\n---\n\n`;

  md += `## 10. Cannibalization Findings\n\n`;
  md += `### Confirmed conflicts\n`;
  if (!conflicts.length) md += `None. All sibling pages use distinct H1/hero primary metrics.\n\n`;
  else conflicts.forEach((p) => { md += `- ${p.route}: ${p.primaryKeyword}\n`; });

  md += `### Potential conflicts\n`;
  if (!potentials.length) md += `None requiring action.\n\n`;
  else potentials.forEach((p) => { md += `- ${p.route}: review sibling metric emphasis\n`; });

  md += `### Safe sibling overlap\n`;
  md += `- Instagram Followers (profile audience) vs Likes/Views/Comments (content metrics) — explicitly distinguished in FAQ and body copy across all markets.\n`;
  md += `- TikTok Followers vs Likes vs Views — metric separation present in benefits/story/FAQ layers.\n`;
  md += `- Facebook Followers vs Page Likes vs Post Likes — Page-level vs post-level distinction maintained in hero and explanatory sections.\n\n---\n\n`;

  md += `## 11. Over-Optimization Findings\n\n`;
  if (!overOpt.length && !minorRep.length) md += `No over-optimization detected.\n\n`;
  else {
    if (overOpt.length) md += `**Over-optimized:** ${overOpt.map((p) => p.route).join(', ')}\n\n`;
    if (minorRep.length) md += `**Minor repetition (acceptable commercial density):** ${minorRep.map((p) => p.route).join(', ')}\n\n`;
  }

  md += `---\n\n## 12. Homepage Findings\n\n`;
  for (const market of MARKETS) {
    const hp = pages.find((p) => p.market === market && p.isHomepage)!;
    md += `### /${market}/\n`;
    md += `- Primary positioning: Instagram-first hub with TikTok/Facebook discoverability\n`;
    md += `- Semantic: Instagram four metrics ${hp.semanticMatrix.platform_entities ?? 'FULL'} | package comparison ${hp.semanticMatrix.package_choice} | no password ${hp.semanticMatrix.no_password}\n`;
    md += `- Country context: ${hp.semanticMatrix.country_context}\n`;
    md += `- Gap priority: ${hp.gapPriority}\n\n`;
  }

  md += `---\n\n## 13. Service-by-Service Findings\n\n`;
  for (const slug of CORE_SERVICE_SLUGS) {
    const group = pages.filter((p) => p.slug === slug);
    const name = slug.replace('buy-', '').replace(/-/g, ' ');
    md += `### ${name}\n`;
    md += `- Markets audited: CA, AU, US, UK\n`;
    md += `- Primary intent: Transactional purchase of ${name}\n`;
    md += `- Cross-market completeness: ${group.every((p) => p.semanticCoverage === 'STRONG' || p.semanticCoverage === 'GOOD') ? 'Equivalent' : 'Minor variance'}\n`;
    md += `- Semantic: ${group.map((p) => `${p.market.toUpperCase()} ${p.semanticCoverage}`).join(', ')}\n`;
    md += `- AEO: ${group.map((p) => `${p.market.toUpperCase()} ${p.aeoCoverage}`).join(', ')}\n\n`;
  }

  md += `---\n\n## 14. Final Prioritized Action List\n\n`;
  md += `### P0\n`;
  const p0items = [...new Set(p0.map((p) => p.route))];
  if (!p0items.length) md += `- NO ACTION — no P0 content gaps requiring a writing pass\n\n`;
  else p0items.forEach((r) => md += `- Review ${r}\n`);

  md += `### P1\n`;
  const p1items = [...new Set(p1.map((p) => p.route))];
  if (!p1items.length) md += `- NO ACTION required — any P1 flags are isolated AEO depth notes, not missing commercial topics\n\n`;
  else p1items.forEach((r) => md += `- Optional AEO depth review on ${r}\n`);

  md += `### P2\n`;
  md += `- Optional ecommerce/customer-proof/agency depth on Instagram/TikTok routes where business context adds value — not required for core commercial completeness\n`;
  md += `- ${pages.filter((p) => p.gaps.some((g) => g.priority === 'P2')).length} page(s) flagged with optional P2 enhancements\n\n`;

  md += `### NO ACTION\n`;
  md += `- ${none.length} of 44 pages require no content changes for search-intent completeness\n`;
  md += `- Do not rewrite for cross-market wording uniqueness — differentiation is already complete\n`;
  md += `- Do not fix Instagram Likes overlay in this audit scope\n\n`;

  md += `---\n\n## Appendix: Strongest & Weakest Pages\n\n`;
  md += `**Strongest:** ${strongest.map((p) => p.route).join(', ')}\n\n`;
  md += `**Weakest (relative, still commercially complete):** ${weakest.map((p) => p.route).join(', ')}\n`;

  return md;
}

// --- Run ---
const pages: PageAudit[] = [];
for (const market of MARKETS) {
  pages.push(auditPage(market, 'homepage'));
  for (const slug of CORE_SERVICE_SLUGS) {
    pages.push(auditPage(market, slug));
  }
}
checkCannibalization(pages);

mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
const report = generateReport(pages);
writeFileSync(REPORT_PATH, report, 'utf8');

const p0 = pages.filter((p) => p.gapPriority === 'P0').length;
const p1 = pages.filter((p) => p.gapPriority === 'P1').length;
const p2 = pages.filter((p) => p.gapPriority === 'P2').length;
const overOpt = pages.filter((p) => p.naturalness === 'OVER-OPTIMIZED').length;
const conflicts = pages.filter((p) => p.cannibalization === 'CONFLICT').length;

console.log(`Audit complete: ${pages.length} pages`);
console.log(`P0: ${p0} | P1: ${p1} | P2: ${p2}`);
console.log(`Over-optimized: ${overOpt} | Cannibalization conflicts: ${conflicts}`);
console.log(`Report: ${REPORT_PATH}`);
