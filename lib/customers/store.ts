/**
 * Customer accounts persistence — Postgres when DATABASE_URL is set; memory for tests.
 * Not part of AppPersistence.
 */

import { and, desc, eq, gte, isNull, ne, sql } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { createCustomerId } from '@/lib/customers/ids';
import type {
  CustomerEmailCodeRecord,
  CustomerRecord,
  CustomerSessionRecord,
  CustomerStatus,
  EmailCodePurpose,
} from '@/lib/customers/types';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';

function isMemoryBackend(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.IV_PERSISTENCE === 'memory' ||
    !isDatabaseConfigured()
  );
}

type MemoryState = {
  customers: CustomerRecord[];
  sessions: CustomerSessionRecord[];
  codes: CustomerEmailCodeRecord[];
  attempts: {
    id: string;
    ipHash: string;
    emailHash: string | null;
    success: boolean;
    createdAt: string;
  }[];
};

const memory: MemoryState = {
  customers: [],
  sessions: [],
  codes: [],
  attempts: [],
};

export function resetCustomerStoreForTests(): void {
  memory.customers = [];
  memory.sessions = [];
  memory.codes = [];
  memory.attempts = [];
}

function rowToCustomer(row: typeof tables.customers.$inferSelect): CustomerRecord {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    passwordHash: row.passwordHash,
    emailVerifiedAt: row.emailVerifiedAt?.toISOString() ?? null,
    status: row.status as CustomerStatus,
    marketingOptIn: row.marketingOptIn,
    whatsappNumber: row.whatsappNumber,
    tiktokUsername: row.tiktokUsername,
    instagramUsername: row.instagramUsername,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    lastLoginAt: row.lastLoginAt?.toISOString() ?? null,
  };
}

function rowToSession(
  row: typeof tables.customerSessions.$inferSelect,
): CustomerSessionRecord {
  return {
    id: row.id,
    customerId: row.customerId,
    tokenHash: row.tokenHash,
    expiresAt: row.expiresAt.toISOString(),
    revokedAt: row.revokedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    lastSeenAt: row.lastSeenAt?.toISOString() ?? null,
  };
}

