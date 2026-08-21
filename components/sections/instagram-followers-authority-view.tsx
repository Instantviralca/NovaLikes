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
}: InstagramFollowersAuthorityViewProps) {
  const content = bundle?.content ?? getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content, loadServiceFaqItems(locale, content.faq.faqIds));
  const config = bundle?.followersAuthority ?? INSTAGRAM_FOLLOWERS_PAGE_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3).map(
    (item) => ({
      ...item,
      url: localizeHref(item.url, locale),
      name: isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.name,
      navigationLabel:
        isCoreServiceSlug(item.slug) && ui ? ui.services[item.slug] : item.navigationLabel,
    }),
  );
  const breadcrumbs = breadcrumbOverride ?? buildBreadcrumb(service.slug);
  const previewPackageId =
    vm.pricing.packages.find((p) => p.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        instagramVariant="followers"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        stickyCtaLabel={ui?.commerce.choosePackage}
        summaryBenefits={[
          ui?.commerce.publicUsernameOnly ?? 'Public Username Only',
          ui?.commerce.noPassword ?? 'No Password',
          ui?.commerce.secureCheckout ?? 'Secure Checkout',
          ui?.commerce.orderTracking ?? 'Order Tracking',
          ui?.commerce.customerSupport ?? 'Customer Support',
        ]}
      />

      <InstagramFollowersWhyChoose config={config} />

      <InstagramFollowersWhyBuy
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
        bottomNote={config.whyBuyNote}
      />

      <InstagramFollowersCanYouBuy config={config} />

      <InstagramFollowersHowToBuy
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

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

      <InstagramFollowersPackageSizes config={config} />

      <InstagramFollowersBestPractices config={config} />

      <InstagramFollowersCommonMistakes config={config} />

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
          title={vm.relatedServices.title}
          description={vm.relatedServices.description}
          services={related}
          cta={vm.relatedServices.cta}
          analyticsServiceSlug={service.slug}
          copyBySlug={config.relatedPackages.copyBySlug}
        />
      ) : null}

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<PackagesFinalCtaAside instagramVariant="followers" />}
        trustBadges={[
          ui?.commerce.publicUsernameOnly ?? 'Public Username Only',
          ui?.commerce.secureCheckout ?? 'Secure Checkout',
          ui?.commerce.orderTracking ?? 'Order Tracking',
          ui?.commerce.customerSupport ?? 'Customer Support',
        ]}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
