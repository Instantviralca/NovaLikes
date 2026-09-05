/**
 * Customer-facing sequential order numbers.
 *
 * Internal DB PK remains opaque (IV-…).
 * Public sequence is an integer starting at 1001, displayed zero-padded:
 *   1001 → "01001"
 *   10000 → "10000"
 *
 * Mollie Remote collector requires WordPress absint() — a positive integer.
 * We send the unpadded digit string ("1001") so create + webhook signatures match
 * after the collector normalizes the value.
 */

export const PUBLIC_ORDER_NUMBER_START = 1001;
export const PUBLIC_ORDER_NUMBER_MIN_WIDTH = 5;

/** Display / Track Order / email / admin primary reference. */
export function formatOrderNumber(publicNumber: number): string {
  if (!Number.isInteger(publicNumber) || publicNumber < 1) {
    throw new Error(`Invalid public order number: ${publicNumber}`);
  }
  return String(publicNumber).padStart(PUBLIC_ORDER_NUMBER_MIN_WIDTH, '0');
}

/**
 * Digits-only value for Mollie Remote Payment create + HMAC.
 * Leading zeros are omitted so callback order_id matches the signed value.
 */
export function toMollieOrderId(publicNumber: number): string {
  if (!Number.isInteger(publicNumber) || publicNumber < 1) {
    throw new Error(`Invalid public order number for Mollie: ${publicNumber}`);
  }
  return String(publicNumber);
}

export function isMollieOrderIdFormat(value: string): boolean {
  return /^\d+$/.test(value.trim()) && Number(value.trim()) > 0;
}

/**
 * Parse a customer-entered or callback order reference into a public_number.
 * Accepts "01001", "1001", or plain digits. Returns null for IV- / non-numeric.
 */
export function parsePublicOrderNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  if (!Number.isInteger(n) || n < 1) return null;
  return n;
}

export function isLegacyInternalOrderId(raw: string): boolean {
  return /^IV-/i.test(raw.trim());
}

/**
 * Prefer formatted public number; fall back to internal id for historical orders.
 */
export function getCustomerOrderId(order: {
  id: string;
  publicNumber?: number | null;
}): string {
  if (typeof order.publicNumber === 'number' && order.publicNumber >= 1) {
    return formatOrderNumber(order.publicNumber);
  }
  return order.id;
}
