import type { Market } from '@/lib/market/config';
import type { PlatformId } from '@/types/platform';

import registry from '@/data/market-unique-service-images.json';

export type UniqueServiceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Placement = {
  market: string;
  slug: string;
  sectionId: string;
  visualRole: string;
  src: string;
  alt: string;
};

const WIDTH = 1536;
const HEIGHT = 1024;

/** Bust browser + next/image cache when public WebP files are replaced in-place. */
const ASSET_CACHE_BUST = 'v=content-aware-4';

function withCacheBust(src: string): string {
  if (!src || src.includes('?')) return src;
  return `${src}?${ASSET_CACHE_BUST}`;
}

const byKey = new Map<string, UniqueServiceImage>();

for (const p of (registry as { placements: Placement[] }).placements) {
  byKey.set(`${p.market}|${p.slug}|${p.sectionId}`, {
    src: withCacheBust(p.src),
    alt: p.alt,
    width: WIDTH,
    height: HEIGHT,
  });
}

export function getUniqueServiceImage(
  market: Market | undefined,
  slug: string,
  sectionId: string,
): UniqueServiceImage | null {
  if (!market) return null;
  return byKey.get(`${market}|${slug}|${sectionId}`) ?? null;
}

/** Story side image — unique per market × slug × section. */
export function getUniqueStoryImage(
  market: Market | undefined,
  slug: string | undefined,
  sectionId: string,
  _platform?: PlatformId,
): UniqueServiceImage | null {
  if (!market || !slug) return null;
  return getUniqueServiceImage(market, slug, sectionId);
}
