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
import { InstagramPackagesHeroDashboard } from '@/components/illustrations/instagram-packages-hero-dashboard';
import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '@/data/content/instagram-followers-page-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import type { Service } from '@/types/service';

type InstagramFollowersAuthorityViewProps = {
  service: Service;
};

/**
 * Buy Instagram Followers — full authority layout (mirrors Facebook Page Likes).
 */
export function InstagramFollowersAuthorityView({
  service,
}: InstagramFollowersAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = INSTAGRAM_FOLLOWERS_PAGE_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3);
  const breadcrumbs = buildBreadcrumb(service.slug);
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
        summaryBenefits={[
          'Public Username Only',
          'No Password',
          'Secure Checkout',
          'Order Tracking',
          'Customer Support',
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
          visual={<InstagramPackagesHeroDashboard className="max-w-[24rem]" />}
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
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
        />
      ) : null}

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<PackagesFinalCtaAside instagramVariant="followers" />}
        trustBadges={[
          'Public Username Only',
          'Secure Checkout',
          'Order Tracking',
          'Customer Support',
        ]}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
