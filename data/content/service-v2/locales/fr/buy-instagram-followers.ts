import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-instagram-followers. Primary keyword: "acheter des abonnés instagram". Do not edit wording without the content owner. */
export const FR_BUY_INSTAGRAM_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-instagram-followers',
    platform: 'Instagram',
    name: 'Abonnés Instagram',
    unit: 'abonnés',
    unitSingular: 'abonné',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des abonnés instagram',
      secondary: [
        'acheter abonnés instagram sans mot de passe',
        'forfaits abonnés instagram',
        'prix abonnés instagram',
        'avoir plus d’abonnés instagram',
      ],
      questions: [
        'est-ce sûr d’acheter des abonnés instagram',
        'combien coûtent les abonnés instagram',
        'peut-on être banni pour achat d’abonnés',
        'pourquoi mes abonnés baissent',
        'est-ce utile d’acheter des abonnés',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'abonnés Instagram',
      tail: 'pour un profil plus crédible',
    },
    subtitle: 'Les marques, les partenaires et les nouveaux visiteurs regardent votre nombre d’abonnés avant de vous suivre. Donnez à votre profil un chiffre qui inspire confiance dès {fromPrice}, sans partager votre mot de passe Instagram.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des abonnés Instagram',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} abonnés Instagram',
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
        body: 'Le nom d’utilisateur suffit',
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
      highlight: 'abonnés Instagram ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Votre nom d’utilisateur, jamais votre mot de passe',
        body: 'Il nous faut seulement votre nom d’utilisateur public. Pas d’identifiants et aucune connexion à votre compte.',
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
        icon: 'message-square',
        tone: 'pink',
        title: 'Aide sur WhatsApp, 24 h/24',
        body: 'Une question avant ou après la commande ? Écrivez au +44 7454 758272 avec votre numéro de commande, de jour comme de nuit.',
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
      highlight: 'abonnés Instagram',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. La plupart des commandes démarrent 6 à 8 heures après le paiement.',
    items: [
      {
        ui: 'public',
        title: 'Passez votre profil en public',
        body: 'Les abonnés ne peuvent être livrés qu’à un profil public. Une fois la commande terminée, vous pouvez le repasser en privé.',
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
        title: 'Indiquez votre nom d’utilisateur',
        body: 'Saisissez le @nom public qui recevra les abonnés, ainsi que votre e-mail pour le reçu et les notifications de commande.',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 2000,
      unit: 'abonnés',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Compte privé',
      sub: 'Désactivé pour la livraison',
    },
    chips: [
      '1K',
      '2K',
      '5K',
      '10K',
    ],
    chipOn: 1,
    input: {
      prefix: '@',
      placeholder: 'votrenom',
    },
    safeChips: [
      'Le nom d’utilisateur suffit',
      'Paiement sécurisé',
    ],
    privacyTags: [
      '@utilisateur',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Comment repérer un vendeur douteux de',
      highlight: 'abonnés Instagram',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Nom d’utilisateur seul',
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
    title: 'Refill et garantie de remboursement pour vos abonnés Instagram',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'Si les abonnés de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Gardez le même nom d’utilisateur et un profil public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'abonnés Instagram ?',
    },
    intro: 'Les forfaits commencent à {fromPrice} les 100 abonnés. Plus le forfait est grand, moins vous payez par abonné, et chaque prix est un paiement unique en dollars américains.',
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
    id: 'why-buy-instagram-followers',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'abonnés Instagram ?',
    },
    intro: 'La plupart des clients ne partent pas de zéro. Ils ont un contenu auquel ils croient et un nombre d’abonnés qui ne lui rend pas justice. Un forfait change le chiffre que les visiteurs voient en premier, pour que vos bonnes publications aient une chance plus équitable. Cela fonctionne mieux si vous continuez à publier régulièrement.',
    items: [
      {
        title: 'Une meilleure première impression',
        body: 'Les visiteurs regardent le nombre d’abonnés avant de lire la moindre légende. Un profil plus fourni obtient un premier regard plus juste.',
      },
      {
        title: 'Un coup de pouce pour un nouveau compte',
        body: 'Une nouvelle marque, un projet parallèle ou un compte de créateur n’a pas à rester à quelques dizaines d’abonnés pendant qu’il grandit.',
      },
      {
        title: 'Un appui pour un lancement ou une proposition',
        body: 'Les équipes ajoutent des abonnés avant un lancement, une campagne ou une proposition à une marque, à côté des publications qui font le vrai travail.',
      },
    ],
    diagram: [
      'Première impression',
      'Coup de pouce',
      'Lancement',
    ],
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'abonnés Instagram ?',
    },
    intro: 'Ils aident pour une chose : le chiffre que les gens voient sur votre profil. Voici le bilan honnête.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les likes, vues ou commentaires de vos publications',
        'Votre portée ou les recommandations Explorer et Reels',
        'Les ventes, inscriptions ou messages à eux seuls',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Le nombre d’abonnés de votre profil',
        'La première impression des nouveaux visiteurs',
        'L’air établi d’un nouveau compte',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration : abonnés Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'abonnés Instagram',
    },
    cards: [
      {
        title: 'Créateurs',
        body: 'Les créateurs utilisent des abonnés pour donner à un compte en croissance le profil qu’il mérite, tout en continuant à publier des Reels et des stories. Raisons fréquentes : un nouveau compte, une première proposition à une marque ou une relance.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Petites entreprises',
        body: 'Boutiques, salons, cafés et prestataires rencontrent souvent leurs clients sur Instagram avant leur site. Un profil actif aide quand on vous découvre avant une ouverture ou un lancement.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Marques et agences',
        body: 'Les marques et agences ajoutent des abonnés à de nouveaux comptes pays, produit ou campagne, souvent avec une livraison progressive pour une croissance régulière.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la raison, la commande fonctionne de la même façon : votre nom d’utilisateur public, le forfait choisi et un chiffre qui commence en général à monter sous 6 à 8 heures. Personne n’a jamais besoin de vos identifiants.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Abonnés Instagram ou',
      highlight: 'likes, vues et commentaires',
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
        slug: 'buy-instagram-followers',
        label: 'Abonnés',
        changes: 'Le nombre d’abonnés de votre profil',
        needs: 'Votre @nom public',
        current: true,
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
      highlight: 'abonnés Instagram ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté Instagram demandent de ne pas obtenir d’abonnés, de likes ou de partages de façon artificielle, et Instagram supprime régulièrement les comptes qu’il juge inactifs ou faux. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. La livraison progressive et des publications régulières gardent une croissance naturelle.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement votre nom d’utilisateur public : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
      },
      {
        ui: 'pay',
        title: 'Sécurité du paiement',
        body: 'Vous payez une seule fois via un paiement sécurisé par carte, Apple Pay ou Google Pay, en dollars américains. Pas d’abonnement, rien ne se renouvelle.',
      },
      {
        ui: 'privacy',
        title: 'Confidentialité',
        body: 'Votre nom d’utilisateur et votre e-mail servent uniquement à traiter la commande et à vous envoyer des notifications, comme l’explique notre [politique de confidentialité](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Avant d’acheter des',
      highlight: 'abonnés Instagram',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'Votre profil est public',
        body: 'Laissez-le public jusqu’à la fin de la livraison. Un profil privé empêche la commande de démarrer ou de se terminer.',
      },
      {
        title: 'Le nom d’utilisateur est exact',
        body: 'Nous livrons exactement ce que vous saisissez. Copiez-le directement depuis votre profil pour être sûr.',
      },
      {
        title: 'Le nom d’utilisateur ne change pas',
        body: 'Gardez le même nom pendant la livraison et les 6 mois de refill, sinon nous ne trouverons plus le profil.',
      },
      {
        title: 'Vous savez quel rythme vous voulez',
        body: 'Vous voulez que les abonnés arrivent petit à petit ? Demandez une livraison progressive au paiement ou sur WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les abonnés Instagram',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-ig-followers-v2-1',
        question: 'Est-ce sûr d’acheter des abonnés Instagram ?',
        answer: 'Avec NovaLikes, vous partagez seulement votre nom d’utilisateur public : personne ne se connecte à votre compte, et vous payez via un paiement sécurisé. Le seul risque qu’aucun vendeur ne peut supprimer, c’est Instagram : ses règles découragent les abonnés artificiels et il supprime régulièrement les comptes inactifs ou faux. C’est pourquoi chaque commande inclut un refill de 6 mois.',
      },
      {
        id: 'fr-ig-followers-v2-2',
        question: 'Combien coûtent les abonnés Instagram ?',
        answer: 'Les forfaits commencent à {fromPrice} les 100 abonnés, et le prix par abonné baisse quand le forfait grandit. Tous les prix sont en dollars américains, en paiement unique, sans abonnement.',
      },
      {
        id: 'fr-ig-followers-v2-3',
        question: 'Mon compte peut-il être suspendu si j’achète des abonnés ?',
        answer: 'Nous ne nous connectons jamais à votre compte, donc rien n’y change de notre côté. Instagram peut retirer des abonnés qu’il juge faux et ses règles découragent la croissance artificielle : il reste donc toujours un certain risque. Une taille adaptée à votre profil, la livraison progressive et des publications régulières sont la façon raisonnable d’utiliser un forfait.',
      },
      {
        id: 'fr-ig-followers-v2-4',
        question: 'Pourquoi mon nombre d’abonnés a baissé, et que couvre le refill ?',
        answer: 'Instagram supprime régulièrement les comptes inactifs ou faux, donc une petite baisse est normale. Si les abonnés de votre commande baissent dans les 6 mois suivant la livraison, écrivez-nous avec votre numéro de commande et nous comblons la différence. Gardez le même nom d’utilisateur et un profil public pendant la livraison du refill.',
      },
      {
        id: 'fr-ig-followers-v2-5',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-ig-followers-v2-6',
        question: 'Combien d’abonnés Instagram devrais-je acheter ?',
        answer: 'Choisissez une taille qui paraît naturelle à côté de votre nombre actuel et de ce que vous publiez. Un petit forfait est une bonne première commande, vous pourrez en ajouter ensuite. Vous hésitez ? Écrivez-nous sur WhatsApp.',
      },
      {
        id: 'fr-ig-followers-v2-7',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services Instagram',
    intro: 'Les abonnés Instagram changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Acheter des likes Instagram',
        line: 'Pour publications, carrousels et Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Acheter des vues Instagram',
        line: 'Plus de regards sur vos Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
