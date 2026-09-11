/**
 * Notification System — Document 11.04
 * Email-first, provider-independent. No live sends in this milestone.
 */

export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'push' | 'dashboard';

export type NotificationDeliveryStatus = 'pending' | 'sent' | 'failed';

export type NotificationTrigger =
  | 'order_created'
  | 'payment_confirmed'
  | 'processing_started'
  | 'order_completed'
  | 'order_partial'
  | 'order_cancelled'
  | 'order_refunded';

export type NotificationTemplateId =
  | 'order_confirmation'
  | 'processing_update'
  | 'order_completed'
  | 'partial_completion'
  | 'order_cancelled'
  | 'refund_confirmation';

export type NotificationTemplateVariableMap = {
  companyName: string;
  companyLogoUrl?: string;
  customerName?: string;
  greetingLine?: string;
  customerEmail: string;
  orderId: string;
  internalOrderId?: string;
  serviceName: string;
  packageName?: string;
  profileUrl?: string;
  quantity?: string;
  orderTotal?: string;
  paymentStatus?: string;
  orderDate?: string;
  statusLabel: string;
  statusMessage?: string;
  detailsHtml?: string;
  detailsText?: string;
  itemsHtml?: string;
  itemsText?: string;
  trackingUrl: string;
  adminOrderUrl?: string;
  supportEmail: string;
  supportHtml?: string;
  supportText?: string;
  supportContactUrl?: string;
  supportUrl?: string;
  siteUrl?: string;
  footerText?: string;
};

export type NotificationTemplateDefinition = {
  id: NotificationTemplateId;
  channel: NotificationChannel;
  trigger: NotificationTrigger;
  subject: string;
  /** Semantic HTML body with {{variable}} placeholders. */
  bodyHtml: string;
  /** Plain-text fallback. */
  bodyText: string;
  active: boolean;
};

export type NotificationSendRequest = {
  trigger: NotificationTrigger;
  channel?: NotificationChannel;
  recipient: string;
  orderId: string;
  variables: NotificationTemplateVariableMap;
  /** Idempotency key to prevent duplicate sends. */
  idempotencyKey?: string;
};

export type NotificationRecord = {
  id: string;
  orderId: string;
  channel: NotificationChannel;
  templateId: NotificationTemplateId;
  trigger: NotificationTrigger;
  recipient: string;
  status: NotificationDeliveryStatus;
  subject: string;
  /** Rendered body snapshot (optional; may be omitted for privacy). */
  bodyPreview?: string;
  errorMessage?: string;
  providerId?: string;
  providerMessageId?: string;
  createdAt: string;
  sentAt?: string;
  /** History is immutable — never delete. */
  immutable: true;
};

/**
 * Provider-independent delivery contract.
 * Concrete adapters (Resend, SES, etc.) implement this later.
 */
export type NotificationProvider = {
  id: string;
  channel: NotificationChannel;
  send: (input: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }) => Promise<{ messageId: string }>;
};

export type NotificationService = {
  dispatch: (request: NotificationSendRequest) => Promise<NotificationRecord>;
  getHistoryByOrderId: (orderId: string) => Promise<NotificationRecord[]>;
};
