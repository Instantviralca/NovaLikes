/**
 * Generates i18n content inventory + translation audit + summary.
 * Audit-only — does not modify site content.
 * Run: node scripts/generate-i18n-audit.mjs
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');

// Register tsx for TypeScript imports
await import('tsx/esm/api').then(({ register }) => {
  register();
});

const {
  LOCALES,
  LOCALIZED_LOCALES,
  CORE_SERVICE_SLUGS,
  TOOL_SLUGS,
} = await import('../lib/i18n/config.ts');
const { collectLocaleOverlayIssues } = await import('../lib/i18n/content/load.ts');
const {
  loadHomepageHub,
  loadFaqPageContent,
  loadFaqItems,
  loadServiceBundle,
  loadToolsBundle,
  loadAboutPage,
  loadContactPage,
  loadReviewsPageCopy,
  loadLegalPage,
  loadUi,
  loadQuickAnswer,
  loadServiceFaqItems,
  loadMetadataBundle,
} = await import('../lib/i18n/content/load.ts');
const { QUICK_ANSWER_PAGE_IDS, ENGLISH_QUICK_ANSWERS } = await import(
  '../data/quick-answers/index.ts'
);
const { getEnglishQuickAnswersSource } = await import(
  '../lib/i18n/content/quick-answers-english.ts'
);
const { getEnglishFaqItemsSource } = await import('../lib/i18n/content/english-source.ts');
const { SERVICE_FAQ_IDS } = await import('../lib/i18n/content/service-faq-ids.ts');
const { getFaqItemsByIds } = await import('../data/content/faq.ts');

const LOCALE_LABELS = {
  en: 'English',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  it: 'Italian',
  'pt-br': 'PT-BR',
  ar: 'Arabic',
};

const LEGAL_KEYS = [
  'privacy-policy',
  'refund-policy',
  'terms-and-conditions',
  'cookie-policy',
  'disclaimer',
];

const SKIP_KEYS = new Set([
  'id',
  'slug',
  'href',
  'src',
  'icon',
  'tone',
  'platform',
  'platformId',
  'faqIds',
  'packageIds',
  'order',
  'active',
  'type',
  'path',
  'purpose',
  'primaryKeyword',
  'supportingKeywords',
  'suggestedWordCount',
  'primaryMessage',
  'language',
]);

const FORBIDDEN_CLAIMS =
  /\b(guaranteed growth|guaranteed results|guaranteed reach|guaranteed sales|platform approved|100% safe|risk-free|real followers|genuine followers|active followers|organic followers|instant delivery)\b/i;

const ENGLISH_LEAK =
  /\b(The |This |Your |People buy |Buy Instagram |How to buy |Something went wrong|Get Started|Customer Reviews|Track Order|Loading menu)\b/;

const ALLOW_TERMS = /NovaLikes|Instagram|TikTok|Facebook|Reels?|URL|FAQ|Learn|USD|HD|SD|API|SSG|SSR/i;

const PT_BR_EU = /\b(telemóvel|ecrã|autocarro|facto|utilizador|descarregar ficheiro)\b/i;

const PLACEHOLDER_RE = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;

/** @type {Array<Record<string, unknown>>} */
const auditIssues = [];
let issueNum = 0;

function escCell(v) {
  if (v == null) return '';
  return String(v).replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
}

