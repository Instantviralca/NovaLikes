import { cn } from '@/lib/utils';

type ScheduledPublishNoticeProps = {
  scheduledAt: string;
  className?: string;
};

/**
 * Notice for scheduled articles — Document 15.08.
 * Editorial-only; scheduled content stays private.
 */
export function ScheduledPublishNotice({
  scheduledAt,
  className,
}: ScheduledPublishNoticeProps) {
  const when = Date.parse(scheduledAt);
  const label = Number.isNaN(when)
    ? scheduledAt
    : new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC',
      }).format(new Date(when));

  return (
    <aside
      className={cn(
        'border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950',
        className,
      )}
      data-scheduled-publish-notice
      role="note"
    >
      <p className="font-semibold">Scheduled for publication</p>
      <p className="mt-1 text-sky-900/90">
        Goes live {label} UTC. Remains private and non-indexable until then.
      </p>
    </aside>
  );
}
