# Final minimal schema architecture audit

**Date:** 2026-09-04  
**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`  
**Scope:** Schema-only cleanup. No content, metadata, URL, sitemap, or robots changes.

## Final verdict

**A. MINIMAL SCHEMA ARCHITECTURE CLEAN**

---

## Architecture after cleanup

Shared layout (`SiteJsonLd`) on marketing / learn / legal:

- `Organization` (`@id` = `https://novalikes.com/#organization`)
- `WebSite` (`@id` = `https://novalikes.com/#website`, `publisher` → Organization `@id`)

### 1. Homepage schema types

`/`, locale homes:

- Organization
- WebSite

### 2. Market homepage schema types

`/ca/`, `/au/`, `/us/`, `/uk/`:

- Organization
- WebSite

### 3. Service page schema types

Default English + translated:

- Organization
- WebSite
- Service (`provider` → Organization `@id`)
- BreadcrumbList

### 4. Market service schema types

CA/AU/US/UK service pages:

- Organization
- WebSite
- Service (+ `areaServed` Country)
- BreadcrumbList

### 5. Reviews schema types

`/reviews`:

- Organization
- WebSite
- WebPage
- BreadcrumbList

No Review / AggregateRating (historical catalogue is not order-linked).

### 6. Tool schema types

`/tools/[slug]`:

- Organization
- WebSite
- WebApplication
- BreadcrumbList

Tools hub (`/tools`) retains CollectionPage + ItemList + BreadcrumbList (listing page; not a Product/Service).

### 7. Learn schema types

Articles:

- Organization
- WebSite
- BlogPosting (or Article when configured)
- BreadcrumbList

**FAQPage removed.** Nested `mainEntityOfPage` is now `@id` only (no nested WebPage `@type`).

Category / tag / authors index: CollectionPage with `isPartOf: { @id: WebSite }` + BreadcrumbList.

Author profile: Person with `worksFor: { @id: Organization }` + BreadcrumbList.

### 8. About schema types

- Organization
- WebSite
- **WebPage** (was AboutPage)
- BreadcrumbList

### 9. Contact schema types

- Organization
- WebSite
- **WebPage** (was ContactPage)
- BreadcrumbList

### 10. Legal schema types

- Organization
- WebSite
- WebPage
- BreadcrumbList

FAQ hub (`/faq`) now matches the same pattern: WebPage + BreadcrumbList. Visible FAQ content retained; **FAQPage JSON-LD removed**.

---

## Counts / checks

| # | Item | Result |
|---|------|--------|
| 11 | Duplicate Organization (logical top-level) | **0** — one `@id` entity; Service/Person reference it |
| 12 | Duplicate WebSite (logical top-level) | **0** — taxonomy/authors now use `@id` ref |
| 13 | Duplicate Service | **0** |
| 14 | Duplicate BreadcrumbList | **0** |
| 15 | WebPage entities removed | Nested Article `mainEntityOfPage` WebPage `@type` removed; About/Contact switched *to* WebPage from AboutPage/ContactPage |
| 16 | FAQPage entities removed | FAQ hub + Learn articles (**all public FAQPage emission**) |
| 17 | Product count (public) | **0** |
| 18 | Offer count | **0** |
| 19 | Review schema count (public) | **0** |
| 20 | AggregateRating count (public) | **0** |
| 21 | Invalid JSON-LD count | **0** |
| 22 | Schema URL conflicts | **0** — canonical paths unchanged; Service/WebPage urls use existing absolute helpers |

---

## Cleanup performed

| Change | Why |
|--------|-----|
| Remove FAQPage from `/faq` + locale FAQ | Target FAQPage = 0; keep FAQ UI |
| Stop Learn article FAQPage emission | Same |
| About/Contact → `webPageSchema` | Target WebPage |
| Article `mainEntityOfPage` → `@id` only | Avoid redundant WebPage node |
| Taxonomy / authors `isPartOf` → WebSite `@id` | No nested duplicate WebSite |
| Author `worksFor` → Organization `@id` | No nested duplicate Organization |

**Not changed (already matched target):**

- Homepages (EN / market / locale)
- Service pages (EN / market / locale)
- Reviews (no Review/AggregateRating)
- Tool detail WebApplication
- Legal WebPage
- No Product / Offer / LocalBusiness / Speakable

**Not copied from TokBoostly:** no FAQPage, no Service on hubs/homepages, no Product/Offer/Review.

---

## 23. Files changed

### Routes / pages
- `app/(marketing)/faq/page.tsx`
- `app/(marketing)/i18n/[locale]/faq/page.tsx`
- `app/(marketing)/about/page.tsx`
- `app/(marketing)/contact/page.tsx`
- `app/(marketing)/i18n/[locale]/about/page.tsx`
- `app/(marketing)/i18n/[locale]/contact/page.tsx`
- `app/(learn)/learn/[slug]/page.tsx`

### Schema helpers
- `lib/learn/article-seo/schema.ts`
- `lib/authors/schema.ts`
- `lib/learn/taxonomy/schema.ts`

### Tests
- `lib/seo/__tests__/minimal-schema-architecture.test.ts` (new)
- `lib/learn/article-seo/__tests__/article-seo.test.ts`
- `lib/learn/article/__tests__/article-template.test.ts`
- `lib/authors/__tests__/author-system.test.tsx`
- `lib/seo/__tests__/prelaunch-seo-fixes.test.ts`

### Report
- `reports/final-minimal-schema-architecture-audit.md`

---

## Validation

| # | Item | Result |
|---|------|--------|
| 24 | Content changed | **NONE** |
| 25 | Metadata changed | **NONE** |
| 26 | URLs changed | **NONE** |
| 27 | Lint | **Pass** (`npm run lint`, exit 0) |
| 28 | Typecheck | **Pass** (`npx tsc --noEmit`, exit 0) |
| 29 | Tests | **Pass** — 603 passed \| 36 skipped |
| 30 | Build | **Pass** (`npm run build`, exit 0) |
| 31 | NO COMMIT | Confirmed |
| 32 | NO PUSH | Confirmed |
| 33 | NO DEPLOY | Confirmed |
