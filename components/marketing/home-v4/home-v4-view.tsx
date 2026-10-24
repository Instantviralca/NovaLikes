import { HomeV4Faq } from '@/components/marketing/home-v4/faq';
import { HomeV4FinalCta } from '@/components/marketing/home-v4/final-cta';
import { HomeV4GetStarted } from '@/components/marketing/home-v4/get-started';
import { HomeV4Guides } from '@/components/marketing/home-v4/guides';
import { HomeV4Hero } from '@/components/marketing/home-v4/hero';
import { HomeV4HowItWorks } from '@/components/marketing/home-v4/how-it-works';
import { HomeV4Intro } from '@/components/marketing/home-v4/intro';
import { HomeV4Promises } from '@/components/marketing/home-v4/promises';
import { HomeV4Services } from '@/components/marketing/home-v4/services';
import { HomeV4StickyCta } from '@/components/marketing/home-v4/sticky-cta';
import '@/components/marketing/home-v4/home-v4.css';

/** Root English `/` only: homepage v4 (Instagram + TikTok + Facebook tab). */
export function HomeV4View() {
  return (
    <div className="home-v4 pb-[4.75rem] lg:pb-0">
      <HomeV4Hero />
      <HomeV4Intro />
      <HomeV4Services />
      <HomeV4HowItWorks />
      <HomeV4Promises />
      <HomeV4Faq />
      <HomeV4Guides />
      <HomeV4GetStarted />
      <HomeV4FinalCta />
      <HomeV4StickyCta />
    </div>
  );
}
