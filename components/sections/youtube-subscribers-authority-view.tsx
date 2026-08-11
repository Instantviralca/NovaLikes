import {

  ServiceCTA,

  ServiceFaq,

  ServiceHero,

} from '@/components/sections/service';

import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';

import { RequirementGuide } from '@/components/design-system/requirement-guide';

import {

  YouTubeSubscribersBestPractices,

  YouTubeSubscribersCanada,

  YouTubeSubscribersCanYouBuy,

  YouTubeSubscribersCommonMistakes,

  YouTubeSubscribersDoesBuyingHelp,

  YouTubeSubscribersExploreMore,

  YouTubeSubscribersHowToBuy,

  YouTubeSubscribersPackageSizes,

  YouTubeSubscribersRelatedArticles,

  YouTubeSubscribersServiceCompare,

  YouTubeSubscribersWhatHappens,

  YouTubeSubscribersWhyBuy,

  YouTubeSubscribersWhyChoose,

  type RelatedArticleWithThumb,

} from '@/components/marketing/youtube-subscribers/authority-sections';

import { YouTubeSubscribersFinalCtaAside } from '@/components/marketing/packages/youtube-subscribers-final-cta-aside';

import { YouTubeSubscribersOrderSummaryDashboard } from '@/components/illustrations/youtube-subscribers-order-summary-dashboard';

import { YOUTUBE_SUBSCRIBERS_PAGE_CONFIG } from '@/data/content/youtube-subscribers-page-config';

import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';

import { getServiceContentBySlug } from '@/data/content/services';

import { mapServiceContent } from '@/lib/content/mappers';

import { buildBreadcrumb } from '@/lib/linking';

import { getRelatedArticles } from '@/lib/linking/related-articles';

import type { Service } from '@/types/service';



type YouTubeSubscribersAuthorityViewProps = {

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

 * Buy YouTube Subscribers — full authority layout (Sections 1–18).

 */

export function YouTubeSubscribersAuthorityView({

  service,

}: YouTubeSubscribersAuthorityViewProps) {

  const content = getServiceContentBySlug(service.slug);

  if (!content) return null;



  const vm = mapServiceContent(content);

  const config = YOUTUBE_SUBSCRIBERS_PAGE_CONFIG;

  const relatedArticles = enrichRelatedArticles(

    getRelatedArticles(service.slug, {

      platform: service.platform,

      limit: 6,

      preferredSlugs: [

        'youtube-growth-guide',

        'how-to-get-more-youtube-subscribers',

        'how-to-get-more-youtube-views',

        'how-the-youtube-algorithm-works',

        'youtube-seo-guide',

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

        youtubeVariant="subscribers"

      />



      <ServiceCommerceBlocks

        service={service}

        pricing={vm.pricing}

        summaryBenefits={[

          'Public Channel URL Only',

          'No Login Required',

          'Secure Checkout',

          'Order Tracking',

          'Customer Support',

        ]}

      />



      <YouTubeSubscribersWhyChoose config={config} />



      <YouTubeSubscribersWhyBuy

        id={vm.benefits.id}

        title={vm.benefits.title}

        description={vm.benefits.description}

        items={vm.benefits.items}

        bottomNote={config.whyBuyNote}

      />



      <YouTubeSubscribersCanYouBuy config={config} />



      <YouTubeSubscribersHowToBuy

        id={vm.howItWorks.id}

        title={vm.howItWorks.title}

        description={vm.howItWorks.description}

        steps={vm.howItWorks.steps}

        cta={vm.howItWorks.cta}

      />



      {vm.deliveryAndSafety ? (

        <RequirementGuide

          id={vm.deliveryAndSafety.id}

          visualVariant="youtube-subscribers"

          visual={<YouTubeSubscribersOrderSummaryDashboard className="max-w-[24rem]" />}

          title={vm.deliveryAndSafety.title}

          description={vm.deliveryAndSafety.description}

          notice={config.orderNotice}

          reverse={false}

          className="!py-7 md:!py-9 lg:!py-10"

        />

      ) : null}



      <YouTubeSubscribersDoesBuyingHelp config={config} />



      <YouTubeSubscribersWhatHappens config={config} />



      <YouTubeSubscribersServiceCompare config={config} />



      <YouTubeSubscribersCanada config={config} />



      <YouTubeSubscribersPackageSizes config={config} />



      <YouTubeSubscribersBestPractices config={config} />



      <YouTubeSubscribersCommonMistakes config={config} />



      <ServiceFaq

        id={vm.faq.id}

        title={vm.faq.title}

        description={vm.faq.description}

        items={vm.faq.items}

        analyticsServiceSlug={service.slug}

        defaultOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}

        pinnedOpenIds={vm.faq.items[0]?.id ? [vm.faq.items[0].id] : undefined}

      />



      <YouTubeSubscribersExploreMore config={config} />



      <YouTubeSubscribersRelatedArticles articles={relatedArticles} />



      <ServiceCTA

        {...vm.finalCta}

        analyticsServiceSlug={service.slug}

        aside={<YouTubeSubscribersFinalCtaAside />}

        trustBadges={[

          'Public Channel URL Only',

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


