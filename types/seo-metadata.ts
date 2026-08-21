/**
 * SEO Metadata & Canonical Engine types — Document 14.07.
 */

export type SeoPageType =
  | 'homepage'
  | 'service'
  | 'company'
  | 'support'
  | 'legal'
  | 'learn'
  | 'commerce'
  | 'admin'
  | 'error'
  | 'tools';

export type SeoRobotsPolicy = {
  index: boolean;
  follow: boolean;
};

/**
 * Canonical metadata registry entry.
 * All production page metadata must be represented here.
 */
export type MetadataEntry = {
  id: string;
  /** Clean route path, e.g. `/buy-instagram-followers` or `/`. */
  route: string;
  pageType: SeoPageType;
  title: string;
  description: string;
  canonicalPath: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage: string;
  /** Natural alt text for the OG image (page-specific when set). */
  openGraphImageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  robots: SeoRobotsPolicy;
  keywords?: string[];
  locale: string;
  active: boolean;
  indexable: boolean;
  updatedAt: string;
  /** Source module for audit reports. */
  sourceFile: string;
};

export type MetadataIssueKind =
  | 'duplicate_title'
  | 'duplicate_description'
  | 'duplicate_canonical'
  | 'duplicate_route'
  | 'missing_title'
  | 'missing_description'
  | 'missing_canonical'
  | 'missing_og_image'
  | 'missing_social_image_file'
  | 'invalid_route'
  | 'skipped_service'
  | 'inactive_route'
  | 'indexable_mismatch'
  | 'unsupported_claim'
  | 'private_data'
  | 'canonical_mismatch'
  | 'schema_url_mismatch';

export type MetadataIssue = {
  kind: MetadataIssueKind;
  route: string;
  entryId?: string;
  sourceFile?: string;
  detail: string;
  relatedRoutes?: string[];
};

export type MetadataValidationReport = {
  issues: MetadataIssue[];
  duplicateTitleCount: number;
  duplicateDescriptionCount: number;
  duplicateCanonicalCount: number;
  missingCount: number;
  invalidRouteCount: number;
};

export type SocialImageValidation = {
  path: string;
  exists: boolean;
  width?: number;
  height?: number;
  detail?: string;
};

export type MetadataPreviewModel = {
  entry: MetadataEntry;
  canonicalUrl: string;
  titleLength: number;
  descriptionLength: number;
  robotsLabel: string;
  duplicateWarnings: MetadataIssue[];
  missingWarnings: MetadataIssue[];
  /** Editorial guidance only — not a Google display guarantee. */
  characterGuidance: string;
};