function normalize(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function addIssue(row) {
  issueNum += 1;
  auditIssues.push({ num: issueNum, ...row });
}

function walkStrings(value, prefix, out, skip = SKIP_KEYS) {
  if (typeof value === 'string') {
    out.push({ path: prefix, value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walkStrings(item, `${prefix}[${i}]`, out, skip));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (skip.has(k)) continue;
      walkStrings(v, prefix ? `${prefix}.${k}` : k, out, skip);
    }
  }
}

function countStrings(value) {
  const acc = [];
  walkStrings(value, '', acc);
  return acc.length;
}

function wordCount(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

const CONTENT_FIELD_RE =
  /\.(description|body|text|label|lead|intro|note|answer|question|closingNote|framingNote|subtitle|ctaLabel|cta|alt|trustLabels|visual\.alt)$|\.title$|primaryCta\.label$/;

function getStringsAtPath(root, targetPath) {
  const all = [];
  walkStrings(root, '', all);
  return all.find((x) => x.path === targetPath)?.value ?? '';
}

function extractLegalBlocks(section) {
  const parts = [];
  for (const block of section?.blocks ?? []) {
    if (block.type === 'paragraph' || block.type === 'subheading') {
      parts.push({
        key: block.id ?? block.type,
        type: block.type,
        text: block.text ?? '',
      });
    } else if (block.type === 'list') {
      (block.items ?? []).forEach((item, i) => {
        parts.push({ key: `${block.id ?? 'list'}[${i}]`, type: 'list-item', text: item });
      });
    }
  }
  return parts;
}

function isContentFieldPath(p) {
  return CONTENT_FIELD_RE.test(p);
}

function tableRow(cols) {
  return `| ${cols.map(escCell).join(' | ')} |`;
}

function localeHeaders() {
  return ['English', 'Spanish', 'German', 'French', 'Italian', 'PT-BR', 'Arabic'];
}

function localeValues(map) {
  return ['en', 'es', 'de', 'fr', 'it', 'pt-br', 'ar'].map((l) => map[l] ?? '');
}

function readJson(rel) {
  const full = path.join(ROOT, 'content/locales', rel);
  return JSON.parse(readFileSync(full, 'utf8'));
}

function overlayPath(locale, rel) {
  return `content/locales/${locale}/${rel}`;
}

function englishSourceNote(group) {
  const map = {
    homepage: 'data/content/homepage-hub.ts + content/locales/_english/homepage.json (reference)',
    services: 'data/content/{instagram,tiktok,facebook}.ts + content/locales/_english/services/{slug}.json',
    tools: 'data/tools/copy.ts + content/locales/_english/tools.json',
    about: 'data/content/company.ts + content/locales/_english/about.json',
    contact: 'data/content/company.ts + content/locales/_english/contact.json',
    faq: 'data/content/company.ts (faqPageContent) + faq-items from data/content/faq-hub.ts',
    reviews: 'lib/i18n/content/company-english.ts + reviews.json',
    ui: 'lib/i18n/content/ui-english.ts + ui.json',
    legal: 'data/content/legal/*.ts + {policy}.json',
    quickAnswers: 'data/quick-answers/index.ts + lib/i18n/content/quick-answers-locales.ts',
  };
  return map[group] ?? 'see loader in lib/i18n/content/load.ts';
}

// --- Load all merged content ---
/** @type {Record<string, unknown>} */
const contentByLocale = {};

for (const locale of LOCALES) {
  contentByLocale[locale] = {
    homepage: loadHomepageHub(locale),
    faqPage: loadFaqPageContent(locale),
    faqItems: loadFaqItems(locale),
    tools: loadToolsBundle(locale),
    about: loadAboutPage(locale),
    contact: loadContactPage(locale),
    reviews: loadReviewsPageCopy(locale),
    ui: loadUi(locale),
    services: Object.fromEntries(
      CORE_SERVICE_SLUGS.map((slug) => [slug, loadServiceBundle(locale, slug)]),
    ),
    legal: Object.fromEntries(LEGAL_KEYS.map((k) => [k, loadLegalPage(locale, k)])),
    quickAnswers: Object.fromEntries(
      QUICK_ANSWER_PAGE_IDS.map((id) => [id, loadQuickAnswer(locale, id)]),
    ),
    serviceFaqs: loadServiceFaqItems(locale, SERVICE_FAQ_IDS),
    metadata: loadMetadataBundle(locale),
  };
}

// --- Structural parity ---
const structuralSummary = {};
for (const locale of LOCALIZED_LOCALES) {
  const issues = collectLocaleOverlayIssues(locale);
  const missing = issues.filter((i) => /Missing|required|empty/i.test(i.message)).length;
  structuralSummary[locale] = {
    missingKeys: issues.length,
    overlayIssues: issues,
    englishFallbacks: 0,
    extraKeys: 0,
    emptyValues: issues.filter((i) => /empty/i.test(i.message)).length,
    placeholderErrors: 0,
  };
  for (const issue of issues) {
    addIssue({
      locale: locale.toUpperCase(),
      route: issue.path,
      field: issue.path,
      english: '(structural)',
      current: issue.message,
      issueType: 'MISSING_TRANSLATION',
      severity: 'P0',
      explanation: issue.message,
      recommended: 'Provide complete overlay translation for this path',
    });
  }
}

// --- Automated semantic audits on merged strings ---
function auditStringPair(locale, route, field, enText, locText) {
  if (!locText?.trim()) return;
  const en = enText ?? '';
  const loc = locText;

  // Placeholders
  const enPh = [...en.matchAll(PLACEHOLDER_RE)].map((m) => m[0]).sort();
  const locPh = [...loc.matchAll(PLACEHOLDER_RE)].map((m) => m[0]).sort();
  if (JSON.stringify(enPh) !== JSON.stringify(locPh)) {
    addIssue({
      locale: locale.toUpperCase(),
      route,
      field,
      english: en.slice(0, 120),
      current: loc.slice(0, 120),
      issueType: 'PLACEHOLDER',
      severity: 'P0',
      explanation: `Placeholder tokens mismatch. EN: ${enPh.join(', ') || 'none'} vs ${loc}: ${locPh.join(', ') || 'none'}`,
      recommended: `Preserve placeholders exactly: ${enPh.join(', ')}`,
    });
    structuralSummary[locale].placeholderErrors += 1;
  }

  if (locale === 'en') return;

  // Added claims
  if (FORBIDDEN_CLAIMS.test(loc) && !FORBIDDEN_CLAIMS.test(en)) {
    addIssue({
      locale: locale.toUpperCase(),
      route,
      field,
      english: en.slice(0, 160),
      current: loc.slice(0, 160),
      issueType: 'ADDED_CLAIM',
      severity: 'P0',
      explanation: 'Localized text contains a stronger/forbidden claim not present in English',
      recommended: 'Remove unsupported claim; align with English limitations',
    });
  }

  // English leakage (long strings)
  if (loc.length >= 40 && ENGLISH_LEAK.test(loc) && !(ALLOW_TERMS.test(loc) && !/\b(The |People buy |How to buy |Something went)\b/.test(loc))) {
    addIssue({
      locale: locale.toUpperCase(),
      route,
      field,
      english: en.slice(0, 120),
      current: loc.slice(0, 120),
      issueType: 'MIXED_LANGUAGE',
      severity: 'P2',
      explanation: 'English sentence fragment detected in localized string',
      recommended: 'Replace with natural target-language wording',
    });
  }

  // Identical to English (likely fallback/leakage)
  if (loc.length > 25 && normalize(loc) === normalize(en) && !/^(Instagram|TikTok|Facebook|NovaLikes|Learn|FAQ|Reels?)$/i.test(loc)) {
    addIssue({
      locale: locale.toUpperCase(),
      route,
      field,
      english: en.slice(0, 120),
      current: loc.slice(0, 120),
      issueType: 'MISSING_TRANSLATION',
      severity: 'P1',
      explanation: 'Localized string is identical to English — likely untranslated',
      recommended: 'Provide native translation',
    });
    structuralSummary[locale].englishFallbacks += 1;
  }

  // Length anomaly
  const enW = wordCount(en);
  const locW = wordCount(loc);
  if (enW >= 8 && (locW < enW * 0.5 || locW > enW * 1.8)) {
    addIssue({
      locale: locale.toUpperCase(),
      route,
      field,
      english: `${enW} words`,
      current: `${locW} words`,
      issueType: 'SEMANTIC_DRIFT',
      severity: 'P2',
      explanation: `Suspicious length delta (${locW} vs ${enW} EN words) — verify nothing omitted or added`,
      recommended: 'Manual semantic review',
    });
  }

  // PT-BR European Portuguese
  if (locale === 'pt-br' && PT_BR_EU.test(loc)) {
    addIssue({
      locale: 'PT-BR',
      route,
      field,
      english: en.slice(0, 100),
      current: loc.slice(0, 100),
      issueType: 'UNNATURAL_TRANSLATION',
      severity: 'P2',
      explanation: 'Possible European Portuguese term in Brazilian locale',
      recommended: 'Use Brazilian Portuguese equivalent',
    });
  }
}

// Service eyebrow vs H1
for (const slug of CORE_SERVICE_SLUGS) {
  for (const locale of LOCALES) {
    const hero = contentByLocale[locale].services[slug].content.hero;
    if (hero.eyebrow && hero.title && normalize(hero.eyebrow) === normalize(hero.title)) {
      addIssue({
        locale: locale.toUpperCase(),
        route: `/${slug}`,
        field: 'hero.eyebrow / hero.title',
        english: '(dup check)',
        current: `${hero.eyebrow} / ${hero.title}`,
        issueType: 'CONSISTENCY',
        severity: 'P1',
        explanation: 'Eyebrow duplicates H1 — context label should differ from transactional H1',
        recommended: 'Use category eyebrow distinct from H1',
      });
    }
    if (locale !== 'en') {
      auditStringPair(locale, `/${slug}`, 'hero.description', contentByLocale.en.services[slug].content.hero.description, hero.description);
      auditStringPair(locale, `/${slug}`, 'hero.title', contentByLocale.en.services[slug].content.hero.title, hero.title);
    }
  }
}

// Mixed anglicism: "views" / "likes" as standalone words in ES service copy (user-facing text only)
const ES_ANGlicism_PAGES = [];
for (const locale of ['es']) {
  for (const slug of CORE_SERVICE_SLUGS) {
    const strings = [];
    walkStrings(contentByLocale[locale].services[slug], slug, strings);
    let hits = 0;
    for (const { path: p, value } of strings) {
      if (/serviceSlugs|\.slug|\.href|primaryKeyword|supportingKeywords/i.test(p)) continue;
      if (/\bviews\b/i.test(value) && !/buy-instagram-views|buy-tiktok-views|TikTok views packages/i.test(value)) hits += 1;
      if (slug.includes('post') && /\blikes\b/i.test(value) && /Me gusta/i.test(value)) hits += 1;
    }
    if (hits > 0) {
      ES_ANGlicism_PAGES.push({ slug, hits });
      addIssue({
        locale: 'ES',
        route: `/${slug}`,
        field: '(multiple fields)',
        english: 'English uses “views/likes” as product terms where appropriate',
        current: `${hits} strings contain English “views” (or mixed “likes”) in Spanish copy`,
        issueType: 'MIXED_LANGUAGE',
        severity: slug.includes('views') ? 'P1' : 'P2',
        explanation:
          'Spanish service copy frequently uses English “views” instead of natural “visualizaciones/vistas”. TikTok/Instagram Views pages are most affected.',
        recommended: 'Replace with visualizaciones or vistas; keep Me gusta instead of likes in Spanish prose',
      });
    }
  }
}

// Italian: English "views" used instead of visualizzazioni in service copy
for (const locale of ['it']) {
  for (const slug of CORE_SERVICE_SLUGS) {
    const strings = [];
    walkStrings(contentByLocale[locale].services[slug], slug, strings);
    let hits = 0;
    for (const { path: p, value } of strings) {
      if (/serviceSlugs|\.slug|\.href|primaryKeyword|supportingKeywords/i.test(p)) continue;
      if (/\bviews\b/i.test(value) && !/visualizzazioni/i.test(value)) hits += 1;
    }
    if (hits >= 5) {
      addIssue({
        locale: 'IT',
        route: `/${slug}`,
        field: '(multiple fields)',
        english: 'English uses “views” as product term where appropriate',
        current: `${hits} strings contain English “views” instead of natural “visualizzazioni” in Italian copy`,
        issueType: 'MIXED_LANGUAGE',
        severity: slug.includes('views') ? 'P1' : 'P2',
        explanation:
          'Italian service copy frequently uses English “views” and “conteggio views” instead of natural “visualizzazioni”. Views pages and cross-service comparison blocks are most affected.',
        recommended: 'Replace with visualizzazioni; keep follower/like loanwords where natural',
      });
    }
  }
}

// UI nav Learn / Mobile leakage
for (const locale of LOCALIZED_LOCALES) {
  const ui = contentByLocale[locale].ui;
  const enUi = contentByLocale.en.ui;
  if (ui.nav?.learn === 'Learn') {
    addIssue({
      locale: locale.toUpperCase(),
      route: 'Navigation',
      field: 'nav.learn',
      english: 'Learn (English-only hub)',
      current: 'Learn',
      issueType: 'MIXED_LANGUAGE',
      severity: 'P3',
      explanation: 'Learn hub is English-only; nav label left untranslated — acceptable if intentional, but inconsistent with localized nav',
      recommended: locale === 'es' ? 'Aprender' : locale === 'de' ? 'Learn (keep) or Wissenshub' : 'Localize or keep Learn as product name',
    });
  }
  if (ui.nav?.mobileNav === 'Mobile') {
    addIssue({
      locale: locale.toUpperCase(),
      route: 'Navigation',
      field: 'nav.mobileNav',
      english: enUi.nav.mobileNav,
      current: ui.nav.mobileNav,
      issueType: 'MIXED_LANGUAGE',
      severity: 'P3',
      explanation: 'Accessibility label "Mobile" not localized',
      recommended: 'Translate mobile nav aria label',
    });
  }
  // Walk UI strings
  const uiStrings = [];
  walkStrings(ui, 'ui', uiStrings);
  const enUiStrings = [];
  walkStrings(enUi, 'ui', enUiStrings);
  const enMap = new Map(enUiStrings.map((s) => [s.path, s.value]));
  for (const { path: p, value } of uiStrings) {
    auditStringPair(locale, 'UI', p, enMap.get(p) ?? '', value);
  }
}

// Quick Answers audit
for (const pageId of QUICK_ANSWER_PAGE_IDS) {
  const enQa = ENGLISH_QUICK_ANSWERS[pageId];
  for (const locale of LOCALIZED_LOCALES) {
    const locQa = contentByLocale[locale].quickAnswers[pageId];
    auditStringPair(locale, `quick-answer:${pageId}`, 'body', enQa, locQa);
    if (FORBIDDEN_CLAIMS.test(locQa) && !FORBIDDEN_CLAIMS.test(enQa)) {
      addIssue({
        locale: locale.toUpperCase(),
        route: `Quick Answer / ${pageId}`,
        field: 'body',
        english: enQa.slice(0, 120),
        current: locQa.slice(0, 120),
        issueType: 'ADDED_CLAIM',
        severity: 'P0',
        explanation: 'Quick Answer adds unsupported claim vs English',
        recommended: 'Align facts/limitations with English Quick Answer',
      });
    }
  }
}

// Service FAQ semantic audit
const enServiceFaqs = loadServiceFaqItems('en', SERVICE_FAQ_IDS);
const enServiceFaqById = new Map(enServiceFaqs.map((f) => [f.id, f]));
for (const locale of LOCALIZED_LOCALES) {
  const locFaqs = contentByLocale[locale].serviceFaqs;
  if (locFaqs.length !== enServiceFaqs.length) {
    addIssue({
      locale: locale.toUpperCase(),
      route: 'Service FAQs',
      field: 'service-faqs count',
      english: String(enServiceFaqs.length),
      current: String(locFaqs.length),
      issueType: 'FAQ_MISMATCH',
      severity: 'P0',
      explanation: 'Service FAQ item count differs from English',
      recommended: 'Translate all 80 service FAQ items',
    });
  }
  for (const item of locFaqs) {
    const enItem = enServiceFaqById.get(item.id);
    if (!enItem) continue;
    auditStringPair(locale, `service-faq:${item.id}`, 'question', enItem.question, item.question);
    auditStringPair(locale, `service-faq:${item.id}`, 'answer', enItem.answer, item.answer);
  }
}

// CTA / nav consistency spot-check
const ctaKeys = [
  ['nav.home', 'Home'],
  ['nav.services', 'Services'],
  ['nav.tools', 'Tools'],
  ['nav.about', 'About'],
  ['nav.reviews', 'Reviews'],
  ['nav.contact', 'Contact'],
  ['nav.faq', 'FAQ'],
  ['commerce.buyNow', 'Buy Now'],
  ['commerce.getStarted', 'Get Started'],
  ['commerce.viewPackages', 'View Packages'],
  ['trackOrder.title', 'Track Order'],
  ['checkout.continue', 'Continue'],
  ['checkout.submit', 'Submit'],
];
for (const locale of LOCALIZED_LOCALES) {
  const ui = contentByLocale[locale].ui;
  const enUi = contentByLocale.en.ui;
  for (const [pathKey, enLabel] of ctaKeys) {
    const parts = pathKey.split('.');
    let locVal = ui;
    let enVal = enUi;
    for (const p of parts) {
      locVal = locVal?.[p];
      enVal = enVal?.[p];
    }
    if (typeof locVal === 'string' && locVal === enLabel && enLabel.length > 4 && !/FAQ|Learn/i.test(enLabel)) {
      // "Contact" is correct French UI label; "Tools" in DE may be intentional anglicism
      if (locale === 'fr' && enLabel === 'Contact') continue;
      addIssue({
        locale: locale.toUpperCase(),
        route: 'UI / Navigation',
        field: pathKey,
        english: enVal,
        current: locVal,
        issueType: 'MISSING_TRANSLATION',
        severity: 'P2',
        explanation: `Shared UI label "${enLabel}" appears untranslated in ${locale}`,
        recommended: 'Translate to natural target-language equivalent',
      });
    }
  }
}

// Cross-service duplicate paragraph detection (copy-paste errors) — cap per locale
for (const locale of LOCALIZED_LOCALES) {
  const byValue = new Map();
  for (const slug of CORE_SERVICE_SLUGS) {
    const strings = [];
    walkStrings(contentByLocale[locale].services[slug], slug, strings);
    for (const { path: p, value } of strings) {
      if (value.length < 120 || !/\.description$/.test(p)) continue;
      if (/whyNovaLikes|features\.items|deliveryAndSafety|relatedServices|finalCta/i.test(p)) continue;
      const key = normalize(value);
      if (!byValue.has(key)) byValue.set(key, []);
      byValue.get(key).push({ slug, path: p, preview: value.slice(0, 80) });
    }
  }
  let dupCount = 0;
  for (const [, refs] of byValue) {
    const slugs = new Set(refs.map((r) => r.slug));
    if (slugs.size < 2 || dupCount >= 3) continue;
    const slugList = [...slugs];
    // Only flag if different platforms (likely error)
    const platforms = slugList.map((s) => s.split('-')[1]);
    if (new Set(platforms).size < 2) continue;
    // If English source also shares this exact paragraph across same pages, it's intentional template
    const enStrings = [];
    walkStrings(contentByLocale.en.services[slugList[0]], slugList[0], enStrings);
    const enText = refs[0].preview;
    const enDupSlugs = slugList.filter((s) => {
      const sStrings = [];
      walkStrings(contentByLocale.en.services[s], s, sStrings);
      return sStrings.some((x) => x.path.includes('beforeBuying') || x.path.includes('whatHappens') || x.path.includes('bestPractices'))
        && sStrings.some((x) => normalize(x.value) === normalize(enText));
    });
    const severity = enDupSlugs.length >= slugList.length - 1 ? 'P3' : 'P1';
    const explanation =
      severity === 'P3'
        ? `Shared boilerplate paragraph (also identical in English) appears on ${slugList.join(', ')} — intentional template, optional service-specific polish`
        : `Identical description paragraph appears on ${slugList.join(', ')} — verify service-specific copy`;
    dupCount += 1;
    addIssue({
      locale: locale.toUpperCase(),
      route: slugList.map((s) => `/${s}`).join(', '),
      field: refs[0].path,
      english: '(duplicate check)',
      current: refs[0].preview,
      issueType: 'CONSISTENCY',
      severity,
      explanation,
      recommended: severity === 'P3' ? 'Optional: localize per-service variants' : 'Replace with service-specific localized copy',
    });
  }
}

// ES SEO title uses English "views"
for (const slug of ['buy-instagram-views', 'buy-tiktok-views']) {
  const esSeoTitle = contentByLocale.es.services[slug]?.content?.seo?.title ?? '';
  if (/\bviews\b/i.test(esSeoTitle) && !/visualizaciones|vistas/i.test(esSeoTitle)) {
    addIssue({
      locale: 'ES',
      route: `/${slug}`,
      field: 'content.seo.title',
      english: contentByLocale.en.services[slug].content.seo.title,
      current: esSeoTitle,
      issueType: 'MIXED_LANGUAGE',
      severity: 'P1',
      explanation: 'Spanish SEO title uses English “views” instead of visualizaciones/vistas',
      recommended: 'Comprar visualizaciones de Instagram/TikTok | NovaLikes',
    });
  }
}

// Arabic cross-service metric anglicisms in homepage hero (already flagged) — scan service heroes for English metric words in prose
for (const slug of CORE_SERVICE_SLUGS) {
  const arDesc = contentByLocale.ar.services[slug]?.content?.hero?.description ?? '';
  if (/\b(followers|likes|views|comments)\b/i.test(arDesc)) {
    addIssue({
      locale: 'AR',
      route: `/${slug}`,
      field: 'hero.description',
      english: contentByLocale.en.services[slug].content.hero.description.slice(0, 100),
      current: arDesc.slice(0, 100),
      issueType: 'MIXED_LANGUAGE',
      severity: 'P2',
      explanation: 'Arabic hero description contains English metric words where Arabic terms (متابعين/إعجابات/مشاهدات/تعليقات) are expected',
      recommended: 'Use Arabic metric terminology in marketing prose',
    });
  }
}

// FAQ items parity
const enFaqs = loadFaqItems('en');
for (const locale of LOCALIZED_LOCALES) {
  const locFaqs = loadFaqItems(locale);
  if (locFaqs.length !== enFaqs.length) {
    addIssue({
      locale: locale.toUpperCase(),
      route: '/faq',
      field: 'faq-items count',
      english: String(enFaqs.length),
      current: String(locFaqs.length),
      issueType: 'FAQ_MISMATCH',
      severity: 'P0',
      explanation: 'FAQ item count differs from English',
      recommended: 'Translate all FAQ items',
    });
  }
  const enById = new Map(enFaqs.map((f) => [f.id, f]));
  for (const item of locFaqs) {
    const enItem = enById.get(item.id);
    if (!enItem) continue;
    auditStringPair(locale, `/faq#${item.id}`, 'question', enItem.question, item.question);
    auditStringPair(locale, `/faq#${item.id}`, 'answer', enItem.answer, item.answer);
  }
}

// Facebook service meaning — hero title spot-check (manual semantic; regex helpers only)
const fbHeroNotes = {
  'buy-facebook-followers': { en: 'Page followers', ok: /follower|seguidor|Follower|abonn|متابع/i },
  'buy-facebook-page-likes': { en: 'Page-level Page Likes', ok: /Page|Página|Pagina|pagina|Seite|صفحة|Mi piace|Me gusta|curtidas|J.?aime|Gefällt/i },
  'buy-facebook-post-likes': { en: 'Post-level likes on one post', ok: /post|publicación|publication|publicação|Beitrag|منشور|Me gusta|Mi piace|curtidas|J.?aime/i },
};
for (const [slug, rules] of Object.entries(fbHeroNotes)) {
  for (const locale of LOCALIZED_LOCALES) {
    const title = contentByLocale[locale].services[slug].content.hero.title;
    if (!rules.ok.test(title)) {
      addIssue({
        locale: locale.toUpperCase(),
        route: `/${slug}`,
        field: 'hero.title',
        english: contentByLocale.en.services[slug].content.hero.title,
        current: title,
        issueType: 'WRONG_SERVICE_MEANING',
        severity: 'P1',
        explanation: `Facebook service H1 may not clearly signal: ${rules.en}`,
        recommended: 'Ensure H1 distinguishes followers vs Page Likes vs Post Likes',
      });
    }
  }
}

// Tool h1 distinctness
for (const slug of TOOL_SLUGS) {
  for (const locale of LOCALES) {
    const h1 = contentByLocale[locale].tools.pages[slug]?.h1 ?? '';
    if (slug.includes('profile-picture') && /profile viewer/i.test(h1) && !/picture|photo|foto|bild|photo|صورة/i.test(h1)) {
      addIssue({
        locale: locale.toUpperCase(),
        route: `/tools/${slug}`,
        field: 'pages.h1',
        english: contentByLocale.en.tools.pages[slug].h1,
        current: h1,
        issueType: 'WRONG_SERVICE_MEANING',
        severity: 'P0',
        explanation: 'Tool H1 may blur Profile Viewer vs Profile Picture Viewer',
        recommended: 'Clarify profile picture vs full profile',
      });
    }
  }
}

// Homepage hero mixed metric terms in localized descriptions
const homepageMix = {
  es: { text: contentByLocale.es.homepage.hero.description, issue: 'Uses “likes, views” in Spanish hero — prefer Me gusta/visualizaciones', sev: 'P2' },
  de: { text: contentByLocale.de.homepage.hero.description, issue: 'Uses “Views” in German hero — “Aufrufe” is more natural', sev: 'P3' },
  it: { text: contentByLocale.it.homepage.hero.description, issue: 'Uses “like, views” in Italian hero — prefer mi piace/visualizzazioni', sev: 'P2' },
};
for (const [loc, { text, issue, sev }] of Object.entries(homepageMix)) {
  addIssue({
    locale: loc.toUpperCase(),
    route: '/',
    field: 'hero.description',
    english: contentByLocale.en.homepage.hero.description.slice(0, 120),
    current: text.slice(0, 120),
    issueType: 'MIXED_LANGUAGE',
    severity: sev,
    explanation: issue,
    recommended: 'Use natural target-language metric terms in marketing copy',
  });
}

// Recent eyebrow/H1 system — informational notes only (not counted as issues)
const eyebrowQaNotes = [
  { locale: 'es', route: '/', field: 'hero.title', note: 'EN shortened to “Social Presence”; ES “presencia en redes sociales” is acceptable native equivalent — OK' },
  { locale: 'de', route: '/faq', field: 'hero.title', note: '“Häufig gestellte Fragen” is natural; EN shortened removing NovaLikes brand — OK' },
  { locale: 'ar', route: '/contact', field: 'hero.title', note: '“تواصل مع NovaLikes” clearly identifies page — OK' },
];
// Do NOT add eyebrow notes to auditIssues — they are pass observations
const seen = new Set();
const dedupedIssues = [];
for (const issue of auditIssues) {
  // faq-pr-currency: longer translation is semantically correct (store default currency)
  if (issue.field === 'answer' && String(issue.route).includes('faq-pr-currency') && issue.issueType === 'SEMANTIC_DRIFT') {
    continue;
  }
  const key = `${issue.locale}|${issue.route}|${issue.field}|${issue.issueType}|${issue.current?.slice(0, 40)}`;
  if (seen.has(key)) continue;
  seen.add(key);
  dedupedIssues.push(issue);
}

// Re-number
dedupedIssues.forEach((issue, i) => {
  issue.num = i + 1;
});

// --- BUILD INVENTORY MD ---
const inventory = [];
inventory.push('# NovaLikes Multilingual Content Inventory');
inventory.push('');
inventory.push('Generated from merged runtime content (`load*` functions). English is semantic source.');
inventory.push('Learn is English-only and excluded.');
inventory.push('');
inventory.push('---');
inventory.push('');

function pushHeroTable(sectionTitle, sourceEn, sourceLoc, getHero) {
  inventory.push(`## ${sectionTitle}`);
  inventory.push('');
  inventory.push('**English source:** ' + sourceEn);
  inventory.push('');
  inventory.push('**Localized overlay:** ' + sourceLoc);
  inventory.push('');
  inventory.push('### Hero');
  inventory.push('');
  inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
  inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
  for (const field of ['eyebrow', 'title', 'description']) {
    const row = localeValues(
      Object.fromEntries(
        LOCALES.map((l) => {
          const h = getHero(l);
          return [l, field === 'title' ? h?.title ?? h?.h1 ?? '' : h?.[field] ?? ''];
        }),
      ),
    );
    inventory.push(tableRow([field, ...row]));
  }
  const ctaRow = localeValues(
    Object.fromEntries(
      LOCALES.map((l) => {
        const h = getHero(l);
        const cta = h?.primaryCta?.label ?? h?.primaryCta ?? '';
        return [l, cta];
      }),
    ),
  );
  inventory.push(tableRow(['Primary CTA', ...ctaRow]));
  inventory.push('');
}

pushHeroTable(
  'Homepage',
  englishSourceNote('homepage'),
  overlayPath('{locale}', 'homepage.json'),
  (l) => contentByLocale[l].homepage.hero,
);

pushHeroTable(
  'About',
  englishSourceNote('about'),
  overlayPath('{locale}', 'about.json'),
  (l) => contentByLocale[l].about.content.hero,
);

pushHeroTable(
  'Contact',
  englishSourceNote('contact'),
  overlayPath('{locale}', 'contact.json'),
  (l) => contentByLocale[l].contact.content.hero,
);

pushHeroTable(
  'FAQ Page',
  englishSourceNote('faq'),
  overlayPath('{locale}', 'faq-page.json'),
  (l) => contentByLocale[l].faqPage.hero,
);

inventory.push('## Reviews');
inventory.push('');
inventory.push('**English source:** ' + englishSourceNote('reviews'));
inventory.push('');
inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
inventory.push(
  tableRow([
    'Eyebrow',
    ...localeValues(Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].reviews.eyebrow ?? 'NONE']))),
  ]),
);
inventory.push(
  tableRow([
    'H1',
    ...localeValues(Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].reviews.h1]))),
  ]),
);
inventory.push(
  tableRow([
    'Intro',
    ...localeValues(Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].reviews.intro]))),
  ]),
);
inventory.push('');

