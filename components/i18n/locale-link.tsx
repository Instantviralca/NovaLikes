'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { getLocaleFromPath, parseLocalePath } from '@/lib/i18n/paths';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import type { Market } from '@/lib/market/config';
import { getBareCorePath, getMarketFromPath, resolvePublicHref } from '@/lib/market/paths';

export function useActiveLocale(): Locale {
  const pathname = usePathname() || '/';
  const fromPath = getLocaleFromPath(pathname);
  const { locale } = useI18nChrome();
  if (fromPath !== DEFAULT_LOCALE) return fromPath;
  return locale;
}

export function useBarePathname(): string {
  const pathname = usePathname() || '/';
  if (pathname.startsWith('/i18n/')) {
    const parts = pathname.split('/').filter(Boolean).slice(1);
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return getBareCorePath(pathname);
}

export function useActiveMarket(): Market | null {
  const pathname = usePathname() || '/';
  return getMarketFromPath(pathname);
}

export function useResolvePublicHref() {
  const locale = useActiveLocale();
  const market = useActiveMarket();
  return (path: string) => resolvePublicHref(path, { locale, market });
}

type LocaleLinkProps = ComponentProps<typeof Link>;

/** Prefixes core commercial hrefs with the active locale and geo market. */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const resolveHref = useResolvePublicHref();
  const raw = typeof href === 'string' ? href : href.pathname || '/';
  return <Link href={resolveHref(raw)} {...props} />;
}
