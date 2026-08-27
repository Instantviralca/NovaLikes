import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

import { getFaqPageContent } from '@/data/content/company';
import type { FAQCategoryMeta } from '@/data/faqs/categories';
import { selectMainFaqPageFaqs } from '@/lib/faqs/selection';
import {
  DEFAULT_LOCALE,
  type Locale,
  type LocalizedLocale,
  isLocalizedLocale,
} from '@/lib/i18n/config';
import { localizeHrefsDeep } from '@/lib/i18n/localize-hrefs';
import { overlayEnglishWithIssues, type OverlayIssue } from '@/lib/i18n/overlay';
import {
  getEnglishFaqItemsSource,
  getEnglishFaqPageSource,
  getEnglishHomepageSource,
  getEnglishMetadataSource,
  getEnglishServiceBundle,
  getEnglishUiSource,
  getEnglishAboutSource,
  getEnglishContactSource,
  getEnglishReviewsPageSource,
  getEnglishPrivacySource,
  getEnglishRefundSource,
  getEnglishTermsSource,
  getEnglishCookiesSource,
  getEnglishDisclaimerSource,
} from '@/lib/i18n/content/english-source';
import { getEnglishToolsBundle } from '@/lib/i18n/content/tools-english';
import { SERVICE_FAQ_IDS } from '@/lib/i18n/content/service-faq-ids';
import { getFaqItemsByIds } from '@/data/content/faq';
import { getAboutContent, getContactContent } from '@/data/content/company';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { CoreServiceSlug } from '@/lib/i18n/config';
import type { LocaleMetadataBundle } from '@/lib/i18n/metadata';
import type { HomepageHub } from '@/data/content/homepage-hub';
import type { PublicFaq } from '@/types/faq';
import type { AboutPageContent, ContactPageContent, FaqPageContent } from '@/types/content';
import { localizeHref } from '@/lib/i18n/paths';
import type {
  AboutPageOverlay,
  ContactPageOverlay,
  ReviewsPageOverlay,
} from '@/lib/i18n/content/company-english';
import type { LegalPolicyPageContent } from '@/types/legal';
import {
  getEnglishLegalSource,
  legalOverlayFile,
  type LegalOverlayKey,
} from '@/lib/i18n/content/legal-english';
import { getEnglishQuickAnswersSource } from '@/lib/i18n/content/quick-answers-english';
import { getLocalizedQuickAnswer } from '@/lib/i18n/content/quick-answers-locales';
import type { QuickAnswerPageId } from '@/data/quick-answers';

const overlayCache = new Map<string, unknown>();

function overlayPath(locale: LocalizedLocale, relative: string): string {
  return path.join(process.cwd(), 'content', 'locales', locale, relative);
}

export function readLocaleOverlay(locale: LocalizedLocale, relative: string): unknown {
  const key = `${locale}:${relative}`;
  if (overlayCache.has(key)) return overlayCache.get(key);
  const file = overlayPath(locale, relative);
  if (!existsSync(file)) {
    throw new Error(`Missing translation file: content/locales/${locale}/${relative}`);
  }
  const data = JSON.parse(readFileSync(file, 'utf8')) as unknown;
  overlayCache.set(key, data);
  return data;
}

export function assertCompleteOverlay(
  locale: LocalizedLocale,
  name: string,
  issues: OverlayIssue[],
): void {
  if (issues.length === 0) return;
  const sample = issues
    .slice(0, 12)
    .map((issue) => `${issue.path}: ${issue.message}`)
    .join('; ');
  throw new Error(
    `Incomplete ${locale} translations for ${name} (${issues.length} issues). ${sample}`,
  );
}

function overlayRequired<T>(
  locale: LocalizedLocale,
  name: string,
  english: T,
  overlay: unknown,
): T {
  const { value, issues } = overlayEnglishWithIssues(english, overlay);
  assertCompleteOverlay(locale, name, issues);
  return value;
}