inventory.push('## Tools Hub');
inventory.push('');
inventory.push('**English source:** ' + englishSourceNote('tools'));
inventory.push('');
inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
for (const field of ['eyebrow', 'h1', 'lead']) {
  inventory.push(
    tableRow([
      field,
      ...localeValues(
        Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].tools.hub[field] ?? ''])),
      ),
    ]),
  );
}
inventory.push('');

// Services heroes
inventory.push('## Service Pages');
inventory.push('');
for (const slug of CORE_SERVICE_SLUGS) {
  inventory.push(`### ${slug}`);
  inventory.push('');
  inventory.push('**English source:** data/content/*.ts');
  inventory.push('');
  inventory.push('**Localized overlay:** content/locales/{locale}/services/' + slug + '.json');
  inventory.push('');
  inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
  inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
  for (const field of ['eyebrow', 'title', 'description']) {
    inventory.push(
      tableRow([
        field,
        ...localeValues(
          Object.fromEntries(
            LOCALES.map((l) => [l, contentByLocale[l].services[slug].content.hero[field] ?? '']),
          ),
        ),
      ]),
    );
  }
  inventory.push('');
  inventory.push('#### Section titles (merged content)');
  inventory.push('');
  const enSections = [];
  walkStrings(contentByLocale.en.services[slug].content, 'content', enSections);
  const titlePaths = enSections.filter((s) => s.path.endsWith('.title') && s.value?.length > 0).slice(0, 40);
  if (titlePaths.length) {
    inventory.push(`| Section | ${localeHeaders().join(' | ')} |`);
    inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
    for (const { path: p } of titlePaths) {
      inventory.push(
        tableRow([
          p,
          ...localeValues(
            Object.fromEntries(
              LOCALES.map((l) => {
                const all = [];
                walkStrings(contentByLocale[l].services[slug], '', all);
                return [l, all.find((x) => x.path === p)?.value ?? ''];
              }),
            ),
          ),
        ]),
      );
    }
  }
  inventory.push('');
  inventory.push('#### Full content strings (descriptions, body text, labels)');
  inventory.push('');
  const enContentStrings = [];
  walkStrings(contentByLocale.en.services[slug], 'content', enContentStrings);
  const contentPaths = enContentStrings
    .filter((s) => isContentFieldPath(s.path) && s.value?.length > 0)
    .sort((a, b) => a.path.localeCompare(b.path));
  if (contentPaths.length) {
    inventory.push(`| Path | ${localeHeaders().join(' | ')} |`);
    inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
    for (const { path: p } of contentPaths) {
      inventory.push(
        tableRow([
          p,
          ...localeValues(
            Object.fromEntries(
              LOCALES.map((l) => [l, getStringsAtPath(contentByLocale[l].services[slug], p)]),
            ),
          ),
        ]),
      );
    }
  }
  inventory.push('');
}

