# Native analytics milestone dedupe fix

**Date:** 2026-09-05  
**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`  
**Verdict:** **A. ANALYTICS SESSION DEDUPE FIXED**

NO COMMIT · NO PUSH · NO DEPLOY

---

## 1. Exact root cause

`PageViewTracker` treated remounts as landings:

```ts
const shouldEmitLanding = isNewSession || landedSessionId.current !== sessionId;
```

`landedSessionId` is a React ref. On remount (layout remount, hydration, Strict Mode, hard refresh with a still-valid cookie session), the ref resets to `null`, so `landedSessionId.current !== sessionId` is true even when `isNewSession === false`. That re-emitted `session_started` + `landing_view` for the same cookie `session_id`.

Client dedupe TTL was only **2 seconds** and used random event IDs. The collect API accepted every row with no milestone idempotency. Session upsert already preserved first-touch fields, but events were still inserted.

---

## 2. Why `session_started` duplicated

Same remount path: tracker re-fired `session_started` whenever the component-mounted landing guard reset, regardless of an existing `analytics_sessions` row.

---

## 3. Why `landing_view` duplicated

Paired with `session_started` in the same `shouldEmitLanding` branch, so every remount/hard-refresh re-send created another `landing_view` for the same session.

---

## 4. Why `checkout_started` duplicated

Checkout used a component ref (`checkoutViewSent`). Remounts (cart hydrate, leave/revisit checkout) reset the ref and re-fired. Server stored each fire as a new row (random id). Funnel secondary KPI previously counted raw rows; primary funnel already used Sets but checkout remounts still polluted raw counts.

---

## 5. Session creation logic before

- Client: cookie inactivity (30m) → new `nl_session_id` + `isNewSession=true`, but milestones also fired on remount via ref OR.
- Server: upsert session on first event in batch; `ON CONFLICT` only updated `last_activity_at`.
- Events: always inserted; no link between “session row created” and milestone emission.

## 6. Session creation logic after

- Client: milestones only when `isNewSession && !sessionStorage/module marker`.
- Server: `upsertAnalyticsSession` returns `{ created: boolean }` via insert-then-conflict (atomic).
- `session_started` / `landing_view` kept **only** when `created === true`.
- Deterministic ids/keys: `session:<id>:started`, `session:<id>:landing`.
- If a new session is created without client milestones, server synthesizes them once from the first path in the batch.

---

## 7. Landing logic before

First path of a “perceived” new mount (ref-based), re-emitted on every remount; could overwrite conceptual landing in event stream (session row landing path was already protected).

## 8. Landing logic after

Exactly one `landing_view` per `session_id` (DB + client). Session row `landing_path` / UTM / referrer still set only on insert; conflicts only refresh `last_activity_at`.

---

## 9. DB-level idempotency

Nullable `analytics_events.idempotency_key` with unique index for non-null values. Milestone events use deterministic `id` **and** `idempotency_key`. Inserts use `ON CONFLICT DO NOTHING` (PK and unique key). Memory/file stores mirror key checks.

## 10. Migration added

`drizzle/0009_analytics_milestone_idempotency.sql`  
(Does not edit `0008`. Does not delete historical duplicate rows.)

## 11. Concurrency protection

- Session: `INSERT … ON CONFLICT DO NOTHING RETURNING` → only one creator.
- Milestones: deterministic PK + unique idempotency key; in-batch key dedupe before insert.

## 12. Page-view behavior

- Still multi-fire for real navigations (`page_view` / `service_view`).
- Module-level last-path-by-session blocks remount double-fire of the same path.
- Hard refresh of an active session: milestones stay 1; an extra `page_view` is allowed (real reload).
- KPI page views exclude `landing_view` (milestone emitted alongside the first page_view).

## 13. Funnel DISTINCT-session logic

Stages (distinct `session_id`):

Landing → Service view → Cart → Checkout → Order created → Paid

Checkout KPI labeled **Checkout sessions** (distinct). Cart raw adds remain raw; Cart funnel stage is distinct.

## 14. Visitors source

Prefer `analytics_sessions.visitor_id` when session rows exist; else distinct `visitor_id` / `session:` fallback from events.

## 15. Sessions source

Prefer `analytics_sessions` rows in range (source of truth). Fallback: distinct `session_id` from events.

## 16. Paid-order source

Distinct `payment_paid` by `properties.orderId` (server-only). Legacy `purchase` ignored for paid/revenue.

## 17. Revenue source

Sum of `amountMinor` on distinct trusted `payment_paid` orders (server recorder).

## 18. Legacy-event handling

| Metric | Canonical | Legacy mapping |
|--------|-----------|----------------|
| Landing | `landing_view`, `session_started` | `page_view` / `home_page_view` / `service_*` only if `visitorId` missing |
| Cart | `cart_add` | `cart_item_add` |
| Checkout | `checkout_started` | `checkout_view`, `checkout_submit` |
| Page views | `page_view`, `service_view` | `home_page_view`, `service_page_view` |
| Paid / revenue | `payment_paid` only | `purchase` not counted |

Legacy rows are not deleted.

## 19. Existing duplicate-data handling

Historical duplicate milestone rows retained. Dashboard uses distinct sessions / session table. Notice when duplicates detected:

> Raw event table contains early rollout duplicates of session_started/landing_view, but dashboard metrics dedupe sessions and future events are idempotent.

## 20. Market/locale normalization

Blank/null was **missing client attribution** (enqueue never set market/locale), not intentional “default English” encoding.

Fix: resolve from path (`/ca|au|us|uk/`, locales, else `locale=en`, `market=null`). Admin groups null/`en` as **Default / Global English**; markets/locales labeled (Canada, Australia, United States, United Kingdom, language names). SEO routing unchanged.

---

## 21. Files changed

- `drizzle/0009_analytics_milestone_idempotency.sql` (new)
- `lib/analytics/native/milestones.ts` (new)
- `lib/analytics/__tests__/milestone-dedupe.test.ts` (new)
- `app/api/analytics/collect/route.ts`
- `components/analytics/PageViewTracker.tsx`
- `components/commerce/checkout/checkout-page.tsx`
- `lib/analytics/core/track.ts`
- `lib/analytics/providers/internal.ts`
- `lib/admin/native-analytics/overview.ts`
- `lib/db/schema.ts`
- `lib/persistence/types.ts`
- `lib/persistence/memory.ts`
- `lib/persistence/file.ts`
- `lib/persistence/postgres.ts`
- `types/admin-native-analytics.ts`
- `reports/native-analytics-milestone-dedupe-fix.md` (this file)

---

## 22. Lint

`npm run lint` — **pass** (exit 0; pre-existing unused-var warnings elsewhere)

## 23. Typecheck

`npx tsc --noEmit` — **pass** (exit 0)

## 24. Tests

`npm test` — **645 passed** | 36 skipped  
Includes new milestone regression suite (A–L).

## 25. Build

`npm run build` — **pass** (exit 0)

## 26. NO COMMIT

Confirmed — no git commit created.

## 27. NO PUSH

Confirmed — no push.

## 28. NO DEPLOY

Confirmed — no deploy. Apply `drizzle/0009_analytics_milestone_idempotency.sql` on production when deploying this change.

---

## FINAL VERDICT

**A. ANALYTICS SESSION DEDUPE FIXED**
