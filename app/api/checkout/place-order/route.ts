import { NextResponse } from 'next/server';

import { executeCheckout } from '@/lib/checkout/execute';
import type { PlaceOrderPayload } from '@/types/checkout';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PlaceOrderPayload & {
      idempotencyKey?: string;
    };
    if (!body?.termsAccepted) {
      return NextResponse.json(
        { ok: false, error: 'Terms must be accepted.' },
        { status: 400 },
      );
    }
    if (!body.paymentMethodId) {
      return NextResponse.json(
        { ok: false, error: 'Payment method is required.' },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ ok: false, error: 'Cart is empty.' }, { status: 400 });
    }

    const result = await executeCheckout({
      customer: body.customer,
      paymentMethodId: body.paymentMethodId,
      items: body.items,
      totals: body.totals,
      coupon: body.coupon,
      termsAccepted: body.termsAccepted,
      idempotencyKey: body.idempotencyKey,
      marketingOptIn: Boolean(body.marketingOptIn || body.customer?.marketingOptIn),
      cardToken: body.cardToken,
      recoveryPublicId: body.recoveryPublicId,
    });

    if (!result.ok) {
      const status =
        result.code === 'payments_disabled'
          ? 503
          : result.code === 'provider_error'
            ? 502
            : 400;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to place order.',
      },
      { status: 400 },
    );
  }
}
