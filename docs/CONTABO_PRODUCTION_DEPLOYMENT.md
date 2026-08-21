# NovaLikes — Contabo Ubuntu VPS production deployment

This is the next-step runbook for **https://novalikes.com** on a self-managed Contabo Ubuntu VPS.

Do **not** invent IPs, passwords, or DNS records. Replace placeholders.

This document does **not** mean the server was already deployed.

Canonical public hostname: **novalikes.com**  
Redirect: **www.novalikes.com → novalikes.com** (one hop)

Application process: Next.js on **127.0.0.1:3000** only (Nginx terminates HTTP/HTTPS).

---

## Actual project stack (verified in repo)

| Item | Value |
| --- | --- |
| App | Next.js `^15.5.7` + React 19 |
| Node | `>=20.9.0` (`package.json` engines) |
| Package manager | npm (`package-lock.json`) |
| Production start | `npm run start:prod` → `next start -H 127.0.0.1 -p 3000` |
| ORM | Drizzle ORM + `postgres` driver |
| Migrations | `drizzle/0001_init.sql` … `drizzle/0006_cms_planned_calendar.sql` via `npm run db:migrate:sql` |
| CMS | PostgreSQL required in production; local JSON `.data/cms-store.json` is **dev-only** |
| Orders / contacts / sessions | PostgreSQL (`lib/persistence`) |
| Payments | Remote Woo collector (`remote-payment`); Stripe optional/unused for checkout |
| Email | SMTP (`SMTP_HOST`) and/or Resend (`RESEND_API_KEY`) |
| CMS media | Local filesystem (`CMS_MEDIA_DIR`) — **not** S3 in current code |
| Process manager | PM2 (`ecosystem.config.cjs`) |
| Reverse proxy | Nginx (`deploy/nginx/novalikes.conf`) |
| Scheduled publish | `npm run publish:scheduled` + Ubuntu cron |

Do **not** run `npx drizzle-kit migrate` on an empty server: this repo has SQL files only (no `drizzle/meta` journal). Use `npm run db:migrate:sql`.

---

## Placeholders used below

```
DEPLOY_USER=deploy
APP_DIR=/var/www/novalikes
DB_NAME=novalikes
DB_USER=novalikes
DB_PASSWORD=REPLACE_WITH_STRONG_DB_PASSWORD
ADMIN_PASSWORD=REPLACE_WITH_STRONG_ADMIN_PASSWORD
SESSION_SECRET=REPLACE_WITH_64_PLUS_HEX
AUTHOR_EMAIL=editor@novalikes.com
AUTHOR_PASSWORD=REPLACE_WITH_STRONG_AUTHOR_PASSWORD
PAYMENT_COLLECTOR_URL=https://YOUR-PAYMENT-COLLECTOR.EXAMPLE
NODE_MAJOR=20
```

Never commit those values.

---

## 1. Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y build-essential git curl ufw nginx
```

## 2. Create deployment user

```bash
sudo adduser --disabled-password --gecos "" "$DEPLOY_USER"
sudo usermod -aG sudo "$DEPLOY_USER"
sudo mkdir -p "$APP_DIR" /var/lib/novalikes/cms-media /var/log/novalikes
sudo chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR" /var/lib/novalikes /var/log/novalikes
```

## 3. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status
```

Do **not** expose PostgreSQL (`5432`) or Next.js (`3000`) to the public internet.

## 4. Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # expect v20.x
npm -v
```

## 5. Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

## 6. Create NovaLikes database and user

```bash
sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';"
sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"
```

Confirm local TCP:

```bash
sudo -u postgres psql -c "SELECT version();"
```

`DATABASE_URL` on this VPS:

```
postgresql://DB_USER:DB_PASSWORD@127.0.0.1:5432/novalikes
```

If the password contains `@`, `:`, `/`, or `#`, URL-encode it.

## 7. Clone or upload the application

```bash
sudo -u "$DEPLOY_USER" git clone REPLACE_WITH_GIT_REMOTE "$APP_DIR"
cd "$APP_DIR"
```

If git remotes are not used, upload the release tree (including `package-lock.json` and `drizzle/*.sql`) into `$APP_DIR`. Do **not** upload `.env.local`, `.data/`, or `node_modules`.

## 8. Production environment

```bash
cd "$APP_DIR"
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production
```

Required before `next start`:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL=https://novalikes.com`
- `IV_ADMIN_PASSWORD`
- `IV_ADMIN_SESSION_SECRET`

Strongly set before checkout goes live:

