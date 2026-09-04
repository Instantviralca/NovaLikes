import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomePageView } from '@/components/sections/HomePageView';
import { getMarketHomepageLabels } from '@/lib/market/homepage-labels';
import { loadMarketHomepageHub, loadMarketMetadataBundle } from '@/lib/market/content/load';
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

export default async function MarketHomePage({ params }: PageProps) {
  const { market: raw } = await params;
  if (!isMarket(raw)) notFound();
  const market = raw as Market;

  const hub = loadMarketHomepageHub(market);

  return (
    <HomePageView
      hub={hub}
      stickyCtaLabel="Explore Instagram Services"
      stickyCtaHref="#instagram-services"
      homepageLabels={getMarketHomepageLabels(market)}
    />
  );
}
