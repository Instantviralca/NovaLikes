'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TipTapEditorProps = {
  value: Record<string, unknown> | null;
  onChange: (json: Record<string, unknown>, html: string) => void;
  onOpenMedia?: (insertImage: (url: string, alt: string) => void) => void;
};

function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function TipTapEditor({ value, onChange, onOpenMedia }: TipTapEditorProps) {
  const [, setTick] = useState(0);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkHref, setLinkHref] = useState('https://');
  const [linkError, setLinkError] = useState<string | null>(null);
  const emittingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: 'Write the article…' }),
    ],
    content: value ?? { type: 'doc', content: [{ type: 'paragraph' }] },
    editorProps: {
      attributes: {
        class:
          'min-h-[32rem] max-w-3xl px-4 py-3 text-[17px] leading-8 text-[#1A1A1A] outline-none prose prose-headings:scroll-mt-24',
      },
    },
    onUpdate: ({ editor: instance }) => {
      emittingRef.current = true;
      onChangeRef.current(instance.getJSON() as Record<string, unknown>, instance.getHTML());
      queueMicrotask(() => {
        emittingRef.current = false;
      });
    },
    onSelectionUpdate: () => setTick((tick) => tick + 1),
    onTransaction: () => setTick((tick) => tick + 1),
  });

  useEffect(() => {
    if (!editor || !value || emittingRef.current) return;
    const current = JSON.stringify(editor.getJSON());
    if (current === JSON.stringify(value)) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div
        data-testid="article-editor-loading"
        className="min-h-[32rem] rounded-2xl border border-[#F0E4D8] bg-white"
      />
    );
  }

  const tools: Array<{
    label: string;
    active?: boolean;
    run: () => void;
  }> = [
    { label: 'Paragraph', active: editor.isActive('paragraph'), run: () => editor.chain().focus().setParagraph().run() },
    { label: 'H2', active: editor.isActive('heading', { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'H3', active: editor.isActive('heading', { level: 3 }), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Bold', active: editor.isActive('bold'), run: () => editor.chain().focus().toggleBold().run() },
    { label: 'Italic', active: editor.isActive('italic'), run: () => editor.chain().focus().toggleItalic().run() },
    { label: 'Underline', active: editor.isActive('underline'), run: () => editor.chain().focus().toggleUnderline().run() },
    { label: 'Strike', active: editor.isActive('strike'), run: () => editor.chain().focus().toggleStrike().run() },
    { label: 'List', active: editor.isActive('bulletList'), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Numbered', active: editor.isActive('orderedList'), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Quote', active: editor.isActive('blockquote'), run: () => editor.chain().focus().toggleBlockquote().run() },
    { label: 'HR', run: () => editor.chain().focus().setHorizontalRule().run() },
    { label: 'Code', active: editor.isActive('code'), run: () => editor.chain().focus().toggleCode().run() },
    {
      label: 'Link',
      active: editor.isActive('link'),
      run: () => {
        setLinkHref(editor.getAttributes('link').href || 'https://');
        setLinkError(null);
        setLinkOpen(true);
      },
    },
    { label: 'Unlink', run: () => editor.chain().focus().unsetLink().run() },
    { label: 'Undo', run: () => editor.chain().focus().undo().run() },
    { label: 'Redo', run: () => editor.chain().focus().redo().run() },
  ];

  return (
    <div data-testid="article-editor" className="overflow-hidden rounded-2xl border border-[#F0E4D8] bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-[#F0E4D8] bg-[#FFF8F3] p-2">
        {tools.map((item) => (
          <Button
            key={item.label}
            type="button"
            size="sm"
            variant={item.active ? 'default' : 'ghost'}
            aria-pressed={item.active || false}
            onClick={item.run}
          >
            {item.label}
          </Button>
        ))}
        {onOpenMedia ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onOpenMedia((url, alt) => {
                editor.chain().focus().setImage({ src: url, alt }).run();
              })
            }
          >
            Image
          </Button>
        ) : null}
      </div>
      {linkOpen ? (
        <div className="flex flex-wrap items-end gap-2 border-b border-[#F0E4D8] bg-white p-3">
          <label className="min-w-[16rem] flex-1 text-xs font-medium text-[#5C564F]">
            Link URL
            <input
              id="tiptap-link-url"
              className="mt-1 min-h-10 w-full rounded-lg border px-3 text-sm"
              value={linkHref}
              onChange={(event) => setLinkHref(event.target.value)}
            />
          </label>
          {linkError ? <p className="text-xs text-destructive">{linkError}</p> : null}
          <Button
            type="button"
            size="sm"
            onClick={() => {
              const trimmed = linkHref.trim();
              if (!trimmed) {
                editor.chain().focus().unsetLink().run();
                setLinkOpen(false);
                return;
              }
              if (trimmed.toLowerCase().startsWith('javascript:') || !isSafeHref(trimmed)) {
                setLinkError('Links must start with https://, http://, or /');
                return;
              }
              editor.chain().focus().extendMarkRange('link').setLink({ href: trimmed }).run();
              setLinkOpen(false);
            }}
          >
            Apply link
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              editor.chain().focus().unsetLink().run();
              setLinkOpen(false);
            }}
          >
            Remove
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setLinkOpen(false)}>
            Cancel
          </Button>
        </div>
      ) : null}
      <EditorContent editor={editor} className={cn('cms-tiptap tiptap')} />
    </div>
  );
}
