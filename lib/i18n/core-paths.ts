import { CORE_SERVICE_SLUGS, TOOL_SLUGS } from '@/lib/i18n/config';

/** Unprefixed paths for the 12 core commercial pages. */
export const CORE_PATHS = ['/', '/faq', ...CORE_SERVICE_SLUGS.map((slug) => `/${slug}`)] as const;

export type CorePath = (typeof CORE_PATHS)[number];

/** Unprefixed English paths for the tools hub + 8 existing tools. */
export const TOOL_PATHS = ['/tools', ...TOOL_SLUGS.map((slug) => `/tools/${slug}`)] as const;

export type ToolPath = (typeof TOOL_PATHS)[number];

/** Unprefixed English paths for About, Contact and Reviews. */
export const COMPANY_PATHS = ['/about', '/contact', '/reviews'] as const;

export type CompanyPath = (typeof COMPANY_PATHS)[number];

/** Unprefixed English paths for the five legal policy pages. */
export const LEGAL_PATHS = [
  '/privacy-policy',
  '/refund-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/disclaimer',
] as const;

export type LegalPath = (typeof LEGAL_PATHS)[number];
