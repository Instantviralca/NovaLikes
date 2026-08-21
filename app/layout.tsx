import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';

import { AnalyticsProvider } from '@/components/analytics';
import { LazyCartDrawer } from '@/components/commerce/cart/lazy-cart-drawer';
import { CartToastProvider } from '@/components/feedback/cart-toast';
import { I18nChromeProvider } from '@/components/i18n/i18n-chrome';
import { CartProvider } from '@/lib/cart';
import { CartUiProvider } from '@/lib/cart/cart-ui-context';
import { loadUi } from '@/lib/i18n/content/load';
import { HTML_LANG, LOCALE_DIR } from '@/lib/i18n/config';
import { getRequestLocale } from '@/lib/i18n/request-locale';
import { cn } from '@/lib/utils';
import { seoSiteConfig } from '@/config/seo';
import { titles } from '@/seo/titles';
import '@/styles/globals.css';

/**
 * Root metadata — Document 14.07.
 * metadataBase set once; page-level generateMetadata/metadata owns titles.
 */
export const metadata: Metadata = {
  metadataBase: new URL(seoSiteConfig.productionDomain),
  title: {
    default: titles.home(),
    template: seoSiteConfig.defaultTitleTemplate,
  },
  description: seoSiteConfig.defaultDescription,
};

type RootLayoutProps = {
  children: ReactNode;
};

/** Root layout — public chrome lives in route-group layouts so /admin stays clean. */
export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getRequestLocale();
  const ui = loadUi(locale);
  return (
    <html lang={HTML_LANG[locale]} dir={LOCALE_DIR[locale]} className={cn(GeistSans.variable)}>
      <body className={cn(GeistSans.className, 'antialiased')}>
        <I18nChromeProvider locale={locale} ui={ui}>
          <AnalyticsProvider>
            <CartProvider>
              <CartUiProvider>
                <CartToastProvider>
                  {children}
                  <LazyCartDrawer />
                </CartToastProvider>
              </CartUiProvider>
            </CartProvider>
          </AnalyticsProvider>
        </I18nChromeProvider>
      </body>
    </html>
  );
}
