import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArticleServiceCluster } from '@/components/learn/article/ArticleServiceCluster';
import { learnArticlePath } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { cn } from '@/lib/utils';
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
    nodes.push(
      <Link
        key={`inl-${index}-${match.href}`}
        href={match.href}
        className="font-medium text-[#E85D04] underline decoration-[#FDBA74] underline-offset-4 transition-colors hover:text-[#C2410C] hover:decoration-[#E85D04]"
      >
        {match.label}
      </Link>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  info: 'border-[#F0E4D8] bg-[#FFF8F3]',
  tip: 'border-[#F0E4D8] bg-[#FFF8F3]',
  important: 'border-[#FDBA74] bg-[#FFF1E6]',
  warning: 'border-[#FDBA74] bg-[#FFF1E6]',
  example: 'border-[#E7E5E4] bg-[#FAFAF9]',
};

const CALLOUT_LABELS: Record<CalloutVariant, string> = {
  info: 'Info',
  tip: 'Key takeaway',
  important: 'Important note',
  warning: 'Important note',
  example: 'Comparison',
};

function CalloutShell({
  label,
  title,
  text,
  className,
}: {
  label: string;
  title?: string;
  text: string;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        'rounded-2xl border px-5 py-4',
        className,
      )}
      role="note"
    >
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#E85D04] uppercase">
        {label}
      </p>
      {title ? (
        <p className="mt-1.5 font-semibold text-[#1C1917]">{title}</p>
      ) : null}
      <p className="mt-2 text-[15px] leading-relaxed text-[#44403C]">{text}</p>
    </aside>
  );
}

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
      <table className="min-w-full border-collapse overflow-hidden rounded-xl text-left text-[15px]">
        {caption ? (
          <caption className="mb-3 text-left text-sm text-[#78716C]">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border border-[#F0E4D8] bg-[#FFF8F3] px-4 py-3 font-semibold text-[#1C1917]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="bg-white">
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="border border-[#F0E4D8] px-4 py-3 align-top text-[#44403C]"
                >
                  {cell}
                </td>
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
 * Never injects raw HTML.
 */
export function ArticleContentBlockView({ block }: ArticleContentBlockProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-[17px] leading-[1.75] text-[#292524] md:text-[18px]">
          {renderTextWithInlineLinks(block.text, block.inlineLinks)}
        </p>
      );
    case 'heading': {
      const Tag = block.headingLevel === 2 ? 'h2' : 'h3';
      return (
        <Tag
          id={block.anchorId}
          className={cn(
            'scroll-mt-24 font-semibold tracking-tight text-[#1C1917]',
            block.headingLevel === 2
              ? 'mt-4 text-[1.45rem] leading-snug md:text-[1.6rem]'
              : 'mt-2 text-[1.15rem] leading-snug md:text-[1.25rem]',
          )}
        >
          {block.text}
        </Tag>
      );
    }
    case 'bulleted_list':
      return (
        <div>
          {block.leadIn ? (
            <p className="mb-2 text-[17px] leading-[1.75] text-[#292524] md:text-[18px]">
              {block.leadIn}
            </p>
          ) : null}
          <ul
            className={
              block.styleVariant === 'checklist'
                ? 'space-y-2.5 text-[17px] leading-[1.7] text-[#292524] md:text-[18px]'
                : 'list-disc space-y-2 pl-5 text-[17px] leading-[1.7] text-[#292524] md:text-[18px]'
            }
          >
            {block.items.map((item, itemIndex) => {
              const itemLink = block.inlineItemLinks?.find(
                (link) => link.itemIndex === itemIndex,
              );
              return (
                <li
                  key={`${itemIndex}-${item.slice(0, 24)}`}
                  className={
                    block.styleVariant === 'checklist'
                      ? 'flex gap-2.5'
                      : undefined
                  }
                >
                  {block.styleVariant === 'checklist' ? (
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[#E85D04]"
                      aria-hidden
                    />
                  ) : null}
                  <span>
                    {renderTextWithInlineLinks(
                      item,
                      itemLink
                        ? [{ href: itemLink.href, label: itemLink.label }]
                        : undefined,
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    case 'numbered_list':
      return (
        <div>
          {block.leadIn ? (
            <p className="mb-2 text-[17px] leading-[1.75] text-[#292524] md:text-[18px]">
              {block.leadIn}
            </p>
          ) : null}
          <ol className="list-decimal space-y-2 pl-5 text-[17px] leading-[1.7] text-[#292524] md:text-[18px]">
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
        </div>
      );
    case 'image':
    case 'figure': {
      const image = block.image;
      return (
        <figure className="overflow-hidden rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3]">
          <Image
            src={image.src}
            alt={image.decorative ? '' : image.alt}
            width={image.width}
            height={image.height}
            loading={image.priority ? undefined : 'lazy'}
            priority={Boolean(image.priority)}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {image.caption || image.credit ? (
            <figcaption className="border-t border-[#F0E4D8] px-4 py-3 text-sm leading-relaxed text-[#78716C]">
              {image.caption}
              {image.credit ? (
                <span className="mt-1 block text-xs">Credit: {image.credit}</span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case 'blockquote':
      return (
        <blockquote className="rounded-r-2xl border-l-4 border-[#E85D04] bg-[#FFF8F3] px-5 py-4 text-[17px] leading-relaxed text-[#44403C] italic md:text-[18px]">
          <p>{block.text}</p>
          {block.cite ? (
            <cite className="mt-2 block text-sm not-italic text-[#78716C]">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case 'callout':
      return (
        <CalloutShell
          label={CALLOUT_LABELS[block.variant]}
          title={block.title}
          text={block.text}
          className={CALLOUT_STYLES[block.variant]}
        />
      );
    case 'tip':
      return (
        <CalloutShell
          label="Key takeaway"
          title={block.title}
          text={block.text}
          className={CALLOUT_STYLES.tip}
        />
      );
    case 'warning':
      return (
        <CalloutShell
          label="Important note"
          title={block.title}
          text={block.text}
          className={CALLOUT_STYLES.important}
        />
      );
    case 'definition':
      return (
        <dl className="border border-neutral-200 p-4">
          <dt className="font-semibold text-neutral-900">{block.term}</dt>
          <dd className="mt-1 text-neutral-700">{block.definition}</dd>
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
        <ol className="space-y-4">
          {block.title ? (
            <li className="list-none text-lg font-semibold text-neutral-900">
              {block.title}
            </li>
          ) : null}
          {block.steps.map((step, index) => (
            <li key={step.id} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-neutral-300 text-xs font-semibold">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-neutral-900">{step.title}</p>
                <p className="mt-1 text-sm text-neutral-700">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'key_takeaway_box':
      return (
        <aside className="rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3] px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#E85D04] uppercase">
            {block.title ?? 'Key takeaway'}
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#44403C]">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      );
    case 'faq_group':
      return (
        <div className="space-y-3">
          {block.title ? (
            <h3 className="text-lg font-semibold text-neutral-900">{block.title}</h3>
          ) : null}
          {block.items.map((item) => (
            <details key={item.id} className="border border-neutral-200 p-3">
              <summary className="cursor-pointer font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-neutral-700">{item.answer}</p>
            </details>
          ))}
        </div>
      );
    case 'internal_cta':
      return (
        <aside
          data-article-cta="internal"
          className="not-prose rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3] px-5 py-6 sm:px-6"
        >
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#E85D04] uppercase">
            NovaLikes
          </p>
          {block.heading ? (
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#1C1917]">
              {block.heading}
            </h3>
          ) : null}
          {block.description ? (
            <p className="mt-2 text-[15px] leading-relaxed text-[#57534E]">
              {block.description}
            </p>
          ) : null}
          <Link
            href={block.href}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#E85D04] px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#D45504] focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2"
          >
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
        <Link
          href={`/${block.serviceSlug}`}
          className="block border border-neutral-200 p-4 outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <p className="font-medium text-neutral-900">{block.label}</p>
          {block.description ? (
            <p className="mt-1 text-sm text-neutral-600">{block.description}</p>
          ) : null}
        </Link>
      );
    }
    case 'related_article_card':
      return (
        <Link
          href={learnArticlePath(block.articleSlug)}
          className="block border border-neutral-200 p-4 outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <p className="font-medium text-neutral-900">
            {block.label ?? block.articleSlug}
          </p>
          {block.description ? (
            <p className="mt-1 text-sm text-neutral-600">{block.description}</p>
          ) : null}
        </Link>
      );
    case 'divider':
      return <hr className="border-neutral-200" />;
    case 'embed_placeholder':
      return (
        <div className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-600">
          <p className="font-medium text-neutral-800">{block.label}</p>
          <p className="mt-1">
            {block.note ??
              `${block.provider} embeds are disabled until an approved integration is configured.`}
          </p>
        </div>
      );
    case 'code':
      return (
        <figure>
          <pre className="overflow-x-auto border border-neutral-200 bg-neutral-950 p-4 text-sm text-neutral-100">
            <code>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-neutral-500">
              {block.caption}
            </figcaption>
          ) : null}
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
