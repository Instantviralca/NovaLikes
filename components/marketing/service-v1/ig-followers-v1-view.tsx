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
import { V1PackagePicker } from '@/components/marketing/service-v1/v1-package-picker';
import { V1StepCounter } from '@/components/marketing/service-v1/v1-step-counter';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ServiceFaqInteraction } from '@/components/sections/service/service-faq-interaction';
import { IG_FOLLOWERS_V2 } from '@/data/content/service-v1/instagram-followers-v2';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { loadServiceFaqItems, type LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import { buildBreadcrumb } from '@/lib/linking';
import { applyFromPrice } from '@/lib/marketing/home-v5/from-price';
import { vsMobileRowLabels } from '@/lib/marketing/service-v2/vs-mobile-labels';
import {
  formatQuantityShort,
  getServiceFromPriceLabel,
  resolveHeroSubtitle,
} from '@/lib/marketing/service-hero';
import type { Market } from '@/lib/market/config';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import type { Service } from '@/types/service';

import './service-v1.css';

const IMG_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';

const PROMISE_CARD_1_ALT =
  'Instagram follower ordering process from package selection to profile details';
const DOES_HELP_ALT =
  'Instagram profile metrics showing follower count alongside engagement activity';

const DIAGRAM_ICONS = ['eye', 'user-plus', 'badge-check'] as const;

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

type IgFollowersV1ViewProps = {
  service: Service;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
  locale?: Locale;
  /** Unused for this English-default gate; kept for prop parity with authority view. */
  market?: Market;
};

/** Render copy that may contain `[label](/href)` as Next.js `<Link className="ilink">`. */
function InlineRichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK_RE.lastIndex = 0;
  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(
      <Link key={`${match[2]}-${match.index}`} className="ilink" href={match[2]!}>
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

function StepMiniUi({ ui }: { ui: string }) {
  if (ui === 'public') {
    return (
      <div className="mu mu-toggle">
        <span>
          <b>Private account</b>
          <em>Off, so we can reach you</em>
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
        <span>1K</span>
        <span className="on">2K</span>
        <span>5K</span>
        <span>10K</span>
      </div>
    );
  }
  if (ui === 'cart') {
    return (
      <span className="mu-btn">
        <SvcV1Icon name="shopping-cart" />
        Add to Cart
      </span>
    );
  }
  if (ui === 'username') {
    return (
      <div className="mu-user">
        <div className="mu-input">
          <span className="at">@</span>
          <span className="typed">yourusername</span>
          <i className="caret" />
        </div>
        <span className="mu-ok">
          <SvcV1Icon name="check" strokeWidth={3} /> No password needed
        </span>
      </div>
    );
  }
  if (ui === 'pay') {
    return (
      <div className="mu-pay">
        <span className="mu-card">
          <SvcV1Icon name="lock" />
          Card
        </span>
        <span className="mu-usd">Apple Pay</span>
        <span className="mu-usd">Google Pay</span>
        <span className="mu-total">
          One-time · <b>$25.99</b>
        </span>
      </div>
    );
  }
  if (ui === 'nopass') {
    return (
      <div className="mu-np">
        <span className="np-ic">
          <SvcV1Icon name="eye-off" />
        </span>
        <b>Username only. No password.</b>
      </div>
    );
  }
  if (ui === 'privacy') {
    return (
      <div className="mu-priv">
        <span className="mu-k">We use</span>
        <span className="mu-tag">
          <SvcV1Icon name="check" strokeWidth={3} />
          @username
        </span>
        <span className="mu-tag">
          <SvcV1Icon name="check" strokeWidth={3} />
          email
        </span>
      </div>
    );
  }
  return null;
}

/**
 * English-default `/buy-instagram-followers` only — Buzzoid-style service page v2.1.
 * Locale and market pages keep InstagramFollowersAuthorityView.
 */
export function IgFollowersV1View({
  service,
  bundle,
  breadcrumbs: breadcrumbOverride,
  locale = DEFAULT_LOCALE,
}: IgFollowersV1ViewProps) {
  preloadHomeDisplayFont();
  const fontClassName = `${nlDisplay.variable} ${nlBody.variable}`;

  const content = bundle?.content ?? getServiceContentBySlug(service.slug);
  if (!content) return null;

  const faqItems = loadServiceFaqItems(locale, content.faq.faqIds);
  const vm = mapServiceContent(content, faqItems);
  const copy = IG_FOLLOWERS_V2;
  const breadcrumbs = breadcrumbOverride ?? buildBreadcrumb(service.slug);
  const fromPrice = getServiceFromPriceLabel(service.slug);
  const subtitle =
    resolveHeroSubtitle(copy.hero.subtitle, service.slug) ??
    (fromPrice ? fillFromPrice(copy.hero.subtitle, service.slug, fromPrice) : copy.hero.subtitle);

  const packages = getActivePackagesByServiceSlug(service.slug);
  /** Per-1k minor units via major toFixed(2), matching the prototype table. */
  const perThousandRows = packages.map((pkg) => {
    const per1kMajor = Number(((pkg.price * 10) / pkg.quantity).toFixed(2));
    const per1k = Math.round(per1kMajor * 100);
    return { pkg, per1k };
  });
  const bestPer1kIndex = perThousandRows.reduce(
    (best, row, index, rows) => (row.per1k < rows[best]!.per1k ? index : best),
    0,
  );

  const faqEntries = [
    ...vm.faq.items.map((item) => ({
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
      <section className="hero" aria-label="Page hero">
        <div className="wrap">
          <Breadcrumb
            items={breadcrumbs}
            className="crumbs"
            showHomeIcon={false}
            withSchema={false}
          />
          <h1 className="h1">
            {copy.hero.title.lead}{' '}
            <span className="h1-tile" aria-hidden="true">
              <CameraSquare className="ic" />
            </span>
            <span className="hl">{copy.hero.title.highlight}</span>{' '}
            <span className="h1-tail">{copy.hero.title.tail}</span>
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

          <V1PackagePicker
            service={service}
            packages={vm.pricing.packages}
            copy={copy.picker}
            stickyLabel={copy.sticky.label}
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
                    <StepMiniUi ui={step.ui} />
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
                  <span className="cc-tile">
                    <CameraSquare className="ic" />
                  </span>
                  <span>
                    <V1StepCounter />
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
                <InlineRichText text={copy.promises.intro} />
              </p>
              <Link className="tlink" href={copy.promises.link.href}>
                {copy.promises.link.label} <SvcV1Icon name="arrow-right" />
              </Link>
            </div>
          </div>
          <div className="prom-cards">
            {copy.promises.cards.map((card, index) => (
              <article key={card.title} className="pcard rv-up">
                <div className="pc-vis">
                  <span className="pc-chip">{card.chip}</span>
                  <Image
                    src={card.image}
                    alt={
                      'alt' in card && card.alt
                        ? card.alt
                        : index === 0
                          ? PROMISE_CARD_1_ALT
                          : ''
                    }
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
                {perThousandRows.map(({ pkg, per1k }, index) => {
                  const isBest = index === bestPer1kIndex;
                  return (
                    <tr key={pkg.id} className={isBest ? 'best' : undefined}>
                      <th scope="row">
                        {formatQuantityShort(pkg.quantity)} followers
                      </th>
                      <td>{formatMoney(pkg.price, pkg.currency)}</td>
                      <td>
                        {formatMoney(per1k, pkg.currency)}
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
              <InlineRichText text={copy.whyBuy.intro} />
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
                  alt={DOES_HELP_ALT || copy.help.yes.altFallback}
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
            <InlineRichText text={copy.vs.intro} />
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
                  const vsLabels = vsMobileRowLabels(locale, copy.vs.cols);
                  const isCurrent = 'current' in row && row.current === true;
                  return (
                    <tr key={row.slug} className={isCurrent ? 'cur' : undefined}>
                      <th scope="row">
                        {isCurrent ? (
                          <span className="vs-cur">
                            {row.label}
                            <em>{copy.vs.currentLabel}</em>
                          </span>
                        ) : (
                          <Link href={`/${row.slug}`}>{row.label}</Link>
                        )}
                      </th>
                      <td>{row.changes}</td>
                      <td data-label={vsLabels.needsLabel}>{row.needs}</td>
                      <td className="vfrom" data-label={vsLabels.fromLabel}>
                        {rowFrom}
                      </td>
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
              <span className="bf-chip c1">
                <SvcV1Icon name="check" strokeWidth={3} /> Username only
              </span>
              <span className="bf-chip c2">
                <SvcV1Icon name="check" strokeWidth={3} /> Secure checkout
              </span>
            </div>
          </div>
          <div className="bf-cards">
            {copy.safe.cards.map((card) => (
              <article key={card.title} className="bcard rv-up">
                <div className="bc-ui" aria-hidden="true">
                  <StepMiniUi ui={card.ui} />
                </div>
                <h3>{card.title}</h3>
                <p>
                  <InlineRichText text={card.body} />
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
                    <InlineRichText text={item.body} />
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
                <p>{item.answer}</p>
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
                <Link key={svc.slug} className="mcard rv-up" href={`/${svc.slug}`}>
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
          <nav className="guides" aria-label="Guides">
            <span className="g-k">
              <SvcV1Icon name="book-open" />
              {copy.more.guidesTitle}
            </span>
            {copy.more.guides.map((guide) => (
              <Link key={guide.href} href={guide.href}>
                {guide.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
