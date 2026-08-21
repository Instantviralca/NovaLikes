'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, Download, ExternalLink, ImageIcon, Link2, Loader2, RotateCcw, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ToolPageCopy } from '@/data/tools/copy';
import type { ToolDefinition } from '@/data/tools/registry';
import { videoQualityLabel } from '@/lib/tools/quality-label';
import type { PublicProfileStatsResult, PublicToolResult, ToolExtractResponse } from '@/lib/tools/types';
import { cn } from '@/lib/utils';
import {
  ENGLISH_TOOL_CHROME,
  formatToolChrome,
  localizedToolError,
  type ToolChrome,
} from '@/data/tools/chrome';

type ToolWorkspaceProps = {
  tool: ToolDefinition;
  copy: ToolPageCopy;
  variant?: 'card' | 'illustrated';
  onResultChange?: (hasResult: boolean) => void;
  chrome?: ToolChrome;
};

function networkFallback(chrome: ToolChrome, tool: ToolDefinition): string {
  if (tool.kind === 'profile_image') return chrome.networkErrors.profileImage;
  if (tool.slug === 'instagram-profile-viewer') return chrome.networkErrors.profileViewer;
  if (tool.kind === 'public_profile') return chrome.networkErrors.followerCount;
  return chrome.networkErrors.video;
}

export function ToolWorkspace({
  tool,
  copy,
  variant = 'card',
  onResultChange,
  chrome = ENGLISH_TOOL_CHROME,
}: ToolWorkspaceProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PublicToolResult | null>(null);

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
          localizedToolError(
            chrome,
            tool.slug,
            data.error.code,
            networkFallback(chrome, tool),
          ),
        );
        return;
      }
      setResult(data.result);
      onResultChange?.(true);
    } catch {
      setError(networkFallback(chrome, tool));
    } finally {
      setLoading(false);
    }
  }

  const illustrated = variant === 'illustrated';

  return (
    <div
      className={cn(
        'min-w-0',
        illustrated
          ? ''
          : 'overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-4 sm:p-6',
      )}
    >
      {copy.limitedNotice ? (
        <p
          className={cn(
            'mb-5 rounded-xl px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)]',
            illustrated
              ? 'bg-[#FFF6E8]'
              : 'border border-[var(--border-subtle)] bg-[var(--brand-accent-soft)]/50',
          )}
        >
          {copy.limitedNotice}
        </p>
      ) : null}

      <form className="space-y-3" onSubmit={onSubmit} noValidate aria-busy={loading || undefined}>
        <div className="space-y-2">
          <Label
            htmlFor={`tool-input-${tool.slug}`}
            className={illustrated ? 'sr-only' : 'text-sm font-medium text-[var(--text-primary)]'}
          >
            {copy.inputLabel}
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <div className={cn('min-w-0 flex-1', illustrated && 'relative')}>
              {illustrated ? (
                tool.inputType === 'url' ? (
                  <Link2
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--text-muted)]"
                    aria-hidden="true"
                  />
                ) : (
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--text-muted)]"
                    aria-hidden="true"
                  />
                )
              ) : null}
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
                inputMode={tool.inputType === 'username_or_url' ? 'text' : 'url'}
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
                className={
                  illustrated
                    ? 'h-14 min-h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-5 text-base shadow-[0_10px_28px_-18px_rgba(63,46,36,0.4)] md:text-base'
                    : 'h-12 min-h-12 w-full min-w-0 flex-1 rounded-xl border-[var(--border-strong)] bg-white px-4 text-base shadow-none md:text-base'
                }
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className={
                illustrated
                  ? 'h-auto min-h-14 w-full shrink-0 rounded-2xl px-7 py-3 sm:w-auto sm:min-w-[10rem]'
                  : 'h-auto min-h-12 w-full shrink-0 px-6 py-3 sm:w-auto sm:min-w-[10.5rem]'
              }
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
          <p className="min-w-0 break-words">{error}</p>
        </div>
      ) : null}

      {result ? (
        <div aria-live="polite" aria-atomic="true" className="mt-5 border-t border-[var(--border-subtle)] pt-5">
          <ToolResultCard result={result} variant={tool.slug} chrome={chrome} />
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="mt-4 min-h-12 w-full whitespace-normal bg-white sm:w-auto"
            onClick={reset}
          >
            <RotateCcw aria-hidden="true" />
            {copy.resetLabel}
          </Button>
        </div>
      ) : error ? (
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="mt-4 min-h-12 w-full whitespace-normal bg-white sm:w-auto"
          onClick={reset}
        >
          <RotateCcw aria-hidden="true" />
          {copy.resetLabel}
        </Button>
      ) : null}
    </div>
  );
}

