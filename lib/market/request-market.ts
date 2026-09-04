import { headers } from 'next/headers';

import { isMarket, MARKET_HEADER, type Market } from '@/lib/market/config';

export async function getRequestMarket(): Promise<Market | null> {
  const headerList = await headers();
  const raw = headerList.get(MARKET_HEADER);
  return isMarket(raw) ? raw : null;
}
