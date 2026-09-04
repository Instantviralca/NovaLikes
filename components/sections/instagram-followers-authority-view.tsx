import {
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
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
import { PackagesFinalCtaAside } from '@/components/marketing/packages/packages-final-cta-aside';
import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '@/data/content/instagram-followers-page-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { localizeHref } from '@/lib/i18n/paths';
import { loadMarketServiceFaqItems } from '@/lib/market/content/load';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { MarketStorySections } from '@/components/marketing/market-story-sections';
import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';
import { getUniqueServiceImage } from '@/lib/market/unique-service-images';
import { QuickAnswer } from '@/components/quick-answer/QuickAnswer';
import type { HubStorySection } from '@/data/content/homepage-hub';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { loadQuickAnswer } from '@/lib/i18n/content/load';
import type { QuickAnswerPageId } from '@/data/quick-answers';
import { DEFAULT_LOCALE, type Locale, isCoreServiceSlug } from '@/lib/i18n/config';
import { loadServiceFaqItems, type LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { BreadcrumbItem } from '@/types';
import type { Service } from '@/types/service';

const IG_FOLLOWERS_DELIVERY_IMAGE =
  '/assets/images/illustrations/instagram-followers/instagram-followers-delivery-requirements.webp';

type InstagramFollowersAuthorityViewProps = {
  service: Service;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
  locale?: Locale;
  market?: Market;
};

/**
 * Buy Instagram Followers — full authority layout (mirrors Facebook Page Likes).
 */
export function InstagramFollowersAuthorityView({
  service,
  bundle,
  breadcrumbs: breadcrumbOverride,
  ui,
  locale = DEFAULT_LOCALE,
  market,
}: InstagramFollowersAuthorityViewProps) {
  const content = bundle?.content ?? getServiceContentBySlug(service.slug);
  if (!content) return null;

  const faqItems = market
    ? loadMarketServiceFaqItems(market, content.faq.faqIds)
    : loadServiceFaqItems(locale, content.faq.faqIds);
  const vm = mapServiceContent(content, faqItems);
  const config = bundle?.followersAuthority ?? INSTAGRAM_FOLLOWERS_PAGE_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3).map(
    (item) => ({
      ...item,
      url: resolvePublicHref(item.url, { locale, market }),
      name: isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.name,
      navigationLabel:
        isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.navigationLabel,
    }),
  );
  const breadcrumbs = breadcrumbOverride ?? buildBreadcrumb(service.slug);
  const previewPackageId =
    vm.pricing.packages.find((p) => p.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;
  const isMarketOverlay = Boolean(market);
  const marketQuickAnswer =
    isMarketOverlay && config && 'quickAnswer' in config
      ? (config as { quickAnswer: { heading: string; text: string } }).quickAnswer
      : null;
  const choosePackageLabel = ui?.commerce.choosePackage ?? 'Choose Package';
  const finalTrustBadges = isMarketOverlay
    ? undefined
    : [
        ui?.commerce.publicUsernameOnly ?? 'Public Username Only',
        ui?.commerce.secureCheckout ?? 'Secure Checkout',
        ui?.commerce.orderTracking ?? 'Order Tracking',
        ui?.commerce.customerSupport ?? 'Customer Support',
      ];

  const whyBuySection = (
    <InstagramFollowersWhyBuy
      id={vm.benefits.id}
      title={vm.benefits.title}
      description={vm.benefits.description}
      items={vm.benefits.items}
      bottomNote={isMarketOverlay ? undefined : config.whyBuyNote}
      visual={
        market
          ? (() => {
              const img = getUniqueServiceImage(market, service.slug, 'why-buy');
              return img ? <RasterSectionVisual src={img.src} alt={img.alt} /> : undefined;
            })()
          : undefined
      }
    />
  );

  const howToBuySection = (
    <InstagramFollowersHowToBuy
      id={vm.howItWorks.id}
      title={vm.howItWorks.title}
      description={vm.howItWorks.description}
      steps={vm.howItWorks.steps}
      cta={vm.howItWorks.cta}
    />
  );

  const packageSizesSection = (
    <InstagramFollowersPackageSizes
      config={config}
      choosePackageLabel={choosePackageLabel}
    />
  );

  const marketStorySections =
    isMarketOverlay && config && 'storySections' in config
      ? (config as { storySections?: HubStorySection[] }).storySections
      : undefined;
  const earlyStorySections = marketStorySections?.slice(0, 3);
  const midStorySections = marketStorySections?.slice(3, 9);
  const lateStorySections = marketStorySections?.slice(9);

  const marketCanYouBuyVisual = market
    ? (() => {
        const img = getUniqueServiceImage(market, service.slug, 'can-you-buy');
        return img ? <RasterSectionVisual src={img.src} alt={img.alt} /> : undefined;
      })()
    : undefined;
  const marketDoesHelpVisual = market
    ? (() => {
        const img = getUniqueServiceImage(market, service.slug, 'does-help');
        return img ? <RasterSectionVisual src={img.src} alt={img.alt} /> : undefined;
      })()
    : undefined;

  const marketMiddleSections = (
    <>
      {packageSizesSection}
      {earlyStorySections?.length ? (
        <MarketStorySections
          sections={earlyStorySections}
          market={market}
          platform="instagram"
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersWhyChoose config={config} />
      {whyBuySection}
      <InstagramFollowersCanYouBuy config={config} visual={marketCanYouBuyVisual} />
      {howToBuySection}
      <InstagramFollowersWhatHappens config={config} />
      {midStorySections?.length ? (
        <MarketStorySections
          sections={midStorySections}
          market={market}
          platform="instagram"
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersBestPractices config={config} />
      <InstagramFollowersDoesBuyingHelp config={config} visual={marketDoesHelpVisual} />
      <InstagramFollowersServiceCompare config={config} />
      {lateStorySections?.length ? (
        <MarketStorySections
          sections={lateStorySections}
          market={market}
          platform="instagram"
          serviceSlug={service.slug}
        />
      ) : null}
      <InstagramFollowersBeforeBuying config={config} />
    </>
  );

  const defaultMiddleSections = (
    <>
      <InstagramFollowersWhyChoose config={config} />
      {whyBuySection}
      <InstagramFollowersCanYouBuy config={config} />
      {howToBuySection}
      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          imageSrc={IG_FOLLOWERS_DELIVERY_IMAGE}
          imageAlt="Instagram follower order requirements — public username only, no password required"
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          visualVariant="instagram-followers"
          reverse={false}
          className="!py-7 md:!py-9 lg:!py-10"
        />
      ) : null}
      <InstagramFollowersWhatHappens config={config} />
      <InstagramFollowersServiceCompare config={config} />
      <InstagramFollowersBeforeBuying config={config} />
      <InstagramFollowersWorldwide config={config} />
      {packageSizesSection}
      <InstagramFollowersBestPractices config={config} />
      <InstagramFollowersDoesBuyingHelp config={config} />
      <InstagramFollowersCommonMistakes config={config} />
    </>
  );

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        visual={
          market
            ? (() => {
                const img = getUniqueServiceImage(market, service.slug, 'hero');
                return img
                  ? {
                      src: img.src,
                      alt: img.alt,
                      width: img.width,
                      height: img.height,
                    }
                  : vm.hero.visual;
              })()
            : vm.hero.visual
        }
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        locale={locale}
        instagramVariant="followers"
      />

      {!isMarketOverlay ? (
        <Section spacing="sm" className="bg-transparent">
          <Container size="lg">
            <QuickAnswer
              heading={ui?.quickAnswer?.heading ?? 'Quick answer'}
              text={loadQuickAnswer(locale, service.slug as QuickAnswerPageId)}
            />
          </Container>
        </Section>
      ) : marketQuickAnswer ? (
        <Section spacing="sm" className="bg-transparent">
          <Container size="lg">
            <QuickAnswer heading={marketQuickAnswer.heading} text={marketQuickAnswer.text} />
          </Container>
        </Section>
      ) : null}

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        stickyCtaLabel={ui?.commerce.choosePackage}
        summaryBenefits={
          isMarketOverlay
            ? [
                'No Password Required',
                'Public Username Only',
                'Secure Checkout',
                'Order Tracking',
              ]
            : [
                ui?.commerce.publicUsernameOnly ?? 'Public Username Only',
                ui?.commerce.noPassword ?? 'No Password',
                ui?.commerce.secureCheckout ?? 'Secure Checkout',
                ui?.commerce.orderTracking ?? 'Order Tracking',
                ui?.commerce.customerSupport ?? 'Customer Support',
              ]
        }
      />

      {isMarketOverlay ? marketMiddleSections : defaultMiddleSections}

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
        defaultOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
        pinnedOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}
        enhanced={isMarketOverlay}
      />

      {related.length > 0 ? (
        <RelatedServices
          id={vm.relatedServices.id ?? content.relatedServices.id}
          title={vm.relatedServices.title}
          description={vm.relatedServices.description}
          services={related}
          cta={vm.relatedServices.cta}
          analyticsServiceSlug={service.slug}
          copyBySlug={config.relatedPackages.copyBySlug}
          enhanced={isMarketOverlay}
        />
      ) : null}

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={
          <PackagesFinalCtaAside
            instagramVariant="followers"
            market={market}
            serviceSlug={service.slug}
          />
        }
        trustBadges={finalTrustBadges}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
