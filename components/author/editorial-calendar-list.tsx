import Link from 'next/link';

import { StatusBadge } from '@/components/author/status-badge';
import { Button } from '@/components/ui/button';
import type { EditorialCalendarRow } from '@/lib/cms/seed-editorial-plan';

export function EditorialCalendarList({
  rows,
  empty,
}: {
  rows: EditorialCalendarRow[];
  empty: string;
}) {
  if (rows.length === 0) {
    return <p className="mt-3 text-sm text-[#8A837C]">{empty}</p>;
  }
  return (
    <ul className="mt-4 space-y-3">
      {rows.map((row) => (
        <li
          key={row.slug}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F7EFE7] pb-3 last:border-0"
        >
          <div>
            <p className="font-medium">{row.title}</p>
            <p className="text-xs text-[#8A837C]">
              {row.intendedPublishOn} · /learn/{row.slug}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={row.status} />
            {row.cmsId && (row.status === 'planned' || row.status === 'draft') ? (
              <Button size="sm" variant="outline" asChild>
                <Link href={`/author/articles/${row.cmsId}`} data-testid="start-writing">
                  {row.status === 'planned' ? 'Start Writing' : 'Edit'}
                </Link>
              </Button>
            ) : null}
            {row.cmsId && row.status !== 'planned' && row.status !== 'draft' ? (
              <Button size="sm" variant="outline" asChild>
                <Link href={`/author/articles/${row.cmsId}`}>Edit</Link>
              </Button>
            ) : null}
            {row.liveHref ? (
              <Button size="sm" variant="outline" asChild>
                <a href={row.liveHref} target="_blank" rel="noreferrer">
                  View live
                </a>
              </Button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
