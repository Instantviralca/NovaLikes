import type { Market } from '@/lib/market/config';
import { localizeMarketHref } from '@/lib/market/paths';

/** Rewrite core internal hrefs inside a cloned content tree for Canada pages. */
export function localizeMarketHrefsDeep<T>(value: T, market: Market): T {
  return walk(value, market) as T;
}

function walk(value: unknown, market: Market): unknown {
  if (typeof value === 'string') {
    if (value.startsWith('/') && !value.startsWith('//')) {
      const [path, hash] = value.split('#');
      const localized = localizeMarketHref(path || '/', market);
      return hash ? `${localized}#${hash}` : localized;
    }
    return value.replace(/\]\((\/[^)]+)\)/g, (_full, href: string) => {
      const [path, hash] = href.split('#');
      const localized = localizeMarketHref(path || '/', market);
      return `](${hash ? `${localized}#${hash}` : localized})`;
    });
  }
  if (Array.isArray(value)) return value.map((item) => walk(item, market));
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = walk(child, market);
    }
    return result;
  }
  return value;
}
