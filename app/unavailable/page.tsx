import type { Metadata } from 'next';

import { StatusPageShell } from '@/components/feedback/status-page-shell';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { noIndexMetadata } from '@/seo/metadata';

export const metadata: Metadata = {
  ...noIndexMetadata('Unavailable', '/unavailable'),
  robots: { index: false, follow: false },
};

/**
 * Shown when the visitor's country is not supported (middleware rewrite).
 */
export default function UnavailablePage() {
  return (
    <StatusPageShell showHomeLink={false}>
      <p className="text-sm font-medium text-[var(--brand)]">Unavailable</p>
      <Heading as="h1" size="h2" className="mt-2">
        NovaLikes is not available in your region
      </Heading>
      <MutedText className="mt-3 max-w-lg text-base">
        We do not currently offer NovaLikes services in your country. If you
        believe this is an error, contact support from a supported region.
      </MutedText>
    </StatusPageShell>
  );
}
