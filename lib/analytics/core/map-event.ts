/**
 * Map internal events to provider-specific shapes — Document 14.09.
 */

import type {
  AnalyticsEvent,
  AnalyticsProviderId,
} from '@/types/analytics';

export type ProviderMappedEvent = {
  provider: AnalyticsProviderId;
  name: string;
  params: Record<string, string | number | boolean | undefined>;
};

/**
 * Translate a canonical NovaLikes event into a provider payload.
 * Providers never receive raw PII — only the already-sanitized event.
 */
export function mapEventToProvider(
  event: AnalyticsEvent,
  provider: AnalyticsProviderId,
): ProviderMappedEvent {
  const params: Record<string, string | number | boolean | undefined> = {
    event_category: event.category,
    event_action: event.action,
    event_label: event.label,
    value: event.value,
    currency: event.currency,
    platform: event.platform,
    service_slug: event.serviceSlug,
    package_id: event.packageId,
    quantity: event.quantity,
    displayed_price: event.displayedPrice,
    page_path: event.pagePath,
    page_type: event.pageType,
    consent_category: event.consentCategory,
    channel: event.channel,
  };

  if (event.metadata) {
    for (const [key, value] of Object.entries(event.metadata)) {
      if (value === null || value === undefined) continue;
      params[`meta_${key}`] = value;
    }
  }

  if (provider === 'ga4') {
    return {
      provider,
      name: event.eventName === 'page_view' ? 'page_view' : event.eventName,
      params: {
        ...params,
        engagement_time_msec: event.eventName === 'page_view' ? 1 : undefined,
      },
    };
  }

  if (provider === 'gtm') {
    return {
      provider,
      name: event.eventName,
      params: {
        ...params,
        event: event.eventName,
      },
    };
  }

  if (provider === 'clarity') {
    return {
      provider,
      name: event.eventName,
      params: {
        event_name: event.eventName,
        page_path: event.pagePath,
        page_type: event.pageType,
        service_slug: event.serviceSlug,
        platform: event.platform,
      },
    };
  }

  return {
    provider,
    name: event.eventName,
    params,
  };
}
