import { NextResponse } from 'next/server';

import { getEnabledPaymentProviders } from '@/config/payments';
import { stripeProvider, getStripeEventId } from '@/lib/payments/providers/stripe';
import {
  isWebhookAlreadyProcessed,
  markOrderPaymentStatus,
  recordWebhookProcessed,
} from '@/lib/payments/mark-paid';
import { isStripeConfigured } from '@/lib/config/env';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  // Stripe remains paused in config/payments.ts — refuse even if env keys exist.
  if (!getEnabledPaymentProviders().some((p) => p.id === 'stripe')) {
    return NextResponse.json(
      { ok: false, error: 'Stripe payments are paused.' },
      { status: 503 },
    );
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Stripe webhooks are not configured.' },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let event;
  try {
    event = await stripeProvider.webhookHandler!(rawBody, headers);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid webhook signature.',
      },
      { status: 400 },
    );
  }

  const eventId =
    getStripeEventId(event.raw) ?? `${event.eventType}_${event.paymentId ?? 'unknown'}`;

  if (await isWebhookAlreadyProcessed('stripe', eventId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  try {
    if (event.paymentId && event.status) {
      let amountMinor: number | undefined;
      if (event.status === 'paid' && event.eventType.startsWith('checkout.session')) {
        const verified = await stripeProvider.verifyPayment({
          paymentId: event.paymentId,
          provider: 'stripe',
        });
        amountMinor = verified.amount?.amount;
      }

      await markOrderPaymentStatus({
        paymentId: event.paymentId,
        status: event.status,
        amountMinor,
      });
    }

    await recordWebhookProcessed({
      provider: 'stripe',
      eventId,
      eventType: event.eventType,
      paymentId: event.paymentId,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[stripe webhook] processing failed', {
      eventType: event.eventType,
      message: error instanceof Error ? error.message : 'unknown',
    });
    return NextResponse.json(
      { ok: false, error: 'Webhook processing failed.' },
      { status: 500 },
    );
  }
}
