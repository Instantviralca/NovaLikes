/**
 * Article #14 — Public vs Private Instagram Accounts: What Changes for Followers and Reach?
 * Scheduled: Wednesday 23 September 2026.
 * Informational privacy/discovery intent. Distinct from /buy-instagram-followers.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'public-vs-private-instagram-account';
const SCHEDULED_AT = '2026-09-23T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_WHO_CAN_SEE_POSTS =
  'https://www.facebook.com/help/instagram/183881842314338';
const IG_RECOMMENDATION_ELIGIBILITY =
  'https://www.facebook.com/help/instagram/653964212890722';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_PROFESSIONAL_ACCOUNTS =
  'https://www.facebook.com/help/instagram/138925576505882';
const IG_MAKE_PRIVATE =
  'https://www.facebook.com/help/instagram/448523408565555';

let order = 0;
function nextOrder(): number {
  order += 1;
  return order;
}

function heading(
  id: string,
  text: string,
  headingLevel: 2 | 3,
): ArticleContentBlock {
  return { id, type: 'heading', headingLevel, text, order: nextOrder() };
}

function paragraph(
  id: string,
  text: string,
  inlineLinks?: ArticleInlineLink[],
): ArticleContentBlock {
  return {
    id,
    type: 'paragraph',
    text,
    order: nextOrder(),
    ...(inlineLinks ? { inlineLinks } : {}),
  };
}

function bullets(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'bulleted_list', items, order: nextOrder() };
}

function numbered(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

function figure(
  id: string,
  src: string,
  alt: string,
  caption: string,
): ArticleContentBlock {
  return {
    id,
    type: 'figure',
    order: nextOrder(),
    image: {
      src,
      alt,
      width: 1600,
      height: 900,
      caption,
    },
  };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-1',
    'The privacy switch on Instagram looks like a small setting, but it changes who can see your posts, how new people follow you, whether Instagram can show your content to strangers, and which tools you keep. The right choice depends on what the account is for, so it helps to know exactly what each setting does before you flip it.',
  ),
  paragraph(
    'p-2',
    'In short, Instagram says posts from a private account are visible only to approved followers, while posts from a public account can be seen by anyone on Instagram. Almost every other difference between the two settings follows from that one rule.',
    [
      { href: IG_WHO_CAN_SEE_POSTS, label: 'posts from a private account are visible only to approved followers', external: true },
    ],
  ),
  heading('h-what-a-private-instagram-account-does', 'What a Private Instagram Account Does', 2),
  paragraph(
    'p-3',
    'On a private account, someone who finds your profile can see your name, photo, bio and follower counts, but not your posts. To see them, they send a follow request and wait for you to approve it. You can approve or decline each request, and you can remove existing followers at any time.',
  ),
  paragraph(
    'p-4',
    'That approval step is the whole point. It gives you control over exactly who sees your photos, Reels and Stories, which is why private accounts suit personal profiles, family accounts and anyone who would rather not share content with strangers.',
  ),
  paragraph(
    'p-5',
    'The trade off is discovery. A person who lands on a private profile cannot browse a few posts to decide whether the account is worth following. They have to request access first, which is a bigger ask than tapping Follow on a profile they have already enjoyed.',
  ),
  figure(
    'fig-compare',
    `${IMAGE_DIR}/public-vs-private-instagram.png`,
    'Public vs Private Instagram: broader visibility versus approved-follower access',
    'Private prioritizes control. Public prioritizes accessibility. Recommendation eligibility does not guarantee reach.',
  ),
  heading('h-what-a-public-instagram-account-does', 'What a Public Instagram Account Does', 2),
  paragraph(
    'p-6',
    'On a public account, anyone on Instagram can see your posts, and anyone with the link can open your profile on the web. People can follow you without waiting for approval.',
  ),
  paragraph(
    'p-7',
    'Public status also makes your content eligible to be shown to people who do not follow you. Instagram lists Reels, Explore, Search, Feed recommendations and Suggested Accounts as the places where this can happen, and it is clear that being eligible is not the same as being recommended. A public account can still get very little reach if its content does not interest the people Instagram tests it with.',
  ),
  heading('h-public-vs-private-at-a-glance', 'Public vs Private at a Glance', 2),
  {
    id: 'table-main-diff',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Feature', 'Public', 'Private'],
    rows: [
      ['Post visibility', 'Anyone on Instagram', 'Approved followers'],
      ['New follower approval', 'Not private approval-based', 'Required'],
      [
        'Broad recommendation eligibility',
        'Yes, if eligible',
        'Not public recommendation content',
      ],
      ['Web post visibility', 'Public', 'Restricted'],
      ['Professional account', 'Supported', 'Not supported'],
    ],
  },
  paragraph(
    'p-8',
    'The recommendation row is where most confusion comes from. Instagram does not punish private accounts with a hidden penalty. Private posts simply sit outside the recommendation system because you chose to limit them to approved followers. Going public removes that barrier, but it does not decide how well your content performs once it is eligible.',
  ),
  heading('h-does-making-your-instagram-private-reduc', 'Does Making Your Instagram Private Reduce Reach?', 2),
  paragraph(
    'p-9',
    'It reduces the number of people who can possibly see your posts. On a private account, your audience is your approved followers. On a public account, your audience is your followers plus anyone Instagram decides to show your content to through its recommendation eligibility rules.',
    [
      { href: IG_RECOMMENDATION_ELIGIBILITY, label: 'recommendation eligibility rules', external: true },
    ],
  ),
  paragraph(
    'p-10',
    'So if reach to you means new people finding your work, a private account has far less of it by design. If reach means your existing followers seeing what you post, privacy makes little difference, because approved followers still see your posts in their feed and Stories as normal.',
  ),
  paragraph(
    'p-11',
    'The same logic answers the Explore question. Explore, Reels recommendations and Suggested Accounts are discovery features built on public content, so private posts are not candidates for them. If you want to understand what decides which public posts get picked, our guide on how the Instagram algorithm works covers the signals involved.',
    [
      { href: '/learn/how-instagram-algorithm-works', label: 'how the Instagram algorithm works' },
    ],
  ),
  figure(
    'fig-audience',
    `${IMAGE_DIR}/audience-access.png`,
    'Audience access: private content stays with approved followers while public content can also reach non-followers through discovery surfaces',
    'Public status creates discovery opportunities. It does not guarantee distribution.',
  ),
  heading('h-can-a-private-account-still-gain-followe', 'Can a Private Account Still Gain Followers?', 2),
  paragraph(
    'p-12',
    'Yes. Private accounts gain followers through requests, and many personal accounts grow steadily this way through friends, mutual connections and people who already know them.',
  ),
  paragraph(
    'p-13',
    'What changes is the journey. On a public account, people usually discover a post, look through a few more, then follow. On a private account, they see only the profile, decide whether to request access, then wait. That extra step costs you some followers who would have followed after seeing your content, which is the price of control.',
  ),
  paragraph(
    'p-14',
    'Switching to private does not remove anyone who already follows you. Your follower list stays the same, and you manage individual followers separately. If your count does fall after a change, our guide on why Instagram followers drop explains the usual reasons, such as unfollows, deactivated accounts and spam removal.',
    [
      { href: '/learn/why-instagram-followers-drop', label: 'why Instagram followers drop' },
    ],
  ),
  heading('h-professional-accounts-cannot-be-private', 'Professional Accounts Cannot Be Private', 2),
  paragraph(
    'p-15',
    'This is the rule that catches creators and businesses out. Instagram says professional accounts cannot be set to private. Creator and business accounts are always public.',
    [
      { href: IG_PROFESSIONAL_ACCOUNTS, label: 'professional accounts cannot be set to private', external: true },
    ],
  ),
  paragraph(
    'p-16',
    'That matters for three reasons:',
  ),
  bullets('ul-1', [
    'If you want a private account, you first have to switch back to a personal account.',
    'Switching back to personal removes access to Insights.',
    'If you move from a private personal account to a professional one, Instagram automatically accepts any pending follow requests, so review them first if that matters to you.',
  ]),
  paragraph(
    'p-17',
    'On Insights, Instagram\'s help pages say that Insights are only available on professional accounts, and that past data may come back if you later return to a professional account. If you rely on numbers such as reach, profile visits and follower activity to plan content, losing them is a real cost of going private.',
    [
      { href: IG_INSIGHTS, label: 'Insights are only available on professional accounts', external: true },
    ],
  ),
  figure(
    'fig-tools',
    `${IMAGE_DIR}/privacy-vs-creator-tools.png`,
    'Privacy versus creator tools: a private account emphasizes approved followers while a public professional account provides Insights and discovery eligibility',
    'Professional Instagram accounts cannot be private.',
  ),
  heading('h-common-myths-about-switching', 'Common Myths About Switching', 2),
  paragraph(
    'p-18',
    'A few tactics get passed around online that are worth clearing up.',
  ),
  paragraph(
    'p-19',
    'Going private for a few days does not reset your reach or fix a suspected shadowban. If you think your account has been limited, check Account Status in your settings, which shows any restrictions and whether your content can be recommended.',
  ),
  paragraph(
    'p-20',
    'Going public does not fix low reach on its own. It makes your posts eligible for recommendations, and from there it comes down to whether people watch, share and save what you post.',
  ),
  paragraph(
    'p-21',
    'Going private to make people curious enough to request access is not a growth strategy. There is no sign that Instagram rewards private accounts with more followers, and you lose every discovery route that depends on public content. Hashtags do not get around privacy either. A private post with a hashtag is still only visible to approved followers.',
  ),
  paragraph(
    'p-22',
    'Finally, a private account does not erase you from the internet. Your profile itself can still be found, and older public posts may have been shared or saved before you switched. Privacy controls who can open your posts on Instagram from now on.',
  ),
  heading('h-which-setting-is-right-for-you', 'Which Setting Is Right for You?', 2),
  paragraph(
    'p-23',
    'Choose public if the account is meant to reach people who do not know you yet. That covers creators, brands, businesses, educators and anyone who needs Insights or other professional tools. Remember that everything you post can be seen by anyone, so keep personal details out of captions and Stories.',
  ),
  paragraph(
    'p-24',
    'Choose private if the account is mainly for people you know and you want to approve every follower. You give up recommendations and Insights, and in return you decide exactly who sees your content.',
  ),
  paragraph(
    'p-25',
    'Younger users should keep the privacy settings Instagram applies to teen accounts. Follower numbers are never a good reason to weaken those protections.',
  ),
  paragraph(
    'p-26',
    'If you are unsure, ask yourself one question: should a stranger be able to see this post today? If the answer is usually yes, public fits. If it is usually no, private does.',
  ),
  heading('h-how-to-switch-between-public-and-private', 'How to Switch Between Public and Private', 2),
  paragraph(
    'p-27',
    'For a personal account, Instagram\'s steps to make your account private are short:',
    [
      { href: IG_MAKE_PRIVATE, label: 'make your account private', external: true },
    ],
  ),
  numbered('ol-2', [
    'Open your profile and go to Settings and activity.',
    'Tap Account privacy.',
    'Turn Private account on or off and confirm.',
  ]),
  paragraph(
    'p-28',
    'If the option is missing, you are probably on a creator or business account. Switch to a personal account first, keeping in mind that you will lose Insights while you stay private. Menu names change from time to time, so follow the wording in your app if it differs slightly.',
  ),
  paragraph(
    'p-29',
    'Before going public, check two things: that you are comfortable with every existing post being visible to anyone, and whether you have pending follow requests you would rather not accept.',
  ),
  {
      id: 'cta-ig-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-instagram-followers',
      heading: 'Using a Public Instagram Profile?',
      description:
        'NovaLikes Instagram follower orders use the public profile information required for the selected service. You do not need to provide your Instagram password.',
      label: 'View Instagram Followers',
    },
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'comparison_table' || block.type === 'data_table') {
    return [...block.headers, ...block.rows.flat()].join(' ');
  }
  if (block.type === 'internal_cta') {
    return `${block.heading ?? ''} ${block.description ?? ''} ${block.label}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const PUBLIC_VS_PRIVATE_INSTAGRAM_ACCOUNT_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-public-vs-private-instagram-account',
  slug: SLUG,
  title:
    'Public vs Private Instagram Accounts: What Changes for Followers and Reach?',
  excerpt:
    'Going private on Instagram limits your posts to approved followers, removes you from recommendations to non-followers and switches off Insights. Here is what changes and how to choose.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['followers', 'algorithm', 'analytics', 'creator', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Split illustration of an Instagram account, with a public side open to everyone and a private side locked to approved followers',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Public vs Private Instagram Accounts: What Changes?',
    description:
      'Learn what changes when an Instagram account is public or private, including followers, post visibility, recommendations, reach and Insights.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'public vs private Instagram account',
      'Instagram private account',
      'Instagram public account',
      'private Instagram followers',
      'does private Instagram affect reach',
      'private vs public Instagram',
      'Instagram recommendation eligibility',
    ],
  },
  relatedServices: ['buy-instagram-followers'],
  relatedArticles: [
    'instagram-followers-vs-likes-vs-views-vs-comments',
    'how-instagram-algorithm-works',
    'why-instagram-followers-drop',
    'how-instagram-reels-views-are-counted',
    'how-to-grow-instagram-followers-organically',
    'view-instagram-profile-picture-full-size',
    'check-instagram-follower-count-without-login',
    'view-instagram-profile-without-login',
  ],
  featured: true,
  published: true,
  status: 'published',
  scheduledAt: SCHEDULED_AT,
  editorialApproved: true,
  seoReviewed: true,
  contentReviewed: true,
  lastEditorialUpdate: SCHEDULED_AT,
  keyTakeaways: [
    'Private posts are visible only to approved followers. Public posts can be seen by anyone on Instagram.',
    'Only public content can be recommended to non-followers in Reels, Explore, Search and Suggested Accounts.',
    'Being eligible for recommendations does not mean Instagram will recommend your posts.',
    'Creator and business accounts cannot be private, and Insights only work on those accounts.',
    'Going private does not remove existing followers or reset your reach.',
    'Pick the setting that matches what the account is for, not a growth trick.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between a public and private Instagram account?',
      answer:
        'Posts on a public account can be seen by anyone on Instagram, and anyone can follow without approval. Posts on a private account are visible only to followers you approve.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does making Instagram private reduce reach?',
      answer:
        'It limits your audience to approved followers. Private posts are not shown to non-followers in Reels, Explore or Search, so you lose that discovery. Your existing followers still see your posts as normal.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can a private Instagram account appear on Explore?',
      answer:
        'No. Explore and other recommendation features use content from public accounts. Private posts are only shown to approved followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can a business Instagram account be private?',
      answer:
        'No. Instagram says professional accounts, which include creator and business accounts, cannot be set to private.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do you lose Instagram Insights if you make your account private?',
      answer:
        'Yes. Insights only work on professional accounts, which are always public. Past data may become available again if you switch back to a professional account later.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Does going private remove my followers?',
      answer:
        'No. Your current followers stay. The setting only changes who can see your posts and how new people follow you.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Will going public get me more followers?',
      answer:
        'It makes your content eligible to reach people who do not follow you, which helps if your posts are useful or entertaining. It does not add followers by itself.',
      schemaEligible: true,
    },
  ],
};
