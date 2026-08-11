# NovaLikes — Production Deployment Guide

Safe launch runbook for novalikes.com. Does not change product UI, SEO, pricing, or content.

> **Operator guide (env vars, Vercel, Stripe webhooks, smoke tests):**  
> [`docs/PRODUCTION_DEPLOYMENT_GUIDE.md`](docs/PRODUCTION_DEPLOYMENT_GUIDE.md)  
> **Template:** [`.env.production.example`](.env.production.example)

> **External checkout subdomain:** set `NEXT_PUBLIC_CHECKOUT_URL=https://checkout.novalikes.com` and add the domain in Vercel (same project). Soft cart on the main site hands off to that host; Stripe cancel returns there; success stays on the main site. When configured, main-site `/checkout` redirects to the subdomain; the subdomain redirects all non-checkout pages to the main site.

## Required environment variables

Set these in the production host (Vercel / Railway / VPS). Never commit secrets.

| Required | Canonical key | Alias accepted |
|----------|---------------|----------------|
| Database | `DATABASE_URL` | — |
| Site URL (HTTPS) | `NEXT_PUBLIC_SITE_URL` | `SITE_URL` |
| Stripe secret | `STRIPE_SECRET_KEY` | — |
| Stripe publishable (browser) | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | server-only alias: `STRIPE_PUBLISHABLE_KEY` |
| Stripe webhook | `STRIPE_WEBHOOK_SECRET` | — |
| Admin password | `IV_ADMIN_PASSWORD` | `ADMIN_PASSWORD` |
| Session secret | `IV_ADMIN_SESSION_SECRET` | `SESSION_SECRET` |
| Resend API | `RESEND_API_KEY` | — |
| From email | `EMAIL_FROM` | `RESEND_FROM_EMAIL` |

### Strongly recommended

| Key | Purpose |
|-----|---------|
| `EMAIL_ADMIN_TO` | Admin order + contact notifications |
| `EMAIL_SUPPORT` | Shown in customer emails |
| `EMAIL_COMPANY_NAME` | Defaults to NovaLikes |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED=true` | Shows admin login availability |

### Forbidden in production

- `IV_PAYMENTS_MODE=mock`
- `IV_ALLOW_FILE_STORE=1`
- Default admin passwords (`change-me-admin`, etc.)

Production process **fails safely** at runtime if critical variables are missing (`instrumentation.ts`). Builds may skip the throw (`NEXT_PHASE=phase-production-build` or `IV_SKIP_ENV_GUARD=1`).

---

## Deployment commands

```bash
# 1) Install
npm ci

# 2) Verify env (treat current shell as production)
IV_VERIFY_AS_PRODUCTION=1 npx tsx scripts/verify-production-env.ts

# 3) Apply database schema
npx tsx scripts/apply-migrations.ts

# 4) Build
npm run build

# 5) Start (Node host)
npm run start
```

### npm scripts

```bash
npm run env:verify          # validate env (set IV_VERIFY_AS_PRODUCTION=1 for prod rules)
npm run db:migrate:sql      # apply drizzle/*.sql with schema_migrations tracking
npm run build
npm run start
npm test
```

---

## Manual configuration (outside the codebase)

1. **DNS / HTTPS** — Point `novalikes.com` (+ `www` redirect) to the host with a valid TLS certificate.
2. **PostgreSQL** — Provision managed Postgres (Neon/Supabase/etc.) and set `DATABASE_URL` with `sslmode=require`.
3. **Stripe Dashboard**
   - Live mode keys (`sk_live_…`, `pk_live_…`)
   - Webhook endpoint: `https://novalikes.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`
4. **Resend** — Verify sending domain; set `EMAIL_FROM` to an address on that domain.
5. **Host env panel** — Paste all secrets; redeploy after changes.
6. **Search Console** — Submit `https://novalikes.com/sitemap.xml` after go-live.

---

## Stripe verification map

| Check | Status in code |
|-------|----------------|
| Checkout Session create | `lib/payments/providers/stripe.ts` |
| `client_reference_id` + `metadata.orderId` | Set on session create |
| Success URL | `/order-success?orderId&email&session_id={CHECKOUT_SESSION_ID}` |
| Cancel URL | `/checkout?cancelled=1&orderId=` |
| Webhook signature | `constructEvent` + `STRIPE_WEBHOOK_SECRET` |
| Replay protection | `webhook_events` unique (provider, event_id) |
| Order paid binding | Session must match order / metadata |
| Success page verify | Bound session only |
| Cancel UX | Checkout banner when `cancelled=1` |

---

## Launch checklist

- [ ] Build (`npm run build`)
- [ ] Deploy host release
- [ ] Run migrations (`npm run db:migrate:sql`)
- [ ] Verify environment variables (`IV_VERIFY_AS_PRODUCTION=1 npm run env:verify`)
- [ ] Verify Stripe webhook endpoint (Dashboard → recent deliveries 2xx)
- [ ] Verify emails (paid order + contact form)
- [ ] Verify admin login (`/admin/login`)
- [ ] Verify homepage
- [ ] Verify service pages (at least IG followers + one URL service)
- [ ] Verify checkout (redirects to Stripe)
- [ ] Verify order success (paid)
- [ ] Verify order tracking (`/track-order`)
- [ ] Verify Stripe cancel return
- [ ] Verify reviews + Learn Center
- [ ] Verify `robots.txt` + `sitemap.xml`

---

## Smoke test URLs

| Surface | URL |
|---------|-----|
| Homepage | `/` |
| Service | `/buy-instagram-followers` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Order success | `/order-success` (after paid session) |
| Track order | `/track-order` |
| Contact | `/contact` |
| Reviews | `/reviews` |
| Learn | `/learn` |
| Admin | `/admin/login` |
| robots | `/robots.txt` |
| sitemap | `/sitemap.xml` |
| Stripe webhook | `POST /api/webhooks/stripe` |

---

## Rollback

1. **Host rollback** — Redeploy the previous immutable deployment/release in the host UI (Vercel Instant Rollback / prior image tag).
2. **Do not reverse migrations** unless a bad migration was applied; `0001_init.sql` is additive (`IF NOT EXISTS`). Prefer forward-fix.
3. **Stripe** — If webhook misconfigured, disable the endpoint in Stripe Dashboard to stop retries, fix secret, re-enable.
4. **Feature kill switches** — Unset Stripe keys only as last resort (checkout returns 503). Prefer host rollback.

---

## Post-deploy monitoring (first 24h)

- Stripe webhook delivery success rate
- `/api/checkout/place-order` 4xx/5xx
- Admin login failures / lockouts
- Resend bounce/complaint
- Server error logs (`[env]`, `[stripe webhook]`, `[payments]`)
