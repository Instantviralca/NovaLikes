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
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';
import '@/components/marketing/home-v5/home-v5.css';
import '@/components/marketing/home-v5/home-v5-rtl.css';

/**
 * Homepage v5 root: English `/`, a market variant, or `/de` (HOME_V5_DE).
 * Site layout already provides header, footer and `<main>`.
 */
export function HomeV5View({
  fontClassName,
  content = HOME_V5,
  market = null,
  locale = DEFAULT_LOCALE,
}: {
  fontClassName?: string;
  content?: HomeV5Content;
  market?: Market | null;
  locale?: Locale;
}) {
  return (
    <div className={cn('home-v5', fontClassName)}>
      <HomeV5Hero content={content} market={market} locale={locale} />
      <HomeV5Marquee content={content} />
      <HomeV5Statement content={content} />
      <HomeV5Stories content={content} locale={locale} />
      <HomeV5Services content={content} market={market} locale={locale} />
      <HomeV5Why content={content} />
      <HomeV5Promises content={content} />
      <HomeV5Faq content={content} locale={locale} />
      <HomeV5GetStarted content={content} market={market} locale={locale} />
      <HomeV5StickyCta content={content} />
    </div>
  );
}
