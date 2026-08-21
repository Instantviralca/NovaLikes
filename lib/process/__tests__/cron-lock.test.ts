import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
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
});
