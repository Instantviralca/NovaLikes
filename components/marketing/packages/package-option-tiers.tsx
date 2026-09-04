import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

type OptionTier = {
  id: string;
  name: string;
  quantity: string;
  detail: string;
};

type PackageOptionTiersProps = {
  id?: string;
  className?: string;
  title: string;
  description?: string;
  cards: readonly OptionTier[];
};

/** Compact package-size comparison cards (Starter → Large Scale). */
export function PackageOptionTiers({
  id = 'compare-options',
  className,
  title,
  description,
  cards,
}: PackageOptionTiersProps) {
  if (cards.length === 0) return null;

  return (
    <Section id={id} spacing="lg" className={cn('bg-hero-wash', className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
        </FadeUp>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {cards.map((card, index) => (
            <li key={card.id}>
              <FadeUp delay={0.03 * index}>
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-5 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] sm:px-5">
                  <p className="text-[10px] font-bold tracking-[0.08em] text-[var(--brand-primary)] uppercase">
                    {card.name}
                  </p>
                  <p className="mt-2 text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {card.quantity}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-[var(--text-secondary)]">{card.detail}</p>
                </article>
              </FadeUp>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
