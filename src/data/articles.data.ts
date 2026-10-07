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
