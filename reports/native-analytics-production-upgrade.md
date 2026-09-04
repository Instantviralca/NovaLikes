# Native first-party analytics — production upgrade report

**Date:** 2026-09-05  
**Scope:** First-party visitor/session/event model, server-only paid conversion, admin dashboard rebuild  
**Constraints honored:** No GA/GTM/Clarity enablement; additive migration `0008` only; no destroy of existing `analytics_events`; **NO COMMIT / NO PUSH / NO DEPLOY**

---

## CURRENT AUDIT (pre-upgrade code truth)

| Metric | How it worked | Status |
| --- | --- | --- |
| Visitors | Admin “by country” = unique **sessionIds**, not durable visitors | PARTIAL |
| Sessions | `sessionStorage` ID (tab-scoped); no 30-minute inactivity rule | PARTIAL |
| Landings | Unique sessions with `page_view` / `home_page_view` / `service_page_view` | WORKING (overcounts: any page view ≈ landing) |
| Page Views | Ingested into `analytics_events`; **no KPI** on admin page | NOT IMPLEMENTED (KPI) |
| Cart Adds | Unique sessions with `cart_item_add` | WORKING |
| Checkout | Sessions with `checkout_view` or page_view on `/checkout*` | WORKING |
| Completed Orders | Prefer paid orders via `listOrders` + fulfilment eligibility; else client `purchase` events | PARTIAL |
| Conversion Rate | Only stage-to-previous % | PARTIAL |
| Revenue | Not on Analytics page | NOT IMPLEMENTED |

**Why inaccurate before upgrade**

- No durable visitor ID across tabs/days
- Session ≠ 30 minutes of inactivity
- Landing ≠ first page of a session
- No UTM / referrer / device capture on events
- `purchase` could be client-driven via `ConversionTracker` on order-success
- No revenue KPI from trusted order totals
- No bot / admin-path filter at ingest
- Funnel mixed event-session counts with order-store counts

**Architecture (unchanged spine)**

Client trackers → `trackEvent` → Internal adapter → `POST /api/analytics/collect` → `analytics_events` → Admin `/admin/analytics`

---

## NEW IMPLEMENTATION CHECKLIST

1. Additive migration `drizzle/0008_analytics_upgrade.sql` — **DONE**
2. Tables `analytics_visitors` + `analytics_sessions` — **DONE**
3. Extended nullable columns on `analytics_events` — **DONE**
4. Indexes on `occurred_at`, visitor/session/service/market — **DONE**
5. Drizzle schema updated (`lib/db/schema.ts`) — **DONE**
6. Persistence types + postgres/memory/file drivers — **DONE**
7. `nl_visitor_id` cookie (~1y, SameSite=Lax) — **DONE**
8. `nl_session_id` + `nl_session_activity` with 30m inactivity — **DONE**
9. Collect accepts visitor/session from cookies when body omits — **DONE**
10. No IP-as-ID / no fingerprinting — **DONE**
11. Taxonomy module `lib/analytics/native/taxonomy.ts` — **DONE**
12. Client-allowed event names enforced — **DONE**
13. Server-only names rejected on collect — **DONE**
14. Legacy aliases (`cart_item_add`→`cart_add`, etc.) — **DONE**
15. Client `purchase` ignored for first-party sink — **DONE**
16. Bot UA skip — **DONE**
17. Admin/API/asset path skip — **DONE**
18. Rate limit retained on collect — **DONE**
19. Event registry entries for native names — **DONE**
20. `PageViewTracker` emits `session_started` + `landing_view` once per new session — **DONE**
21. Checkout emits `checkout_started` + `checkout_email_entered` (no email in payload) — **DONE**
22. Internal adapter sends visitorId + first-touch attribution — **DONE**
23. `order_created` server event after save — **DONE**
24. `payment_paid` + `order_completed` from `markOrderPaymentStatus` — **DONE**
25. Idempotent paid event id `analytics:payment_paid:{orderId}` — **DONE**
26. Attribution helpers (UTM, referrer channel, device UA) — **DONE**
27. Consent: operational funnel via admin channel when marketing consent off — **DONE**
28. Cookie policy discloses `nl_*` operational cookies — **DONE**
29. Admin default range **30d**, timezone **UTC** labeled — **DONE**
30. Ranges: today, yesterday, 7d, 30d, 90d, custom params — **DONE**
31. KPI cards: Visitors, Sessions, Page Views, Paid Orders, Revenue, Session→Paid, AOV — **DONE**
32. Secondary KPIs: Cart adds, Checkout starts, abandonments — **DONE**
33. Prior-period % comparisons (hidden when previous=0) — **DONE**
34. Charts: sessions/page views/paid/revenue by day (hourly for today) — **DONE**
35. Funnel session-deduped: Landing → Cart → Checkout → Order created → Paid — **DONE**
36. Tables: acquisition, services, markets, devices — **DONE**
37. Empty states without fake numbers — **DONE**
38. Recent ~30 minute activity strip — **DONE**
39. Pre-upgrade data banner when events lack `visitorId` — **DONE**
40. Privacy: sanitize blocks email/name/WhatsApp/card keys in properties — **DONE**
41. Retention env `ANALYTICS_EVENT_RETENTION_DAYS` + optional script — **DONE** (not auto-run)
42. Tests: taxonomy, identity, attribution, paid idempotency, admin revenue dedupe — **DONE**
43. `npm run lint` — see Validation
44. `npx tsc --noEmit` — see Validation
45. `npm test` — see Validation
46. `npm run build` — see Validation
47. No Google Analytics / GTM / Clarity wired into dashboard — **DONE**
48. Old `0003` migration untouched — **DONE**
49. Existing event rows preserved (additive only) — **DONE**
50. Report written; no commit/push/deploy — **DONE**

---

## KEY FILES

| Area | Path |
| --- | --- |
| Migration | `drizzle/0008_analytics_upgrade.sql` |
| Taxonomy / identity / attribution / server events | `lib/analytics/native/*` |
| Collect | `app/api/analytics/collect/route.ts` |
| Admin aggregation | `lib/admin/native-analytics/overview.ts` |
| Admin UI | `components/admin/analytics/analytics-page.tsx` |
| Retention script | `scripts/process-analytics-retention.ts` |
| Cookies disclosure | `config/cookies.ts` |

---

## VALIDATION

| Command | Result |
| --- | --- |
| `vitest` analytics suites | PASS |
| `npm run lint` | PASS (exit 0; pre-existing unused-var warnings unrelated) |
| `npx tsc --noEmit` | PASS |
| `npm test` | PASS (633 passed / 36 skipped; 0 failed) |
| `npm run build` | PASS |

---

## MANUAL QA (post-deploy)

1. Browse storefront → add to cart → checkout → confirm events appear after `0008` applied.
2. Trigger paid webhook in non-prod → Paid + Revenue increment once.
3. Retry same webhook → revenue does **not** double.
4. Open `/admin/analytics` — KPIs, funnel, tables, UTC label.
5. Confirm marketing GA adapters remain disabled unless previously env-enabled.

---

## VERDICT

**A. READY TO APPLY MIGRATION + USE** — after Contabo runs `npm run db:migrate:sql` (includes `0008`) and app restart. Code, lint, typecheck, tests, and production build for the upgrade are green; dashboard reads existing + new events without wiping history. No commit/push/deploy performed in this task.
