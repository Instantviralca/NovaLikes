import type { ToolErrorCode } from '@/lib/tools/types';

/** Internal failure categories used for diagnostics. Public API codes stay user-facing. */
export type ToolFailureCategory =
  | 'invalid_input'
  | 'unsupported_url'
  | 'not_found'
  | 'private_or_restricted'
  | 'platform_blocked'
  | 'media_not_exposed'
  | 'rate_limited'
  | 'too_large'
  | 'timeout'
  | 'upstream_error'
  | 'expired_token'
  | 'success';

const MAP: Record<ToolErrorCode, ToolFailureCategory> = {
  invalid_url: 'invalid_input',
  unsupported_url: 'unsupported_url',
  not_found: 'not_found',
  private_or_unavailable: 'private_or_restricted',
  platform_blocked: 'platform_blocked',
  media_not_exposed: 'media_not_exposed',
  rate_limited: 'rate_limited',
  too_large: 'too_large',
  timeout: 'timeout',
  download_unavailable: 'expired_token',
};

export function toFailureCategory(code: ToolErrorCode): ToolFailureCategory {
  return MAP[code];
}

export function shouldNegativeCache(code: ToolErrorCode): boolean {
  return code === 'platform_blocked' || code === 'rate_limited' || code === 'timeout';
}
