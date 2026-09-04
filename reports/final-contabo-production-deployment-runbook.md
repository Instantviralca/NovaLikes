# Final Contabo production deployment runbook

**Project:** NovaLikes (`C:\Users\HUSSNAIN.COM\Novalikes`)  
**Mode:** AUDIT ONLY — no production code changes, no Contabo connection, no migrations executed, no commit/push/deploy.  
**Date:** 2026-09-04  
**Canonical domain:** `https://novalikes.com`

---

## Final verdict

### **B. READY AFTER ENV / EXTERNAL CONFIG**

Application code (Mollie remote-payment, production testmode guard on `NODE_ENV === "production"`, cart recovery `0007`, Stripe paused) is deployment-ready from this repo audit.

Go-live still depends on Contabo-side items that cannot be confirmed from local repo alone:

- Existing PostgreSQL `DATABASE_URL` + **pre-migration backup**
- Production `.env` secrets (never overwrite from git)
- Live remote Mollie collector URL + matching shared secret + collector `testmode: false`
- Email transport for order + cart-recovery mail
- Cron for cart recovery (+ existing publish:scheduled)
- Nginx/HTTPS/`[::1]:3000` binding verification on the live host

No **code follow-up** is required for the payment/cart-recovery safety work already landed. Do not treat optional polish as blockers.

---

## Executive return summary

| # | Item | Result |
| --- | --- | --- |
| 1 | Production readiness verdict | **B. READY AFTER ENV / EXTERNAL CONFIG** |
| 2 | P0 blockers | See §29 |
| 3 | P1 blockers | See §29 |
| 4 | P2 notes | See §29 |
| 5 | Node/npm | Node `>=20.9.0`; npm unconstrained; lockfile v3 |
| 6 | Exact install | `npm ci` |
| 7 | Exact migration | `npm run db:migrate:sql` |
| 8 | DB backup | **Required before migrations** (template below) |
| 9 | Required NovaLikes env names | See §4 |
| 10 | Must remain unset | See §5 |
| 11 | Mollie | Components on NovaLikes; charge on collector; signed webhook |
| 12 | Remote collector | `REMOTE_PAYMENT_WEBSITE_URL` + shared secret ≥16 |
| 13 | Stripe paused | `enabled: false`; keep all `STRIPE_*` unset |
| 14 | Email | SMTP preferred, else Resend; optional for boot, required for mail QA |
| 15 | Cart recovery | DB + pepper + cron secret + processor + email |
| 16 | Recommended cron | **CLI** `npm run cart-recovery:process` every 5–10 min |
| 17 | Build | `npm run build` |
| 18 | Start/restart | PM2 app `novalikes` / `npm run start:prod` |
| 19 | PM2 | `ecosystem.config.cjs` → name `novalikes`, localhost:3000 |
| 20 | Nginx | Template `deploy/nginx/novalikes.conf` — **VERIFY ON CONTABO** |
| 21 | Smoke tests | §23 |
| 22 | Live payment QA | §24 |
| 23 | Cart recovery QA | §25 |
| 24 | Rollback | §27 |
| 25 | Ordered Contabo runbook | §28 PHASE A–L |
| 26 | Files changed | **This report only** |
| 27 | NO COMMIT | Confirmed |
| 28 | NO PUSH | Confirmed |
| 29 | NO DEPLOY | Confirmed |

Local payment/cart-recovery unit tests re-checked during audit: **19/19 passed**. Full suite last known: **626 passed | 36 skipped**; lint/tsc/build previously PASS (no code changes in this audit).

---

## 1. Production entrypoint (exact repo commands)

| Action | Exact command | Source |
| --- | --- | --- |
| Install (prod) | `npm ci` | Contabo docs + lockfile present |
| Env verify | `IV_VERIFY_AS_PRODUCTION=1 npm run env:verify` | `package.json` → `scripts/verify-production-env.ts` |
| Migrate | `npm run db:migrate:sql` | → `npx tsx scripts/apply-migrations.ts` |
| Alternate migrate (same) | `npx tsx scripts/apply-migrations.ts` | same script |
| Drizzle-kit migrate | `npm run db:migrate` | **exists** but Contabo runbook uses **SQL apply** script — prefer `db:migrate:sql` |
| Build | `npm run build` | `next build` |
| Clear Next cache (Contabo habit) | `rm -rf .next` then `npm run build` | Contabo doc |
| Start (generic) | `npm run start` | `next start` — **not preferred** for Contabo bind |
| Start (Contabo-aligned) | `npm run start:prod` | `next start -H localhost -p 3000` |
| PM2 start | `pm2 start ecosystem.config.cjs` | `ecosystem.config.cjs` |
| Cart recovery CLI | `npm run cart-recovery:process` | → `scripts/process-cart-recovery.ts` |
| Cart recovery HTTP | `POST /api/internal/cart-recovery/process` | Bearer / `x-cron-secret` |
| Scheduled publish | `npm run publish:scheduled` | existing Contabo cron |
| Lint / test / typecheck | `npm run lint` · `npm test` · `npx tsc --noEmit` | local QA |

