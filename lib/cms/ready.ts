/**
 * CMS storage readiness — production must use PostgreSQL, never JSON/memory fallback.
 */

import { isDatabaseConfigured, isProductionBuildPhase, isProductionRuntime } from '@/lib/config/env';

export function cmsUsesMemoryStore(): boolean {
  if (
    process.env.NODE_ENV === 'test' ||
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return true;
  }
  if (isProductionRuntime()) {
    return false;
  }
  return process.env.IV_PERSISTENCE === 'memory' || !isDatabaseConfigured();
}

export function isCmsDatabaseReady(): boolean {
  return isDatabaseConfigured() && !cmsUsesMemoryStore();
}

/** Throw before any CMS read/write when production would otherwise use file/memory. */
export function assertCmsProductionDatabase(): void {
  if (!isProductionRuntime() || isProductionBuildPhase()) return;
  if (process.env.IV_PERSISTENCE === 'memory') {
    throw new Error('IV_PERSISTENCE=memory is not allowed in production.');
  }
  if (!isDatabaseConfigured()) {
    throw new Error(
      'DATABASE_URL is required in production. CMS file/memory store is disabled.',
    );
  }
}
