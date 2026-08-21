# Author Dashboard / CMS

NovaLikes Learn public articles remain in `data/learn/articles/`. The Author Dashboard adds a **database CMS** beside that registry. Published CMS articles appear on `/learn/[slug]` using the **same** ArticlePage template. Drafts, scheduled-future, trash, and preview URLs are never indexed.

## What already existed

- Admin login at `/admin/login` (env password, HMAC cookie, CSRF)
- Static Learn registry + TipTap was **not** present (TipTap is now the author editor)
- No `cms_articles` / `cms_media` tables (added additively)

## Bootstrap an author

Never commit passwords.

```bash
npm run db:migrate:sql
CMS_AUTHOR_NAME="Jane Editor" CMS_AUTHOR_EMAIL="jane@novalikes.com" CMS_AUTHOR_PASSWORD="choose-a-long-password" npm run cms:create-author
```

Or create authors from Admin → Authors (`/admin/authors`) after signing in as the existing env admin.

## Local URLs

- http://localhost:3001/author/login
- http://localhost:3001/author
- http://localhost:3001/author/articles
- http://localhost:3001/author/articles/new
- http://localhost:3001/author/scheduled
- http://localhost:3001/author/media
- http://localhost:3001/admin/authors

## Scheduled publishing (Ubuntu cron)

The command is idempotent. Safe to run every minute:

```cron
* * * * * cd /var/www/novalikes && /usr/bin/npm run publish:scheduled >> /var/log/novalikes-publish-scheduled.log 2>&1
```

Adjust the app directory to the real Contabo path. Requires `DATABASE_URL` in the environment (systemd EnvironmentFile or dotenv via the script).

Do not use Vercel Cron.

## Environment

Existing secrets are reused:

- `DATABASE_URL` — required for production CMS
- `IV_ADMIN_SESSION_SECRET` / `SESSION_SECRET` — signs author sessions too
- `IV_ADMIN_PASSWORD` — existing admin dashboard (unchanged)

Optional:

- `CMS_MEDIA_DIR` — default `.data/cms-media`
- `CMS_MEDIA_PUBLIC_BASE_URL` — default `/api/cms/media/file`

## Roles

| Actor | Access |
| --- | --- |
| Env admin (`/admin/login`) | Orders, payments, settings, **and** `/admin/authors` plus `/author/*` |
| CMS author (`/author/login`) | Articles + media + profile only. Cannot call `/api/admin/*` |

Disabled authors lose login immediately (sessions revoked).

### Editorial calendar (Planned vs Scheduled)

Learn topics 1–26 already live in `data/learn/articles/` (the TS registry). They were never written into `cms_articles` because the original CMS prompt forbade auto-inserting the plan.

The Author Dashboard now shows the 30-topic editorial calendar:

- **Planned** — title, slug, intended date. Empty body. Never auto-published, never public, never in sitemap.
- **Scheduled** — author explicitly chose Schedule with a future UTC `publish_at` and publishable content. `npm run publish:scheduled` processes only these.

```bash
npm run author:import-editorial-plan
```

Dashboard pages also seed missing Planned rows on load (idempotent; never overwrites existing CMS or published Learn slugs).

### Local login rate-limit reset

Author login allows 5 failed attempts per IP per 15 minutes. Playwright QA can trip this.

Local development only:

```bash
npm run author:reset-login-rate-limit
```

This command refuses to run when `NODE_ENV=production`, `IV_ENV=production`, or `VERCEL_ENV=production`. It does not change the limiter itself.

`/author/` is noindex in the author layout and disallowed in robots.txt. Preview URLs (`/learn/preview/...`) remain noindex and robots-disallowed.
