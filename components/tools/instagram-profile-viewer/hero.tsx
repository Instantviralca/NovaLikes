import { InstagramProfileViewerWorkspace } from '@/components/tools/instagram-profile-viewer/workspace';
import { ToolV2Hero } from '@/components/tools/site-v2/tool-v2-parts';
import type { ToolPageCopy } from '@/data/tools/copy';
import type { ToolDefinition } from '@/data/tools/registry';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { BreadcrumbItem } from '@/types';

type HeroCopy = Pick<
  ToolPageCopy,
  'h1' | 'lead' | 'inputLabel' | 'helperText' | 'processingLabel' | 'resetLabel'
>;

/** site-v2 hero for Instagram Profile Viewer (same layout as the shared tool hero). */
export function InstagramProfileViewerHero({
  tool,
  copy,
  crumbs,
  tabs,
  chrome = ENGLISH_TOOL_CHROME,
}: {
  tool: ToolDefinition;
  copy: HeroCopy;
  crumbs: BreadcrumbItem[];
  tabs: ToolDefinition[];
  chrome?: ToolChrome;
}) {
  return (
    <ToolV2Hero
      tool={tool}
      chrome={chrome}
      crumbs={crumbs}
      tabs={tabs}
      h1={copy.h1}
      lead={copy.lead}
    >
      <InstagramProfileViewerWorkspace tool={tool} copy={copy} chrome={chrome} />
    </ToolV2Hero>
  );
}
