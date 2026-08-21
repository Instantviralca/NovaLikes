import { EditorialCalendarList } from '@/components/author/editorial-calendar-list';
import { ScheduledArticleActions } from '@/components/author/scheduled-article-actions';
import { StatusBadge } from '@/components/author/status-badge';
import { cmsGetUserById, cmsListArticles } from '@/lib/cms/store';
import { getEditorialCalendarRows, seedEditorialPlan } from '@/lib/cms/seed-editorial-plan';

export default async function ScheduledArticlesPage() {
  await seedEditorialPlan('system:editorial-plan');
  const scheduled = (await cmsListArticles({ status: 'scheduled' })).sort((a, b) =>
    (a.publishAt || '').localeCompare(b.publishAt || ''),
  );
  const calendar = (await getEditorialCalendarRows()).filter((row) => row.status === 'planned');
  const rows = await Promise.all(
    scheduled.map(async (article) => {
      const author = article.authorId ? await cmsGetUserById(article.authorId) : null;
      return { ...article, authorName: author?.name ?? 'Admin' };
    }),
  );

  const byDay = new Map<string, typeof rows>();
  for (const article of rows) {
    const day = (article.publishAt || '').slice(0, 10) || 'unscheduled';
    const list = byDay.get(day) ?? [];
    list.push(article);
    byDay.set(day, list);
  }

  const plannedByDay = new Map<string, typeof calendar>();
  for (const item of calendar) {
    const list = plannedByDay.get(item.intendedPublishOn) ?? [];
    list.push(item);
    plannedByDay.set(item.intendedPublishOn, list);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Editorial Calendar</h1>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Scheduled for Auto-Publish</h2>
          <p className="text-sm text-[#8A837C]">Only these records can be processed by npm run publish:scheduled.</p>
        </div>
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#F0E4D8] bg-white p-8 text-sm text-[#8A837C]">
            No articles are queued for automatic publishing.
          </p>
        ) : (
          <div className="space-y-6">
            {[...byDay.entries()].map(([day, items]) => (
              <section key={day} className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
                <h3 className="font-semibold">{day}</h3>
                <ul className="mt-3 space-y-3">
                  {items.map((article) => (
                    <li key={article.id} className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{article.title}</p>
                        <p className="text-xs text-[#8A837C]">
                          {(article.publishAt || '').replace('T', ' ').slice(11, 16)} UTC · {article.authorName}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={article.status} />
                        <ScheduledArticleActions id={article.id} slug={article.slug} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Planned Content Calendar</h2>
          <p className="text-sm text-[#8A837C]">
            Target dates only. Planned items never auto-publish, never appear on /learn, and never enter the sitemap.
          </p>
        </div>
        {calendar.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#F0E4D8] bg-white p-8 text-sm text-[#8A837C]">
            No planned topics. Existing Learn articles are listed on the dashboard as Published.
          </p>
        ) : (
          <div className="space-y-6">
            {[...plannedByDay.entries()].map(([day, items]) => (
              <section key={day} className="rounded-2xl border border-[#F0E4D8] bg-white p-5">
                <h3 className="font-semibold">{day}</h3>
                <EditorialCalendarList rows={items} empty="" />
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