**Do not invent:** Docker Compose, systemd unit files — **absent** from repo. Process manager is PM2 via `ecosystem.config.cjs`.

---

## 2. Node / package requirements

| Item | Value |
| --- | --- |
| Node | `engines.node`: **`>=20.9.0`** |
| npm | No engines constraint |
| Package manager | **npm** |
| Lockfile | **`package-lock.json` present** (lockfileVersion 3) |
| Production install | **`npm ci`** (supported) |
| Native deps | Next optional **`sharp`** (override `0.35.3`) + platform SWC; Contabo should install on Linux so optional binaries resolve. Contabo docs mention `build-essential`. |

**Mismatch flags**

- Contabo doc Next version table may lag `package.json` (`next@15.5.23`).
- Root `DEPLOYMENT.md` still Stripe/Vercel-oriented — prefer Contabo + `.env.production.example` for this architecture.
- Contabo migration list in older docs may stop at `0006`; repo includes **`0007_cart_recovery.sql`**.

---

## 3. Production env inventory

Do **not** print secret values. Classification of every runtime-relevant name found in code / env templates.

### A. Core

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `NODE_ENV` | REQUIRED | SERVER | Production mode; Mollie testmode reject | Wrong mode weakens guards | literal `production` |
| `NEXT_PUBLIC_SITE_URL` | REQUIRED | PUBLIC | Canonical site origin | `validateEnv` error; bad redirects | HTTPS URL |
| `SITE_URL` | OPTIONAL alias | SERVER | Alias for site URL | Falls back to NEXT_PUBLIC | HTTPS URL |
| `NEXT_PUBLIC_CHECKOUT_URL` | IGNORE | PUBLIC | Documented ignored | None | — |
| `IV_ENV` | MUST BE UNSET (prod) | SERVER | Test exemption for `isProductionRuntime` | Payment guard no longer uses it; other paths might | never `test` on Contabo |
| `IV_SKIP_ENV_GUARD` | MUST BE UNSET | SERVER | Skip env throw in instrumentation | Boot with missing config | never `1` |
| `IV_VERIFY_AS_PRODUCTION` | VERIFY TOOL ONLY | SERVER | Forces verify script rules | — | set only for `env:verify` |

### B. Database

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `DATABASE_URL` | REQUIRED | SERVER | Postgres (existing Contabo) | Hard fail migrate + app | `postgresql://…` |
| `IV_PERSISTENCE` | MUST BE UNSET / not `memory` | SERVER | Persistence driver | Prod error if `memory` | — |
| `IV_ALLOW_FILE_STORE` | MUST BE UNSET | SERVER | File store | Prod error if `1` | — |

