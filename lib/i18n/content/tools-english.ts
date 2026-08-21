import { TOOLS_HUB_COPY, TOOL_PAGE_COPY, type ToolPageCopy } from '@/data/tools/copy';
import { ILLUSTRATED_TOOL_LAYOUT } from '@/data/tools/illustrated-layout';
import { TOOLS } from '@/data/tools/registry';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { ToolSlug } from '@/lib/tools/types';

export type ToolRegistryCopy = {
  name: string;
  shortDescription: string;
  placeholder: string;
  actionLabel: string;
  availabilityLabel: string;
};

export type ToolLayoutCopy = {
  accentWord: string;
  editorialHeading: string;
  seeHeading: string;
  seeItems: Array<{ title: string; text: string }>;
  relatedHeading: string;
  ctaHeading: string;
  privacyLead: string;
};

export type ToolsBundle = {
  hub: typeof TOOLS_HUB_COPY & {
    h1Accent: string;
    packagesHeading: string;
  };
  pages: Record<ToolSlug, ToolPageCopy>;
  registry: Record<ToolSlug, ToolRegistryCopy>;
  layout: Record<Exclude<ToolSlug, 'instagram-profile-viewer'>, ToolLayoutCopy>;
  profileViewer: {
    accentWord: string;
    editorialHeading: string;
    editorialBody: string;
    seeHeading: string;
    seeItems: Array<{ title: string; text: string }>;
    howHeading: string;
    howSteps: [string, string, string];
    privacyLead: string;
    privacyBody: string;
    relatedHeading: string;
    ctaHeading: string;
    ctaNote: string;
  };
  chrome: ToolChrome;
};

export function getEnglishToolsBundle(): ToolsBundle {
  const registry = {} as Record<ToolSlug, ToolRegistryCopy>;
  for (const tool of TOOLS) {
    registry[tool.slug] = {
      name: tool.name,
      shortDescription: tool.shortDescription,
      placeholder: tool.placeholder,
      actionLabel: tool.actionLabel,
      availabilityLabel: tool.availabilityLabel,
    };
  }

  const layout = {} as Record<Exclude<ToolSlug, 'instagram-profile-viewer'>, ToolLayoutCopy>;
  for (const [slug, item] of Object.entries(ILLUSTRATED_TOOL_LAYOUT)) {
    layout[slug as Exclude<ToolSlug, 'instagram-profile-viewer'>] = {
      accentWord: item.accentWord,
      editorialHeading: item.editorialHeading,
      seeHeading: item.seeHeading,
      seeItems: item.seeItems.map(({ title, text }) => ({ title, text })),
      relatedHeading: item.relatedHeading,
      ctaHeading: item.ctaHeading,
      privacyLead: item.privacyLead,
    };
  }

  return {
    hub: {
      ...TOOLS_HUB_COPY,
      h1Accent: 'Tools',
      packagesHeading: 'Optional NovaLikes Packages',
    },
    pages: TOOL_PAGE_COPY,
    registry,
    layout,
    profileViewer: {
      accentWord: 'Viewer',
      editorialHeading: 'A Clearer Look at a Public Instagram Profile',
      editorialBody:
        'Instagram keeps the public identity block small. This viewer brings that block into one view: the profile photo, display name, username, biography, and the Followers, Following, and Posts labels Instagram already prints. Large audiences stay abbreviated when Instagram writes 104M or 872K. Private profiles, Stories, and Highlights stay out of reach.',
      seeHeading: 'What Can You See?',
      seeItems: [
        { title: 'Profile Photo', text: 'The public avatar, shown large enough to inspect.' },
        { title: 'Bio & Username', text: 'Display name, @username, and biography when they are public.' },
        { title: 'Followers', text: 'The published label, including abbreviations such as 104M.' },
        { title: 'Following & Posts', text: 'Included when Instagram prints those counts on the public profile.' },
      ],
      howHeading: 'How to Use It',
      howSteps: [
        'Enter a username or profile URL',
        'NovaLikes checks the public profile',
        'View the available profile details',
      ],
      privacyLead: 'Public profiles only.',
      privacyBody:
        'NovaLikes does not bypass Instagram privacy settings. Private profile content, Stories and Highlights are not available through this tool.',
      relatedHeading: 'More Instagram Tools',
      ctaHeading: 'Looking to Grow Your Instagram Presence?',
      ctaNote:
        'This viewer is free. Package pages are separate if you also want to grow a public account.',
    },
    chrome: ENGLISH_TOOL_CHROME,
  };
}
