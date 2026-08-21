import {
  getCookiePolicyContent,
  getCookiePolicyDates,
} from '@/data/content/legal/cookies';
import {
  getDisclaimerContent,
  getDisclaimerDates,
} from '@/data/content/legal/disclaimer';
import {
  getPrivacyPolicyContent,
  getPrivacyPolicyDates,
} from '@/data/content/legal/privacy';
import {
  getRefundPolicyContent,
  getRefundPolicyDates,
} from '@/data/content/legal/refund';
import {
  getTermsAndConditionsContent,
  getTermsAndConditionsDates,
} from '@/data/content/legal/terms';
import type { LegalPolicyPageContent } from '@/types/legal';

export const LEGAL_OVERLAY_FILES = [
  'privacy.json',
  'refund.json',
  'terms.json',
  'cookies.json',
  'disclaimer.json',
] as const;

export type LegalOverlayKey =
  | 'privacy-policy'
  | 'refund-policy'
  | 'terms-and-conditions'
  | 'cookie-policy'
  | 'disclaimer';

export function getEnglishPrivacySource(): LegalPolicyPageContent {
  return getPrivacyPolicyContent();
}

export function getEnglishRefundSource(): LegalPolicyPageContent {
  return getRefundPolicyContent();
}

export function getEnglishTermsSource(): LegalPolicyPageContent {
  return getTermsAndConditionsContent();
}

export function getEnglishCookiesSource(): LegalPolicyPageContent {
  return getCookiePolicyContent();
}

export function getEnglishDisclaimerSource(): LegalPolicyPageContent {
  return getDisclaimerContent();
}

export function getEnglishLegalSource(key: LegalOverlayKey): LegalPolicyPageContent {
  switch (key) {
    case 'privacy-policy':
      return getEnglishPrivacySource();
    case 'refund-policy':
      return getEnglishRefundSource();
    case 'terms-and-conditions':
      return getEnglishTermsSource();
    case 'cookie-policy':
      return getEnglishCookiesSource();
    case 'disclaimer':
      return getEnglishDisclaimerSource();
  }
}

export function getLegalDates(key: LegalOverlayKey): {
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
} {
  switch (key) {
    case 'privacy-policy':
      return getPrivacyPolicyDates();
    case 'refund-policy':
      return getRefundPolicyDates();
    case 'terms-and-conditions':
      return getTermsAndConditionsDates();
    case 'cookie-policy':
      return getCookiePolicyDates();
    case 'disclaimer':
      return getDisclaimerDates();
  }
}

export function legalOverlayFile(key: LegalOverlayKey): string {
  switch (key) {
    case 'privacy-policy':
      return 'privacy.json';
    case 'refund-policy':
      return 'refund.json';
    case 'terms-and-conditions':
      return 'terms.json';
    case 'cookie-policy':
      return 'cookies.json';
    case 'disclaimer':
      return 'disclaimer.json';
  }
}

export function legalEnglishPath(key: LegalOverlayKey): string {
  return `/${key}`;
}
