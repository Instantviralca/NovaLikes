import { HomeTikTokFaq } from '@/components/marketing/home-tiktok/faq';
import { HomeTikTokFeatures } from '@/components/marketing/home-tiktok/features';
import { HomeTikTokFinalCta } from '@/components/marketing/home-tiktok/final-cta';
import { HomeTikTokGuides } from '@/components/marketing/home-tiktok/guides';
import { HomeTikTokHero } from '@/components/marketing/home-tiktok/hero';
import { HomeTikTokHowItWorks } from '@/components/marketing/home-tiktok/how-it-works';
import { HomeTikTokOtherPlatforms } from '@/components/marketing/home-tiktok/other-platforms';
import { HomeTikTokPackageFinderLazy } from '@/components/marketing/home-tiktok/package-finder-lazy';
import { HomeTikTokPackagesLazy } from '@/components/marketing/home-tiktok/packages-lazy';
import { HomeTikTokServiceCards } from '@/components/marketing/home-tiktok/service-cards';
import { HomeTikTokServiceFeatures } from '@/components/marketing/home-tiktok/service-features';
import { HomeTikTokStickyCta } from '@/components/marketing/home-tiktok/sticky-cta';
import { HomeTikTokWhatToExpect } from '@/components/marketing/home-tiktok/what-to-expect';
import { HomeTikTokWhoFor } from '@/components/marketing/home-tiktok/who-for';
import '@/components/marketing/home-tiktok/home-tt.css';
import type { TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { getServiceBySlug } from '@/data/services';
import {
  getTikTokServicePackages,
  TIKTOK_SERVICE_SLUGS,
} from '@/lib/marketing/home-tiktok/packages';
import type { Service } from '@/types/service';

const SERVICE_KEYS: TikTokServiceKey[] = ['followers', 'likes', 'views'];

function requireService(slug: string): Service {
  const service = getServiceBySlug(slug);
  if (!service) throw new Error(`Missing service for homepage packages: ${slug}`);
  return service;
}

/** Root English `/` only — TikTok v3.1 polish. */
export function HomeTikTokView() {
  const packagesByService = Object.fromEntries(
    SERVICE_KEYS.map((key) => [key, getTikTokServicePackages(key)]),
  ) as Record<TikTokServiceKey, ReturnType<typeof getTikTokServicePackages>>;

  const servicesByTab = Object.fromEntries(
    SERVICE_KEYS.map((key) => [key, requireService(TIKTOK_SERVICE_SLUGS[key])]),
  ) as Record<TikTokServiceKey, Service>;

  return (
    <div className="home-tt pb-[4.75rem] lg:pb-0">
      <HomeTikTokHero />
      <HomeTikTokPackagesLazy packagesByTab={packagesByService} servicesByTab={servicesByTab} />
      <HomeTikTokServiceCards />
      <HomeTikTokServiceFeatures />
      <HomeTikTokPackageFinderLazy packagesByService={packagesByService} />
      <HomeTikTokFeatures />
      <HomeTikTokHowItWorks />
      <HomeTikTokWhatToExpect />
      <HomeTikTokWhoFor />
      <HomeTikTokGuides />
      <HomeTikTokFaq />
      <HomeTikTokOtherPlatforms />
      <HomeTikTokFinalCta />
      <HomeTikTokStickyCta />
    </div>
  );
}
