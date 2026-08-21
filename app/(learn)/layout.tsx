import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';
import { SiteJsonLd } from '@/components/seo/site-json-ld';
import { getSiteChrome } from '@/lib/i18n/site-chrome';

type LearnLayoutProps = {
  children: ReactNode;
};

export default async function LearnLayout({ children }: LearnLayoutProps) {
  const chrome = await getSiteChrome();
  return (
    <>
      <SiteJsonLd />
      <SiteLayout locale={chrome.locale} ui={chrome.ui}>
        {children}
      </SiteLayout>
    </>
  );
}
