import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CheckoutPage } from '@/components/commerce/checkout';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { checkoutMetadata } from '@/seo/metadata';

export const metadata: Metadata = checkoutMetadata();

export default async function CheckoutRoutePage() {
  const customer = await getCustomerFromCookies();
  return (
    <Suspense fallback={<p className="p-6 text-sm text-muted-foreground">Loading checkout…</p>}>
      <CheckoutPage signedInEmail={customer?.email ?? null} />
    </Suspense>
  );
}
