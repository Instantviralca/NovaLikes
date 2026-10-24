/**
 * Shared content shape for the v2 (Buzzoid-layout) service template.
 * One file per service in this folder; the view reads ONLY from these objects.
 *
 * - Strings may contain `{fromPrice}`, `{quantity}`, `{tier}` placeholders (filled from the pricing registry at render time).
 * - Strings may contain inline links written as `[label](/href)`; render them with the shared inline-link helper.
 * - Packages, prices, compare-at prices and badges are NEVER stored here; they come from the registry.
 */
export type TitleParts = { lead: string; highlight: string; tail?: string };
export type IconName =
  | 'shield' | 'clock' | 'refresh-cw' | 'badge-check' | 'message-square' | 'gauge' | 'star' | 'building' | 'layers'
  | 'heart' | 'eye' | 'message-circle' | 'book-open' | 'user-plus' | 'users' | 'thumbs-up' | 'pen' | 'image' | 'play';
export type Tone = 'mint' | 'sun' | 'lilac' | 'peach' | 'pink';

export type ServiceV2Content = {
  meta: {
    slug: string;
    platform: 'Instagram' | 'TikTok' | 'Facebook';
    name: string;
    unit: string;
    unitSingular: string;
    inputKind: 'username' | 'link';
    /** 1 = price per item (comments); 1000 = price per 1,000. */
    perUnit: number;
    tiers: boolean;
    /** Not rendered. Keyword plan for this page. */
    keywords: { primary: string; secondary: string[]; questions: string[] };
  };
  hero: { title: TitleParts; subtitle: string; trust: string[] };
  picker: {
    id: 'pricing-packages';
    title: string;
    intro: string;
    summaryName: string;
    save: string;
    cta: string;
    oneTime: string;
    secure: string;
    methods: string[];
    features: { icon: IconName; title: string; body: string }[];
    tiers?: { label: string; note: string }[];
  };
  why: {
    id: string;
    title: TitleParts;
    items: { icon: IconName; tone: Tone; title: string; body: string }[];
    promo: { eyebrow: string; title: string; cta: string };
  };
  steps: {
    id: 'how-it-works';
    title: TitleParts;
    pill: string;
    intro: string;
    items: { ui: 'public' | 'packages' | 'cart' | 'username' | 'pay'; title: string; body: string }[];
    done: { title: string; count: number; unit: string; body: string };
  };
  /** Text shown inside the decorative mini-UIs (all aria-hidden). */
  ui: {
    toggle: { label: string; sub: string };
    chips: string[];
    chipOn: number;
    input: { prefix: string; placeholder: string };
    safeChips: string[];
    privacyTags: string[];
  };
  compare: {
    id: string;
    title: TitleParts;
    intro: string;
    us: string;
    them: string;
    rows: { label: string; novalikes: string; riskySeller: string }[];
    note: string;
  };
  promises: {
    id: string;
    title: string;
    intro: string;
    cards: { chip: string; title: string; image: string; alt?: string; body: string }[];
    link: { label: string; href: string };
  };
  cost: { id: string; title: TitleParts; intro: string; points: string[]; cols: string[]; best: string; note: string };
  whyBuy: { id: string; title: TitleParts; intro: string; items: { title: string; body: string }[]; diagram: string[] };
  help: {
    id: string;
    title: TitleParts;
    intro: string;
    no: { title: string; items: string[] };
    yes: { title: string; items: string[]; image: string; altFallback: string };
  };
  who: { id: string; title: TitleParts; cards: { title: string; body: string; image: string }[]; statement: string };
  vs: {
    id: string;
    title: TitleParts;
    intro: string;
    cols: string[];
    rows: { slug: string; label: string; changes: string; needs: string; current?: boolean }[];
    currentLabel: string;
  };
  safe: {
    id: string;
    title: TitleParts;
    lead: string;
    body: string;
    cards: { ui: 'nopass' | 'pay' | 'privacy'; title: string; body: string }[];
  };
  before: { id: string; title: TitleParts; lead: string; items: { title: string; body: string }[] };
  faq: {
    id: 'faq';
    kicker: string;
    title: string;
    intro: string;
    cta: string;
    /** EN-only extra questions, rendered after the service's existing faqIds. */
    extra: { id: string; question: string; answer: string }[];
    /** Replacement EN answers for existing faq.ts ids (apply in data/content/faq.ts, EN only). */
    fixExisting?: Record<string, string>;
  };
  more: {
    id: string;
    title: string;
    intro: string;
    services: { slug: string; title: string; line: string; image: string }[];
    cardPrice: string;
    guidesTitle: string;
    guides: { label: string; href: string }[];
  };
  sticky: { label: string; href: string };
  whatsapp: { display: string; href: string };
};
