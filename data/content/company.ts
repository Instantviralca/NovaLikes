import { routes } from '@/config/routes';
import { resolveCta } from '@/data/content/cta';
import type {
  AboutPageContent,
  CompanyPageContent,
  ContactPageContent,
  FaqPageContent,
} from '@/types/content';

/**
 * About Us — Document 13.01 production content.
 * Do not invent awards, certifications, partnerships, customer counts, or guarantees.
 */
export const aboutContent: AboutPageContent = {
  id: 'about',
  path: routes.about,
  seo: {
    title: 'About NovaLikes | Social Media Growth Platform',
    description:
      'Learn about NovaLikes, our mission, why customers choose us, and our commitment to secure, transparent social media growth services.',
  },
  hero: {
    eyebrow: 'OUR STORY',
    title: 'About NovaLikes',
    description:
      'NovaLikes is a premium social media growth platform built to help creators, businesses, and brands grow with high-quality social signals.\n\nWe focus on a clear ordering experience, secure checkout, and reliable delivery across Instagram, TikTok, Facebook, and more.',
    purpose: 'Introduce NovaLikes as a trusted social media growth provider',
    primaryKeyword: 'About NovaLikes',
    trustLabels: [
      {
        id: 'about-hero-quality',
        label: 'Clear packages, password-free ordering, and published policies.',
      },
      {
        id: 'about-hero-delivery',
        label: 'Secure checkout and order tracking for placed purchases.',
      },
      {
        id: 'about-hero-support',
        label: 'Customer support for package, order, and payment questions.',
      },
    ],
    visual: {
      src: '/assets/images/illustrations/about/about-hero.webp',
      alt: 'NovaLikes dashboard representing Instagram, TikTok and Facebook services',
      width: 1536,
      height: 1024,
    },
  },
  story: {
    id: 'our-story',
    title: 'Our Story',
    description: 'A clearer way to buy social media growth services.',
    purpose: 'Share company journey without unverifiable historical claims',
    body: 'NovaLikes was built to make social media growth services easier to understand and order. Creators, businesses, agencies, and brands often need a straightforward way to compare packages, submit the required public URL, complete secure checkout, and track progress — without sharing account passwords.\n\nWe focus on transparency in how packages are presented, clarity in what is required to place an order, and continuous improvement of the ordering experience.',
  },
  mission: {
    id: 'our-mission',
    title: 'Helping You Grow. The Right Way.',
    description:
      'Our mission is to help you boost your social media presence safely and effectively — with clear packages, password-free ordering, and support when you need it.\n\nWe believe growth should feel simple: choose a service, pick a package, provide a public URL, and track your order with confidence.',
    purpose: 'Communicate the NovaLikes mission',
    items: [],
  },
  whyChoose: {
    id: 'why-thousands-choose-us',
    title: 'Why Thousands Choose Us',
    description: 'WHY CHOOSE NOVALIKES?',
    purpose: 'Highlight the main reasons customers choose NovaLikes',
    items: [
      {
        id: 'about-why-safe',
        title: 'Safe & Secure',
        description: 'Encrypted checkout and password-free ordering keep your accounts protected.',
      },
      {
        id: 'about-why-fast',
        title: 'Clear Package Pricing',
        description: 'Compare quantities and prices before checkout so you know which package you are choosing.',
      },
      {
        id: 'about-why-quality',
        title: 'Platform-Specific Services',
        description: 'Packages are listed by Instagram, TikTok, and Facebook metric rather than as a generic growth mix.',
      },
      {
        id: 'about-why-support',
        title: 'Customer Support',
        description: 'Contact NovaLikes with package, order, or payment questions using the available support options.',
      },
      {
        id: 'about-why-refund',
        title: '30-Day Money-Back Guarantee',
        description:
          'Eligible purchases are covered by our 30-Day Money-Back Guarantee under the published Refund Policy.',
      },
    ],
  },
  platforms: {
    id: 'platforms-we-support',
    title: 'Platforms We Support',
    description:
      'Browse growth services across the platforms NovaLikes currently supports.',
    purpose: 'Link to platforms from the Service Registry',
    platformIds: ['instagram', 'tiktok', 'facebook', 'youtube'],
  },
  process: {
    id: 'our-process',
    title: 'Our Process',
    description: 'A simple path from service selection to order tracking.',
    purpose: 'Explain the five-step ordering process',
    steps: [
      {
        id: 'about-process-1',
        title: 'Choose a Service',
        description: 'Select the platform and growth service that fits your goals.',
      },
      {
        id: 'about-process-2',
        title: 'Select a Package',
        description: 'Review real quantities, prices, and package details before you continue.',
      },
      {
        id: 'about-process-3',
        title: 'Submit Required URL',
        description: 'Provide the public profile, page, or content URL needed for fulfillment.',
      },
      {
        id: 'about-process-4',
        title: 'Secure Checkout',
        description: 'Enter your email, choose a payment method, accept the terms, and place the order.',
      },
      {
        id: 'about-process-5',
        title: 'Track Your Order',
        description: 'Use your order ID and checkout email on the Track Order page to view progress.',
      },
    ],
  },
  trust: {
    id: 'our-commitment',
    title: 'Built on Trust Delivered with Care',
    description:
      'We are committed to a customer experience that feels clear, secure, and dependable — from package selection to order tracking.',
    purpose: 'Reinforce trust and commitment',
    disclaimer: '',
    items: [
      {
        id: 'about-trust-payments',
        title: 'Secure Payments',
        description: 'Encrypted payment processing at checkout.',
      },
      {
        id: 'about-trust-privacy',
        title: 'Privacy Protected',
        description: 'Your data is handled according to our Privacy Policy.',
      },
      {
        id: 'about-trust-password',
        title: 'No Password Needed',
        description: 'Orders use public URLs only — never account passwords.',
      },
      {
        id: 'about-trust-global',
        title: 'Global Service',
        description: 'Available to customers ordering from around the world.',
      },
    ],
  },
  finalCta: {
    id: 'about-final-cta',
    title: 'Ready to grow your social media presence?',
    description:
      'Compare available Instagram, TikTok, and Facebook services, review package options, and place an order when you are ready.',
    purpose: 'Drive visitors to start ordering',
    primaryCta: {
      label: 'Get Started Now',
      href: routes.home,
    },
  },
};

