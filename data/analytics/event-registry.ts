/**
 * Approved analytics event registry — Document 14.09.
 * Prefer shared event names + structured context over platform-specific duplicates.
 */

import type { EventRegistryEntry } from '@/types/analytics';

function entry(
  eventName: string,
  category: EventRegistryEntry['category'],
  action: string,
  consentCategory: EventRegistryEntry['consentCategory'],
  description: string,
  extras?: Partial<
    Pick<EventRegistryEntry, 'channel' | 'requiresPackageId' | 'requiresServiceSlug'>
  >,
): EventRegistryEntry {
  return {
    eventName,
    category,
    action,
    consentCategory,
    channel: extras?.channel ?? 'public',
    requiresPackageId: extras?.requiresPackageId,
    requiresServiceSlug: extras?.requiresServiceSlug,
    description,
  };
}

export const ANALYTICS_EVENT_REGISTRY: readonly EventRegistryEntry[] = [
  // Global page / engagement
  entry('page_view', 'page', 'view', 'analytics', 'Generic page view'),
  entry('session_started', 'engagement', 'session_start', 'analytics', 'Anonymous session started'),
  entry('landing_view', 'page', 'landing', 'analytics', 'First page view of a session'),
  entry('service_view', 'service', 'view', 'analytics', 'Service page view (native)'),
  entry('page_engagement', 'engagement', 'engage', 'analytics', 'Meaningful page engagement'),
  entry('scroll_depth', 'engagement', 'scroll', 'analytics', 'Scroll depth milestone'),
  entry('outbound_link_click', 'engagement', 'click', 'analytics', 'Outbound link click'),
  entry('site_search', 'engagement', 'search', 'analytics', 'Site search (sanitized)'),
  entry('form_start', 'form', 'start', 'analytics', 'Form interaction start'),
  entry('form_error', 'form', 'error', 'analytics', 'Form validation error'),
  entry('form_submit', 'form', 'submit', 'analytics', 'Form submit attempt'),

  // Homepage
  entry('home_page_view', 'homepage', 'view', 'analytics', 'Homepage view'),
  entry('home_hero_get_started_click', 'homepage', 'click', 'analytics', 'Hero get started'),
  entry('home_explore_services_click', 'homepage', 'click', 'analytics', 'Explore services'),
  entry('home_platform_click', 'homepage', 'click', 'analytics', 'Platform card click'),
  entry('home_service_click', 'homepage', 'click', 'analytics', 'Service card click'),
  entry('home_about_click', 'homepage', 'click', 'analytics', 'About click'),
  entry('home_track_order_click', 'homepage', 'click', 'analytics', 'Track order click'),
  entry('home_faq_open', 'homepage', 'open', 'analytics', 'Homepage FAQ open'),
  entry('home_final_cta_click', 'homepage', 'click', 'analytics', 'Final CTA click'),

  // Service / package (shared names)
  entry('service_page_view', 'service', 'view', 'analytics', 'Service page view', {
    requiresServiceSlug: true,
  }),
  entry('service_view_packages', 'service', 'view_packages', 'analytics', 'View packages', {
    requiresServiceSlug: true,
  }),
  entry('package_impression', 'package', 'impression', 'analytics', 'Package impression', {
    requiresServiceSlug: true,
    requiresPackageId: true,
  }),
  entry('package_select', 'package', 'select', 'analytics', 'Package selected', {
    requiresServiceSlug: true,
    requiresPackageId: true,
  }),
  entry(
    'order_configuration_start',
    'service',
    'configure_start',
    'analytics',
    'Order configuration started',
    { requiresServiceSlug: true },
  ),
  entry(
    'order_details_open',
    'service',
    'order_details_open',
    'analytics',
    'Order details dialog opened',
    { requiresServiceSlug: true, requiresPackageId: true },
  ),
  entry(
    'order_configuration_submit',
    'service',
    'configure_submit',
    'analytics',
    'Order configuration submitted (no username/URL)',
    { requiresServiceSlug: true },
  ),
  entry('service_checkout_start', 'service', 'checkout_start', 'analytics', 'Service checkout start', {
    requiresServiceSlug: true,
  }),
  entry('related_service_click', 'service', 'related_click', 'analytics', 'Related service click'),
  entry('service_faq_open', 'service', 'faq_open', 'analytics', 'Service FAQ open'),
  entry('service_track_order_click', 'service', 'track_order', 'analytics', 'Service track order'),

  // Cart
  entry('cart_view', 'cart', 'view', 'analytics', 'Cart view'),
  entry('cart_view_click', 'cart', 'view_click', 'analytics', 'Cart view click from toast/nav'),
  entry('cart_item_add', 'cart', 'add', 'analytics', 'Cart item add'),
  entry('cart_add', 'cart', 'add', 'analytics', 'Cart add (native)'),
  entry('cart_remove', 'cart', 'remove', 'analytics', 'Cart remove (native)'),
  entry('cart_quantity_change', 'cart', 'quantity', 'analytics', 'Cart quantity change'),
  entry('cart_item_remove', 'cart', 'remove', 'analytics', 'Cart item remove'),
  entry('cart_item_edit', 'cart', 'edit', 'analytics', 'Cart item edit'),
  entry('cart_coupon_apply', 'cart', 'coupon_apply', 'analytics', 'Cart coupon apply'),
  entry('cart_coupon_remove', 'cart', 'coupon_remove', 'analytics', 'Cart coupon remove'),
  entry('cart_checkout_click', 'cart', 'checkout_click', 'analytics', 'Cart checkout click'),
  entry('checkout_click', 'cart', 'checkout_click', 'analytics', 'Checkout click from toast'),
  entry('cart_empty_state_view', 'cart', 'empty_view', 'analytics', 'Empty cart view'),
  entry('cart_recovery_returned', 'cart', 'recovery', 'analytics', 'Cart recovery return'),

  // Checkout
  entry('checkout_view', 'checkout', 'view', 'analytics', 'Checkout view'),
  entry('checkout_started', 'checkout', 'start', 'analytics', 'Checkout started (native)'),
  entry('checkout_email_entered', 'checkout', 'email', 'analytics', 'Checkout email milestone'),
  entry('coupon_applied', 'checkout', 'coupon_apply', 'analytics', 'Coupon applied'),
  entry('coupon_failed', 'checkout', 'coupon_fail', 'analytics', 'Coupon failed'),
  entry('checkout_contact_start', 'checkout', 'contact_start', 'analytics', 'Checkout contact start'),
  entry(
    'checkout_payment_method_select',
    'checkout',
    'payment_method',
    'analytics',
    'Payment method select',
  ),
  entry('checkout_coupon_apply', 'checkout', 'coupon_apply', 'analytics', 'Checkout coupon apply'),
  entry('checkout_terms_accept', 'checkout', 'terms_accept', 'analytics', 'Terms accepted'),
  entry('checkout_submit', 'checkout', 'submit', 'analytics', 'Checkout submit'),
  entry(
    'checkout_validation_error',
    'checkout',
    'validation_error',
    'analytics',
    'Checkout validation error',
  ),
  entry(
    'checkout_payment_redirect',
    'checkout',
    'payment_redirect',
    'analytics',
    'Payment provider redirect',
  ),
  entry('checkout_complete', 'checkout', 'complete', 'analytics', 'Checkout complete (pre-verify)'),
  entry('checkout_failure', 'checkout', 'failure', 'analytics', 'Checkout failure'),

  // Purchase (verified only)
  entry('purchase', 'purchase', 'purchase', 'marketing', 'Verified purchase conversion'),

  // Order tracking (privacy-safe)
  entry('track_order_page_view', 'tracking', 'view', 'analytics', 'Track order page view'),
  entry('track_order_form_start', 'tracking', 'form_start', 'analytics', 'Track order form start'),
  entry(
    'track_order_lookup_submit',
    'tracking',
    'lookup_submit',
    'analytics',
    'Track order lookup submit',
  ),
  entry(
    'track_order_lookup_success',
    'tracking',
    'lookup_success',
    'analytics',
    'Track order lookup success (no identifiers)',
  ),
  entry(
    'track_order_lookup_failure',
    'tracking',
    'lookup_failure',
    'analytics',
    'Track order lookup failure (no identifiers)',
  ),
  entry('track_order_support_click', 'tracking', 'support_click', 'analytics', 'Track order support'),

  // Contact
  entry('contact_page_view', 'contact', 'view', 'analytics', 'Contact page view'),
  entry('contact_form_start', 'contact', 'form_start', 'analytics', 'Contact form start'),
  entry('contact_form_submit', 'contact', 'form_submit', 'analytics', 'Contact form submit'),
  entry('contact_form_error', 'contact', 'form_error', 'analytics', 'Contact form error'),
  entry('contact_track_order_click', 'contact', 'track_order', 'analytics', 'Contact track order'),

  // FAQ
  entry('faq_page_view', 'faq', 'view', 'analytics', 'FAQ page view'),
  entry('faq_section_view', 'faq', 'section_view', 'analytics', 'FAQ section view'),
  entry('faq_search', 'faq', 'search', 'analytics', 'FAQ search (length/count only)'),
  entry('faq_search_no_results', 'faq', 'search_empty', 'analytics', 'FAQ search no results'),
  entry('faq_category_select', 'faq', 'category', 'analytics', 'FAQ category select'),
  entry('faq_question_open', 'faq', 'open', 'analytics', 'FAQ question open'),
  entry('faq_related_link_click', 'faq', 'related_click', 'analytics', 'FAQ related link'),
  entry('faq_support_click', 'faq', 'support_click', 'analytics', 'FAQ support click'),

  // Learn search & filters — Document 15.05 (never send raw query text)
  entry('learn_search_start', 'engagement', 'search_start', 'analytics', 'Learn search started'),
  entry(
    'learn_search_submit',
    'engagement',
    'search_submit',
    'analytics',
    'Learn search submit (length/count only)',
  ),
  entry(
    'learn_search_no_results',
    'engagement',
    'search_empty',
    'analytics',
    'Learn search no results',
  ),
  entry('learn_filter_open', 'engagement', 'filter_open', 'analytics', 'Learn filter drawer open'),
  entry('learn_filter_apply', 'engagement', 'filter_apply', 'analytics', 'Learn filters applied'),
  entry('learn_filter_remove', 'engagement', 'filter_remove', 'analytics', 'Learn filter removed'),
  entry('learn_filters_clear', 'engagement', 'filters_clear', 'analytics', 'Learn filters cleared'),
  entry('learn_sort_change', 'engagement', 'sort', 'analytics', 'Learn sort changed'),
  entry(
    'learn_article_result_click',
    'engagement',
    'result_click',
    'analytics',
    'Learn search result click',
  ),
  entry(
    'learn_pagination_click',
    'engagement',
    'pagination',
    'analytics',
    'Learn pagination click',
  ),

  // Learn content performance — Document 16.10 (aggregate only; no PII)
  entry(
    'content_article_view',
    'content',
    'view',
    'analytics',
    'Published Learn article page view',
  ),
  entry(
    'content_engaged_session',
    'content',
    'engage',
    'analytics',
    'Meaningful Learn article engagement',
  ),
  entry(
    'content_scroll_depth',
    'content',
    'scroll',
    'analytics',
    'Learn article scroll depth milestone',
  ),
  entry(
    'content_cta_click',
    'content',
    'cta_click',
    'analytics',
    'Learn article CTA click',
  ),
  entry(
    'content_related_article_click',
    'content',
    'related_click',
    'analytics',
    'Related Learn article click',
  ),
  entry(
    'content_faq_interaction',
    'content',
    'faq',
    'analytics',
    'Learn article FAQ interaction',
  ),
  entry(
    'content_internal_search',
    'content',
    'search',
    'analytics',
    'Learn internal search usage (no raw query)',
  ),
  entry(
    'content_organic_landing',
    'content',
    'organic_landing',
    'analytics',
    'Organic search landing on Learn article',
  ),
  entry(
    'content_conversion_assist',
    'content',
    'conversion_assist',
    'analytics',
    'Session assisted by Learn content before conversion',
  ),
  entry(
    'content_social_share',
    'content',
    'share',
    'analytics',
    'Learn article social share (when available)',
  ),

  // Trust / CTA
  entry('trust_component_view', 'trust', 'view', 'analytics', 'Trust component view'),
  entry('trust_cta_click', 'trust', 'click', 'analytics', 'Trust CTA click'),
  entry('refund_policy_click', 'trust', 'refund_click', 'analytics', 'Refund policy click'),
  entry('support_click', 'trust', 'support_click', 'analytics', 'Support click'),
  entry('cta_view', 'cta', 'view', 'analytics', 'CTA view'),
  entry('cta_click', 'cta', 'click', 'analytics', 'CTA click'),
  entry('cross_sell_click', 'cta', 'cross_sell', 'analytics', 'Cross-sell click'),
  entry('support_cta_click', 'cta', 'support', 'analytics', 'Support CTA click'),
  entry('checkout_cta_click', 'cta', 'checkout', 'analytics', 'Checkout CTA click'),

  // Reviews
  entry('testimonial_section_view', 'review', 'section_view', 'analytics', 'Testimonials section'),
  entry('testimonial_card_view', 'review', 'card_view', 'analytics', 'Testimonial card'),
  entry('testimonial_service_click', 'review', 'service_click', 'analytics', 'Testimonial service'),
  entry('review_expand', 'review', 'expand', 'analytics', 'Review expand'),
  entry('review_source_click', 'review', 'source_click', 'analytics', 'Review source click'),

  // Legal (minimal)
  entry('legal_page_view', 'legal', 'view', 'analytics', 'Legal page view'),
  entry('legal_toc_click', 'legal', 'toc_click', 'analytics', 'Legal TOC click'),
  entry('legal_contact_click', 'legal', 'contact_click', 'analytics', 'Legal contact click'),

  // About / linking extras used by existing typed trackers
  entry('about_page_view', 'engagement', 'view', 'analytics', 'About page view'),
  entry('about_cta_click', 'cta', 'click', 'analytics', 'About CTA click'),
  entry('internal_link_click', 'engagement', 'click', 'analytics', 'Internal link click'),
  entry('policy_link_click', 'engagement', 'click', 'analytics', 'Policy link click'),
  entry('breadcrumb_click', 'engagement', 'click', 'analytics', 'Breadcrumb click'),
  entry('faq_track_order_click', 'faq', 'track_order', 'analytics', 'FAQ track order click'),
  entry('faq_contact_support_click', 'faq', 'support_click', 'analytics', 'FAQ contact support'),

  // Admin (internal channel)
  entry('admin_login', 'admin', 'login', 'essential', 'Admin login', { channel: 'admin' }),
  entry('admin_order_view', 'admin', 'order_view', 'essential', 'Admin order view', {
    channel: 'admin',
  }),
  entry(
    'admin_order_status_change',
    'admin',
    'status_change',
    'essential',
    'Admin order status change',
    { channel: 'admin' },
  ),
  entry('admin_order_note_add', 'admin', 'note_add', 'essential', 'Admin note add', {
    channel: 'admin',
  }),
  entry('admin_package_view', 'admin', 'package_view', 'essential', 'Admin package view', {
    channel: 'admin',
  }),
  entry('admin_package_update', 'admin', 'package_update', 'essential', 'Admin package update', {
    channel: 'admin',
  }),
  entry('admin_coupon_create', 'admin', 'coupon_create', 'essential', 'Admin coupon create', {
    channel: 'admin',
  }),
  entry('admin_review_approve', 'admin', 'review_approve', 'essential', 'Admin review approve', {
    channel: 'admin',
  }),
  entry('admin_review_reject', 'admin', 'review_reject', 'essential', 'Admin review reject', {
    channel: 'admin',
  }),
  entry('admin_faq_approve', 'admin', 'faq_approve', 'essential', 'Admin FAQ approve', {
    channel: 'admin',
  }),
  entry('admin_faq_hide', 'admin', 'faq_hide', 'essential', 'Admin FAQ hide', {
    channel: 'admin',
  }),
  entry(
    'admin_faq_duplicate_warning',
    'admin',
    'faq_duplicate_warning',
    'essential',
    'Admin FAQ duplicate warning',
    { channel: 'admin' },
  ),
  entry('admin_content_publish', 'admin', 'content_publish', 'essential', 'Admin content publish', {
    channel: 'admin',
  }),
] as const;