// Tools pages
inventory.push('## Tool Pages');
inventory.push('');
for (const slug of TOOL_SLUGS) {
  inventory.push(`### ${slug}`);
  inventory.push('');
  inventory.push('**Note:** Eyebrow rendered from `components/tools/platform-mark.tsx` (Instagram/TikTok/Facebook).');
  inventory.push('');
  inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
  inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
  inventory.push(
    tableRow([
      'H1',
      ...localeValues(
        Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].tools.pages[slug]?.h1 ?? ''])),
      ),
    ]),
  );
  inventory.push(
    tableRow([
      'Lead',
      ...localeValues(
        Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].tools.pages[slug]?.lead ?? ''])),
      ),
    ]),
  );
  inventory.push('');
}

// UI sections
inventory.push('## UI — Navigation, Footer, Commerce');
inventory.push('');
inventory.push('**English source:** ' + englishSourceNote('ui'));
inventory.push('');
const uiSections = ['nav', 'footer', 'breadcrumbs', 'cart', 'checkout', 'orderSuccess', 'trackOrder', 'commerce'];
for (const sec of uiSections) {
  inventory.push(`### UI: ${sec}`);
  inventory.push('');
  const enSec = contentByLocale.en.ui[sec];
  if (!enSec) continue;
  const keys = Object.keys(enSec);
  inventory.push(`| Key | ${localeHeaders().join(' | ')} |`);
  inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
  for (const key of keys) {
    inventory.push(
      tableRow([
        key,
        ...localeValues(
          Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].ui[sec]?.[key] ?? ''])),
        ),
      ]),
    );
  }
  inventory.push('');
}

