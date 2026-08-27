# NovaLikes Translation Summary (Post-Fix)

**Fix pass completed:** 2026-08-27 — locale JSON only; English source unchanged.

| Locale | P0 | P1 | P2 | P3 | Overall Quality |
| --- | ---: | ---: | ---: | ---: | --- |
| ES | 0 | 0 | 0 | 1 | Strong |
| DE | 0 | 0 | 0 | 2 | Strong |
| FR | 0 | 0 | 0 | 1 | Strong |
| IT | 0 | 0 | 0 | 1 | Strong |
| PT-BR | 0 | 0 | 0 | 1 | Strong |
| AR | 0 | 0 | 0 | 1 | Strong |

## Fix pass results

| Category | Count |
| --- | ---: |
| Spanish strings corrected (prose) | ~1,050+ token replacements |
| Italian strings corrected (prose) | ~500+ token replacements |
| German corrections | 1 (homepage `Aufrufe`) |
| French corrections | 1 (`nav.mobileNav` → Menu mobile) |
| PT-BR corrections | 1 (`nav.mobileNav` → Menu móvel) |
| Italian UI corrections | 1 (`nav.mobileNav` → Menu mobile) |
| Arabic corrections | 0 (duplicate follower-pricing kept — generic & correct) |
| Quick Answers changed | 0 |
| H1/eyebrow changed | 0 |
| Legal content changed | 0 |
| Unsupported claims introduced | 0 |

## Remaining user-facing English metrics

| Locale | `views` in visible prose | `likes` in visible prose | Notes |
| --- | ---: | ---: | --- |
| ES | **0** | **0** | Remaining matches are `href`/`slug`/`id`/`src`/`supportingKeywords` only |
| IT | **0** | N/A (uses *like* loanword where natural) | Remaining `views` in SEO keyword arrays only |

## Learn navigation decision

**INTENTIONAL / ACCEPTED:** Keep **"Learn"** in all localized navs as the NovaLikes product hub name (English-only content hub). Consistent across ES, DE, FR, IT, PT-BR, AR.

## German Tools navigation

**INTENTIONAL / ACCEPTED:** Keep **"Tools"** in `de/ui.json` — matches sitewide German usage (*Kostenlose Tools*, *Instagram-Tools*, metadata, legal copy).

## Duplicate / shared boilerplate (16 audit flags)

**INTENTIONAL / ACCEPTED:** All `beforeBuying`, `whatHappens`, and cross-views `bestPractices` duplicates mirror intentional English shared templates. No rewrite performed.

## Arabic follower-pricing duplicate

**INTENTIONAL / ACCEPTED:** Generic `حزمة المتابعين` pricing paragraph is semantically correct for both TikTok and Facebook follower pages.

---

## Spanish

- **Strongest areas:** Full *visualizaciones* / *Me gusta* terminology in service prose; SEO titles fixed; Facebook distinctions preserved.
- **Biggest problems resolved:** English *views*/*likes* leakage across views/likes service pages and homepage.
- **Remaining:** Nav **Learn** label (intentional product name).

## German

- **Strongest areas:** Formal Sie register; *View-Zahl* / *Views* used consistently on views product pages (established DE product language).
- **Fix applied:** Homepage hero *Views* → *Aufrufe*.
- **Remaining:** Nav **Learn** and **Tools** (intentional).

## French

- **Strongest areas:** Natural *vues* terminology; mobile nav localized.
- **Remaining:** Nav **Learn** (intentional).

## Italian

- **Strongest areas:** *visualizzazioni* in service prose; *follower*/*like* loanwords retained where natural.
- **Fix applied:** Homepage *Mi piace, visualizzazioni*; views pages fully localized.
- **Remaining:** Nav **Learn** (intentional).

## PT-BR

- **Strongest areas:** Correct *seguidores/curtidas/visualizações* throughout.
- **Fix applied:** Mobile nav aria label.
- **Remaining:** Nav **Learn** (intentional).

## Arabic

- **Strongest areas:** Natural MSA; service distinctions intact.
- **Remaining:** Nav **Learn** (intentional); shared follower-pricing boilerplate (accepted).
