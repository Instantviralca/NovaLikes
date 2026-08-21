import type { ArticleContentBlock, ArticleHeadingLevel } from '@/types/learn-article-blocks';

type TipTapMark = { type: string; attrs?: Record<string, unknown> };
type TipTapNode = {
  type?: string;
  text?: string;
  marks?: TipTapMark[];
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
};

function textOf(node: TipTapNode | undefined): string {
  if (!node) return '';
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'hardBreak') return '\n';
  return (node.content ?? []).map(textOf).join('');
}

function safeHref(href: string): string | null {
  const trimmed = href.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString();
  } catch {
    return null;
  }
  return null;
}

function inlineLinksOf(node: TipTapNode): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  function walk(item: TipTapNode) {
    if (item.type === 'text' && item.text) {
      const href = item.marks?.find((mark) => mark.type === 'link')?.attrs?.href;
      if (typeof href === 'string') {
        const safe = safeHref(href);
        if (safe) links.push({ label: item.text, href: safe });
      }
    }
    for (const child of item.content ?? []) walk(child);
  }
  walk(node);
  return links;
}

function headingLevel(level: unknown): ArticleHeadingLevel {
  return level === 3 ? 3 : 2;
}

export function tiptapJsonToBlocks(doc: unknown): ArticleContentBlock[] {
  if (!doc || typeof doc !== 'object') return [];
  const root = doc as TipTapNode;
  const nodes = root.type === 'doc' ? (root.content ?? []) : [root];
  const blocks: ArticleContentBlock[] = [];
  let order = 0;

  for (const node of nodes) {
    const type = node.type ?? '';
    if (type === 'paragraph') {
      for (const child of node.content ?? []) {
        if (child.type === 'image') {
          const src = typeof child.attrs?.src === 'string' ? child.attrs.src : '';
          const alt = typeof child.attrs?.alt === 'string' ? child.attrs.alt : '';
          if (src && !src.startsWith('javascript:') && !src.startsWith('data:')) {
            order += 1;
            blocks.push({
              id: `img-${order}`,
              order,
              type: 'image',
              image: { src, alt: alt || 'Article image', width: 1200, height: 800 },
            });
          }
        }
      }
      const text = textOf(node).trim();
      if (!text) continue;
      order += 1;
      const links = inlineLinksOf(node);
      blocks.push({
        id: `p-${order}`,
        order,
        type: 'paragraph',
        text,
        inlineLinks: links.length ? links : undefined,
      });
      continue;
    }
    if (type === 'heading') {
      const text = textOf(node).trim();
      if (!text) continue;
      order += 1;
      blocks.push({
        id: `h-${order}`,
        order,
        type: 'heading',
        text,
        headingLevel: headingLevel(node.attrs?.level),
      });
      continue;
    }
    if (type === 'bulletList' || type === 'orderedList') {
      const items = (node.content ?? [])
        .map((item) => textOf(item).trim())
        .filter(Boolean);
      if (items.length === 0) continue;
      order += 1;
      blocks.push({
        id: `l-${order}`,
        order,
        type: type === 'orderedList' ? 'numbered_list' : 'bulleted_list',
        items,
      });
      continue;
    }
    if (type === 'blockquote') {
      const text = textOf(node).trim();
      if (!text) continue;
      order += 1;
      blocks.push({ id: `q-${order}`, order, type: 'blockquote', text });
      continue;
    }
    if (type === 'image') {
      const src = typeof node.attrs?.src === 'string' ? node.attrs.src : '';
      const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : '';
      if (!src || src.startsWith('javascript:') || src.startsWith('data:')) continue;
      order += 1;
      blocks.push({
        id: `img-${order}`,
        order,
        type: 'image',
        image: { src, alt: alt || 'Article image', width: 1200, height: 800 },
      });
      continue;
    }
    if (type === 'horizontalRule') {
      order += 1;
      blocks.push({ id: `hr-${order}`, order, type: 'divider' });
    }
  }

  return blocks;
}

export function blocksToPlainText(blocks: ArticleContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'paragraph' || block.type === 'heading' || block.type === 'blockquote') {
        return block.text;
      }
      if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
        return block.items.join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}
