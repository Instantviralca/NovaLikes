import { isProductionRuntime } from '@/lib/config/env';

/** True when the operator intentionally enabled local/dev code echo. */
export function isAccountDevCodesFlagOn(): boolean {
  return process.env.IV_ACCOUNT_DEV_CODES === '1';
}

/**
 * Whether API responses may include plaintext `devCode`.
 * Never in production — even if IV_ACCOUNT_DEV_CODES=1 is set by mistake.
 */
export function shouldExposeAccountDevCodes(): boolean {
  return isAccountDevCodesFlagOn() && !isProductionRuntime();
}
