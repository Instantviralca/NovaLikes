import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-tiktok-likes. Primary keyword: "comprar curtidas tiktok". Do not edit wording without the content owner. */
export const PT_BR_BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'Curtidas no TikTok',
    unit: 'curtidas',
    unitSingular: 'curtida',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar curtidas tiktok',
      secondary: [
        'comprar curtidas para vídeos do tiktok',
        'pacotes de curtidas tiktok',
        'preço curtidas tiktok',
        'comprar likes tiktok',
      ],
      questions: [
        'é seguro comprar curtidas no tiktok',
        'quanto custam curtidas no tiktok',
        'curtidas deixam um vídeo viral',
        'posso dividir as curtidas',
        'curtidas compradas caem',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'curtidas no TikTok',
      tail: 'para o seu vídeo mais importante',
    },
    subtitle: 'Os corações aparecem ao lado do vídeo enquanto ele roda. Faça seu lançamento, sua parceria ou seu melhor clipe mostrar um número à altura. A partir de {fromPrice}, só com o link do vídeo.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de curtidas no TikTok',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} curtidas no TikTok',
    save: 'Você economiza',
    cta: 'Adicionar ao carrinho',
    oneTime: 'Compra única. Sem assinatura.',
    secure: 'Pagamento seguro',
    methods: [
      'Cartão',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sem senha',
        body: 'Só o link',
      },
      {
        icon: 'clock',
        title: 'Começa em 6–8 h',
        body: 'Termina 4–6 h depois',
      },
      {
        icon: 'message-square',
        title: 'A gente ajuda',
        body: '24/7 pelo WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Por que escolher a NovaLikes para',
      highlight: 'curtidas no TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, nunca a sua senha',
        body: 'Precisamos só do link público do vídeo. Sem código de acesso e sem entrar na sua conta.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Prazos claros de início e fim',
        body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Prefere um ritmo mais lento? Peça entrega gradual.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6 meses de reposição',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a entrega, mande o número do pedido e repomos a diferença sem custo.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantia de reembolso de 30 dias',
        body: 'Pedidos elegíveis têm cobertura de 30 dias a partir da data da compra. Nossa política de reembolso explica o que está incluído.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'Qualquer vídeo público',
        body: 'Peça curtidas para qualquer vídeo público do TikTok. Cada pedido cobre um vídeo.',
      },
    ],
    promo: {
      eyebrow: 'Não sabe qual pacote escolher?',
      title: 'Pergunte antes de comprar',
      cta: 'Fale com a gente no WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Como comprar',
      highlight: 'curtidas no TikTok',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Só precisamos do link de um vídeo público do TikTok.',
    items: [
      {
        ui: 'public',
        title: 'Mantenha o vídeo público',
        body: 'O vídeo precisa ser público, em uma conta pública, até a entrega terminar. Não apague.',
      },
      {
        ui: 'packages',
        title: 'Escolha um pacote',
        body: 'Escolha uma quantidade nos pacotes acima. Cada pacote mostra o preço antes de você decidir.',
      },
      {
        ui: 'cart',
        title: 'Adicione ao carrinho',
        body: 'Toque em “Adicionar ao carrinho” e siga para o pagamento.',
      },
      {
        ui: 'username',
        title: 'Cole o link do vídeo',
        body: 'Abra o vídeo no TikTok, toque em “Compartilhar”, escolha “Copiar link” e cole no pagamento.',
      },
      {
        ui: 'pay',
        title: 'Pague com segurança',
        body: 'Pague uma única vez com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura.',
      },
    ],
    done: {
      title: 'Pronto!',
      count: 1000,
      unit: 'curtidas',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Vídeo privado',
      sub: 'Desativado para chegar ao vídeo',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'tiktok.com/@…/video/…',
    },
    safeChips: [
      'Só o link',
      'Pagamento seguro',
    ],
    privacyTags: [
      'link',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Como identificar um vendedor pouco confiável de',
      highlight: 'curtidas no TikTok',
    },
    intro: 'Onde quer que você compre, confira primeiro estes sete pontos.',
    us: 'NovaLikes',
    them: 'Vendedores pouco confiáveis',
    rows: [
      {
        label: 'Dados de acesso',
        novalikes: 'Só o link do vídeo',
        riskySeller: 'Pedem a senha',
      },
      {
        label: 'Prazos',
        novalikes: 'Começa em 6–8 horas',
        riskySeller: 'Sem prazo informado',
      },
      {
        label: 'Quedas',
        novalikes: '6 meses de reposição',
        riskySeller: 'Sem reposição',
      },
      {
        label: 'Reembolsos',
        novalikes: 'Reembolso em 30 dias*',
        riskySeller: 'Sem política escrita',
      },
      {
        label: 'Suporte',
        novalikes: 'WhatsApp 24/7',
        riskySeller: 'Difíceis de contatar',
      },
      {
        label: 'Preço',
        novalikes: 'Em USD, visível antes',
        riskySeller: 'Muda no pagamento',
      },
      {
        label: 'Acompanhamento',
        novalikes: 'Página “Acompanhar pedido”',
        riskySeller: 'Sem como conferir',
      },
    ],
    note: '*Em pedidos elegíveis, conforme nossa política de reembolso.',
  },
  promises: {
    id: 'our-promises',
    title: 'Reposição e garantia de reembolso para curtidas no TikTok',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o vídeo no ar e público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: 'Quanto custam as',
      highlight: 'curtidas no TikTok?',
    },
    intro: 'As curtidas começam em {fromPrice} por 100, e o preço por curtida cai conforme o pacote aumenta. Cada preço é um pagamento único em dólares americanos para um vídeo.',
    points: [
      'Os 6 meses de reposição estão incluídos. Não precisa adicionar nada.',
      'Preços em dólares americanos. Seu banco converte para a sua moeda e alguns cartões cobram uma taxa por isso.',
      'Sem assinatura nem renovação. Você paga uma vez por pedido.',
    ],
    cols: [
      'Pacote',
      'Preço',
      'Por 1.000',
    ],
    best: 'Melhor preço',
    note: 'Os preços vêm dos nossos pacotes atuais. O preço que você vê no pagamento é o que você paga.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-likes',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'curtidas no TikTok?',
    },
    intro: 'Um TikTok com muitas visualizações e poucos corações faz quem assiste hesitar. As curtidas mantêm os números equilibrados para o vídeo parecer tão bom quanto é.',
    items: [
      {
        title: 'Vídeos que parecem queridos',
        body: 'Um bom número de corações mostra que outras pessoas gostaram do vídeo.',
      },
      {
        title: 'Vídeos fixados mais fortes',
        body: 'Os vídeos fixados no seu perfil trabalham muito. As curtidas fazem eles parecerem os seus melhores.',
      },
      {
        title: 'Links melhores fora do TikTok',
        body: 'Quando você compartilha um TikTok no WhatsApp, no Instagram ou por e-mail, ele fica mais atraente com um bom número de curtidas.',
      },
    ],
    diagram: [
      'Parece querido',
      'Vídeos fixados',
      'Links compartilhados',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'curtidas no TikTok?',
    },
    intro: 'Curtidas mudam os corações de um vídeo. O TikTok continua decidindo o alcance pela forma como os espectadores assistem.',
    no: {
      title: 'O que não muda',
      items: [
        'Visualizações ou seguidores por si só',
        'O posicionamento no Para Você por si só',
        'Compartilhamentos, salvamentos ou comentários espontâneos',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'As curtidas do vídeo que você escolher',
        'O quanto o vídeo parece querido para novos espectadores',
        'A força dos vídeos fixados e compartilhados',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Ilustração: curtidas no TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'curtidas no TikTok',
    },
    cards: [
      {
        title: 'Vendedores online',
        body: 'Lojas online adicionam curtidas a vídeos de produto antes de usá-los em anúncios ou de mandá-los para revendedores.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Criadores',
        body: 'Criadores adicionam curtidas a vídeos de parceria e clipes fixados, para o perfil abrir com vídeos populares.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Casas e eventos',
        body: 'Bares, shows de comédia e festivais adicionam curtidas a vídeos da programação e do clima antes da grande data.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o vídeo, o pedido funciona do mesmo jeito: um link público, o pacote que você escolher e curtidas que costumam começar em 6–8 horas. Sem login.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'Curtidas no TikTok x',
      highlight: 'visualizações e seguidores',
    },
    intro: 'Cada serviço muda um número diferente. Escolha o que combina com o que você quer que as pessoas vejam.',
    cols: [
      'Serviço',
      'O que muda',
      'O que precisamos',
      'A partir de',
    ],
    rows: [
      {
        slug: 'buy-tiktok-likes',
        label: 'Curtidas',
        changes: 'As curtidas de um vídeo',
        needs: 'Um link para o vídeo público',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Seguidores',
        changes: 'O número de seguidores do seu perfil',
        needs: 'Seu usuário público',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Visualizações',
        changes: 'As visualizações de um vídeo',
        needs: 'Um link para o vídeo público',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'curtidas no TikTok?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'As Diretrizes da Comunidade do TikTok proíbem interações falsas, e o TikTok remove com frequência contas que considera inativas ou falsas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição. Curtidas proporcionais às visualizações parecem mais naturais.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público do vídeo, então ninguém entra na sua conta nem muda nada. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
      },
      {
        ui: 'pay',
        title: 'Segurança do pagamento',
        body: 'Você paga uma única vez em um pagamento seguro com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura e nada se renova.',
      },
      {
        ui: 'privacy',
        title: 'Privacidade',
        body: 'Seu link e seu e-mail são usados só para processar o pedido e enviar avisos, como explica nossa [política de privacidade](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'curtidas no TikTok',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'O vídeo está público',
        body: 'As curtidas não chegam a um vídeo privado nem a um vídeo de uma conta privada.',
      },
      {
        title: 'O link é do vídeo',
        body: 'Copie em “Compartilhar”. Ele é assim: tiktok.com/@nome/video/…, e não como o link do seu perfil.',
      },
      {
        title: 'O vídeo continua no ar',
        body: 'Não apague durante a entrega e os 6 meses de reposição.',
      },
      {
        title: 'As curtidas combinam com as visualizações',
        body: 'Milhares de curtidas com poucas centenas de visualizações parecem estranhas. Escolha um tamanho adequado ou adicione visualizações.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre curtidas no TikTok',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-tt-likes-v2-1',
        question: 'Posso dividir um pacote de curtidas entre vários vídeos?',
        answer: 'Não. Cada pedido cobre um vídeo, para a entrega e a reposição serem fáceis de acompanhar.',
      },
      {
        id: 'pt-tt-likes-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-tt-likes-v2-3',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços da NovaLikes',
    intro: 'As curtidas mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'Comprar visualizações no TikTok',
        line: 'Um começo melhor para um vídeo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprar seguidores no TikTok',
        line: 'Faça seu perfil no TikTok crescer',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar curtidas no Instagram',
        line: 'Para posts, carrosséis e Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
    ],
    cardPrice: 'A partir de {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Escolher pacote',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
