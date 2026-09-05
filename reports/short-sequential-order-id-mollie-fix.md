# Short sequential order ID + Mollie Invalid order ID fix

**Date:** 2026-09-05  
**Project:** NovaLikes (`C:\Users\HUSSNAIN.COM\Novalikes`)  
**Verdict:** **A. SHORT ORDER ID + MOLLIE FLOW FIXED**

---

## 1. Root cause of "Invalid order ID"

The remote Mollie collector (WooCommerce Mollie Remote Payment server) validates `order_id` with WordPress `absint()`. Non-numeric strings become `0`, which fails validation and returns HTTP 400 with body `Invalid order ID.`

NovaLikes was sending the internal order primary key (`IV-{base36}-{rand}`) as `order_id`. `absint('IV-…') === 0` → production error shown on checkout.

## 2. Current ID sent before fix

`order_id: order.id` where `order.id` is e.g. `IV-M5ABCDE-F1G2` (opaque text), via `buildMollieCreateBody({ orderId: input.orderId })` from `executeCheckout` → `createPayment({ orderId: order.id })`.

## 3. New internal ID architecture

- **Unchanged** primary key: `orders.id` TEXT — `IV-{stamp}-{rand}` via `createOrderId()`.
- Used for DB relations, cart recovery linkage, analytics event IDs, notification idempotency keys, admin API routes.
- Not sent to Mollie; not the primary customer-facing Order ID for new orders.

## 4. New public Order ID architecture

- Column: `orders.public_number` INTEGER (nullable for historical rows).
- Sequence value e.g. `1001`.
- Display: `formatOrderNumber(1001)` → `"01001"`.
- Canonical helpers in `lib/orders/public-number.ts`:
  - `formatOrderNumber`
  - `toMollieOrderId`
  - `parsePublicOrderNumber`
  - `getCustomerOrderId`

## 5. Sequence start

- Postgres sequence `orders_public_number_seq` starts at **1001**.
- Migration `setval` uses `GREATEST(1000, MAX(existing public_number))` so collisions with any future backfill are avoided.
- Memory/file drivers start at `PUBLIC_ORDER_NUMBER_START = 1001`.

## 6. Concurrency strategy

- **Postgres:** `SELECT nextval('orders_public_number_seq')` (atomic).
- **Memory/file:** synchronous counter increment (safe under Node’s single-threaded event loop for tests/dev).
- Application does **not** use `MAX(public_number)+1`.
- Allocation runs only after idempotency miss so retries do not burn sequence values.

## 7. DB migration added

`drizzle/0010_order_public_number.sql` (additive after `0009_analytics_milestone_idempotency.sql`):

- Creates sequence starting at 1001
- Adds nullable `public_number`
- Syncs sequence from `MAX(public_number)`
- Unique partial index `orders_public_number_uidx`

## 8. First new public order expected

After migration apply: **`01001`** (sequence value `1001`).

## 9. Display format

Minimum 5 digits, left-padded with zero; no wrap after 99999:

| Sequence | Display |
|----------|---------|
| 1001 | 01001 |
| 1002 | 01002 |
| 9999 | 09999 |
| 10000 | 10000 |

## 10. Exact collector order ID type expected

**Digits-only string that `absint()` accepts as a positive integer.**

Form field is always a string (`application/x-www-form-urlencoded`). Collector does **not** require a JSON number type.

## 11. Exact value NovaLikes sends for example 01001

Customer display: `"01001"`  
Mollie `order_id` (create + HMAC): **`"1001"`** (unpadded digit string via `toMollieOrderId(1001)`).

Rationale: callback returns the same numeric identity; leading zeros would be lost by `absint` / numeric normalization and break signature reconciliation if create signed `"01001"` but callback signed `"1001"`.

## 12. Webhook lookup method

After HMAC + timestamp + testmode guards:

1. `getOrderByPaymentId('remote_' + order_id)`
2. Else `getOrderByPublicNumber(parsePublicOrderNumber(order_id))`
3. Else `getOrderById(order_id)` (legacy IV- rows)

