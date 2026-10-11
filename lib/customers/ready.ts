import { isDatabaseConfigured } from '@/lib/config/env';

/**
 * Accounts require Postgres in real environments.
 * Tests and local IV_PERSISTENCE=memory use the in-memory customer store.
 */
export function isDbReady(): boolean {
  if (process.env.NODE_ENV === 'test') return true;
  if (
    process.env.IV_PERSISTENCE === 'memory' &&
    process.env.NODE_ENV !== 'production'
  ) {
    return true;
  }
  return isDatabaseConfigured();
}
