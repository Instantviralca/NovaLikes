import { cache } from 'react';
import { headers } from 'next/headers';

import { DEFAULT_LOCALE, I18N_HEADER, I18N_PATH_HEADER, type Locale, isLocale } from '@/lib/i18n/config';
import { parseLocalePath } from '@/lib/i18n/paths';

export const getRequestLocale = cache(async (): Promise<Locale> => {
  const headerStore = await headers();
  const fromHeader = headerStore.get(I18N_HEADER);
  if (isLocale(fromHeader)) return fromHeader;
  const path = headerStore.get(I18N_PATH_HEADER);
  if (path) return parseLocalePath(path).locale;
  return DEFAULT_LOCALE;
});

export const getRequestPathname = cache(async (): Promise<string> => {
  const headerStore = await headers();
  return headerStore.get(I18N_PATH_HEADER) ?? '/';
});
