import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';

export default function AccountRootLayout({ children }: { children: ReactNode }) {
  return <SiteLayout illustrated>{children}</SiteLayout>;
}