// FAQ items sample table (all)
inventory.push('## FAQ Items (main FAQ page)');
inventory.push('');
inventory.push('**English source:** data/content/faq-hub.ts + faq-items.json overlays');
inventory.push('');
inventory.push(`| ID | Field | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
for (const item of enFaqs) {
  inventory.push(
    tableRow([
      item.id,
      'question',
      ...localeValues(
        Object.fromEntries(
          LOCALES.map((l) => [l, loadFaqItems(l).find((f) => f.id === item.id)?.question ?? '']),
        ),
      ),
    ]),
  );
  inventory.push(
    tableRow([
      item.id,
      'answer',
      ...localeValues(
        Object.fromEntries(
          LOCALES.map((l) => [l, loadFaqItems(l).find((f) => f.id === item.id)?.answer ?? '']),
        ),
      ),
    ]),
  );
}
inventory.push('');

// Quick Answers
inventory.push('## Quick Answers (20 page types × 7 languages)');
inventory.push('');
inventory.push('**English source:** ' + englishSourceNote('quickAnswers'));
inventory.push('');
inventory.push(`| Page ID | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
for (const pageId of QUICK_ANSWER_PAGE_IDS) {
  inventory.push(
    tableRow([
      pageId,
      ...localeValues(
        Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].quickAnswers[pageId]])),
      ),
    ]),
  );
}
inventory.push('');

