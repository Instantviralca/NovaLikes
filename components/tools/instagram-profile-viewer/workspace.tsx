'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, ExternalLink, ImageIcon, Loader2, RotateCcw, User } from 'lucide-react';

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
          localizedToolError(
            chrome,
            tool.slug,
            data.error.code,
            chrome.networkErrors.profileViewer,
          ),
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

  const inputId = `tool-input-${tool.slug}`;

  return (
    <div className="min-w-0">
      <form className="tool-form" onSubmit={onSubmit} noValidate aria-busy={loading || undefined}>
        <div className="field">
          <label htmlFor={inputId}>{copy.inputLabel}</label>
          <div className="input">
            <User className="ic" aria-hidden="true" />
            <input
              id={inputId}
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
            />
          </div>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <Loader2 className="ic spin" aria-hidden="true" /> : null}
          {tool.actionLabel}
        </button>
      </form>
      <p id={`tool-help-${tool.slug}`} className="hint" style={{ marginTop: 10 }}>
        {copy.helperText}
      </p>

      {loading ? (
        <p id={`tool-status-${tool.slug}`} role="status" aria-live="polite" className="tool-status">
          <Loader2 className="ic" aria-hidden="true" />
          <span>{copy.processingLabel}</span>
        </p>
      ) : null}

      {error ? (
        <>
          <div
            id={`tool-error-${tool.slug}`}
            role="alert"
            aria-live="assertive"
            className="tool-error"
          >
            <AlertCircle className="ic" aria-hidden="true" />
            <p>{error}</p>
          </div>
          <div className="tool-actions">
            <button type="button" className="btn ghost" onClick={reset}>
              <RotateCcw className="ic" aria-hidden="true" />
              {copy.resetLabel}
            </button>
          </div>
        </>
      ) : null}

      {result ? (
        <ProfileResultCard
          result={result}
          resetLabel={copy.resetLabel}
          onReset={reset}
          chrome={chrome}
        />
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
    <div className="tool-result rich" aria-live="polite" aria-atomic="true">
      {result.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={result.image.downloadPath}
          alt={formatToolChrome(chrome.profilePhotoAlt, { username: result.username })}
          width={220}
          height={220}
          className="tr-img round lg"
        />
      ) : (
        <span className="tr-av" aria-hidden="true" />
      )}
      <div className="tr-body">
        {result.displayName ? <p className="tr-name">{result.displayName}</p> : null}
        <p className="tr-sub">@{result.username}</p>
        {result.bio ? <p className="tr-text">{result.bio}</p> : null}

        {stats.length ? (
          <dl className="tr-stats">
            {stats.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="tool-actions">
          <a className="btn" href={result.profileUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="ic" aria-hidden="true" />
            {chrome.viewOnInstagram}
          </a>
          {result.image ? (
            <a
              className="btn ghost"
              href={result.image.downloadPath}
              target="_blank"
              rel="noreferrer"
            >
              <ImageIcon className="ic" aria-hidden="true" />
              {chrome.viewFullSizeProfilePicture}
            </a>
          ) : null}
          <button type="button" className="btn ghost" onClick={onReset}>
            <RotateCcw className="ic" aria-hidden="true" />
            {resetLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
