/**
 * Google Tag Manager adapter — Document 14.09.
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
  }
}

function ensureGtm(containerId: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  const scriptId = 'iv-gtm';
  if (document.getElementById(scriptId)) return;

  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  script.onerror = () => {
    // Ignore CDN blocks — never throw raw Event into React.
  };
  document.head.appendChild(script);
}

export function createGtmAdapter(
  containerId: string | null = analyticsConfig.gtm.containerId,
): AnalyticsProviderAdapter | null {
  if (!containerId || !analyticsConfig.gtm.enabled) return null;

  return {
    id: 'gtm',
    initialize: () => {
      ensureGtm(containerId);
    },
    trackPageView: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined') return;
      const mapped = mapEventToProvider(event, 'gtm');
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: 'page_view', ...mapped.params });
    },
    trackEvent: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined') return;
      const mapped = mapEventToProvider(event, 'gtm');
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: mapped.name, ...mapped.params });
    },
    trackConversion: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined') return;
      const mapped = mapEventToProvider(event, 'gtm');
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: 'purchase', ...mapped.params });
    },
    setConsent: (consent: AnalyticsProviderConsent) => {
      if (typeof window === 'undefined') return;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
    },
    reset: () => undefined,
  };
}
