/**
 * Anonymous analytics session ID — Document 14.09.
 */

const SESSION_STORAGE_KEY = 'novalikes.analytics.session.v1';

function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

let memorySessionId: string | null = null;

/** Stable anonymous session identifier for the browser tab. */
export function getAnalyticsSessionId(): string {
  if (memorySessionId) return memorySessionId;

  if (typeof window === 'undefined') {
    memorySessionId = createSessionId();
    return memorySessionId;
  }

  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) {
      memorySessionId = existing;
      return existing;
    }
    const next = createSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
    memorySessionId = next;
    return next;
  } catch {
    memorySessionId = createSessionId();
    return memorySessionId;
  }
}

/** Test helper — clear cached session. */
export function resetAnalyticsSessionIdForTests(): void {
  memorySessionId = null;
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
