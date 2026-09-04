# Final payment production runtime guard

Date: 2026-09-04  
Scope: Remove `IV_ENV=test` fail-open bypass from Mollie/collector **testmode** rejection when `NODE_ENV === "production"`.  
No architecture redesign. No commit / push / deploy.

---

## Return checklist

### 1. Previous production-runtime condition

Payment testmode guard used `isProductionRuntime()`:

```ts
NODE_ENV === "production" && IV_ENV !== "test"
```

If a production host accidentally set `IV_ENV=test`, Mollie `testmode: true` rejection was disabled (fail-open).

The `createPayment` health pre-check used the same `isProductionRuntime()` gate, so it could also be skipped under that misconfiguration.

### 2. New production-runtime condition

Payment security only:

```ts
NODE_ENV === "production"
```

Applied in:

- `assertNoMollieTestModeInProduction` (`lib/payments/mollie-remote-protocol.ts`)
- production health pre-check in `lib/payments/providers/remote-payment.ts`

`IV_ENV` is ignored for this guard. Unrelated `isProductionRuntime()` / `IV_ENV` uses elsewhere were left unchanged.

### 3. Can IV_ENV=test bypass production payment guard: **NO**

### 4. Production testmode rejected: **YES**

### 5. Development/test flow preserved: **YES**

`NODE_ENV=development` / `NODE_ENV=test` may still accept collector `testmode: true` for local/test workflows.

### 6. Stripe status: **PAUSED**

`config/payments.ts` → `stripe.enabled: false`. `STRIPE_*` remain unnecessary.

### 7. Tests

**PASS** (`npm test`) — 626 passed | 36 skipped.

Regression coverage in `lib/payments/__tests__/mollie-production-testmode.test.ts`:

1. `NODE_ENV=production` + `IV_ENV=test` + `testmode=true` → rejected  
2. `NODE_ENV=production` + `IV_ENV` unset + `testmode=true` → rejected  
3. `NODE_ENV=production` live payment → allowed  
4. `NODE_ENV=development` / `test` + `testmode=true` → allowed  
5. Production testmode webhook cannot mark paid / fulfil / convert cart recovery / count recovered revenue  

### 8. Lint

**PASS** (`npm run lint`) — existing unused-var warnings only.

### 9. Typecheck

**PASS** (`npx tsc --noEmit`)

### 10. Build

**PASS** (`npm run build`) — see validation run for this change.

### 11. NO COMMIT

Confirmed.

### 12. NO PUSH

Confirmed.

### 13. NO DEPLOY

Confirmed.

---

## Files touched

- `lib/payments/mollie-remote-protocol.ts`
- `lib/payments/providers/remote-payment.ts`
- `app/api/webhooks/remote-payment/route.ts` (comment only)
- `lib/payments/__tests__/mollie-production-testmode.test.ts`
- `reports/final-payment-production-runtime-guard.md` (this file)
