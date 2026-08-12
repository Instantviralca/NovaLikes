# Pre-Rebrand Clean-Room Audit — NovaLikes (InstantViral Backup)

| Field | Value |
|--------|--------|
| **Audit date** | 2026-08-12 |
| **Repository** | Local clone of `rimalweb/Novalikes` (`C:\Users\HUSSNAIN.COM\Novalikes`) |
| **Scope** | Full repository audit (source, config, public assets, docs, seeds, generated endpoints) |
| **Mode** | **AUDIT ONLY** — no code, config, asset, or SEO regeneration changes (except creation of this report) |
| **Clean-room status** | **FAIL** |

---

## Executive verdict

Runtime application code (`.ts` / `.tsx`) has been largely rebranded to **NovaLikes** / **`https://novalikes.com`**. There are **no InstantViral / instantviral.ca string matches** in live app, data, lib, components, seo, schemas, drizzle, or scripts TypeScript.

However, clean-room **FAIL** is required because InstantViral-specific **public brand assets** remain servable, InstantViral **deployment/ops documentation** is still the linked production runbook risk surface, Canada-heritage **production copy/OG assets** remain, and new-brand **`.ca` vs `.com`** inconsistency would ship incorrectly if launched as-is.

**Deleted Learn articles:** registry is empty; sitemap/llms do not emit old article URLs. Article cleanup for *runtime* is largely successful. Orphan references remain in **docs** and some **tests**.

---

# 1. GLOBAL INSTANTVIRAL REFERENCE SEARCH

## 1.1 Runtime / shippable source (ACTIVE risk surface)

| Area | InstantViral / instantviral.ca matches |
|------|----------------------------------------|
| `app/` | **0** |
| `components/` | **0** |
| `config/` | **0** (brand = NovaLikes) |
| `data/` (excl. workspace filename) | **0** string matches |
| `lib/` | **0** |
| `seo/` | **0** |
| `schemas/` | **0** |
| `scripts/` | **0** |
| `drizzle/` | **0** |
| `content/` packages | **0** (articles removed) |
| `public/**` text files (`llms.txt`, etc.) | **0** InstantViral strings |
| `public/**` **binary/filename** assets | **YES** — InstantViral logos (see §7) |

### Filename / workspace leftovers (non-string content)

| File | Reference | Controls | Severity |
|------|-----------|----------|----------|
| `data/instantviral-next.code-workspace` | Workspace name `instantviral-next` | Editor workspace only | Low |
| `public/assets/media/2024/09/cropped-InstantViral-Logo-1.png` | InstantViral logo | Publicly servable static asset | **Critical** |
| `public/assets/media/2024/09/InstantViral-Logo-1.png` | InstantViral logo | Publicly servable | **Critical** |
| `public/assets/media/2024/09/INSTANTVIRAL-LOGO-WHITE.png` | InstantViral logo | Publicly servable | **Critical** |
| `public/assets/media/2024/09/instantviral.webp` | InstantViral brand graphic | Publicly servable | **Critical** |
| `public/assets/media/2024/04/instant-Delivery.webp` | Filename contains “instant” (delivery icon; not brand string) | Public asset | Low / Unknown |

**Code reference check:** no `.ts`/`.tsx` imports or path strings reference the InstantViral logo filenames (orphaned public files). They remain **directly URL-addressable** under `/assets/media/2024/09/...`.

## 1.2 Documentation / templates (not served by Next.js, but ops risk)

~**337** InstantViral / instantviral.ca hits under `docs/` (approximate). Highest-risk docs:

| File | What it controls | Severity |
|------|------------------|----------|
| `docs/PRODUCTION_DEPLOYMENT_GUIDE.md` | Full InstantViral deploy runbook: `instantviral.ca`, `checkout.instantviral.ca`, Stripe webhook URLs, Resend domain, email examples, cart cookie `Domain=.instantviral.ca` | **Critical (ops)** |
| `docs/SEO_AUDIT_REPORT.md` | Old SEO audit for InstantViral | Medium (docs) |
| `docs/SEO_IMPLEMENTATION_REPORT.md` | Old SEO implementation for InstantViral | Medium (docs) |
| `docs/InstantViral-Website-Links.xls` | Full InstantViral URL inventory incl. deleted Learn articles | Medium (docs) |
| `docs/01_Project_Overview.md` … `docs/18_*` | Architecture specs titled InstantViral v2 | Low–Medium (docs) |
| `docs/AI_CONTENT_RULES.md`, `docs/CONTENT_ARCHITECTURE.md` | InstantViral editorial rules | Medium (docs) |
| `docs/17_Content_Library/**` incl. `Article_01/source/04_SEO.json` | Template SEO with InstantViral titles + `https://instantviral.ca/learn/...` canonicals | Medium (docs) |
| `docs/13_Company/*` | Legal production drafts for InstantViral Canada | Medium (docs) |

