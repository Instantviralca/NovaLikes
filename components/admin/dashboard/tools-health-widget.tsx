import { AdminCard } from '@/components/admin/cards/admin-card';
import { getToolHealthSummary } from '@/lib/tools/diagnostics';

export function ToolsHealthWidget() {
  const summary = getToolHealthSummary();
  const successRate =
    summary.total === 0 ? 'No traffic yet' : `${Math.round((summary.success / summary.total) * 100)}% success`;

  return (
    <AdminCard title="Tools health" description="In-memory extract diagnostics for this process. Not public.">
      <div className="space-y-3 text-sm">
        <p className="text-muted-foreground">{successRate}</p>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted-foreground">Requests</dt>
            <dd className="font-medium">{summary.total}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Failed</dt>
            <dd className="font-medium">{summary.failed}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Platform blocked</dt>
            <dd className="font-medium">{summary.platformBlocked}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Rate limited</dt>
            <dd className="font-medium">{summary.rateLimited}</dd>
          </div>
        </dl>
        {summary.byTool.length ? (
          <ul className="space-y-1">
            {summary.byTool.map((row) => (
              <li key={row.tool} className="flex justify-between gap-2 text-xs">
                <span className="min-w-0 truncate">{row.tool}</span>
                <span className="shrink-0 text-muted-foreground">
                  {row.success}/{row.total}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </AdminCard>
  );
}
