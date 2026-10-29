import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-facebook-page-likes. Primary keyword: "comprar curtidas página facebook". Do not edit wording without the content owner. */
export const PT_BR_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Curtidas para Página do Facebook',
    unit: 'curtidas',
    unitSingular: 'curtida',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar curtidas página facebook',
      secondary: [
        'comprar curtidas facebook',
        'comprar likes página facebook',
        'preço curtidas página facebook',
        'curtidas para fanpage do facebook',
      ],
      questions: [
        'diferença entre curtidas na página e seguidores',
        'minha página ainda mostra curtidas',
        'quanto custam curtidas na página',
        'é seguro comprar curtidas no facebook',
        'precisa de acesso de administrador',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'curtidas para Página do Facebook',
      tail: 'com um número que chama atenção',
    },
    subtitle: 'Se a sua Página ainda mostra “curtidas” embaixo do nome, é uma das primeiras coisas que os visitantes veem. Aumente esse número a partir de {fromPrice}, só com o link da Página.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de curtidas para Página do Facebook',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} curtidas para Página do Facebook',
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
      highlight: 'curtidas para Página do Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, sem acesso de administrador',
        body: 'Precisamos só do link público da sua Página. Sem senha, sem função de administrador e sem acesso à sua conta.',
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
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'Para Páginas com curtidas',
        body: 'Curtidas na Página são para Páginas que ainda mostram curtidas embaixo do nome. Páginas novas mostram seguidores, então confira a sua antes.',
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
      highlight: 'curtidas para Página do Facebook',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Confira se a sua Página mostra curtidas e cole o link público dela.',
    items: [
      {
        ui: 'public',
        title: 'Confira se a Página mostra curtidas',
        body: 'Abra sua Página em uma janela anônima. Se aparecer “curtidas” embaixo do nome, curtidas na Página servem. Só seguidores? Escolha seguidores no Facebook.',
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
        title: 'Cole o link da Página',
        body: 'Copie o link público da sua Página, por exemplo facebook.com/suapagina. Curtidas na Página só funcionam em Páginas, não em perfis pessoais.',
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
      label: 'Página não publicada',
      sub: 'Desativada para ser encontrada',
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
      placeholder: 'facebook.com/suapagina',
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
      highlight: 'curtidas para Página do Facebook',
    },
    intro: 'Onde quer que você compre, confira primeiro estes sete pontos.',
    us: 'NovaLikes',
    them: 'Vendedores pouco confiáveis',
    rows: [
      {
        label: 'Dados de acesso',
        novalikes: 'Só o link da Página',
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
    title: 'Reposição e garantia de reembolso para curtidas para Página do Facebook',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'Se as curtidas do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha a mesma URL da Página e a Página pública enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: 'Quanto custam as',
      highlight: 'curtidas para Página do Facebook?',
    },
    intro: 'As curtidas na Página começam em {fromPrice} por 100, e o preço por curtida cai nos pacotes maiores. Cada preço é um pagamento único em dólares americanos para uma Página.',
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
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'curtidas para Página do Facebook?',
    },
    intro: 'Muitos negócios com anos de estrada criaram a Página do Facebook há muito tempo, e ela ainda mostra curtidas. Se o número é baixo, até um negócio conhecido parece pequeno.',
    items: [
      {
        title: 'Uma Página antiga que parece atual',
        body: 'Uma Página com anos de vida e 80 curtidas pode parecer esquecida. As curtidas renovam essa primeira impressão.',
      },
      {
        title: 'Confiança na comparação',
        body: 'Quem compara dois negócios do bairro costuma olhar qual Página parece mais popular.',
      },
      {
        title: 'Uma base melhor para anúncios',
        body: 'Páginas que anunciam no Facebook ficam mais críveis quando as curtidas combinam com o investimento.',
      },
    ],
    diagram: [
      'Parece atual',
      'Vence a comparação',
      'Pronta para anúncios',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'curtidas para Página do Facebook?',
    },
    intro: 'Curtidas na Página mudam o número de uma Página no formato clássico. Veja o que fazem e o que não fazem.',
    no: {
      title: 'O que não muda',
      items: [
        'Reações em posts específicos',
        'Seu alcance orgânico por si só',
        'Páginas que só mostram seguidores (escolha seguidores)',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'As curtidas embaixo do nome da sua Página',
        'O quanto a Página parece popular para novos visitantes',
        'A primeira impressão na comparação com outros negócios',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Ilustração: curtidas para Página do Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'curtidas para Página do Facebook',
    },
    cards: [
      {
        title: 'Negócios consolidados',
        body: 'Restaurantes, floriculturas e empresas familiares com Páginas antigas adicionam curtidas para o número ficar à altura da fama.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Lojas e salões',
        body: 'Lojas e salões aumentam as curtidas antes de uma época forte, como o Natal ou a Black Friday.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agências',
        body: 'Agências deixam as Páginas dos clientes em dia antes de uma campanha ou mudança de marca, muitas vezes com entrega gradual.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Seja qual for a Página, o pedido funciona do mesmo jeito: o link público da sua Página, um pacote adequado e curtidas que costumam começar em 6–8 horas. Sem acesso de administrador.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Curtidas na Página x',
      highlight: 'seguidores e curtidas em posts',
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
        slug: 'buy-facebook-page-likes',
        label: 'Curtidas na Página',
        changes: 'As curtidas de uma Página no formato clássico',
        needs: 'Um link para a Página',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de uma Página ou perfil',
        needs: 'Um link para a Página ou perfil',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Curtidas em post',
        changes: 'Reações em um post público',
        needs: 'Um link para o post',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'É seguro comprar',
      highlight: 'curtidas para Página do Facebook?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'Os Padrões da Comunidade do Facebook proíbem comportamento não autêntico, e a Meta remove com frequência contas falsas ou inativas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público da sua Página, então ninguém faz login e não é preciso permissão de administrador. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
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
      highlight: 'curtidas para Página do Facebook',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'Sua Página mostra curtidas',
        body: 'Confira em uma janela anônima. Se ela só mostra seguidores, as curtidas na Página não vão aparecer: escolha seguidores.',
      },
      {
        title: 'É uma Página, não um perfil',
        body: 'Curtidas na Página só funcionam em Páginas do Facebook. Perfis pessoais precisam de seguidores.',
      },
      {
        title: 'A Página está publicada',
        body: 'Uma Página não publicada ou com restrições impede o início.',
      },
      {
        title: 'A URL não muda',
        body: 'Mantenha o mesmo endereço durante a entrega e os 6 meses de reposição.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre curtidas para Página do Facebook',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-fb-page-likes-v2-1',
        question: 'Minha Página só mostra seguidores. O que eu peço?',
        answer: 'Seguidores no Facebook. Páginas novas mostram seguidores em vez de curtidas, então curtidas na Página não apareceriam.',
      },
      {
        id: 'pt-fb-page-likes-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-fb-page-likes-v2-3',
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
        slug: 'buy-facebook-followers',
        title: 'Comprar seguidores no Facebook',
        line: 'Para Páginas e perfis públicos',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Comprar curtidas em post do Facebook',
        line: 'Reações em um post público',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
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
