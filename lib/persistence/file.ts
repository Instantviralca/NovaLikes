/**
 * File-backed persistence — development only when IV_ALLOW_FILE_STORE=1.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import type { ContactFormValues } from '@/lib/contact/validation';
import type {
  AdminAuditRecord,
  AdminSessionRecord,
  AnalyticsEventRecord,
  AnalyticsSessionRecord,
  AnalyticsVisitorRecord,
  AppPersistence,
  ContactMessageRecord,
  EmailCampaignRecord,
  EmailSubscriberRecord,
  WebhookEventRecord,
} from '@/lib/persistence/types';
import { PUBLIC_ORDER_NUMBER_START } from '@/lib/orders/public-number';
import type { Order, OrderInternalNote } from '@/types/order';
import type { NotificationRecord } from '@/types/notification';
import { createEmailMarketingApi } from '@/lib/persistence/email-marketing-memory';

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(DATA_DIR, 'persistence.json');

type FileState = {
  orders: Array<Order & { idempotencyKey?: string }>;
  contacts: ContactMessageRecord[];
  notifications: Array<NotificationRecord & { idempotencyKey?: string }>;
  webhooks: WebhookEventRecord[];
  loginAttempts: Array<{ id: string; ipHash: string; success: boolean; createdAt: string }>;
  sessions: AdminSessionRecord[];
  audits: AdminAuditRecord[];
  analyticsEvents: AnalyticsEventRecord[];
  analyticsVisitors: AnalyticsVisitorRecord[];
  analyticsSessions: AnalyticsSessionRecord[];
  emailSubscribers: EmailSubscriberRecord[];
  emailCampaigns: EmailCampaignRecord[];
  nextPublicNumber: number;
  updatedAt: string;
};

function emptyState(): FileState {
  return {
    orders: [],
    contacts: [],
    notifications: [],
    webhooks: [],
    loginAttempts: [],
    sessions: [],
    audits: [],
    analyticsEvents: [],
    analyticsVisitors: [],
    analyticsSessions: [],
    emailSubscribers: [],
    emailCampaigns: [],
    nextPublicNumber: PUBLIC_ORDER_NUMBER_START,
    updatedAt: new Date().toISOString(),
  };
}

function read(): FileState {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_FILE)) {
    const state = emptyState();
    write(state);
    return state;
  }
  try {
    const parsed = JSON.parse(readFileSync(STORE_FILE, 'utf8')) as Partial<FileState>;
    return {
      ...emptyState(),
      ...parsed,
      analyticsEvents: parsed.analyticsEvents ?? [],
      analyticsVisitors: parsed.analyticsVisitors ?? [],
      analyticsSessions: parsed.analyticsSessions ?? [],
      emailSubscribers: parsed.emailSubscribers ?? [],
      emailCampaigns: parsed.emailCampaigns ?? [],
      nextPublicNumber:
        typeof parsed.nextPublicNumber === 'number' && parsed.nextPublicNumber >= PUBLIC_ORDER_NUMBER_START
          ? parsed.nextPublicNumber
          : PUBLIC_ORDER_NUMBER_START,
    };
  } catch {
    return emptyState();
  }
}

function write(state: FileState): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  state.updatedAt = new Date().toISOString();
  writeFileSync(STORE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

export function createFilePersistence(): AppPersistence {
  return {
    driver: 'file',
    async listOrders() {
      return [...read().orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getOrderById(orderId) {
      return read().orders.find((o) => o.id === orderId) ?? null;
    },
    async getOrderByPublicNumber(publicNumber) {
      return read().orders.find((o) => o.publicNumber === publicNumber) ?? null;
    },
    async getOrderByIdempotencyKey(key) {
      return read().orders.find((o) => o.idempotencyKey === key) ?? null;
    },
    async getOrderByPaymentId(paymentId) {
      return read().orders.find((o) => o.payment?.paymentId === paymentId) ?? null;
    },
    async allocatePublicOrderNumber() {
      const state = read();
      const n = state.nextPublicNumber;
      state.nextPublicNumber = n + 1;
      write(state);
      return n;
    },
    async saveOrder(order) {
      const state = read();
      const withKey = order as Order & { idempotencyKey?: string };
      const index = state.orders.findIndex((o) => o.id === order.id);
      if (index >= 0) state.orders[index] = withKey;
      else state.orders.unshift(withKey);
      write(state);
      return withKey;
    },
    async addInternalNote(orderId, note: OrderInternalNote) {
      const order = await this.getOrderById(orderId);
      if (!order) throw new Error('Order not found');
      const updated = {
        ...order,
        internalNotes: [...order.internalNotes, note],
        updatedAt: new Date().toISOString(),
      };
      await this.saveOrder(updated);
      return note;
    },
    async saveContactMessage(values: ContactFormValues, meta) {
      const state = read();
      const record: ContactMessageRecord = {
        ...values,
        id: `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        userAgent: meta?.userAgent,
      };
      state.contacts.unshift(record);
      write(state);
      return record;
    },
    async listContactMessages() {
      return [...read().contacts];
    },
    async saveNotification(record) {
      const state = read();
      state.notifications.unshift(record);
      write(state);
      return record;
    },
    async findByIdempotencyKey(key) {
      return read().notifications.find((n) => n.idempotencyKey === key) ?? null;
    },
    async listByOrderId(orderId) {
      return read().notifications.filter((n) => n.orderId === orderId);
    },
    async hasProcessed(provider, eventId) {
      return read().webhooks.some((w) => w.provider === provider && w.eventId === eventId);
    },
    async markProcessed(event) {
      const state = read();
      state.webhooks.push(event);
      write(state);
    },
    async recordLoginAttempt(ipHash, success) {
      const state = read();
      state.loginAttempts.push({
        id: `la_${Date.now().toString(36)}`,
        ipHash,
        success,
        createdAt: new Date().toISOString(),
      });
      write(state);
    },
    async countRecentFailures(ipHash, sinceIso) {
      return read().loginAttempts.filter(
        (a) => a.ipHash === ipHash && !a.success && a.createdAt >= sinceIso,
      ).length;
    },
    async createSession(session) {
      const state = read();
      state.sessions.push(session);
      write(state);
    },
    async getSessionByTokenHash(tokenHash) {
      return read().sessions.find((s) => s.tokenHash === tokenHash) ?? null;
    },
    async revokeSession(tokenHash) {
      const state = read();
      const session = state.sessions.find((s) => s.tokenHash === tokenHash);
      if (session) {
        session.revokedAt = new Date().toISOString();
        write(state);
      }
    },
    async writeAudit(event) {
      const state = read();
      state.audits.push(event);
      write(state);
    },
    async insertAnalyticsEvents(events) {
      if (!events.length) return;
      const state = read();
      for (const event of events) {
        if (state.analyticsEvents.some((e) => e.id === event.id)) continue;
        if (
          event.idempotencyKey &&
          state.analyticsEvents.some((e) => e.idempotencyKey === event.idempotencyKey)
        ) {
          continue;
        }
        state.analyticsEvents.push(event);
      }
      if (state.analyticsEvents.length > 20_000) {
        state.analyticsEvents = state.analyticsEvents.slice(-20_000);
      }
      write(state);
    },
    async listAnalyticsEvents(sinceIso) {
      return read()
        .analyticsEvents.filter((e) => e.createdAt >= sinceIso)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async listAnalyticsSessions(sinceIso) {
      return read()
        .analyticsSessions.filter((s) => s.startedAt >= sinceIso)
        .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
    },
    async upsertAnalyticsVisitor(visitor) {
      const state = read();
      if (!state.analyticsVisitors) state.analyticsVisitors = [];
      const existing = state.analyticsVisitors.find((v) => v.id === visitor.id);
      if (existing) {
        existing.lastSeenAt = visitor.lastSeenAt;
      } else {
        state.analyticsVisitors.push(visitor);
      }
      write(state);
    },
    async upsertAnalyticsSession(session) {
      const state = read();
      if (!state.analyticsSessions) state.analyticsSessions = [];
      const existing = state.analyticsSessions.find((s) => s.id === session.id);
      if (existing) {
        existing.lastActivityAt = session.lastActivityAt;
        write(state);
        return { created: false };
      }
      state.analyticsSessions.push(session);
      write(state);
      return { created: true };
    },
    async hasAnalyticsEventId(id) {
      return read().analyticsEvents.some((e) => e.id === id);
    },
    ...createEmailMarketingApi(
      () => read(),
      (state) => {
        const full = read();
        full.emailSubscribers = state.emailSubscribers;
        full.emailCampaigns = state.emailCampaigns;
        write(full);
      },
    ),
  };
}
