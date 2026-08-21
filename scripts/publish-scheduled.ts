/**
 * Idempotent scheduled publishing.
 * Usage: npx tsx scripts/publish-scheduled.ts
 *        npm run publish:scheduled
 *
 * Production: requires DATABASE_URL. Overlapping cron runs skip via a file lock.
 */

import { isDatabaseConfigured, isProductionRuntime } from '@/lib/config/env';
import { tryAcquireCronLock } from '@/lib/process/cron-lock';
import { loadAppEnvFiles } from './lib/load-env-file';

async function main() {
  loadAppEnvFiles();

  if (isProductionRuntime() && !isDatabaseConfigured()) {
    console.error('[publish:scheduled] DATABASE_URL is required in production.');
    process.exit(1);
  }

  const lock = tryAcquireCronLock();
  if (!lock) {
    console.log('[publish:scheduled] skipped — another publisher is already running');
    return;
  }

  try {
    const { publishDueScheduledArticles } = await import('@/lib/cms/articles');
    const ids = await publishDueScheduledArticles();
    console.log(
      `[publish:scheduled] published ${ids.length} article(s)${ids.length ? `: ${ids.join(', ')}` : ''}`,
    );
  } finally {
    lock.release();
  }
}

main().catch((error) => {
  console.error('[publish:scheduled]', error instanceof Error ? error.message : error);
  process.exit(1);
});
