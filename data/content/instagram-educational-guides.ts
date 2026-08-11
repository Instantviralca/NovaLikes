import { FACEBOOK_FOLLOWERS_EDUCATIONAL_GUIDE } from '@/data/content/facebook-followers-educational-guide';
import { FACEBOOK_POST_LIKES_EDUCATIONAL_GUIDE } from '@/data/content/facebook-post-likes-educational-guide';
import { YOUTUBE_SUBSCRIBERS_EDUCATIONAL_GUIDE } from '@/data/content/youtube-educational-guide';
import { YOUTUBE_VIEWS_EDUCATIONAL_GUIDE } from '@/data/content/youtube-views-educational-guide';

/**
 * Concise educational guides for Instagram service pages (≈500–700 words each).
 * Layout blocks differ by service to avoid repeated card patterns.
 */

export type EducationalIllustrationId =
  | 'followers-growth'
  | 'followers-authority'
  | 'likes-engagement'
  | 'likes-analytics'
  | 'views-reel'
  | 'views-watch-time'
  | 'comments-conversation'
  | 'comments-trust'
  | 'tiktok-followers-creator'
  | 'tiktok-likes-analytics'
  | 'tiktok-views-analytics'
  | 'youtube-channel-planning'
  | 'youtube-views-analytics'
  | 'facebook-followers-analytics'
  | 'facebook-post-likes-analytics';

export type EducationalGuideLink = {
  label: string;
  href: string;
};

export type EducationalGuideBlock =
  | { type: 'intro'; paragraphs: string[] }
  | {
      type: 'split';
      id: string;
      heading: string;
      paragraphs: string[];
      bullets?: string[];
      illustration?: EducationalIllustrationId;
      reverse?: boolean;
    }
  | {
      type: 'prose-split';
      id: string;
      illustration: EducationalIllustrationId;
      intro?: string;
      sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
    }
  | {
      type: 'prose';
      id: string;
      heading: string;
      paragraphs: string[];
    }
  | { type: 'callout'; id: string; title: string; body: string; eyebrow?: string }
  | {
      type: 'cards';
      id: string;
      heading: string;
      intro?: string;
      items: Array<{ id: string; title: string; description: string; icon: string }>;
    }
  | {
      type: 'checklist';
      id: string;
      heading: string;
      intro?: string;
      items: string[];
    }
  | {
      type: 'mistakes';
      id: string;
      heading: string;
      items: Array<{ id: string; title: string; description: string }>;
    }
  | {
      type: 'timeline';
      id: string;
      heading: string;
      steps: Array<{ id: string; title: string; description: string }>;
    }
  | {
      type: 'stats';
      id: string;
      heading: string;
      items: Array<{ id: string; value: string; label: string; detail: string }>;
    }
  | {
      type: 'comparison';
      id: string;
      heading: string;
      intro?: string;
      left: { title: string; points: string[] };
      right: { title: string; points: string[] };
    }
  | {
      type: 'tips-grid';
      id: string;
      heading: string;
      intro?: string;
      illustration?: EducationalIllustrationId;
      items: Array<{ id: string; title: string; description: string; icon?: string }>;
    }
  | {
      type: 'conversation';
      id: string;
      heading: string;
      intro?: string;
      items: Array<{ id: string; name: string; text: string }>;
    }
  | {
      type: 'links';
      id: string;
      heading: string;
      intro?: string;
      links: EducationalGuideLink[];
    };

export type EducationalGuideContent = {
  id: string;
  serviceSlug: string;
  title: string;
  description: string;
  blocks: EducationalGuideBlock[];
};

