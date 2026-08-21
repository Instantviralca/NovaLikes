import { DEFAULT_LOCALE, type Locale, type LocalizedLocale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';

/** Rewrite core internal hrefs inside a cloned content tree. */
export function localizeHrefsDeep<T>(value: T, locale: Locale): T {
  if (locale === DEFAULT_LOCALE) return value;
  return walk(value, locale) as T;
}

function walk(value: unknown, locale: Locale): unknown {
  if (typeof value === 'string') {
    if (value.startsWith('/') && !value.startsWith('//')) {
      const [path, hash] = value.split('#');
      const localized = localizeHref(path || '/', locale as LocalizedLocale | Locale);
      return hash ? `${localized}#${hash}` : localized;
    }
    return value.replace(/\]\((\/[^)]+)\)/g, (_full, href: string) => {
      const [path, hash] = href.split('#');
      const localized = localizeHref(path || '/', locale);
      return `](${hash ? `${localized}#${hash}` : localized})`;
    });
  }
  if (Array.isArray(value)) return value.map((item) => walk(item, locale));
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = walk(child, locale);
    }
    return result;
  }
  return value;
}
