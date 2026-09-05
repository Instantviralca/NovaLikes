/**
 * Canonical session milestone events — one per analytics session.
 * Server/database idempotency keys are authoritative.
 */

export const SESSION_MILESTONE_EVENTS = [
  'session_started',
  'landing_view',
  'checkout_started',
] as const;

export type SessionMilestoneEvent = (typeof SESSION_MILESTONE_EVENTS)[number];

const MILESTONE_SET = new Set<string>(SESSION_MILESTONE_EVENTS);

export function isSessionMilestoneEvent(name: string): name is SessionMilestoneEvent {
  return MILESTONE_SET.has(name);
}

/** Deterministic idempotency key for a session milestone (never null for milestones). */
export function milestoneIdempotencyKey(
  sessionId: string,
  eventName: SessionMilestoneEvent,
): string {
  const suffix =
    eventName === 'session_started'
      ? 'started'
      : eventName === 'landing_view'
        ? 'landing'
        : 'checkout_started';
  return `session:${sessionId}:${suffix}`;
}

/**
 * Resolve market + locale attribution from a public pathname.
 * Default English (unprefixed) → market null, locale "en" (dashboard maps null market to Global English).
 */
export function resolveAnalyticsMarketLocale(pagePath: string): {
  market: string | null;
  locale: string;
} {
  const path = (pagePath.split('?')[0] || '/').toLowerCase();

  const markets = ['ca', 'au', 'us', 'uk'] as const;
  for (const market of markets) {
    if (path === `/${market}` || path.startsWith(`/${market}/`)) {
      return { market, locale: 'en' };
    }
  }

  const locales = ['pt-br', 'es', 'de', 'fr', 'it', 'ar'] as const;
  for (const locale of locales) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return { market: null, locale };
    }
  }

  return { market: null, locale: 'en' };
}

/** Admin display label for market/locale grouping. */
export function analyticsMarketLocaleLabel(key: string): string {
  const normalized = key.trim().toLowerCase();
  if (!normalized || normalized === 'en' || normalized === 'global' || normalized === 'default') {
    return 'Default / Global English';
  }
  const markets: Record<string, string> = {
    ca: 'Canada',
    au: 'Australia',
    us: 'United States',
    uk: 'United Kingdom',
  };
  if (markets[normalized]) return markets[normalized]!;
  const locales: Record<string, string> = {
    es: 'Spanish',
    de: 'German',
    fr: 'French',
    it: 'Italian',
    'pt-br': 'Portuguese (Brazil)',
    ar: 'Arabic',
  };
  if (locales[normalized]) return locales[normalized]!;
  return key.toUpperCase();
}
