import type { Market } from '@/lib/market/config';
import type { ServiceV2Content } from '../types';
import { SERVICE_V2_AU_CONTENT } from './au';
import { SERVICE_V2_CA_CONTENT } from './ca';
import { SERVICE_V2_UK_CONTENT } from './uk';

/** Market-specific v2 service copy (UK / CA / AU). US uses root English content. */
export function getServiceV2MarketContent(
  market: Market | null | undefined,
  slug: string,
): ServiceV2Content | undefined {
  if (market === 'uk') return SERVICE_V2_UK_CONTENT[slug];
  if (market === 'ca') return SERVICE_V2_CA_CONTENT[slug];
  if (market === 'au') return SERVICE_V2_AU_CONTENT[slug];
  return undefined;
}
