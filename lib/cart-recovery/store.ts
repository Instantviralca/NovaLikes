/**
 * Cart recovery persistence — Postgres when DATABASE_URL is set; memory for tests/local.
 */

import { and, desc, eq, inArray, isNull, lte, ne, or, sql } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import type {
  CartRecoveryEvent,
  CartRecoveryEventType,
  CartRecoverySession,
  CartRecoveryStatus,
} from '@/types/cart-recovery';

function shouldUseMemoryStore(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.IV_PERSISTENCE === 'memory' ||
    !isDatabaseConfigured()
  );
}

const memorySessions = new Map<string, CartRecoverySession>();
const memoryEvents = new Map<string, CartRecoveryEvent[]>();

function rowToSession(row: typeof tables.cartRecoverySessions.$inferSelect): CartRecoverySession {
  return {
    id: row.id,
    publicId: row.publicId,
    email: row.email,
    customerName: row.customerName,
    whatsappNumber: row.whatsappNumber,
    currency: row.currency as CartRecoverySession['currency'],
    subtotalAmount: row.subtotalAmount,
    discountAmount: row.discountAmount,
    totalAmount: row.totalAmount,
    market: row.market,
    locale: row.locale,
    status: row.status as CartRecoveryStatus,
    cartSnapshot: row.cartSnapshot as CartRecoverySession['cartSnapshot'],
    checkoutSnapshot: (row.checkoutSnapshot as CartRecoverySession['checkoutSnapshot']) ?? null,
    recoveryTokenHash: row.recoveryTokenHash,
    unsubscribeTokenHash: row.unsubscribeTokenHash,
    unsubscribedAt: row.unsubscribedAt?.toISOString() ?? null,
    lastActivityAt: row.lastActivityAt.toISOString(),
    abandonedAt: row.abandonedAt?.toISOString() ?? null,
    recoveredAt: row.recoveredAt?.toISOString() ?? null,
    convertedAt: row.convertedAt?.toISOString() ?? null,
    orderId: row.orderId,
    landingPath: row.landingPath,
    referrer: row.referrer,
    checkoutPath: row.checkoutPath,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    expiresAt: row.expiresAt.toISOString(),
  };
}

function rowToEvent(row: typeof tables.cartRecoveryEvents.$inferSelect): CartRecoveryEvent {
  return {
    id: row.id,
    sessionId: row.sessionId,
    type: row.type as CartRecoveryEventType,
    emailStep: row.emailStep,
    idempotencyKey: row.idempotencyKey,
    providerMessageId: row.providerMessageId,
    errorMessage: row.errorMessage,
    meta: (row.meta as CartRecoveryEvent['meta']) ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function resetCartRecoveryStoreForTests(): void {
  memorySessions.clear();
  memoryEvents.clear();
}

export async function saveCartRecoverySession(
  session: CartRecoverySession,
): Promise<CartRecoverySession> {
  if (shouldUseMemoryStore()) {
    memorySessions.set(session.id, session);
    return session;
  }
  const db = getDb();
  const values = {
    id: session.id,
    publicId: session.publicId,
    email: session.email,
    customerName: session.customerName,
    whatsappNumber: session.whatsappNumber,
    currency: session.currency,
    subtotalAmount: session.subtotalAmount,
    discountAmount: session.discountAmount,
    totalAmount: session.totalAmount,
    market: session.market,
    locale: session.locale,
    status: session.status,
    cartSnapshot: session.cartSnapshot,
    checkoutSnapshot: session.checkoutSnapshot,
    recoveryTokenHash: session.recoveryTokenHash,
    unsubscribeTokenHash: session.unsubscribeTokenHash,
    unsubscribedAt: session.unsubscribedAt ? new Date(session.unsubscribedAt) : null,
    lastActivityAt: new Date(session.lastActivityAt),
    abandonedAt: session.abandonedAt ? new Date(session.abandonedAt) : null,
    recoveredAt: session.recoveredAt ? new Date(session.recoveredAt) : null,
    convertedAt: session.convertedAt ? new Date(session.convertedAt) : null,
    orderId: session.orderId,
    landingPath: session.landingPath,
    referrer: session.referrer,
    checkoutPath: session.checkoutPath,
    createdAt: new Date(session.createdAt),
    updatedAt: new Date(session.updatedAt),
    expiresAt: new Date(session.expiresAt),
  };
  await db
    .insert(tables.cartRecoverySessions)
    .values(values)
    .onConflictDoUpdate({
      target: tables.cartRecoverySessions.id,
      set: {
        publicId: values.publicId,
        email: values.email,
        customerName: values.customerName,
        whatsappNumber: values.whatsappNumber,
        currency: values.currency,
        subtotalAmount: values.subtotalAmount,
        discountAmount: values.discountAmount,
        totalAmount: values.totalAmount,
        market: values.market,
        locale: values.locale,
        status: values.status,
        cartSnapshot: values.cartSnapshot,
        checkoutSnapshot: values.checkoutSnapshot,
        recoveryTokenHash: values.recoveryTokenHash,
        unsubscribeTokenHash: values.unsubscribeTokenHash,
        unsubscribedAt: values.unsubscribedAt,
        lastActivityAt: values.lastActivityAt,
        abandonedAt: values.abandonedAt,
        recoveredAt: values.recoveredAt,
        convertedAt: values.convertedAt,
        orderId: values.orderId,
        landingPath: values.landingPath,
        referrer: values.referrer,
        checkoutPath: values.checkoutPath,
        updatedAt: values.updatedAt,
        expiresAt: values.expiresAt,
      },
    });
  return session;
}

export async function getCartRecoverySessionById(
  id: string,
): Promise<CartRecoverySession | null> {
  if (shouldUseMemoryStore()) return memorySessions.get(id) ?? null;
  const db = getDb();
  const [row] = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(eq(tables.cartRecoverySessions.id, id))
    .limit(1);
  return row ? rowToSession(row) : null;
}

export async function getCartRecoverySessionByPublicId(
  publicId: string,
): Promise<CartRecoverySession | null> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].find((s) => s.publicId === publicId) ?? null;
  }
  const db = getDb();
  const [row] = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(eq(tables.cartRecoverySessions.publicId, publicId))
    .limit(1);
  return row ? rowToSession(row) : null;
}

