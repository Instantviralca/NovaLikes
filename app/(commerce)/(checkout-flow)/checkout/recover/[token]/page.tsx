import type { Metadata } from 'next';

import { CartRecoveryRestoreClient } from '@/components/commerce/checkout/cart-recovery-restore-client';
import { restoreCartFromRecoveryToken } from '@/lib/cart-recovery';

export const metadata: Metadata = {
  title: 'Restore your order',
  robots: { index: false, follow: false },
};

export default async function RecoverCartPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await restoreCartFromRecoveryToken(decodeURIComponent(token));

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-2xl font-semibold">Restore your order</h1>
      <div className="mt-4">
        {result.ok ? (
          <CartRecoveryRestoreClient cart={result.cart} publicId={result.session.publicId} />
        ) : (
          <p className="text-sm text-destructive">{result.error}</p>
        )}
      </div>
    </main>
  );
}
