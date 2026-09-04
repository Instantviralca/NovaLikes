# Native Cart Abandonment Recovery

**Date:** 2026-09-04  
**Verdict: A. NATIVE CART RECOVERY READY**

No commit / no push / no deploy.

---

## 1. Existing checkout architecture found

- Cart is client-persisted (`sessionStorage` `novalikes.comrt.v1` + cookie `iv_cart_v1`).
- Checkout form holds email/name in React state until Place Order.
- Place Order → `POST /api/checkout/place-order` → `executeCheckout` → `placeOrder` → Mollie remote payment redirect.
- Capture now hooks **before** Place Order via debounced `POST /api/checkout/abandon-capture` when a valid email + cart items exist.

## 2. Existing order lifecycle found

- Order created as `pending` with `payment.status` pending.
- Paid only after trusted webhook (`/api/webhooks/remote-payment`) or mock path → `markOrderPaymentStatus`.
- Conversion hooks into **paid** transition (not payment redirect, not place-order alone).
- Order link can attach earlier via `recoveryPublicId` cookie → `linkOrderToCartRecovery`.

## 3. Database tables added

- `cart_recovery_sessions`
- `cart_recovery_events`
- Migration: `drizzle/0007_cart_recovery.sql`
- Drizzle models: `lib/db/schema.ts`
- Uses **existing** Contabo PostgreSQL via `DATABASE_URL` (no new DB provider). Memory store only for tests / local without DB.

## 4. Abandonment cutoff

- Default **20 minutes** after `lastActivityAt`
- Configurable: `CART_ABANDONMENT_MINUTES` + Admin settings `abandonmentMinutes`

## 5. Recovery sequence

| Step | Default delay | Purpose |
|------|---------------|---------|
| Email 1 | 60 minutes after abandon | Simple reminder |
| Email 2 | 24 hours | Trust / hesitation |
| Email 3 | 72 hours | Final reminder |

Stops on convert, unsubscribe, expire, or disabled settings. Each step idempotent.

## 6. Secure recovery-token implementation

- URL: `/checkout/recover/<token>`
- Token = `publicId.HMAC` derived from `publicId|createdAt` + server pepper
- No email/cart/prices/DB ids in query strings
- Raw random secrets not stored; hashes stored for integrity indexes
- Pepper: `CART_RECOVERY_TOKEN_PEPPER` → `IV_ADMIN_SESSION_SECRET` → `CRON_SECRET`

## 7. Cart restore behavior

- Validates token → reloads packages from **catalog prices** (anti-tamper)
- Restores cart to `sessionStorage`, sets opaque `iv_cart_recovery` cookie
- Redirects to `/checkout?restored=1` with subtle “Your order has been restored.”
- Does **not** create an order

## 8. Conversion detection

- Primary: session `orderId` link from recovery cookie at place-order
- Confirmed conversion only when `markOrderPaymentStatus` first marks **paid**
- Idempotent `converted` event; revenue counted once

## 9. Duplicate-send protection

- Unique `idempotency_key` on `cart_recovery_events`
- Per-step checks for existing `email_sent`
- Cron file lock (`tryAcquireCronLock`) prevents overlapping processors

## 10. Admin dashboard route

- `/admin/cart-recovery`
- Detail: `/admin/cart-recovery/[id]`
- Nav: **Cart Recovery**

## 11. Admin metrics

- Abandoned Carts, Recovered Carts, Abandoned Revenue, Recovered Revenue, Recovery Rate
- Optional email-attributed recovered revenue
- Service breakdown from cart snapshots

## 12. Cart detail view

- Customer, cart lines, totals, timestamps, email events, clicks, order id, status
- Token hashes stripped from API responses

## 13. Email templates

- Admin-editable subjects/bodies/delays/enabled for steps 1–3
- Placeholders: `{{first_name}}`, `{{cart_total}}`, `{{cart_items}}`, `{{recovery_url}}`
- Uses existing SMTP/Resend transport styling