export async function getCartRecoverySessionByTokenHash(
  hash: string,
): Promise<CartRecoverySession | null> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].find((s) => s.recoveryTokenHash === hash) ?? null;
  }
  const db = getDb();
  const [row] = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(eq(tables.cartRecoverySessions.recoveryTokenHash, hash))
    .limit(1);
  return row ? rowToSession(row) : null;
}

export async function getCartRecoverySessionByUnsubscribeHash(
  hash: string,
): Promise<CartRecoverySession | null> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].find((s) => s.unsubscribeTokenHash === hash) ?? null;
  }
  const db = getDb();
  const [row] = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(eq(tables.cartRecoverySessions.unsubscribeTokenHash, hash))
    .limit(1);
  return row ? rowToSession(row) : null;
}

export async function findOpenCartRecoverySessionByEmail(
  email: string,
): Promise<CartRecoverySession | null> {
  const normalized = email.trim().toLowerCase();
  if (shouldUseMemoryStore()) {
    const open = [...memorySessions.values()]
      .filter(
        (s) =>
          s.email === normalized &&
          (s.status === 'active' || s.status === 'abandoned' || s.status === 'recovered') &&
          !s.convertedAt,
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return open[0] ?? null;
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(
      and(
        eq(tables.cartRecoverySessions.email, normalized),
        inArray(tables.cartRecoverySessions.status, ['active', 'abandoned', 'recovered']),
        isNull(tables.cartRecoverySessions.convertedAt),
      ),
    )
    .orderBy(desc(tables.cartRecoverySessions.updatedAt))
    .limit(1);
  return rows[0] ? rowToSession(rows[0]) : null;
}

export async function findCartRecoverySessionByOrderId(
  orderId: string,
): Promise<CartRecoverySession | null> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].find((s) => s.orderId === orderId) ?? null;
  }
  const db = getDb();
  const [row] = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(eq(tables.cartRecoverySessions.orderId, orderId))
    .limit(1);
  return row ? rowToSession(row) : null;
}

export async function listCartRecoverySessions(input?: {
  status?: CartRecoveryStatus | 'all';
  query?: string;
  limit?: number;
}): Promise<CartRecoverySession[]> {
  const limit = Math.min(input?.limit ?? 100, 500);
  if (shouldUseMemoryStore()) {
    let rows = [...memorySessions.values()];
    if (input?.status && input.status !== 'all') {
      rows = rows.filter((s) => s.status === input.status);
    }
    if (input?.query?.trim()) {
      const q = input.query.trim().toLowerCase();
      rows = rows.filter(
        (s) =>
          s.email.includes(q) ||
          (s.customerName ?? '').toLowerCase().includes(q) ||
          s.publicId.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q),
      );
    }
    return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
  }
  const db = getDb();
  const conditions = [];
  if (input?.status && input.status !== 'all') {
    conditions.push(eq(tables.cartRecoverySessions.status, input.status));
  }
  if (input?.query?.trim()) {
    const q = `%${input.query.trim().toLowerCase()}%`;
    conditions.push(
      or(
        sql`lower(${tables.cartRecoverySessions.email}) like ${q}`,
        sql`lower(coalesce(${tables.cartRecoverySessions.customerName}, '')) like ${q}`,
        sql`lower(${tables.cartRecoverySessions.publicId}) like ${q}`,
      )!,
    );
  }
  const rows = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(tables.cartRecoverySessions.updatedAt))
    .limit(limit);
  return rows.map(rowToSession);
}

