import { ActivityFeed } from '@/components/admin/dashboard/activity-feed';
import { KPIGrid } from '@/components/admin/dashboard/kpi-grid';
import { PendingOrdersWidget } from '@/components/admin/dashboard/pending-orders-widget';
import { QuickActions } from '@/components/admin/dashboard/quick-actions';
import { RecentOrdersTable } from '@/components/admin/dashboard/recent-orders-table';
import { RevenueWidget } from '@/components/admin/dashboard/revenue-widget';
import { SystemStatusWidget } from '@/components/admin/dashboard/system-status-widget';
import { ToolsHealthWidget } from '@/components/admin/dashboard/tools-health-widget';
import { WelcomeBanner } from '@/components/admin/dashboard/welcome-banner';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import type { DashboardViewModel } from '@/types/admin-dashboard';

type DashboardPageProps = {
  data: DashboardViewModel;
  loading?: boolean;
};

/**
 * Admin Dashboard — Document 12.02.
 * Typed widgets only; no real analytics charts yet.
 */
export function DashboardPage({ data, loading }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Operational overview for manual order fulfillment."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <WelcomeBanner
          greeting={data.greeting}
          dateLabel={data.dateLabel}
          pendingReviewCount={data.pendingReviewCount}
        />
        <QuickActions actions={data.quickActions} />
      </div>

      <KPIGrid kpis={data.kpis} loading={loading} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <RecentOrdersTable orders={data.recentOrders} loading={loading} />
        <div className="space-y-6">
          <PendingOrdersWidget orders={data.pendingOrders} loading={loading} />
          <ActivityFeed items={data.activity} loading={loading} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RevenueWidget revenue={data.revenue} loading={loading} />
        <SystemStatusWidget items={data.systemStatus} />
      </div>
      <ToolsHealthWidget />
    </div>
  );
}
