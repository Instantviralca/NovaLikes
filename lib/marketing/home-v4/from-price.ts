import { HOME_V4 } from '@/data/content/home-v4';
import { getServiceFromPriceLabel } from '@/lib/marketing/service-hero';

const FROM_PRICE_TOKEN = '{fromPrice}';

/**
 * Replace `{fromPrice}` with the lowest active package price for `slug`.
 * Returns an empty string when the template needs a price and none exists,
 * so callers can drop that line/bullet (`.filter(Boolean)`).
 */
export function applyFromPrice(template: string, slug: string): string {
  if (!template.includes(FROM_PRICE_TOKEN)) return template;
  const price = getServiceFromPriceLabel(slug);
  if (!price) return '';
  return template.split(FROM_PRICE_TOKEN).join(price);
}

/** "From $x" card price line, or null when the service has no active price. */
export function formatCardPrice(slug: string): string | null {
  const line = applyFromPrice(HOME_V4.hero.cardPrice, slug);
  return line || null;
}
