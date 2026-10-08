import { ASSETS_CONFIG } from '../config/assets.config';

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  views?: string;
  excerpt?: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'opera-browser-dark-mode',
    title: 'O navegador Opera permite aplicar o Modo Escuro às páginas da Web.',
    category: 'MAÇÃ',
    author: 'Dicas de blog da Sora',
    date: '30 de julho de 2020',
    image: ASSETS_CONFIG.placeholders.hero,
    views: '15.4k visualizações',
    excerpt: 'Descubra como o novo recurso do navegador Opera transforma qualquer página com modo escuro automático e economia de bateria.',
  },
  {
    id: '11-best-laptops-budget',
    title: '11 dos melhores laptops avaliados com base no orçamento',
    category: 'MAÇÃ',
    author: 'Dicas de blog da Sora',
    date: '30 de julho de 2020',
    image: ASSETS_CONFIG.placeholders.sub1,
    views: '8.3k visualizações',
    excerpt: 'Guia completo com os melhores computadores portáteis avaliados para produtividade, estudo e desenvolvimento em diversas faixas de preço.',
  },
  {
    id: '18-practices-responsive-web-apps',
    title: 'As 18 práticas para criar aplicativos web responsivos',
    category: 'MAÇÃ',
    author: 'Dev Tech',
    date: '30 de julho de 2020',
    image: ASSETS_CONFIG.placeholders.sub2,
    views: '9.8k visualizações',
    excerpt: 'Boas práticas fundamentais de CSS moderno, layout fluido, mobile first e performance para aplicações web modernas.',
  },
  {
    id: '10-tips-buy-best-phone',
    title: '10 dicas para você comprar o melhor celular agora mesmo.',
    category: 'ANDROID',
    author: 'Osvaldo José',
    date: '30 de julho de 2020',
    image: ASSETS_CONFIG.placeholders.sub3,
    views: '11.2k visualizações',
    excerpt: 'O que analisar antes de adquirir um novo smartphone: câmeras, processamento, longevidade de atualizações e bateria.',
  },
  {
    id: 'apple-macbook-pro-best-consumer',
    title: 'O MacBook Pro da Apple é o melhor até agora, segundo o consumidor.',
    category: 'MAÇÃ',
    author: 'Backend Team',
    date: '30 de julho de 2020',
    image: ASSETS_CONFIG.placeholders.sub4 || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    views: '12.1k visualizações',
    excerpt: 'Análise técnica de desempenho térmico e autonomia de bateria no modelo mais elogiado pelos profissionais de tecnologia.',
  },
  {
    id: '10-awesome-things-ps4',
    title: '10 coisas incríveis para experimentar no seu PS4 agora mesmo',
    category: 'ANDROID',
    author: 'Dicas de blog da Sora',
    date: '30 de julho de 2020',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80',
    views: '14.8k visualizações',
    excerpt: 'Descubra os melhores recursos, truques e configurações escondidas no seu PlayStation 4.',
  },
  {
    id: 'current-trends-tablet-applications',
    title: 'Tendências atuais e perspectivas futuras para aplicativos em tablets',
    category: 'MAÇÃ',
    author: 'Dev Tech',
    date: '30 de julho de 2020',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    views: '6.7k visualizações',
    excerpt: 'Como o ecossistema de produtividade em tablets está convergindo com desktops com suporte a multitarefa e canetas óticas.',
  },
  {
    id: 'apple-jul-announcement-macbooks',
    title: 'Anúncio de julho da Apple: que atualização para os MacBooks',
    category: 'MAÇÃ',
    author: 'Dicas de blog da Sora',
    date: '30 de julho de 2020',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    views: '7.9k visualizações',
    excerpt: 'Detalhes dos novos anúncios para a linha de notebooks da Apple com melhorias de eficiência e novos chips de processamento.',
  },
  {
    id: 'm4-max-performance-tests',
    title: 'Novo review: testes de performance do chip M4 Max surpreendem desenvolvedores',
    category: 'Hardware & IA',
    author: 'Osvaldo José',
    date: 'há 12m',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    views: '4.2k visualizações',
    excerpt: 'Testes de compilação de código e renderização demonstram saltos notáveis de performance por watt nos chips mais recentes.',
  },
  {
    id: 'vite-6-released',
    title: 'Vite 6 lançado com suporte ampliado para módulos ESM e build ultraveloz',
    category: 'Desenvolvimento Web',
    author: 'Dev Tech',
    date: 'há 1h',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    views: '5.8k visualizações',
    excerpt: 'A ferramenta de build mais popular do ecossistema JavaScript ganha nova arquitetura com suporte ainda mais robusto ao ecossistema.',
  },
  {
    id: 'supabase-integration-serverless',
    title: 'Supabase lança integração aprimorada para rotas e segurança serverless',
    category: 'Segurança & Cloud',
    author: 'Backend Team',
    date: 'há 3h',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    views: '3.9k visualizações',
    excerpt: 'Novas diretrizes para controle de acesso granular e sincronização em tempo real facilitam construção de arquiteturas seguras.',
  },
];

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return ARTICLES_DATA.find((a) => a.id.toLowerCase() === cleanSlug);
}