const REGISTRY_BY_NAME = new Map(
  ANALYTICS_EVENT_REGISTRY.map((item) => [item.eventName, item]),
);

export function getEventRegistryEntry(eventName: string): EventRegistryEntry | undefined {
  return REGISTRY_BY_NAME.get(eventName);
}

export function isApprovedEventName(eventName: string): boolean {
  return REGISTRY_BY_NAME.has(eventName);
}

export function listApprovedEventNames(): string[] {
  return ANALYTICS_EVENT_REGISTRY.map((item) => item.eventName);
}

/**
 * Map legacy platform-specific event names onto shared registry events.
 * Keeps historical call sites working without duplicating funnel semantics.
 */
export const LEGACY_EVENT_ALIASES: Readonly<Record<string, string>> = {
  cart_item_add: 'cart_add',
  cart_item_remove: 'cart_remove',
  checkout_view: 'checkout_started',
  home_page_view: 'page_view',
  service_page_view: 'service_view',
  ig_followers_view_packages: 'service_view_packages',
  ig_followers_package_impression: 'package_impression',
  ig_followers_package_select: 'package_select',
  ig_followers_username_submit: 'order_configuration_submit',
  ig_followers_checkout_start: 'service_checkout_start',
  ig_followers_related_service_click: 'related_service_click',
  ig_followers_faq_open: 'service_faq_open',
  ig_followers_track_order_click: 'service_track_order_click',

  ig_likes_view_packages: 'service_view_packages',
  ig_likes_package_impression: 'package_impression',
  ig_likes_package_select: 'package_select',
  ig_likes_url_submit: 'order_configuration_submit',
  ig_likes_checkout_start: 'service_checkout_start',
  ig_likes_related_service_click: 'related_service_click',
  ig_likes_faq_open: 'service_faq_open',
  ig_likes_track_order_click: 'service_track_order_click',

  ig_views_view_packages: 'service_view_packages',
  ig_views_package_impression: 'package_impression',
  ig_views_package_select: 'package_select',
  ig_views_url_submit: 'order_configuration_submit',
  ig_views_checkout_start: 'service_checkout_start',
  ig_views_related_service_click: 'related_service_click',
  ig_views_faq_open: 'service_faq_open',
  ig_views_track_order_click: 'service_track_order_click',

  ig_comments_view_packages: 'service_view_packages',
  ig_comments_package_impression: 'package_impression',
  ig_comments_package_select: 'package_select',
  ig_comments_url_submit: 'order_configuration_submit',
  ig_comments_custom_text_submit: 'order_configuration_submit',
  ig_comments_checkout_start: 'service_checkout_start',
  ig_comments_related_service_click: 'related_service_click',
  ig_comments_faq_open: 'service_faq_open',
  ig_comments_track_order_click: 'service_track_order_click',

  tiktok_followers_view_packages: 'service_view_packages',
  tiktok_followers_package_impression: 'package_impression',
  tiktok_followers_package_select: 'package_select',
  tiktok_followers_username_submit: 'order_configuration_submit',
  tiktok_followers_checkout_start: 'service_checkout_start',
  tiktok_followers_related_service_click: 'related_service_click',
  tiktok_followers_faq_open: 'service_faq_open',
  tiktok_followers_track_order_click: 'service_track_order_click',

  tiktok_likes_view_packages: 'service_view_packages',
  tiktok_likes_package_impression: 'package_impression',
  tiktok_likes_package_select: 'package_select',
  tiktok_likes_url_submit: 'order_configuration_submit',
  tiktok_likes_checkout_start: 'service_checkout_start',
  tiktok_likes_related_service_click: 'related_service_click',
  tiktok_likes_faq_open: 'service_faq_open',
  tiktok_likes_track_order_click: 'service_track_order_click',

  tiktok_views_view_packages: 'service_view_packages',
  tiktok_views_package_impression: 'package_impression',
  tiktok_views_package_select: 'package_select',
  tiktok_views_url_submit: 'order_configuration_submit',
  tiktok_views_checkout_start: 'service_checkout_start',
  tiktok_views_related_service_click: 'related_service_click',
  tiktok_views_faq_open: 'service_faq_open',
  tiktok_views_track_order_click: 'service_track_order_click',

  facebook_followers_view_packages: 'service_view_packages',
  facebook_followers_package_impression: 'package_impression',
  facebook_followers_package_select: 'package_select',
  facebook_followers_url_submit: 'order_configuration_submit',
  facebook_followers_checkout_start: 'service_checkout_start',
  facebook_followers_related_service_click: 'related_service_click',
  facebook_followers_faq_open: 'service_faq_open',
  facebook_followers_track_order_click: 'service_track_order_click',

  facebook_page_likes_view_packages: 'service_view_packages',
  facebook_page_likes_package_impression: 'package_impression',
  facebook_page_likes_package_select: 'package_select',
  facebook_page_likes_url_submit: 'order_configuration_submit',
  facebook_page_likes_checkout_start: 'service_checkout_start',
  facebook_page_likes_related_service_click: 'related_service_click',
  facebook_page_likes_faq_open: 'service_faq_open',
  facebook_page_likes_track_order_click: 'service_track_order_click',

  facebook_post_likes_view_packages: 'service_view_packages',
  facebook_post_likes_package_impression: 'package_impression',
  facebook_post_likes_package_select: 'package_select',
  facebook_post_likes_url_submit: 'order_configuration_submit',
  facebook_post_likes_checkout_start: 'service_checkout_start',
  facebook_post_likes_related_service_click: 'related_service_click',
  facebook_post_likes_faq_open: 'service_faq_open',
  facebook_post_likes_track_order_click: 'service_track_order_click',

  youtube_subscribers_view_packages: 'service_view_packages',
  youtube_subscribers_package_impression: 'package_impression',
  youtube_subscribers_package_select: 'package_select',
  youtube_subscribers_url_submit: 'order_configuration_submit',
  youtube_subscribers_checkout_start: 'service_checkout_start',
  youtube_subscribers_related_service_click: 'related_service_click',
  youtube_subscribers_faq_open: 'service_faq_open',
  youtube_subscribers_track_order_click: 'service_track_order_click',

  youtube_views_view_packages: 'service_view_packages',
  youtube_views_package_impression: 'package_impression',
  youtube_views_package_select: 'package_select',
  youtube_views_url_submit: 'order_configuration_submit',
  youtube_views_checkout_start: 'service_checkout_start',
  youtube_views_related_service_click: 'related_service_click',
  youtube_views_faq_open: 'service_faq_open',
  youtube_views_track_order_click: 'service_track_order_click',

  faq_admin_approve: 'admin_faq_approve',
  faq_admin_hide: 'admin_faq_hide',
  faq_admin_duplicate_warning: 'admin_faq_duplicate_warning',

  review_admin_approve: 'admin_review_approve',
  review_admin_reject: 'admin_review_reject',
  review_admin_feature: 'admin_review_approve',
  faq_contact_support_click: 'faq_support_click',
};

export function resolveCanonicalEventName(eventName: string): string {
  return LEGACY_EVENT_ALIASES[eventName] ?? eventName;
}
