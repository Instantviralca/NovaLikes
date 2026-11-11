/**
 * French homepage (/fr) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to the French service routes.
 * getStarted.guides is intentionally empty (Learn is English-only): hide that group when it has no links.
 */

export const HOME_V5_FR = {
  hero: {
    eyebrow: 'Croissance sur les réseaux sociaux',
    title: {
      lead: 'Acheter des abonnés, likes et vues',
      highlight: 'Instagram & TikTok',
      tail: '',
    },
    subtitle: 'Choisissez la plateforme et le service, ajoutez votre nom d’utilisateur public ou le lien d’une publication, et payez en USD. Sans mot de passe, la plupart des commandes démarrent sous 6 à 8 heures et chaque commande inclut un refill de 6 mois.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Abonnés',
            line: 'Faites grandir votre profil',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Likes',
            line: 'Pour publications et Reels',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Vues',
            line: 'Pour Reels et vidéos',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Commentaires',
            line: 'Lancez la conversation',
            icon: 'message-circle',
          },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          {
            slug: 'buy-tiktok-followers',
            title: 'Abonnés',
            line: 'Faites grandir votre profil',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Likes',
            line: 'Pour une vidéo',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Vues',
            line: 'Pour une vidéo',
            icon: 'eye',
          },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          {
            slug: 'buy-facebook-followers',
            title: 'Abonnés',
            line: 'Pour Pages et profils',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Likes de Page',
            line: 'Pour les Pages avec des likes',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Likes de publication',
            line: 'Pour une publication publique',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'Dès {fromPrice}',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
      'Assistance WhatsApp 24 h/24',
      'Prix en USD',
    ],
  },
  marquee: [
    'Jamais de mot de passe',
    'Démarrage sous 6 à 8 h',
    'Refill de 6 mois sur chaque commande',
    'Assistance WhatsApp 24 h/24',
    'Prix en USD',
    'Suivi de chaque commande',
    'Livraison progressive sur demande',
    'Paiement sécurisé par carte',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'Les services',
      highlight: 'NovaLikes',
    },
    body: 'NovaLikes propose des abonnés, likes, vues et commentaires pour Instagram et TikTok, ainsi que quelques services Facebook. Vous choisissez un forfait, ajoutez un nom d’utilisateur ou un lien public et payez en dollars américains. Nous ne demandons jamais votre mot de passe, la plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures plus tard, et chaque commande inclut un refill de 6 mois.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Pourquoi les chiffres de',
        highlight: 'votre profil comptent',
      },
      body: 'Quand quelqu’un découvre votre profil ou une publication, il décide vite s’il reste. Le nombre d’abonnés et les likes d’une publication font partie des premières choses qu’on regarde, bien avant de lire une légende.',
      callout: 'Des chiffres faibles donnent l’impression qu’un bon contenu est ignoré, même quand ce n’est pas le cas. C’est cet écart qu’un forfait cherche à combler.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Donnez à votre meilleur contenu un',
        highlight: 'meilleur départ',
      },
      body: 'Un forfait change le chiffre que les gens voient en premier, pour qu’un nouveau compte, un lancement ou votre meilleur Reel ne parte pas de zéro. La suite dépend toujours du contenu : Instagram et TikTok décident selon la façon dont les gens regardent et réagissent.',
      callout: 'Utilisez un forfait pour soutenir un contenu dont vous êtes déjà fier, pas pour le remplacer.',
      visual: 'growth',
    },
  ],
  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      metric: 'followers',
      title: {
        lead: 'Acheter des',
        highlight: 'abonnés Instagram',
      },
      intro: 'Augmentez le nombre d’abonnés d’un compte Instagram public, le premier chiffre que les visiteurs regardent sur votre profil.',
      bullets: [
        "Votre nom d’utilisateur public, jamais votre mot de passe",
        "Repassez en privé une fois la livraison terminée",
        "Livraison progressive pour une hausse plus régulière",
        "Suivez l’avancement avec votre numéro de commande"
      ],
      cta: 'Acheter des abonnés Instagram',
      why: {
        q: 'Pourquoi les abonnés Instagram comptent-ils ?',
        a: 'Le nombre d’abonnés figure en haut de votre profil, à côté de votre nom. Les nouveaux visiteurs s’en servent, avec vos publications, pour juger si un compte est actif et mérite d’être suivi. Un chiffre très bas à côté d’un bon contenu peut faire paraître un compte nouveau ou renommé abandonné. Mais les abonnés seuls n’apportent pas plus de portée : celle-ci dépend toujours de la réaction des gens à chaque publication.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Seulement votre nom d’utilisateur Instagram public. Gardez le compte public et le même nom jusqu’à la fin de la livraison et d’un éventuel refill. Choisissez un forfait qui paraît naturel à côté de vos abonnés actuels.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: 'Acheter des',
        highlight: 'likes Instagram',
      },
      intro: 'Ajoutez des likes à une photo, un carrousel ou un Reel public. Les likes s’affichent juste sous la publication et sont le signal le plus rapide pour qui la découvre.',
      bullets: [
        "Photos, carrousels et Reels",
        "Une publication par commande, collez son lien",
        "Idéal pour lancements, offres et publications épinglées",
        "Choisissez une taille adaptée à la portée de la publication"
      ],
      cta: 'Acheter des likes Instagram',
      why: {
        q: 'Pourquoi les likes Instagram comptent-ils ?',
        a: 'Les likes sont la première réaction que l’on voit sur une publication, avant la légende et les commentaires. Une publication avec un bon nombre de likes paraît avoir déjà plu. Les likes vont à une seule publication, ils conviennent donc à celles que vous voulez mettre en avant : un lancement, une offre, une collaboration ou un contenu épinglé.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Le lien public d’une publication ou d’un Reel. Chaque commande va uniquement à cette publication. Pour plusieurs publications, passez une commande par publication.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: 'Acheter des',
        highlight: 'vues Instagram',
      },
      intro: 'Augmentez les vues d’un Reel ou d’une vidéo publique pour qu’une nouvelle publication donne envie d’être regardée quand vous partagez le lien.',
      bullets: [
        "Reels et publications vidéo",
        "Un lien de Reel, sans mot de passe",
        "Les grands forfaits baissent le prix pour 1 000",
        "Associez-les à des likes pour des chiffres naturels"
      ],
      cta: 'Acheter des vues Instagram',
      why: {
        q: 'Pourquoi les vues Instagram comptent-elles ?',
        a: 'Instagram affiche les vues sur les Reels, et beaucoup de gens les regardent avant de décider de lancer la lecture. Un nouveau Reel avec très peu de vues peut paraître ignoré, même s’il est bon. Les vues changent seulement le chiffre de cette vidéo. Les likes, commentaires et nouveaux abonnés dépendent toujours du contenu.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Le lien public du Reel ou de la vidéo. Laissez-le public jusqu’à la fin de la livraison et demandez une livraison progressive si vous préférez.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: 'Acheter des',
        highlight: 'commentaires Instagram',
      },
      intro: 'Ajoutez des commentaires à une publication ou un Reel public pour qu’il paraisse actif et invite les autres à participer.',
      bullets: [
        "Commentaires High Quality ou Premium",
        "Envoyez vos commentaires, un par ligne",
        "En français ou dans une autre langue sur demande",
        "Collez le lien, sans connexion"
      ],
      cta: 'Acheter des commentaires Instagram',
      why: {
        q: 'Pourquoi les commentaires Instagram comptent-ils ?',
        a: 'Les commentaires montrent que les gens ne se sont pas contentés de faire défiler, mais qu’ils ont réagi. Une publication avec quelques commentaires invite les autres à répondre, alors qu’une section vide rend silencieuse même une publication populaire. Les commentaires Premium sont écrits pour votre publication et sonnent naturels.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Le lien public de la publication ou du Reel. Choisissez High Quality ou Premium sur la page du service et indiquez vos propres commentaires ou une langue, comme le français, dans la note de commande.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: 'Acheter des',
        highlight: 'abonnés TikTok',
      },
      intro: 'Augmentez le nombre d’abonnés d’un compte TikTok public. Les nouveaux spectateurs le regardent sur votre profil avant de vous suivre.',
      bullets: [
        "Nom d’utilisateur sans le @, sans mot de passe",
        "Repassez en privé une fois la livraison terminée",
        "Livraison progressive sur demande",
        "Ne donne pas accès à Creator Rewards"
      ],
      cta: 'Acheter des abonnés TikTok',
      why: {
        q: 'Pourquoi les abonnés TikTok comptent-ils ?',
        a: 'Sur TikTok, on vous découvre souvent par une vidéo, puis on touche votre profil. Le nombre d’abonnés fait partie des premières choses qu’on y voit. Un profil avec très peu d’abonnés à côté de bonnes vidéos peut paraître tout neuf ou inactif. Les abonnés ne décident pas de ce que TikTok recommande : la page Pour toi dépend de la façon dont chaque vidéo est regardée.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Votre nom d’utilisateur TikTok public. Gardez le compte public et le même nom jusqu’à la fin de la livraison et d’un éventuel refill.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: 'Acheter des',
        highlight: 'likes TikTok',
      },
      intro: 'Ajoutez des likes à une vidéo TikTok publique, comme un lancement de produit, une collaboration ou votre meilleur clip.',
      bullets: [
        "Une vidéo publique par commande",
        "Collez le lien de la vidéo, sans connexion",
        "Gardez les likes cohérents avec les vues",
        "Idéal pour clips épinglés, lancements et collaborations"
      ],
      cta: 'Acheter des likes TikTok',
      why: {
        q: 'Pourquoi les likes TikTok comptent-ils ?',
        a: 'Le nombre de cœurs s’affiche à droite de chaque vidéo TikTok, on le voit donc pendant la lecture. Une vidéo que vous partagez hors de TikTok ou que vous épinglez sur votre profil paraît plus solide quand les likes suivent les vues. Les likes vont uniquement à cette vidéo.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Le lien public de la vidéo. Les likes vont uniquement à cette vidéo. Pour plusieurs vidéos, passez une commande par lien.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: 'Acheter des',
        highlight: 'vues TikTok',
      },
      intro: 'Augmentez les vues d’une vidéo TikTok publique. Un chiffre faible peut faire paraître une bonne vidéo ignorée, surtout si elle vient d’être publiée.',
      bullets: [
        "Vues High Quality ou Premium",
        "Un lien de vidéo, sans connexion",
        "High Quality a le prix le plus bas pour 1 000",
        "Les vues ne rapportent rien via Creator Rewards"
      ],
      cta: 'Acheter des vues TikTok',
      why: {
        q: 'Pourquoi les vues TikTok comptent-elles ?',
        a: 'TikTok affiche les vues sous chaque vidéo dans la grille de votre profil. Une grille aux chiffres faibles peut faire paraître un compte inactif. Les vues ne placent pas une vidéo sur la page Pour toi : TikTok en décide selon la façon dont les gens regardent et réagissent.',
      },
      how: {
        q: 'De quoi avez-vous besoin pour commander ?',
        a: 'Le lien public de la vidéo. Choisissez High Quality ou Premium sur la page du service et gardez la vidéo publique jusqu’à la fin de la livraison.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Pourquoi',
      highlight: 'NovaLikes ?',
    },
    intro: 'Beaucoup de sites vendent des abonnés et des likes. Voici ce que vous pouvez attendre de nous.',
    items: [
      {
        title: 'Des réponses claires avant l’achat',
        icon: 'badge-check',
        body: 'Chaque page de service dit exactement ce qu’un forfait change et ce qu’il ne change pas. Nous vous disons aussi quand un autre service vous conviendrait mieux, par exemple les abonnés Facebook plutôt que les likes de Page.',
      },
      {
        title: 'Une vraie entreprise, joignable',
        icon: 'building',
        body: 'NovaLikes est exploité par THE HOUSE OF VEYNOR LTD, une société immatriculée en Angleterre et au pays de Galles (n° 17561169). L’équipe traite des commandes sur les réseaux sociaux depuis 7 à 8 ans, d’abord sous le nom ViralMe puis sous celui de NovaLikes, et répond sur WhatsApp (+44 7454 758272) à toute heure.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Nos',
      highlight: 'engagements',
    },
    intro: 'Ces quatre engagements s’appliquent à chaque commande Instagram, TikTok et Facebook.',
    items: [
      {
        key: 'password',
        title: 'Jamais de mot de passe',
        body: 'Il nous faut seulement un nom d’utilisateur ou un lien public. Si un site vous demande vos identifiants, quel qu’il soit, ne lui confiez pas votre compte.',
        icon: 'shield',
        chip: 'Lien public seul',
      },
      {
        key: 'speed',
        title: 'Démarrage sous 6 à 8 h',
        body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Vous préférez un rythme plus lent ? Demandez une livraison progressive dans la note de commande.',
        icon: 'clock',
        chip: '6 à 8 h',
      },
      {
        key: 'refill',
        title: 'Refill de 6 mois',
        body: 'Si le chiffre baisse dans les 6 mois suivant la livraison, envoyez votre numéro de commande sur WhatsApp et nous le complétons. Gardez le profil ou la publication en public pendant le refill.',
        icon: 'refresh-cw',
        chip: '6 mois',
      },
      {
        key: 'support',
        title: 'Assistance WhatsApp 24 h/24',
        body: 'Écrivez au +44 7454 758272, avant ou après la commande. Vous pouvez aussi suivre chaque commande sur la page « Suivre la commande » ou dans votre compte gratuit.',
        icon: 'message-circle',
        chip: '24 h/24',
      },
    ],
  },
  faq: {
    id: 'before-you-buy',
    title: {
      lead: 'Avant',
      highlight: 'd’acheter',
    },
    intro: 'Les questions les plus fréquentes avant une première commande.',
    items: [
      {
        question: 'Par quel service commencer ?',
        answer: 'Par le chiffre que les visiteurs voient en premier. Si votre profil paraît vide, commencez par les abonnés. Pour une publication ou une vidéo que vous mettez en avant, des likes ou des vues sur cette publication.',
      },
      {
        question: 'Avez-vous besoin de mon mot de passe Instagram ou TikTok ?',
        answer: 'Non. Pour les abonnés, il nous faut votre nom d’utilisateur public ; pour les likes, vues et commentaires, le lien public de la publication ou de la vidéo. Ne donnez jamais votre mot de passe à un service de croissance.',
      },
      {
        question: 'Mon compte doit-il être public ?',
        answer: 'Oui, pendant la livraison. Un compte ou une publication privé peut bloquer la livraison. Ensuite, vous pouvez le repasser en privé.',
      },
      {
        question: 'Quand ma commande démarre-t-elle ?',
        answer: 'La plupart des commandes démarrent 6 à 8 heures après la confirmation du paiement et se terminent 4 à 6 heures après le démarrage. Pour un rythme plus lent, demandez une livraison progressive dans la note de commande ou sur WhatsApp.',
      },
      {
        question: 'Que se passe-t-il si les chiffres baissent ?',
        answer: 'Chaque commande inclut un refill de 6 mois à partir de la date de livraison. Écrivez-nous sur WhatsApp (+44 7454 758272) avec votre numéro de commande et nous complétons.',
      },
      {
        question: 'Est-ce que cela peut nuire à mon compte ?',
        answer: 'Les règles d’Instagram et de TikTok n’autorisent pas l’achat d’interactions, et les deux plateformes peuvent supprimer l’activité qu’elles jugent non authentique. NovaLikes ne demande jamais votre mot de passe, mais aucun prestataire ne contrôle la façon dont une plateforme traite un compte. Lisez les règles de la plateforme avant de commander.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Commencer',
      highlight: 'maintenant',
    },
    body: 'Choisissez une plateforme ci-dessous. Chaque page de service affiche les forfaits, le prix en dollars américains et exactement ce qu’il vous faut pour commander.',
    tools: {
      title: 'Outils gratuits',
      links: [
        {
          label: 'Compteur d’abonnés Instagram',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Visionneuse de profil Instagram',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Visionneuse de photo de profil Instagram',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'Téléchargeur de vidéos TikTok',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Téléchargeur de vidéos Facebook',
          href: '/tools/facebook-video-downloader',
        },
      ],
    },
    guides: {
      title: '',
      links: [],
      cta: {
        label: '',
        href: '',
      },
    },
  },
  stickyCta: {
    label: 'Choisir un service',
    href: '#homepage-hero',
  },
} as const;
