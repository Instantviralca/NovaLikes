import {
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import {
  FacebookFollowersBeforeBuying,
  FacebookFollowersBestPractices,
  FacebookFollowersCanada,
  FacebookFollowersCanYouBuy,
  FacebookFollowersCommonMistakes,
  FacebookFollowersDoesBuyingHelp,
  FacebookFollowersHowToBuy,
  FacebookFollowersPackageSizes,
  FacebookFollowersRelatedArticles,
  FacebookFollowersServiceCompare,
  FacebookFollowersWhatHappens,
  FacebookFollowersWhyBuy,
  FacebookFollowersWhyChoose,
  type RelatedArticleWithThumb,
} from '@/components/marketing/facebook-followers/authority-sections';
import { FacebookFollowersFinalCtaAside } from '@/components/marketing/packages/facebook-followers-final-cta-aside';
import { FacebookFollowersOrderSummaryDashboard } from '@/components/illustrations/facebook-followers-order-summary-dashboard';
import { FACEBOOK_FOLLOWERS_PAGE_CONFIG } from '@/data/content/facebook-followers-page-config';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type FacebookFollowersAuthorityViewProps = {
  service: Service;
};

function enrichRelatedArticles(
  articles: ReturnType<typeof getRelatedArticles>,
): RelatedArticleWithThumb[] {
  return articles.map((article) => {
    const slug = article.slug.replace(/^learn\//, '');
    const record = getPublishedLearnArticleBySlug(slug);
    const image = record?.featuredImage;
    return {
      ...article,
      readingTime: record?.readingTime,
      image: image
        ? {
            src: image.src,
            alt: image.alt,
            width: image.width,
            height: image.height,
          }
        : undefined,
    };
  });
}

/**
 * Buy Facebook Followers — full authority layout (Sections 1–18).
 */
export function FacebookFollowersAuthorityView({
  service,
}: FacebookFollowersAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = FACEBOOK_FOLLOWERS_PAGE_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 2);
  const relatedArticles = enrichRelatedArticles(
    getRelatedArticles(service.slug, {
      platform: service.platform,
      limit: 4,
    }),
  );
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
        facebookVariant="followers"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={[
          'Public Facebook Page URL Only',
          'No Login Required',
          'Secure Checkout',
          'Order Tracking',
          'Customer Support',
        ]}
      />

      <FacebookFollowersWhyChoose config={config} />

      <FacebookFollowersWhyBuy
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
      />

      <FacebookFollowersCanYouBuy config={config} />

      <FacebookFollowersHowToBuy
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="facebook-followers"
          visual={<FacebookFollowersOrderSummaryDashboard className="max-w-[24rem]" />}
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          reverse={false}
          className="!py-7 md:!py-9 lg:!py-10"
        />
      ) : null}

      <FacebookFollowersDoesBuyingHelp config={config} />

      <FacebookFollowersWhatHappens config={config} />

      <FacebookFollowersServiceCompare config={config} />

      <FacebookFollowersBeforeBuying config={config} />

      <FacebookFollowersCanada config={config} />

      <FacebookFollowersPackageSizes config={config} />

      <FacebookFollowersBestPractices config={config} />

      <FacebookFollowersCommonMistakes config={config} />

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
        defaultOpenIds={
          vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined
        }
        pinnedOpenIds={
          vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined
        }
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

      <FacebookFollowersRelatedArticles articles={relatedArticles} />

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<FacebookFollowersFinalCtaAside />}
        trustBadges={[
          'Public Page URL Only',
          'Secure Checkout',
          'No Password Required',
          'Customer Support',
        ]}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
