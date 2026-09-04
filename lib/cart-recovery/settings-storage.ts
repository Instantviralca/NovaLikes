/**
 * Thin site_settings accessors for cart-recovery JSON config.
 * Uses the same DB / memory pattern as payment website settings.
 */

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';

const memory = new Map<string, string>();

export async function getSiteSettingValue(key: string): Promise<string | null> {
  if (memory.has(key)) return memory.get(key) ?? null;
  if (!isDatabaseConfigured() || process.env.NODE_ENV === 'test') {
    return null;
  }
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(tables.siteSettings)
      .where(eq(tables.siteSettings.key, key))
      .limit(1);
    if (row?.value) {
      memory.set(key, row.value);
      return row.value;
    }
  } catch {
    return null;
  }
  return null;
}

export async function setSiteSettingValue(key: string, value: string): Promise<void> {
  memory.set(key, value);
  if (!isDatabaseConfigured() || process.env.NODE_ENV === 'test') return;
  const db = getDb();
  const now = new Date();
  await db
    .insert(tables.siteSettings)
    .values({ key, value, updatedAt: now })
    .onConflictDoUpdate({
      target: tables.siteSettings.key,
      set: { value, updatedAt: now },
    });
}

/** Test helper */
export function resetCartRecoverySettingsMemoryForTests(): void {
  memory.clear();
}
