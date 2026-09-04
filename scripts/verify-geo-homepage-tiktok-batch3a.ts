import { readFileSync } from 'node:fs';

type Point = { title: string; text: string };
type Card = {
  cardBlurb: string;
  title: string;
  intro: string;
  points: Point[];
};

const TT_IDS = ['tt-followers', 'tt-likes', 'tt-views'] as const;
const MARKETS = ['ca', 'au', 'us', 'uk'] as const;

const OLD_INTROS = [
  'Buy TikTok followers when you want to increase the follower count shown on your profile.',
  'Buy TikTok likes for a public video when you want to add more likes to that specific post.',
  'Buy TikTok views for a public video when you want to increase the number of views shown on that post.',
];

const EXPECTED: Record<(typeof MARKETS)[number], Record<(typeof TT_IDS)[number], Card>> = {
  ca: {
    'tt-followers': {
      cardBlurb:
        'TikTok follower packages for public profiles used by Canadian creators, businesses and brands.',
      title: 'Build a Stronger Visible Audience Around Your TikTok Profile',
      intro:
        'Choose TikTok Followers when the audience number displayed on your public profile is the metric you want to strengthen. Canadian creators, businesses and brands can use a follower package around an account that already has a clear identity, useful recent videos and a reason for visitors to keep exploring.',
      points: [
        {
          title: 'Profile-Level Growth',
          text: 'Followers increase the audience count shown on the public TikTok profile submitted with your order.',
        },
        {
          title: 'Support a Clear Account Direction',
          text: 'Use follower growth around a profile with a recognisable niche, business purpose or consistent content theme.',
        },
        {
          title: 'Choose for the Profile You Have',
          text: 'Consider your current follower count and account activity before selecting the quantity that fits your profile.',
        },
        {
          title: 'Keep Video Metrics Separate',
          text: 'Use TikTok Likes or Views when an individual video, rather than the overall profile audience, is your priority.',
        },
      ],
    },
    'tt-likes': {
      cardBlurb: 'TikTok Like packages for eligible public videos from Canadian profiles.',
      title: 'Put More Visible Likes Behind Priority TikTok Videos',
      intro:
        'Choose TikTok Likes when one public video deserves more visible engagement. That could be a launch, product demonstration, creator collaboration, business update or another TikTok that represents the account well. The Likes package applies to the selected video rather than your overall follower count.',
      points: [
        {
          title: 'Choose the Video First',
          text: 'Start with the exact public TikTok that matters to your current content or campaign goal.',
        },
        {
          title: 'Video-Level Engagement',
          text: 'Likes apply to the selected TikTok video and do not automatically change profile Followers.',
        },
        {
          title: 'Support Important Content',
          text: 'Use Likes around videos that introduce a product, message, collaboration or useful piece of content.',
        },
        {
          title: 'Views Are a Separate Metric',
          text: 'Choose TikTok Views instead when the displayed view count is the number you want to increase.',
        },
      ],
    },
    'tt-views': {
      cardBlurb: 'TikTok View packages for eligible public videos from Canadian accounts.',
      title: 'Give Selected TikTok Videos More Visible Views',
      intro:
        'Choose TikTok Views when the displayed view count on a particular public video is your priority. Focus on content that represents the profile well, such as a useful explainer, product video, campaign clip, creator post or business update, and select the package around that individual TikTok.',
      points: [
        {
          title: 'Built for Individual Videos',
          text: 'Views are applied to the eligible public TikTok video submitted with the order.',
        },
        {
          title: 'Focus on Video Visibility',
          text: 'This service changes the visible video view count rather than the follower total on your profile.',
        },
        {
          title: 'Prioritise Stronger Content',
          text: 'Choose videos that still make sense when a new viewer watches them and then visits the profile.',
        },
        {
          title: 'Likes and Followers Stay Separate',
          text: 'Use TikTok Likes for visible Like count or Followers when your goal is the profile-level audience number.',
        },
      ],
    },
  },
  au: {
    'tt-followers': {
      cardBlurb: 'TikTok follower packages for eligible public profiles in Australia.',
      title: 'Strengthen the Audience Number Around Your TikTok Profile',
      intro:
        'Choose TikTok Followers when you want to work on the visible audience size of a public profile. Australian creators and businesses can use follower growth alongside an account that already communicates what it is about through its bio, pinned videos and recent content.',
      points: [
        {
          title: 'Audience Size at Profile Level',
          text: 'The follower package applies to the public TikTok account rather than an individual video.',
        },
        {
          title: 'Useful for Growing Profiles',
          text: 'Support a creator, business or brand account while you continue developing the videos behind the profile.',
        },
        {
          title: 'Match Growth to Current Activity',
          text: "Choose a quantity that makes sense for the profile's existing audience and how actively you are publishing.",
        },
        {
          title: 'Content Engagement Is Separate',
          text: 'TikTok Likes and Views are available when you want to focus on a specific piece of video content.',
        },
      ],
    },
    'tt-likes': {
      cardBlurb: 'Like packages for eligible public TikTok videos from Australian profiles.',
      title: 'Support the TikTok Videos You Want People to Notice',
      intro:
        'Choose TikTok Likes when a particular public video is more important than the rest of the feed. You might be supporting a product launch, useful tutorial, creator partnership, project showcase or campaign video. Add visible Likes to that selected TikTok while keeping the wider account strategy separate.',
      points: [
        {
          title: 'For Priority TikToks',
          text: 'Select the individual public video that best represents the content you want to support.',
        },
        {
          title: 'Likes Stay With the Video',
          text: 'The package changes the Like count on that TikTok rather than your overall profile follower number.',
        },
        {
          title: 'Use Around Strong Content',
          text: 'Put engagement behind videos with a clear subject, useful message or role in a wider campaign.',
        },
        {
          title: 'Choose the Metric Deliberately',
          text: 'Use Views when video plays are the goal or Followers when you want to work on profile audience size.',
        },
      ],
    },
    'tt-views': {
      cardBlurb: 'View packages for eligible public TikTok videos from Australian accounts.',
      title: 'Put More Visible Views Behind Your Stronger TikToks',
      intro:
        'Choose TikTok Views when video visibility is the metric you want to work on. Pick an eligible public TikTok that still represents the account well, then select a view quantity based on that piece of content rather than treating every video on the profile the same way.',
      points: [
        {
          title: 'Video-Specific Views',
          text: 'The selected package applies to the public TikTok video supplied with your order.',
        },
        {
          title: 'Useful for Priority Content',
          text: 'Consider product demonstrations, explainers, campaign videos and other TikToks with a clear purpose.',
        },
        {
          title: 'Keep the Profile Consistent',
          text: 'A stronger view number has more context when the video fits the content visitors find elsewhere on the account.',
        },
        {
          title: 'Other TikTok Metrics Are Separate',
          text: 'Views do not automatically add Likes or Followers, so choose each service according to the metric you need.',
        },
      ],
    },
  },
  us: {
    'tt-followers': {
      cardBlurb: 'TikTok follower packages for eligible public profiles across the United States.',
      title: 'Build Profile Audience Around a Clear TikTok Identity',
      intro:
        'Choose TikTok Followers when the visible audience count on your public profile is the number you want to strengthen. US creators, ecommerce brands, local companies and larger businesses can use a follower package while continuing to build a clear niche, recent video library and recognisable account identity.',
      points: [
        {
          title: 'Profile Audience Growth',
          text: 'Followers apply to the public TikTok profile submitted with the order, not to one individual video.',
        },
        {
          title: 'Support a Defined Niche',
          text: 'The follower number has more context when visitors can quickly understand what the creator or business publishes.',
        },
        {
          title: 'Scale According to the Account',
          text: 'Review your existing audience and posting activity before deciding which follower quantity suits the profile.',
        },
        {
          title: 'Video Engagement Uses Different Services',
          text: 'Choose TikTok Likes or Views when you want to work on the visible metrics of a specific TikTok.',
        },
      ],
    },
    'tt-likes': {
      cardBlurb: 'TikTok Like packages for eligible public videos from US profiles.',
      title: 'Add Visible Likes to TikToks That Matter to the Campaign',
      intro:
        'Choose TikTok Likes when one piece of video content has a specific job to do. US creators and businesses may prioritise a launch, product demonstration, educational clip, campaign creative or collaboration. Add Likes to that selected public TikTok while treating profile Followers and video Views as separate metrics.',
      points: [
        {
          title: 'Focus on High-Priority Videos',
          text: 'Start with the TikTok that carries the message, offer or content you most want visitors to notice.',
        },
        {
          title: 'Likes Apply to the Post',
          text: 'The package increases visible Likes on the selected video rather than changing the overall profile audience.',
        },
        {
          title: 'Connect Likes to a Content Goal',
          text: 'Use the service around a clear launch, campaign, tutorial, demonstration or creator collaboration.',
        },
        {
          title: 'Do Not Mix Up the Metrics',
          text: 'Views measure a different video number, while Followers apply to the TikTok profile itself.',
        },
      ],
    },
    'tt-views': {
      cardBlurb: 'TikTok View packages for eligible public videos from US accounts.',
      title: 'Increase Visible Views on the TikToks You Are Prioritising',
      intro:
        'Choose TikTok Views when you want to strengthen the displayed view count of a specific public video. A US creator or business may use Views around a campaign asset, product clip, explainer, portfolio example or evergreen video that continues to represent the account after publication.',
      points: [
        {
          title: 'Choose One Eligible Video',
          text: 'Submit the exact public TikTok that should receive the selected Views package.',
        },
        {
          title: 'Work on the View Count',
          text: "This service focuses on the video's visible Views rather than profile Followers or video Likes.",
        },
        {
          title: 'Use Views Where the Content Has a Job',
          text: 'Prioritise videos tied to a campaign, useful message, product, service or strong piece of evergreen content.',
        },
        {
          title: 'Keep Wider Performance Separate',
          text: 'A larger visible view count should not be treated as a guarantee of Likes, Followers or wider organic distribution.',
        },
      ],
    },
  },
  uk: {
    'tt-followers': {
      cardBlurb:
        'TikTok follower packages for eligible public profiles used by UK creators and businesses.',
      title: 'Build a Stronger Audience Around Your Public TikTok Profile',
      intro:
        'Choose TikTok Followers when your profile-level audience number is the metric you want to strengthen. UK creators, online retailers, local businesses and brands can use follower growth around an account that already makes its subject, business or content direction easy to recognise.',
      points: [
        {
          title: 'Followers Work at Profile Level',
          text: 'The selected package increases the follower count around the eligible public TikTok account.',
        },
        {
          title: 'Give the Number Context',
          text: 'Keep your bio, pinned TikToks and recent videos aligned so new visitors understand the account behind the audience figure.',
        },
        {
          title: 'Choose an Appropriate Increase',
          text: 'Consider the current profile size and publishing activity before selecting your follower quantity.',
        },
        {
          title: 'Use Video Services for Individual TikToks',
          text: 'TikTok Likes and Views are separate options when a particular video is the content you want to support.',
        },
      ],
    },
    'tt-likes': {
      cardBlurb: 'Like packages for eligible public TikTok videos from UK accounts.',
      title: 'Add Visible Likes Around TikTok Content With a Clear Purpose',
      intro:
        'Choose TikTok Likes when you want more visible engagement on one eligible public video. UK creators and businesses can focus on content such as launches, demonstrations, announcements, collaborations and useful evergreen TikToks instead of treating every upload as equally important.',
      points: [
        {
          title: 'Start With the Content',
          text: 'Choose a public TikTok with a clear subject and a reason for people to pay attention.',
        },
        {
          title: 'Increase the Visible Like Count',
          text: 'Likes apply to the selected video rather than the follower number displayed on your TikTok profile.',
        },
        {
          title: 'Use Likes Selectively',
          text: 'Support important videos that represent your creator profile, business, campaign, product or service well.',
        },
        {
          title: 'Know When Views Fit Better',
          text: 'Choose TikTok Views when the displayed view total, rather than Likes, is the metric you want to change.',
        },
      ],
    },
    'tt-views': {
      cardBlurb: 'View packages for eligible public TikTok videos from UK profiles.',
      title: 'Give Important TikTok Videos More Visible Attention',
      intro:
        'Choose TikTok Views when a particular public video deserves more visible plays. Focus on content that remains useful to the profile, such as a product demonstration, business introduction, campaign video, creator clip or evergreen explainer, and choose the package around that individual TikTok.',
      points: [
        {
          title: 'Views Apply to One Video',
          text: 'Use the direct public TikTok URL for the eligible video you want to support.',
        },
        {
          title: 'Prioritise Useful Content',
          text: 'Put Views behind TikToks that still make sense to someone discovering the account for the first time.',
        },
        {
          title: 'Keep the Wider Profile Relevant',
          text: 'The visible number has more context when recent videos and profile information support the same content direction.',
        },
        {
          title: 'Followers and Likes Remain Separate',
          text: 'Choose another TikTok service when profile audience or visible Likes are the metrics you actually want to work on.',
        },
      ],
    },
  },
};

