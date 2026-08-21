'use client';

import { Check, Copy } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type ArticleShareProps = {
  url: string;
  title: string;
  enabled?: boolean;
};

const PILL =
  'inline-flex h-8 items-center gap-1.5 rounded-full border border-[#E8DDD3] bg-white px-2.5 text-[11px] font-medium text-neutral-700 outline-none transition-colors hover:border-[#F0C7A8] hover:bg-[#FFF8F3] hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2';

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-neutral-500" aria-hidden>
      {children}
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.55 2 2.08 6.47 2.08 12c0 1.76.46 3.48 1.34 5L2 22l5.16-1.35A9.93 9.93 0 0 0 12.04 22c5.49 0 9.96-4.47 9.96-9.96 0-2.66-1.04-5.16-2.95-7.13ZM12.04 20.15a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.8.82-2.98-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.18-8.29 8.18Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.10-.23-.17-.48-.29Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.24 10.44 22v-7.01H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.92h-2.34V22C18.34 21.24 22 17.1 22 12.07Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.725-8.835L1.254 2.25H8.08l4.26 5.688L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M11.94 2C6.48 2 2.06 6.42 2.06 11.88c0 1.74.45 3.37 1.25 4.8L2 22l5.45-1.43a9.82 9.82 0 0 0 4.5 1.08C17.4 21.65 21.82 17.23 21.82 11.77 21.82 6.42 17.4 2 11.94 2Zm5.73 6.74-1.97 9.28c-.15.66-.54.82-1.1.51l-3.04-2.24-1.47 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.33-.38-.12l-6.93 4.36-2.99-.93c-.65-.2-.66-.65.14-.96l11.68-4.5c.54-.2 1.02.13.84 1.04Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M12.04 2C6.55 2 2.1 6.37 2.1 11.76c0 4.1 2.56 7.62 6.2 8.87-.08-.75-.16-1.91.03-2.73.18-.75 1.16-4.94 1.16-4.94s-.3-.6-.3-1.47c0-1.38.8-2.41 1.8-2.41.85 0 1.26.64 1.26 1.4 0 .85-.54 2.13-.82 3.31-.23.99.5 1.8 1.47 1.8 1.77 0 3.13-1.86 3.13-4.56 0-2.38-1.71-4.05-4.16-4.05-2.83 0-4.5 2.12-4.5 4.32 0 .85.33 1.77.74 2.27a.3.3 0 0 1 .07.28l-.28 1.12c-.04.18-.14.22-.33.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.14 2.28-6.03 6.58-6.03 3.46 0 6.14 2.46 6.14 5.76 0 3.44-2.17 6.2-5.18 6.2-1.01 0-1.96-.53-2.29-1.14l-.62 2.37c-.23.86-.84 1.94-1.25 2.6.94.29 1.94.45 2.98.45 5.49 0 9.94-4.37 9.94-9.76C21.98 6.37 17.53 2 12.04 2Z" />
    </svg>
  );
}

type ShareLink = {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
};

/**
 * Lightweight share actions — Document 15.02.
 * No social SDKs. Uses the canonical URL only.
 */
export function ArticleShare({ url, title, enabled = true }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  if (!enabled) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  const links: ShareLink[] = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedText}`,
      icon: <WhatsAppIcon />,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
    {
      key: 'x',
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon />,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <TelegramIcon />,
    },
    {
      key: 'pinterest',
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      icon: <PinterestIcon />,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3" aria-label="Share this article">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
        Share
      </span>
      <div className="flex flex-wrap gap-1.5">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={PILL}
          >
            <IconWrap>{link.icon}</IconWrap>
            {link.label}
          </a>
        ))}
        <button type="button" onClick={() => void copy()} className={PILL}>
          <IconWrap>
            {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.4} /> : <Copy className="h-3.5 w-3.5" />}
          </IconWrap>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
