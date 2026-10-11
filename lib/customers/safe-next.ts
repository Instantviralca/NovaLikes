/**
 * Open-redirect guard for account `?next=` params.
 * Only same-site paths starting with /dashboard or /checkout.
 */
export function safeAccountNext(
  value: string | null | undefined,
  fallback = '/dashboard',
): string {
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed.startsWith('/')) return fallback;
  if (trimmed.startsWith('//')) return fallback;
  if (trimmed.includes('://')) return fallback;
  if (trimmed.startsWith('/dashboard') || trimmed.startsWith('/checkout')) {
    return trimmed;
  }
  return fallback;
}