/**
 * Contact Us — Document 13.02 production content.
 * Business address, phone, office hours, and social links come from configuration only.
 */
export const contactContent: ContactPageContent = {
  id: 'contact',
  path: routes.contact,
  seo: {
    title: 'Contact NovaLikes | Customer Support',
    description:
      'Contact NovaLikes for sales, support, order enquiries, and general questions. Reach our team through the official contact form and support channels.',
  },
  hero: {
    eyebrow: 'SUPPORT',
    title: 'Contact NovaLikes',
    description:
      'Have questions about our services or need help with an order? Contact NovaLikes support and include your order details when the question is about a purchase.',
    purpose: 'Help customers reach NovaLikes for sales and support',
    primaryKeyword: 'Contact NovaLikes',
    trustLabels: [
      { id: 'contact-hero-247', label: 'Customer Support — Help with services and orders' },
      { id: 'contact-hero-quick', label: 'Order Tracking — Check status after checkout' },
      { id: 'contact-hero-safe', label: 'No Password Required — Public details only' },
    ],
    visual: {
      src: '/assets/images/illustrations/contact/contact-hero.webp',
      alt: 'NovaLikes customer support illustration with chat and headphones',
      width: 1536,
      height: 1024,
    },
  },
  contactOptions: {
    id: 'contact-options',
    title: 'How Can We Help?',
    description:
      'Choose the topic that best matches your enquiry, then send a message through the form below.',
    purpose: 'Present contact option cards',
    items: [
      {
        id: 'contact-option-sales',
        title: 'Sales',
        description:
          'Questions about packages, pricing, or which service fits your goals before you place an order.',
      },
      {
        id: 'contact-option-support',
        title: 'Customer Support',
        description:
          'Help with account questions, delivery expectations, or using NovaLikes services.',
      },
      {
        id: 'contact-option-orders',
        title: 'Order Enquiries',
        description:
          'Updates or questions about an existing order. Include your order ID when you can.',
      },
      {
        id: 'contact-option-general',
        title: 'General Questions',
        description:
          'Other enquiries about NovaLikes, policies, or how our ordering process works.',
      },
    ],
  },
  form: {
    id: 'contact-form',
    title: 'Send Us a Message',
    description:
      'Fill out the form below and our team will get back to you as soon as possible.',
    purpose: 'Collect contact form submissions',
    fields: {
      fullNameLabel: 'Your Name',
      fullNamePlaceholder: 'Your Name',
      emailLabel: 'Your Email',
      emailPlaceholder: 'Your Email',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Subject',
      orderIdLabel: 'Order ID',
      orderIdPlaceholder: 'Optional — e.g. IV-1001',
      orderIdHelper: 'Optional. Include this if your message relates to an existing order.',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Your Message',
      submitLabel: 'Send Message',
      successTitle: 'Message sent',
      successDescription:
        'Thanks for contacting NovaLikes. We will follow up using the email address you provided.',
    },
  },
  business: {
    id: 'contact-information',
    title: 'Contact Information',
    description: 'Reach NovaLikes through the channels below.',
    purpose: 'Show contact channels beside the form',
    emptyMessage:
      'Additional contact details will appear here when they are added to site configuration.',
  },
  faqPreview: {
    id: 'contact-faq-preview',
    title: 'Quick Answers to Common Questions',
    description: 'FREQUENTLY ASKED QUESTIONS',
    purpose: 'Preview FAQ entries and link to the FAQ page',
    faqIds: [
      'faq-support',
      'faq-password',
      'faq-track-order',
      'faq-how-ordering-works',
      'faq-delivery-time',
      'faq-is-it-safe',
      'faq-refunds',
      'faq-need-help',
    ],
    viewAllCta: {
      label: 'View all FAQs',
      href: routes.faq,
    },
  },
  finalCta: {
    id: 'contact-final-cta',
    title: 'Still Need Help?',
    description:
      "Our friendly support team is always here for you. Don't hesitate to reach out anytime!",
    purpose: 'Encourage continued support contact',
    primaryCta: {
      label: 'Start Live Chat',
      href: '#contact-form',
    },
  },
};

