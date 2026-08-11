# NovaLikes Content Repository

File-based Learn Center article packages — Documents **16.00** (Content Design System) and **16.01** (Content Repository Generator).

## Layout

```
content/
├── _templates/article-package/   # empty template filenames
├── instagram/
├── tiktok/
├── facebook/
├── youtube/
└── marketing/                    # general / SMM articles
```

Each article folder uses the slug as the directory name and contains the 15 standard files (`00_README.md` … `14_Changelog.md`).

## Naming

- Lowercase, hyphen-separated slugs
- One article per folder
- No duplicate slugs across platforms

## Commands

From repo root (TypeScript helpers in `lib/content-repository`):

- `createArticlePackage(slug)`
- `validateRepository()`
- `listMissingFiles(slug)`
- `buildContentIndex()`
- `scaffoldAllPlannedPackages()` — scaffolds all 50 planned briefs

## Rules

- Follow the Content Design System before publication
- Do not publish scaffold-only MDX
- Do not invent authors, statistics, or skipped-service targets
- Register published articles in `LEARN_ARTICLES` and authors in `AUTHORS`
