import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';

import { AnalyticsProvider } from '@/components/analytics';
import { JsonLdScript } from '@/components/common/json-ld';
import { CartDrawer } from '@/components/commerce/cart/cart-drawer';
import { CartToastProvider } from '@/components/feedback/cart-toast';
import { CartProvider } from '@/lib/cart';
import { CartUiProvider } from '@/lib/cart/cart-ui-context';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { cn } from '@/lib/utils';
import { organizationSchema } from '@/schemas/organization';
import { websiteSchema } from '@/schemas/website';
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
export default function RootLayout({ children }: RootLayoutProps) {
  const graph = asJsonLdGraph([organizationSchema(), websiteSchema()]);

  return (
    <html lang="en" className={cn(GeistSans.variable)}>
      <body className={cn(GeistSans.className, 'antialiased')}>
        <JsonLdScript id="global-jsonld" data={graph} />
        <AnalyticsProvider>
          <CartProvider>
            <CartUiProvider>
              <CartToastProvider>
                {children}
                <CartDrawer />
              </CartToastProvider>
            </CartUiProvider>
          </CartProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
