/**
 * Public locale configuration — language localization only (no country pages).
 * English is the unprefixed default and remains the content source of truth.
 */

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALIZED_LOCALES = ['es', 'de', 'fr', 'it', 'pt-br', 'ar'] as const;

export const LOCALES = [DEFAULT_LOCALE, ...LOCALIZED_LOCALES] as const;

export type DefaultLocale = typeof DEFAULT_LOCALE;
export type LocalizedLocale = (typeof LOCALIZED_LOCALES)[number];
export type Locale = (typeof LOCALES)[number];

export const LOCALE_PREFIXES: Record<LocalizedLocale, string> = {
  es: 'es',
  de: 'de',
  fr: 'fr',
  it: 'it',
  'pt-br': 'pt-br',
  ar: 'ar',
};

/** HTML lang / hreflang codes. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  it: 'it',
  'pt-br': 'pt-BR',
  ar: 'ar',
};

export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  it: 'it',
  'pt-br': 'pt-BR',
  ar: 'ar',
};

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  'pt-br': 'pt_BR',
  ar: 'ar_AR',
};

export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  es: 'ltr',
  de: 'ltr',
  fr: 'ltr',
  it: 'ltr',
  'pt-br': 'ltr',
  ar: 'rtl',
};

/** Native names for the language selector (never locale codes as primary labels). */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  'pt-br': 'Português (Brasil)',
  ar: 'العربية',
};

/** Compact trigger labels for the header language switcher. */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  it: 'IT',
  'pt-br': 'PT',
  ar: 'AR',
};

export const CORE_SERVICE_SLUGS = [
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
] as const;

export type CoreServiceSlug = (typeof CORE_SERVICE_SLUGS)[number];

export const TOOL_SLUGS = [
  'instagram-profile-picture-viewer',
  'instagram-follower-counter',
  'instagram-profile-viewer',
  'instagram-video-downloader',
  'tiktok-video-downloader',
  'tiktok-profile-picture-downloader',
  'facebook-video-downloader',
  'facebook-reels-downloader',
] as const;

export type ToolPageSlug = (typeof TOOL_SLUGS)[number];

const TOOL_SLUG_SET = new Set<string>(TOOL_SLUGS);

export const CORE_PAGE_KEYS = [
  'homepage',
  'faq',
  ...CORE_SERVICE_SLUGS,
] as const;

export type CorePageKey = (typeof CORE_PAGE_KEYS)[number];

const LOCALIZED_SET = new Set<string>(LOCALIZED_LOCALES);
const CORE_SLUG_SET = new Set<string>(CORE_SERVICE_SLUGS);

export const I18N_HEADER = 'x-nl-locale';
export const I18N_PATH_HEADER = 'x-nl-pathname';
export const I18N_INTERNAL_PREFIX = '/i18n';

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && (value === DEFAULT_LOCALE || LOCALIZED_SET.has(value)));
}

export function isLocalizedLocale(
  value: string | null | undefined,
): value is LocalizedLocale {
  return Boolean(value && LOCALIZED_SET.has(value));
}

export function isCoreServiceSlug(slug: string): slug is CoreServiceSlug {
  return CORE_SLUG_SET.has(slug);
}

export function isToolSlug(slug: string): slug is ToolPageSlug {
  return TOOL_SLUG_SET.has(slug);
}

export function isCoreLocalizedPath(pathname: string): boolean {
  const normalized = pathname === '' ? '/' : pathname;
  if (normalized === '/' || normalized === '/faq') return true;
  if (normalized === '/about' || normalized === '/contact' || normalized === '/reviews') {
    return true;
  }
  if (
    normalized === '/privacy-policy' ||
    normalized === '/refund-policy' ||
    normalized === '/terms-and-conditions' ||
    normalized === '/cookie-policy' ||
    normalized === '/disclaimer'
  ) {
    return true;
  }
  if (normalized.startsWith('/buy-')) {
    return isCoreServiceSlug(normalized.slice(1));
  }
  if (normalized === '/tools') return true;
  if (normalized.startsWith('/tools/')) {
    return isToolSlug(normalized.slice('/tools/'.length));
  }
  return false;
}

/** Learn is English-only: no localized hub or article routes. */
export function isEnglishOnlyLearnPath(pathname: string): boolean {
  const normalized = pathname === '' ? '/' : pathname;
  return normalized === '/learn' || normalized.startsWith('/learn/');
}