type Service = {
  id: string;
  platform: string;
  slug: string;
  href: string;
  name: string;
  commercialLabel: string;
  cardBlurb: string;
  title: string;
  intro: string;
  points: Point[];
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  tone: string;
};

function loadServices(market: (typeof MARKETS)[number]): Service[] {
  const raw = JSON.parse(readFileSync(`content/markets/${market}/homepage.json`, 'utf8')) as {
    services: Service[];
  };
  return raw.services;
}

function compareCard(actual: Service, expected: Card, label: string): boolean {
  let ok = true;
  if (actual.cardBlurb !== expected.cardBlurb) {
    console.error(`FAIL ${label} cardBlurb`);
    ok = false;
  }
  if (actual.title !== expected.title) {
    console.error(`FAIL ${label} title`);
    ok = false;
  }
  if (actual.intro !== expected.intro) {
    console.error(`FAIL ${label} intro`);
    ok = false;
  }
  if (actual.points.length !== 4) {
    console.error(`FAIL ${label} points count`);
    ok = false;
  }
  for (let i = 0; i < 4; i++) {
    if (actual.points[i]?.title !== expected.points[i]?.title) {
      console.error(`FAIL ${label} point[${i}] title`);
      ok = false;
    }
    if (actual.points[i]?.text !== expected.points[i]?.text) {
      console.error(`FAIL ${label} point[${i}] text`);
      ok = false;
    }
  }
  if (ok) console.log(`OK ${label}`);
  return ok;
}

