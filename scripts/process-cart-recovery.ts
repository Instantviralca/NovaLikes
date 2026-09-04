import { processCartRecoveryJobs } from '@/lib/cart-recovery';
import { closeDb } from '@/lib/db/client';
import { tryAcquireCronLock } from '@/lib/process/cron-lock';
import { loadAppEnvFiles } from './lib/load-env-file';

export async function runCartRecoveryProcessor(options?: { lockPath?: string }) {
  loadAppEnvFiles();
  const lock = tryAcquireCronLock(options?.lockPath);
  if (!lock) {
    console.log('[cart-recovery:process] skipped — another processor is running');
    return { status: 'skipped_lock' as const };
  }
  try {
    const result = await processCartRecoveryJobs();
    console.log('[cart-recovery:process]', result);
    return { status: 'processed' as const, result };
  } catch (error) {
    console.error('[cart-recovery:process]', error);
    process.exitCode = 1;
    return { status: 'failed' as const, error };
  } finally {
    lock.release();
    await closeDb().catch(() => undefined);
  }
}

if (/process-cart-recovery\.(ts|js|mts|mjs|cjs)$/i.test((process.argv[1] ?? '').replace(/\\/g, '/'))) {
  void runCartRecoveryProcessor();
}
