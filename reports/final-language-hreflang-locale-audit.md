# Final Language / Hreflang / Locale Settings Audit

**Date:** 2026-09-03
**Project:** C:\Users\HUSSNAIN.COM\Novalikes
**Method:** Read-only audit of config, middleware, metadata builders, sitemap, robots, switchers, and schema emitters. No production files changed.

---

# 1. HTML `lang` Attribute

| Surface | Expected | Actual rendered source | Status |
|---|---|---|---|
| Locale en | lang="en" | lang="en" via HTML_LANG + root layout | PASS |
| Locale es | lang="es" | lang="es" via HTML_LANG + root layout | PASS |
| Locale de | lang="de" | lang="de" via HTML_LANG + root layout | PASS |
| Locale fr | lang="fr" | lang="fr" via HTML_LANG + root layout | PASS |
| Locale it | lang="it" | lang="it" via HTML_LANG + root layout | PASS |
| Locale pt-br | lang="pt-BR" | lang="pt-BR" via HTML_LANG + root layout | PASS |
| Locale ar | lang="ar" | lang="ar" via HTML_LANG + root layout | PASS |
| Market /ca/ | lang="en-CA" OR architecture equivalent | **lang="en"** (locale stays `en`); HTTP `Content-Language: en-CA` + metadata content-language | PASS (architecture equivalent) |
| Market /au/ | lang="en-AU" OR architecture equivalent | **lang="en"** (locale stays `en`); HTTP `Content-Language: en-AU` + metadata content-language | PASS (architecture equivalent) |
| Market /us/ | lang="en-US" OR architecture equivalent | **lang="en"** (locale stays `en`); HTTP `Content-Language: en-US` + metadata content-language | PASS (architecture equivalent) |
| Market /uk/ | lang="en-GB" OR architecture equivalent | **lang="en"** (locale stays `en`); HTTP `Content-Language: en-GB` + metadata content-language | PASS (architecture equivalent) |

**Architecture:** Language locales own `<html lang>` / `dir`. English geo markets keep `locale=en`, so `lang="en"` + `dir="ltr"`. Regional targeting uses hreflang (`en-CA`…) and `Content-Language` headers/meta — not regional html lang. This matches `lib/i18n/config.ts` (“language localization only”) and `lib/market/config.ts` (separate geo markets).

Root layout: `<html lang={HTML_LANG[locale]} dir={LOCALE_DIR[locale]}>`
Client reinforce: `HtmlLang` sets `document.documentElement.lang/dir` from locale only.

# 2. RTL

| Locale | dir |
|---|---|
| en | ltr |
| es | ltr |
| de | ltr |
| fr | ltr |
| it | ltr |
| pt-br | ltr |
| ar | rtl |

- Arabic: `lang="ar"` + `dir="rtl"` — **PASS**
- All other locales + markets: `ltr` — **PASS** (no accidental RTL inheritance)
- Mega menu reads `document.documentElement.dir === "rtl"` for positioning
- Language switcher trigger forces `dir="ltr"` so flag/short codes stay upright in Arabic UI — intentional
- Font: Geist Sans for all locales including Arabic (no dedicated Arabic font stack) — **P2 polish observation only**

# 3. Hreflang

## Service page family (`/buy-instagram-followers`)

| Code | URL |
|---|---|
| ar | /ar/buy-instagram-followers |
| de | /de/instagram-follower-kaufen |
| en | /buy-instagram-followers |
| en-AU | /au/buy-instagram-followers |
| en-CA | /ca/buy-instagram-followers |
| en-GB | /uk/buy-instagram-followers |
| en-US | /us/buy-instagram-followers |
| es | /es/comprar-seguidores-instagram |
| fr | /fr/acheter-abonnes-instagram |
| it | /it/comprare-follower-instagram |
| pt-BR | /pt-br/comprar-seguidores-instagram |
| x-default | /buy-instagram-followers |

## Homepage family (`/`)

- ar → /ar
- de → /de
- en → /
- en-AU → /au/
- en-CA → /ca/
- en-GB → /uk/
- en-US → /us/
- es → /es
- fr → /fr
- it → /it
- pt-BR → /pt-br
- x-default → /

## Non-market path (`/about`) — no en-CA/AU/US/GB

Keys: ar, de, en, es, fr, it, pt-BR, x-default

**Hreflang errors:** 0

# 4. X-Default

- Homepage x-default: `/` → unprefixed English `/`
- Service x-default: `/buy-instagram-followers` → unprefixed English service URL
- FAQ x-default: `/faq`
- **Intentional:** x-default always points at DEFAULT_LOCALE English (unprefixed). Consistent across page families.
- **Do not change.**

# 5. Canonical

