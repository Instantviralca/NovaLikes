/**
 * Microsoft Clarity adapter — Document 14.09.
 */

import { analyticsConfig } from '@/config/analytics';
import { mapEventToProvider } from '@/lib/analytics/core/map-event';
import type {
  AnalyticsEvent,
  AnalyticsProviderAdapter,
} from '@/types/analytics';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

function ensureClarity(projectId: string): void {
  if (typeof window === 'undefined') return;
  if (typeof window.clarity === 'function') return;

  const scriptId = 'iv-clarity';
  if (document.getElementById(scriptId)) return;

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  script.onerror = () => {
    // Ignore CDN blocks — never throw raw Event into React.
  };
  document.head.appendChild(script);
}

export function createClarityAdapter(
  projectId: string | null = analyticsConfig.clarity.projectId,
): AnalyticsProviderAdapter | null {
  if (!projectId || !analyticsConfig.clarity.enabled) return null;

  return {
    id: 'clarity',
    initialize: () => {
      ensureClarity(projectId);
    },
    trackPageView: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
      const mapped = mapEventToProvider(event, 'clarity');
      window.clarity('set', 'page_path', mapped.params.page_path ?? event.pagePath);
    },
    trackEvent: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
      const mapped = mapEventToProvider(event, 'clarity');
      window.clarity('event', mapped.name);
    },
    trackConversion: (event: AnalyticsEvent) => {
      if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
      window.clarity('event', event.eventName);
    },
    setConsent: () => {
      // Clarity consent is controlled by whether the adapter is initialized.
    },
    reset: () => undefined,
  };
}
