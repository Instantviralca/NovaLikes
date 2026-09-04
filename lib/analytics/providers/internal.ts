/**
 * First-party funnel analytics adapter — posts allowlisted events to /api/analytics/collect.
 */

import { analyticsConfig } from '@/config/analytics';
import {
  getOrCreateSessionId,
  getOrCreateVisitorId,
} from '@/lib/analytics/native/identity';
import { canonicalizeClientEventName } from '@/lib/analytics/native/taxonomy';
import type {
  AnalyticsEvent,
  AnalyticsProviderAdapter,
} from '@/types/analytics';

type QueuedEvent = {
  eventName: string;
  sessionId: string;
  visitorId: string;
  pagePath: string;
  pageType?: string;
  eventId: string;
  timestamp: string;
  referrer?: string;
  search?: string;
  market?: string;
  locale?: string;
  serviceSlug?: string;
  packageId?: string;
  isNewSession?: boolean;
  metadata?: Record<string, string | number | boolean | null>;
};

const queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let pagehideBound = false;
let attributionCaptured = false;

function enqueue(event: AnalyticsEvent, isNewSession = false): void {
  const eventName = canonicalizeClientEventName(event.eventName);
  if (!eventName) return;
  if (!event.sessionId || !event.pagePath) return;

  const visitorId = getOrCreateVisitorId();
  const metadata: Record<string, string | number | boolean | null> = {
    pageType: event.pageType,
  };
  if (event.serviceSlug) metadata.serviceSlug = event.serviceSlug;
  if (event.packageId) metadata.packageId = event.packageId;
  if (typeof event.quantity === 'number') metadata.quantity = event.quantity;
  if (event.platform) metadata.platform = event.platform;

  let search: string | undefined;
  let referrer: string | undefined;
  if (typeof window !== 'undefined' && !attributionCaptured) {
    search = window.location.search || undefined;
    referrer = document.referrer || undefined;
    attributionCaptured = true;
  }

  queue.push({
    eventName,
    sessionId: event.sessionId,
    visitorId,
    pagePath: event.pagePath,
    pageType: event.pageType,
    eventId: event.eventId,
    timestamp: event.timestamp,
    referrer,
    search,
    serviceSlug: event.serviceSlug,
    packageId: event.packageId,
    isNewSession: isNewSession || undefined,
    metadata,
  });

  scheduleFlush();
}

function scheduleFlush(): void {
  if (typeof window === 'undefined') return;
  bindPagehide();
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushQueue();
  }, 1500);
}

function bindPagehide(): void {
  if (pagehideBound || typeof window === 'undefined') return;
  pagehideBound = true;
  window.addEventListener('pagehide', () => {
    void flushQueue(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flushQueue(true);
  });
}

async function flushQueue(useBeacon = false): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!queue.length) return;

  const batch = queue.splice(0, 25);
  const payload = JSON.stringify({ events: batch });

  try {
    if (useBeacon && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      const ok = navigator.sendBeacon('/api/analytics/collect', blob);
      if (!ok) queue.unshift(...batch);
      return;
    }

    await fetch('/api/analytics/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch {
    queue.unshift(...batch);
  }
}

export function createInternalAdapter(): AnalyticsProviderAdapter | null {
  if (!analyticsConfig.enabled) return null;

  return {
    id: 'internal',
    initialize: () => {
      bindPagehide();
      getOrCreateVisitorId();
      getOrCreateSessionId();
    },
    trackPageView: (event: AnalyticsEvent) => {
      enqueue(event);
    },
    trackEvent: (event: AnalyticsEvent) => {
      enqueue(event);
    },
    trackConversion: () => {
      // Paid conversion is server-only — ignore client purchase for first-party sink.
    },
    setConsent: () => undefined,
    reset: () => {
      queue.length = 0;
      attributionCaptured = false;
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = null;
      }
    },
  };
}

/** Test helper: enqueue with new-session flag for landing. */
export function enqueueNativeAnalyticsEvent(
  event: AnalyticsEvent,
  options?: { isNewSession?: boolean },
): void {
  enqueue(event, options?.isNewSession === true);
}
