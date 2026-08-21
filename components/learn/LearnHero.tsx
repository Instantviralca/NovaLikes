import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/shared';

type LearnHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/**
 * Learn hub / category hero — Document 15.01.
 */
export function LearnHero({
  eyebrow = 'Learn',
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
}: LearnHeroProps) {
  return (
    <Section className="overflow-x-hidden bg-transparent">
      <Container>
        <Stack gap="md" className="max-w-3xl py-10 md:py-14">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumb items={breadcrumbs} />
          ) : null}
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" className={HERO_HEADING_CLASS}>
            {accentLastWord(title)}
          </Heading>
          <Lead className="text-pretty text-neutral-600">{description}</Lead>
          {primaryCta || secondaryCta ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {primaryCta ? (
                <Button asChild>
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button asChild variant="outline">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
