/**
 * Legal / Privacy Policy types — Document 13.04.
 * Configuration must use verified values only; never invent contact or provider details.
 */

export type PrivacyPublicationStatus = 'draft' | 'ready-for-legal-review' | 'published';

export type PrivacyToolEntry = {
  id: string;
  displayName: string;
  enabled: boolean;
};

export type PrivacyRetentionEntry = {
  id: string;
  label: string;
  /** Verified retention period only — omit when not confirmed. */
  period?: string;
};

/**
 * Typed privacy configuration surface (Document 13.04 §28).
 * Optional fields remain undefined until verified.
 */
export type PrivacyConfig = {
  legalBusinessName: string;
  operatingName: string;
  websiteDomain: string;
  privacyContactRole?: string;
  privacyContactName?: string;
  privacyEmail?: string;
  mailingAddress?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  effectiveDate?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  lastUpdatedDate?: string;
  hostingLocation?: string;
  emailProvider?: string;
  /** Only set after legal + platform age-threshold review. */
  minimumCustomerAge?: number;
  cookiePreferenceToolEnabled: boolean;
  cookiePreferenceToolLabel?: string;
  cookiePreferenceHref?: string;
  cookiePolicyHref?: string;
  /** True only when a real retention schedule has been verified. */
  retentionScheduleVerified: boolean;
  retentionCategories: PrivacyRetentionEntry[];
  analyticsProviders: PrivacyToolEntry[];
  marketingTools: PrivacyToolEntry[];
  /** Internal only — never render checklist notes on the public page. */
  publicationStatus: PrivacyPublicationStatus;
  legalReviewCompleted: boolean;
};

export type LegalSectionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'subheading'; id: string; text: string };

export type LegalPolicySection = {
  id: string;
  anchor: string;
  title: string;
  blocks: LegalSectionBlock[];
};

/** Shared legal page chrome used by Privacy, Terms, and future legal docs. */
export type LegalPolicyPageContent = {
  id: string;
  path: string;
  seo: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  header: {
    title: string;
    intro: string;
  };
  tocTitle: string;
  sections: LegalPolicySection[];
};

export type PrivacyPolicyContent = LegalPolicyPageContent & {
  id: 'privacy-policy';
};

/**
 * Terms & Conditions configuration — Document 13.05.
 * Optional jurisdiction and contact fields remain undefined until verified.
 */
export type TermsConfig = {
  legalBusinessName: string;
  operatingName: string;
  websiteDomain: string;
  supportEmail?: string;
  mailingAddress?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  effectiveDate?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  lastUpdatedDate?: string;
  /**
   * Governing law / venue — only set after legal review.
   * Do not invent province, state, or country.
   */
  governingLaw?: string;
  disputeVenue?: string;
  /** Only set after legal + platform age-threshold review. */
  minimumCustomerAge?: number;
  publicationStatus: PrivacyPublicationStatus;
  legalReviewCompleted: boolean;
};

export type TermsAndConditionsContent = LegalPolicyPageContent & {
  id: 'terms-and-conditions';
};

/**
 * Refund Policy configuration — Document 13.06.
 * Do not invent refund windows, refill periods, or processing SLAs.
 */
export type RefundConfig = {
  legalBusinessName: string;
  operatingName: string;
  websiteDomain: string;
  supportEmail?: string;
  mailingAddress?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  effectiveDate?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  lastUpdatedDate?: string;
  /**
   * Optional published processing-time description after operational confirmation.
   * Example: "Typically reviewed within several business days."
   */
  processingTimeDescription?: string;
  /**
   * Optional eligible money-back window label after legal/ops confirmation.
   * Do not invent values such as "30 days" here until verified.
   */
  eligibleMoneyBackWindowLabel?: string;
  /** True only when operational refund rules have been verified for publication. */
  operationalPolicyVerified: boolean;
  publicationStatus: PrivacyPublicationStatus;
  legalReviewCompleted: boolean;
};

export type RefundPolicyContent = LegalPolicyPageContent & {
  id: 'refund-policy';
};

/**
 * Cookie / similar-technology purpose entry — Document 13.07.
 * Do not invent cookie names or third-party tools.
 */
export type CookiePurposeEntry = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  /** Optional verified storage/tech note (e.g. sessionStorage). */
  technologyNote?: string;
};

/**
 * Cookie Policy configuration — Document 13.07.
 * Analytics and marketing tools must match real enablement only.
 */
export type CookieConfig = {
  legalBusinessName: string;
  operatingName: string;
  websiteDomain: string;
  supportEmail?: string;
  mailingAddress?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  effectiveDate?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  lastUpdatedDate?: string;
  /** Essential purposes actually required for core site operation. */
  essentialPurposes: CookiePurposeEntry[];
  analyticsProviders: PrivacyToolEntry[];
  marketingTools: PrivacyToolEntry[];
  consentManagerEnabled: boolean;
  consentManagerLabel?: string;
  consentManagerHref?: string;
  /** True only when a verified named-cookie inventory has been completed. */
  cookieInventoryVerified: boolean;
  publicationStatus: PrivacyPublicationStatus;
  legalReviewCompleted: boolean;
};

export type CookiePolicyContent = LegalPolicyPageContent & {
  id: 'cookie-policy';
};

/**
 * Disclaimer configuration — Document 13.08.
 * Do not invent affiliations, endorsements, addresses, or contact details.
 */
export type DisclaimerConfig = {
  legalBusinessName: string;
  operatingName: string;
  websiteDomain: string;
  supportEmail?: string;
  mailingAddress?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  effectiveDate?: string;
  /** ISO date string (YYYY-MM-DD) when verified for publication. */
  lastUpdatedDate?: string;
  /**
   * Only true when NovaLikes has verified third-party platform affiliations
   * or endorsements with supporting documentation. Defaults to false.
   */
  hasVerifiedPlatformAffiliations: boolean;
  publicationStatus: PrivacyPublicationStatus;
  legalReviewCompleted: boolean;
};

export type DisclaimerContent = LegalPolicyPageContent & {
  id: 'disclaimer';
};
