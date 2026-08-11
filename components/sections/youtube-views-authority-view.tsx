import {

  ServiceCTA,

  ServiceFaq,

  ServiceHero,

} from '@/components/sections/service';

import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';

import { RequirementGuide } from '@/components/design-system/requirement-guide';

import {

  YouTubeViewsBestPractices,

  YouTubeViewsCanada,

  YouTubeViewsCanYouBuy,

  YouTubeViewsCommonMistakes,

  YouTubeViewsDoesBuyingHelp,

  YouTubeViewsExploreMore,

  YouTubeViewsHowToBuy,

  YouTubeViewsPackageSizes,

  YouTubeViewsRelatedArticles,

  YouTubeViewsServiceCompare,

  YouTubeViewsWhatHappens,

  YouTubeViewsWhyBuy,

  YouTubeViewsWhyChoose,

  type RelatedArticleWithThumb,

} from '@/components/marketing/youtube-views/authority-sections';

import { YouTubeViewsFinalCtaAside } from '@/components/marketing/packages/youtube-views-final-cta-aside';

import { YouTubeViewsOrderSummaryDashboard } from '@/components/illustrations/youtube-views-order-summary-dashboard';

import { YOUTUBE_VIEWS_PAGE_CONFIG } from '@/data/content/youtube-views-page-config';

import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';

import { getServiceContentBySlug } from '@/data/content/services';

import { mapServiceContent } from '@/lib/content/mappers';

import { buildBreadcrumb } from '@/lib/linking';

import { getRelatedArticles } from '@/lib/linking/related-articles';

import type { Service } from '@/types/service';



type YouTubeViewsAuthorityViewProps = {

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

 * Buy YouTube Views — full authority layout (Sections 1–18).

 * Follows YouTube Subscribers winning architecture; intent stays on video views.

 */

export function YouTubeViewsAuthorityView({ service }: YouTubeViewsAuthorityViewProps) {

  const content = getServiceContentBySlug(service.slug);

  if (!content) return null;



  const vm = mapServiceContent(content);

  const config = YOUTUBE_VIEWS_PAGE_CONFIG;

  const relatedArticles = enrichRelatedArticles(

    getRelatedArticles(service.slug, {

      platform: service.platform,

      limit: 6,

      preferredSlugs: [

        'youtube-growth-guide',

        'how-to-get-more-youtube-views',

        'youtube-seo-guide',

        'how-the-youtube-algorithm-works',

        'how-to-get-more-youtube-subscribers',

        'common-youtube-growth-mistakes',

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

        youtubeVariant="views"

      />



      <ServiceCommerceBlocks

        service={service}

        pricing={vm.pricing}

        summaryBenefits={[

          'Public Video URL Only',

          'No Login Required',

          'Secure Checkout',

          'Order Tracking',

          'Customer Support',

        ]}

      />



      <YouTubeViewsWhyChoose config={config} />



      <YouTubeViewsWhyBuy

        id={vm.benefits.id}

        title={vm.benefits.title}

        description={vm.benefits.description}

        items={vm.benefits.items}

        bottomNote={config.whyBuyNote}

      />



      <YouTubeViewsCanYouBuy config={config} />



      <YouTubeViewsHowToBuy

        id={vm.howItWorks.id}

        title={vm.howItWorks.title}

        description={vm.howItWorks.description}

        steps={vm.howItWorks.steps}

        cta={vm.howItWorks.cta}

      />



      {vm.deliveryAndSafety ? (

        <RequirementGuide

          id={vm.deliveryAndSafety.id}

          visualVariant="youtube-views"

          visual={<YouTubeViewsOrderSummaryDashboard className="max-w-[24rem]" />}

          title={vm.deliveryAndSafety.title}

          description={vm.deliveryAndSafety.description}

          notice={config.orderNotice}

          reverse={false}

          className="!py-7 md:!py-9 lg:!py-10"

        />

      ) : null}



      <YouTubeViewsDoesBuyingHelp config={config} />



      <YouTubeViewsWhatHappens config={config} />



      <YouTubeViewsServiceCompare config={config} />



      <YouTubeViewsCanada config={config} />



      <YouTubeViewsPackageSizes config={config} />



      <YouTubeViewsBestPractices config={config} />



      <YouTubeViewsCommonMistakes config={config} />



      <ServiceFaq

        id={vm.faq.id}

        title={vm.faq.title}

        description={vm.faq.description}

        items={vm.faq.items}

        analyticsServiceSlug={service.slug}

        defaultOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}

        pinnedOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}

      />



      <YouTubeViewsExploreMore config={config} />



      <YouTubeViewsRelatedArticles articles={relatedArticles} />



      <ServiceCTA

        {...vm.finalCta}

        analyticsServiceSlug={service.slug}

        aside={<YouTubeViewsFinalCtaAside />}

        trustBadges={[

          'Public Video URL Only',

          'Secure Checkout',

          'No Password Required',

          'Order Tracking',

          'Customer Support',

        ]}

        className="[&_p:last-child]:text-white/70"

      />

    </div>

  );

}


