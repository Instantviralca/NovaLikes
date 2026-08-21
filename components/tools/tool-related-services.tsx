import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import {
  getRelatedServicesForTool,
  relatedServicesHeading,
} from '@/data/tools/related-services';
import type { ToolPlatform, ToolSlug } from '@/lib/tools/types';

type ToolRelatedServicesProps = {
  slug: ToolSlug;
  platform: ToolPlatform;
};

export function ToolRelatedServices({ slug, platform }: ToolRelatedServicesProps) {
  const services = getRelatedServicesForTool(slug);
  if (!services.length) return null;

  return (
    <Section spacing="sm">
      <Container size="lg">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-5 py-5 sm:px-6">
          <Heading as="h2" size="h3">
            {relatedServicesHeading(platform)}
          </Heading>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Separate from this free tool. Open a package page only if you also want to grow a public
            account.
          </p>
          <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.url}
                  className="text-sm font-medium text-[var(--brand-primary)] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