### C. Admin / session

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `IV_ADMIN_PASSWORD` | REQUIRED | SERVER | Admin login | Prod error | strong secret |
| `ADMIN_PASSWORD` | OPTIONAL alias | SERVER | Alias | — | secret |
| `IV_ADMIN_SESSION_SECRET` | REQUIRED | SERVER | Signed admin cookie | Prod error | long random |
| `SESSION_SECRET` / `IV_SHARED_SECRET` | OPTIONAL aliases | SERVER | Session aliases | — | secret |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED` | OPTIONAL | PUBLIC | UI hint | Admin UX only | `true` |

### D–E. Payments / Mollie remote collector

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `REMOTE_PAYMENT_WEBSITE_URL` | REQUIRED for checkout | SERVER | Collector base URL | Checkout cannot charge | HTTPS URL → `<LIVE_REMOTE_COLLECTOR_URL>` |
| `REMOTE_PAYMENT_SHARED_SECRET` | REQUIRED for checkout | SERVER | HMAC (≥16) | Warning at boot; checkout disabled until set (env or Admin Settings) | shared secret |
| `REMOTE_PAYMENT_PRODUCT_NAME` | OPTIONAL | SERVER | Line product label | Defaults `"Cubes"` | string |
| `IV_PAYMENTS_MODE` | MUST BE UNSET | SERVER | Mock payments | Prod error if `mock` | — |

Code default collector fallback exists (`MOLLIE_DEFAULT_SERVER_URL`) — **production must set `REMOTE_PAYMENT_WEBSITE_URL` explicitly** to the live collector. Mollie API keys stay **only on the collector**.

### F. Stripe (paused)

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `STRIPE_SECRET_KEY` | MUST BE UNSET | SERVER | Stripe API | None (paused) | — |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | MUST BE UNSET | PUBLIC | Stripe.js | None | — |
| `STRIPE_WEBHOOK_SECRET` | MUST BE UNSET | SERVER | Stripe webhook | None | — |
| `STRIPE_PUBLISHABLE_KEY` | MUST BE UNSET | SERVER | Alias | None | — |

`config/payments.ts`: `stripe.enabled: false`. Env alone **cannot** enable Stripe in checkout.

### G. Email

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `EMAIL_FROM` | REQUIRED for sending | SERVER | From header | Order/cart mail skip/fail | address |
| `RESEND_FROM_EMAIL` | OPTIONAL alias | SERVER | From alias | — | address |
| `SMTP_HOST` | ONE OF transports | SERVER | SMTP path preferred | Falls to Resend | host |
| `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` / `SMTP_EHLO` | OPTIONAL | SERVER | SMTP | — | smtp fields |
| `RESEND_API_KEY` | ALT transport | SERVER | Resend API | If no SMTP | secret |
| `EMAIL_REPLY_TO` / `ADMIN_EMAIL` / `EMAIL_ADMIN_TO` / `EMAIL_SUPPORT` / `EMAIL_COMPANY_NAME` | OPTIONAL | SERVER | Templates / admin notify | Degraded copy | strings |

Transport order: **SMTP if `SMTP_HOST` set, else Resend**. App can boot without email (warnings); transactional mail then skips/fails closed.

### H. Cart recovery

| VARIABLE | REQ | SERVER/PUBLIC | PURPOSE | FAILURE IF MISSING | VALUE TYPE |
| --- | --- | --- | --- | --- | --- |
| `CRON_SECRET` | REQUIRED for HTTP cron | SERVER | Auth processor endpoint | 503 in prod without secret | long secret |
| `CART_RECOVERY_TOKEN_PEPPER` | REQUIRED (prod) | SERVER | Token HMAC | Falls back to session/cron/dev pepper (unsafe) | long secret |
| `CART_ABANDONMENT_MINUTES` | OPTIONAL | SERVER | Default **20** | Uses 20 | int |
| `CART_RECOVERY_RETENTION_DAYS` | OPTIONAL | SERVER | Default **90** | Uses 90 | int |
| `IV_CART_RECOVERY_DRY_RUN` | SAFE for rollout / UNSET for live mail | SERVER | Record without send | Live emails not delivered if `1` | `1` or unset |

Email delays (code defaults): **60 / 1440 / 4320 minutes** (1h / 24h / 72h).

### I. Analytics (optional)

`NEXT_PUBLIC_ANALYTICS_ENABLED`, `NEXT_PUBLIC_ANALYTICS_DEBUG`, `NEXT_PUBLIC_ANALYTICS_CONSENT_MODE`, `NEXT_PUBLIC_GA4_*`, `NEXT_PUBLIC_GTM_*`, `NEXT_PUBLIC_CLARITY_*` — all **SAFE OPTIONAL**.

### J. Learn / admin CMS

| VARIABLE | REQ | NOTES |
| --- | --- | --- |
| `CMS_MEDIA_DIR` | Recommended | Warning if unset in prod verify |
| `CMS_MEDIA_PUBLIC_BASE_URL` | OPTIONAL | Default path pattern in example |
| `CMS_PUBLISH_LOCK_PATH` | OPTIONAL | Publish + cart-recovery CLI lock |
| `LEARN_ARTICLE_PREVIEW_SECRET` | OPTIONAL | Preview |
| `TOOLS_MEDIA_SECRET` | OPTIONAL | Falls back to session secret |
| `CMS_AUTHOR_*` | Scripts only | Not required for storefront boot |

### K. Geo / runtime

| VARIABLE | REQ | NOTES |
| --- | --- | --- |
| `IV_GEO_BLOCK_DISABLED` | MUST BE UNSET for prod policy | Disables geo block if `1` |

### L. Other

| VARIABLE | NOTES |
| --- | --- | --- |
| `HOSTNAME` / `PORT` | Set by PM2 (`localhost` / `3000`) |
| `CMS_STORE_PATH` | MUST BE UNSET in production |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Provider disabled |

---

## 4. Required production env (minimum)

**Hard fail at boot (`validateEnv` errors) when production:**

- `DATABASE_URL`
- `IV_ADMIN_PASSWORD` (or `ADMIN_PASSWORD`) — not weak defaults
- `IV_ADMIN_SESSION_SECRET` (or aliases)
- `NEXT_PUBLIC_SITE_URL` or `SITE_URL` — **HTTPS** (non-localhost)

**Operationally required for live checkout (warning until set):**

- `REMOTE_PAYMENT_WEBSITE_URL` → `<LIVE_REMOTE_COLLECTOR_URL>`
- `REMOTE_PAYMENT_SHARED_SECRET` (min 16 chars; must match collector)

**Operationally required for cart recovery:**

- `CRON_SECRET`
- `CART_RECOVERY_TOKEN_PEPPER`
- Email transport (`EMAIL_FROM` + SMTP or Resend) for real recovery emails
- `DATABASE_URL` (sessions tables after `0007`)

**Recommended:**

- `CART_ABANDONMENT_MINUTES=20`
- `CART_RECOVERY_RETENTION_DAYS=90`
- `CMS_MEDIA_DIR`
- Admin notification emails

Verify on server:

```bash
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
```

---

## 5. Variables that must NOT be set (production)

| Variable / pattern | Class |
| --- | --- |
| `IV_PAYMENTS_MODE` (esp. `mock`) | **MUST BE UNSET** |
| All `STRIPE_*` / `NEXT_PUBLIC_STRIPE_*` | **MUST BE UNSET** |
| `IV_ALLOW_FILE_STORE=1` | **MUST BE UNSET** |
| `IV_PERSISTENCE=memory` | **MUST BE UNSET** |
| `IV_SKIP_ENV_GUARD=1` | **MUST BE UNSET** |
| `IV_ENV=test` | **MUST BE UNSET** on Contabo (payment guard is NODE_ENV-only, but other runtime paths still treat IV_ENV) |
| `CMS_STORE_PATH` | **MUST BE UNSET** |
| `IV_GEO_BLOCK_DISABLED=1` | **MUST BE UNSET** unless intentionally disabling geo |
| `IV_CART_RECOVERY_DRY_RUN=1` | **SAFE OPTIONAL** for dry rollout; **unset for live recovery email** |
| Analytics / Learn preview / Tools HMAC | **SAFE OPTIONAL** |
| `CART_ABANDONMENT_MINUTES` / retention | **SAFE OPTIONAL** (defaults OK) |

---

## 6. Database migration audit

### Files (lexical apply order)

1. `drizzle/0001_init.sql` — orders, payments, webhooks, admin, contacts, notifications, coupons  
2. `drizzle/0002_site_settings.sql` — `site_settings`  
3. `drizzle/0003_analytics_events.sql` — analytics  
4. `drizzle/0004_email_subscribers.sql` — subscribers/campaigns  
5. `drizzle/0005_cms_author_dashboard.sql` — CMS tables  
6. `drizzle/0006_cms_planned_calendar.sql` — additive column on `cms_articles`  
7. `drizzle/0007_cart_recovery.sql` — **`cart_recovery_sessions`**, **`cart_recovery_events`**

### Runner

- Command: `npm run db:migrate:sql`
- Tracking: `schema_migrations (id TEXT PK, applied_at TIMESTAMPTZ)`
- Idempotency: skip if filename already in `schema_migrations`
- Transactional wrap of whole file + insert: **No** (apply body, then insert id)
- SQL itself uses `CREATE … IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` → re-run generally safe
- Destructive migrations: **None** found (`DROP`/`TRUNCATE`/`DELETE` not used in these files)
- Rollback scripts: **None** in repo

### `0007_cart_recovery.sql`

Adds only cart-recovery tables/indexes. Does **not** reset orders/customers. FK: events → sessions `ON DELETE CASCADE`.

---

## 7. Database backup (required before migrate)

**Do not invent Contabo credentials.** Use placeholders.

```bash
# On Contabo — BEFORE npm run db:migrate:sql
mkdir -p /var/backups/novalikes
BACKUP=/var/backups/novalikes/novalikes-$(date +%Y%m%d-%H%M%S).sql.gz