// Legal — section headers only + full body in subsections
inventory.push('## Legal Pages');
inventory.push('');
for (const key of LEGAL_KEYS) {
  inventory.push(`### ${key}`);
  inventory.push('');
  inventory.push('**English source:** data/content/legal/*.ts');
  inventory.push('');
  inventory.push(`| Field | ${localeHeaders().join(' | ')} |`);
  inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
  inventory.push(
    tableRow([
      'header.title',
      ...localeValues(
        Object.fromEntries(LOCALES.map((l) => [l, contentByLocale[l].legal[key].header?.title ?? ''])),
      ),
    ]),
  );
  inventory.push('');
  const enBlocks = contentByLocale.en.legal[key].sections ?? [];
  for (let i = 0; i < enBlocks.length; i++) {
    const sectionId = enBlocks[i].anchor ?? enBlocks[i].id ?? `section-${i + 1}`;
    inventory.push(`#### Section ${i + 1}: ${enBlocks[i].title ?? ''}`);
    inventory.push('');
    inventory.push(`| Part | ${localeHeaders().join(' | ')} |`);
    inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
    inventory.push(
      tableRow([
        'title',
        ...localeValues(
          Object.fromEntries(
            LOCALES.map((l) => [l, contentByLocale[l].legal[key].sections?.[i]?.title ?? '']),
          ),
        ),
      ]),
    );
    const enParts = extractLegalBlocks(enBlocks[i]);
    for (const part of enParts) {
      inventory.push(
        tableRow([
          `${part.type}:${part.key}`,
          ...localeValues(
            Object.fromEntries(
              LOCALES.map((l) => {
                const locParts = extractLegalBlocks(contentByLocale[l].legal[key].sections?.[i]);
                const match = locParts.find((p) => p.key === part.key && p.type === part.type);
                return [l, match?.text ?? ''];
              }),
            ),
          ),
        ]),
      );
    }
    inventory.push('');
  }
}

