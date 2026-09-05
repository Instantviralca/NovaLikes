/**
 * Admin Dashboard view models — Document 12.02.
 * Widgets receive typed data; no real analytics yet.
 */

export type DashboardKpi = {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
};

export type DashboardQuickAction = {
  id: string;
  label: string;
  href: string;
};

export type DashboardOrderRow = {
  id: string;
  /** Customer-facing order number (01001) when available. */
  publicOrderId: string;
  customer: string;
  service: string;
  packageTitle: string;
  status: string;
  total: string;
  createdAt: string;
  href: string;
};

export type DashboardActivityItem = {
  id: string;
  message: string;
  at: string;
};

export type DashboardRevenueSummary = {
  today: string;
  month: string;
  currency: string;
};

export type DashboardSystemStatus = {
  id: string;
  label: string;
  status: 'operational' | 'degraded' | 'down' | 'unknown';
  detail?: string;
};

export type DashboardViewModel = {
  greeting: string;
  pendingReviewCount: number;
  dateLabel: string;
  kpis: DashboardKpi[];
  quickActions: DashboardQuickAction[];
  recentOrders: DashboardOrderRow[];
  pendingOrders: DashboardOrderRow[];
  activity: DashboardActivityItem[];
  revenue: DashboardRevenueSummary;
  systemStatus: DashboardSystemStatus[];
};
