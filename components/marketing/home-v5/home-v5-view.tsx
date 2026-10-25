import { HomeV5Faq } from '@/components/marketing/home-v5/faq';
import { HomeV5GetStarted } from '@/components/marketing/home-v5/get-started';
import { HomeV5Hero } from '@/components/marketing/home-v5/hero';
import { HomeV5Marquee } from '@/components/marketing/home-v5/marquee';
import { HomeV5Promises } from '@/components/marketing/home-v5/promises';
import { HomeV5Services } from '@/components/marketing/home-v5/service-block';
import { HomeV5Statement } from '@/components/marketing/home-v5/statement';
import { HomeV5StickyCta } from '@/components/marketing/home-v5/sticky-cta';
import { HomeV5Stories } from '@/components/marketing/home-v5/stories';
import { HomeV5Why } from '@/components/marketing/home-v5/why';
import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';
import '@/components/marketing/home-v5/home-v5.css';

/**
 * Homepage v5 root: English `/` (HOME_V5) or a market variant (e.g. HOME_V5_UK on `/uk`).
 * Site layout already provides header, footer and `<main>`.
 */
export function HomeV5View({
  fontClassName,
  content = HOME_V5,
  market = null,
}: {
  fontClassName?: string;
  content?: HomeV5Content;
  market?: Market | null;
}) {
  return (
    <div className={cn('home-v5', fontClassName)}>
      <HomeV5Hero content={content} market={market} />
      <HomeV5Marquee content={content} />
      <HomeV5Statement content={content} />
      <HomeV5Stories content={content} />
      <HomeV5Services content={content} market={market} />
      <HomeV5Why content={content} />
      <HomeV5Promises content={content} />
      <HomeV5Faq content={content} />
      <HomeV5GetStarted content={content} market={market} />
      <HomeV5StickyCta content={content} />
    </div>
  );
}
