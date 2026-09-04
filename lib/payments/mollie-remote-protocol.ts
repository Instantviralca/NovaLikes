/**
 * Mollie Remote Payment client protocol (Woo plugin v2.5 compatible).
 * Posts signed order payloads to the Mollie collection server (?ro=1).
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const MOLLIE_DEFAULT_SERVER_URL = 'https://carrycubes.com';
export const MOLLIE_DEFAULT_PRODUCT_NAME = 'Cubes';
export const MOLLIE_INTEGRATION_MODE = 'components_v1';

export type MollieRemoteLineItem = {
  product_id: string | number;
  name: string;
  qty: number;
  line_total: string;
};

export type MollieCreatePayload = {
  callbackUrl: string;
  returnUrl: string;
  cancelUrl: string;
  orderId: string;
  amountMajor: string;
  currency: string;
  productName: string;
  items: MollieRemoteLineItem[];
  cardToken: string;
  sharedSecret: string;
  requestTs?: number;
  requestNonce?: string;
};

export type MollieHealthResult = {
  ok: true;
  profileId: string;
  testmode: boolean;
  currency: string;
};

export function sanitizePaymentServerUrl(value: string): string {
  const trimmed = value.trim().replace(/\/$/, '');
  if (!trimmed) return '';
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return '';
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
  const path =
    parsed.pathname && parsed.pathname !== '/'
      ? `/${parsed.pathname.replace(/^\/+|\/+$/g, '')}`
      : '';
  return `${parsed.protocol}//${parsed.host}${path}`;
}

export function serverEndpoint(serverUrl: string, key: string): string {
  const base = sanitizePaymentServerUrl(serverUrl);
  if (!base) throw new Error('Payment server URL is invalid.');
  const url = new URL(base.endsWith('/') ? base : `${base}/`);
  url.searchParams.set(key, '1');
  return url.toString();
}

export function formatMajorAmount(amountMinor: number): string {
  return (amountMinor / 100).toFixed(2);
}

export function isValidMollieCardToken(token: string): boolean {
  return /^tkn_[A-Za-z0-9]+$/.test(token);
}

export function buildMollieSignaturePayload(input: {
  orderId: string;
  requestTs: number;
  requestNonce: string;
  callbackUrl: string;
  returnUrl: string;
  cancelUrl: string;
  amountMajor: string;
  currency: string;
  productName: string;
  itemsJson: string;
  cardToken: string;
}): string {
  return [
    String(input.orderId),
    String(input.requestTs),
    String(input.requestNonce),
    String(input.callbackUrl),
    String(input.returnUrl),
    String(input.cancelUrl),
    String(input.amountMajor),
    String(input.currency),
    String(input.productName),
    createHash('sha256').update(input.itemsJson).digest('hex'),
    MOLLIE_INTEGRATION_MODE,
    createHash('sha256').update(input.cardToken).digest('hex'),
  ].join('|');
}

export function signMolliePayload(payload: string, sharedSecret: string): string {
  return createHmac('sha256', sharedSecret).update(payload).digest('hex');
}

export function buildMollieCreateBody(input: MollieCreatePayload): Record<string, string> {
  if (!isValidMollieCardToken(input.cardToken)) {
    throw new Error('Please enter valid card details in the secure payment form.');
  }
  if (input.sharedSecret.trim().length < 16) {
    throw new Error('Mollie shared secret is not configured.');
  }

  const requestTs = input.requestTs ?? Math.floor(Date.now() / 1000);
  const requestNonce = input.requestNonce ?? randomBytes(12).toString('hex');
  const currency = input.currency.toUpperCase();
  const itemsJson = JSON.stringify(input.items);
  const signaturePayload = buildMollieSignaturePayload({
    orderId: input.orderId,
    requestTs,
    requestNonce,
    callbackUrl: input.callbackUrl,
    returnUrl: input.returnUrl,
    cancelUrl: input.cancelUrl,
    amountMajor: input.amountMajor,
    currency,
    productName: input.productName,
    itemsJson,
    cardToken: input.cardToken,
  });

  return {
    callback_url: input.callbackUrl,
    return_url: input.returnUrl,
    cancel_url: input.cancelUrl,
    order_id: input.orderId,
    amount: input.amountMajor,
    currency,
    product_name: input.productName,
    items_json: itemsJson,
    request_ts: String(requestTs),
    request_nonce: requestNonce,
    integration_mode: MOLLIE_INTEGRATION_MODE,
    card_token: input.cardToken,
    signature: signMolliePayload(signaturePayload, input.sharedSecret),
  };
}

export function buildHealthSignature(requestTs: number, sharedSecret: string): string {
  return signMolliePayload(`health|${requestTs}`, sharedSecret);
}

export function verifyMollieCallbackSignature(input: {
  orderId: string;
  txnId: string;
  price: string;
  currency: string;
  callbackTs: number;
  signature: string;
  sharedSecret: string;
}): boolean {
  if (!input.signature || input.sharedSecret.length < 16) return false;
  const expected = signMolliePayload(
    [input.orderId, input.txnId, input.price, input.currency, String(input.callbackTs)].join('|'),
    input.sharedSecret,
  );
  try {
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(input.signature, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isCallbackTimestampFresh(callbackTs: number, nowSec = Math.floor(Date.now() / 1000)): boolean {
  return callbackTs >= nowSec - 900 && callbackTs <= nowSec + 300;
}

/**
 * Trusted collector testmode parsing — only explicit true-like values.
 * Missing/unknown does not imply test mode.
 */
