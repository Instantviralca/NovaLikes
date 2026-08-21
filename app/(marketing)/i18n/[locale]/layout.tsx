import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { HtmlLang } from '@/components/i18n/html-lang';
import {
  HTML_LANG,
  LOCALIZED_LOCALES,
  LOCALE_DIR,
  type LocalizedLocale,
  isLocalizedLocale,
} from '@/lib/i18n/config';

type I18nLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALIZED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocalizedMarketingLayout({
  children,
  params,
}: I18nLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocalizedLocale(raw)) notFound();
  const locale = raw as LocalizedLocale;

  return (
    <div lang={HTML_LANG[locale]} dir={LOCALE_DIR[locale]}>
      <HtmlLang locale={locale} />
      {children}
    </div>
  );
}
