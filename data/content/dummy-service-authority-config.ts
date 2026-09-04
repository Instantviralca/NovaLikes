import type { InstagramFollowersPageConfig } from '@/data/content/instagram-followers-page-config';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { getServiceBySlug } from '@/data/services';
import type { Service } from '@/types/service';

const ICONS = [
  'users',
  'heart',
  'sparkles',
  'headphones',
  'clapperboard',
  'briefcase',
  'megaphone',
  'lock',
  'shield-check',
  'credit-card',
  'truck',
] as const;

type IconKey = (typeof ICONS)[number];

function icon(index: number): IconKey {
  return ICONS[index % ICONS.length]!;
}

function card(
  prefix: string,
  index: number,
  title: string,
  description: string,
): { id: string; title: string; description: string; icon: IconKey } {
  return { id: `${prefix}-${index}`, title, description, icon: icon(index) };
}

const RELATED_BY_SLUG: Record<string, string[]> = {
  'buy-instagram-likes': ['buy-instagram-followers', 'buy-instagram-views', 'buy-instagram-comments'],
  'buy-instagram-views': ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-comments'],
  'buy-instagram-comments': ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-views'],
  'buy-tiktok-followers': ['buy-tiktok-likes', 'buy-tiktok-views'],
  'buy-tiktok-likes': ['buy-tiktok-followers', 'buy-tiktok-views'],
  'buy-tiktok-views': ['buy-tiktok-followers', 'buy-tiktok-likes'],
  'buy-facebook-followers': ['buy-facebook-page-likes', 'buy-facebook-post-likes'],
  'buy-facebook-page-likes': ['buy-facebook-followers', 'buy-facebook-post-likes'],
  'buy-facebook-post-likes': ['buy-facebook-followers', 'buy-facebook-page-likes'],
};

function siblingLabel(slug: string): string {
  const service = getServiceBySlug(slug);
  if (!service) return 'Related Service';
  return `${service.platform.charAt(0).toUpperCase()}${service.platform.slice(1)} ${service.shortName}`;
}

export type DummyAuthorityPage = {
  config: InstagramFollowersPageConfig;
  whyBuy: {
    id: string;
    title: string;
    description: string;
    items: Array<{ id: string; title: string; description: string }>;
    bottomNote: string;
  };
  howToBuy: {
    id: string;
    title: string;
    description: string;
    steps: Array<{ id: string; title: string; description: string }>;
  };
  relatedHeading: string;
  relatedIntro: string;
};

