/**
 * Translation-Ready System — Document 16.07.
 * Prepares multilingual packaging without changing the canonical article workflow.
 */

import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

import { DEFAULT_LOCALE } from '@/config/constants';
import type { ArticleBrief } from '@/types/content-plan';
import type {
  LocaleIndex,
  LocaleIndexEntry,
  LocaleMap,
  LocaleTranslationEntry,
  TranslatableFields,
  TranslationPackage,
  TranslationStatus,
  TranslationValidationIssue,
} from '@/types/content-translation';

/** Canonical source locale for all Learn packages. */
export const CANONICAL_CONTENT_LOCALE = DEFAULT_LOCALE;

/**
 * Planned locales for future expansion.
 * Only the canonical locale is treated as live; others stay disabled in hreflang.
 */
export const PLANNED_CONTENT_LOCALES = ['en', 'fr'] as const;

export type PlannedContentLocale = (typeof PLANNED_CONTENT_LOCALES)[number];

const HREFLANG_NOTE =
  'Do not emit hreflang tags in production until genuine alternate-language pages exist.';

export function fingerprintTranslatableFields(fields: TranslatableFields): string {
  const normalized = JSON.stringify(fields, Object.keys(fields).sort());
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

export function buildCanonicalFields(brief: ArticleBrief): TranslatableFields {
  return {
    title: brief.workingTitle,
    metaTitle: `${brief.workingTitle} | Learn | NovaLikes`,
    metaDescription: brief.shortAnswer.slice(0, 160),
    slug: brief.slug,
    articleBody: '',
    faqs: brief.faqOpportunities,
    imageAltText: `${brief.workingTitle} — NovaLikes Learn featured image`,
    socialPosts: '',
    newsletterCopy: brief.shortAnswer,
  };
}

export function buildLocaleMap(brief: ArticleBrief): LocaleMap {
  return {
    slug: brief.slug,
    canonicalLocale: CANONICAL_CONTENT_LOCALE,
    hreflang: PLANNED_CONTENT_LOCALES.map((locale) => ({
      locale,
      hreflang: locale,
      pathTemplate:
        locale === CANONICAL_CONTENT_LOCALE
          ? '/learn/{slug}'
          : `/${locale.split('-')[0]}/learn/{slug}`,
      enabled: locale === CANONICAL_CONTENT_LOCALE,
    })),
    note: HREFLANG_NOTE,
  };
}

export function createTranslationPackage(
  brief: ArticleBrief,
  options: {
    existing?: TranslationPackage | null;
    now?: string;
  } = {},
): TranslationPackage {
  const canonicalFields = buildCanonicalFields(brief);
  const sourceFingerprint = fingerprintTranslatableFields(canonicalFields);
  const now = options.now ?? new Date().toISOString();
  const locales: Record<string, LocaleTranslationEntry> = {};

  for (const locale of PLANNED_CONTENT_LOCALES) {
    const prior = options.existing?.locales[locale];
    if (locale === CANONICAL_CONTENT_LOCALE) {
      locales[locale] = {
        locale,
        status: prior?.status === 'Published' ? 'Published' : 'In Progress',
        fields: canonicalFields,
        sourceFingerprint,
        updatedAt: now,
        notes: prior?.notes,
      };
      continue;
    }

    if (!prior) {
      locales[locale] = {
        locale,
        status: 'Not Started',
        fields: {},
        sourceFingerprint: null,
        updatedAt: null,
      };
      continue;
    }

    const outdated =
      prior.sourceFingerprint != null &&
      prior.sourceFingerprint !== sourceFingerprint &&
      (prior.status === 'Reviewed' ||
        prior.status === 'Published' ||
        prior.status === 'In Progress');

    locales[locale] = {
      ...prior,
      status: outdated ? 'Needs Update' : prior.status,
    };
  }

  return {
    slug: brief.slug,
    canonicalLocale: CANONICAL_CONTENT_LOCALE,
    sourceFingerprint,
    locales,
  };
}

export function detectOutdatedTranslations(
  pkg: TranslationPackage,
): PlannedContentLocale[] {
  const outdated: PlannedContentLocale[] = [];
  for (const locale of PLANNED_CONTENT_LOCALES) {
    if (locale === pkg.canonicalLocale) continue;
    const entry = pkg.locales[locale];
    if (!entry) continue;
    if (entry.status === 'Needs Update') {
      outdated.push(locale);
      continue;
    }
    if (
      entry.sourceFingerprint &&
      entry.sourceFingerprint !== pkg.sourceFingerprint &&
      entry.status !== 'Not Started'
    ) {
      outdated.push(locale);
    }
  }
  return outdated;
}

function looksMixedLanguage(text: string): boolean {
  // Heuristic: French diacritics mixed into an English-primary string with common EN glue.
  const hasFrenchMarks = /[àâäéèêëïîôùûüçœæ]/i.test(text);
  const hasEnglishGlue = /\b(the|and|with|your|how to|learn)\b/i.test(text);
  return hasFrenchMarks && hasEnglishGlue && text.split(/\s+/).length > 8;
}

export function validateTranslation(
  pkg: TranslationPackage,
  localeMap?: LocaleMap,
): TranslationValidationIssue[] {
  const issues: TranslationValidationIssue[] = [];
  const map = localeMap ?? {
    slug: pkg.slug,
    canonicalLocale: pkg.canonicalLocale,
    hreflang: [],
    note: HREFLANG_NOTE,
  };

  if (!map.hreflang.length) {
    issues.push({
      severity: 'error',
      code: 'missing_hreflang_mapping',
      message: 'locale-map.json must include hreflang mappings.',
    });
  }

  const localizedSlugs = new Map<string, string>();

  for (const [locale, entry] of Object.entries(pkg.locales)) {
    const requiredWhenActive: Array<keyof TranslatableFields> = [
      'title',
      'metaTitle',
      'metaDescription',
      'slug',
    ];

    const activeStatuses: TranslationStatus[] = [
      'In Progress',
      'Reviewed',
      'Published',
      'Needs Update',
    ];

    if (activeStatuses.includes(entry.status)) {
      for (const key of requiredWhenActive) {
        const value = entry.fields[key];
        const empty =
          value == null ||
          (typeof value === 'string' && !value.trim()) ||
          (Array.isArray(value) && value.length === 0);
        if (empty && locale !== pkg.canonicalLocale) {
          issues.push({
            severity: 'error',
            code: 'missing_translated_field',
            locale,
            field: key,
            message: `Locale ${locale} (${entry.status}) is missing translated "${key}".`,
          });
        }
      }
    }

    const slugValue = entry.fields.slug;
    if (typeof slugValue === 'string' && slugValue.trim()) {
      const prior = localizedSlugs.get(slugValue);
      if (prior && prior !== locale) {
        issues.push({
          severity: 'blocker',
          code: 'duplicate_localized_slug',
          locale,
          field: 'slug',
          message: `Localized slug "${slugValue}" is already used by ${prior}.`,
        });
      }
      localizedSlugs.set(slugValue, locale);
    }

    for (const [key, value] of Object.entries(entry.fields)) {
      if (typeof value !== 'string') continue;
      if (looksMixedLanguage(value)) {
        issues.push({
          severity: 'warning',
          code: 'mixed_language_content',
          locale,
          field: key,
          message: `Possible mixed-language content in ${locale}.${key}.`,
        });
      }
      if (
        typeof value === 'string' &&
        /\]\(\/learn\/[^)]+\)/.test(value) === false &&
        /href=["']\/learn\//.test(value)
      ) {
        // reserved for HTML-ish bodies
      }
      if (
        typeof value === 'string' &&
        /\[[^\]]+\]\(\s*\)/.test(value)
      ) {
        issues.push({
          severity: 'error',
          code: 'broken_internal_link',
          locale,
          field: key,
          message: `Broken markdown link in ${locale}.${key}.`,
        });
      }
    }
  }

  for (const locale of detectOutdatedTranslations(pkg)) {
    issues.push({
      severity: 'warning',
      code: 'outdated_translation_status',
      locale,
      message: `Translation for ${locale} is outdated relative to the canonical source.`,
    });
  }

  const enabledHreflang = map.hreflang.filter((h) => h.enabled);
  if (enabledHreflang.some((h) => h.locale !== pkg.canonicalLocale)) {
    issues.push({
      severity: 'blocker',
      code: 'premature_hreflang',
      message:
        'Non-canonical hreflang entries must stay disabled until alternate pages exist.',
    });
  }

  return issues;
}