export function isCollectorTestModeFlag(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }
  return false;
}

export function readCollectorTestMode(
  fields: Map<string, string> | Record<string, unknown>,
): boolean {
  const get = (key: string): unknown => {
    if (fields instanceof Map) return fields.get(key);
    return fields[key];
  };
  return (
    isCollectorTestModeFlag(get('testmode')) ||
    isCollectorTestModeFlag(get('test_mode')) ||
    isCollectorTestModeFlag(get('testMode'))
  );
}

export class MollieTestModeRejectedError extends Error {
  readonly code = 'mollie_testmode_rejected' as const;

  constructor(context: string) {
    super(`Mollie testmode is not accepted in production (${context}).`);
    this.name = 'MollieTestModeRejectedError';
  }
}

/**
 * Fail-closed: NODE_ENV=production must never accept collector testmode=true.
 * Payment security only — IV_ENV must not override this (including IV_ENV=test).
 */
export function assertNoMollieTestModeInProduction(
  testmode: boolean,
  context: string,
): void {
  if (process.env.NODE_ENV !== 'production') return;
  if (!testmode) return;
  console.error('[mollie] rejected testmode payload in production', { context });
  throw new MollieTestModeRejectedError(context);
}

export async function fetchMollieHealth(input: {
  serverUrl: string;
  sharedSecret: string;
}): Promise<MollieHealthResult> {
  const secret = input.sharedSecret.trim();
  if (secret.length < 16) {
    throw new Error('Mollie shared secret is not configured.');
  }
  const requestTs = Math.floor(Date.now() / 1000);
  const body = new URLSearchParams({
    request_ts: String(requestTs),
    signature: buildHealthSignature(requestTs, secret),
  });

  const response = await fetch(serverEndpoint(input.serverUrl, 'wrp_mollie_health'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json, text/plain, */*',
    },
    body,
    signal: AbortSignal.timeout(30_000),
  });

  const text = (await response.text()).trim();
  type HealthJson = {
    ok?: boolean;
    profile_id?: string;
    testmode?: boolean;
    currency?: string;
    message?: string;
  };
  let data: HealthJson | null = null;
  try {
    data = JSON.parse(text) as HealthJson;
  } catch {
    data = null;
  }

  if (
    !response.ok ||
    !data ||
    !data.ok ||
    !data.profile_id ||
    !String(data.profile_id).startsWith('pfl_')
  ) {
    const detail = data?.message || text || `HTTP ${response.status}`;
    throw new Error(`Mollie payment server health check failed: ${detail}`.slice(0, 280));
  }

  const testmode = Boolean(data.testmode);
  assertNoMollieTestModeInProduction(testmode, 'mollie_health');

  return {
    ok: true,
    profileId: data.profile_id,
    testmode,
    currency: String(data.currency || '').toUpperCase(),
  };
}
