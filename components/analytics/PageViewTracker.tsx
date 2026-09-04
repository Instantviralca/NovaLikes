'use client';

/**
 * Automatic page view tracker — native visitor/session aware.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { getAnalyticsContext } from '@/lib/analytics/core/context';
import {
  getOrCreateSessionId,
  getOrCreateVisitorId,
} from '@/lib/analytics/native/identity';
import { isExcludedAnalyticsPath } from '@/lib/analytics/native/taxonomy';

function serviceSlugFromPath(pathname: string): string | undefined {
  if (!pathname.startsWith('/buy-')) return undefined;
  const slug = pathname.replace(/^\//, '').split('/')[0];
  return slug || undefined;
}

export function PageViewTracker() {
  const analytics = useAnalyticsOptional();
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const landedSessionId = useRef<string | null>(null);

  useEffect(() => {
    if (!analytics?.ready) return;
    if (!pathname) return;
    if (isExcludedAnalyticsPath(pathname)) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    getOrCreateVisitorId();
    const { sessionId, isNewSession } = getOrCreateSessionId();
    const context = getAnalyticsContext({ pagePath: pathname });
    const serviceSlug = serviceSlugFromPath(pathname);
    const isService = Boolean(serviceSlug) || context.pageType === 'service';

    const shouldEmitLanding =
      isNewSession || landedSessionId.current !== sessionId;
    if (shouldEmitLanding) {
      landedSessionId.current = sessionId;
      analytics.track({
        eventName: 'session_started',
        pagePath: context.pagePath,
        pageType: context.pageType,
      });
      analytics.track({
        eventName: 'landing_view',
        pagePath: context.pagePath,
        pageType: context.pageType,
      });
    }

    analytics.track({
      eventName: isService ? 'service_view' : 'page_view',
      pagePath: context.pagePath,
      pageType: context.pageType,
      serviceSlug,
    });
  }, [analytics, pathname]);

  return null;
}
