/**
 * Exclusive file lock for cron jobs that must not overlap (scheduled publishing).
 * Stale locks older than TTL are treated as abandoned.
 */

import { closeSync, existsSync, mkdirSync, openSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const STALE_MS = 5 * 60 * 1000;

export function defaultPublishLockPath(): string {
  return (
    process.env.CMS_PUBLISH_LOCK_PATH?.trim() ||
    path.join(os.tmpdir(), 'novalikes-publish-scheduled.lock')
  );
}

export type CronLock = {
  path: string;
  release: () => void;
};

export function tryAcquireCronLock(lockPath = defaultPublishLockPath()): CronLock | null {
  mkdirSync(path.dirname(lockPath), { recursive: true });

  if (existsSync(lockPath)) {
    try {
      const age = Date.now() - statSync(lockPath).mtimeMs;
      if (age > STALE_MS) {
        unlinkSync(lockPath);
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  try {
    const fd = openSync(lockPath, 'wx');
    writeFileSync(fd, `${process.pid}\n${new Date().toISOString()}\n`);
    closeSync(fd);
  } catch {
    return null;
  }

  let released = false;
  return {
    path: lockPath,
    release() {
      if (released) return;
      released = true;
      try {
        unlinkSync(lockPath);
      } catch {
        // already gone
      }
    },
  };
}