export function writeTranslationFiles(
  packageAbsDir: string,
  brief: ArticleBrief,
): { written: string[]; pkg: TranslationPackage; localeMap: LocaleMap } {
  const i18nDir = path.join(packageAbsDir, 'assets', 'i18n');
  mkdirSync(i18nDir, { recursive: true });

  const translationsPath = path.join(i18nDir, 'translations.json');
  let existing: TranslationPackage | null = null;
  if (existsSync(translationsPath)) {
    try {
      existing = JSON.parse(readFileSync(translationsPath, 'utf8')) as TranslationPackage;
    } catch {
      existing = null;
    }
  }

  const pkg = createTranslationPackage(brief, { existing });
  const localeMap = buildLocaleMap(brief);

  writeFileSync(translationsPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  const localeMapPath = path.join(i18nDir, 'locale-map.json');
  writeFileSync(localeMapPath, `${JSON.stringify(localeMap, null, 2)}\n`, 'utf8');

  return {
    written: [translationsPath, localeMapPath],
    pkg,
    localeMap,
  };
}

export function buildLocaleIndex(options: { cwd?: string } = {}): LocaleIndex {
  const cwd = options.cwd ?? process.cwd();
  const contentRoot = path.join(cwd, 'content');
  const entries: LocaleIndexEntry[] = [];

  if (!existsSync(contentRoot)) {
    return {
      generatedAt: new Date().toISOString(),
      canonicalLocale: CANONICAL_CONTENT_LOCALE,
      count: 0,
      entries: [],
    };
  }

  for (const folder of readdirSync(contentRoot, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    if (folder.name.startsWith('_') || folder.name === 'assets') continue;
    const platformDir = path.join(contentRoot, folder.name);
    for (const article of readdirSync(platformDir, { withFileTypes: true })) {
      if (!article.isDirectory()) continue;
      const translationsPath = path.join(
        platformDir,
        article.name,
        'assets',
        'i18n',
        'translations.json',
      );
      if (!existsSync(translationsPath)) continue;
      try {
        const pkg = JSON.parse(
          readFileSync(translationsPath, 'utf8'),
        ) as TranslationPackage;
        const outdated = new Set(detectOutdatedTranslations(pkg));
        entries.push({
          slug: pkg.slug,
          platformFolder: folder.name,
          canonicalLocale: pkg.canonicalLocale,
          sourceFingerprint: pkg.sourceFingerprint,
          locales: Object.values(pkg.locales).map((entry) => ({
            locale: entry.locale,
            status: entry.status,
            outdated: outdated.has(entry.locale as PlannedContentLocale),
          })),
        });
      } catch {
        // Skip unreadable packages; QA will surface them separately.
      }
    }
  }

  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  const index: LocaleIndex = {
    generatedAt: new Date().toISOString(),
    canonicalLocale: CANONICAL_CONTENT_LOCALE,
    count: entries.length,
    entries,
  };

  writeFileSync(
    path.join(contentRoot, 'locale-index.json'),
    `${JSON.stringify(index, null, 2)}\n`,
    'utf8',
  );

  return index;
}
