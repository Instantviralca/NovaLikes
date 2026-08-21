import { isProductionRuntime } from '@/lib/config/env';

/** Commands that mutate local QA state must never run in production. */
export function assertCmsDevOnlyCommand(command: string): void {
  if (
    isProductionRuntime() ||
    process.env.IV_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production'
  ) {
    throw new Error(`${command} is blocked in production.`);
  }
}
