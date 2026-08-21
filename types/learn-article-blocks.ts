/**
 * Learn article content blocks — Document 15.02.
 * Discriminated unions only. No arbitrary HTML. No `any`.
 */

export type ArticleHeadingLevel = 2 | 3;

export type ArticleImageMeta = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  decorative?: boolean;
  priority?: boolean;
};

export type ArticleTableCell = {
  text: string;
  header?: boolean;
};

export type ArticleTableRow = {
  cells: ArticleTableCell[];
};

export type ArticleFaqItem = {
  id: string;
  question: string;
  answer: string;
  /**
   * When true and the FAQ is visibly rendered, FAQPage schema may include it.
   * Defaults to false — Document 15.07.
   */
  schemaEligible?: boolean;
};

export type ArticleInlineLink = {
  href: string;
  label: string;
  external?: boolean;
};

type BlockBase = {
  id: string;
  order: number;
  styleVariant?: string;
  schemaRelevant?: boolean;
};

export type ParagraphBlock = BlockBase & {
  type: 'paragraph';
  text: string;
  /** Render-time SEO annotations — does not alter `text`. */
  inlineLinks?: ArticleInlineLink[];
};

export type HeadingBlock = BlockBase & {
  type: 'heading';
  text: string;
  headingLevel: ArticleHeadingLevel;
  /** Optional stable anchor; generated when missing. */
  anchorId?: string;
};

export type BulletedListBlock = BlockBase & {
  type: 'bulleted_list';
  items: string[];
  leadIn?: string;
  inlineItemLinks?: Array<{ itemIndex: number; href: string; label: string }>;
};

export type NumberedListBlock = BlockBase & {
  type: 'numbered_list';
  items: string[];
  leadIn?: string;
  inlineItemLinks?: Array<{ itemIndex: number; href: string; label: string }>;
};

export type ImageBlock = BlockBase & {
  type: 'image';
  image: ArticleImageMeta;
};

export type FigureBlock = BlockBase & {
  type: 'figure';
  image: ArticleImageMeta;
};

export type BlockquoteBlock = BlockBase & {
  type: 'blockquote';
  text: string;
  cite?: string;
};

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'important' | 'example';

export type CalloutBlock = BlockBase & {
  type: 'callout';
  variant: CalloutVariant;
  title?: string;
  text: string;
};

export type TipBlock = BlockBase & {
  type: 'tip';
  title?: string;
  text: string;
};

export type WarningBlock = BlockBase & {
  type: 'warning';
  title?: string;
  text: string;
};

export type DefinitionBlock = BlockBase & {
  type: 'definition';
  term: string;
  definition: string;
};

export type ComparisonTableBlock = BlockBase & {
  type: 'comparison_table';
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type DataTableBlock = BlockBase & {
  type: 'data_table';
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type ProcessStep = {
  id: string;
  title: string;
  text: string;
};

export type StepProcessBlock = BlockBase & {
  type: 'step_process';
  title?: string;
  steps: ProcessStep[];
};

export type KeyTakeawayBoxBlock = BlockBase & {
  type: 'key_takeaway_box';
  title?: string;
  items: string[];
};

export type FaqGroupBlock = BlockBase & {
  type: 'faq_group';
  title?: string;
  items: ArticleFaqItem[];
};

export type InternalCtaBlock = BlockBase & {
  type: 'internal_cta';
  href: string;
  label: string;
  heading?: string;
  description?: string;
};

/** Mid-article cluster of related commercial destinations — editorial, not a pricing grid. */
export type ServiceClusterCtaBlock = BlockBase & {
  type: 'service_cluster_cta';
  heading: string;
  text: string;
  serviceSlugs: string[];
};

export type RelatedServiceCardBlock = BlockBase & {
  type: 'related_service_card';
  serviceSlug: string;
  label: string;
  description?: string;
};

export type RelatedArticleCardBlock = BlockBase & {
  type: 'related_article_card';
  articleSlug: string;
  label?: string;
  description?: string;
};

export type DividerBlock = BlockBase & {
  type: 'divider';
};

export type EmbedPlaceholderBlock = BlockBase & {
  type: 'embed_placeholder';
  provider: string;
  label: string;
  /** Never auto-loads third-party scripts. */
  note?: string;
};

export type CodeBlock = BlockBase & {
  type: 'code';
  code: string;
  language?: string;
  caption?: string;
};

export type ArticleContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | BulletedListBlock
  | NumberedListBlock
  | ImageBlock
  | FigureBlock
  | BlockquoteBlock
  | CalloutBlock
  | TipBlock
  | WarningBlock
  | DefinitionBlock
  | ComparisonTableBlock
  | DataTableBlock
  | StepProcessBlock
  | KeyTakeawayBoxBlock
  | FaqGroupBlock
  | InternalCtaBlock
  | ServiceClusterCtaBlock
  | RelatedServiceCardBlock
  | RelatedArticleCardBlock
  | DividerBlock
  | EmbedPlaceholderBlock
  | CodeBlock;

export type ArticleContentBlockType = ArticleContentBlock['type'];
