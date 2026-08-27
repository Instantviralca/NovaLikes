# NovaLikes Translation Audit (Post-Fix)

Semantic QA against English source. Updated after translation fix pass.

## Structural parity summary

| Locale | Missing Keys | Extra Keys | English Fallbacks | Empty Values | Placeholder Errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| Spanish | 0 | 0 | 0 | 0 | 0 |
| German | 0 | 0 | 0 | 0 | 0 |
| French | 0 | 0 | 0 | 0 | 0 |
| Italian | 0 | 0 | 0 | 0 | 0 |
| PT-BR | 0 | 0 | 0 | 0 | 0 |
| Arabic | 0 | 0 | 0 | 0 | 0 |

## Fix status overview

| Status | Count | Description |
| --- | ---: | --- |
| **FIXED** | 20 | Real translation/localization issues corrected in this pass |
| **INTENTIONAL / ACCEPTED** | 23 | Correct by design; no change required |
| **REMAINING** | 0 | Open P0/P1/P2 issues requiring action |

---

## FIXED (this pass)

| # | Locale | Area | What changed |
| ---: | --- | --- | --- |
| 1 | ES | All 10 service pages + homepage + service-faqs + faq-items + metadata | English **views** → **visualizaciones** in user-facing prose (~500 replacements) |
| 2 | ES | All service pages + homepage + FAQs | English **likes** → **Me gusta** in user-facing prose (~570 replacements) |
| 3 | ES | `buy-instagram-views` / `buy-tiktok-views` SEO | `Comprar views de…` → **Comprar visualizaciones de…** |
| 4 | ES | Homepage hero | `seguidores, likes, views y comentarios` → **seguidores, Me gusta, visualizaciones y comentarios** |
| 5 | ES | All files | Restored **NovaLikes** brand corrupted during first pass (42 instances) |
| 6 | IT | All 10 service pages + homepage + service-faqs + faq-items + metadata | English **views** / **conteggio views** → **visualizzazioni** (~500 replacements) |
| 7 | IT | Homepage hero | **follower, Mi piace, visualizzazioni e commenti** |
| 8 | DE | Homepage hero | **Views** → **Aufrufe** |
| 9 | FR | `ui.json` | **Mobile** → **Menu mobile** |
| 10 | IT | `ui.json` | **Mobile** → **Menu mobile** |
| 11 | PT-BR | `ui.json` | **Mobile** → **Menu móvel** |

---

## INTENTIONAL / ACCEPTED (no change)

| # | Locale | Area | Reason |
| ---: | --- | --- | --- |
| 1–6 | ALL | `nav.learn` = **Learn** | English-only Learn hub treated as product name; consistent sitewide |
| 7 | DE | `nav.tools` = **Tools** | Matches established German sitewide terminology (*Kostenlose Tools*, tool pages, legal) |
| 8–22 | ES, DE, FR, IT, PT-BR | Shared `beforeBuying` / `whatHappens` / `bestPractices` paragraphs | Mirrors intentional English boilerplate; meaning accurate |
| 23 | AR | TikTok + Facebook followers shared pricing paragraph | Generic follower-package wording; semantically correct for both services |

---

## REMAINING open issues

**None.** All P0/P1/P2 audit items from the pre-fix report are either fixed or accepted as intentional.

Optional P3 items (Learn nav label) documented above as intentional product naming.

---

## Quick Answer Translation QA

**No changes.** Pre-audit found no semantic issues; none appeared in terminology fix scope.

## H1 / Eyebrow QA

**No changes.** Pre-audit manual pass confirmed natural localized eyebrows/H1s.

---

## Pre-fix issues — resolution log

| Original # | Severity | Resolution |
| ---: | --- | --- |
| 1–8 | P1/P2 ES views/likes | **FIXED** |
| 9–15 | P1/P2 IT views | **FIXED** |
| 16–24 | P3 Learn nav | **INTENTIONAL** |
| 25 | P2 DE Tools nav | **INTENTIONAL** |
| 26–41 | P1 duplicates | **INTENTIONAL** |
| 42–43 | P1 ES SEO titles | **FIXED** |
| 44 | P2 ES homepage | **FIXED** |
| 45 | P3 DE homepage | **FIXED** |
| 46 | P2 IT homepage | **FIXED** |

---

## Verification (post-fix scan)

- Spanish user-facing prose: **0** inappropriate `views`; **0** inappropriate `likes`
- Italian user-facing prose: **0** inappropriate `views`
- Placeholder tokens: **0** errors
- Missing translation keys: **0**
- English fallbacks: **0**
- Service meaning (Facebook followers/page/post): **verified unchanged**
- Tool meaning distinctions: **verified unchanged**
- Unsupported marketing claims added: **0**
