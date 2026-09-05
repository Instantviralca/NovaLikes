/**
 * Persistence contracts — Document 11 / launch blockers.
 */

import type { Order, OrderInternalNote } from '@/types/order';
import type { NotificationRecord } from '@/types/notification';
import type { ContactFormValues } from '@/lib/contact/validation';

export type ContactMessageRecord = ContactFormValues & {
  id: string;
  createdAt: string;
  userAgent?: string;
};

export type WebhookEventRecord = {
  id: string;
  provider: string;
  eventId: string;
  eventType: string;
  paymentId?: string;
  processedAt: string;
  rawSummary?: string;
};

export type AdminAuditRecord = {
  id: string;
  actorId: string;
  action: string;
  targetType?: string;
  targetId?: string;
  reason?: string;
  createdAt: string;
  meta?: Record<string, string | number | boolean>;
};

export type AdminSessionRecord = {
  id: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt?: string | null;
  createdAt: string;
};

export type PersistenceDriver = 'postgres' | 'memory' | 'file';

export type OrderStore = {
  listOrders(): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrderByPublicNumber?(publicNumber: number): Promise<Order | null>;
  getOrderByIdempotencyKey(key: string): Promise<Order | null>;
  getOrderByPaymentId(paymentId: string): Promise<Order | null>;
  /** Atomically allocate the next public_number (Postgres sequence / memory counter). */
  allocatePublicOrderNumber(): Promise<number>;
  /**
   * Ensure an existing order has a public_number.
   * Used to repair NULL public_number rows on idempotent checkout retry.
   * Concurrent callers must assign at most one number to the same order.
   */
  ensurePublicOrderNumber(orderId: string): Promise<Order>;
  saveOrder(order: Order): Promise<Order>;
  addInternalNote(orderId: string, note: OrderInternalNote): Promise<OrderInternalNote>;
};

export type ContactStore = {
  saveContactMessage(
    values: ContactFormValues,
    meta?: { userAgent?: string },
  ): Promise<ContactMessageRecord>;
  listContactMessages(): Promise<ContactMessageRecord[]>;
};

export type NotificationStore = {
  saveNotification(record: NotificationRecord & { idempotencyKey?: string }): Promise<NotificationRecord>;
  findByIdempotencyKey(key: string): Promise<NotificationRecord | null>;
  listByOrderId(orderId: string): Promise<NotificationRecord[]>;
};

export type WebhookStore = {
  hasProcessed(provider: string, eventId: string): Promise<boolean>;
  markProcessed(event: WebhookEventRecord): Promise<void>;
};

export type AdminAuthStore = {
  recordLoginAttempt(ipHash: string, success: boolean): Promise<void>;
  countRecentFailures(ipHash: string, sinceIso: string): Promise<number>;
  createSession(session: AdminSessionRecord): Promise<void>;
  getSessionByTokenHash(tokenHash: string): Promise<AdminSessionRecord | null>;
  revokeSession(tokenHash: string): Promise<void>;
  writeAudit(event: AdminAuditRecord): Promise<void>;
};

export type AnalyticsEventRecord = {
  id: string;
  eventName: string;
  sessionId: string;
  pagePath: string;
  country: string;
  metadata?: Record<string, string | number | boolean | null>;
  createdAt: string;
  visitorId?: string | null;
  eventCategory?: string | null;
  pageType?: string | null;
  serviceSlug?: string | null;
  packageId?: string | null;
  market?: string | null;
  locale?: string | null;
  referrer?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  content?: string | null;
  term?: string | null;
  deviceType?: string | null;
  browserFamily?: string | null;
  osFamily?: string | null;
  properties?: Record<string, string | number | boolean | null>;
  occurredAt?: string | null;
  /** Milestone idempotency (e.g. session:<id>:started). Null for multi-fire events. */
  idempotencyKey?: string | null;
};

export type AnalyticsVisitorRecord = {
  id: string;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type AnalyticsSessionRecord = {
  id: string;
  visitorId: string;
  startedAt: string;
  lastActivityAt: string;
  landingPath?: string | null;
  landingPageType?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  market?: string | null;
  locale?: string | null;
  deviceType?: string | null;
  browserFamily?: string | null;
  osFamily?: string | null;
  countryCode: string;
  isBot: boolean;
  sourceChannel?: string | null;
};

export type AnalyticsSessionUpsertResult = { created: boolean };

export type AnalyticsStore = {
  insertAnalyticsEvents(events: AnalyticsEventRecord[]): Promise<void>;
  listAnalyticsEvents(sinceIso: string): Promise<AnalyticsEventRecord[]>;
  listAnalyticsSessions?(sinceIso: string): Promise<AnalyticsSessionRecord[]>;
  upsertAnalyticsVisitor?(visitor: AnalyticsVisitorRecord): Promise<void>;
  /**
   * Insert session if absent; on conflict only refresh lastActivityAt
   * (never overwrite landing/UTM first-touch fields). Returns whether the row was new.
   */
  upsertAnalyticsSession?(
    session: AnalyticsSessionRecord,
  ): Promise<AnalyticsSessionUpsertResult | void>;
  hasAnalyticsEventId?(id: string): Promise<boolean>;
};

export type EmailSubscriberRecord = {
  id: string;
  email: string;
  source: 'checkout';
  marketingOptIn: boolean;
  optedInAt?: string | null;
  unsubscribedAt?: string | null;
  unsubscribeToken: string;
  createdAt: string;
  updatedAt: string;
};

export type EmailCampaignRecord = {
  id: string;
  subject: string;
  bodyPreview: string;
  couponCode?: string | null;
  sentCount: number;
  failedCount: number;
  createdAt: string;
  createdBy: string;
};

export type EmailMarketingStore = {
  upsertMarketingSubscriber(input: {
    email: string;
    source?: 'checkout';
    marketingOptIn: boolean;
  }): Promise<EmailSubscriberRecord | null>;
  listOptedInSubscribers(): Promise<EmailSubscriberRecord[]>;
  countOptedInSubscribers(): Promise<number>;
  getSubscriberByUnsubscribeToken(token: string): Promise<EmailSubscriberRecord | null>;
  unsubscribeByToken(token: string): Promise<EmailSubscriberRecord | null>;
  saveEmailCampaign(campaign: EmailCampaignRecord): Promise<EmailCampaignRecord>;
  listEmailCampaigns(limit?: number): Promise<EmailCampaignRecord[]>;
};

export type AppPersistence = OrderStore &
  ContactStore &
  NotificationStore &
  WebhookStore &
  AdminAuthStore &
  AnalyticsStore &
  EmailMarketingStore & {
    driver: PersistenceDriver;
    resetForTests?: () => void;
  };
