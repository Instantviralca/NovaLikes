import { createHash, createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  buildMollieCreateBody,
  buildMollieSignaturePayload,
  formatMajorAmount,
  isCallbackTimestampFresh,
  isValidMollieCardToken,
  sanitizePaymentServerUrl,
  serverEndpoint,
  signMolliePayload,
  verifyMollieCallbackSignature,
} from '@/lib/payments/mollie-remote-protocol';

describe('mollie remote protocol', () => {
  it('sanitizes server URLs and builds ?ro=1 endpoints', () => {
    expect(sanitizePaymentServerUrl('https://carrycubes.com/')).toBe('https://carrycubes.com');
    expect(serverEndpoint('https://carrycubes.com', 'ro')).toBe('https://carrycubes.com/?ro=1');
  });

  it('formats major amounts and validates card tokens', () => {
    expect(formatMajorAmount(999)).toBe('9.99');
    expect(isValidMollieCardToken('tkn_abc123')).toBe(true);
    expect(isValidMollieCardToken('tok_abc')).toBe(false);
  });

  it('builds signed create payloads matching Woo client fields', () => {
    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success',
      cancelUrl: 'https://novalikes.com/checkout?cancelled=1',
      orderId: 'NL-1',
      amountMajor: '9.99',
      currency: 'usd',
      productName: 'Cubes',
      items: [{ product_id: 'pkg', name: 'Followers', qty: 1, line_total: '9.99' }],
      cardToken: 'tkn_testtoken',
      sharedSecret: 'abcdefghijklmnop',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
    });

    expect(body.currency).toBe('USD');
    expect(body.integration_mode).toBe('components_v1');
    expect(body.card_token).toBe('tkn_testtoken');
    expect(body.product_name).toBe('Cubes');

    const itemsJson = body.items_json;
    const expectedPayload = buildMollieSignaturePayload({
      orderId: 'NL-1',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
      callbackUrl: body.callback_url,
      returnUrl: body.return_url,
      cancelUrl: body.cancel_url,
      amountMajor: '9.99',
      currency: 'USD',
      productName: 'Cubes',
      itemsJson,
      cardToken: 'tkn_testtoken',
    });
    expect(body.signature).toBe(signMolliePayload(expectedPayload, 'abcdefghijklmnop'));
    expect(createHash('sha256').update(itemsJson).digest('hex')).toHaveLength(64);
  });

  it('verifies callback signatures and timestamp window', () => {
    const secret = 'abcdefghijklmnop';
    const callbackTs = Math.floor(Date.now() / 1000);
    const signature = createHmac('sha256', secret)
      .update(['NL-1', 'tr_abc', '9.99', 'USD', String(callbackTs)].join('|'))
      .digest('hex');

    expect(
      verifyMollieCallbackSignature({
        orderId: 'NL-1',
        txnId: 'tr_abc',
        price: '9.99',
        currency: 'USD',
        callbackTs,
        signature,
        sharedSecret: secret,
      }),
    ).toBe(true);
    expect(isCallbackTimestampFresh(callbackTs)).toBe(true);
    expect(isCallbackTimestampFresh(callbackTs - 1000)).toBe(false);
  });
});
