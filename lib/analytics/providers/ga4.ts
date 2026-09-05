/**
 * Google Analytics 4 adapter — Document 14.09.
 * Initializes only when measurement ID is configured.
 */

import { analyticsConfig } from '@/config/analytics';
import { mapEventToProvider } from '@/lib/analytics/core/map-event';
import type {
  AnalyticsEvent,
  AnalyticsProviderAdapter,
  AnalyticsProviderConsent,
} from '@/types/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(measurementId: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag === 'function') return;

  const scriptId = 'iv-ga4-gtag';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onerror = () => {
      // Ignore CDN blocks — never throw raw Event into React.
    };
    document.head.appendChild(script);
  }

  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

export function createGa4Adapter(
  measurementId: string | null = analyticsConfig.ga4.measurementId,
): AnalyticsProviderAdapter | null {
  if (!measurementId || !analyticsConfig.ga4.enabled) return null;

  return {
    id: 'ga4',
    initialize: () => {
      ensureGtag(measurementId);
    },
    trackPageView: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
      const mapped = mapEventToProvider(event, 'ga4');
      window.gtag('event', 'page_view', mapped.params);
    },
    trackEvent: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
      const mapped = mapEventToProvider(event, 'ga4');
      window.gtag('event', mapped.name, mapped.params);
    },
    trackConversion: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
      const mapped = mapEventToProvider(event, 'ga4');
      window.gtag('event', 'purchase', mapped.params);
    },
    setConsent: (consent: AnalyticsProviderConsent) => {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
    },
    reset: () => undefined,
  };
}
