/**
 * Public business contact details from configuration only.
 * Placeholders and empty values are omitted — never invent address, phone, hours, or social links.
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';

export type PublicBusinessContact = {
  legalName: string;
  email?: string;
  phone?: string;
  address?: string;
  officeHours?: string;
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
  const socialLinks = Object.entries(site.socialLinks)
    .filter(([, href]) => isUsableUrl(href))
    .map(([id, href]) => ({ id, href }));

  const company = site.company;

  return {
    legalName: `${company.legalName}, trading as ${brand.name} — Company No. ${company.companyNumber} (${company.registeredIn})`,
    email: email && !isPlaceholderEmail(email) ? email : undefined,
    phone: `WhatsApp ${company.phoneDisplay}`,
    address: company.addressDisplay,
    // Office hours are not configured — omit rather than invent.
    socialLinks,
  };
}

/** True when at least one customer-facing contact detail beyond the legal name exists. */
export function hasPublicContactDetails(contact: PublicBusinessContact = getPublicBusinessContact()): boolean {
  return Boolean(contact.email || contact.phone || contact.address || contact.officeHours || contact.socialLinks.length);
}
