import { createHash, createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  buildMollieCreateBody,
  buildMollieSignaturePayload,
  formatMajorAmount,
  isCallbackTimestampFresh,
  isTrustedPaymentRedirectUrl,
  isValidMollieCardToken,
  sanitizePaymentServerUrl,
  serverEndpoint,
  signMolliePayload,
  verifyMollieCallbackSignature,
} from '@/lib/payments/mollie-remote-protocol';

describe('mollie remote protocol (hosted checkout)', () => {
  it('sanitizes server URLs and builds ?ro=1 endpoints', () => {
    expect(sanitizePaymentServerUrl('https://carrycubes.com/')).toBe('https://carrycubes.com');
    expect(serverEndpoint('https://carrycubes.com', 'ro')).toBe('https://carrycubes.com/?ro=1');
  });

  it('formats major amounts; card token helper retained for compatibility', () => {
    expect(formatMajorAmount(999)).toBe('9.99');
    expect(isValidMollieCardToken('tkn_abc123')).toBe(true);
    expect(isValidMollieCardToken('tok_abc')).toBe(false);
  });

  it('builds hosted signed create payloads without cardToken or integration_mode', () => {
    const body = buildMollieCreateBody({
      callbackUrl: 'https://novalikes.com/api/webhooks/remote-payment',
      returnUrl: 'https://novalikes.com/order-success',
      cancelUrl: 'https://novalikes.com/checkout?cancelled=1',
      orderId: '1001',
      amountMajor: '9.99',
      currency: 'usd',
      productName: 'Cubes',
      items: [{ product_id: 'pkg', name: 'Followers', qty: 1, line_total: '9.99' }],
      sharedSecret: 'abcdefghijklmnop',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
    });

    expect(body.currency).toBe('USD');
    expect(body.order_id).toBe('1001');
    expect(body.product_name).toBe('Cubes');
    expect(body.integration_mode).toBeUndefined();
    expect(body.card_token).toBeUndefined();
    expect(Object.keys(body)).not.toContain('integration_mode');
    expect(Object.keys(body)).not.toContain('card_token');
    expect(body.merchant_order_number).toBeUndefined();
    expect(Object.keys(body)).not.toContain('merchant_order_number');

    const itemsJson = body.items_json;
    const expectedPayload = buildMollieSignaturePayload({
      orderId: '1001',
      requestTs: 1700000000,
      requestNonce: 'nonce123',
      callbackUrl: body.callback_url,
      returnUrl: body.return_url,
      cancelUrl: body.cancel_url,
      amountMajor: '9.99',
      currency: 'USD',
      productName: 'Cubes',
      itemsJson,
    });
    expect(expectedPayload.split('|')).toHaveLength(10);
    expect(expectedPayload).not.toContain('components_v1');
    expect(body.signature).toBe(signMolliePayload(expectedPayload, 'abcdefghijklmnop'));
    expect(createHash('sha256').update(itemsJson).digest('hex')).toHaveLength(64);
  });

  it('trusts Mollie and collector hosts; rejects arbitrary redirect URLs', () => {
    const server = 'https://carrycubes.com';
    expect(
      isTrustedPaymentRedirectUrl('https://www.mollie.com/checkout/select-method/abc', server),
    ).toBe(true);
    expect(
      isTrustedPaymentRedirectUrl('https://carrycubes.com/?rop=12&rt=token', server),
    ).toBe(true);
    expect(isTrustedPaymentRedirectUrl('https://evil.example/phish', server)).toBe(false);
    expect(isTrustedPaymentRedirectUrl('javascript:alert(1)', server)).toBe(false);
  });

  it('verifies callback signatures and timestamp window', () => {
    const secret = 'abcdefghijklmnop';
    const callbackTs = Math.floor(Date.now() / 1000);
    const signature = createHmac('sha256', secret)
      .update(['1001', 'tr_abc', '9.99', 'USD', String(callbackTs)].join('|'))
      .digest('hex');

    expect(
      verifyMollieCallbackSignature({
        orderId: '1001',
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