# Prefer pg_dump via connection URL from server env (do not paste secrets into shell history if avoidable)
set -a && . <PROJECT_PATH>/.env.production && set +a
pg_dump "$DATABASE_URL" --no-owner --format=plain | gzip -c > "$BACKUP"

# Verify non-empty
ls -lh "$BACKUP"
# Expect size >> 0 (e.g. more than a few KB for a real DB)
gunzip -t "$BACKUP" && echo "gzip OK"
```

If using role/db name form instead of URL:

```bash
pg_dump -h 127.0.0.1 -U <DB_USER> -d <DB_NAME> --no-owner | gzip -c > "$BACKUP"
```

**Runbook rule:** no migrate without a verified non-empty backup file.

---

## 8. Migration verification (after `npm run db:migrate:sql`)

Safe checks (read-only):

```sql
-- Applied migrations
SELECT id, applied_at FROM schema_migrations ORDER BY id;
-- Expect rows including: 0007_cart_recovery.sql

SELECT to_regclass('public.cart_recovery_sessions') AS sessions;
SELECT to_regclass('public.cart_recovery_events') AS events;
-- Expect non-null

SELECT COUNT(*) FROM cart_recovery_sessions;
SELECT COUNT(*) FROM cart_recovery_events;
```

CLI log should show either `applied 0007_cart_recovery.sql` or `skip 0007_cart_recovery.sql (already applied)`.

---

## 9. Mollie / remote collector (deployment requirements)

| Topic | Repo fact |
| --- | --- |
| Collector URL | `REMOTE_PAYMENT_WEBSITE_URL` / Admin setting `payment_website` |
| Shared secret | `REMOTE_PAYMENT_SHARED_SECRET` (≥16) |
| Charge route | Collector `/?ro=1` (protocol `serverEndpoint(..., 'ro')`) |
| Health | Collector health used for Components profile + testmode |
| Components config | `GET /api/payments/mollie-config` (profileId; no shared secret to browser) |
| Webhook | `POST /api/webhooks/remote-payment` — HMAC over order_id\|txn_id\|price\|currency\|callback_ts |
| Paid state | **Only** after verified webhook → `markOrderPaymentStatus` |
| Redirect | Must **not** alone mark paid |
| Testmode | `NODE_ENV === "production"` → reject trusted `testmode:true` (**IV_ENV cannot bypass**) |
| Mollie API keys | **Collector only** — never NovaLikes env |

---

## 10. Payment URL checklist

Replace domain with production site. Collector stays external.

| Surface | URL |
| --- | --- |
| Site | `https://novalikes.com/` |
| Checkout | `https://novalikes.com/checkout` |
| Order success | `https://novalikes.com/order-success` |
| Remote payment webhook | `https://novalikes.com/api/webhooks/remote-payment` |
| Mollie config | `https://novalikes.com/api/payments/mollie-config` |
| Cart recovery cron | `https://novalikes.com/api/internal/cart-recovery/process` |
| Cart recovery restore | `https://novalikes.com/checkout/recover/<token>` |
| Unsubscribe | `https://novalikes.com/email/unsubscribe/cart-recovery/<token>` |
| Health | `https://novalikes.com/api/health` |
| Collector | `<LIVE_REMOTE_COLLECTOR_URL>/` (charge `/?ro=1`, health per protocol) |