| Page | Canonical |
|---|---|
| /es/ home | https://novalikes.com/es |
| /es/… followers | https://novalikes.com/es/comprar-seguidores-instagram |
| /de/ home | https://novalikes.com/de |
| /de/… followers | https://novalikes.com/de/instagram-follower-kaufen |
| /fr/ home | https://novalikes.com/fr |
| /fr/… followers | https://novalikes.com/fr/acheter-abonnes-instagram |
| /it/ home | https://novalikes.com/it |
| /it/… followers | https://novalikes.com/it/comprare-follower-instagram |
| /pt-br/ home | https://novalikes.com/pt-br |
| /pt-br/… followers | https://novalikes.com/pt-br/comprar-seguidores-instagram |
| /ar/ home | https://novalikes.com/ar |
| /ar/… followers | https://novalikes.com/ar/buy-instagram-followers |
| /ca/ | https://novalikes.com/ca |
| /au/ | https://novalikes.com/au |
| /us/ | https://novalikes.com/us |
| /uk/ | https://novalikes.com/uk |
| / (EN) | https://novalikes.com/ (via unprefixed buildPageMetadata) |

**Canonical errors:** 0

# 6. Language Switcher

- Combined dropdown: **Regions** (markets) + **Language** (locales)
- Current language highlighted via `aria-current` / active styles when `item === locale`
- On market pages, trigger shows market short label (CA/AU/US/UK); language list still highlights `en`
- `localeSwitcherHref` uses bare core path (market prefix stripped) → switching language leaves the geo market and goes to translated locale URL

| From bare path | To locale | Href |
|---|---|---|
| /buy-instagram-followers | en | /buy-instagram-followers |
| /buy-instagram-followers | es | /es/comprar-seguidores-instagram |
| /buy-instagram-followers | de | /de/instagram-follower-kaufen |
| /buy-instagram-followers | fr | /fr/acheter-abonnes-instagram |
| /buy-instagram-followers | it | /it/comprare-follower-instagram |
| /buy-instagram-followers | pt-br | /pt-br/comprar-seguidores-instagram |
| /buy-instagram-followers | ar | /ar/buy-instagram-followers |

- Learn paths: switching away from English goes to locale homepage (no fake `/es/learn/...`) — intentional
- **Language-switcher errors:** 0 confirmed logic bugs

# 7. Country Market Switching

| From | To | Href |
|---|---|---|
| /ca/buy-instagram-followers | uk | /uk/buy-instagram-followers |
| /uk/buy-instagram-followers | null (global EN) | /buy-instagram-followers |
| /buy-instagram-followers | ca | /ca/buy-instagram-followers |
| /about | ca | /about |

- Non-core paths (About, FAQ, legal) stay global English when switching market — intentional (`isMarketCorePath`)
- Regions vs Languages are separate menu sections — no confusion of French language with Canada English
- **Market-switcher errors:** 0

# 8. Sitemap

- Total entries: **290**
- Duplicates: **0**
- Orphans: **0**
- Canonical validation issues: **0**
- Accidental /en/ URLs: **0**
- Geo market URLs present: **44/44**
- Localized URL counts: {"es":29,"de":29,"fr":29,"it":29,"pt-br":29,"ar":29}
- Sitemap hreflang sample (EN followers): ar, de, en, en-AU, en-CA, en-GB, en-US, es, fr, it, pt-BR, x-default

**Sitemap locale errors:** 0

# 9. Robots / Indexability

- Robots validation: **PASS**
- Allow /: yes
- Crawler allow /es: **true**
- Crawler allow /de: **true**
- Crawler allow /fr: **true**
- Crawler allow /it: **true**
- Crawler allow /pt-br: **true**
- Crawler allow /ar: **true**
- Crawler allow /ca: **true**
- Crawler allow /au: **true**
- Crawler allow /us: **true**
- Crawler allow /uk: **true**
- Locale folders are **not** in ROBOTS_DISALLOW
- `/en` blocked via `isBlockedLocaleAlias` + middleware (not robots disallow) — correct
- Localized + market metadata builders set `robots: { index: true, follow: true }`

**Robots/indexability errors:** 0

# 10. Metadata Language

| Locale | Home title (sample) | Followers title (sample) |
|---|---|---|
| es | Comprar seguidores, Me gusta y visualizaciones | NovaLikes | Comprar seguidores de Instagram | NovaLikes |
| de | Follower, Likes & Views kaufen | NovaLikes | Instagram Follower kaufen – ohne Passwort |
| fr | Acheter des abonnés, likes et vues | NovaLikes | Acheter des abonnés Instagram | NovaLikes |
| it | Comprare follower, like e visualizzazioni | NovaLikes | Comprare follower Instagram | NovaLikes |
| pt-br | Comprar seguidores, curtidas e views | NovaLikes | Comprar seguidores no Instagram | NovaLikes |
| ar | شراء متابعين وإعجابات ومشاهدات | NovaLikes | شراء متابعين إنستغرام | NovaLikes |

