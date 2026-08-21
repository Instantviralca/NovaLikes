import Link from 'next/link';
import { Instagram } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { AuthorSocialLinks } from '@/types/author';

type AuthorSocialLinksProps = {
  links?: AuthorSocialLinks;
  website?: string;
  className?: string;
  variant?: 'text' | 'icons';
};

const LABEL_MAP: Record<string, string> = {
  website: 'Website',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  github: 'GitHub',
};

type SocialEntry = { key: string; href: string; label: string };

function collectEntries(
  links: AuthorSocialLinks | undefined,
  website: string | undefined,
): SocialEntry[] {
  const entries: SocialEntry[] = [];

  if (links) {
    for (const [key, href] of Object.entries(links)) {
      if (!href) continue;
      entries.push({
        key,
        href,
        label: LABEL_MAP[key] ?? key,
      });
    }
  }

  if (website) {
    entries.push({
      key: 'website',
      href: website,
      label: website.includes('vocal.media') ? 'Vocal' : LABEL_MAP.website,
    });
  }

  return entries;
}

function SocialIcon({ entry }: { entry: SocialEntry }) {
  if (entry.key === 'instagram') {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(45deg,#f9ce34_0%,#ee2a7b_45%,#6228d7_100%)] text-white"
        aria-hidden
      >
        <Instagram className="h-4 w-4" strokeWidth={2.2} />
      </span>
    );
  }

  if (entry.key === 'website' && entry.href.includes('vocal.media')) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-[0.7rem] font-bold tracking-tight text-white"
        aria-hidden
      >
        V
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-[0.65rem] font-semibold uppercase text-white"
      aria-hidden
    >
      {entry.label.slice(0, 1)}
    </span>
  );
}

/**
 * Author social links — Document 15.03.
 * Renders nothing when no links are configured (no fabricated profiles).
 */
export function AuthorSocialLinks({
  links,
  website,
  className,
  variant = 'text',
}: AuthorSocialLinksProps) {
  const entries = collectEntries(links, website);

  if (entries.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Author social profiles" className={cn(className)}>
      <ul
        className={cn(
          'flex flex-wrap',
          variant === 'icons' ? 'justify-end gap-2' : 'gap-3',
        )}
      >
        {entries.map((entry) => (
          <li key={entry.key}>
            <Link
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
                variant === 'text'
                  ? 'text-sm font-medium text-neutral-900 underline-offset-2 hover:underline'
                  : 'inline-flex rounded-full',
              )}
            >
              {variant === 'icons' ? (
                <>
                  <SocialIcon entry={entry} />
                  <span className="sr-only">{entry.label}</span>
                </>
              ) : (
                entry.label
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
