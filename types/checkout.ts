import type { CurrencyCode } from '@/types/pricing';
import type { CartItem, AppliedCoupon, CartTotals } from '@/types/cart';
import type { PaymentProviderId } from '@/types/payment';

/**
 * Checkout — Document 10.05
 * Single-page checkout; payment providers stay behind the payment manager.
 */

export type PaymentMethodId = PaymentProviderId;

export type PaymentMethodOption = {
  id: PaymentMethodId;
  label: string;
  description?: string;
  enabled: boolean;
};

export type CustomerInformation = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  /** CASL marketing consent — only true when checkout checkbox is checked. */
  marketingOptIn?: boolean;
};

export type CheckoutFormState = {
  customer: CustomerInformation;
  paymentMethodId: PaymentMethodId | null;
  coupon: AppliedCoupon | null;
  termsAccepted: boolean;
};

export type CheckoutViewModel = {
  items: CartItem[];
  totals: CartTotals;
  currency: CurrencyCode;
  paymentMethods: PaymentMethodOption[];
  termsHref: string;
  privacyHref: string;
};

export type PlaceOrderPayload = {
  customer: CustomerInformation;
  paymentMethodId: PaymentMethodId;
  items: CartItem[];
  totals: CartTotals;
  coupon: AppliedCoupon | null;
  termsAccepted: boolean;
  marketingOptIn?: boolean;
  /** Mollie Components card token (tkn_…). Required for live remote payment. */
  cardToken?: string;
  /** Opaque cart-recovery session identifier, when restored or captured. */
  recoveryPublicId?: string;
};
