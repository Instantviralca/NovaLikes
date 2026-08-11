export { site } from '@/config/site';
export {
  platforms,
  getAllPlatforms,
  getPlatformById,
  getPlatformBySlug,
} from '@/data/platforms';
export {
  services,
  getAllServices,
  getFeaturedServices,
  getPlatformServices,
  getServiceBySlug,
  getNavigationServices,
  getFooterServices,
  getRelatedServices,
  getServiceSlugs,
} from '@/data/services';
export {
  getPackagesByServiceSlug,
  getPackageById,
  getPackagesByIds,
  resolveServicePackages,
  getActivePackagesByServiceSlug,
  getServicesWithPricing,
  getServicesMissingPricing,
  getNovaLikesProductCount,
  currencies,
  getDefaultCurrency,
  getCouponByCode,
  packageBadges,
  NOVALIKES_PRODUCTS,
} from '@/data/pricing';
export { getServiceOrderConfig, getOrderFieldsForServiceSlug } from '@/data/order-fields';
export {
  mainNavigation,
  primaryCta,
  secondaryCta,
  getMainNavigation,
  getMegaMenuServices,
  getPlatformNavItems,
  isMegaMenuItem,
} from '@/data/navigation';
export { getFooterColumns } from '@/data/footer';
export {
  learnArticles,
  getAllLearnArticles,
  getLearnArticleBySlug,
  getLearnSlugs,
} from '@/data/learn';
export { trustItems, getAllTrustItems, getTrustItemsByIds } from '@/data/trust';
export * from '@/data/content';
