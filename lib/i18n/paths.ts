import {
  DEFAULT_LOCALE,
  HREFLANG,
  I18N_INTERNAL_PREFIX,
  LOCALIZED_LOCALES,
  LOCALES,
  type Locale,
  type LocalizedLocale,
  isCoreLocalizedPath,
  isEnglishOnlyLearnPath,
  isLocalizedLocale,
  isLocale,
} from '@/lib/i18n/config';
import {
  decodePathname,
  englishPathFromPageKey,
  localizedPath,
  pageKeyFromEnglishPath,
  resolveSlugToPageKey,
} from '@/lib/i18n/slugs';
import { normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';

export type ParsedLocalePath = {
  locale: Locale;
  /** English unprefixed path (`/`, `/faq`, `/buy-instagram-followers`). */
  pathname: string;
};

const PREFIXES = LOCALIZED_LOCALES.slice().sort((a, b) => b.length - a.length);

export function publicPathsEqual(a: string, b: string): boolean {
  return normalizeCanonicalPath(decodePathname(a)) === normalizeCanonicalPath(decodePathname(b));
}

/**
 * Split a public pathname into locale + English page path.
 * Localized slugs and legacy English slugs both resolve to the same page key.
 */
export function parseLocalePath(rawPath: string): ParsedLocalePath {
  const pathname = normalizeCanonicalPath(decodePathname(rawPath));

  for (const prefix of PREFIXES) {
    if (pathname === `/${prefix}`) {
      return { locale: prefix, pathname: '/' };
    }
    if (pathname.startsWith(`/${prefix}/`)) {
      const rest = pathname.slice(prefix.length + 1);
      const restPath = rest.startsWith('/') ? rest : `/${rest}`;
      const key = resolveSlugToPageKey(prefix, restPath);
      return {
        locale: prefix,
        pathname: key ? englishPathFromPageKey(key) : restPath,
      };
    }
  }

  return { locale: DEFAULT_LOCALE, pathname };
}

export function stripLocalePrefix(path: string): string {
  return parseLocalePath(path).pathname;
}

export function getLocaleFromPath(path: string): Locale {
  return parseLocalePath(path).locale;
}

/**
 * Resolve a page (English or already-localized) into the destination locale's
 * final permalink. Non-core paths stay on their English URLs.
 */
export function localizeHref(path: string, locale: Locale): string {
  const parsed = parseLocalePath(path);
  const bare = parsed.pathname;

  if (!isCoreLocalizedPath(bare)) {
    return bare;
  }

  const key = pageKeyFromEnglishPath(bare);
  if (!key) return bare;
  return localizedPath(locale, key);
}

export function localizedInternalPath(locale: LocalizedLocale, pathname: string): string {
  const bare = pathname === '/' ? '' : pathname;
  return `${I18N_INTERNAL_PREFIX}/${locale}${bare}`;
}

export function isInternalI18nPath(pathname: string): boolean {
  return (
    pathname === I18N_INTERNAL_PREFIX || pathname.startsWith(`${I18N_INTERNAL_PREFIX}/`)
  );
}

/**
 * Unknown or duplicate locale prefixes that must not index as English clones.
 * `/en`, `/ES`, `/spanish` etc.
 */
export function isBlockedLocaleAlias(pathname: string): boolean {
  const first = pathname.split('/').filter(Boolean)[0];
  if (!first) return false;
  const lower = first.toLowerCase();
  if (lower === 'en' || lower === 'eng' || lower === 'english') return true;
  if (lower === 'spanish' || lower === 'deutsch' || lower === 'francais' || lower === 'français')
    return true;
  if (lower === 'pt' || lower === 'pt-pt' || lower === 'pt_br' || lower === 'ptbr') return true;
  if (lower === 'arabic') return true;
  if (first !== lower && isLocalizedLocale(lower)) return true;
  return false;
}

/**
 * Uppercase locale prefixes redirect in one hop to the final localized URL
 * (including translated slugs), never via the old English-slug URL.
 */
export function localeCaseRedirectTarget(pathname: string): string | null {
  const decoded = decodePathname(pathname);
  const segments = decoded.split('/').filter(Boolean);
  const first = segments[0];
  if (!first) return null;
  const lower = first.toLowerCase();
  if (lower === first) return null;
  if (!isLocalizedLocale(lower)) return null;
  const rest = segments.slice(1).join('/');
  const restPath = rest ? `/${rest}` : '/';
  const key = resolveSlugToPageKey(lower, restPath);
  if (key) return localizedPath(lower, key);
  if (isEnglishOnlyLearnPath(restPath)) return restPath;
  return rest ? `/${lower}/${rest}` : `/${lower}`;
}

/**
 * Locale-prefixed Learn URLs are not published. Redirect one hop to English Learn.
 * `/es/learn/slug` → `/learn/slug`
 */
export function localePrefixedLearnRedirectTarget(pathname: string): string | null {
  const parsed = parseLocalePath(pathname);
  if (!isLocalizedLocale(parsed.locale)) return null;
  if (!isEnglishOnlyLearnPath(parsed.pathname)) return null;
  return parsed.pathname;
}

/**
 * Language switcher destination. Learn has no translations, so leaving English
 * goes to the locale homepage instead of a fake `/es/learn/...` URL.
 */
export function localeSwitcherHref(pathname: string, locale: Locale): string {
  const bare = stripLocalePrefix(pathname);
  if (isEnglishOnlyLearnPath(bare) && locale !== DEFAULT_LOCALE) {
    return localizeHref('/', locale);
  }
  return localizeHref(bare, locale);
}

export function allLocaleHrefs(pathname: string): Record<Locale, string> {
  const bare = stripLocalePrefix(pathname);
  const result = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    result[locale] = localizeHref(bare, locale);
  }
  return result;
}

export function hreflangMap(pathname: string): Record<string, string> {
  const bare = stripLocalePrefix(pathname);
  if (isEnglishOnlyLearnPath(bare)) {
    return { en: bare };
  }
  const hrefs = allLocaleHrefs(pathname);
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[HREFLANG[locale]] = hrefs[locale];
  }
  map['x-default'] = hrefs.en;
  return map;
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unknown locale: ${value}`);
  }
  return value;
}
