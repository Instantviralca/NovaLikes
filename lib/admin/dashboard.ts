import { allowMockPayments, isEmailConfigured } from '@/lib/config/env';
import { getCustomerOrderId } from '@/lib/orders/public-number';
import { listOrders } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import { formatMoney } from '@/lib/pricing/format';
import { isRemotePaymentConfigured } from '@/lib/settings/site-settings';
import type { DashboardViewModel } from '@/types/admin-dashboard';
import type { CurrencyCode } from '@/types/pricing';

/**
 * Admin dashboard view model — Document 12.02.
 */

export async function getDashboardViewModel(): Promise<DashboardViewModel> {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const monthKey = todayKey.slice(0, 7);
  const orders = (await listOrders()).filter(isEligibleForFulfilmentQueue);
  const remotePaymentsReady = await isRemotePaymentConfigured();

  const pending = orders.filter((o) => o.status === 'pending');
  const processing = orders.filter((o) => o.status === 'processing');
  const completedToday = orders.filter(
    (o) => o.status === 'completed' && o.updatedAt.startsWith(todayKey),
  );
  const revenueToday = orders
    .filter((o) => o.createdAt.startsWith(todayKey))
    .reduce((sum, o) => sum + o.total.amount, 0);
  const revenueMonth = orders
    .filter((o) => o.createdAt.startsWith(monthKey))
    .reduce((sum, o) => sum + o.total.amount, 0);

  const money = (amount: number) => formatMoney(amount, 'USD' as CurrencyCode, 'en');

  const toOrderRow = (o: (typeof orders)[number]) => {
    const item = o.items[0];
    const publicOrderId = getCustomerOrderId(o);
    return {
      id: o.id,
      publicOrderId,
      customer: o.guestEmail,
      service: item?.serviceName ?? 'Service',
      packageTitle: item?.packageTitle ?? 'Package',
      status: o.status,
      total: money(o.total.amount),
      createdAt: o.createdAt,
      href: '/admin/orders',
    };
  };

  return {
    greeting: 'Welcome back.',
    pendingReviewCount: pending.length,
    dateLabel: today.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    kpis: [
      { id: 'pending', label: 'Pending Orders', value: pending.length },
      { id: 'processing', label: 'Processing Orders', value: processing.length },
      { id: 'completed-today', label: 'Completed Today', value: completedToday.length },
      { id: 'revenue-today', label: "Today's Revenue", value: money(revenueToday) },
      { id: 'revenue-month', label: 'This Month Revenue', value: money(revenueMonth) },
      { id: 'total-orders', label: 'Paid Orders', value: orders.length },
    ],
    quickActions: [
      { id: 'orders', label: 'View Orders', href: '/admin/orders' },
      { id: 'analytics', label: 'View Analytics', href: '/admin/analytics' },
      { id: 'email', label: 'Email Campaigns', href: '/admin/email' },
      { id: 'service', label: 'Add Service', href: '/admin/services' },
      { id: 'pricing', label: 'Add Pricing Package', href: '/admin/pricing' },
      { id: 'coupon', label: 'Create Coupon', href: '/admin/coupons' },
      { id: 'learn', label: 'New Learn Article', href: '/admin/learn' },
      { id: 'settings', label: 'Site Settings', href: '/admin/settings' },
    ],
    recentOrders: orders.slice(0, 5).map(toOrderRow),
    pendingOrders: pending.slice(0, 5).map(toOrderRow),
    activity: orders.slice(0, 8).map((o) => ({
      id: o.id,
      message: `Order ${getCustomerOrderId(o)} · ${o.status}`,
      at: o.updatedAt,
    })),
    revenue: {
      today: money(revenueToday),
      month: money(revenueMonth),
      currency: 'USD',
    },
    systemStatus: [
      { id: 'website', label: 'Website Status', status: 'operational' },
      {
        id: 'payments',
        label: 'Payment Gateway',
        status: remotePaymentsReady || allowMockPayments() ? 'operational' : 'degraded',
        detail: remotePaymentsReady
          ? 'Remote payment URL configured'
          : allowMockPayments()
            ? 'Mock payments (dev)'
            : 'Set payment website URL in Settings',
      },
      {
        id: 'orders',
        label: 'Order Store',
        status: 'operational',
        detail: `${orders.length} paid orders in queue`,
      },
      {
        id: 'email',
        label: 'Email Delivery',
        status: isEmailConfigured() ? 'operational' : 'degraded',
        detail: isEmailConfigured()
          ? 'Resend configured'
          : 'RESEND_API_KEY / EMAIL_FROM missing',
      },
    ],
  };
}
