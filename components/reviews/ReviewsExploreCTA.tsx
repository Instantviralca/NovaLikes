import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { localizeHref } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';

const PLATFORM_CTAS = [
  { key: 'instagram' as const, href: '/buy-instagram-followers', label: 'Explore Instagram' },
  { key: 'tiktok' as const, href: '/buy-tiktok-followers', label: 'Explore TikTok' },
  { key: 'facebook' as const, href: '/buy-facebook-followers', label: 'Explore Facebook' },
] as const;

type ReviewsExploreCTAProps = {
  className?: string;
  locale?: Locale;
  title?: string;
  intro?: string;
  labels?: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
};

/** Compact bottom CTA for the reviews page — real service destinations only. */
export function ReviewsExploreCTA({
  className,
  locale = 'en',
  title = 'Ready to Explore NovaLikes?',
  intro = "Browse our Instagram, TikTok and Facebook services and choose the option that fits what you're looking for.",
  labels,
}: ReviewsExploreCTAProps) {
  return (
    <section
      className={cn(
        'border-t border-black/[0.04] bg-gradient-to-b from-[#FFF1E6]/80 to-[#FFE8D6]/50',
        className,
      )}
      aria-labelledby="reviews-explore-heading"
    >
      <Container size="xl" className="py-10 md:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2" id="reviews-explore-heading" className="text-balance">
            {title}
          </Heading>
          <MutedText className="mt-3 text-pretty">{intro}</MutedText>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {PLATFORM_CTAS.map((cta) => (
              <Button key={cta.href} asChild variant="secondary" className="w-full sm:w-auto">
                <Link href={localizeHref(cta.href, locale)}>
                  {labels?.[cta.key] ?? cta.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
