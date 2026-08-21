/**
 * Collect plain text from Learn articles for QA scanning — Document 15.09.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import type { LearnArticleRecordMutable } from '@/types/learn-editorial';

export type QAArticleSource = LearnArticleRecord | LearnArticleRecordMutable;

function blockText(block: ArticleContentBlock): string {
  switch (block.type) {
    case 'paragraph':
    case 'blockquote':
    case 'heading':
      return block.text;
    case 'tip':
    case 'warning':
    case 'callout':
      return `${block.title ?? ''} ${block.text}`;
    case 'bulleted_list':
    case 'numbered_list':
      return `${block.leadIn ?? ''} ${block.items.join(' ')}`;
    case 'definition':
      return `${block.term} ${block.definition}`;
    case 'key_takeaway_box':
      return `${block.title ?? ''} ${block.items.join(' ')}`;
    case 'step_process':
      return `${block.title ?? ''} ${block.steps.map((s) => `${s.title} ${s.text}`).join(' ')}`;
    case 'faq_group':
      return block.items.map((f) => `${f.question} ${f.answer}`).join(' ');
    case 'internal_cta':
      return `${block.heading ?? ''} ${block.label} ${block.description ?? ''}`;
    case 'service_cluster_cta':
      return `${block.heading} ${block.text}`;
    case 'related_service_card':
    case 'related_article_card':
      return `${block.label ?? ''} ${block.description ?? ''}`;
    case 'figure':
    case 'image':
      return block.image.alt;
    case 'comparison_table':
    case 'data_table':
      return [
        block.caption ?? '',
        ...block.headers,
        ...block.rows.flatMap((row) => row),
      ].join(' ');
    case 'code':
      return `${block.caption ?? ''} ${block.code}`;
    case 'embed_placeholder':
      return `${block.label} ${block.note ?? ''}`;
    default:
      return '';
  }
}

export function collectArticlePlainText(article: QAArticleSource): string {
  const parts = [
    article.title,
    article.excerpt,
    article.content,
    article.seo.title,
    article.seo.description,
    ...(article.keyTakeaways ?? []),
    ...(article.faqs ?? []).flatMap((f) => [f.question, f.answer]),
    ...article.blocks.map(blockText),
  ];
  return parts.filter(Boolean).join('\n');
}