export function buildDummyAuthorityPage(service: Service): DummyAuthorityPage {
  const slug = service.slug;
  const label = `${service.navigationLabel.replace(/^Buy /, '')}`;
  const platform =
    service.platform.charAt(0).toUpperCase() + service.platform.slice(1);
  const unit = service.shortName;
  const relatedSlugs = RELATED_BY_SLUG[slug] ?? [];
  const relatedA = relatedSlugs[0];
  const relatedB = relatedSlugs[1];
  const relatedC = relatedSlugs[2];
  const p = slug;

  const copyBySlug: InstagramFollowersPageConfig['relatedPackages']['copyBySlug'] = {};
  for (const relatedSlug of relatedSlugs) {
    const title = siblingLabel(relatedSlug);
    copyBySlug[relatedSlug] = {
      title,
      description: `Open ${title} if you want a different ${platform} service than ${unit.toLowerCase()}.`,
      ctaLabel: `View ${title}`,
    };
  }

  const likesHref = relatedA ? `/${relatedA}` : '/services';
  const viewsHref = relatedB ? `/${relatedB}` : relatedC ? `/${relatedC}` : '/services';
  const commentsHref = relatedC ? `/${relatedC}` : '/services';

  const config: InstagramFollowersPageConfig = {
    whyChoose: {
      id: `${p}-why-choose`,
      title: `Why Choose NovaLikes for ${label}?`,
      description: `This section uses the same layout as Buy Instagram Followers. Replace this copy with approved ${label} content later.`,
      items: [
        card(p, 0, 'Compare Package Sizes', `Choose a ${unit.toLowerCase()} quantity that fits the selected ${platform} account or content.`),
        card(p, 1, 'Public Details Only', 'Orders use public profile or content details. A password is not required.'),
        card(p, 2, 'Secure Checkout', 'Review the selected package and price before completing payment.'),
        card(p, 3, 'Order Tracking', 'Use the available tracking option to check status after checkout.'),
      ],
    },
    whyBuyNote: `The right ${unit.toLowerCase()} package depends on the account and the metric you want to change.`,
    orderNotice: 'Keep submitted public details unchanged while an order is processed.',
    canYouBuy: {
      id: `${p}-can-you-buy`,
      title: `Can You Buy ${label}?`,
      description: `${label} packages can be ordered through NovaLikes by choosing a quantity and providing the required public details.`,
      cards: [
        card(p, 4, 'What This Service Changes', `This package is focused on ${unit.toLowerCase()} for the selected ${platform} destination.`),
        card(p, 5, 'What You Need to Order', 'Provide the correct public username or content URL and complete checkout.'),
        card(p, 6, 'What It Does Not Include', 'This service does not automatically include other metrics such as extra followers, likes, views, or comments unless those are ordered separately.'),
      ],
      closingNote: 'Confirm the selected service and quantity before checkout.',
    },
    doesBuyingHelp: {
      id: `${p}-does-buying-help`,
      // Intentionally empty in English — geo markets supply copy via overlay;
      // locale packs skip blank strings. Do not add placeholder English here.
      title: '',
      description: '',
      helpTitle: '',
      helpItems: [],
      limitTitle: '',
      limitItems: [],
      closingNote: '',
    },
    whatHappens: {
      id: `${p}-what-happens`,
      title: `What Happens After You Buy ${label}?`,
      description: 'After checkout, the submitted public details are used to process the selected package.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Order Details Are Checked',
          description: 'The selected package is associated with the public username or URL you submitted.',
        },
        {
          id: `${p}-th-2`,
          title: 'Delivery Uses Submitted Details',
          description: 'Keep the submitted account or content details unchanged while the order is processed.',
        },
        {
          id: `${p}-th-3`,
          title: 'Timing Can Vary',
          description: 'Processing time can vary by package size and current order conditions.',
        },
        {
          id: `${p}-th-4`,
          title: 'You Can Check Status',
          description: 'Use order tracking or contact support with your order information if you need help.',
        },
      ],
      closingNote: 'Contact support if a necessary account change affects an existing order.',
    },
    serviceCompare: {
      id: `${p}-service-compare`,
      title: `${platform} ${unit} vs Other ${platform} Services`,
      description: `Compare ${unit.toLowerCase()} with other ${platform} services before you order.`,
      current: {
        title: label,
        description: `Choose ${label} when ${unit.toLowerCase()} is the metric you want to change.`,
        bestFor: `Accounts or content where ${unit.toLowerCase()} is the selected metric.`,
        ctaLabel: label,
      },
      likes: {
        title: relatedA ? siblingLabel(relatedA) : 'Related Service A',
        description: 'This card is a dummy related-service comparison.',
        bestFor: 'Accounts or content where this related metric is the selected goal.',
        href: likesHref,
        ctaLabel: relatedA ? `View ${siblingLabel(relatedA)}` : 'View Services',
      },
      views: {
        title: relatedB ? siblingLabel(relatedB) : relatedC ? siblingLabel(relatedC) : 'Related Service B',
        description: 'This card is a dummy related-service comparison.',
        bestFor: 'Accounts or content where this related metric is the selected goal.',
        href: viewsHref,
        ctaLabel: relatedB
          ? `View ${siblingLabel(relatedB)}`
          : relatedC
            ? `View ${siblingLabel(relatedC)}`
            : 'View Services',
      },
      combinedNote: 'Other related services may be available separately.',
      commentsHref,
    },
    beforeBuying: {
      id: `${p}-before-buying`,
      title: `What to Check Before Buying ${label}`,
      description: 'Review quantity, price, public details, and support options before checkout.',
      framingNote: 'Do not treat dummy claims as live service promises.',
      items: [
        card(p, 7, 'Check the Quantity', 'Confirm the selected package size before ordering.'),
        card(p, 8, 'Confirm the Price', 'Review the displayed price before checkout.'),
        card(p, 9, 'Use the Correct Public Details', 'Check the username or content URL carefully.'),
        card(p, 10, 'Read Relevant Policies', 'Review applicable terms before purchase.'),
        card(p, 11, 'Know How to Get Help', 'Tracking and support options are available after checkout.'),
      ],
    },
    worldwide: {
      id: `${p}-worldwide`,
      title: `Preparing Your ${label} Order`,
      description: `Before placing a ${label} order, confirm the correct public destination and review the selected package.`,
      eyebrow: `Ready for ${label}`,
      closingNote: 'Confirm the submitted public details and selected package before checkout.',
      cards: [
        card(p, 12, 'Check the Submitted Details', 'Confirm the public username or content URL before completing checkout.'),
        card(p, 13, 'Keep the Destination Accessible', 'Keep the submitted profile or content publicly accessible where the service requires it.'),
        card(p, 14, 'Review the Package', 'Check the selected quantity and price before ordering.'),
        card(p, 15, 'Use Support If Needed', 'Contact support with relevant order information if you have a question after checkout.'),
      ],
    },
    packageSizes: {
      id: `${p}-popular-packages`,
      title: `Popular ${label} Packages`,
      description: 'These example quantities follow the Instagram Followers layout. Live prices remain in the pricing section above.',
      rows: [
        { id: `${p}-pkg-100`, quantity: `100 ${unit}`, recommendedFor: 'A smaller example quantity.' },
        { id: `${p}-pkg-500`, quantity: `500 ${unit}`, recommendedFor: 'A mid-range example quantity.' },
        { id: `${p}-pkg-1k`, quantity: `1,000 ${unit}`, recommendedFor: 'A larger example quantity.' },
        { id: `${p}-pkg-5k`, quantity: `5,000 ${unit}`, recommendedFor: 'A higher-volume example quantity.' },
        { id: `${p}-pkg-10k`, quantity: `10,000+ ${unit}`, recommendedFor: 'A larger-quantity example.' },
      ],
    },
    bestPractices: {
      id: `${p}-best-practices`,
      title: `Best Practices After Buying ${label}`,
      description: 'Keep publishing and managing the account after an order.',
      closingNote: 'Package volume is only one part of the selected profile or content.',
      items: [
        card(p, 16, 'Keep Publishing', 'Continue posting instead of treating an order as a replacement for content.'),
        card(p, 17, 'Keep Profile Details Complete', 'Use accurate public profile information.'),
        card(p, 18, 'Create Relevant Content', 'Plan content around the audience you want to reach.'),
        card(p, 19, 'Review Available Insights', 'Use native analytics where they are available.'),
        card(p, 20, 'Use Multiple Formats', 'Test the content formats that make sense for the account.'),
        card(p, 21, 'Respond to Real Interactions', 'Reply to genuine comments and messages when appropriate.'),
      ],
    },
    commonMistakes: {
      id: `${p}-common-mistakes`,
      title: `Common Mistakes When Buying ${label}`,
      description: 'Check a few details before and after ordering.',
      closingNote: 'Review public details, selected service, quantity, and price before checkout.',
      items: [
        card(p, 22, 'Entering the Wrong Details', 'Check the username or content URL before checkout.'),
        card(p, 23, 'Choosing the Wrong Service', 'Followers, likes, views, and comments are different services.'),
        card(p, 24, 'Skipping the Quantity Check', 'Review the selected package size before ordering.'),
        card(p, 25, 'Expecting Content to Be Replaced', 'A larger count does not replace publishing work.'),
        card(p, 26, 'Expecting Guaranteed Reach', 'Do not assume automatic engagement, sales, or organic growth.'),
        card(p, 27, 'Changing Details During an Order', 'Avoid changing submitted details while an order is processing.'),
      ],
    },
    relatedPackages: { copyBySlug },
  };

  if (slug === 'buy-instagram-likes') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Instagram Likes?',
      description:
        'NovaLikes makes it easy to compare Instagram likes packages before you order. Choose the quantity you need for a specific post or Reel, check the price, provide the correct public content URL, and track your order after checkout.',
      items: [
        card(
          p,
          0,
          'Different Like Quantities',
          'Compare smaller and larger like packages to find a quantity that makes sense for the Instagram content you are working on.',
        ),
        card(
          p,
          1,
          'Clear Package Pricing',
          'See the price for each Instagram likes package before adding your selection to the cart.',
        ),
        card(
          p,
          2,
          'For Specific Posts and Reels',
          'Choose the public Instagram post or Reel where you want the likes added instead of making changes to your overall follower count.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Instagram likes order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Instagram Likes?',
      description:
        'Yes. Instagram likes can be purchased for eligible public posts and Reels. With NovaLikes, you choose a likes package, provide the public URL of the Instagram content you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What an Instagram Likes Order Changes',
          'An Instagram likes order increases the like count on the specific post or Reel submitted with the order. It does not change the follower count of the overall profile.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public URL for the Instagram post or Reel and the likes package you want to purchase. Your Instagram password is not required.',
        ),
        card(
          p,
          6,
          'What Instagram Likes Do Not Include',
          'Likes are separate from followers, views, and comments. Ordering Instagram likes does not automatically add those other metrics or guarantee additional reach, engagement, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Instagram Likes, chosen the correct quantity, and provided the URL for the content where you want the likes added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Instagram Likes?',
      description:
        'After you place an Instagram Likes order, the package and public content URL you submitted are used to process the order for the selected post or Reel. Keep the submitted content publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected Likes package and Instagram URL are connected to your order so the request can be processed for the intended post or Reel.',
        },
        {
          id: `${p}-th-2`,
          title: 'Likes Go to the Submitted Content',
          description:
            'The order applies to the Instagram post or Reel connected to the URL you provided. Check the link carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the Likes quantity and current order conditions. Do not assume every package will have exactly the same processing time.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking to check available status updates after checkout. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted post or Reel, making it unavailable, or changing anything that prevents access to the content while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Instagram Likes vs Followers vs Views',
      description:
        'Likes, followers, and views measure different parts of an Instagram account. Choose the service based on whether you want to work on a specific post or Reel, your profile follower count, or the view count on video content.',
      current: {
        title: 'Instagram Likes',
        description:
          'Likes are a content-level metric. Choose Instagram Likes when you want to increase the like count shown on a specific public post or Reel.',
        bestFor:
          'Posts and Reels where the visible like count is the metric you want to change.',
        ctaLabel: 'Instagram Likes',
      },
      likes: {
        title: 'Instagram Followers',
        description:
          'Followers are a profile-level metric. Choose Instagram Followers when you want to increase the follower count shown on your account rather than engagement on one piece of content.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        href: '/buy-instagram-followers',
        ctaLabel: 'View Instagram Followers',
      },
      views: {
        title: 'Instagram Views',
        description:
          'Views apply to eligible video content. Choose Instagram Views when you want to increase the view count shown on a public Reel or video.',
        bestFor: 'Reels, videos, and other eligible Instagram video content.',
        href: '/buy-instagram-views',
        ctaLabel: 'View Instagram Views',
      },
      combinedNote:
        'If you want comments on a specific post or Reel, Instagram Comments are available as a separate service.',
      commentsHref: '/buy-instagram-comments',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Instagram Likes',
      description:
        'Before you buy Instagram likes, check the package and content details before completing your order. Make sure the quantity, price, Instagram URL, and service type match what you want for the selected post or Reel.',
      framingNote:
        'Check your selected content, likes quantity, and price one more time before checkout. Avoid relying on claims that buying likes will guarantee additional reach, followers, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Likes Quantity',
          'Review the number of Instagram likes included in the package so you know exactly how many you are ordering for the selected content.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the price shown for your selected likes package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct Post or Reel URL',
          'Make sure the public Instagram URL points to the exact post or Reel where you want the likes added.',
        ),
        card(
          p,
          10,
          'Choose the Right Instagram Service',
          'Likes, followers, views, and comments are separate services. Check that Instagram Likes is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing the Right Post or Reel for Instagram Likes',
      description:
        'Instagram Likes applies to one specific piece of eligible public content, so choosing the correct post or Reel is one of the most important parts of placing the order.',
      eyebrow: 'Ready for Instagram Likes',
      closingNote:
        'Instagram Likes applies to a specific public post or Reel. Submit the exact content URL, keep the content available, and review the selected likes package before checkout.',
      cards: [
        card(
          p,
          12,
          'Use the Exact Content URL',
          'Submit the public URL of the post or Reel where you want the Likes package applied. A profile URL is not the correct target for this service.',
        ),
        card(
          p,
          13,
          'Keep the Content Available',
          'Avoid deleting or restricting the submitted post or Reel while the order is being processed.',
        ),
        card(
          p,
          14,
          'Check the Likes Quantity',
          'Choose the number of Likes based on the specific content you are ordering for and review the quantity before checkout.',
        ),
        card(
          p,
          15,
          'Review the Price Before Ordering',
          'Package prices are shown before checkout. If you change the Likes quantity, review the updated package and price before completing the order.',
        ),
      ],
    };
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Instagram Likes Packages',
      description:
        'Not sure which package to choose? Compare some of the Instagram like quantities available on NovaLikes below, or return to the full pricing section to see all available options.',
      rows: [
        {
          id: `${p}-pkg-100`,
          quantity: '100 Likes',
          recommendedFor:
            'A smaller option for a post or Reel where you want a modest increase in the visible like count.',
        },
        {
          id: `${p}-pkg-500`,
          quantity: '500 Likes',
          recommendedFor:
            'A mid-range option for Instagram content where you want a more noticeable change in the number of likes.',
        },
        {
          id: `${p}-pkg-1k`,
          quantity: '1,000 Likes',
          recommendedFor:
            'A larger package for a selected post or Reel where you want to add one thousand likes in a single order.',
        },
        {
          id: `${p}-pkg-5k`,
          quantity: '5,000 Likes',
          recommendedFor:
            'A higher-volume option for Instagram content where you want a larger increase in the displayed like count.',
        },
        {
          id: `${p}-pkg-10k`,
          quantity: '10,000+ Likes',
          recommendedFor:
            'An option for posts or Reels where you are choosing one of the larger like quantities available on NovaLikes.',
        },
      ],
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Instagram Likes',
      description:
        'Buying likes changes the visible like count on the selected post or Reel, but the rest of the content still depends on what you publish and how you manage your account. Use the order as one part of your Instagram activity rather than treating likes as a replacement for content.',
      closingNote:
        'Likes are only one metric on Instagram. The content itself, your posting decisions, profile, audience interaction, and other account activity still need ongoing attention.',
      items: [
        card(
          p,
          16,
          'Keep Publishing New Content',
          'Continue posting photos, Reels, Stories, and other content that is relevant to the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Give Each Post a Clear Purpose',
          'Think about what you want a post or Reel to communicate before publishing, whether it is a product, update, idea, announcement, or piece of creative content.',
        ),
        card(
          p,
          18,
          'Write Useful Captions',
          'Use captions to add context to your posts, explain what viewers are seeing, or give people a reason to respond when it makes sense.',
        ),
        card(
          p,
          19,
          'Review Your Instagram Insights',
          'If Insights are available on your account, compare metrics such as reach, views, interactions, and other content data to understand how your posts and Reels perform.',
        ),
        card(
          p,
          20,
          'Test Different Instagram Formats',
          'Photos, carousels, Reels, and Stories serve different purposes. Test the formats that make sense for your account and the content you create.',
        ),
        card(
          p,
          21,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher like count does not replace the conversations you have with people through your own account.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Instagram Likes',
      description:
        'A few simple mistakes can cause problems with an Instagram likes order. Check the content URL, package, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Instagram URL, likes quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Post or Reel',
          'Check the Instagram URL carefully before ordering. The link should point to the exact public post or Reel where you want the likes added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Instagram Service',
          'Likes, followers, views, and comments are separate services. Choose Instagram Likes only when the like count on specific content is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Likes Quantity',
          'Review the number of likes included in your package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Removing the Content During an Order',
          'Avoid deleting the submitted post or Reel or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Likes to Guarantee Other Results',
          'A higher like count does not automatically mean more followers, comments, views, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Likes as a Replacement for Content',
          'Buying likes changes one visible metric. Your posts, Reels, captions, publishing decisions, and audience interaction still depend on how you manage the account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-instagram-followers': {
          title: 'Instagram Followers',
          description:
            'Choose Instagram Followers when you want to increase the follower count shown on your public profile.',
          ctaLabel: 'View Instagram Followers',
        },
        'buy-instagram-views': {
          title: 'Instagram Views',
          description:
            'Choose Instagram Views when you want to increase the view count on an eligible public Reel or video.',
          ctaLabel: 'View Instagram Views',
        },
        'buy-instagram-comments': {
          title: 'Instagram Comments',
          description:
            'Choose Instagram Comments when you want comments added to an eligible public post or Reel.',
          ctaLabel: 'View Instagram Comments',
        },
      },
    };
  }

  if (slug === 'buy-instagram-views') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Instagram Views?',
      description:
        'NovaLikes makes it easy to compare Instagram views packages before you order. Choose the number of views you want for a specific Reel or video, check the price, provide the correct public content URL, and track your order after checkout.',
      items: [
        card(
          p,
          0,
          'Different View Quantities',
          'Compare smaller and larger view packages to find a quantity that fits the Instagram Reel or video you want to use.',
        ),
        card(
          p,
          1,
          'Clear Package Pricing',
          'See the price for each Instagram views package before adding your selection to the cart.',
        ),
        card(
          p,
          2,
          'For Specific Reels and Videos',
          'Choose the public Instagram Reel or video where you want the views added instead of changing a profile-level metric such as follower count.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Instagram views order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Instagram Views?',
      description:
        'Yes. Instagram views can be purchased for eligible public Reels and videos. With NovaLikes, you choose a views package, provide the public URL of the Instagram video content you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What an Instagram Views Order Changes',
          'An Instagram views order increases the view count on the specific Reel or video submitted with the order. It does not change the follower count shown on your overall profile.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public URL for the Instagram Reel or video and the views package you want to purchase. Your Instagram password is not required.',
        ),
        card(
          p,
          6,
          'What Instagram Views Do Not Include',
          'Views are separate from followers, likes, and comments. Ordering Instagram views does not automatically add those other metrics or guarantee additional reach, engagement, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Instagram Views, chosen the correct quantity, and provided the URL for the Reel or video where you want the views added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Instagram Views?',
      description:
        'After you place an Instagram views order, the package and content URL you submitted are used to process the order for the selected Reel or video. Keep the content publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected views package and submitted Instagram URL are associated with your order so the request can be processed for the intended video content.',
        },
        {
          id: `${p}-th-2`,
          title: 'Views Go to the Submitted Content',
          description:
            'The order applies to the Instagram Reel or video connected to the URL you provided. Check the link carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the number of views selected and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted Reel or video, making it unavailable, or changing anything that prevents access to the content while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Instagram Views vs Followers vs Likes',
      description:
        'Views, followers, and likes measure different parts of an Instagram account. Choose the service based on whether you want to change the view count on video content, the follower count on your profile, or the like count on a specific post or Reel.',
      current: {
        title: 'Instagram Views',
        description:
          'Views are a video-content metric. Choose Instagram Views when you want to increase the view count shown on an eligible public Reel or video.',
        bestFor:
          'Reels and videos where the visible view count is the metric you want to change.',
        ctaLabel: 'Instagram Views',
      },
      likes: {
        title: 'Instagram Followers',
        description:
          'Followers are a profile-level metric. Choose Instagram Followers when you want to increase the follower count shown on your account.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        href: '/buy-instagram-followers',
        ctaLabel: 'View Instagram Followers',
      },
      views: {
        title: 'Instagram Likes',
        description:
          'Likes apply to individual content. Choose Instagram Likes when you want to increase the like count shown on a specific public post or Reel.',
        bestFor:
          'Posts and Reels where the visible like count is the metric you want to change.',
        href: '/buy-instagram-likes',
        ctaLabel: 'View Instagram Likes',
      },
      combinedNote:
        'If you want comments on a specific post or Reel, Instagram Comments are available as a separate service.',
      commentsHref: '/buy-instagram-comments',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Instagram Views',
      description:
        'Before you buy Instagram views, check the package and video details before completing your order. Make sure the view quantity, price, Instagram URL, and service type match what you want for the selected Reel or video.',
      framingNote:
        'Check the submitted video, view quantity, and price one more time before checkout. Avoid relying on claims that buying views will guarantee additional reach, engagement, followers, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the View Quantity',
          'Review the number of Instagram views included in the package so you know exactly how many you are ordering for the selected video content.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the price shown for your selected views package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct Reel or Video URL',
          'Make sure the public Instagram URL points to the exact Reel or video where you want the views added.',
        ),
        card(
          p,
          10,
          'Choose the Right Instagram Service',
          'Views, followers, likes, and comments are separate services. Check that Instagram Views is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing a Reel or Video for Instagram Views',
      description:
        'Instagram Views is a video-content service. Before ordering, make sure the submitted URL points to the exact eligible Reel or video whose visible view count you want to change.',
      eyebrow: 'Ready for Instagram Views',
      closingNote:
        'Instagram Views applies to eligible Reels and videos. Submit a public video URL, keep the video accessible, and review the selected views package before checkout.',
      cards: [
        card(
          p,
          12,
          'Use a Public Video URL',
          'Provide the public URL for the Reel or video requested during checkout rather than a general Instagram profile link.',
        ),
        card(
          p,
          13,
          'Keep the Video Accessible',
          'Do not delete or restrict access to the submitted video while an active order depends on the content being publicly available.',
        ),
        card(
          p,
          14,
          'Choose Views for Video Content',
          'Instagram Views applies to video views. If you want followers, likes or comments instead, choose the corresponding Instagram service.',
        ),
        card(
          p,
          15,
          'Check Quantity and Price',
          'Review the selected Views package, quantity and price before checkout to make sure the order matches the video you want to use.',
        ),
      ],
    };
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Instagram Views Packages',
      description:
        'Not sure which package to choose? Compare some of the Instagram view quantities available on NovaLikes below, or return to the full pricing section to see all available options.',
      rows: [
        {
          id: `${p}-pkg-100`,
          quantity: '100 Views',
          recommendedFor:
            'A smaller option for a Reel or video where you want a modest increase in the visible view count.',
        },
        {
          id: `${p}-pkg-500`,
          quantity: '500 Views',
          recommendedFor:
            'A mid-range option for Instagram video content where you want a more noticeable change in the number of views.',
        },
        {
          id: `${p}-pkg-1k`,
          quantity: '1,000 Views',
          recommendedFor:
            'A larger package for a selected Reel or video where you want to add one thousand views in a single order.',
        },
        {
          id: `${p}-pkg-5k`,
          quantity: '5,000 Views',
          recommendedFor:
            'A higher-volume option for Instagram video content where you want a larger increase in the displayed view count.',
        },
        {
          id: `${p}-pkg-10k`,
          quantity: '10,000+ Views',
          recommendedFor:
            'An option for Reels or videos where you are choosing one of the larger view quantities available on NovaLikes.',
        },
      ],
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Instagram Views',
      description:
        'Buying views changes the visible view count on the selected Reel or video, but the rest of the content still depends on what you publish and how you manage your account. Keep creating video content and use your own account data to understand how your Reels and videos perform.',
      closingNote:
        'Views are only one metric for Instagram video content. The Reel or video itself, your publishing decisions, audience response, and other account activity still need ongoing attention.',
      items: [
        card(
          p,
          16,
          'Keep Publishing Video Content',
          'Continue creating Reels and other video content that is relevant to the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Make the Opening Clear',
          'Give viewers a clear idea of what the Reel or video is about early in the content instead of relying on the view count alone.',
        ),
        card(
          p,
          18,
          'Use Relevant Captions',
          'Write captions that add useful context to the video, explain the topic, or provide information that belongs with the content.',
        ),
        card(
          p,
          19,
          'Review Your Instagram Insights',
          'If Insights are available on your account, review metrics such as views, reach, interactions, and other video data to understand how your own content performs.',
        ),
        card(
          p,
          20,
          'Test Different Video Ideas',
          'Try different topics, lengths, formats, and presentation styles to learn what makes sense for your account and audience.',
        ),
        card(
          p,
          21,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher view count does not replace the interactions you build through your own account activity.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Instagram Views',
      description:
        'A few simple mistakes can cause problems with an Instagram views order. Check the video URL, package, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Instagram URL, view quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Reel or Video',
          'Check the Instagram URL carefully before ordering. The link should point to the exact public Reel or video where you want the views added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Instagram Service',
          'Views, followers, likes, and comments are separate services. Choose Instagram Views only when the view count on video content is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong View Quantity',
          'Review the number of views included in your package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Removing the Video During an Order',
          'Avoid deleting the submitted Reel or video or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Views to Guarantee Other Results',
          'A higher view count does not automatically mean more followers, likes, comments, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Views as a Replacement for Video Content',
          'Buying views changes one visible metric. Your Reels, videos, captions, publishing decisions, and audience interaction still depend on how you manage the account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-instagram-followers': {
          title: 'Instagram Followers',
          description:
            'Choose Instagram Followers when you want to increase the follower count shown on your public profile.',
          ctaLabel: 'View Instagram Followers',
        },
        'buy-instagram-likes': {
          title: 'Instagram Likes',
          description:
            'Choose Instagram Likes when you want to increase the like count shown on a specific public post or Reel.',
          ctaLabel: 'View Instagram Likes',
        },
        'buy-instagram-comments': {
          title: 'Instagram Comments',
          description:
            'Choose Instagram Comments when you want comments added to an eligible public post or Reel.',
          ctaLabel: 'View Instagram Comments',
        },
      },
    };
  }

  if (slug === 'buy-instagram-comments') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Instagram Comments?',
      description:
        'NovaLikes makes it easy to compare Instagram comments packages before you order. Choose the package type and quantity you want for a specific post or Reel, review the price, provide the correct public content URL, and track your order after checkout.',
      items: [
        card(
          p,
          0,
          'Different Comment Quantities',
          'Compare the available comment quantities to find an option that fits the Instagram post or Reel you want to use.',
        ),
        card(
          p,
          1,
          'Multiple Package Options',
          'Choose between the available Instagram comments package types and review the current quantity and price before ordering.',
        ),
        card(
          p,
          2,
          'For Specific Posts and Reels',
          'Instagram comments are ordered for the public post or Reel you submit rather than for your overall profile.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Instagram comments order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Instagram Comments?',
      description:
        'Yes. Instagram comments can be purchased for eligible public posts and Reels. With NovaLikes, you choose an available comments package and quantity, provide the public URL of the Instagram content you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What an Instagram Comments Order Changes',
          'An Instagram comments order adds comments to the specific post or Reel submitted with the order. It does not change the follower, like, or view count on your account.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public URL for the Instagram post or Reel and the comments package you want to purchase. Your Instagram password is not required.',
        ),
        card(
          p,
          6,
          'What Instagram Comments Do Not Include',
          'Comments are separate from followers, likes, and views. Ordering Instagram comments does not automatically add those other metrics or guarantee additional reach, engagement, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Instagram Comments, chosen the correct package and quantity, and provided the URL for the post or Reel where you want the comments added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Instagram Comments?',
      description:
        'After you place an Instagram comments order, the package, quantity, and content URL you submitted are used to process the order for the selected post or Reel. Keep the content publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected comments package, quantity, and submitted Instagram URL are associated with your order so the request can be processed for the intended content.',
        },
        {
          id: `${p}-th-2`,
          title: 'Comments Go to the Submitted Content',
          description:
            'The order applies to the Instagram post or Reel connected to the URL you provided. Check the link carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the comments package, quantity, and current order conditions. One fixed delivery time should not be expected for every order.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted post or Reel, making it unavailable, or changing anything that prevents access to the content while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Instagram Comments vs Followers vs Likes',
      description:
        'Comments, followers, and likes are different Instagram metrics. Choose the service based on whether you want comments on specific content, a higher follower count on your profile, or more likes on a particular post or Reel.',
      current: {
        title: 'Instagram Comments',
        description:
          'Comments apply to individual content. Choose Instagram Comments when you want comments added to an eligible public post or Reel.',
        bestFor: 'Posts and Reels where comments are the metric you want to change.',
        ctaLabel: 'Instagram Comments',
      },
      likes: {
        title: 'Instagram Followers',
        description:
          'Followers are a profile-level metric. Choose Instagram Followers when you want to increase the follower count shown on your public profile.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        href: '/buy-instagram-followers',
        ctaLabel: 'View Instagram Followers',
      },
      views: {
        title: 'Instagram Likes',
        description:
          'Likes are a content-level metric. Choose Instagram Likes when you want to increase the like count shown on a specific public post or Reel.',
        bestFor:
          'Posts and Reels where the visible like count is the metric you want to change.',
        href: '/buy-instagram-likes',
        ctaLabel: 'View Instagram Likes',
      },
      combinedNote:
        'If you want to increase the view count on eligible video content, Instagram Views is available as a separate service.',
      commentsHref: '/buy-instagram-views',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Instagram Comments',
      description:
        'Before you buy Instagram comments, review the package and content details before completing your order. Make sure the package type, comment quantity, price, Instagram URL, and service match what you want for the selected post or Reel.',
      framingNote:
        'Check the submitted content, comments package, quantity, and price one more time before checkout. Avoid relying on claims that buying comments will guarantee additional reach, engagement, followers, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Comment Quantity',
          'Review the number of Instagram comments included in the package so you know how many you are ordering for the selected content.',
        ),
        card(
          p,
          8,
          'Compare the Available Package Options',
          'Review the available comments package types, quantities, and prices before choosing the option you want to order.',
        ),
        card(
          p,
          9,
          'Use the Correct Post or Reel URL',
          'Make sure the public Instagram URL points to the exact post or Reel where you want the comments added.',
        ),
        card(
          p,
          10,
          'Choose the Right Instagram Service',
          'Comments, followers, likes, and views are separate services. Check that Instagram Comments is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing Content for an Instagram Comments Order',
      description:
        'Instagram Comments applies to a specific eligible public post or Reel. Make sure the content you submit is the exact piece of Instagram content where you want the selected comment package applied.',
      eyebrow: 'Ready for Instagram Comments',
      closingNote:
        'Instagram Comments applies to a specific post or Reel. Submit the correct content URL, keep the content available, and review the selected comment option before checkout.',
      cards: [
        card(
          p,
          12,
          'Submit the Correct Content URL',
          'Use the public post or Reel URL requested during checkout. Do not submit only your Instagram profile when the service requires a content URL.',
        ),
        card(
          p,
          13,
          'Keep the Post or Reel Available',
          'The submitted content should remain publicly accessible where required while the order is being processed.',
        ),
        card(
          p,
          14,
          'Review the Comment Option',
          'Check the available comment package and quantity before ordering so you understand what you selected.',
        ),
        card(
          p,
          15,
          'Comments Are a Separate Metric',
          'Comments do not automatically add followers, likes or views. Choose the service that matches the metric you actually want for the content.',
        ),
      ],
    };
    const commentPopularDescriptions = [
      'A smaller option for a post or Reel where you want to add a limited number of comments.',
      'An option for Instagram content where you want more comments than the smaller available package.',
      'A middle package option for a selected public post or Reel.',
      'A larger option for Instagram content where you want a higher number of comments added.',
      'One of the larger comment quantities currently available for eligible Instagram content.',
    ] as const;
    const hqCommentPackages = getActivePackagesByServiceSlug(slug)
      .filter((pkg) => pkg.commentType === 'High Quality')
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, commentPopularDescriptions.length);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Instagram Comments Packages',
      description:
        'Compare some of the Instagram comments packages available on NovaLikes below. Review the package type, comment quantity, and current price, or return to the full pricing section to see all available options.',
      rows: hqCommentPackages.map((pkg, index) => ({
        id: pkg.id,
        quantity: `${pkg.quantity.toLocaleString('en-US')} Comments`,
        recommendedFor: commentPopularDescriptions[index] ?? '',
      })),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Instagram Comments',
      description:
        'Buying comments adds comments to the selected post or Reel, but the rest of your Instagram activity still depends on the content you publish and how you manage your account. Keep your own posts, captions, replies, and audience interaction active alongside the service.',
      closingNote:
        'Comments are only one part of an Instagram post or Reel. Your content, captions, publishing decisions, genuine audience responses, and ongoing account activity still need your attention.',
      items: [
        card(
          p,
          16,
          'Keep Publishing New Content',
          'Continue posting photos, Reels, carousels, Stories, and other content that makes sense for your account and audience.',
        ),
        card(
          p,
          17,
          'Write Captions That Fit the Post',
          'Use captions to explain the content, provide useful context, or give people something relevant to respond to when appropriate.',
        ),
        card(
          p,
          18,
          'Reply to Genuine Comments',
          'Respond to genuine questions and comments from your audience when it makes sense. Your own replies remain part of how you manage conversations on Instagram.',
        ),
        card(
          p,
          19,
          'Review Your Instagram Insights',
          'If Insights are available on your account, review reach, interactions, views, and other content data to understand how your posts and Reels perform.',
        ),
        card(
          p,
          20,
          'Keep the Conversation Relevant',
          'When people interact with your content naturally, keep your own replies connected to the topic of the post rather than using unrelated responses.',
        ),
        card(
          p,
          21,
          'Test Different Types of Content',
          'Try different post formats, topics, captions, and Reels to learn what works best for the audience you want to reach.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Instagram Comments',
      description:
        'A few simple mistakes can cause problems with an Instagram comments order. Check the content URL, package, quantity, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Instagram URL, package type, comment quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Post or Reel',
          'Check the Instagram URL carefully before ordering. The link should point to the exact public post or Reel where you want the comments added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Instagram Service',
          'Comments, followers, likes, and views are separate services. Choose Instagram Comments only when comments on specific content are what you want to order.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Comment Quantity',
          'Review the number of comments included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Removing the Content During an Order',
          'Avoid deleting the submitted post or Reel or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Comments to Guarantee Other Results',
          'Ordering comments does not automatically mean more followers, likes, views, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Comments as a Replacement for Your Own Activity',
          'Buying comments does not replace your own posts, captions, replies, publishing decisions, or interactions with people who engage with your account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-instagram-followers': {
          title: 'Instagram Followers',
          description:
            'Choose Instagram Followers when you want to increase the follower count shown on your public profile.',
          ctaLabel: 'View Instagram Followers',
        },
        'buy-instagram-likes': {
          title: 'Instagram Likes',
          description:
            'Choose Instagram Likes when you want to increase the like count shown on a specific public post or Reel.',
          ctaLabel: 'View Instagram Likes',
        },
        'buy-instagram-views': {
          title: 'Instagram Views',
          description:
            'Choose Instagram Views when you want to increase the view count shown on an eligible public Reel or video.',
          ctaLabel: 'View Instagram Views',
        },
      },
    };
  }

  if (slug === 'buy-tiktok-followers') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for TikTok Followers?',
      description:
        'NovaLikes makes it easy to compare TikTok followers packages before you order. Choose the follower quantity you want for your public profile, review the current price, provide the correct TikTok username, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Follower Quantities',
          'Compare the available TikTok follower quantities and choose the package that matches the number of followers you want to order.',
        ),
        card(
          p,
          1,
          'Public Username Only',
          'Provide the correct public TikTok username for the account where you want the followers added. Your TikTok password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected follower quantity and current package price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your TikTok followers order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy TikTok Followers?',
      description:
        'Yes. TikTok followers can be purchased through online follower services. With NovaLikes, you choose an available follower package, provide the public TikTok username for the profile you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a TikTok Followers Order Changes',
          'A TikTok followers order applies to the follower count on the public profile submitted with the order. It does not automatically add likes or views to individual TikTok videos.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public TikTok username and the follower package you want to purchase. Your TikTok password is not required.',
        ),
        card(
          p,
          6,
          'What TikTok Followers Do Not Include',
          'Followers are separate from TikTok likes and views. Ordering followers does not automatically add those other metrics or guarantee additional engagement, reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected TikTok Followers, chosen the correct follower quantity, and provided the username for the profile where you want the followers added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy TikTok Followers?',
      description:
        'After you place a TikTok followers order, the follower package and public username you submitted are used to process the order for the selected profile. Keep the profile publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected follower package, quantity, and submitted TikTok username are associated with your order so the request can be processed for the intended profile.',
        },
        {
          id: `${p}-th-2`,
          title: 'Followers Go to the Submitted Profile',
          description:
            'The order applies to the TikTok profile connected to the username you provided. Check the username carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the follower quantity and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid changing the submitted username, making the profile unavailable, or changing anything that prevents access to the account while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'TikTok Followers vs Likes vs Views',
      description:
        'Followers, likes, and views measure different parts of a TikTok account. Choose the service based on whether you want to change the follower count on your profile, the like count on specific content, or the view count on a TikTok video.',
      current: {
        title: 'TikTok Followers',
        description:
          'Followers are a profile-level metric. Choose TikTok Followers when you want to increase the follower count shown on your public profile.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        ctaLabel: 'TikTok Followers',
      },
      likes: {
        title: 'TikTok Likes',
        description:
          'Likes apply to individual content. Choose TikTok Likes when you want to increase the like count on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible like count is the metric you want to change.',
        href: '/buy-tiktok-likes',
        ctaLabel: 'View TikTok Likes',
      },
      views: {
        title: 'TikTok Views',
        description:
          'Views are a video-level metric. Choose TikTok Views when you want to increase the view count on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible view count is the metric you want to change.',
        href: '/buy-tiktok-views',
        ctaLabel: 'View TikTok Views',
      },
      combinedNote: '',
      commentsHref: '/buy-tiktok-likes',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying TikTok Followers',
      description:
        'Before you buy TikTok followers, review the package and profile details before completing your order. Make sure the follower quantity, price, TikTok username, and service match what you want for the selected profile.',
      framingNote:
        'Check the submitted TikTok username, follower quantity, and price one more time before checkout. Avoid relying on claims that buying followers will guarantee additional views, likes, engagement, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Follower Quantity',
          'Review the number of TikTok followers included in the package so you know how many you are ordering for the submitted profile.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected followers package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct TikTok Username',
          'Check the public TikTok username carefully so the order is associated with the profile where you want the followers added.',
        ),
        card(
          p,
          10,
          'Choose the Right TikTok Service',
          'Followers, likes, and views are separate services. Check that TikTok Followers is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Preparing Your TikTok Profile for a Followers Order',
      description:
        'TikTok Followers is a profile-level service. Before ordering, confirm the exact public TikTok profile and follower quantity you want to use.',
      eyebrow: 'Ready for TikTok Followers',
      closingNote:
        'TikTok Followers applies to a public profile. Confirm the username, keep the profile accessible where required, and review the follower package before checkout.',
      cards: [
        card(
          p,
          12,
          'Check the TikTok Username',
          'Make sure the username you submit belongs to the intended TikTok profile before completing checkout.',
        ),
        card(
          p,
          13,
          'Keep the Profile Accessible',
          'Keep the profile publicly accessible where the selected service requires public access while the order is being processed.',
        ),
        card(
          p,
          14,
          'Avoid Changing Profile Details',
          'Avoid changing the submitted username while an order is active when possible. Contact support if an account change affects an existing order.',
        ),
        card(
          p,
          15,
          'Review the Follower Package',
          'Check the selected follower quantity and price before checkout so you know which package is attached to the order.',
        ),
      ],
    };
    const tiktokFollowerPopular = [
      {
        quantity: 100,
        label: '100 Followers',
        recommendedFor:
          'A smaller option for a public TikTok profile where you want to add a modest number of followers.',
      },
      {
        quantity: 500,
        label: '500 Followers',
        recommendedFor:
          'A mid-range option for a TikTok profile where you want a larger change in the displayed follower count.',
      },
      {
        quantity: 1000,
        label: '1,000 Followers',
        recommendedFor:
          'A larger package for a public TikTok profile where you want to add one thousand followers in a single order.',
      },
      {
        quantity: 5000,
        label: '5,000 Followers',
        recommendedFor:
          'A higher-volume option for a TikTok profile where you want a larger increase in the displayed follower count.',
      },
      {
        quantity: 10000,
        label: '10,000 Followers',
        recommendedFor:
          'An option for TikTok profiles where you are considering one of the larger follower quantities available on NovaLikes.',
      },
    ] as const;
    const liveTikTokFollowerPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular TikTok Followers Packages',
      description:
        'Not sure which package to choose? Compare some of the TikTok follower quantities available on NovaLikes below, or return to the full pricing section to see all available options.',
      rows: tiktokFollowerPopular.flatMap((row) => {
        const pkg = liveTikTokFollowerPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying TikTok Followers',
      description:
        'Buying followers changes the follower count on the selected TikTok profile, but the rest of your account still depends on the content you publish and how you manage it. Keep creating videos, reviewing your account activity, and interacting with your audience alongside the follower service.',
      closingNote:
        'Follower count is only one part of a TikTok profile. Your videos, profile information, publishing decisions, audience response, and other account activity still need ongoing attention.',
      items: [
        card(
          p,
          16,
          'Keep Publishing TikTok Videos',
          'Continue creating videos that fit your account, topic, business, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Keep Your Profile Complete',
          'Review your profile photo, bio, username, and other public profile details so visitors can understand what your account is about.',
        ),
        card(
          p,
          18,
          'Review Your TikTok Analytics',
          'If analytics are available on your account, review views, engagement, follower activity, and other account data to understand how your own content performs.',
        ),
        card(
          p,
          19,
          'Test Different Video Formats',
          'Try different topics, video lengths, openings, formats, and presentation styles to learn what works for your account.',
        ),
        card(
          p,
          20,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher follower count does not replace the interactions you build through your own account activity.',
        ),
        card(
          p,
          21,
          'Keep Your Content Consistent',
          'Maintain a publishing approach that makes sense for your account rather than treating a follower package as a replacement for ongoing content.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying TikTok Followers',
      description:
        'A few simple mistakes can cause problems with a TikTok followers order. Check the username, follower quantity, service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the TikTok username, follower quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Entering the Wrong TikTok Username',
          'Check the public TikTok username carefully before ordering. The username should belong to the exact profile where you want the followers added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong TikTok Service',
          'Followers, likes, and views are separate services. Choose TikTok Followers only when the follower count on your profile is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Follower Quantity',
          'Review the number of followers included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Making the Profile Unavailable During an Order',
          'Avoid changing the submitted username or making the profile unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Followers to Guarantee Other Results',
          'A higher follower count does not automatically mean more video views, likes, engagement, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Followers as a Replacement for Content',
          'Buying followers changes one profile metric. Your videos, publishing decisions, profile information, and audience interaction still depend on how you manage the account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-tiktok-likes': {
          title: 'TikTok Likes',
          description:
            'Choose TikTok Likes when you want to increase the like count shown on an eligible public TikTok video.',
          ctaLabel: 'View TikTok Likes',
        },
        'buy-tiktok-views': {
          title: 'TikTok Views',
          description:
            'Choose TikTok Views when you want to increase the view count shown on an eligible public TikTok video.',
          ctaLabel: 'View TikTok Views',
        },
      },
    };
  }

  if (slug === 'buy-tiktok-likes') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for TikTok Likes?',
      description:
        'NovaLikes makes it easy to compare TikTok likes packages before you order. Choose the number of likes you want for a public TikTok video, review the current price, provide the correct video link, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Likes Quantities',
          'Compare the available TikTok likes quantities and choose the package that matches the number of likes you want to order.',
        ),
        card(
          p,
          1,
          'Public Video Link Only',
          'Provide the correct public TikTok video link for the content where you want the likes added. Your TikTok password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected likes quantity and current package price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your TikTok likes order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy TikTok Likes?',
      description:
        'Yes. TikTok likes can be purchased through online likes services. With NovaLikes, you choose an available likes package, provide the public TikTok video link for the content you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a TikTok Likes Order Changes',
          'A TikTok likes order applies to the like count on the public video submitted with the order. It does not automatically add followers to your profile or views to the video.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public TikTok video link and the likes package you want to purchase. Your TikTok password is not required.',
        ),
        card(
          p,
          6,
          'What TikTok Likes Do Not Include',
          'Likes are separate from TikTok followers and views. Ordering likes does not automatically add those other metrics or guarantee additional engagement, reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected TikTok Likes, chosen the correct likes quantity, and provided the link for the exact public video where you want the likes added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy TikTok Likes?',
      description:
        'After you place a TikTok likes order, the likes package and public video link you submitted are used to process the order for the selected video. Keep the video publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected likes package, quantity, and submitted TikTok video link are associated with your order so the request can be processed for the intended video.',
        },
        {
          id: `${p}-th-2`,
          title: 'Likes Go to the Submitted Video',
          description:
            'The order applies to the TikTok video connected to the link you provided. Check the video link carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the likes quantity and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted video, making it unavailable, or changing anything that prevents access to the content while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'TikTok Likes vs Followers vs Views',
      description:
        'Likes, followers, and views measure different parts of TikTok. Choose the service based on whether you want to change the like count on a specific video, the follower count on your profile, or the view count on a TikTok video.',
      current: {
        title: 'TikTok Likes',
        description:
          'Likes are a video-level metric. Choose TikTok Likes when you want to increase the like count shown on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible like count is the metric you want to change.',
        ctaLabel: 'TikTok Likes',
      },
      likes: {
        title: 'TikTok Followers',
        description:
          'Followers are a profile-level metric. Choose TikTok Followers when you want to increase the follower count shown on your public TikTok profile.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        href: '/buy-tiktok-followers',
        ctaLabel: 'View TikTok Followers',
      },
      views: {
        title: 'TikTok Views',
        description:
          'Views are a video-level metric. Choose TikTok Views when you want to increase the view count shown on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible view count is the metric you want to change.',
        href: '/buy-tiktok-views',
        ctaLabel: 'View TikTok Views',
      },
      combinedNote: '',
      commentsHref: '/buy-tiktok-followers',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying TikTok Likes',
      description:
        'Before you buy TikTok likes, review the package and video details before completing your order. Make sure the likes quantity, price, TikTok video link, and service match what you want for the selected video.',
      framingNote:
        'Check the submitted TikTok video link, likes quantity, and price one more time before checkout. Avoid relying on claims that buying likes will guarantee additional views, followers, engagement, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Likes Quantity',
          'Review the number of TikTok likes included in the package so you know how many you are ordering for the submitted video.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected likes package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct TikTok Video Link',
          'Check the public TikTok video link carefully so the order is associated with the exact video where you want the likes added.',
        ),
        card(
          p,
          10,
          'Choose the Right TikTok Service',
          'Likes, followers, and views are separate services. Check that TikTok Likes is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing the Right TikTok Video for Likes',
      description:
        'TikTok Likes applies to one specific eligible public video. Submit the exact video you want to use rather than a general TikTok profile.',
      eyebrow: 'Ready for TikTok Likes',
      closingNote:
        'TikTok Likes applies to a specific public video. Submit the video link, keep the video public, and review the likes quantity before checkout.',
      cards: [
        card(
          p,
          12,
          'Use the Correct Video Link',
          'Check the public TikTok video URL carefully before ordering because the submitted video is used to process the Likes package.',
        ),
        card(
          p,
          13,
          'Keep the Video Public',
          'Do not delete or restrict the submitted video while the order requires public access to it.',
        ),
        card(
          p,
          14,
          'Choose the Likes Quantity',
          'Review the available Likes quantities and choose the package that fits the individual video you want to use.',
        ),
        card(
          p,
          15,
          'Likes and Views Are Different',
          'Choose TikTok Likes when the Like count is the metric you want to change. TikTok Views is a separate service for visible video views.',
        ),
      ],
    };
    const tiktokLikesPopular = [
      {
        quantity: 100,
        label: '100 Likes',
        recommendedFor:
          'A smaller option for a public TikTok video where you want to add a limited number of likes.',
      },
      {
        quantity: 500,
        label: '500 Likes',
        recommendedFor:
          'A mid-range option for a TikTok video where you want a larger change in the displayed like count.',
      },
      {
        quantity: 1000,
        label: '1,000 Likes',
        recommendedFor:
          'A larger package for a public TikTok video where you want to add one thousand likes in a single order.',
      },
      {
        quantity: 5000,
        label: '5,000 Likes',
        recommendedFor:
          'A higher-volume option for a TikTok video where you want a larger increase in the displayed like count.',
      },
      {
        quantity: 10000,
        label: '10,000 Likes',
        recommendedFor:
          'One of the larger available package options for a public TikTok video where you want to add ten thousand likes.',
      },
    ] as const;
    const liveTikTokLikesPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular TikTok Likes Packages',
      description:
        'Compare some of the TikTok likes quantities available on NovaLikes below, or return to the full pricing section to see all available options.',
      rows: tiktokLikesPopular.flatMap((row) => {
        const pkg = liveTikTokLikesPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying TikTok Likes',
      description:
        'Buying likes changes the like count on the selected TikTok video, but the rest of your TikTok activity still depends on the content you publish and how you manage your account. Keep creating videos, reviewing performance, and interacting with your audience alongside the service.',
      closingNote:
        'Like count is only one metric on a TikTok video. Your content, views, audience responses, publishing decisions, and other account activity still depend on how you manage your TikTok presence.',
      items: [
        card(
          p,
          16,
          'Keep Publishing TikTok Videos',
          'Continue creating videos that fit your account, topic, business, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Use Captions That Fit the Video',
          'Write captions that support the content you publish and provide useful context for people watching the video.',
        ),
        card(
          p,
          18,
          'Review Your TikTok Analytics',
          'If analytics are available on your account, review views, likes, engagement, watch activity, and other available data to understand how your own content performs.',
        ),
        card(
          p,
          19,
          'Test Different Video Formats',
          'Try different topics, video lengths, openings, formats, and presentation styles to learn what works for your account.',
        ),
        card(
          p,
          20,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher like count does not replace the interactions you build through your own account activity.',
        ),
        card(
          p,
          21,
          'Keep Your Content Consistent',
          'Maintain a publishing approach that makes sense for your account rather than treating a likes package as a replacement for ongoing content.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying TikTok Likes',
      description:
        'A few simple mistakes can cause problems with a TikTok likes order. Check the video link, likes quantity, service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the TikTok video link, likes quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong TikTok Video Link',
          'Check the public TikTok video link carefully before ordering. The link should point to the exact video where you want the likes added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong TikTok Service',
          'Likes, followers, and views are separate services. Choose TikTok Likes only when the like count on a specific video is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Likes Quantity',
          'Review the number of likes included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Removing the Video During an Order',
          'Avoid deleting the submitted video or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Likes to Guarantee Other Results',
          'A higher like count does not automatically mean more views, followers, engagement, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Likes as a Replacement for Content',
          'Buying likes changes one metric on the selected video. Your videos, publishing decisions, captions, and audience interaction still depend on how you manage your account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-tiktok-followers': {
          title: 'TikTok Followers',
          description:
            'Choose TikTok Followers when you want to increase the follower count shown on your public TikTok profile.',
          ctaLabel: 'View TikTok Followers',
        },
        'buy-tiktok-views': {
          title: 'TikTok Views',
          description:
            'Choose TikTok Views when you want to increase the view count shown on an eligible public TikTok video.',
          ctaLabel: 'View TikTok Views',
        },
      },
    };
  }

  if (slug === 'buy-tiktok-views') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for TikTok Views?',
      description:
        'NovaLikes makes it easy to compare TikTok views packages before you order. Choose the number of views you want for a public TikTok video, review the available package option and current price, provide the correct video link, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Views Quantities',
          'Compare the available TikTok views quantities and choose the package that matches the number of views you want to order.',
        ),
        card(
          p,
          1,
          'Public Video Link Only',
          'Provide the correct public TikTok video link for the content where you want the views added. Your TikTok password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected views quantity, package option, and current price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your TikTok views order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy TikTok Views?',
      description:
        'Yes. TikTok views can be purchased through online views services. With NovaLikes, you choose an available views package, provide the public TikTok video link for the content you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a TikTok Views Order Changes',
          'A TikTok views order applies to the view count on the public video submitted with the order. It does not automatically add followers to your profile or likes to the video.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public TikTok video link and the views package you want to purchase. Your TikTok password is not required.',
        ),
        card(
          p,
          6,
          'What TikTok Views Do Not Include',
          'Views are separate from TikTok followers and likes. Ordering views does not automatically add those other metrics or guarantee additional engagement, reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected TikTok Views, chosen the correct views quantity and package option, and provided the link for the exact public video where you want the views added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy TikTok Views?',
      description:
        'After you place a TikTok views order, the views package and public video link you submitted are used to process the order for the selected video. Keep the video publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected views package, quantity, package option, and submitted TikTok video link are associated with your order so the request can be processed for the intended video.',
        },
        {
          id: `${p}-th-2`,
          title: 'Views Go to the Submitted Video',
          description:
            'The order applies to the TikTok video connected to the link you provided. Check the video link carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the views quantity, selected package option, and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted video, making it unavailable, or changing anything that prevents access to the content while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'TikTok Views vs Followers vs Likes',
      description:
        'Views, followers, and likes measure different parts of TikTok. Choose the service based on whether you want to change the view count on a specific video, the follower count on your profile, or the like count on a TikTok video.',
      current: {
        title: 'TikTok Views',
        description:
          'Views are a video-level metric. Choose TikTok Views when you want to increase the view count shown on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible view count is the metric you want to change.',
        ctaLabel: 'TikTok Views',
      },
      likes: {
        title: 'TikTok Followers',
        description:
          'Followers are a profile-level metric. Choose TikTok Followers when you want to increase the follower count shown on your public TikTok profile.',
        bestFor: 'Profiles where follower count is the metric you want to change.',
        href: '/buy-tiktok-followers',
        ctaLabel: 'View TikTok Followers',
      },
      views: {
        title: 'TikTok Likes',
        description:
          'Likes are a video-level metric. Choose TikTok Likes when you want to increase the like count shown on an eligible public TikTok video.',
        bestFor: 'TikTok videos where the visible like count is the metric you want to change.',
        href: '/buy-tiktok-likes',
        ctaLabel: 'View TikTok Likes',
      },
      combinedNote: '',
      commentsHref: '/buy-tiktok-followers',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying TikTok Views',
      description:
        'Before you buy TikTok views, review the package and video details before completing your order. Make sure the views quantity, package option, price, TikTok video link, and service match what you want for the selected video.',
      framingNote:
        'Check the submitted TikTok video link, views quantity, package option, and price one more time before checkout. Avoid relying on claims that buying views will guarantee additional likes, followers, engagement, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Views Quantity',
          'Review the number of TikTok views included in the package so you know how many you are ordering for the submitted video.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected views package before adding it to the cart. If you change the quantity or package option, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct TikTok Video Link',
          'Check the public TikTok video link carefully so the order is associated with the exact video where you want the views added.',
        ),
        card(
          p,
          10,
          'Choose the Right TikTok Service',
          'Views, followers, and likes are separate services. Check that TikTok Views is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing the Right TikTok Video for Views',
      description:
        'TikTok Views applies to a specific eligible public video. Make sure the video link entered at checkout points to the exact content whose view count you want to use.',
      eyebrow: 'Ready for TikTok Views',
      closingNote:
        'TikTok Views applies to a specific public video. Submit the exact video link, keep the video accessible, and review the views package before checkout.',
      cards: [
        card(
          p,
          12,
          'Submit the Exact Video Link',
          'A TikTok profile URL is not the same as a video URL. Use the public video link requested for the Views service.',
        ),
        card(
          p,
          13,
          'Keep the Video Accessible',
          'Avoid deleting or restricting the submitted video while an active order depends on public access to that content.',
        ),
        card(
          p,
          14,
          'Choose a Views Package',
          'Compare the available view quantities and package options before selecting the one you want for the video.',
        ),
        card(
          p,
          15,
          'Check Everything Before Checkout',
          'Review the video URL, Views package and price before completing your order.',
        ),
      ],
    };
    const tiktokViewsPopular = [
      {
        quantity: 1000,
        label: '1,000 Views',
        recommendedFor:
          'A smaller option for a public TikTok video where you want to add one thousand views.',
      },
      {
        quantity: 5000,
        label: '5,000 Views',
        recommendedFor:
          'A mid-range option for a TikTok video where you want a larger change in the displayed view count.',
      },
      {
        quantity: 10000,
        label: '10,000 Views',
        recommendedFor:
          'A larger package for a public TikTok video where you want to add ten thousand views in a single order.',
      },
      {
        quantity: 50000,
        label: '50,000 Views',
        recommendedFor:
          'A higher-volume option for a TikTok video where you want a larger increase in the displayed view count.',
      },
      {
        quantity: 100000,
        label: '100,000 Views',
        recommendedFor:
          'One of the larger package quantities for a public TikTok video, if this quantity is available in the existing live TikTok Views package data.',
      },
    ] as const;
    const liveTikTokViewsPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular TikTok Views Packages',
      description:
        'Compare some of the TikTok views quantities available on NovaLikes below, or return to the full pricing section to see all available package options.',
      rows: tiktokViewsPopular.flatMap((row) => {
        const pkg =
          liveTikTokViewsPackages.find(
            (item) => item.quantity === row.quantity && item.commentType === 'High Quality',
          ) ?? liveTikTokViewsPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying TikTok Views',
      description:
        'Buying views changes the view count on the selected TikTok video, but the rest of your TikTok activity still depends on the content you publish and how you manage your account. Keep creating videos, reviewing performance, and interacting with your audience alongside the service.',
      closingNote:
        'View count is only one metric on a TikTok video. Your content, likes, audience responses, publishing decisions, and other account activity still depend on how you manage your TikTok presence.',
      items: [
        card(
          p,
          16,
          'Keep Publishing TikTok Videos',
          'Continue creating videos that fit your account, topic, business, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Use Captions That Fit the Video',
          'Write captions that support the content you publish and provide useful context for people watching the video.',
        ),
        card(
          p,
          18,
          'Review Your TikTok Analytics',
          'If analytics are available on your account, review views, likes, engagement, watch activity, and other available data to understand how your own content performs.',
        ),
        card(
          p,
          19,
          'Test Different Video Formats',
          'Try different topics, video lengths, openings, formats, and presentation styles to learn what works for your account.',
        ),
        card(
          p,
          20,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher view count does not replace the interactions you build through your own account activity.',
        ),
        card(
          p,
          21,
          'Keep Your Content Consistent',
          'Maintain a publishing approach that makes sense for your account rather than treating a views package as a replacement for ongoing content.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying TikTok Views',
      description:
        'A few simple mistakes can cause problems with a TikTok views order. Check the video link, views quantity, package option, service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the TikTok video link, views quantity, package option, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong TikTok Video Link',
          'Check the public TikTok video link carefully before ordering. The link should point to the exact video where you want the views added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong TikTok Service',
          'Views, followers, and likes are separate services. Choose TikTok Views only when the view count on a specific video is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Views Quantity',
          'Review the number of views included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Removing the Video During an Order',
          'Avoid deleting the submitted video or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Views to Guarantee Other Results',
          'A higher view count does not automatically mean more likes, followers, engagement, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Views as a Replacement for Content',
          'Buying views changes one metric on the selected video. Your videos, publishing decisions, captions, and audience interaction still depend on how you manage your account.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-tiktok-followers': {
          title: 'TikTok Followers',
          description:
            'Choose TikTok Followers when you want to increase the follower count shown on your public TikTok profile.',
          ctaLabel: 'View TikTok Followers',
        },
        'buy-tiktok-likes': {
          title: 'TikTok Likes',
          description:
            'Choose TikTok Likes when you want to increase the like count shown on an eligible public TikTok video.',
          ctaLabel: 'View TikTok Likes',
        },
      },
    };
  }

  if (slug === 'buy-facebook-followers') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Facebook Followers?',
      description:
        'NovaLikes makes it easy to compare Facebook follower packages before you order. Choose the number of followers you want for your public Facebook Page, review the current package price, provide the correct Page URL, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Follower Quantities',
          'Compare the available Facebook follower quantities and choose the package that matches the number of followers you want to order.',
        ),
        card(
          p,
          1,
          'Public Facebook Page URL Only',
          'Provide the correct public Facebook Page URL for the Page where you want the followers added. Your Facebook password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected follower quantity and current package price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Facebook followers order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Facebook Followers?',
      description:
        'Yes. Facebook follower packages can be purchased through online follower services. With NovaLikes, you choose an available follower package, provide the public Facebook Page URL for the Page you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a Facebook Followers Order Changes',
          'A Facebook followers order applies to the follower count on the public Facebook Page submitted with the order. It does not automatically add Page Likes or likes to individual posts.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public Facebook Page URL and the follower package you want to purchase. Your Facebook password is not required.',
        ),
        card(
          p,
          6,
          'What Facebook Followers Do Not Include',
          'Followers are separate from Facebook Page Likes and Post Likes. Ordering followers does not automatically add those other metrics or guarantee additional engagement, reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Facebook Followers, chosen the correct follower quantity, and provided the URL for the exact public Facebook Page where you want the followers added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Facebook Followers?',
      description:
        'After you place a Facebook followers order, the follower package and public Facebook Page URL you submitted are used to process the order for the selected Page. Keep the Page publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected follower package, quantity, and submitted Facebook Page URL are associated with your order so the request can be processed for the intended Page.',
        },
        {
          id: `${p}-th-2`,
          title: 'Followers Go to the Submitted Page',
          description:
            'The order applies to the Facebook Page connected to the URL you provided. Check the Page URL carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the follower quantity and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted Page, making it unavailable, or changing anything that prevents access to it while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Facebook Followers vs Page Likes vs Post Likes',
      description:
        'Facebook followers, Page Likes, and Post Likes represent different metrics. Choose the service based on whether you want to change the follower count on a Facebook Page, the Page Like count, or the like count on a specific Facebook post.',
      current: {
        title: 'Facebook Followers',
        description:
          'Followers are a Page-level metric. Choose Facebook Followers when you want to increase the follower count shown on a public Facebook Page.',
        bestFor: 'Facebook Pages where follower count is the metric you want to change.',
        ctaLabel: 'Facebook Followers',
      },
      likes: {
        title: 'Facebook Page Likes',
        description:
          'Page Likes are a Page-level metric separate from followers. Choose Facebook Page Likes when the Page Like count is the metric you want to change.',
        bestFor: 'Facebook Pages where Page Like count is the metric you want to change.',
        href: '/buy-facebook-page-likes',
        ctaLabel: 'View Facebook Page Likes',
      },
      views: {
        title: 'Facebook Post Likes',
        description:
          'Post Likes are a post-level metric. Choose Facebook Post Likes when you want to increase the like count on a specific eligible public Facebook post.',
        bestFor: 'Individual Facebook posts where the visible like count is the metric you want to change.',
        href: '/buy-facebook-post-likes',
        ctaLabel: 'View Facebook Post Likes',
      },
      combinedNote: '',
      commentsHref: '/buy-facebook-page-likes',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Facebook Followers',
      description:
        'Before you buy Facebook followers, review the package and Page details before completing your order. Make sure the follower quantity, price, Facebook Page URL, and service match what you want for the selected Page.',
      framingNote:
        'Check the submitted Facebook Page URL, follower quantity, and price one more time before checkout. Avoid relying on claims that buying followers will guarantee additional Page Likes, Post Likes, engagement, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Follower Quantity',
          'Review the number of Facebook followers included in the package so you know how many you are ordering for the submitted Page.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected follower package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct Facebook Page URL',
          'Check the public Facebook Page URL carefully so the order is associated with the exact Page where you want the followers added.',
        ),
        card(
          p,
          10,
          'Choose the Right Facebook Service',
          'Followers, Page Likes, and Post Likes are separate metrics. Check that Facebook Followers is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Preparing Your Facebook Page for a Followers Order',
      description:
        'Facebook Followers is a Page-level service. Before ordering, confirm the eligible public Facebook Page and follower quantity you want to use.',
      eyebrow: 'Ready for Facebook Followers',
      closingNote:
        'Facebook Followers applies to a public Facebook Page. Submit the correct Page, keep it accessible, and review the follower package before checkout.',
      cards: [
        card(
          p,
          12,
          'Use the Correct Facebook Page',
          'Provide the public Facebook Page information requested during checkout. Do not submit an individual Facebook post when ordering Page followers.',
        ),
        card(
          p,
          13,
          'Keep the Page Accessible',
          'Keep the submitted Page publicly accessible where required while the follower order is being processed.',
        ),
        card(
          p,
          14,
          'Followers and Page Likes Are Different',
          'Facebook Followers applies to the Page follower count. Facebook Page Likes is a separate service for the Page Like metric.',
        ),
        card(
          p,
          15,
          'Review the Package',
          'Check the follower quantity, Page information and price before completing checkout.',
        ),
      ],
    };
    const facebookFollowerPopular = [
      {
        quantity: 100,
        label: '100 Followers',
        recommendedFor:
          'A smaller package for a public Facebook Page where you want to add one hundred followers.',
      },
      {
        quantity: 500,
        label: '500 Followers',
        recommendedFor:
          'A smaller-to-mid-range option for a Facebook Page where you want to add five hundred followers.',
      },
      {
        quantity: 1000,
        label: '1,000 Followers',
        recommendedFor:
          'A mid-range package for a public Facebook Page where you want to add one thousand followers.',
      },
      {
        quantity: 5000,
        label: '5,000 Followers',
        recommendedFor:
          'A larger option for a Facebook Page where you want to add five thousand followers.',
      },
      {
        quantity: 10000,
        label: '10,000 Followers',
        recommendedFor:
          'A higher-volume package for a public Facebook Page where you want to add ten thousand followers.',
      },
    ] as const;
    const liveFacebookFollowerPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Facebook Followers Packages',
      description:
        'Compare some of the Facebook follower quantities available on NovaLikes below, or return to the full pricing section to see all available package options.',
      rows: facebookFollowerPopular.flatMap((row) => {
        const pkg = liveFacebookFollowerPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Facebook Followers',
      description:
        'Buying followers changes the follower count on the selected Facebook Page, but the rest of your Facebook activity still depends on the content you publish and how you manage your Page. Keep your Page active, review its performance, and interact with your audience alongside the service.',
      closingNote:
        'Follower count is only one metric on a Facebook Page. Your content, Page Likes, post interactions, audience responses, and other activity still depend on how you manage your Facebook presence.',
      items: [
        card(
          p,
          16,
          'Keep Your Facebook Page Active',
          'Continue publishing posts that fit your business, brand, topic, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Keep Your Page Information Updated',
          'Review your Page name, description, contact details, website, business information, and other public details when relevant.',
        ),
        card(
          p,
          18,
          'Review Your Facebook Insights',
          'If insights are available for your Page, review follower activity, post performance, engagement, and other available data to understand how your own content performs.',
        ),
        card(
          p,
          19,
          'Test Different Types of Content',
          'Try different post formats, topics, images, videos, and publishing approaches to learn what works for your Page.',
        ),
        card(
          p,
          20,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher follower count does not replace the interactions you build through your own Page activity.',
        ),
        card(
          p,
          21,
          'Maintain a Consistent Page Presence',
          'Keep managing and publishing on your Page rather than treating a followers package as a replacement for ongoing Facebook activity.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Facebook Followers',
      description:
        'A few simple mistakes can cause problems with a Facebook followers order. Check the Page URL, follower quantity, service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Facebook Page URL, follower quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Facebook Page URL',
          'Check the public Facebook Page URL carefully before ordering. The URL should point to the exact Page where you want the followers added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Facebook Service',
          'Followers, Page Likes, and Post Likes are separate services. Choose Facebook Followers only when the follower count on a Page is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Follower Quantity',
          'Review the number of followers included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Making the Page Unavailable During an Order',
          'Avoid deleting the submitted Page or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Followers to Guarantee Other Results',
          'A higher follower count does not automatically mean more Page Likes, Post Likes, engagement, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Followers as a Replacement for Page Activity',
          'Buying followers changes one metric on the selected Page. Your posts, Page information, publishing decisions, and audience interaction still depend on how you manage your Page.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-facebook-page-likes': {
          title: 'Facebook Page Likes',
          description:
            'Choose Facebook Page Likes when the Page Like count on a public Facebook Page is the metric you want to change.',
          ctaLabel: 'View Facebook Page Likes',
        },
        'buy-facebook-post-likes': {
          title: 'Facebook Post Likes',
          description:
            'Choose Facebook Post Likes when you want to increase the like count shown on an eligible public Facebook post.',
          ctaLabel: 'View Facebook Post Likes',
        },
      },
    };
  }

  if (slug === 'buy-facebook-page-likes') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Facebook Page Likes?',
      description:
        'NovaLikes makes it easy to compare Facebook Page Like packages before you order. Choose the Page Like quantity you want, provide the correct public Facebook Page URL, review the package price, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Page Like Quantities',
          'Compare the available Facebook Page Like quantities and choose the package that matches the number of Page Likes you want to order.',
        ),
        card(
          p,
          1,
          'Public Facebook Page URL Only',
          'Provide the correct public Facebook Page URL for the Page where you want the Page Likes added. Your Facebook password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected Page Like quantity and current package price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Facebook Page Likes order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Facebook Page Likes?',
      description:
        'Yes. Facebook Page Like packages can be purchased through online Page Like services. With NovaLikes, you choose an available Page Likes package, provide the public Facebook Page URL for the Page you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a Facebook Page Likes Order Changes',
          'A Facebook Page Likes order applies to the Page Like count on the public Facebook Page submitted with the order. It does not automatically add Facebook Followers or likes to individual posts.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public Facebook Page URL and the Page Likes package you want to purchase. Your Facebook password is not required.',
        ),
        card(
          p,
          6,
          'What Facebook Page Likes Do Not Include',
          'Page Likes are separate from Facebook Followers and Post Likes. Ordering Page Likes does not automatically add those other metrics or guarantee additional engagement, reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Facebook Page Likes, chosen the correct Page Like quantity, and provided the URL for the exact public Facebook Page where you want the Page Likes added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Facebook Page Likes?',
      description:
        'After you place a Facebook Page Likes order, the Page Likes package and public Facebook Page URL you submitted are used to process the order for the selected Page. Keep the Page publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected Page Likes package, quantity, and submitted Facebook Page URL are associated with your order so the request can be processed for the intended Page.',
        },
        {
          id: `${p}-th-2`,
          title: 'Page Likes Go to the Submitted Page',
          description:
            'The order applies to the Facebook Page connected to the URL you provided. Check the Page URL carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the Page Like quantity and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted Page, making it unavailable, or changing anything that prevents access to it while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Facebook Page Likes vs Other Facebook Services',
      description:
        'Facebook Page Likes, Facebook Followers, and Facebook Post Likes represent different metrics. Choose the service based on whether you want to change the Page Like count, follower count, or the like count on a specific Facebook post.',
      current: {
        title: 'Facebook Page Likes',
        description:
          'Page Likes are a Page-level metric. Choose Facebook Page Likes when the Page Like count on a public Facebook Page is the metric you want to change.',
        bestFor: 'Facebook Pages where Page Like count is the metric you want to change.',
        ctaLabel: 'Facebook Page Likes',
      },
      likes: {
        title: 'Facebook Followers',
        description:
          'Followers are a separate Page-level metric. Choose Facebook Followers when you want to increase the follower count shown on a public Facebook Page.',
        bestFor: 'Facebook Pages where follower count is the metric you want to change.',
        href: '/buy-facebook-followers',
        ctaLabel: 'View Facebook Followers',
      },
      views: {
        title: 'Facebook Post Likes',
        description:
          'Post Likes are a post-level metric. Choose Facebook Post Likes when you want to increase the like count on a specific eligible public Facebook post.',
        bestFor: 'Individual Facebook posts where the visible like count is the metric you want to change.',
        href: '/buy-facebook-post-likes',
        ctaLabel: 'View Facebook Post Likes',
      },
      combinedNote:
        'Choose the Facebook service that matches the exact metric you want to change before placing an order.',
      commentsHref: '/buy-facebook-followers',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Facebook Page Likes',
      description:
        'Before you buy Facebook Page Likes, review the package and Page details before completing your order. Make sure the Page Like quantity, price, Facebook Page URL, and selected service match what you want for the Page.',
      framingNote:
        'Check the submitted Facebook Page URL, Page Like quantity, and price one more time before checkout. Avoid relying on claims that buying Page Likes will guarantee additional followers, Post Likes, engagement, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Page Like Quantity',
          'Review the number of Facebook Page Likes included in the package so you know how many you are ordering for the submitted Page.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected Page Likes package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct Facebook Page URL',
          'Check the public Facebook Page URL carefully so the order is associated with the exact Page where you want the Page Likes added.',
        ),
        card(
          p,
          10,
          'Choose the Right Facebook Service',
          'Page Likes, Followers, and Post Likes are separate metrics. Check that Facebook Page Likes is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Preparing Your Facebook Page for Page Likes',
      description:
        'Facebook Page Likes applies to the Like count of an eligible public Facebook Page. Make sure the Page submitted during checkout is the exact Page you want to use.',
      eyebrow: 'Ready for Facebook Page Likes',
      closingNote:
        'Facebook Page Likes applies to a public Facebook Page. Submit a Page URL rather than a post URL, keep the Page public, and review the selected quantity before checkout.',
      cards: [
        card(
          p,
          12,
          'Submit a Page URL',
          'Use the public Facebook Page URL requested for the service. A link to an individual Facebook post is not the correct target for Page Likes.',
        ),
        card(
          p,
          13,
          'Keep the Page Public',
          'Keep the submitted Page publicly accessible where required while the order is being processed.',
        ),
        card(
          p,
          14,
          'Page Likes and Followers Are Separate',
          'Page Likes and Followers are both Page-level metrics, but they are different services. Choose the one that matches the metric you want to change.',
        ),
        card(
          p,
          15,
          'Review Quantity and Price',
          'Check the selected Page Like quantity and current package price before completing your order.',
        ),
      ],
    };
    const facebookPageLikesPopular = [
      {
        quantity: 100,
        label: '100 Page Likes',
        recommendedFor:
          'A smaller package for a public Facebook Page where you want to add one hundred Page Likes.',
      },
      {
        quantity: 500,
        label: '500 Page Likes',
        recommendedFor:
          'A smaller-to-mid-range option for a Facebook Page where you want to add five hundred Page Likes.',
      },
      {
        quantity: 1000,
        label: '1,000 Page Likes',
        recommendedFor:
          'A mid-range package for a public Facebook Page where you want to add one thousand Page Likes.',
      },
      {
        quantity: 5000,
        label: '5,000 Page Likes',
        recommendedFor:
          'A larger option for a Facebook Page where you want to add five thousand Page Likes.',
      },
      {
        quantity: 10000,
        label: '10,000 Page Likes',
        recommendedFor:
          'A higher-volume package for a public Facebook Page where you want to add ten thousand Page Likes.',
      },
    ] as const;
    const liveFacebookPageLikesPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Facebook Page Likes Packages',
      description:
        'Compare some of the Facebook Page Like quantities available on NovaLikes below, or return to the full pricing section to see all available package options.',
      rows: facebookPageLikesPopular.flatMap((row) => {
        const pkg = liveFacebookPageLikesPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Facebook Page Likes',
      description:
        'Buying Page Likes changes the Page Like count on the selected Facebook Page, but the rest of your Facebook activity still depends on the content you publish and how you manage your Page. Keep your Page active, review its performance, and interact with your audience alongside the service.',
      closingNote:
        'Page Like count is only one metric on a Facebook Page. Your followers, post interactions, audience responses, and other activity still depend on how you manage your Facebook presence.',
      items: [
        card(
          p,
          16,
          'Keep Your Facebook Page Active',
          'Continue publishing posts that fit your business, brand, topic, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Keep Your Page Information Updated',
          'Review your Page name, description, contact details, website, business information, and other public details when relevant.',
        ),
        card(
          p,
          18,
          'Review Your Facebook Insights',
          'If insights are available for your Page, review Page activity, post performance, engagement, and other available data to understand how your own content performs.',
        ),
        card(
          p,
          19,
          'Test Different Types of Content',
          'Try different post formats, topics, images, videos, and publishing approaches to learn what works for your Page.',
        ),
        card(
          p,
          20,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher Page Like count does not replace the interactions you build through your own Page activity.',
        ),
        card(
          p,
          21,
          'Maintain a Consistent Page Presence',
          'Keep managing and publishing on your Page rather than treating a Page Likes package as a replacement for ongoing Facebook activity.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Facebook Page Likes',
      description:
        'A few simple mistakes can cause problems with a Facebook Page Likes order. Check the Page URL, Page Like quantity, service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Facebook Page URL, Page Like quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Facebook Page URL',
          'Check the public Facebook Page URL carefully before ordering. The URL should point to the exact Page where you want the Page Likes added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Facebook Service',
          'Page Likes, Followers, and Post Likes are separate services. Choose Facebook Page Likes only when the Page Like count on a Page is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Page Like Quantity',
          'Review the number of Page Likes included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Making the Page Unavailable During an Order',
          'Avoid deleting the submitted Page or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Page Likes to Guarantee Other Results',
          'A higher Page Like count does not automatically mean more followers, Post Likes, engagement, reach, sales, or organic growth.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-facebook-followers': {
          title: 'Facebook Followers',
          description:
            'Choose Facebook Followers when the follower count on a public Facebook Page is the metric you want to change.',
          ctaLabel: 'View Facebook Followers',
        },
        'buy-facebook-post-likes': {
          title: 'Facebook Post Likes',
          description:
            'Choose Facebook Post Likes when you want to increase the like count shown on an eligible public Facebook post.',
          ctaLabel: 'View Facebook Post Likes',
        },
      },
    };
  }

  if (slug === 'buy-facebook-post-likes') {
    config.whyBuyNote = '';
    config.orderNotice = '';
    config.whyChoose = {
      id: `${p}-why-choose`,
      title: 'Why Choose NovaLikes for Facebook Post Likes?',
      description:
        'NovaLikes makes it easy to compare Facebook Post Like packages before you order. Choose the Post Like quantity you want, provide the correct public Facebook post URL, review the package price, and use order tracking after checkout to check available status information.',
      items: [
        card(
          p,
          0,
          'Multiple Post Like Quantities',
          'Compare the available Facebook Post Like quantities and choose the package that matches the number of likes you want to order for the selected post.',
        ),
        card(
          p,
          1,
          'Public Facebook Post URL Only',
          'Provide the correct public Facebook post URL for the post where you want the likes added. Your Facebook password is not required.',
        ),
        card(
          p,
          2,
          'Review Before Checkout',
          'Check the selected Post Like quantity and current package price before adding your order to the cart and completing checkout.',
        ),
        card(
          p,
          3,
          'Order Tracking',
          'Use the available tracking option after checkout to check status information for your Facebook Post Likes order.',
        ),
      ],
    };
    config.canYouBuy = {
      id: `${p}-can-you-buy`,
      title: 'Can You Buy Facebook Post Likes?',
      description:
        'Yes. Facebook Post Like packages can be purchased through online Post Like services. With NovaLikes, you choose an available Post Likes package, provide the public Facebook post URL for the post you want to use, and complete your order through the website.',
      cards: [
        card(
          p,
          4,
          'What a Facebook Post Likes Order Changes',
          'A Facebook Post Likes order applies to the like count on the public Facebook post submitted with the order. It does not automatically add Followers, Page Likes, comments, shares, or views.',
        ),
        card(
          p,
          5,
          'What You Need to Place an Order',
          'You need the correct public Facebook post URL and the Post Likes package you want to purchase. Your Facebook password is not required.',
        ),
        card(
          p,
          6,
          'What Facebook Post Likes Do Not Include',
          'Post Likes are separate from Facebook Followers, Page Likes, comments, shares, and views. Ordering Post Likes does not automatically add those other metrics or guarantee additional reach, sales, or organic growth.',
        ),
      ],
      closingNote:
        'Before checkout, make sure you have selected Facebook Post Likes, chosen the correct Post Like quantity, and provided the URL for the exact public Facebook post where you want the likes added.',
    };
    config.whatHappens = {
      id: `${p}-what-happens`,
      title: 'What Happens After You Buy Facebook Post Likes?',
      description:
        'After you place a Facebook Post Likes order, the Post Likes package and public Facebook post URL you submitted are used to process the order for the selected post. Keep the post publicly accessible where required while the order is being handled.',
      steps: [
        {
          id: `${p}-th-1`,
          title: 'Your Order Details Are Checked',
          description:
            'The selected Post Likes package, quantity, and submitted Facebook post URL are associated with your order so the request can be processed for the intended post.',
        },
        {
          id: `${p}-th-2`,
          title: 'Post Likes Go to the Submitted Post',
          description:
            'The order applies to the Facebook post connected to the URL you provided. Check the post URL carefully before completing checkout.',
        },
        {
          id: `${p}-th-3`,
          title: 'Processing Time Can Vary',
          description:
            'The time needed to process an order can vary depending on the Post Like quantity and current order conditions. One fixed delivery time should not be expected for every package.',
        },
        {
          id: `${p}-th-4`,
          title: 'Check Your Order Status',
          description:
            'Use NovaLikes order tracking for available status updates. If you need help, contact support with the relevant order information.',
        },
      ],
      closingNote:
        'Avoid deleting the submitted post, making it unavailable, or changing anything that prevents access to it while the order is being processed. If something changes after ordering, contact support if you need assistance.',
    };
    config.serviceCompare = {
      id: `${p}-service-compare`,
      title: 'Facebook Post Likes vs Other Facebook Services',
      description:
        'Facebook Post Likes, Facebook Page Likes, and Facebook Followers represent different metrics. Choose the service based on whether you want to change the like count on a specific post, the Page Like count, or the follower count on a Facebook Page.',
      current: {
        title: 'Facebook Post Likes',
        description:
          'Post Likes are a post-level metric. Choose Facebook Post Likes when the like count on a specific eligible public Facebook post is the metric you want to change.',
        bestFor: 'Individual Facebook posts where the visible like count is the metric you want to change.',
        ctaLabel: 'Facebook Post Likes',
      },
      likes: {
        title: 'Facebook Followers',
        description:
          'Followers are a Page-level metric. Choose Facebook Followers when you want to increase the follower count shown on a public Facebook Page.',
        bestFor: 'Facebook Pages where follower count is the metric you want to change.',
        href: '/buy-facebook-followers',
        ctaLabel: 'View Facebook Followers',
      },
      views: {
        title: 'Facebook Page Likes',
        description:
          'Page Likes are a separate Page-level metric. Choose Facebook Page Likes when the Page Like count on a public Facebook Page is the metric you want to change.',
        bestFor: 'Facebook Pages where Page Like count is the metric you want to change.',
        href: '/buy-facebook-page-likes',
        ctaLabel: 'View Facebook Page Likes',
      },
      combinedNote:
        'Choose the Facebook service that matches the exact metric you want to change before placing an order.',
      commentsHref: '/buy-facebook-followers',
    };
    config.beforeBuying = {
      id: `${p}-before-buying`,
      title: 'What to Check Before Buying Facebook Post Likes',
      description:
        'Before you buy Facebook Post Likes, review the package and post details before completing your order. Make sure the Post Like quantity, price, Facebook post URL, and selected service match what you want for the specific post.',
      framingNote:
        'Check the submitted Facebook post URL, Post Like quantity, and price one more time before checkout. Avoid relying on claims that buying Post Likes will guarantee comments, shares, followers, Page Likes, reach, sales, or organic growth.',
      items: [
        card(
          p,
          7,
          'Check the Post Like Quantity',
          'Review the number of Facebook Post Likes included in the package so you know how many you are ordering for the submitted post.',
        ),
        card(
          p,
          8,
          'Confirm the Package Price',
          'Check the current price shown for your selected Post Likes package before adding it to the cart. If you change the quantity, review the updated price before checkout.',
        ),
        card(
          p,
          9,
          'Use the Correct Facebook Post URL',
          'Check the public Facebook post URL carefully so the order is associated with the exact post where you want the likes added.',
        ),
        card(
          p,
          10,
          'Choose the Right Facebook Service',
          'Post Likes, Page Likes, and Followers are separate metrics. Check that Facebook Post Likes is the service you need before placing the order.',
        ),
        card(
          p,
          11,
          'Review Support and Policies',
          'Check the relevant purchase policies and available support options so you know where to look if you have a question about your order.',
        ),
      ],
    };
    config.worldwide = {
      id: `${p}-worldwide`,
      title: 'Choosing the Right Facebook Post for Likes',
      description:
        'Facebook Post Likes applies to one specific eligible public Facebook post. The Page itself and the individual post are different targets, so check the submitted URL carefully.',
      eyebrow: 'Ready for Facebook Post Likes',
      closingNote:
        'Facebook Post Likes applies to a specific public Facebook post. Submit the post URL rather than only the Page URL, keep the post available, and review the package before checkout.',
      cards: [
        card(
          p,
          12,
          'Use the Specific Post URL',
          'Submit the public URL of the individual Facebook post where you want the Post Likes package applied.',
        ),
        card(
          p,
          13,
          'Do Not Submit Only the Page URL',
          'A general Facebook Page URL is not the correct target for a Post Likes order.',
        ),
        card(
          p,
          14,
          'Keep the Post Available',
          'Avoid deleting or restricting the submitted post while the active order requires access to it.',
        ),
        card(
          p,
          15,
          'Review Your Post Like Package',
          'Check the Post Like quantity, submitted post URL and price before completing checkout.',
        ),
      ],
    };
    const facebookPostLikesPopular = [
      {
        quantity: 100,
        label: '100 Post Likes',
        recommendedFor:
          'A smaller package for a specific public Facebook post where you want to add one hundred likes.',
      },
      {
        quantity: 500,
        label: '500 Post Likes',
        recommendedFor:
          'A smaller-to-mid-range option for a public Facebook post where you want to add five hundred likes.',
      },
      {
        quantity: 1000,
        label: '1,000 Post Likes',
        recommendedFor:
          'A mid-range package for a public Facebook post where you want to add one thousand likes.',
      },
      {
        quantity: 5000,
        label: '5,000 Post Likes',
        recommendedFor:
          'A larger option for a public Facebook post where you want to add five thousand likes.',
      },
      {
        quantity: 10000,
        label: '10,000 Post Likes',
        recommendedFor:
          'A higher-volume package for a public Facebook post where you want to add ten thousand likes.',
      },
    ] as const;
    const liveFacebookPostLikesPackages = getActivePackagesByServiceSlug(slug);
    config.packageSizes = {
      id: `${p}-popular-packages`,
      title: 'Popular Facebook Post Likes Packages',
      description:
        'Compare some of the Facebook Post Like quantities available on NovaLikes below, or return to the full pricing section to see all available package options.',
      rows: facebookPostLikesPopular.flatMap((row) => {
        const pkg = liveFacebookPostLikesPackages.find((item) => item.quantity === row.quantity);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            quantity: row.label,
            recommendedFor: row.recommendedFor,
          },
        ];
      }),
    };
    config.bestPractices = {
      id: `${p}-best-practices`,
      title: 'Best Practices After Buying Facebook Post Likes',
      description:
        'Buying Post Likes changes the like count on the selected Facebook post, but the rest of your Facebook activity still depends on the content you publish and how you manage your Page. Continue managing your content and review how your own posts perform alongside the service.',
      closingNote:
        'Post Like count is only one metric on a specific Facebook post. Comments, shares, followers, Page Likes, audience responses, and other activity remain separate from a Facebook Post Likes order.',
      items: [
        card(
          p,
          16,
          'Keep Publishing',
          'Continue publishing Facebook posts that fit your business, brand, topic, or the audience you want to reach.',
        ),
        card(
          p,
          17,
          'Keep Your Page Information Updated',
          'Review your Facebook Page information, contact details, website, and other relevant public details when needed.',
        ),
        card(
          p,
          18,
          'Create Relevant Content',
          'Plan future posts around topics and formats that make sense for your Page and the audience you want to reach.',
        ),
        card(
          p,
          19,
          'Review Available Insights',
          'If insights are available, review post performance, engagement, and other available data to understand how your own content performs.',
        ),
        card(
          p,
          20,
          'Use Different Content Formats',
          'Test different post formats, images, videos, topics, and publishing approaches to learn what works for your Facebook presence.',
        ),
        card(
          p,
          21,
          'Respond to Genuine Interaction',
          'Reply to genuine comments and messages when appropriate. A higher like count on one post does not replace the interactions you build through your own Facebook activity.',
        ),
      ],
    };
    config.commonMistakes = {
      id: `${p}-common-mistakes`,
      title: 'Common Mistakes When Buying Facebook Post Likes',
      description:
        'A few simple mistakes can cause problems with a Facebook Post Likes order. Check the post URL, Post Like quantity, selected service, and expectations before checkout so you know exactly what you are ordering.',
      closingNote:
        'Before placing an order, check the Facebook post URL, Post Like quantity, and price one more time. If something changes after checkout, use the available tracking or support options for your order.',
      items: [
        card(
          p,
          22,
          'Submitting the Wrong Facebook Post URL',
          'Check the public Facebook post URL carefully before ordering. The URL should point to the exact post where you want the likes added.',
        ),
        card(
          p,
          23,
          'Choosing the Wrong Facebook Service',
          'Post Likes, Page Likes, and Followers are separate services. Choose Facebook Post Likes only when the like count on a specific post is the metric you want to change.',
        ),
        card(
          p,
          24,
          'Selecting the Wrong Post Like Quantity',
          'Review the number of Post Likes included in your selected package before checkout so you do not order a different quantity from the one you intended.',
        ),
        card(
          p,
          25,
          'Making the Post Unavailable During an Order',
          'Avoid deleting the submitted post or making it unavailable while the order is being processed.',
        ),
        card(
          p,
          26,
          'Expecting Post Likes to Guarantee Other Results',
          'A higher like count on a post does not automatically mean more comments, shares, followers, Page Likes, reach, sales, or organic growth.',
        ),
        card(
          p,
          27,
          'Treating Post Likes as a Replacement for Content',
          'Buying Post Likes changes one metric on the submitted post. Your publishing decisions, future content, replies, and other Facebook activity still depend on how you manage your presence.',
        ),
      ],
    };
    config.relatedPackages = {
      copyBySlug: {
        'buy-facebook-followers': {
          title: 'Facebook Followers',
          description:
            'Choose Facebook Followers when the follower count on a public Facebook Page is the metric you want to change.',
          ctaLabel: 'View Facebook Followers',
        },
        'buy-facebook-page-likes': {
          title: 'Facebook Page Likes',
          description:
            'Choose Facebook Page Likes when the Page Like count on a public Facebook Page is the metric you want to change.',
          ctaLabel: 'View Facebook Page Likes',
        },
      },
    };
  }

  let whyBuy = {
    id: `${p}-why-buy`,
    title: `Why Do People Buy ${label}?`,
    description: `People buy ${label} for different reasons. This dummy copy does not add extra claims.`,
    items: [
      { id: `${p}-wb-1`, title: 'Start With a Visible Count', description: 'Newer profiles may use a package while they continue publishing.' },
      { id: `${p}-wb-2`, title: 'Support a Launch', description: 'Some customers add a package during a campaign or product introduction.' },
      { id: `${p}-wb-3`, title: 'Change the Selected Metric', description: `This service is focused on ${unit.toLowerCase()} rather than every other metric.` },
      { id: `${p}-wb-4`, title: 'Choose a Quantity', description: 'Different package sizes let you select an amount before ordering.' },
      { id: `${p}-wb-5`, title: 'Use It Alongside Content', description: 'Orders do not replace posts or account management.' },
    ],
    bottomNote: 'If you need a different metric, compare the related services on this page.',
  };

  if (slug === 'buy-instagram-likes') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Instagram Likes?',
      description:
        'People buy Instagram likes for different types of content and different reasons. Some use like packages for a new post or Reel, while others use them when promoting a product, campaign, announcement, or piece of content. The service changes the visible like count on the selected content, but it does not guarantee reach, comments, followers, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Add Likes to New Content',
          description:
            'A like package can be used on a recently published post or Reel when you want to increase its visible like count.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Support a Product or Campaign Post',
          description:
            'Businesses and creators may use Instagram likes on content related to a product launch, promotion, announcement, or campaign.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Increase the Visible Like Count',
          description:
            'Instagram likes apply to the selected post or Reel rather than changing the follower count shown on your profile.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose a Quantity for the Content',
          description:
            'Different package sizes let you choose the number of likes based on the individual post or Reel you want to use.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Likes Alongside Your Own Content Strategy',
          description:
            'Buying likes changes one visible metric on the selected content. Captions, creative work, posting decisions, replies, and other account activity still depend on how you manage your Instagram presence.',
        },
      ],
      bottomNote:
        'If the metric you want to change is your profile follower count, video views, or comments rather than likes, choose the corresponding Instagram service instead.',
    };
  }

  if (slug === 'buy-instagram-views') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Instagram Views?',
      description:
        'People buy Instagram views for different types of video content and different reasons. Some use view packages for a new Reel or video, while others use them for product content, announcements, campaigns, or other posts they want more views displayed on. The service changes the visible view count on the selected content, but it does not guarantee likes, comments, followers, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Add Views to a New Reel or Video',
          description:
            'A views package can be used on recently published video content when you want to increase its visible view count.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Support Product or Campaign Content',
          description:
            'Creators and businesses may use Instagram views on Reels or videos connected to a product, promotion, announcement, or campaign.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Increase the Visible View Count',
          description:
            'Instagram views apply to the selected Reel or video rather than changing the follower count shown on your profile.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose a Quantity for the Video',
          description:
            'Different package sizes let you choose the number of views based on the individual Reel or video you want to use.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Views Alongside Your Own Content',
          description:
            'Buying views changes one visible metric on the selected content. The video itself, caption, publishing decisions, replies, and other account activity still depend on how you manage your Instagram presence.',
        },
      ],
      bottomNote:
        'If the metric you want to change is your profile follower count, likes, or comments rather than video views, choose the corresponding Instagram service instead.',
    };
  }

  if (slug === 'buy-instagram-comments') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Instagram Comments?',
      description:
        'People buy Instagram comments for different types of posts and Reels. Some use comment packages for product content, announcements, campaigns, or other posts where they want additional comments displayed. The service adds comments to the selected content, but it does not guarantee more followers, likes, views, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Add Comments to a Post or Reel',
          description:
            'A comments package can be used when you want additional comments displayed on a specific public Instagram post or Reel.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Comments on Product or Campaign Content',
          description:
            'Businesses and creators may order comments for content connected to a product, promotion, announcement, launch, or campaign.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Comment Metric',
          description:
            'Instagram comments apply to the selected content rather than changing your profile follower count or automatically adding likes or views.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose a Comment Quantity',
          description:
            'Different package sizes let you select the number of comments you want for the individual post or Reel you submit.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Comments Alongside Your Own Content',
          description:
            'Buying comments does not replace publishing and managing your own content. Captions, replies, new posts, and other account activity still depend on how you manage your Instagram presence.',
        },
      ],
      bottomNote:
        'If you want to change your follower count, like count, or video views rather than add comments, choose the corresponding Instagram service instead.',
    };
  }

  if (slug === 'buy-tiktok-followers') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy TikTok Followers?',
      description:
        'People buy TikTok followers for different reasons. Some want to increase the follower count displayed on a newer profile, while others choose a follower package for an established account, campaign, launch, or other TikTok activity. The service changes the follower metric on the selected profile, but it does not guarantee views, likes, engagement, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible Follower Count',
          description:
            'A TikTok followers package can be used when you want to increase the number of followers displayed on your public profile.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Followers Around a Launch or Campaign',
          description:
            'Creators and businesses may choose a follower package while working on a new account, product launch, campaign, or other TikTok content activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Follower Metric',
          description:
            'TikTok Followers applies to your profile follower count rather than automatically adding likes or views to individual videos.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of TikTok followers you want to order for the submitted profile.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Followers Alongside Your Content',
          description:
            'Buying followers does not replace publishing and managing your own TikTok content. Videos, captions, replies, and other account activity still depend on how you manage your profile.',
        },
      ],
      bottomNote:
        'If likes or video views are the metric you want to change instead, choose the corresponding TikTok service rather than a followers package.',
    };
  }

  if (slug === 'buy-tiktok-likes') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy TikTok Likes?',
      description:
        'People buy TikTok likes for different reasons. Some want to increase the like count displayed on a particular video, while others choose a likes package for content connected to a launch, campaign, or ongoing TikTok activity. The service changes the like metric on the selected video, but it does not guarantee additional views, followers, engagement, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible Like Count',
          description:
            'A TikTok likes package can be used when you want to increase the number of likes displayed on a specific public video.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Likes Around a Launch or Campaign',
          description:
            'Creators and businesses may choose a likes package for a TikTok video connected to a product launch, campaign, announcement, or other content activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Like Metric',
          description:
            'TikTok Likes applies to the like count on the selected video rather than automatically adding followers to your profile or views to the video.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of TikTok likes you want to order for the submitted video.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Likes Alongside Your Content',
          description:
            'Buying likes does not replace creating and managing your own TikTok content. Videos, captions, replies, and other account activity still depend on how you manage your presence.',
        },
      ],
      bottomNote:
        'If followers or video views are the metric you want to change instead, choose the corresponding TikTok service rather than a likes package.',
    };
  }

  if (slug === 'buy-tiktok-views') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy TikTok Views?',
      description:
        'People buy TikTok views for different reasons. Some want to increase the view count displayed on a particular video, while others choose a views package for content connected to a launch, campaign, or ongoing TikTok activity. The service changes the view metric on the selected video, but it does not guarantee additional likes, followers, engagement, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible View Count',
          description:
            'A TikTok views package can be used when you want to increase the number of views displayed on a specific public video.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Views Around a Launch or Campaign',
          description:
            'Creators and businesses may choose a views package for a TikTok video connected to a product launch, campaign, announcement, or other content activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the View Metric',
          description:
            'TikTok Views applies to the view count on the selected video rather than automatically adding followers to your profile or likes to the video.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of TikTok views you want to order for the submitted video.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Views Alongside Your Content',
          description:
            'Buying views does not replace creating and managing your own TikTok content. Videos, captions, replies, and other account activity still depend on how you manage your presence.',
        },
      ],
      bottomNote:
        'If followers or video likes are the metric you want to change instead, choose the corresponding TikTok service rather than a views package.',
    };
  }

  if (slug === 'buy-facebook-followers') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Facebook Followers?',
      description:
        'People buy Facebook followers for different reasons. Some want to increase the follower count displayed on a Facebook Page, while others choose a follower package for a Page connected to a business, brand, campaign, or ongoing content activity. The service changes the follower metric on the selected Page, but it does not guarantee additional likes, engagement, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible Follower Count',
          description:
            'A Facebook followers package can be used when you want to increase the follower count displayed on a specific public Facebook Page.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Followers Around a Launch or Campaign',
          description:
            'Businesses and Page owners may choose a follower package while working on a launch, campaign, announcement, or other Facebook activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Follower Metric',
          description:
            'Facebook Followers applies to the follower count on the selected Page. It does not automatically add Page Likes or likes to individual Facebook posts.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of Facebook followers you want to order for the submitted Page.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Followers Alongside Your Content',
          description:
            'Buying followers does not replace publishing and managing your own Facebook content. Posts, replies, Page information, and other activity still depend on how you manage your Page.',
        },
      ],
      bottomNote:
        'If Page Likes or Post Likes are the metric you want to change instead, choose the corresponding Facebook service rather than a followers package.',
    };
  }

  if (slug === 'buy-facebook-page-likes') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Facebook Page Likes?',
      description:
        'People buy Facebook Page Likes for different reasons. Some want to increase the Page Like count displayed on a Facebook Page, while others choose a Page Likes package for a Page connected to a business, brand, campaign, or ongoing content activity. The service changes the Page Like metric on the selected Page, but it does not guarantee additional followers, post likes, engagement, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible Page Like Count',
          description:
            'A Facebook Page Likes package can be used when you want to increase the Page Like count displayed on a specific public Facebook Page.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Page Likes Around a Launch or Campaign',
          description:
            'Businesses and Page owners may choose a Page Likes package while working on a launch, campaign, announcement, or other Facebook activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Page Like Metric',
          description:
            'Facebook Page Likes applies to the Page Like count on the selected Page. It does not automatically add Facebook Followers or likes to individual Facebook posts.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of Facebook Page Likes you want to order for the submitted Page.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Page Likes Alongside Your Content',
          description:
            'Buying Page Likes does not replace publishing and managing your own Facebook content. Posts, replies, Page information, and other activity still depend on how you manage your Page.',
        },
      ],
      bottomNote:
        'If Facebook Followers or Post Likes are the metric you want to change instead, choose the corresponding Facebook service rather than a Page Likes package.',
    };
  }

  if (slug === 'buy-facebook-post-likes') {
    whyBuy = {
      id: `${p}-why-buy`,
      title: 'Why Do People Buy Facebook Post Likes?',
      description:
        'People buy Facebook Post Likes for different reasons. Some want to increase the visible like count on a specific Facebook post, while others choose a Post Likes package for content connected to a launch, announcement, campaign, or ongoing Page activity. The service changes the like count on the submitted post, but it does not guarantee comments, shares, followers, Page Likes, reach, sales, or organic growth.',
      items: [
        {
          id: `${p}-wb-1`,
          title: 'Increase the Visible Like Count',
          description:
            'A Facebook Post Likes package can be used when you want to increase the like count displayed on a specific eligible public Facebook post.',
        },
        {
          id: `${p}-wb-2`,
          title: 'Use Post Likes Around Specific Content',
          description:
            'Page owners may choose a Post Likes package for a particular post connected to a launch, announcement, campaign, or other Facebook activity.',
        },
        {
          id: `${p}-wb-3`,
          title: 'Focus on the Post Like Metric',
          description:
            'Facebook Post Likes applies to the like count on the submitted post. It does not automatically add Facebook Followers, Page Likes, comments, shares, or views.',
        },
        {
          id: `${p}-wb-4`,
          title: 'Choose the Quantity You Want',
          description:
            'Different package sizes let you select the number of Facebook Post Likes you want to order for the submitted post.',
        },
        {
          id: `${p}-wb-5`,
          title: 'Use Post Likes Alongside Your Content',
          description:
            'Buying Post Likes does not replace publishing or managing your own Facebook content. Posts, replies, Page information, and other activity still depend on how you manage your Facebook presence.',
        },
      ],
      bottomNote:
        'If Facebook Followers or Page Likes are the metric you want to change instead, choose the corresponding Facebook service rather than a Post Likes package.',
    };
  }

  let howToBuy = {
    id: 'how-it-works',
    title: `How to Buy ${label}`,
    description: 'Choose a package, provide public details, complete checkout, and track the order.',
    steps: [
      { id: `${p}-step-1`, title: 'Choose a Package', description: 'Compare quantities and prices in the pricing section.' },
      { id: `${p}-step-2`, title: 'Enter Public Details', description: 'Provide the correct public username or content URL. A password is not required.' },
      { id: `${p}-step-3`, title: 'Complete Checkout', description: 'Review quantity and price, then place the order.' },
      { id: `${p}-step-4`, title: 'Track the Order', description: 'Use the available tracking option after checkout.' },
    ],
  };

  if (slug === 'buy-instagram-likes') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Instagram Likes',
      description:
        'Buying Instagram likes through NovaLikes takes four steps. Choose the number of likes you want, provide the public URL for the Instagram post or Reel, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Likes Package',
          description:
            'Compare the available like quantities and prices, then select the package you want for your Instagram content.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Post or Reel URL',
          description:
            'Provide the correct public URL for the Instagram post or Reel where you want the likes added. Your Instagram password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected likes quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Instagram likes order.',
        },
      ],
    };
  }

  if (slug === 'buy-instagram-views') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Instagram Views',
      description:
        'Buying Instagram views through NovaLikes takes four steps. Choose the number of views you want, provide the public URL for the Instagram Reel or video, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Views Package',
          description:
            'Compare the available view quantities and prices, then select the package you want for your Instagram video content.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Reel or Video URL',
          description:
            'Provide the correct public URL for the Instagram Reel or video where you want the views added. Your Instagram password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected views quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Instagram views order.',
        },
      ],
    };
  }

  if (slug === 'buy-instagram-comments') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Instagram Comments',
      description:
        'Buying Instagram comments through NovaLikes takes four steps. Choose the comments package and quantity you want, provide the public URL for the Instagram post or Reel, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Comments Package',
          description:
            'Compare the available comment options, quantities, and prices, then select the package you want for your Instagram content.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Post or Reel URL',
          description:
            'Provide the correct public URL for the Instagram post or Reel where you want the comments added. Your Instagram password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected comments package, quantity, and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Instagram comments order.',
        },
      ],
    };
  }

  if (slug === 'buy-tiktok-followers') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy TikTok Followers',
      description:
        'Buying TikTok followers through NovaLikes takes four steps. Choose the follower package you want, provide the public TikTok username for your profile, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Followers Package',
          description:
            'Compare the available TikTok follower quantities and prices, then select the package you want for your profile.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter Your TikTok Username',
          description:
            'Provide the correct public TikTok username for the profile where you want the followers added. Your TikTok password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected follower quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your TikTok followers order.',
        },
      ],
    };
  }

  if (slug === 'buy-tiktok-likes') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy TikTok Likes',
      description:
        'Buying TikTok likes through NovaLikes takes four steps. Choose the likes package you want, provide the public TikTok video link, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Likes Package',
          description:
            'Compare the available TikTok likes quantities and prices, then select the package you want for your video.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the TikTok Video Link',
          description:
            'Provide the correct public TikTok video link for the video where you want the likes added. Your TikTok password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected likes quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your TikTok likes order.',
        },
      ],
    };
  }

  if (slug === 'buy-tiktok-views') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy TikTok Views',
      description:
        'Buying TikTok views through NovaLikes takes four steps. Choose the views package you want, provide the public TikTok video link, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Views Package',
          description:
            'Compare the available TikTok views quantities, package options, and prices, then select the package you want for your video.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the TikTok Video Link',
          description:
            'Provide the correct public TikTok video link for the video where you want the views added. Your TikTok password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected views quantity, package option, and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your TikTok views order.',
        },
      ],
    };
  }

  if (slug === 'buy-facebook-followers') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Facebook Followers',
      description:
        'Buying Facebook followers through NovaLikes takes four steps. Choose the follower package you want, provide the public Facebook Page URL, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Followers Package',
          description:
            'Compare the available Facebook follower quantities and prices, then select the package you want for your Page.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Facebook Page URL',
          description:
            'Provide the correct public Facebook Page URL for the Page where you want the followers added. Your Facebook password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected follower quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Facebook followers order.',
        },
      ],
    };
  }

  if (slug === 'buy-facebook-page-likes') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Facebook Page Likes',
      description:
        'Buying Facebook Page Likes through NovaLikes takes four steps. Choose the Page Likes package you want, provide the public Facebook Page URL, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Page Likes Package',
          description:
            'Compare the available Facebook Page Like quantities and prices, then select the package you want for your Page.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Facebook Page URL',
          description:
            'Provide the correct public Facebook Page URL for the Page where you want the Page Likes added. Your Facebook password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected Page Like quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Facebook Page Likes order.',
        },
      ],
    };
  }

  if (slug === 'buy-facebook-post-likes') {
    howToBuy = {
      id: 'how-it-works',
      title: 'How to Buy Facebook Post Likes',
      description:
        'Buying Facebook Post Likes through NovaLikes takes four steps. Choose the Post Likes package you want, provide the public Facebook post URL, complete checkout, and use your order details to check its status.',
      steps: [
        {
          id: `${p}-step-1`,
          title: 'Choose Your Post Likes Package',
          description:
            'Compare the available Facebook Post Like quantities and prices, then select the package you want for the post.',
        },
        {
          id: `${p}-step-2`,
          title: 'Enter the Facebook Post URL',
          description:
            'Provide the correct public Facebook post URL for the post where you want the likes added. Your Facebook password is not required.',
        },
        {
          id: `${p}-step-3`,
          title: 'Complete Your Order',
          description:
            'Review the selected Post Like quantity and price, then continue through checkout to place your order.',
        },
        {
          id: `${p}-step-4`,
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check status information for your Facebook Post Likes order.',
        },
      ],
    };
  }

  let relatedHeading = `Explore Other ${platform} Services`;
  let relatedIntro = `${unit} is only one ${platform} service. Compare the options below.`;

  if (slug === 'buy-instagram-likes') {
    relatedHeading = 'Explore Other Instagram Services';
    relatedIntro =
      'Likes are only one Instagram metric. If you want to work on your profile follower count, video views, or comments on specific content, compare the other Instagram services below.';
  }

  if (slug === 'buy-instagram-views') {
    relatedHeading = 'Explore Other Instagram Services';
    relatedIntro =
      'Views are only one Instagram metric. If you want to work on your profile follower count, likes on specific content, or comments on a post or Reel, compare the other Instagram services below.';
  }

  if (slug === 'buy-instagram-comments') {
    relatedHeading = 'Explore Other Instagram Services';
    relatedIntro =
      'Comments are only one Instagram metric. If you want to work on your profile follower count, likes on specific content, or views on a Reel or video, compare the other Instagram services below.';
  }

  if (slug === 'buy-tiktok-followers') {
    relatedHeading = 'Explore Other TikTok Services';
    relatedIntro =
      'Followers are only one TikTok metric. If you want to increase the like count or view count on a specific video instead, compare the other TikTok services below.';
  }

  if (slug === 'buy-tiktok-likes') {
    relatedHeading = 'Explore Other TikTok Services';
    relatedIntro =
      'Likes are only one TikTok metric. If you want to increase the follower count on your profile or the view count on a specific video instead, compare the other TikTok services below.';
  }

  if (slug === 'buy-tiktok-views') {
    relatedHeading = 'Explore Other TikTok Services';
    relatedIntro =
      'Views are only one TikTok metric. If you want to increase the follower count on your profile or the like count on a specific video instead, compare the other TikTok services below.';
  }

  if (slug === 'buy-facebook-followers') {
    relatedHeading = 'Explore Other Facebook Services';
    relatedIntro =
      'Followers are only one Facebook metric. If you want to increase the Page Like count or the like count on a specific Facebook post instead, compare the other Facebook services below.';
  }

  if (slug === 'buy-facebook-page-likes') {
    relatedHeading = 'Explore Other Facebook Services';
    relatedIntro =
      'Page Likes are only one Facebook metric. If you want to increase the follower count on a Facebook Page or the like count on a specific Facebook post instead, compare the other Facebook services below.';
  }

  if (slug === 'buy-facebook-post-likes') {
    relatedHeading = 'Explore Other Facebook Services';
    relatedIntro =
      'Post Likes are only one Facebook metric. If you want to increase the follower count or Page Like count on a Facebook Page instead, compare the other Facebook services below.';
  }

  return {
    config,
    whyBuy,
    howToBuy,
    relatedHeading,
    relatedIntro,
  };
}

export function dummyRelatedSlugs(serviceSlug: string): string[] {
  return RELATED_BY_SLUG[serviceSlug] ?? [];
}
