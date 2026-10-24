import type { OrderFieldDefinition, ServiceOrderConfig } from '@/types/order-fields';
import type { PricingPackage } from '@/types/pricing';
import type { ServiceCategory } from '@/types/service';
import { getServiceBySlug } from '@/data/services';

const usernameField = (
  platform: string,
  placeholder?: string,
  helpText?: string,
): OrderFieldDefinition => ({
  id: 'username',
  name: 'username',
  label: `${platform} username`,
  type: 'username',
  placeholder: placeholder ?? `@username`,
  helpText,
  validation: {
    required: true,
    minLength: 2,
    maxLength: 64,
    rules: ['required', 'username'],
  },
});

const urlField = (
  label: string,
  placeholder: string,
  options?: {
    instagram?: boolean;
    tiktok?: boolean;
    facebook?: boolean;
    facebookPost?: boolean;
    youtubeChannel?: boolean;
    youtubeVideo?: boolean;
    helpText?: string;
  },
): OrderFieldDefinition => ({
  id: 'targetUrl',
  name: 'targetUrl',
  label,
  type: 'url',
  placeholder,
  helpText: options?.helpText,
  validation: {
    required: true,
    rules: options?.youtubeVideo
      ? ['required', 'youtube-video-url']
      : options?.youtubeChannel
        ? ['required', 'youtube-channel-url']
        : options?.facebookPost
          ? ['required', 'facebook-post-url']
          : options?.facebook
            ? ['required', 'facebook-url']
            : options?.tiktok
              ? ['required', 'tiktok-url']
              : options?.instagram
                ? ['required', 'instagram-url']
                : ['required', 'url'],
  },
});

const NOTES_LABEL = 'Order notes (optional)';
const NOTES_PLACEHOLDER = 'Anything we should know about this order?';
const NOTES_HELP_DEFAULT = 'Want gradual delivery? Tell us the pace you prefer.';
const NOTES_HELP_COMMENTS =
  'Add your own comments, one per line, ask for another language, or ask for gradual delivery. Leave empty and our team writes the comments.';
const NOTES_HELP_FB_POST =
  'Likes are the default. Write Love or another reaction here, or ask for gradual delivery.';

/** Shared optional order-notes textarea (category defaults + per-slug overrides). */
function notesField(options?: {
  helpText?: string;
  maxLength?: number;
}): OrderFieldDefinition {
  return {
    id: 'notes',
    name: 'notes',
    label: NOTES_LABEL,
    type: 'textarea',
    optional: true,
    placeholder: NOTES_PLACEHOLDER,
    helpText: options?.helpText ?? NOTES_HELP_DEFAULT,
    validation: { maxLength: options?.maxLength ?? 500 },
  };
}

/**
 * Custom comments textarea — only attached when the selected package
 * declares supportsCustomComments from real package data (Document 09.14).
 */
function customCommentsField(pkg: PricingPackage): OrderFieldDefinition {
  const quantity = pkg.quantity;
  const maxLineLength = pkg.customCommentMaxLength;

  return {
    id: 'customComments',
    name: 'customComments',
    label: 'Custom Comments',
    type: 'textarea',
    placeholder: 'Enter one comment per line',
    helpText: `Provide exactly ${quantity} comments, one per line. Blank lines are removed.`,
    validation: {
      required: true,
      exactLineCount: quantity,
      maxLineLength,
      rules: ['required', 'custom-comments'],
    },
  };
}

/** Category → default fields. Service-specific overrides can extend this map. */
const fieldsByCategory: Partial<Record<ServiceCategory, OrderFieldDefinition[]>> = {
  followers: [usernameField('Account'), notesField()],
  subscribers: [urlField('Channel URL', 'https://youtube.com/@channel'), notesField()],
  likes: [urlField('Post URL', 'https://…'), notesField()],
  'post-likes': [urlField('Post URL', 'https://…'), notesField()],
  'page-likes': [urlField('Page URL', 'https://facebook.com/…'), notesField()],
  views: [urlField('Video URL', 'https://…'), notesField()],
  comments: [urlField('Post URL', 'https://…'), notesField()],
};

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