---

## 11. Stripe paused verification

- `config/payments.ts`: `stripe.enabled === false`
- Enabled providers: `remote-payment` only
- Checkout cannot select Stripe
- Production checklist: **all `STRIPE_*` unset**
- Do not delete Stripe code

---

## 12. Email production audit

| Item | Fact |
| --- | --- |
| Transport | **SMTP first** (`SMTP_HOST`), else **Resend** (`RESEND_API_KEY`) |
| From | `EMAIL_FROM` or `RESEND_FROM_EMAIL` |
| Order confirmation | `notifyOrderPlaced` / notification dispatch — can **fail** status if email disabled |
| Payment confirmed | Gated by `isEmailConfigured()` |
| Cart recovery | Sends via cart-recovery email module; dry-run if `IV_CART_RECOVERY_DRY_RUN=1` or non-prod without config |
| Admin notify | Can **skip** if unconfigured |
| Silent fail risk | **Yes** for mail content if transport missing — app still boots |

Do not send emails during this audit.

---

## 13. Cart recovery production ops

| Requirement | Detail |
| --- | --- |
| DB | `0007` tables + `DATABASE_URL` |
| Abandonment | Default **20 minutes** |
| Sequence | **1h / 24h / 72h** |
| Pepper | `CART_RECOVERY_TOKEN_PEPPER` |
| Cron auth | `CRON_SECRET` |
| CLI | `npm run cart-recovery:process` — **file lock** via publish lock path |
| HTTP | `POST /api/internal/cart-recovery/process` — auth only, **no file lock** |
| Idempotency | Event keys `cart_recovery:{sessionId}:…` + unique index |
| Duplicate email prevention | Idempotency + pre-check events |

