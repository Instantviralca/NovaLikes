import { NextResponse } from 'next/server';

import {
  formatMajorAmount,
  isCallbackTimestampFresh,
  MollieTestModeRejectedError,
  readCollectorTestMode,
  assertNoMollieTestModeInProduction,
  verifyMollieCallbackSignature,
} from '@/lib/payments/mollie-remote-protocol';
import {
  isWebhookAlreadyProcessed,
  markOrderPaymentStatus,
  recordWebhookProcessed,
} from '@/lib/payments/mark-paid';
import { getOrderById } from '@/lib/orders/store';
import { getRemotePaymentSharedSecret } from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

/**
 * Mollie Remote Payment server callback (Woo client compatible).
 * Verifies HMAC signature, amount, currency, then marks the order paid.
 * Production rejects trusted collector testmode=true when NODE_ENV=production
 * (IV_ENV cannot bypass this payment guard).
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    const fields = new Map<string, string>();

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as Record<string, unknown>;
      for (const [key, value] of Object.entries(body)) {
        if (value !== undefined && value !== null) fields.set(key, String(value));
      }
    } else {
      const form = await request.formData();
      for (const [key, value] of form.entries()) {
        fields.set(key, String(value));
      }
    }

    const orderId = (fields.get('order_id') ?? fields.get('orderId') ?? '').trim();
    const txnId = (fields.get('txn_id') ?? fields.get('txnId') ?? '').trim();
    const priceRaw = fields.get('price') ?? '';
    const price = Number.isFinite(Number(priceRaw))
      ? Number(priceRaw).toFixed(2)
      : '';
    const currency = (fields.get('currency_code') ?? fields.get('currency') ?? '')
      .trim()
      .toUpperCase();
    const paymentStatus = (fields.get('payment_status') ?? '').trim().toLowerCase();
    const callbackTs = Number(fields.get('callback_ts') ?? 0);
    const signature = (fields.get('signature') ?? '').trim();
    const sharedSecret = await getRemotePaymentSharedSecret();

    if (!orderId || !txnId || paymentStatus !== 'paid' || sharedSecret.length < 16) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    if (!isCallbackTimestampFresh(callbackTs)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (
      !verifyMollieCallbackSignature({
        orderId,
        txnId,
        price,
        currency,
        callbackTs,
        signature,
        sharedSecret,
      })
    ) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // After signature verification only — trusted collector field.
    try {
      assertNoMollieTestModeInProduction(
        readCollectorTestMode(fields),
        'remote_payment_webhook',
      );
    } catch (error) {
      if (error instanceof MollieTestModeRejectedError) {
        return new NextResponse('Test mode payments are not accepted in production.', {
          status: 409,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
      throw error;
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const expectedPrice = formatMajorAmount(order.total.amount);
    const expectedCurrency = order.total.currency.toUpperCase();
    if (price !== expectedPrice || currency !== expectedCurrency) {
      return new NextResponse('Conflict', { status: 409 });
    }

    if (await isWebhookAlreadyProcessed('remote-payment', txnId)) {
      return new NextResponse('OK', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    await markOrderPaymentStatus({
      paymentId: txnId,
      orderId,
      status: 'paid',
      amountMinor: order.total.amount,
      providerReference: txnId,
    });

    await recordWebhookProcessed({
      provider: 'remote-payment',
      eventId: txnId,
      eventType: 'mollie.paid',
      paymentId: txnId,
    });

    return new NextResponse('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('[remote-payment webhook]', {
      message: error instanceof Error ? error.message : 'unknown',
    });
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to process callback.',
      },
      { status: 400 },
    );
  }
}
