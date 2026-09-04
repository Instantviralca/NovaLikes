# Mollie / Remote Payment / Stripe Pause — Production Config Audit

**Date:** 2026-09-04  
**Scope:** AUDIT ONLY — no code changes, no deploy, no secret values printed.

---

## 1. Exact payment-related files

### Checkout execution
- `lib/checkout/execute.ts`
- `app/api/checkout/place-order/route.ts`
- `lib/orders/create.ts`
- `lib/orders/pricing.ts`
- `lib/orders/store.ts`

### Remote payment / Mollie client
- `lib/payments/providers/remote-payment.ts`
- `lib/payments/mollie-remote-protocol.ts`
- `lib/payments/manager.ts`
- `lib/payments/providers/index.ts`
- `lib/payments/mark-paid.ts`
- `lib/payments/normalize-status.ts`
- `lib/settings/site-settings.ts` (collector URL + shared secret + product name)
- `app/api/payments/mollie-config/route.ts` (profileId / testmode health proxy)

### Stripe (paused)
- `lib/payments/providers/stripe.ts`
- `app/api/webhooks/stripe/route.ts`
- `lib/config/env.ts` (`isStripeConfigured`, validation warnings)

### Provider selection
- `config/payments.ts`
- `lib/payments/manager.ts`
- `lib/checkout/execute.ts` (hard-requires `paymentMethodId === 'remote-payment'`)

### Webhooks
- `app/api/webhooks/remote-payment/route.ts`
- `app/api/webhooks/stripe/route.ts`

### Return / success / cancel
- `lib/checkout/execute.ts` (successUrl / cancelUrl construction)
- `lib/config/hosts.ts` (`getSiteOrigin`, `getSiteUrlPath`; `NEXT_PUBLIC_CHECKOUT_URL` ignored)
- `app/(commerce)/order-success/page.tsx`
- `components/commerce/checkout/checkout-page.tsx` (`cancelled=1` banner)

### Payment UI
- `components/commerce/checkout/checkout-page.tsx`
- `components/commerce/checkout/payment-methods.tsx`
- `components/commerce/checkout/mollie-card-fields.tsx`
- `components/commerce/checkout/mollie-card-fields.css`
- `components/design-system/payment-confidence.tsx`
- `components/navigation/footer.tsx` (payment marks)
- `components/admin/settings/settings-page.tsx`

### Env / config examples
- `.env.example`
- `.env.production.example`
- `lib/config/env.ts`

### Legal / trust copy (card handling)
- `lib/i18n/content/ui-english.ts`
- `data/content/legal/privacy.ts`
- `data/content/legal/terms.ts`
- `data/content/legal/cookies.ts`

### Currency source
- `data/pricing/packages.ts` (`SOURCE_CURRENCY = 'USD'`)
- `data/pricing/currencies.ts` (referenced by cart defaults)

---

## 2. Env variable inventory (names only)

| Variable | Classification |
|----------|----------------|
| `REMOTE_PAYMENT_WEBSITE_URL` | **REQUIRED PRODUCTION** / REMOTE COLLECTOR / SITE URL (collector base) |
| `REMOTE_PAYMENT_SHARED_SECRET` | **REQUIRED PRODUCTION** / SHARED SECRET / WEBHOOK (HMAC) |
| `REMOTE_PAYMENT_PRODUCT_NAME` | OPTIONAL (default code constant `Cubes`) |
| `NEXT_PUBLIC_SITE_URL` | **REQUIRED PRODUCTION** / SITE URL |
| `SITE_URL` | OPTIONAL alias for site origin |
| `NEXT_PUBLIC_CHECKOUT_URL` | OPTIONAL / ignored by checkout origin helpers |
| `IV_PAYMENTS_MODE` | DEVELOPMENT ONLY (`mock`); **forbidden** in production |
| `STRIPE_SECRET_KEY` | STRIPE PAUSED — leave unset |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | STRIPE PAUSED — leave unset |
| `STRIPE_PUBLISHABLE_KEY` | STRIPE PAUSED — server alias only; leave unset |
| `STRIPE_WEBHOOK_SECRET` | STRIPE PAUSED — leave unset |
| `NODE_ENV` | runtime mode (production required on Contabo start) |
| `DATABASE_URL` | required for durable orders/webhooks (not Mollie-specific) |