function ResultActions({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">{children}</div>;
}

function ToolResultCard({
  result,
  variant,
  chrome,
}: {
  result: PublicToolResult;
  variant: ToolDefinition['slug'];
  chrome: ToolChrome;
}) {
  if (result.kind === 'public_profile') {
    return variant === 'instagram-profile-viewer' ? (
      <InstagramProfileSnapshotCard result={result} chrome={chrome} />
    ) : (
      <PublicProfileStatsCard result={result} chrome={chrome} />
    );
  }
  if (result.kind === 'profile_image') {
    return (
      <div className="min-w-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.image.downloadPath}
            alt={formatToolChrome(chrome.profilePhotoAlt, { username: result.username })}
            width={192}
            height={192}
            className="aspect-square size-36 shrink-0 rounded-2xl object-cover sm:size-44"
          />
          <div className="min-w-0 space-y-1">
            {result.displayName ? (
              <p className="break-words text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                {result.displayName}
              </p>
            ) : null}
            <p className="break-all text-sm text-[var(--text-secondary)]">@{result.username}</p>
            {result.bio ? (
              <p className="break-words text-sm leading-relaxed text-[var(--text-secondary)]">{result.bio}</p>
            ) : null}
          </div>
        </div>
        <ResultActions>
          <Button asChild size="lg" className="min-h-12 w-full whitespace-normal sm:w-auto">
            <a href={result.image.downloadPath} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" />
              {chrome.viewFullSize}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-12 w-full whitespace-normal bg-white sm:w-auto">
            <a href={result.image.downloadPath} download={result.image.filename}>
              <ImageIcon aria-hidden="true" />
              {chrome.downloadImage}
            </a>
          </Button>
        </ResultActions>
      </div>
    );
  }

  const thumbClass =
    result.platform === 'facebook'
      ? 'aspect-video max-h-52 w-full rounded-2xl object-cover sm:max-h-56'
      : 'aspect-[9/16] max-h-52 w-full rounded-2xl object-cover sm:max-h-56';
  const qualities = result.media
    .map((item, index) => videoQualityLabel(item.quality) ?? (result.media.length > 1 ? `File ${index + 1}` : null))
    .filter((label): label is string => Boolean(label));

  return (
    <div className="min-w-0">
      <div
        className={cn(
          'grid gap-4',
          result.thumbnailDownloadPath ? 'sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]' : '',
        )}
      >
        {result.thumbnailDownloadPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.thumbnailDownloadPath}
            alt={
              result.title
                ? formatToolChrome(chrome.thumbnailForTitle, { title: result.title })
                : chrome.videoThumbnailAlt
            }
            className={thumbClass}
          />
        ) : null}
        <div className="min-w-0">
          {result.title ? (
            <p className="break-words text-base font-semibold text-[var(--text-primary)]">{result.title}</p>
          ) : null}
          {result.author ? (
            <p className="mt-1 break-all text-sm text-[var(--text-secondary)]">{result.author}</p>
          ) : null}
          {typeof result.duration === 'number' ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{formatDuration(result.duration)}</p>
          ) : null}
          {qualities.length ? (
            <p className="mt-2 break-words text-sm text-[var(--text-secondary)]">
              {qualities.length === 1 ? chrome.availableQuality : chrome.availableQualities}
              {qualities.join(', ')}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {result.media.map((item, index) => (
          <Button
            key={item.downloadPath}
            asChild
            variant={index === 0 ? 'default' : 'outline'}
            className={cn('min-h-12 w-full whitespace-normal sm:w-auto', index === 0 ? '' : 'bg-white')}
            size="lg"
          >
            <a href={item.downloadPath} download={item.filename}>
              <Download aria-hidden="true" />
              {localizedDownloadLabel(chrome, item.quality, index)}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}

function localizedDownloadLabel(chrome: ToolChrome, quality: string | undefined, index: number): string {
  const label = videoQualityLabel(quality);
  if (label) return formatToolChrome(chrome.downloadQuality, { quality: label });
  return index === 0 ? chrome.downloadVideo : formatToolChrome(chrome.downloadFileN, { n: index + 1 });
}

function InstagramProfileSnapshotCard({
  result,
  chrome,
}: {
  result: PublicProfileStatsResult;
  chrome: ToolChrome;
}) {
  const stats = [
    result.followersLabel ? { label: chrome.followers, value: result.followersLabel } : null,
    result.followingLabel ? { label: chrome.following, value: result.followingLabel } : null,
    result.postsLabel ? { label: chrome.posts, value: result.postsLabel } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {result.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.image.downloadPath}
            alt={formatToolChrome(chrome.profilePhotoAlt, { username: result.username })}
            width={192}
            height={192}
            className="aspect-square size-32 shrink-0 rounded-2xl object-cover sm:size-40"
          />
        ) : null}
        <div className="min-w-0 space-y-1">
          {result.displayName ? (
            <p className="break-words text-xl font-semibold tracking-tight text-[var(--text-primary)]">
              {result.displayName}
            </p>
          ) : null}
          <p className="break-all text-sm text-[var(--text-secondary)]">@{result.username}</p>
          {result.bio ? (
            <p className="mt-2 break-words text-sm leading-relaxed text-[var(--text-secondary)]">{result.bio}</p>
          ) : null}
        </div>
      </div>
      {stats.length ? (
        <dl className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-2 py-3 text-center"
            >
              <dt className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)] sm:text-xs">
                {item.label}
              </dt>
              <dd className="mt-1 break-words text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      <ResultActions>
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
      </ResultActions>
    </div>
  );
}

function PublicProfileStatsCard({
  result,
  chrome,
}: {
  result: PublicProfileStatsResult;
  chrome: ToolChrome;
}) {
  const abbreviated = Boolean(result.followersLabel && /[KMB]$/i.test(result.followersLabel.replace(/\s/g, '')));

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {result.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.image.downloadPath}
            alt={formatToolChrome(chrome.profilePhotoAlt, { username: result.username })}
            width={160}
            height={160}
            className="aspect-square size-24 shrink-0 rounded-2xl object-cover sm:size-28"
          />
        ) : null}
        <div className="min-w-0 space-y-1">
          {result.displayName ? (
            <p className="break-words text-lg font-semibold text-[var(--text-primary)]">{result.displayName}</p>
          ) : null}
          <p className="break-all text-sm text-[var(--text-secondary)]">@{result.username}</p>
        </div>
      </div>
      {result.followersLabel ? (
        <div className="mt-5 rounded-2xl bg-[var(--surface-muted)] px-4 py-5 text-center sm:px-6">
          <p className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            {result.followersLabel}
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{chrome.currentFollowerCount}</p>
          {abbreviated ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{chrome.abbreviatedCountNote}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function formatDuration(seconds: number): string {
  const whole = Math.round(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
