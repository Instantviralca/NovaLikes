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
  whatsappNumber: '447454758272',
  /** Legal entity that operates NovaLikes (Companies House, Scotland). */
  company: {
    legalName: 'DMRUSH LIMITED',
    companyNumber: 'SC876437',
    registeredIn: 'Scotland',
    streetAddress: '1/4 22 Dundasvale Court',
    addressLocality: 'Glasgow',
    addressRegion: 'Scotland',
    postalCode: 'G4 0XE',
    addressCountry: 'GB',
    addressDisplay: '1/4 22 Dundasvale Court, Glasgow, Scotland, G4 0XE',
    phoneE164: '+447454758272',
    phoneDisplay: '+44 7454 758272',
    /** NovaLikes was previously operated under the ViralMe brand. */
    formerBrandName: 'ViralMe',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/novalikesco/',
    facebook: 'https://www.facebook.com/novalikes/',
    linkedin: 'https://www.linkedin.com/company/nova-likes/',
    tiktok: 'https://www.tiktok.com/@novalikes2',
    youtube: '',
    x: 'https://x.com/novalikes21',
    pinterest: 'https://ca.pinterest.com/novalikes01/',
    threads: 'https://www.threads.com/@novalikes01',
    crunchbase: 'https://www.crunchbase.com/organization/nova-likes',
    producthunt: 'https://www.producthunt.com/@novalikes',
    medium: 'https://medium.com/@novalikes01',
    substack: 'https://substack.com/@novalikes',
    reddit: 'https://www.reddit.com/user/novalikes12/',
    quora: 'https://www.quora.com/profile/Novalikes',
    tumblr: 'https://www.tumblr.com/novalikess',
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