**Not found in NovaLikes payment code:**
- No `MOLLIE_*` env vars
- No `PAYMENT_*` generic keys beyond remote-payment names above
- No `WEBHOOK_*` env vars for remote payment (shared secret reused)
- No `SHARED_SECRET_*` prefix beyond `REMOTE_PAYMENT_SHARED_SECRET`

Admin DB settings can override collector URL / shared secret / product name without env.

---

## 3. Remote payment collector protocol

| Item | Current code behavior |
|------|------------------------|
| Request URL | `{REMOTE_PAYMENT_WEBSITE_URL}/?ro=1` (default base if unset: `https://carrycubes.com`) |
| Health URL | `{server}/?wrp_mollie_health=1` |
| HTTP method | `POST` |
| Content-Type | `application/x-www-form-urlencoded` |
| Timeout | 90s create; 30s health |
| Auth | HMAC-SHA256 `signature` over signed field pipe-join + shared secret (≥16 chars) |
| Expected response | Plain-text absolute `http(s)` **redirect URL** |
| Redirect handling | Browser `window.location.assign(redirectUrl)` after place-order |

### Create payload fields
`callback_url`, `return_url`, `cancel_url`, `order_id`, `amount` (major units string), `currency`, `product_name`, `items_json`, `request_ts`, `request_nonce`, `integration_mode=components_v1`, `card_token`, `signature`

### Signature inputs (create)
`orderId|requestTs|requestNonce|callbackUrl|returnUrl|cancelUrl|amount|currency|productName|sha256(items_json)|components_v1|sha256(card_token)`

---

## 4. Mollie location

**Answer: C. both**

1. **NovaLikes (browser):** Mollie Components via `https://js.mollie.com/v1/mollie.js` — card fields + `createToken()` → `tkn_…`
2. **Remote collector server:** Holds Mollie API credentials; receives signed `/?ro=1` with `card_token`; returns redirect (e.g. 3-D Secure); later POSTs signed paid callback to NovaLikes

Collector URL source (priority): Admin `payment_website` → `REMOTE_PAYMENT_WEBSITE_URL` → code default `https://carrycubes.com`.

This audit does **not** invent a Contabo live collector domain beyond what code defaults/examples show (`carrycubes.com` in code + `.env.production.example`).

---

## 5. Mollie credentials (names / ownership)

| Credential / config | Belongs on |
|---------------------|------------|
| Mollie **API key** (live/test) | **REMOTE PAYMENT COLLECTOR SERVER** (not read by NovaLikes) |
| Mollie **profile ID** (`pfl_…`) | Returned to NovaLikes via collector health; stored nowhere as env |
| Shared secret (HMAC) | **Both** — same value on NovaLikes (`REMOTE_PAYMENT_SHARED_SECRET` / Admin) and collector |
| Collector base URL | **NovaLikes** (`REMOTE_PAYMENT_WEBSITE_URL` / Admin) |
| Product description / `product_name` | **NovaLikes** (`REMOTE_PAYMENT_PRODUCT_NAME`, default `Cubes`) |
| `testmode` boolean | Returned by collector health (not a NovaLikes env flag) |
| Mollie Components locale | Hardcoded `en_US` in UI |

NovaLikes has **no** `MOLLIE_API_KEY` / Mollie webhook secret env.

---

## 6. Test vs live Mollie

- Mode comes from collector health JSON field `testmode`.
- NovaLikes passes `testmode` into `window.Mollie(profileId, { testmode })`.
- **No** NovaLikes env flag like `MOLLIE_LIVE=1`.
- **No** production rejection if `testmode: true`.
- Key prefix (`live_` / `test_`) is a **collector/Mollie-dashboard** concern, not enforced in NovaLikes.

**Production risk:** NovaLikes can silently run Components in test mode if the collector reports `testmode: true`.

---

## 7. Payment form UX (current code truth)

- **Mollie Components** embedded **inline** on NovaLikes `/checkout` (not a separate Mollie hosted Checkout page as the primary UX).
- Fields: card number, expiry, CVC, card holder.
- After Place Order: may **redirect** to URL returned by collector (typically issuer/3DS).
- **Not** popup/modal as primary path (v2.5-style inline).
- **Not** Stripe Checkout UI while paused.

---

## 8. Apple Pay / Google Pay

| Wallet | Status in current NovaLikes code |
|--------|----------------------------------|
| Apple Pay | **Not implemented** in Mollie Components UI |
| Google Pay | **Not implemented** / not referenced |

