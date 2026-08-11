import {
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import {
  FacebookPageLikesBeforeBuying,
  FacebookPageLikesBestPractices,
  FacebookPageLikesCanada,
  FacebookPageLikesCanYouBuy,
  FacebookPageLikesCommonMistakes,
  FacebookPageLikesDoesBuyingHelp,
  FacebookPageLikesHowToBuy,
  FacebookPageLikesPackageSizes,
  FacebookPageLikesRelatedArticles,
  FacebookPageLikesServiceCompare,
  FacebookPageLikesWhatHappens,
  FacebookPageLikesWhyBuy,
  FacebookPageLikesWhyChoose,
  type RelatedArticleWithThumb,
} from '@/components/marketing/facebook-page-likes/authority-sections';
import { FacebookPageLikesFinalCtaAside } from '@/components/marketing/packages/facebook-page-likes-final-cta-aside';
import { FacebookPageLikesOrderSummaryDashboard } from '@/components/illustrations/facebook-page-likes-order-summary-dashboard';
import { FACEBOOK_PAGE_LIKES_PAGE_CONFIG } from '@/data/content/facebook-page-likes-page-config';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type FacebookPageLikesAuthorityViewProps = {
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
 * Buy Facebook Page Likes — full authority layout (Sections 1–19).
 */
export function FacebookPageLikesAuthorityView({
  service,
}: FacebookPageLikesAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = FACEBOOK_PAGE_LIKES_PAGE_CONFIG;
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
        facebookVariant="page-likes"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={[
          'Order Tracking',
          '30-Day Money-Back',
          'Delivery Updates',
          'Email Confirmation',
        ]}
      />

      <FacebookPageLikesWhyChoose config={config} />

      <FacebookPageLikesWhyBuy
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
        bottomNote={config.whyBuyNote}
      />

      <FacebookPageLikesCanYouBuy config={config} />

      <FacebookPageLikesHowToBuy
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="facebook-page-likes"
          visual={<FacebookPageLikesOrderSummaryDashboard className="max-w-[24rem]" />}
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          reverse={false}
          className="!py-7 md:!py-9 lg:!py-10"
        />
      ) : null}

      <FacebookPageLikesDoesBuyingHelp config={config} />

      <FacebookPageLikesWhatHappens config={config} />

      <FacebookPageLikesServiceCompare config={config} />

      <FacebookPageLikesBeforeBuying config={config} />

      <FacebookPageLikesCanada config={config} />

      <FacebookPageLikesPackageSizes config={config} />

      <FacebookPageLikesBestPractices config={config} />

      <FacebookPageLikesCommonMistakes config={config} />

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

      <FacebookPageLikesRelatedArticles articles={relatedArticles} />

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<FacebookPageLikesFinalCtaAside />}
        trustBadges={[
          'Public Facebook Page URL Only',
          'Secure Checkout',
          'Order Tracking',
          'Customer Support',
        ]}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
