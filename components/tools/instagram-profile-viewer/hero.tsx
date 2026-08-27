'use client';

import { useState } from 'react';

import { PlatformPill } from '@/components/tools/platform-mark';
import { InstagramProfileViewerWorkspace } from '@/components/tools/instagram-profile-viewer/workspace';
import { SnapArt } from '@/components/tools/instagram-profile-viewer/visuals';
import { splitAccentInTitle } from '@/components/typography/accent-title';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import type { ToolPageCopy } from '@/data/tools/copy';
import type { ToolDefinition } from '@/data/tools/registry';

import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';

type HeroCopy = Pick<
  ToolPageCopy,
  'h1' | 'lead' | 'inputLabel' | 'helperText' | 'processingLabel' | 'resetLabel'
>;

export function InstagramProfileViewerHero({
  tool,
  copy,
  accentWord = 'Viewer',
  chrome = ENGLISH_TOOL_CHROME,
}: {
  tool: ToolDefinition;
  copy: HeroCopy;
  accentWord?: string;
  chrome?: ToolChrome;
}) {
  const [hasResult, setHasResult] = useState(false);
  const { before, accent, after } = splitAccentInTitle(copy.h1, accentWord);

  return (
    <div className="mt-3 grid items-center gap-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:gap-4">
      <div className={hasResult ? 'min-w-0 lg:col-span-2' : 'min-w-0'}>
        <PlatformPill platform="instagram" />
        <Heading as="h1" size="h1" className="mt-3 max-w-xl break-words text-[2rem] leading-[1.12] sm:text-[2.45rem]">
          {before}
          {accent ? <span className="text-[var(--brand-primary)]">{accent}</span> : null}
          {after}
        </Heading>
        {!hasResult ? (
          <Lead className="mt-4 max-w-lg text-base leading-relaxed text-[var(--text-secondary)]">
            {copy.lead}
          </Lead>
        ) : null}
        <div className="mt-6">
          <InstagramProfileViewerWorkspace
            tool={tool}
            copy={copy}
            onResultChange={setHasResult}
            chrome={chrome}
          />
        </div>
      </div>
      {hasResult ? null : (
        <div className="-mx-2 max-lg:order-last lg:mx-0">
          <SnapArt name="hero-portrait" className="max-w-xl mix-blend-multiply lg:max-w-none" />
        </div>
      )}
    </div>
  );
}
