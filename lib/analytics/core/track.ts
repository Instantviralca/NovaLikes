/**
 * Public analytics track helpers — Document 14.09.
 */

import { analyticsConfig } from '@/config/analytics';
import {
  getEventRegistryEntry,
  resolveCanonicalEventName,
} from '@/data/analytics/event-registry';
import { isFunnelEventName } from '@/lib/analytics/funnel-events';
import {
  isSessionMilestoneEvent,
  milestoneIdempotencyKey,
  type SessionMilestoneEvent,
} from '@/lib/analytics/native/milestones';
import { isClientAnalyticsEvent } from '@/lib/analytics/native/taxonomy';
import { canTrackEvent, getAnalyticsConsent } from '@/lib/analytics/core/consent';
import { getAnalyticsContext } from '@/lib/analytics/core/context';
import { dispatchToProviders } from '@/lib/analytics/core/dispatch';
import {
  buildEventDedupeKey,
  preventDuplicateEvent,
  preventDuplicatePurchase,
} from '@/lib/analytics/core/duplicate';
import { pushAnalyticsDebugRecord } from '@/lib/analytics/core/debug-store';
import { sanitizeEventPayload } from '@/lib/analytics/core/sanitize';
import { validateEvent } from '@/lib/analytics/core/validate';
import { isAnalyticsDebugEnabled } from '@/config/analytics';
import type {
  AnalyticsEvent,
  AnalyticsEventInput,
  AnalyticsTrackResult,
  AnalyticsValidationIssue,
} from '@/types/analytics';

const MILESTONE_DEDUPE_TTL_MS = 1000 * 60 * 60; // 1h client guard for session milestones

function createEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function blockedResult(
  eventName: string,
  issues: AnalyticsValidationIssue[],
  extras?: Partial<AnalyticsTrackResult>,
): AnalyticsTrackResult {
  if (isAnalyticsDebugEnabled()) {
    pushAnalyticsDebugRecord({
      id: createEventId(),
      at: new Date().toISOString(),
      eventName,
      sanitizedPayload: null,
      consentAllowed: extras?.consentAllowed ?? false,
      providers: extras?.providers ?? [],
      duplicate: extras?.duplicate ?? false,
      issues,
    });
  }

  return {
    tracked: false,
    duplicate: extras?.duplicate ?? false,
    consentAllowed: extras?.consentAllowed ?? false,
    providers: extras?.providers ?? [],
    issues,
    event: extras?.event,
  };
}

function enrichEvent(input: AnalyticsEventInput): AnalyticsEvent {
  const canonicalName = resolveCanonicalEventName(input.eventName);
  const registry = getEventRegistryEntry(canonicalName);
  const context = getAnalyticsContext({
    pagePath: input.pagePath,
    pageType: input.pageType,
  });

  const milestoneKey =
    isSessionMilestoneEvent(canonicalName) && context.sessionId
      ? milestoneIdempotencyKey(
          context.sessionId,
          canonicalName as SessionMilestoneEvent,
        )
      : undefined;

  return {
    eventName: canonicalName,
    category: input.category ?? registry?.category ?? 'engagement',
    action: input.action ?? registry?.action ?? canonicalName,
    label: input.label,
    value: input.value,
    currency: input.currency,
    platform: input.platform,
    serviceSlug: input.serviceSlug,
    packageId: input.packageId,
    quantity: input.quantity,
    displayedPrice: input.displayedPrice,
    pagePath: context.pagePath,
    pageType: context.pageType,
    sessionId: context.sessionId,
    timestamp: context.timestamp,
    metadata: input.metadata,
    consentCategory:
      input.consentCategory ?? registry?.consentCategory ?? 'analytics',
    channel: input.channel ?? registry?.channel ?? 'public',
    eventId: milestoneKey ?? createEventId(),
    idempotencyKey:
      input.idempotencyKey ?? input.verification?.idempotencyKey ?? milestoneKey,
  };
}

