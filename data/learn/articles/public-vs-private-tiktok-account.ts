/**
 * Article #13 — Public vs Private TikTok Accounts: What Actually Changes?
 * Scheduled: Monday 21 September 2026.
 * Informational privacy/discovery intent. Distinct from /buy-tiktok-followers.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'public-vs-private-tiktok-account';
const SCHEDULED_AT = '2026-09-21T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_PUBLIC_OR_PRIVATE =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/making-your-account-public-or-private';
const TT_DUETS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/duets';
const TT_VIDEO_VISIBILITY =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/video-visibility';
const TT_UNDER_18 =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/privacy-and-safety-settings-for-users-under-age-18';
const TT_STITCH_PRIVACY =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/stitch';
const TT_STITCH_HOW =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/stitch';
const TT_PRIVACY_SETTINGS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings';
const TT_SUGGESTED_ACCOUNTS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/suggested-accounts';
const TT_PROFILE_VISIT_HISTORY =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/tiktok-profile-visit-history';
const TT_MANAGE_COMMENTS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/manage-comments';

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
    'Switching a TikTok account from public to private sounds like one simple privacy setting.',
  ),
  paragraph(
    'p-open-2',
    'In practice, it changes several parts of how other people can interact with your account.',
  ),
  paragraph('p-open-3', 'It affects:'),
  bullets('ul-open-affects', [
    'who can follow you,',
    'who can see your content,',
    'whether other people can Duet or Stitch your videos,',
    'how widely content may be shared,',
    'and how much control you have over your audience.',
  ]),
  paragraph(
    'p-open-4',
    'But making an account private does not make the profile completely invisible.',
  ),
  paragraph(
    'p-open-5',
    'TikTok says that even with a private account, your name, username and profile photo remain visible, and other people can still search for the account. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-open-6', 'So the difference is not:'),
  paragraph('p-open-7', 'Public = visible'),
  paragraph('p-open-8', 'and:'),
  paragraph('p-open-9', 'Private = invisible'),
  paragraph('p-open-10', 'A better way to understand it is:'),
  paragraph(
    'p-open-11',
    'Public account = broader access and discovery',
  ),
  paragraph(
    'p-open-12',
    'Private account = creator approval before people can access most account content',
  ),
  paragraph(
    'p-open-13',
    'The right option depends on what you want TikTok to do for you.',
  ),

  heading('h-private-what', 'What Is a Private TikTok Account?', 2),
  paragraph(
    'p-priv-1',
    'A private TikTok account gives the account owner more control over who can follow and view their content.',
  ),
  paragraph(
    'p-priv-2',
    'TikTok says that with a private account, you approve the people who are allowed to follow you and view your videos, LIVE videos, bio, likes, and follower/following lists. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-priv-3',
    'That means a random visitor cannot simply follow the account and immediately gain the same access they would normally have with a public profile.',
  ),
  paragraph('p-priv-4', 'They must request to follow.'),
  paragraph('p-priv-5', 'You then decide whether to approve them.'),
  heading('h-priv-example', 'Simple Example', 3),
  paragraph(
    'p-priv-6',
    'Suppose your private TikTok account has 500 approved followers.',
  ),
  paragraph('p-priv-7', 'Someone new finds the profile.'),
  paragraph(
    'p-priv-8',
    'They may still see basic identifying profile information such as your username and profile photo.',
  ),
  paragraph(
    'p-priv-9',
    'But to access the private content TikTok reserves for approved followers, they need to send a follow request and be approved. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-priv-10',
    'This is why private accounts are useful for people who want more control over their audience.',
  ),
  figure(
    'fig-compare',
    `${IMAGE_DIR}/public-vs-private-tiktok.png`,
    'Public vs Private TikTok: broader visibility versus an approved audience',
    'Private does not mean completely invisible. Name, username and profile photo can still remain visible.',
  ),

  heading('h-public-what', 'What Is a Public TikTok Account?', 2),
  paragraph(
    'p-pub-1',
    'A public TikTok account allows broader access to the account and its content.',
  ),
  paragraph(
    'p-pub-2',
    'TikTok explains that depending on privacy settings, public-account content may be visible and shared by anyone on or off TikTok. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pub-3',
    'That makes a public account more suitable when the goal is:',
  ),
  bullets('ul-pub-goals', [
    'content discovery,',
    'building a public creator profile,',
    'brand visibility,',
    'reaching people who do not already know you,',
    'or making content easier to share.',
  ]),
  paragraph('p-pub-4', 'But public does not mean every privacy control disappears.'),
  paragraph(
    'p-pub-5',
    "TikTok still lets users control individual post visibility and other privacy settings. TikTok's post privacy documentation specifically says different privacy settings can be applied to each post whether the overall account is public or private. (TikTok Support)",
    [{ href: TT_VIDEO_VISIBILITY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pub-6',
    'So account privacy and post privacy are related but separate controls.',
  ),

  heading(
    'h-private-videos',
    'Can a Public TikTok Account Still Have Private Videos?',
    2,
  ),
  paragraph('p-pv-1', 'Yes.'),
  paragraph(
    'p-pv-2',
    'TikTok allows creators to choose visibility for individual posts even when the overall account is public. (TikTok Support)',
    [{ href: TT_VIDEO_VISIBILITY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pv-3',
    'This is useful because you do not always need to make the entire account private just to restrict one piece of content.',
  ),
  paragraph(
    'p-pv-4',
    'For example, a public creator might publish:',
  ),
  bullets('ul-pv-example', [
    'Video A, available broadly',
    'Video B, limited to friends',
    'Video C, visible only to the creator',
  ]),
  paragraph(
    'p-pv-5',
    'depending on the privacy choices TikTok makes available to that account. (TikTok Support)',
    [{ href: TT_VIDEO_VISIBILITY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pv-6',
    'The exact visibility choices available can vary based on age and account settings. (TikTok Support)',
    [{ href: TT_UNDER_18, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-two-layers',
    'Public vs Private Does Not Replace Post-Level Privacy',
    2,
  ),
  paragraph('p-layer-1', 'This distinction is important.'),
  paragraph('p-layer-2', 'Think of TikTok privacy in two layers.'),
  heading('h-account-level', 'Account Level', 3),
  paragraph(
    'p-layer-3',
    'Is the overall account public or private?',
  ),
  heading('h-post-level', 'Post Level', 3),
  paragraph('p-layer-4', 'Who can see this particular post?'),
  paragraph(
    'p-layer-5',
    'TikTok lets creators manage post visibility separately from the overall account privacy setting. (TikTok Support)',
    [{ href: TT_VIDEO_VISIBILITY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-layer-6',
    'So a public account does not necessarily mean every video must be visible to everyone.',
  ),
  paragraph(
    'p-layer-7',
    'And a private account still allows creators to control how individual posts are shared within the limits of a private account.',
  ),

  heading(
    'h-search',
    'Can People Find a Private TikTok Account in Search?',
    2,
  ),
  paragraph('p-search-1', 'Yes.'),
  paragraph(
    'p-search-2',
    'This is one of the biggest misconceptions.',
  ),
  paragraph(
    'p-search-3',
    'A private account is not automatically removed from TikTok Search.',
  ),
  paragraph(
    'p-search-4',
    'TikTok says that with either a private or public account, people can still search for your account, and your name, username and profile photo remain visible. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-search-5',
    'So making an account private should not be understood as “Nobody can find me anymore.”',
  ),
  paragraph('p-search-6', 'It is more accurate to say:'),
  paragraph(
    'p-search-7',
    'People can find the profile, but access to much of the account is restricted until I approve them.',
  ),
  figure(
    'fig-invisible',
    `${IMAGE_DIR}/private-not-invisible.png`,
    'Private TikTok is not invisible: search can find the profile, then a follow request is needed for restricted content',
    'Privacy controls access, not necessarily discoverability of the basic profile.',
  ),

  heading(
    'h-anyone-follow',
    'Can Anyone Follow a Public TikTok Account?',
    2,
  ),
  paragraph(
    'p-af-1',
    'Public accounts generally do not require the creator to manually approve each follower in the same way a private account does.',
  ),
  paragraph(
    'p-af-2',
    'By contrast, TikTok explicitly states that a private account owner approves who can follow them. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-af-3',
    'That difference is important for growth.',
  ),
  paragraph(
    'p-af-4',
    'With a public creator account, someone may discover a video, visit the profile and follow.',
  ),
  paragraph(
    'p-af-5',
    'With a private account, the flow becomes discover profile, request follow, wait for approval, then gain access if approved.',
  ),
  paragraph('p-af-6', 'That introduces an additional step.'),
  paragraph(
    'p-af-7',
    'It gives the account owner more control but also creates more friction for audience growth.',
  ),
  paragraph(
    'p-af-8',
    'That friction is one reason some creators see TikTok views but few followers even when people discover a video: watching is not the same decision as following, and a private account adds another approval step after discovery.',
    [
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'TikTok views but few followers',
      },
    ],
  ),

  heading(
    'h-fewer',
    'Does a Private TikTok Account Get Fewer Followers?',
    2,
  ),
  paragraph(
    'p-fewer-1',
    'TikTok does not publish a rule saying private accounts lose a fixed share of follower growth.',
  ),
  paragraph('p-fewer-2', "So don't invent one."),
  paragraph(
    'p-fewer-3',
    'But there is an obvious structural difference: public accounts allow broader content access, while private accounts require follower approval for protected account content. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fewer-4',
    'That can affect how easily someone evaluates the profile before following.',
  ),
  paragraph(
    'p-fewer-5',
    'A public visitor can potentially see content first and then decide “I want more of this.”',
  ),
  paragraph(
    'p-fewer-6',
    'A private visitor may have much less content information available before sending a request.',
  ),
  paragraph(
    'p-fewer-7',
    'That does not mean one option is universally better.',
  ),
  paragraph(
    'p-fewer-8',
    'It depends on the purpose of the account.',
  ),

  heading(
    'h-growth',
    'Is a Public TikTok Account Better for Growth?',
    2,
  ),
  paragraph(
    'p-gr-1',
    'If your main objective is broad public content discovery, a public account generally fits that objective better because its content can be available to wider audiences and support more public reuse/discovery features. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-gr-2',
    'But do not turn that into “Public accounts are guaranteed more views.”',
  ),
  paragraph(
    'p-gr-3',
    'TikTok does not guarantee a specific reach level simply because an account is public.',
  ),
  paragraph(
    'p-gr-4',
    'Public status creates the possibility of broader access.',
  ),
  paragraph('p-gr-5', 'It does not guarantee:'),
  bullets('ul-gr-not', [
    'viral reach,',
    'FYP placement,',
    'search ranking,',
    'followers,',
    'likes,',
    'or views.',
  ]),
  paragraph('p-gr-6', 'Those are separate outcomes.'),
  paragraph(
    'p-gr-7',
    'Search visibility is also a separate system from account privacy. A public account can still fail to rank for a topic if the video is not a strong match for TikTok SEO.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),
  paragraph(
    'p-gr-8',
    'Follower count, likes and views are also separate metrics, so public status should not be treated as a substitute for understanding what each number actually measures.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),

  heading(
    'h-fyp',
    'Does Making Your TikTok Private Hurt the FYP?',
    2,
  ),
  paragraph(
    'p-fyp-1',
    'There is no useful basis for claiming TikTok applies a mysterious punishment simply because someone selects a legitimate privacy setting.',
  ),
  paragraph(
    'p-fyp-2',
    'The more direct explanation is that a private account intentionally restricts who can access its content, while a public account allows broader distribution according to its privacy settings. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-3',
    'That naturally changes discovery possibilities.',
  ),
  paragraph(
    'p-fyp-4',
    'It should not be described as “TikTok penalizes private accounts.”',
  ),
  paragraph(
    'p-fyp-5',
    'The user has chosen a more restrictive audience model.',
  ),
  paragraph('p-fyp-6', 'That is different from a penalty.'),

  heading(
    'h-random',
    'Can Private TikTok Videos Appear to Random People?',
    2,
  ),
  paragraph(
    'p-rand-1',
    "A private account limits content access to followers the creator approves. (TikTok Support)",
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rand-2',
    "So users should not expect a private account's protected videos to function like ordinary broadly discoverable public posts.",
  ),
  paragraph(
    'p-rand-3',
    'That is part of the purpose of choosing private status.',
  ),
  paragraph('p-rand-4', 'However, always distinguish:'),
  bullets('ul-rand', [
    'private account content',
    'from basic profile discoverability.',
  ]),
  paragraph(
    'p-rand-5',
    'The profile itself can still be searchable. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-duet',
    'Can People Duet Videos From a Private TikTok Account?',
    2,
  ),
  paragraph('p-duet-1', 'No.'),
  paragraph(
    'p-duet-2',
    "TikTok's current Duet privacy documentation says you must have a public account to allow other people to Duet with your videos. (TikTok Support)",
    [{ href: TT_DUETS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-duet-3',
    'For a public account, TikTok lets creators control who can reuse content for Duet according to the available privacy choices. (TikTok Support)',
    [{ href: TT_DUETS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-duet-4',
    'That means switching an account private removes one major form of public content reuse.',
  ),
  heading('h-duet-why', 'Why This Matters', 3),
  paragraph('p-duet-5', 'Duet can be used for:'),
  bullets('ul-duet', [
    'reactions,',
    'responses,',
    'commentary,',
    'collaboration,',
    'comparison,',
    'and creative participation.',
  ]),
  paragraph(
    'p-duet-6',
    'If that type of participation matters to your content strategy, account privacy becomes a practical consideration.',
  ),

  heading(
    'h-stitch',
    'Can People Stitch Videos From a Private TikTok Account?',
    2,
  ),
  paragraph(
    'p-st-1',
    'The same basic principle applies.',
  ),
  paragraph(
    'p-st-2',
    'TikTok says you must have a public account to allow other users to Stitch with your videos. (TikTok Support)',
    [{ href: TT_STITCH_PRIVACY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-st-3',
    "Stitch allows another creator to use part of your video within their own TikTok. (TikTok Support)",
    [{ href: TT_STITCH_HOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-st-4',
    'So a private account trades some public reuse/discovery functionality for greater control over who accesses the content.',
  ),
  figure(
    'fig-changes',
    `${IMAGE_DIR}/what-changes-private.png`,
    'What changes when a TikTok account goes from public to private: followers, content, Duet, Stitch and basic profile search',
    'Privacy changes access and reuse — not every aspect of profile visibility.',
  ),

  heading(
    'h-download',
    'Can People Download Videos From a Private TikTok Account?',
    2,
  ),
  paragraph(
    'p-dl-1',
    'A private account is more restrictive about how others can access and reuse content.',
  ),
  paragraph(
    'p-dl-2',
    "TikTok's public/private guidance says private-account users prevent others from downloading their videos. (TikTok Support)",
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-dl-3',
    'Public accounts still have privacy settings around content reuse and downloads.',
  ),
  paragraph(
    'p-dl-4',
    'The practical lesson is: if controlling redistribution matters to you, account privacy is relevant.',
  ),
  paragraph(
    'p-dl-5',
    'But remember that no online platform can guarantee that another person will never save content through some external method once they can see it.',
  ),
  paragraph(
    'p-dl-6',
    "Privacy settings control TikTok's supported platform functionality.",
  ),

  heading(
    'h-share',
    'Can People Share a Private TikTok Video Outside TikTok?',
    2,
  ),
  paragraph(
    'p-sh-1',
    'TikTok distinguishes private and public accounts partly around broader sharing.',
  ),
  paragraph(
    'p-sh-2',
    'TikTok says public-account content may, depending on privacy settings, be visible and shared by anyone on or off TikTok. Private accounts place more restrictions around who can access their content. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sh-3',
    'This is particularly important for creators who want:',
  ),
  bullets('ul-share', [
    'website embeds,',
    'public sharing,',
    'content circulation,',
    'or broad social distribution.',
  ]),
  paragraph(
    'p-sh-4',
    'A private account is intentionally designed for more controlled access.',
  ),

  heading(
    'h-hidden-followers',
    'Are Followers Hidden on a Private TikTok Account?',
    2,
  ),
  paragraph(
    'p-hf-1',
    'TikTok says that with a private account, only people you approve can view information including your follower and following lists. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-hf-2',
    'So a random non-approved visitor should not have the same access to those account details as an approved follower.',
  ),
  paragraph(
    'p-hf-3',
    'This is another difference between basic profile visibility and full account visibility.',
  ),
  paragraph('p-hf-4', 'Your username may remain searchable.'),
  paragraph(
    'p-hf-5',
    'Your audience information can still be restricted.',
  ),

  heading(
    'h-likes',
    'Can People See Your Likes on a Private TikTok Account?',
    2,
  ),
  paragraph(
    'p-lk-1',
    "TikTok's private-account guidance includes likes among the account information limited to people the account owner approves. (TikTok Support)",
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-lk-2',
    'TikTok also has separate privacy controls around liked videos.',
  ),
  paragraph(
    'p-lk-3',
    'This illustrates a recurring point: TikTok privacy is not one switch controlling everything.',
  ),
  paragraph('p-lk-4', 'You have:'),
  bullets('ul-privacy-layers', [
    'account privacy,',
    'post visibility,',
    'interaction privacy,',
    'reuse settings,',
    'messaging settings,',
    'and other controls.',
  ]),
  paragraph(
    'p-lk-5',
    'A privacy-conscious user should review the full Privacy section rather than assume the Private Account toggle handles every possible interaction. (TikTok Support)',
    [{ href: TT_PRIVACY_SETTINGS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-existing',
    'What Happens to Existing Followers When You Make TikTok Private?',
    2,
  ),
  paragraph(
    'p-ex-1',
    'Do not assume switching private automatically removes every existing follower.',
  ),
  paragraph(
    'p-ex-2',
    'The private-account model gives the creator control over who follows and accesses protected content, and TikTok separately provides tools for removing individual followers if needed. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ex-3',
    'So if there are existing followers you no longer want accessing the account, review the follower list and remove them individually where appropriate.',
  ),
  paragraph(
    'p-ex-4',
    'Privacy status and follower-management actions are separate controls.',
  ),

  heading(
    'h-business',
    'Should a Business TikTok Account Be Public?',
    2,
  ),
  paragraph(
    'p-biz-1',
    'For most businesses trying to use TikTok for brand discovery, customer education, content marketing or reaching new audiences, a public account usually aligns more naturally with those goals because the content is intended for a broad public audience.',
  ),
  paragraph(
    'p-biz-2',
    'But this is a strategy recommendation, not a TikTok requirement.',
  ),
  paragraph(
    'p-biz-3',
    'A business may have a legitimate reason for keeping an account private.',
  ),
  paragraph(
    'p-biz-4',
    'The important thing is to understand the tradeoff:',
  ),
  paragraph('p-biz-5', 'Public prioritizes accessibility.'),
  paragraph('p-biz-6', 'Private prioritizes audience approval.'),
  paragraph(
    'p-biz-7',
    'Neither is morally or universally “better.”',
  ),

  heading(
    'h-personal',
    'Should a Personal TikTok Account Be Private?',
    2,
  ),
  paragraph(
    'p-per-1',
    "That depends on the person's privacy preferences.",
  ),
  paragraph(
    'p-per-2',
    'Someone might prefer private because they want to:',
  ),
  bullets('ul-personal', [
    'approve followers,',
    'share primarily with people they know,',
    'limit content reuse,',
    'or reduce broad public exposure.',
  ]),
  paragraph(
    'p-per-3',
    'TikTok also applies additional default privacy and safety settings to younger users, with age affecting account privacy and certain interaction features. (TikTok Support)',
    [{ href: TT_UNDER_18, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-per-4',
    "For teenagers in particular, account settings should be understood in the context of TikTok's age-specific privacy protections rather than generic adult-account advice.",
  ),

  heading('h-teen', 'What About Teen TikTok Accounts?', 2),
  paragraph('p-teen-1', 'Age matters.'),
  paragraph(
    'p-teen-2',
    'TikTok applies different privacy and safety defaults for younger users. Its current teen privacy guidance documents age-specific differences for private/public status and features such as direct messaging and content reuse. (TikTok Support)',
    [{ href: TT_UNDER_18, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-teen-3',
    'So an article saying every TikTok user can configure every privacy feature identically would be inaccurate.',
  ),
  paragraph('p-teen-4', 'Some controls depend on:'),
  bullets('ul-teen', [
    'age,',
    'account type,',
    'location,',
    'and current TikTok product rules.',
  ]),
  paragraph(
    'p-teen-5',
    "For younger users, use TikTok's current teen safety documentation rather than an older generic tutorial.",
  ),

  heading(
    'h-suggest',
    'Can a Private Account Be Suggested to Other People?',
    2,
  ),
  paragraph(
    'p-sug-1',
    'TikTok has a separate Suggest your account to others system. Account suggestion settings can include ways an account may be suggested through contacts and connections. (TikTok Support)',
    [{ href: TT_SUGGESTED_ACCOUNTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sug-2',
    'This reinforces the point that account privacy and account discoverability are not exactly the same control.',
  ),
  paragraph(
    'p-sug-3',
    'Do not assume that making an account private is identical to deleting it from discovery.',
  ),
  paragraph(
    'p-sug-4',
    'TikTok provides separate settings for different forms of visibility and recommendation. (TikTok Support)',
    [{ href: TT_PRIVACY_SETTINGS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-profile-views',
    'Does Private TikTok Stop Profile Views?',
    2,
  ),
  paragraph('p-pvw-1', 'No.'),
  paragraph(
    'p-pvw-2',
    'A private account can still be searched and its basic profile information can remain visible. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pvw-3',
    'TikTok also has a separate Profile View History feature with its own eligibility and settings. (TikTok Support)',
    [{ href: TT_PROFILE_VISIT_HISTORY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pvw-4',
    'So private account and profile view history should not be treated as the same feature.',
  ),
  paragraph(
    'p-pvw-5',
    'TikTok privacy settings often control different aspects independently.',
  ),

  heading('h-creators', 'Public vs Private TikTok for Creators', 2),
  paragraph(
    'p-cr-1',
    'Creators should decide based on what they want the account to accomplish.',
  ),
  heading('h-choose-public', 'Choose Public If You Mainly Want', 3),
  bullets('ul-choose-public', [
    'broader discovery,',
    'easy audience growth,',
    'public content sharing,',
    'Duet/Stitch participation,',
    'and open creator visibility.',
  ]),
  heading('h-choose-private', 'Choose Private If You Mainly Want', 3),
  bullets('ul-choose-private', [
    'manual follower approval,',
    'more control over content access,',
    'reduced public reuse,',
    'and a more restricted audience.',
  ]),
  paragraph('p-cr-2', 'The important question is:'),
  paragraph(
    'p-cr-3',
    'What level of visibility do you actually want?',
  ),
  paragraph(
    'p-cr-4',
    'Do not choose public because somebody promised “Public automatically goes viral.”',
  ),
  paragraph(
    'p-cr-5',
    'And do not choose private because somebody claimed “Private accounts cannot be found at all.”',
  ),
  paragraph('p-cr-6', 'Both are oversimplifications.'),

  heading(
    'h-service',
    'Public Profiles and TikTok Follower Services',
    2,
  ),
  paragraph(
    'p-svc-1',
    'NovaLikes TikTok follower ordering uses public profile information for the supported ordering flow.',
  ),
  paragraph(
    'p-svc-2',
    'If someone wants to compare follower packages, TikTok followers should be understood as a follower-count service for a public profile.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-svc-3',
    "But a follower service should not be presented as a reason to weaken someone's privacy preferences.",
  ),
  paragraph(
    'p-svc-4',
    'If the service requires a public profile for fulfillment, state that clearly.',
  ),
  paragraph(
    'p-svc-5',
    'Do not tell users “Keep your account public because public accounts rank better.”',
  ),
  paragraph('p-svc-6', 'Do not promise:'),
  bullets('ul-svc-not', [
    'FYP reach,',
    'search ranking,',
    'organic growth,',
    'or engagement',
  ]),
  paragraph(
    'p-svc-7',
    'as a result of the follower service.',
  ),
  {
    id: 'cta-tt-followers',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Using a Public TikTok Profile?',
    description:
      'NovaLikes TikTok follower orders use the public profile information required for the selected service. You do not need to provide your TikTok password.',
    label: 'View TikTok Followers',
  },

  heading(
    'h-password',
    'Does NovaLikes Need Your TikTok Password?',
    2,
  ),
  paragraph(
    'p-pw-1',
    'For the supported TikTok follower ordering flow, no password is required.',
  ),
  paragraph(
    'p-pw-2',
    'The service should only ask for the public profile information required to identify the intended account.',
  ),
  paragraph(
    'p-pw-3',
    'This distinction fits especially well in an article about account privacy:',
  ),
  paragraph(
    'p-pw-4',
    'Never provide an account password simply because a third-party service asks for it unnecessarily.',
  ),
  paragraph('p-pw-5', 'Keep login credentials under your control.'),

  heading(
    'h-switch',
    'Can You Switch From Private to Public Later?',
    2,
  ),
  paragraph('p-sw-1', 'Yes.'),
  paragraph(
    'p-sw-2',
    'TikTok provides a privacy setting that lets eligible users switch their account between private and public. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sw-3',
    'That means the decision does not necessarily have to be permanent.',
  ),
  paragraph('p-sw-4', 'You might:'),
  bullets('ul-switch', [
    'start private,',
    'later become a public creator,',
    'or temporarily reconsider how you want the account to be used.',
  ]),
  paragraph('p-sw-5', 'Whenever you change it, review the related:'),
  bullets('ul-switch-review', [
    'post settings,',
    'Duet/Stitch settings,',
    'suggested-account settings,',
    'comments,',
    'and other privacy controls too.',
  ]),
  paragraph(
    'p-sw-6',
    'Do not assume changing one toggle automatically configures everything else the way you want.',
  ),

  heading('h-how-private', 'How to Make a TikTok Account Private', 2),
  paragraph("p-hp-1", "TikTok's current process is:"),
  numbered('ol-private', [
    'Open Profile',
    'Open the Menu',
    'Choose Settings and privacy',
    'Select Privacy',
    'Turn Private account on.',
  ]),
  paragraph(
    'p-hp-2',
    'TikTok documents this path in its public-or-private account guidance. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-hp-3',
    'TikTok can change interface wording over time, so always follow the options currently displayed in the app if they differ slightly.',
  ),

  heading('h-how-public', 'How to Make TikTok Public Again', 2),
  paragraph(
    'p-hpu-1',
    'Use the same account privacy area and turn the Private Account option off, subject to any age/account restrictions TikTok applies. (TikTok Support)',
    [{ href: TT_PUBLIC_OR_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-hpu-2',
    'Before doing that, consider reviewing old posts.',
  ),
  paragraph(
    'p-hpu-3',
    'A video you were comfortable sharing with an approved private audience may not be something you want broadly available after switching public.',
  ),
  paragraph(
    'p-hpu-4',
    'Account visibility decisions should consider the existing content library, not only future posts.',
  ),

  heading(
    'h-check',
    'A Simple Privacy Check Before Going Public',
    2,
  ),
  paragraph(
    'p-ck-1',
    'Before switching a private TikTok account public, review:',
  ),
  heading('h-check-1', '1. Existing Videos', 3),
  paragraph(
    'p-ck-2',
    'Are you comfortable with broader access?',
  ),
  heading('h-check-2', '2. Bio', 3),
  paragraph(
    'p-ck-3',
    'Does it reveal anything you do not want publicly visible?',
  ),
  heading('h-check-3', '3. Followers/Following', 3),
  paragraph(
    'p-ck-4',
    'Understand how broader account visibility changes who can interact with the profile.',
  ),
  heading('h-check-4', '4. Duet and Stitch', 3),
  paragraph(
    'p-ck-5',
    'Review whether you want content reuse enabled. TikTok provides separate privacy controls for both features. (TikTok Support)',
    [{ href: TT_DUETS, label: 'TikTok Support', external: true }],
  ),
  heading('h-check-5', '5. Comments', 3),
  paragraph(
    'p-ck-6',
    'Review who is allowed to comment and whether comment filtering is configured appropriately. TikTok offers separate comment controls and filtering options. (TikTok Support)',
    [{ href: TT_MANAGE_COMMENTS, label: 'TikTok Support', external: true }],
  ),
  heading('h-check-6', '6. Suggested Account Settings', 3),
  paragraph(
    'p-ck-7',
    'Review whether and how TikTok can suggest your account to other people. (TikTok Support)',
    [{ href: TT_SUGGESTED_ACCOUNTS, label: 'TikTok Support', external: true }],
  ),
  heading('h-check-7', '7. Individual Post Visibility', 3),
  paragraph(
    'p-ck-8',
    'Check any post that should remain limited even if the account becomes public. (TikTok Support)',
    [{ href: TT_VIDEO_VISIBILITY, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-which',
    'Public vs Private TikTok: Which Should You Choose?',
    2,
  ),
  paragraph('p-wh-1', 'There is no universal answer.'),
  paragraph(
    'p-wh-2',
    'Use a private account if your priority is control over who follows and accesses your content.',
  ),
  paragraph(
    'p-wh-3',
    'Use a public account if your priority is making content broadly accessible and discoverable.',
  ),
  paragraph(
    'p-wh-4',
    'A creator or brand normally benefits from public accessibility because their goal is usually reaching people they do not already know.',
  ),
  paragraph(
    'p-wh-5',
    'A personal user may reasonably prioritize privacy instead.',
  ),
  paragraph('p-wh-6', 'The decision should reflect:'),
  bullets('ul-which', [
    'your audience,',
    'content,',
    'age,',
    'risk tolerance,',
    'and reason for using TikTok.',
  ]),
  paragraph('p-wh-7', 'Not a generic growth hack.'),

  heading(
    'h-simple',
    'Public and Private TikTok Accounts in Simple Terms',
    2,
  ),
  paragraph(
    'p-sm-1',
    'Think of the difference like this:',
  ),
  heading('h-simple-public', 'Public Account', 3),
  paragraph(
    'p-sm-2',
    'People can discover and access my public content broadly, subject to my settings.',
  ),
  heading('h-simple-private', 'Private Account', 3),
  paragraph(
    'p-sm-3',
    'People can find my basic profile, but I decide who gets access to much of my account and content.',
  ),
  paragraph(
    'p-sm-4',
    'That one distinction explains most of the practical differences.',
  ),
  paragraph('p-sm-5', 'Going private changes access.'),
  paragraph('p-sm-6', 'It does not erase the account.'),
  paragraph('p-sm-7', 'Going public increases accessibility.'),
  paragraph('p-sm-8', 'It does not guarantee reach.'),
  paragraph(
    'p-sm-9',
    'Understanding those tradeoffs makes it much easier to choose the setting that actually fits how you want to use TikTok.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Private TikTok accounts let the creator approve who can follow and view protected account content.',
    "A private account's name, username and profile photo can still be visible, and the account can still be searched.",
    'Public accounts allow broader content access and sharing depending on privacy settings.',
    'TikTok lets creators set visibility separately for individual posts whether the overall account is private or public.',
    'Other users can only Duet or Stitch your content when your account is public and the relevant reuse permissions allow it.',
    'Making an account private should not be described as an algorithm penalty; it intentionally restricts audience access.',
    'Making an account public does not guarantee FYP reach, followers, likes or views.',
  ]),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'internal_cta') {
    return `${block.heading ?? ''} ${block.description ?? ''} ${block.label}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const PUBLIC_VS_PRIVATE_TIKTOK_ACCOUNT_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-public-vs-private-tiktok-account',
  slug: SLUG,
  title: 'Public vs Private TikTok Accounts: What Actually Changes?',
  excerpt:
    'Switching a TikTok account from public to private sounds like one simple privacy setting.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'algorithm', 'creator', 'engagement', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Public vs Private TikTok Accounts',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'Public vs Private TikTok Accounts: What Changes?',
    description:
      'Learn what changes when a TikTok account is public or private, including followers, video visibility, Duet, Stitch, search and account discovery.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'public vs private TikTok account',
      'TikTok private account',
      'TikTok public account',
      'what happens when TikTok is private',
      'can people find private TikTok accounts',
      'private TikTok followers',
      'TikTok privacy settings',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'how-to-get-1000-tiktok-followers',
    'how-many-followers-to-go-live-on-tiktok',
    'why-tiktok-followers-drop',
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
    'Public accounts generally allow following without creator approval, subject to TikTok settings and age-based restrictions.',
    'Public content can have broader visibility, including Duet and Stitch when those features are enabled.',
    'Private accounts require the creator to approve who can follow.',
    'Only approved followers can access the content and account information TikTok restricts to followers.',
    'Other users cannot Duet or Stitch videos from a private account.',
    'Name, username and profile photo can still be visible, and people can still search for the account.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Can people see a private TikTok account?',
      answer:
        "They can still find basic profile information. TikTok says name, username and profile photo remain visible, and private accounts can still be searched. Access to much of the account's content requires creator approval.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can anyone follow a private TikTok account?',
      answer:
        'People can request to follow, but the account owner decides whom to approve.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can private TikTok videos appear on the FYP for random users?',
      answer:
        'Private-account content is restricted to followers approved by the account owner, so it should not be treated like broadly accessible public content.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can people Duet a private TikTok video?',
      answer:
        'No. TikTok says a public account is required to allow others to Duet with your videos.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can people Stitch a private TikTok video?',
      answer:
        'No. TikTok says a public account is required for other users to Stitch with your videos.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can I hide one TikTok without making my whole account private?',
      answer:
        'Yes. TikTok provides post-level visibility controls separately from the overall account privacy setting.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Does a private TikTok account disappear from search?',
      answer:
        'No. TikTok says other people can still search for a private account.',
      schemaEligible: true,
    },
  ],
};
