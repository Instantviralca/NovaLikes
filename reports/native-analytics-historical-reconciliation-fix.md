# Native analytics historical reconciliation fix

**Date:** 2026-09-05  
**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`  
**Verdict:** **A. ANALYTICS HISTORICAL RECONCILIATION FIXED**

NO COMMIT · NO PUSH · NO DEPLOY

---

## 1. Exact reason Sessions=5 but Landing=255

Sessions KPI used `analytics_sessions` rows (5).

Landing (and other session tables) still did:

```ts
if (isLandingEvent(event)) landing.add(event.sessionId);
```

including **legacy** `page_view` / `home_page_view` rows when `visitorId` was missing. Each legacy event carried its own `session_id` string from the pre-native tracker, so ~250 distinct legacy IDs were treated as landing sessions → **Landing ≈ 255** while Sessions stayed **5**.

## 2. Exact reason Direct=250

Acquisition used `buildGroupedTable(currentEvents, …)` over **all events**. Legacy rows with empty referrer/UTM classified as **Direct**, each unique legacy `session_id` counted once → ~250 Direct “sessions”.

## 3. Exact reason Unknown devices=250

Devices used the same event-based table with:

```ts
e.deviceType?.trim() || 'unknown'
```

Legacy events had no `device_type` → **Unknown**, inflated by distinct legacy session IDs.

## 4. Legacy event handling before

- Sessions KPI: `analytics_sessions` when present  
- Funnel / acquisition / markets / devices: **any** `event.sessionId`  
- Landing: canonical milestones **plus** legacy page views without `visitorId`  
- Result: hybrid inflation (Sessions=5 vs tables≈250)

## 5. Legacy event handling after

- Session universe = **only** `analytics_sessions` in range  
- Funnel / acquisition / markets / devices = that universe only  
- Events whose `session_id` is not in `analytics_sessions` never invent sessions  
- Legacy rows kept in DB; Page Views may still count them  
- UI notice explains the split  

## 6. Sessions KPI source

`COUNT(analytics_sessions)` for `started_at` in range (via `listAnalyticsSessions`).

## 7. Landing source

Same set: every native session has exactly one landing → `landingSessions = sessions`.

## 8. Funnel source

Distinct valid `session_id` reach for:

Landing → Service view → Cart → Checkout → Order created → Paid  

(Paid stage prefers distinct paid **orders** when present.)

Stages are **reach-based** (Service/Cart skippable). If a later stage exceeds the previous, **“% from previous” is omitted** (never >100%).

## 9. Acquisition source

`analytics_sessions` attribution: `utm_*`, `source_channel`, `referrer`. One count per session.

## 10. Markets source

`analytics_sessions.market` / `locale` → Default / Global English, CA, AU, US, UK, locales. Sum of market sessions = Sessions KPI.

## 11. Devices source

`analytics_sessions.device_type`. Unknown only for a **real** session with missing classification — not for orphan legacy events.

## 12. Page Views historical policy

Page Views KPI / charts include:

- `page_view`, `service_view`
- historical aliases: `home_page_view`, `service_page_view`

These rows are **not** used as session proxies. Documented in dashboard notice + chart caption.

## 13. Funnel >100% issue resolution

1. Inflation removed (stages use native sessions only).  
2. `buildFunnel` returns `conversionFromPrevious = null` when `stage > previous` (skippable stages).

## 14. Chart rendering status

- Series sessions/visitors seeded from **analytics_sessions** (not legacy event IDs).  
- Page views still plotted from events (incl. historical).  
- All-zero series (e.g. paid=0) now shows an explicit empty state instead of blank bars.  
- Slightly taller bars + visitors series added for visibility.

## 15. Reconciliation guarantees

For a period with `N` native sessions and any number of unlinked legacy events:

| Metric | Guarantee |
|--------|-----------|
| Sessions | N |
| Landing | N |
| Σ Markets sessions | N |
| Σ Devices sessions | N |
| Σ Acquisition sessions | N |
| Funnel stage | ≤ N and distinct sessions |
| Legacy events | stored; not fabricated into sessions |

## 16. DB migration needed

**NO** — query/UI-only fix. Do not edit 0008/0009.

## 17. Files changed

- `lib/admin/native-analytics/overview.ts`
- `components/admin/analytics/analytics-page.tsx`
- `lib/analytics/__tests__/historical-reconciliation.test.ts` (new)
- `lib/analytics/__tests__/milestone-dedupe.test.ts`
- `lib/analytics/__tests__/native-analytics.test.ts`
- `reports/native-analytics-historical-reconciliation-fix.md` (this file)

## 18. Lint

`npm run lint` — pass (exit 0)

## 19. Typecheck

`npx tsc --noEmit` — pass (exit 0)

## 20. Tests

`npm test` — **652 passed** | 36 skipped

## 21. Build

`npm run build` — **pass** (exit 0)

## 22. NO COMMIT

Confirmed.

## 23. NO PUSH

Confirmed.

## 24. NO DEPLOY

Confirmed.

---

## FINAL VERDICT

**A. ANALYTICS HISTORICAL RECONCILIATION FIXED**
