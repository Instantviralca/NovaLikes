# Novalikes — Final Production / Deploy Readiness Audit

**Date:** 2026-09-03  
**Project:** C:\Users\HUSSNAIN.COM\Novalikes  
**Deployment target:** Existing Contabo VPS + existing Contabo PostgreSQL  
**Payment collector:** External URL to be supplied at go-live (not invented here)

---

## 1) Overall verdict

### **CODE READY — EXTERNAL ENV VALUES STILL TO BE SUPPLIED**

The application code, schema, env validation, and payment handling are production-ready.

The following are **not code bugs**. They are **external production values** that must be injected on the Contabo host immediately before / at live deployment:

| Variable | Status | Classification |
|---|---|---|
| `DATABASE_URL` | Not present in this local workspace (correct — secret lives on Contabo) | **EXTERNAL SECRET — supply on server** |
| `REMOTE_PAYMENT_WEBSITE_URL` | Intentionally unset until the live payment site is ready | **EXTERNAL CONFIG — supply at go-live** |

Local `.env.local` may contain `IV_ALLOW_FILE_STORE=1` and `IV_PAYMENTS_MODE=mock`. Those flags are **dev-only**. They are correctly **rejected** if `NODE_ENV=production`. They must **not** be copied into the Contabo `.env.production`. That is documented and enforced — not a code defect.

---

## CODE READY vs EXTERNAL ENV

### CODE READY (verified in repo)

- Lint PASS, typecheck PASS, tests PASS (94 files), build PASS
- Sitemap 290 entries, 44 geo routes, 0 orphans, 0 canonical issues
- Drizzle + `postgres` driver; production persistence requires `DATABASE_URL`
- Migrations exist as SQL: `drizzle/0001_init.sql` … `drizzle/0006_cms_planned_calendar.sql`
- Apply path: `npm run db:migrate:sql` (do **not** run `drizzle-kit migrate` — no journal)
- Env validator requires `DATABASE_URL` in production and refuses file/memory store
- Remote payment reads URL from Admin settings **or** `REMOTE_PAYMENT_WEBSITE_URL`
- If payment URL is empty: checkout stays disabled; `createPayment` throws a clear operator error — **no localhost fallback, no invented domain**
- Instrumentation fail-fast at `next start` when production secrets are missing; skip-throw during `next build`

### EXTERNAL ENV (operator supplies on Contabo — do not invent)

**Required for process start**

- `DATABASE_URL` — existing Contabo Postgres (see format below)
- `NEXT_PUBLIC_SITE_URL` / `SITE_URL` — `https://novalikes.com`
- `IV_ADMIN_PASSWORD`
- `IV_ADMIN_SESSION_SECRET`

**Required for live checkout (can wait until payment site is ready)**

- `REMOTE_PAYMENT_WEBSITE_URL` — HTTPS collector, no trailing slash  
  Alternative: set the same URL later in Admin → Settings

**Recommended**

- `CMS_MEDIA_DIR=/var/lib/novalikes/cms-media`
- `TOOLS_MEDIA_SECRET`
- Email (`EMAIL_FROM` + `SMTP_HOST` or `RESEND_API_KEY`) — optional; emails skip until set

**Must NOT be set on Contabo**

```
IV_PAYMENTS_MODE=mock
IV_ALLOW_FILE_STORE=1
IV_PERSISTENCE=memory
IV_SKIP_ENV_GUARD=1
```

---

## Database (existing Contabo Postgres)

**No new database. No Neon/Supabase. No architecture change.**

### Expected connection-string format

```
postgresql://DB_USER:DB_PASSWORD@127.0.0.1:5432/DB_NAME
```

Also accepted by the `postgres` driver:

```
postgres://DB_USER:DB_PASSWORD@127.0.0.1:5432/DB_NAME
```

- Host is typically `127.0.0.1` (same VPS). Do not expose port `5432` publicly.
- URL-encode `@`, `:`, `/`, `#` in the password.
- Same-VPS Postgres does **not** require `sslmode=require` (that note in generic `DEPLOYMENT.md` is for managed cloud only). Contabo runbook uses the local TCP form.
- App reads **only** `process.env.DATABASE_URL`. No credential is hardcoded.

### Schema / migration compatibility

| File | Role |
|---|---|
| `drizzle/0001_init.sql` | Core orders, items, payments, contacts, sessions |
| `drizzle/0002_site_settings.sql` | Admin settings (including payment website) |
| `drizzle/0003_analytics_events.sql` | First-party analytics |
| `drizzle/0004_email_subscribers.sql` | Email list |
| `drizzle/0005_cms_author_dashboard.sql` | CMS authors / articles |
| `drizzle/0006_cms_planned_calendar.sql` | Editorial calendar |

