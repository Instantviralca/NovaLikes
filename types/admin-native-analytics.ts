/**
 * Admin native first-party analytics view model.
 */

export type NativeAnalyticsRangeId =
  | 'today'
  | 'yesterday'
  | '7d'
  | '30d'
  | '90d'
  | 'custom';

export type NativeKpiCard = {
  id: string;
  label: string;
  value: string | number;
  previousValue?: string | number | null;
  changePct: number | null;
};

export type NativeFunnelStage = {
  id: 'landing' | 'cart' | 'checkout' | 'order_created' | 'paid';
  label: string;
  sessions: number;
  conversionFromPrevious: number | null;
  pctOfLandings: number | null;
  dropOffFromPrevious: number | null;
};

export type NativeSeriesPoint = {
  key: string;
  label: string;
  visitors: number;
  sessions: number;
  pageViews: number;
  paidOrders: number;
  revenueUsdMinor: number;
};

export type NativeTableRow = {
  key: string;
  label: string;
  sessions: number;
  visitors?: number;
  pageViews?: number;
  paidOrders?: number;
  revenueUsdMinor?: number;
};

export type NativeRecentActivity = {
  windowMinutes: number;
  sessions: number;
  pageViews: number;
  cartAdds: number;
  checkouts: number;
  paidOrders: number;
};

export type NativeAnalyticsViewModel = {
  range: NativeAnalyticsRangeId;
  rangeLabel: string;
  timezoneLabel: 'UTC';
  sinceIso: string;
  untilIso: string;
  customFrom?: string;
  customTo?: string;
  kpis: NativeKpiCard[];
  secondaryKpis: NativeKpiCard[];
  funnel: NativeFunnelStage[];
  series: NativeSeriesPoint[];
  acquisition: NativeTableRow[];
  services: NativeTableRow[];
  markets: NativeTableRow[];
  devices: NativeTableRow[];
  recent: NativeRecentActivity;
  eventCount: number;
  storageDriver: string;
  preUpgradeNotice?: string;
  setupNotice?: string;
};
