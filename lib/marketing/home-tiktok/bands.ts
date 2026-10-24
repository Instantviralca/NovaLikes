import type { PricingPackage } from '@/types/pricing';

export type AccountBand = 'small' | 'medium' | 'large';

/** Sort packages ascending by quantity (stable by id). */
export function sortPackagesByQuantity(packages: PricingPackage[]): PricingPackage[] {
  return [...packages].sort(
    (a, b) => a.quantity - b.quantity || a.id.localeCompare(b.id),
  );
}

/**
 * Split packages into 3 near-equal bands by quantity order.
 * Remainder packages go to earlier bands (small, then medium).
 */
export function splitPackagesIntoBands(
  packages: PricingPackage[],
): Record<AccountBand, PricingPackage[]> {
  const sorted = sortPackagesByQuantity(packages);
  const n = sorted.length;
  if (n === 0) {
    return { small: [], medium: [], large: [] };
  }

  const base = Math.floor(n / 3);
  const rem = n % 3;
  const sizes = [base + (rem > 0 ? 1 : 0), base + (rem > 1 ? 1 : 0), base] as const;

  // When fewer than 3 packages, still produce 3 bands (may share / be empty).
  if (n === 1) {
    return { small: sorted, medium: [], large: [] };
  }
  if (n === 2) {
    return { small: [sorted[0]!], medium: [sorted[1]!], large: [] };
  }

  let offset = 0;
  const small = sorted.slice(offset, offset + sizes[0]);
  offset += sizes[0];
  const medium = sorted.slice(offset, offset + sizes[1]);
  offset += sizes[1];
  const large = sorted.slice(offset);

  return { small, medium, large };
}

export function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat('en-US').format(quantity);
}

/**
 * `{range}` = `"<min>–<max> <unit>"`, or a single quantity when the band has one package.
 */
export function formatBandRange(band: PricingPackage[], unit: string): string {
  if (band.length === 0) return '';
  if (band.length === 1) {
    return `${formatQuantity(band[0]!.quantity)} ${unit}`;
  }
  const min = band[0]!.quantity;
  const max = band[band.length - 1]!.quantity;
  return `${formatQuantity(min)}–${formatQuantity(max)} ${unit}`;
}

export function getBandPackages(
  packages: PricingPackage[],
  band: AccountBand,
): PricingPackage[] {
  return splitPackagesIntoBands(packages)[band];
}
