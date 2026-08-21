/**
 * Site settings — admin-editable key/value store.
 * Postgres when DATABASE_URL is set; otherwise in-memory (+ optional env fallback).
 */

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';

export const SETTING_PAYMENT_WEBSITE = 'payment_website' as const;
export const SETTING_ADMIN_EMAIL = 'admin_notification_email' as const;

const memoryStore = new Map<string, string>();

function trimUrl(value: string | undefined | null): string {
  return (value ?? '').trim().replace(/\/$/, '');
}

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

/** Payment collection website URL (Woo remote-payment client setting). */
export async function getPaymentWebsiteUrl(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_PAYMENT_WEBSITE);
  if (fromMemory) return trimUrl(fromMemory);

  const fromDb = await readFromDb(SETTING_PAYMENT_WEBSITE);
  if (fromDb) {
    const trimmed = trimUrl(fromDb);
    memoryStore.set(SETTING_PAYMENT_WEBSITE, trimmed);
    return trimmed;
  }

  const fromEnv = trimUrl(process.env.REMOTE_PAYMENT_WEBSITE_URL);
  if (fromEnv) {
    memoryStore.set(SETTING_PAYMENT_WEBSITE, fromEnv);
    return fromEnv;
  }

  return '';
}

export async function setPaymentWebsiteUrl(url: string): Promise<string> {
  const trimmed = trimUrl(url);
  if (!trimmed) {
    throw new Error('Payment website URL is required.');
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error('Payment website URL must be http(s).');
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('http')) throw error;
    throw new Error('Enter a valid payment website URL (without trailing slash).');
  }
  await writeToDb(SETTING_PAYMENT_WEBSITE, trimmed);
  return trimmed;
}

export async function isRemotePaymentConfigured(): Promise<boolean> {
  return Boolean(await getPaymentWebsiteUrl());
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
