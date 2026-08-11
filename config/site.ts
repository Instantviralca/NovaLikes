/**
 * Environment-independent site configuration.
 * Brand identity fields delegate to config/brand.ts (Document 07.5).
 */

import { brand } from '@/config/brand';

export const site = {
  name: brand.name,
  domain: 'https://novalikes.com',
  supportEmail: 'support@novalikes.com',
  socialLinks: {
    /** Add only after official NovaLikes profiles are live. */
    instagram: '',
    tiktok: '',
    youtube: '',
    facebook: '',
  },
  tagline: brand.tagline,
  mission: brand.mission,
  defaultMetadata: {
    title: `${brand.name} | Social Media Growth Services`,
    description:
      `${brand.name} helps creators and brands grow on Instagram, TikTok, YouTube, and Facebook with reliable, transparent social media growth services.`,
  },
} as const;

export type SiteConfig = typeof site;
