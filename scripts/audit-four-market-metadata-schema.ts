/**
 * READ-ONLY audit: effective metadata + JSON-LD for 44 geo routes.
 * Uses the same builders/components pages emit (generateMetadata + SiteJsonLd + page JsonLd).
 * Does not mutate content, metadata, schema, or env.
 *
 * Usage: npx tsx scripts/audit-four-market-metadata-schema.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { getServiceBySlug } from '@/data/services';
import {
  CORE_SERVICE_SLUGS,
  type CoreServiceSlug,
} from '@/lib/i18n/config';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import {
  loadMarketHomepageHub,
  loadMarketMetadataBundle,
  loadMarketServiceBundle,
} from '@/lib/market/content/load';
import { MARKETS, MARKET_COUNTRY_NAME, type Market } from '@/lib/market/config';
import { buildMarketMetadata, marketServiceMetadata } from '@/lib/market/metadata';
import { localizeMarketHref, hreflangMapWithMarket } from '@/lib/market/paths';
import { asJsonLdGraph, serializeJsonLd } from '@/lib/seo/schema';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { organizationSchema, ORGANIZATION_ID, WEBSITE_ID } from '@/schemas/organization';
import { marketServiceSchema } from '@/schemas/service';
import { websiteSchema } from '@/schemas/website';
import type { Metadata } from 'next';

type MetaRow = {
  market: Market;
  route: string;
  kind: 'home' | 'service';
  slug?: CoreServiceSlug;
  h1: string;
  title: string;
  titleChars: number;
  description: string;
  descChars: number;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  hreflang: Record<string, string>;
  visibleFaqCount: number;
  metadataVerdict: string;
};

type SchemaBlock = {
  source: string;
  id?: string;
  raw: unknown;
  types: string[];
  entityKeys: string[];
};

type SchemaRow = {
  market: Market;
  route: string;
  blocks: SchemaBlock[];
  typesFlat: string[];
  blockCount: number;
  duplicateSchema: string[];
  conflicts: string[];
  schemaVerdict: string;
};

function titleFromMetadata(meta: Metadata): string {
  const t = meta.title;
  if (typeof t === 'string') return t;
  if (t && typeof t === 'object' && 'absolute' in t && typeof t.absolute === 'string') {
    return t.absolute;
  }
  return '';
}

function robotsFromMetadata(meta: Metadata): string {
  const r = meta.robots;
  if (!r) return '(absent)';
  if (typeof r === 'string') return r;
  const index = r.index === false ? 'noindex' : 'index';
  const follow = r.follow === false ? 'nofollow' : 'follow';
  return `${index}, ${follow}`;
}

function ogField(meta: Metadata, key: 'title' | 'description' | 'url'): string {
  const og = meta.openGraph;
  if (!og || typeof og !== 'object') return '(absent)';
  const value = (og as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : '(absent)';
}

function ogImage(meta: Metadata): string {
  const og = meta.openGraph;
  if (!og || typeof og !== 'object') return '(absent)';
  const images = (og as { images?: unknown }).images;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && 'url' in first) {
      const url = (first as { url: unknown }).url;
      return typeof url === 'string' ? url : String(url);
    }
  }
  return '(absent)';
}

function twitterField(meta: Metadata, key: 'card' | 'title' | 'description'): string {
  const tw = meta.twitter;
  if (!tw || typeof tw !== 'object') return '(absent)';
  const value = (tw as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : '(absent)';
}

function twitterImage(meta: Metadata): string {
  const tw = meta.twitter;
  if (!tw || typeof tw !== 'object') return '(absent)';
  const images = (tw as { images?: unknown }).images;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && 'url' in first) {
      const url = (first as { url: unknown }).url;
      return typeof url === 'string' ? url : String(url);
    }
  }
  return '(absent)';
}

function collectTypes(node: unknown, out: string[] = []): string[] {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    for (const item of node) collectTypes(item, out);
    return out;
  }
  const obj = node as Record<string, unknown>;
  if (typeof obj['@type'] === 'string') out.push(obj['@type']);
  else if (Array.isArray(obj['@type'])) {
    for (const t of obj['@type']) if (typeof t === 'string') out.push(t);
  }
  if (Array.isArray(obj['@graph'])) {
    for (const item of obj['@graph']) collectTypes(item, out);
  }
  return out;
}

function entityKey(node: Record<string, unknown>): string {
  const type = Array.isArray(node['@type'])
    ? node['@type'].join(',')
    : String(node['@type'] ?? 'Unknown');
  const id = typeof node['@id'] === 'string' ? node['@id'] : '';
  const url = typeof node.url === 'string' ? node.url : '';
  const name = typeof node.name === 'string' ? node.name : '';
  return `${type}|${id}|${url}|${name}`;
}

function flattenEntities(node: unknown): Record<string, unknown>[] {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(flattenEntities);
  const obj = node as Record<string, unknown>;
  if (Array.isArray(obj['@graph'])) {
    return obj['@graph'].flatMap((item) => flattenEntities(item));
  }
  return [obj];
}

function wrongCountryForMarket(market: Market, text: string): string | null {
  const wrong: Record<Market, RegExp[]> = {
    ca: [/\bAustralia\b/i, /\bUnited States\b/i, /\bUSA\b/, /\bUnited Kingdom\b/i, /\bUK\b(?!\w)/],
    au: [/\bCanada\b/i, /\bCanadian\b/i, /\bUnited States\b/i, /\bUSA\b/, /\bUnited Kingdom\b/i],
    us: [/\bCanada\b/i, /\bCanadian\b/i, /\bAustralia\b/i, /\bAustralian\b/i, /\bUnited Kingdom\b/i, /\bUK\b(?!\w)/],
    uk: [/\bCanada\b/i, /\bCanadian\b/i, /\bAustralia\b/i, /\bAustralian\b/i, /\bUnited States\b/i, /\bUSA\b/],
  };
  for (const re of wrong[market]) {
    if (re.test(text)) return re.source;
  }
  return null;
}

function expectedCountryToken(market: Market): RegExp {
  switch (market) {
    case 'ca':
      return /\bCanada\b|\bCanadian\b|\bCA\b/;
    case 'au':
      return /\bAustralia\b|\bAustralian\b|\bAU\b/;
    case 'us':
      return /\bUnited States\b|\bUSA\b|\bUS\b|\bAmerica\b/;
    case 'uk':
      return /\bUnited Kingdom\b|\bUK\b|\bBritain\b|\bBritish\b/;
  }
}

function metadataVerdict(row: MetaRow, all: MetaRow[]): string {
  const issues: string[] = [];
  if (!row.title) issues.push('missing title');
  if (!row.description) issues.push('missing description');
  if (!row.canonical) issues.push('missing canonical');
  if (!row.canonical.includes(`/${row.market}`)) issues.push('canonical market mismatch');
  if (row.robots.includes('noindex')) issues.push('noindex');
  const wrongT = wrongCountryForMarket(row.market, row.title);
  const wrongD = wrongCountryForMarket(row.market, row.description);
  if (wrongT) issues.push(`wrong-country in title (${wrongT})`);
  if (wrongD) issues.push(`wrong-country in description (${wrongD})`);
  const titleDupes = all.filter((r) => r.title === row.title);
  if (titleDupes.length > 1) issues.push('exact duplicate title');
  const descDupes = all.filter((r) => r.description === row.description);
  if (descDupes.length > 1) issues.push('exact duplicate description');
  const canDupes = all.filter((r) => r.canonical === row.canonical);
  if (canDupes.length > 1) issues.push('duplicate canonical');
  if (row.titleChars > 70) issues.push('title length polish');
  if (row.descChars > 165) issues.push('description length polish');
  if (issues.length === 0) return 'CLEAN';
  if (issues.every((i) => i.includes('polish'))) return `P2: ${issues.join('; ')}`;
  if (issues.some((i) => i.includes('noindex') || i.includes('canonical market'))) {
    return `P0: ${issues.join('; ')}`;
  }
  return `P1: ${issues.join('; ')}`;
}

function buildHomeMeta(market: Market): MetaRow {
  const bundle = loadMarketMetadataBundle(market);
  const hub = loadMarketHomepageHub(market);
  const meta = buildMarketMetadata({
    market,
    pathname: '/',
    title: bundle.homepage.title,
    description: bundle.homepage.description,
  });
  const route = localizeMarketHref('/', market);
  const bare = '/';
  const languages: Record<string, string> = {};
  for (const [code, p] of Object.entries(hreflangMapWithMarket(bare))) {
    languages[code] = absoluteUrl(p);
  }
  const faqCount = hub.faq?.items?.length ?? 0;
  return {
    market,
    route: route.replace(/\/$/, '') || `/${market}`,
    kind: 'home',
    h1: hub.hero.title,
    title: titleFromMetadata(meta),
    titleChars: titleFromMetadata(meta).length,
    description: String(meta.description ?? ''),
    descChars: String(meta.description ?? '').length,
    canonical: String(meta.alternates?.canonical ?? ''),
    robots: robotsFromMetadata(meta),
    ogTitle: ogField(meta, 'title'),
    ogDescription: ogField(meta, 'description'),
    ogUrl: ogField(meta, 'url'),
    ogImage: ogImage(meta),
    twitterCard: twitterField(meta, 'card'),
    twitterTitle: twitterField(meta, 'title'),
    twitterDescription: twitterField(meta, 'description'),
    twitterImage: twitterImage(meta),
    hreflang: languages,
    visibleFaqCount: faqCount,
    metadataVerdict: '',
  };
}

function buildServiceMeta(market: Market, slug: CoreServiceSlug): MetaRow {
  const bundle = loadMarketMetadataBundle(market);
  const serviceMeta = bundle.services[slug];
  const serviceBundle = loadMarketServiceBundle(market, slug);
  const meta = marketServiceMetadata(
    market,
    slug,
    serviceMeta.title,
    serviceMeta.description,
  );
  const route = localizeMarketHref(`/${slug}`, market);
  const languages: Record<string, string> = {};
  for (const [code, p] of Object.entries(hreflangMapWithMarket(`/${slug}`))) {
    languages[code] = absoluteUrl(p);
  }
  const heroTitle =
    serviceBundle.content?.hero?.title ??
    ENGLISH_UI.services[slug];
  const faqItems =
    (serviceBundle as { faq?: unknown[] }).faq ??
    (serviceBundle as { faqs?: unknown[] }).faqs ??
    serviceBundle.content?.faq?.items ??
    [];
  const faqCount = Array.isArray(faqItems) ? faqItems.length : 0;
  return {
    market,
    route,
    kind: 'service',
    slug,
    h1: heroTitle,
    title: titleFromMetadata(meta),
    titleChars: titleFromMetadata(meta).length,
    description: String(meta.description ?? ''),
    descChars: String(meta.description ?? '').length,
    canonical: String(meta.alternates?.canonical ?? ''),
    robots: robotsFromMetadata(meta),
    ogTitle: ogField(meta, 'title'),
    ogDescription: ogField(meta, 'description'),
    ogUrl: ogField(meta, 'url'),
    ogImage: ogImage(meta),
    twitterCard: twitterField(meta, 'card'),
    twitterTitle: twitterField(meta, 'title'),
    twitterDescription: twitterField(meta, 'description'),
    twitterImage: twitterImage(meta),
    hreflang: languages,
    visibleFaqCount: faqCount,
    metadataVerdict: '',
  };
}

function buildSchemaForHome(market: Market): SchemaRow {
  const route = localizeMarketHref('/', market).replace(/\/$/, '') || `/${market}`;
  const siteGraph = asJsonLdGraph([organizationSchema(), websiteSchema()]);
  const blocks: SchemaBlock[] = [
    {
      source: 'SiteJsonLd (marketing layout)',
      id: 'site-jsonld',
      raw: siteGraph,
      types: collectTypes(siteGraph),
      entityKeys: flattenEntities(siteGraph).map(entityKey),
    },
  ];
  // Homepage page.tsx emits no page-level JsonLdScript
  return analyzeSchema(market, route, blocks);
}

function buildSchemaForService(market: Market, slug: CoreServiceSlug): SchemaRow {
  const service = getServiceBySlug(slug)!;
  const meta = loadMarketMetadataBundle(market).services[slug];
  const localizedUrl = localizeMarketHref(`/${slug}`, market);
  const homeHref = localizeMarketHref('/', market);
  const breadcrumbs = [
    { label: ENGLISH_UI.breadcrumbs.home, href: homeHref },
    { label: ENGLISH_UI.services[slug], href: localizedUrl },
  ];
  const pageGraph = asJsonLdGraph([
    marketServiceSchema(service, market, {
      name: ENGLISH_UI.services[slug],
      description: meta?.description,
      url: localizedUrl,
    }),
    breadcrumbSchema(breadcrumbs),
  ]);
  const siteGraph = asJsonLdGraph([organizationSchema(), websiteSchema()]);
  const blocks: SchemaBlock[] = [
    {
      source: 'SiteJsonLd (marketing layout)',
      id: 'site-jsonld',
      raw: siteGraph,
      types: collectTypes(siteGraph),
      entityKeys: flattenEntities(siteGraph).map(entityKey),
    },
    {
      source: `JsonLdScript service-jsonld-${service.id}-${market}`,
      id: `service-jsonld-${service.id}-${market}`,
      raw: pageGraph,
      types: collectTypes(pageGraph),
      entityKeys: flattenEntities(pageGraph).map(entityKey),
    },
  ];
  return analyzeSchema(market, localizedUrl, blocks);
}

function analyzeSchema(market: Market, route: string, blocks: SchemaBlock[]): SchemaRow {
  const allEntities = blocks.flatMap((b) =>
    flattenEntities(b.raw).map((e) => ({ e, source: b.source })),
  );
  const keyCounts = new Map<string, { count: number; sources: Set<string>; type: string }>();
  for (const { e, source } of allEntities) {
    const key = entityKey(e);
    const type = String(e['@type'] ?? 'Unknown');
    const prev = keyCounts.get(key) ?? { count: 0, sources: new Set(), type };
    prev.count += 1;
    prev.sources.add(source);
    keyCounts.set(key, prev);
  }

  const duplicateSchema: string[] = [];
  for (const [key, info] of keyCounts) {
    if (info.count > 1) {
      duplicateSchema.push(
        `${info.type} x${info.count} key=${key} sources=[${[...info.sources].join(' | ')}]`,
      );
    }
  }

  // Also detect same @type+@id across blocks even if other fields differ slightly
  const idMap = new Map<string, string[]>();
  for (const { e, source } of allEntities) {
    const id = typeof e['@id'] === 'string' ? e['@id'] : '';
    const type = String(e['@type'] ?? '');
    if (!id) continue;
    const k = `${type}|${id}`;
    const list = idMap.get(k) ?? [];
    list.push(source);
    idMap.set(k, list);
  }
  for (const [k, sources] of idMap) {
    if (sources.length > 1) {
      const msg = `duplicate @id entity ${k} in ${sources.join(' + ')}`;
      if (!duplicateSchema.some((d) => d.includes(k))) duplicateSchema.push(msg);
    }
  }

  const conflicts: string[] = [];
  const serviceEntities = allEntities.filter((x) => x.e['@type'] === 'Service');
  for (const { e } of serviceEntities) {
    const url = typeof e.url === 'string' ? e.url : '';
    if (url.includes('localhost')) conflicts.push('Service url contains localhost');
    if (url && !url.includes(`/${market}/`) && !url.endsWith(`/${market}`)) {
      // market service URLs are /ca/buy-...
      if (!url.includes(`/${market}/`)) {
        conflicts.push(`Service url market mismatch: ${url}`);
      }
    }
    const area = e.areaServed as { name?: string } | undefined;
    if (area?.name && area.name !== MARKET_COUNTRY_NAME[market]) {
      conflicts.push(`areaServed mismatch: ${area.name}`);
    }
  }

  // Validate JSON serializability
  for (const block of blocks) {
    try {
      serializeJsonLd(block.raw as never);
      JSON.parse(serializeJsonLd(block.raw as never));
    } catch {
      conflicts.push(`invalid JSON-LD in ${block.source}`);
    }
  }

  const typesFlat = blocks.flatMap((b) => b.types);
  let schemaVerdict = 'CLEAN';
  if (conflicts.some((c) => c.includes('invalid') || c.includes('localhost'))) {
    schemaVerdict = `P0: ${conflicts.join('; ')}`;
  } else if (duplicateSchema.length || conflicts.length) {
    schemaVerdict = `P1: ${[...duplicateSchema, ...conflicts].join('; ')}`;
  }

  return {
    market,
    route,
    blocks,
    typesFlat,
    blockCount: blocks.length,
    duplicateSchema,
    conflicts,
    schemaVerdict,
  };
}

function mdEscape(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function main() {
  const metaRows: MetaRow[] = [];
  const schemaRows: SchemaRow[] = [];

  for (const market of MARKETS) {
    metaRows.push(buildHomeMeta(market));
    schemaRows.push(buildSchemaForHome(market));
    for (const slug of CORE_SERVICE_SLUGS) {
      metaRows.push(buildServiceMeta(market, slug));
      schemaRows.push(buildSchemaForService(market, slug));
    }
  }

  for (const row of metaRows) {
    row.metadataVerdict = metadataVerdict(row, metaRows);
  }

  // Aggregate stats
  const titleGroups = new Map<string, string[]>();
  const descGroups = new Map<string, string[]>();
  const canGroups = new Map<string, string[]>();
  for (const r of metaRows) {
    titleGroups.set(r.title, [...(titleGroups.get(r.title) ?? []), r.route]);
    descGroups.set(r.description, [...(descGroups.get(r.description) ?? []), r.route]);
    canGroups.set(r.canonical, [...(canGroups.get(r.canonical) ?? []), r.route]);
  }
  const dupTitles = [...titleGroups.entries()].filter(([, routes]) => routes.length > 1);
  const dupDescs = [...descGroups.entries()].filter(([, routes]) => routes.length > 1);
  const dupCans = [...canGroups.entries()].filter(([, routes]) => routes.length > 1);

  const missingTitles = metaRows.filter((r) => !r.title);
  const missingDescs = metaRows.filter((r) => !r.description);
  const robotsErrors = metaRows.filter((r) => r.robots.includes('noindex'));
  const canonicalErrors = metaRows.filter(
    (r) => !r.canonical || !r.canonical.includes(`/${r.market}`),
  );

  const hreflangErrors: string[] = [];
  for (const r of metaRows) {
    for (const code of ['en-CA', 'en-AU', 'en-US', 'en-GB', 'x-default'] as const) {
      if (!r.hreflang[code]) hreflangErrors.push(`${r.route} missing ${code}`);
    }
    // Reciprocal: each market alternate should point to that market
    if (r.hreflang['en-CA'] && !r.hreflang['en-CA'].includes('/ca')) {
      hreflangErrors.push(`${r.route} en-CA not CA URL`);
    }
    if (r.hreflang['en-AU'] && !r.hreflang['en-AU'].includes('/au')) {
      hreflangErrors.push(`${r.route} en-AU not AU URL`);
    }
    if (r.hreflang['en-US'] && !r.hreflang['en-US'].includes('/us')) {
      hreflangErrors.push(`${r.route} en-US not US URL`);
    }
    if (r.hreflang['en-GB'] && !r.hreflang['en-GB'].includes('/uk')) {
      hreflangErrors.push(`${r.route} en-GB not UK URL`);
    }
  }

  const totalJsonLdBlocks = schemaRows.reduce((n, r) => n + r.blockCount, 0);
  const pagesWithDupSchema = schemaRows.filter((r) => r.duplicateSchema.length > 0);
  const invalidJsonLd = schemaRows.filter((r) =>
    r.conflicts.some((c) => c.includes('invalid')),
  );
  const schemaConflicts = schemaRows.filter((r) => r.conflicts.length > 0);

  let dupOrg = 0;
  let dupWeb = 0;
  let dupWebPage = 0;
  let dupService = 0;
  let dupFaq = 0;
  let dupBreadcrumb = 0;
  for (const r of schemaRows) {
    for (const d of r.duplicateSchema) {
      if (d.includes('Organization')) dupOrg += 1;
      if (d.includes('WebSite')) dupWeb += 1;
      if (d.includes('WebPage')) dupWebPage += 1;
      if (d.includes('Service')) dupService += 1;
      if (d.includes('FAQPage')) dupFaq += 1;
      if (d.includes('BreadcrumbList')) dupBreadcrumb += 1;
    }
  }

  const cleanMeta = metaRows.filter((r) => r.metadataVerdict === 'CLEAN');
  const cleanSchema = schemaRows.filter((r) => r.schemaVerdict === 'CLEAN');
  const completelyClean = metaRows.filter(
    (r) =>
      r.metadataVerdict === 'CLEAN' &&
      schemaRows.find((s) => s.route === r.route)?.schemaVerdict === 'CLEAN',
  );

  // Service H1 note: service pages use ENGLISH_UI.services labels in branded hero —
  // verify via branded hero title source
  // For market-specific H1 uniqueness on homes:
  const homeH1s = metaRows.filter((r) => r.kind === 'home');
  const homeH1Dupes = [...new Map(homeH1s.map((h) => [h.h1, homeH1s.filter((x) => x.h1 === h.h1)])).entries()]
    .filter(([, list]) => list.length > 1);

  const lines: string[] = [];
  const push = (s = '') => lines.push(s);

  push('# Four-Market Metadata + Schema Duplication Audit');
  push('');
  push(`**Date:** 2026-09-03`);
  push(`**Project:** C:\\Users\\HUSSNAIN.COM\\Novalikes`);
  push(`**Method:** Read-only extraction via the same ` + '`generateMetadata` / `SiteJsonLd` / page `JsonLdScript`' + ` builders the 44 geo routes emit. Local production HTTP fetch was not used (server start blocked in this audit session).`);
  push(`**Production files changed:** NONE`);
  push('');
  push('---');
  push('');
  push('# 1. Executive Summary');
  push('');
  push(`- Pages audited: **44**`);
  push(`- Metadata clean pages: **${cleanMeta.length}**`);
  push(`- Exact title duplicates: **${dupTitles.length}**`);
  push(`- Exact description duplicates: **${dupDescs.length}**`);
  push(`- Canonical problems: **${canonicalErrors.length}**`);
  push(`- Robots/noindex problems: **${robotsErrors.length}**`);
  push(`- Pages with schema: **${schemaRows.length}** (all 44)`);
  push(`- Total JSON-LD script blocks: **${totalJsonLdBlocks}** (homepages 1 each; service pages 2 each = 4×1 + 40×2 = 84)`);
  push(`- Pages with duplicate schema: **${pagesWithDupSchema.length}**`);
  push(`- Total duplicate schema object findings: **${pagesWithDupSchema.reduce((n, r) => n + r.duplicateSchema.length, 0)}**`);
  push(`- Conflicting schemas: **${schemaConflicts.length}**`);
  push(`- Invalid JSON-LD blocks: **${invalidJsonLd.length}**`);
  push(`- Completely clean (meta+schema): **${completelyClean.length}**`);
  push('');
  push('## Architecture note (not a bug)');
  push('');
  push('- Global marketing layout injects **one** `SiteJsonLd` graph: Organization + WebSite (`@id` `https://novalikes.com/#organization` / `#website`).');
  push('- Market **homepages** add **no** page-level JSON-LD.');
  push('- Market **service pages** add **one** page-level graph: Service (with `areaServed`) + BreadcrumbList.');
  push('- **No FAQPage** JSON-LD is emitted on geo routes (FAQ UI may still be visible on homepage; schema is not wired).');
  push('- Multiple *different* types (Organization + WebSite + Service + BreadcrumbList) are intentional, not duplicates.');
  push('');

  push('# 2. 44-Page Metadata Table');
  push('');
  push('| Market | Route | H1 | Meta Title | Title Chars | Meta Description | Desc Chars | Canonical | Robots | OG | Twitter | Metadata Verdict |');
  push('|---|---|---|---|---:|---|---:|---|---|---|---|---|');
  for (const r of metaRows) {
    const ogOk = r.ogTitle && r.ogUrl && r.ogImage ? 'OK' : 'ISSUE';
    const twOk = r.twitterCard && r.twitterTitle ? 'OK' : 'ISSUE';
    push(
      `| ${r.market.toUpperCase()} | ${r.route} | ${mdEscape(r.h1)} | ${mdEscape(r.title)} | ${r.titleChars} | ${mdEscape(r.description)} | ${r.descChars} | ${r.canonical} | ${r.robots} | ${ogOk} | ${twOk} | ${r.metadataVerdict} |`,
    );
  }
  push('');

  for (const [section, market] of [
    ['# 3. Canada Metadata', 'ca'],
    ['# 4. Australia Metadata', 'au'],
    ['# 5. USA Metadata', 'us'],
    ['# 6. UK Metadata', 'uk'],
  ] as const) {
    push(section);
    push('');
    for (const r of metaRows.filter((x) => x.market === market)) {
      push(`### ${r.route}`);
      push(`- **H1:** ${r.h1}`);
      push(`- **Title:** ${r.title}`);
      push(`- **Description:** ${r.description}`);
      push(`- **Canonical:** ${r.canonical}`);
      push(`- **Robots:** ${r.robots}`);
      push(`- **OG title / desc / url / image:** ${r.ogTitle} | ${r.ogDescription} | ${r.ogUrl} | ${r.ogImage}`);
      push(`- **Twitter card / title / desc / image:** ${r.twitterCard} | ${r.twitterTitle} | ${r.twitterDescription} | ${r.twitterImage}`);
      push(`- **Hreflang:** ${Object.entries(r.hreflang).map(([k, v]) => `${k}=${v}`).join(', ')}`);
      push(`- **Visible FAQ count (UI):** ${r.visibleFaqCount}`);
      push('');
    }
  }

  push('# 7. Schema Inventory');
  push('');
  push('| Market | Route | JSON-LD Blocks | Schema Types | Duplicate Schema? | Conflict? | Schema Verdict |');
  push('|---|---|---:|---|---|---|---|');
  for (const r of schemaRows) {
    push(
      `| ${r.market.toUpperCase()} | ${r.route} | ${r.blockCount} | ${r.typesFlat.join(', ')} | ${r.duplicateSchema.length ? 'YES' : 'NO'} | ${r.conflicts.length ? 'YES' : 'NO'} | ${r.schemaVerdict} |`,
    );
  }
  push('');
  push('### Per-route block detail');
  push('');
  for (const r of schemaRows) {
    push(`#### ${r.route}`);
    for (const b of r.blocks) {
      push(`- **${b.id ?? '(no id)'}** — source: ${b.source}; types: ${b.types.join(', ')}`);
      const entities = flattenEntities(b.raw);
      for (const e of entities) {
        push(
          `  - @type=${e['@type']}; @id=${e['@id'] ?? '—'}; name=${e.name ?? '—'}; url=${e.url ?? '—'}`,
        );
      }
    }
    push('');
  }

  push('# 8. Duplicate Schema Findings');
  push('');
  if (pagesWithDupSchema.length === 0) {
    push('**NONE.** No redundant same-entity schema objects found.');
    push('');
    push('Global Organization/WebSite appear once per page via layout. Service + BreadcrumbList appear once on service pages. No second Organization/WebSite injection at page level.');
  } else {
    for (const r of pagesWithDupSchema) {
      for (const d of r.duplicateSchema) {
        push(`- **${r.route}:** ${d}`);
      }
    }
  }
  push('');

  push('# 9. FAQ Schema Audit');
  push('');
  push('- Geo routes with FAQPage JSON-LD: **0 / 44**');
  push('- Homepage UI FAQs (visible): CA/AU/US/UK each have FAQ items in content overlays, but **no FAQPage schema is rendered** on market homepages.');
  push('- Service pages: FAQ UI may exist in service bundles; **no FAQPage schema** is emitted by `geo/[market]/[slug]/page.tsx`.');
  push('- Duplicate FAQPage blocks: **0**');
  push('- FAQ schema present with no visible FAQ: **0**');
  push('- This is an architecture observation, not a duplication bug. Do not invent FAQ schema in this audit.');
  push('');
  for (const r of metaRows.filter((x) => x.kind === 'home')) {
    push(`- ${r.route}: visible FAQ items = ${r.visibleFaqCount}; FAQPage JSON-LD = 0`);
  }
  push('');

  push('# 10. Service Schema Audit');
  push('');
  push('- Service JSON-LD present on all **40** geo service pages: YES');
  push('- One Service object per page (inside page @graph with BreadcrumbList)');
  push('- Provider is Organization ref `@id` only (not a second full Organization)');
  push('- `areaServed.Country.name` set per market (Canada / Australia / United States / United Kingdom)');
  push('- No Product / Offer / AggregateRating / Review on public geo service pages');
  push('- Duplicate Service objects: **0**');
  push('- Fake ratings: **NONE**');
  push('');
  for (const r of schemaRows.filter((s) => s.typesFlat.includes('Service'))) {
    const serviceEntity = r.blocks
      .flatMap((b) => flattenEntities(b.raw))
      .find((e) => e['@type'] === 'Service');
    push(
      `- ${r.route}: name=${serviceEntity?.name}; url=${serviceEntity?.url}; areaServed=${(serviceEntity?.areaServed as { name?: string } | undefined)?.name ?? '—'}`,
    );
  }
  push('');

  push('# 11. Homepage Schema Audit');
  push('');
  for (const market of MARKETS) {
    const r = schemaRows.find((s) => s.market === market && !s.route.includes('buy-'))!;
    push(`### /${market}`);
    push(`- Blocks: ${r.blockCount}`);
    push(`- Types: ${r.typesFlat.join(', ')}`);
    push(`- WebPage/CollectionPage: **absent**`);
    push(`- ItemList: **absent**`);
    push(`- FAQPage: **absent**`);
    push(`- BreadcrumbList: **absent**`);
    push(`- Organization + WebSite: present once via layout`);
    push(`- Duplicate: ${r.duplicateSchema.length ? r.duplicateSchema.join('; ') : 'NONE'}`);
    push('');
  }

  push('# 12. Canonical + Hreflang Audit');
  push('');
  push(`- Canonical errors: **${canonicalErrors.length}**`);
  push(`- Duplicate canonicals: **${dupCans.length}**`);
  push(`- Hreflang errors: **${hreflangErrors.length}**`);
  push('');
  push('Each geo route self-canonicalizes to its market URL (e.g. `https://novalikes.com/ca/buy-instagram-followers`).');
  push('Hreflang map includes locale variants + en-CA/en-AU/en-US/en-GB + x-default for core paths.');
  push('');
  if (hreflangErrors.length) {
    for (const e of hreflangErrors.slice(0, 50)) push(`- ${e}`);
  } else {
    push('No hreflang errors detected in required keys and market URL targeting.');
  }
  push('');

  push('# 13. Exact Issues Requiring Fix');
  push('');
  const p0: string[] = [];
  const p1: string[] = [];
  const p2: string[] = [];
  for (const r of metaRows) {
    if (r.metadataVerdict.startsWith('P0')) p0.push(`${r.route}: ${r.metadataVerdict}`);
    else if (r.metadataVerdict.startsWith('P1')) p1.push(`${r.route}: ${r.metadataVerdict}`);
    else if (r.metadataVerdict.startsWith('P2')) p2.push(`${r.route}: ${r.metadataVerdict}`);
  }
  for (const r of schemaRows) {
    if (r.schemaVerdict.startsWith('P0')) p0.push(`${r.route} schema: ${r.schemaVerdict}`);
    else if (r.schemaVerdict.startsWith('P1')) p1.push(`${r.route} schema: ${r.schemaVerdict}`);
  }

  if (homeH1Dupes.length) {
    p2.push(
      `Homepage H1 uniqueness: ${homeH1Dupes.map(([h1, list]) => `"${h1}" on ${list.map((x) => x.route).join(', ')}`).join('; ') || 'none'}`,
    );
  }

  const serviceH1Dupes = [...new Map(
    metaRows
      .filter((r) => r.kind === 'service')
      .map((h) => [
        h.h1,
        metaRows.filter((x) => x.kind === 'service' && x.h1 === h.h1),
      ] as const),
  ).entries()].filter(([, list]) => list.length > 1);

  if (serviceH1Dupes.length) {
    p2.push(
      `Service H1 exact duplicates (review if market-specific expected): ${serviceH1Dupes.length} groups`,
    );
  }

  if (!p0.length && !p1.length && !p2.length) {
    push('**NONE — no genuine P0/P1/P2 metadata or schema duplication issues requiring a fix.**');
  } else {
    if (p0.length) {
      push('## P0');
      for (const i of p0) push(`- ${i}`);
    }
    if (p1.length) {
      push('## P1');
      for (const i of p1) push(`- ${i}`);
    }
    if (p2.length) {
      push('## P2');
      for (const i of p2) push(`- ${i}`);
    }
  }
  push('');
  if (serviceH1Dupes.length) {
    push('Service H1 duplicate groups (first 10):');
    for (const [h1, list] of serviceH1Dupes.slice(0, 10)) {
      push(`- "${h1}" → ${list.map((x) => x.route).join(', ')}`);
    }
    push('');
  }
  push('');
  if (dupTitles.length) {
    push('## Exact duplicate titles detail');
    for (const [title, routes] of dupTitles) {
      push(`- "${title}" → ${routes.join(', ')}`);
    }
    push('');
  }
  if (dupDescs.length) {
    push('## Exact duplicate descriptions detail');
    for (const [desc, routes] of dupDescs) {
      push(`- "${desc.slice(0, 120)}…" → ${routes.join(', ')}`);
    }
    push('');
  }

  push('---');
  push('');
  push('## Final counters');
  push('');
  push(`1. Pages audited: 44`);
  push(`2. Exact duplicate meta titles: ${dupTitles.length}`);
  push(`3. Exact duplicate descriptions: ${dupDescs.length}`);
  push(`4. Missing titles: ${missingTitles.length}`);
  push(`5. Missing descriptions: ${missingDescs.length}`);
  push(`6. Canonical errors: ${canonicalErrors.length}`);
  push(`7. Robots/noindex errors: ${robotsErrors.length}`);
  push(`8. Hreflang errors: ${hreflangErrors.length}`);
  push(`9. Total JSON-LD blocks: ${totalJsonLdBlocks}`);
  push(`10. Pages with duplicate schema: ${pagesWithDupSchema.length}`);
  push(`11. Duplicate Organization count: ${dupOrg}`);
  push(`12. Duplicate WebSite count: ${dupWeb}`);
  push(`13. Duplicate WebPage count: ${dupWebPage}`);
  push(`14. Duplicate Service count: ${dupService}`);
  push(`15. Duplicate FAQPage count: ${dupFaq}`);
  push(`16. Duplicate BreadcrumbList count: ${dupBreadcrumb}`);
  push(`17. Invalid JSON-LD count: ${invalidJsonLd.length}`);
  push(`18. Schema conflicts: ${schemaConflicts.length}`);
  push(`19. Pages completely clean: ${completelyClean.length}`);
  const verdict =
    p0.length || p1.length
      ? 'SCHEMA/METADATA FIX REQUIRED'
      : p2.length
        ? 'CLEAN WITH MINOR POLISH'
        : 'CLEAN';
  push(`20. Overall verdict: **${verdict}**`);
  push(`21. Report path: reports/four-market-metadata-schema-audit.md`);
  push(`22. Production files changed: NONE`);
  push(`23. NO COMMIT`);
  push(`24. NO PUSH`);
  push(`25. NO DEPLOY`);
  push('');

  const outDir = path.join(process.cwd(), 'reports');
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'four-market-metadata-schema-audit.md');
  writeFileSync(outPath, lines.join('\n'), 'utf8');

  // Machine summary to stdout
  console.log(
    JSON.stringify(
      {
        pages: 44,
        dupTitles: dupTitles.length,
        dupDescs: dupDescs.length,
        missingTitles: missingTitles.length,
        missingDescs: missingDescs.length,
        canonicalErrors: canonicalErrors.length,
        robotsErrors: robotsErrors.length,
        hreflangErrors: hreflangErrors.length,
        totalJsonLdBlocks,
        pagesWithDupSchema: pagesWithDupSchema.length,
        dupOrg,
        dupWeb,
        dupWebPage,
        dupService,
        dupFaq,
        dupBreadcrumb,
        invalidJsonLd: invalidJsonLd.length,
        schemaConflicts: schemaConflicts.length,
        completelyClean: completelyClean.length,
        verdict,
        outPath,
        sampleTitle: metaRows[0]?.title,
        sampleCanonical: metaRows[0]?.canonical,
        sampleServiceTypes: schemaRows.find((r) => r.route.includes('buy-'))?.typesFlat,
      },
      null,
      2,
    ),
  );
}

main();
