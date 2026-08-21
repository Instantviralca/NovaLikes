'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { getLocaleFromPath, localizeHref, parseLocalePath } from '@/lib/i18n/paths';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';

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
  return parseLocalePath(pathname).pathname;
}

type LocaleLinkProps = ComponentProps<typeof Link>;

/** Prefixes core commercial hrefs with the active locale. */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = useActiveLocale();
  const raw = typeof href === 'string' ? href : href.pathname || '/';
  const localized = locale === DEFAULT_LOCALE ? raw : localizeHref(raw, locale);
  return <Link href={localized} {...props} />;
}