/**
 * FAQ hub page chrome — Document 13.03.
 * Questions and answers remain in data/content/faq-hub.ts + faq.ts.
 */
export const faqPageContent: FaqPageContent = {
  id: 'faq',
  path: routes.faq,
  seo: {
    title: 'NovaLikes FAQ | Instagram, TikTok & Facebook Help',
    description:
      'Find answers about NovaLikes orders, Instagram, TikTok and Facebook services, account requirements, delivery, payments, tracking and support.',
  },
  hero: {
    eyebrow: 'HELP CENTER',
    title: 'Frequently Asked Questions',
    description:
      'Find clear answers about NovaLikes, Instagram, TikTok and Facebook services, placing an order, account requirements, delivery, payments and support. Browse by category or search for a specific question below.',
    purpose: 'Help customers find answers before contacting support',
    primaryKeyword: 'NovaLikes FAQ',
  },
  search: {
    label: 'Search questions',
    placeholder: 'Search questions...',
    clearLabel: 'Clear',
    emptyState:
      'No matching questions were found. Try another search or contact support.',
  },
  categoriesTitle: 'Categories',
  refundPolicyCta: {
    label: 'Read the Refund Policy',
    href: routes.refundPolicy,
  },
  finalCta: {
    id: 'faq-contact-support-cta',
    title: 'Still Have a Question?',
    description:
      "Can't find the answer you're looking for? Contact NovaLikes support for help with a service, order or payment question. If your question is about an existing order, have your order details ready so the support team can locate it more easily.",
    purpose: 'Offer contact and track-order exits',
    primaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
    secondaryCta: {
      label: 'Track Your Order',
      href: routes.trackOrder,
    },
  },
};

