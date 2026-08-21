import { describe, expect, it } from 'vitest';

import { blocksToPlainText, tiptapJsonToBlocks } from '@/lib/cms/tiptap-to-blocks';

const doc = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Intro' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'Hello world.' }] },
    {
      type: 'bulletList',
      content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'One' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Two' }] }] },
      ],
    },
    { type: 'image', attrs: { src: '/api/cms/media/file/media_1', alt: 'Chart' } },
  ],
};

describe('tiptap to Learn blocks', () => {
  it('converts headings, paragraphs, lists, and images', () => {
    const blocks = tiptapJsonToBlocks(doc);
    expect(blocks.map((block) => block.type)).toEqual([
      'heading',
      'paragraph',
      'bulleted_list',
      'image',
    ]);
    expect(blocksToPlainText(blocks)).toContain('Hello world.');
  });

  it('converts blockquotes, dividers, and nested paragraph images', () => {
    const blocks = tiptapJsonToBlocks({
      type: 'doc',
      content: [
        { type: 'blockquote', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Quoted' }] }] },
        { type: 'horizontalRule' },
        {
          type: 'paragraph',
          content: [{ type: 'image', attrs: { src: '/api/cms/media/file/media_2', alt: 'Nested' } }],
        },
      ],
    });
    expect(blocks.map((block) => block.type)).toEqual(['blockquote', 'divider', 'image']);
  });

  it('keeps http links and drops javascript hrefs', () => {
    const blocks = tiptapJsonToBlocks({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Safe', marks: [{ type: 'link', attrs: { href: 'https://novalikes.com/learn' } }] },
            { type: 'text', text: 'Bad', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] },
          ],
        },
      ],
    });
    expect(blocks[0]).toMatchObject({
      type: 'paragraph',
      text: 'SafeBad',
      inlineLinks: [{ label: 'Safe', href: 'https://novalikes.com/learn' }],
    });
  });
});
