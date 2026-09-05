# Order public number allocation — production fix

**Date:** 2026-09-05  
**Project:** NovaLikes  
**Verdict:** **A. PUBLIC ORDER NUMBER ALLOCATION FIXED**  
**Constraints:** NO COMMIT / NO PUSH / NO DEPLOY (this report authored pre-commit)

---

## 1. Exact root cause

Checkout persisted order `IV-MTOJP6Z3-U5OI` with `public_number = NULL`. Sequence `orders_public_number_seq` remained at `last_value=1001, is_called=false` (nextval never called). `executeCheckout` then rejected with **"Order public number was not allocated."**

On retry, idempotency returned the same NULL-public-number row **without repair**, so checkout could not proceed and nextval still was not called.

## 2. Why nextval was not called

`placeOrder` only called `allocatePublicOrderNumber()` → `nextval()` on the **new-order** path after an idempotency miss.

Production evidence (`is_called=false`) proves that path never successfully ran for this order. The durable row was inserted **without** going through sequence allocation (pre-allocation deploy / partial rollout / insert path that allowed NULL), then later requests hit idempotency and returned that row as-is.

## 3. Why order persisted with NULL public_number

Postgres `saveOrder` previously **allowed** inserting `public_number = NULL` for new rows. Combined with a create path that did not attach an allocated number (or returned an idempotent NULL row), the order was stored without a public number.

`saveOrder` also returned the in-memory input object rather than a re-hydrated DB row, so mapper gaps were harder to catch.

## 4. Production code path before

```
place-order API
→ executeCheckout
→ placeOrder
   → idempotency hit? return existing (even if public_number NULL)  ❌
   → else allocatePublicOrderNumber() + saveOrder (NULL inserts allowed) ❌
→ executeCheckout requires publicNumber → error "Order public number was not allocated."
```

## 5. Production code path after

```
place-order API
→ executeCheckout
→ placeOrder
   → idempotency hit + publicNumber present → return existing
   → idempotency hit + publicNumber NULL → ensurePublicOrderNumber(orderId)
        (FOR UPDATE / conditional UPDATE + nextval) → return repaired same id
   → else nextval → saveOrder (REFUSES new NULL) → hydrate return
→ executeCheckout continues with publicNumber
→ Mollie order_id = toMollieOrderId(publicNumber) e.g. "1001"
```

## 6. Fresh-order allocation behavior

1. Idempotency miss  
2. `SELECT nextval('orders_public_number_seq')`  
3. INSERT with that `public_number`  
4. Re-hydrate and return `publicNumber`  
5. Display `01001`, Mollie `"1001"`

## 7. Existing failed-order repair behavior

For `IV-MTOJP6Z3-U5OI` (NULL) on the **same idempotency key**:

1. Lookup existing order  
2. `ensurePublicOrderNumber(id)`  
3. Lock row / conditional update  
4. `nextval` → currently **1001** (`is_called=false`)  
5. `UPDATE … SET public_number = 1001 WHERE public_number IS NULL`  
6. Return same internal id with `publicNumber=1001`

No duplicate order.

## 8. Concurrency protection

- Postgres: transaction + `SELECT … FOR UPDATE` + `UPDATE … WHERE public_number IS NULL`  
- Concurrent repairs: at most one public number stuck on the order  
- Application still uses `nextval()` (never `MAX()+1`)

## 9. Idempotent retry behavior

Same checkout key → same internal order → same public number after repair → no second `order_created` analytics on pure idempotent return → cart recovery still links by internal id → no duplicate conversion/revenue from public-number repair alone.

## 10. Postgres mapper behavior

`hydrateOrder` maps `row.publicNumber` → `order.publicNumber`.  
`saveOrder` now returns **hydrated** persisted order (not only the input object).

## 11. Migration required

**NO** — `0010` already applied; no `0011`.

## 12. First successful Order ID

Customer-facing: **`01001`** (sequence value `1001`) for the repaired/first allocated order.

## 13. Mollie order_id

**`"1001"`** (unpadded digits via `toMollieOrderId`)

## 14. Historical compatibility

Historical IV-only rows may keep `public_number NULL`. New inserts without a number are refused (tests may opt in with `allowNullPublicNumber` for fixtures only).

## 15. Files changed

- `lib/orders/create.ts` — repair on idempotent NULL; verify after save  
- `lib/orders/store.ts` — `ensurePublicOrderNumber` facade  
- `lib/orders/sequence-nextval.ts` — robust nextval result parsing  
- `lib/persistence/types.ts` — required allocate + ensure  
- `lib/persistence/postgres.ts` — nextval parse, ensure+lock, refuse NULL insert, hydrate return  
- `lib/persistence/memory.ts` / `file.ts` — same contracts  
- `lib/orders/__tests__/public-order-number-allocation.test.ts` — new  
- `lib/orders/__tests__/public-order-number.test.ts` — historical fixture flag  
- `reports/order-public-number-allocation-production-fix.md` — this file  

Unchanged: Mollie HMAC/testmode, Stripe paused, analytics event ids, cart recovery schedule, `0010` migration.

## 16–19. Validation

- **Lint:** pass (existing warnings only; exit 0)
- **Typecheck:** `npx tsc --noEmit` pass
- **Tests:** 684 passed | 36 skipped (includes allocation/repair suite)
- **Build:** pass

## 20–22

**NO COMMIT / NO PUSH / NO DEPLOY**

## FINAL VERDICT

**A. PUBLIC ORDER NUMBER ALLOCATION FIXED**