export function getArticlesByCategory(categorySlug: string): { categoryName: string; articles: Article[] } {
  const cleanSlug = slugify(categorySlug);
  
  // Mapeamento semântico amigável
  const categoryMap: Record<string, { name: string; filter: (a: Article) => boolean }> = {
    startups: {
      name: 'Startups',
      filter: (a) => a.id.includes('vite') || a.id.includes('supabase') || a.category.toLowerCase().includes('web') || a.category.toLowerCase().includes('cloud') || true,
    },
    noticias: {
      name: 'Notícias',
      filter: (a) => a.id.includes('apple') || a.id.includes('m4') || a.id.includes('opera') || true,
    },
    eventos: {
      name: 'Eventos',
      filter: (a) => a.id.includes('announcement') || a.id.includes('released') || true,
    },
    artigos: {
      name: 'Artigos',
      filter: (a) => true,
    },
    mundo: {
      name: 'Mundo',
      filter: (a) => true,
    },
    'desenvolvimento-web': {
      name: 'Desenvolvimento Web',
      filter: (a) => slugify(a.category).includes('desenvolvimento') || slugify(a.category).includes('web') || a.id.includes('web') || a.id.includes('vite'),
    },
    'inteligencia-artificial': {
      name: 'Inteligência Artificial',
      filter: (a) => slugify(a.category).includes('ia') || slugify(a.category).includes('artificial') || a.id.includes('ia') || a.id.includes('m4'),
    },
    'hardware-macbooks': {
      name: 'Hardware & MacBooks',
      filter: (a) => slugify(a.category).includes('maca') || slugify(a.category).includes('hardware') || a.id.includes('macbook') || a.id.includes('m4'),
    },
    'games-emuladores': {
      name: 'Games & Emuladores',
      filter: (a) => slugify(a.category).includes('android') || a.id.includes('ps4'),
    },
    'seguranca-cloud': {
      name: 'Segurança & Cloud',
      filter: (a) => slugify(a.category).includes('seguranca') || slugify(a.category).includes('cloud') || a.id.includes('supabase'),
    },
    maca: {
      name: 'Apple',
      filter: (a) => slugify(a.category) === 'maca' || a.id.includes('apple') || a.id.includes('macbook'),
    },
    android: {
      name: 'Android',
      filter: (a) => slugify(a.category) === 'android' || a.id.includes('phone') || a.id.includes('ps4'),
    },
  };

  const matchedConfig = categoryMap[cleanSlug];
  if (matchedConfig) {
    const list = ARTICLES_DATA.filter(matchedConfig.filter);
    return {
      categoryName: matchedConfig.name,
      articles: list.length > 0 ? list : ARTICLES_DATA,
    };
  }

  // Busca genérica por categoria
  const matchedArticles = ARTICLES_DATA.filter(
    (a) => slugify(a.category) === cleanSlug || slugify(a.category).includes(cleanSlug)
  );

  const formattedName = categorySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    categoryName: formattedName,
    articles: matchedArticles.length > 0 ? matchedArticles : ARTICLES_DATA.slice(0, 6),
  };
}

export function getArticlesByAuthor(authorSlug: string): { authorName: string; articles: Article[] } {
  const cleanSlug = slugify(authorSlug);
  const matched = ARTICLES_DATA.filter((a) => slugify(a.author) === cleanSlug);
  const foundAuthorName = matched[0]?.author || authorSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    authorName: foundAuthorName,
    articles: matched.length > 0 ? matched : ARTICLES_DATA.slice(0, 4),
  };
}

/**
 * Retorna artigos relacionados com prioridade temática real:
 * 1. Mesma categoria semântica / slug
 * 2. Mesmo autor
 * 3. Artigos recentes do portal (fallback sem duplicar o artigo atual)
 */
export function getRelatedArticles(currentArticleId: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentArticleId);
  if (!current) return ARTICLES_DATA.slice(0, limit);

  const cleanCategory = slugify(current.category);
  const cleanAuthor = slugify(current.author);

  const sameCategory = ARTICLES_DATA.filter(
    (a) => a.id !== current.id && slugify(a.category) === cleanCategory
  );

  const sameAuthor = ARTICLES_DATA.filter(
    (a) => a.id !== current.id && slugify(a.author) === cleanAuthor && !sameCategory.some((item) => item.id === a.id)
  );

  const fallback = ARTICLES_DATA.filter(
    (a) => a.id !== current.id && !sameCategory.some((item) => item.id === a.id) && !sameAuthor.some((item) => item.id === a.id)
  );

  return [...sameCategory, ...sameAuthor, ...fallback].slice(0, limit);
}

/**
 * Retorna os artigos anterior e seguinte na ordem cronológica/editorial da lista.
 */
export function getNextPreviousArticles(currentArticleId: string): {
  previousArticle?: Article;
  nextArticle?: Article;
} {
  const index = ARTICLES_DATA.findIndex((a) => a.id.toLowerCase() === currentArticleId.toLowerCase().trim());
  if (index === -1) return {};

  return {
    previousArticle: index > 0 ? ARTICLES_DATA[index - 1] : undefined,
    nextArticle: index < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[index + 1] : undefined,
  };
}