**Primary recommendation:** CLI cron (locking). HTTP as alternate if curl preferred.

---

## 14. Cron recommendation

**Primary: CLI every 5–10 minutes**

```cron
*/5 * * * * cd <PROJECT_PATH> && set -a && . <PROJECT_PATH>/.env.production && set +a && /usr/bin/npm run cart-recovery:process >> /var/log/novalikes/cart-recovery.log 2>&1
```

**Alternate: HTTP**

```cron
*/5 * * * * curl -fsS -X POST -H "Authorization: Bearer <CRON_SECRET>" https://<DOMAIN>/api/internal/cart-recovery/process >> /var/log/novalikes/cart-recovery-http.log 2>&1
```

Also keep existing Contabo pattern for scheduled publish:

```cron
* * * * * cd <PROJECT_PATH> && set -a && . <PROJECT_PATH>/.env.production && set +a && /usr/bin/npm run publish:scheduled >> /var/log/novalikes/publish.log 2>&1
```

---

## 15. PM2 / process manager

**Present:** `ecosystem.config.cjs`

| Field | Value |
| --- | --- |
| App name | `novalikes` |
| cwd in file | `/var/www/novalikes` (**VERIFY ON CONTABO** — may differ) |
| Bind | `next start -H localhost -p 3000` |
| Mode | fork, 1 instance, `max_memory_restart: 1G` |
| env | `NODE_ENV=production`, `HOSTNAME=localhost`, `PORT=3000` |

Safe placeholders:

```bash
cd <PROJECT_PATH>
pm2 start ecosystem.config.cjs
# or restart existing:
pm2 restart novalikes
pm2 status
pm2 logs novalikes --lines 100
```

Do **not** invent a different live app name if Contabo already uses another — verify with `pm2 ls` first.

---

## 16. Nginx / reverse proxy

**Present:** `deploy/nginx/novalikes.conf`

| Expectation | Value |
| --- | --- |
| Upstream | `[::1]:3000` (not `127.0.0.1`) |
| Hosts | `novalikes.com`, www → apex |
| Body size | `client_max_body_size 8m` |
| Headers | `X-Forwarded-Proto`, `Host`, etc. |
| HTTPS | Template is HTTP listen 80 — Certbot **VERIFY ON CONTABO** |

Webhook path needs no special location (proxied via `/`). Confirm live nginx matches template before blaming the app for 502s.

---

## 17. HTTPS / cookies

| Cookie | HttpOnly | Secure | SameSite |
| --- | --- | --- | --- |
| `iv_admin_session` | yes | when `NODE_ENV=production` | Lax |
| `iv_admin_csrf` | no | production | Lax |
| Author session/CSRF | same pattern | production | Lax |
| `iv_cart_v1` | no (JS) | HTTPS/prod sets | Lax |
| `iv_cart_recovery` | no | HTTPS | Lax |

Admin session secret required in production. Site URL must be HTTPS for validateEnv.

---

## 18. Production build guards

| Guard | Behavior |
| --- | --- |
| `IV_ALLOW_FILE_STORE=1` | Prod **error** |
| `IV_PERSISTENCE=memory` | Prod **error** |
| `IV_PAYMENTS_MODE=mock` | Prod **error** |
| Mollie testmode | **`NODE_ENV === "production"` only** — reject |
| `IV_SKIP_ENV_GUARD=1` | Skips throw — **forbidden** |
| Persistence | Postgres via `DATABASE_URL` only in prod |

---

## 19. SEO runtime files

| Asset | Served by |
| --- | --- |
| `/robots.txt` | `app/robots.ts` |
| `/sitemap.xml` | `app/sitemap.xml/route.ts` (index + XSL PI) |
| `/sitemap.xsl` | `app/sitemap.xsl/route.ts` |
| `/sitemaps/[group].xml` | `app/sitemaps/[group]/route.ts` |
| `/llms.txt` | `app/llms.txt/route.ts` |
| Manifest | `app/manifest.ts` → `/manifest.webmanifest` |

Depends on successful `next build` + app process; no separate SEO build step.

---

## 20. Required pre-deploy tests (local)

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Last known full suite (prior to this audit; **no code changes here**): lint PASS, tsc PASS, **626 passed | 36 skipped**, build PASS. Payment/cart subset re-run during audit: PASS.

---

## 21. Server pull safety

