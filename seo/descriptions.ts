import { site } from '@/config/site';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

function clampDescription(text: string, min = 140, max = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) {
    if (cleaned.length >= min) return cleaned;
    return cleaned;
  }
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Unique meta descriptions (templates until production copy exists).
 * Targets ~140–160 characters with primary keyword where applicable.
 */
export const descriptions = {
  home: () =>
    clampDescription(
      'NovaLikes helps you grow on Instagram, TikTok, Facebook, and YouTube with followers, likes, views, and engagement packages. Clear options, secure checkout.',
    ),

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return clampDescription(
        'Compare Instagram follower packages, pricing, delivery details and available plan sizes. Choose an option that matches your account and growth goals.',
      );
    }
    if (service.slug === 'buy-instagram-likes') {
      return clampDescription(
        'Buy Instagram likes through NovaLikes with clear package options, delivery details, secure checkout, order tracking, and a public post URL only.',
      );
    }
    if (service.slug === 'buy-instagram-views') {
      return clampDescription(
        'Buy Instagram views worldwide using real package options from NovaLikes.com, with no password required, clear delivery details, support, and secure checkout.',
      );
    }
    if (service.slug === 'buy-instagram-comments') {
      return clampDescription(
        'Buy Instagram comments worldwide with clear package options, a public post URL, secure checkout, delivery details and order tracking through NovaLikes.',
      );
    }
    if (service.slug === 'buy-tiktok-followers') {
      return clampDescription(
        'Buy TikTok followers worldwide using real package options from NovaLikes.com, with no password required, clear delivery details, 24/7 support, and eligible refill coverage.',
      );
    }
    if (service.slug === 'buy-tiktok-likes') {
      return clampDescription(
        'Buy TikTok likes with real packages for creators and businesses. Public video URL only, secure checkout, gradual delivery options, and order tracking.',
      );
    }
    if (service.slug === 'buy-tiktok-views') {
      return clampDescription(
        'Buy TikTok Views with real video views packages. Public video URL only, secure checkout, gradual delivery and order tracking for creators and businesses.',
      );
    }
    if (service.slug === 'buy-facebook-followers') {
      return clampDescription(
        'Buy Facebook Followers with clear package options, public page URL checkout, gradual delivery details and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return clampDescription(
        'Buy Facebook page likes worldwide with NovaLikes.com packages. Public page URL only, clear delivery details, 24/7 support, secure checkout, and order tracking.',
      );
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return clampDescription(
        'Buy Facebook post likes worldwide with NovaLikes.com packages. Public post URL only, clear delivery details, 24/7 support, secure checkout, and order tracking.',
      );
    }
    if (service.slug === 'buy-youtube-subscribers') {
      return clampDescription(
        'Buy YouTube subscribers worldwide with clear package options, delivery information, secure checkout and order tracking using your public channel URL.',
      );
    }
    if (service.slug === 'buy-youtube-views') {
      return clampDescription(
        'Buy YouTube Views with clear package options, public video URL checkout, gradual delivery details and order tracking. No password required.',
      );
    }
    return clampDescription(
      `${service.name} from ${site.name}. Compare packages, review delivery details, and order securely with public profile or content details only.`,
    );
  },

  learnIndex: () =>
    clampDescription(
      `Learn social media growth strategies on ${site.name}. Practical guides for Instagram, TikTok, YouTube, and Facebook for creators and businesses.`,
    ),

  learnArticle: (article: LearnArticle) =>
    clampDescription(
      `${article.title} — practical NovaLikes Learn guide covering social media growth tactics, platform strategy, and safe ordering basics.`,
    ),

  about: () =>
    clampDescription(
      'Learn about NovaLikes, our mission, customer-first approach, secure ordering process, and commitment to transparent social media growth services.',
    ),

  reviews: () =>
    clampDescription(
      `Read ${site.name} reviews from creators and brands. Customer feedback and social proof for our Instagram, TikTok, YouTube, and Facebook services.`,
    ),

  contact: () =>
    clampDescription(
      'Contact NovaLikes for sales, support, order enquiries, and general questions. Reach our team through the official contact form and support channels.',
    ),

  faq: () =>
    clampDescription(
      'Find answers about NovaLikes services, real packages, delivery times, payments, refunds, refill eligibility, order tracking, and customer support.',
    ),

  privacyPolicy: () =>
    clampDescription(
      'Read how NovaLikes collects, uses, protects, retains, and shares personal information when customers browse the website, contact support, or place an order.',
    ),

  refundPolicy: () =>
    clampDescription(
      'Read the NovaLikes refund policy, including eligibility, cancellations, partial refunds, refill coverage, and customer responsibilities.',
    ),

  termsAndConditions: () =>
    clampDescription(
      'Read the Terms & Conditions governing the use of NovaLikes, website access, orders, payments, refunds, acceptable use, and customer responsibilities.',
    ),

  cookiePolicy: () =>
    clampDescription(
      'Learn how NovaLikes uses cookies, similar technologies, and cookie preferences to support website functionality, analytics, and customer experience.',
    ),

  disclaimer: () =>
    clampDescription(
      'Read the NovaLikes disclaimer covering third-party platform independence, service limitations, educational content, external links, and results.',
    ),
} as const;