export const INSTAGRAM_FOLLOWERS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'ig-followers-package-guide',
  serviceSlug: 'buy-instagram-followers',
  title: 'How to Choose a Suitable Package',
  description:
    'A package should fit the current condition of your account rather than being selected only because it offers the largest quantity. Consider your existing audience, recent activity and immediate campaign goal before placing an order.',
  blocks: [
    {
      type: 'prose-split',
      id: 'choose-guidance',
      illustration: 'followers-growth',
      sections: [
        {
          id: 'account-size',
          heading: 'Start With Your Current Account Size',
          paragraphs: [
            'Smaller or newer profiles may be better suited to a lighter package. Established accounts with an active posting history can consider a larger option that feels more consistent with their current presentation.',
          ],
        },
        {
          id: 'match-goal',
          heading: 'Match the Package to a Specific Goal',
          paragraphs: [
            'Decide whether the order supports a new profile, an upcoming promotion, a product launch or ongoing account activity. A clear goal makes package selection easier and reduces unnecessary ordering.',
          ],
        },
        {
          id: 'publishing',
          heading: 'Consider Your Publishing Activity',
          paragraphs: [
            'Your profile should have a complete bio, recent content and a clear purpose. Package size alone cannot replace regular posts, useful content or communication with your audience.',
          ],
        },
        {
          id: 'review-delivery',
          heading: 'Review Delivery Before Payment',
          paragraphs: [
            'Check the delivery information, package quantity, username and any eligibility conditions before checkout. Contact support when an order detail is unclear.',
          ],
        },
      ],
    },
    {
      type: 'checklist',
      id: 'before-checkout',
      heading: 'Before You Continue to Checkout',
      intro:
        'Take a moment to confirm the following details. Correct information helps prevent avoidable order delays.',
      items: [
        'Your Instagram account is public during delivery.',
        'The username is entered exactly as it appears on Instagram.',
        'The selected quantity is appropriate for your account size.',
        'Your profile has a clear photo, bio and recent content.',
        'You have reviewed the available delivery information.',
        'You understand that the package supports profile presentation but does not replace organic content or engagement.',
      ],
    },
    {
      type: 'timeline',
      id: 'decision-guide',
      heading: 'Three-Step Decision Guide',
      steps: [
        {
          id: 'purpose',
          title: 'Define the Purpose',
          description:
            'Identify whether the package is for a new account, a brand campaign, a launch or regular profile development.',
        },
        {
          id: 'quantity',
          title: 'Select a Proportionate Quantity',
          description:
            'Choose a package that feels reasonable in relation to your current account size and posting activity.',
        },
        {
          id: 'confirm',
          title: 'Confirm the Order Details',
          description:
            'Review the username, quantity, price, delivery information and checkout details before payment.',
        },
      ],
    },
    {
      type: 'checklist',
      id: 'mistakes',
      heading: 'Common Package Selection Mistakes',
      items: [
        'Selecting a very large quantity for a new or inactive account.',
        'Entering an incorrect or misspelled Instagram username.',
        'Keeping the profile private while delivery is in progress.',
        'Choosing a package without reviewing the delivery information.',
        'Expecting a package to replace regular posting or audience interaction.',
        'Placing duplicate orders before the first order has been completed.',
      ],
    },
    {
      type: 'callout',
      id: 'before-order',
      eyebrow: 'Before you order',
      title: 'Confirm Your Account and Package Details',
      body:
        'Keep your profile public, verify the username and choose a quantity that matches your current account activity. For additional post-level support, you can also compare our [Instagram likes packages](/buy-instagram-likes), [Instagram views packages](/buy-instagram-views) and [Instagram comments packages](/buy-instagram-comments).',
    },
    {
      type: 'links',
      id: 'related',
      heading: 'Related NovaLikes Options',
      links: [
        { label: 'Instagram Likes Packages', href: '/buy-instagram-likes' },
        { label: 'Instagram Views Packages', href: '/buy-instagram-views' },
        { label: 'Instagram Comments Packages', href: '/buy-instagram-comments' },
        { label: 'NovaLikes Homepage', href: '/' },
      ],
    },
  ],
};