/** Per-slug overrides when category defaults are not enough. */
const serviceFieldOverrides: Record<string, OrderFieldDefinition[]> = {
  'buy-instagram-followers': [
    usernameField(
      'Instagram',
      '@username',
      'Enter the public Instagram username that should receive the followers.',
    ),
    notesField(),
  ],
  'buy-tiktok-followers': [
    usernameField(
      'TikTok',
      '@username',
      'Enter the public TikTok username that should receive the followers.',
    ),
    notesField(),
  ],
  'buy-tiktok-likes': [
    urlField('TikTok video URL', 'https://tiktok.com/@…/video/…', {
      tiktok: true,
      helpText: 'Paste the public TikTok video URL that should receive the likes.',
    }),
    notesField(),
  ],
  'buy-facebook-followers': [
    urlField('Facebook page or profile URL', 'https://facebook.com/…', {
      facebook: true,
      helpText: 'Paste the public Facebook page or profile URL.',
    }),
    notesField(),
  ],
  'buy-facebook-page-likes': [
    urlField('Facebook page URL', 'https://facebook.com/…', {
      facebook: true,
      helpText: 'Paste the public Facebook page URL that should receive the likes.',
    }),
    notesField(),
  ],
  'buy-facebook-post-likes': [
    urlField('Facebook post URL', 'https://facebook.com/…/posts/…', {
      facebookPost: true,
      helpText: 'Paste the public Facebook post URL that should receive the likes.',
    }),
    notesField({ helpText: NOTES_HELP_FB_POST }),
  ],
  'buy-youtube-subscribers': [
    urlField('YouTube channel URL', 'https://youtube.com/@channel', {
      youtubeChannel: true,
      helpText: 'Paste the public YouTube channel URL that should receive the subscribers.',
    }),
  ],
  'buy-instagram-likes': [
    urlField('Instagram post or Reel URL', 'https://instagram.com/p/…', {
      instagram: true,
      helpText: 'Paste the public Instagram post or Reel URL that should receive the likes.',
    }),
    notesField(),
  ],
  'buy-instagram-views': [
    urlField('Instagram post or Reel URL', 'https://instagram.com/reel/…', {
      instagram: true,
      helpText: 'Paste the public Instagram video or Reel URL that should receive the views.',
    }),
    notesField(),
  ],
  'buy-instagram-comments': [
    urlField('Instagram post or Reel URL', 'https://instagram.com/p/…', {
      instagram: true,
      helpText: 'Paste the public Instagram post or Reel URL that should receive the comments.',
    }),
    notesField({ helpText: NOTES_HELP_COMMENTS, maxLength: 4000 }),
  ],
  'buy-tiktok-views': [
    urlField('TikTok video URL', 'https://tiktok.com/@…/video/…', {
      tiktok: true,
      helpText: 'Paste the public TikTok video URL that should receive the views.',
    }),
    notesField(),
  ],
  'buy-youtube-views': [
    urlField('YouTube video URL', 'https://youtube.com/watch?v=…', {
      youtubeVideo: true,
      helpText: 'Paste the public YouTube video URL that should receive the views.',
    }),
  ],
};

export function getOrderFieldsForServiceSlug(
  serviceSlug: string,
  selectedPackage?: PricingPackage | null,
): OrderFieldDefinition[] {
  let fields: OrderFieldDefinition[];

  if (serviceFieldOverrides[serviceSlug]) {
    fields = [...serviceFieldOverrides[serviceSlug]];
  } else {
    const service = getServiceBySlug(serviceSlug);
    if (!service) {
      fields = [notesField()];
    } else {
      const platform = platformLabels[service.platform] ?? 'Account';
      const fromCategory = fieldsByCategory[service.category];
      if (!fromCategory) {
        fields = [usernameField(platform), notesField()];
      } else {
        fields = fromCategory.map((field) =>
          field.type === 'username'
            ? { ...field, label: `${platform} Username` }
            : field,
        );
      }
    }
  }

  // Custom comments only when the selected package's real data supports them (09.14).
  if (
    serviceSlug === 'buy-instagram-comments' &&
    selectedPackage?.supportsCustomComments
  ) {
    fields = [...fields, customCommentsField(selectedPackage)];
  }

  return fields;
}

export function getServiceOrderConfig(
  serviceSlug: string,
  selectedPackage?: PricingPackage | null,
): ServiceOrderConfig {
  const service = getServiceBySlug(serviceSlug);
  return {
    serviceId: service?.id,
    serviceSlug,
    category: service?.category,
    fields: getOrderFieldsForServiceSlug(serviceSlug, selectedPackage),
  };
}
