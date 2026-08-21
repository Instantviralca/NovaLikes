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
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_WHO_CAN_SEE_POSTS =
  'https://www.facebook.com/help/instagram/183881842314338';
const IG_RECOMMENDATION_ELIGIBILITY =
  'https://www.facebook.com/help/instagram/653964212890722';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_PROFESSIONAL_ACCOUNTS =
  'https://www.facebook.com/help/instagram/138925576505882';
const IG_WEB_PROFILE =
  'https://www.facebook.com/help/instagram/365041933611384';
const IG_RECOMMENDATIONS =
  'https://www.facebook.com/help/instagram/313829416281232';
const IG_ACCOUNT_STATUS =
  'https://www.facebook.com/help/instagram/338481628002750';
const IG_PUBLIC_PRIVATE_DIFFERENCES =
  'https://www.facebook.com/help/instagram/517073653436611';
const IG_MAKE_PRIVATE =
  'https://www.facebook.com/help/instagram/448523408565555';
const IG_ACCOUNT_CONTENT_INSIGHTS =
  'https://www.facebook.com/help/instagram/1533933820244654';

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
    'p-open-1',
    'Making an Instagram account private changes much more than whether strangers can immediately see your posts.',
  ),
  paragraph('p-open-2', 'It changes:'),
  bullets('ul-open', [
    'who can access your content,',
    'how new followers are approved,',
    'whether your content can be recommended broadly to non-followers,',
    'and which account features are available.',
  ]),
  paragraph(
    'p-open-3',
    'Instagram states that posts from a private account are visible only to approved followers, while posts from a public account can be seen by anyone on Instagram. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-4',
    "Public accounts also have a major discovery advantage: Instagram's recommendation system considers content from public accounts for surfaces including Reels, Explore, Feed Recommendations, Search and Suggested Accounts. Recommendation eligibility does not guarantee that Instagram will recommend a post, but a private account does not participate in that same broad public recommendation model. (Facebook)",
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-open-5', 'So the difference is not simply:'),
  paragraph('p-open-6', 'Public = everyone sees everything'),
  paragraph('p-open-7', 'and:'),
  paragraph('p-open-8', 'Private = nobody can find you'),
  paragraph('p-open-9', 'A better way to think about it is:'),
  paragraph(
    'p-open-10',
    'Public = broader content accessibility and recommendation potential',
  ),
  paragraph(
    'p-open-11',
    'Private = controlled content access through follower approval',
  ),
  paragraph('p-open-12', 'Both options serve legitimate purposes.'),
  paragraph(
    'p-open-13',
    'The right choice depends on what you want the account to accomplish.',
  ),

  heading('h-private-what', 'What Is a Private Instagram Account?', 2),
  paragraph(
    'p-priv-1',
    'A private Instagram account restricts access to its posts to people the account owner has approved as followers. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-priv-2',
    'That means someone discovering the account cannot simply open the profile and browse the full content library in the same way they can with a public account.',
  ),
  paragraph(
    'p-priv-3',
    'Instead, the relationship generally becomes:',
  ),
  bullets('ul-priv-flow', [
    'Discover profile',
    'Send follow request',
    'Account owner approves',
    'Follower gains access to private posts',
  ]),
  paragraph(
    'p-priv-4',
    'This gives the account owner substantially more control over who sees their content.',
  ),
  paragraph(
    'p-priv-5',
    'For personal users, that can be exactly what they want.',
  ),
  paragraph(
    'p-priv-6',
    'For creators or businesses whose goal is broad discovery, it introduces an intentional barrier between discovery and content access.',
  ),
  figure(
    'fig-compare',
    `${IMAGE_DIR}/public-vs-private-instagram.png`,
    'Public vs Private Instagram: broader visibility versus approved-follower access',
    'Private prioritizes control. Public prioritizes accessibility. Recommendation eligibility does not guarantee reach.',
  ),

  heading('h-public-what', 'What Is a Public Instagram Account?', 2),
  paragraph(
    'p-pub-1',
    'A public Instagram account allows anyone on Instagram to see its public posts. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pub-2',
    "Public profiles can also be viewed through Instagram's web experience. Meta says that if an account is public, anyone can view its profile and posts by visiting its Instagram web URL. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pub-3',
    'This makes public status a natural fit for accounts whose purpose includes:',
  ),
  bullets('ul-pub-goals', [
    'creator discovery,',
    'brand visibility,',
    'business marketing,',
    'public education,',
    'community building,',
    'or reaching people who do not already follow them.',
  ]),
  paragraph(
    'p-pub-4',
    'But public does not mean Instagram guarantees reach.',
  ),
  paragraph(
    'p-pub-5',
    'It simply means content can participate in broader public visibility and recommendation opportunities.',
  ),
  paragraph(
    'p-pub-6',
    'Whether Instagram actually recommends a particular account or piece of content depends on its recommendation systems and eligibility. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),

  heading(
    'h-found',
    'Can a Private Instagram Account Be Found?',
    2,
  ),
  paragraph(
    'p-found-1',
    'Private does not mean deleted or nonexistent.',
  ),
  paragraph(
    'p-found-2',
    'Instagram maintains different controls for:',
  ),
  bullets('ul-found', [
    'profile visibility,',
    'post visibility,',
    'following,',
    'comments,',
    'and other interactions.',
  ]),
  paragraph(
    'p-found-3',
    'The key restriction documented by Instagram is that private-account posts are visible only to approved followers. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-found-4', 'So the useful distinction is:'),
  bullets('ul-found-diff', [
    'finding an account',
    'versus seeing its private content.',
  ]),
  paragraph('p-found-5', 'Those are different things.'),
  paragraph(
    'p-found-6',
    'Do not describe a private profile as “completely invisible on Instagram.”',
  ),
  paragraph(
    'p-found-7',
    'That would oversimplify what the privacy setting actually does.',
  ),

  heading(
    'h-main-diff',
    'Public vs Private Instagram: The Main Difference',
    2,
  ),
  paragraph('p-diff-1', 'The simplest comparison is:'),
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
    'p-diff-2',
    'The recommendation point needs careful wording.',
  ),
  paragraph(
    'p-diff-3',
    'Instagram says public-account content can be eligible to appear to non-followers through Reels, Feed, Explore, Search and Suggested Accounts. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-diff-4', 'Eligible does not mean guaranteed.'),
  paragraph(
    'p-diff-5',
    'A public account can still receive very little reach.',
  ),
  paragraph(
    'p-diff-6',
    "A private account's reduced discovery is also not an algorithmic punishment.",
  ),
  paragraph(
    'p-diff-7',
    'It is a consequence of choosing restricted content access.',
  ),

  heading(
    'h-reach',
    'Does Making Instagram Private Reduce Reach?',
    2,
  ),
  paragraph(
    'p-reach-1',
    'This question needs a more precise answer.',
  ),
  paragraph(
    'p-reach-2',
    'Making an account private restricts post visibility to approved followers. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-reach-3',
    'Public-account recommendation eligibility, meanwhile, allows eligible accounts and content to potentially appear to non-followers across Reels, Explore, Feed Recommendations, Search and Suggested Accounts. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-reach-4',
    'So if by reach you mean potential exposure beyond your existing approved followers, then a private account naturally has less public discovery opportunity.',
  ),
  paragraph(
    'p-reach-5',
    'But do not say “Instagram penalizes private accounts.”',
  ),
  paragraph(
    'p-reach-6',
    'That suggests an artificial ranking penalty.',
  ),
  paragraph('p-reach-7', 'A better explanation is:'),
  paragraph(
    'p-reach-8',
    'Private accounts intentionally restrict who can access their content, so they do not have the same public discovery opportunities as public accounts.',
  ),
  paragraph(
    'p-reach-9',
    'Those discovery surfaces are also part of how the Instagram algorithm works, which is a separate system from the public/private toggle itself.',
    [
      {
        href: '/learn/how-instagram-algorithm-works',
        label: 'how the Instagram algorithm works',
      },
    ],
  ),
  figure(
    'fig-audience',
    `${IMAGE_DIR}/audience-access.png`,
    'Audience access: private content stays with approved followers while public content can also reach non-followers through discovery surfaces',
    'Public status creates discovery opportunities. It does not guarantee distribution.',
  ),

  heading(
    'h-explore',
    'Can Private Instagram Posts Appear in Explore?',
    2,
  ),
  paragraph(
    'p-ex-1',
    "Instagram's recommendation eligibility documentation specifically describes recommendations using content from public accounts. These recommendations may appear in Explore, Reels, Feed, Search and Suggested Accounts. (Facebook)",
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ex-2',
    'Therefore, a private account should not be treated as a normal candidate for broad non-follower Explore recommendations.',
  ),
  paragraph('p-ex-3', 'That makes sense.'),
  paragraph('p-ex-4', 'Explore is a discovery experience.'),
  paragraph(
    'p-ex-5',
    'A private account has explicitly restricted its content to approved followers.',
  ),
  paragraph(
    'p-ex-6',
    'The two goals are fundamentally different.',
  ),

  heading(
    'h-reels',
    'Can Private Instagram Reels Reach Non-Followers?',
    2,
  ),
  paragraph(
    'p-rl-1',
    'Do not think of private-account Reels as equivalent to public Reels designed for broad discovery.',
  ),
  paragraph(
    'p-rl-2',
    'Private-account posts are available to approved followers rather than anyone on Instagram. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rl-3',
    'Public accounts, on the other hand, can be eligible for non-follower recommendations through Reels and other surfaces. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rl-4',
    'So if your main objective is Reels discovery among people who do not follow you, public status is more aligned with that goal.',
  ),
  paragraph(
    'p-rl-5',
    'This still does not mean a public Reel equals guaranteed non-follower reach.',
  ),
  paragraph(
    'p-rl-6',
    'Recommendation eligibility is only eligibility.',
  ),
  paragraph(
    'p-rl-7',
    'Even then, a Reel view is a playback metric, not proof that the account reached a unique new follower. Our earlier guide on how Instagram Reel views are counted explains that distinction.',
    [
      {
        href: '/learn/how-instagram-reels-views-are-counted',
        label: 'how Instagram Reel views are counted',
      },
    ],
  ),

  heading(
    'h-views',
    'Does a Public Account Automatically Get More Views?',
    2,
  ),
  paragraph('p-vw-1', 'No.'),
  paragraph(
    'p-vw-2',
    'Public status creates accessibility.',
  ),
  paragraph(
    'p-vw-3',
    'It does not produce a guaranteed number of views.',
  ),
  paragraph(
    'p-vw-4',
    "Instagram's recommendations are personalized, meaning content can be selected differently for different people based on what Instagram predicts will be relevant or valuable to them. (Facebook)",
    [{ href: IG_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-vw-5', 'So a public account does not equal:'),
  bullets('ul-vw-not', [
    'high reach',
    'viral Reels',
    'or Explore placement.',
  ]),
  paragraph(
    'p-vw-6',
    'A public account has the opportunity to participate in broader discovery.',
  ),
  paragraph(
    'p-vw-7',
    'Performance remains a separate question.',
  ),

  heading(
    'h-gain',
    'Can a Private Instagram Account Gain Followers?',
    2,
  ),
  paragraph('p-gain-1', 'Yes.'),
  paragraph(
    'p-gain-2',
    'Private accounts are specifically built around an approval-based follower model.',
  ),
  paragraph('p-gain-3', 'People can request to follow.'),
  paragraph(
    'p-gain-4',
    'The account owner can approve or decline them.',
  ),
  paragraph(
    'p-gain-5',
    "The difference is that prospective followers cannot evaluate the account's private posts in the same way they can browse the full content of a public profile.",
  ),
  paragraph(
    'p-gain-6',
    'That can change the follower journey.',
  ),
  heading('h-public-journey', 'Public Journey', 3),
  bullets('ul-pub-journey', [
    'Discover content',
    'See more posts',
    'Evaluate profile',
    'Follow',
  ]),
  heading('h-private-journey', 'Private Journey', 3),
  bullets('ul-priv-journey', [
    'Discover profile',
    'See limited public-facing profile context',
    'Request follow',
    'Wait for approval',
    'Access content',
  ]),
  paragraph(
    'p-gain-7',
    'That extra friction is intentional.',
  ),
  paragraph('p-gain-8', 'It is the privacy benefit.'),

  heading(
    'h-remove',
    'Does Making Your Account Private Remove Followers?',
    2,
  ),
  paragraph('p-rm-1', 'Do not assume so.'),
  paragraph(
    'p-rm-2',
    'Switching privacy status and manually removing followers are separate actions.',
  ),
  paragraph(
    'p-rm-3',
    'The private setting changes access rules for the account.',
  ),
  paragraph(
    'p-rm-4',
    'It is not the same thing as deleting the follower list.',
  ),
  paragraph(
    'p-rm-5',
    "If there are specific existing followers you do not want to retain, manage those relationships separately through Instagram's follower controls.",
  ),
  paragraph(
    'p-rm-6',
    'Follower totals can also change for other reasons, which is why our earlier guide on why Instagram followers can drop treats privacy switches as distinct from unfollows, disabled accounts or spam removal.',
    [
      {
        href: '/learn/why-instagram-followers-drop',
        label: 'why Instagram followers can drop',
      },
    ],
  ),

  heading(
    'h-pending',
    'What Happens to Pending Requests When You Go Public?',
    2,
  ),
  paragraph(
    'p-pend-1',
    "This is one place where Instagram's current professional-account documentation provides an important warning.",
  ),
  paragraph(
    'p-pend-2',
    'Meta says that when switching to a professional account/public setup, pending follow requests are automatically accepted when you go public. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pend-3',
    'That means someone with a private personal account should review their pending requests before changing account type/privacy if that matters to them.',
  ),
  paragraph(
    'p-pend-4',
    'Do not assume those requests simply disappear.',
  ),

  heading(
    'h-pro',
    'Can a Professional Instagram Account Be Private?',
    2,
  ),
  paragraph('p-pro-1', 'No.'),
  paragraph(
    'p-pro-2',
    "Instagram's current Help Center states that professional accounts cannot be set to private. (Facebook)",
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pro-3',
    'Professional accounts include creator and business account types.',
  ),
  paragraph(
    'p-pro-4',
    'This is a major practical difference.',
  ),
  paragraph('p-pro-5', 'If you need:'),
  bullets('ul-pro-need', [
    'business/creator tools,',
    'professional analytics,',
    'and other professional-account features,',
  ]),
  paragraph(
    'p-pro-6',
    "you are operating under Instagram's public professional-account model.",
  ),
  paragraph(
    'p-pro-7',
    'If privacy is your main priority, a personal private account may fit better.',
  ),

  heading(
    'h-why-pro',
    "Why Can't Professional Accounts Be Private?",
    2,
  ),
  paragraph(
    'p-wp-1',
    'The useful way to understand this is that professional accounts are built around public-facing creator/business functionality.',
  ),
  paragraph(
    'p-wp-2',
    "Meta's documentation simply establishes that professional accounts cannot be private. (Facebook)",
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wp-3',
    'We should not invent an internal Meta reasoning beyond that.',
  ),
  paragraph(
    'p-wp-4',
    'For users, the practical tradeoff is enough:',
  ),
  paragraph('p-wp-5', 'Professional tools → public account'),
  paragraph(
    'p-wp-6',
    'Private audience control → personal private account',
  ),

  heading(
    'h-insights-lose',
    'Do You Lose Instagram Insights When You Go Private?',
    2,
  ),
  paragraph(
    'p-ins-1',
    "Instagram's current documentation indicates Insights are associated with public/professional usage, and Meta states that if you switch back to a private account, you lose access to Insights. Past insights may become available again if you later return to a public professional setup. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ins-2',
    'That is an important consideration for creators and businesses.',
  ),
  paragraph(
    'p-ins-3',
    'Before switching away from a professional/public account, understand that analytics access can change.',
  ),
  paragraph(
    'p-ins-4',
    'If Insights matter to your content strategy, that is part of the privacy tradeoff.',
  ),
  figure(
    'fig-tools',
    `${IMAGE_DIR}/privacy-vs-creator-tools.png`,
    'Privacy versus creator tools: a private account emphasizes approved followers while a public professional account provides Insights and discovery eligibility',
    'Professional Instagram accounts cannot be private.',
  ),

  heading(
    'h-shadowban',
    'Does Going Private Help With “Shadowban” Problems?',
    2,
  ),
  paragraph(
    'p-sb-1',
    'There is no reason to recommend switching private as a universal shadowban fix.',
  ),
  paragraph(
    'p-sb-2',
    'If you suspect an actual account restriction, Instagram provides Account Status so users can review content or behaviour that may lead to restrictions or limitations. (Facebook)',
    [{ href: IG_ACCOUNT_STATUS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sb-3',
    'Recommendation eligibility is also specifically visible for professional accounts through Account Status. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sb-4',
    'So instead of “Go private for three days and Instagram will reset your reach,” use Check Account Status and actual recommendation eligibility.',
  ),
  paragraph(
    'p-sb-5',
    'There is no official Instagram documentation supporting a magic privacy-toggle reset.',
  ),

  heading('h-fix-reach', 'Does Going Public Fix Low Reach?', 2),
  paragraph('p-fix-1', 'Also no.'),
  paragraph(
    'p-fix-2',
    'Changing from private to public expands potential accessibility.',
  ),
  paragraph(
    'p-fix-3',
    'It does not guarantee that Instagram will recommend the account or content.',
  ),
  paragraph(
    'p-fix-4',
    'Instagram explicitly says recommendation eligibility means it may recommend content; eligibility does not guarantee recommendation. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fix-5',
    'So private → public can remove a discovery restriction, but public → high reach is not an automatic outcome.',
  ),

  heading(
    'h-recs',
    'Public Accounts and Instagram Recommendations',
    2,
  ),
  paragraph(
    'p-rec-1',
    "Public status matters because Instagram's Recommendation Guidelines determine which public-account content may be recommended to people who do not follow the account. (Facebook)",
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-rec-2', 'Possible surfaces include:'),
  bullets('ul-recs', [
    'Reels,',
    'Feed Recommendations,',
    'Explore,',
    'Search,',
    'and Suggested Accounts.',
  ]),
  paragraph(
    'p-rec-3',
    'This makes recommendation eligibility especially relevant to:',
  ),
  bullets('ul-rec-who', [
    'creators,',
    'businesses,',
    'brands,',
    'and public-facing profiles.',
  ]),
  paragraph(
    'p-rec-4',
    'If your account is public but discovery is unusually limited, Account Status is the correct place to inspect recommendation eligibility instead of assuming public status guarantees distribution. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),

  heading('h-eligibility', 'What Is Recommendation Eligibility?', 2),
  paragraph(
    'p-el-1',
    'Recommendation eligibility means Instagram may recommend your public account or content to people who do not follow you.',
  ),
  paragraph('p-el-2', 'It is not a promise.'),
  paragraph(
    'p-el-3',
    'Meta explicitly distinguishes eligible from guaranteed recommendation. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-el-4',
    'This distinction should stay clear because many social-media articles oversimplify the concept.',
  ),
  paragraph(
    'p-el-5',
    'Do not say “Make your Instagram public and you will appear in Explore.”',
  ),
  paragraph('p-el-6', 'Instead:'),
  paragraph(
    'p-el-7',
    'Public eligible accounts can be considered for Explore and other recommendation surfaces.',
  ),

  heading(
    'h-followers',
    'Public Account vs Private Account for Followers',
    2,
  ),
  paragraph(
    'p-fol-1',
    'If your goal is follower growth, public accounts reduce friction.',
  ),
  paragraph('p-fol-2', 'A new viewer can:'),
  bullets('ul-fol-public', [
    'discover public content,',
    'inspect the profile,',
    'browse posts,',
    'then decide whether to follow.',
  ]),
  paragraph(
    'p-fol-3',
    'A private account asks the visitor to decide whether to request access before seeing the private post library.',
  ),
  paragraph(
    'p-fol-4',
    'That does not mean private accounts cannot grow.',
  ),
  paragraph(
    'p-fol-5',
    'It means the acquisition journey is different.',
  ),
  heading('h-fol-public', 'Public', 3),
  paragraph('p-fol-6', 'Discovery first → follow decision.'),
  heading('h-fol-private', 'Private', 3),
  paragraph(
    'p-fol-7',
    'Follow request first → full content access after approval.',
  ),
  paragraph(
    'p-fol-8',
    'For brands and creators trying to build a broad audience, the public journey usually aligns better with the objective.',
  ),
  paragraph(
    'p-fol-9',
    'For personal users prioritizing control, private may be preferable.',
  ),
  paragraph(
    'p-fol-10',
    'Follower count is still only one metric. Instagram followers, likes, views and comments measure different things, so a privacy setting should not be treated as a substitute for understanding what each number represents.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),

  heading(
    'h-business',
    'Public vs Private Instagram for Businesses',
    2,
  ),
  paragraph(
    'p-biz-1',
    'A business intending to use Instagram for marketing, customer discovery, Reels, content distribution, Insights and brand visibility will generally need the public professional-account model because Instagram professional accounts cannot be private. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-biz-2',
    'This is less a growth “hack” than a product requirement.',
  ),
  paragraph(
    'p-biz-3',
    'A business should still decide how much personal/private information belongs on the account.',
  ),
  paragraph(
    'p-biz-4',
    'Public does not mean you need to publish everything.',
  ),
  paragraph(
    'p-biz-5',
    'It means the business profile and content are operating publicly.',
  ),

  heading(
    'h-creators',
    'Public vs Private Instagram for Creators',
    2,
  ),
  paragraph(
    'p-cr-1',
    'Creators have a similar tradeoff.',
  ),
  paragraph(
    'p-cr-2',
    'A public professional account provides Insights, public discovery and potential recommendation exposure.',
  ),
  paragraph(
    'p-cr-3',
    'Instagram says public accounts can use Insights, while professional accounts cannot be private. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cr-4',
    'A creator who prioritizes audience growth, analytics, brand work and public content will usually operate publicly.',
  ),
  paragraph(
    'p-cr-5',
    'Someone who simply wants to share personal content with approved people may prefer private.',
  ),

  heading('h-teen', 'What About Teen Instagram Accounts?', 2),
  paragraph(
    'p-teen-1',
    "Age affects Instagram's default privacy experience.",
  ),
  paragraph(
    'p-teen-2',
    "Meta's public/private-account guidance notes that accounts for younger users can have different defaults, so generic adult-account advice should not be treated as universally applicable. (Facebook)",
    [{ href: IG_PUBLIC_PRIVATE_DIFFERENCES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-teen-3',
    'For younger users, current Instagram safety/privacy controls should take priority over creator-growth advice.',
  ),
  paragraph(
    'p-teen-4',
    'Do not encourage someone to weaken privacy protections just to chase follower numbers.',
  ),

  heading(
    'h-hashtags',
    'Can a Private Instagram Account Use Hashtags for Reach?',
    2,
  ),
  paragraph(
    'p-ht-1',
    'Hashtags should not be treated as a way to bypass account privacy.',
  ),
  paragraph(
    'p-ht-2',
    'If posts are restricted to approved followers, adding a hashtag does not magically turn the private post into ordinary public content.',
  ),
  paragraph(
    'p-ht-3',
    'Privacy determines who can access the post.',
  ),
  paragraph('p-ht-4', 'A hashtag does not override that.'),
  paragraph(
    'p-ht-5',
    'This is another reason to separate content categorization from content access.',
  ),

  heading(
    'h-google',
    'Does a Private Instagram Account Appear on Google?',
    2,
  ),
  paragraph(
    'p-gg-1',
    'For public accounts, Instagram states that people can view profiles and posts through the public web URL. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-gg-2',
    'Private-account content is restricted to approved Instagram followers rather than being openly available in the same way. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-gg-3',
    'Do not promise that making an account private removes every trace of the profile from every search engine or historical cache.',
  ),
  paragraph(
    'p-gg-4',
    'The accurate claim is about content accessibility, not universal erasure from the internet.',
  ),

  heading(
    'h-private-growth',
    'Should You Make Instagram Private to Gain Followers?',
    2,
  ),
  paragraph(
    'p-pg-1',
    'There is a social-media tactic where accounts go private hoping curiosity will make users request access.',
  ),
  paragraph(
    'p-pg-2',
    'We should not recommend it as a guaranteed growth strategy.',
  ),
  paragraph(
    'p-pg-3',
    'There is no Instagram documentation saying private accounts receive a follower-growth advantage.',
  ),
  paragraph(
    'p-pg-4',
    'It also removes the normal public content-discovery pathway because only approved followers can see the private posts. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pg-5',
    'For an account whose strategy depends on Reels discovery, Explore, Search or public sharing, the tradeoff is significant.',
  ),
  paragraph(
    'p-pg-6',
    'Choose privacy because you want privacy.',
  ),
  paragraph(
    'p-pg-7',
    'Not because somebody promised an algorithm trick.',
  ),

  heading(
    'h-public-reach',
    'Should You Make Instagram Public Just to Get More Reach?',
    2,
  ),
  paragraph(
    'p-pr-1',
    'Only if broader visibility fits your goals.',
  ),
  paragraph(
    'p-pr-2',
    'A public account has the potential to participate in non-follower recommendation surfaces when eligible. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-3',
    'But public status also means your posts have broader accessibility. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-4',
    'So the decision is not purely an SEO/growth decision.',
  ),
  paragraph(
    'p-pr-5',
    'It is also a privacy decision.',
  ),
  paragraph('p-pr-6', 'Ask:'),
  bullets('ul-pr-ask', [
    'Do I want strangers to access this content?',
    'Is the account intended to be public-facing?',
    'Do I need creator/business Insights?',
    'Do I want non-follower discovery?',
  ]),
  paragraph('p-pr-7', 'Then choose accordingly.'),

  heading('h-service', 'Using a Public Instagram Profile', 2),
  paragraph(
    'p-svc-1',
    'NovaLikes Instagram follower orders use the public profile information required for the supported service.',
  ),
  paragraph(
    'p-svc-2',
    'If someone wants to compare follower options, Instagram followers should be understood as a follower-count service for a public profile.',
    [{ href: '/buy-instagram-followers', label: 'Instagram followers' }],
  ),
  paragraph(
    'p-svc-3',
    'A follower service should not be presented as a reason to ignore personal privacy preferences.',
  ),
  paragraph('p-svc-4', 'Nor should it be described as guaranteeing:'),
  bullets('ul-svc-not', [
    'Explore reach,',
    'Reels distribution,',
    'organic likes,',
    'views,',
    'comments,',
    'sales,',
    'or recommendation eligibility.',
  ]),
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

  heading(
    'h-buy-private',
    'Can You Buy Followers for a Private Instagram Account?',
    2,
  ),
  paragraph(
    'p-bp-1',
    'For a service that relies on identifying and fulfilling against a public profile, private access can prevent the normal public-profile workflow.',
  ),
  paragraph(
    'p-bp-2',
    'The correct approach is to follow the actual service requirements rather than claiming that every private account can be fulfilled in the same way.',
  ),
  paragraph(
    'p-bp-3',
    'Do not ask customers for their Instagram password simply to bypass privacy.',
  ),
  paragraph(
    'p-bp-4',
    'If the supported NovaLikes follower flow requires public profile access, state that requirement clearly.',
  ),

  heading(
    'h-password',
    'Does NovaLikes Need Your Instagram Password?',
    2,
  ),
  paragraph(
    'p-pw-1',
    'For the supported Instagram follower ordering flow, no password is required.',
  ),
  paragraph(
    'p-pw-2',
    'Users should provide only the public profile information required for the selected service.',
  ),
  paragraph(
    'p-pw-3',
    'This is particularly relevant in an article about privacy.',
  ),
  paragraph(
    'p-pw-4',
    'Account credentials should remain under the user\'s control.',
  ),

  heading(
    'h-switch',
    'Can You Switch Between Public and Private?',
    2,
  ),
  paragraph(
    'p-sw-1',
    'Instagram provides an Account privacy control allowing eligible personal users to change between private and public account states. (Facebook)',
    [{ href: IG_MAKE_PRIVATE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sw-2',
    'But remember: professional accounts cannot be private. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sw-3',
    'So if you currently have a professional account and want private status, you may need to change the account type as part of that process.',
  ),
  paragraph(
    'p-sw-4',
    'That can also affect Insights access. (Facebook)',
    [{ href: IG_ACCOUNT_CONTENT_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-how-private',
    'How to Make an Instagram Account Private',
    2,
  ),
  paragraph(
    'p-hp-1',
    "Instagram's current Help Center process includes:",
  ),
  numbered('ol-private', [
    'Open Instagram settings.',
    'Go to Account privacy under the content-visibility controls.',
    'Turn on Private account.',
    'Confirm the switch.',
  ]),
  paragraph(
    'p-hp-2',
    'Instagram documents this path in its private-account guidance. (Facebook)',
    [{ href: IG_MAKE_PRIVATE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hp-3',
    'Interface wording can change over time, so follow the current options shown in your Instagram app if they differ slightly.',
  ),
  paragraph(
    'p-hp-4',
    'Professional accounts cannot use private status. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-before-private',
    'What Should You Check Before Going Private?',
    2,
  ),
  heading('h-bp-type', '1. Account Type', 3),
  paragraph(
    'p-bpv-1',
    'Are you currently using a professional account?',
  ),
  paragraph(
    'p-bpv-2',
    'Professional accounts cannot remain private. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  heading('h-bp-insights', '2. Insights', 3),
  paragraph(
    'p-bpv-3',
    'If analytics are important to you, understand that switching back to private can remove Insights access. (Facebook)',
    [{ href: IG_ACCOUNT_CONTENT_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-bp-discovery', '3. Discovery Goals', 3),
  paragraph(
    'p-bpv-4',
    'Do you depend on Reels, Explore, Search or recommendations to reach non-followers?',
  ),
  paragraph(
    'p-bpv-5',
    'Recommendation eligibility applies to public-account content. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  heading('h-bp-audience', '4. Existing Audience', 3),
  paragraph(
    'p-bpv-6',
    'Private status means future followers require approval.',
  ),
  heading('h-bp-purpose', '5. Purpose', 3),
  paragraph('p-bpv-7', 'Are you a:'),
  bullets('ul-purpose', [
    'personal user,',
    'creator,',
    'business,',
    'or public brand?',
  ]),
  paragraph(
    'p-bpv-8',
    'Your account purpose should drive the choice.',
  ),

  heading(
    'h-before-public',
    'What Should You Check Before Going Public?',
    2,
  ),
  heading('h-bpu-posts', 'Existing Posts', 3),
  paragraph(
    'p-bpu-1',
    'Are you comfortable making your content broadly visible?',
  ),
  paragraph(
    'p-bpu-2',
    'Public posts can be seen by anyone on Instagram. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  heading('h-bpu-pending', 'Pending Follow Requests', 3),
  paragraph(
    'p-bpu-3',
    'Instagram warns that pending requests can be automatically accepted when moving to a public professional configuration. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  heading('h-bpu-profile', 'Profile Information', 3),
  paragraph(
    'p-bpu-4',
    'Review what you are comfortable sharing publicly.',
  ),
  heading('h-bpu-elig', 'Recommendation Eligibility', 3),
  paragraph(
    'p-bpu-5',
    'If growth matters, understand that being public makes recommendation eligibility possible but does not guarantee distribution. (Facebook)',
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  heading('h-bpu-insights', 'Insights', 3),
  paragraph(
    'p-bpu-6',
    'Public/professional status can give you analytics that are unavailable after moving private. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-which',
    'Public vs Private Instagram: Which Is Better?',
    2,
  ),
  paragraph('p-wh-1', 'There is no universal winner.'),
  heading('h-which-public', 'Public Is Better Suited to:', 3),
  bullets('ul-which-public', [
    'creators seeking discovery,',
    'businesses,',
    'brands,',
    'public educational accounts,',
    'accounts using professional tools,',
    'and people who want broader content accessibility.',
  ]),
  heading('h-which-private', 'Private Is Better Suited to:', 3),
  bullets('ul-which-private', [
    'people prioritizing audience control,',
    'personal sharing,',
    'restricted content access,',
    'and users who want to approve followers individually.',
  ]),
  paragraph('p-wh-2', 'The correct question is not:'),
  paragraph('p-wh-3', '“Which setting gets more followers?”'),
  paragraph('p-wh-4', 'It is:'),
  paragraph(
    'p-wh-5',
    '“What is this Instagram account supposed to do?”',
  ),

  heading(
    'h-simple',
    'Public vs Private Instagram in Simple Terms',
    2,
  ),
  paragraph(
    'p-sm-1',
    'The difference can be summarized in one sentence:',
  ),
  paragraph(
    'p-sm-2',
    'A public account lets people access public content broadly, while a private account limits posts to approved followers. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sm-3',
    'From that one difference come several consequences.',
  ),
  paragraph('p-sm-4', 'Public accounts have:'),
  bullets('ul-sm-public', [
    'broader discoverability,',
    'recommendation eligibility,',
    'professional-account compatibility,',
    'and Insights access where applicable.',
  ]),
  paragraph(
    'p-sm-5',
    "Those public-account features are documented across Instagram's recommendation and Insights guidance. (Facebook)",
    [{ href: IG_RECOMMENDATION_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-sm-6', 'Private accounts have:'),
  bullets('ul-sm-private', [
    'follower approval,',
    'restricted post access,',
    'and greater audience control.',
  ]),
  paragraph('p-sm-7', 'Neither setting guarantees growth.'),
  paragraph('p-sm-8', 'Neither setting guarantees safety.'),
  paragraph(
    'p-sm-9',
    'Neither setting is right for every user.',
  ),
  paragraph('p-sm-10', 'Choose based on:'),
  bullets('ul-sm-choose', [
    'privacy',
    'purpose',
    'audience',
    'and how you want Instagram to be used.',
  ]),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Private Instagram posts can only be seen by approved followers.',
    'Public-account posts can be seen by anyone on Instagram.',
    'Instagram recommendation eligibility for non-follower surfaces applies to content from public accounts.',
    'Recommendation eligibility does not guarantee that Instagram will recommend the content.',
    'Professional Instagram accounts cannot be set to private.',
    'Switching to a private account can remove access to Instagram Insights.',
    'Public accounts can use Instagram Insights where eligible.',
    'Private should not be described as an algorithm penalty, and public should not be described as a guaranteed reach boost.',
  ]),
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
    'Making an Instagram account private changes much more than whether strangers can immediately see your posts.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['followers', 'algorithm', 'analytics', 'creator', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Public vs Private Instagram Accounts',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
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
    'Content on a public account can be visible to anyone on Instagram.',
    'Public-account content may be eligible for recommendation to non-followers.',
    'Public accounts can use Instagram Insights where other eligibility requirements are met.',
    'Only approved followers can see posts on a private account.',
    'New followers on a private account require approval.',
    'Private content is not operating as broadly accessible public recommendation content.',
    'Instagram professional accounts cannot be set to private.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between a public and private Instagram account?',
      answer:
        'Public-account posts can be viewed by anyone on Instagram, while private-account posts can only be seen by approved followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does making Instagram private reduce reach?',
      answer:
        'Private accounts restrict posts to approved followers. Public-account content can potentially be recommended to non-followers across Reels, Explore, Feed, Search and Suggested Accounts when eligible.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can a private Instagram account appear on Explore?',
      answer:
        "Instagram's non-follower recommendation eligibility applies to public-account content. Private posts are restricted to approved followers.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can a business Instagram account be private?',
      answer:
        'No. Instagram says professional accounts cannot be set to private.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do you lose Instagram Insights if you make your account private?',
      answer:
        'Meta says switching back to a private account removes access to Insights, although past data may become available again if you later return to an eligible public setup.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Does making Instagram public guarantee more followers?',
      answer:
        'No. Public status allows broader accessibility and potential recommendation eligibility, but Instagram explicitly does not guarantee that eligible content will be recommended.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Can anyone see posts from a public Instagram account?',
      answer:
        'Instagram says public-account posts can be seen by anyone on Instagram, and public profiles/posts can also be viewed through their Instagram web URL.',
      schemaEligible: true,
    },
  ],
};
