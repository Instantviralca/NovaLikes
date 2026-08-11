/**
 * Analytics consent store & guard — Document 14.09.
 */

import { analyticsConfig } from '@/config/analytics';
import type {
  AnalyticsConsentCategory,
  AnalyticsConsentState,
  AnalyticsEvent,
} from '@/types/analytics';

const CONSENT_STORAGE_KEY = 'novalikes.analytics.consent.v1';

const DEFAULT_CONSENT: AnalyticsConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

let consentState: AnalyticsConsentState = { ...DEFAULT_CONSENT };
let hydrated = false;

function persist(state: AnalyticsConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
}

export function hydrateAnalyticsConsent(): AnalyticsConsentState {
  if (hydrated) return consentState;
  hydrated = true;

  if (typeof window === 'undefined') {
    return consentState;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return consentState;
    const parsed = JSON.parse(raw) as Partial<AnalyticsConsentState>;
    consentState = {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    consentState = { ...DEFAULT_CONSENT };
  }

  return consentState;
}

export function getAnalyticsConsent(): AnalyticsConsentState {
  if (!hydrated && typeof window !== 'undefined') {
    return hydrateAnalyticsConsent();
  }
  return consentState;
}

export function setAnalyticsConsent(
  next: Partial<Pick<AnalyticsConsentState, 'analytics' | 'marketing'>>,
): AnalyticsConsentState {
  consentState = {
    essential: true,
    analytics: next.analytics ?? consentState.analytics,
    marketing: next.marketing ?? consentState.marketing,
    updatedAt: new Date().toISOString(),
  };
  persist(consentState);
  return consentState;
}

export function resetAnalyticsConsentForTests(): void {
  consentState = { ...DEFAULT_CONSENT };
  hydrated = false;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

/**
 * Whether an event may be sent to optional analytics/marketing providers.
 * Essential channel events (admin/internal ops) always pass the consent gate
 * for internal adapters; public optional providers still respect categories.
 */
export function canTrackEvent(
  event: Pick<AnalyticsEvent, 'consentCategory' | 'channel'>,
  consent: AnalyticsConsentState = getAnalyticsConsent(),
  consentMode: 'required' | 'optional' = analyticsConfig.consentMode,
): boolean {
  if (event.consentCategory === 'essential') return true;

  if (consentMode === 'optional') {
    // Optional mode still blocks marketing without marketing consent.
    if (event.consentCategory === 'marketing') return consent.marketing;
    return true;
  }

  if (event.consentCategory === 'analytics') return consent.analytics;
  if (event.consentCategory === 'marketing') return consent.marketing;
  return false;
}

export function consentAllowsCategory(
  category: AnalyticsConsentCategory,
  consent: AnalyticsConsentState = getAnalyticsConsent(),
): boolean {
  if (category === 'essential') return true;
  if (category === 'analytics') return consent.analytics;
  return consent.marketing;
}