Linked from production entrypoints:

- `.env.production.example` → points at `docs/PRODUCTION_DEPLOYMENT_GUIDE.md`
- `DEPLOYMENT.md` → also references that guide

## 1.3 Company / contact / Canada brand copy (runtime)

| Search | Result |
|--------|--------|
| InstantViral email / `@instantviral` in runtime | **None** |
| Phone `(289) 819-3247` / Bancroft address in runtime | **None** |
| `mailingAddress` | Configured as `undefined` in legal configs |
| Support email (runtime default) | `support@novalikes.com` (`config/site.ts`) |
| Canada-specific **live copy** | **Present** — e.g. Instagram eyebrows “FOR CANADA”, Facebook “FOR CANADIAN BUSINESSES…”, `*Canada` section components | Medium–High (geo brand heritage) |
| `NovaLikes.ca` wording vs `novalikes.com` canonical | Widespread in legal/SEO/pricing comments | **High** (new-brand consistency) |

---

# 2. SEO FILE REMOVAL VERIFICATION

## Static under `public/`

| File | Exists? |
|------|---------|
| `public/robots.txt` | **No** |
| `public/sitemap.xml` | **No** |
| `public/sitemap-index.xml` | **No** |
| `public/manifest.json` / `.webmanifest` / `site.webmanifest` | **No** |
| `public/llms.txt` | **Yes** (NovaLikes / novalikes.com) |
| `public/llms-full.txt` | **Yes** (NovaLikes; **0** published articles listed) |
| `public/favicon.ico` | **Yes** |
| `public/ads.txt` | **No** |
| `public/security.txt` | **No** |
| `public/humans.txt` | **No** |
| `public/browserconfig.xml` | **No** |
| `public/opensearch*` | **No** |
| Service worker | **No** |

## Dynamic Next.js metadata routes (**ACTIVE**)

| Route / file | Status | Notes |
|--------------|--------|-------|
| `app/robots.ts` | **ACTIVE** | Hard-codes `host: 'novalikes.com'` |
| `app/sitemap.ts` | **ACTIVE** | Builds from sitemap engine + empty Learn registry |
| `app/manifest.ts` | **ACTIVE** | NovaLikes name; icons under `/icons/` |
| `seo/robots.ts`, `lib/seo/sitemap/robots.ts`, `lib/seo/metadata/robots.ts` | Supporting libs | ACTIVE helpers |
| `seo/sitemap.ts`, `lib/seo/sitemap/*`, `data/seo/sitemap-*.ts` | ACTIVE | |
| `app/**/opengraph-image.*` | **Absent** | OG via config + static PNGs |
| `app/**/twitter-image.*` | **Absent** | |

**Conclusion:** SEO endpoints were **not removed**; they were **rebranded** to NovaLikes and remain dynamically generated. Do not assume absence from `/public` means absence from production.

---

# 3. METADATA SYSTEM AUDIT

| System | Location | Status |
|--------|----------|--------|
| Central metadata registry | `data/seo/metadata-registry.ts` | **ACTIVE** — NovaLikes titles/descriptions |
| SEO titles / descriptions | `seo/titles.ts`, `seo/descriptions.ts` | **ACTIVE** — NovaLikes; some `NovaLikes.ca` wording |
| Canonical / absolute URL | `seo/canonical.ts`, `lib/seo/metadata/canonical.ts` | **ACTIVE** — production domain `https://novalikes.com` |
| Open Graph helpers | `seo/openGraph.ts`, `lib/seo/metadata/open-graph.ts`, `data/seo/open-graph-images.ts` | **ACTIVE** — points at `*-global-og.webp` |
| Twitter cards | `seo/twitter.ts`, `lib/seo/metadata/twitter.ts` | **ACTIVE** |
| Site / SEO config | `config/site.ts`, `config/seo.ts`, `config/brand.ts` | **ACTIVE** — NovaLikes |
| `generateMetadata` on pages | Throughout `app/` | **ACTIVE** |
| Admin metadata preview | `components/admin/seo/*` | **ACTIVE** (admin) |
| Old InstantViral SEO string system in code | — | **REMOVED** from runtime TS |
| Docs describing InstantViral SEO engine | `docs/14_Global_Components/14.07_*`, SEO reports | **DEAD/UNUSED for runtime** but still in repo |

