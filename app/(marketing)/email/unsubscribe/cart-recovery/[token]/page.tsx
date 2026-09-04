import type { Metadata } from 'next';

import {
  parsePublicIdFromToken,
  unsubscribeCartRecovery,
  verifyDerivedUnsubscribeToken,
} from '@/lib/cart-recovery';
import { getCartRecoverySessionByPublicId } from '@/lib/cart-recovery/store';

export const metadata: Metadata = {
  title: 'Cart reminder preferences',
  robots: { index: false, follow: false },
};

export default async function CartRecoveryUnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token: encodedToken } = await params;
  const token = decodeURIComponent(encodedToken);
  const publicId = parsePublicIdFromToken(token);
  const session = publicId ? await getCartRecoverySessionByPublicId(publicId) : null;
  const valid = Boolean(session && verifyDerivedUnsubscribeToken(session, token));

  if (session && valid) {
    await unsubscribeCartRecovery(session.id);
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-2xl font-semibold">Cart reminder preferences</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {valid
          ? 'You have been unsubscribed from cart reminder emails.'
          : 'This unsubscribe link is invalid.'}
      </p>
    </main>
  );
}
