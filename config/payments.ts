import type { PaymentProviderConfig } from '@/types/payment';

/**
 * Public payment method configuration — Document 10.06.
 * Mollie Remote Payment (Card) is the live checkout path.
 * Stripe is paused temporarily — do not re-enable without ops approval.
 * Secret keys never appear here.
 */
export const paymentProviders: PaymentProviderConfig[] = [
  {
    id: 'remote-payment',
    enabled: true,
    displayName: 'Credit / Debit Card',
  },
  {
    id: 'stripe',
    enabled: false, // paused — Mollie remote payment is active
    publicKeyEnv: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    displayName: 'Stripe',
  },
  {
    id: 'paypal',
    enabled: false,
    publicKeyEnv: 'NEXT_PUBLIC_PAYPAL_CLIENT_ID',
    displayName: 'PayPal',
  },
  {
    id: 'crypto',
    enabled: false,
    displayName: 'Cryptocurrency',
  },
  {
    id: 'jazzcash',
    enabled: false,
    displayName: 'JazzCash',
  },
  {
    id: 'easypaisa',
    enabled: false,
    displayName: 'EasyPaisa',
  },
];

export function getEnabledPaymentProviders(): PaymentProviderConfig[] {
  return paymentProviders.filter((p) => p.enabled);
}