`scripts/apply-migrations.ts` applies each file once, tracked in `schema_migrations`. Idempotent skip if already applied.

**Operator action on Contabo (after real `DATABASE_URL` is in the server env):**

```bash
cd /var/www/novalikes
set -a && source .env.production && set +a
npm run db:migrate:sql
```

This audit does **not** connect to Contabo and does **not** invent credentials. Compatibility is verified from SQL + Drizzle schema + migrator only.

### Env validation (database)

- Production: missing `DATABASE_URL` → **error** (process must not start)
- Production: `IV_ALLOW_FILE_STORE=1` → **error**
- Production: `IV_PERSISTENCE=memory` → **error**
- Build phase: guard does not throw (CI can compile without secrets)
- Local current-runtime `npm run env:verify`: **ok** (dev fallbacks allowed)

That is the correct split: code is ready to connect; the Contabo secret is supplied at deploy.

---

## Remote payment website

**No invented URL. No localhost production fallback. No checkout architecture change.**

Resolution order (`lib/settings/site-settings.ts`):

1. In-memory / Admin Settings (`payment_website`)
2. `REMOTE_PAYMENT_WEBSITE_URL`
3. Empty string → not configured

When empty:

- Env validator: **warning** only (not a start-blocking error)
- `isRemotePaymentConfigured()` is false
- `remotePaymentProvider.createPayment` throws: configure Admin → Settings
- No default host is substituted

When set: POST `{url}/?ro=1` with Woo-compatible form body; response must be an absolute `http(s)` redirect.

**Status:** code-ready now; set the live collector URL in production env (or Admin) immediately before checkout goes live.

---

## Why local `next start` returned 500s (not a code bug)

`npm run start:prod` sets `NODE_ENV=production`. This workspace’s local env still has **dev** flags (`IV_ALLOW_FILE_STORE`, `IV_PAYMENTS_MODE=mock`) and **no** Contabo `DATABASE_URL`. Instrumentation correctly fail-fasts.

That is expected on a developer machine. It is **not** evidence that production code is broken. After Contabo `.env.production` is filled (without those forbidden flags), `next start` should pass the env guard.

Static routes that do not hit persistence (`/faq`, `/learn`, `/sitemap.xml`, `/robots.txt`, some tools) still returned 200 during that local production start.

---

## 2) Lint result

**PASS** (`npm run lint`, exit 0). Warnings only (unused vars). No errors.

## 3) Typecheck result

**PASS** (`npx tsc --noEmit`, exit 0).

## 4) Test result

**PASS** — 94 files passed, 4 skipped (580 tests passed, 36 skipped).

## 5) Build result

**PASS** (`npm run build`, exit 0). Shared first-load JS ~103 kB.

## 6) Public routes checked

| Surface | How verified | Result |
|---|---|---|
| Sitemap / indexable inventory | `buildSitemapEntries` + tests | 290 entries, 44 geo |
| `/sitemap.xml`, `/robots.txt` | Local production start | 200 |
| `/faq`, `/learn`, tools | Local production start | 200 |
| `/`, `/ca/…` service pages | Local production start **without Contabo DATABASE_URL** | 500 / env guard — **expected until server env is supplied** |
| `/ca/`, `/au/`, `/us/`, `/uk/` | Trailing-slash 308 | Intended (canonical unprefixed market paths) |

Full HTTP 200 proof of all 44 geo pages requires Contabo env + `next start` on the VPS. Not a local-repo code failure.

## 7) Broken routes

**None in code/inventory.** Runtime 500s on core pages locally = missing production secrets, not missing routes.

## 8) Broken internal links

**0** orphans, **0** unsafe internal links (unit graph). Cross-market leakage: none in sitemap/orphan registry.

## 9) Sitemap result

**PASS** — 290 entries, 0 duplicates, 0 noindex-in-sitemap, 0 skipped services, 0 missing allowlist entries.

## 10) Orphan count

**0**

## 11) Canonical issues

**0**

## 12) Hreflang issues

**0** — `en`, `en-CA`, `en-AU`, `en-US`, `en-GB`, locales, `x-default` present for core paths.

## 13) Image issues

- 667 WebP under `public/`
- 0 zero-byte
- 0 files &lt; 100 bytes
- Image registry / inventory extractor PASS

