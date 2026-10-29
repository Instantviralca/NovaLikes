import { HOME_V5 } from '@/data/content/home-v5';
import type { Locale } from '@/lib/i18n/config';
import { getServiceFromPriceLabel } from '@/lib/marketing/service-hero';

const FROM_PRICE_TOKEN = '{fromPrice}';
const LRI = '\u2066';
const PDI = '\u2069';

/** Keep `$3.49` LTR inside Arabic sentences. */
export function isolatePriceForLocale(price: string, locale?: Locale): string {
  if (locale !== 'ar') return price;
  return `${LRI}${price}${PDI}`;
}

/**
 * Replace `{fromPrice}` with the lowest active package price for `slug`.
 * Returns an empty string when the template needs a price and none exists,
 * so callers can drop that line/bullet (`.filter(Boolean)`).
 */
export function applyFromPrice(
  template: string,
  slug: string,
  locale?: Locale,
): string {
  if (!template.includes(FROM_PRICE_TOKEN)) return template;
  const price = getServiceFromPriceLabel(slug);
  if (!price) return '';
  return template
    .split(FROM_PRICE_TOKEN)
    .join(isolatePriceForLocale(price, locale));
}

/** "From $x" card price line, or null when the service has no active price. */
export function formatCardPrice(slug: string): string | null {
  const line = applyFromPrice(HOME_V5.hero.cardPrice, slug);
  return line || null;
}
