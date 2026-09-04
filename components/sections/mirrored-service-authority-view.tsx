import {
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import {
  InstagramFollowersBeforeBuying,
  InstagramFollowersBestPractices,
  InstagramFollowersCanYouBuy,
  InstagramFollowersCommonMistakes,
  InstagramFollowersDoesBuyingHelp,
  InstagramFollowersHowToBuy,
  InstagramFollowersPackageSizes,
  InstagramFollowersServiceCompare,
  InstagramFollowersWhatHappens,
  InstagramFollowersWhyBuy,
  InstagramFollowersWhyChoose,
  InstagramFollowersWorldwide,
} from '@/components/marketing/instagram-followers/authority-sections';
import { InstagramCommentsSectionVisual } from '@/components/illustrations/instagram-comments-section-visual';
import { InstagramLikesSectionVisual } from '@/components/illustrations/instagram-likes-section-visual';
import { InstagramViewsSectionVisual } from '@/components/illustrations/instagram-views-section-visual';
import { TikTokFollowersSectionVisual } from '@/components/illustrations/tiktok-followers-section-visual';
import { TikTokLikesSectionVisual } from '@/components/illustrations/tiktok-likes-section-visual';
import { TikTokViewsSectionVisual } from '@/components/illustrations/tiktok-views-section-visual';
import { FacebookFollowersSectionVisual } from '@/components/illustrations/facebook-followers-section-visual';
import { FacebookPageLikesSectionVisual } from '@/components/illustrations/facebook-page-likes-section-visual';
import { FacebookPostLikesSectionVisual } from '@/components/illustrations/facebook-post-likes-section-visual';
import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';
import { PackagesFinalCtaAside } from '@/components/marketing/packages/packages-final-cta-aside';
import {
  buildDummyAuthorityPage,
  dummyRelatedSlugs,
} from '@/data/content/dummy-service-authority-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { getServiceBySlug } from '@/data/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { buildBreadcrumb } from '@/lib/linking';
import { MarketStorySections } from '@/components/marketing/market-story-sections';
import type { HubStorySection } from '@/data/content/homepage-hub';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { QuickAnswer } from '@/components/quick-answer/QuickAnswer';
import { loadQuickAnswer } from '@/lib/i18n/content/load';
import type { QuickAnswerPageId } from '@/data/quick-answers';
import { DEFAULT_LOCALE, type Locale, isCoreServiceSlug } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { loadMarketServiceFaqItems } from '@/lib/market/content/load';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { getUniqueServiceImage } from '@/lib/market/unique-service-images';
import { loadServiceFaqItems, type LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { BreadcrumbItem } from '@/types';
import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
} from '@/components/illustrations/dashboards';
import type { Service } from '@/types/service';
import type { ReactNode } from 'react';

type MirroredServiceAuthorityViewProps = {
  service: Service;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
  locale?: Locale;
  market?: Market;
};

const USERNAME_ONLY = new Set(['buy-tiktok-followers']);
const VIDEO_LINK_ONLY = new Set(['buy-tiktok-likes', 'buy-tiktok-views']);
const PAGE_URL_ONLY = new Set(['buy-facebook-followers', 'buy-facebook-page-likes']);
const POST_URL_ONLY = new Set(['buy-facebook-post-likes']);

function uniqueMarketVisual(
  market: Market | undefined,
  slug: string,
  sectionId: string,
  fallback?: ReactNode,
): ReactNode {
  if (!market) return fallback;
  const img = getUniqueServiceImage(market, slug, sectionId);
  if (!img) return fallback;
  return <RasterSectionVisual src={img.src} alt={img.alt} />;
}

function heroVariants(service: Service): {
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
} {
  switch (service.slug) {
    case 'buy-instagram-likes':
      return { instagramVariant: 'likes' };
    case 'buy-instagram-views':
      return { instagramVariant: 'views' };
    case 'buy-instagram-comments':
      return { instagramVariant: 'comments' };
    case 'buy-tiktok-followers':
      return { tiktokVariant: 'followers' };
    case 'buy-tiktok-likes':
      return { tiktokVariant: 'likes' };
    case 'buy-tiktok-views':
      return { tiktokVariant: 'views' };
    case 'buy-facebook-followers':
      return { facebookVariant: 'followers' };
    case 'buy-facebook-page-likes':
      return { facebookVariant: 'page-likes' };
    case 'buy-facebook-post-likes':
      return { facebookVariant: 'post-likes' };
    default:
      return {};
  }
}

function ctaAsideVariant(service: Service): InstagramDashboardVariant {
  if (service.slug === 'buy-instagram-likes') return 'likes';
  if (service.slug === 'buy-instagram-views') return 'views';
  if (service.slug === 'buy-instagram-comments') return 'comments';
  return 'followers';
}

/**
 * Copies the Buy Instagram Followers section structure and design.
 * Topical blocks use dummy placeholder copy. Live packages stay in pricing.
 */
export function MirroredServiceAuthorityView({
  service,
  bundle,
  breadcrumbs: breadcrumbOverride,
  ui,
  locale = DEFAULT_LOCALE,
  market,
}: MirroredServiceAuthorityViewProps) {
  const content = bundle?.content ?? getServiceContentBySlug(service.slug);
  if (!content) return null;

  const faqItems = market
    ? loadMarketServiceFaqItems(market, content.faq.faqIds)
    : loadServiceFaqItems(locale, content.faq.faqIds);
  const vm = mapServiceContent(content, faqItems);
  const dummy = bundle?.dummy ?? buildDummyAuthorityPage(service);
  const related = dummyRelatedSlugs(service.slug)
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is Service => item !== undefined && item.slug !== service.slug)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      url: resolvePublicHref(item.url, { locale, market }),
      name: isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.name,
      navigationLabel:
        isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.navigationLabel,
    }));
  const breadcrumbs = breadcrumbOverride ?? buildBreadcrumb(service.slug);
  const previewPackageId =
    vm.pricing.packages.find((pkg) => pkg.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;
  const destination = USERNAME_ONLY.has(service.slug)
    ? (ui?.commerce.publicUsernameOnly ?? 'Public Username Only')
    : VIDEO_LINK_ONLY.has(service.slug)
      ? (ui?.commerce.publicVideoLinkOnly ?? 'Public Video Link Only')
      : PAGE_URL_ONLY.has(service.slug)
        ? (ui?.commerce.publicFacebookPageUrlOnly ?? 'Public Facebook Page URL Only')
        : POST_URL_ONLY.has(service.slug)
          ? (ui?.commerce.publicFacebookPostUrlOnly ?? 'Public Facebook Post URL Only')
          : (ui?.commerce.publicUrlOnly ?? 'Public URL Only');
  const isMarketLikes = Boolean(market) && service.slug === 'buy-instagram-likes';
  const isMarketViews = Boolean(market) && service.slug === 'buy-instagram-views';
  const isMarketComments = Boolean(market) && service.slug === 'buy-instagram-comments';
  const isMarketTikTokFollowers = Boolean(market) && service.slug === 'buy-tiktok-followers';
  const isMarketTikTokLikes = Boolean(market) && service.slug === 'buy-tiktok-likes';
  const isMarketTikTokViews = Boolean(market) && service.slug === 'buy-tiktok-views';
  const isMarketFacebookFollowers = Boolean(market) && service.slug === 'buy-facebook-followers';
  const isMarketFacebookPageLikes = Boolean(market) && service.slug === 'buy-facebook-page-likes';
  const isMarketFacebookPostLikes = Boolean(market) && service.slug === 'buy-facebook-post-likes';
  const isMarketCustomLayout =
    isMarketLikes ||
    isMarketViews ||
    isMarketComments ||
    isMarketTikTokFollowers ||
    isMarketTikTokLikes ||
    isMarketTikTokViews ||
    isMarketFacebookFollowers ||
    isMarketFacebookPageLikes ||
    isMarketFacebookPostLikes;
  const marketQuickAnswer =
    isMarketCustomLayout && dummy && 'quickAnswer' in dummy
      ? (dummy as { quickAnswer: { heading: string; text: string } }).quickAnswer
      : null;
  const marketPackageCta = isMarketLikes
    ? 'Choose Your Likes Package'
    : isMarketViews
      ? 'Compare Instagram Views Packages'
      : isMarketComments
        ? 'Compare Instagram Comments Packages'
        : isMarketTikTokFollowers
          ? 'Compare TikTok Followers Packages'
          : isMarketTikTokLikes
            ? 'Compare TikTok Likes Packages'
            : isMarketTikTokViews
              ? 'Compare TikTok Views Packages'
              : isMarketFacebookFollowers
                ? 'Compare Facebook Followers Packages'
                : isMarketFacebookPageLikes
                  ? 'Compare Facebook Page Likes Packages'
                  : isMarketFacebookPostLikes
                    ? 'Compare Facebook Post Likes Packages'
                    : null;
  const marketHowToCta = isMarketLikes
    ? 'Get Instagram Likes'
    : isMarketViews
      ? 'Get Instagram Views'
      : isMarketComments
        ? 'Get Instagram Comments'
        : isMarketTikTokFollowers
          ? 'Get TikTok Followers'
          : isMarketTikTokLikes
            ? 'Get TikTok Likes'
            : isMarketTikTokViews
              ? 'Get TikTok Views'
              : isMarketFacebookFollowers
                ? 'Get Facebook Followers'
                : isMarketFacebookPageLikes
                  ? 'Get Facebook Page Likes'
                  : isMarketFacebookPostLikes
                    ? 'Get Facebook Post Likes'
                    : null;
  const marketTrustBadges = isMarketLikes
    ? [
        'Public Post or Reel URL Only',
        'No Password Required',
        'Clear Pricing',
        'Order Tracking',
      ]
    : isMarketViews
      ? [
          'Public Reel or Video URL Only',
          'No Password Required',
          'Clear Pricing',
          'Order Tracking',
        ]
      : isMarketComments
        ? [
            'Public Post or Reel URL Only',
            'No Password Required',
            'Clear Pricing',
            'Order Tracking',
          ]
        : isMarketTikTokFollowers
          ? ['Public Username Only', 'No Password Required', 'Clear Pricing', 'Order Tracking']
          : isMarketTikTokLikes
            ? ['Public Video Link Only', 'No Password Required', 'Clear Pricing', 'Order Tracking']
            : isMarketTikTokViews
              ? ['Public Video Link Only', 'No Password Required', 'Clear Pricing', 'Order Tracking']
              : isMarketFacebookFollowers
                ? [
                    'Public Facebook Page URL Only',
                    'No Password Required',
                    'Clear Pricing',
                    'Order Tracking',
                  ]
                : isMarketFacebookPageLikes
                  ? [
                      'Public Facebook Page URL Only',
                      'No Password Required',
                      'Clear Pricing',
                      'Order Tracking',
                    ]
                  : isMarketFacebookPostLikes
                    ? [
                        'Public Facebook Post URL Only',
                        'No Password Required',
                        'Clear Pricing',
                        'Order Tracking',
                      ]
                    : null;
  const choosePackageLabel = ui?.commerce.choosePackage ?? 'Choose Package';

  const whyBuySection = (
    <InstagramFollowersWhyBuy
      id={dummy.whyBuy.id}
      title={dummy.whyBuy.title}
      description={dummy.whyBuy.description}
      items={dummy.whyBuy.items}
      bottomNote={isMarketCustomLayout ? undefined : dummy.whyBuy.bottomNote}
      visual={uniqueMarketVisual(
        market,
        service.slug,
        'why-buy',
        service.slug === 'buy-instagram-likes' ? (
          <InstagramLikesSectionVisual />
        ) : service.slug === 'buy-instagram-views' ? (
          <InstagramViewsSectionVisual />
        ) : service.slug === 'buy-instagram-comments' ? (
          <InstagramCommentsSectionVisual />
        ) : service.slug === 'buy-tiktok-followers' ? (
          <TikTokFollowersSectionVisual />
        ) : service.slug === 'buy-tiktok-likes' ? (
          <TikTokLikesSectionVisual />
        ) : service.slug === 'buy-tiktok-views' ? (
          <TikTokViewsSectionVisual />
        ) : service.slug === 'buy-facebook-followers' ? (
          <FacebookFollowersSectionVisual />
        ) : service.slug === 'buy-facebook-page-likes' ? (
          <FacebookPageLikesSectionVisual />
        ) : service.slug === 'buy-facebook-post-likes' ? (
          <FacebookPostLikesSectionVisual />
        ) : undefined,
      )}
    />
  );

  const canYouBuyVisual = uniqueMarketVisual(
    market,
    service.slug,
    'can-you-buy',
    service.slug === 'buy-instagram-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp"
        alt="Instagram likes ordering process using a public post or Reel link"
      />
    ) : service.slug === 'buy-instagram-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-views/instagram-views-order-process.webp"
        alt="Instagram views ordering process using a public Reel or video link"
      />
    ) : service.slug === 'buy-instagram-comments' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp"
        alt="Instagram comments ordering process using a public post or Reel link"
      />
    ) : service.slug === 'buy-tiktok-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp"
        alt="TikTok follower ordering process using a public profile"
      />
    ) : service.slug === 'buy-tiktok-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp"
        alt="TikTok likes ordering process using a public video link"
      />
    ) : service.slug === 'buy-tiktok-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp"
        alt="TikTok views ordering process using a public video link"
      />
    ) : service.slug === 'buy-facebook-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp"
        alt="Facebook follower ordering process using a public Page URL"
      />
    ) : service.slug === 'buy-facebook-page-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp"
        alt="Facebook Page Likes ordering process using a public Page URL"
      />
    ) : service.slug === 'buy-facebook-post-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp"
        alt="Facebook Post Likes ordering process using a public post URL"
      />
    ) : (
      <RasterSectionVisual src="/assets/images/illustrations/sections/shared-order.png" alt="" />
    ),
  );

  const howToBuySection = (
    <InstagramFollowersHowToBuy
      id={dummy.howToBuy.id}
      title={dummy.howToBuy.title}
      description={dummy.howToBuy.description}
      steps={dummy.howToBuy.steps}
      cta={{
        label: marketHowToCta ?? choosePackageLabel,
        href: '#pricing-packages',
      }}
      revealSteps={service.slug === 'buy-facebook-post-likes'}
    />
  );

  const packageSizesSection = (
    <InstagramFollowersPackageSizes
      config={dummy.config}
      choosePackageLabel={marketPackageCta ?? choosePackageLabel}
    />
  );

  const bestPracticesVisual =
    service.slug === 'buy-instagram-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp"
        alt="Instagram post engagement with likes, content and interaction indicators"
      />
    ) : service.slug === 'buy-instagram-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-views/instagram-views-best-practices.webp"
        alt="Instagram video performance with views and content activity indicators"
      />
    ) : service.slug === 'buy-instagram-comments' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp"
        alt="Instagram post conversation with comments and interaction indicators"
      />
    ) : service.slug === 'buy-tiktok-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp"
        alt="TikTok profile planning with followers, videos and engagement indicators"
      />
    ) : service.slug === 'buy-tiktok-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp"
        alt="TikTok video engagement with likes and content activity indicators"
      />
    ) : service.slug === 'buy-tiktok-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp"
        alt="TikTok video performance with views and content activity indicators"
      />
    ) : service.slug === 'buy-facebook-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp"
        alt="Facebook Page planning with followers, posts and engagement indicators"
      />
    ) : service.slug === 'buy-facebook-page-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp"
        alt="Facebook Page activity with Page likes and content indicators"
      />
    ) : service.slug === 'buy-facebook-post-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp"
        alt="Facebook post engagement with likes and interaction indicators"
      />
    ) : (
      <RasterSectionVisual src="/assets/images/illustrations/sections/shared-practices.png" alt="" />
    );

  const doesBuyingHelpVisual = uniqueMarketVisual(
    market,
    service.slug,
    'does-help',
    service.slug === 'buy-instagram-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp"
        alt="Instagram likes help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-instagram-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-views/instagram-views-does-help.webp"
        alt="Instagram views help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-instagram-comments' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp"
        alt="Instagram comments help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-tiktok-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp"
        alt="TikTok followers help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-tiktok-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp"
        alt="TikTok likes help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-tiktok-views' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp"
        alt="TikTok views help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-facebook-followers' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp"
        alt="Facebook followers help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-facebook-page-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp"
        alt="Facebook Page likes help versus outcomes they do not guarantee"
      />
    ) : service.slug === 'buy-facebook-post-likes' ? (
      <RasterSectionVisual
        src="/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp"
        alt="Facebook post likes help versus outcomes they do not guarantee"
      />
    ) : undefined,
  );

  const marketStorySections =
    isMarketCustomLayout && dummy && 'storySections' in dummy
      ? (dummy as { storySections?: HubStorySection[] }).storySections
      : undefined;
  const earlyStorySections = marketStorySections?.slice(0, 3);
  const midStorySections = marketStorySections?.slice(3, 9);
  const lateStorySections = marketStorySections?.slice(9);

  const marketMiddleSections = (
    <>
      {packageSizesSection}
      {earlyStorySections?.length ? (
        <MarketStorySections
          sections={earlyStorySections}
          market={market}
          platform={service.platform}
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersWhyChoose config={dummy.config} />
      {whyBuySection}
      <InstagramFollowersCanYouBuy config={dummy.config} visual={canYouBuyVisual} />
      {howToBuySection}
      <InstagramFollowersWhatHappens config={dummy.config} />
      {midStorySections?.length ? (
        <MarketStorySections
          sections={midStorySections}
          market={market}
          platform={service.platform}
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersBestPractices config={dummy.config} visual={bestPracticesVisual} />
      <InstagramFollowersDoesBuyingHelp config={dummy.config} visual={doesBuyingHelpVisual} />
      <InstagramFollowersServiceCompare config={dummy.config} />
      {lateStorySections?.length ? (
        <MarketStorySections
          sections={lateStorySections}
          market={market}
          platform={service.platform}
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersBeforeBuying config={dummy.config} />
    </>
  );

  const defaultMiddleSections = (
    <>
      <InstagramFollowersWhyChoose config={dummy.config} />
      {whyBuySection}
      <InstagramFollowersCanYouBuy config={dummy.config} visual={canYouBuyVisual} />
      {howToBuySection}
      <InstagramFollowersWhatHappens config={dummy.config} />
      <InstagramFollowersServiceCompare config={dummy.config} />
      <InstagramFollowersBeforeBuying
        config={dummy.config}
        revealCards={service.slug === 'buy-facebook-post-likes'}
      />
      <InstagramFollowersWorldwide config={dummy.config} />
      {packageSizesSection}
      <InstagramFollowersBestPractices config={dummy.config} visual={bestPracticesVisual} />
      <InstagramFollowersDoesBuyingHelp config={dummy.config} />
      <InstagramFollowersCommonMistakes config={dummy.config} />
    </>
  );

  const uniqueHero = market ? getUniqueServiceImage(market, service.slug, 'hero') : null;

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        visual={
          uniqueHero
            ? {
                src: uniqueHero.src,
                alt: uniqueHero.alt,
                width: uniqueHero.width,
                height: uniqueHero.height,
              }
            : vm.hero.visual
        }
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        locale={locale}
        {...heroVariants(service)}
      />

      <Section spacing="sm" className="bg-transparent">
        <Container size="lg">
          {isMarketCustomLayout && marketQuickAnswer ? (
            <QuickAnswer heading={marketQuickAnswer.heading} text={marketQuickAnswer.text} />
          ) : !isMarketCustomLayout ? (
            <QuickAnswer
              heading={ui?.quickAnswer?.heading ?? 'Quick answer'}
              text={loadQuickAnswer(locale, service.slug as QuickAnswerPageId)}
            />
          ) : null}
        </Container>
      </Section>

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        stickyCtaLabel={marketPackageCta ?? ui?.commerce.choosePackage}
        summaryBenefits={
          marketTrustBadges ?? [
                destination,
                ui?.commerce.noPassword ?? 'No Password',
                ui?.commerce.secureCheckout ?? 'Secure Checkout',
                ui?.commerce.orderTracking ?? 'Order Tracking',
                ui?.commerce.customerSupport ?? 'Customer Support',
              ]
        }
      />

      {isMarketCustomLayout ? marketMiddleSections : defaultMiddleSections}

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
        defaultOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
        pinnedOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
        enhanced={isMarketCustomLayout}
      />

      {related.length > 0 ? (
        <RelatedServices
          id={vm.relatedServices.id ?? content.relatedServices.id}
          title={isMarketCustomLayout ? vm.relatedServices.title : dummy.relatedHeading}
          description={isMarketCustomLayout ? vm.relatedServices.description : dummy.relatedIntro}
          services={related}
          copyBySlug={dummy.config.relatedPackages.copyBySlug}
          analyticsServiceSlug={service.slug}
          enhanced={isMarketCustomLayout}
        />
      ) : null}

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={
          <PackagesFinalCtaAside
            instagramVariant={ctaAsideVariant(service)}
            tiktokFollowers={service.slug === 'buy-tiktok-followers'}
            tiktokLikes={service.slug === 'buy-tiktok-likes'}
            tiktokViews={service.slug === 'buy-tiktok-views'}
            facebookFollowers={service.slug === 'buy-facebook-followers'}
            facebookPageLikes={service.slug === 'buy-facebook-page-likes'}
            facebookPostLikes={service.slug === 'buy-facebook-post-likes'}
            market={market}
            serviceSlug={service.slug}
          />
        }
        trustBadges={
          isMarketCustomLayout
            ? undefined
            : service.slug === 'buy-facebook-followers' || service.slug === 'buy-facebook-page-likes'
              ? [
                  ui?.commerce.publicFacebookPageUrlOnly ?? 'Public Facebook Page URL Only',
                  ui?.footer.noPassword ?? 'No Password Required',
                  ui?.commerce.secureCheckout ?? 'Secure Checkout',
                  ui?.commerce.orderTracking ?? 'Order Tracking',
                ]
              : service.slug === 'buy-facebook-post-likes'
                ? [
                    ui?.commerce.publicFacebookPostUrlOnly ?? 'Public Facebook Post URL Only',
                    ui?.footer.noPassword ?? 'No Password Required',
                    ui?.commerce.secureCheckout ?? 'Secure Checkout',
                    ui?.commerce.orderTracking ?? 'Order Tracking',
                  ]
                : [
                    destination,
                    ui?.commerce.secureCheckout ?? 'Secure Checkout',
                    ui?.commerce.orderTracking ?? 'Order Tracking',
                    ui?.commerce.customerSupport ?? 'Customer Support',
                  ]
        }
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
