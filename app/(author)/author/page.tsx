import Link from 'next/link';

import { EditorialCalendarList } from '@/components/author/editorial-calendar-list';
import { StatusBadge } from '@/components/author/status-badge';
import { Button } from '@/components/ui/button';
import { cmsListArticles } from '@/lib/cms/store';
import { seedEditorialPlan, getEditorialCalendarRows } from '@/lib/cms/seed-editorial-plan';

export default async function AuthorDashboardPage() {
  await seedEditorialPlan('system:editorial-plan');
  const articles = await cmsListArticles({ status: 'all' });
  const calendar = await getEditorialCalendarRows();
  const published = articles.filter((item) => item.status === 'published').length;
  const scheduled = articles.filter((item) => item.status === 'scheduled');
  const planned = articles.filter((item) => item.status === 'planned');
  const drafts = articles.filter((item) => item.status === 'draft').length;
  const upcomingCalendar = calendar.filter((item) => item.status !== 'trash');
  const recent = articles.filter((item) => item.status !== 'trash').slice(0, 8);

  const cards = [
    { label: 'Total Articles', value: articles.filter((item) => item.status !== 'trash').length },
    { label: 'Published', value: published },
    { label: 'Scheduled', value: scheduled.length },
    { label: 'Planned', value: planned.length },
    { label: 'Drafts', value: drafts },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button asChild>
          <Link href="/author/articles/new">New Article</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
            <p className="text-sm text-[#8A837C]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Upcoming Editorial Calendar</h2>
          <Button size="sm" variant="outline" asChild>
            <Link href="/author/scheduled">Full calendar</Link>
          </Button>
        </div>
        <EditorialCalendarList rows={upcomingCalendar} empty="No planned or scheduled topics yet." />
      </section>

      <section className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
        <h2 className="text-lg font-semibold">Scheduled for auto-publish</h2>
        {scheduled.length === 0 ? (
          <p className="mt-3 text-sm text-[#8A837C]">Nothing is queued for automatic publishing.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {[...scheduled]
              .sort((a, b) => (a.publishAt || '').localeCompare(b.publishAt || ''))
              .slice(0, 6)
              .map((article) => (
                <li key={article.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F7EFE7] pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-xs text-[#8A837C]">{(article.publishAt || '').replace('T', ' ').slice(0, 16)} UTC</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={article.status} />
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/author/articles/${article.id}`}>Edit</Link>
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
        <h2 className="text-lg font-semibold">Recent articles</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-[#8A837C]">Create your first article to get started.</p>
        ) : (
          <ul className="mt-4 divide-y">
            {recent.map((article) => (
              <li key={article.id} className="flex items-center justify-between py-3">
                <Link href={`/author/articles/${article.id}`} className="font-medium hover:underline">
                  {article.title}
                </Link>
                <StatusBadge status={article.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