let pass = 0;
console.log('=== Exact copy verification (12 cards) ===');
for (const market of MARKETS) {
  const services = loadServices(market);
  for (const id of TT_IDS) {
    const svc = services.find((s) => s.id === id);
    if (!svc) {
      console.error(`FAIL /${market}/ missing ${id}`);
      continue;
    }
    if (compareCard(svc, EXPECTED[market][id], `/${market}/ ${id}`)) pass++;
  }
}

console.log('\n=== Old shared intros in market files ===');
let oldRemoved = true;
for (const market of MARKETS) {
  const text = readFileSync(`content/markets/${market}/homepage.json`, 'utf8');
  for (const old of OLD_INTROS) {
    if (text.includes(old)) {
      console.error(`FAIL old intro still in ${market}: ${old.slice(0, 50)}...`);
      oldRemoved = false;
    }
  }
}
console.log(oldRemoved ? 'YES — old shared TikTok market-card copy removed' : 'NO');

console.log('\n=== Shared sentences across 12 rewritten cards ===');
const allText: string[] = [];
for (const market of MARKETS) {
  for (const id of TT_IDS) {
    const svc = loadServices(market).find((s) => s.id === id)!;
    allText.push(svc.intro, ...svc.points.map((p) => p.text));
  }
}
const sentences = allText.flatMap((t) => t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 20));
const counts = new Map<string, number>();
for (const s of sentences) counts.set(s, (counts.get(s) ?? 0) + 1);
const shared = [...counts.entries()].filter(([, n]) => n > 1);
if (shared.length === 0) {
  console.log('None — no exact shared sentences among the 12 cards');
} else {
  for (const [s, n] of shared) console.log(`SHARED (${n}x): ${s}`);
}

console.log(`\n${pass}/12 exact-copy checks passed`);
process.exit(pass === 12 && oldRemoved ? 0 : 1);
