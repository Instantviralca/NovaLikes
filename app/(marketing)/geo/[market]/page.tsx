import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { nlBody, nlDisplay, preloadHomeDisplayFont } from '@/components/marketing/home-v5/fonts';
import { HomeV5View } from '@/components/marketing/home-v5/home-v5-view';
import { HOME_V5_AU } from '@/data/content/home-v5-au';
import { HOME_V5_CA } from '@/data/content/home-v5-ca';
import { HOME_V5_UK } from '@/data/content/home-v5-uk';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { loadMarketMetadataBundle } from '@/lib/market/content/load';
import { isMarket, MARKETS, type Market } from '@/lib/market/config';
import { buildMarketMetadata } from '@/lib/market/metadata';

type PageProps = {
  params: Promise<{ market: string }>;
};

export function generateStaticParams() {
  return MARKETS.map((market) => ({ market }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: raw } = await params;
  if (!isMarket(raw)) return {};
  const market = raw as Market;
  const meta = loadMarketMetadataBundle(market).homepage;
  return buildMarketMetadata({
    market,
    pathname: '/',
    title: meta.title,
    description: meta.description,
  });
}

const HOME_V5_BY_MARKET: Partial<Record<Market, HomeV5Content>> = {
  uk: HOME_V5_UK,
  ca: HOME_V5_CA,
  au: HOME_V5_AU,
};

export default async function MarketHomePage({ params }: PageProps) {
  const { market: raw } = await params;
  if (!isMarket(raw)) notFound();
  const market = raw as Market;

  // Phase 2/3: uk/ca/au unique home-v5. `/us` is redirected in middleware (never reaches here).
  const content = HOME_V5_BY_MARKET[market];
  if (content) {
    preloadHomeDisplayFont();
    const fontVars = `${nlDisplay.variable} ${nlBody.variable}`;
    return <HomeV5View fontClassName={fontVars} content={content} market={market} />;
  }

  notFound();
}
