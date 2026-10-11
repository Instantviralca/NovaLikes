import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { DashboardShell } from '@/components/account/dashboard-shell';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import { isDbReady } from '@/lib/customers/ready';
import { getCustomerFromCookies } from '@/lib/customers/session';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!isDbReady()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-sm text-muted-foreground">
        {ACCOUNT_COPY.unavailable}
      </div>
    );
  }
  const customer = await getCustomerFromCookies();
  if (!customer) {
    // Stale edge-valid cookies without a DB session land here; send to login
    // (login/signup pages use full DB resolve, so this cannot bounce).
    redirect('/login?next=/dashboard');
  }
  return <DashboardShell>{children}</DashboardShell>;
}
