/**
 * Idempotent scheduled publishing.
 * Usage: npx tsx scripts/publish-scheduled.ts
 *        npm run publish:scheduled
 *
 * Production: requires DATABASE_URL. Overlapping cron runs skip via a file lock.
 * Always closes the Postgres client so the process can exit after cron work.
 */

import { isDatabaseConfigured, isProductionRuntime } from '@/lib/config/env';
import { closeDb } from '@/lib/db/client';
import { tryAcquireCronLock, type CronLock } from '@/lib/process/cron-lock';
import { loadAppEnvFiles } from './lib/load-env-file';

export type PublishScheduledResult =
  | { status: 'skipped_lock' }
  | { status: 'published'; ids: string[] }
  | { status: 'failed'; error: unknown };

/**
 * Acquire lock → publish due scheduled articles → always release lock and close DB.
 * Sets process.exitCode = 1 on real failures (does not force-exit on success).
 */
export async function runPublishScheduled(options?: {
  lockPath?: string;
}): Promise<PublishScheduledResult> {
  loadAppEnvFiles();

  if (isProductionRuntime() && !isDatabaseConfigured()) {
    console.error('[publish:scheduled] DATABASE_URL is required in production.');
    process.exitCode = 1;
    return { status: 'failed', error: new Error('DATABASE_URL is required in production.') };
  }

  const lock: CronLock | null = tryAcquireCronLock(options?.lockPath);
  if (!lock) {
    console.log('[publish:scheduled] skipped — another publisher is already running');
    return { status: 'skipped_lock' };
  }

  try {
    const { publishDueScheduledArticles } = await import('@/lib/cms/articles');
    const ids = await publishDueScheduledArticles();
    console.log(
      `[publish:scheduled] published ${ids.length} article(s)${ids.length ? `: ${ids.join(', ')}` : ''}`,
    );
    return { status: 'published', ids };
  } catch (error) {
    console.error('[publish:scheduled]', error instanceof Error ? error.message : error);
    process.exitCode = 1;
    return { status: 'failed', error };
  } finally {
    lock.release();
    await closeDb().catch(() => undefined);
  }
}

function isExecutedDirectly(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return /publish-scheduled\.(ts|js|mts|mjs|cjs)$/i.test(entry.replace(/\\/g, '/'));
}

if (isExecutedDirectly()) {
  void runPublishScheduled().catch(async (error) => {
    console.error('[publish:scheduled]', error instanceof Error ? error.message : error);
    process.exitCode = 1;
    await closeDb().catch(() => undefined);
  });
}
