'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import type { TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

const HomeTikTokPackages = dynamic(
  () =>
    import('@/components/marketing/home-tiktok/packages').then((mod) => ({
      default: mod.HomeTikTokPackages,
    })),
  {
    ssr: false,
    loading: () => <div className="min-h-[28rem] bg-white" aria-hidden />,
  },
);

/** Loads PricingGrid only when #packages is near the viewport (cuts mobile TBT). */
export function HomeTikTokPackagesLazy({
  packagesByTab,
  servicesByTab,
}: {
  packagesByTab: Record<TikTokServiceKey, PricingPackage[]>;
  servicesByTab: Record<TikTokServiceKey, Service>;
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
      { root: null, rootMargin: '120px 0px', threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={rootRef}>
      {ready ? (
        <HomeTikTokPackages packagesByTab={packagesByTab} servicesByTab={servicesByTab} />
      ) : (
        <section id="packages" className="min-h-[28rem] bg-white py-14" aria-hidden />
      )}
    </div>
  );
}
