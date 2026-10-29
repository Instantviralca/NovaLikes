import type { ServiceV2Content } from '../../types';

/** Brazilian Portuguese (/pt-br) — v2 service page copy for buy-facebook-followers. Primary keyword: "comprar seguidores facebook". Do not edit wording without the content owner. */
export const PT_BR_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Seguidores no Facebook',
    unit: 'seguidores',
    unitSingular: 'seguidor',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar seguidores facebook',
      secondary: [
        'comprar seguidores para página do facebook',
        'pacotes de seguidores facebook',
        'preço seguidores facebook',
        'fazer uma página do facebook crescer',
      ],
      questions: [
        'é seguro comprar seguidores no facebook',
        'quanto custam seguidores no facebook',
        'precisa de acesso de administrador',
        'funciona com perfil pessoal',
        'por que os seguidores caem',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'seguidores no Facebook',
      tail: 'para uma Página que passa confiança',
    },
    subtitle: 'Muita gente olha a Página do Facebook de um negócio antes de ligar, reservar ou ir até lá. Tenha um número de seguidores que transmite confiança. A partir de {fromPrice}, só com o link da Página.',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Pacotes e preços de seguidores no Facebook',
    intro: 'Escolha um pacote. Preços em USD.',
    summaryName: '{quantity} seguidores no Facebook',
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
      highlight: 'seguidores no Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Só um link, sem acesso de administrador',
        body: 'Precisamos só do link público da sua Página ou perfil. Sem senha, sem função de administrador e sem acesso à sua conta.',
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
        icon: 'users',
        tone: 'pink',
        title: 'Páginas e perfis públicos',
        body: 'Funciona com Páginas do Facebook e com perfis pessoais que têm “Quem pode me seguir” em Público. Sem acesso de administrador.',
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
      highlight: 'seguidores no Facebook',
    },
    pill: 'Cerca de 2 minutos',
    intro: 'Pedir leva cinco passos curtos e cerca de dois minutos. Só precisamos do link público da sua Página ou perfil.',
    items: [
      {
        ui: 'public',
        title: 'Permita que sigam você',
        body: 'Mantenha a Página publicada. Em um perfil pessoal, coloque “Quem pode me seguir” em Público em “Seguidores e conteúdo público”.',
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
        title: 'Cole o link da sua Página',
        body: 'Copie o link da sua Página ou perfil, por exemplo facebook.com/suapagina, e cole no pagamento.',
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
      highlight: 'seguidores no Facebook',
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
    title: 'Reposição e garantia de reembolso para seguidores no Facebook',
    intro: 'As duas promessas estão na nossa política de reembolso, não só nesta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposição',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Se os seguidores do seu pedido caírem nos 6 meses após a data de entrega, fale com a gente pelo WhatsApp ou e-mail com o número do pedido e repomos a diferença sem custo. Mantenha a mesma URL da Página e a Página pública enquanto a reposição é entregue.',
      },
      {
        chip: '30 dias',
        title: 'Garantia de reembolso de 30 dias',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Pedidos elegíveis podem ser reembolsados em até 30 dias após a compra. A política de reembolso explica o que é elegível e como solicitar.',
      },
    ],
    link: {
      label: 'Ler a política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: 'Quanto custam os',
      highlight: 'seguidores no Facebook?',
    },
    intro: 'Os seguidores começam em {fromPrice} por 100, e o preço por 1.000 cai conforme o pacote aumenta. Cada preço é um pagamento único em dólares americanos para uma Página ou perfil.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: 'Por que as pessoas compram',
      highlight: 'seguidores no Facebook?',
    },
    intro: 'O Facebook ainda é onde muita gente confere horários, novidades e negócios do bairro. Um bom número de seguidores faz sua Página parecer ativa à primeira vista.',
    items: [
      {
        title: 'Uma Página que parece aberta',
        body: 'Uma Página com 60 seguidores pode parecer abandonada mesmo quando o negócio vai bem.',
      },
      {
        title: 'Confiança antes da primeira ligação',
        body: 'Prestadores de serviço, clínicas e salões são checados no Facebook antes de alguém entrar em contato.',
      },
      {
        title: 'Um empurrão para Páginas novas',
        body: 'Negócios novos, segundas unidades e mudanças de marca não começam do zero.',
      },
    ],
    diagram: [
      'Parece aberta',
      'Confiança',
      'Página nova',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: 'Vale a pena comprar',
      highlight: 'seguidores no Facebook?',
    },
    intro: 'Seguidores mudam o número da sua Página ou perfil. Sozinhos, não mudam quem vê seus posts.',
    no: {
      title: 'O que não muda',
      items: [
        'Reações ou comentários nos seus posts',
        'Seu alcance orgânico por si só',
        'Contatos sem posts úteis e dados de contato claros',
      ],
    },
    yes: {
      title: 'O que muda',
      items: [
        'O número de seguidores da sua Página ou perfil',
        'O quanto a Página parece estabelecida para novos visitantes',
        'A primeira impressão antes de uma ligação ou reserva',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Ilustração: seguidores no Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quem compra',
      highlight: 'seguidores no Facebook',
    },
    cards: [
      {
        title: 'Prestadores de serviço',
        body: 'Encanadores, eletricistas e construtoras adicionam seguidores para a Página parecer tão confiável quanto o trabalho deles.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Serviços locais',
        body: 'Clínicas, pet shops e autoescolas fazem a Página crescer antes de uma oferta ou da abertura de novos horários.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Associações e grupos',
        body: 'Clubes, feiras e associações adicionam seguidores para a Página parecer ativa para novos membros.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Seja qual for a Página, o pedido funciona do mesmo jeito: um link público, um pacote adequado e seguidores que costumam começar em 6–8 horas. Sem acesso de administrador nem senha.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Seguidores no Facebook x',
      highlight: 'curtidas na Página e em posts',
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
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de uma Página ou perfil',
        needs: 'Um link para a Página ou perfil',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Curtidas na Página',
        changes: 'As curtidas de uma Página no formato clássico',
        needs: 'Um link para a Página',
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
      highlight: 'seguidores no Facebook?',
    },
    lead: 'Depende de três coisas: sua conta, seu pagamento e sua privacidade. Veja como cada uma funciona na NovaLikes, além do único risco que nenhum vendedor consegue eliminar.',
    body: 'Os Padrões da Comunidade do Facebook proíbem comportamento não autêntico, e a Meta remove com frequência contas falsas ou inativas. Por isso pode haver uma pequena queda após a entrega, e por isso todo pedido inclui 6 meses de reposição. Entrega gradual e posts regulares mantêm um crescimento natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Segurança da conta',
        body: 'Precisamos só do link público da sua Página ou perfil, então ninguém faz login e não é preciso permissão de administrador. Nunca pedimos senha nem código de acesso. Se alguém dizendo ser da NovaLikes pedir, não somos nós.',
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
      highlight: 'seguidores no Facebook',
    },
    lead: 'Confira estes quatro pontos uma vez e seu pedido vai correr bem.',
    items: [
      {
        title: 'Dá para seguir',
        body: 'A Página precisa estar publicada, ou o perfil precisa aceitar seguidores públicos.',
      },
      {
        title: 'O link está certo',
        body: 'Copie o link da Página ou perfil, por exemplo facebook.com/suapagina, e não o de um post.',
      },
      {
        title: 'A URL não muda',
        body: 'Mantenha o mesmo endereço durante a entrega e os 6 meses de reposição.',
      },
      {
        title: 'O tamanho combina',
        body: 'Escolha um pacote que pareça natural ao lado dos seus seguidores atuais e do que você posta.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Dúvidas antes de pedir?',
    title: 'Perguntas frequentes sobre seguidores no Facebook',
    intro: 'Não encontrou sua resposta? Fale com a gente no WhatsApp pelo +44 7454 758272, 24/7.',
    cta: 'Pergunte no WhatsApp',
    locale: {
      code: 'pt-br',
    },
    extra: [
      {
        id: 'pt-fb-followers-v2-1',
        question: 'Vocês precisam de acesso de administrador à minha Página?',
        answer: 'Não. Só precisamos do link público. Não dê a ninguém acesso de administrador nem a sua senha do Facebook para conseguir seguidores.',
      },
      {
        id: 'pt-fb-followers-v2-2',
        question: 'Posso pedir reembolso?',
        answer: 'Pedidos elegíveis têm a nossa garantia de reembolso de 30 dias, contados a partir da data da compra. A política de reembolso explica quais pedidos são elegíveis e como enviar a solicitação.',
      },
      {
        id: 'pt-fb-followers-v2-3',
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
        slug: 'buy-facebook-page-likes',
        title: 'Comprar curtidas para Página do Facebook',
        line: 'Para Páginas com número de curtidas',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