**ACTIVE InstantViral SEO identity in code:** none found.  
**ACTIVE new-brand issue:** `NovaLikes.ca` in many descriptions/legal strings while `metadataBase`/canonical host is `novalikes.com`.

---

# 4. SCHEMA / JSON-LD AUDIT

## Generators present (`schemas/`)

| File | Types | Brand source | Status |
|------|-------|--------------|--------|
| `organization.ts` | Organization | `brand.name` / `absoluteUrl('/')` → novalikes.com | **ACTIVE** |
| `website.ts` | WebSite | site.name | **ACTIVE** |
| `service.ts` | Service / provider | site.name | **ACTIVE** |
| `faq.ts` | FAQPage | content-driven | **ACTIVE** |
| `breadcrumb.ts` | BreadcrumbList | routes | **ACTIVE** |
| `article.ts` | Article | Learn articles | **ACTIVE but empty feed** |
| `review.ts` + `lib/reviews/schema*` | Review / AggregateRating | default entity **NovaLikes** | **ACTIVE** |
| `image.ts`, `contact-page.ts` | ImageObject / ContactPage | — | **ACTIVE** helpers |
| Product / Offer | Via service/commerce paths | package data | Present in commerce/schema usage |

## InstantViral in schema

| Check | Result |
|-------|--------|
| InstantViral / instantviral.ca in schema generators | **None** |
| Canadian business address in Organization | **None** (no address fields populated) |
| Old social `sameAs` InstantViral profiles | Social links are **empty strings** — omitted from schema |
| Old article schema emission | No published articles → no Article URLs |

**Classification:** ACTIVE schema code is NovaLikes-branded. OLD InstantViral schema data is **REMOVED** from runtime. Docs still describe InstantViral schema examples (**DEAD** for runtime).

---

# 5. OLD SERVICE CONTENT

Approved / live services (**12**):

