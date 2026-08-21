import { platformForTool } from '@/lib/tools/platforms';
import type { ToolFailureCategory } from '@/lib/tools/categories';
import type { ToolSlug } from '@/lib/tools/types';

export type ToolDiagnosticEvent = {
  at: string;
  tool: ToolSlug;
  platform: ReturnType<typeof platformForTool>;
  ok: boolean;
  category: ToolFailureCategory;
  durationMs: number;
  cached: boolean;
  mediaCount?: number;
};

const MAX_EVENTS = 200;
const events: ToolDiagnosticEvent[] = [];

export function recordToolDiagnostic(event: Omit<ToolDiagnosticEvent, 'at' | 'platform'>): void {
  events.push({
    ...event,
    at: new Date().toISOString(),
    platform: platformForTool(event.tool),
  });
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
}

export function getToolDiagnosticEvents(): readonly ToolDiagnosticEvent[] {
  return events;
}

export function resetToolDiagnostics(): void {
  events.length = 0;
}

export type ToolHealthSummary = {
  total: number;
  success: number;
  failed: number;
  platformBlocked: number;
  rateLimited: number;
  byTool: Array<{
    tool: ToolSlug;
    total: number;
    success: number;
    platformBlocked: number;
    rateLimited: number;
  }>;
  recentFailures: ToolDiagnosticEvent[];
};

export function getToolHealthSummary(): ToolHealthSummary {
  const byTool = new Map<
    ToolSlug,
    { total: number; success: number; platformBlocked: number; rateLimited: number }
  >();
  let success = 0;
  let platformBlocked = 0;
  let rateLimited = 0;

  for (const event of events) {
    const row = byTool.get(event.tool) ?? {
      total: 0,
      success: 0,
      platformBlocked: 0,
      rateLimited: 0,
    };
    row.total += 1;
    if (event.ok) {
      row.success += 1;
      success += 1;
    }
    if (event.category === 'platform_blocked') {
      row.platformBlocked += 1;
      platformBlocked += 1;
    }
    if (event.category === 'rate_limited') {
      row.rateLimited += 1;
      rateLimited += 1;
    }
    byTool.set(event.tool, row);
  }

  return {
    total: events.length,
    success,
    failed: events.length - success,
    platformBlocked,
    rateLimited,
    byTool: [...byTool.entries()].map(([tool, stats]) => ({ tool, ...stats })),
    recentFailures: events.filter((event) => !event.ok).slice(-8).reverse(),
  };
}
