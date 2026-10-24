import type {
  FieldValidationError,
  OrderConfigurationValues,
  OrderFieldDefinition,
} from '@/types/order-fields';

const USERNAME_PATTERN = /^[a-zA-Z0-9._]{2,64}$/;

const INSTAGRAM_HOSTS = new Set(['instagram.com', 'www.instagram.com', 'instagr.am', 'www.instagr.am']);
const TIKTOK_HOSTS = new Set([
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'www.vm.tiktok.com',
]);
const FACEBOOK_HOSTS = new Set([
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
  'fb.com',
  'www.fb.com',
  'fb.me',
  'www.fb.me',
]);
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
]);
const YOUTUBE_VIDEO_HOSTS = new Set([
  ...YOUTUBE_HOSTS,
  'youtu.be',
  'www.youtu.be',
]);

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Strip accidental spaces from URL fields. */
export function normalizeUrlValue(value: string): string {
  return value.trim().replace(/\s+/g, '');
}

/**
 * Valid Instagram post or Reel URL on an Instagram domain.
 * Rejects unsupported hosts.
 */
export function isValidInstagramContentUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!INSTAGRAM_HOSTS.has(host)) return false;
    // Accept post / reel / TV content paths commonly used for likes.
    return /\/(p|reel|reels|tv)\//i.test(url.pathname);
  } catch {
    return false;
  }
}

/**
 * Valid TikTok video URL on a TikTok domain.
 * Rejects unsupported hosts.
 */
export function isValidTikTokVideoUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!TIKTOK_HOSTS.has(host)) return false;
    // Short share links (vm.tiktok.com/…)
    if (host === 'vm.tiktok.com' || host === 'www.vm.tiktok.com') {
      return url.pathname.length > 1;
    }
    // Standard video paths: /@user/video/123 or /video/123
    return /\/@[^/]+\/video\/\d+/i.test(url.pathname) || /\/video\/\d+/i.test(url.pathname);
  } catch {
    return false;
  }
}

/**
 * Valid Facebook page or profile URL on a Facebook domain.
 * Rejects unsupported hosts.
 */
export function isValidFacebookUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!FACEBOOK_HOSTS.has(host)) return false;
    // Require a path beyond the bare domain (page / profile / short link).
    return url.pathname.replace(/\/+$/, '').length > 0;
  } catch {
    return false;
  }
}

/**
 * Valid Facebook post URL on a Facebook domain.
 * Rejects unsupported hosts and non-post destinations.
 */
export function isValidFacebookPostUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!FACEBOOK_HOSTS.has(host)) return false;

    const path = url.pathname.toLowerCase();
    const search = url.search.toLowerCase();

    // Common post / photo / share / reel patterns
    if (
      /\/posts\//i.test(path) ||
      /\/photos?\//i.test(path) ||
      /\/permalink\.php$/i.test(path) ||
      /\/photo\.php$/i.test(path) ||
      /\/story\.php$/i.test(path) ||
      /\/share\//i.test(path) ||
      /\/reel\//i.test(path) ||
      /\/watch\/?/i.test(path) ||
      /\/videos?\//i.test(path)
    ) {
      return true;
    }

    // Query-based post identifiers
    if (
      /[?&](story_fbid|fbid|v)=/i.test(search) ||
      /[?&](story_fbid|fbid|v)=/i.test(url.href)
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Valid YouTube channel URL on a YouTube domain.
 * Accepts @handle, /channel/, /c/, and /user/ formats.
 * Rejects unsupported hosts and non-channel destinations (watch, shorts, etc.).
 */
export function isValidYouTubeChannelUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!YOUTUBE_HOSTS.has(host)) return false;

    const path = url.pathname.replace(/\/+$/, '');
    // @handle
    if (/^\/@[\w.-]{2,}$/i.test(path)) return true;
    // channel/UC… or channel/…
    if (/^\/channel\/[\w-]{10,}$/i.test(path)) return true;
    // custom URL /c/Name
    if (/^\/c\/[\w.-]{2,}$/i.test(path)) return true;
    // legacy /user/Name
    if (/^\/user\/[\w.-]{2,}$/i.test(path)) return true;

    return false;
  } catch {
    return false;
  }
}