export const loadHomepageHub = cache((locale: Locale): HomepageHub => {
  const english = getEnglishHomepageSource();
  if (!isLocalizedLocale(locale)) return english;
  const translated = overlayRequired(
    locale,
    'homepage',
    english,
    readLocaleOverlay(locale, 'homepage.json'),
  );
  return localizeHrefsDeep(translated, locale);
});

export type LocalizedFaqPage = ReturnType<typeof getEnglishFaqPageSource>;

export const loadFaqPageOverlay = cache((locale: Locale): LocalizedFaqPage => {
  const english = getEnglishFaqPageSource();
  if (!isLocalizedLocale(locale)) return english;
  const translated = overlayRequired(
    locale,
    'faq-page',
    english,
    readLocaleOverlay(locale, 'faq-page.json'),
  );
  return localizeHrefsDeep(translated, locale);
});

export function loadFaqPageContent(locale: Locale): FaqPageContent {
  const overlay = loadFaqPageOverlay(locale);
  const base = getFaqPageContent();
  return {
    ...base,
    hero: { ...base.hero, ...overlay.hero },
    search: overlay.search,
    categoriesTitle: overlay.categoriesTitle,
    refundPolicyCta: overlay.refundPolicyCta,
    finalCta: overlay.finalCta,
  };
}

export function loadFaqCategories(locale: Locale): FAQCategoryMeta[] {
  return loadFaqPageOverlay(locale).categories;
}

export const loadFaqItems = cache((locale: Locale): PublicFaq[] => {
  const englishItems = selectMainFaqPageFaqs();
  if (!isLocalizedLocale(locale)) return englishItems;

  const overlayItems = readLocaleOverlay(locale, 'faq-items.json');
  if (!Array.isArray(overlayItems)) {
    throw new Error(`faq-items.json for ${locale} must be an array`);
  }

  const overlayById = new Map<string, { question?: string; answer?: string }>();
  for (const item of overlayItems) {
    if (item && typeof item === 'object' && 'id' in item && typeof item.id === 'string') {
      overlayById.set(item.id, item as { question?: string; answer?: string });
    }
  }

  const issues: OverlayIssue[] = [];
  const items = englishItems.map((item) => {
    const overlay = overlayById.get(item.id);
    if (!overlay?.question?.trim() || !overlay.answer?.trim()) {
      issues.push({ path: item.id, message: 'Missing translated FAQ question/answer' });
      return item;
    }
    return {
      ...item,
      question: overlay.question,
      answer: overlay.answer,
    };
  });
  assertCompleteOverlay(locale, 'faq-items', issues);
  const withLocalizedHrefs = localizeHrefsDeep(items, locale);
  if (!isLocalizedLocale(locale)) return withLocalizedHrefs;

  const ui = loadUi(locale);
  const englishChipLabels: Record<string, string> = {
    'Instagram Followers': ui.footerServices['buy-instagram-followers'],
    'Instagram Likes': ui.footerServices['buy-instagram-likes'],
    'Instagram Views': ui.footerServices['buy-instagram-views'],
    'Instagram Comments': ui.footerServices['buy-instagram-comments'],
    'Tiktok Followers': ui.footerServices['buy-tiktok-followers'],
    'TikTok Followers': ui.footerServices['buy-tiktok-followers'],
    'Tiktok Likes': ui.footerServices['buy-tiktok-likes'],
    'TikTok Likes': ui.footerServices['buy-tiktok-likes'],
    'Tiktok Views': ui.footerServices['buy-tiktok-views'],
    'TikTok Views': ui.footerServices['buy-tiktok-views'],
    'Facebook Followers': ui.footerServices['buy-facebook-followers'],
    'Facebook Page Likes': ui.footerServices['buy-facebook-page-likes'],
    'Facebook Post Likes': ui.footerServices['buy-facebook-post-likes'],
  };
  const utilityLabels: Record<string, string> = {
    'Refund Policy': ui.footer.refundPolicy,
    'Track Order': ui.footer.trackOrder,
    Contact: ui.footer.contact,
  };

  return withLocalizedHrefs.map((item) => ({
    ...item,
    relatedLinks: item.relatedLinks.map((link) => {
      const idSlug = (
        Object.keys(ui.footerServices) as Array<keyof typeof ui.footerServices>
      ).find((key) => link.id.endsWith(`-${key}`));
      const fromId = idSlug ? ui.footerServices[idSlug] : undefined;
      const fromEnglish = englishChipLabels[link.label];
      const fromUtility = utilityLabels[link.label];
      return {
        ...link,
        label: fromId ?? fromEnglish ?? fromUtility ?? link.label,
      };
    }),
  }));
});