| Slug | Routes (`[slug]`) | Registry `data/services.ts` | Pricing | Nav/footer | Sitemap | Metadata | Schema | Checkout/API |
|------|-------------------|-----------------------------|---------|------------|---------|----------|--------|--------------|
| `buy-instagram-followers` | Yes | Yes | Yes (NovaLikes.ca catalog naming) | Yes | Yes | Yes | Yes | Via service IDs |
| `buy-instagram-likes` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-instagram-views` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-instagram-comments` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-tiktok-followers` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-tiktok-likes` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-tiktok-views` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-tiktok-shares` | **No** | **No** | — | — | — | — | — | Skipped example |
| `buy-tiktok-comments` | **No** | **No** | — | — | — | — | — | Skipped example |
| `buy-facebook-followers` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-facebook-page-likes` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-facebook-post-likes` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-youtube-subscribers` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `buy-youtube-views` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

**Architecture note:** Service URL pattern and commerce architecture are **reusable**. Branding on service pages is mostly NovaLikes with Canada-heritage leftovers in some section copy/component names.

---

# 6. LEARN / ARTICLE CLEANUP

| Check | Result |
|-------|--------|
| Article MDX packages under `content/` | **Gone** (README + `_templates` only) |
| `LEARN_ARTICLES` registry | **`[]` empty** — `data/learn/articles.ts` |
| Per-slug modules `data/learn/articles/<slug>.ts` | **Absent** |
| Author | `novalikes-editorial-team` (not InstantViral) |
| `relatedArticles` / linking engine | Resolves empty with 0 articles |
| Sitemap Learn articles | `LEARN_SITEMAP_ENABLED` true but **0** article URLs |
| `public/llms.txt` / `llms-full.txt` | Hub only; **0** article URLs |
| Learn nav broken article links | Index empty — no published article links |
| Orphan InstantViral article lists | **`docs/InstantViral-Website-Links.xls`**, content-library docs, some sitemap **tests** still expect old slugs |

**Runtime article cleanup: PASS.**  
**Repo hygiene: FAIL** (docs/xls/tests leftovers).

---

# 7. OLD IMAGE / ASSET AUDIT

## InstantViral-specific (**must remove before launch**)

| Path | Classification |
|------|----------------|
| `public/assets/media/2024/09/cropped-InstantViral-Logo-1.png` | **INSTANTVIRAL-SPECIFIC** |
| `public/assets/media/2024/09/InstantViral-Logo-1.png` | **INSTANTVIRAL-SPECIFIC** |
| `public/assets/media/2024/09/INSTANTVIRAL-LOGO-WHITE.png` | **INSTANTVIRAL-SPECIFIC** |
| `public/assets/media/2024/09/instantviral.webp` | **INSTANTVIRAL-SPECIFIC** |

## Canada OG leftovers (unused by registry; still public)

All under `public/assets/images/og/`:

- `buy-*-canada-og.webp` × 12 services  

Registry uses `*-global-og.webp` only → files are **orphaned InstantViral-geo heritage**.

**Classification:** INSTANTVIRAL-SPECIFIC / geo heritage → safe-to-delete later after confirm no external hotlinks needed.

## Keepable / generic (examples)

| Path | Classification |
|------|----------------|
| `public/assets/logos/logo.svg`, `logo-white.svg` | KEEPABLE GENERIC / new brand (verify visually) |
| `public/assets/platforms/*` | KEEPABLE GENERIC |
| `public/assets/images/og/*-global-og.webp` | KEEPABLE if NovaLikes-branded (verify) |
| `public/og-default.png` | KEEPABLE (verify brand) |
| `public/icons/icon-*.png` | KEEPABLE (verify brand) |
| `public/assets/images/hero-social.jpg`, illustrations | UNKNOWN — visual QA needed |
| `public/assets/media/2024/**` (other WordPress-era media) | UNKNOWN / likely legacy |
| `public/assets/images/learn/` | Empty / ARTICLE-ONLY scaffold |

---

# 8. FAVICON / APP ICON / BRANDING

| Asset | Present | Risk |
|-------|---------|------|
| `public/favicon.ico` | Yes | Verify not InstantViral mark |
| `public/icon.png`, `apple-icon.png` | Yes (+ `* 2.png` duplicates) | Verify |
| `app/icon.png`, `app/apple-icon.png` (+ duplicates) | Yes | Next metadata icons — verify |
| Manifest icons `/icons/icon-192.png`, `512`, maskable | Yes via `app/manifest.ts` | Verify |
| InstantViral logos in media folder | Yes | **Can appear if URL requested**; not wired into header/manifest |

**Browser tab / PWA / SERP:** driven by NovaLikes manifest + current favicon/icon set — **visual confirmation required**. InstantViral logos are **not** referenced by manifest/header code.

---

# 9. ENVIRONMENT / SECRETS / API CONFIG

**No secret values printed.** Names and wiring only.

| VARIABLE NAME | USED BY | OLD BRAND SPECIFIC? | ACTION NEEDED |
|---------------|---------|---------------------|---------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical runtime URLs, checkout redirects | NO (example = novalikes.com) | Set to final domain; ignore InstantViral guide |
| `SITE_URL` | Server-side site URL | NO | Align with public site |
| `NEXT_PUBLIC_CHECKOUT_URL` | Checkout host | NO (example checkout.novalikes.com) | Do **not** set to checkout.instantviral.ca |
| `DATABASE_URL` | Drizzle/Postgres | NO | New project DB |
| `IV_ALLOW_FILE_STORE` | Dev file persistence | Naming heritage only | Rename later optional |
| `IV_PERSISTENCE` | Persistence mode | Naming heritage | Optional rename |
| `IV_ADMIN_PASSWORD` / `ADMIN_PASSWORD` | Admin auth | Naming heritage | New secret; never reuse IV prod |
| `IV_ADMIN_SESSION_SECRET` / `SESSION_SECRET` | Sessions | Naming heritage | New secret |
| `IV_SHARED_SECRET` | Shared secret | Naming heritage | New secret |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED` | Admin UI flag | NO | — |
| `REMOTE_PAYMENT_WEBSITE_URL` | Live checkout provider | NO | New collector; not InstantViral |
| `IV_PAYMENTS_MODE` | `mock` in non-prod | Naming heritage | — |
| `STRIPE_*` (in DEPLOYMENT.md) | Stripe provider (secondary path) | NO | New Stripe account if used |
| `RESEND_API_KEY` | Email | NO | New Resend project/domain |
| `EMAIL_FROM` / `RESEND_FROM_EMAIL` | From address | NO — must not be `@instantviral.ca` | New domain |
| `EMAIL_SUPPORT` / `EMAIL_ADMIN_TO` | Support/admin mail | NO | New addresses |
| `EMAIL_COMPANY_NAME` | Template brand (default NovaLikes) | NO | Confirm NovaLikes |
| `NEXT_PUBLIC_GA4_*` / `GTM_*` / `CLARITY_*` | Analytics | NO hard-coded IDs | **New** properties only |
| `LEARN_ARTICLE_PREVIEW_SECRET` | Learn preview | NO | New secret |
| `IV_SKIP_ENV_GUARD` | Build/CI | Naming heritage | — |
| `IV_GEO_BLOCK_DISABLED` | Geo middleware | Naming heritage | Review geo policy for new brand |

---

# 10. STRIPE / CHECKOUT AUDIT

| Check | Finding |
|-------|---------|
| Live place-order path | **`remote-payment`** (`lib/checkout/execute.ts`) — not Stripe-first |
| Success URL | Env-built via `getSiteUrlPath('/order-success?...')` |
| Cancel URL | Env-built via checkout host |
| Product/description string | Hard-coded **`NovaLikes order ${order.id}`** |
| Metadata | `{ orderId }` |
| Stripe provider file | Still present (`lib/payments/providers/stripe.ts`) — no InstantViral domain |
| Webhook | `/api/webhooks/stripe` + `/api/webhooks/remote-payment` |
| Statement descriptor | Not configured in code |
| Hard-coded instantviral.ca in payment code | **None** |
| Docs risk | InstantViral PRODUCTION guide still lists InstantViral Stripe success/cancel/webhook URLs |

**Could new site charge via old InstantViral Stripe?** Only if humans paste InstantViral keys/URLs into env — **not** hard-coded. Treat as **ops critical**, not code leak.

---

# 11. DATABASE / SEEDS

| Asset | Finding |
|-------|---------|
| Schema (`drizzle/0001_init.sql` etc.) | Structure labeled NovaLikes — **reusable** |
| `scripts/seed-dev.ts` | Connectivity smoke only — **no** InstantViral products/orders |
| Coupons / admin / email templates in seeds | **Not seeded** |
| Brand data in migrations | **None** InstantViral |

**STRUCTURE:** reusable. **BRAND DATA in seeds:** clean.

---

# 12. EMAIL / NOTIFICATION AUDIT

| Field | Runtime value |
|-------|----------------|
| Company name default | `NovaLikes` (`EMAIL_COMPANY_NAME` fallback) |
| Copyright footer | `© {year} {companyName}` |
| Logo in email HTML | Text brand name — **no InstantViral logo image** |
| From address | Env-only (`EMAIL_FROM`) |
| Marketing campaign copy | Hard-coded “NovaLikes” strings |
| InstantViral in email templates | **None** in runtime |

---

# 13. ANALYTICS & VERIFICATION

| Provider | Present | Hard-coded InstantViral IDs? |
|----------|---------|------------------------------|
| GA4 | Env-gated | **No** |
| GTM | Env-gated | **No** |
| Microsoft Clarity | Env-gated | **No** |
| Meta Pixel | Not implemented | — |
| TikTok Pixel | Not implemented | — |
| Search Console / Bing / Pinterest verification meta | Not found in app | — |

CSP allows GTM/GA/Clarity hosts generically (`next.config.ts`).

**Risk:** shipping with InstantViral GA/GTM/Clarity IDs in Vercel env would leak traffic — **configuration discipline required**. Code does not embed old IDs.

---

# 14. DOMAIN / URL HARD-CODE AUDIT

## InstantViral domains in runtime code

**None** in `.ts`/`.tsx`.

## InstantViral domains in docs / xls

Extensive — especially `docs/PRODUCTION_DEPLOYMENT_GUIDE.md`, SEO reports, Learn docs, `docs/InstantViral-Website-Links.xls`.

## Production domain constants (runtime)

| Location | Value |
|----------|--------|
| `config/site.ts` | `https://novalikes.com` |
| `config/seo.ts` `SEO_PRODUCTION_DOMAIN` | `https://novalikes.com` |
| `app/robots.ts` host | `novalikes.com` |
| `public/llms*.txt` | `https://novalikes.com/...` |
| Legal/SEO copy | Often **`NovaLikes.ca`** (mismatch) |

---

# 15. CACHE / GENERATED OUTPUT

| Artifact | Present | Notes |
|----------|---------|-------|
| `.next/` | **Yes** (local preview builds) | Not source of truth; may cache old HTML |
| `dist/` / `out/` | Not inventoried as primary | — |
| `node_modules/` | Present after install | — |

**Recommendation:** After any cleanup, delete `.next` and rebuild (`npm run build`) before production deploy. Do not treat `.next` as evidence of remaining InstantViral identity.

---

# 16. ROOT / PUBLIC FILE AUDIT

### Exists (replace/verify)

- `favicon.ico`, `icon.png`, `apple-icon.png` (+ duplicate `* 2.png`)
- `og-default.png`
- `llms.txt`, `llms-full.txt`
- `/icons/*` PWA icons
- `/assets/**` including InstantViral media + canada OG orphans
- Next default SVGs (`next.svg`, `vercel.svg`, etc.) — optional cleanup

### Generated (keep, ensure brand-correct)

- `/robots.txt` ← `app/robots.ts`
- `/sitemap.xml` ← `app/sitemap.ts`
- `/manifest.webmanifest` ← `app/manifest.ts`

### Absent (OK / optional later)

- `ads.txt`, `security.txt`, `humans.txt`, `browserconfig.xml`, opensearch, service workers

---

# 17. ROUTE INVENTORY

| Public path | Class |
|-------------|-------|
| `/` | **REUSABLE** (NovaLikes homepage) |
| `/about`, `/contact`, `/faq`, `/reviews`, `/services`, `/track-order` | **REUSABLE** / NEW-GENERIC |
| `/buy-instagram-*`, `/buy-tiktok-*` (3), `/buy-facebook-*`, `/buy-youtube-*` | **REUSABLE** architecture + NovaLikes content (Canada leftovers on some) |
| `/learn`, `/learn/[slug]`, `/learn/preview/[slug]`, `/learn/tag/[tag]` | **REUSABLE** scaffold; `[slug]` empty → not-found for old articles |
| `/authors`, `/authors/[slug]` | **REUSABLE** (NovaLikes editorial team) |
| Legal: privacy, terms, refund, cookies, disclaimer | **REUSABLE** (NovaLikes.ca wording issue) |
| `/cart`, `/checkout`, `/order-success` | **REUSABLE** commerce |
| `/admin/**` | **REUSABLE** ops |
| `/unsubscribe`, `/unavailable` | **REUSABLE** |
| Old InstantViral Learn article URLs | **BROKEN** by design (registry empty) — good |
| `buy-tiktok-shares`, `buy-tiktok-comments` | **Not present** (intentionally skipped) |

### API routes (all REUSABLE structure)

`/api/admin/*`, `/api/analytics/collect`, `/api/cart/*`, `/api/checkout/place-order`, `/api/contact`, `/api/coupons/validate`, `/api/email/unsubscribe`, `/api/orders/track`, `/api/webhooks/remote-payment`, `/api/webhooks/stripe`

---

# 18. FINAL CLEAN-ROOM REPORT

## A. Critical leftovers

1. **Public InstantViral logo/brand images** under `public/assets/media/2024/09/` — servable on production CDN/origin.
2. **`docs/PRODUCTION_DEPLOYMENT_GUIDE.md`** still InstantViral end-to-end and linked from env/deploy docs — high risk of wiring `instantviral.ca` / InstantViral Stripe/Resend/email.
3. **Env discipline:** no hard-coded InstantViral analytics/payment IDs, but reusing InstantViral Stripe/GA/Resend credentials would re-attach old identity.
4. **Domain copy split:** live SEO/legal text says **NovaLikes.ca** while canonical/schema/robots use **novalikes.com**.

## B. InstantViral branding leftovers

- Docs corpus (~337 hits) + `docs/InstantViral-Website-Links.xls`
- `data/instantviral-next.code-workspace`
- InstantViral media logos (public)
- `IV_*` environment variable naming heritage
- Canada-heritage UI (`*Canada` components, “FOR CANADA” eyebrows)

## C. SEO leftovers

- Dynamic robots/sitemap/manifest **ACTIVE** (NovaLikes) — not removed
- Static `llms*.txt` ACTIVE (NovaLikes, 0 articles)
- Docs SEO audits still InstantViral
- Content-library SEO JSON templates still InstantViral canonicals
- Orphan `*-canada-og.webp` assets

## D. Schema leftovers

- Runtime schema: NovaLikes — **clean**
- Docs schema examples: InstantViral — dead for runtime

## E. Old article leftovers

- Runtime registry empty — **clean**
- Docs/xls/tests still list old `/learn/...` InstantViral URLs
- Linking/sitemap engines reusable but empty

## F. Asset leftovers

- InstantViral logos (critical)
- Canada OG set (orphan)
- Legacy `public/assets/media/2024/**` WordPress-era dump (unknown)
- Duplicate icon files (`* 2.png`)

## G. Commerce/payment leftovers

- Code paths NovaLikes + env-driven URLs — **no InstantViral hard-code**
- Stripe provider retained but not primary checkout
- Docs still InstantViral Stripe/checkout subdomain instructions

## H. Analytics leftovers

- No hard-coded InstantViral measurement IDs
- Must use **new** GA/GTM/Clarity properties in env

## I. Database/data leftovers

- Seeds clean
- Pricing catalog comments refer to “NovaLikes.ca” commercial data (new brand naming issue)

## J. Reusable architecture

- Next.js App Router route groups (marketing/learn/legal/commerce/admin)
- Service registry + dynamic `[slug]` pages
- Metadata registry + sitemap/robots engines
- JSON-LD schema kit
- Checkout/cart/order tracking + admin
- Learn CMS scaffold (empty)
- Design system / shadcn / Tailwind tokens

## K. Safe-to-delete later (after confirmation)

- InstantViral logo files in `public/assets/media/2024/09/`
- Unused `*-canada-og.webp`
- `docs/InstantViral-Website-Links.xls`, InstantViral SEO/deploy reports (or quarantine)
- `data/instantviral-next.code-workspace`
- Duplicate `* 2.png` / `novalikes-editorial-team 2.ts`
- Stale Learn sitemap tests expecting deleted article slugs
- Optional: entire InstantViral-titled docs folders after rewriting runbooks

## L. Must-replace before launch

1. Remove or block InstantViral public logos
2. Rewrite/replace `PRODUCTION_DEPLOYMENT_GUIDE.md` for NovaLikes only
3. Align **`.com` vs `.ca`** everywhere (canonical, legal, meta, emails, cookies)
4. Replace Canada-only marketing eyebrows / component naming if brand is worldwide
5. Confirm favicon/OG/logo visuals are NovaLikes (not InstantViral marks)
6. Provision **new** Stripe/remote-payment, Resend domain, analytics IDs, admin secrets
7. Visual QA of `/assets/logos` and `og-default.png`
8. Clean rebuild (delete `.next`)

## M. Current route inventory

See **§17**. **39** `page.tsx` files; **12** approved buy-* services via `(marketing)/[slug]`.

---

# CLEAN ROOM STATUS: **FAIL**

### PASS criteria (from brief)

> No active InstantViral-specific branding, SEO, schema, domain, tracking, commerce identity or deleted-article references can leak into the new production website.

### Why FAIL (blockers)

| # | Blocker | Leak vector |
|---|---------|-------------|
| 1 | InstantViral logo/webp files in `public/assets/media/2024/09/` | Direct public URLs on new domain |
| 2 | InstantViral production deploy guide still primary ops reference | Human misconfig → old domain, Stripe webhook, email domain, checkout host |
| 3 | Canada-heritage production copy + orphan canada OG assets | Geo/brand continuity with InstantViral Canada positioning |
| 4 | `NovaLikes.ca` vs `novalikes.com` inconsistency | Wrong TLD in customer-facing SEO/legal vs schema/canonical |

### What already passes (do not re-break)

- No InstantViral strings in runtime TS/TSX
- Organization/WebSite/Service schema use NovaLikes
- Learn article registry empty; llms/sitemap do not emit deleted articles
- Analytics IDs not hard-coded to InstantViral
- Checkout success/cancel not hard-coded to instantviral.ca
- Email defaults NovaLikes

---

*End of audit. No files were modified except creation of this report.*
