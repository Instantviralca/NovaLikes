import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-facebook-followers. Primary keyword: "acheter des abonnés facebook". Do not edit wording without the content owner. */
export const FR_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Abonnés Facebook',
    unit: 'abonnés',
    unitSingular: 'abonné',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des abonnés facebook',
      secondary: [
        'acheter des abonnés pour page facebook',
        'forfaits abonnés facebook',
        'prix abonnés facebook',
        'faire grandir une page facebook',
      ],
      questions: [
        'est-ce sûr d’acheter des abonnés facebook',
        'combien coûtent les abonnés facebook',
        'faut-il un accès administrateur',
        'est-ce possible avec un profil personnel',
        'pourquoi les abonnés baissent',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'abonnés Facebook',
      tail: 'pour une Page qui inspire confiance',
    },
    subtitle: 'Beaucoup de gens consultent la Page Facebook d’une entreprise avant d’appeler, de réserver ou de passer. Obtenez un nombre d’abonnés qui rassure. Dès {fromPrice}, avec le seul lien de la Page.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des abonnés Facebook',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} abonnés Facebook',
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
      highlight: 'abonnés Facebook ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, sans accès administrateur',
        body: 'Il nous faut seulement le lien public de votre Page ou de votre profil. Pas de mot de passe, pas de rôle d’administrateur, pas d’accès à votre compte.',
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
        body: 'Si les abonnés de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'users',
        tone: 'pink',
        title: 'Pages et profils publics',
        body: 'Fonctionne avec les Pages Facebook et les profils personnels dont « Qui peut me suivre » est réglé sur Public. Sans accès administrateur.',
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
      highlight: 'abonnés Facebook',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement le lien public de votre Page ou de votre profil.',
    items: [
      {
        ui: 'public',
        title: 'Autorisez les abonnements',
        body: 'Gardez la Page publiée. Sur un profil personnel, réglez « Qui peut me suivre » sur Public dans « Abonnés et contenu public ».',
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
        title: 'Collez le lien de votre Page',
        body: 'Copiez le lien de votre Page ou de votre profil, par exemple facebook.com/votrepage, et collez-le au paiement.',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 1000,
      unit: 'abonnés',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Page non publiée',
      sub: 'Désactivé pour être trouvée',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'facebook.com/votrepage',
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
      highlight: 'abonnés Facebook',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien de la Page suffit',
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
    title: 'Refill et garantie de remboursement pour vos abonnés Facebook',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Si les abonnés de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Gardez la même URL de Page et une Page publique pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'abonnés Facebook ?',
    },
    intro: 'Les abonnés commencent à {fromPrice} les 100, et le prix pour 1 000 baisse à mesure que le forfait grandit. Chaque prix est un paiement unique en dollars américains pour une Page ou un profil.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'abonnés Facebook ?',
    },
    intro: 'Facebook reste l’endroit où beaucoup de gens vérifient les horaires, les nouveautés et les commerces du coin. Un bon nombre d’abonnés donne à votre Page un air actif au premier coup d’œil.',
    items: [
      {
        title: 'Une Page qui paraît ouverte',
        body: 'Une Page à 60 abonnés peut sembler abandonnée, même quand l’activité marche bien.',
      },
      {
        title: 'De la confiance avant le premier appel',
        body: 'Artisans, cliniques et salons sont vérifiés sur Facebook avant qu’on les contacte.',
      },
      {
        title: 'Un coup de pouce pour les nouvelles Pages',
        body: 'Nouvelles entreprises, deuxièmes adresses et changements de marque ne partent pas de zéro.',
      },
    ],
    diagram: [
      'Paraît ouverte',
      'Confiance',
      'Nouvelle Page',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'abonnés Facebook ?',
    },
    intro: 'Les abonnés changent le chiffre de votre Page ou de votre profil. À eux seuls, ils ne changent pas qui voit vos publications.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les réactions ou commentaires de vos publications',
        'Votre portée organique à elle seule',
        'Des demandes sans publications utiles ni coordonnées claires',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Le nombre d’abonnés de votre Page ou de votre profil',
        'L’air établi de la Page pour les nouveaux visiteurs',
        'La première impression avant un appel ou une réservation',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration : abonnés Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'abonnés Facebook',
    },
    cards: [
      {
        title: 'Artisans',
        body: 'Plombiers, électriciens et entrepreneurs ajoutent des abonnés pour que leur Page paraisse aussi fiable que leur travail.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Services de proximité',
        body: 'Cliniques, toiletteurs et auto-écoles font grandir leur Page avant une offre ou l’ouverture de nouveaux créneaux.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Associations et clubs',
        body: 'Clubs, marchés et associations ajoutent des abonnés pour que leur Page paraisse active aux nouveaux membres.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la Page, la commande fonctionne de la même façon : un lien public, un forfait adapté et des abonnés qui démarrent en général sous 6 à 8 heures. Ni accès administrateur ni mot de passe.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Abonnés Facebook ou',
      highlight: 'likes de Page et de publication',
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
        slug: 'buy-facebook-followers',
        label: 'Abonnés',
        changes: 'Les abonnés d’une Page ou d’un profil',
        needs: 'Un lien vers la Page ou le profil',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Page',
        changes: 'Les likes d’une Page au format classique',
        needs: 'Un lien vers la Page',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publication',
        changes: 'Les réactions d’une publication publique',
        needs: 'Un lien vers la publication',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'abonnés Facebook ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Standards de la communauté Facebook interdisent les comportements non authentiques, et Meta supprime régulièrement les comptes faux ou inactifs. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. La livraison progressive et des publications régulières gardent une croissance naturelle.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de votre Page ou de votre profil : personne ne se connecte et aucun droit d’administrateur n’est nécessaire. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
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
      highlight: 'abonnés Facebook',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'On peut s’abonner',
        body: 'La Page doit être publiée, ou le profil doit accepter les abonnés publics.',
      },
      {
        title: 'Le lien est le bon',
        body: 'Copiez le lien de la Page ou du profil, par exemple facebook.com/votrepage, pas celui d’une publication.',
      },
      {
        title: 'L’URL ne change pas',
        body: 'Gardez la même adresse pendant la livraison et les 6 mois de refill.',
      },
      {
        title: 'La taille est adaptée',
        body: 'Choisissez un forfait qui paraît naturel à côté de vos abonnés actuels et de ce que vous publiez.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les abonnés Facebook',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-fb-followers-v2-1',
        question: 'Avez-vous besoin d’un accès administrateur à ma Page ?',
        answer: 'Non. Il nous faut seulement le lien public. Ne donnez à personne un accès administrateur ou votre mot de passe Facebook pour obtenir des abonnés.',
      },
      {
        id: 'fr-fb-followers-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-fb-followers-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les abonnés Facebook changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Acheter des likes pour Page Facebook',
        line: 'Pour les Pages qui affichent des likes',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Acheter des likes pour publication Facebook',
        line: 'Des réactions sur une publication publique',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Acheter des abonnés Instagram',
        line: 'Faites grandir votre profil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
