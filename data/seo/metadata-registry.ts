/**
 * Central metadata registry — Document 14.07.
 * Titles/descriptions sourced from existing seo/titles + seo/descriptions (no invented claims).
 */

import { routes } from '@/config/routes';
import { AUTHOR_INDEX_SEO, AUTHOR_PATH_PREFIX } from '@/config/authors';
import { LEARN_TAG_PAGES_ENABLED, LEARN_TAG_PATH_PREFIX } from '@/config/learn-taxonomy';
import { seoSiteConfig } from '@/config/seo';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getActiveLearnCategories } from '@/data/learn';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { LEARN_TAGS } from '@/data/learn/tags';
import { AUTHORS } from '@/data/authors';
import { getServiceBySlug } from '@/data/services';
import { getServiceContentBySlug } from '@/data/content/services';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getOpenGraphImageForSlug } from '@/data/seo/open-graph-images';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import type { MetadataEntry } from '@/types/seo-metadata';

const UPDATED = '2026-07-12T00:00:00.000Z';
const OG = seoSiteConfig.defaultOpenGraphImage;
const LOCALE = seoSiteConfig.defaultLocale;
const SOURCE = 'data/seo/metadata-registry.ts';

function entry(
  partial: Omit<MetadataEntry, 'locale' | 'updatedAt' | 'sourceFile' | 'openGraphImage'> & {
    openGraphImage?: string;
    openGraphImageAlt?: string;
    twitterImageAlt?: string;
    locale?: string;
    updatedAt?: string;
    sourceFile?: string;
  },
): MetadataEntry {
  return {
    openGraphImage: OG,
    locale: LOCALE,
    updatedAt: UPDATED,
    sourceFile: SOURCE,
    ...partial,
  };
}

function buildServiceEntries(): MetadataEntry[] {
  return APPROVED_SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug);
    const content = getServiceContentBySlug(slug);
    const route = `/${slug}`;
    const title =
      content?.seo?.title ?? (service ? titles.service(service) : `${slug} | NovaLikes`);
    const description =
      content?.seo?.description ??
      (service ? descriptions.service(service) : seoSiteConfig.defaultDescription);
    const og = getOpenGraphImageForSlug(slug);

    return entry({
      id: `meta-service-${slug}`,
      route,
      pageType: 'service',
      title,
      description,
      canonicalPath: route,
      openGraphTitle: title,
      openGraphDescription: description,
      openGraphImage: og?.path ?? OG,
      openGraphImageAlt: og?.alt,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: og?.path ?? OG,
      twitterImageAlt: og?.alt,
      robots: { index: true, follow: true },
      keywords: service ? [service.primaryKeyword, ...service.secondaryKeywords] : undefined,
      active: true,
      indexable: true,
    });
  });
}

function buildLearnEntries(): MetadataEntry[] {
  const index = entry({
    id: 'meta-learn-index',
    route: routes.learn,
    pageType: 'learn',
    title: titles.learnIndex(),
    description: descriptions.learnIndex(),
    canonicalPath: routes.learn,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  });

  const categories = getActiveLearnCategories().map((category) => {
    const route = `${routes.learn}/${category.slug}`;
    return entry({
      id: `meta-learn-category-${category.slug}`,
      route,
      pageType: 'learn',
      title: category.seo.title,
      description: category.seo.description,
      canonicalPath: category.seo.canonicalPath ?? route,
      openGraphTitle: category.seo.title,
      openGraphDescription: category.seo.description,
      twitterTitle: category.seo.title,
      twitterDescription: category.seo.description,
      robots: { index: true, follow: true },
      active: true,
      indexable: true,
    });
  });

  const articles = LEARN_ARTICLES.filter(
    (article) => isPublicLiveArticle(article) && !article.seo?.noindex,
  ).map((article) => {
    const route = `${routes.learn}/${article.slug}`;
    const title =
      article.seo.title ||
      titles.learnArticle({
        slug: article.slug,
        title: article.title,
        relatedServiceSlugs: [...article.relatedServices],
      });
    const description =
      article.seo.description ||
      descriptions.learnArticle({
        slug: article.slug,
        title: article.title,
        relatedServiceSlugs: [...article.relatedServices],
      });
    return entry({
      id: `meta-learn-${article.slug}`,
      route,
      pageType: 'learn',
      title,
      description,
      canonicalPath: article.seo.canonicalPath || route,
      openGraphTitle: title,
      openGraphDescription: description,
      twitterTitle: title,
      twitterDescription: description,
      robots: { index: true, follow: true },
      active: true,
      indexable: true,
      updatedAt: article.showModifiedDate ? article.updatedAt : article.publishedAt,
    });
  });

  return [index, ...categories, ...articles];
}

