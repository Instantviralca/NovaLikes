/**
 * Service-page analytics adapters for production buy-* pages.
 * Maps slug → typed no-op trackers (Documents 09.11 / 09.12).
 */

import {
  igFollowersAnalyticsEvents,
  trackIgFollowersEvent,
} from '@/lib/analytics/ig-followers-events';
import {
  igLikesAnalyticsEvents,
  trackIgLikesEvent,
} from '@/lib/analytics/ig-likes-events';
import {
  igViewsAnalyticsEvents,
  trackIgViewsEvent,
} from '@/lib/analytics/ig-views-events';
import {
  igCommentsAnalyticsEvents,
  trackIgCommentsEvent,
} from '@/lib/analytics/ig-comments-events';
import {
  tiktokFollowersAnalyticsEvents,
  trackTikTokFollowersEvent,
} from '@/lib/analytics/tiktok-followers-events';
import {
  tiktokLikesAnalyticsEvents,
  trackTikTokLikesEvent,
} from '@/lib/analytics/tiktok-likes-events';
import {
  tiktokViewsAnalyticsEvents,
  trackTikTokViewsEvent,
} from '@/lib/analytics/tiktok-views-events';
import {
  facebookFollowersAnalyticsEvents,
  trackFacebookFollowersEvent,
} from '@/lib/analytics/facebook-followers-events';
import {
  facebookPageLikesAnalyticsEvents,
  trackFacebookPageLikesEvent,
} from '@/lib/analytics/facebook-page-likes-events';
import {
  facebookPostLikesAnalyticsEvents,
  trackFacebookPostLikesEvent,
} from '@/lib/analytics/facebook-post-likes-events';

export type ServicePageAnalyticsPayload = {
  href?: string;
  packageId?: string;
  serviceSlug?: string;
  faqId?: string;
  cta?: 'primary' | 'secondary';
};

export type ServicePageAnalytics = {
  viewPackagesEvent: string;
  trackOrderEvent: string;
  viewPackages: (payload?: ServicePageAnalyticsPayload) => void;
  packageImpression: (payload: ServicePageAnalyticsPayload) => void;
  packageSelect: (payload: ServicePageAnalyticsPayload) => void;
  /** Username or URL submit before cart add. */
  configurationSubmit: (payload: ServicePageAnalyticsPayload) => void;
  /** Optional custom comment text submit (Document 09.14). */
  customTextSubmit?: (payload: ServicePageAnalyticsPayload) => void;
  checkoutStart: (payload: ServicePageAnalyticsPayload) => void;
  relatedServiceClick: (payload: ServicePageAnalyticsPayload) => void;
  faqOpen: (payload: ServicePageAnalyticsPayload) => void;
  trackOrderClick: (payload: ServicePageAnalyticsPayload) => void;
};

