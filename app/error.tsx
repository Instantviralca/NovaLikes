'use client';

import {
  StatusPageShell,
} from '@/components/feedback/status-page-shell';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const message =
    error?.message && error.message !== '[object Event]'
      ? error.message
      : isDev
        ? 'A client resource failed to load (often a blocked payment/analytics script). Check the network tab.'
        : undefined;

  return (
    <StatusPageShell>
      <p className="text-sm font-medium text-[var(--brand)]">Error</p>
      <Heading as="h1" size="h2" className="mt-2">
        Something went wrong
      </Heading>
      <MutedText className="mt-3 max-w-lg text-base">
        {isDev && message
          ? message
          : 'An unexpected error occurred. Please try again.'}
      </MutedText>
      {error.digest ? (
        <p className="mt-2 text-xs text-muted-foreground">Reference: {error.digest}</p>
      ) : null}
      <Button type="button" className="mt-8 min-h-11 w-fit" onClick={reset}>
        Try again
      </Button>
    </StatusPageShell>
  );
}
