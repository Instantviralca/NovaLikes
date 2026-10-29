import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import {
  nlBody,
  nlDisplay,
  preloadHomeDisplayFont,
} from '@/components/marketing/home-v5/fonts';
import { LitParagraph } from '@/components/marketing/home-v5/lit-paragraph';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';
import {
  CameraSquare,
  SvcV1Icon,
} from '@/components/marketing/service-v1/icons';
import { V1StepCounter } from '@/components/marketing/service-v1/v1-step-counter';
import { V2PackagePicker } from '@/components/marketing/service-v2/v2-package-picker';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ServiceFaqInteraction } from '@/components/sections/service/service-faq-interaction';
import type { PricingCardModel } from '@/components/commerce/pricing/types';
import type { ServiceV2Content } from '@/data/content/service-v2/types';
import { getBadgeLabel } from '@/data/pricing/badges';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getServiceContentBySlug } from '@/data/content/services';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { loadServiceFaqItems, loadUi } from '@/lib/i18n/content/load';
import { buildBreadcrumb } from '@/lib/linking';
import type { Market } from '@/lib/market/config';
import { loadMarketServiceFaqItemsByPrefix } from '@/lib/market/content/load';
import { resolvePublicHref } from '@/lib/market/paths';
import { applyFromPrice } from '@/lib/marketing/home-v5/from-price';
import {
  getServiceFromPriceLabel,
  resolveHeroSubtitle,
} from '@/lib/marketing/service-hero';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { PackageBadgeId, PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';
import { Music2, ThumbsUp } from 'lucide-react';

import './service-v2.css';

const IMG_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';

const DIAGRAM_ICONS = ['eye', 'user-plus', 'badge-check'] as const;

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Known alts for promise / help images already used elsewhere in the codebase. */
const KNOWN_IMAGE_ALTS: Record<string, string> = {
  '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp':
    'Instagram follower ordering process from package selection to profile details',
  '/assets/images/illustrations/instagram-followers/instagram-followers-delivery-requirements.webp':
    'Instagram follower order requirements — public username only, no password required',
  '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp':
    'Instagram profile metrics showing follower count alongside engagement activity',
  '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp':
    'Instagram likes ordering process using a public post or Reel link',
  '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp':
    'Instagram likes help versus outcomes they do not guarantee',
  '/assets/images/illustrations/instagram-views/instagram-views-order-process.webp':
    'Instagram views ordering process using a public Reel or video link',
  '/assets/images/illustrations/instagram-views/instagram-views-does-help.webp':
    'Instagram views help versus outcomes they do not guarantee',
  '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp':
    'Instagram comments ordering process using a public post or Reel link',
  '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp':
    'Instagram comments help versus outcomes they do not guarantee',
  '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp':
    'TikTok follower ordering process using a public profile',
  '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp':
    'TikTok followers help versus outcomes they do not guarantee',
  '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp':
    'TikTok likes ordering process using a public video link',
  '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp':
    'TikTok likes help versus outcomes they do not guarantee',
  '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp':
    'TikTok views ordering process using a public video link',
  '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp':
    'TikTok views help versus outcomes they do not guarantee',
  '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp':
    'Facebook follower ordering process using a public Page URL',
  '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp':
    'Facebook followers help versus outcomes they do not guarantee',
  '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp':
    'Facebook Page Likes ordering process using a public Page URL',
  '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp':
    'Facebook Page likes help versus outcomes they do not guarantee',
  '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp':
    'Facebook Post Likes ordering process using a public post URL',
  '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp':
    'Facebook post likes help versus outcomes they do not guarantee',
};

type ServiceV2ViewProps = {
  service: Service;
  content: ServiceV2Content;
  breadcrumbs?: BreadcrumbItem[];
  locale?: Locale;
  market?: Market | null;
};

/** Render copy that may contain `[label](/href)` as Next.js `<Link className="ilink">`. */
function InlineRichText({
  text,
  hrefFor,
}: {
  text: string;
  /** Optional rewrite (e.g. market-prefix `/buy-*` links). */
  hrefFor?: (href: string) => string;
}) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK_RE.lastIndex = 0;
  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const rawHref = match[2]!;
    const href = hrefFor ? hrefFor(rawHref) : rawHref;
    nodes.push(
      <Link key={`${href}-${match.index}`} className="ilink" href={href}>
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return <>{nodes}</>;
}

function fillFromPrice(template: string, slug: string, fromPrice: string | null): string {
  if (!template.includes('{fromPrice}')) return template;
  if (!fromPrice) return applyFromPrice(template, slug);
  return template.split('{fromPrice}').join(fromPrice);
}

function badgeLabelFor(badge: PackageBadgeId, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return getBadgeLabel(badge);
  const commerce = loadUi(locale).commerce;
  if (badge === 'most-popular') return commerce.mostPopular;
  if (badge === 'best-value') return commerce.bestValue;
  if (badge === 'recommended') return commerce.recommended;
  return getBadgeLabel(badge);
}

function toCardModels(packages: PricingPackage[], locale: Locale): PricingCardModel[] {
  return packages.map((pkg) => ({
    package: pkg,
    priceDisplay: formatMoney(pkg.price, pkg.currency),
    compareAtDisplay:
      pkg.compareAtPrice != null
        ? formatMoney(pkg.compareAtPrice, pkg.currency)
        : undefined,
    badgeLabel: pkg.badge ? badgeLabelFor(pkg.badge, locale) : undefined,
    primaryCta: {
      label: 'Add to Cart',
      href: `#order-configuration?package=${encodeURIComponent(pkg.id)}`,
    },
  }));
}

function PlatformTile({
  platform,
  className,
}: {
  platform: ServiceV2Content['meta']['platform'];
  className?: string;
}) {
  if (platform === 'TikTok') {
    return (
      <span className={cn('h1-tile t-tt', className)} aria-hidden="true">
        <Music2 className="ic" aria-hidden="true" />
      </span>
    );
  }
  if (platform === 'Facebook') {
    return (
      <span className={cn('h1-tile t-fb', className)} aria-hidden="true">
        <ThumbsUp className="ic" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className={cn('h1-tile', className)} aria-hidden="true">
      <CameraSquare className="ic" />
    </span>
  );
}

function CountTile({ platform }: { platform: ServiceV2Content['meta']['platform'] }) {
  if (platform === 'TikTok') {
    return (
      <span className="cc-tile t-tt">
        <Music2 className="ic" aria-hidden="true" />
      </span>
    );
  }
  if (platform === 'Facebook') {
    return (
      <span className="cc-tile t-fb">
        <ThumbsUp className="ic" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="cc-tile">
      <CameraSquare className="ic" />
    </span>
  );
}

type DiagramLabels = {
  addToCart: string;
  noPasswordNeeded: string;
  noPassword: string;
  card: string;
  weUse: string;
  oneTime: string;
};

function diagramLabelsFromUi(ui: ReturnType<typeof loadUi>): DiagramLabels {
  return {
    addToCart: ui.commerce.addToCart,
    noPasswordNeeded: ui.footer.noPassword,
    noPassword: ui.commerce.noPassword,
    card: ui.footer.payCard,
    weUse: ui.serviceV2Ui.weUse,
    oneTime: ui.serviceV2Ui.oneTime,
  };
}

function StepMiniUi({
  ui,
  contentUi,
  samplePrice,
  labels,
}: {
  ui: string;
  contentUi: ServiceV2Content['ui'];
  samplePrice: string;
  labels: DiagramLabels;
}) {
  if (ui === 'public') {
    return (
      <div className="mu mu-toggle">
        <span>
          <b>{contentUi.toggle.label}</b>
          <em>{contentUi.toggle.sub}</em>
        </span>
        <span className="tg">
          <i />
        </span>
      </div>
    );
  }
  if (ui === 'packages') {
    return (
      <div className="mu-chips">
        {contentUi.chips.map((chip, index) => (
          <span key={chip} className={index === contentUi.chipOn ? 'on' : undefined}>
            {chip}
          </span>
        ))}
      </div>
    );
  }
  if (ui === 'cart') {
    return (
      <span className="mu-btn">
        <SvcV1Icon name="shopping-cart" />
        {labels.addToCart}
      </span>
    );
  }
  if (ui === 'username') {
    return (
      <div className="mu-user">
        <div className="mu-input">
          {contentUi.input.prefix ? (
            <span className="at">{contentUi.input.prefix}</span>
          ) : null}
          <span className="typed">{contentUi.input.placeholder}</span>
          <i className="caret" />
        </div>
        <span className="mu-ok">
          <SvcV1Icon name="check" strokeWidth={3} /> {labels.noPasswordNeeded}
        </span>
      </div>
    );
  }
  if (ui === 'pay') {
    return (
      <div className="mu-pay">
        <span className="mu-card">
          <SvcV1Icon name="lock" />
          {labels.card}
        </span>
        <span className="mu-usd">Apple Pay</span>
        <span className="mu-usd">Google Pay</span>
        <span className="mu-total">
          {labels.oneTime} · <b>{samplePrice}</b>
        </span>
      </div>
    );
  }
  if (ui === 'nopass') {
    const lead = contentUi.safeChips[0] ?? 'Username only';
    return (
      <div className="mu-np">
        <span className="np-ic">
          <SvcV1Icon name="eye-off" />
        </span>
        <b>{lead}. {labels.noPassword}</b>
      </div>
    );
  }
  if (ui === 'privacy') {
    return (
      <div className="mu-priv">
        <span className="mu-k">{labels.weUse}</span>
        {contentUi.privacyTags.map((tag) => (
          <span key={tag} className="mu-tag">
            <SvcV1Icon name="check" strokeWidth={3} />
            {tag}
          </span>
        ))}
      </div>
    );
  }
  return null;
}

function imageAlt(
  src: string,
  explicit?: string,
  fallback = '',
): string {
  if (explicit) return explicit;
  return KNOWN_IMAGE_ALTS[src] ?? fallback;
}

function costRowLabel(pkg: PricingPackage, unit: string): string {
  const qty = pkg.quantity.toLocaleString('en-US');
  const tier = pkg.commentType ? `${pkg.commentType} ` : '';
  return `${qty} ${tier}${unit}`;
}

function perUnitMinor(pkg: PricingPackage, perUnit: number): number {
  const major = Number(((pkg.price / 100) * (perUnit / pkg.quantity)).toFixed(2));
  return Math.round(major * 100);
}

/**
 * Shared Buzzoid service page for English defaults, market v2 pages, and /de.
 * Other locales keep their authority views.
 */
export function ServiceV2View({
  service,
  content: copy,
  breadcrumbs: breadcrumbOverride,
  locale = DEFAULT_LOCALE,
  market = null,
}: ServiceV2ViewProps) {
  preloadHomeDisplayFont();
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  const serviceHref = (slug: string) =>
    resolvePublicHref(`/${slug}`, { locale, market });

  /**
   * Market pages: prefix bare `/buy-*` only.
   * Locale pages: localize every internal path (services, refund, privacy).
   */
  const inlineHrefFor = (href: string) => {
    if (!href.startsWith('/')) return href;
    if (market && /^\/buy-[a-z0-9-]+\/?$/i.test(href)) {
      return resolvePublicHref(href, { locale, market });
    }
    if (!market && locale !== DEFAULT_LOCALE) {
      return resolvePublicHref(href, { locale, market: null });
    }
    return href;
  };

  const serviceContent = getServiceContentBySlug(service.slug);
  const faqIds = serviceContent?.faq.faqIds ?? [];
  const marketFaq = copy.faq.market;
  const faqLocale = copy.faq.locale?.code ?? locale;
  const faqItems =
    market && marketFaq
      ? loadMarketServiceFaqItemsByPrefix(marketFaq.code, marketFaq.idPrefix)
      : loadServiceFaqItems(faqLocale, faqIds);

  const breadcrumbs =
    breadcrumbOverride ??
    buildBreadcrumb(service.slug).map((item) => ({
      ...item,
      href:
        typeof item.href === 'string' && item.href.startsWith('/')
          ? inlineHrefFor(item.href)
          : item.href,
    }));
  const fromPrice = getServiceFromPriceLabel(service.slug);
  const subtitle =
    resolveHeroSubtitle(copy.hero.subtitle, service.slug) ??
    (fromPrice ? fillFromPrice(copy.hero.subtitle, service.slug, fromPrice) : copy.hero.subtitle);

  const packages = getActivePackagesByServiceSlug(service.slug);
  const chromeUi = loadUi(locale);
  const cardModels = toCardModels(packages, locale);
  const diagrams = diagramLabelsFromUi(chromeUi);

  const costRows = packages.map((pkg) => ({
    pkg,
    per: perUnitMinor(pkg, copy.meta.perUnit),
  }));
  const bestPerIndex = costRows.reduce(
    (best, row, index, rows) => (row.per < rows[best]!.per ? index : best),
    0,
  );

  const samplePrice =
    fromPrice ??
    (packages[0] ? formatMoney(packages[0].price, packages[0].currency) : '$0');

  const faqEntries = [
    ...faqItems.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    })),
    ...copy.faq.extra.map((item) => ({
      id: item.id,
      question: item.question,
      answer: fillFromPrice(item.answer, service.slug, fromPrice),
    })),
  ];
  const firstFaqId = faqEntries[0]?.id;

  return (
    <div className={cn('svc-v2', fontClassName)}>
      <section className="hero" aria-label={chromeUi.serviceV2Ui.pageHero}>
        <div className="wrap">
          <Breadcrumb
            items={breadcrumbs}
            className="crumbs"
            showHomeIcon={false}
            withSchema={false}
          />
          <h1 className="h1">
            {copy.hero.title.lead ? <>{copy.hero.title.lead}{' '}</> : null}
            <PlatformTile platform={copy.meta.platform} />
            <span className="hl">{copy.hero.title.highlight}</span>{' '}
            {copy.hero.title.tail ? (
              <span className="h1-tail">{copy.hero.title.tail}</span>
            ) : null}
          </h1>
          {subtitle ? <p className="lead">{subtitle}</p> : null}
          <ul className="trust">
            {copy.hero.trust.map((item) => (
              <li key={item}>
                <SvcV1Icon name="check" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <V2PackagePicker
            service={service}
            packages={cardModels}
            copy={copy.picker}
            stickyLabel={copy.sticky.label}
            serviceDisplayName={
              locale === 'de' ||
              locale === 'es' ||
              locale === 'fr' ||
              locale === 'it' ||
              locale === 'pt-br'
                ? copy.meta.name
                : undefined
            }
          />
        </div>
      </section>

      <section id={copy.why.id} className="sec grey why">
        <div className="wrap why-grid">
          <div className="why-head">
            <SplitTitle title={copy.why.title} className="h2 big rv-up" pen />
          </div>
          <div className="why-cards">
            {copy.why.items.map((item) => (
              <div key={item.title} className="wcard rv-up">
                <span className={`wc-ic tone-${item.tone}`}>
                  <SvcV1Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
            <div className="wcard promo rv-up">
              <p className="promo-k">{copy.why.promo.eyebrow}</p>
              <h3>{copy.why.promo.title}</h3>
              <a className="promo-btn" href={copy.whatsapp.href}>
                <SvcV1Icon name="message-square" />
                {copy.why.promo.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id={copy.steps.id} className="sec steps">
        <div className="wrap steps-grid">
          <div className="steps-head">
            <SplitTitle title={copy.steps.title} className="h2 big" pen />
            <span className="time-pill">
              <SvcV1Icon name="clock" />
              {copy.steps.pill}
            </span>
            <p className="body">{copy.steps.intro}</p>
          </div>
          <ol className="timeline">
            {copy.steps.items.map((step, index) => (
              <li key={step.title} className="tl-step rv-up">
                <span className="tl-n">{index + 1}</span>
                <div className="tl-body">
                  <h3>{step.title}</h3>
                  <div className="tl-ui" aria-hidden="true">
                    <StepMiniUi
                      ui={step.ui}
                      contentUi={copy.ui}
                      labels={diagrams}
                      samplePrice={samplePrice}
                    />
                  </div>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
            <li className="tl-step done rv-up">
              <span className="tl-n ok">
                <SvcV1Icon name="check" strokeWidth={3} />
              </span>
              <div className="tl-body">
                <h3>{copy.steps.done.title}</h3>
                <div className="count-card">
                  <CountTile platform={copy.meta.platform} />
                  <span>
                    <V1StepCounter count={copy.steps.done.count} />
                    <em>{copy.steps.done.unit}</em>
                  </span>
                </div>
                <p>{copy.steps.done.body}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id={copy.compare.id} className="sec grey cmp-sec">
        <div className="wrap cmp-grid">
          <div className="cmp-head">
            <SplitTitle title={copy.compare.title} className="h2 big" pen />
            <p className="body">{copy.compare.intro}</p>
            <p className="fine">{copy.compare.note}</p>
          </div>
          <div className="cmp-cards">
            <div className="cmp-card us rv-up">
              <p className="cmp-t">
                <span className="mark" aria-hidden="true">
                  ♥
                </span>
                {copy.compare.us}
              </p>
              <dl>
                {copy.compare.rows.map((row) => (
                  <div key={`us-${row.label}`}>
                    <dt>{row.label}</dt>
                    <dd>
                      <SvcV1Icon name="check" className="ic ok" strokeWidth={3} />
                      {row.novalikes}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="cmp-card them rv-up">
              <p className="cmp-t">
                <span className="mark ghost" />
                {copy.compare.them}
              </p>
              <dl>
                {copy.compare.rows.map((row, index) => (
                  <div
                    key={`them-${row.label}`}
                    style={{ ['--k']: index } as CSSProperties}
                  >
                    <dt>{row.label}</dt>
                    <dd>
                      <SvcV1Icon name="x" className="ic no" strokeWidth={2.5} />
                      {row.riskySeller}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id={copy.promises.id} className="sec prom">
        <div className="wrap">
          <div className="prom-head">
            <h2 className="h2 big">{copy.promises.title}</h2>
            <div>
              <p className="body">
                <InlineRichText hrefFor={inlineHrefFor} text={copy.promises.intro} />
              </p>
              <Link className="tlink" href={inlineHrefFor(copy.promises.link.href)}>
                {copy.promises.link.label} <SvcV1Icon name="arrow-right" />
              </Link>
            </div>
          </div>
          <div className="prom-cards">
            {copy.promises.cards.map((card) => (
              <article key={card.title} className="pcard rv-up">
                <div className="pc-vis">
                  <span className="pc-chip">{card.chip}</span>
                  <Image
                    src={card.image}
                    alt={imageAlt(card.image, card.alt)}
                    width={1536}
                    height={1024}
                    sizes={IMG_SIZES}
                  />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id={copy.cost.id} className="sec grey cost">
        <div className="wrap cost-grid">
          <div>
            <SplitTitle title={copy.cost.title} className="h2 mid" pen />
            <p className="body ink">
              {fillFromPrice(copy.cost.intro, service.slug, fromPrice)}
            </p>
            <ul className="ticks">
              {copy.cost.points.map((point) => (
                <li key={point}>
                  <SvcV1Icon name="check" strokeWidth={3} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="cost-card rv-up">
            <table className="ctable">
              <thead>
                <tr>
                  {copy.cost.cols.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {costRows.map(({ pkg, per }, index) => {
                  const isBest = index === bestPerIndex;
                  return (
                    <tr key={pkg.id} className={isBest ? 'best' : undefined}>
                      <th scope="row">{costRowLabel(pkg, copy.meta.unit)}</th>
                      <td>{formatMoney(pkg.price, pkg.currency)}</td>
                      <td>
                        {formatMoney(per, pkg.currency)}
                        {isBest ? (
                          <span className="best-tag">{copy.cost.best}</span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="fine">{copy.cost.note}</p>
          </div>
        </div>
      </section>

      <section id={copy.whyBuy.id} className="sec wb">
        <div className="wrap wb-grid">
          <div>
            <SplitTitle title={copy.whyBuy.title} className="h2 mid" pen />
            <p className="body ink">
              <InlineRichText hrefFor={inlineHrefFor} text={copy.whyBuy.intro} />
            </p>
            <ol className="nlist">
              {copy.whyBuy.items.map((item, index) => (
                <li key={item.title} className="rv-up">
                  <span className="nl-n">{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="diagram rv-up" aria-hidden="true">
            <svg className="dg-lines" viewBox="0 0 400 380">
              <path d="M200 70 L330 290 L70 290 Z" />
            </svg>
            {copy.whyBuy.diagram.map((label, index) => (
              <span key={label} className={`dg-node n${index + 1}`}>
                <span className="dg-ic">
                  <SvcV1Icon name={DIAGRAM_ICONS[index] ?? 'check'} />
                </span>
                <b>{label}</b>
              </span>
            ))}
            <span className="dg-center">♥</span>
          </div>
        </div>
      </section>

      <section id={copy.help.id} className="sec help">
        <div className="wrap">
          <SplitTitle title={copy.help.title} className="h2 mid" pen />
          <p className="body ink narrow">{copy.help.intro}</p>
          <div className="help-grid">
            <div className="hcard no rv-up">
              <div className="hc-vis" aria-hidden="true">
                <div className="tags">
                  <i>#</i>
                  <i>#</i>
                  <i>#</i>
                  <i>#</i>
                  <i>#</i>
                </div>
                <svg className="wave" viewBox="0 0 300 80">
                  <path d="M4 70 C 40 70, 50 10, 90 14 S 140 70, 180 60 S 230 8, 296 30" />
                </svg>
              </div>
              <h3>{copy.help.no.title}</h3>
              <ul>
                {copy.help.no.items.map((item) => (
                  <li key={item}>
                    <SvcV1Icon name="x" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hcard yes rv-up">
              <div className="hc-img">
                <Image
                  src={copy.help.yes.image}
                  alt={imageAlt(
                    copy.help.yes.image,
                    undefined,
                    copy.help.yes.altFallback,
                  )}
                  width={1536}
                  height={1024}
                  sizes={IMG_SIZES}
                />
              </div>
              <h3>{copy.help.yes.title}</h3>
              <ul>
                {copy.help.yes.items.map((item) => (
                  <li key={item}>
                    <SvcV1Icon name="check" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={copy.who.id} className="sec who">
        <div className="wrap">
          <SplitTitle title={copy.who.title} className="h2 mid" pen />
          <div className="who-cards">
            {copy.who.cards.map((card) => (
              <article key={card.title} className="wocard rv-up">
                <div className="wo-vis">
                  <Image
                    src={card.image}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes={IMG_SIZES}
                  />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <div className="statement">
            <span className="mark" aria-hidden="true">
              ♥
            </span>
            <LitParagraph text={copy.who.statement} />
          </div>
        </div>
      </section>

      <section id={copy.vs.id} className="sec grey vs">
        <div className="wrap">
          <SplitTitle title={copy.vs.title} className="h2 mid" pen />
          <p className="body ink narrow">
            <InlineRichText hrefFor={inlineHrefFor} text={copy.vs.intro} />
          </p>
          <div className="vs-card rv-up">
            <table className="vtable">
              <thead>
                <tr>
                  {copy.vs.cols.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.vs.rows.map((row) => {
                  const rowFrom = getServiceFromPriceLabel(row.slug) ?? '';
                  const isCurrent = row.current === true;
                  return (
                    <tr key={row.slug} className={isCurrent ? 'cur' : undefined}>
                      <th scope="row">
                        {isCurrent ? (
                          <span className="vs-cur">
                            {row.label}
                            <em>{copy.vs.currentLabel}</em>
                          </span>
                        ) : (
                          <Link href={serviceHref(row.slug)}>{row.label}</Link>
                        )}
                      </th>
                      <td>{row.changes}</td>
                      <td>{row.needs}</td>
                      <td className="vfrom">{rowFrom}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id={copy.safe.id} className="sec before">
        <div className="wrap">
          <div className="bf-top">
            <div>
              <SplitTitle title={copy.safe.title} className="h2 mid" pen />
              <p className="bf-lead">{copy.safe.lead}</p>
              <p className="body">{copy.safe.body}</p>
            </div>
            <div className="bf-vis rv-up" aria-hidden="true">
              <span className="bf-blob" />
              <span className="bf-blob b2" />
              <span className="bf-shield">
                <SvcV1Icon name="shield" strokeWidth={1.6} />
              </span>
              {copy.ui.safeChips.map((chip, index) => (
                <span
                  key={chip}
                  className={index === 0 ? 'bf-chip c1' : 'bf-chip c2'}
                >
                  <SvcV1Icon name="check" strokeWidth={3} /> {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="bf-cards">
            {copy.safe.cards.map((card) => (
              <article key={card.title} className="bcard rv-up">
                <div className="bc-ui" aria-hidden="true">
                  <StepMiniUi
                    ui={card.ui}
                    contentUi={copy.ui}
                    labels={diagrams}
                    samplePrice={samplePrice}
                  />
                </div>
                <h3>{card.title}</h3>
                <p>
                  <InlineRichText hrefFor={inlineHrefFor} text={card.body} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id={copy.before.id} className="sec grey checklist-sec">
        <div className="wrap">
          <SplitTitle title={copy.before.title} className="h2 mid" pen />
          <p className="bf-lead">{copy.before.lead}</p>
          <ol className="ck-grid">
            {copy.before.items.map((item) => (
              <li key={item.title} className="ck-item rv-up">
                <span className="ck">
                  <SvcV1Icon name="check" strokeWidth={3} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>
                    <InlineRichText hrefFor={inlineHrefFor} text={item.body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id={copy.faq.id} className="sec faq">
        <div className="wrap faq-grid">
          <div className="faq-head">
            <p className="kicker">{copy.faq.kicker}</p>
            <h2 className="h2 big">{copy.faq.title}</h2>
            <p className="body">{copy.faq.intro}</p>
            <a className="dark-btn" href={copy.whatsapp.href}>
              <SvcV1Icon name="message-square" />
              {copy.faq.cta}
            </a>
          </div>
          <div className="faq-list" data-service-faq="">
            {faqEntries.map((item, index) => (
              <details
                key={item.id}
                data-faq-id={item.id}
                open={index === 0 ? true : undefined}
              >
                <summary>
                  <h3>{item.question}</h3>
                  <span className="sq">
                    <SvcV1Icon name="plus" className="ic pl" strokeWidth={2.5} />
                    <SvcV1Icon name="minus" className="ic mi" strokeWidth={2.5} />
                  </span>
                </summary>
                <p>
                  <InlineRichText hrefFor={inlineHrefFor} text={item.answer} />
                </p>
              </details>
            ))}
          </div>
        </div>
        {firstFaqId ? (
          <ServiceFaqInteraction
            serviceSlug={service.slug}
            pinnedIds={[firstFaqId]}
          />
        ) : null}
      </section>

      <section id={copy.more.id} className="sec grey more">
        <div className="wrap">
          <div className="more-head">
            <h2 className="h2 mid">{copy.more.title}</h2>
            <p className="body">{copy.more.intro}</p>
          </div>
          <div className="more-cards">
            {copy.more.services.map((svc) => {
              const priceLine = applyFromPrice(copy.more.cardPrice, svc.slug);
              return (
                <Link key={svc.slug} className="mcard rv-up" href={serviceHref(svc.slug)}>
                  <div className="mc-vis">
                    <Image
                      src={svc.image}
                      alt=""
                      width={1536}
                      height={1024}
                      sizes={IMG_SIZES}
                    />
                  </div>
                  <div className="mc-row">
                    <span>
                      <b>{svc.title}</b>
                      <em>{svc.line}</em>
                      {priceLine ? <span className="mc-p">{priceLine}</span> : null}
                    </span>
                    <span className="sq big">
                      <SvcV1Icon name="arrow-right" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          {copy.more.guides.length > 0 ? (
            <nav className="guides" aria-label="Guides">
              <span className="g-k">
                <SvcV1Icon name="book-open" />
                {copy.more.guidesTitle}
              </span>
              {copy.more.guides.map((guide) => (
                <Link key={guide.href} href={inlineHrefFor(guide.href)}>
                  {guide.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </section>
    </div>
  );
}
