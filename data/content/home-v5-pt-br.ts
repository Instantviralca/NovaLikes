/**
 * Brazilian Portuguese homepage (/pt-br) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to the Portuguese service routes.
 * getStarted.guides is intentionally empty (Learn is English-only): hide that group when it has no links.
 */

export const HOME_V5_PT_BR = {
  hero: {
    eyebrow: 'Crescimento nas redes sociais',
    title: {
      lead: 'Comprar seguidores, curtidas e visualizações no',
      highlight: 'Instagram & TikTok',
      tail: '',
    },
    subtitle: 'Escolha a plataforma e o serviço, adicione seu usuário público ou o link de um post e pague em USD. Sem senha, a maioria dos pedidos começa em 6–8 horas e todo pedido inclui 6 meses de reposição.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Seguidores',
            line: 'Faça seu perfil crescer',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Curtidas',
            line: 'Para posts e Reels',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Visualizações',
            line: 'Para Reels e vídeos',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Comentários',
            line: 'Comece a conversa',
            icon: 'message-circle',
          },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          {
            slug: 'buy-tiktok-followers',
            title: 'Seguidores',
            line: 'Faça seu perfil crescer',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Curtidas',
            line: 'Para um vídeo',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Visualizações',
            line: 'Para um vídeo',
            icon: 'eye',
          },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          {
            slug: 'buy-facebook-followers',
            title: 'Seguidores',
            line: 'Para Páginas e perfis',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Curtidas na Página',
            line: 'Para Páginas com curtidas',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Curtidas em post',
            line: 'Para um post público',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'A partir de {fromPrice}',
    trust: [
      'Sem senha',
      'Começa em 6–8 horas',
      '6 meses de reposição',
      'Suporte no WhatsApp 24/7',
      'Preços em USD',
    ],
  },
  marquee: [
    'Nunca pedimos senha',
    'Começa em 6–8 horas',
    '6 meses de reposição em todo pedido',
    'Suporte no WhatsApp 24/7',
    'Preços em USD',
    'Acompanhe qualquer pedido',
    'Entrega gradual se você pedir',
    'Pagamento seguro com cartão',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'Serviços da',
      highlight: 'NovaLikes',
    },
    body: 'A NovaLikes oferece seguidores, curtidas, visualizações e comentários para Instagram e TikTok, além de alguns serviços para Facebook. Você escolhe um pacote, adiciona um usuário ou link público e paga em dólares americanos. Nunca pedimos sua senha, a maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois, e todo pedido inclui 6 meses de reposição.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Por que os números do',
        highlight: 'seu perfil importam',
      },
      body: 'Quem vê seu perfil ou um post pela primeira vez decide rápido se vai ficar. O número de seguidores e as curtidas de um post estão entre as primeiras coisas que as pessoas olham, bem antes de ler uma legenda.',
      callout: 'Números baixos fazem um bom conteúdo parecer ignorado, mesmo quando não é. É essa diferença que um pacote tenta fechar.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Dê ao seu melhor conteúdo um',
        highlight: 'começo mais forte',
      },
      body: 'Um pacote muda o número que as pessoas veem primeiro, para uma conta nova, um lançamento ou o seu melhor Reel não começarem do zero. O que vem depois continua dependendo do conteúdo: Instagram e TikTok decidem pela forma como as pessoas assistem e reagem.',
      callout: 'Use um pacote para apoiar um conteúdo de que você já se orgulha, não para substituí-lo.',
      visual: 'growth',
    },
  ],
  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      metric: 'followers',
      title: {
        lead: 'Comprar',
        highlight: 'seguidores no Instagram',
      },
      intro: 'Aumente o número de seguidores de uma conta pública do Instagram, o primeiro número que os visitantes olham no seu perfil.',
      bullets: [
        "Só o usuário público, nunca a senha",
        "Volte para o privado quando a entrega terminar",
        "Entrega gradual para um crescimento mais constante",
        "Acompanhe pelo número do pedido"
      ],
      cta: 'Comprar seguidores no Instagram',
      why: {
        q: 'Por que os seguidores no Instagram importam?',
        a: 'O número de seguidores fica no topo do seu perfil, ao lado do nome. Os novos visitantes usam esse número, junto com seus posts, para avaliar se uma conta está ativa e vale a pena seguir. Um número muito baixo ao lado de um bom conteúdo pode fazer uma conta nova ou renomeada parecer abandonada. Mas seguidores sozinhos não trazem mais alcance: isso continua dependendo de como as pessoas reagem a cada post.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Só do seu usuário público do Instagram. Mantenha a conta pública e o mesmo usuário até a entrega e qualquer reposição terminarem. Escolha um pacote que pareça natural ao lado dos seus seguidores atuais.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: 'Comprar',
        highlight: 'curtidas no Instagram',
      },
      intro: 'Adicione curtidas a uma foto, carrossel ou Reel público. As curtidas ficam logo abaixo do post e são o sinal mais rápido para quem vê pela primeira vez.',
      bullets: [
        "Fotos, carrosséis e Reels",
        "Um post por pedido, cole o link dele",
        "Ideal para lançamentos, ofertas e posts fixados",
        "Escolha um tamanho que combine com o alcance do post"
      ],
      cta: 'Comprar curtidas no Instagram',
      why: {
        q: 'Por que as curtidas no Instagram importam?',
        a: 'As curtidas são a primeira reação que as pessoas veem em um post, antes da legenda e dos comentários. Um post com um bom número de curtidas parece algo de que outras pessoas já gostaram. As curtidas vão para um único post, então combinam com aqueles que você quer destacar: um lançamento, uma oferta, uma parceria ou um conteúdo fixado.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do link público de um post ou Reel. Cada pedido vai só para esse post. Para vários posts, faça um pedido para cada um.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: 'Comprar',
        highlight: 'visualizações no Instagram',
      },
      intro: 'Aumente as visualizações de um Reel ou vídeo público, para um conteúdo novo parecer valer o play quando você compartilha o link.',
      bullets: [
        "Reels e posts em vídeo",
        "Um link de Reel, sem senha",
        "Pacotes maiores baixam o preço por 1.000",
        "Combine com curtidas para números naturais"
      ],
      cta: 'Comprar visualizações no Instagram',
      why: {
        q: 'Por que as visualizações no Instagram importam?',
        a: 'O Instagram mostra as visualizações nos Reels, e muita gente olha esse número antes de decidir se vai assistir. Um Reel novo com pouquíssimas visualizações pode parecer ignorado, mesmo sendo bom. As visualizações mudam só o número daquele vídeo. Curtidas, comentários e novos seguidores continuam dependendo do conteúdo.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do link público do Reel ou vídeo. Mantenha público até a entrega terminar e peça entrega gradual se preferir.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: 'Comprar',
        highlight: 'comentários no Instagram',
      },
      intro: 'Adicione comentários a um post ou Reel público para ele parecer ativo e convidar outras pessoas a participar.',
      bullets: [
        "Comentários High Quality ou Premium",
        "Envie seus próprios comentários, um por linha",
        "Em português ou outro idioma, se pedir",
        "Cole o link do post, sem login"
      ],
      cta: 'Comprar comentários no Instagram',
      why: {
        q: 'Por que os comentários no Instagram importam?',
        a: 'Comentários mostram que as pessoas não só rolaram a tela, mas disseram alguma coisa. Um post com alguns comentários convida outras pessoas a responder, enquanto uma seção vazia deixa até um post popular com cara de parado. Comentários Premium são escritos para o seu post e soam naturais.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do link público do post ou Reel. Escolha High Quality ou Premium na página do serviço e escreva seus próprios comentários ou um idioma, como português, na observação do pedido.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: 'Comprar',
        highlight: 'seguidores no TikTok',
      },
      intro: 'Aumente o número de seguidores de uma conta pública do TikTok. Novos espectadores olham esse número no seu perfil antes de seguir.',
      bullets: [
        "Usuário sem o @, sem senha",
        "Volte para o privado quando a entrega terminar",
        "Entrega gradual se você pedir",
        "Não dá acesso ao Creator Rewards"
      ],
      cta: 'Comprar seguidores no TikTok',
      why: {
        q: 'Por que os seguidores no TikTok importam?',
        a: 'No TikTok as pessoas costumam descobrir você por um vídeo e depois tocam no seu perfil. O número de seguidores é uma das primeiras coisas que elas veem ali. Um perfil com pouquíssimos seguidores ao lado de bons vídeos pode parecer novo demais ou inativo. Seguidores não decidem o que o TikTok recomenda: a página Para Você depende de como cada vídeo é assistido.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do seu usuário público do TikTok. Mantenha a conta pública e o mesmo usuário até a entrega e qualquer reposição terminarem.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: 'Comprar',
        highlight: 'curtidas no TikTok',
      },
      intro: 'Adicione curtidas a um vídeo público do TikTok, como um lançamento de produto, uma parceria ou o seu melhor clipe.',
      bullets: [
        "Um vídeo público por pedido",
        "Cole o link do vídeo, sem login",
        "Mantenha as curtidas de acordo com as visualizações",
        "Ideal para clipes fixados, lançamentos e parcerias"
      ],
      cta: 'Comprar curtidas no TikTok',
      why: {
        q: 'Por que as curtidas no TikTok importam?',
        a: 'O número de corações aparece à direita de cada vídeo do TikTok, então as pessoas veem enquanto ele roda. Um vídeo que você compartilha fora do TikTok ou fixa no perfil parece mais forte quando as curtidas acompanham as visualizações. As curtidas vão só para aquele vídeo.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do link público do vídeo. As curtidas vão só para esse vídeo. Para vários vídeos, faça um pedido por link.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: 'Comprar',
        highlight: 'visualizações no TikTok',
      },
      intro: 'Aumente as visualizações de um vídeo público do TikTok. Um número baixo pode fazer um bom vídeo parecer ignorado, principalmente se for novo.',
      bullets: [
        "Visualizações High Quality ou Premium",
        "Um link de vídeo, sem login",
        "High Quality tem o menor preço por 1.000",
        "Visualizações não geram dinheiro no Creator Rewards"
      ],
      cta: 'Comprar visualizações no TikTok',
      why: {
        q: 'Por que as visualizações no TikTok importam?',
        a: 'O TikTok mostra as visualizações embaixo de cada vídeo na grade do seu perfil. Uma grade com números baixos pode fazer a conta parecer inativa. Visualizações não levam um vídeo para o Para Você: quem decide é o TikTok, pela forma como as pessoas assistem e reagem.',
      },
      how: {
        q: 'Do que você precisa para pedir?',
        a: 'Do link público do vídeo. Escolha High Quality ou Premium na página do serviço e mantenha o vídeo público até a entrega terminar.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Por que a',
      highlight: 'NovaLikes?',
    },
    intro: 'Muitos sites vendem seguidores e curtidas. Veja o que você pode esperar da gente.',
    items: [
      {
        title: 'Respostas claras antes da compra',
        icon: 'badge-check',
        body: 'Cada página de serviço diz exatamente o que um pacote muda e o que não muda. Também avisamos quando outro serviço combina mais com você, por exemplo seguidores no Facebook em vez de curtidas na Página.',
      },
      {
        title: 'Uma empresa real e fácil de contatar',
        icon: 'building',
        body: 'A NovaLikes é operada pela DMRUSH LIMITED, empresa registrada na Escócia (nº SC876437). A equipe cuida de pedidos para redes sociais há 7–8 anos, primeiro como ViralMe e agora como NovaLikes, e responde no WhatsApp (+44 7454 758272) a qualquer hora.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Nossas',
      highlight: 'promessas',
    },
    intro: 'Estas quatro promessas valem para todo pedido de Instagram, TikTok e Facebook.',
    items: [
      {
        key: 'password',
        title: 'Nunca pedimos senha',
        body: 'Só precisamos de um usuário ou link público. Se qualquer site pedir seus dados de acesso, não confie sua conta a ele.',
        icon: 'shield',
        chip: 'Só link público',
      },
      {
        key: 'speed',
        title: 'Começa em 6–8 horas',
        body: 'A maioria dos pedidos começa em 6–8 horas após o pagamento e termina 4–6 horas depois do início. Prefere um ritmo mais lento? Peça entrega gradual na observação do pedido.',
        icon: 'clock',
        chip: '6–8 horas',
      },
      {
        key: 'refill',
        title: '6 meses de reposição',
        body: 'Se o número cair nos 6 meses após a entrega, mande o número do pedido pelo WhatsApp e repomos. Mantenha o perfil ou o post público durante a reposição.',
        icon: 'refresh-cw',
        chip: '6 meses',
      },
      {
        key: 'support',
        title: 'Suporte no WhatsApp 24/7',
        body: 'Mande mensagem para +44 7454 758272, antes ou depois do pedido. Você também pode acompanhar qualquer pedido na página “Acompanhar pedido” ou na sua conta gratuita.',
        icon: 'message-circle',
        chip: '24/7',
      },
    ],
  },
  faq: {
    id: 'before-you-buy',
    title: {
      lead: 'Antes de',
      highlight: 'comprar',
    },
    intro: 'As dúvidas mais comuns antes do primeiro pedido.',
    items: [
      {
        question: 'Por qual serviço devo começar?',
        answer: 'Pelo número que os visitantes veem primeiro. Se o seu perfil parece vazio, comece pelos seguidores. Para um post ou vídeo que você está divulgando, curtidas ou visualizações nesse post.',
      },
      {
        question: 'Vocês precisam da minha senha do Instagram ou do TikTok?',
        answer: 'Não. Para seguidores precisamos do seu usuário público; para curtidas, visualizações e comentários, do link público do post ou vídeo. Nunca dê sua senha a um serviço de crescimento.',
      },
      {
        question: 'Minha conta precisa ser pública?',
        answer: 'Sim, durante a entrega. Uma conta ou post privado pode travar a entrega. Depois você pode voltar para o privado.',
      },
      {
        question: 'Quando meu pedido começa?',
        answer: 'A maioria dos pedidos começa em 6–8 horas após a confirmação do pagamento e termina 4–6 horas depois do início. Para um ritmo mais lento, peça entrega gradual na observação do pedido ou pelo WhatsApp.',
      },
      {
        question: 'E se os números caírem?',
        answer: 'Todo pedido inclui 6 meses de reposição a partir da data de entrega. Fale com a gente no WhatsApp (+44 7454 758272) com o número do pedido e repomos.',
      },
      {
        question: 'Isso pode prejudicar minha conta?',
        answer: 'As regras do Instagram e do TikTok não permitem comprar interações, e as duas plataformas podem remover atividades que consideram não autênticas. A NovaLikes nunca pede sua senha, mas nenhum fornecedor controla como uma plataforma trata uma conta. Leia as regras da plataforma antes de pedir.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Comece',
      highlight: 'agora',
    },
    body: 'Escolha uma plataforma abaixo. Cada página de serviço mostra os pacotes, o preço em dólares americanos e exatamente do que você precisa para pedir.',
    tools: {
      title: 'Ferramentas grátis',
      links: [
        {
          label: 'Contador de seguidores do Instagram',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Visualizador de perfil do Instagram',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Visualizador de foto de perfil do Instagram',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'Downloader de vídeos do TikTok',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Downloader de vídeos do Facebook',
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
    label: 'Escolher serviço',
    href: '#homepage-hero',
  },
} as const;
