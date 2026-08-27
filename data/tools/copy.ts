import type { FaqItem } from '@/types/components';
import type { ToolSlug } from '@/lib/tools/types';

export type ToolPageCopy = {
  eyebrow: string;
  h1: string;
  lead: string;
  inputLabel: string;
  helperText: string;
  processingLabel: string;
  resetLabel: string;
  limitedNotice?: string;
  introHeading: string;
  intro: string[];
  howHeading: string;
  how: string[];
  howToUseHeading: string;
  howToUse: string[];
  supportedHeading: string;
  supportedIntro?: string;
  supported: string[];
  notesHeading: string;
  notes: string[];
  relatedHeading: string;
  faqHeading: string;
  faqs: FaqItem[];
};

export const TOOLS_HUB_COPY = {
  eyebrow: 'FREE SOCIAL MEDIA TOOLS',
  h1: 'Free Instagram, TikTok & Facebook Tools',
  lead: 'Look up a public profile, check a published follower count, or retrieve a video file the platform already exposes. Each helper runs on NovaLikes servers and returns only public information — never a private feed, login session, or invented download.',
  howHeading: 'How these tools work',
  how: [
    'Choose a tool, then paste a public username or URL.',
    'NovaLikes checks the address and requests the public page from our servers.',
    'If the platform exposes the photo, count, or file, you see it here. If it does not, you get a clear message instead of a fake result.',
  ],
  servicesHeading: 'Optional NovaLikes packages',
  servicesNote:
    'The tools above are free. Package pages are separate if you also want to grow a public account.',
} as const;

