import type { LearnCategoryId } from '@/types/learn';

export type EditorialPlanItem = {
  date: string;
  title: string;
  slug: string;
  category: LearnCategoryId;
};

function categoryFromSlug(slug: string): LearnCategoryId {
  if (slug.includes('tiktok')) return 'tiktok';
  if (slug.includes('instagram')) return 'instagram';
  if (slug.includes('facebook')) return 'facebook';
  return 'guides';
}

function item(date: string, title: string, slug: string): EditorialPlanItem {
  return { date, title, slug, category: categoryFromSlug(slug) };
}

/** NovaLikes Learn editorial calendar — planning metadata only, never auto-published. */
export const NOVALIKES_EDITORIAL_PLAN: readonly EditorialPlanItem[] = [
  item('2026-08-24', 'TikTok Followers vs Likes vs Views: What’s the Difference?', 'tiktok-followers-vs-likes-vs-views'),
  item('2026-08-26', 'Why Do TikTok Videos Get Views but No Followers?', 'tiktok-views-but-no-followers'),
  item(
    '2026-08-28',
    'Instagram Followers vs Likes vs Views vs Comments: What Each Metric Means',
    'instagram-followers-vs-likes-vs-views-vs-comments',
  ),
  item('2026-08-31', 'TikTok SEO in 2026: How to Rank Videos in TikTok Search', 'tiktok-seo'),
  item('2026-09-02', 'How the Instagram Algorithm Works in 2026: Feed, Reels, Explore & Stories', 'how-instagram-algorithm-works'),
  item('2026-09-04', 'Facebook Followers vs Page Likes vs Post Likes: What’s the Difference?', 'facebook-followers-vs-page-likes-vs-post-likes'),
  item('2026-09-07', 'Can Buying TikTok Followers Affect FYP Reach or Account Safety?', 'buying-tiktok-followers-fyp-account-safety'),
  item('2026-09-09', 'Why Do Instagram Followers Drop? Common Reasons Explained', 'why-instagram-followers-drop'),
  item('2026-09-11', 'How Facebook Page Reach Works in 2026', 'how-facebook-page-reach-works'),
  item('2026-09-14', 'How Are TikTok Video Views Counted?', 'how-tiktok-video-views-are-counted'),
  item('2026-09-16', 'How Are Instagram Reels Views Counted?', 'how-instagram-reels-views-are-counted'),
  item('2026-09-18', 'How to Get More Facebook Page Followers Organically', 'how-to-get-more-facebook-page-followers'),
  item('2026-09-21', 'Public vs Private TikTok Accounts: What Actually Changes?', 'public-vs-private-tiktok-account'),
  item('2026-09-23', 'Public vs Private Instagram Accounts: What Changes for Followers and Reach?', 'public-vs-private-instagram-account'),
  item('2026-09-25', 'How to Get More Likes on a Facebook Post Without Ads', 'how-to-get-more-likes-on-facebook-post'),
  item('2026-09-28', 'How to Get Your First 1,000 TikTok Followers Organically', 'how-to-get-1000-tiktok-followers'),
  item('2026-09-30', 'How to Grow Instagram Followers Organically in 2026', 'how-to-grow-instagram-followers-organically'),
  item('2026-10-02', 'Why Do Facebook Page Followers Drop or Change?', 'why-facebook-page-followers-drop'),
  item('2026-10-05', 'How Many Followers Do You Need to Go LIVE on TikTok?', 'how-many-followers-to-go-live-on-tiktok'),
  item('2026-10-07', 'How to View an Instagram Profile Picture in Full Size', 'view-instagram-profile-picture-full-size'),
  item('2026-10-09', 'How to Download a Public Facebook Video', 'how-to-download-facebook-video'),
  item('2026-10-12', 'Why Do TikTok Followers Drop? Common Causes Explained', 'why-tiktok-followers-drop'),
  item('2026-10-14', 'How to Check an Instagram Follower Count Without Logging In', 'check-instagram-follower-count-without-login'),
  item('2026-10-16', 'How to Download a Public Facebook Reel', 'how-to-download-facebook-reel'),
  item('2026-10-19', 'TikTok Likes vs Views: Which Metric Matters for What?', 'tiktok-likes-vs-views'),
  item('2026-10-21', 'How to View a Public Instagram Profile Without Logging In', 'view-instagram-profile-without-login'),
  item('2026-10-23', 'Facebook Page Likes vs Followers in 2026: What Page Owners Should Know', 'facebook-page-likes-vs-followers'),
  item('2026-10-26', 'How to Save a TikTok Profile Picture in Full Size', 'how-to-save-tiktok-profile-picture-full-size'),
  item('2026-10-28', 'How to Download a Public TikTok Video', 'how-to-download-public-tiktok-video'),
  item('2026-10-30', 'How to Download Public Instagram Videos and Reels', 'how-to-download-instagram-videos-reels'),
];
