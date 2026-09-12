/**
 * Stable public API error messages — avoid leaking internal Error.message.
 */

const SAFE_FALLBACK = 'Unable to complete this request.';

/** Known safe user-facing strings (checkout validation, etc.). */
const ALLOWED_PREFIXES = [
  'Terms must be accepted',
  'Payment method is required',
  'Cart is empty',
  'Only remote card payment',
  'Valid email is required',
  'Payments are not configured',
  'Remote payment URL is not set',
  'Order public number was not allocated',
  'Please enter valid',
  'Unable to place order',
  'Coupon',
  'Invalid',
  'Too many requests',
];

export function publicApiErrorMessage(error: unknown, fallback = SAFE_FALLBACK): string {
  if (!(error instanceof Error)) return fallback;
  const msg = error.message?.trim() ?? '';
  if (!msg) return fallback;
  if (msg.length > 180) return fallback;
  // Never echo stack-like or config/secret hints.
  if (/secret|password|token|sql|stack|ECONN|postgres|DATABASE|SMTP_|API_KEY/i.test(msg)) {
    return fallback;
  }
  if (ALLOWED_PREFIXES.some((p) => msg.startsWith(p) || msg.includes(p))) {
    return msg;
  }
  // Mollie/provider user-facing messages that are already sanitized upstream.
  if (/^Mollie payment server returned HTTP \d{3}/.test(msg)) {
    return 'Unable to start payment. Please try again.';
  }
  if (msg.includes('untrusted redirect')) {
    return 'Unable to start payment. Please try again.';
  }
  return fallback;
}
