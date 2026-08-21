'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cmsFetch } from '@/components/author/cms-fetch';
import { Button } from '@/components/ui/button';

export function ScheduledArticleActions({ id, slug }: { id: string; slug: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function act(action: string, extra: Record<string, unknown> = {}) {
    setError(null);
    const response = await cmsFetch(`/api/author/articles/${id}`, {
      method: 'POST',
      body: JSON.stringify({ action, ...extra }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? 'Action failed.');
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" asChild>
          <Link href={`/author/articles/${id}`}>Edit</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={`/learn/preview/${slug}`} target="_blank" rel="noreferrer">
            Preview
          </a>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href={`/author/articles/${id}#schedule`}>Change date/time</Link>
        </Button>
        <Button size="sm" variant="outline" onClick={() => act('publish')}>
          Publish now
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (window.confirm('Cancel this schedule and return the article to draft?')) {
              void act('cancel_schedule');
            }
          }}
        >
          Cancel schedule
        </Button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
