import {
  Benefits,
  Process,
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import {
  TikTokViewsBeforeBuying,
  TikTokViewsBestPractices,
  TikTokViewsCanada,
  TikTokViewsCanYouBuy,
  TikTokViewsDoesBuyingWork,
  TikTokViewsPackageSizes,
  TikTokViewsRelatedArticles,
  TikTokViewsServiceCompare,
  TikTokViewsShouldYouBuy,
  TikTokViewsSupportVisibility,
  TikTokViewsWhatHappens,
  TikTokViewsWorthIt,
  type RelatedArticleWithThumb,
} from '@/components/marketing/tiktok-views/authority-sections';
import { TikTokViewsFinalCtaAside } from '@/components/marketing/packages/tiktok-views-final-cta-aside';
import { TIKTOK_VIEWS_PAGE_CONFIG } from '@/data/content/tiktok-views-page-config';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type TikTokViewsAuthorityViewProps = {
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
 * Buy TikTok Views — lean authority layout.
 * Single requirements section; AI Overview direct-answer blocks; no reviews.
 */
export function TikTokViewsAuthorityView({ service }: TikTokViewsAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = TIKTOK_VIEWS_PAGE_CONFIG;
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
        tiktokVariant="views"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={[
          'Public Video Link Only',
          'No Password Required',
          'Secure Checkout',
          'Order Tracking',
        ]}
      />

      <TikTokViewsCanYouBuy config={config} />

      <Benefits
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
      />

      <TikTokViewsSupportVisibility config={config} />

      <Process
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="tiktok-views"
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          reverse={false}
        />
      ) : null}

      <TikTokViewsDoesBuyingWork config={config} />

      <TikTokViewsWhatHappens config={config} />

      <TikTokViewsWorthIt config={config} />

      <TikTokViewsShouldYouBuy config={config} />

      <TikTokViewsServiceCompare config={config} />

      <TikTokViewsBeforeBuying config={config} />

      <TikTokViewsCanada config={config} />

      <TikTokViewsPackageSizes config={config} />

      <TikTokViewsBestPractices config={config} />

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
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

      <TikTokViewsRelatedArticles articles={relatedArticles} />

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<TikTokViewsFinalCtaAside />}
        trustLine="No password required · Secure checkout · Order tracking"
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
