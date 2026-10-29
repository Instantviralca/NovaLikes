import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-instagram-comments. Primary keyword: "acheter des commentaires instagram". Do not edit wording without the content owner. */
export const FR_BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Commentaires Instagram',
    unit: 'commentaires',
    unitSingular: 'commentaire',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'acheter des commentaires instagram',
      secondary: [
        'acheter des commentaires personnalisés instagram',
        'commentaires instagram en français',
        'commentaires premium instagram',
        'prix commentaires instagram',
      ],
      questions: [
        'est-ce sûr d’acheter des commentaires instagram',
        'combien coûtent les commentaires',
        'puis-je écrire mes propres commentaires',
        'y a-t-il des commentaires en français',
        'high quality ou premium',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'commentaires Instagram',
      tail: 'pour lancer la conversation',
    },
    subtitle: 'Une publication commentée paraît vivante et invite les autres à participer. Choisissez des commentaires High Quality ou Premium écrits pour votre publication, dès {fromPrice}. Vous pouvez aussi envoyer vos propres textes, en français ou dans une autre langue.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des commentaires Instagram',
    intro: 'Choisissez un niveau et un forfait. Prix en USD.',
    summaryName: '{quantity} commentaires Instagram {tier}',
    save: 'Vous économisez',
    cta: 'Ajouter au panier',
    oneTime: 'Achat unique. Sans abonnement.',
    secure: 'Paiement sécurisé',
    methods: [
      'Carte',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sans mot de passe',
        body: 'Le lien suffit',
      },
      {
        icon: 'clock',
        title: 'Démarrage sous 6 à 8 h',
        body: 'Fin 4 à 6 h plus tard',
      },
      {
        icon: 'message-square',
        title: 'On vous aide',
        body: '24 h/24 sur WhatsApp',
      },
    ],
    tiers: [
      {
        label: 'High Quality',
        note: 'Des commentaires courts et positifs qui conviennent à presque toutes les publications.',
      },
      {
        label: 'Premium',
        note: 'Des commentaires écrits pour votre publication, depuis des comptes d’apparence plus réaliste.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Pourquoi choisir NovaLikes pour vos',
      highlight: 'commentaires Instagram ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, jamais votre mot de passe',
        body: 'Il nous faut seulement le lien public de la publication ou du Reel. Pas d’identifiants et aucune connexion à votre compte.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Des délais clairs, du début à la fin',
        body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Vous préférez un rythme plus lent ? Demandez une livraison progressive.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: 'Refill de 6 mois',
        body: 'Si les commentaires de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'Vos textes ou les nôtres',
        body: 'Envoyez vos propres commentaires dans la note de commande, un par ligne, ou laissez notre équipe les écrire. En français si vous le demandez.',
      },
    ],
    promo: {
      eyebrow: 'Vous hésitez sur le forfait ?',
      title: 'Posez-nous la question avant d’acheter',
      cta: 'Écrivez-nous sur WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Comment acheter des',
      highlight: 'commentaires Instagram',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes. Choisissez High Quality ou Premium, collez le lien d’une publication publique et envoyez vos textes si vous le souhaitez.',
    items: [
      {
        ui: 'public',
        title: 'Ouvrez les commentaires à tous',
        body: 'La publication doit être sur un compte public, avec des commentaires ouverts à tout le monde. Des limites comme « abonnés uniquement » empêchent le démarrage.',
      },
      {
        ui: 'packages',
        title: 'Choisissez un niveau et un forfait',
        body: 'Choisissez High Quality ou Premium, puis une quantité. Chaque forfait affiche son prix avant que vous décidiez.',
      },
      {
        ui: 'cart',
        title: 'Ajoutez-le au panier',
        body: 'Cliquez sur « Ajouter au panier » et passez au paiement.',
      },
      {
        ui: 'username',
        title: 'Collez le lien et vos textes',
        body: 'Collez le lien de la publication ou du Reel au paiement. Écrivez vos commentaires dans la note, un par ligne, ou laissez-nous faire.',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 25,
      unit: 'commentaires',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Commentaires limités',
      sub: 'Désactivé pour pouvoir commenter',
    },
    chips: [
      '10',
      '25',
      '50',
      '100',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'instagram.com/p/…',
    },
    safeChips: [
      'Le lien suffit',
      'Paiement sécurisé',
    ],
    privacyTags: [
      'lien',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Comment repérer un vendeur douteux de',
      highlight: 'commentaires Instagram',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien suffit',
        riskySeller: 'Demandent le mot de passe',
      },
      {
        label: 'Délais',
        novalikes: 'Démarrage sous 6 à 8 h',
        riskySeller: 'Aucun délai annoncé',
      },
      {
        label: 'Baisses',
        novalikes: 'Refill de 6 mois',
        riskySeller: 'Pas de refill',
      },
      {
        label: 'Remboursements',
        novalikes: 'Remboursement sous 30 jours*',
        riskySeller: 'Aucune politique écrite',
      },
      {
        label: 'Assistance',
        novalikes: 'WhatsApp 24 h/24',
        riskySeller: 'Difficiles à joindre',
      },
      {
        label: 'Prix',
        novalikes: 'En USD, affiché avant',
        riskySeller: 'Change au paiement',
      },
      {
        label: 'Suivi',
        novalikes: 'Page « Suivre la commande »',
        riskySeller: 'Impossible de vérifier',
      },
    ],
    note: '*Pour les commandes éligibles, selon notre politique de remboursement.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill et garantie de remboursement pour vos commentaires Instagram',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'Si les commentaires de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez la publication ou le Reel en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'commentaires Instagram ?',
    },
    intro: 'Les forfaits commencent à {fromPrice}. Les commentaires High Quality coûtent moins cher à l’unité et les Premium un peu plus, car chacun est écrit pour votre publication. Chaque prix est un paiement unique en dollars américains pour une publication ou un Reel.',
    points: [
      'Le refill de 6 mois est inclus. Rien à ajouter.',
      'Prix en dollars américains. Votre banque convertit dans votre devise et certaines cartes facturent des frais de change.',
      'Pas d’abonnement ni de renouvellement. Vous payez une fois par commande.',
    ],
    cols: [
      'Forfait',
      'Prix',
      'Par unité',
    ],
    best: 'Meilleur tarif',
    note: 'Les prix viennent de nos forfaits actuels. Le prix affiché au paiement est celui que vous payez.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'commentaires Instagram ?',
    },
    intro: 'Une section de commentaires vide donne un air éteint même à une bonne publication. Quelques commentaires pertinents montrent qu’on en parle et encouragent la personne suivante à se joindre à la discussion.',
    items: [
      {
        title: 'Des publications qui paraissent actives',
        body: 'Les commentaires sont le signe le plus clair que les gens s’intéressent à une publication.',
      },
      {
        title: 'Une première réponse plus facile',
        body: 'Personne n’aime commenter en premier. Quand la conversation a commencé, les visiteurs participent plus volontiers.',
      },
      {
        title: 'Votre message mis en avant',
        body: 'Avec vos propres textes, les commentaires soulignent un détail du produit, une question ou une réaction.',
      },
    ],
    diagram: [
      'Publication active',
      'Première réponse',
      'Votre message',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'commentaires Instagram ?',
    },
    intro: 'Les commentaires changent ce qui apparaît sous une publication. À eux seuls, ils n’apportent ni abonnés ni portée.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Vos abonnés, likes ou vues',
        'Le classement dans Explorer ou Reels à lui seul',
        'Des réponses spontanées qui font vivre la discussion',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'La section commentaires de la publication choisie',
        'L’air actif de la publication pour les nouveaux visiteurs',
        'Les points mis en avant, si vous envoyez vos textes',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Illustration : commentaires Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'commentaires Instagram',
    },
    cards: [
      {
        title: 'Créateurs',
        body: 'Les créateurs ajoutent des commentaires aux Reels et carrousels qui méritent plus d’échanges, souvent avec leurs propres textes.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Petites entreprises',
        body: 'Les entreprises les utilisent sur leurs publications produit et leurs offres, pour que questions et réactions apparaissent là où regardent les clients.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Marques et agences',
        body: 'Les marques et agences choisissent les commentaires Premium pour leurs campagnes, où chaque commentaire doit sonner naturel.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la publication, la commande fonctionne de la même façon : un lien public, le niveau choisi, vos textes si vous le souhaitez, et des commentaires qui démarrent en général sous 6 à 8 heures. Personne n’a besoin de vos identifiants.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Commentaires Instagram ou',
      highlight: 'likes, vues et abonnés',
    },
    intro: 'Chaque service change un chiffre différent. Choisissez celui qui correspond à ce que vous voulez montrer.',
    cols: [
      'Service',
      'Ce qui change',
      'Ce qu’il nous faut',
      'Dès',
    ],
    rows: [
      {
        slug: 'buy-instagram-comments',
        label: 'Commentaires',
        changes: 'Les commentaires d’une publication publique',
        needs: 'Un lien vers la publication',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Abonnés',
        changes: 'Le nombre d’abonnés de votre profil',
        needs: 'Votre @nom public',
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Les likes d’une publication ou d’un Reel',
        needs: 'Un lien vers la publication',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Vues',
        changes: 'Les vues d’un Reel ou d’une vidéo',
        needs: 'Un lien vers le Reel',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'commentaires Instagram ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté Instagram demandent de ne pas gonfler les interactions de façon artificielle, et ses filtres peuvent masquer des commentaires ou supprimer des comptes jugés faux. C’est pourquoi certains commentaires peuvent disparaître après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. Les commentaires Premium ou vos propres textes, en quantité raisonnable, paraissent plus naturels.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de la publication ou du Reel : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
      },
      {
        ui: 'pay',
        title: 'Sécurité du paiement',
        body: 'Vous payez une seule fois via un paiement sécurisé par carte, Apple Pay ou Google Pay, en dollars américains. Pas d’abonnement, rien ne se renouvelle.',
      },
      {
        ui: 'privacy',
        title: 'Confidentialité',
        body: 'Votre lien et votre e-mail servent uniquement à traiter la commande et à vous envoyer des notifications, comme l’explique notre [politique de confidentialité](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Avant d’acheter des',
      highlight: 'commentaires Instagram',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'Les commentaires sont ouverts',
        body: 'Vérifiez qu’ils sont activés et non limités à vos abonnés ou aux comptes que vous suivez.',
      },
      {
        title: 'Le lien est celui de la publication',
        body: 'Copiez le lien de la publication ou du Reel lui-même, pas celui de votre profil.',
      },
      {
        title: 'Vos textes sont prêts',
        body: 'Vous voulez vos propres commentaires ou des commentaires en français ? Indiquez-le dans la note avant le démarrage.',
      },
      {
        title: 'La publication reste en ligne',
        body: 'Ne la supprimez pas et ne l’archivez pas pendant la livraison ni pendant les 6 mois de refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les commentaires Instagram',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-ig-comments-v2-1',
        question: 'Puis-je recevoir des commentaires en français ?',
        answer: 'Oui. Écrivez « français » dans la note de commande ou envoyez vos propres commentaires en français, un par ligne, et nous les publierons tels quels.',
      },
      {
        id: 'fr-ig-comments-v2-2',
        question: 'Combien de commentaires Instagram devrais-je acheter ?',
        answer: 'Adaptez le nombre à la publication. De 10 à 25 commentaires conviennent à la plupart des publications de petits comptes. Une publication avec peu de likes et des dizaines de commentaires peut paraître étrange.',
      },
      {
        id: 'fr-ig-comments-v2-3',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-ig-comments-v2-4',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services Instagram',
    intro: 'Les commentaires Instagram changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Acheter des likes Instagram',
        line: 'Pour publications, carrousels et Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Acheter des abonnés Instagram',
        line: 'Faites grandir votre profil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Acheter des vues Instagram',
        line: 'Plus de regards sur vos Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
    ],
    cardPrice: 'Dès {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Choisir un forfait',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