- `REMOTE_PAYMENT_WEBSITE_URL`
- `CMS_MEDIA_DIR=/var/lib/novalikes/cms-media`
- `TOOLS_MEDIA_SECRET`

Email can wait for the later Postfix phase. Until then, order emails are skipped (logged, not faked).

**Forbidden in production:**

```
IV_PAYMENTS_MODE=mock
IV_ALLOW_FILE_STORE=1
IV_PERSISTENCE=memory
IV_SKIP_ENV_GUARD=1
```

Verify (does not print secret values):

```bash
cd "$APP_DIR"
set -a
source .env.production
set +a
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
```

## 9. Install dependencies and run migrations

```bash
cd "$APP_DIR"
npm ci
set -a && source .env.production && set +a
npm run db:migrate:sql
```

Expected SQL order (idempotent `IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS`):

1. `drizzle/0001_init.sql`
2. `drizzle/0002_site_settings.sql`
3. `drizzle/0003_analytics_events.sql`
4. `drizzle/0004_email_subscribers.sql`
5. `drizzle/0005_cms_author_dashboard.sql`
6. `drizzle/0006_cms_planned_calendar.sql`

Re-running `npm run db:migrate:sql` skips already-applied files via `schema_migrations`.

Do **not** drop or reset the database.

## 10. Import editorial plan

26 Learn articles already live in `data/learn/articles/` (TypeScript registry). **Do not duplicate them in PostgreSQL.**

Import only missing Planned CMS rows (idempotent):

```bash
cd "$APP_DIR"
set -a && source .env.production && set +a
npm run author:import-editorial-plan
```

Safe to run more than once. It will not overwrite published content or import disposable QA authors/articles.

## 11. Create production admin / author

Admin login uses `IV_ADMIN_PASSWORD` (env). There is no default production password.

Create the first Author Dashboard user (password is never logged):

```bash
cd "$APP_DIR"
set -a && source .env.production && set +a
CMS_AUTHOR_NAME="Najaf Khan" \
CMS_AUTHOR_EMAIL="$AUTHOR_EMAIL" \
CMS_AUTHOR_PASSWORD="$AUTHOR_PASSWORD" \
CMS_AUTHOR_ROLE=author \
npm run author:create
```

To rotate later: `CMS_AUTHOR_RESET=1 npm run author:create`

Do **not** import local QA emails/passwords from `.data/cms-store.json`.

## 12. Build the app

```bash
cd "$APP_DIR"
set -a && source .env.production && set +a
rm -rf .next
npm run build
```

`instrumentation.ts` skips throwing during `next build` so compilation can succeed before process start. Runtime (`next start`) **fails fast** if `DATABASE_URL` / admin secrets / HTTPS site URL are missing.

## 13. Start with PM2

```bash
sudo npm i -g pm2
cd "$APP_DIR"
set -a && source .env.production && set +a
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u "$DEPLOY_USER" --hp "/home/${DEPLOY_USER}"
```

Confirm bind:

```bash
ss -lntp | grep 3000
# expect 127.0.0.1:3000 only
curl -sS http://127.0.0.1:3000/api/health
# {"ok":true}
```

Logs:

```bash
pm2 logs novalikes --lines 100
```

Do not log passwords, session tokens, or full payment payloads. App logs already omit those.

## 14. Configure Nginx

```bash
sudo cp "$APP_DIR/deploy/nginx/novalikes.conf" /etc/nginx/sites-available/novalikes
sudo ln -sf /etc/nginx/sites-available/novalikes /etc/nginx/sites-enabled/novalikes
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Leave Next.js bound to localhost. Nginx listens on 80 (then 443 after Certbot).

## 15. DNS

At the domain registrar / DNS host (not guessed here):

- `A` `novalikes.com` → Contabo VPS public IPv4
- `A` `www.novalikes.com` → same IPv4
- optional `AAAA` if you use IPv6

Wait until both hostnames resolve before Certbot.

## 16. Certbot SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d novalikes.com -d www.novalikes.com
```

After certificates exist, confirm:

- `https://novalikes.com` is canonical
- `https://www.novalikes.com` redirects once to `https://novalikes.com`
- `NEXT_PUBLIC_SITE_URL=https://novalikes.com`

Cookies (`Secure`, `HttpOnly`, `SameSite=Lax`) activate when `NODE_ENV=production`.

## 17. Scheduled publishing cron

Only **Scheduled** articles with `publishAt <= now` and a real body can auto-publish. Planned / draft / trash never auto-publish. Overlapping runs skip via lock file.

