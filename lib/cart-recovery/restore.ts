/**
 * Validate recovery token and build a safe cart restore payload.
 * Server re-prices via existing package catalog — never trusts snapshot prices blindly for charge.
 */

import { getPackageById } from '@/data/pricing/packages';
import {
  appendCartRecoveryEvent,
  getCartRecoverySessionByPublicId,
  saveCartRecoverySession,
} from '@/lib/cart-recovery/store';
import {
  createCartRecoveryEventId,
  parsePublicIdFromToken,
  verifyDerivedRecoveryToken,
} from '@/lib/cart-recovery/tokens';
import type { CartItem, CartState } from '@/types/cart';
import type { CartRecoverySession } from '@/types/cart-recovery';
import { createCartItemId } from '@/lib/cart/utils';

export type CartRecoveryRestoreResult =
  | {
      ok: true;
      session: CartRecoverySession;
      cart: CartState;
      checkout: {
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
      };
    }
  | { ok: false; error: string; code: 'invalid' | 'expired' | 'converted' | 'empty' };

export async function restoreCartFromRecoveryToken(
  rawToken: string,
): Promise<CartRecoveryRestoreResult> {
  const publicId = parsePublicIdFromToken(rawToken);
  if (!publicId) return { ok: false, error: 'Invalid recovery link.', code: 'invalid' };

  const session = await getCartRecoverySessionByPublicId(publicId);
  if (!session || !verifyDerivedRecoveryToken(session, rawToken)) {
    return { ok: false, error: 'Invalid recovery link.', code: 'invalid' };
  }

  if (session.status === 'converted' || session.convertedAt) {
    return { ok: false, error: 'This cart was already completed.', code: 'converted' };
  }
  if (session.status === 'expired' || new Date(session.expiresAt).getTime() < Date.now()) {
    return { ok: false, error: 'This recovery link has expired.', code: 'expired' };
  }
  if (session.unsubscribedAt) {
    // Still allow restore — unsubscribe only stops emails.
  }

  const items: CartItem[] = [];
  for (const snap of session.cartSnapshot.items) {
    const pkg = getPackageById(snap.packageId);
    if (!pkg) continue;
    items.push({
      id: createCartItemId(),
      packageId: pkg.id,
      serviceId: pkg.serviceId,
      serviceSlug: snap.serviceSlug,
      serviceName: snap.serviceName,
      platformId: snap.platformId,
      packageTitle: pkg.title,
      quantity: pkg.quantity,
      quantityLabel: pkg.quantityLabel,
      // Current catalog price is source of truth (anti-tamper).
      unitPrice: pkg.price,
      currency: pkg.currency,
      deliveryTime: pkg.deliveryTime,
      configuration: { ...snap.configuration },
      addedAt: new Date().toISOString(),
    });
  }

  if (!items.length) {
    return { ok: false, error: 'No valid packages remain in this cart.', code: 'empty' };
  }

  const now = new Date().toISOString();
  const updated: CartRecoverySession = {
    ...session,
    status: 'recovered',
    recoveredAt: session.recoveredAt ?? now,
    updatedAt: now,
    lastActivityAt: now,
  };
  await saveCartRecoverySession(updated);
  await appendCartRecoveryEvent({
    id: createCartRecoveryEventId(),
    sessionId: session.id,
    type: 'recovery_link_clicked',
    emailStep: null,
    idempotencyKey: `cart_recovery:${session.id}:clicked:${now.slice(0, 16)}`,
    providerMessageId: null,
    errorMessage: null,
    meta: null,
    createdAt: now,
  });
  await appendCartRecoveryEvent({
    id: createCartRecoveryEventId(),
    sessionId: session.id,
    type: 'cart_restored',
    emailStep: null,
    idempotencyKey: `cart_recovery:${session.id}:restored:${now.slice(0, 16)}`,
    providerMessageId: null,
    errorMessage: null,
    meta: null,
    createdAt: now,
  });

  return {
    ok: true,
    session: updated,
    cart: {
      items,
      coupon: null, // coupons re-validated at checkout; do not auto-apply stale discounts
      currency: items[0]!.currency,
      updatedAt: now,
    },
    checkout: {
      email: session.email,
      firstName: session.checkoutSnapshot?.firstName,
      lastName: session.checkoutSnapshot?.lastName,
      phone: session.checkoutSnapshot?.phone,
    },
  };
}