## 14. Coupon capability

- Settings flags only (`couponEnabled`, type, value, min, expiry, sequence step)
- **Not auto-enabled** in production behavior
- Restore does not auto-apply stale coupons; checkout still server-validates codes

## 15. Unsubscribe implementation

- `/email/unsubscribe/cart-recovery/<token>`
- Suppresses further recovery emails; does not delete sessions/orders
- `noindex`; robots disallow includes `/email/unsubscribe/`

## 16. Cron implementation

- HTTP: `POST /api/internal/cart-recovery/process` with `CRON_SECRET` (`Authorization: Bearer` or `x-cron-secret`)
- CLI: `npm run cart-recovery:process` (`scripts/process-cart-recovery.ts` + lock + `closeDb`)
- Steps: mark abandoned → send due emails → expire stale sessions

## 17. Required environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Existing Contabo Postgres |
| `CRON_SECRET` | Protect process endpoint |
| `CART_ABANDONMENT_MINUTES` | Optional (default 20) |
| `CART_RECOVERY_RETENTION_DAYS` | Optional (default 90) |
| `CART_RECOVERY_TOKEN_PEPPER` | Optional HMAC pepper |
| `IV_CART_RECOVERY_DRY_RUN=1` | Dev: skip real sends |
| Existing `EMAIL_FROM` + SMTP/Resend | Delivery |

## 18. Security protections

- Admin APIs use existing admin session + CSRF on mutating settings
- Cron secret timing-safe compare; no client exposure
- Recovery tokens unguessable HMAC; IDOR resisted via token verification
- Catalog re-price on restore; no card/payment data captured
- Token hashes never returned to admin UI

## 19. Privacy protections

- No public abandonment pages
- No “Verified customer” claims
- Recovery links omit PII in query params
- Unsubscribe scoped to recovery sequence

## 20. Market/locale behavior

- Capture stores `market` / `locale` from checkout chrome when present
- Checkout path preserved; restore returns to `/checkout`
- Recovery/unsubscribe routes are noindex and not sitemap entries

## 21. New API routes

- `POST /api/checkout/abandon-capture`
- `POST /api/internal/cart-recovery/process`
- `GET /api/admin/cart-recovery`
- `GET /api/admin/cart-recovery/[id]`
- `GET|POST /api/admin/cart-recovery/settings`

## 22. Database migrations

- `drizzle/0007_cart_recovery.sql`
- Apply with existing: `npm run db:migrate:sql`

## 23. Files changed (high level)

- `lib/db/schema.ts`, `drizzle/0007_cart_recovery.sql`
- `lib/cart-recovery/**`, `types/cart-recovery.ts`
- Checkout capture/restore UI + place-order/execute/mark-paid hooks
- Admin cart-recovery pages/components + nav
- Cron script + env examples + robots disallow
- Tests: `lib/cart-recovery/__tests__/cart-recovery.test.ts`

## 24. Lint result

**Pass** (pre-existing unused-var warnings elsewhere only)

## 25. Typecheck result

**Pass** (`npx tsc --noEmit`)

## 26. Test count/result

**615 passed** | 36 skipped

## 27. Build result

**Pass** (`npm run build`)

## 28. Manual QA still required

1. Run migration on Contabo Postgres: `npm run db:migrate:sql`
2. Set `CRON_SECRET` + schedule `cart-recovery:process` (e.g. every 5–10 min)
3. Configure Admin → Cart Recovery settings / shared email provider
4. Place a test checkout with email, wait abandonment window (or lower minutes in settings), run processor
5. Click recovery link → confirm cart restore + checkout banner
6. Complete paid order → confirm session `converted` and emails stop
7. Confirm unsubscribe stops further emails

## 29–31. Release actions

- **NO COMMIT**
- **NO PUSH**
- **NO DEPLOY**

---

## FINAL VERDICT

**A. NATIVE CART RECOVERY READY**

(Follow Contabo migration + cron + email config before production traffic.)
