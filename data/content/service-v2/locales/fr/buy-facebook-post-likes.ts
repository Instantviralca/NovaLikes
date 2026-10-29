import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-facebook-post-likes. Primary keyword: "acheter des likes pour publication facebook". Do not edit wording without the content owner. */
export const FR_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Likes pour publication Facebook',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des likes pour publication facebook',
      secondary: [
        'acheter des likes pour post facebook',
        'acheter des réactions facebook',
        'prix likes publication facebook',
        'likes pour une publication facebook',
      ],
      questions: [
        'puis-je choisir j’adore ou d’autres réactions',
        'la publication doit-elle être publique',
        'combien coûtent les likes de publication',
        'est-ce sûr d’acheter des likes facebook',
        'peut-on répartir les likes',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'likes pour publication Facebook',
      tail: 'qui donnent du poids à votre meilleure publication',
    },
    subtitle: 'Un événement, une offre ou une grande nouvelle méritent plus que deux ou trois réactions. Donnez à une publication publique la réponse qu’elle mérite. Dès {fromPrice}, aussi avec « J’adore » et d’autres réactions sur demande.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des likes pour publication Facebook',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} likes pour publication Facebook',
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
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Pourquoi choisir NovaLikes pour vos',
      highlight: 'likes pour publication Facebook ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, sans accès administrateur',
        body: 'Il nous faut seulement le lien public de la publication. Pas de mot de passe, pas de rôle d’administrateur, pas d’accès à votre compte.',
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
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: '« J’adore » et autres réactions',
        body: 'Par défaut, vous recevez des « J’aime ». Vous préférez « J’adore » ou une autre réaction ? Indiquez-le dans la note de commande avant le démarrage.',
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
      highlight: 'likes pour publication Facebook',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement le lien d’une publication publique.',
    items: [
      {
        ui: 'public',
        title: 'Mettez la publication en Public',
        body: 'Cherchez l’icône du globe à côté de la date. Les publications réservées aux amis ou à une liste personnalisée ne peuvent pas recevoir de commande.',
      },
      {
        ui: 'packages',
        title: 'Choisissez un forfait',
        body: 'Choisissez une quantité parmi les forfaits ci-dessus. Chaque forfait affiche son prix avant que vous décidiez.',
      },
      {
        ui: 'cart',
        title: 'Ajoutez-le au panier',
        body: 'Cliquez sur « Ajouter au panier » et passez au paiement.',
      },
      {
        ui: 'username',
        title: 'Collez le lien de la publication',
        body: 'Ouvrez la publication, touchez « Partager » puis « Copier le lien », et collez-le au paiement. Indiquez la réaction dans la note si ce n’est pas « J’aime ».',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 500,
      unit: 'likes',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Amis uniquement',
      sub: 'Désactivé pour la mettre en Public',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'likes pour publication Facebook',
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
    title: 'Refill et garantie de remboursement pour vos likes pour publication Facebook',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez la publication en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'likes pour publication Facebook ?',
    },
    intro: 'Les likes de publication commencent à {fromPrice} les 100, et le prix par like baisse à mesure que le forfait grandit. Chaque prix est un paiement unique en dollars américains pour une publication.',
    points: [
      'Le refill de 6 mois est inclus. Rien à ajouter.',
      'Prix en dollars américains. Votre banque convertit dans votre devise et certaines cartes facturent des frais de change.',
      'Pas d’abonnement ni de renouvellement. Vous payez une fois par commande.',
    ],
    cols: [
      'Forfait',
      'Prix',
      'Pour 1 000',
    ],
    best: 'Meilleur tarif',
    note: 'Les prix viennent de nos forfaits actuels. Le prix affiché au paiement est celui que vous payez.',
  },
  whyBuy: {
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'likes pour publication Facebook ?',
    },
    intro: 'Sur Facebook, les réactions sont le signe le plus rapide qu’une publication compte. Peu de réactions sur une annonce importante la font paraître ignorée, même si elle a beaucoup plu en vrai.',
    items: [
      {
        title: 'Des événements qui paraissent fréquentés',
        body: 'Soirées quiz, portes ouvertes et actions caritatives attirent davantage avec beaucoup de réactions.',
      },
      {
        title: 'Des offres qui se remarquent',
        body: 'Les publications promotionnelles avec un bon chiffre méritent un second regard.',
      },
      {
        title: 'De grandes nouvelles bien fêtées',
        body: 'Ouvertures, anniversaires et récompenses méritent une réponse à la hauteur.',
      },
    ],
    diagram: [
      'Fréquenté',
      'Offre visible',
      'Bien fêté',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'likes pour publication Facebook ?',
    },
    intro: 'Les likes de publication changent les réactions d’une publication publique. Voici ce qu’ils font et ce qu’ils ne font pas.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les abonnés ou les likes de Page',
        'Les commentaires ou les partages',
        'Le nombre de personnes à qui Facebook montrera vos prochaines publications',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les réactions de la publication choisie',
        'La popularité apparente de la publication',
        'La première impression des événements, offres et annonces',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration : likes pour publication Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'likes pour publication Facebook',
    },
    cards: [
      {
        title: 'Bars et salles',
        body: 'Bars, clubs et salles ajoutent des réactions aux soirées quiz, aux concerts et aux soirs de match.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Écoles, clubs et associations',
        body: 'Clubs sportifs, associations de parents et associations ajoutent des réactions aux actions caritatives et aux annonces.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Commerces de proximité',
        body: 'Boutiques et services ajoutent des réactions aux offres et aux inaugurations, parfois en « J’adore » plutôt qu’en « J’aime ».',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la publication, la commande fonctionne de la même façon : un lien public, le forfait et la réaction choisis, et des likes qui démarrent en général sous 6 à 8 heures. Sans connexion.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Likes de publication ou',
      highlight: 'abonnés et likes de Page',
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
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publication',
        changes: 'Les réactions d’une publication publique',
        needs: 'Un lien vers la publication',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Abonnés',
        changes: 'Les abonnés d’une Page ou d’un profil',
        needs: 'Un lien vers la Page ou le profil',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Page',
        changes: 'Les likes d’une Page au format classique',
        needs: 'Un lien vers la Page',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'likes pour publication Facebook ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Standards de la communauté Facebook interdisent les comportements non authentiques, et Meta supprime régulièrement les comptes faux ou inactifs. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. Des réactions proportionnées à la publication paraissent plus naturelles.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de la publication : personne ne se connecte et aucun droit d’administrateur n’est nécessaire. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
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
      highlight: 'likes pour publication Facebook',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'La publication est publique',
        body: 'Cherchez l’icône du globe. Les autres audiences empêchent la livraison.',
      },
      {
        title: 'Le lien est celui de la publication',
        body: 'Copiez-le depuis « Partager » sur la publication, pas le lien de votre Page.',
      },
      {
        title: 'Vous avez choisi la réaction',
        body: '« J’aime » est l’option par défaut. Pour « J’adore » ou une autre, indiquez-le dans la note avant le démarrage.',
      },
      {
        title: 'La publication reste en ligne',
        body: 'Ne la supprimez pas pendant la livraison ni pendant les 6 mois de refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les likes pour publication Facebook',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-fb-post-likes-v2-1',
        question: 'Puis-je recevoir des « J’adore » au lieu de « J’aime » ?',
        answer: 'Oui. Indiquez la réaction souhaitée dans la note de commande avant le démarrage, ou envoyez-la-nous sur WhatsApp.',
      },
      {
        id: 'fr-fb-post-likes-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-fb-post-likes-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les likes pour publication Facebook changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Acheter des abonnés Facebook',
        line: 'Pour Pages et profils publics',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Acheter des likes pour Page Facebook',
        line: 'Pour les Pages qui affichent des likes',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Acheter des likes Instagram',
        line: 'Pour publications, carrousels et Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
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
