import { AlertTriangle, Check, Info, Lightbulb, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import { ArticleServiceCluster } from '@/components/learn/article/ArticleServiceCluster';
import { learnArticlePath } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import type {
  ArticleContentBlock,
  ArticleInlineLink,
  CalloutVariant,
} from '@/types/learn-article-blocks';

type ArticleContentBlockProps = {
  block: ArticleContentBlock;
};

function renderTextWithInlineLinks(
  text: string,
  links: ArticleInlineLink[] | undefined,
): ReactNode {
  if (!links || links.length === 0) return text;

  const matches = links
    .map((link) => {
      const index = text.toLowerCase().indexOf(link.label.toLowerCase());
      if (index < 0) return null;
      return {
        href: link.href,
        start: index,
        end: index + link.label.length,
        label: text.slice(index, index + link.label.length),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.start - b.start);

  if (matches.length === 0) return text;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start < cursor) return;
    if (match.start > cursor) {
      nodes.push(text.slice(cursor, match.start));
    }
    // Link styling comes from `.prose a` (site-v2).
    nodes.push(
      <Link key={`inl-${index}-${match.href}`} href={match.href}>
        {match.label}
      </Link>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

const CALLOUT_ICONS: Record<CalloutVariant, LucideIcon> = {
  info: Info,
  tip: Lightbulb,
  important: AlertTriangle,
  warning: AlertTriangle,
  example: Info,
};

const CALLOUT_LABELS: Record<CalloutVariant, string> = {
  info: 'Info',
  tip: 'Key takeaway',
  important: 'Important note',
  warning: 'Important note',
  example: 'Comparison',
};

/** site-v2 `.callout` (callout / tip / warning blocks). */
function Callout({
  variant,
  label,
  title,
  text,
}: {
  variant: CalloutVariant;
  label: string;
  title?: string;
  text: string;
}) {
  const Icon = CALLOUT_ICONS[variant];
  return (
    <div className="callout" role="note">
      <Icon className="ic" aria-hidden="true" style={{ marginTop: 3 }} />
      <div>
        <b>{label}</b>
        {title ? <b>{title}</b> : null}
        <p>{text}</p>
      </div>
    </div>
  );
}

const CHECK_ICON_STYLE: CSSProperties = {
  width: 20,
  height: 20,
  padding: 3,
  borderRadius: '50%',
  background: 'var(--green-1)',
  color: 'var(--green)',
  marginTop: 4,
};

function ResponsiveTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="w-full overflow-x-auto" data-article-table>
      <table style={{ minWidth: 480 }}>
        {caption ? (
          <caption
            style={{
              textAlign: 'left',
              marginBottom: 12,
              fontSize: 14,
              color: 'var(--muted)',
            }}
          >
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Single typed content block renderer — Document 15.02.
 * Site-v2: every block emits plain elements / classes styled by `.prose` (site-v2.css + learn-v2.css).
 * Never injects raw HTML.
 */
export function ArticleContentBlockView({ block }: ArticleContentBlockProps) {
  switch (block.type) {
    case 'paragraph':
      return <p>{renderTextWithInlineLinks(block.text, block.inlineLinks)}</p>;
    case 'heading': {
      const Tag = block.headingLevel === 2 ? 'h2' : 'h3';
      return <Tag id={block.anchorId}>{block.text}</Tag>;
    }
    case 'bulleted_list':
      return (
        <>
          {block.leadIn ? <p>{block.leadIn}</p> : null}
          <ul
            style={
              block.styleVariant === 'checklist'
                ? { listStyle: 'none', paddingLeft: 0, display: 'grid', gap: 10 }
                : undefined
            }
          >
            {block.items.map((item, itemIndex) => {
              const itemLink = block.inlineItemLinks?.find(
                (link) => link.itemIndex === itemIndex,
              );
              const content = renderTextWithInlineLinks(
                item,
                itemLink
                  ? [{ href: itemLink.href, label: itemLink.label }]
                  : undefined,
              );
              return (
                <li
                  key={`${itemIndex}-${item.slice(0, 24)}`}
                  style={
                    block.styleVariant === 'checklist'
                      ? { display: 'flex', gap: 10, marginTop: 0 }
                      : undefined
                  }
                >
                  {block.styleVariant === 'checklist' ? (
                    <Check
                      className="ic"
                      strokeWidth={3}
                      style={CHECK_ICON_STYLE}
                      aria-hidden="true"
                    />
                  ) : null}
                  {block.styleVariant === 'checklist' ? (
                    <span>{content}</span>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </>
      );
    case 'numbered_list':
      return (
        <>
          {block.leadIn ? <p>{block.leadIn}</p> : null}
          <ol>
            {block.items.map((item, itemIndex) => {
              const itemLink = block.inlineItemLinks?.find(
                (link) => link.itemIndex === itemIndex,
              );
              return (
                <li key={`${itemIndex}-${item.slice(0, 24)}`}>
                  {renderTextWithInlineLinks(
                    item,
                    itemLink
                      ? [{ href: itemLink.href, label: itemLink.label }]
                      : undefined,
                  )}
                </li>
              );
            })}
          </ol>
        </>
      );
    case 'image':
    case 'figure': {
      const image = block.image;
      return (
        <figure>
          <Image
            src={image.src}
            alt={image.decorative ? '' : image.alt}
            width={image.width}
            height={image.height}
            loading={image.priority ? undefined : 'lazy'}
            priority={Boolean(image.priority)}
            style={{ width: '100%', height: 'auto' }}
            sizes="(max-width: 1024px) 100vw, 720px"
          />
          {image.caption || image.credit ? (
            <figcaption>
              {image.caption}
              {image.credit ? (
                <span style={{ display: 'block', marginTop: 2, fontSize: 12 }}>
                  Credit: {image.credit}
                </span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case 'blockquote':
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite ? (
            <cite
              style={{
                display: 'block',
                marginTop: 8,
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 600,
                color: 'var(--muted)',
              }}
            >
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case 'callout':
      return (
        <Callout
          variant={block.variant}
          label={CALLOUT_LABELS[block.variant]}
          title={block.title}
          text={block.text}
        />
      );
    case 'tip':
      return (
        <Callout
          variant="tip"
          label="Key takeaway"
          title={block.title}
          text={block.text}
        />
      );
    case 'warning':
      return (
        <Callout
          variant="important"
          label="Important note"
          title={block.title}
          text={block.text}
        />
      );
    case 'definition':
      return (
        <dl>
          <dt>{block.term}</dt>
          <dd>{block.definition}</dd>
        </dl>
      );
    case 'comparison_table':
    case 'data_table':
      return (
        <ResponsiveTable
          caption={block.caption}
          headers={block.headers}
          rows={block.rows}
        />
      );
    case 'step_process':
      return (
        <>
          {block.title ? (
            <p style={{ font: '800 20px var(--nl-display)', color: 'var(--ink)' }}>
              {block.title}
            </p>
          ) : null}
          <ol className="steps">
            {block.steps.map((step, index) => (
              <li key={step.id}>
                <span className="n">{index + 1}</span>
                <div>
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      );
    case 'key_takeaway_box':
      return (
        <aside className="glance">
          <p
            style={{
              margin: '0 0 12px',
              font: '800 20px var(--nl-display)',
              color: 'var(--ink)',
            }}
          >
            {block.title ?? 'Key takeaway'}
          </p>
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <Check className="ic" strokeWidth={3} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case 'faq_group':
      return (
        <>
          {block.title ? <h3>{block.title}</h3> : null}
          {block.items.map((item) => (
            <details key={item.id} className="faq-inline">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </>
      );
    case 'internal_cta':
      return (
        <aside data-article-cta="internal" className="cta-box">
          <p className="kicker">NovaLikes</p>
          {block.heading ? <h3>{block.heading}</h3> : null}
          {block.description ? <p>{block.description}</p> : null}
          <Link href={block.href} className="btn">
            {block.label}
          </Link>
        </aside>
      );
    case 'service_cluster_cta':
      return (
        <ArticleServiceCluster
          heading={block.heading}
          text={block.text}
          serviceSlugs={block.serviceSlugs}
        />
      );
    case 'related_service_card': {
      if (!isApprovedServiceSlug(block.serviceSlug)) return null;
      const service = getServiceBySlug(block.serviceSlug);
      if (!service) return null;
      return (
        <Link href={`/${block.serviceSlug}`} className="link-card">
          <b>{block.label}</b>
          {block.description ? <span>{block.description}</span> : null}
        </Link>
      );
    }
    case 'related_article_card':
      return (
        <Link href={learnArticlePath(block.articleSlug)} className="link-card">
          <b>{block.label ?? block.articleSlug}</b>
          {block.description ? <span>{block.description}</span> : null}
        </Link>
      );
    case 'divider':
      return <hr />;
    case 'embed_placeholder':
      return (
        <div className="embed-note">
          <b style={{ color: 'var(--ink)' }}>{block.label}</b>
          <p style={{ marginTop: 4 }}>
            {block.note ??
              `${block.provider} embeds are disabled until an approved integration is configured.`}
          </p>
        </div>
      );
    case 'code':
      return (
        <figure>
          <pre>
            <code>{block.code}</code>
          </pre>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    default: {
      const _exhaustive: never = block;
      void _exhaustive;
      return null;
    }
  }
}

/** Alias matching Document 15.02 component name. */
export { ArticleContentBlockView as ArticleContentBlock };
