import { homepageHub } from '@/data/content/homepage-hub';
import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '@/data/content/instagram-followers-page-config';
import { faqPageContent } from '@/data/content/company';
import { faqHubItems } from '@/data/content/faq-hub';
import { getServiceContentBySlug } from '@/data/content/services';
import { buildDummyAuthorityPage } from '@/data/content/dummy-service-authority-config';
import { getServiceBySlug } from '@/data/services';
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import type { CoreServiceSlug } from '@/lib/i18n/config';
import { getEnglishMetadataBundle } from '@/lib/i18n/metadata';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';

export function getEnglishHomepageSource() {
  return homepageHub;
}

export function getEnglishFaqPageSource() {
  return {
    hero: faqPageContent.hero,
    search: faqPageContent.search,
    categoriesTitle: faqPageContent.categoriesTitle,
    refundPolicyCta: faqPageContent.refundPolicyCta,
    finalCta: faqPageContent.finalCta,
    categories: FAQ_CATEGORIES,
  };
}

export function getEnglishFaqItemsSource() {
  return faqHubItems
    .filter((item) => item.category && item.active !== false)
    .map((item) => ({
      id: item.id,
      category: item.category,
      order: item.order,
      question: item.question,
      answer: item.answer,
    }));
}

export function getEnglishServiceBundle(slug: CoreServiceSlug) {
  const content = getServiceContentBySlug(slug);
  if (!content) throw new Error(`Missing service content ${slug}`);
  const service = getServiceBySlug(slug);
  if (!service) throw new Error(`Missing service ${slug}`);

  return {
    content,
    followersAuthority:
      slug === 'buy-instagram-followers' ? INSTAGRAM_FOLLOWERS_PAGE_CONFIG : undefined,
    dummy: slug === 'buy-instagram-followers' ? undefined : buildDummyAuthorityPage(service),
  };
}

export function getEnglishUiSource() {
  return ENGLISH_UI;
}

export function getEnglishMetadataSource() {
  return getEnglishMetadataBundle();
}

export {
  getEnglishAboutSource,
  getEnglishContactSource,
  getEnglishReviewsPageSource,
} from '@/lib/i18n/content/company-english';

export {
  getEnglishPrivacySource,
  getEnglishRefundSource,
  getEnglishTermsSource,
  getEnglishCookiesSource,
  getEnglishDisclaimerSource,
} from '@/lib/i18n/content/legal-english';
