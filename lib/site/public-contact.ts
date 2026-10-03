/**
 * Public business contact details from configuration only.
 * Placeholders and empty values are omitted — never invent address, phone, hours, or social links.
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';

export type PublicBusinessContact = {
  legalName: string;
  companyNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  officeHours?: string;
  whatsappHref?: string;
  socialLinks: Array<{ id: string; href: string }>;
};

function isPlaceholderEmail(email: string): boolean {
  const value = email.trim().toLowerCase();
  if (!value) return true;
  return (
    value.endsWith('@example.com') ||
    value.endsWith('@example.org') ||
    value.endsWith('@example.net') ||
    value.includes('placeholder')
  );
}

function isUsableUrl(url: string): boolean {
  const value = url.trim();
  if (!value || value === '#') return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Verified public contact fields from site/brand config. */
export function getPublicBusinessContact(): PublicBusinessContact {
  const email = site.supportEmail?.trim();
  const whatsappDigits = site.whatsappNumber?.trim();
  const socialLinks = Object.entries(site.socialLinks)
    .filter(([, href]) => isUsableUrl(href))
    .map(([id, href]) => ({ id, href }));

  return {
    legalName: brand.legalName,
    companyNumber: site.company.companyNumber,
    email: email && !isPlaceholderEmail(email) ? email : undefined,
    phone: whatsappDigits ? `+${whatsappDigits}` : undefined,
    address: site.company.officeAddress,
    whatsappHref: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
    socialLinks,
  };
}

/** True when at least one customer-facing contact detail beyond the legal name exists. */
export function hasPublicContactDetails(contact: PublicBusinessContact = getPublicBusinessContact()): boolean {
  return Boolean(contact.email || contact.phone || contact.address || contact.officeHours || contact.socialLinks.length);
}
