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
  TikTokLikesBeforeBuying,
  TikTokLikesBestPractices,
  TikTokLikesCanada,
  TikTokLikesDoesBuyingWork,
  TikTokLikesLivePreview,
  TikTokLikesPackageSizes,
  TikTokLikesRelatedArticles,
  TikTokLikesServiceCompare,
  type RelatedArticleWithThumb,
} from '@/components/marketing/tiktok-likes/authority-sections';
import { TikTokLikesFinalCtaAside } from '@/components/marketing/packages/tiktok-likes-final-cta-aside';
import { TIKTOK_LIKES_PAGE_CONFIG } from '@/data/content/tiktok-likes-page-config';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type TikTokLikesAuthorityViewProps = {
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
 * Buy TikTok Likes — lean authority layout.
 * Single requirements section (no duplicate What We Need blocks).
 */
export function TikTokLikesAuthorityView({ service }: TikTokLikesAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = TIKTOK_LIKES_PAGE_CONFIG;
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
        tiktokVariant="likes"
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

      {/* Live preview — after packages, before Why */}
      <TikTokLikesLivePreview />

      {/* 3 — Why buy */}
      <Benefits
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
      />

      {/* 4 — How to buy */}
      <Process
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {/* 5 — Single requirements section (merged) */}
      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="tiktok-likes"
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          notice={config.orderNotice}
          reverse={false}
        />
      ) : null}

      {/* 6 — Does buying work */}
      <TikTokLikesDoesBuyingWork config={config} />

      {/* 7 — Likes vs views vs followers */}
      <TikTokLikesServiceCompare config={config} />

      {/* 8 — What to check before buying */}
      <TikTokLikesBeforeBuying config={config} />

      {/* 9 —  */}
      <TikTokLikesCanada config={config} />

      {/* 10 — Package size recommendations */}
      <TikTokLikesPackageSizes config={config} />

      {/* 11 — Best practices */}
      <TikTokLikesBestPractices config={config} />

      {/* 12 — FAQ */}
      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
      />

      {/* 13 — Related services (Followers + Views; Comments not live) */}
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

      <TikTokLikesRelatedArticles articles={relatedArticles} />

      {/* 14 — Final CTA */}
      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<TikTokLikesFinalCtaAside />}
        trustLine="No password required · Secure checkout · Order tracking"
        className="[&_p:last-child]:text-white/70"
      />
    </div>
  );
}
