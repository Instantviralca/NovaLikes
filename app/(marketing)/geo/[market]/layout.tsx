import type { ReactNode } from 'react';

type GeoMarketLayoutProps = {
  children: ReactNode;
};

/** Canada market pages use English chrome from the root marketing layout. */
export default function GeoMarketLayout({ children }: GeoMarketLayoutProps) {
  return children;
}
