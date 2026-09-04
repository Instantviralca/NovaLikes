/**
 * Capture / update recoverable checkout carts (email known, pre Place Order).
 */

import { getCartRecoverySettings } from '@/lib/cart-recovery/settings';
import {
  findOpenCartRecoverySessionByEmail,
  saveCartRecoverySession,
} from '@/lib/cart-recovery/store';
import {
  createCartRecoveryPublicId,
  createCartRecoverySessionId,
  deriveRecoveryToken,
  deriveUnsubscribeToken,
  hashCartRecoveryToken,
} from '@/lib/cart-recovery/tokens';
import type { CartRecoveryCaptureInput, CartRecoverySession } from '@/types/cart-recovery';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function buildCustomerName(input: CartRecoveryCaptureInput): string | null {
  const name = [input.firstName, input.lastName].filter(Boolean).join(' ').trim();
  return name || null;
}

function toSnapshot(input: CartRecoveryCaptureInput): CartRecoverySession['cartSnapshot'] {
  return {
    currency: input.currency,
    coupon: input.coupon,
    items: input.items.map((item) => ({
      packageId: item.packageId,
      serviceId: item.serviceId,
      serviceSlug: item.serviceSlug,
      serviceName: item.serviceName,
      platformId: item.platformId,
      packageTitle: item.packageTitle,
      quantity: item.quantity,
      quantityLabel: item.quantityLabel,
      unitPrice: item.unitPrice,
      currency: item.currency,
      deliveryTime: item.deliveryTime,
      configuration: { ...item.configuration },
    })),
  };
}

export async function captureCartRecoverySession(
  input: CartRecoveryCaptureInput,
): Promise<{ ok: true; publicId: string; created: boolean } | { ok: false; error: string }> {
  const settings = await getCartRecoverySettings();
  if (!settings.enabled) {
    return { ok: false, error: 'Cart recovery is disabled.' };
  }

  const email = input.email.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { ok: false, error: 'A valid email is required.' };
  }
  if (!input.items?.length) {
    return { ok: false, error: 'Cart is empty.' };
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(
    now.getTime() + settings.retentionDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  const existing = await findOpenCartRecoverySessionByEmail(email);
  if (existing && existing.status !== 'converted' && existing.status !== 'expired') {
    const updated: CartRecoverySession = {
      ...existing,
      customerName: buildCustomerName(input) ?? existing.customerName,
      whatsappNumber: input.phone?.trim() || existing.whatsappNumber,
      currency: input.currency,
      subtotalAmount: input.subtotalAmount,
      discountAmount: input.discountAmount,
      totalAmount: input.totalAmount,
      market: input.market ?? existing.market,
      locale: input.locale ?? existing.locale,
      status: existing.status === 'recovered' ? 'recovered' : 'active',
      cartSnapshot: toSnapshot(input),
      checkoutSnapshot: {
        email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
      },
      lastActivityAt: nowIso,
      abandonedAt: existing.status === 'abandoned' ? null : existing.abandonedAt,
      landingPath: input.landingPath ?? existing.landingPath,
      referrer: input.referrer ?? existing.referrer,
      checkoutPath: input.checkoutPath ?? existing.checkoutPath,
      updatedAt: nowIso,
      expiresAt,
    };
    await saveCartRecoverySession(updated);
    return { ok: true, publicId: updated.publicId, created: false };
  }

  const createdAt = nowIso;
  const publicId = createCartRecoveryPublicId();
  const draft = { publicId, createdAt };
  const session: CartRecoverySession = {
    id: createCartRecoverySessionId(),
    publicId,
    email,
    customerName: buildCustomerName(input),
    whatsappNumber: input.phone?.trim() || null,
    currency: input.currency,
    subtotalAmount: input.subtotalAmount,
    discountAmount: input.discountAmount,
    totalAmount: input.totalAmount,
    market: input.market ?? null,
    locale: input.locale ?? null,
    status: 'active',
    cartSnapshot: toSnapshot(input),
    checkoutSnapshot: {
      email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    },
    recoveryTokenHash: hashCartRecoveryToken(deriveRecoveryToken(draft)),
    unsubscribeTokenHash: hashCartRecoveryToken(deriveUnsubscribeToken(draft)),
    unsubscribedAt: null,
    lastActivityAt: nowIso,
    abandonedAt: null,
    recoveredAt: null,
    convertedAt: null,
    orderId: null,
    landingPath: input.landingPath ?? null,
    referrer: input.referrer ?? null,
    checkoutPath: input.checkoutPath ?? '/checkout',
    createdAt,
    updatedAt: nowIso,
    expiresAt,
  };

  await saveCartRecoverySession(session);
  return { ok: true, publicId: session.publicId, created: true };
}
