import { AnalyticsPage } from '@/components/admin/analytics/analytics-page';
import { getNativeAnalyticsViewModel } from '@/lib/admin/native-analytics/overview';

type AdminAnalyticsRouteProps = {
  searchParams?: Promise<{ range?: string; from?: string; to?: string }>;
};

export default async function AdminAnalyticsRoute({ searchParams }: AdminAnalyticsRouteProps) {
  const params = searchParams ? await searchParams : {};
  const data = await getNativeAnalyticsViewModel({
    range: params.range,
    from: params.from,
    to: params.to,
  });
  return <AnalyticsPage data={data} />;
}
