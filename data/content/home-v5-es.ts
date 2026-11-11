/**
 * Spanish homepage (/es) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to the Spanish service routes.
 * getStarted.guides is intentionally empty (Learn is English-only): hide that group when it has no links.
 */

export const HOME_V5_ES = {
  hero: {
    eyebrow: 'Crecimiento en redes sociales',
    title: {
      lead: 'Comprar seguidores, likes y visualizaciones para',
      highlight: 'Instagram & TikTok',
      tail: '',
    },
    subtitle: 'Elige plataforma y servicio, añade tu usuario público o el enlace de una publicación y paga en USD. Sin contraseña, la mayoría de los pedidos empiezan en 6–8 horas y cada pedido incluye 6 meses de reposición.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Seguidores',
            line: 'Haz crecer tu perfil',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Likes',
            line: 'Para publicaciones y Reels',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Visualizaciones',
            line: 'Para Reels y vídeos',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Comentarios',
            line: 'Inicia la conversación',
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
            line: 'Haz crecer tu perfil',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Likes',
            line: 'Para un vídeo',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Visualizaciones',
            line: 'Para un vídeo',
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
            line: 'Para Páginas y perfiles',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Likes de Página',
            line: 'Para Páginas con número de likes',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Likes de publicación',
            line: 'Para una publicación pública',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'Desde {fromPrice}',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
      'Soporte por WhatsApp 24/7',
      'Precios en USD',
    ],
  },
  marquee: [
    'Nunca una contraseña',
    'Empieza en 6–8 horas',
    '6 meses de reposición en cada pedido',
    'Soporte por WhatsApp 24/7',
    'Precios en USD',
    'Sigue cualquier pedido',
    'Entrega gradual si la pides',
    'Pago seguro con tarjeta',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'Servicios de',
      highlight: 'NovaLikes',
    },
    body: 'NovaLikes ofrece seguidores, likes, visualizaciones y comentarios para Instagram y TikTok, además de algunos servicios de Facebook. Eliges un paquete, añades un usuario o enlace público y pagas en dólares estadounidenses. Nunca pedimos tu contraseña, la mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después, y cada pedido incluye 6 meses de reposición.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Por qué importan los números de',
        highlight: 'tu perfil',
      },
      body: 'Quien ve tu perfil o una publicación por primera vez decide rápido si se queda. El número de seguidores y los likes de una publicación están entre lo primero que mira la gente, mucho antes de leer un texto.',
      callout: 'Unos números bajos hacen que un buen contenido parezca ignorado, aunque no lo esté. Ese hueco es el que un paquete intenta cerrar.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Dale a tu mejor contenido un',
        highlight: 'mejor arranque',
      },
      body: 'Un paquete cambia el número que la gente ve primero, para que una cuenta nueva, un lanzamiento o tu mejor Reel no empiecen desde cero. Lo que pase después sigue dependiendo del contenido: Instagram y TikTok deciden según cómo mira y reacciona la gente.',
      callout: 'Usa un paquete para apoyar contenido del que ya estás orgulloso, no para sustituirlo.',
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
        highlight: 'seguidores de Instagram',
      },
      intro: 'Aumenta el número de seguidores de una cuenta pública de Instagram, la primera cifra que los visitantes miran en tu perfil.',
      bullets: [
        "Solo tu usuario público, nunca tu contraseña",
        "Vuelve a privado cuando termine la entrega",
        "Entrega gradual para un crecimiento más estable",
        "Sigue el progreso con tu número de pedido"
      ],
      cta: 'Comprar seguidores de Instagram',
      why: {
        q: '¿Por qué importan los seguidores de Instagram?',
        a: 'El número de seguidores está arriba en tu perfil, junto a tu nombre. Los nuevos visitantes lo usan, junto a tus publicaciones, para decidir si una cuenta está activa y merece la pena seguirla. Un número muy bajo junto a buen contenido puede hacer que una cuenta nueva o renombrada parezca abandonada. Pero los seguidores por sí solos no traen más alcance: eso sigue dependiendo de cómo reacciona la gente a cada publicación.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'Solo tu usuario público de Instagram. Mantén la cuenta pública y el mismo usuario hasta que terminen la entrega y cualquier reposición. Elige un paquete que se vea natural junto a tus seguidores actuales.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: 'Comprar',
        highlight: 'likes de Instagram',
      },
      intro: 'Añade likes a una foto, carrusel o Reel público. Los likes están justo debajo de la publicación y son la señal más rápida para quien la ve por primera vez.',
      bullets: [
        "Fotos, carruseles y Reels",
        "Una publicación por pedido, pega su enlace",
        "Ideal para lanzamientos, ofertas y publicaciones fijadas",
        "Elige un tamaño acorde al alcance de la publicación"
      ],
      cta: 'Comprar likes de Instagram',
      why: {
        q: '¿Por qué importan los likes de Instagram?',
        a: 'Los likes son la primera reacción que la gente ve en una publicación, antes del texto y los comentarios. Una publicación con un buen número de likes parece algo que ya ha gustado a otros. Los likes van a una sola publicación, así que encajan con las que quieres destacar: un lanzamiento, una oferta, una colaboración o contenido fijado.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'El enlace público de una publicación o Reel. Cada pedido va solo a esa publicación. Para varias publicaciones, haz un pedido por cada una.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: 'Comprar',
        highlight: 'visualizaciones de Instagram',
      },
      intro: 'Aumenta las visualizaciones de un Reel o vídeo público para que una nueva publicación parezca digna de ver cuando compartes el enlace.',
      bullets: [
        "Reels y publicaciones de vídeo",
        "Un enlace de Reel, sin contraseña",
        "Los paquetes grandes bajan el precio por 1.000",
        "Combínalas con likes para que los números se vean naturales"
      ],
      cta: 'Comprar visualizaciones de Instagram',
      why: {
        q: '¿Por qué importan las visualizaciones de Instagram?',
        a: 'Instagram muestra las visualizaciones en los Reels y mucha gente las mira antes de decidir si lo ve. Un Reel nuevo con muy pocas visualizaciones puede parecer ignorado aunque sea bueno. Las visualizaciones solo cambian el número de ese vídeo. Los likes, comentarios y nuevos seguidores siguen dependiendo del contenido.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'El enlace público del Reel o vídeo. Mantenlo público hasta que termine la entrega y pide entrega gradual si la prefieres.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: 'Comprar',
        highlight: 'comentarios de Instagram',
      },
      intro: 'Añade comentarios a una publicación o Reel público para que parezca activo e invite a otros a participar.',
      bullets: [
        "Comentarios High Quality o Premium",
        "Envía tus propios comentarios, uno por línea",
        "En español o en otro idioma si lo pides",
        "Pega el enlace, sin iniciar sesión"
      ],
      cta: 'Comprar comentarios de Instagram',
      why: {
        q: '¿Por qué importan los comentarios de Instagram?',
        a: 'Los comentarios muestran que la gente no solo pasó de largo, sino que dijo algo. Una publicación con algunos comentarios invita a otros a responder, mientras que una sección vacía hace que incluso una publicación popular parezca callada. Los comentarios Premium se escriben para tu publicación y suenan naturales.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'El enlace público de la publicación o Reel. Elige High Quality o Premium en la página del servicio y escribe tus propios comentarios o un idioma, como español, en la nota del pedido.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: 'Comprar',
        highlight: 'seguidores de TikTok',
      },
      intro: 'Aumenta el número de seguidores de una cuenta pública de TikTok. Los nuevos espectadores lo miran en tu perfil antes de seguirte.',
      bullets: [
        "Usuario sin la @, sin contraseña",
        "Vuelve a privado cuando termine la entrega",
        "Entrega gradual si la pides",
        "No da acceso a Creator Rewards"
      ],
      cta: 'Comprar seguidores de TikTok',
      why: {
        q: '¿Por qué importan los seguidores de TikTok?',
        a: 'En TikTok la gente suele descubrirte por un vídeo y luego toca tu perfil. El número de seguidores es de lo primero que ve allí. Un perfil con muy pocos seguidores junto a buenos vídeos puede parecer recién creado o inactivo. Los seguidores no deciden lo que TikTok recomienda: la página Para ti depende de cómo la gente ve cada vídeo.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'Tu usuario público de TikTok. Mantén la cuenta pública y el mismo usuario hasta que terminen la entrega y cualquier reposición.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: 'Comprar',
        highlight: 'likes de TikTok',
      },
      intro: 'Añade likes a un vídeo público de TikTok, como un lanzamiento de producto, una colaboración o tu mejor clip.',
      bullets: [
        "Un vídeo público por pedido",
        "Pega el enlace del vídeo, sin iniciar sesión",
        "Mantén los likes acordes a las visualizaciones",
        "Ideal para clips fijados, lanzamientos y colaboraciones"
      ],
      cta: 'Comprar likes de TikTok',
      why: {
        q: '¿Por qué importan los likes de TikTok?',
        a: 'El número de corazones aparece a la derecha de cada vídeo de TikTok, así que la gente lo ve mientras se reproduce. Un vídeo que compartes fuera de TikTok o fijas en tu perfil se ve más sólido cuando los likes acompañan a las visualizaciones. Los likes solo van a ese vídeo.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'El enlace público del vídeo. Los likes solo van a ese vídeo. Para varios vídeos, haz un pedido por enlace.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: 'Comprar',
        highlight: 'visualizaciones de TikTok',
      },
      intro: 'Aumenta las visualizaciones de un vídeo público de TikTok. Un número bajo puede hacer que un buen vídeo parezca ignorado, sobre todo si es nuevo.',
      bullets: [
        "Visualizaciones High Quality o Premium",
        "Un enlace de vídeo, sin iniciar sesión",
        "High Quality tiene el precio más bajo por 1.000",
        "Las visualizaciones no generan dinero de Creator Rewards"
      ],
      cta: 'Comprar visualizaciones de TikTok',
      why: {
        q: '¿Por qué importan las visualizaciones de TikTok?',
        a: 'TikTok muestra las visualizaciones bajo cada vídeo en la cuadrícula de tu perfil. Una cuadrícula con números bajos puede hacer que una cuenta parezca inactiva. Las visualizaciones no llevan un vídeo a la página Para ti: eso lo decide TikTok según cómo mira y reacciona la gente.',
      },
      how: {
        q: '¿Qué necesitas para pedir?',
        a: 'El enlace público del vídeo. Elige High Quality o Premium en la página del servicio y mantén el vídeo público hasta que termine la entrega.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: '¿Por qué',
      highlight: 'NovaLikes?',
    },
    intro: 'Muchas webs venden seguidores y likes. Esto es lo que puedes esperar de nosotros.',
    items: [
      {
        title: 'Respuestas claras antes de comprar',
        icon: 'badge-check',
        body: 'Cada página de servicio dice exactamente qué cambia un paquete y qué no. También te decimos cuándo te conviene otro servicio, por ejemplo seguidores de Facebook en lugar de likes de Página.',
      },
      {
        title: 'Una empresa real y localizable',
        icon: 'building',
        body: 'NovaLikes es de THE HOUSE OF VEYNOR LTD, una empresa registrada en Inglaterra y Gales (n.º 17561169). El equipo lleva 7–8 años gestionando pedidos de redes sociales, primero como ViralMe y ahora como NovaLikes, y responde por WhatsApp (+44 7454 758272) a cualquier hora.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Nuestras',
      highlight: 'promesas',
    },
    intro: 'Estas cuatro promesas se aplican a cada pedido de Instagram, TikTok y Facebook.',
    items: [
      {
        key: 'password',
        title: 'Nunca una contraseña',
        body: 'Solo necesitamos un usuario o enlace público. Si una web te pide tus datos de acceso, sea la que sea, no le confíes tu cuenta.',
        icon: 'shield',
        chip: 'Solo enlace público',
      },
      {
        key: 'speed',
        title: 'Empieza en 6–8 horas',
        body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. ¿Prefieres un ritmo más lento? Pide entrega gradual en la nota del pedido.',
        icon: 'clock',
        chip: '6–8 horas',
      },
      {
        key: 'refill',
        title: '6 meses de reposición',
        body: 'Si el número baja en los 6 meses posteriores a la entrega, envía tu número de pedido por WhatsApp y lo reponemos. Mantén el perfil o la publicación en público durante la reposición.',
        icon: 'refresh-cw',
        chip: '6 meses',
      },
      {
        key: 'support',
        title: 'Soporte por WhatsApp 24/7',
        body: 'Escribe al +44 7454 758272, antes o después de pedir. También puedes seguir cualquier pedido en la página «Seguir pedido» o en tu cuenta gratuita.',
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
    intro: 'Las preguntas más habituales antes del primer pedido.',
    items: [
      {
        question: '¿Con qué servicio debería empezar?',
        answer: 'Con el número que los visitantes ven primero. Si tu perfil parece vacío, empieza por seguidores. Para una publicación o un vídeo que estás promocionando, likes o visualizaciones en esa publicación.',
      },
      {
        question: '¿Necesitáis mi contraseña de Instagram o TikTok?',
        answer: 'No. Para seguidores necesitamos tu usuario público; para likes, visualizaciones y comentarios, el enlace público de la publicación o el vídeo. No des nunca tu contraseña a un servicio de crecimiento.',
      },
      {
        question: '¿Mi cuenta tiene que ser pública?',
        answer: 'Sí, durante la entrega. Una cuenta o publicación privada puede detener la entrega. Después puedes volver a ponerla en privado.',
      },
      {
        question: '¿Cuándo empieza mi pedido?',
        answer: 'La mayoría de los pedidos empiezan en 6–8 horas tras confirmarse el pago y terminan 4–6 horas después de empezar. Para un ritmo más lento, pide entrega gradual en la nota del pedido o por WhatsApp.',
      },
      {
        question: '¿Qué pasa si bajan los números?',
        answer: 'Cada pedido incluye 6 meses de reposición desde la fecha de entrega. Escríbenos por WhatsApp (+44 7454 758272) con tu número de pedido y lo reponemos.',
      },
      {
        question: '¿Puede perjudicar a mi cuenta?',
        answer: 'Las normas de Instagram y TikTok no permiten comprar interacciones, y ambas plataformas pueden eliminar la actividad que consideran no auténtica. NovaLikes nunca pide tu contraseña, pero ningún proveedor controla cómo trata una plataforma a una cuenta. Lee las normas de la plataforma antes de pedir.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Empieza',
      highlight: 'ahora',
    },
    body: 'Elige una plataforma abajo. Cada página de servicio muestra los paquetes, el precio en dólares estadounidenses y exactamente lo que necesitas para pedir.',
    tools: {
      title: 'Herramientas gratis',
      links: [
        {
          label: 'Contador de seguidores de Instagram',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Visor de perfil de Instagram',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Visor de foto de perfil de Instagram',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'Descargador de vídeos de TikTok',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Descargador de vídeos de Facebook',
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
    label: 'Elegir servicio',
    href: '#homepage-hero',
  },
} as const;