/**
 * Valid YouTube video URL on a YouTube domain.
 * Accepts watch, youtu.be, shorts, embed, and live formats.
 * Rejects unsupported hosts and non-video destinations.
 */
export function isValidYouTubeVideoUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrlValue(value));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!YOUTUBE_VIDEO_HOSTS.has(host)) return false;

    const path = url.pathname.replace(/\/+$/, '');
    const videoId = url.searchParams.get('v');

    // youtube.com/watch?v=VIDEO_ID
    if (/^\/watch$/i.test(path) && videoId && /^[\w-]{6,}$/i.test(videoId)) {
      return true;
    }

    // youtu.be/VIDEO_ID
    if ((host === 'youtu.be' || host === 'www.youtu.be') && /^\/[\w-]{6,}$/i.test(path)) {
      return true;
    }

    // /shorts/VIDEO_ID, /embed/VIDEO_ID, /live/VIDEO_ID, /v/VIDEO_ID
    if (/^\/(shorts|embed|live|v)\/[\w-]{6,}$/i.test(path)) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/** Strip leading @ and accidental spaces from username fields. */
export function normalizeUsername(value: string): string {
  return value.trim().replace(/\s+/g, '').replace(/^@+/, '');
}

/** One comment per line; blank lines removed. */
export function normalizeCustomComments(value: string): string {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function parseCustomCommentLines(value: string): string[] {
  return normalizeCustomComments(value).split('\n').filter(Boolean);
}

/**
 * Normalize order values before validation / cart submission.
 * Usernames accept input with or without @. URLs trim accidental spaces.
 * Custom comments trim blank lines and keep one comment per line.
 */
export function normalizeOrderConfigurationValues(
  fields: OrderFieldDefinition[],
  values: OrderConfigurationValues,
): OrderConfigurationValues {
  const next: OrderConfigurationValues = { ...values };

  for (const field of fields) {
    const key = field.name in next ? field.name : field.id;
    const raw = next[key];
    if (typeof raw !== 'string') continue;

    if (field.type === 'username' || field.validation?.rules?.includes('username')) {
      next[key] = normalizeUsername(raw);
      continue;
    }

    if (
      field.type === 'url' ||
      field.validation?.rules?.includes('url') ||
      field.validation?.rules?.includes('instagram-url') ||
      field.validation?.rules?.includes('tiktok-url') ||
      field.validation?.rules?.includes('facebook-url') ||
      field.validation?.rules?.includes('facebook-post-url') ||
      field.validation?.rules?.includes('youtube-channel-url') ||
      field.validation?.rules?.includes('youtube-video-url')
    ) {
      next[key] = normalizeUrlValue(raw);
      continue;
    }

    if (field.validation?.rules?.includes('custom-comments')) {
      next[key] = normalizeCustomComments(raw);
      continue;
    }

    if (field.type === 'text' || field.type === 'textarea') {
      next[key] = raw.trim();
    }
  }

  // Optional empty strings are omitted so nothing extra is stored or shown.
  for (const field of fields) {
    const key = field.name in next ? field.name : field.id;
    const optional = Boolean(field.optional) || !field.validation?.required;
    if (!optional) continue;
    const value = next[key];
    if (typeof value === 'string' && value.trim() === '') {
      delete next[key];
    }
  }

  return next;
}

export function validateField(
  field: OrderFieldDefinition,
  raw: string | boolean | number | undefined,
): FieldValidationError | null {
  const required = field.validation?.required && !field.optional;
  const asString = raw === undefined || raw === null ? '' : String(raw).trim();
  const rules = field.validation?.rules ?? [];
  const usernameValue =
    field.type === 'username' || rules.includes('username')
      ? normalizeUsername(asString)
      : asString;
  const urlValue =
    field.type === 'url' ||
    rules.includes('url') ||
    rules.includes('instagram-url') ||
    rules.includes('tiktok-url') ||
    rules.includes('facebook-url') ||
    rules.includes('facebook-post-url') ||
    rules.includes('youtube-channel-url') ||
    rules.includes('youtube-video-url')
      ? normalizeUrlValue(asString)
      : asString;

  if (required && (raw === undefined || raw === null || asString === '' || raw === false)) {
    return { fieldId: field.id, message: `${field.label} is required.` };
  }

  if (!asString && !required) return null;

  const { minLength, maxLength, pattern, patternMessage } = field.validation ?? {};
  const comparable =
    field.type === 'username' || rules.includes('username')
      ? usernameValue
      : field.type === 'url' ||
          rules.includes('url') ||
          rules.includes('instagram-url') ||
          rules.includes('tiktok-url') ||
          rules.includes('facebook-url') ||
          rules.includes('facebook-post-url') ||
          rules.includes('youtube-channel-url') ||
          rules.includes('youtube-video-url')
        ? urlValue
        : asString;

  if (minLength !== undefined && comparable.length < minLength) {
    return {
      fieldId: field.id,
      message: `${field.label} must be at least ${minLength} characters.`,
    };
  }

  if (maxLength !== undefined && comparable.length > maxLength) {
    return {
      fieldId: field.id,
      message: `${field.label} must be at most ${maxLength} characters.`,
    };
  }

  if (pattern) {
    const re = new RegExp(pattern);
    if (!re.test(comparable)) {
      return {
        fieldId: field.id,
        message: patternMessage ?? `${field.label} format is invalid.`,
      };
    }
  }

  if (field.type === 'username' || rules.includes('username')) {
    if (/^https?:\/\//i.test(asString) || /tiktok\.com\//i.test(asString)) {
      return {
        fieldId: field.id,
        message: `Enter a username only (not a full profile URL).`,
      };
    }
    if (!USERNAME_PATTERN.test(usernameValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid username (letters, numbers, periods, underscores).`,
      };
    }
  }

  if (rules.includes('instagram-url')) {
    if (!isValidInstagramContentUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid Instagram post or Reel URL (instagram.com).`,
      };
    }
  } else if (rules.includes('tiktok-url')) {
    if (!isValidTikTokVideoUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid TikTok video URL (tiktok.com).`,
      };
    }
  } else if (rules.includes('facebook-url')) {
    if (!isValidFacebookUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid Facebook page or profile URL (facebook.com).`,
      };
    }
  } else if (rules.includes('facebook-post-url')) {
    if (!isValidFacebookPostUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid Facebook post URL (facebook.com).`,
      };
    }
  } else if (rules.includes('youtube-channel-url')) {
    if (!isValidYouTubeChannelUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid YouTube channel URL (youtube.com/@…, /channel/…, /c/…, or /user/…).`,
      };
    }
  } else if (rules.includes('youtube-video-url')) {
    if (!isValidYouTubeVideoUrl(urlValue)) {
      return {
        fieldId: field.id,
        message: `Enter a valid YouTube video URL (youtube.com/watch?v=… or youtu.be/…).`,
      };
    }
  } else if (field.type === 'url' || rules.includes('url')) {
    if (!isValidUrl(urlValue)) {
      return { fieldId: field.id, message: `Enter a valid URL starting with https://.` };
    }
  }

  if (rules.includes('custom-comments')) {
    const lines = parseCustomCommentLines(asString);
    const exact = field.validation?.exactLineCount;
    if (exact !== undefined && lines.length !== exact) {
      return {
        fieldId: field.id,
        message: `Enter exactly ${exact} comments (one per line). You entered ${lines.length}.`,
      };
    }
    const maxLine = field.validation?.maxLineLength;
    if (maxLine !== undefined) {
      const tooLong = lines.find((line) => line.length > maxLine);
      if (tooLong) {
        return {
          fieldId: field.id,
          message: `Each comment must be at most ${maxLine} characters.`,
        };
      }
    }
  }

  return null;
}

export function validateOrderConfiguration(
  fields: OrderFieldDefinition[],
  values: OrderConfigurationValues,
): FieldValidationError[] {
  const normalized = normalizeOrderConfigurationValues(fields, values);
  return fields
    .map((field) => validateField(field, normalized[field.name] ?? normalized[field.id]))
    .filter((error): error is FieldValidationError => Boolean(error));
}