Arabic home title: شراء متابعين وإعجابات ومشاهدات | NovaLikes
Spanish home title: Comprar seguidores, Me gusta y visualizaciones | NovaLikes
German home title: Follower, Likes & Views kaufen | NovaLikes
French home title: Acheter des abonnés, likes et vues | NovaLikes
Italian home title: Comprare follower, like e visualizzazioni | NovaLikes
pt-BR home title: Comprar seguidores, curtidas e views | NovaLikes

**Metadata-language fallback issues:** none detected by script/heuristic (localized overlays present; titles differ by locale).

Note: Full linguistic QA of every translated string is out of scope. Completeness is covered by `i18n-core` overlay tests.

# 11. Structured Data Language / URL

- Organization.url: https://novalikes.com
- Organization.inLanguage: **ABSENT** (report only)
- WebSite.inLanguage: **ABSENT** (report only)
- Localized service pages: `serviceSchema(..., { url: localizeHref(...) })` — uses locale URL
- Market service pages: `marketServiceSchema(..., { url: localizeMarketHref(...) })` — uses market URL
- Global SiteJsonLd Organization/WebSite always reference English site root (shared entity) — intentional, not duplicate locale schema
- Learn article schema hardcodes `inLanguage: "en"` (Learn is English-only) — expected

**Schema locale/URL issues:** 0

# 12. Arabic Special Check

- `lang="ar"`: PASS
- `dir="rtl"`: PASS
- Canonical locale-prefixed: PASS (see §5)
- Hreflang `ar`: PASS
- Content-Language header via middleware: PASS
- Switcher: present; trigger stays LTR for chrome
- Dedicated Arabic font: not configured (Geist) — P2 polish
- Visual RTL of every card/icon: not browser-verified in this audit session; root `dir=rtl` is set correctly for CSS logical properties
- Arabic homepage meta title contains Arabic script: PASS

# 13. Portuguese Brazil

| Field | Value |
|---|---|
| URL prefix | /pt-br/ |
| HTML lang | pt-BR |
| Hreflang key | pt-BR |
| OG locale | pt_BR |
| Switcher hrefLang | pt-BR |

- No `pt-br` as hreflang code — **PASS**
- Blocked aliases include `pt`, `pt-pt`, `pt_br`, `ptbr` — **PASS**

**pt-BR casing issues:** 0

# 14. Default English

- Unprefixed `/` and `/buy-*`: PASS
- `/en` blocked alias: true
- `/english` blocked: true
- Accidental /en/ in sitemap: 0
- Hreflang `en` → unprefixed: PASS
- x-default → unprefixed English: PASS

# 15. Route Collisions

- `/ca/` = English Canada market (not French Canada) — PASS
- `/us/` = English US market — PASS
- `/uk/` → hreflang en-GB — PASS
- `/pt-br/` = language locale — PASS
- Markets and locales use separate middleware branches — PASS

# Summary Counters

1. Default English lang: **PASS** (`en`)
2. Spanish lang: **PASS** (`es`)
3. German lang: **PASS** (`de`)
4. French lang: **PASS** (`fr`)
5. Italian lang: **PASS** (`it`)
6. pt-BR lang: **PASS** (`pt-BR`)
7. Arabic lang + RTL: **PASS** (`ar` + `rtl`)
8. CA en-CA: **PASS** (hreflang + Content-Language; html lang=en by architecture)
9. AU en-AU: **PASS** (same pattern)
10. US en-US: **PASS** (same pattern)
11. UK en-GB: **PASS** (same pattern)
12. x-default target: **unprefixed English** (consistent)
13. Hreflang errors: **0**
14. Canonical errors: **0**
15. Language-switcher errors: **0**
16. Market-switcher errors: **0**
17. Sitemap locale errors: **0**
18. Robots/indexability errors: **0**
19. Metadata-language fallback issues: **0**
20. Schema locale/URL issues: **0**
21. Arabic RTL issues: **0** (root dir correct; font P2 only)
22. pt-BR casing issues: **0**
23. Accidental /en/ duplicates: **0**
24. P0 count: **0**
25. P1 count: **0**
26. P2 count: **2**
27. Overall verdict: **CLEAN WITH MINOR POLISH**
28. Files changed: **NONE**
29. NO COMMIT
30. NO PUSH
31. NO DEPLOY

## Issue detail

### P2
- No dedicated Arabic font family (Geist Sans used sitewide)
- Market pages render html lang="en" (not en-CA/AU/US/GB); regional codes via Content-Language + hreflang (architecture-approved)

## Required tests run

| Command | Result |
|---|---|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm test` / vitest (94 files, 580 tests) | PASS |
| `npm run build` | PASS |
| `i18n-core` + `market-routing` + `sitemap-robots` | PASS (25/25) |

No production code changes were required.
