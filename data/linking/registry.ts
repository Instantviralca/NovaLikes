/**
 * Shared internal link registry — Document 14.05.
 * Single source of truth for active destinations and relationships.
 */

import { routes, learnCategoryPath, platformHubPath } from '@/config/routes';
import {
  APPROVED_SERVICE_SLUGS,
  SERVICE_INTENT_BY_CATEGORY,
  isApprovedServiceSlug,
} from '@/data/linking/approved-services';
import { POLICY_LINK_SETS } from '@/data/linking/policies';
import { getAllLearnArticles, getActiveLearnCategories } from '@/data/learn';
import { getAllServices } from '@/data/services';
import type { LinkPage, PolicyLinkId } from '@/types/linking';
import type { PlatformId } from '@/types/platform';

function pathToSlug(path: string): string {
  if (path === '/' || path === '') return 'home';
  return path.replace(/^\//, '');
}

function hrefForSlug(slug: string): string {
  if (slug === 'home') return routes.home;
  return `/${slug}`;
}

const PLATFORM_TITLES: Record<PlatformId, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  youtube: 'YouTube',
};

/** Default same-platform related services for approved pages (ordered by journey). */
function defaultRelatedServices(
  slug: string,
  platform: PlatformId,
): string[] {
  return APPROVED_SERVICE_SLUGS.filter((candidate) => {
    if (candidate === slug) return false;
    const service = getAllServices().find((item) => item.slug === candidate);
    return service?.platform === platform;
  });
}