function rowToCode(
  row: typeof tables.customerEmailCodes.$inferSelect,
): CustomerEmailCodeRecord {
  return {
    id: row.id,
    email: row.email,
    purpose: row.purpose as EmailCodePurpose,
    codeHash: row.codeHash,
    attempts: row.attempts,
    expiresAt: row.expiresAt.toISOString(),
    consumedAt: row.consumedAt?.toISOString() ?? null,
    ipHash: row.ipHash,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getCustomerByEmail(email: string): Promise<CustomerRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (isMemoryBackend()) {
    return memory.customers.find((c) => c.email === normalized) ?? null;
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.customers)
    .where(eq(tables.customers.email, normalized))
    .limit(1);
  return rows[0] ? rowToCustomer(rows[0]) : null;
}

export async function getCustomerById(id: string): Promise<CustomerRecord | null> {
  if (isMemoryBackend()) {
    return memory.customers.find((c) => c.id === id) ?? null;
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.customers)
    .where(eq(tables.customers.id, id))
    .limit(1);
  return rows[0] ? rowToCustomer(rows[0]) : null;
}

export async function insertCustomer(input: {
  email: string;
  name?: string | null;
  passwordHash?: string | null;
  marketingOptIn?: boolean;
  emailVerifiedAt?: string | null;
}): Promise<CustomerRecord> {
  const now = new Date().toISOString();
  const record: CustomerRecord = {
    id: createCustomerId('cus'),
    email: input.email.trim().toLowerCase(),
    name: input.name?.trim() || null,
    passwordHash: input.passwordHash ?? null,
    emailVerifiedAt: input.emailVerifiedAt ?? null,
    status: 'active',
    marketingOptIn: Boolean(input.marketingOptIn),
    whatsappNumber: null,
    tiktokUsername: null,
    instagramUsername: null,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  };

  if (isMemoryBackend()) {
    memory.customers.push(record);
    return record;
  }

  const db = getDb();
  await db.insert(tables.customers).values({
    id: record.id,
    email: record.email,
    name: record.name,
    passwordHash: record.passwordHash,
    emailVerifiedAt: record.emailVerifiedAt ? new Date(record.emailVerifiedAt) : null,
    status: record.status,
    marketingOptIn: record.marketingOptIn,
    whatsappNumber: null,
    tiktokUsername: null,
    instagramUsername: null,
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
    lastLoginAt: null,
  });
  return record;
}

export async function updateCustomer(
  id: string,
  patch: Partial<{
    name: string | null;
    passwordHash: string | null;
    emailVerifiedAt: string | null;
    status: CustomerStatus;
    marketingOptIn: boolean;
    whatsappNumber: string | null;
    tiktokUsername: string | null;
    instagramUsername: string | null;
    lastLoginAt: string | null;
  }>,
): Promise<CustomerRecord | null> {
  const existing = await getCustomerById(id);
  if (!existing) return null;
  const updated: CustomerRecord = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  if (isMemoryBackend()) {
    const idx = memory.customers.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    memory.customers[idx] = updated;
    return updated;
  }

  const db = getDb();
  await db
    .update(tables.customers)
    .set({
      name: updated.name,
      passwordHash: updated.passwordHash,
      emailVerifiedAt: updated.emailVerifiedAt
        ? new Date(updated.emailVerifiedAt)
        : null,
      status: updated.status,
      marketingOptIn: updated.marketingOptIn,
      whatsappNumber: updated.whatsappNumber,
      tiktokUsername: updated.tiktokUsername,
      instagramUsername: updated.instagramUsername,
      lastLoginAt: updated.lastLoginAt ? new Date(updated.lastLoginAt) : null,
      updatedAt: new Date(updated.updatedAt),
    })
    .where(eq(tables.customers.id, id));
  return updated;
}

export async function createCustomerSessionRow(input: {
  id: string;
  customerId: string;
  tokenHash: string;
  expiresAt: string;
}): Promise<CustomerSessionRecord> {
  const now = new Date().toISOString();
  const row: CustomerSessionRecord = {
    id: input.id,
    customerId: input.customerId,
    tokenHash: input.tokenHash,
    expiresAt: input.expiresAt,
    revokedAt: null,
    createdAt: now,
    lastSeenAt: now,
  };
  if (isMemoryBackend()) {
    memory.sessions.push(row);
    return row;
  }
  const db = getDb();
  await db.insert(tables.customerSessions).values({
    id: row.id,
    customerId: row.customerId,
    tokenHash: row.tokenHash,
    expiresAt: new Date(row.expiresAt),
    revokedAt: null,
    createdAt: new Date(row.createdAt),
    lastSeenAt: new Date(row.lastSeenAt!),
  });
  return row;
}

export async function getCustomerSessionByHash(
  tokenHash: string,
): Promise<CustomerSessionRecord | null> {
  if (isMemoryBackend()) {
    return memory.sessions.find((s) => s.tokenHash === tokenHash) ?? null;
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.customerSessions)
    .where(eq(tables.customerSessions.tokenHash, tokenHash))
    .limit(1);
  return rows[0] ? rowToSession(rows[0]) : null;
}

export async function revokeCustomerSessionByHash(tokenHash: string): Promise<void> {
  const now = new Date().toISOString();
  if (isMemoryBackend()) {
    const session = memory.sessions.find((s) => s.tokenHash === tokenHash);
    if (session && !session.revokedAt) session.revokedAt = now;
    return;
  }
  const db = getDb();
  await db
    .update(tables.customerSessions)
    .set({ revokedAt: new Date(now) })
    .where(
      and(
        eq(tables.customerSessions.tokenHash, tokenHash),
        isNull(tables.customerSessions.revokedAt),
      ),
    );
}

export async function revokeAllCustomerSessions(customerId: string): Promise<void> {
  const now = new Date().toISOString();
  if (isMemoryBackend()) {
    for (const session of memory.sessions) {
      if (session.customerId === customerId && !session.revokedAt) {
        session.revokedAt = now;
      }
    }
    return;
  }
  const db = getDb();
  await db
    .update(tables.customerSessions)
    .set({ revokedAt: new Date(now) })
    .where(
      and(
        eq(tables.customerSessions.customerId, customerId),
        isNull(tables.customerSessions.revokedAt),
      ),
    );
}

export async function revokeOtherCustomerSessions(
  customerId: string,
  keepSessionId: string,
): Promise<void> {
  const now = new Date().toISOString();
  if (isMemoryBackend()) {
    for (const session of memory.sessions) {
      if (
        session.customerId === customerId &&
        session.id !== keepSessionId &&
        !session.revokedAt
      ) {
        session.revokedAt = now;
      }
    }
    return;
  }
  const db = getDb();
  await db
    .update(tables.customerSessions)
    .set({ revokedAt: new Date(now) })
    .where(
      and(
        eq(tables.customerSessions.customerId, customerId),
        isNull(tables.customerSessions.revokedAt),
        ne(tables.customerSessions.id, keepSessionId),
      ),
    );
}

export async function touchCustomerSession(
  sessionId: string,
  expiresAt: string,
): Promise<void> {
  const now = new Date().toISOString();
  if (isMemoryBackend()) {
    const session = memory.sessions.find((s) => s.id === sessionId);
    if (session) {
      session.lastSeenAt = now;
      session.expiresAt = expiresAt;
    }
    return;
  }
  const db = getDb();
  await db
    .update(tables.customerSessions)
    .set({ lastSeenAt: new Date(now), expiresAt: new Date(expiresAt) })
    .where(eq(tables.customerSessions.id, sessionId));
}

export async function createEmailCodeRow(input: {
  email: string;
  purpose: EmailCodePurpose;
  codeHash: string;
  expiresAt: string;
  ipHash?: string | null;
}): Promise<CustomerEmailCodeRecord> {
  const row: CustomerEmailCodeRecord = {
    id: createCustomerId('cec'),
    email: input.email.trim().toLowerCase(),
    purpose: input.purpose,
    codeHash: input.codeHash,
    attempts: 0,
    expiresAt: input.expiresAt,
    consumedAt: null,
    ipHash: input.ipHash ?? null,
    createdAt: new Date().toISOString(),
  };
  if (isMemoryBackend()) {
    memory.codes.push(row);
    return row;
  }
  const db = getDb();
  await db.insert(tables.customerEmailCodes).values({
    id: row.id,
    email: row.email,
    purpose: row.purpose,
    codeHash: row.codeHash,
    attempts: 0,
    expiresAt: new Date(row.expiresAt),
    consumedAt: null,
    ipHash: row.ipHash,
    createdAt: new Date(row.createdAt),
  });
  return row;
}

export async function getLatestActiveEmailCode(
  email: string,
  purpose: EmailCodePurpose,
): Promise<CustomerEmailCodeRecord | null> {
  const normalized = email.trim().toLowerCase();
  const now = Date.now();
  if (isMemoryBackend()) {
    return (
      memory.codes
        .filter(
          (c) =>
            c.email === normalized &&
            c.purpose === purpose &&
            !c.consumedAt &&
            new Date(c.expiresAt).getTime() > now,
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.customerEmailCodes)
    .where(
      and(
        eq(tables.customerEmailCodes.email, normalized),
        eq(tables.customerEmailCodes.purpose, purpose),
        isNull(tables.customerEmailCodes.consumedAt),
        gte(tables.customerEmailCodes.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(tables.customerEmailCodes.createdAt))
    .limit(1);
  return rows[0] ? rowToCode(rows[0]) : null;
}

export async function getLatestEmailCodeAny(
  email: string,
  purpose: EmailCodePurpose,
): Promise<CustomerEmailCodeRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (isMemoryBackend()) {
    return (
      memory.codes
        .filter((c) => c.email === normalized && c.purpose === purpose)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
    );
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(tables.customerEmailCodes)
    .where(
      and(
        eq(tables.customerEmailCodes.email, normalized),
        eq(tables.customerEmailCodes.purpose, purpose),
      ),
    )
    .orderBy(desc(tables.customerEmailCodes.createdAt))
    .limit(1);
  return rows[0] ? rowToCode(rows[0]) : null;
}

export async function incrementEmailCodeAttempts(id: string): Promise<number> {
  if (isMemoryBackend()) {
    const code = memory.codes.find((c) => c.id === id);
    if (!code) return 0;
    code.attempts += 1;
    return code.attempts;
  }
  const db = getDb();
  const rows = await db
    .update(tables.customerEmailCodes)
    .set({ attempts: sql`${tables.customerEmailCodes.attempts} + 1` })
    .where(eq(tables.customerEmailCodes.id, id))
    .returning({ attempts: tables.customerEmailCodes.attempts });
  return rows[0]?.attempts ?? 0;
}

export async function consumeEmailCode(id: string): Promise<void> {
  const now = new Date().toISOString();
  if (isMemoryBackend()) {
    const code = memory.codes.find((c) => c.id === id);
    if (code) code.consumedAt = now;
    return;
  }
  const db = getDb();
  await db
    .update(tables.customerEmailCodes)
    .set({ consumedAt: new Date(now) })
    .where(eq(tables.customerEmailCodes.id, id));
}

export async function countEmailCodesSince(
  email: string,
  purpose: EmailCodePurpose,
  sinceIso: string,
): Promise<number> {
  const normalized = email.trim().toLowerCase();
  if (isMemoryBackend()) {
    return memory.codes.filter(
      (c) =>
        c.email === normalized &&
        c.purpose === purpose &&
        c.createdAt >= sinceIso,
    ).length;
  }
  const db = getDb();
  const rows = await db
    .select({ id: tables.customerEmailCodes.id })
    .from(tables.customerEmailCodes)
    .where(
      and(
        eq(tables.customerEmailCodes.email, normalized),
        eq(tables.customerEmailCodes.purpose, purpose),
        gte(tables.customerEmailCodes.createdAt, new Date(sinceIso)),
      ),
    );
  return rows.length;
}

export async function countEmailCodesForIpSince(
  ipHash: string,
  sinceIso: string,
): Promise<number> {
  if (isMemoryBackend()) {
    return memory.codes.filter(
      (c) => c.ipHash === ipHash && c.createdAt >= sinceIso,
    ).length;
  }
  const db = getDb();
  const rows = await db
    .select({ id: tables.customerEmailCodes.id })
    .from(tables.customerEmailCodes)
    .where(
      and(
        eq(tables.customerEmailCodes.ipHash, ipHash),
        gte(tables.customerEmailCodes.createdAt, new Date(sinceIso)),
      ),
    );
  return rows.length;
}

export async function recordLoginAttempt(input: {
  ipHash: string;
  emailHash?: string | null;
  success: boolean;
}): Promise<void> {
  const row = {
    id: createCustomerId('cla'),
    ipHash: input.ipHash,
    emailHash: input.emailHash ?? null,
    success: input.success,
    createdAt: new Date().toISOString(),
  };
  if (isMemoryBackend()) {
    memory.attempts.push(row);
    return;
  }
  const db = getDb();
  await db.insert(tables.customerLoginAttempts).values({
    id: row.id,
    ipHash: row.ipHash,
    emailHash: row.emailHash,
    success: row.success,
    createdAt: new Date(row.createdAt),
  });
}

export async function countRecentFailures(
  ipHash: string,
  emailHash: string | null,
  sinceIso: string,
): Promise<number> {
  if (isMemoryBackend()) {
    return memory.attempts.filter(
      (a) =>
        !a.success &&
        a.createdAt >= sinceIso &&
        a.ipHash === ipHash &&
        (emailHash ? a.emailHash === emailHash : true),
    ).length;
  }
  const db = getDb();
  const conditions = [
    eq(tables.customerLoginAttempts.ipHash, ipHash),
    eq(tables.customerLoginAttempts.success, false),
    gte(tables.customerLoginAttempts.createdAt, new Date(sinceIso)),
  ];
  if (emailHash) {
    conditions.push(eq(tables.customerLoginAttempts.emailHash, emailHash));
  }
  const rows = await db
    .select({ id: tables.customerLoginAttempts.id })
    .from(tables.customerLoginAttempts)
    .where(and(...conditions));
  return rows.length;
}