function buildAuthorEntries(): MetadataEntry[] {
  const index = entry({
    id: 'meta-authors-index',
    route: AUTHOR_PATH_PREFIX,
    pageType: 'learn',
    title: AUTHOR_INDEX_SEO.title,
    description: AUTHOR_INDEX_SEO.description,
    canonicalPath: AUTHOR_INDEX_SEO.canonicalPath,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  });

  const profiles = AUTHORS.filter((author) => author.active).map((author) =>
    entry({
      id: `meta-author-${author.slug}`,
      route: `${AUTHOR_PATH_PREFIX}/${author.slug}`,
      pageType: 'learn',
      title: author.seo.title,
      description: author.seo.description,
      canonicalPath: author.seo.canonicalPath || `${AUTHOR_PATH_PREFIX}/${author.slug}`,
      openGraphTitle: author.seo.title,
      openGraphDescription: author.seo.description,
      twitterTitle: author.seo.title,
      twitterDescription: author.seo.description,
      robots: { index: true, follow: true },
      active: true,
      indexable: true,
      updatedAt: author.joinedAt,
    }),
  );

  return [index, ...profiles];
}

function buildTagEntries(): MetadataEntry[] {
  if (!LEARN_TAG_PAGES_ENABLED) return [];

  const liveArticles = LEARN_ARTICLES.filter((article) => isPublicLiveArticle(article));

  return LEARN_TAGS.filter((tag) => tag.active)
    .map((tag) => {
      const articleCount = liveArticles.filter((article) => article.tags.includes(tag.slug)).length;
      if (articleCount < 1) return null;
      const route = `${LEARN_TAG_PATH_PREFIX}/${tag.slug}`;
      const title = `${tag.name} Guides | NovaLikes Learn`;
      const description =
        tag.description ||
        `Browse NovaLikes Learn guides tagged ${tag.name} for social media growth tips.`;
      return entry({
        id: `meta-learn-tag-${tag.slug}`,
        route,
        pageType: 'learn',
        title,
        description,
        canonicalPath: route,
        openGraphTitle: title,
        openGraphDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        robots: { index: true, follow: true },
        active: true,
        indexable: true,
      });
    })
    .filter((item): item is MetadataEntry => item !== null);
}

const homepageOg = getOpenGraphImageForSlug('homepage');