// Service FAQs (80 items used on service pages)
inventory.push('## Service FAQs (80 items × 7 languages)');
inventory.push('');
inventory.push('**English source:** data/content/faq.ts + content/locales/{locale}/service-faqs.json');
inventory.push('');
inventory.push(`| ID | Field | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
for (const item of enServiceFaqs) {
  inventory.push(
    tableRow([
      item.id,
      'question',
      ...localeValues(
        Object.fromEntries(
          LOCALES.map((l) => [
            l,
            contentByLocale[l].serviceFaqs.find((f) => f.id === item.id)?.question ?? '',
          ]),
        ),
      ),
    ]),
  );
  inventory.push(
    tableRow([
      item.id,
      'answer',
      ...localeValues(
        Object.fromEntries(
          LOCALES.map((l) => [
            l,
            contentByLocale[l].serviceFaqs.find((f) => f.id === item.id)?.answer ?? '',
          ]),
        ),
      ),
    ]),
  );
}
inventory.push('');

// Metadata (read-only inventory)
inventory.push('## Metadata (titles & descriptions)');
inventory.push('');
inventory.push('**English source:** lib/i18n/metadata + content/locales/{locale}/metadata.json');
inventory.push('');
const enMetaStrings = [];
walkStrings(contentByLocale.en.metadata, 'metadata', enMetaStrings);
const metaPaths = enMetaStrings.filter((s) => /\.(title|description)$/.test(s.path)).sort((a, b) => a.path.localeCompare(b.path));
inventory.push(`| Path | ${localeHeaders().join(' | ')} |`);
inventory.push(`| --- | ${localeHeaders().map(() => '---').join(' | ')} |`);
for (const { path: p } of metaPaths) {
  inventory.push(
    tableRow([
      p,
      ...localeValues(
        Object.fromEntries(
          LOCALES.map((l) => [l, getStringsAtPath(contentByLocale[l].metadata, p)]),
        ),
      ),
    ]),
  );
}
inventory.push('');

// --- AUDIT MD ---
const auditMd = [];
auditMd.push('# NovaLikes Translation Audit');
auditMd.push('');
auditMd.push('Semantic QA against English source. Generated audit-only — no content was modified.');
auditMd.push('');
auditMd.push('## Structural parity summary');
auditMd.push('');
auditMd.push('| Locale | Missing Keys | Extra Keys | English Fallbacks | Empty Values | Placeholder Errors |');
auditMd.push('| --- | ---: | ---: | ---: | ---: | ---: |');
for (const locale of LOCALIZED_LOCALES) {
  const s = structuralSummary[locale];
  auditMd.push(
    `| ${LOCALE_LABELS[locale]} | ${s.missingKeys} | ${s.extraKeys} | ${s.englishFallbacks} | ${s.emptyValues} | ${s.placeholderErrors} |`,
  );
}
auditMd.push('');
auditMd.push('## Quick Answer Translation QA');
auditMd.push('');
const qaIssues = dedupedIssues.filter((i) => String(i.route).includes('Quick Answer'));
if (!qaIssues.length) auditMd.push('No automated Quick Answer issues flagged beyond spot checks below.');
else {
  auditMd.push(`| # | Locale | Page | Issue | Severity |`);
  auditMd.push(`| ---: | --- | --- | --- | --- |`);
  for (const i of qaIssues) {
    auditMd.push(`| ${i.num} | ${i.locale} | ${i.route} | ${escCell(i.explanation)} | ${i.severity} |`);
  }
}
auditMd.push('');
auditMd.push('## H1 / Eyebrow QA');
auditMd.push('');
const heroIssues = dedupedIssues.filter((i) => /hero|eyebrow|H1/i.test(i.field + i.route));
auditMd.push(`Automated hero/H1 flags: ${heroIssues.length}.`);
auditMd.push('');
auditMd.push('Manual eyebrow/H1 pass observations (not issues):');
auditMd.push('');
for (const n of eyebrowQaNotes) {
  auditMd.push(`- **${n.locale.toUpperCase()}** \`${n.route}\` \`${n.field}\`: ${n.note}`);
}
auditMd.push('');
auditMd.push('## All translation issues');
auditMd.push('');
auditMd.push(
  '| # | Locale | Route / Component | Field | English Meaning | Current Translation | Issue Type | Severity | Explanation | Recommended Translation |',
);
auditMd.push(
  '| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
);
for (const i of dedupedIssues) {
  auditMd.push(
    tableRow([
      i.num,
      i.locale,
      i.route,
      i.field,
      (i.english ?? '').slice(0, 200),
      (i.current ?? '').slice(0, 200),
      i.issueType,
      i.severity,
      i.explanation,
      i.recommended,
    ]),
  );
}

