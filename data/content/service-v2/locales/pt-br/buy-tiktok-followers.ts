import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-tiktok-followers. Primary keyword: "comprar seguidores tiktok". Do not edit wording without the content owner. */
export const PT_BR_BUY_TIKTOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-tiktok-followers',
    platform: 'TikTok',
    name: 'Seguidores no TikTok',
    unit: 'seguidores',
    unitSingular: 'seguidor',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar seguidores tiktok',
      secondary: [
        'comprar seguidores no tiktok sem senha',
        'pacotes de seguidores tiktok',
        'preço seguidores tiktok',
        'ganhar mais seguidores no tiktok',
      ],
      questions: [
        'é seguro comprar seguidores no tiktok',
        'quanto custam seguidores no tiktok',
        'serve para o creator rewards',
        'por que meus seguidores do tiktok caem',
        'vale a pena comprar seguidores',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'seguidores no TikTok',
      tail: 'para um perfil que convence',
    },
    subtitle: 'Quem curte um dos seus vídeos olha primeiro o seu perfil. Um número de seguidores convincente facilita o follow. A partir de {fromPrice}, só com o seu usuário.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de seguidores no TikTok',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} seguidores no TikTok',
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
        body: 'Só o usuário',
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
      highlight: 'seguidores no TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Seu usuário, nunca a sua senha',
        body: 'Precisamos só do seu nome de usuário público. Sem código de acesso e sem entrar na sua conta.',
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
        body: 'Se os seguidores do seu pedido caírem nos 6 meses após a entrega, mande o número do pedido e repomos a diferença sem custo.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantia de reembolso de 30 dias',
        body: 'Pedidos elegíveis têm cobertura de 30 dias a partir da data da compra. Nossa política de reembolso explica o que está incluído.',
      },
      {
        icon: 'user-plus',
        tone: 'pink',
        title: 'Só o seu usuário',
        body: 'Digite seu usuário do TikTok sem o @. Nunca pedimos seu acesso, um código ou para entrar na sua conta.',
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
      highlight: 'seguidores no TikTok',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Só precisamos do seu usuário público do TikTok.',
    items: [
      {
        ui: 'public',
        title: 'Deixe o perfil público',
        body: 'Os seguidores só podem ser entregues a uma conta pública do TikTok. Depois você pode voltar para o privado.',
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
        title: 'Adicione seu usuário',
        body: 'Digite seu usuário sem o @ e seu e-mail para o recibo e os avisos. Confira a grafia antes de pagar.',
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
      unit: 'seguidores',
      body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Acompanhe o andamento na página “Acompanhar pedido” com o número do pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Conta privada',
      sub: 'Desativada para a entrega',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
    input: {
      prefix: '@',
      placeholder: 'seuusuario',
    },
    safeChips: [
      'Só o usuário',
      'Pagamento seguro',
    ],
    privacyTags: [
      '@usuário',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Como identificar um vendedor pouco confiável de',
      highlight: 'seguidores no TikTok',
    },
    intro: 'Onde quer que você compre, confira primeiro estes sete pontos.',
    us: 'NovaLikes',
    them: 'Vendedores pouco confiáveis',
    rows: [
      {
        label: 'Dados de acesso',
        novalikes: 'Só o usuário',
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
    title: 'Reposição e garantia de reembolso para seguidores no TikTok',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp',
        body: 'Se os seguidores do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha o mesmo usuário e o perfil público enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-followers-cost',
    title: {
      lead: 'Quanto custam os',
      highlight: 'seguidores no TikTok?',
    },
    intro: 'Os seguidores começam em {fromPrice} por 100, e o preço por seguidor cai conforme o pacote aumenta. Cada preço é um pagamento único em dólares americanos para uma conta.',
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
    id: 'why-buy-tiktok-followers',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'seguidores no TikTok?',
    },
    intro: 'No TikTok as pessoas costumam descobrir você por um vídeo e depois abrem o seu perfil. Um número de seguidores consolidado facilita a decisão de seguir.',
    items: [
      {
        title: 'Um perfil à altura do vídeo',
        body: 'Um vídeo com milhares de visualizações ao lado de um perfil com 40 seguidores parece estranho. Os seguidores fecham essa diferença.',
      },
      {
        title: 'Um começo para contas novas',
        body: 'Uma conta nova de marca ou de projeto não precisa ficar no zero enquanto você encontra o seu formato.',
      },
      {
        title: 'Conversas mais fáceis com marcas',
        body: 'Marcas e agências costumam olhar o número de seguidores antes de responder a um criador.',
      },
    ],
    diagram: [
      'À altura',
      'Começo',
      'Pronto para marcas',
    ],
  },
  help: {
    id: 'does-buying-tiktok-followers-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'seguidores no TikTok?',
    },
    intro: 'Seguidores mudam o número do seu perfil. O que o TikTok recomenda continua dependendo de como as pessoas assistem aos seus vídeos.',
    no: {
      title: 'O que não muda',
      items: [
        'Visualizações ou curtidas dos seus vídeos',
        'O posicionamento no Para Você por si só',
        'O acesso ao Creator Rewards ou a outros recursos pagos',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'O número de seguidores do seu perfil no TikTok',
        'O quanto a conta parece estabelecida para novos visitantes',
        'A primeira impressão com marcas e parcerias',
      ],
      image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp',
      altFallback: 'Ilustração: seguidores no TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'seguidores no TikTok',
    },
    cards: [
      {
        title: 'Pequenos negócios',
        body: 'Padarias, barbearias e lojas adicionam seguidores para o TikTok delas parecer tão vivo quanto os vídeos.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp',
      },
      {
        title: 'Criadores em ascensão',
        body: 'Criadores de humor, games e estilo de vida usam seguidores para parecer estabelecidos enquanto postam com constância.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        title: 'Música e vida noturna',
        body: 'DJs, bandas e casas de show somam seguidores antes de um lançamento, de uma data de turnê ou de uma grande noite.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp',
      },
    ],
    statement: 'Seja qual for o motivo, o pedido funciona do mesmo jeito: seu usuário, um pacote adequado e seguidores que costumam começar a chegar em 6–8 horas. Nunca pedimos sua senha.',
  },
  vs: {
    id: 'tiktok-followers-vs-other-services',
    title: {
      lead: 'Seguidores no TikTok x',
      highlight: 'curtidas e visualizações',
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
        slug: 'buy-tiktok-followers',
        label: 'Seguidores',
        changes: 'O número de seguidores do seu perfil',
        needs: 'Seu usuário público',
        current: true,
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Curtidas',
        changes: 'As curtidas de um vídeo',
        needs: 'Um link para o vídeo público',
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
      highlight: 'seguidores no TikTok?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'As Diretrizes da Comunidade do TikTok proíbem interações falsas, e o TikTok remove com frequência contas que considera inativas ou falsas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição. Nunca compre seguidores para entrar no Creator Rewards: isso vai contra as regras do TikTok.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do seu nome de usuário público, então ninguém entra na sua conta nem muda nada. Nunca pedimos código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
      },
      {
        ui: 'pay',
        title: 'Segurança do pagamento',
        body: 'Você paga uma única vez em um pagamento seguro com cartão, Apple Pay ou Google Pay, em dólares americanos. Não há assinatura e nada se renova.',
      },
      {
        ui: 'privacy',
        title: 'Privacidade',
        body: 'Seu usuário e seu e-mail são usados só para processar o pedido e enviar avisos, como explica nossa [política de privacidade](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'seguidores no TikTok',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'A conta está pública',
        body: 'Uma conta privada impede o pedido de começar. Mantenha pública até a entrega terminar.',
      },
      {
        title: 'O usuário está correto',
        body: 'Confira cada letra, ponto e sublinhado. Os seguidores vão exatamente para o usuário que você digitar.',
      },
      {
        title: 'O usuário não muda',
        body: 'Mantenha o mesmo usuário durante a entrega e os 6 meses de reposição.',
      },
      {
        title: 'O tamanho combina',
        body: 'Escolha um pacote que pareça natural ao lado das suas visualizações e seguidores atuais.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre seguidores no TikTok',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-tt-followers-v2-1',
        question: 'Seguidores comprados contam para o Creator Rewards do TikTok?',
        answer: 'Não, e você não deveria tentar. As regras do TikTok proíbem interações falsas, e inflar seguidores para entrar em programas pagos pode colocar a conta em risco.',
      },
      {
        id: 'pt-tt-followers-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-tt-followers-v2-3',
        question: 'Quais formas de pagamento posso usar?',
        answer: 'Você pode pagar com cartão, Apple Pay ou Google Pay, em dólares americanos. É um pagamento único e nada se renova.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Mais serviços da NovaLikes',
    intro: 'Os seguidores mudam um número. Para fazer outro crescer, escolha um serviço.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprar curtidas no TikTok',
        line: 'Mais corações em um vídeo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-views',
        title: 'Comprar visualizações no TikTok',
        line: 'Um começo melhor para um vídeo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores no Instagram',
        line: 'Faça seu perfil crescer',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
