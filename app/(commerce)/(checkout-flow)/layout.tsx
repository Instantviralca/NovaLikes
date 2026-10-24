import type { ReactNode } from 'react';

import { CheckoutShell } from '@/components/commerce/checkout/checkout-shell';
import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { I18nChromeProvider } from '@/components/i18n/i18n-chrome';
import { HtmlLang } from '@/components/i18n/html-lang';
import { HTML_LANG, LOCALE_DIR } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

import '@/components/site-v2/site-v2.css';

type CheckoutFlowLayoutProps = {
  children: ReactNode;
};

/**
 * Checkout-only chrome — no site nav/footer. URL stays `/checkout`.
 */
export default async function CheckoutFlowLayout({ children }: CheckoutFlowLayoutProps) {
  preloadHomeDisplayFont();
  const chrome = await getSiteChrome();
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  return (
    <I18nChromeProvider locale={chrome.locale} market={chrome.market} ui={chrome.ui}>
      <div
        lang={HTML_LANG[chrome.locale]}
        dir={LOCALE_DIR[chrome.locale]}
        className={cn('site-v2', fontClassName)}
      >
        <HtmlLang locale={chrome.locale} />
        <CheckoutShell>{children}</CheckoutShell>
      </div>
    </I18nChromeProvider>
  );
}