## 14) Mobile issues

Prior design/responsive QA complete. Re-check at 390px on the live Contabo host after env is injected. Not a current code blocker.

## 15) Functional-flow issues

**Code-ready; live E2E deferred until Contabo env + payment URL.**

Verified in repo: package selection, username/URL input, cart, checkout page, contact API, order track API, remote-payment webhook.

Not charged / not fully exercised against a live collector (by design).

## 16) Checkout / payment readiness

| Layer | Status |
|---|---|
| Code path (remote Woo `/?ro=1`) | **CODE READY** |
| Mock payments in production | **Blocked by validator** (correct) |
| Live collector URL | **EXTERNAL — supply at go-live** |
| Localhost as production payment URL | **Not used** |

Until the URL is set, checkout must remain disabled. That is correct behavior.

## 17) Form readiness

Contact (`/api/contact`) and checkout customer form exist. Email send is skipped until `EMAIL_FROM` + SMTP/Resend are set (warning, not start-blocking).

## 18) Required env vars — classification

**Do not treat as unresolved code bugs:**

- `DATABASE_URL` — Contabo secret, inject on server
- `REMOTE_PAYMENT_WEBSITE_URL` — pending live collector

**Must be set on Contabo `.env.production` (operator, not this repo):**

- `NEXT_PUBLIC_SITE_URL=https://novalikes.com`
- `IV_ADMIN_PASSWORD`
- `IV_ADMIN_SESSION_SECRET`

**Warnings (optional / later phase):**

- `EMAIL_FROM` + SMTP or Resend
- `CMS_MEDIA_DIR`
- `TOOLS_MEDIA_SECRET`

No secret values printed.

## 19) Security blockers

**None in source.** `.env*` gitignored except examples. No committed live keys. CSP report-only + security headers present.

## 20) Debug / dev artifacts

`console.log` in `scripts/` only. Analytics debug adapter gated off in production. **Harmless.**

## 21) Analytics status

GA4 / GTM / Clarity: adapters exist; **absent until** `NEXT_PUBLIC_*_ENABLED` + IDs are set. Meta Pixel / TikTok Pixel: **absent**. First-party `/api/analytics/collect` present. Do not add tracking in this audit.

## 22) Performance blockers

**None that block deploy.** One large JS chunk (~920 kB) is P2 polish. Geist via `geist/font` (not `next/font`) is P2.

## 23–25) Issue counts (reclassified)

| Severity | Count | Items |
|---|---:|---|
| **P0 code bugs** | **0** | — |
| **P0 external env (operator)** | **2** | Inject Contabo `DATABASE_URL`; omit mock/file-store flags from server env |
| **P1 external / ops** | **2** | Set `REMOTE_PAYMENT_WEBSITE_URL` when collector is live; add `app/global-error.tsx` (optional UX hardening, not a start blocker) |
| **P2 polish** | **2** | Large JS chunk; font loading |

`app/global-error.tsx` missing remains a small resilience gap if the root layout crashes. It is **not** why env validation failed.

## 26) Exact pre-deploy actions (operator, Contabo)

1. Copy `.env.production.example` → server `.env.production` (chmod 600).
2. Set real Contabo `DATABASE_URL` (existing DB; do not create a new one).
3. Set admin password + session secret + `https://novalikes.com`.
4. Confirm **none** of: `IV_PAYMENTS_MODE=mock`, `IV_ALLOW_FILE_STORE=1`, `IV_PERSISTENCE=memory`.
5. `IV_VERIFY_AS_PRODUCTION=1 npm run env:verify`
6. `npm run db:migrate:sql` against the existing Contabo database.
7. When the payment site is ready: set `REMOTE_PAYMENT_WEBSITE_URL` (or Admin → Settings).
8. `npm run start:prod` behind Nginx; smoke `/`, `/ca/`, one service, `/sitemap.xml`.

## 27) Content changed

**NONE**

## 28) SEO changed

**NONE** (this correction is classification-only)

## 29) NO COMMIT

## 30) NO PUSH

## 31) NO DEPLOY

---

## FINAL VERDICT

**CODE READY**

**EXTERNAL ENV VALUES STILL TO BE SUPPLIED:**

- Contabo `DATABASE_URL` (existing database)
- `REMOTE_PAYMENT_WEBSITE_URL` (when the live payment site is ready)
- Production admin / session / site URL on the server env file

Absence of those values in this local workspace is **expected** and is **not** an unresolved application bug.