export const INSTAGRAM_LIKES_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'ig-likes-engagement-guide',
  serviceSlug: 'buy-instagram-likes',
  title: 'How Instagram Likes Improve Engagement',
  description:
    'How likes shape first impressions and post performance—without confusing them with long-term audience growth.',
  blocks: [
    {
      type: 'intro',
      paragraphs: [
        'Instagram likes are a fast signal that a post earned a reaction. In the first few hours, that counter often decides whether strangers pause or keep scrolling.',
        'Likes support post performance. Followers grow who can see future work. Mixing those goals is how people buy the wrong package.',
        'Treat likes as help for launches, portfolio posts, and clips that already have a clear hook—not as a substitute for the creative.',
        'If you sell to customers, package clarity still matters: public post URL only, visible delivery expectations, and tracking after payment.',
      ],
    },
    {
      type: 'comparison',
      id: 'likes-vs-followers',
      heading: 'Likes vs followers at a glance',
      intro: 'They solve different problems. Choosing by what you need this week beats buying “a bit of everything.”',
      left: {
        title: 'Likes help now',
        points: [
          'Improve how a single post or Reel looks',
          'Support early interaction on launches',
          'Strengthen first impressions when the grid is new',
          'Work best beside captions people can answer',
        ],
      },
      right: {
        title: 'Followers help later',
        points: [
          'Grow who can discover future posts',
          'Build profile-level authority over months',
          'Support creator growth beyond one upload',
          'Pair with a clear bio and pinned proof',
        ],
      },
    },
    {
      type: 'stats',
      id: 'engagement-signals',
      heading: 'What stronger engagement can support',
      items: [
        {
          id: 'interaction',
          value: 'Interaction',
          label: 'Quicker reactions',
          detail:
            'A warmer counter lowers the bar for someone to save, share, or leave a first comment.',
        },
        {
          id: 'reach',
          value: 'Reach',
          label: 'More notice among followers',
          detail:
            'Early activity can keep a post visible longer inside the audience you already have.',
        },
        {
          id: 'impression',
          value: 'Trust',
          label: 'Cleaner first glance',
          detail:
            'Launch creative feels less abandoned when interest already shows on the frame.',
        },
      ],
    },
    {
      type: 'checklist',
      id: 'after-order',
      heading: 'Checklist after you purchase likes',
      intro: 'Delivery works best when the post stays usable and you keep engaging real replies.',
      items: [
        'Keep the post or Reel public while delivery runs',
        'Reply to genuine comments so engagement does not stop at a counter',
        'Review saves and profile visits—not only the like total',
        'Note which hooks earned honest replies for the next upload',
      ],
    },
    {
      type: 'split',
      id: 'natural-tips',
      heading: 'Practical tips that still matter',
      illustration: 'likes-analytics',
      reverse: true,
      paragraphs: [
        'Lead captions with one concrete hook. Ask a specific question instead of “thoughts?” Formats that earn time spent—carousels or tight Reels—usually outperform vague grids.',
        'Match package size to the post’s likely organic reach. Ordering far more than the audience can explain often looks odd next to quiet historical posts.',
        'When a Reel needs watching more than liking, compare [Instagram views](/buy-instagram-views). For discussion under the same post, see [Instagram comments](/buy-instagram-comments).',
      ],
    },
    {
      type: 'checklist',
      id: 'likes-mistakes',
      heading: 'Common mistakes with likes packages',
      items: [
        'Buying for every quiet grid post instead of launches that matter',
        'Ignoring caption quality and hoping the counter fixes a weak hook',
        'Confusing likes with audience growth and skipping followers when you need both',
        'Making the post private while delivery is still running',
      ],
    },
    {
      type: 'callout',
      id: 'wrap',
      title: 'Before you order likes',
      body:
        'Keep the target post public and choose a quantity that fits that upload—not every quiet tile. Audience building still belongs with [Instagram followers](/buy-instagram-followers); conversation with [Instagram comments](/buy-instagram-comments).',
    },
    {
      type: 'links',
      id: 'related',
      heading: 'Browse related services',
      links: [
        { label: 'Instagram followers packages', href: '/buy-instagram-followers' },
        { label: 'Instagram views packages', href: '/buy-instagram-views' },
        { label: 'Instagram comments packages', href: '/buy-instagram-comments' },
        { label: 'NovaLikes homepage', href: '/' },
      ],
    },
  ],
};