function buildRegistry(): LinkPage[] {
  const pages: LinkPage[] = [];

  pages.push({
    slug: 'home',
    title: 'Home',
    category: 'homepage',
    keywords: ['novalikes', 'social media growth', 'buy followers'],
    relatedServices: [...APPROVED_SERVICE_SLUGS.filter((slug) => {
      const service = getAllServices().find((item) => item.slug === slug);
      return Boolean(service?.featured);
    })],
    relatedArticles: getAllLearnArticles().map(
      (article) => `learn/${article.slug}`,
    ),
    relatedPolicies: POLICY_LINK_SETS.footer,
    active: true,
  });

  // Platform hubs resolve to Learn category pages (no dead /instagram routes).
  (Object.keys(PLATFORM_TITLES) as PlatformId[]).forEach((platform) => {
    pages.push({
      slug: platform,
      title: PLATFORM_TITLES[platform],
      category: 'platform',
      platform,
      keywords: [platform, PLATFORM_TITLES[platform].toLowerCase()],
      relatedServices: APPROVED_SERVICE_SLUGS.filter((slug) => {
        const service = getAllServices().find((item) => item.slug === slug);
        return service?.platform === platform;
      }),
      relatedArticles: getAllLearnArticles()
        .filter((article) => article.platformId === platform)
        .map((article) => `learn/${article.slug}`),
      relatedPolicies: [],
      breadcrumbParent: 'home',
      active: true,
    });
  });

  // Company / support
  const companyPages: Array<{
    slug: string;
    title: string;
    category: LinkPage['category'];
    policies: PolicyLinkId[];
    keywords: string[];
  }> = [
    {
      slug: pathToSlug(routes.about),
      title: 'About',
      category: 'company',
      policies: ['contact', 'faq'],
      keywords: ['about', 'company'],
    },
    {
      slug: pathToSlug(routes.contact),
      title: 'Contact Support',
      category: 'support',
      policies: ['faq', 'refund-policy'],
      keywords: ['contact', 'support'],
    },
    {
      slug: pathToSlug(routes.faq),
      title: 'FAQ',
      category: 'support',
      policies: ['contact', 'refund-policy'],
      keywords: ['faq', 'questions'],
    },
    {
      slug: pathToSlug(routes.reviews),
      title: 'Reviews',
      category: 'company',
      policies: ['contact'],
      keywords: ['reviews', 'testimonials'],
    },
    {
      slug: pathToSlug(routes.learn),
      title: 'Learn',
      category: 'learn',
      policies: [],
      keywords: ['learn', 'guides'],
    },
    {
      slug: pathToSlug(routes.trackOrder),
      title: 'Track Your Order',
      category: 'support',
      policies: ['contact', 'faq', 'refund-policy'],
      keywords: ['track order', 'order status'],
    },
    {
      slug: pathToSlug(routes.services),
      title: 'Services',
      category: 'company',
      policies: ['faq', 'contact'],
      keywords: ['services', 'packages', 'platforms'],
    },
  ];

  for (const page of companyPages) {
    const isLearnHub = page.slug === pathToSlug(routes.learn);
    pages.push({
      slug: page.slug,
      title: page.title,
      category: page.category,
      keywords: page.keywords,
      relatedServices: [],
      relatedArticles: isLearnHub
        ? getActiveLearnCategories()
            .filter((category) => category.slug !== 'news')
            .map((category) => `learn/${category.slug}`)
        : [],
      relatedPolicies: page.policies,
      breadcrumbParent: 'home',
      active: true,
    });
  }

  // Legal
  const legalPages: Array<{ slug: string; title: string; id: PolicyLinkId }> = [
    { slug: pathToSlug(routes.privacyPolicy), title: 'Privacy Policy', id: 'privacy-policy' },
    {
      slug: pathToSlug(routes.termsAndConditions),
      title: 'Terms & Conditions',
      id: 'terms-and-conditions',
    },
    { slug: pathToSlug(routes.refundPolicy), title: 'Refund Policy', id: 'refund-policy' },
    { slug: pathToSlug(routes.cookiePolicy), title: 'Cookie Policy', id: 'cookie-policy' },
    { slug: pathToSlug(routes.disclaimer), title: 'Disclaimer', id: 'disclaimer' },
  ];

  for (const page of legalPages) {
    pages.push({
      slug: page.slug,
      title: page.title,
      category: 'legal',
      keywords: [page.title.toLowerCase()],
      relatedServices: [],
      relatedArticles: [],
      relatedPolicies: POLICY_LINK_SETS.legal.filter((id) => id !== page.id),
      breadcrumbParent: 'home',
      active: true,
    });
  }

  // Commerce (active for validation; limited outbound linking)
  for (const entry of [
    { slug: pathToSlug(routes.cart), title: 'Cart' },
    { slug: pathToSlug(routes.checkout), title: 'Checkout' },
  ]) {
    pages.push({
      slug: entry.slug,
      title: entry.title,
      category: 'commerce',
      keywords: [entry.title.toLowerCase()],
      relatedServices: [],
      relatedArticles: [],
      relatedPolicies: POLICY_LINK_SETS.checkout,
      breadcrumbParent: 'home',
      active: true,
    });
  }

  // Services — approved active, skipped registered inactive (never link to)
  for (const service of getAllServices()) {
    const approved = isApprovedServiceSlug(service.slug);
    pages.push({
      slug: service.slug,
      title: service.name,
      category: 'service',
      platform: service.platform,
      keywords: [service.primaryKeyword, ...service.secondaryKeywords],
      relatedServices: approved
        ? defaultRelatedServices(service.slug, service.platform)
        : [],
      relatedArticles: getAllLearnArticles()
        .filter((article) => article.platformId === service.platform)
        .map((article) => `learn/${article.slug}`),
      relatedPolicies: approved ? POLICY_LINK_SETS.service : [],
      breadcrumbParent: 'home',
      active: approved && !service.comingSoon,
      serviceIntent: SERVICE_INTENT_BY_CATEGORY[service.category] ?? 'other',
    });
  }

  // Learn articles (published only — registry stays empty until content ships)
  for (const article of getAllLearnArticles()) {
    const related = (article.relatedServiceSlugs ?? []).filter(isApprovedServiceSlug);
    const platformKeyword = article.platformId ?? 'learn';
    pages.push({
      slug: `learn/${article.slug}`,
      title: article.title,
      category: 'learn',
      platform: article.platformId,
      keywords: [article.title.toLowerCase(), platformKeyword],
      relatedServices: related,
      relatedArticles: getAllLearnArticles()
        .filter((item) => item.slug !== article.slug)
        .filter((item) => item.platformId === article.platformId)
        .map((item) => `learn/${item.slug}`),
      relatedPolicies: [],
      breadcrumbParent: 'learn',
      active: true,
    });
  }

  // Learn categories — Document 15.01
  for (const category of getActiveLearnCategories()) {
    pages.push({
      slug: `learn/${category.slug}`,
      title: category.name,
      category: 'learn',
      platform: category.platformId,
      keywords: [category.name.toLowerCase(), 'learn', category.slug],
      relatedServices: category.platformId
        ? APPROVED_SERVICE_SLUGS.filter((slug) => {
            const service = getAllServices().find((item) => item.slug === slug);
            return service?.platform === category.platformId;
          })
        : [],
      relatedArticles: getAllLearnArticles()
        .filter((article) => article.platformId === category.platformId)
        .map((article) => `learn/${article.slug}`),
      relatedPolicies: [],
      breadcrumbParent: 'learn',
      active: true,
    });
  }

  return pages;
}

/** Canonical link registry (memoized). */
export const linkRegistry: LinkPage[] = buildRegistry();

export function getLinkRegistry(): LinkPage[] {
  return linkRegistry;
}

export function getLinkPageBySlug(slug: string): LinkPage | undefined {
  return linkRegistry.find((page) => page.slug === slug);
}

export function getActiveLinkPages(): LinkPage[] {
  return linkRegistry.filter((page) => page.active);
}

export function linkPageHref(slug: string): string {
  if (slug === 'home') return routes.home;
  if (slug.startsWith('learn/')) {
    const segment = slug.slice('learn/'.length);
    return learnCategoryPath(segment);
  }
  if (
    slug === 'instagram' ||
    slug === 'tiktok' ||
    slug === 'facebook' ||
    slug === 'youtube'
  ) {
    return platformHubPath(slug);
  }
  return hrefForSlug(slug);
}

export function getServiceLinkPage(serviceSlug: string): LinkPage | undefined {
  return getLinkPageBySlug(serviceSlug);
}