export const TOOL_PAGE_COPY: Record<ToolSlug, ToolPageCopy> = {
  'instagram-profile-picture-viewer': {
    eyebrow: 'Instagram tool',
    h1: 'Instagram Profile Picture Viewer',
    lead: 'Instagram crops profile photos into a small circle on most screens, so it is hard to inspect the image itself. Enter a public username or profile URL and NovaLikes will show the photo Instagram already publishes for that account — larger, with options to view or download it.',
    inputLabel: 'Instagram username or profile URL',
    helperText: 'Example: nasa, @nasa, or https://www.instagram.com/nasa/',
    processingLabel: 'Loading the public profile photo…',
    resetLabel: 'Search Another Profile',
    introHeading: 'See a public Instagram photo at a usable size',
    intro: [
      'A profile picture is often the only image people can open without following an account, yet Instagram’s own layout keeps it tiny. This page is for that gap: you look up a public username and, when Instagram includes the photo on the public profile, we display it at a size you can actually see.',
      'Nothing here unlocks a private account. If Instagram does not publish a profile image for visitors who are not logged in, the tool returns an error instead of guessing or substituting another picture.',
    ],
    howHeading: 'How this viewer works',
    how: [
      'You submit a username or a profile URL. NovaLikes normalizes the input, requests the public Instagram profile from our server, and reads the image Instagram already attaches to that page.',
      'When the image is present, it is delivered through a short-lived, signed download on NovaLikes — not as an open proxy to the rest of the internet. You can open it full size in a new tab or save the file.',
    ],
    howToUseHeading: 'How to look up a profile photo',
    howToUse: [
      'Copy a public Instagram username or the profile URL from the address bar.',
      'Paste it above and choose View photo.',
      'Use View Full Size or Download Image when the public photo is available.',
    ],
    supportedHeading: 'What you can enter',
    supportedIntro: 'The lookup is for accounts, not posts or Stories.',
    supported: [
      'Usernames, with or without @',
      'instagram.com/{username} URLs, including extra tracking parameters',
      'Profile paths such as /{username}/reels that still identify the same public account',
    ],
    notesHeading: 'Public-profile limits',
    notes: [
      'Private, hidden, or login-only profiles cannot be viewed.',
      'This page does not show follower counts, bios, or recent posts. Use Instagram Profile Viewer when you want that combined snapshot.',
      'The image is whatever Instagram currently publishes. We do not upscale it or label it HD.',
    ],
    relatedHeading: 'Other Instagram tools',
    faqHeading: 'Profile picture questions',
    faqs: [
      {
        id: 'igp-private',
        question: 'Can I view a private Instagram profile picture?',
        answer:
          'No. Only the photo Instagram already publishes on a public profile is requested. Private accounts return an error.',
      },
      {
        id: 'igp-login',
        question: 'Do I need to log in to Instagram?',
        answer:
          'No. This page never asks for an Instagram password. If Instagram does not expose the public photo, you will see an error instead.',
      },
      {
        id: 'igp-full',
        question: 'Can I see follower counts and bio here?',
        answer:
          'Not on this page. Use the [Instagram Profile Viewer](/tools/instagram-profile-viewer) for name, bio, and published counts together.',
      },
      {
        id: 'igp-download',
        question: 'Can I download the profile picture?',
        answer:
          'Yes, when Instagram exposes the public image. Download Image saves that file through NovaLikes. View Full Size opens the same image in a new tab.',
      },
    ],
  },
  'instagram-follower-counter': {
    eyebrow: 'Instagram tool',
    h1: 'Instagram Follower Counter',
    lead: 'Instagram often prints large audiences as 104M or 872K rather than a full integer. This counter reads the follower label Instagram already shows on a public profile and displays it as published — including those abbreviations. It does not invent an exact number behind 104M.',
    inputLabel: 'Instagram username or profile URL',
    helperText: 'Large counts stay abbreviated when that is how Instagram publishes them.',
    processingLabel: 'Reading the public Instagram profile…',
    resetLabel: 'Search Another Profile',
    introHeading: 'A public follower label, not a private census',
    intro: [
      'People look up follower counts to confirm what an account already shows the world. This tool does that lookup for you: it requests the public profile and returns the Followers figure Instagram includes on that page at the time of the check.',
      'When Instagram writes 104M, you will see 104M. Expanding that into a made-up 104,000,000 would be less honest, not more precise. Smaller accounts that still show a full number are shown that way too.',
    ],
    howHeading: 'How the count is read',
    how: [
      'NovaLikes requests the public Instagram profile from our servers and reads the follower label Instagram already prints. There is no live websocket of every follow, and there is no back-office dump of exact internals.',
      'The result is a snapshot of what a visitor could see on the public page. Check again later if you need a newer reading; the figure can change after you leave.',
    ],
    howToUseHeading: 'How to check a follower count',
    howToUse: [
      'Enter a public username such as nasa, @nasa, or a profile URL.',
      'Choose Check count.',
      'Read the large number as Instagram publishes it, including K or M abbreviations.',
    ],
    supportedHeading: 'What you can enter',
    supported: [
      'Usernames, with or without @',
      'instagram.com/{username} URLs, including tracking parameters',
      'Paths such as /{username}/reels that still identify the same public account',
    ],
    notesHeading: 'What this number is not',
    notes: [
      'It is not a live total and not a private-account lookup.',
      'We do not convert 104M into a fake exact count.',
      'Following and post totals belong on Instagram Profile Viewer, not this focused counter.',
    ],
    relatedHeading: 'Other Instagram tools',
    faqHeading: 'Follower count questions',
    faqs: [
      {
        id: 'igf-exact',
        question: 'Is this the exact live follower number?',
        answer:
          'It is the count Instagram publishes on the public profile at lookup time. Large accounts are often abbreviated, and the figure can change after you check.',
      },
      {
        id: 'igf-abbrev',
        question: 'Why do some results say 104M instead of a full number?',
        answer:
          'Instagram itself often shortens large audiences. This tool keeps that label. We do not invent the missing digits.',
      },
      {
        id: 'igf-private',
        question: 'Does this work on private accounts?',
        answer: 'No. Only public profiles that expose a follower count can be checked.',
      },
      {
        id: 'igf-photo',
        question: 'Can I view the profile photo too?',
        answer:
          'The counter may include the public photo when Instagram exposes it. For a dedicated image view, use the [Instagram Profile Picture Viewer](/tools/instagram-profile-picture-viewer). For name, bio, and all three counts, use the [Instagram Profile Viewer](/tools/instagram-profile-viewer).',
      },
    ],
  },
  'instagram-profile-viewer': {
    eyebrow: 'Instagram tool',
    h1: 'Instagram Profile Viewer',
    lead: 'Enter a public Instagram username or profile URL to view the photo, name, bio, and published counts Instagram already shows. NovaLikes only returns public profile details — nothing private, and nothing invented.',
    inputLabel: 'Instagram username or profile URL',
    helperText: 'Try nasa, @nasa, or a public profile URL.',
    processingLabel: 'Loading the public Instagram profile…',
    resetLabel: 'Search Another Profile',
    introHeading: 'A combined public snapshot',
    intro: [
      'The Profile Picture Viewer is for the image alone. The Follower Counter is for the audience label. This page sits in between: one lookup that gathers the public identity block Instagram shows at the top of a profile.',
      'You still only see what Instagram exposes without a login. Recent posts, Stories, Highlights, and private bios are out of scope. If a field is missing on the public page, it stays missing here.',
    ],
    howHeading: 'How the snapshot is built',
    how: [
      'NovaLikes requests the public profile and maps the published photo, names, biography, and count labels into a simple summary. Counts such as 104M or 872K stay abbreviated when Instagram writes them that way.',
      'When a public photo is included, you can open it full size. A link back to Instagram is provided so you can confirm the same account on the platform itself.',
    ],
    howToUseHeading: 'How to view a public profile',
    howToUse: [
      'Enter a public username or profile URL.',
      'Choose View profile.',
      'Review photo, name, bio, and the Followers / Following / Posts row. Open Instagram or the full-size photo if those actions appear.',
    ],
    supportedHeading: 'What you can enter',
    supported: [
      'Usernames, with or without @',
      'instagram.com/{username} URLs, including tracking parameters',
      'Paths such as /{username}/reels that still identify the same public account',
    ],
    notesHeading: 'What this viewer does not include',
    notes: [
      'Private profiles cannot be viewed. This tool does not bypass account protections.',
      'It does not list posts, Stories, or Highlights.',
      'If you only need the photo, the Profile Picture Viewer is the shorter path.',
    ],
    relatedHeading: 'Other Instagram tools',
    faqHeading: 'Questions',
    faqs: [
      {
        id: 'igvwr-what',
        question: 'What information can the Instagram Profile Viewer show?',
        answer:
          'The public profile photo, display name, username, biography, and published Followers, Following, and Posts labels when Instagram includes them.',
      },
      {
        id: 'igvwr-private',
        question: 'Can I view a private Instagram profile?',
        answer: 'No. Only public profiles that Instagram already exposes can be checked.',
      },
      {
        id: 'igvwr-counts',
        question: 'Are the follower numbers exact?',
        answer:
          'They match the labels Instagram publishes. Large accounts may appear as 104M. That is not converted into a fake exact total.',
      },
      {
        id: 'igvwr-photo',
        question: 'What is the difference between the Profile Viewer and Profile Picture Viewer?',
        answer:
          'This page shows the public identity snapshot. The [Instagram Profile Picture Viewer](/tools/instagram-profile-picture-viewer) is only for viewing or downloading the public photo.',
      },
    ],
  },
  'instagram-video-downloader': {
    eyebrow: 'Instagram tool',
    h1: 'Instagram Video & Reels Downloader',
    lead: 'Paste a public Instagram Reel or video post URL. NovaLikes checks the public page and offers a file only when Instagram includes one. Many public posts currently do not. That is Limited availability — not a broken tool, and not a fake download.',
    inputLabel: 'Public Instagram Reel or video URL',
    helperText: 'A file is offered only if Instagram includes it on the public page.',
    processingLabel: 'Checking the public Instagram page…',
    resetLabel: 'Try Another URL',
    limitedNotice:
      'Instagram may not expose a downloadable media file for every public post or Reel. NovaLikes only returns a file when one is publicly available.',
    introHeading: 'A public-page check, not a promised download',
    intro: [
      'Instagram often renders Reels in a player that never hands a video file to an unauthenticated visitor. This tool still performs the check: if a public media URL is present, you can download it. If it is not, you see a clear message.',
      'Limited availability means we refuse to invent a file. It does not mean the form is offline. Stories, private posts, and login-only media stay out of reach.',
    ],
    howHeading: 'What happens after you paste a URL',
    how: [
      'NovaLikes validates that the link is a public Instagram Reel, post, or IGTV-style video URL, then requests that page from our servers. A download button appears only when a media file is actually exposed.',
      'Quality names such as HD appear only if Instagram reports them. We do not relabel an unlabeled file as HD.',
    ],
    howToUseHeading: 'How to check a Reel or video post',
    howToUse: [
      'Copy a public Reel or video post URL from Instagram.',
      'Paste it above and choose Check video.',
      'Download the file if one is listed. If Instagram did not include media, read the message and try another public URL.',
    ],
    supportedHeading: 'Supported public URLs',
    supported: [
      'instagram.com/reel/{code} and /reels/{code}',
      'instagram.com/p/{code} video posts',
      'instagram.com/tv/{code}',
    ],
    notesHeading: 'Limits you should expect',
    notes: [
      'Stories, private accounts, and login-only posts are not retrieved.',
      'This page does not ask for an Instagram password.',
      'For profile photos, use the Instagram Profile Picture Viewer instead of a Reel URL.',
    ],
    relatedHeading: 'Other Instagram tools',
    faqHeading: 'Reel and video questions',
    faqs: [
      {
        id: 'igv-works',
        question: 'Will every public Reel download?',
        answer:
          'No. A file is returned only when Instagram exposes one on the public page. Many public Reels currently do not.',
      },
      {
        id: 'igv-private',
        question: 'Does this work on private posts?',
        answer: 'No. Private, restricted, or removed posts are not retrieved.',
      },
      {
        id: 'igv-login',
        question: 'Do I need an Instagram login?',
        answer:
          'No. If Instagram hides the file from public requests, the tool cannot add it back.',
      },
      {
        id: 'igv-profile',
        question: 'I only need a profile photo.',
        answer: 'Use the [Instagram Profile Picture Viewer](/tools/instagram-profile-picture-viewer).',
      },
    ],
  },
  'tiktok-video-downloader': {
    eyebrow: 'TikTok tool',
    h1: 'TikTok Video Downloader',
    lead: 'Paste a public TikTok video link, including common share URLs. NovaLikes retrieves the file TikTok already exposes on that page. If more than one quality is listed, those labels come from TikTok — we do not invent HD, and we do not strip watermarks.',
    inputLabel: 'Public TikTok video URL',
    helperText: 'Watch pages and share links such as vm.tiktok.com or vt.tiktok.com are accepted.',
    processingLabel: 'Fetching the public TikTok page…',
    resetLabel: 'Try Another URL',
    introHeading: 'Download the public file TikTok already serves',
    intro: [
      'Creators and viewers often need a copy of a public video they can already watch without logging in. This downloader requests that public page from NovaLikes servers and, when TikTok includes a video file, offers it as a download.',
      'Share links are resolved when they point at a public watch page. Photo posts, private videos, and removed items are not supported. Any watermark or region limit on the public file still applies.',
    ],
    howHeading: 'How retrieval works',
    how: [
      'After you paste a URL, NovaLikes checks that it is a TikTok video or share host we allow, follows public redirects, and reads the media TikTok attached to the page.',
      'If TikTok reports more than one quality, each option is listed with the label TikTok provided. Unlabeled files are offered as a plain download, not as a guessed resolution.',
    ],
    howToUseHeading: 'How to retrieve a TikTok video',
    howToUse: [
      'Copy the video URL from TikTok, including a short share link if that is what you have.',
      'Paste it above and choose Retrieve video.',
      'Download the file, or pick a listed quality when TikTok reports more than one.',
    ],
    supportedHeading: 'Supported links',
    supported: [
      'tiktok.com/@user/video/{id}',
      'm.tiktok.com/v/{id} mobile links',
      'vm.tiktok.com, vt.tiktok.com, and tiktok.com/t/ share links that resolve to a public video',
    ],
    notesHeading: 'Public-media limits',
    notes: [
      'Photo posts, private videos, and removed videos are not supported.',
      'TikTok may briefly limit repeated requests.',
      'This page does not claim to strip watermarks. Whatever TikTok publishes is what you receive.',
    ],
    relatedHeading: 'Other TikTok tools',
    faqHeading: 'TikTok video questions',
    faqs: [
      {
        id: 'tt-public',
        question: 'Does this work on every TikTok video?',
        answer: 'No. Only public videos. Private, deleted, or temporarily blocked videos return an error.',
      },
      {
        id: 'tt-short',
        question: 'Can I paste a short share link?',
        answer: 'Yes. Public vm.tiktok.com and similar share hosts are resolved when they point to a TikTok video.',
      },
      {
        id: 'tt-quality',
        question: 'What do the quality labels mean?',
        answer: 'Labels such as 720p appear only when TikTok reports that quality. We do not invent HD or SD names.',
      },
      {
        id: 'tt-login',
        question: 'Do I need a TikTok account?',
        answer: 'No. If TikTok does not expose the public file, the tool cannot retrieve it.',
      },
    ],
  },
  'tiktok-profile-picture-downloader': {
    eyebrow: 'TikTok tool',
    h1: 'TikTok Profile Picture Downloader',
    lead: 'TikTok keeps avatars small inside the app. Enter a public username, @username, or profile URL and NovaLikes will show the profile photo TikTok already publishes — large enough to inspect, with View Full Size and Download Image when the image is public.',
    inputLabel: 'TikTok username or profile URL',
    helperText: 'Usernames work with or without @. Profile URLs are fine too.',
    processingLabel: 'Loading the public TikTok profile photo…',
    resetLabel: 'Search Another Profile',
    introHeading: 'The public avatar, nothing else',
    intro: [
      'This page is only for the picture TikTok places on a public profile. It does not count followers, list videos, or open private accounts. If you need a video file, use the TikTok Video Downloader instead.',
      'A username, an @handle, or a tiktok.com/@user link all identify the same public account. Video URLs are rejected here so the lookup stays on the profile photo.',
    ],
    howHeading: 'How the photo is retrieved',
    how: [
      'NovaLikes requests the public TikTok profile from our servers and reads the image TikTok already publishes for crawlers and visitors. When that image is present, it is shown here and offered through a signed NovaLikes download.',
      'Display names appear when TikTok includes them in the public title. Follower statistics are intentionally omitted.',
    ],
    howToUseHeading: 'How to download a TikTok profile photo',
    howToUse: [
      'Enter a username such as nba, or paste a tiktok.com/@username link.',
      'Choose View photo.',
      'Open View Full Size or Download Image when the public photo is available.',
    ],
    supportedHeading: 'What you can enter',
    supported: [
      'Usernames, with or without @',
      'tiktok.com/@username profile URLs',
    ],
    notesHeading: 'Public-account limits',
    notes: [
      'Private or login-only profiles return an error.',
      'TikTok video URLs belong on the video downloader, not this form.',
      'The file is the avatar TikTok publishes. We do not relabel it as HD.',
    ],
    relatedHeading: 'Other TikTok tools',
    faqHeading: 'TikTok photo questions',
    faqs: [
      {
        id: 'ttp-public',
        question: 'Does this work on private TikTok accounts?',
        answer: 'No. Only the publicly published profile image is requested.',
      },
      {
        id: 'ttp-video',
        question: 'Can I download a TikTok video here?',
        answer: 'No. Use the [TikTok Video Downloader](/tools/tiktok-video-downloader) for public videos.',
      },
      {
        id: 'ttp-login',
        question: 'Do I need to log in to TikTok?',
        answer: 'No. If TikTok does not expose the public photo, the tool returns an error.',
      },
      {
        id: 'ttp-input',
        question: 'Does @username work, or do I need the full URL?',
        answer: 'Either works. You can type nba, @nba, or https://www.tiktok.com/@nba.',
      },
    ],
  },
  'facebook-video-downloader': {
    eyebrow: 'Facebook tool',
    h1: 'Facebook Video Downloader',
    lead: 'Paste a public Facebook watch or /videos/ URL. NovaLikes offers HD or SD only when Facebook exposes those files. Reel links belong on the Reels downloader so each form stays aligned with the URL type Facebook uses.',
    inputLabel: 'Public Facebook video URL',
    helperText: 'Use a watch or /videos/ link. Reel URLs belong on the Reels downloader.',
    processingLabel: 'Checking the public Facebook video…',
    resetLabel: 'Try Another URL',
    introHeading: 'Public Facebook videos, not Reels',
    intro: [
      'Facebook still publishes many long-form videos on watch pages and page /videos/ paths. This downloader is for those URLs. When Facebook includes an HD source, an SD source, or both, those options appear with Facebook’s own labels.',
      'Friends-only clips, login walls, and removed videos cannot be retrieved. A Reel-style /reel/ link is pointed to the Facebook Reels Downloader instead of being forced through this form.',
    ],
    howHeading: 'How Facebook media is offered',
    how: [
      'NovaLikes checks that the URL is a public Facebook video (or an fb.watch link that can resolve to one), then reads the media Facebook attached for public playback.',
      'If Facebook lists HD and SD, you get separate download actions. If it lists only one file, you get that file — not a second invented quality.',
    ],
    howToUseHeading: 'How to retrieve a Facebook video',
    howToUse: [
      'Copy the public video URL from Facebook.',
      'Paste it above and retrieve the video.',
      'Choose a listed quality when Facebook exposes more than one file.',
    ],
    supportedHeading: 'Supported video links',
    supported: [
      'facebook.com/{page}/videos/{id}',
      'facebook.com/watch/?v={id}',
      'facebook.com/share/v/ and facebook.com/video.php?v= links',
      'fb.watch links that resolve to public video media',
    ],
    notesHeading: 'When a download will not appear',
    notes: [
      'Friends-only, login-required, and removed videos cannot be retrieved.',
      'Quality buttons appear only when Facebook labels those sources.',
      'Use the Reels downloader for /reel/ and Reel share URLs.',
    ],
    relatedHeading: 'Other Facebook tools',
    faqHeading: 'Facebook video questions',
    faqs: [
      {
        id: 'fbv-public',
        question: 'Which Facebook videos work?',
        answer: 'Public video URLs where Facebook still exposes a media file.',
      },
      {
        id: 'fbv-reel',
        question: 'Can I paste a Reel here?',
        answer:
          'Use the [Facebook Reels Downloader](/tools/facebook-reels-downloader) for Reel URLs. This page is for watch and /videos/ links.',
      },
      {
        id: 'fbv-hd',
        question: 'Will I always see HD?',
        answer: 'Only if Facebook exposes an HD source. Some public videos only include SD.',
      },
      {
        id: 'fbv-login',
        question: 'Is a Facebook login required?',
        answer: 'No. The tool never asks for Facebook credentials.',
      },
    ],
  },
  'facebook-reels-downloader': {
    eyebrow: 'Facebook tool',
    h1: 'Facebook Reels Downloader',
    lead: 'Paste a public Facebook Reel URL. NovaLikes returns the media Facebook makes available for that Reel — including HD or SD when Facebook labels those files. Standard watch or /videos/ links belong on the Facebook Video Downloader.',
    inputLabel: 'Public Facebook Reel URL',
    helperText: 'Use a /reel/ or Reel share link. Standard watch URLs belong on the video downloader.',
    processingLabel: 'Checking the public Facebook Reel…',
    resetLabel: 'Try Another URL',
    introHeading: 'Reels are a different Facebook URL',
    intro: [
      'Facebook Reels use /reel/ paths and Reel share links, not the older watch player. This page exists so those URLs are handled on their own terms. If Facebook exposes a public media file, you can download it here.',
      'A regular page video still belongs on the Facebook Video Downloader. Sending the wrong link type returns a pointer to the matching tool rather than a silent failure.',
    ],
    howHeading: 'How a Reel is retrieved',
    how: [
      'NovaLikes confirms the URL is a public Reel or a share/fb.watch link that can resolve to Reel media, then reads the file Facebook attached for public playback.',
      'Available quality options are listed only when Facebook reports them. Private, deleted, or login-only Reels return an error.',
    ],
    howToUseHeading: 'How to retrieve a Facebook Reel',
    howToUse: [
      'Copy the Reel link from Facebook.',
      'Paste it above and retrieve the Reel.',
      'Download the listed file, or pick HD/SD when Facebook exposes both.',
    ],
    supportedHeading: 'Supported Reel links',
    supported: [
      'facebook.com/reel/{id} and /reels/{id}',
      'facebook.com/share/r/ Reel share links',
      'fb.watch links that resolve to public Reel media',
    ],
    notesHeading: 'Reel-specific limits',
    notes: [
      'Watch or /videos/ links belong on the Facebook Video Downloader.',
      'Quality labels appear only when Facebook reports HD or SD.',
      'Private Reels are not retrieved.',
    ],
    relatedHeading: 'Other Facebook tools',
    faqHeading: 'Facebook Reel questions',
    faqs: [
      {
        id: 'fbr-public',
        question: 'Do private Reels work?',
        answer: 'No. Only public Reels with an exposed media file can be retrieved.',
      },
      {
        id: 'fbr-video',
        question: 'What about a regular Facebook video URL?',
        answer:
          'Use the [Facebook Video Downloader](/tools/facebook-video-downloader) for watch or /videos/ links.',
      },
      {
        id: 'fbr-quality',
        question: 'Will qualities differ between Reels?',
        answer:
          'They can. Some Reels include HD and SD; others include one unlabeled file. Labels appear only when Facebook provides them.',
      },
      {
        id: 'fbr-login',
        question: 'Is a Facebook account required?',
        answer: 'No. The tool never asks for Facebook credentials.',
      },
    ],
  },
};
