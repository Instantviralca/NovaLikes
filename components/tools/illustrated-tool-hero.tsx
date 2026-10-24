import { ToolV2Hero } from '@/components/tools/site-v2/tool-v2-parts';
import { ToolWorkspace } from '@/components/tools/tool-workspace';
import type { ToolPageCopy } from '@/data/tools/copy';
import type { ToolDefinition } from '@/data/tools/registry';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { BreadcrumbItem } from '@/types';

/** site-v2 tool hero: crumbs, H1, lead, same-platform tabs, and the workspace form/result. */
export function IllustratedToolHero({
  tool,
  copy,
  crumbs,
  tabs,
  chrome = ENGLISH_TOOL_CHROME,
}: {
  tool: ToolDefinition;
  copy: ToolPageCopy;
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
      <ToolWorkspace tool={tool} copy={copy} variant="site-v2" chrome={chrome} />
    </ToolV2Hero>
  );
}
