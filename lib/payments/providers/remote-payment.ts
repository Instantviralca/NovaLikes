/**
 * Mollie Remote Payment provider — client protocol matching
 * WooCommerce Mollie Remote Payment Client v2.5.
 * Stripe remains disabled in config/payments.ts.
 */

import { getSiteUrlPath } from '@/lib/config/hosts';
import {
  assertNoMollieTestModeInProduction,
  buildMollieCreateBody,
  fetchMollieHealth,
  formatMajorAmount,
  isValidMollieCardToken,
  serverEndpoint,
  type MollieRemoteLineItem,
} from '@/lib/payments/mollie-remote-protocol';
import {
  getPaymentWebsiteUrl,
  getRemotePaymentProductName,
  getRemotePaymentSharedSecret,
} from '@/lib/settings/site-settings';
import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from '@/types/payment';

function buildItems(input: CreatePaymentInput): MollieRemoteLineItem[] {
  const payloadItems = input.payload?.items;
  if (payloadItems && payloadItems.length > 0) {
    return payloadItems.map((item) => ({
      product_id: item.packageId || item.serviceId,
      name: item.packageTitle || item.serviceName,
      qty: 1,
      line_total: formatMajorAmount(item.unitPrice),
    }));
  }

  return [
    {
      product_id: input.orderId,
      name: input.description ?? `Order ${input.orderId}`,
      qty: 1,
      line_total: formatMajorAmount(input.amount.amount),
    },
  ];
}

export const remotePaymentProvider: PaymentProvider = {
  id: 'remote-payment',
  displayName: 'Credit / Debit Card',

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const [paymentWebsite, sharedSecret, productName] = await Promise.all([
      getPaymentWebsiteUrl(),
      getRemotePaymentSharedSecret(),
      getRemotePaymentProductName(),
    ]);

    if (!paymentWebsite) {
      throw new Error(
        'Mollie payment server URL is not configured. Set it in Admin → Settings.',
      );
    }
    if (sharedSecret.trim().length < 16) {
      throw new Error(
        'Mollie shared secret is not configured. Set it in Admin → Settings.',
      );
    }

    // Trusted collector health — block NODE_ENV=production checkout on testmode (IV_ENV cannot bypass).
    if (process.env.NODE_ENV === 'production') {
      const health = await fetchMollieHealth({ serverUrl: paymentWebsite, sharedSecret });
      assertNoMollieTestModeInProduction(health.testmode, 'create_payment_health');
    }

    const cardToken = String(input.payload?.cardToken ?? '').trim();
    if (!isValidMollieCardToken(cardToken)) {
      throw new Error('Please enter valid card details in the secure payment form.');
    }

    const body = buildMollieCreateBody({
      callbackUrl: getSiteUrlPath('/api/webhooks/remote-payment'),
      returnUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
      orderId: input.orderId,
      amountMajor: formatMajorAmount(input.amount.amount),
      currency: input.amount.currency,
      productName,
      items: buildItems(input),
      cardToken,
      sharedSecret,
    });

    const response = await fetch(serverEndpoint(paymentWebsite, 'ro'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain, */*',
      },
      body: new URLSearchParams(body),
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      const detail = (await response.text()).trim().slice(0, 240);
      throw new Error(
        detail
          ? `Mollie payment server returned HTTP ${response.status}: ${detail}`
          : `Mollie payment server returned HTTP ${response.status}.`,
      );
    }

    const redirectUrl = (await response.text()).trim();
    if (!redirectUrl || !/^https?:\/\//i.test(redirectUrl)) {
      throw new Error('Mollie payment server did not return a valid redirect URL.');
    }

    return {
      paymentId: `remote_${input.orderId}`,
      status: 'pending',
      provider: 'remote-payment',
      redirectUrl,
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    return {
      paymentId: input.paymentId,
      status: 'pending',
      providerReference: input.paymentId,
    };
  },

  async cancelPayment(_input: CancelPaymentInput) {
    return { status: 'cancelled' as const };
  },
};
