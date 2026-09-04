import { readFileSync } from 'node:fs';

const EXPECTED: Record<string, { id: string; title: string; bottomNote: string }> = {
  'buy-instagram-comments': {
    id: 'build-conversation-around-content-canada',
    title: 'Use Instagram Comments to Support Posts Built for Conversation',
    bottomNote:
      'Choose content with a clear topic first. Visible comments work better when the post already gives people a reason to respond.',
  },
  'buy-tiktok-followers': {
    id: 'why-creators-brands-build-tiktok-followers-canada',
    title: 'Build a TikTok Profile Canadian Visitors Can Understand Quickly',
    bottomNote:
      'Follower count can strengthen the profile at a glance. A clear niche, useful videos and consistent activity give that number meaning.',
  },
  'buy-tiktok-likes': {
    id: 'make-strong-content-look-active-canada',
    title: 'Put Visible Likes Behind TikToks With a Clear Purpose',
    bottomNote:
      'Use Likes selectively around videos that already represent the message, product or campaign you want people to notice.',
  },
  'buy-tiktok-views': {
    id: 'build-visible-momentum-tiktok-views-canada',
    title: 'Focus TikTok Views on Videos That Represent Your Best Work',
    bottomNote:
      'Choose the video first, then choose the Views package. The content should still be worth watching when the number is ignored.',
  },
  'buy-facebook-followers': {
    id: 'build-stronger-first-impression-facebook-canada',
    title: 'Use Follower Growth to Reinforce an Active Canadian Facebook Page',
    bottomNote:
      'A stronger follower count is more useful when the Page behind it is accurate, active and easy for visitors to understand.',
  },
  'buy-facebook-page-likes': {
    id: 'build-stronger-first-impression-page-likes-canada',
    title: 'Give Your Facebook Page Like Count More Context',
    bottomNote:
      'Page Likes can support one visible signal. Complete business information and current content provide the context behind it.',
  },
  'buy-facebook-post-likes': {
    id: 'build-stronger-visible-activity-post-likes-canada',
    title: 'Add Visible Engagement to Facebook Posts With a Clear Business Purpose',
    bottomNote:
      'Choose the post for its business or content value first, then use Post Likes to support the visible engagement around it.',
  },
};

let ok = 0;
for (const [slug, exp] of Object.entries(EXPECTED)) {
  const path = `content/markets/ca/services/${slug}.json`;
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    content?: { whyBuy?: typeof exp extends infer _ ? { id: string; title: string; description: string; bottomNote: string; items: unknown[] } : never; benefits?: { title: string; description: string } };
    dummy?: { config?: unknown; whyBuy?: { id: string; title: string; description: string; bottomNote: string; items: unknown[] } };
  };
  const wb = raw.content?.whyBuy ?? raw.dummy?.whyBuy;
  if (!wb) {
    console.error(`FAIL /ca/${slug} — whyBuy not found`);
    continue;
  }
  const benefits = raw.content?.benefits;
  const dupTitle = benefits?.title === wb.title;
  const dupDesc = benefits?.description === wb.description;
  const checks = [
    wb.id === exp.id,
    wb.title === exp.title,
    wb.bottomNote === exp.bottomNote,
    wb.items.length === 5,
    !dupTitle,
    !dupDesc,
  ];
  if (checks.every(Boolean)) {
    console.log(`OK /ca/${slug}`);
    ok++;
  } else {
    console.error(`FAIL /ca/${slug}`, { id: wb.id === exp.id, title: wb.title === exp.title, bottomNote: wb.bottomNote === exp.bottomNote, items: wb.items.length, noDupTitle: !dupTitle, noDupDesc: !dupDesc });
  }
}
console.log(`\n${ok}/7 passed`);
process.exit(ok === 7 ? 0 : 1);
