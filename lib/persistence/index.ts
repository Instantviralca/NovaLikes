/**
 * Persistence resolver — Postgres primary; memory for tests; file only when explicitly enabled in non-production.
 */

import {
  allowFileStore,
  isDatabaseConfigured,
  isProductionRuntime,
} from '@/lib/config/env';
import { createFilePersistence } from '@/lib/persistence/file';
import { createMemoryPersistence } from '@/lib/persistence/memory';
import { createPostgresPersistence } from '@/lib/persistence/postgres';
import type { AppPersistence } from '@/lib/persistence/types';

let singleton: AppPersistence | null = null;
let forcedMemory: AppPersistence | null = null;

function assertProductionDurableStorage(): void {
  if (!isProductionRuntime()) return;
  if (process.env.IV_PERSISTENCE === 'memory') {
    throw new Error('IV_PERSISTENCE=memory is not allowed in production.');
  }
  if (!isDatabaseConfigured()) {
    throw new Error('DATABASE_URL is required in production. File store is disabled.');
  }
}

export function getPersistence(): AppPersistence {
  if (forcedMemory) return forcedMemory;
  if (singleton) return singleton;

  if (process.env.NODE_ENV === 'test' || process.env.NEXT_PHASE === 'phase-production-build') {
    singleton = createMemoryPersistence();
    return singleton;
  }

  assertProductionDurableStorage();

  if (process.env.IV_PERSISTENCE === 'memory') {
    singleton = createMemoryPersistence();
    return singleton;
  }

  if (isDatabaseConfigured()) {
    singleton = createPostgresPersistence();
    return singleton;
  }

  if (allowFileStore()) {
    singleton = createFilePersistence();
    return singleton;
  }

  // Local default without DATABASE_URL: memory (no silent .data writes).
  singleton = createMemoryPersistence();
  return singleton;
}

/** Force in-memory store for unit tests. */
export function useMemoryPersistenceForTests(): AppPersistence {
  forcedMemory = createMemoryPersistence();
  singleton = forcedMemory;
  return forcedMemory;
}

export function resetPersistenceForTests(): void {
  if (forcedMemory?.resetForTests) forcedMemory.resetForTests();
  else if (singleton?.resetForTests) singleton.resetForTests();
  else {
    forcedMemory = createMemoryPersistence();
    singleton = forcedMemory;
  }
}

export function clearPersistenceSingletonForTests(): void {
  singleton = null;
  forcedMemory = null;
}
