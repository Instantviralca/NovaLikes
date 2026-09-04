# Final Mollie production safety fix

Date: 2026-09-04  
Scope: Fix only the two confirmed issues from `reports/mollie-stripe-production-config-audit.md`  
(1) reject collector `testmode: true` in production; (2) remove unsupported wallet claims.  
No payment architecture redesign. No commit / push / deploy.

---

## Return checklist

### 1. Production testmode guard location(s)

| Location | Behavior |
| --- | --- |
| `lib/payments/mollie-remote-protocol.ts` | `readCollectorTestMode`, `assertNoMollieTestModeInProduction`, `MollieTestModeRejectedError`; also enforced inside `fetchMollieHealth` |
| `app/api/webhooks/remote-payment/route.ts` | After HMAC verify, reject trusted `testmode` / `test_mode` / `testMode` when `isProductionRuntime()` |
| `lib/payments/providers/remote-payment.ts` | Production `createPayment` calls collector health and asserts before `/?ro=1` |
| `app/api/payments/mollie-config/route.ts` | Maps `MollieTestModeRejectedError` → HTTP 503 (Components config blocked) |

Guard rule: `NODE_ENV === "production"` and `IV_ENV !== "test"` (`isProductionRuntime()`). Only trusted collector/server fields after signature or health response — never client-supplied flags alone.

### 2. Webhook testmode behavior before

Signed `POST /api/webhooks/remote-payment` accepted `payment_status=paid` with a valid HMAC even when the collector payload included `testmode: true`. Production could mark the order paid, complete fulfilment path side-effects via `markOrderPaymentStatus` (including cart-recovery conversion), with no testmode check.

### 3. Webhook testmode behavior after

In production, after signature verification, if trusted collector fields indicate testmode:

- HTTP **409** plain text: `Test mode payments are not accepted in production.`
- Server log: `[mollie] rejected testmode payload in production`
- **No** `markOrderPaymentStatus`
- **No** order completed / paid transition
- **No** cart-recovery conversion
- **No** revenue counting via paid path

Non-production (`development` / test) still accepts signed `testmode: true` webhooks.

### 4. Can test transaction mark production order paid: **NO**

### 5. Live Mollie flow changed: **NO**

Collector URL (`REMOTE_PAYMENT_WEBSITE_URL` / `/?ro=1`), HMAC shared secret, Components UI, order lifecycle, and live webhook paid path (payload without testmode) are unchanged. Only fail-closed rejection of explicit testmode in production was added.

### 6. Stripe status: **PAUSED**

`config/payments.ts`: `stripe.enabled: false`. Enabled providers remain `['remote-payment']` only.

### 7. Stripe env required: **NO**

`STRIPE_*` remain unset / not required for checkout. Stripe cannot activate merely because code exists.

### 8. Apple Pay claim removed from

- `components/navigation/footer.tsx` (`PAYMENT_MARKS`)

No other live customer-facing Apple Pay claims found in TS/TSX.

### 9. Google Pay claim status

**Absent** — was not claimed on live surfaces; remains not claimed. Not implemented in checkout.

### 10. Remaining payment methods displayed

- Checkout method label: **Credit / Debit Card** (`remote-payment`)
- Trust copy: **Secure card payments** (footer marks + checkout; generic wording preferred because card-brand support is not proven from current Mollie Components config in repo)
- Supporting checkout copy: card processed securely / encrypted / secure checkout (existing strings)

Visa / Mastercard / Amex / Discover / Apple Pay badges were removed from the customer-facing claim surfaces audited for this fix.

### 11. Cart recovery conversion protected

Yes. Rejected production testmode webhooks never call `markOrderPaymentStatus`, so `markCartRecoveryConverted` is not triggered. Regression test D asserts session `status !== 'converted'` and order remains unpaid.

### 12. Files changed (this fix)

- `lib/payments/mollie-remote-protocol.ts`
- `app/api/webhooks/remote-payment/route.ts`
- `lib/payments/providers/remote-payment.ts`
- `app/api/payments/mollie-config/route.ts`
- `components/navigation/footer.tsx`
- `components/commerce/checkout/payment-methods.tsx`
- `lib/payments/__tests__/mollie-production-testmode.test.ts` (new)
- `reports/final-mollie-production-safety-fix.md` (this file)

### 13. Lint

**PASS** (`npm run lint`) — existing unused-var warnings only; none introduced as errors by this fix.

### 14. Typecheck

**PASS** (`npx tsc --noEmit`)

### 15. Tests

**PASS** (`npm test`) — 624 passed | 36 skipped (101 files passed | 4 skipped).  
New suite: `lib/payments/__tests__/mollie-production-testmode.test.ts` covers A–F plus Stripe paused assertion.

### 16. Build

**PASS** (`npm run build`)

### 17. NO COMMIT

Confirmed — no git commit created.

### 18. NO PUSH

Confirmed — no push.

### 19. NO DEPLOY

Confirmed — no deploy.

---

## QA verification summary

| Check | Result |
| --- | --- |
| Production testmode payment cannot become paid | Yes (409 + unpaid) |
| Live remote-payment webhook still valid | Yes (no testmode → 200 paid) |
| Signed webhook still required | Yes (unchanged HMAC gate before testmode check) |
| Redirect cannot mark paid | Yes (order-success only reflects existing paid status; F leaves pending) |
| Stripe remains disabled | Yes |
| Apple Pay claim removed | Yes (footer) |
| Google Pay claim absent unless supported | Absent / unsupported |
| No unsupported wallet badges remain | Yes (customer-facing TS/TSX) |
| No payment secrets exposed client-side | Unchanged — shared secret server-only; mollie-config exposes profileId/testmode/currency only |

---

## Non-production behavior

`assertNoMollieTestModeInProduction` is a no-op when not `isProductionRuntime()`. Local/dev/test may continue using collector `testmode: true`. `IV_PAYMENTS_MODE` was not introduced and is not required in production.