Footer lists **Apple Pay** as a payment mark — that is a **frontend claim**, not an enabled wallet method in checkout code.

Automatic Mollie wallet availability is **not** wired in this Components integration. Domain verification / Mollie method activation may matter on the **collector/Mollie account**, but NovaLikes checkout does not surface wallets today.

---

## 9. Card security wording (do not rewrite)

| Location | Wording |
|----------|---------|
| Checkout UI (`ui.checkout.encryptedPayment`) | “Encrypted payment · we never store full card numbers” |
| Checkout UI (`ui.checkout.cardProcessedSecurely`) | “Card payments are processed securely” |
| Mollie fields intro | “Secure payment powered by Mollie.” |
| Privacy (`data/content/legal/privacy.ts`) | Card details entered on third-party payment collector; NovaLikes does not store complete card numbers |
| Terms | Card payments via third-party collector; no complete card numbers stored on NovaLikes |

Visible checkout component path: `components/commerce/checkout/payment-methods.tsx` + `mollie-card-fields.tsx`.

---

## 10. Success / cancel / return / webhook URLs

Built with `getSiteUrlPath` → `NEXT_PUBLIC_SITE_URL` or `SITE_URL` (fallback localhost).

With production origin `https://novalikes.com`:

| Purpose | URL |
|---------|-----|
| Success / return | `https://novalikes.com/order-success?orderId=…&email=…` |
| Cancel | `https://novalikes.com/checkout?cancelled=1&orderId=…` |
| Webhook (callback) | `https://novalikes.com/api/webhooks/remote-payment` |
| Checkout (same origin) | `https://novalikes.com/checkout` |

`NEXT_PUBLIC_CHECKOUT_URL` is **ignored** (no checkout subdomain).

No InstantViral payment URLs found under `lib/payments`.

Remote collector may host intermediate Mollie/3DS pages; those are returned dynamically in the create-payment redirect body (not fixed in NovaLikes).

---

## 11. Remote payment webhook audit

Route: `POST /api/webhooks/remote-payment`

| Check | Behavior |
|-------|----------|
| Auth | HMAC signature over `orderId|txnId|price|currency|callbackTs` with shared secret |
| Freshness | `callback_ts` within −900s / +300s |
| Required | `order_id`, `txn_id`, `payment_status=paid`, secret ≥16 |
| Amount/currency | Must match order total (major units) and currency |
| Order lookup | `getOrderById` |
| Paid transition | `markOrderPaymentStatus({ status: 'paid' })` |
| Idempotency | `isWebhookAlreadyProcessed('remote-payment', txnId)` → `OK` |
| Failed/cancel statuses | Not accepted (`payment_status` must be `paid`) |

**Redirect alone cannot mark paid** — only signed webhook with `payment_status=paid`.

---

## 12. Stripe pause mechanism

| Layer | Behavior |
|-------|----------|
| `config/payments.ts` | `stripe.enabled: false` |
| `executeCheckout` | Rejects any method other than `remote-payment` |
| `PaymentGatewayManager.getProvider` | Only returns enabled providers |
| Stripe provider code | Still present; requires `isStripeConfigured()` |
| Webhook route | Returns **503** if Stripe not fully configured |

Stripe does **not** auto-activate merely because keys exist, while `enabled: false` and checkout hard-gate remain.

Future reactivation needs **explicit** code/config enable (`payments.ts` + checkout allowlist), not only env keys.

---

## 13. Production payment mode

- `IV_PAYMENTS_MODE=mock` works **only** when `NODE_ENV !== 'production'`.
- Production + `IV_PAYMENTS_MODE=mock` → env validation **error**.
- Correct production setting: **`IV_PAYMENTS_MODE` unset / absent** (do not set `mock`).

---

## 14. Contabo setup ownership

