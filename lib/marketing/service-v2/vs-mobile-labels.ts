import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

/** Mobile VS row `::before` labels: English keeps legacy "Needs" / "From". */
export function vsMobileRowLabels(
  locale: Locale,
  cols: readonly string[],
): { needsLabel: string; fromLabel: string } {
  if (locale === DEFAULT_LOCALE) {
    return { needsLabel: 'Needs', fromLabel: 'From' };
  }
  return { needsLabel: cols[2]!, fromLabel: cols[3]! };
}
