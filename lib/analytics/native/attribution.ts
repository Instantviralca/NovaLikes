/**
 * Attribution + UA classification for native analytics.
 */

export type SourceChannel = 'direct' | 'organic' | 'referral' | 'social' | 'campaign' | 'unknown';

export type DeviceProfile = {
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'other';
  browserFamily: string;
  osFamily: string;
};

export type UtmParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

const SEARCH_HOSTS = [
  'google.',
  'bing.',
  'duckduckgo.',
  'yahoo.',
  'yandex.',
  'baidu.',
  'ecosia.',
];

const SOCIAL_HOSTS: Array<{ match: string; label: string }> = [
  { match: 'instagram.', label: 'instagram' },
  { match: 'facebook.', label: 'facebook' },
  { match: 'fb.', label: 'facebook' },
  { match: 'tiktok.', label: 'tiktok' },
  { match: 't.co', label: 'x' },
  { match: 'twitter.', label: 'x' },
  { match: 'x.com', label: 'x' },
  { match: 'linkedin.', label: 'linkedin' },
  { match: 'reddit.', label: 'reddit' },
  { match: 'youtube.', label: 'youtube' },
  { match: 'youtu.be', label: 'youtube' },
];

export function parseUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const pick = (key: string) => {
    const value = params.get(key)?.trim();
    return value ? value.slice(0, 120) : undefined;
  };
  return {
    source: pick('utm_source'),
    medium: pick('utm_medium'),
    campaign: pick('utm_campaign'),
    content: pick('utm_content'),
    term: pick('utm_term'),
  };
}

export function classifyReferrer(
  referrer: string | null | undefined,
  utm: UtmParams,
): { channel: SourceChannel; sourceLabel: string } {
  if (utm.source || utm.medium || utm.campaign) {
    return {
      channel: 'campaign',
      sourceLabel: (utm.source || utm.medium || 'campaign').toLowerCase(),
    };
  }
  if (!referrer?.trim()) {
    return { channel: 'direct', sourceLabel: 'direct' };
  }
  let host = '';
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return { channel: 'referral', sourceLabel: 'referral' };
  }
  if (SEARCH_HOSTS.some((h) => host.includes(h))) {
    const label = host.includes('google')
      ? 'google'
      : host.includes('bing')
        ? 'bing'
        : host.includes('duckduckgo')
          ? 'duckduckgo'
          : host.includes('yahoo')
            ? 'yahoo'
            : 'organic';
    return { channel: 'organic', sourceLabel: label };
  }
  for (const social of SOCIAL_HOSTS) {
    if (host.includes(social.match) || host === social.match.replace(/\.$/, '')) {
      return { channel: 'social', sourceLabel: social.label };
    }
  }
  return { channel: 'referral', sourceLabel: host.replace(/^www\./, '') };
}

export function classifyUserAgent(ua: string | null | undefined): DeviceProfile {
  const value = ua || '';
  const lower = value.toLowerCase();
  let deviceType: DeviceProfile['deviceType'] = 'desktop';
  if (/ipad|tablet|kindle|silk/i.test(value)) deviceType = 'tablet';
  else if (/mobi|iphone|android.*mobile|windows phone/i.test(value)) deviceType = 'mobile';
  else if (!value) deviceType = 'other';

  let browserFamily = 'Other';
  if (/edg\//i.test(value)) browserFamily = 'Edge';
  else if (/chrome\//i.test(value) && !/edg\//i.test(value)) browserFamily = 'Chrome';
  else if (/safari\//i.test(value) && !/chrome\//i.test(value)) browserFamily = 'Safari';
  else if (/firefox\//i.test(value)) browserFamily = 'Firefox';

  let osFamily = 'Other';
  if (/windows/i.test(value)) osFamily = 'Windows';
  else if (/android/i.test(value)) osFamily = 'Android';
  else if (/iphone|ipad|ios/i.test(value)) osFamily = 'iOS';
  else if (/mac os|macintosh/i.test(value)) osFamily = 'macOS';
  else if (/linux/i.test(value)) osFamily = 'Linux';

  if (!lower.trim()) {
    return { deviceType: 'other', browserFamily: 'Other', osFamily: 'Other' };
  }
  return { deviceType, browserFamily, osFamily };
}
