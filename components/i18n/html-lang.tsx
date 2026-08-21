'use client';

import { useEffect } from 'react';

import { HTML_LANG, LOCALE_DIR, type Locale } from '@/lib/i18n/config';

export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
    document.documentElement.dir = LOCALE_DIR[locale];
    return () => {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [locale]);
  return null;
}
