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
import { QuickAnswer } from '@/components/quick-answer/QuickAnswer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { loadQuickAnswer } from '@/lib/i18n/content/load';
import type { QuickAnswerPageId } from '@/data/quick-answers';
import { DEFAULT_LOCALE, type Locale, isCoreServiceSlug } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { loadServiceFaqItems, type LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { BreadcrumbItem } from '@/types';
import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
} from '@/components/illustrations/dashboards';
import type { Service } from '@/types/service';

type MirroredServiceAuthorityViewProps = {
  service: Service;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
  locale?: Locale;
};

const USERNAME_ONLY = new Set(['buy-tiktok-followers']);
const VIDEO_LINK_ONLY = new Set(['buy-tiktok-likes', 'buy-tiktok-views']);
const PAGE_URL_ONLY = new Set(['buy-facebook-followers', 'buy-facebook-page-likes']);
const POST_URL_ONLY = new Set(['buy-facebook-post-likes']);

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
}: MirroredServiceAuthorityViewProps) {
  const content = bundle?.content ?? getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content, loadServiceFaqItems(locale, content.faq.faqIds));
  const dummy = bundle?.dummy ?? buildDummyAuthorityPage(service);
  const related = dummyRelatedSlugs(service.slug)
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is Service => item !== undefined && item.slug !== service.slug)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      url: localizeHref(item.url, locale),
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

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        locale={locale}
        {...heroVariants(service)}
      />

      <Section spacing="sm" className="bg-transparent">
        <Container size="lg">
          <QuickAnswer
            heading={ui?.quickAnswer?.heading ?? 'Quick answer'}
            text={loadQuickAnswer(locale, service.slug as QuickAnswerPageId)}
          />
        </Container>
      </Section>

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        stickyCtaLabel={ui?.commerce.choosePackage}
        summaryBenefits={[
          destination,
          ui?.commerce.noPassword ?? 'No Password',
          ui?.commerce.secureCheckout ?? 'Secure Checkout',
          ui?.commerce.orderTracking ?? 'Order Tracking',
          ui?.commerce.customerSupport ?? 'Customer Support',
        ]}
      />

      <InstagramFollowersWhyChoose config={dummy.config} />

      <InstagramFollowersWhyBuy
        id={dummy.whyBuy.id}
        title={dummy.whyBuy.title}
        description={dummy.whyBuy.description}
        items={dummy.whyBuy.items}
        bottomNote={dummy.whyBuy.bottomNote}
        visual={
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
          ) : undefined
        }
      />

      <InstagramFollowersCanYouBuy
        config={dummy.config}
        visual={
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
            <RasterSectionVisual
              src="/assets/images/illustrations/sections/shared-order.png"
              alt=""
            />
          )
        }
      />

      <InstagramFollowersHowToBuy
        id={dummy.howToBuy.id}
        title={dummy.howToBuy.title}
        description={dummy.howToBuy.description}
        steps={dummy.howToBuy.steps}
        cta={{ label: ui?.commerce.choosePackage ?? 'Choose a Package', href: '#pricing-packages' }}
        revealSteps={service.slug === 'buy-facebook-post-likes'}
      />

      <InstagramFollowersWhatHappens config={dummy.config} />

      <InstagramFollowersServiceCompare config={dummy.config} />

      <InstagramFollowersBeforeBuying
        config={dummy.config}
        revealCards={service.slug === 'buy-facebook-post-likes'}
      />

      <InstagramFollowersWorldwide config={dummy.config} />

      <InstagramFollowersPackageSizes
        config={dummy.config}
        choosePackageLabel={ui?.commerce.choosePackage ?? 'Choose Package'}
      />

      <InstagramFollowersBestPractices
        config={dummy.config}
        visual={
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
            <RasterSectionVisual
              src="/assets/images/illustrations/sections/shared-practices.png"
              alt=""
            />
          )
        }
      />

      <InstagramFollowersCommonMistakes config={dummy.config} />

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
        defaultOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
        pinnedOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
      />

      {related.length > 0 ? (
        <RelatedServices
          id={vm.relatedServices.id ?? content.relatedServices.id}
          title={dummy.relatedHeading}
          description={dummy.relatedIntro}
          services={related}
          copyBySlug={dummy.config.relatedPackages.copyBySlug}
          analyticsServiceSlug={service.slug}
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
          />
        }
        trustBadges={
          service.slug === 'buy-facebook-followers' || service.slug === 'buy-facebook-page-likes'
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
