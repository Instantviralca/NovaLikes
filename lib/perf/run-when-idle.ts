/**
 * Defer non-critical browser work until the main thread is idle.
 */

export function runWhenIdle(callback: () => void, timeout = 2000): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const win = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof win.requestIdleCallback === 'function') {
    const id = win.requestIdleCallback(callback, { timeout });
    return () => win.cancelIdleCallback?.(id);
  }

  const timer = window.setTimeout(callback, 1);
  return () => window.clearTimeout(timer);
}