1. `cd <PROJECT_PATH>`
2. `git status` / `git branch` — note dirty files; do not discard casually
3. **Never** `git reset --hard` unless manually approved
4. Backup `.env` / `.env.production` to a root-only path outside the repo
5. Backup database (§7)
6. `git fetch` + checkout approved ref / `git pull` of approved branch
7. Confirm `.env*` not overwritten by pull
8. `npm ci`
9. `IV_VERIFY_AS_PRODUCTION=1 npm run env:verify`
10. Migrate → build → restart (§28)

Never copy repo `.env.example` over live secrets.

---

## 22. Low-downtime order

For **additive** migrations (`IF NOT EXISTS`), safest practical order:

1. Backup DB + env  
2. Pull code + `npm ci`  
3. **Migrate while old process still serving** (new tables unused until new code runs)  
4. **Build** (can overlap with migrate if CPU allows; migrate first is simpler)  
5. **Restart PM2** to new build  
6. Smoke  

Migrations **before restart** so new code never boots against missing `cart_recovery_*` tables. Brief downtime only during PM2 restart.

---

## 23. Post-restart smoke checklist

- [ ] `GET /api/health` → ok  
- [ ] Homepage 200  
- [ ] One service page 200  
- [ ] Cart page loads  
- [ ] Checkout loads; Mollie Components UI mounts (no charge)  
- [ ] `GET /api/payments/mollie-config` → ok + live profile (not testmode in prod)  
- [ ] Admin login works  
- [ ] Track order page loads  
- [ ] `/robots.txt`, `/sitemap.xml`, `/sitemap.xsl`, one child sitemap  
- [ ] `POST /api/internal/cart-recovery/process` without secret → 401/503  
- [ ] With secret → 200 JSON  

No live charge in this phase.

---

## 24. Live payment test (manual)

Smallest real order:

1. Create order → status pending  
2. Mollie Components loads  
3. Collector receives charge (`/?ro=1`)  
4. Complete 3DS if prompted  
5. Signed webhook hits `/api/webhooks/remote-payment`  
6. Order payment status **paid**  
7. Order-success reflects paid  
8. Confirmation email (if transport configured)  
9. Track order works  

Negative:

- Payload with `testmode:true` must **409** and leave order unpaid  

---

## 25. Cart recovery E2E (manual)

1. Add package → checkout  
2. Enter controlled test email  
3. Do **not** place order  
4. Wait **20 min** **or** temporarily set `CART_ABANDONMENT_MINUTES` to a short safe value (e.g. `2`), restart app, document the change  
5. Run `npm run cart-recovery:process`  
6. Confirm session abandoned  
7. Confirm email (ensure `IV_CART_RECOVERY_DRY_RUN` unset for real send)  
8. Open recovery URL → cart restored  
9. Place order + pay  
10. Session **converted**; further recovery emails suppressed  
11. Recovered revenue counted once  

Restore production cutoff:

```bash
# In .env.production
CART_ABANDONMENT_MINUTES=20
# Remove any temporary short value, then:
pm2 restart novalikes
```

---

## 26. Security smoke

- [ ] Invalid remote webhook signature → 403  
- [ ] Production testmode webhook → 409, unpaid  
- [ ] Invalid cart recovery token → rejected  
- [ ] Cron without secret → unauthorized / 503  
- [ ] Admin cart-recovery API requires admin auth  
- [ ] Stripe not selectable  
- [ ] Browser Network/Sources: no shared secret / Mollie private keys / `STRIPE_SECRET`  

---

## 27. Rollback plan

| Layer | Action |
| --- | --- |
| Application | Redeploy previous git ref; `npm ci`; `npm run build`; `pm2 restart novalikes` |
| Environment | Restore backed-up `.env.production` (never from git) |
| Database | **No SQL down migrations in repo.** Keep `0007` tables (harmless if unused). Destructive rollback only from **pg_dump restore** after explicit approval |
| Payments | Collector/shared secret unchanged if possible; Stripe remains paused |

Do not drop production DB to “undo” `0007`.

---

## 28. Ordered Contabo runbook (PHASE A–L)

### PHASE A — PREPARE SERVER

- [ ] SSH to Contabo  
- [ ] Confirm Node ≥ 20.9: `node -v`  
- [ ] Confirm project path `<PROJECT_PATH>` and PM2 app name (`pm2 ls`)  
- [ ] Confirm Postgres reachable with existing `DATABASE_URL`  
- [ ] Confirm nginx upstream `[::1]:3000` (**VERIFY ON CONTABO**)

### PHASE B — BACKUPS

