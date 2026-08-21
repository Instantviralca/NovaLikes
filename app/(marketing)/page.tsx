import type { Metadata } from 'next';

import { HomePageView } from '@/components/sections/HomePageView';
import { homeMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return homeMetadata();
}

/** Production homepage — Organization + WebSite JSON-LD live in the marketing layout. */
export default function HomePage() {
  return <HomePageView />;
}
