# NovaLikes — Production Deployment Guide

**Site:** https://novalikes.com  
**Checkout:** https://novalikes.com/checkout (same origin; no NovaLikes checkout subdomain)  
**Status:** Use this runbook for production. Never commit real secrets.

Related files:

- Root summary: [`DEPLOYMENT.md`](../DEPLOYMENT.md)
- Env template: [`.env.production.example`](../.env.production.example)

---

## 1. Required environment variables

Production fails safely at runtime if critical variables are missing (`instrumentation.ts`).

| Variable | Required | Used for |
|----------|----------|----------|
| `DATABASE_URL` | Yes | PostgreSQL — orders, contacts, sessions, webhooks, settings |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public origin for redirects, emails, absolute URLs |
| `IV_ADMIN_PASSWORD` | Yes | Admin panel login (`ADMIN_PASSWORD` alias accepted) |
| `IV_ADMIN_SESSION_SECRET` | Yes | Admin session signing (`SESSION_SECRET` alias accepted) |
| `RESEND_API_KEY` | Yes | Transactional email via Resend |
| `EMAIL_FROM` | Yes | From-address on order/contact emails (`RESEND_FROM_EMAIL` alias) |

### Strongly recommended

| Variable | Used for |
|----------|----------|
| `REMOTE_PAYMENT_WEBSITE_URL` | Remote payment collector (Admin → Settings can override) |
| `EMAIL_ADMIN_TO` | Admin inbox for paid orders + contact alerts |
| `EMAIL_SUPPORT` | Support address shown in customer emails |
| `EMAIL_COMPANY_NAME` | Brand name in email templates (defaults to **NovaLikes**) |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED` | Set `true` when admin login is configured |

### Stripe (if using Stripe provider)

Live checkout currently prefers **remote payment**. If Stripe is enabled for your environment:

| Variable | Used for |
|----------|----------|
| `STRIPE_SECRET_KEY` | Server-side Stripe API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser publishable key (`STRIPE_PUBLISHABLE_KEY` server alias) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |

### Optional analytics / preview

| Variable | Used for |
|----------|----------|
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics pipeline |
| `NEXT_PUBLIC_GA4_ENABLED` / `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 (**new NovaLikes property only**) |
| `NEXT_PUBLIC_GTM_ENABLED` / `NEXT_PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager (**new container only**) |
| `NEXT_PUBLIC_CLARITY_ENABLED` / `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity (**new project only**) |
| `LEARN_ARTICLE_PREVIEW_SECRET` | Authorized Learn preview URLs |

### Forbidden in production

| Value | Why |
|-------|-----|
| `IV_PAYMENTS_MODE=mock` | Mock payments blocked in production |
| `IV_ALLOW_FILE_STORE=1` | File store not allowed in production |
| Weak admin passwords (`change-me-admin`, etc.) | Rejected by env validation |

### Accepted aliases

| Alias | Maps to |
|-------|---------|
| `SITE_URL` | `NEXT_PUBLIC_SITE_URL` |
| `ADMIN_PASSWORD` | `IV_ADMIN_PASSWORD` |
| `SESSION_SECRET` | `IV_ADMIN_SESSION_SECRET` |
| `RESEND_FROM_EMAIL` | `EMAIL_FROM` |

---

## 2. Variable details (no secrets)

### `DATABASE_URL`

- Format: `postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require`
- Providers: Neon, Supabase, or other managed Postgres
- After setting: `npm run db:migrate:sql`

### `NEXT_PUBLIC_SITE_URL`

- Value: `https://novalikes.com` (no trailing slash)
- Used for order-success links, email absolute URLs, and checkout return hosts when building site paths
- `NEXT_PUBLIC_*` values are embedded in the client bundle (not secret)

### Checkout URLs

- Cart, checkout, order-success and track-order are same-origin on `https://novalikes.com`
- Do not configure a NovaLikes checkout subdomain
- `NEXT_PUBLIC_CHECKOUT_URL` is ignored if present
- A third-party payment processor may still host its own authorization page

### Admin secrets

- Generate password/secret yourself (`openssl rand -base64 32`, `openssl rand -hex 64`)
- Never reuse credentials from any other brand or environment

### Email / Resend

- Verify **novalikes.com** (or your chosen sending domain) in Resend → Domains
- Example from-address shape: `orders@novalikes.com` (use your verified mailbox)
- Set `EMAIL_COMPANY_NAME=NovaLikes`

### Analytics

- Create **new** GA4 / GTM / Clarity properties for NovaLikes
- Do not reuse measurement IDs from any previous brand

---

## 3. Vercel setup

1. Import the Git repository into a **NovaLikes** Vercel project
2. Settings → Environment Variables → paste production values from `.env.production.example` (with real secrets filled in the dashboard only)
3. Domains:
   - Add `novalikes.com` (+ redirect `www` → apex if desired)
4. Deploy production

Cart and checkout stay on `novalikes.com` (`/cart`, `/checkout`, `/order-success`, `/track-order`). Do not add a NovaLikes checkout subdomain.

---

## 4. Payments & webhooks

### Remote payment (primary path)

- Configure collector URL via Admin → Settings and/or `REMOTE_PAYMENT_WEBSITE_URL`
- Callback: `https://novalikes.com/api/webhooks/remote-payment`

### Stripe webhook (if Stripe enabled)

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://novalikes.com/api/webhooks/stripe`
3. Copy signing secret into `STRIPE_WEBHOOK_SECRET`
4. Typical return URLs (built by the app from env, not hard-coded):
   - Success → `https://novalikes.com/order-success?...`
   - Cancel → checkout host `/?cancelled=1&orderId=…` (or main `/checkout` when no checkout subdomain)

---

## 5. Deploy commands

```bash
npm ci
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
npm run db:migrate:sql
npm run build
npm run start
```

---

## 6. Smoke tests (post-deploy)

```bash
curl -I https://novalikes.com
curl -s https://novalikes.com/robots.txt | head
curl -s https://novalikes.com/sitemap.xml | head
curl -s https://novalikes.com/llms.txt | head
```

Manual checks:

1. Homepage opens at `https://novalikes.com`
2. All 12 approved buy-* service pages render
3. `/cart`, `/checkout`, `/order-success` render
4. Admin login works with production secrets
5. Contact form / order email uses NovaLikes from-name and novalikes.com links
6. JSON-LD Organization name is NovaLikes; URL is `https://novalikes.com`

---

## 7. Production checklist

| # | Item | Expected |
|---|------|----------|
| 1 | Site URL | `https://novalikes.com` |
| 2 | Checkout URL | `https://novalikes.com/checkout` |
| 3 | Email domain | Verified for NovaLikes (e.g. `@novalikes.com`) |
| 4 | Company name | `EMAIL_COMPANY_NAME=NovaLikes` |
| 5 | Analytics | New NovaLikes properties only |
| 6 | Secrets | Unique to this project — never reused from another brand |
| 7 | Migrations | Applied once against production DB |

---

*Do not commit real API keys, passwords, or webhook secrets.*
