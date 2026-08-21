import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const closeDb = vi.fn(async () => undefined);
const publishDueScheduledArticles = vi.fn(async () => ['art_1']);

vi.mock('@/lib/db/client', () => ({
  closeDb: () => closeDb(),
}));

vi.mock('@/lib/cms/articles', () => ({
  publishDueScheduledArticles: () => publishDueScheduledArticles(),
}));

describe('publish-scheduled lifecycle', () => {
  let dir: string;
  let lockPath: string;
  let previousExitCode: string | number | undefined;

  beforeEach(() => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'nl-pub-life-'));
    lockPath = path.join(dir, 'publish.lock');
    previousExitCode = process.exitCode;
    process.exitCode = undefined;
    closeDb.mockClear();
    publishDueScheduledArticles.mockReset();
    publishDueScheduledArticles.mockResolvedValue(['art_1']);
  });

  afterEach(() => {
    process.exitCode = previousExitCode as typeof process.exitCode;
    rmSync(dir, { recursive: true, force: true });
    vi.resetModules();
  });

  it('releases the lock and closes the DB after a successful run', async () => {
    const { runPublishScheduled } = await import('../../../scripts/publish-scheduled');
    const result = await runPublishScheduled({ lockPath });

    expect(result).toEqual({ status: 'published', ids: ['art_1'] });
    expect(existsSync(lockPath)).toBe(false);
    expect(closeDb).toHaveBeenCalledTimes(1);
    expect(process.exitCode == null || process.exitCode === 0).toBe(true);
  });

  it('releases the lock and closes the DB after a failure', async () => {
    publishDueScheduledArticles.mockRejectedValueOnce(new Error('boom'));
    const { runPublishScheduled } = await import('../../../scripts/publish-scheduled');
    const result = await runPublishScheduled({ lockPath });

    expect(result.status).toBe('failed');
    expect(existsSync(lockPath)).toBe(false);
    expect(closeDb).toHaveBeenCalledTimes(1);
    expect(process.exitCode).toBe(1);
  });

  it('skips when the lock is held and does not open/close work twice', async () => {
    const { tryAcquireCronLock } = await import('@/lib/process/cron-lock');
    const held = tryAcquireCronLock(lockPath);
    expect(held).not.toBeNull();

    const { runPublishScheduled } = await import('../../../scripts/publish-scheduled');
    const result = await runPublishScheduled({ lockPath });

    expect(result).toEqual({ status: 'skipped_lock' });
    expect(publishDueScheduledArticles).not.toHaveBeenCalled();
    expect(closeDb).not.toHaveBeenCalled();
    expect(existsSync(lockPath)).toBe(true);
    held?.release();
  });
});