export function getServicePageAnalytics(slug: string): ServicePageAnalytics | null {
  if (slug === 'buy-instagram-followers') {
    return {
      viewPackagesEvent: igFollowersAnalyticsEvents.ig_followers_view_packages,
      trackOrderEvent: igFollowersAnalyticsEvents.ig_followers_track_order_click,
      viewPackages: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_view_packages, payload),
      packageImpression: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_package_impression, payload),
      packageSelect: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_package_select, payload),
      configurationSubmit: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_username_submit, payload),
      checkoutStart: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackIgFollowersEvent(
          igFollowersAnalyticsEvents.ig_followers_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_faq_open, payload),
      trackOrderClick: (payload) =>
        trackIgFollowersEvent(igFollowersAnalyticsEvents.ig_followers_track_order_click, payload),
    };
  }

  if (slug === 'buy-instagram-likes') {
    return {
      viewPackagesEvent: igLikesAnalyticsEvents.ig_likes_view_packages,
      trackOrderEvent: igLikesAnalyticsEvents.ig_likes_track_order_click,
      viewPackages: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_view_packages, payload),
      packageImpression: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_package_impression, payload),
      packageSelect: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_package_select, payload),
      configurationSubmit: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_url_submit, payload),
      checkoutStart: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_related_service_click, payload),
      faqOpen: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_faq_open, payload),
      trackOrderClick: (payload) =>
        trackIgLikesEvent(igLikesAnalyticsEvents.ig_likes_track_order_click, payload),
    };
  }

  if (slug === 'buy-instagram-views') {
    return {
      viewPackagesEvent: igViewsAnalyticsEvents.ig_views_view_packages,
      trackOrderEvent: igViewsAnalyticsEvents.ig_views_track_order_click,
      viewPackages: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_view_packages, payload),
      packageImpression: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_package_impression, payload),
      packageSelect: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_package_select, payload),
      configurationSubmit: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_url_submit, payload),
      checkoutStart: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_related_service_click, payload),
      faqOpen: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_faq_open, payload),
      trackOrderClick: (payload) =>
        trackIgViewsEvent(igViewsAnalyticsEvents.ig_views_track_order_click, payload),
    };
  }

  if (slug === 'buy-instagram-comments') {
    return {
      viewPackagesEvent: igCommentsAnalyticsEvents.ig_comments_view_packages,
      trackOrderEvent: igCommentsAnalyticsEvents.ig_comments_track_order_click,
      viewPackages: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_view_packages, payload),
      packageImpression: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_package_impression, payload),
      packageSelect: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_package_select, payload),
      configurationSubmit: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_url_submit, payload),
      customTextSubmit: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_custom_text_submit, payload),
      checkoutStart: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackIgCommentsEvent(
          igCommentsAnalyticsEvents.ig_comments_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_faq_open, payload),
      trackOrderClick: (payload) =>
        trackIgCommentsEvent(igCommentsAnalyticsEvents.ig_comments_track_order_click, payload),
    };
  }

  if (slug === 'buy-tiktok-followers') {
    return {
      viewPackagesEvent: tiktokFollowersAnalyticsEvents.tiktok_followers_view_packages,
      trackOrderEvent: tiktokFollowersAnalyticsEvents.tiktok_followers_track_order_click,
      viewPackages: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_view_packages,
          payload,
        ),
      packageImpression: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_package_select,
          payload,
        ),
      configurationSubmit: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_username_submit,
          payload,
        ),
      checkoutStart: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_checkout_start,
          payload,
        ),
      relatedServiceClick: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_faq_open,
          payload,
        ),
      trackOrderClick: (payload) =>
        trackTikTokFollowersEvent(
          tiktokFollowersAnalyticsEvents.tiktok_followers_track_order_click,
          payload,
        ),
    };
  }

  if (slug === 'buy-tiktok-likes') {
    return {
      viewPackagesEvent: tiktokLikesAnalyticsEvents.tiktok_likes_view_packages,
      trackOrderEvent: tiktokLikesAnalyticsEvents.tiktok_likes_track_order_click,
      viewPackages: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_view_packages, payload),
      packageImpression: (payload) =>
        trackTikTokLikesEvent(
          tiktokLikesAnalyticsEvents.tiktok_likes_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_package_select, payload),
      configurationSubmit: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_url_submit, payload),
      checkoutStart: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackTikTokLikesEvent(
          tiktokLikesAnalyticsEvents.tiktok_likes_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_faq_open, payload),
      trackOrderClick: (payload) =>
        trackTikTokLikesEvent(tiktokLikesAnalyticsEvents.tiktok_likes_track_order_click, payload),
    };
  }

  if (slug === 'buy-tiktok-views') {
    return {
      viewPackagesEvent: tiktokViewsAnalyticsEvents.tiktok_views_view_packages,
      trackOrderEvent: tiktokViewsAnalyticsEvents.tiktok_views_track_order_click,
      viewPackages: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_view_packages, payload),
      packageImpression: (payload) =>
        trackTikTokViewsEvent(
          tiktokViewsAnalyticsEvents.tiktok_views_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_package_select, payload),
      configurationSubmit: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_url_submit, payload),
      checkoutStart: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_checkout_start, payload),
      relatedServiceClick: (payload) =>
        trackTikTokViewsEvent(
          tiktokViewsAnalyticsEvents.tiktok_views_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_faq_open, payload),
      trackOrderClick: (payload) =>
        trackTikTokViewsEvent(tiktokViewsAnalyticsEvents.tiktok_views_track_order_click, payload),
    };
  }

  if (slug === 'buy-facebook-followers') {
    return {
      viewPackagesEvent: facebookFollowersAnalyticsEvents.facebook_followers_view_packages,
      trackOrderEvent: facebookFollowersAnalyticsEvents.facebook_followers_track_order_click,
      viewPackages: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_view_packages,
          payload,
        ),
      packageImpression: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_package_select,
          payload,
        ),
      configurationSubmit: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_url_submit,
          payload,
        ),
      checkoutStart: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_checkout_start,
          payload,
        ),
      relatedServiceClick: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_faq_open,
          payload,
        ),
      trackOrderClick: (payload) =>
        trackFacebookFollowersEvent(
          facebookFollowersAnalyticsEvents.facebook_followers_track_order_click,
          payload,
        ),
    };
  }

  if (slug === 'buy-facebook-page-likes') {
    return {
      viewPackagesEvent: facebookPageLikesAnalyticsEvents.facebook_page_likes_view_packages,
      trackOrderEvent: facebookPageLikesAnalyticsEvents.facebook_page_likes_track_order_click,
      viewPackages: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_view_packages,
          payload,
        ),
      packageImpression: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_package_select,
          payload,
        ),
      configurationSubmit: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_url_submit,
          payload,
        ),
      checkoutStart: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_checkout_start,
          payload,
        ),
      relatedServiceClick: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_faq_open,
          payload,
        ),
      trackOrderClick: (payload) =>
        trackFacebookPageLikesEvent(
          facebookPageLikesAnalyticsEvents.facebook_page_likes_track_order_click,
          payload,
        ),
    };
  }

  if (slug === 'buy-facebook-post-likes') {
    return {
      viewPackagesEvent: facebookPostLikesAnalyticsEvents.facebook_post_likes_view_packages,
      trackOrderEvent: facebookPostLikesAnalyticsEvents.facebook_post_likes_track_order_click,
      viewPackages: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_view_packages,
          payload,
        ),
      packageImpression: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_package_impression,
          payload,
        ),
      packageSelect: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_package_select,
          payload,
        ),
      configurationSubmit: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_url_submit,
          payload,
        ),
      checkoutStart: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_checkout_start,
          payload,
        ),
      relatedServiceClick: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_related_service_click,
          payload,
        ),
      faqOpen: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_faq_open,
          payload,
        ),
      trackOrderClick: (payload) =>
        trackFacebookPostLikesEvent(
          facebookPostLikesAnalyticsEvents.facebook_post_likes_track_order_click,
          payload,
        ),
    };
  }

  return null;
}
