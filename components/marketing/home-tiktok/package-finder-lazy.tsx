'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import type { TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import type { PricingPackage } from '@/types/pricing';

const HomeTikTokPackageFinder = dynamic(
  () =>
    import('@/components/marketing/home-tiktok/package-finder').then((mod) => ({
      default: mod.HomeTikTokPackageFinder,
    })),
  {
    ssr: false,
    loading: () => <PackageFinderShell />,
  },
);

function PackageFinderShell() {
  return (
    <section
      id="package-finder"
      className="tt-dark relative min-h-[28rem] overflow-hidden py-14 md:min-h-[32rem] md:py-18 lg:py-20"
      aria-hidden
    />
  );
}

/** Loads the interactive finder only when the section is near the viewport. */
export function HomeTikTokPackageFinderLazy({
  packagesByService,
}: {
  packagesByService: Record<TikTokServiceKey, PricingPackage[]>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || ready) return;
    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '280px 0px', threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={rootRef}>
      {ready ? (
        <HomeTikTokPackageFinder packagesByService={packagesByService} />
      ) : (
        <PackageFinderShell />
      )}
    </div>
  );
}
