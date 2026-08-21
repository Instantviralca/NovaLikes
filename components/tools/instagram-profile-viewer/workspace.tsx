'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, ExternalLink, ImageIcon, Loader2, RotateCcw, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ToolPageCopy } from '@/data/tools/copy';
import type { ToolDefinition } from '@/data/tools/registry';
import type { PublicProfileStatsResult, ToolExtractResponse } from '@/lib/tools/types';
import {
  ENGLISH_TOOL_CHROME,
  formatToolChrome,
  localizedToolError,
  type ToolChrome,
} from '@/data/tools/chrome';

type WorkspaceCopy = Pick<
  ToolPageCopy,
  'inputLabel' | 'helperText' | 'processingLabel' | 'resetLabel'
>;

type Props = {
  tool: ToolDefinition;
  copy: WorkspaceCopy;
  onResultChange?: (hasResult: boolean) => void;
  chrome?: ToolChrome;
};

export function InstagramProfileViewerWorkspace({
  tool,
  copy,
  onResultChange,
  chrome = ENGLISH_TOOL_CHROME,
}: Props) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PublicProfileStatsResult | null>(null);

  function reset() {
    setInput('');
    setError(null);
    setResult(null);
    onResultChange?.(false);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    onResultChange?.(false);
    try {
      const response = await fetch('/api/tools/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: tool.slug, input }),
      });
      const data = (await response.json()) as ToolExtractResponse;
      if (!data.ok) {
        setError(
          localizedToolError(chrome, tool.slug, data.error.code, chrome.networkErrors.profileViewer),
        );
        return;
      }
      if (data.result.kind !== 'public_profile') {
        setError(chrome.networkErrors.profileViewer);
        return;
      }
      setResult(data.result);
      onResultChange?.(true);
    } catch {
      setError(chrome.networkErrors.profileViewer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-0">
      <form className="space-y-3" onSubmit={onSubmit} noValidate aria-busy={loading || undefined}>
        <div className="space-y-2">
          <Label htmlFor={`tool-input-${tool.slug}`} className="sr-only">
            {copy.inputLabel}
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <User
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              <Input
                id={`tool-input-${tool.slug}`}
                name="input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={tool.placeholder}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                inputMode="text"
                enterKeyHint="go"
                disabled={loading}
                dir="ltr"
                lang="en"
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={
                  error
                    ? `tool-error-${tool.slug}`
                    : loading
                      ? `tool-status-${tool.slug}`
                      : `tool-help-${tool.slug}`
                }
                className="h-14 min-h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-5 text-base shadow-[0_10px_28px_-18px_rgba(63,46,36,0.4)] md:text-base"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 min-h-14 w-full shrink-0 rounded-2xl px-7 sm:w-auto sm:min-w-[10rem]"
              loading={loading}
            >
              {tool.actionLabel}
            </Button>
          </div>
          <p id={`tool-help-${tool.slug}`} className="text-sm text-[var(--text-muted)]">
            {copy.helperText}
          </p>
        </div>
      </form>

      {loading ? (
        <p
          id={`tool-status-${tool.slug}`}
          role="status"
          aria-live="polite"
          className="mt-4 flex items-start gap-2 text-sm text-[var(--text-secondary)]"
        >
          <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin" aria-hidden="true" />
          <span>{copy.processingLabel}</span>
        </p>
      ) : null}

      {error ? (
        <div
          id={`tool-error-${tool.slug}`}
          role="alert"
          aria-live="assertive"
          className="mt-4 flex gap-3 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 px-4 py-3 text-sm text-[var(--color-error)]"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="break-words">{error}</p>
            <Button type="button" variant="outline" size="lg" className="mt-3 min-h-11 bg-white" onClick={reset}>
              <RotateCcw aria-hidden="true" />
              {copy.resetLabel}
            </Button>
          </div>
        </div>
      ) : null}

      {result ? (
        <ProfileResultCard result={result} resetLabel={copy.resetLabel} onReset={reset} chrome={chrome} />
      ) : null}
    </div>
  );
}

function ProfileResultCard({
  result,
  resetLabel,
  onReset,
  chrome,
}: {
  result: PublicProfileStatsResult;
  resetLabel: string;
  onReset: () => void;
  chrome: ToolChrome;
}) {
  const stats = [
    result.followersLabel ? { label: chrome.followers, value: result.followersLabel } : null,
    result.followingLabel ? { label: chrome.following, value: result.followingLabel } : null,
    result.postsLabel ? { label: chrome.posts, value: result.postsLabel } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-5 overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-4 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {result.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.image.downloadPath}
            alt={formatToolChrome(chrome.profilePhotoAlt, { username: result.username })}
            width={220}
            height={220}
            className="aspect-square size-36 shrink-0 rounded-full object-cover ring-4 ring-[var(--brand-accent-soft)] sm:size-44"
          />
        ) : (
          <div className="size-36 shrink-0 rounded-full bg-[var(--surface-muted)] sm:size-44" />
        )}
        <div className="min-w-0 flex-1">
          {result.displayName ? (
            <p className="break-words text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              {result.displayName}
            </p>
          ) : null}
          <p className="mt-1 break-all text-sm font-medium text-[var(--text-secondary)]">@{result.username}</p>
          {result.bio ? (
            <p className="mt-3 max-w-xl break-words text-sm leading-relaxed text-[var(--text-secondary)]">
              {result.bio}
            </p>
          ) : null}
        </div>
      </div>

      {stats.length ? (
        <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[var(--surface-muted)] px-2 py-4 text-center">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)] sm:text-xs">
                {item.label}
              </dt>
              <dd className="mt-1 break-words text-lg font-semibold text-[var(--text-primary)] sm:text-2xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild size="lg" className="min-h-12 w-full whitespace-normal sm:w-auto">
          <a href={result.profileUrl} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" />
            {chrome.viewOnInstagram}
          </a>
        </Button>
        {result.image ? (
          <Button asChild variant="outline" size="lg" className="min-h-12 w-full whitespace-normal bg-white sm:w-auto">
            <a href={result.image.downloadPath} target="_blank" rel="noreferrer">
              <ImageIcon aria-hidden="true" />
              {chrome.viewFullSizeProfilePicture}
            </a>
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="min-h-12 w-full whitespace-normal bg-white sm:w-auto"
          onClick={onReset}
        >
          <RotateCcw aria-hidden="true" />
          {resetLabel}
        </Button>
      </div>
    </div>
  );
}