| Variable / Setting | NovaLikes Contabo | Remote Collector | Mollie Dashboard | Stripe Dashboard | Required Now |
|--------------------|-------------------|------------------|------------------|------------------|--------------|
| `NEXT_PUBLIC_SITE_URL=https://novalikes.com` | ✓ | | | | Yes |
| `REMOTE_PAYMENT_WEBSITE_URL` | ✓ | | | | Yes |
| `REMOTE_PAYMENT_SHARED_SECRET` (match collector) | ✓ | ✓ | | | Yes |
| `REMOTE_PAYMENT_PRODUCT_NAME` | ✓ | (must accept) | | | Optional |
| Mollie live API key | | ✓ | ✓ create/issue | | Yes (on collector) |
| Mollie profile / website | | ✓ | ✓ | | Yes |
| Card method enabled | | | ✓ | | Yes |
| Currency USD alignment | ✓ catalog | ✓ must match | ✓ | | Yes |
| Webhook/callback to NovaLikes | receives | sends | | | Yes |
| `IV_PAYMENTS_MODE` | unset | | | | Yes (absent) |
| Stripe keys | leave unset | | | inactive | Yes (paused) |
| Stripe webhook endpoint | may remain deployed | | | do not point live | Prefer inactive |

---

## 15. Stripe variables — action while paused

| Variable | Classification |
|----------|----------------|
| `STRIPE_SECRET_KEY` | server secret → **leave unset while paused** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | frontend/public → **leave unset while paused** |
| `STRIPE_PUBLISHABLE_KEY` | server alias → **leave unset while paused** |
| `STRIPE_WEBHOOK_SECRET` | webhook only → **leave unset while paused** |

Leaving them unset is safest. If accidentally present but incomplete → warning only. Fully present still does **not** enable checkout Stripe while `enabled: false`.

Recommend: **do not** register an active live Stripe webhook to NovaLikes while paused.

---

## 16. Mollie dashboard tasks (applicable to this design)

Must be true on the **collector’s** Mollie account (inferred from protocol; NovaLikes does not call Mollie API directly):

- Live API key configured on collector (not test) for production
- Profile with Components / card payments usable (`pfl_…` returned by health)
- Currency compatible with NovaLikes **USD** orders
- Card payment method enabled
- Collector able to complete payments and POST signed callbacks to `https://novalikes.com/api/webhooks/remote-payment`

Apple Pay / Google Pay dashboard toggles are **not required for current NovaLikes UI** (wallets not implemented in Components checkout).

---

## 17. Frontend payment claims vs support

| Claim / mark | Where | Supported by current live path? |
|--------------|-------|----------------------------------|
| Credit / Debit Card | Checkout provider label | Yes (Mollie Components) |
| Visa / Mastercard / Amex / Discover | Checkout + footer | Cards via Mollie — Discover depends on Mollie account/methods (not coded) |
| Apple Pay | Footer only | **Unsupported claim** (not in checkout Components) |
| Google Pay | — | Not claimed; not implemented |
| Mollie | Checkout “powered by Mollie” | Yes |
| Stripe | Not shown as live method | Paused |

**Flag:** Footer `Apple Pay` mark is unsupported by current integration.

---

## 18. USD

- Catalog source currency: **USD** (`data/pricing/packages.ts`).
- Amounts stored as **minor units** (cents) in orders/cart.
- Sent to collector as **major-unit** string via `formatMajorAmount` (e.g. `9.99`) + `currency: USD`.
- Checkout rejects mismatched client totals vs server recalculation.
- Client cannot set arbitrary charge currency independently of package currency.

---

## 19. Production failure conditions

| Condition | Behavior |
|-----------|----------|
| Shared secret missing (&lt;16) | `isRemotePaymentConfigured()` false → checkout **503** / payments disabled (unless mock, which production blocks) |
| Collector URL missing | Unlikely — code defaults to `https://carrycubes.com`; still needs secret |
| Collector unreachable / bad response | `createPayment` throws → place-order provider error (~502) |
| Mollie rejects / invalid card token | Fail at token or collector response; order may exist **pending unpaid** |
| Webhook never arrives | Order stays unpaid; success page may show pending |
| Wrong webhook signature / stale ts | **403**; not paid |
| Amount/currency mismatch | **409**; not paid |
| Stripe keys absent | Expected while paused; Stripe webhook **503** |
| Stripe keys accidentally present | Checkout still remote-only; Stripe not selectable |

---

## 20. Deployment checklist (do not execute)

### A. BEFORE PULL
- Confirm Contabo Postgres backup
- Confirm collector (e.g. carrycubes) is live with matching shared secret
- Confirm Mollie account is **live** (not test) on collector

### B. AFTER GIT PULL
- Install deps / migrate DB as usual
- Do not enable Stripe in `config/payments.ts`

