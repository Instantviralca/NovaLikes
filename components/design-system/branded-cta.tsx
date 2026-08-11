import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';

type BrandedCTAProps = {
  title: string;
  description?: string;
  primary: CtaProps;
  secondary?: CtaProps;
  className?: string;
};

/**
 * Dark branded conversion band — NovaLikes orange accents.
 */
export function BrandedCTA({
  title,
  description,
  primary,
  secondary,
  className,
}: BrandedCTAProps) {
  return (
    <section
      className={cn('relative overflow-hidden bg-dark-band py-16 text-white md:py-20', className)}
      aria-label="Call to action"
    >
      <div
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-[var(--brand-primary)] opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative space-y-6 text-center">
        <Heading as="h2" size="h2" className="mx-auto max-w-2xl text-balance text-white">
          {title}
        </Heading>
        {description ? (
          <MutedText className="mx-auto max-w-xl text-base text-white/75">{description}</MutedText>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="min-h-12 rounded-xl bg-[var(--brand-primary)] px-8 font-semibold hover:bg-[var(--brand-primary-hover)]"
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-xl border-white/25 bg-transparent px-8 font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