```bash
sudo crontab -u "$DEPLOY_USER" -e
```

Add:

```cron
* * * * * cd /var/www/novalikes && set -a && . /var/www/novalikes/.env.production && set +a && /usr/bin/npm run publish:scheduled >> /var/log/novalikes/publish.log 2>&1
```

If `npm` is not `/usr/bin/npm`, use `command -v npm` on the server and put that path in cron.

Confirm:

```bash
tail -n 50 /var/log/novalikes/publish.log
```

## 18. Email / Postfix (later mail phase)

Do **not** install or harden Postfix in this step unless that phase has started.

When ready, typical app config for a trusted local relay:

```
SMTP_HOST=127.0.0.1
SMTP_PORT=25
SMTP_SECURE=false
EMAIL_FROM=NovaLikes <orders@novalikes.com>
ADMIN_EMAIL=ops@novalikes.com
```

Leave `SMTP_USER` / `SMTP_PASS` empty for localhost relay. Do not hardcode Gmail. There is no public unauthenticated email test route.

Then restart:

```bash
pm2 restart novalikes
```

## 19. Production smoke test

From your laptop (after DNS/TLS):

1. `https://novalikes.com/` loads
2. `https://novalikes.com/api/health` → `{"ok":true}`
3. `https://novalikes.com/robots.txt` and `/sitemap.xml`
4. `https://novalikes.com/learn` is English-only
5. `https://novalikes.com/es/learn` redirects to `/learn`
6. Localized home (`/es`, `/de`, `/fr`, `/it`, `/pt-br`, `/ar`) loads; `/ar` is RTL
7. `/cart` and `/checkout` stay on novalikes.com (same origin)
8. `/admin/login` and `/author/login` require credentials
9. A Learn article from the TypeScript registry renders
10. Tools pages load; they must not invent successful downloads if a platform blocks extraction

## 20. Manual payment test (after collector URL is set)

Do **not** script a live charge from this repo.

1. Set `REMOTE_PAYMENT_WEBSITE_URL` or Admin → Settings payment website (HTTPS collector).
2. Add one cheap live package to cart on https://novalikes.com/cart
3. Checkout → remote collector
4. Complete **one** small real payment you control
5. Confirm:
   - webhook `POST https://novalikes.com/api/webhooks/remote-payment`
   - `/order-success`
   - `/track-order` lookup
   - Admin → Orders shows paid
   - customer/admin email if SMTP/Resend is configured
6. Refund/cancel that test order in the collector if appropriate

There is no mock-paid path in production (`IV_PAYMENTS_MODE=mock` is rejected).

## 21. Search Console

1. Verify https://novalikes.com
2. Submit `https://novalikes.com/sitemap.xml`
3. Inspect home, a service page, `/learn`, and one article

---

## Recurring backups (configure after go-live)

Daily PostgreSQL dump (keep 14 days):

```bash
sudo mkdir -p /var/backups/novalikes
sudo crontab -e
```

```cron
15 3 * * * sudo -u postgres pg_dump -Fc novalikes > /var/backups/novalikes/novalikes-$(date +\%F).dump
0 4 * * * find /var/backups/novalikes -name 'novalikes-*.dump' -mtime +14 -delete
```

Also back up:

- `/var/lib/novalikes/cms-media` (CMS uploads)
- application release at `$APP_DIR` (git tag or tarball)
- `.env.production` **offline only** (password manager / encrypted disk). Never Git.

---

## Useful commands

| Action | Command |
| --- | --- |
| Verify env | `IV_VERIFY_AS_PRODUCTION=1 npm run env:verify` |
| Migrate | `npm run db:migrate:sql` |
| Editorial plan | `npm run author:import-editorial-plan` |
| Author bootstrap | `npm run author:create` (alias: `npm run cms:create-author`) |
| Build | `npm run build` |
| Start (manual) | `npm run start:prod` |
| Publish due articles | `npm run publish:scheduled` |
| Health | `curl http://127.0.0.1:3000/api/health` |

---

## What must not be copied into production

- `.data/cms-store.json` (local CMS file store + QA authors/sessions)
- Disposable QA articles/media from local author QA
- `IV_PAYMENTS_MODE=mock`
- Localhost URLs in `NEXT_PUBLIC_SITE_URL`
- Development admin passwords from `.env.local`

Legitimate:

- 26 TypeScript Learn registry articles (already in git)
- 30-topic editorial plan (`lib/cms/editorial-plan.ts`)
- 4 remaining Planned CMS topics created by `author:import-editorial-plan`
