/**
 * Site settings — admin-editable key/value store.
 * Postgres when DATABASE_URL is set; otherwise in-memory (+ optional env fallback).
 */

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import {
  MOLLIE_DEFAULT_PRODUCT_NAME,
  MOLLIE_DEFAULT_SERVER_URL,
  sanitizePaymentServerUrl,
} from '@/lib/payments/mollie-remote-protocol';

export const SETTING_PAYMENT_WEBSITE = 'payment_website' as const;
export const SETTING_REMOTE_PAYMENT_SHARED_SECRET = 'remote_payment_shared_secret' as const;
export const SETTING_REMOTE_PAYMENT_PRODUCT_NAME = 'remote_payment_product_name' as const;
export const SETTING_ADMIN_EMAIL = 'admin_notification_email' as const;

const memoryStore = new Map<string, string>();

function trimEmail(value: string | undefined | null): string {
  return (value ?? '').trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readFromDb(key: string): Promise<string | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(tables.siteSettings)
      .where(eq(tables.siteSettings.key, key))
      .limit(1);
    return row?.value ?? null;
  } catch {
    return null;
  }
}

async function writeToDb(key: string, value: string): Promise<void> {
  if (!isDatabaseConfigured()) {
    memoryStore.set(key, value);
    return;
  }
  const db = getDb();
  const now = new Date();
  await db
    .insert(tables.siteSettings)
    .values({ key, value, updatedAt: now })
    .onConflictDoUpdate({
      target: tables.siteSettings.key,
      set: { value, updatedAt: now },
    });
  memoryStore.set(key, value);
}

/** Mollie payment collection server URL (Admin setting → env → carrycubes default). */
export async function getPaymentWebsiteUrl(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_PAYMENT_WEBSITE);
  if (fromMemory) return sanitizePaymentServerUrl(fromMemory);

  const fromDb = await readFromDb(SETTING_PAYMENT_WEBSITE);
  if (fromDb) {
    const trimmed = sanitizePaymentServerUrl(fromDb);
    memoryStore.set(SETTING_PAYMENT_WEBSITE, trimmed);
    return trimmed;
  }

  const fromEnv = sanitizePaymentServerUrl(process.env.REMOTE_PAYMENT_WEBSITE_URL ?? '');
  if (fromEnv) {
    memoryStore.set(SETTING_PAYMENT_WEBSITE, fromEnv);
    return fromEnv;
  }

  return sanitizePaymentServerUrl(MOLLIE_DEFAULT_SERVER_URL);
}

export async function setPaymentWebsiteUrl(url: string): Promise<string> {
  const trimmed = sanitizePaymentServerUrl(url);
  if (!trimmed) {
    throw new Error('Enter a valid Mollie payment server URL (without trailing slash).');
  }
  await writeToDb(SETTING_PAYMENT_WEBSITE, trimmed);
  return trimmed;
}

export async function getRemotePaymentSharedSecret(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_REMOTE_PAYMENT_SHARED_SECRET);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_REMOTE_PAYMENT_SHARED_SECRET);
  if (fromDb) {
    memoryStore.set(SETTING_REMOTE_PAYMENT_SHARED_SECRET, fromDb);
    return fromDb;
  }

  const fromEnv = (process.env.REMOTE_PAYMENT_SHARED_SECRET ?? '').trim();
  if (fromEnv) {
    memoryStore.set(SETTING_REMOTE_PAYMENT_SHARED_SECRET, fromEnv);
    return fromEnv;
  }

  return '';
}

export async function setRemotePaymentSharedSecret(secret: string): Promise<void> {
  const trimmed = secret.trim();
  if (!trimmed) return;
  if (trimmed.length < 16) {
    throw new Error('Shared secret must be at least 16 characters.');
  }
  await writeToDb(SETTING_REMOTE_PAYMENT_SHARED_SECRET, trimmed);
}

export async function getRemotePaymentProductName(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_REMOTE_PAYMENT_PRODUCT_NAME);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_REMOTE_PAYMENT_PRODUCT_NAME);
  if (fromDb?.trim()) {
    const value = fromDb.trim();
    memoryStore.set(SETTING_REMOTE_PAYMENT_PRODUCT_NAME, value);
    return value;
  }

  const fromEnv = (process.env.REMOTE_PAYMENT_PRODUCT_NAME ?? '').trim();
  if (fromEnv) {
    memoryStore.set(SETTING_REMOTE_PAYMENT_PRODUCT_NAME, fromEnv);
    return fromEnv;
  }

  return MOLLIE_DEFAULT_PRODUCT_NAME;
}

export async function setRemotePaymentProductName(name: string): Promise<string> {
  const trimmed = name.trim() || MOLLIE_DEFAULT_PRODUCT_NAME;
  await writeToDb(SETTING_REMOTE_PAYMENT_PRODUCT_NAME, trimmed);
  return trimmed;
}

export async function isRemotePaymentConfigured(): Promise<boolean> {
  const [url, secret] = await Promise.all([
    getPaymentWebsiteUrl(),
    getRemotePaymentSharedSecret(),
  ]);
  return Boolean(url) && secret.trim().length >= 16;
}

/** Admin inbox for new orders + contact form (settings override → env). */
export async function getAdminNotificationEmail(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_ADMIN_EMAIL);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_ADMIN_EMAIL);
  if (fromDb) {
    const trimmed = trimEmail(fromDb);
    if (trimmed) {
      memoryStore.set(SETTING_ADMIN_EMAIL, trimmed);
      return trimmed;
    }
  }

  const fromEnv =
    trimEmail(process.env.ADMIN_EMAIL) ||
    trimEmail(process.env.EMAIL_ADMIN_TO) ||
    trimEmail(process.env.EMAIL_FROM) ||
    trimEmail(process.env.RESEND_FROM_EMAIL);
  if (fromEnv) {
    memoryStore.set(SETTING_ADMIN_EMAIL, fromEnv);
    return fromEnv;
  }
  return '';
}

export async function setAdminNotificationEmail(email: string): Promise<string> {
  const trimmed = trimEmail(email);
  if (!trimmed) {
    throw new Error('Admin notification email is required.');
  }
  if (!isValidEmail(trimmed)) {
    throw new Error('Enter a valid admin notification email.');
  }
  await writeToDb(SETTING_ADMIN_EMAIL, trimmed);
  return trimmed;
}
