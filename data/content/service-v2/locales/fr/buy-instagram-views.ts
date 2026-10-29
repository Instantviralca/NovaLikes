import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-instagram-views. Primary keyword: "acheter des vues instagram". Do not edit wording without the content owner. */
export const FR_BUY_INSTAGRAM_VIEWS_V2 = {
  meta: {
    slug: 'buy-instagram-views',
    platform: 'Instagram',
    name: 'Vues Instagram',
    unit: 'vues',
    unitSingular: 'vue',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des vues instagram',
      secondary: [
        'acheter des vues reels',
        'acheter des vues instagram reels',
        'forfaits vues instagram',
        'prix vues instagram',
      ],
      questions: [
        'est-ce sûr d’acheter des vues instagram',
        'combien coûtent les vues instagram',
        'les vues aident-elles à apparaître dans explorer',
        'les vues achetées baissent-elles',
        'comment sont comptées les vues des reels',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'vues Instagram',
      tail: 'pour mieux lancer vos Reels',
    },
    subtitle: 'Un Reel avec un bon nombre de vues donne envie d’être regardé. Donnez un coup de pouce aux nouveaux Reels, vidéos produit et tutoriels dès {fromPrice}, avec une livraison progressive si vous préférez.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des vues Instagram',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} vues Instagram',
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
      highlight: 'vues Instagram ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, jamais votre mot de passe',
        body: 'Il nous faut seulement le lien public du Reel ou de la vidéo. Pas d’identifiants et aucune connexion à votre compte.',
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
        body: 'Si les vues de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'play',
        tone: 'pink',
        title: 'Reels et vidéos',
        body: 'Commandez des vues pour n’importe quel Reel ou vidéo public. Chaque commande couvre une vidéo.',
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
      highlight: 'vues Instagram',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement le lien d’un Reel ou d’une vidéo publique.',
    items: [
      {
        ui: 'public',
        title: 'Laissez le Reel public',
        body: 'Le Reel ou la vidéo doit être sur un compte public jusqu’à la fin de la livraison. Ne le supprimez pas et ne l’archivez pas.',
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
        title: 'Collez le lien du Reel',
        body: 'Ouvrez le Reel, touchez « Partager », choisissez « Copier le lien » et collez-le au paiement. Il ressemble à instagram.com/reel/….',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 5000,
      unit: 'vues',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Compte privé',
      sub: 'Désactivé pour atteindre le Reel',
    },
    chips: [
      '2.5K',
      '5K',
      '10K',
      '25K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'instagram.com/reel/…',
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
      highlight: 'vues Instagram',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien du Reel suffit',
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
    title: 'Refill et garantie de remboursement pour vos vues Instagram',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/instagram-views/instagram-views-order-process.webp',
        body: 'Si les vues de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez le Reel ou la vidéo en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/instagram-views/instagram-views-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-views-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'vues Instagram ?',
    },
    intro: 'Les vues commencent à {fromPrice} les 500, et le prix pour 1 000 baisse nettement sur les grands forfaits. Chaque prix est un paiement unique en dollars américains pour un Reel ou une vidéo.',
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
    id: 'why-buy-instagram-views',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'vues Instagram ?',
    },
    intro: 'Un Reel avec quelques dizaines de vues peut donner l’impression que personne ne s’y est intéressé, même s’il est bon. Un forfait fait monter le chiffre visible pour que les nouveaux spectateurs lancent la lecture plus volontiers.',
    items: [
      {
        title: 'Des Reels qui donnent envie',
        body: 'On regarde plus volontiers un Reel qui a déjà des vues. Un chiffre plus élevé fait compter la première seconde.',
      },
      {
        title: 'Un bon départ pour les lancements',
        body: 'Vidéos produit, tutoriels et annonces paraissent établis dès le premier jour au lieu de rester à zéro.',
      },
      {
        title: 'Une preuve pour partenaires et clients',
        body: 'Un bon nombre de vues aide quand vous partagez des Reels avec des marques, des collaborateurs ou des clients.',
      },
    ],
    diagram: [
      'Donne envie',
      'Lancement',
      'Preuve sociale',
    ],
  },
  help: {
    id: 'does-buying-instagram-views-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'vues Instagram ?',
    },
    intro: 'Les vues changent le chiffre d’un Reel. Instagram continue de décider de la portée selon la réaction des spectateurs.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Le temps de visionnage, les partages ou les enregistrements à eux seuls',
        'Le classement dans Explorer ou Reels à lui seul',
        'Vos abonnés, likes ou commentaires',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les vues du Reel ou de la vidéo choisie',
        'L’attrait du Reel pour les nouveaux spectateurs',
        'La première impression des lancements et tutoriels',
      ],
      image: '/assets/images/illustrations/instagram-views/instagram-views-does-help.webp',
      altFallback: 'Illustration : vues Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'vues Instagram',
    },
    cards: [
      {
        title: 'Créateurs',
        body: 'Les créateurs ajoutent des vues aux nouveaux Reels et tutoriels pour qu’une vidéo tout juste publiée ne reste pas à zéro pendant que l’algorithme la teste.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-best-practices.webp',
      },
      {
        title: 'Petites entreprises',
        body: 'Les entreprises les utilisent sur des démos produit, des coulisses et des Reels promotionnels qu’elles partagent dans leurs publicités, leur bio et leurs messages.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        title: 'Marques et agences',
        body: 'Les marques et agences ajoutent des vues aux Reels de campagne et aux collaborations, souvent avec une livraison progressive.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-why-buy.webp',
      },
    ],
    statement: 'Quel que soit le Reel, la commande fonctionne de la même façon : un lien public, le forfait choisi et un chiffre qui commence en général à monter sous 6 à 8 heures. Personne n’a besoin de vos identifiants.',
  },
  vs: {
    id: 'instagram-views-vs-other-services',
    title: {
      lead: 'Vues Instagram ou',
      highlight: 'likes, abonnés et commentaires',
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
        slug: 'buy-instagram-views',
        label: 'Vues',
        changes: 'Les vues d’un Reel ou d’une vidéo',
        needs: 'Un lien vers le Reel',
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
        slug: 'buy-instagram-comments',
        label: 'Commentaires',
        changes: 'Les commentaires d’une publication publique',
        needs: 'Un lien vers la publication',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'vues Instagram ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté Instagram demandent de ne pas gonfler les interactions de façon artificielle, et Instagram supprime régulièrement les comptes qu’il juge inactifs ou faux. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. La livraison progressive et des Reels que les gens regardent vraiment paraissent plus naturels.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public du Reel ou de la vidéo : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
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
      highlight: 'vues Instagram',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'Le Reel est public',
        body: 'Il doit être sur un compte public jusqu’à la fin de la livraison.',
      },
      {
        title: 'Le lien est celui du Reel',
        body: 'Copiez-le depuis le Reel lui-même. Il ressemble à instagram.com/reel/…, pas au lien de votre profil.',
      },
      {
        title: 'Le Reel reste en ligne',
        body: 'Ne le supprimez pas et ne l’archivez pas pendant la livraison ni pendant les 6 mois de refill.',
      },
      {
        title: 'Les chiffres restent cohérents',
        body: 'Des dizaines de milliers de vues avec presque aucun like peuvent paraître étranges. Associez-les à des likes ou choisissez une taille adaptée.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les vues Instagram',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-ig-views-v2-1',
        question: 'Combien de vues Instagram devrais-je acheter ?',
        answer: 'Choisissez une taille adaptée à votre compte et au Reel. Quelques milliers conviennent à la plupart des Reels de petits comptes ; les grands comptes et les campagnes passent à 10 000 ou plus. En cas de doute, commencez petit.',
      },
      {
        id: 'fr-ig-views-v2-2',
        question: 'Puis-je répartir un forfait sur plusieurs Reels ?',
        answer: 'Non. Chaque commande couvre un Reel ou une vidéo. Pour plusieurs Reels, passez une commande par Reel.',
      },
      {
        id: 'fr-ig-views-v2-3',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-ig-views-v2-4',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services Instagram',
    intro: 'Les vues Instagram changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
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
        slug: 'buy-instagram-comments',
        title: 'Acheter des commentaires Instagram',
        line: 'Lancez la conversation sous une publication',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
