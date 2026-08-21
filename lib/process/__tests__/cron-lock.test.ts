import { describe, expect, it } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { tryAcquireCronLock } from '@/lib/process/cron-lock';

describe('cron lock', () => {
  it('prevents overlapping acquires and releases cleanly', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'nl-lock-'));
    const lockPath = path.join(dir, 'publish.lock');
    try {
      const first = tryAcquireCronLock(lockPath);
      expect(first).not.toBeNull();
      expect(tryAcquireCronLock(lockPath)).toBeNull();
      first?.release();
      const second = tryAcquireCronLock(lockPath);
      expect(second).not.toBeNull();
      second?.release();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('releases after success and after failure when used in try/finally', async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'nl-lock-'));
    const lockPath = path.join(dir, 'publish.lock');
    try {
      const successLock = tryAcquireCronLock(lockPath);
      expect(successLock).not.toBeNull();
      try {
        /* work ok */
      } finally {
        successLock?.release();
      }
      expect(existsSync(lockPath)).toBe(false);

      const failLock = tryAcquireCronLock(lockPath);
      expect(failLock).not.toBeNull();
      try {
        throw new Error('publisher failed');
      } catch {
        /* handled by caller */
      } finally {
        failLock?.release();
      }
      expect(existsSync(lockPath)).toBe(false);
      const again = tryAcquireCronLock(lockPath);
      expect(again).not.toBeNull();
      again?.release();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
