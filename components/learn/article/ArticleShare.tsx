'use client';

import {
  Briefcase,
  Check,
  Link2,
  MessageCircle,
  Pin,
  Send,
  Users,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { SITE_V2_COPY } from '@/data/content/site-v2-copy';

type ArticleShareProps = {
  url: string;
  title: string;
  enabled?: boolean;
};

type ShareLink = {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
};

/**
 * Lightweight share actions — Document 15.02, site-v2 `.share` small square icons.
 * No social SDKs. Uses the canonical URL only. Same destinations as before.
 */
export function ArticleShare({ url, title, enabled = true }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  if (!enabled) return null;

  const labels = SITE_V2_COPY.learn.share;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  const links: ShareLink[] = [
    {
      key: 'whatsapp',
      label: labels.whatsapp,
      href: `https://api.whatsapp.com/send?text=${encodedText}`,
      icon: <MessageCircle className="ic" aria-hidden="true" />,
    },
    {
      key: 'facebook',
      label: labels.facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Users className="ic" aria-hidden="true" />,
    },
    {
      key: 'x',
      label: labels.x,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <X className="ic" aria-hidden="true" />,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Briefcase className="ic" aria-hidden="true" />,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Send className="ic" aria-hidden="true" />,
    },
    {
      key: 'pinterest',
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      icon: <Pin className="ic" aria-hidden="true" />,
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
    <div className="share" role="group" aria-label="Share this article">
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={copied ? labels.copied : labels.copy}
        title={copied ? labels.copied : labels.copy}
      >
        {copied ? (
          <Check className="ic" aria-hidden="true" />
        ) : (
          <Link2 className="ic" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
