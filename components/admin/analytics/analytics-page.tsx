import Link from 'next/link';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { cn } from '@/lib/utils';
import type {
  NativeAnalyticsRangeId,
  NativeAnalyticsViewModel,
  NativeSeriesPoint,
  NativeTableRow,
} from '@/types/admin-native-analytics';

const RANGES: Array<{ id: NativeAnalyticsRangeId; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '90d', label: '90 days' },
];

type AnalyticsPageProps = {
  data: NativeAnalyticsViewModel;
};

function formatChange(changePct: number | null): string | undefined {
  if (changePct === null) return undefined;
  const sign = changePct > 0 ? '+' : '';
  return `${sign}${changePct}% vs prior`;
}

function money(minor: number | undefined): string {
  return `$${((minor ?? 0) / 100).toFixed(2)}`;
}

function SimpleBars({
  series,
  valueKey,
  label,
}: {
  series: NativeSeriesPoint[];
  valueKey: keyof Pick<
    NativeSeriesPoint,
    'visitors' | 'sessions' | 'pageViews' | 'paidOrders' | 'revenueUsdMinor'
  >;
  label: string;
}) {
  if (series.length === 0) {
    return (
      <AdminEmptyState title={`No ${label.toLowerCase()} yet`} description="Data will appear after traffic is tracked." />
    );
  }
  const values = series.map((p) => Number(p[valueKey]) || 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  if (total === 0) {
    return (
      <AdminEmptyState
        title={`No ${label.toLowerCase()} in this range`}
        description="Bars appear when this metric has non-zero values."
      />
    );
  }
  const max = Math.max(...values, 1);
  return (
    <div className="space-y-2" aria-label={label}>
      <div className="flex h-40 items-end gap-0.5 overflow-x-auto rounded-lg border bg-muted/20 p-3">
        {series.map((point) => {
          const value = Number(point[valueKey]) || 0;
          const height = value > 0 ? Math.max((value / max) * 100, 6) : 0;
          return (
            <div
              key={`${valueKey}-${point.key}`}
              className="flex min-w-[8px] flex-1 flex-col items-center justify-end"
              title={`${point.label}: ${valueKey === 'revenueUsdMinor' ? money(value) : value}`}
            >
              <div
                className="w-full rounded-t bg-foreground/80"
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {series[0]?.label} → {series[series.length - 1]?.label} · {label}
      </p>
    </div>
  );
}

function DataTable({
  title,
  rows,
  emptyTitle,
}: {
  title: string;
  rows: NativeTableRow[];
  emptyTitle: string;
}) {
  return (
    <section aria-label={title} className="space-y-3">
      <h2 className="text-sm font-semibold">{title}</h2>
      {rows.length === 0 ? (
        <AdminEmptyState title={emptyTitle} description="No rows for this range." />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium tabular-nums">Sessions</th>
                <th className="px-3 py-2 font-medium tabular-nums">Visitors</th>
                <th className="px-3 py-2 font-medium tabular-nums">Page views</th>
                <th className="px-3 py-2 font-medium tabular-nums">Paid</th>
                <th className="px-3 py-2 font-medium tabular-nums">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-3 py-2 font-medium">{row.label}</td>
                  <td className="px-3 py-2 tabular-nums">{row.sessions}</td>
                  <td className="px-3 py-2 tabular-nums">{row.visitors ?? 0}</td>
                  <td className="px-3 py-2 tabular-nums">{row.pageViews ?? 0}</td>
                  <td className="px-3 py-2 tabular-nums">{row.paidOrders ?? 0}</td>
                  <td className="px-3 py-2 tabular-nums">{money(row.revenueUsdMinor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        description="First-party operational funnel — visitors, sessions, conversion, and revenue (UTC)."
      />

      {data.setupNotice ? (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {data.setupNotice}
        </div>
      ) : null}
      {data.preUpgradeNotice ? (
        <div
          className="rounded-lg border border-sky-300 bg-sky-50 px-4 py-3 text-sm text-sky-950"
          role="status"
        >
          {data.preUpgradeNotice}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap rounded-lg border p-1" role="group" aria-label="Date range">
          {RANGES.map((range) => (
            <Link
              key={range.id}
              href={`/admin/analytics?range=${range.id}`}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                data.range === range.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {range.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {data.rangeLabel} · {data.timezoneLabel} · {data.eventCount} events · store:{' '}
          {data.storageDriver}
        </p>
      </div>

      <section aria-label="Primary KPIs">
        <h2 className="mb-3 text-sm font-semibold">Overview</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.kpis.map((card) => (
            <AdminStatCard
              key={card.id}
              label={card.label}
              value={card.value}
              trend={formatChange(card.changePct)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Secondary KPIs">
        <h2 className="mb-3 text-sm font-semibold">Cart & checkout</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.secondaryKpis.map((card) => (
            <AdminStatCard
              key={card.id}
              label={card.label}
              value={card.value}
              trend={formatChange(card.changePct)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Funnel" className="space-y-3">
        <h2 className="text-sm font-semibold">Funnel (native sessions)</h2>
        <p className="text-xs text-muted-foreground">
          Reach-based distinct sessions from analytics_sessions. Service and Cart can be skipped —
          &quot;from previous&quot; is omitted when a later stage exceeds the prior stage.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {data.funnel.map((stage) => (
            <AdminStatCard
              key={stage.id}
              label={stage.label}
              value={stage.sessions}
              trend={
                [
                  stage.conversionFromPrevious !== null
                    ? `${stage.conversionFromPrevious}% from previous`
                    : null,
                  stage.pctOfLandings !== null ? `${stage.pctOfLandings}% of landings` : null,
                  stage.dropOffFromPrevious !== null
                    ? `${stage.dropOffFromPrevious}% drop-off`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ') || undefined
              }
            />
          ))}
        </div>
      </section>

      <section aria-label="Traffic charts" className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Visitors / sessions / page views</h2>
          <p className="text-xs text-muted-foreground">
            Sessions/visitors use analytics_sessions. Page views include historical page_view rows.
          </p>
          <SimpleBars series={data.series} valueKey="visitors" label="Visitors by period" />
          <SimpleBars series={data.series} valueKey="sessions" label="Sessions by period" />
          <SimpleBars series={data.series} valueKey="pageViews" label="Page views by period" />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Paid orders & revenue</h2>
          <SimpleBars series={data.series} valueKey="paidOrders" label="Paid orders by period" />
          <SimpleBars series={data.series} valueKey="revenueUsdMinor" label="Revenue by period" />
        </div>
      </section>

      <section aria-label="Recent activity" className="space-y-3">
        <h2 className="text-sm font-semibold">Last {data.recent.windowMinutes} minutes</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <AdminStatCard label="Sessions" value={data.recent.sessions} />
          <AdminStatCard label="Page views" value={data.recent.pageViews} />
          <AdminStatCard label="Cart adds" value={data.recent.cartAdds} />
          <AdminStatCard label="Checkouts" value={data.recent.checkouts} />
          <AdminStatCard label="Paid orders" value={data.recent.paidOrders} />
        </div>
      </section>

      <DataTable title="Acquisition" rows={data.acquisition} emptyTitle="No acquisition data yet" />
      <DataTable title="Services" rows={data.services} emptyTitle="No service traffic yet" />
      <DataTable title="Markets" rows={data.markets} emptyTitle="No market data yet" />
      <DataTable title="Devices" rows={data.devices} emptyTitle="No device data yet" />
    </div>
  );
}
