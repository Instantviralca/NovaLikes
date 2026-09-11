/**
 * Cart / order line purchase multiplier — distinct from package size (`quantity`).
 *
 * Postgres persists via order_items.configuration JSONB (reserved key) so no
 * schema migration is required. Legacy rows without the key → lineQuantity = 1.
 */

import type { OrderConfigurationValues } from '@/types/order-fields';

/** Reserved configuration key — stripped from customer/admin fulfillment views. */
export const LINE_QUANTITY_CONFIG_KEY = '__lineQuantity';

const MIN_LINE_QUANTITY = 1;

/** Normalize legacy / missing values to a safe purchase multiplier. */
export function normalizeLineQuantity(value: unknown): number {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= MIN_LINE_QUANTITY) {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed) && parsed >= MIN_LINE_QUANTITY) {
      return parsed;
    }
  }
  return MIN_LINE_QUANTITY;
}

/**
 * Strict parser for client-supplied checkout values.
 * Returns null when invalid (0, negative, decimal, NaN, junk).
 */
export function parseStrictLineQuantity(value: unknown): number | null {
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || value < MIN_LINE_QUANTITY) return null;
    return value;
  }
  if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) {
    const parsed = Number(value.trim());
    if (!Number.isSafeInteger(parsed) || parsed < MIN_LINE_QUANTITY) return null;
    return parsed;
  }
  return null;
}

export function computeLineTotal(unitPriceMinor: number, lineQuantity: unknown): number {
  return unitPriceMinor * normalizeLineQuantity(lineQuantity);
}

export function stripLineQuantityFromConfiguration(
  configuration: OrderConfigurationValues | Record<string, unknown> | undefined,
): OrderConfigurationValues {
  if (!configuration) return {};
  const next: OrderConfigurationValues = { ...(configuration as OrderConfigurationValues) };
  delete next[LINE_QUANTITY_CONFIG_KEY];
  return next;
}

export function extractLineQuantityFromConfiguration(
  configuration: OrderConfigurationValues | Record<string, unknown> | undefined,
): number {
  if (!configuration) return MIN_LINE_QUANTITY;
  return normalizeLineQuantity(
    (configuration as Record<string, unknown>)[LINE_QUANTITY_CONFIG_KEY],
  );
}

/** Embed lineQuantity into configuration for Postgres JSONB persistence. */
export function embedLineQuantityInConfiguration(
  configuration: OrderConfigurationValues | undefined,
  lineQuantity: number,
): OrderConfigurationValues {
  const cleaned = stripLineQuantityFromConfiguration(configuration);
  const qty = normalizeLineQuantity(lineQuantity);
  if (qty === MIN_LINE_QUANTITY) {
    // Omit default to keep legacy-shaped rows tidy; missing key still means 1.
    return cleaned;
  }
  return {
    ...cleaned,
    [LINE_QUANTITY_CONFIG_KEY]: qty,
  };
}

export function isReservedConfigurationKey(key: string): boolean {
  return key === LINE_QUANTITY_CONFIG_KEY || key.startsWith('__');
}

/** Stable compare for cart-line merge (same package + same target/config). */
export function stableConfigurationKey(
  configuration: OrderConfigurationValues | undefined,
): string {
  const cleaned = stripLineQuantityFromConfiguration(configuration);
  const entries = Object.entries(cleaned)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v] as const)
    .sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(entries);
}