export type LocalizedServiceBundle = ReturnType<typeof getEnglishServiceBundle>;

export const loadServiceBundle = cache((locale: Locale, slug: CoreServiceSlug): LocalizedServiceBundle => {
  const english = getEnglishServiceBundle(slug);
  if (!isLocalizedLocale(locale)) return english;
  const translated = overlayRequired(
    locale,
    `services/${slug}`,
    english,
    readLocaleOverlay(locale, `services/${slug}.json`),
  );
  return localizeHrefsDeep(translated, locale);
});

export const loadUi = cache((locale: Locale): UiDictionary => {
  const english = getEnglishUiSource() as UiDictionary;
  if (!isLocalizedLocale(locale)) return english;
  return overlayRequired(locale, 'ui', english, readLocaleOverlay(locale, 'ui.json'));
});

export const loadMetadataBundle = cache((locale: Locale): LocaleMetadataBundle => {
  const english = getEnglishMetadataSource();
  if (!isLocalizedLocale(locale)) return english;
  return overlayRequired(
    locale,
    'metadata',
    english,
    readLocaleOverlay(locale, 'metadata.json'),
  );
});

export const loadServiceFaqItems = cache((locale: Locale, ids: string[]) => {
  const englishItems = getFaqItemsByIds(ids);
  if (!isLocalizedLocale(locale)) return englishItems;

  const overlayItems = readLocaleOverlay(locale, 'service-faqs.json');
  if (!Array.isArray(overlayItems)) {
    throw new Error(`service-faqs.json for ${locale} must be an array`);
  }

  const overlayById = new Map<string, { question?: string; answer?: string }>();
  for (const item of overlayItems) {
    if (item && typeof item === 'object' && 'id' in item && typeof item.id === 'string') {
      overlayById.set(item.id, item as { question?: string; answer?: string });
    }
  }

  const issues: OverlayIssue[] = [];
  const items = englishItems.map((item) => {
    const overlay = overlayById.get(item.id);
    if (!overlay?.question?.trim() || !overlay.answer?.trim()) {
      issues.push({ path: item.id, message: 'Missing translated service FAQ question/answer' });
      return item;
    }
    return {
      ...item,
      question: overlay.question,
      answer: overlay.answer,
    };
  });
  assertCompleteOverlay(locale, 'service-faqs', issues);
  return localizeHrefsDeep(items, locale);
});

export const loadToolsBundle = cache((locale: Locale) => {
  const english = getEnglishToolsBundle();
  if (!isLocalizedLocale(locale)) return english;
  const translated = overlayRequired(
    locale,
    'tools',
    english,
    readLocaleOverlay(locale, 'tools.json'),
  );
  return localizeHrefsDeep(translated, locale);
});

