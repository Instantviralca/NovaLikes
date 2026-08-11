/**
 * NovaLikes Brand Strategy — Document 07.5 (Merged v1).
 * Highest-level brand reference for design, SEO, content, copywriting, and development.
 * Do not invent marketing slogans beyond what the Brand Strategy states.
 */

import type { BrandConfig } from '@/types/brand';

export const brand: BrandConfig = {
  name: 'NovaLikes',
  legalName: 'NovaLikes',
  /** Derived from vision: educational-first growth platform — not a campaign slogan. */
  tagline: 'Trusted educational-first social media growth',

  mission:
    'Help creators and businesses grow through reliable, transparent services.',

  vision:
    'Become a trusted educational-first social media growth platform.',

  values: [
    {
      id: 'transparency',
      name: 'Transparency',
      description: 'Be clear about what we offer, how it works, and what to expect.',
    },
    {
      id: 'simplicity',
      name: 'Simplicity',
      description: 'Keep language, UX, and choices easy to understand.',
    },
    {
      id: 'trust',
      name: 'Trust',
      description: 'Earn confidence through honesty, consistency, and support.',
    },
    {
      id: 'customer-success',
      name: 'Customer Success',
      description: 'Prioritize outcomes and helpful guidance for every customer.',
    },
    {
      id: 'continuous-improvement',
      name: 'Continuous Improvement',
      description: 'Refine products, content, and experience over time.',
    },
  ],

  positioning: {
    summary:
      'Compete on trust, education, clarity, and UX rather than price or hype.',
    competeOn: ['trust', 'education', 'clarity', 'UX'],
    doNotCompeteOn: ['price', 'hype'],
  },

  brandPromise: {
    summary:
      'Reliable, transparent social media growth services with education and clarity first.',
    commitments: [
      'Explain before persuading',
      'Make honest claims only',
      'Keep ordering and policies clear',
      'Support customers with practical help',
    ],
  },

  audience: {
    summary:
      'Creators, small businesses, personal brands, agencies, and researchers.',
    segments: [
      { id: 'creators', label: 'Creators' },
      { id: 'small-businesses', label: 'Small businesses' },
      { id: 'personal-brands', label: 'Personal brands' },
      { id: 'agencies', label: 'Agencies' },
      { id: 'researchers', label: 'Researchers' },
    ],
    intents: ['commercial', 'informational', 'navigational'],
  },

  messagingPillars: [
    {
      id: 'what',
      question: 'What is it?',
      intent: 'Define the offering clearly before selling.',
    },
    {
      id: 'who',
      question: 'Who is it for?',
      intent: 'Identify the audience and use cases.',
    },
    {
      id: 'why-matters',
      question: 'Why it matters?',
      intent: 'Explain the practical value of the outcome.',
    },
    {
      id: 'why-novalikes',
      question: 'Why NovaLikes?',
      intent: 'Differentiate on trust, education, clarity, and UX.',
    },
    {
      id: 'what-next',
      question: 'What next?',
      intent: 'Guide the user to the next clear action.',
    },
  ],

  voice: {
    attributes: ['Professional', 'Calm', 'Helpful', 'Honest', 'Confident'],
    avoid: ['Hype', 'Clickbait', 'Unrealistic claims'],
    summary:
      'Professional, calm, helpful, honest, and confident. Avoid hype, clickbait, and unrealistic claims.',
  },

  tone: {
    attributes: [
      'Simple English',
      'Active voice',
      'Short paragraphs',
      'Practical advice',
      'Honest claims',
      'Explain before persuade',
    ],
    summary:
      'Simple, active, practical, and honest. Explain before persuading.',
  },

  vocabulary: {
    preferred: [
      'growth',
      'audience',
      'creators',
      'quality',
      'support',
      'secure',
    ],
    restricted: [
      'guaranteed',
      'hack',
      'fake',
      'bot',
      'magic',
      'explode',
      'cheap',
    ],
  },

  ctaLabels: {
    primary: 'Get Started',
    secondary: ['Learn More', 'Explore Services', 'Contact Us'],
  },

  trustPrinciples: {
    id: 'trust',
    principles: [
      'Show expertise through accurate explanations',
      'Be transparent about processes and policies',
      'Make support easy to find',
      'Use structured, factual content',
      'Never rely on hype or unverifiable promises',
    ],
  },

  eeatPrinciples: {
    id: 'eeat',
    principles: [
      'Demonstrate experience with clear process explanations',
      'Show expertise through accurate, educational content',
      'Build authoritativeness with consistent, policy-backed claims',
      'Earn trust through transparency and helpful support',
      'Avoid unverifiable claims',
    ],
  },

  aiSearchPrinciples: {
    id: 'ai-search',
    principles: [
      'Answer questions early',
      'Use descriptive headings',
      'Write concise summaries',
      'Prepare FAQ-ready answers',
      'Support structured data (JSON-LD)',
      'Keep claims factual',
    ],
  },

  homepageMessaging: {
    id: 'homepage',
    goals: [
      'Guide users to the right platform',
      'Reduce confusion',
      'Build trust',
      'Then invite action',
    ],
    principles: [
      'Lead with clarity, not hype',
      'Route by platform before deep service detail',
      'Use trust signals before hard conversion pressure',
      'Satisfy commercial and navigational intent',
    ],
  },

  servicePageMessaging: {
    id: 'service',
    goals: [
      'Explain the offer',
      'Build confidence',
      'Answer buying questions',
      'Convert with a clear CTA',
    ],
    sectionOrder: [
      'Hero',
      'Benefits',
      'Features',
      'Process',
      'Reviews',
      'FAQ',
      'Related Services',
      'CTA',
    ],
    principles: [
      'One primary commercial intent per page',
      'Explain before persuading',
      'Link related services and Learn content naturally',
    ],
  },

  learnHubMessaging: {
    id: 'learn',
    goals: [
      'Teach first',
      'Sell second',
      'Link naturally to related services',
    ],
    principles: [
      'Prioritize informational intent',
      'Use examples and clear conclusions',
      'Never force commercial CTAs over educational value',
    ],
  },

  readingLevel: {
    targetGrade: 8,
    description:
      'Aim for roughly grade 8 readability — clear, concrete, and jargon-light.',
  },

  governance: {
    authoritativeDocument: 'Document 07.5 — Brand Strategy (Merged v1)',
    consistencyRequired: true,
    note: 'All future content must follow this document. Consistency is mandatory.',
  },
};

export type { BrandConfig };
