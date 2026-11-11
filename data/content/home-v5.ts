/**
 * Root English homepage v5 — Instagram + TikTok (+ Facebook tab), October 2026.
 * Replaces HOME_V4 on "/" only. Locale (/de/ …) and non-UK markets keep homepageHubLegacy; `/uk` uses HOME_V5_UK.
 * All copy is final. Do not edit wording in code.
 *
 * Layout and motion: port reference/index.html + reference/home-v5.css + reference/home-v5.js exactly.
 * SplitTitle: `${lead} <span class="hl">${highlight}</span> ${tail}` in ONE heading element.
 * {fromPrice}: lowest active package price for that slug from the pricing registry, formatted like the
 *               service-page price block. Never hard-code prices.
 * Facts (keep identical site-wide): start within 6–8 hours, finish 4–6 hours after start, gradual delivery
 * on request, 6-month refill from delivery, 24/7 WhatsApp +44 7454 758272, prices in USD, never a password.
 */

export const HOME_V5 = {
  "hero": {
    "eyebrow": "Instagram & TikTok growth services",
    "title": {
      "lead": "Buy",
      "highlight": "Instagram & TikTok",
      "tail": "Followers, Likes and Views"
    },
    "subtitle": "Pick a platform and a service, add your public username or post link, and check out in USD. No password, orders start within 6–8 hours, and every order includes a 6-month refill.",
    "tabs": {
      "instagram": {
        "label": "Instagram",
        "cards": [
          {
            "slug": "buy-instagram-followers",
            "title": "Followers",
            "line": "Grow your profile",
            "icon": "user-plus"
          },
          {
            "slug": "buy-instagram-likes",
            "title": "Likes",
            "line": "For posts and Reels",
            "icon": "heart"
          },
          {
            "slug": "buy-instagram-views",
            "title": "Views",
            "line": "For Reels and videos",
            "icon": "eye"
          },
          {
            "slug": "buy-instagram-comments",
            "title": "Comments",
            "line": "Start the conversation",
            "icon": "message-circle"
          }
        ]
      },
      "tiktok": {
        "label": "TikTok",
        "cards": [
          {
            "slug": "buy-tiktok-followers",
            "title": "Followers",
            "line": "Grow your profile",
            "icon": "user-plus"
          },
          {
            "slug": "buy-tiktok-likes",
            "title": "Likes",
            "line": "For one video",
            "icon": "heart"
          },
          {
            "slug": "buy-tiktok-views",
            "title": "Views",
            "line": "For one video",
            "icon": "eye"
          }
        ]
      },
      "facebook": {
        "label": "Facebook",
        "cards": [
          {
            "slug": "buy-facebook-followers",
            "title": "Followers",
            "line": "For Pages and profiles",
            "icon": "user-plus"
          },
          {
            "slug": "buy-facebook-page-likes",
            "title": "Page Likes",
            "line": "For Pages with a like count",
            "icon": "thumbs-up"
          },
          {
            "slug": "buy-facebook-post-likes",
            "title": "Post Likes",
            "line": "For one public post",
            "icon": "heart"
          }
        ]
      }
    },
    "cardPrice": "From {fromPrice}",
    "trust": [
      "No password needed",
      "Starts in 6–8 hours",
      "6-month refill",
      "24/7 WhatsApp support",
      "Prices in USD"
    ]
  },
  "marquee": [
    "No password, ever",
    "Orders start in 6–8 hours",
    "6-month refill on every order",
    "24/7 WhatsApp support",
    "Prices in USD",
    "Track every order",
    "Gradual delivery on request",
    "Secure card checkout"
  ],
  "statement": {
    "id": "services",
    "title": {
      "lead": "NovaLikes",
      "highlight": "Services"
    },
    "body": "NovaLikes sells followers, likes, views and comments for Instagram and TikTok, plus a few Facebook services. You pick a package, paste a public username or link, and pay in US dollars. We never ask for your password, most orders start within 6–8 hours, and every order comes with a 6-month refill."
  },
  "stories": [
    {
      "id": "profile-numbers",
      "title": {
        "lead": "Why the Numbers on Your",
        "highlight": "Profile Matter"
      },
      "body": "When someone finds your profile or a post for the first time, they decide quickly whether to stay. The follower count and the likes under a post are some of the first things they see, long before they read a caption.",
      "callout": "Low numbers can make good content look ignored, even when it isn’t. That is the gap a package is meant to close.",
      "visual": "profile"
    },
    {
      "id": "stronger-start",
      "title": {
        "lead": "Give Your Best Content a",
        "highlight": "Stronger Start"
      },
      "body": "A package changes the number people see first, so a new account, a launch or your best Reel doesn’t start from zero. What happens next still depends on the content itself: Instagram and TikTok decide what to recommend from how people watch and interact.",
      "callout": "Use a package to support content you are already proud of, not to replace it.",
      "visual": "growth"
    }
  ],
  "services": [
    {
      "slug": "buy-instagram-followers",
      "platform": "instagram",
      "metric": "followers",
      "title": {
        "lead": "Buy",
        "highlight": "Instagram Followers"
      },
      "intro": "Grow the follower count on a public Instagram account, the first number people check when they land on your profile.",
      "bullets": [
        "Public username only, never your password",
        "Switch back to private once delivery is done",
        "Gradual delivery for a steadier climb",
        "Track progress with your order ID"
      ],
      "cta": "Buy Instagram Followers",
      "why": {
        "q": "Why do Instagram followers matter?",
        "a": "Your follower count sits at the top of your profile, next to your name. New visitors use it, together with your posts, to judge whether an account is active and worth following. A very low count next to good content can make a new or rebranded account look abandoned. Followers do not make Instagram show your posts to more people on their own, though: reach still depends on how people respond to each post."
      },
      "how": {
        "q": "What do you need to order Instagram followers?",
        "a": "Only your public Instagram username. Keep the account public and the username unchanged until delivery, and any refill, is complete. Choose a package that looks natural next to your current followers and the engagement your posts get."
      }
    },
    {
      "slug": "buy-instagram-likes",
      "platform": "instagram",
      "metric": "likes",
      "title": {
        "lead": "Buy",
        "highlight": "Instagram Likes"
      },
      "intro": "Add likes to a public photo, carousel or Reel. Likes sit right under the post, so they are the quickest signal a new viewer sees.",
      "bullets": [
        "Photos, carousels and Reels",
        "One post per order, paste its link",
        "Made for launches, offers and pinned posts",
        "Pick a size that fits the post’s reach"
      ],
      "cta": "Buy Instagram Likes",
      "why": {
        "q": "Why do Instagram likes matter?",
        "a": "Likes are the first reaction people see under a post, before they read the caption or the comments. A post with a healthy like count looks like something other people already enjoyed, which makes new viewers more likely to stop on it. Likes apply to one post only, so they suit the posts you are pointing people to: a launch, an offer, a collab or your pinned content."
      },
      "how": {
        "q": "What do you need to order Instagram likes?",
        "a": "The public link to one post or Reel. Each order applies to that post only. If you want likes on several posts, place a separate order for each link."
      }
    },
    {
      "slug": "buy-instagram-views",
      "platform": "instagram",
      "metric": "views",
      "title": {
        "lead": "Buy",
        "highlight": "Instagram Views"
      },
      "intro": "Raise the view count on a public Reel or video, so a new upload looks worth watching when you share the link.",
      "bullets": [
        "Reels and video posts",
        "Paste one Reel link, no password",
        "Bigger packages cut the price per 1,000",
        "Pair with likes so the numbers look natural"
      ],
      "cta": "Buy Instagram Views",
      "why": {
        "q": "Why do Instagram views matter?",
        "a": "Instagram shows the view count on Reels, and people often glance at it before deciding whether to watch. A new Reel with very few views can look ignored, even when it is good. Views change the count on that video only. Likes, comments and follows still depend on how people respond to the content."
      },
      "how": {
        "q": "What do you need to order Instagram views?",
        "a": "The public link to the Reel or video. Keep it public until delivery is complete, and ask for gradual delivery if you want a steadier pace."
      }
    },
    {
      "slug": "buy-instagram-comments",
      "platform": "instagram",
      "metric": "comments",
      "title": {
        "lead": "Buy",
        "highlight": "Instagram Comments"
      },
      "intro": "Add comments to a public post or Reel, so it looks active and gives other people a reason to join the conversation.",
      "bullets": [
        "High Quality or Premium comments",
        "Send your own comments, one per line",
        "Ask for a language, such as Spanish",
        "Paste the post link, no login"
      ],
      "cta": "Buy Instagram Comments",
      "why": {
        "q": "Why do Instagram comments matter?",
        "a": "Comments show that people did more than scroll past: they stopped to say something. A post with a few comments under it invites others to reply, while an empty comment section can make even a popular post feel quiet. Premium comments are written around what your post is actually about, so they read naturally."
      },
      "how": {
        "q": "What do you need to order Instagram comments?",
        "a": "The public link to the post or Reel. Choose High Quality or Premium on the service page, and paste your own comments, or ask for another language, in the checkout note."
      }
    },
    {
      "slug": "buy-tiktok-followers",
      "platform": "tiktok",
      "metric": "followers",
      "title": {
        "lead": "Buy",
        "highlight": "TikTok Followers"
      },
      "intro": "Grow the follower count on a public TikTok account. New viewers check it on your profile before they decide whether to follow.",
      "bullets": [
        "Username without the @, no password",
        "Switch back to private once delivery is done",
        "Gradual delivery on request",
        "Not a way into Creator Rewards"
      ],
      "cta": "Buy TikTok Followers",
      "why": {
        "q": "Why do TikTok followers matter?",
        "a": "On TikTok, people often discover you through one video and then tap through to your profile. The follower count is one of the first things they see there. A profile with very few followers next to good videos can look brand new or inactive. Followers do not decide what TikTok recommends: the For You feed is based on how people watch and interact with each video."
      },
      "how": {
        "q": "What do you need to order TikTok followers?",
        "a": "Your public TikTok username. Keep the account public and the username unchanged until delivery, and any refill, is complete."
      }
    },
    {
      "slug": "buy-tiktok-likes",
      "platform": "tiktok",
      "metric": "likes",
      "title": {
        "lead": "Buy",
        "highlight": "TikTok Likes"
      },
      "intro": "Add likes to one public TikTok video, such as a product launch, a collab or your best clip.",
      "bullets": [
        "One public video per order",
        "Paste the video link, no login",
        "Keep likes in line with the video’s views",
        "Made for pinned clips, launches and collabs"
      ],
      "cta": "Buy TikTok Likes",
      "why": {
        "q": "Why do TikTok likes matter?",
        "a": "The heart count sits on the right of every TikTok video, so viewers see it while the video plays. A video you are sharing outside TikTok or pinning to your profile looks stronger when the likes match the views. Likes apply to that one video only."
      },
      "how": {
        "q": "What do you need to order TikTok likes?",
        "a": "The public video link. The likes apply to that video only. For several videos, place one order per link."
      }
    },
    {
      "slug": "buy-tiktok-views",
      "platform": "tiktok",
      "metric": "views",
      "title": {
        "lead": "Buy",
        "highlight": "TikTok Views"
      },
      "intro": "Raise the view count on a public TikTok video. A low count can make a good video look ignored, especially on new uploads.",
      "bullets": [
        "High Quality or Premium views",
        "Paste one video link, no login",
        "High Quality has the lowest price per 1,000",
        "Views do not earn Creator Rewards money"
      ],
      "cta": "Buy TikTok Views",
      "why": {
        "q": "Why do TikTok views matter?",
        "a": "TikTok shows the view count on your profile grid, under every video. A grid of low counts can make an account look inactive to someone deciding whether to follow. Views do not put a video on the For You feed: TikTok decides that from how people watch and interact with it."
      },
      "how": {
        "q": "What do you need to order TikTok views?",
        "a": "The public video link. Choose High Quality or Premium views on the service page, and keep the video public until delivery is complete."
      }
    }
  ],
  "why": {
    "id": "why-novalikes",
    "title": {
      "lead": "Why",
      "highlight": "NovaLikes?"
    },
    "intro": "Plenty of sites sell followers and likes. Here is what you can expect from us.",
    "items": [
      {
        "title": "Straight answers before you buy",
        "body": "Every service page says exactly what a package changes and what it does not. We tell you when a different service fits better, such as Facebook Followers instead of Page Likes, and our free Learn Center explains how each platform counts followers, likes and views.",
        "icon": "badge-check"
      },
      {
        "title": "A real company you can reach",
        "body": "NovaLikes is operated by THE HOUSE OF VEYNOR LTD, a company registered in England and Wales (No. 17561169). The team has handled social media orders for 7–8 years, first as ViralMe and now as NovaLikes, and you can message us on WhatsApp (+44 7454 758272) at any hour.",
        "icon": "building"
      }
    ]
  },
  "promises": {
    "id": "our-promises",
    "title": {
      "lead": "Our",
      "highlight": "Promises"
    },
    "intro": "The same four promises apply to every Instagram, TikTok and Facebook order.",
    "items": [
      {
        "key": "password",
        "title": "No password, ever",
        "body": "We only need a public username or link. Anyone who asks for your login, on any site, is not someone to trust with your account.",
        "icon": "shield",
        "chip": "Public link only"
      },
      {
        "key": "speed",
        "title": "Starts in 6–8 hours",
        "body": "Most orders start within 6–8 hours of payment and finish 4–6 hours after starting. If you prefer a slower, steadier pace, ask for gradual delivery in the checkout note.",
        "icon": "clock",
        "chip": "6–8 hours"
      },
      {
        "key": "refill",
        "title": "6-month refill",
        "body": "If the count drops within 6 months of delivery, send your order ID on WhatsApp and we top it back up. Keep the profile or post public while the refill runs.",
        "icon": "refresh-cw",
        "chip": "6 months"
      },
      {
        "key": "support",
        "title": "24/7 WhatsApp support",
        "body": "Message +44 7454 758272 before or after you order. You can also track any order on the Track Order page, or in your free customer dashboard.",
        "icon": "message-circle",
        "chip": "24/7"
      }
    ]
  },
  "faq": {
    "id": "before-you-buy",
    "title": {
      "lead": "Before",
      "highlight": "You Buy"
    },
    "intro": "The questions people ask most before their first order.",
    "items": [
      {
        "question": "Which service should I start with?",
        "answer": "Start with the number visitors see first. For a profile that looks empty, that is followers. For one post or video you are promoting, it is likes or views on that post."
      },
      {
        "question": "Do you need my Instagram or TikTok password?",
        "answer": "No. Followers need your public username, and likes, views and comments need the public post or video link. Never share your password with any growth service."
      },
      {
        "question": "Does my account need to be public?",
        "answer": "Yes, while the order is being delivered. A private account or a private post can stop delivery. You can make it private again once delivery is complete."
      },
      {
        "question": "How quickly will my order start?",
        "answer": "Most orders start within 6–8 hours after payment is confirmed, and standard delivery usually finishes 4–6 hours after it starts. Ask for gradual delivery in the checkout note or on WhatsApp if you prefer a slower pace."
      },
      {
        "question": "What happens if the numbers drop?",
        "answer": "Every order includes a 6-month refill from the delivery date. Message us on WhatsApp (+44 7454 758272) with your order ID and we top it back up."
      },
      {
        "question": "Can buying followers, likes or views affect my account?",
        "answer": "Instagram and TikTok rules do not allow buying engagement, and both platforms can remove activity they treat as inauthentic. NovaLikes never asks for your password, but no service can control how a platform treats an account. Read the platform rules before you order."
      }
    ]
  },
  "getStarted": {
    "id": "get-started",
    "title": {
      "lead": "Get Started",
      "highlight": "Now"
    },
    "body": "Choose a platform below. Every service page shows the packages, the price in US dollars and exactly what you need to place an order.",
    "tools": {
      "title": "Free tools",
      "links": [
        {
          "label": "Instagram Follower Counter",
          "href": "/tools/instagram-follower-counter"
        },
        {
          "label": "Instagram Profile Viewer",
          "href": "/tools/instagram-profile-viewer"
        },
        {
          "label": "Instagram Profile Picture Viewer",
          "href": "/tools/instagram-profile-picture-viewer"
        },
        {
          "label": "TikTok Video Downloader",
          "href": "/tools/tiktok-video-downloader"
        },
        {
          "label": "Facebook Video Downloader",
          "href": "/tools/facebook-video-downloader"
        }
      ]
    },
    "guides": {
      "title": "Free guides",
      "links": [
        {
          "label": "How to Grow Instagram Followers Organically",
          "href": "/learn/how-to-grow-instagram-followers-organically"
        },
        {
          "label": "How the Instagram Algorithm Works",
          "href": "/learn/how-instagram-algorithm-works"
        },
        {
          "label": "How to Get More Views on TikTok",
          "href": "/learn/how-to-get-more-views-on-tiktok"
        },
        {
          "label": "How to Get Your First 1,000 TikTok Followers",
          "href": "/learn/how-to-get-1000-tiktok-followers"
        }
      ],
      "cta": {
        "label": "All guides",
        "href": "/learn"
      }
    }
  },
  "stickyCta": {
    "label": "Choose a Service",
    "href": "#homepage-hero"
  }
} as const;

/** Root English homepage metadata (route "/"). Same as v4. */
export const ROOT_HOMEPAGE_METADATA_V5 = {
  "title": "Buy Instagram & TikTok Followers, Likes & Views | NovaLikes",
  "description": "Buy Instagram and TikTok followers, likes and views in USD. No password needed, orders start within 6–8 hours, and every order has a 6-month refill."
} as const;
