'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import { localeCookieHeader } from '@/lib/i18n/locale-cookie';

type I18nChromeValue = {
  locale: Locale;
  ui: UiDictionary;
};

const I18nChromeContext = createContext<I18nChromeValue>({
  locale: DEFAULT_LOCALE,
  ui: ENGLISH_UI as UiDictionary,
});

export function I18nChromeProvider({
  locale,
  ui,
  children,
}: I18nChromeValue & { children: ReactNode }) {
  useEffect(() => {
    document.cookie = localeCookieHeader(locale);
  }, [locale]);

  return (
    <I18nChromeContext.Provider value={{ locale, ui }}>{children}</I18nChromeContext.Provider>
  );
}

export function useI18nChrome(): I18nChromeValue {
  return useContext(I18nChromeContext);
}
