'use client';

/**
 * Automatic page view tracker — native visitor/session aware.
 *
 * session_started / landing_view fire only when the cookie layer reports a
 * NEW session. Remounts and hard refreshes of an active session must not
 * re-emit milestones (server also enforces DB idempotency).
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { getAnalyticsContext } from '@/lib/analytics/core/context';
import {
  getOrCreateSessionId,
  getOrCreateVisitorId,
} from '@/lib/analytics/native/identity';
import { resolveAnalyticsMarketLocale } from '@/lib/analytics/native/milestones';
import { isExcludedAnalyticsPath } from '@/lib/analytics/native/taxonomy';

/** Module-level: survives React remounts within the same JS context. */
const trackedPathsBySession = new Map<string, string>();
const milestonesEmittedForSession = new Set<string>();

function serviceSlugFromPath(pathname: string): string | undefined {
  if (!pathname.startsWith('/buy-')) return undefined;
  const slug = pathname.replace(/^\//, '').split('/')[0];
  return slug || undefined;
}

function readLandedMarker(sessionId: string): boolean {
  if (typeof window === 'undefined') return milestonesEmittedForSession.has(sessionId);
  try {
    return window.sessionStorage.getItem(`nl_analytics_landed:${sessionId}`) === '1';
  } catch {
    return milestonesEmittedForSession.has(sessionId);
  }
}

function writeLandedMarker(sessionId: string): void {
  milestonesEmittedForSession.add(sessionId);
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(`nl_analytics_landed:${sessionId}`, '1');
  } catch {
    // ignore
  }
}

export function PageViewTracker() {
  const analytics = useAnalyticsOptional();
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analytics?.ready) return;
    if (!pathname) return;
    if (isExcludedAnalyticsPath(pathname)) return;

    getOrCreateVisitorId();
    const { sessionId, isNewSession } = getOrCreateSessionId();

    // Same-route guard: component remounts / effect re-runs must not re-fire.
    if (lastPath.current === pathname) return;
    if (trackedPathsBySession.get(sessionId) === pathname) {
      lastPath.current = pathname;
      return;
    }

    lastPath.current = pathname;
    trackedPathsBySession.set(sessionId, pathname);

    const context = getAnalyticsContext({ pagePath: pathname });
    const serviceSlug = serviceSlugFromPath(pathname);
    const isService = Boolean(serviceSlug) || context.pageType === 'service';
    const { market, locale } = resolveAnalyticsMarketLocale(pathname);

    const alreadyLanded = readLandedMarker(sessionId);
    const shouldEmitMilestones = isNewSession && !alreadyLanded;

    if (shouldEmitMilestones) {
      writeLandedMarker(sessionId);
      analytics.track({
        eventName: 'session_started',
        pagePath: context.pagePath,
        pageType: context.pageType,
        idempotencyKey: `session:${sessionId}:started`,
        metadata: { market, locale },
      });
      analytics.track({
        eventName: 'landing_view',
        pagePath: context.pagePath,
        pageType: context.pageType,
        idempotencyKey: `session:${sessionId}:landing`,
        metadata: { market, locale },
      });
    }

    analytics.track({
      eventName: isService ? 'service_view' : 'page_view',
      pagePath: context.pagePath,
      pageType: context.pageType,
      serviceSlug,
      metadata: { market, locale },
    });
  }, [analytics, pathname]);

  return null;
}

/** Test helper — clear module-level path / milestone guards. */
export function resetPageViewTrackerStateForTests(): void {
  trackedPathsBySession.clear();
  milestonesEmittedForSession.clear();
}
