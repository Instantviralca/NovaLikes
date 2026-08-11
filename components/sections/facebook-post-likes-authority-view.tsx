import {
  RelatedServices,
  ServiceCTA,
  ServiceEducationalGuide,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import {
  FacebookPostLikesBestPractices,
  FacebookPostLikesCanada,
  FacebookPostLikesCanYouBuy,
  FacebookPostLikesCommonMistakes,
  FacebookPostLikesDoesBuyingHelp,
  FacebookPostLikesHowToBuy,
  FacebookPostLikesPackageSizes,
  FacebookPostLikesRelatedArticles,
  FacebookPostLikesServiceCompare,
  FacebookPostLikesWhatHappens,
  FacebookPostLikesWhyBuy,
  FacebookPostLikesWhyChoose,
  type RelatedArticleWithThumb,
} from '@/components/marketing/facebook-post-likes/authority-sections';
import { FacebookPostLikesFinalCtaAside } from '@/components/marketing/packages/facebook-post-likes-final-cta-aside';
import { FacebookPostLikesOrderSummaryDashboard } from '@/components/illustrations/facebook-post-likes-order-summary-dashboard';
import { FACEBOOK_POST_LIKES_PAGE_CONFIG } from '@/data/content/facebook-post-likes-page-config';
import { FACEBOOK_POST_LIKES_EDUCATIONAL_GUIDE } from '@/data/content/facebook-post-likes-educational-guide';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type FacebookPostLikesAuthorityViewProps = {
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
 * Buy Facebook Post Likes — full authority layout (Sections 1–19).
 */
export function FacebookPostLikesAuthorityView({
  service,
}: FacebookPostLikesAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = FACEBOOK_POST_LIKES_PAGE_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 2);
  const relatedArticles = enrichRelatedArticles(
    getRelatedArticles(service.slug, {
      platform: service.platform,
      limit: 4,
      preferredSlugs: [
        'how-to-increase-facebook-engagement',
        'best-time-to-post-on-facebook',
        'facebook-growth-guide',
        'how-the-facebook-algorithm-works',
      ],
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
        facebookVariant="post-likes"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={[
          'Order Tracking',
          'Delivery Updates',
          'Public Facebook Post URL',
          'Email Confirmation',
        ]}
      />

      <FacebookPostLikesWhyChoose config={config} />

      <FacebookPostLikesWhyBuy
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
        bottomNote={config.whyBuyNote}
      />

      <FacebookPostLikesCanYouBuy config={config} />

      <FacebookPostLikesHowToBuy
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="facebook-post-likes"
          visual={<FacebookPostLikesOrderSummaryDashboard className="max-w-[24rem]" />}
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          reverse={false}
          className="!py-7 md:!py-9 lg:!py-10"
        />
      ) : null}

      <FacebookPostLikesDoesBuyingHelp config={config} />

      <FacebookPostLikesWhatHappens config={config} />

      <FacebookPostLikesServiceCompare config={config} />

      <FacebookPostLikesCanada config={config} />

      <FacebookPostLikesPackageSizes config={config} />

      <ServiceEducationalGuide guide={FACEBOOK_POST_LIKES_EDUCATIONAL_GUIDE} />

      <FacebookPostLikesBestPractices config={config} />

      <FacebookPostLikesCommonMistakes config={config} />

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

      <FacebookPostLikesRelatedArticles articles={relatedArticles} />

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<FacebookPostLikesFinalCtaAside />}
        trustBadges={[
          'Secure Checkout',
          'Order Tracking',
          'Customer Support',
          'Public Facebook Post URL',
        ]}
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