export const INSTAGRAM_VIEWS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'ig-views-video-guide',
  serviceSlug: 'buy-instagram-views',
  title: 'How Instagram Views Help Videos Reach More People',
  description:
    'Reel visibility, watch time habits, and how to pick a views package for a specific clip—not a generic growth pitch.',
  blocks: [
    {
      type: 'intro',
      paragraphs: [
        'Instagram views count how often a video or Reel was started. For many creators, that number is what makes a clip feel worth pressing play.',
        'Views support discoverability. Hooks, pacing, captions, and ending CTAs still decide whether people stay past second two.',
        'Order views when you have a clip worth circulating—product demos, tutorials, and story-led Reels—not every casual dump from the week.',
        'If watch-through is weak, fix the first three seconds before increasing volume. Extra starts cannot repair a confusing opener.',
      ],
    },
    {
      type: 'split',
      id: 'why-views',
      heading: 'Why video views matter',
      illustration: 'views-reel',
      paragraphs: [
        'A Reel with visible view volume looks more proven than one that appears untouched. That helps when people browse Explore-style surfaces or open the link from elsewhere.',
        'Treat views as circulation for one piece of creative. Track which concepts earn rewatches; those ideas deserve sequels more than quiet experiments do.',
        'Agencies often test two creative angles with similar view packages, then put budget behind the cut that holds retention longer.',
      ],
      bullets: [
        'Public video or Reel URL only—no password',
        'Confirm delivery timing on the package card',
        'Leave the clip public while the order runs',
      ],
    },
    {
      type: 'timeline',
      id: 'process',
      heading: 'A simple process before you buy',
      steps: [
        {
          id: 'clip',
          title: 'Pick the right clip',
          description:
            'Support launches and strong tutorials first. Skip weak Story dumps that were never meant to travel.',
        },
        {
          id: 'estimate',
          title: 'Read the estimate',
          description:
            'Each package shows its own start and delivery window. Confirm that timing before checkout.',
        },
        {
          id: 'public',
          title: 'Keep the Reel public',
          description:
            'Orders use the public URL. If the video goes private mid-delivery, fulfillment can stall.',
        },
      ],
    },
    {
      type: 'tips-grid',
      id: 'optimization',
      heading: 'Tips that improve watch time',
      items: [
        {
          id: 'hook',
          title: 'Front-load the payoff',
          description: 'Show the result, claim, or question in the first two seconds.',
        },
        {
          id: 'captions',
          title: 'Caption for silent watching',
          description: 'Many people watch on mobile with sound off by default.',
        },
        {
          id: 'text',
          title: 'Keep on-screen text large',
          description: 'Small labels disappear on smaller phones and look soft.',
        },
        {
          id: 'end',
          title: 'End with a next step',
          description: 'Point to a related Reel, offer, Highlight, or clear CTA.',
        },
      ],
    },
    {
      type: 'checklist',
      id: 'mistakes',
      heading: 'Common mistakes with views packages',
      items: [
        'Ordering views for weak creative and expecting volume alone to fix retention',
        'Confusing a view start with completed watch time',
        'Switching a Reel to private mid-delivery',
        'Ignoring related goals like audience size or comments on the same launch',
      ],
    },
    {
      type: 'callout',
      id: 'wrap',
      title: 'When to combine services',
      body:
        'If the Reel is solid and you also need a larger audience or discussion, look at [Instagram followers](/buy-instagram-followers) and [Instagram comments](/buy-instagram-comments). For reaction volume on stills or the same clip’s heart count, use [Instagram likes](/buy-instagram-likes).',
    },
    {
      type: 'links',
      id: 'related',
      heading: 'Related NovaLikes destinations',
      links: [
        { label: 'Instagram followers packages', href: '/buy-instagram-followers' },
        { label: 'Instagram likes packages', href: '/buy-instagram-likes' },
        { label: 'Instagram comments packages', href: '/buy-instagram-comments' },
        { label: 'NovaLikes homepage', href: '/' },
      ],
    },
  ],
};

