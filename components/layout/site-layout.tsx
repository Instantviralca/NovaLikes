import type { ReactNode } from 'react';

import { HtmlLang } from '@/components/i18n/html-lang';
import { I18nChromeProvider } from '@/components/i18n/i18n-chrome';
import { IllustratedMain } from '@/components/layout/illustrated-surface';
import { WhatsAppFloatButton } from '@/components/layout/whatsapp-float-button';
import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { HTML_LANG, LOCALE_DIR, type Locale, DEFAULT_LOCALE } from '@/lib/i18n/config';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';

type SiteLayoutProps = {
  children: ReactNode;
  className?: string;
  /** Cream wash + doodles. Off for cart/checkout so commerce chrome stays unchanged. */
  illustrated?: boolean;
  locale?: Locale;
  market?: Market | null;
  ui?: UiDictionary;
};

export function SiteLayout({
  children,
  className,
  illustrated = true,
  locale = DEFAULT_LOCALE,
  market = null,
  ui = ENGLISH_UI as UiDictionary,
}: SiteLayoutProps) {
  return (
    <I18nChromeProvider locale={locale} market={market} ui={ui}>
      <div
        lang={HTML_LANG[locale]}
        dir={LOCALE_DIR[locale]}
        className={cn(
          'flex min-h-screen flex-col text-foreground',
          illustrated ? 'bg-[#FFFBFA]' : 'bg-background',
          className,
        )}
      >
        <HtmlLang locale={locale} />
        <Navbar locale={locale} market={market} ui={ui} />
        {illustrated ? (
          <IllustratedMain>{children}</IllustratedMain>
        ) : (
          <main className="flex-1">{children}</main>
        )}
        <Footer locale={locale} market={market} ui={ui} />
        <WhatsAppFloatButton />
      </div>
    </I18nChromeProvider>
  );
}
