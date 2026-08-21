import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';
import { getSiteChrome } from '@/lib/i18n/site-chrome';

type CommerceLayoutProps = {
  children: ReactNode;
};

export default async function CommerceLayout({ children }: CommerceLayoutProps) {
  const chrome = await getSiteChrome();

  return (
    <SiteLayout illustrated={false} locale={chrome.locale} ui={chrome.ui}>
      {children}
    </SiteLayout>
  );
}
