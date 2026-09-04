/**
 * First-party visitor + session identity (cookies).
 * Session expires after 30 minutes of inactivity.
 */

export const NL_VISITOR_COOKIE = 'nl_visitor_id';
export const NL_SESSION_COOKIE = 'nl_session_id';
export const NL_SESSION_ACTIVITY_COOKIE = 'nl_session_activity';

export const SESSION_INACTIVITY_MS = 30 * 60 * 1000;
export const VISITOR_MAX_AGE_SEC = 365 * 24 * 60 * 60;
export const SESSION_MAX_AGE_SEC = 60 * 60; // sliding via activity cookie

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

function writeCookie(name: string, value: string, maxAgeSec: number): void {
  if (typeof document === 'undefined') return;
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secure}`;
}

let memoryVisitorId: string | null = null;
let memorySessionId: string | null = null;
let memorySessionStarted = false;

export function getOrCreateVisitorId(): string {
  if (memoryVisitorId) return memoryVisitorId;
  if (typeof window === 'undefined') {
    memoryVisitorId = createId('vid');
    return memoryVisitorId;
  }
  try {
    const existing = readCookie(NL_VISITOR_COOKIE);
    if (existing && existing.length <= 80) {
      memoryVisitorId = existing;
      writeCookie(NL_VISITOR_COOKIE, existing, VISITOR_MAX_AGE_SEC);
      return existing;
    }
    const next = createId('vid');
    writeCookie(NL_VISITOR_COOKIE, next, VISITOR_MAX_AGE_SEC);
    memoryVisitorId = next;
    return next;
  } catch {
    memoryVisitorId = createId('vid');
    return memoryVisitorId;
  }
}

/**
 * Returns session id and whether this call started a new session
 * (first hit or after 30m inactivity).
 */
export function getOrCreateSessionId(): { sessionId: string; isNewSession: boolean } {
  if (typeof window === 'undefined') {
    if (!memorySessionId) {
      memorySessionId = createId('sid');
      memorySessionStarted = true;
    }
    const isNew = memorySessionStarted;
    memorySessionStarted = false;
    return { sessionId: memorySessionId, isNewSession: isNew };
  }

  try {
    const now = Date.now();
    const existing = readCookie(NL_SESSION_COOKIE);
    const activityRaw = readCookie(NL_SESSION_ACTIVITY_COOKIE);
    const lastActivity = activityRaw ? Number(activityRaw) : NaN;
    const expired =
      !existing ||
      !Number.isFinite(lastActivity) ||
      now - lastActivity > SESSION_INACTIVITY_MS;

    if (!expired && existing && existing.length <= 80) {
      memorySessionId = existing;
      writeCookie(NL_SESSION_COOKIE, existing, SESSION_MAX_AGE_SEC);
      writeCookie(NL_SESSION_ACTIVITY_COOKIE, String(now), SESSION_MAX_AGE_SEC);
      return { sessionId: existing, isNewSession: false };
    }

    const next = createId('sid');
    memorySessionId = next;
    writeCookie(NL_SESSION_COOKIE, next, SESSION_MAX_AGE_SEC);
    writeCookie(NL_SESSION_ACTIVITY_COOKIE, String(now), SESSION_MAX_AGE_SEC);
    return { sessionId: next, isNewSession: true };
  } catch {
    const next = memorySessionId ?? createId('sid');
    memorySessionId = next;
    return { sessionId: next, isNewSession: true };
  }
}

/** Backward-compatible wrapper used by legacy track pipeline. */
export function getAnalyticsSessionId(): string {
  return getOrCreateSessionId().sessionId;
}

export function resetNativeAnalyticsIdentityForTests(): void {
  memoryVisitorId = null;
  memorySessionId = null;
  memorySessionStarted = false;
  if (typeof document === 'undefined') return;
  const expire = 'Max-Age=0; Path=/; SameSite=Lax';
  document.cookie = `${NL_VISITOR_COOKIE}=; ${expire}`;
  document.cookie = `${NL_SESSION_COOKIE}=; ${expire}`;
  document.cookie = `${NL_SESSION_ACTIVITY_COOKIE}=; ${expire}`;
}

/** Alias for existing tests importing resetAnalyticsSessionIdForTests */
export function resetAnalyticsSessionIdForTests(): void {
  resetNativeAnalyticsIdentityForTests();
}