export const INSTAGRAM_COMMENTS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'ig-comments-trust-guide',
  serviceSlug: 'buy-instagram-comments',
  title: 'How Instagram Comments Build Trust',
  description:
    'Practical guidance for using comments to start conversations, answer objections in public, and help new visitors trust your posts.',
  blocks: [
    {
      type: 'intro',
      paragraphs: [
        'Comments turn a post into a discussion. Visitors read threads for questions, tone, and proof before they like, message, or buy.',
        'A quiet post feels unfinished. A short, on-topic thread shows that someone else found the content worth engaging—and that you show up to reply.',
        'Use comments where conversation helps: launches, FAQ posts, offer creatives, and education content you can answer the same day.',
      ],
    },
    {
      type: 'split',
      id: 'why-comments-matter',
      heading: 'Why comments matter more than silent reactions',
      illustration: 'comments-conversation',
      paragraphs: [
        'Hearts show interest. Comments show effort. Written replies carry context—price, timing, fit—that likes cannot.',
        'Public answers also help the next visitor. One pinned FAQ can replace the same DM dozens of times.',
        'For creators and brands, that visible discussion is social proof: the post belongs in a living feed, not a brochure.',
      ],
    },
    {
      type: 'conversation',
      id: 'community-engagement',
      heading: 'What useful discussion looks like',
      intro:
        'Keep threads short, specific, and easy to skim. Newcomers should understand the offer in three comments or less.',
      items: [
        { id: '1', name: 'alex', text: 'Does this fit a small studio schedule?' },
        { id: '2', name: 'you', text: 'Yes—start with one offer post weekly and reply same day.' },
        { id: '3', name: 'sam', text: 'The thread answered my booking question. DMing now.' },
      ],
    },
    {
      type: 'cards',
      id: 'building-credibility',
      heading: 'Four ways comments build credibility',
      items: [
        {
          id: 'proof',
          title: 'Proof sits in plain sight',
          description:
            'Prospects skim comments before they trust a caption. Clear replies make claims easier to believe.',
          icon: 'shield',
        },
        {
          id: 'tone',
          title: 'Tone sets your standard',
          description:
            'On-niche language and respectful replies show how you treat customers in public.',
          icon: 'message',
        },
        {
          id: 'pin',
          title: 'Pins scale answers',
          description:
            'When a FAQ repeats, pin it. Later visitors get clarity without another DM.',
          icon: 'quote',
        },
        {
          id: 'reply',
          title: 'Your replies finish the job',
          description:
            'Packages start conversation. Creator answers turn attention into trust.',
          icon: 'handshake',
        },
      ],
    },
    {
      type: 'comparison',
      id: 'comments-vs-likes',
      heading: 'When to use comments vs likes',
      intro: 'Both support engagement. Match the signal to the job.',
      left: {
        title: 'Choose comments when you need',
        points: [
          'Questions, proof, and context under the post',
          'Public FAQ coverage before DMs pile up',
          'A thread new visitors can join',
        ],
      },
      right: {
        title: 'Choose likes when you need',
        points: [
          'Quick first reactions on a launch frame',
          'A warmer start beside a strong caption',
          'Volume without starting a written thread',
        ],
      },
    },
    {
      type: 'callout',
      id: 'encourage-more',
      title: 'How threads encourage more replies',
      body:
        'People join discussions that already feel safe. One thoughtful reply often unlocks secondary comments. Plan reply time: packages start the thread, your answers keep it moving.',
    },
    {
      type: 'tips-grid',
      id: 'best-practices',
      heading: 'Practical tips before you order',
      items: [
        {
          id: 'ask',
          title: 'Ask one specific question',
          description: 'Caption prompts like “Would you try this at home?” outperform vague “Thoughts?”.',
        },
        {
          id: 'pace',
          title: 'Match quantity to the post',
          description: 'Support launches and FAQ creatives—not every archival tile in the grid.',
        },
        {
          id: 'moderate',
          title: 'Moderate noise quickly',
          description: 'Hide spam so newcomers only see a clean discussion.',
        },
        {
          id: 'reuse',
          title: 'Reuse recurring questions',
          description: 'Common comments become your next Reel or carousel outline.',
        },
      ],
    },
    {
      type: 'checklist',
      id: 'common-mistakes',
      heading: 'Mistakes that weaken conversation',
      items: [
        'Ordering discussion for posts you will not answer',
        'Choosing quantities that dwarf the post’s real reach',
        'Leaving spam or mismatched tone at the top of the thread',
        'Expecting comments alone to replace a clear offer in the caption',
      ],
    },
    {
      type: 'timeline',
      id: 'choose-package',
      heading: 'How to choose the right package',
      steps: [
        {
          id: 'goal',
          title: '1. Name the conversation goal',
          description:
            'Launch buzz, FAQ coverage, or product proof need different volumes. Write the goal before you compare cards.',
        },
        {
          id: 'url',
          title: '2. Confirm the public URL',
          description:
            'Use the exact post or Reel link and keep the account public during delivery.',
        },
        {
          id: 'delivery',
          title: '3. Check delivery and tracking',
          description:
            'Review gradual delivery on the package card, then track with your checkout email after purchase.',
        },
      ],
    },
    {
      type: 'links',
      id: 'related',
      heading: 'Related NovaLikes options',
      intro:
        'Comments strengthen discussion. Pair them when a campaign also needs first reactions, Reel reach, or a larger audience.',
      links: [
        { label: 'Instagram likes packages', href: '/buy-instagram-likes' },
        { label: 'Instagram views packages', href: '/buy-instagram-views' },
        { label: 'Instagram followers packages', href: '/buy-instagram-followers' },
        { label: 'NovaLikes homepage', href: '/' },
      ],
    },
  ],
};