- [ ] Copy `.env.production` to secure backup location  
- [ ] `pg_dump` → gzip (§7)  
- [ ] Verify backup size + `gunzip -t`

### PHASE C — PULL CODE

- [ ] `cd <PROJECT_PATH>`  
- [ ] `git status` / note branch  
- [ ] Pull approved release (no `reset --hard` unless manually approved)  
- [ ] Confirm env files untouched  
- [ ] `npm ci`

### PHASE D — ENV

- [ ] Confirm required vars (§4)  
- [ ] Confirm must-unset list (§5) — especially Stripe, mock, memory, skip-guard  
- [ ] Set `REMOTE_PAYMENT_WEBSITE_URL=<LIVE_REMOTE_COLLECTOR_URL>`  
- [ ] Matching `REMOTE_PAYMENT_SHARED_SECRET`  
- [ ] `IV_VERIFY_AS_PRODUCTION=1 npm run env:verify` → READY  
- [ ] Decide dry-run vs live for `IV_CART_RECOVERY_DRY_RUN`

### PHASE E — DATABASE

- [ ] Backup already done  
- [ ] `npm run db:migrate:sql`  
- [ ] Verify `schema_migrations` includes `0007_cart_recovery.sql`  
- [ ] Verify `cart_recovery_sessions` / `cart_recovery_events` exist

### PHASE F — BUILD

- [ ] Optional: `rm -rf .next`  
- [ ] `npm run build`  
- [ ] Confirm build exit 0

### PHASE G — RESTART

- [ ] `pm2 restart novalikes` (or `pm2 start ecosystem.config.cjs` if first time)  
- [ ] `pm2 status` / logs healthy  
- [ ] `curl -fsS http://localhost:3000/api/health` (from server)

### PHASE H — CRON

- [ ] Install cart-recovery CLI cron every 5–10 min (§14)  
- [ ] Confirm `publish:scheduled` cron still present  
- [ ] Test one manual `npm run cart-recovery:process`

### PHASE I — SMOKE QA

- [ ] Complete §23 checklist

### PHASE J — LIVE MOLLIE TEST

- [ ] Complete §24 checklist  
- [ ] Confirm testmode cannot pay

### PHASE K — CART RECOVERY TEST

- [ ] Complete §25 checklist  
- [ ] Restore abandonment to 20 minutes if temporarily shortened

### PHASE L — FINAL SIGN-OFF

- [ ] Stripe still paused / unset  
- [ ] Apple Pay / Google Pay claims still absent  
- [ ] Backups retained  
- [ ] Sign off production cutover

---

## 29. Blocker classification

### P0 — must clear before calling production “live”

1. Valid Contabo `DATABASE_URL` to **existing** Postgres (no new DB provider)  
2. Verified **DB backup** before applying `0007`  
3. Production HTTPS `NEXT_PUBLIC_SITE_URL` + admin password + session secret  
4. Live collector `<LIVE_REMOTE_COLLECTOR_URL>` + matching shared secret; collector not in testmode for live money  
5. Must-unset production dangers: mock payments, memory/file store, `IV_SKIP_ENV_GUARD`  
6. All `STRIPE_*` unset; Stripe remains disabled in config  

### P1 — required for full product ops (checkout mail / recovery)

1. Email transport configured for order + cart-recovery mail  
2. `CRON_SECRET` + `CART_RECOVERY_TOKEN_PEPPER` + cart-recovery cron installed  
3. Unset `IV_CART_RECOVERY_DRY_RUN` when real recovery emails desired  
4. Nginx/`[::1]:3000`/HTTPS **VERIFY ON CONTABO**  
5. `CMS_MEDIA_DIR` if Learn/CMS media used  

### P2 — notes / non-blocking

1. Doc drift: root `DEPLOYMENT.md` Stripe-first vs Contabo Mollie  
2. Contabo docs migration list may omit `0007` — runner still applies it  
3. HTTP cart-recovery cron lacks CLI file lock — prefer CLI  
4. Analytics optional  
5. CSP is Report-Only  
6. `REMOTE_PAYMENT_SHARED_SECRET` is validateEnv **warning** not hard error — still P0 operationally for checkout  

---

## Architecture reminder (unchanged)

```
NovaLikes checkout
  → remote-payment + Mollie Components (browser)
  → remote collector charge
  → Mollie
  → signed POST /api/webhooks/remote-payment
  → order paid
```

Stripe: **PAUSED**.  
Persistence: **Postgres only**.  
Cart recovery: native NovaLikes (`0007` + processor).

---

*End of runbook. Audit-only. NO COMMIT / NO PUSH / NO DEPLOY.*
