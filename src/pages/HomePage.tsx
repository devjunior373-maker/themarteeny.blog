import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { useJsonLd, BASE_URL, SITE_NAME, LOGO_URL } from '../hooks/useJsonLd';

export default function HomePage() {
  useDocumentTitle('The Marteeny | Tecnologia, IA, Apps, Games e muito mais');
  useMetaDescription('Notícias, artigos, dicas e conteúdos sobre tecnologia, inteligência artificial, apps, games, ferramentas e inovação no The Marteeny.');
  useCanonical('https://themarteeny.pages.dev/');

  // Dados Estruturados JSON-LD: WebSite com SearchAction
  useJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    description: 'Notícias, artigos, dicas e conteúdos sobre tecnologia, inteligência artificial, apps, games, ferramentas e inovação no The Marteeny.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/pesquisa?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  // Dados Estruturados JSON-LD: Organization
  useJsonLd('organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  });

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* ESPAÇO DE ANÚNCIO DO GOOGLE (Área limpa e preparada, sem texto) */}
      <div className="w-full mb-6 sm:mb-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl min-h-[60px] xs:min-h-[75px] sm:min-h-[90px] md:min-h-[100px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
      </div>

      {/* SECÇÃO DE DESTAQUES (Conforme a Imagem de Referência: Grid 5 Artigos) */}
      <section aria-label="Notícias em Destaque" className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 sm:gap-2 items-stretch">
          
          {/* LADO ESQUERDO: Card Principal Grande (LCP candidate -> eager + fetchpriority="high") */}
          <Link
            to={`/blog/${ARTICLES_DATA[0].id}`}
            className="relative group overflow-hidden h-[260px] xs:h-[320px] sm:h-[400px] lg:h-full min-h-[260px] sm:min-h-[360px] lg:min-h-[462px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs active:scale-[0.99] transition-transform block"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={ARTICLES_DATA[0].image}
                alt={`Imagem de destaque: ${ARTICLES_DATA[0].title}`}
                width={800}
                height={500}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
            </div>

            <div className="relative z-10 p-3.5 sm:p-5 md:p-6 flex flex-col justify-end">
              <div>
                <span className="inline-block bg-[#0080ff] text-white text-[9px] xs:text-[10px] sm:text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide mb-1.5 sm:mb-2 shadow-xs">
                  {ARTICLES_DATA[0].category}
                </span>
              </div>
              <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-white leading-snug group-hover:underline">
                {ARTICLES_DATA[0].title}
              </h2>
              <div className="text-[11px] sm:text-xs text-gray-300 mt-1.5 sm:mt-2 font-normal">
                por <span className="text-gray-200">{ARTICLES_DATA[0].author}</span> - {ARTICLES_DATA[0].date}
              </div>
            </div>
          </Link>

          {/* LADO DIREITO: Grade 2x2 com 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 h-full">
            
            {/* Card 1 (Superior Esquerdo) */}
            <Link
              to={`/blog/${ARTICLES_DATA[1].id}`}
              className="relative group overflow-hidden h-[175px] xs:h-[190px] sm:h-[205px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs active:scale-[0.99] transition-transform block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[1].image}
                  alt={`Destaque: ${ARTICLES_DATA[1].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                    {ARTICLES_DATA[1].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                  {ARTICLES_DATA[1].title}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[1].date}
                </div>
              </div>
            </Link>

            {/* Card 2 (Superior Direito) */}
            <Link
              to={`/blog/${ARTICLES_DATA[2].id}`}
              className="relative group overflow-hidden h-[175px] xs:h-[190px] sm:h-[205px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs active:scale-[0.99] transition-transform block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[2].image}
                  alt={`Destaque: ${ARTICLES_DATA[2].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                    {ARTICLES_DATA[2].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                  {ARTICLES_DATA[2].title}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[2].date}
                </div>
              </div>
            </Link>

            {/* Card 3 (Inferior Esquerdo) */}
            <Link
              to={`/blog/${ARTICLES_DATA[3].id}`}
              className="relative group overflow-hidden h-[175px] xs:h-[190px] sm:h-[205px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs active:scale-[0.99] transition-transform block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[3].image}
                  alt={`Destaque: ${ARTICLES_DATA[3].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                    {ARTICLES_DATA[3].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                  {ARTICLES_DATA[3].title}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[3].date}
                </div>
              </div>
            </Link>

            {/* Card 4 (Inferior Direito) */}
            <Link
              to={`/blog/${ARTICLES_DATA[4].id}`}
              className="relative group overflow-hidden h-[175px] xs:h-[190px] sm:h-[205px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs active:scale-[0.99] transition-transform block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[4].image}
                  alt={`Destaque: ${ARTICLES_DATA[4].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                    {ARTICLES_DATA[4].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                  {ARTICLES_DATA[4].title}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[4].date}
                </div>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* LAYOUT PRINCIPAL: 1 Coluna em Mobile, 2 Colunas em Desktop (lg:grid-cols-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* COLUNA ESQUERDA: Secções de Conteúdo */}
        <div className="lg:col-span-2 flex flex-col">

          {/* SECÇÃO: TECHNOLOGY (Grelha Responsiva) */}
          <div className="flex flex-col">
            
            {/* CABEÇALHO DA SECÇÃO: Aba TECHNOLOGY */}
            <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4 sm:mb-6">
              <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                TECHNOLOGY
              </div>
              <Link
                to="/categoria/noticias"
                className="text-xs sm:text-sm font-medium text-gray-400 hover:text-brandBlue transition-colors pb-1 min-h-[36px] flex items-center"
              >
                Ver todas as notícias
              </Link>
            </div>

            {/* CONTEÚDO DA SECÇÃO TECHNOLOGY */}
            <div className="flex flex-col">
              
              {/* 1. ARTIGO PRINCIPAL EM DESTAQUE */}
              <Link
                to={`/blog/${ARTICLES_DATA[0].id}`}
                className="relative group cursor-pointer overflow-hidden aspect-[16/10] sm:aspect-[16/8.5] md:aspect-[16/8] flex flex-col justify-end bg-black shadow-xs active:scale-[0.99] transition-transform block"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[0].image}
                    alt={`Tecnologia em foco: ${ARTICLES_DATA[0].title}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#0080ff] text-white flex items-center justify-center shadow-md group-hover:scale-110 active:scale-95 transition-transform duration-200">
                    <i className="fa-solid fa-play text-xs sm:text-sm ml-0.5"></i>
                  </div>
                </div>

                <div className="relative z-10 p-3.5 sm:p-6 md:p-7 flex flex-col justify-end">
                  <div>
                    <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide mb-1.5 sm:mb-2 shadow-xs">
                      {ARTICLES_DATA[0].category}
                    </span>
                  </div>
                  <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:underline">
                    {ARTICLES_DATA[0].title}
                  </h2>
                  <div className="text-[11px] sm:text-xs text-gray-300 mt-1.5 sm:mt-2 font-normal">
                    por <strong className="font-semibold text-white">{ARTICLES_DATA[0].author}</strong> - {ARTICLES_DATA[0].date}
                  </div>
                </div>
              </Link>

              {/* 2. GRELHA DE 3 CARTÕES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 mt-4 sm:mt-5">
                
                {/* Card 1 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[1].id}`}
                  className="group cursor-pointer flex flex-col active:scale-[0.99] transition-transform block"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[1].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[1].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                        <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-[#0080ff] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide shadow-xs">
                        {ARTICLES_DATA[1].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[1].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[1].date}
                    </div>
                  </div>
                </Link>

                {/* Card 2 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[2].id}`}
                  className="group cursor-pointer flex flex-col active:scale-[0.99] transition-transform block"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[2].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[2].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                        <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-[#0080ff] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide shadow-xs">
                        {ARTICLES_DATA[2].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[2].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[2].date}
                    </div>
                  </div>
                </Link>

                {/* Card 3 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[4].id}`}
                  className="group cursor-pointer flex flex-col active:scale-[0.99] transition-transform block"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[4].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[4].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                        <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-[#0080ff] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide shadow-xs">
                        {ARTICLES_DATA[4].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[4].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[4].date}
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* ÁREA DE ANÚNCIO (Banner Horizontal limpo e preparado) */}
          <div className="w-full mt-6 sm:mt-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl min-h-[60px] xs:min-h-[75px] sm:min-h-[90px] md:min-h-[100px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
          </div>

          {/* SECÇÃO: DICAS E TRUQUES & PROJETO */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* COLUNA 1: DICAS E TRUQUES */}
            <div className="flex flex-col">
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                  DICAS E TRUQUES
                </div>
                <Link
                  to="/categoria/artigos"
                  className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1 min-h-[36px] flex items-center"
                >
                  Ver todos os artigos
                </Link>
              </div>

              {/* POST PRINCIPAL EM DESTAQUE */}
              <Link
                to={`/blog/${ARTICLES_DATA[1].id}`}
                className="flex flex-col group cursor-pointer mb-4 active:scale-[0.99] transition-transform block"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                  <img
                    src={ARTICLES_DATA[1].image}
                    alt={`Dicas e Truques: ${ARTICLES_DATA[1].title}`}
                    width={500}
                    height={312}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="bg-brandBlue text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider shadow-sm">
                      MAÇÃ
                    </span>
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors mt-2.5">
                  {ARTICLES_DATA[1].title}
                </h3>
                <div className="text-[11px] text-gray-400 mt-1">
                  <span>por {ARTICLES_DATA[1].author || 'Dicas de blog da Sora'} - {ARTICLES_DATA[1].date}</span>
                </div>
              </Link>

              {/* LISTA DE 3 POSTS PEQUENOS */}
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/80">
                <Link
                  to={`/blog/${ARTICLES_DATA[2].id}`}
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src={ARTICLES_DATA[2].image}
                      alt={`Miniatura: ${ARTICLES_DATA[2].title}`}
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[2].title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      {ARTICLES_DATA[2].date}
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[3].id}`}
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src={ARTICLES_DATA[3].image}
                      alt={`Miniatura: ${ARTICLES_DATA[3].title}`}
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[3].title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      {ARTICLES_DATA[3].date}
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[4].id}`}
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src={ARTICLES_DATA[4].image}
                      alt={`Miniatura: ${ARTICLES_DATA[4].title}`}
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[4].title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      {ARTICLES_DATA[4].date}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* COLUNA 2: PROJETO */}
            <div className="flex flex-col">
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                  PROJETO
                </div>
                <Link
                  to="/categoria/startups"
                  className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1 min-h-[36px] flex items-center"
                >
                  Ver todos os projetos
                </Link>
              </div>

              {/* POST PRINCIPAL EM DESTAQUE (PS4) */}
              <Link
                to="/blog/10-awesome-things-ps4"
                className="flex flex-col group cursor-pointer mb-4 active:scale-[0.99] transition-transform block"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                  <img
                    src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80"
                    alt="10 coisas incríveis para experimentar no seu PS4 agora mesmo"
                    width={500}
                    height={312}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="bg-brandBlue text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider shadow-sm">
                      ANDROID
                    </span>
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors mt-2.5">
                  10 coisas incríveis para experimentar no seu PS4 agora mesmo
                </h3>
                <div className="text-[11px] text-gray-400 mt-1">
                  <span>por Dicas de blog da Sora - 30 de julho de 2020</span>
                </div>
              </Link>

              {/* LISTA DE 3 POSTS PEQUENOS */}
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/80">
                <Link
                  to="/blog/current-trends-tablet-applications"
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
                      alt="Tendências atuais e perspectivas futuras para aplicativos em tablets"
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      Tendências atuais e perspectivas futuras para aplicativos em tablets
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>

                <Link
                  to="/blog/apple-jul-announcement-macbooks"
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                      alt="Anúncio de julho da Apple: que atualização para os MacBooks"
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      Anúncio de julho da Apple: que atualização para os MacBooks
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[0].id}`}
                  className="py-2.5 sm:py-3 flex items-center space-x-3 group cursor-pointer active:bg-gray-100/60 dark:active:bg-gray-900/60 transition-colors rounded-xs block"
                >
                  <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-[4/3]">
                    <img
                      src={ARTICLES_DATA[0].image}
                      alt={`Miniatura: ${ARTICLES_DATA[0].title}`}
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[0].title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* SECÇÃO: LEIA MAIS (Estilo Azul Exclusivo) */}
          <div className="mt-8 sm:mt-10 flex flex-col">
            <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4 sm:mb-6">
              <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                LEIA MAIS
              </div>
              <Link
                to="/categoria/artigos"
                className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1 flex items-center gap-1 min-h-[36px]"
              >
                <span>Ver mais matérias</span>
                <i className="fa-solid fa-angle-right text-[10px]"></i>
              </Link>
            </div>

            {/* LISTA VERTICAL DE ARTIGOS */}
            <div className="flex flex-col space-y-5 sm:space-y-6 mt-4 sm:mt-5">
              
              {/* Artigo 1: Opera Browser */}
              <Link
                to={`/blog/${ARTICLES_DATA[0].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5 items-start group cursor-pointer transition-transform duration-200 ease-out active:scale-[0.99] p-2 sm:p-2.5 -mx-2 sm:-mx-2.5 rounded-xs hover:bg-gray-50/80 dark:hover:bg-gray-900/40 block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                  <img
                    src={ARTICLES_DATA[0].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[0].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                      MAÇÃ
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[0].title}
                  </h3>
                  <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                    <span>por</span>
                    <span className="text-brandBlue font-medium hover:underline">
                      Dicas de blog da Sora
                    </span>
                    <span>- 30 de julho de 2020</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    Descubra como o novo recurso do navegador Opera transforma qualquer página com modo escuro automático e economia de bateria.
                  </p>
                </div>
              </Link>

              {/* Artigo 2: 11 dos melhores laptops */}
              <Link
                to={`/blog/${ARTICLES_DATA[1].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5 items-start group cursor-pointer transition-transform duration-200 ease-out active:scale-[0.99] p-2 sm:p-2.5 -mx-2 sm:-mx-2.5 rounded-xs hover:bg-gray-50/80 dark:hover:bg-gray-900/40 block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                  <img
                    src={ARTICLES_DATA[1].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[1].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                      MAÇÃ
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[1].title}
                  </h3>
                  <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                    <span>por</span>
                    <span className="text-brandBlue font-medium hover:underline">
                      Dicas de blog da Sora
                    </span>
                    <span>- 30 de julho de 2020</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    Guia completo com os melhores computadores portáteis avaliados para produtividade, estudo e desenvolvimento em diversas faixas de preço.
                  </p>
                </div>
              </Link>

              {/* Artigo 3: As 18 práticas */}
              <Link
                to={`/blog/${ARTICLES_DATA[2].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5 items-start group cursor-pointer transition-transform duration-200 ease-out active:scale-[0.99] p-2 sm:p-2.5 -mx-2 sm:-mx-2.5 rounded-xs hover:bg-gray-50/80 dark:hover:bg-gray-900/40 block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                  <img
                    src={ARTICLES_DATA[2].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[2].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                      MAÇÃ
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[2].title}
                  </h3>
                  <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                    <span>por</span>
                    <span className="text-brandBlue font-medium hover:underline">
                      Dev Tech
                    </span>
                    <span>- 30 de julho de 2020</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    Boas práticas fundamentais de CSS moderno, layout fluido, mobile first e performance para aplicações web modernas.
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