`markOrderPaymentStatus` always receives the **internal** `order.id`. Unsigned / bad signature → 403. Unknown number → 404.

## 13. Track Order behavior

Accepts `01001` / `1001` and legacy `IV-…` via `resolveOrderByCustomerRef`. Public projection shows `getCustomerOrderId(order)`.

## 14. Success page behavior

Shows `Order ID: 01001` (resolved via `resolveOrderByCustomerRef` + `getCustomerOrderId`). Success/cancel URLs use the public display id.

## 15. Email behavior

`lib/notifications/order-hooks.ts` template variable `orderId` and tracking links use `getCustomerOrderId(order)` (e.g. `01001`). Internal notification `orderId` / idempotency keys remain the IV- id.

## 16. Admin behavior

Orders table / drawer / summary / dashboard widgets show **`publicOrderId`** (e.g. `01001`) as the primary customer reference. Internal IV- id remains for open/API and is shown as secondary “Internal ID” when different.

## 17. Cart recovery compatibility

Linkage and conversion still use **internal** `order.id`. Converted-once semantics unchanged. No customer-facing recovery order reference required a public rewrite beyond checkout/email surfaces already updated.

## 18. Analytics compatibility

Server analytics continue to key `order_created` / `payment_paid` / `order_completed` by **internal** `order.id` (`analytics:payment_paid:${order.id}`). Public number change does not duplicate paid/revenue events.

## 19. Historical-order compatibility

Existing IV-only rows keep `public_number = NULL`. Track/success still resolve by IV- id. No bulk rewrite.

## 20. Stripe status

**Paused** — `config/payments.ts` keeps `stripe.enabled: false`; only `remote-payment` enabled.

## 21. Files changed

**Added**

- `drizzle/0010_order_public_number.sql`
- `lib/orders/public-number.ts`
- `lib/orders/__tests__/public-order-number.test.ts`
- `reports/short-sequential-order-id-mollie-fix.md`

**Updated (core)**

- `lib/db/schema.ts`
- `types/order.ts`
- `types/admin-orders.ts`
- `types/admin-dashboard.ts`
- `lib/persistence/types.ts`
- `lib/persistence/postgres.ts`
- `lib/persistence/memory.ts`
- `lib/persistence/file.ts`
- `lib/orders/store.ts`
- `lib/orders/create.ts`
- `lib/checkout/execute.ts`
- `app/api/webhooks/remote-payment/route.ts`
- `lib/notifications/order-hooks.ts`
- `lib/tracking/lookup.ts`
- `app/api/orders/track/route.ts`
- `app/(commerce)/order-success/page.tsx`
- `lib/admin/orders.ts`
- `lib/admin/dashboard.ts`
- Admin/dashboard UI components for public order display
- `lib/orders/__tests__/orders-flow.test.ts`
- `lib/payments/__tests__/mollie-production-testmode.test.ts`

## 22. Lint

`npm run lint` — **pass** (existing unused-var warnings only; exit 0).

## 23. Typecheck

`npx tsc --noEmit` — **pass**.

## 24. Tests

`npm test` — **666 passed**, 36 skipped.

Includes A–R coverage in `lib/orders/__tests__/public-order-number.test.ts` plus updated Mollie safety tests.

## 25. Build

`npm run build` — **pass**.

## 26. NO COMMIT

No git commit created for this change.

## 27. NO PUSH

No push performed.

## 28. NO DEPLOY

No deploy performed. Apply `drizzle/0010_order_public_number.sql` on production before relying on live checkout.

---

## Deploy note

Before production traffic:

1. Apply migration `0010_order_public_number.sql`.
2. Confirm sequence starts at 1001 (or higher if any `public_number` already exists).
3. Smoke: place order → Mollie create succeeds → webhook marks paid → Track Order `01001`.

## FINAL VERDICT

**A. SHORT ORDER ID + MOLLIE FLOW FIXED**