export const loadAboutPage = cache((locale: Locale): { content: AboutPageContent; chrome: AboutPageOverlay['chrome'] } => {
  const englishFull = getAboutContent();
  const englishOverlay = getEnglishAboutSource();
  if (!isLocalizedLocale(locale)) {
    return { content: englishFull, chrome: englishOverlay.chrome };
  }

  const overlay = overlayRequired(
    locale,
    'about',
    englishOverlay,
    readLocaleOverlay(locale, 'about.json'),
  );

  return {
    content: {
      ...englishFull,
      hero: {
        ...englishFull.hero,
        eyebrow: overlay.hero.eyebrow,
        title: overlay.hero.title,
        description: overlay.hero.description,
        trustLabels: overlay.hero.trustLabels,
        visual: englishFull.hero.visual
          ? { ...englishFull.hero.visual, alt: overlay.hero.visual.alt }
          : englishFull.hero.visual,
      },
      mission: {
        ...englishFull.mission,
        title: overlay.mission.title,
        description: overlay.mission.description,
      },
      whyChoose: {
        ...englishFull.whyChoose,
        title: overlay.whyChoose.title,
        description: overlay.whyChoose.description,
        items: englishFull.whyChoose.items.map((item, index) => ({
          ...item,
          title: overlay.whyChoose.items[index]?.title ?? item.title,
          description: overlay.whyChoose.items[index]?.description ?? item.description,
        })),
      },
      trust: {
        ...englishFull.trust,
        title: overlay.trust.title,
        description: overlay.trust.description,
        items: englishFull.trust.items.map((item, index) => ({
          ...item,
          title: overlay.trust.items[index]?.title ?? item.title,
        })),
      },
      finalCta: {
        ...englishFull.finalCta,
        title: overlay.finalCta.title,
        description: overlay.finalCta.description,
        primaryCta: {
          ...englishFull.finalCta.primaryCta,
          label: overlay.finalCta.primaryCta.label,
          href: localizeHref(englishFull.finalCta.primaryCta.href, locale),
        },
      },
    },
    chrome: overlay.chrome,
  };
});

export const loadContactPage = cache((locale: Locale): { content: ContactPageContent; chrome: ContactPageOverlay['chrome'] } => {
  const englishFull = getContactContent();
  const englishOverlay = getEnglishContactSource();
  if (!isLocalizedLocale(locale)) {
    return { content: englishFull, chrome: englishOverlay.chrome };
  }

  const overlay = overlayRequired(
    locale,
    'contact',
    englishOverlay,
    readLocaleOverlay(locale, 'contact.json'),
  );

  return {
    content: {
      ...englishFull,
      hero: {
        ...englishFull.hero,
        eyebrow: overlay.hero.eyebrow,
        title: overlay.hero.title,
        description: overlay.hero.description,
        trustLabels: overlay.hero.trustLabels,
        visual: englishFull.hero.visual
          ? { ...englishFull.hero.visual, alt: overlay.hero.visual.alt }
          : englishFull.hero.visual,
      },
      form: {
        ...englishFull.form,
        title: overlay.form.title,
        description: overlay.form.description,
        fields: overlay.form.fields,
      },
      business: {
        ...englishFull.business,
        title: overlay.business.title,
      },
      faqPreview: {
        ...englishFull.faqPreview,
        title: overlay.faqPreview.title,
        description: overlay.faqPreview.description,
        viewAllCta: {
          ...englishFull.faqPreview.viewAllCta,
          label: overlay.faqPreview.viewAllCta.label,
          href: localizeHref(englishFull.faqPreview.viewAllCta.href, locale),
        },
      },
      finalCta: {
        ...englishFull.finalCta,
        title: overlay.finalCta.title,
        description: overlay.finalCta.description,
        primaryCta: {
          ...englishFull.finalCta.primaryCta,
          label: overlay.finalCta.primaryCta.label,
        },
      },
    },
    chrome: overlay.chrome,
  };
});

export const loadReviewsPageCopy = cache((locale: Locale): ReviewsPageOverlay => {
  const english = getEnglishReviewsPageSource();
  if (!isLocalizedLocale(locale)) return english;
  return overlayRequired(
    locale,
    'reviews',
    english,
    readLocaleOverlay(locale, 'reviews.json'),
  );
});