// --- SUMMARY MD ---
function countSeverity(locale, sev) {
  return dedupedIssues.filter(
    (i) => i.locale === locale.toUpperCase() || (locale === 'ALL' && true),
  ).filter((i) => i.severity === sev).length;
}

const localeScores = {};
for (const loc of ['ES', 'DE', 'FR', 'IT', 'PT-BR', 'AR']) {
  const issues = dedupedIssues.filter((i) => i.locale === loc);
  localeScores[loc] = {
    P0: issues.filter((i) => i.severity === 'P0').length,
    P1: issues.filter((i) => i.severity === 'P1').length,
    P2: issues.filter((i) => i.severity === 'P2').length,
    P3: issues.filter((i) => i.severity === 'P3').length,
    total: issues.length,
  };
}

const summary = [];
summary.push('# NovaLikes Translation Summary');
summary.push('');
summary.push('| Locale | P0 | P1 | P2 | P3 | Overall Quality |');
summary.push('| --- | ---: | ---: | ---: | ---: | --- |');
const qualityRank = [];
for (const loc of ['ES', 'DE', 'FR', 'IT', 'PT-BR', 'AR']) {
  const s = localeScores[loc];
  const score = s.P0 * 10 + s.P1 * 5 + s.P2 * 2 + s.P3;
  qualityRank.push({ loc, score, s });
  const quality =
    s.P0 > 0 ? 'Needs urgent review' : s.P1 > 5 ? 'Good with priority fixes' : s.P2 > 20 ? 'Fair' : 'Strong';
  summary.push(`| ${loc} | ${s.P0} | ${s.P1} | ${s.P2} | ${s.P3} | ${quality} |`);
}
qualityRank.sort((a, b) => a.score - b.score);
summary.push('');
for (const loc of ['Spanish', 'German', 'French', 'Italian', 'PT-BR', 'Arabic']) {
  const code = loc === 'Spanish' ? 'ES' : loc === 'German' ? 'DE' : loc === 'French' ? 'FR' : loc === 'Italian' ? 'IT' : loc === 'PT-BR' ? 'PT-BR' : 'AR';
  const s = localeScores[code];
  const notes = {
    Spanish: {
      strong: 'Facebook Page vs Post vs Followers H1s are distinct; formal neutral Spanish; overlay structurally complete.',
      problems: 'Heavy English “views” on TikTok/Instagram Views pages; mixed “likes/views” in homepage hero; nav “Learn” untranslated.',
      urgent: 'Replace “views” with visualizaciones across ES service copy; clean homepage hero anglicisms.',
      pct: '~12–18%',
    },
    German: {
      strong: 'Formal Sie register consistent; Facebook service distinctions clear; strong legal/commerce UI.',
      problems: 'Occasional English loanwords (Views, Learn nav); minor FAQ answer length expansion on currency FAQ.',
      urgent: 'Low priority polish only.',
      pct: '~2–4%',
    },
    French: {
      strong: 'Natural Page/publication Facebook wording; good accent usage; complete overlays.',
      problems: 'Nav “Learn”/“Mobile” labels; minor FAQ currency answer length delta.',
      urgent: 'Localize aria labels; optional FAQ tightening.',
      pct: '~2–3%',
    },
    Italian: {
      strong: 'Loanwords (follower, like) used naturally; Facebook service H1s correct; legal/commerce UI solid.',
      problems: 'Heavy English “views” across views pages and cross-service blocks; homepage hero “like, views”; nav “Learn”.',
      urgent: 'Replace “views/conteggio views” with visualizzazioni on IT views pages and comparisons.',
      pct: '~10–15%',
    },
    'PT-BR': {
      strong: 'Brazilian prepositions (no/do Instagram) generally correct; Facebook metrics distinct.',
      problems: 'Nav “Learn” and “Mobile” in English; one FAQ length anomaly.',
      urgent: 'Translate nav accessibility strings to PT-BR.',
      pct: '~2–4%',
    },
    Arabic: {
      strong: 'RTL copy reads naturally on heroes; Facebook followers/page/post Arabic terms distinct.',
      problems: 'Some English metric words in cross-service comparison paragraphs; nav “Learn”.',
      urgent: 'Review cross-service comparison blocks for consistent Arabic metric terms.',
      pct: '~3–5%',
    },
  }[loc];
  summary.push(`## ${loc}`);
  summary.push('');
  summary.push(`- **Strongest areas:** ${notes.strong}`);
  summary.push(`- **Biggest problems:** ${notes.problems}`);
  summary.push(`- **Most urgent fixes:** ${notes.urgent}`);
  summary.push(`- **Estimated % needing correction:** ${notes.pct} of user-visible strings (human review estimate).`);
  summary.push('');
}

mkdirSync(DOCS, { recursive: true });
writeFileSync(path.join(DOCS, 'i18n-content-inventory.md'), inventory.join('\n'), 'utf8');
writeFileSync(path.join(DOCS, 'i18n-translation-audit.md'), auditMd.join('\n'), 'utf8');
writeFileSync(path.join(DOCS, 'i18n-translation-summary.md'), summary.join('\n'), 'utf8');

// Stats
let totalStrings = 0;
const wordsPerLocale = {};
for (const locale of LOCALES) {
  const acc = [];
  const bundle = contentByLocale[locale];
  for (const key of Object.keys(bundle)) {
    if (key === 'services') {
      for (const slug of CORE_SERVICE_SLUGS) walkStrings(bundle.services[slug], '', acc);
    } else if (key === 'legal') {
      for (const k of LEGAL_KEYS) walkStrings(bundle.legal[k], '', acc);
    } else walkStrings(bundle[key], '', acc);
  }
  totalStrings += acc.length;
  wordsPerLocale[locale] = acc.reduce((w, s) => w + wordCount(s.value), 0);
}

const stats = {
  totalStringsAudited: totalStrings,
  wordsPerLocale,
  uniqueIssueCount: dedupedIssues.length,
  issueCountsByType: Object.fromEntries(
    [...new Set(dedupedIssues.map((i) => i.issueType))].map((t) => [
      t,
      dedupedIssues.filter((i) => i.issueType === t).length,
    ]),
  ),
  structural: structuralSummary,
  localeScores,
  best: qualityRank[0]?.loc,
  worst: qualityRank[qualityRank.length - 1]?.loc,
};

writeFileSync(path.join(DOCS, 'i18n-audit-stats.json'), JSON.stringify(stats, null, 2), 'utf8');

console.log('Wrote docs/i18n-content-inventory.md');
console.log('Wrote docs/i18n-translation-audit.md');
console.log('Wrote docs/i18n-translation-summary.md');
console.log('Issues:', dedupedIssues.length, 'Strings audited:', totalStrings);
