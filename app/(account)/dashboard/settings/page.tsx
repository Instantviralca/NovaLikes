import type { Metadata } from 'next';

import { SettingsForm } from '@/components/account/settings-form';
import { getCustomerFromCookies, toCustomerPublic } from '@/lib/customers/session';

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardSettingsPage() {
  const customer = await getCustomerFromCookies();
  if (!customer) return null;
  return <SettingsForm customer={toCustomerPublic(customer)} />;
}