export const TIKTOK_FOLLOWERS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'tt-followers-growth-guide',
  serviceSlug: 'buy-tiktok-followers',
  title: 'How TikTok Followers Support Long-Term Growth',
  description:
    'A growing follower count is often one of the first things people notice when they visit a TikTok profile. While great content remains the foundation of long-term success, a stronger audience can help create better first impressions and encourage more people to explore your videos. Choosing the right follower package should support your overall content strategy rather than replace it.',
  blocks: [
    {
      type: 'split',
      id: 'tt-first-impressions',
      heading: 'Why First Impressions Matter',
      illustration: 'tiktok-followers-creator',
      paragraphs: [
        'When someone discovers your profile through the For You feed, search or a shared video, they often decide within seconds whether to keep watching. A profile with an established audience can appear more active and encourage visitors to view additional content before deciding to follow.',
      ],
    },
    {
      type: 'prose',
      id: 'tt-credibility',
      heading: 'Build Credibility Over Time',
      paragraphs: [
        'Creators, businesses and brands all benefit from maintaining a professional looking profile. A larger audience can help reinforce credibility and make your account look more established while you continue publishing consistent, high-quality content.',
      ],
    },
    {
      type: 'prose',
      id: 'tt-right-package',
      heading: 'Choose The Right Package',
      paragraphs: [
        'Not every account needs the largest package. New creators often begin with smaller packages, while established brands may choose larger options that better match their current audience size and marketing goals. Selecting a package that fits your profile usually creates a more balanced appearance.',
      ],
    },
    {
      type: 'prose',
      id: 'tt-consistent-content',
      heading: 'Focus On Consistent Content',
      paragraphs: [
        'Follower growth works best when combined with regular posting, engaging videos and a clear content strategy. Continue uploading original videos, responding to your audience and improving your content quality to support sustainable long-term growth.',
      ],
    },
    {
      type: 'checklist',
      id: 'tt-best-practices',
      heading: 'Best Practices',
      items: [
        'Complete your profile',
        'Post consistently',
        'Publish quality videos',
        'Engage with your audience',
      ],
    },
  ],
};

