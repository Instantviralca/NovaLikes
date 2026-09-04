/**
 * Link recovery sessions to orders and mark conversion on paid.
 */

import {
  findCartRecoverySessionByOrderId,
  findOpenCartRecoverySessionByEmail,
  getCartRecoverySessionByPublicId,
  saveCartRecoverySession,
  appendCartRecoveryEvent,
} from '@/lib/cart-recovery/store';
import { createCartRecoveryEventId } from '@/lib/cart-recovery/tokens';

export async function linkOrderToCartRecovery(input: {
  orderId: string;
  email: string;
  recoveryPublicId?: string | null;
}): Promise<void> {
  const email = input.email.trim().toLowerCase();
  let session = input.recoveryPublicId
    ? await getCartRecoverySessionByPublicId(input.recoveryPublicId)
    : null;
  if (!session) {
    session = await findOpenCartRecoverySessionByEmail(email);
  }
  if (!session) return;
  if (session.convertedAt) return;
  if (session.email !== email) return;

  const now = new Date().toISOString();
  await saveCartRecoverySession({
    ...session,
    orderId: input.orderId,
    status: session.status === 'abandoned' || session.status === 'active' ? 'recovered' : session.status,
    recoveredAt: session.recoveredAt ?? now,
    updatedAt: now,
  });
}

export async function markCartRecoveryConverted(input: {
  orderId: string;
  email?: string;
}): Promise<{ converted: boolean; duplicate: boolean }> {
  let session = await findCartRecoverySessionByOrderId(input.orderId);
  if (!session && input.email) {
    session = await findOpenCartRecoverySessionByEmail(input.email);
    if (session && !session.orderId) {
      // secondary signal only when order not linked yet
    } else if (session && session.orderId && session.orderId !== input.orderId) {
      session = null;
    }
  }
  if (!session) return { converted: false, duplicate: false };
  if (session.convertedAt || session.status === 'converted') {
    return { converted: false, duplicate: true };
  }

  const now = new Date().toISOString();
  await saveCartRecoverySession({
    ...session,
    orderId: input.orderId,
    status: 'converted',
    convertedAt: now,
    recoveredAt: session.recoveredAt ?? now,
    updatedAt: now,
  });
  await appendCartRecoveryEvent({
    id: createCartRecoveryEventId(),
    sessionId: session.id,
    type: 'converted',
    emailStep: null,
    idempotencyKey: `cart_recovery:${session.id}:converted`,
    providerMessageId: null,
    errorMessage: null,
    meta: { orderId: input.orderId },
    createdAt: now,
  });
  return { converted: true, duplicate: false };
}

export async function unsubscribeCartRecovery(sessionId: string): Promise<void> {
  const { getCartRecoverySessionById } = await import('@/lib/cart-recovery/store');
  const session = await getCartRecoverySessionById(sessionId);
  if (!session || session.unsubscribedAt) return;
  const now = new Date().toISOString();
  await saveCartRecoverySession({
    ...session,
    unsubscribedAt: now,
    updatedAt: now,
  });
  await appendCartRecoveryEvent({
    id: createCartRecoveryEventId(),
    sessionId: session.id,
    type: 'unsubscribed',
    emailStep: null,
    idempotencyKey: `cart_recovery:${session.id}:unsubscribed`,
    providerMessageId: null,
    errorMessage: null,
    meta: null,
    createdAt: now,
  });
}