export async function appendCartRecoveryEvent(
  event: CartRecoveryEvent,
): Promise<{ ok: true; duplicate?: boolean }> {
  if (shouldUseMemoryStore()) {
    if (event.idempotencyKey) {
      for (const list of memoryEvents.values()) {
        if (list.some((e) => e.idempotencyKey === event.idempotencyKey)) {
          return { ok: true, duplicate: true };
        }
      }
    }
    const list = memoryEvents.get(event.sessionId) ?? [];
    list.push(event);
    memoryEvents.set(event.sessionId, list);
    return { ok: true };
  }
  const db = getDb();
  try {
    await db.insert(tables.cartRecoveryEvents).values({
      id: event.id,
      sessionId: event.sessionId,
      type: event.type,
      emailStep: event.emailStep,
      idempotencyKey: event.idempotencyKey,
      providerMessageId: event.providerMessageId,
      errorMessage: event.errorMessage,
      meta: event.meta,
      createdAt: new Date(event.createdAt),
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (/unique|duplicate/i.test(message)) return { ok: true, duplicate: true };
    throw error;
  }
}

export async function listCartRecoveryEvents(
  sessionId: string,
): Promise<CartRecoveryEvent[]> {
  if (shouldUseMemoryStore()) {
    return [...(memoryEvents.get(sessionId) ?? [])].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.cartRecoveryEvents)
    .where(eq(tables.cartRecoveryEvents.sessionId, sessionId))
    .orderBy(tables.cartRecoveryEvents.createdAt);
  return rows.map(rowToEvent);
}

export async function hasCartRecoveryEvent(input: {
  sessionId: string;
  type?: CartRecoveryEventType;
  emailStep?: number;
  idempotencyKey?: string;
}): Promise<boolean> {
  if (input.idempotencyKey) {
    if (shouldUseMemoryStore()) {
      for (const list of memoryEvents.values()) {
        if (list.some((e) => e.idempotencyKey === input.idempotencyKey)) return true;
      }
      return false;
    }
    const db = getDb();
    const [row] = await db
      .select({ id: tables.cartRecoveryEvents.id })
      .from(tables.cartRecoveryEvents)
      .where(eq(tables.cartRecoveryEvents.idempotencyKey, input.idempotencyKey))
      .limit(1);
    return Boolean(row);
  }

  const events = await listCartRecoveryEvents(input.sessionId);
  return events.some(
    (e) =>
      (!input.type || e.type === input.type) &&
      (input.emailStep === undefined || e.emailStep === input.emailStep),
  );
}

export async function listSessionsDueForAbandonment(
  cutoffIso: string,
): Promise<CartRecoverySession[]> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].filter(
      (s) => s.status === 'active' && s.lastActivityAt <= cutoffIso && !s.unsubscribedAt,
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(
      and(
        eq(tables.cartRecoverySessions.status, 'active'),
        lte(tables.cartRecoverySessions.lastActivityAt, new Date(cutoffIso)),
        isNull(tables.cartRecoverySessions.unsubscribedAt),
      ),
    )
    .limit(500);
  return rows.map(rowToSession);
}

export async function listAbandonedSessionsForEmail(
  nowIso: string,
): Promise<CartRecoverySession[]> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].filter(
      (s) =>
        s.status === 'abandoned' &&
        !s.unsubscribedAt &&
        !s.convertedAt &&
        s.abandonedAt &&
        s.expiresAt > nowIso,
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(
      and(
        eq(tables.cartRecoverySessions.status, 'abandoned'),
        isNull(tables.cartRecoverySessions.unsubscribedAt),
        isNull(tables.cartRecoverySessions.convertedAt),
      ),
    )
    .limit(500);
  return rows.map(rowToSession).filter((s) => s.expiresAt > nowIso && Boolean(s.abandonedAt));
}

export async function listExpiredOpenSessions(nowIso: string): Promise<CartRecoverySession[]> {
  if (shouldUseMemoryStore()) {
    return [...memorySessions.values()].filter(
      (s) =>
        s.expiresAt <= nowIso &&
        s.status !== 'converted' &&
        s.status !== 'expired',
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.cartRecoverySessions)
    .where(
      and(
        lte(tables.cartRecoverySessions.expiresAt, new Date(nowIso)),
        ne(tables.cartRecoverySessions.status, 'converted'),
        ne(tables.cartRecoverySessions.status, 'expired'),
      ),
    )
    .limit(500);
  return rows.map(rowToSession);
}

/** Avoid unused import noise if drizzle helpers vary by branch. */
void sql;
