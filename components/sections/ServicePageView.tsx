import {
  Benefits,
  Process,
  RelatedServices,
  ServiceRelatedArticles,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
  ServiceReviews,
} from '@/components/sections/service';
import { ServiceEducationalGuide } from '@/components/sections/service/educational-guide';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { loadServicePageVisuals } from '@/components/sections/service-page-dynamic/load';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import { ServiceFeatureGrid } from '@/components/design-system/service-feature-grid';
import { TrustPanel } from '@/components/design-system/trust-panel';
import { getEducationalGuideBySlug } from '@/data/content/instagram-educational-guides';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import { routes } from '@/config/routes';
import type { Service } from '@/types/service';
import type { ComponentType } from 'react';

type ServicePageViewProps = {
  service: Service;
};

const EmptyVisual: ComponentType<Record<string, unknown>> = () => null;

/**
 * Service page — Documents 09.01 + 09.11 + 10.01–10.03.
 * Instagram followers/likes use packages-conversion layouts.
 * Platform illustrations load only for the active service platform.
 */
export async function ServicePageView({ service }: ServicePageViewProps) {
  if (service.slug === 'buy-instagram-followers') {
    const { InstagramFollowersPackagesView } =
      await import('@/components/sections/instagram-followers-packages-view');
    return <InstagramFollowersPackagesView service={service} />;
  }
  if (service.slug === 'buy-instagram-likes') {
    const { InstagramLikesPackagesView } =
      await import('@/components/sections/instagram-likes-packages-view');
    return <InstagramLikesPackagesView service={service} />;
  }
  if (service.slug === 'buy-instagram-views') {
    const { InstagramViewsPackagesView } =
      await import('@/components/sections/instagram-views-packages-view');
    return <InstagramViewsPackagesView service={service} />;
  }
  if (service.slug === 'buy-tiktok-followers') {
    const { TikTokFollowersAuthorityView } =
      await import('@/components/sections/tiktok-followers-authority-view');
    return <TikTokFollowersAuthorityView service={service} />;
  }
  if (service.slug === 'buy-tiktok-likes') {
    const { TikTokLikesAuthorityView } =
      await import('@/components/sections/tiktok-likes-authority-view');
    return <TikTokLikesAuthorityView service={service} />;
  }
  if (service.slug === 'buy-tiktok-views') {
    const { TikTokViewsAuthorityView } =
      await import('@/components/sections/tiktok-views-authority-view');
    return <TikTokViewsAuthorityView service={service} />;
  }
  if (service.slug === 'buy-facebook-followers') {
    const { FacebookFollowersAuthorityView } =
      await import('@/components/sections/facebook-followers-authority-view');
    return <FacebookFollowersAuthorityView service={service} />;
  }
  if (service.slug === 'buy-facebook-page-likes') {
    const { FacebookPageLikesAuthorityView } =
      await import('@/components/sections/facebook-page-likes-authority-view');
    return <FacebookPageLikesAuthorityView service={service} />;
  }
  if (service.slug === 'buy-facebook-post-likes') {
    const { FacebookPostLikesAuthorityView } =
      await import('@/components/sections/facebook-post-likes-authority-view');
    return <FacebookPostLikesAuthorityView service={service} />;
  }
  if (service.slug === 'buy-youtube-subscribers') {
    const { YouTubeSubscribersAuthorityView } =
      await import('@/components/sections/youtube-subscribers-authority-view');
    return <YouTubeSubscribersAuthorityView service={service} />;
  }
  if (service.slug === 'buy-youtube-views') {
    const { YouTubeViewsAuthorityView } =
      await import('@/components/sections/youtube-views-authority-view');
    return <YouTubeViewsAuthorityView service={service} />;
  }

  const content = getServiceContentBySlug(service.slug);

  if (!content) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-muted-foreground">
          Missing content document for {service.slug}. Add it under data/content/.
        </p>
      </div>
    );
  }

  const visuals = (await loadServicePageVisuals(service.slug)) as Record<
    string,
    ComponentType<Record<string, unknown>> | undefined
  >;
  const PackagesFinalCtaAside = visuals.PackagesFinalCtaAside ?? EmptyVisual;
  const TikTokFollowersFinalCtaAside = visuals.TikTokFollowersFinalCtaAside ?? EmptyVisual;
  const TikTokLikesFinalCtaAside = visuals.TikTokLikesFinalCtaAside ?? EmptyVisual;
  const TikTokViewsFinalCtaAside = visuals.TikTokViewsFinalCtaAside ?? EmptyVisual;
  const YouTubeSubscribersFinalCtaAside = visuals.YouTubeSubscribersFinalCtaAside ?? EmptyVisual;
  const YouTubeSubscribersLearnMore = visuals.YouTubeSubscribersLearnMore ?? EmptyVisual;
  const YouTubeViewsFinalCtaAside = visuals.YouTubeViewsFinalCtaAside ?? EmptyVisual;
  const FacebookFollowersFinalCtaAside = visuals.FacebookFollowersFinalCtaAside ?? EmptyVisual;
  const FacebookPostLikesFinalCtaAside = visuals.FacebookPostLikesFinalCtaAside ?? EmptyVisual;
  const FacebookFollowersOrderStatusDashboard =
    visuals.FacebookFollowersOrderStatusDashboard ?? EmptyVisual;
  const FacebookFollowersOrderSummaryDashboard =
    visuals.FacebookFollowersOrderSummaryDashboard ?? EmptyVisual;
  const FacebookFollowersProcessTimeline = visuals.FacebookFollowersProcessTimeline ?? EmptyVisual;
  const FacebookFollowersDeliveryTimeline =
    visuals.FacebookFollowersDeliveryTimeline ?? EmptyVisual;
  const FacebookPageLikesOrderStatusDashboard =
    visuals.FacebookPageLikesOrderStatusDashboard ?? EmptyVisual;
  const FacebookPageLikesOrderSummaryDashboard =
    visuals.FacebookPageLikesOrderSummaryDashboard ?? EmptyVisual;
  const FacebookPageLikesProcessTimeline = visuals.FacebookPageLikesProcessTimeline ?? EmptyVisual;
  const FacebookPageLikesDeliveryTimeline =
    visuals.FacebookPageLikesDeliveryTimeline ?? EmptyVisual;
  const FacebookPostLikesOrderStatusDashboard =
    visuals.FacebookPostLikesOrderStatusDashboard ?? EmptyVisual;
  const FacebookPostLikesOrderSummaryDashboard =
    visuals.FacebookPostLikesOrderSummaryDashboard ?? EmptyVisual;
  const FacebookPostLikesProcessTimeline = visuals.FacebookPostLikesProcessTimeline ?? EmptyVisual;
  const FacebookPostLikesDeliveryTimeline =
    visuals.FacebookPostLikesDeliveryTimeline ?? EmptyVisual;
  const TikTokLikesOrderSummaryDashboard = visuals.TikTokLikesOrderSummaryDashboard ?? EmptyVisual;
  const TikTokLikesSecureOrderingDashboard =
    visuals.TikTokLikesSecureOrderingDashboard ?? EmptyVisual;
  const TikTokOrderStatusDashboard = visuals.TikTokOrderStatusDashboard ?? EmptyVisual;
  const TikTokOrderSummaryDashboard = visuals.TikTokOrderSummaryDashboard ?? EmptyVisual;
  const TikTokViewsOrderSummaryDashboard = visuals.TikTokViewsOrderSummaryDashboard ?? EmptyVisual;
  const TikTokViewsSecureCheckoutDashboard =
    visuals.TikTokViewsSecureCheckoutDashboard ?? EmptyVisual;
  const YouTubeSubscribersOrderStatusDashboard =
    visuals.YouTubeSubscribersOrderStatusDashboard ?? EmptyVisual;
  const YouTubeSubscribersOrderSummaryDashboard =
    visuals.YouTubeSubscribersOrderSummaryDashboard ?? EmptyVisual;
  const YouTubeSubscribersProcessTimeline =
    visuals.YouTubeSubscribersProcessTimeline ?? EmptyVisual;
  const YouTubeViewsDeliveryTimeline = visuals.YouTubeViewsDeliveryTimeline ?? EmptyVisual;
  const YouTubeViewsOrderStatusDashboard = visuals.YouTubeViewsOrderStatusDashboard ?? EmptyVisual;
  const YouTubeViewsOrderSummaryDashboard =
    visuals.YouTubeViewsOrderSummaryDashboard ?? EmptyVisual;
  const YouTubeViewsProcessTimeline = visuals.YouTubeViewsProcessTimeline ?? EmptyVisual;

  const vm = mapServiceContent(content);
  const isIgViews = service.slug === 'buy-instagram-views';
  const isIgComments = service.slug === 'buy-instagram-comments';
  const isTtFollowers = service.slug === 'buy-tiktok-followers';
  const isTtLikes = service.slug === 'buy-tiktok-likes';
  const isTtViews = service.slug === 'buy-tiktok-views';
  const isYtSubscribers = service.slug === 'buy-youtube-subscribers';
  const isYtViews = service.slug === 'buy-youtube-views';
  const isFbFollowers = service.slug === 'buy-facebook-followers';
  const isFbPageLikes = service.slug === 'buy-facebook-page-likes';
  const isFbPostLikes = service.slug === 'buy-facebook-post-likes';
  const related = resolveRelatedServices(
    service,
    content.relatedServices.serviceSlugs,
    isTtFollowers || isFbFollowers || isFbPageLikes ? 2 : 3,
  );
  const relatedArticles = getRelatedArticles(service.slug, {
    platform: service.platform,
    limit: 6,
  });
  const relatedArticleHrefs = new Set(relatedArticles.map((item) => item.href));
  const peopleAlsoRead = [
    ...getRelatedArticles(service.slug, {
      platform: service.platform,
      limit: 12,
    }).filter((item) => !relatedArticleHrefs.has(item.href)),
  ];
  if (peopleAlsoRead.length < 4) {
    const extras = getRelatedArticles(service.slug, { limit: 16 }).filter(
      (item) =>
        !relatedArticleHrefs.has(item.href) &&
        !peopleAlsoRead.some((existing) => existing.href === item.href),
    );
    for (const item of extras) {
      peopleAlsoRead.push(item);
      if (peopleAlsoRead.length >= 4) break;
    }
  }
  const peopleAlsoReadFinal = peopleAlsoRead.slice(0, 4);
  const breadcrumbs = buildBreadcrumb(service.slug);
  const previewPackageId = vm.pricing.packages[0]?.package.id;
  const educationalGuide = getEducationalGuideBySlug(service.slug);
  const heroInstagramVariant = isIgViews ? 'views' : isIgComments ? 'comments' : undefined;
  const heroTikTokVariant = isTtFollowers
    ? 'followers'
    : isTtLikes
      ? 'likes'
      : isTtViews
        ? 'views'
        : undefined;
  const heroYouTubeVariant = isYtSubscribers ? 'subscribers' : isYtViews ? 'views' : undefined;
  const heroFacebookVariant = isFbFollowers
    ? 'followers'
    : isFbPageLikes
      ? 'page-likes'
      : isFbPostLikes
        ? 'post-likes'
        : undefined;

  const useProductionOrder = Boolean(vm.deliveryAndSafety);
  const educationalBlock = educationalGuide ? (
    <ServiceEducationalGuide guide={educationalGuide} />
  ) : null;
  const faqBlock = (
    <ServiceFaq
      id={vm.faq.id}
      title={vm.faq.title}
      description={vm.faq.description}
      items={vm.faq.items}
      analyticsServiceSlug={service.slug}
    />
  );
  const relatedBlock = (
    <RelatedServices
      id={vm.relatedServices.id ?? content.relatedServices.id}
      title={vm.relatedServices.title}
      description={vm.relatedServices.description}
      services={related}
      cta={vm.relatedServices.cta}
      analyticsServiceSlug={service.slug}
      footerLinks={
        isTtFollowers
          ? [
              { label: 'Homepage', href: routes.home },
              { label: 'TikTok Likes Packages', href: '/buy-tiktok-likes' },
              { label: 'TikTok Views Packages', href: '/buy-tiktok-views' },
              {
                label: 'Instagram Followers Packages',
                href: '/buy-instagram-followers',
              },
              { label: 'Instagram Likes Packages', href: '/buy-instagram-likes' },
              { label: 'Support Page', href: routes.contact },
              { label: 'FAQ Page', href: routes.faq },
            ]
          : isTtLikes
            ? [
                { label: 'Homepage', href: routes.home },
                {
                  label: 'Buy TikTok Followers',
                  href: '/buy-tiktok-followers',
                },
                { label: 'Buy TikTok Views', href: '/buy-tiktok-views' },
                { label: 'Support Page', href: routes.contact },
              ]
            : isTtViews
              ? [
                  { label: 'Homepage', href: routes.home },
                  {
                    label: 'Buy TikTok Followers',
                    href: '/buy-tiktok-followers',
                  },
                  { label: 'Buy TikTok Likes', href: '/buy-tiktok-likes' },
                  { label: 'Support Page', href: routes.contact },
                ]
              : isYtSubscribers
                ? [
                    { label: 'Homepage', href: routes.home },
                    {
                      label: 'YouTube Views Packages',
                      href: '/buy-youtube-views',
                    },
                    { label: 'Contact Support', href: routes.contact },
                    { label: 'Order Tracking', href: routes.trackOrder },
                    { label: 'Refund Policy', href: routes.refundPolicy },
                    { label: 'FAQ', href: routes.faq },
                  ]
                : isFbFollowers
                  ? [
                      { label: 'Homepage', href: routes.home },
                      {
                        label: 'Buy Facebook Page Likes',
                        href: '/buy-facebook-page-likes',
                      },
                      {
                        label: 'Buy Facebook Post Likes',
                        href: '/buy-facebook-post-likes',
                      },
                      { label: 'Contact', href: routes.contact },
                      { label: 'Order Tracking', href: routes.trackOrder },
                      { label: 'FAQ', href: routes.faq },
                    ]
                  : isFbPostLikes
                    ? [
                        { label: 'Homepage', href: routes.home },
                        {
                          label: 'Facebook Followers Packages',
                          href: '/buy-facebook-followers',
                        },
                        {
                          label: 'Facebook Page Likes Packages',
                          href: '/buy-facebook-page-likes',
                        },
                        { label: 'Contact Support', href: routes.contact },
                        { label: 'Order Tracking', href: routes.trackOrder },
                        { label: 'Refund Policy', href: routes.refundPolicy },
                      ]
                    : undefined
      }
    />
  );
  const relatedArticlesBlock = <ServiceRelatedArticles articles={relatedArticles} />;
  const peopleAlsoReadBlock = (
    <ServiceRelatedArticles
      id="people-also-read"
      title="People Also Read"
      description="More Learn Center guides readers explore alongside this service."
      articles={peopleAlsoReadFinal}
    />
  );

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        instagramVariant={heroInstagramVariant}
        tiktokVariant={heroTikTokVariant}
        youtubeVariant={heroYouTubeVariant}
        facebookVariant={heroFacebookVariant}
      />
      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={
          isIgComments
            ? [
                'Public Post URL Only',
                'Relevant conversation',
                'Secure Checkout',
                'Order Tracking',
                'Professional Support',
              ]
            : undefined
        }
      />
      <Benefits
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
      />
      <RequirementGuide
        id={isFbFollowers || isFbPageLikes || isFbPostLikes ? 'what-we-need-from-you' : undefined}
        visualVariant={
          isIgViews
            ? 'instagram-views'
            : isIgComments
              ? 'instagram-comments'
              : isTtFollowers
                ? 'tiktok-followers'
                : isTtLikes
                  ? 'tiktok-likes'
                  : isTtViews
                    ? 'tiktok-views'
                    : isYtSubscribers
                      ? 'youtube-subscribers'
                      : isYtViews
                        ? 'youtube-views'
                        : isFbFollowers
                          ? 'facebook-followers'
                          : isFbPageLikes
                            ? 'facebook-page-likes'
                            : isFbPostLikes
                              ? 'facebook-post-likes'
                              : 'default'
        }
        title={
          isIgViews ||
          isIgComments ||
          isTtFollowers ||
          isTtLikes ||
          isTtViews ||
          isYtSubscribers ||
          isYtViews ||
          isFbFollowers ||
          isFbPageLikes ||
          isFbPostLikes
            ? 'What We Need From You'
            : undefined
        }
        description={
          isIgViews
            ? 'Orders use a public Instagram video or Reel URL only. No login access, no password, and no account takeover.'
            : isIgComments
              ? 'Comments orders need a public post URL, the correct post, a public account, and your email. No Instagram password is required.'
              : isTtFollowers
                ? 'Getting started only takes a few moments. To process your order accurately, we only ask for the information needed to identify your public TikTok profile and deliver your selected package. No passwords or private account access are ever required.'
                : isTtLikes
                  ? 'Ordering TikTok likes only requires a few public details. Do not ask for passwords or account login.'
                  : isTtViews
                    ? 'Ordering TikTok views requires only a few public details. Never request passwords or account login.'
                    : isYtSubscribers
                      ? 'Getting started only requires a few public details. We keep the ordering process simple while protecting your account privacy at every step.'
                      : isYtViews
                        ? 'Only a few public details are required before we can begin processing your order.'
                        : isFbFollowers
                          ? 'Only a few public details are required before your order can begin.'
                          : isFbPageLikes
                            ? 'Getting started only requires a few public details. Private account access is never requested.'
                            : isFbPostLikes
                              ? 'Only a few public details are required before processing your order.'
                              : undefined
        }
      />
      <TrustPanel
        showIllustration
        title={
          isFbFollowers || isFbPageLikes || isFbPostLikes || isYtViews || isTtLikes || isTtViews
            ? 'Order With Confidence'
            : isYtSubscribers || isIgComments || isTtFollowers
              ? 'Order With Clarity'
              : undefined
        }
        description={
          isFbPostLikes
            ? 'Ordering Facebook post likes is simple and transparent. Submit your public Facebook post URL, choose the package that matches your engagement goals and complete checkout securely. After your order is confirmed, you can monitor delivery progress using your order details.'
            : isFbPageLikes
              ? 'Ordering Facebook page likes is designed to be straightforward and transparent. Simply provide your public Facebook page URL, choose the package that matches your goals and complete checkout securely. After your order is confirmed, you can monitor delivery updates using your order information.'
              : isFbFollowers
                ? 'Growing your Facebook page should be simple and transparent. Submit your public Facebook page URL, choose the package that matches your goals and complete checkout securely. After your order is confirmed, you can monitor available delivery updates using your order information.'
                : isYtViews
                  ? 'Buying YouTube views is straightforward. Submit your public video URL, review your selected package and complete checkout without sharing your account password. Once your order is confirmed, you can monitor delivery progress using your order information.'
                  : isYtSubscribers
                    ? 'Every subscriber order follows a clear process from package selection to delivery. You provide your public YouTube channel URL, review the order details and complete checkout without sharing login credentials. After confirmation, use your order information to monitor available delivery updates.'
                    : isIgComments
                      ? 'Checkout stays simple and secure. Review transparent delivery details, place the order with public post information only, then track progress with professional support available if you need help.'
                      : isTtFollowers
                        ? "Every order follows a clear process from package selection to delivery. You'll know exactly what information is required, when your order has been confirmed, and how to monitor its progress through order tracking."
                        : isTtLikes
                          ? 'Buying TikTok likes should be simple and transparent. We only require your public TikTok video URL, never your account password. Every order includes secure checkout, progress tracking and dedicated support from purchase through delivery.'
                          : isTtViews
                            ? 'Buying TikTok views should be simple, transparent and secure. We only require your public TikTok video URL, never your account password. Every order includes secure checkout, gradual delivery and live order tracking from purchase to completion.'
                            : undefined
        }
        items={
          isFbPostLikes
            ? [
                {
                  id: 'fb-post-public',
                  label: 'Public Facebook Post URL Only',
                  icon: 'check',
                },
                { id: 'fb-post-password', label: 'No Password Required', icon: 'check' },
                { id: 'fb-post-checkout', label: 'Secure Checkout', icon: 'check' },
                { id: 'fb-post-track', label: 'Order Tracking', icon: 'track' },
                { id: 'fb-post-gradual', label: 'Gradual Delivery', icon: 'check' },
              ]
            : isFbPageLikes
              ? [
                  {
                    id: 'fb-pl-public',
                    label: 'Public Facebook Page URL Only',
                    icon: 'check',
                  },
                  { id: 'fb-pl-password', label: 'No Password Required', icon: 'check' },
                  { id: 'fb-pl-checkout', label: 'Secure Checkout', icon: 'check' },
                  { id: 'fb-pl-track', label: 'Order Tracking', icon: 'track' },
                  { id: 'fb-pl-gradual', label: 'Gradual Delivery', icon: 'check' },
                ]
              : isFbFollowers
                ? [
                    {
                      id: 'fb-f-public',
                      label: 'Public Facebook Page URL Only',
                      icon: 'check',
                    },
                    { id: 'fb-f-password', label: 'No Password Required', icon: 'check' },
                    { id: 'fb-f-checkout', label: 'Secure Checkout', icon: 'check' },
                    { id: 'fb-f-track', label: 'Order Tracking', icon: 'track' },
                    { id: 'fb-f-gradual', label: 'Gradual Delivery', icon: 'check' },
                  ]
                : isYtViews
                  ? [
                      { id: 'yt-v-public', label: 'Public Video URL Only', icon: 'check' },
                      { id: 'yt-v-password', label: 'No Password Required', icon: 'check' },
                      { id: 'yt-v-checkout', label: 'Secure Checkout', icon: 'check' },
                      { id: 'yt-v-track', label: 'Order Tracking', icon: 'track' },
                      { id: 'yt-v-gradual', label: 'Gradual Delivery', icon: 'check' },
                    ]
                  : isYtSubscribers
                    ? [
                        { id: 'yt-s-public', label: 'Public Channel URL Only', icon: 'check' },
                        { id: 'yt-s-password', label: 'No Password Required', icon: 'check' },
                        { id: 'yt-s-details', label: 'Clear Package Details', icon: 'check' },
                        { id: 'yt-s-confirm', label: 'Order Confirmation', icon: 'check' },
                        { id: 'yt-s-track', label: 'Delivery Tracking', icon: 'track' },
                      ]
                    : isIgComments
                      ? [
                          { id: 'simple', label: 'Simple checkout', icon: 'check' },
                          { id: 'secure', label: 'Secure ordering', icon: 'check' },
                          { id: 'delivery', label: 'Transparent delivery', icon: 'check' },
                          { id: 'track', label: 'Order tracking', icon: 'track' },
                          { id: 'support', label: 'Professional support', icon: 'support' },
                        ]
                      : isTtFollowers
                        ? [
                            { id: 'tt-username', label: 'Public Username Only', icon: 'check' },
                            { id: 'tt-checkout', label: 'Secure Checkout', icon: 'check' },
                            { id: 'tt-confirm', label: 'Order Confirmation', icon: 'check' },
                            { id: 'tt-track', label: 'Order Tracking', icon: 'track' },
                            {
                              id: 'tt-support',
                              label: 'Dedicated Customer Support',
                              icon: 'support',
                            },
                          ]
                        : isTtLikes
                          ? [
                              {
                                id: 'tt-l-public-url',
                                label: 'Public video URL only',
                                icon: 'check',
                              },
                              {
                                id: 'tt-l-no-password',
                                label: 'No password required',
                                icon: 'check',
                              },
                              {
                                id: 'tt-l-secure-checkout',
                                label: 'Secure checkout',
                                icon: 'check',
                              },
                              {
                                id: 'tt-l-order-tracking',
                                label: 'Order tracking',
                                icon: 'track',
                              },
                            ]
                          : isTtViews
                            ? [
                                {
                                  id: 'tt-v-public-url',
                                  label: 'Public video URL only',
                                  icon: 'check',
                                },
                                {
                                  id: 'tt-v-no-password',
                                  label: 'No password required',
                                  icon: 'check',
                                },
                                {
                                  id: 'tt-v-secure-checkout',
                                  label: 'Secure checkout',
                                  icon: 'check',
                                },
                                {
                                  id: 'tt-v-gradual',
                                  label: 'Gradual delivery',
                                  icon: 'check',
                                },
                                {
                                  id: 'tt-v-live-tracking',
                                  label: 'Live order tracking',
                                  icon: 'track',
                                },
                              ]
                            : undefined
        }
        illustration={
          isFbPostLikes ? (
            <FacebookPostLikesOrderStatusDashboard />
          ) : isFbPageLikes ? (
            <FacebookPageLikesOrderStatusDashboard />
          ) : isFbFollowers ? (
            <FacebookFollowersOrderStatusDashboard />
          ) : isYtViews ? (
            <YouTubeViewsOrderStatusDashboard />
          ) : isYtSubscribers ? (
            <YouTubeSubscribersOrderStatusDashboard />
          ) : isTtFollowers ? (
            <TikTokOrderStatusDashboard />
          ) : isTtLikes ? (
            <TikTokLikesSecureOrderingDashboard />
          ) : isTtViews ? (
            <TikTokViewsSecureCheckoutDashboard />
          ) : undefined
        }
      />

      <ServiceReviews
        title={vm.reviews.title}
        description={vm.reviews.description}
        serviceSlug={service.slug}
        platform={service.platform}
      />

      {useProductionOrder ? (
        <>
          {vm.whyNovaLikes.items.length > 0 ? (
            <ServiceFeatureGrid
              id={vm.whyNovaLikes.id}
              title={vm.whyNovaLikes.title}
              description={vm.whyNovaLikes.description}
              items={vm.whyNovaLikes.items}
              cta={vm.whyNovaLikes.cta}
              ariaLabel="Why choose NovaLikes"
              className="surface-muted"
            />
          ) : null}
          <Process
            id={vm.howItWorks.id}
            title={vm.howItWorks.title}
            description={vm.howItWorks.description}
            steps={vm.howItWorks.steps}
            cta={vm.howItWorks.cta}
            timeline={
              isFbPostLikes ? (
                <FacebookPostLikesProcessTimeline />
              ) : isFbPageLikes ? (
                <FacebookPageLikesProcessTimeline />
              ) : isFbFollowers ? (
                <FacebookFollowersProcessTimeline />
              ) : isYtViews ? (
                <YouTubeViewsProcessTimeline />
              ) : isYtSubscribers ? (
                <YouTubeSubscribersProcessTimeline />
              ) : undefined
            }
            progressAccent={isYtSubscribers || isYtViews ? 'youtube' : 'brand'}
          />
          {vm.deliveryAndSafety ? (
            <ServiceFeatureGrid
              id={vm.deliveryAndSafety.id}
              title={vm.deliveryAndSafety.title}
              description={vm.deliveryAndSafety.description}
              items={vm.deliveryAndSafety.items}
              ariaLabel="Delivery and safety"
              visual={
                isFbPostLikes ? (
                  <FacebookPostLikesOrderSummaryDashboard />
                ) : isFbPageLikes ? (
                  <FacebookPageLikesOrderSummaryDashboard />
                ) : isFbFollowers ? (
                  <FacebookFollowersOrderSummaryDashboard />
                ) : isYtViews ? (
                  <YouTubeViewsOrderSummaryDashboard />
                ) : isYtSubscribers ? (
                  <YouTubeSubscribersOrderSummaryDashboard />
                ) : isTtFollowers ? (
                  <TikTokOrderSummaryDashboard />
                ) : isTtLikes ? (
                  <TikTokLikesOrderSummaryDashboard />
                ) : isTtViews ? (
                  <TikTokViewsOrderSummaryDashboard />
                ) : undefined
              }
            />
          ) : null}
          {(isYtSubscribers || isYtViews || isFbFollowers || isFbPageLikes || isFbPostLikes) &&
          vm.features.items.length > 0 ? (
            isYtViews ? (
              <YouTubeViewsDeliveryTimeline
                id={vm.features.id}
                title={vm.features.title}
                description={vm.features.description}
              />
            ) : isFbPostLikes ? (
              <FacebookPostLikesDeliveryTimeline
                id={vm.features.id}
                title={vm.features.title}
                description={vm.features.description}
              />
            ) : isFbPageLikes ? (
              <FacebookPageLikesDeliveryTimeline
                id={vm.features.id}
                title={vm.features.title}
                description={vm.features.description}
              />
            ) : isFbFollowers ? (
              <FacebookFollowersDeliveryTimeline
                id={vm.features.id}
                title={vm.features.title}
                description={vm.features.description}
              />
            ) : (
              <ServiceFeatureGrid
                id={vm.features.id}
                title={vm.features.title}
                description={vm.features.description}
                items={vm.features.items}
                ariaLabel="YouTube subscriber delivery"
                className="surface-muted"
              />
            )
          ) : null}
          {educationalBlock}
          {faqBlock}
          {relatedBlock}
          {relatedArticlesBlock}
          {peopleAlsoReadBlock}
          {isYtSubscribers ? <YouTubeSubscribersLearnMore /> : null}
        </>
      ) : (
        <>
          {vm.features.items.length > 0 ? (
            <ServiceFeatureGrid
              id={vm.features.id}
              title={vm.features.title}
              description={vm.features.description}
              items={vm.features.items}
              cta={vm.features.cta}
              className="surface-muted"
            />
          ) : null}
          <Process
            id={vm.howItWorks.id}
            title={vm.howItWorks.title}
            description={vm.howItWorks.description}
            steps={vm.howItWorks.steps}
            cta={vm.howItWorks.cta}
          />
          {educationalBlock}
          {faqBlock}
          {relatedBlock}
          {relatedArticlesBlock}
          {peopleAlsoReadBlock}
        </>
      )}

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={
          isIgViews ? (
            <PackagesFinalCtaAside instagramVariant="views" />
          ) : isIgComments ? (
            <PackagesFinalCtaAside instagramVariant="comments" />
          ) : isTtFollowers ? (
            <TikTokFollowersFinalCtaAside />
          ) : isTtLikes ? (
            <TikTokLikesFinalCtaAside />
          ) : isTtViews ? (
            <TikTokViewsFinalCtaAside />
          ) : isYtSubscribers ? (
            <YouTubeSubscribersFinalCtaAside />
          ) : isYtViews ? (
            <YouTubeViewsFinalCtaAside />
          ) : isFbFollowers ? (
            <FacebookFollowersFinalCtaAside />
          ) : isFbPostLikes ? (
            <FacebookPostLikesFinalCtaAside />
          ) : undefined
        }
        className={
          isTtLikes || isTtViews || isYtSubscribers || isYtViews || isFbFollowers || isFbPostLikes
            ? 'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_80%_20%,rgba(249,115,22,0.1),transparent_55%)] before:content-[""] [&_[aria-hidden]]:mt-1 sm:[&_[aria-hidden]]:mt-2 [&_a]:min-h-12 [&_a]:px-8 [&_a]:text-base [&_a]:sm:min-h-[3.25rem] [&_section]:overflow-visible'
            : isIgViews || isIgComments || isTtFollowers
              ? 'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_80%_20%,rgba(249,115,22,0.1),transparent_55%)] before:content-[""] [&_[aria-hidden]]:mt-1 sm:[&_[aria-hidden]]:mt-2 [&_a]:min-h-12 [&_a]:px-8 [&_a]:text-base [&_a]:sm:min-h-[3.25rem]'
              : undefined
        }
      />
    </div>
  );
}