/** Company / support page content shells — placeholders until their production docs land. */
export const companyContent: Record<CompanyPageContent['id'], CompanyPageContent> = {
  about: {
    id: 'about',
    path: routes.about,
    hero: {
      title: aboutContent.hero.title,
      description: aboutContent.hero.description,
      purpose: aboutContent.hero.purpose,
      primaryKeyword: aboutContent.hero.primaryKeyword,
      primaryCta: aboutContent.hero.primaryCta,
      secondaryCta: aboutContent.hero.secondaryCta,
    },
    sections: [
      {
        id: aboutContent.story.id,
        title: aboutContent.story.title,
        description: aboutContent.story.description,
      },
      {
        id: aboutContent.mission.id,
        title: aboutContent.mission.title,
        description: aboutContent.mission.description,
      },
      {
        id: aboutContent.whyChoose.id,
        title: aboutContent.whyChoose.title,
        description: aboutContent.whyChoose.description,
      },
      {
        id: aboutContent.platforms.id,
        title: aboutContent.platforms.title,
        description: aboutContent.platforms.description,
      },
      {
        id: aboutContent.process.id,
        title: aboutContent.process.title,
        description: aboutContent.process.description,
      },
      {
        id: aboutContent.trust.id,
        title: aboutContent.trust.title,
        description: aboutContent.trust.description,
      },
    ],
    cta: aboutContent.finalCta.primaryCta,
  },
  reviews: {
    id: 'reviews',
    path: routes.reviews,
    hero: {
      title: 'Customer Reviews',
      description:
        'Read NovaLikes customer reviews from our published catalogue. Ratings reflect that catalogue.',
      purpose: 'Aggregate customer social proof',
      primaryKeyword: 'novalikes reviews',
    },
    sections: [
      {
        id: 'reviews-list',
        title: 'Customer reviews',
        description: 'All approved NovaLikes customer reviews.',
      },
    ],
    testimonialIds: [],
    cta: resolveCta('getStarted'),
  },
  contact: {
    id: 'contact',
    path: routes.contact,
    hero: {
      title: contactContent.hero.title,
      description: contactContent.hero.description,
      purpose: contactContent.hero.purpose,
      primaryKeyword: contactContent.hero.primaryKeyword,
      primaryCta: contactContent.hero.primaryCta,
      secondaryCta: contactContent.hero.secondaryCta,
    },
    sections: [
      {
        id: contactContent.contactOptions.id,
        title: contactContent.contactOptions.title,
        description: contactContent.contactOptions.description,
      },
      {
        id: contactContent.form.id,
        title: contactContent.form.title,
        description: contactContent.form.description,
      },
      {
        id: contactContent.business.id,
        title: contactContent.business.title,
        description: contactContent.business.description,
      },
      {
        id: contactContent.faqPreview.id,
        title: contactContent.faqPreview.title,
        description: contactContent.faqPreview.description,
      },
    ],
    faqIds: contactContent.faqPreview.faqIds,
    cta: contactContent.finalCta.primaryCta,
  },
  faq: {
    id: 'faq',
    path: routes.faq,
    hero: {
      title: faqPageContent.hero.title,
      description: faqPageContent.hero.description,
      purpose: faqPageContent.hero.purpose,
      primaryKeyword: faqPageContent.hero.primaryKeyword,
      primaryCta: faqPageContent.hero.primaryCta,
      secondaryCta: faqPageContent.hero.secondaryCta,
    },
    sections: [
      {
        id: 'faq-categories',
        title: faqPageContent.categoriesTitle,
        description: faqPageContent.search.placeholder,
      },
    ],
    faqIds: [],
    cta: faqPageContent.finalCta.primaryCta,
  },
};

export function getAboutContent(): AboutPageContent {
  return aboutContent;
}

export function getContactContent(): ContactPageContent {
  return contactContent;
}

export function getFaqPageContent(): FaqPageContent {
  return faqPageContent;
}

export function getCompanyContent(id: CompanyPageContent['id']): CompanyPageContent {
  return companyContent[id];
}