### C. NOVALIKES `.env`
- `NEXT_PUBLIC_SITE_URL=https://novalikes.com`
- `REMOTE_PAYMENT_WEBSITE_URL=<collector https base>`
- `REMOTE_PAYMENT_SHARED_SECRET=<same as collector, ≥16>`
- Optional `REMOTE_PAYMENT_PRODUCT_NAME=Cubes`
- **Do not set** `IV_PAYMENTS_MODE`
- **Leave unset:** all `STRIPE_*` / publishable keys

### D. REMOTE PAYMENT COLLECTOR `.env`
- Mollie **live** API key
- Shared secret identical to NovaLikes
- Currency USD
- Callback target must reach `https://novalikes.com/api/webhooks/remote-payment`

### E. MOLLIE DASHBOARD
- Live mode keys on collector
- Cards enabled
- Profile ID healthy (`/?wrp_mollie_health=1` → `ok`, `profile_id`, `testmode:false`)

### F. STRIPE PAUSED STATE
- No live Stripe keys in NovaLikes env
- No active Stripe Dashboard webhook to NovaLikes (or leave disabled)
- Keep Stripe code undeleted

### G. BUILD / RESTART
- Production build + process restart per Contabo runbook
- Verify `NODE_ENV=production`

### H. PAYMENT WEBHOOK TEST
- Health check from NovaLikes Admin/settings or `GET /api/payments/mollie-config` (expects live profile, ideally `testmode:false`)
- Place low-value order; confirm collector callback hits webhook and order `payment.status=paid`

### I. LIVE $ TEST
- Real card via Components
- Complete any 3DS redirect
- Confirm order-success + admin order paid + no Stripe involvement

### J. FINAL VERIFICATION
- Cancel path returns to `/checkout?cancelled=1` unpaid
- Duplicate webhook returns OK without double side effects
- Footer Apple Pay claim noted as marketing mismatch (content change out of scope here)

---

## Final return summary

1. **Primary provider:** `remote-payment` (Mollie Components + collector)  
2. **Mollie location:** **C. both** (Components on NovaLikes; API/charge on collector)  
3. **Payment UI:** Inline Mollie Components + possible 3DS redirect  
4. **Collector architecture:** Signed `POST {url}/?ro=1` → redirect URL; signed paid callback webhook  
5. **Required NovaLikes env names:** `NEXT_PUBLIC_SITE_URL`, `REMOTE_PAYMENT_WEBSITE_URL`, `REMOTE_PAYMENT_SHARED_SECRET`; unset `IV_PAYMENTS_MODE`  
6. **Required collector env names:** Mollie API key + matching shared secret (+ server URL/config on that host — not in NovaLikes repo)  
7. **Required Mollie config:** live key, card methods, profile, USD  
8. **Live/test control:** collector `testmode` flag; **NovaLikes does not block test mode in production**  
9. **Apple Pay:** not implemented (footer claim unsupported)  
10. **Google Pay:** not implemented  
11. **Remote webhook security:** HMAC + timestamp + amount/currency checks + idempotency  
12. **Stripe pause:** `enabled:false` + checkout hard-gate to remote-payment  
13. **Stripe env action:** leave all Stripe vars **unset**  
14. **Stripe webhook state:** route can remain deployed; returns 503 without keys — keep Dashboard inactive  
15. **Production payment mode:** do **not** set `IV_PAYMENTS_MODE` (especially not `mock`)  
16. **Success URL:** `https://novalikes.com/order-success?orderId=…&email=…`  
17. **Cancel URL:** `https://novalikes.com/checkout?cancelled=1&orderId=…`  
18. **Webhook URL:** `https://novalikes.com/api/webhooks/remote-payment`  
19. **Currency:** USD (minor units internally; major units to collector)  
20. **Unsupported claims:** Footer **Apple Pay**; Discover depends on Mollie account  
21. **Contabo setup:** site URL, remote URL, shared secret, no mock, no Stripe keys  
22. **Collector setup:** live Mollie key, matching secret, USD, callbacks to NovaLikes  
23. **Mollie dashboard:** live cards/profile; wallets optional/not used by UI  
24. **Stripe dashboard:** no active production webhook; retain account for future  
25. **Production blockers:** missing shared secret; collector down; collector still in `testmode`; currency mismatch; webhook not reachable  
26. **Checklist:** section 20 above  
27. **Files changed:** **NONE**  
28. **NO COMMIT**  
29. **NO PUSH**  
30. **NO DEPLOY**

---

**Audit complete. No repository modifications.**
