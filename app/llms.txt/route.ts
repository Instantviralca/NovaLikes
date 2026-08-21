import { buildLlmsTxt } from '@/lib/seo/llms-txt';

export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
