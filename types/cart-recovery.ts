import type { AppliedCoupon, CartItem } from '@/types/cart';
import type { CurrencyCode } from '@/types/pricing';

export type CartRecoveryStatus =
  | 'active'
  | 'abandoned'
  | 'recovered'
  | 'converted'
  | 'expired';

export type CartRecoveryEventType =
  | 'email_scheduled'
  | 'email_sent'
  | 'email_failed'
  | 'recovery_link_clicked'
  | 'cart_restored'
  | 'converted'
  | 'unsubscribed'
  | 'expired';

export type CartRecoverySnapshotItem = {
  packageId: string;
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  platformId: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  unitPrice: number;
  currency: CurrencyCode;
  deliveryTime: string;
  configuration: Record<string, string | number | boolean>;
};

export type CartRecoveryCartSnapshot = {
  items: CartRecoverySnapshotItem[];
  coupon: AppliedCoupon | null;
  currency: CurrencyCode;
};

export type CartRecoveryCheckoutSnapshot = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type CartRecoverySession = {
  id: string;
  publicId: string;
  email: string;
  customerName: string | null;
  whatsappNumber: string | null;
  currency: CurrencyCode;
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  market: string | null;
  locale: string | null;
  status: CartRecoveryStatus;
  cartSnapshot: CartRecoveryCartSnapshot;
  checkoutSnapshot: CartRecoveryCheckoutSnapshot | null;
  recoveryTokenHash: string;
  unsubscribeTokenHash: string;
  unsubscribedAt: string | null;
  lastActivityAt: string;
  abandonedAt: string | null;
  recoveredAt: string | null;
  convertedAt: string | null;
  orderId: string | null;
  landingPath: string | null;
  referrer: string | null;
  checkoutPath: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};

export type CartRecoveryEvent = {
  id: string;
  sessionId: string;
  type: CartRecoveryEventType;
  emailStep: number | null;
  idempotencyKey: string | null;
  providerMessageId: string | null;
  errorMessage: string | null;
  meta: Record<string, string | number | boolean | null> | null;
  createdAt: string;
};

export type CartRecoveryEmailStepConfig = {
  step: 1 | 2 | 3;
  enabled: boolean;
  delayMinutes: number;
  subject: string;
  body: string;
};

export type CartRecoverySettings = {
  enabled: boolean;
  abandonmentMinutes: number;
  retentionDays: number;
  couponEnabled: boolean;
  couponDiscountType: 'percentage' | 'fixed';
  couponValue: number;
  couponMinSubtotal: number;
  couponExpiryHours: number;
  couponSequenceStep: 1 | 2 | 3;
  emails: CartRecoveryEmailStepConfig[];
  whatsappRecoveryEnabled: boolean;
};

export type CartRecoveryCaptureInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  items: CartItem[];
  coupon: AppliedCoupon | null;
  currency: CurrencyCode;
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  market?: string;
  locale?: string;
  landingPath?: string;
  referrer?: string;
  checkoutPath?: string;
};