export const TIKTOK_LIKES_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'tt-likes-engagement-guide',
  serviceSlug: 'buy-tiktok-likes',
  title: 'How TikTok Likes Support Stronger Engagement',
  description:
    'TikTok likes are one of the first engagement signals viewers notice. While great content is always the most important factor, visible engagement can help build credibility, encourage more interactions and create a stronger first impression. Likes work best alongside quality videos, consistent posting and relevant content.',
  blocks: [
    {
      type: 'split',
      id: 'tt-l-why-engagement',
      heading: 'Why Engagement Matters',
      illustration: 'tiktok-likes-analytics',
      paragraphs: [
        "When users see active engagement on a video, they're often more likely to interact with it themselves. Visible likes can improve social proof, support creator credibility and help your content appear more active to new visitors.",
      ],
    },
    {
      type: 'tips-grid',
      id: 'tt-l-best-practices',
      heading: 'Best Practices For Better TikTok Engagement',
      items: [
        {
          id: 'tt-l-bp-original',
          title: 'Create Original Videos',
          description: 'Unique videos consistently outperform copied content.',
          icon: 'clapper',
        },
        {
          id: 'tt-l-bp-sounds',
          title: 'Use Trending Sounds',
          description: 'Relevant trends can improve audience reach.',
          icon: 'trending',
        },
        {
          id: 'tt-l-bp-consistent',
          title: 'Post Consistently',
          description: 'Maintain a regular publishing schedule.',
          icon: 'calendar',
        },
        {
          id: 'tt-l-bp-captions',
          title: 'Write Better Captions',
          description: 'Short, clear captions encourage interaction.',
          icon: 'quote',
        },
        {
          id: 'tt-l-bp-hashtags',
          title: 'Use Relevant Hashtags',
          description: 'Choose hashtags that match your niche.',
          icon: 'hash',
        },
        {
          id: 'tt-l-bp-engage',
          title: 'Engage With Your Audience',
          description: 'Reply to comments and interact with followers.',
          icon: 'message',
        },
      ],
    },
    {
      type: 'cards',
      id: 'tt-l-who-for',
      heading: 'Who Uses TikTok Likes Packages?',
      intro: 'Our packages are designed for many different types of TikTok users.',
      items: [
        {
          id: 'tt-l-who-creators',
          title: 'Content Creators',
          description: 'Support new uploads and series with clearer engagement.',
          icon: 'clapper',
        },
        {
          id: 'tt-l-who-influencers',
          title: 'Influencers',
          description: 'Reinforce social proof on campaign and collab videos.',
          icon: 'award',
        },
        {
          id: 'tt-l-who-brands',
          title: 'Brands',
          description: 'Help product clips look active to new viewers.',
          icon: 'building',
        },
        {
          id: 'tt-l-who-small-biz',
          title: 'Small Businesses',
          description: 'Boost local offer videos without complex tools.',
          icon: 'store',
        },
        {
          id: 'tt-l-who-stores',
          title: 'Online Stores',
          description: 'Add visible energy to product launches and drops.',
          icon: 'layers',
        },
        {
          id: 'tt-l-who-agencies',
          title: 'Agencies',
          description: 'Support client videos with a simple package workflow.',
          icon: 'handshake',
        },
      ],
    },
    {
      type: 'links',
      id: 'tt-l-explore-more',
      heading: 'Explore Related TikTok Pages',
      intro:
        'Pair likes with other growth options, or return to NovaLikes for more services worldwide.',
      links: [
        {
          label: 'Buy TikTok Followers',
          href: '/buy-tiktok-followers',
        },
        {
          label: 'Buy TikTok Views',
          href: '/buy-tiktok-views',
        },
        {
          label: 'Homepage',
          href: '/',
        },
      ],
    },
  ],
};

