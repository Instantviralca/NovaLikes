/**
 * Create orders from checkout payloads — Document 11.02.
 * Server-side price recalculation + idempotent persistence.
 */

import { createHash } from 'node:crypto';

import type { CartItem } from '@/types/cart';
import type { CustomerInformation, PlaceOrderPayload } from '@/types/checkout';
import type { Order } from '@/types/order';
import type { PaymentProviderId } from '@/types/payment';
import {
  allocatePublicOrderNumber,
  createOrderId,
  ensurePublicOrderNumber,
  getOrderByIdempotencyKey,
  saveOrder,
} from '@/lib/orders/store';
import {
  assertClientTotalsMatch,
  validateCheckoutPricing,
} from '@/lib/orders/pricing';
import { hydrateCoupons } from '@/lib/catalog/coupons-store';
import { ensureCatalogHydrated } from '@/lib/catalog/package-overrides-store';

export type PlaceOrderInput = {
  customer: CustomerInformation;
  paymentMethodId: PaymentProviderId;
  items: CartItem[];
  totals?: PlaceOrderPayload['totals'];
  coupon: PlaceOrderPayload['coupon'];
  termsAccepted: boolean;
  /** Client or server-generated key to prevent duplicate orders. */
  idempotencyKey?: string;
  /** CASL marketing opt-in from checkout checkbox. */
  marketingOptIn?: boolean;
  /** Mollie Components card token (tkn_…). */
  cardToken?: string;
  /** Opaque cart-recovery session identifier. */
  recoveryPublicId?: string;
};

export function buildIdempotencyKey(input: {
  email: string;
  packageIds: string[];
  totalAmount: number;
  key?: string;
}): string {
  if (input.key?.trim()) return input.key.trim().slice(0, 128);
  const raw = `${input.email.toLowerCase()}|${input.packageIds.sort().join(',')}|${input.totalAmount}`;
  return createHash('sha256').update(raw).digest('hex').slice(0, 32);
}

export async function buildOrderFromCheckout(input: PlaceOrderInput): Promise<Order> {
  if (!input.termsAccepted) {
    throw new Error('Terms must be accepted.');
  }
  if (!input.items.length) {
    throw new Error('Cart is empty.');
  }

  await Promise.all([hydrateCoupons(), ensureCatalogHydrated()]);
  if (!input.customer.email?.includes('@')) {
    throw new Error('Valid email is required.');
  }

  const pricing = validateCheckoutPricing({
    items: input.items,
    couponCode: input.coupon?.code,
  });
  assertClientTotalsMatch(pricing, input.totals);

  const now = new Date().toISOString();
  const id = createOrderId();
  const idempotencyKey = buildIdempotencyKey({
    email: input.customer.email,
    packageIds: pricing.items.map((i) => i.packageId),
    totalAmount: pricing.total.amount,
    key: input.idempotencyKey,
  });

  const order = {
    id,
    guestEmail: input.customer.email.trim().toLowerCase(),
    status: 'pending' as const,
    fulfillmentMode: 'manual' as const,
    currency: pricing.currency,
    items: pricing.items,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    total: pricing.total,
    couponCode: pricing.couponCode,
    payment: {
      provider: input.paymentMethodId,
      paymentId: `pending_${id}`,
      status: 'pending' as const,
      amount: pricing.total,
    },
    timeline: [
      {
        id: `evt_${id}_created`,
        orderId: id,
        type: 'order_created' as const,
        newStatus: 'pending' as const,
        status: 'pending' as const,
        message: 'Order created. Awaiting payment confirmation.',
        publicMessage: 'We received your order and are confirming payment.',
        updatedBy: { type: 'system' as const, id: 'checkout' },
        at: now,
      },
    ],
    internalNotes: [],
    createdAt: now,
    updatedAt: now,
    idempotencyKey,
  } satisfies Order & { idempotencyKey: string };

  return order;
}

export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  const draft = await buildOrderFromCheckout(input);
  const key = (draft as Order & { idempotencyKey?: string }).idempotencyKey;
  if (key) {
    const existing = await getOrderByIdempotencyKey(key);
    if (existing) {
      // Repair production rows that were persisted before public_number allocation
      // (or failed mid-flow) so the same idempotent checkout retry can continue.
      if (typeof existing.publicNumber === 'number' && existing.publicNumber >= 1) {
        return existing;
      }
      return ensurePublicOrderNumber(existing.id);
    }
  }

  // Allocate only after idempotency miss so retries do not burn sequence values.
  const publicNumber = await allocatePublicOrderNumber();
  const saved = await saveOrder({ ...draft, publicNumber });

  if (typeof saved.publicNumber !== 'number' || saved.publicNumber < 1) {
    // Never continue checkout with a NULL public number — repair same row.
    const repaired = await ensurePublicOrderNumber(saved.id);
    if (typeof repaired.publicNumber !== 'number' || repaired.publicNumber < 1) {
      throw new Error('Order public number was not allocated.');
    }
    try {
      const { recordOrderCreatedAnalytics } = await import(
        '@/lib/analytics/native/server-events'
      );
      await recordOrderCreatedAnalytics(repaired);
    } catch (error) {
      console.error('[orders] analytics order_created failed', {
        orderId: repaired.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }
    return repaired;
  }

  try {
    const { recordOrderCreatedAnalytics } = await import(
      '@/lib/analytics/native/server-events'
    );
    await recordOrderCreatedAnalytics(saved);
  } catch (error) {
    console.error('[orders] analytics order_created failed', {
      orderId: saved.id,
      message: error instanceof Error ? error.message : 'unknown',
    });
  }
  return saved;
}