export const metadataRegistry: MetadataEntry[] = [
  entry({
    id: 'meta-home',
    route: routes.home,
    pageType: 'homepage',
    title: titles.home(),
    description: descriptions.home(),
    canonicalPath: '/',
    openGraphTitle: titles.home(),
    openGraphDescription: descriptions.home(),
    openGraphImage: homepageOg?.path ?? OG,
    openGraphImageAlt: homepageOg?.alt,
    twitterTitle: titles.home(),
    twitterDescription: descriptions.home(),
    twitterImage: homepageOg?.path ?? OG,
    twitterImageAlt: homepageOg?.alt,
    robots: { index: true, follow: true },
    keywords: [
      'social media growth services',
      'instagram growth',
      'tiktok growth',
      'facebook growth',
      'youtube growth',
      'buy followers',
      'buy likes',
      'buy views',
      'NovaLikes',
    ],
    active: true,
    indexable: true,
  }),

  ...buildServiceEntries(),

  entry({
    id: 'meta-about',
    route: routes.about,
    pageType: 'company',
    title: titles.company('About'),
    description: descriptions.about(),
    canonicalPath: routes.about,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-contact',
    route: routes.contact,
    pageType: 'support',
    title: titles.company('Contact'),
    description: descriptions.contact(),
    canonicalPath: routes.contact,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-faq',
    route: routes.faq,
    pageType: 'support',
    title: titles.company('FAQ'),
    description: descriptions.faq(),
    canonicalPath: routes.faq,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-reviews',
    route: routes.reviews,
    pageType: 'company',
    title: titles.company('Reviews'),
    description: descriptions.reviews(),
    canonicalPath: routes.reviews,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-track-order',
    route: routes.trackOrder,
    pageType: 'support',
    title: 'Track Your Order | NovaLikes',
    description:
      'Track your NovaLikes order using your order ID and the email address used at checkout. View customer-safe status updates without sharing private account details.',
    canonicalPath: routes.trackOrder,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),

  // Legal
  entry({
    id: 'meta-privacy',
    route: routes.privacyPolicy,
    pageType: 'legal',
    title: titles.legal('Privacy Policy'),
    description: descriptions.privacyPolicy(),
    canonicalPath: routes.privacyPolicy,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-terms',
    route: routes.termsAndConditions,
    pageType: 'legal',
    title: titles.legal('Terms & Conditions'),
    description: descriptions.termsAndConditions(),
    canonicalPath: routes.termsAndConditions,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-refund',
    route: routes.refundPolicy,
    pageType: 'legal',
    title: titles.legal('Refund Policy'),
    description: descriptions.refundPolicy(),
    canonicalPath: routes.refundPolicy,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-cookie',
    route: routes.cookiePolicy,
    pageType: 'legal',
    title: titles.legal('Cookie Policy'),
    description: descriptions.cookiePolicy(),
    canonicalPath: routes.cookiePolicy,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),
  entry({
    id: 'meta-disclaimer',
    route: routes.disclaimer,
    pageType: 'legal',
    title: titles.legal('Disclaimer'),
    description: descriptions.disclaimer(),
    canonicalPath: routes.disclaimer,
    robots: { index: true, follow: true },
    active: true,
    indexable: true,
  }),

  ...buildLearnEntries(),
  ...buildAuthorEntries(),
  ...buildTagEntries(),

  // Commerce — noindex
  entry({
    id: 'meta-cart',
    route: routes.cart,
    pageType: 'commerce',
    title: 'Cart | NovaLikes',
    description: 'Review items in your NovaLikes cart before checkout.',
    canonicalPath: routes.cart,
    robots: { index: false, follow: true },
    active: true,
    indexable: false,
  }),
  entry({
    id: 'meta-checkout',
    route: routes.checkout,
    pageType: 'commerce',
    title: 'Checkout | NovaLikes',
    description: 'Complete your NovaLikes order checkout securely.',
    canonicalPath: routes.checkout,
    robots: { index: false, follow: false },
    active: true,
    indexable: false,
  }),
  entry({
    id: 'meta-order-success',
    route: '/order-success',
    pageType: 'commerce',
    title: 'Order Confirmation | NovaLikes',
    description: 'Your NovaLikes order confirmation page.',
    canonicalPath: '/order-success',
    robots: { index: false, follow: false },
    active: true,
    indexable: false,
  }),

  // Private track-order result surface (never a crawlable static URL with PII)
  entry({
    id: 'meta-track-order-result',
    route: '/track-order/result',
    pageType: 'support',
    title: 'Order Status | NovaLikes',
    description: 'Private order status view. This page is not indexed.',
    canonicalPath: '/track-order/result',
    robots: { index: false, follow: false },
    active: true,
    indexable: false,
  }),

  // Admin
  entry({
    id: 'meta-admin',
    route: routes.admin,
    pageType: 'admin',
    title: 'Admin | NovaLikes',
    description: 'NovaLikes administration.',
    canonicalPath: routes.admin,
    robots: { index: false, follow: false },
    active: true,
    indexable: false,
  }),

  // Error
  entry({
    id: 'meta-404',
    route: '/404',
    pageType: 'error',
    title: 'Page Not Found | NovaLikes',
    description: 'The requested NovaLikes page could not be found.',
    canonicalPath: '/404',
    robots: { index: false, follow: false },
    active: true,
    indexable: false,
  }),
];

export function getMetadataRegistry(): MetadataEntry[] {
  return metadataRegistry;
}