export const loadLegalPage = cache(
  (locale: Locale, key: LegalOverlayKey): LegalPolicyPageContent => {
    const english = getEnglishLegalSource(key);
    if (!isLocalizedLocale(locale)) return english;
    const translated = overlayRequired(
      locale,
      legalOverlayFile(key),
      english,
      readLocaleOverlay(locale, legalOverlayFile(key)),
    );
    return localizeHrefsDeep(translated, locale);
  },
);

export function collectLocaleOverlayIssues(locale: LocalizedLocale): OverlayIssue[] {
  const groups: Array<[string, unknown, unknown]> = [
    ['homepage', getEnglishHomepageSource(), readOptional(locale, 'homepage.json')],
    ['faq-page', getEnglishFaqPageSource(), readOptional(locale, 'faq-page.json')],
    ['faq-items', getEnglishFaqItemsSource(), readOptional(locale, 'faq-items.json')],
    ['ui', getEnglishUiSource(), readOptional(locale, 'ui.json')],
    ['metadata', getEnglishMetadataSource(), readOptional(locale, 'metadata.json')],
    ['tools', getEnglishToolsBundle(), readOptional(locale, 'tools.json')],
    ['about', getEnglishAboutSource(), readOptional(locale, 'about.json')],
    ['contact', getEnglishContactSource(), readOptional(locale, 'contact.json')],
    ['reviews', getEnglishReviewsPageSource(), readOptional(locale, 'reviews.json')],
    ['privacy', getEnglishPrivacySource(), readOptional(locale, 'privacy.json')],
    ['refund', getEnglishRefundSource(), readOptional(locale, 'refund.json')],
    ['terms', getEnglishTermsSource(), readOptional(locale, 'terms.json')],
    ['cookies', getEnglishCookiesSource(), readOptional(locale, 'cookies.json')],
    ['disclaimer', getEnglishDisclaimerSource(), readOptional(locale, 'disclaimer.json')],
  ];

  for (const slug of [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
    'buy-instagram-comments',
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
    'buy-facebook-followers',
    'buy-facebook-page-likes',
    'buy-facebook-post-likes',
  ] as const) {
    groups.push([
      `services/${slug}`,
      getEnglishServiceBundle(slug),
      readOptional(locale, `services/${slug}.json`),
    ]);
  }

  const issues: OverlayIssue[] = [];
  for (const [name, english, overlay] of groups) {
    const result = overlayEnglishWithIssues(english, overlay, name);
    issues.push(...result.issues);
  }

  const serviceFaqOverlay = readOptional(locale, 'service-faqs.json');
  const overlayById = new Map<string, { question?: string; answer?: string }>();
  if (Array.isArray(serviceFaqOverlay)) {
    for (const item of serviceFaqOverlay) {
      if (item && typeof item === 'object' && 'id' in item && typeof item.id === 'string') {
        overlayById.set(item.id, item as { question?: string; answer?: string });
      }
    }
  } else if (serviceFaqOverlay !== undefined) {
    issues.push({ path: 'service-faqs', message: 'Expected translated array' });
  }
  for (const id of SERVICE_FAQ_IDS) {
    const overlay = overlayById.get(id);
    if (!overlay?.question?.trim() || !overlay.answer?.trim()) {
      issues.push({ path: `service-faqs.${id}`, message: 'Missing translated service FAQ question/answer' });
    }
  }

  return issues;
}

function readOptional(locale: LocalizedLocale, relative: string): unknown {
  const file = overlayPath(locale, relative);
  if (!existsSync(file)) return undefined;
  return JSON.parse(readFileSync(file, 'utf8')) as unknown;
}

export const loadQuickAnswer = cache(
  (locale: Locale, pageId: QuickAnswerPageId): string => {
    if (!isLocalizedLocale(locale)) {
      return getEnglishQuickAnswersSource()[pageId];
    }
    return getLocalizedQuickAnswer(locale, pageId);
  },
);

export { DEFAULT_LOCALE };
