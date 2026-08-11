import {
  RelatedServices,
  ServiceCTA,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { RequirementGuide } from '@/components/design-system/requirement-guide';
import {
  TikTokFollowersBestPractices,
  TikTokFollowersDoesBuyingWork,
  TikTokFollowersHowToBuy,
  TikTokFollowersRelatedArticles,
  TikTokFollowersWhyBuy,
  type RelatedArticleWithThumb,
} from '@/components/marketing/tiktok-followers/authority-sections';
import {
  TT_FOLLOWERS_SECTION_SPACING,
  TT_FOLLOWERS_SURFACES,
} from '@/components/marketing/tiktok-followers/page-rhythm';
import { TikTokFollowersFinalCtaAside } from '@/components/marketing/packages/tiktok-followers-final-cta-aside';
import { TIKTOK_FOLLOWERS_PAGE_CONFIG } from '@/data/content/tiktok-followers-page-config';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import { cn } from '@/lib/utils';
import type { Service } from '@/types/service';

type TikTokFollowersAuthorityViewProps = {
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
 * Buy TikTok Followers — alternating layout rhythm.
 * 1 Text L / Image R → 2 Full width → 3 Image L / Text R → 4 Centered dashboard →
 * 5 Cards only → 6 FAQ → 7 Articles with thumbnails.
 */
export function TikTokFollowersAuthorityView({ service }: TikTokFollowersAuthorityViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = TIKTOK_FOLLOWERS_PAGE_CONFIG;
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
        tiktokVariant="followers"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={['Public Username Only', 'Secure Checkout', 'Order Tracking']}
      />

      {/* 1 — Text left / Image right · Warm */}
      <TikTokFollowersWhyBuy
        id={vm.benefits.id}
        title={vm.benefits.title}
        description={vm.benefits.description}
        items={vm.benefits.items}
      />

      {/* 2 — Full width · White */}
      <TikTokFollowersHowToBuy
        id={vm.howItWorks.id}
        title={vm.howItWorks.title}
        description={vm.howItWorks.description}
        steps={vm.howItWorks.steps}
        cta={vm.howItWorks.cta}
      />

      {/* 3 — Image left / Text right · Soft orange */}
      {vm.deliveryAndSafety ? (
        <RequirementGuide
          id={vm.deliveryAndSafety.id}
          visualVariant="tiktok-followers"
          title={vm.deliveryAndSafety.title}
          description={vm.deliveryAndSafety.description}
          reverse={false}
          className={cn(
            TT_FOLLOWERS_SECTION_SPACING,
            TT_FOLLOWERS_SURFACES.softOrange,
            'bg-transparent',
            '[&_ul]:mt-5 [&_ul]:space-y-4',
            '[&_li]:min-h-[5.25rem] [&_li]:items-start [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:border-white/90 [&_li]:bg-white [&_li]:p-5',
            '[&_li]:shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)]',
            '[&_li:hover]:-translate-y-1 [&_li:hover]:shadow-[0_22px_44px_-22px_rgba(28,25,23,0.36)]',
            '[&_li>span]:size-11 [&_li>span]:rounded-xl [&_li>span]:shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
            '[&_li_svg]:size-5',
            '[&_li_p:first-child]:text-[0.95rem]',
          )}
        />
      ) : null}

      {/* 4 — Split checklist + dashboard · White */}
      <TikTokFollowersDoesBuyingWork config={config} />

      {/* 5 — Cards only · Light neutral */}
      <TikTokFollowersBestPractices config={config} />

      {/* 6 — FAQ · White */}
      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
        className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.white)}
      />

      {related.length > 0 ? (
        <RelatedServices
          id={vm.relatedServices.id ?? content.relatedServices.id}
          title={vm.relatedServices.title}
          description={vm.relatedServices.description}
          services={related}
          cta={vm.relatedServices.cta}
          analyticsServiceSlug={service.slug}
          className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.warm)}
        />
      ) : null}

      {/* 7 — Articles · Soft gradient */}
      <TikTokFollowersRelatedArticles articles={relatedArticles} />

      <ServiceCTA
        {...vm.finalCta}
        analyticsServiceSlug={service.slug}
        aside={<TikTokFollowersFinalCtaAside />}
        trustLine="No password required · Secure checkout · Order tracking"
        className="mb-0"
      />
    </div>
  );
}
