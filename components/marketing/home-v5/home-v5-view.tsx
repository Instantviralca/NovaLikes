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
import { cn } from '@/lib/utils';
import '@/components/marketing/home-v5/home-v5.css';

/**
 * Root English `/` only: homepage v5. The site layout already provides the header, footer and
 * <main>, so this is the prototype's `.home-v5` root as a <div>. Fonts are scoped to this element
 * via `fontClassName` from the page (next/font variables).
 */
export function HomeV5View({ fontClassName }: { fontClassName?: string }) {
  return (
    <div className={cn('home-v5', fontClassName)}>
      <HomeV5Hero />
      <HomeV5Marquee />
      <HomeV5Statement />
      <HomeV5Stories />
      <HomeV5Services />
      <HomeV5Why />
      <HomeV5Promises />
      <HomeV5Faq />
      <HomeV5GetStarted />
      <HomeV5StickyCta />
    </div>
  );
}
