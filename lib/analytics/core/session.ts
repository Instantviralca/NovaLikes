/**
 * Session identity — re-exports native cookie-based visitor/session.
 */

export {
  getAnalyticsSessionId,
  getOrCreateSessionId,
  getOrCreateVisitorId,
  resetAnalyticsSessionIdForTests,
  resetNativeAnalyticsIdentityForTests,
  NL_VISITOR_COOKIE,
  NL_SESSION_COOKIE,
  SESSION_INACTIVITY_MS,
} from '@/lib/analytics/native/identity';