/**
 * Central track entry — validates, sanitizes, checks consent, dedupes, dispatches.
 */
export function trackEvent(input: AnalyticsEventInput): AnalyticsTrackResult {
  try {
    if (!analyticsConfig.enabled) {
      return blockedResult(input.eventName, [
        {
          code: 'analytics_disabled',
          detail: 'Analytics is disabled by configuration',
        },
      ]);
    }

    const { sanitized, issues: sanitizeIssues } = sanitizeEventPayload(input);
    const validationIssues = validateEvent(sanitized);
    const blocking = [...sanitizeIssues, ...validationIssues].filter(
      (issue) =>
        issue.code === 'forbidden_field' ||
        issue.code === 'unapproved_event' ||
        issue.code === 'invalid_currency' ||
        issue.code === 'invalid_platform' ||
        issue.code === 'invalid_service_slug' ||
        issue.code === 'invalid_package_id' ||
        issue.code === 'invalid_value' ||
        issue.code === 'missing_field' ||
        issue.code === 'purchase_not_verified',
    );

    if (blocking.length > 0) {
      return blockedResult(input.eventName, [...sanitizeIssues, ...validationIssues]);
    }

    const event = enrichEvent(sanitized);
    const consent = getAnalyticsConsent();
    const consentAllowed = canTrackEvent(event, consent, analyticsConfig.consentMode);

    const isMilestone = isSessionMilestoneEvent(event.eventName);
    const dedupeKey =
      event.idempotencyKey ??
      buildEventDedupeKey(event.eventName, [
        event.pagePath,
        event.serviceSlug,
        event.packageId,
        event.label,
        event.action,
      ]);

    if (event.eventName === 'purchase' && event.idempotencyKey) {
      if (preventDuplicatePurchase(event.idempotencyKey)) {
        return blockedResult(
          event.eventName,
          [
            {
              code: 'duplicate',
              detail: 'Duplicate purchase event blocked by idempotency key',
            },
          ],
          { duplicate: true, consentAllowed: true, event },
        );
      }
    } else if (
      preventDuplicateEvent(dedupeKey, isMilestone ? MILESTONE_DEDUPE_TTL_MS : undefined)
    ) {
      return blockedResult(
        event.eventName,
        [
          {
            code: 'duplicate',
            detail: 'Duplicate event blocked',
          },
        ],
        { duplicate: true, consentAllowed: true, event },
      );
    }

    const mode =
      event.eventName === 'page_view' || event.eventName === 'home_page_view'
        ? 'page_view'
        : event.eventName === 'purchase'
          ? 'conversion'
          : 'event';

    // First-party operational funnel: persist allowlisted events without marketing consent.
    if (!consentAllowed) {
      if (isFunnelEventName(event.eventName) || isClientAnalyticsEvent(event.eventName)) {
        return dispatchToProviders({ ...event, channel: 'admin' }, mode);
      }
      return blockedResult(
        event.eventName,
        [
          {
            code: 'consent_denied',
            detail: `Consent denied for category ${event.consentCategory}`,
          },
        ],
        { consentAllowed: false, event },
      );
    }

    return dispatchToProviders(event, mode);
  } catch (error) {
    return blockedResult(input.eventName, [
      {
        code: 'provider_error',
        detail: `trackEvent failed safely: ${error instanceof Error ? error.message : 'unknown'}`,
      },
    ]);
  }
}

export function trackPageView(
  input: Omit<AnalyticsEventInput, 'eventName'> & { eventName?: string } = {},
): AnalyticsTrackResult {
  return trackEvent({
    ...input,
    eventName: input.eventName ?? 'page_view',
  });
}

/**
 * Conversion helper — purchase requires verification + idempotency.
 */
export function trackConversion(input: AnalyticsEventInput): AnalyticsTrackResult {
  return trackEvent({
    ...input,
    eventName: input.eventName ?? 'purchase',
    consentCategory: input.consentCategory ?? 'marketing',
    category: input.category ?? 'purchase',
  });
}
