/**
 * Environment-independent site configuration.
 * Brand identity fields delegate to config/brand.ts (Document 07.5).
 */

import { brand } from '@/config/brand';

export const site = {
  name: brand.name,
  domain: 'https://novalikes.com',
  supportEmail: 'support@novalikes.com',
  /** Public WhatsApp chat (E.164 without +). Opens wa.me in a new tab. */
  whatsappNumber: '61468147262',
  socialLinks: {
    instagram: 'https://www.instagram.com/novalikesco/',
    facebook: 'https://www.facebook.com/novalikes/',
    linkedin: 'https://www.linkedin.com/company/nova-likes/',
    tiktok: '',
    youtube: '',
  },
  tagline: brand.tagline,
  mission: brand.mission,
  defaultMetadata: {
    title: `${brand.name} | Social Media Growth Services`,
    description:
      `${brand.name} helps creators and brands grow on Instagram, TikTok, and Facebook with reliable, transparent social media growth services.`,
  },
} as const;

export type SiteConfig = typeof site;
