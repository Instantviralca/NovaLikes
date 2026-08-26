# NovaLikes AI / GEO / AEO Readiness Report

Date: 2026-08-27  
Site: https://novalikes.com

## Current strengths

- **Answer-first service and tool pages** with entity-specific copy distinguishing followers, likes, views, comments, and Facebook Page vs post metrics.
- **26 published Learn articles** (English-only) with At a Glance blocks, BlogPosting schema, and contextual linking graph.
- **Multilingual core pages** (en, es, de, fr, it, pt-br, ar) with reciprocal hreflang and ASCII Arabic slugs.
- **Public crawler access** for Googlebot, Bingbot, and OAI-SearchBot on marketing pages; admin/API/cart/checkout remain disallowed.
- **Clean llms.txt** listing canonical public URLs only — no YouTube services, admin, or checkout paths.
- **Verified Organization entity** with logo, support contactPoint, knowsAbout, and verified sameAs profiles from `config/site.ts`.

## Weaknesses (remaining)

- **Off-site authority** is still limited — AI systems weight independent citations, reviews, and brand mentions beyond on-site copy.
- **Four planned Learn articles** remain unpublished; some download/how-to queries map only partially until those go live.
- **Learn is English-only** — educational queries in other languages rely on localized service/tool pages, not full article coverage.
- **No verified physical address or phone** — correctly omitted from schema; limits local-business-style AI answers.

## On-site changes completed (this pass)

1. **Quick Answer blocks** — 20 unique SSR sections on 10 service pages, 8 tool pages, About, and Contact (homepage, FAQ hub, and tools hub skipped where existing intros already answer intent).
2. **Localized Quick Answers** — natural translations in `lib/i18n/content/quick-answers-locales.ts` for es, de, fr, it, pt-br, ar.
3. **Conversational FAQ tweaks** — order and password questions reworded on service FAQ sets in `data/content/faq.ts`.
4. **Organization schema** — added `logo`, `contactPoint` (email + `/contact`), `knowsAbout`; verified `sameAs` (Instagram, Facebook, LinkedIn).
5. **UI labels** — localized `quickAnswer.heading` in all locale `ui.json` overlays.
6. **Regression tests** — `lib/seo/__tests__/quick-answers.test.ts` for copy coverage, uniqueness, localization, and schema guards.
7. **Query map** — `docs/ai-search-query-map.md` documents conversational query → page routing.

## Crawler / indexability status

| Crawler | Public marketing pages | Private routes |
| --- | --- | --- |
| Googlebot | Allowed | Disallowed (`/admin`, `/api`, `/cart`, etc.) |
| Bingbot | Allowed | Disallowed |
| OAI-SearchBot | Allowed on public pages | Disallowed |

IndexNow is not implemented on this branch.

## Entity signals

| Signal | Status |
| --- | --- |
| Brand name `NovaLikes` | Consistent in footer, About, schema, metadata |
| Support email | `support@novalikes.com` — visible + schema contactPoint |
| Verified social profiles | Instagram, Facebook, LinkedIn in `sameAs` |
| Fake address / phone / ratings | Not added |
| `areaServed` | **Omitted** — site content targets a global online audience with no verified country restriction; inventing geography would be misleading |

## Answer-first coverage

| Page group | Quick Answer | Notes |
| --- | --- | --- |
| 10 service pages | Yes | Unique per metric/platform |
| 8 tool pages | Yes | Platform, input, output, limits |
| About / Contact | Yes | Entity + support intent |
| Homepage / FAQ / tools hub | No | Existing hero/lead already answer-first |
| 26 Learn articles | At a Glance | No duplicate Quick Answer blocks |

## Citation-friendly content

- Quick Answers use factual, quotable sentences with explicit metric distinctions.
- Facebook Followers vs Page Likes vs Post Likes clarified in Quick Answers, FAQs, and existing service authority copy.
- Tool pages state public-content requirements and no-password behavior aligned with implementation.

## Internal topical graph

Prior contextual linking (`lib/learn/contextual-links.ts`) connects Learn ↔ services ↔ tools. This pass adds Quick Answers as early intent anchors; no bulk link blocks were added.

### Orphan / weak-link notes

- **Planned CMS articles** (4) are intentionally unpublished — not orphans, but not yet in the live graph.
- **Reviews page** has limited Learn cross-links; acceptable for commercial trust intent.
- All 26 live Learn slugs remain in sitemap and llms.txt.

## Schema audit

| Page type | Expected schema | Status |
| --- | --- | --- |
| Homepage | Organization, WebSite | OK |
| Services | Service, BreadcrumbList | OK |
| Tools | WebApplication, BreadcrumbList | OK |
| Learn | BlogPosting, BreadcrumbList | OK |
| About | AboutPage | OK |
| Contact | ContactPage | OK |

No fake Product, Offer, AggregateRating, Review, or LocalBusiness schema added.

## Multilingual parity

Quick Answers and `quickAnswer.heading` are available on all localized equivalents of service, tool, About, and Contact pages. Learn remains English-only by design.

## llms.txt

Audited — current file is accurate. No changes required. No `llms-full.txt` created.

## Canonical / hreflang / sitemap

- Canonical URLs unchanged.
- hreflang matrix reciprocal for core paths; Arabic uses English ASCII slugs under `/ar/`.
- Sitemap excludes noindex and private routes; Learn English-only.
- No YouTube service URLs present.

## Off-site GEO recommendations (future, legitimate only)

1. **Earn independent brand mentions** on relevant social media marketing and creator-economy publications.
2. **Build quality backlinks** from educational content that cites NovaLikes tools or guides naturally.
3. **Encourage genuine customer reviews** on third-party platforms where NovaLikes already has a verifiable presence.
4. **Maintain consistent NAP-free entity presence** — use the same brand name and verified social URLs (`sameAs`) across profiles.
5. **Participate in authoritative discussions** (forums, Q&A) with factual answers linking to specific NovaLikes pages when genuinely helpful.

These require real-world marketing and reputation work; they cannot be fabricated on-site.

## Quality gates

Run after changes:

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

## Summary

NovaLikes is materially improved for AI Overviews, ChatGPT Search, Bing Copilot, and citation-based retrieval through server-rendered Quick Answers, stronger Organization entity signals, conversational FAQs, and documented query mapping. Remaining GEO gains depend primarily on off-site authority and publishing the four planned Learn articles when ready.