export const TIKTOK_VIEWS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'tiktok-views-educational-guide',
  serviceSlug: 'buy-tiktok-views',
  title: 'How TikTok Views Support Greater Video Reach',
  description:
    'Video views are one of the strongest visibility signals on TikTok. While quality content remains the most important factor, increasing the number of views can improve first impressions, build credibility and encourage more people to watch your videos. Combined with consistent publishing and engaging content, views help strengthen your overall TikTok presence.',
  blocks: [
    {
      type: 'split',
      id: 'tt-v-why-views',
      heading: 'Why Video Views Matter',
      illustration: 'tiktok-views-analytics',
      paragraphs: [
        'When a video already has visible activity, new visitors are often more willing to watch it. Higher view counts create stronger social proof, support content credibility and help creators present a more active profile.',
      ],
    },
    {
      type: 'tips-grid',
      id: 'tt-v-best-practices',
      heading: 'Best Practices For Better TikTok Reach',
      items: [
        {
          id: 'tt-v-bp-original',
          title: 'Create Original Videos',
          description: 'Original content performs better over time.',
          icon: 'clapper',
        },
        {
          id: 'tt-v-bp-sounds',
          title: 'Use Trending Sounds',
          description: 'Relevant sounds help increase visibility.',
          icon: 'trending',
        },
        {
          id: 'tt-v-bp-consistent',
          title: 'Post Consistently',
          description: 'Regular uploads build stronger momentum.',
          icon: 'calendar',
        },
        {
          id: 'tt-v-bp-hooks',
          title: 'Strong Video Hooks',
          description: 'Capture attention within the first few seconds.',
          icon: 'zap',
        },
        {
          id: 'tt-v-bp-hashtags',
          title: 'Relevant Hashtags',
          description: 'Use hashtags that match your niche.',
          icon: 'hash',
        },
        {
          id: 'tt-v-bp-review',
          title: 'Review Performance',
          description: 'Monitor analytics and improve future content.',
          icon: 'chart',
        },
      ],
    },
    {
      type: 'cards',
      id: 'tt-v-who-for',
      heading: 'Who Uses TikTok Views Packages?',
      intro: 'Our TikTok Views packages are suitable for many different types of customers.',
      items: [
        {
          id: 'tt-v-who-creators',
          title: 'Content Creators',
          description: 'Give new uploads a clearer reach signal as they go live.',
          icon: 'clapper',
        },
        {
          id: 'tt-v-who-influencers',
          title: 'Influencers',
          description: 'Keep campaign clips looking active to first-time viewers.',
          icon: 'award',
        },
        {
          id: 'tt-v-who-brands',
          title: 'Brands',
          description: 'Support product and story videos with stronger visibility.',
          icon: 'building',
        },
        {
          id: 'tt-v-who-stores',
          title: 'Online Stores',
          description: 'Help launch and promo videos attract more plays.',
          icon: 'layers',
        },
        {
          id: 'tt-v-who-small-biz',
          title: 'Small Businesses',
          description: 'Promote local offers without building complex workflows.',
          icon: 'store',
        },
        {
          id: 'tt-v-who-agencies',
          title: 'Marketing Agencies',
          description: 'Add predictable view packages to client video campaigns.',
          icon: 'handshake',
        },
      ],
    },
    {
      type: 'links',
      id: 'tt-v-explore-more',
      heading: 'Explore Related TikTok Pages',
      intro:
        'Pair video views with audience growth, or return to NovaLikes for more services worldwide.',
      links: [
        {
          label: 'Buy TikTok Followers',
          href: '/buy-tiktok-followers',
        },
        {
          label: 'Buy TikTok Likes',
          href: '/buy-tiktok-likes',
        },
        {
          label: 'Homepage',
          href: '/',
        },
      ],
    },
  ],
};

export const EDUCATIONAL_GUIDES_BY_SLUG: Record<string, EducationalGuideContent> = {
  'buy-instagram-followers': INSTAGRAM_FOLLOWERS_EDUCATIONAL_GUIDE,
  'buy-instagram-likes': INSTAGRAM_LIKES_EDUCATIONAL_GUIDE,
  'buy-instagram-views': INSTAGRAM_VIEWS_EDUCATIONAL_GUIDE,
  'buy-instagram-comments': INSTAGRAM_COMMENTS_EDUCATIONAL_GUIDE,
  'buy-tiktok-followers': TIKTOK_FOLLOWERS_EDUCATIONAL_GUIDE,
  'buy-tiktok-likes': TIKTOK_LIKES_EDUCATIONAL_GUIDE,
  'buy-tiktok-views': TIKTOK_VIEWS_EDUCATIONAL_GUIDE,
  'buy-youtube-subscribers': YOUTUBE_SUBSCRIBERS_EDUCATIONAL_GUIDE,
  'buy-youtube-views': YOUTUBE_VIEWS_EDUCATIONAL_GUIDE,
  'buy-facebook-followers': FACEBOOK_FOLLOWERS_EDUCATIONAL_GUIDE,
  'buy-facebook-post-likes': FACEBOOK_POST_LIKES_EDUCATIONAL_GUIDE,
};

export function getEducationalGuideBySlug(slug: string): EducationalGuideContent | null {
  return EDUCATIONAL_GUIDES_BY_SLUG[slug] ?? null;
}
