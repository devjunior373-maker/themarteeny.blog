import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import AdcashBanner from '../components/AdcashBanner';
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* ESPAÇO PUBLICITÁRIO: Banner Superior (Zona Display Ativa Adcash) */}
      <AdcashBanner
        zoneId="12294586"
        slotName="Página Inicial - Topo"
        className="mb-6 sm:mb-8"
      />

      {/* SECÇÃO DE DESTAQUES: Grade Editorial com proporções equilibradas e tipografia autêntica */}
      <section aria-label="Notícias em Destaque" className="mb-8 sm:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
          
          {/* LADO ESQUERDO: Card Principal Grande (LCP candidate -> eager + fetchpriority="high") */}
          <Link
            to={`/blog/${ARTICLES_DATA[0].id}`}
            className="relative group overflow-hidden h-[280px] xs:h-[340px] sm:h-[420px] lg:h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col justify-end bg-gray-900 cursor-pointer block rounded-xs border border-gray-200"
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
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col justify-end">
              <div>
                <span className="inline-block bg-brandBlue text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 uppercase tracking-wider mb-2 rounded-xs">
                  {ARTICLES_DATA[0].category}
                </span>
              </div>
              <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug group-hover:underline underline-offset-4 decoration-1">
                {ARTICLES_DATA[0].title}
              </h2>
              <div className="text-xs text-gray-300 mt-2 font-normal flex items-center space-x-1.5">
                <span>por</span>
                <span className="text-gray-100 font-medium">{ARTICLES_DATA[0].author}</span>
                <span>•</span>
                <span>{ARTICLES_DATA[0].date}</span>
              </div>
            </div>
          </Link>

          {/* LADO DIREITO: Grade 2x2 com 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 h-full">
            
            {/* Card 1 (Superior Esquerdo) */}
            <Link
              to={`/blog/${ARTICLES_DATA[1].id}`}
              className="relative group overflow-hidden h-[180px] xs:h-[195px] sm:h-[205px] lg:h-[224px] flex flex-col justify-end bg-gray-900 cursor-pointer block rounded-xs border border-gray-200"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[1].image}
                  alt={`Destaque: ${ARTICLES_DATA[1].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-brandBlue text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mb-1.5 rounded-xs">
                    {ARTICLES_DATA[1].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {ARTICLES_DATA[1].title}
                </h3>
                <div className="text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[1].date}
                </div>
              </div>
            </Link>

            {/* Card 2 (Superior Direito) */}
            <Link
              to={`/blog/${ARTICLES_DATA[2].id}`}
              className="relative group overflow-hidden h-[180px] xs:h-[195px] sm:h-[205px] lg:h-[224px] flex flex-col justify-end bg-gray-900 cursor-pointer block rounded-xs border border-gray-200"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[2].image}
                  alt={`Destaque: ${ARTICLES_DATA[2].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-brandBlue text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mb-1.5 rounded-xs">
                    {ARTICLES_DATA[2].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {ARTICLES_DATA[2].title}
                </h3>
                <div className="text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[2].date}
                </div>
              </div>
            </Link>

            {/* Card 3 (Inferior Esquerdo) */}
            <Link
              to={`/blog/${ARTICLES_DATA[3].id}`}
              className="relative group overflow-hidden h-[180px] xs:h-[195px] sm:h-[205px] lg:h-[224px] flex flex-col justify-end bg-gray-900 cursor-pointer block rounded-xs border border-gray-200"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[3].image}
                  alt={`Destaque: ${ARTICLES_DATA[3].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-brandBlue text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mb-1.5 rounded-xs">
                    {ARTICLES_DATA[3].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {ARTICLES_DATA[3].title}
                </h3>
                <div className="text-[11px] text-gray-300 mt-1 font-normal">
                  {ARTICLES_DATA[3].date}
                </div>
              </div>
            </Link>

            {/* Card 4 (Inferior Direito) */}
            <Link
              to={`/blog/${ARTICLES_DATA[4].id}`}
              className="relative group overflow-hidden h-[180px] xs:h-[195px] sm:h-[205px] lg:h-[224px] flex flex-col justify-end bg-gray-900 cursor-pointer block rounded-xs border border-gray-200"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[4].image}
                  alt={`Destaque: ${ARTICLES_DATA[4].title}`}
                  width={400}
                  height={228}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-brandBlue text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mb-1.5 rounded-xs">
                    {ARTICLES_DATA[4].category}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {ARTICLES_DATA[4].title}
                </h3>
                <div className="text-[11px] text-gray-300 mt-1 font-normal">
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
            
            {/* CABEÇALHO DA SECÇÃO: Editorial com traço sobrio */}
            <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2.5 mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-4 bg-brandBlue inline-block rounded-xs"></span>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                  Technology
                </h2>
              </div>
              <Link
                to="/categoria/noticias"
                className="text-xs font-medium text-gray-500 hover:text-brandBlue transition-colors flex items-center gap-1 min-h-[32px]"
              >
                <span>Ver todas as notícias</span>
                <i className="fa-solid fa-angle-right text-[10px]"></i>
              </Link>
            </div>

            {/* CONTEÚDO DA SECÇÃO TECHNOLOGY */}
            <div className="flex flex-col">
              
              {/* 1. ARTIGO PRINCIPAL EM DESTAQUE */}
              <Link
                to={`/blog/${ARTICLES_DATA[0].id}`}
                className="relative group cursor-pointer overflow-hidden aspect-[16/10] sm:aspect-[16/8.5] md:aspect-[16/8] flex flex-col justify-end bg-gray-900 block rounded-xs border border-gray-200"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[0].image}
                    alt={`Tecnologia em foco: ${ARTICLES_DATA[0].title}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col justify-end">
                  <div>
                    <span className="inline-block bg-brandBlue text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider mb-2 rounded-xs">
                      {ARTICLES_DATA[0].category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-4">
                    {ARTICLES_DATA[0].title}
                  </h3>
                  <div className="text-xs text-gray-300 mt-2 font-normal flex items-center space-x-1.5">
                    <span>por</span>
                    <strong className="font-medium text-white">{ARTICLES_DATA[0].author}</strong>
                    <span>•</span>
                    <span>{ARTICLES_DATA[0].date}</span>
                  </div>
                </div>
              </Link>

              {/* 2. GRELHA DE 3 CARTÕES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
                
                {/* Card 1 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[1].id}`}
                  className="group cursor-pointer flex flex-col block bg-white p-3 border border-gray-200 hover:border-gray-300 transition-colors rounded-xs"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-xs">
                    <img
                      src={ARTICLES_DATA[1].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[1].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-wider rounded-xs">
                        {ARTICLES_DATA[1].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[1].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 mt-1.5 font-normal">
                      {ARTICLES_DATA[1].date}
                    </div>
                  </div>
                </Link>

                {/* Card 2 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[2].id}`}
                  className="group cursor-pointer flex flex-col block bg-white p-3 border border-gray-200 hover:border-gray-300 transition-colors rounded-xs"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-xs">
                    <img
                      src={ARTICLES_DATA[2].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[2].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-wider rounded-xs">
                        {ARTICLES_DATA[2].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[2].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 mt-1.5 font-normal">
                      {ARTICLES_DATA[2].date}
                    </div>
                  </div>
                </Link>

                {/* Card 3 */}
                <Link
                  to={`/blog/${ARTICLES_DATA[4].id}`}
                  className="group cursor-pointer flex flex-col block bg-white p-3 border border-gray-200 hover:border-gray-300 transition-colors rounded-xs"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-xs">
                    <img
                      src={ARTICLES_DATA[4].image}
                      alt={`Imagem do artigo: ${ARTICLES_DATA[4].title}`}
                      width={380}
                      height={238}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-wider rounded-xs">
                        {ARTICLES_DATA[4].category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[4].title}
                    </h3>
                    <div className="text-[11px] text-gray-400 mt-1.5 font-normal">
                      {ARTICLES_DATA[4].date}
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* ESPAÇO PUBLICITÁRIO: Banner Intermediário (Zona Display Ativa Adcash) */}
          <AdcashBanner
            zoneId="12294614"
            slotName="Página Inicial - Meio"
            className="mt-6 sm:mt-8"
          />

          {/* SECÇÃO: DICAS E TRUQUES & PROJETO */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* COLUNA 1: DICAS E TRUQUES */}
            <div className="flex flex-col">
              <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-3.5 bg-brandBlue inline-block rounded-xs"></span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                    Dicas e Truques
                  </h3>
                </div>
                <Link
                  to="/categoria/artigos"
                  className="text-xs font-medium text-gray-500 hover:text-brandBlue transition-colors flex items-center gap-1 min-h-[32px]"
                >
                  <span>Ver artigos</span>
                  <i className="fa-solid fa-angle-right text-[10px]"></i>
                </Link>
              </div>

              {/* POST PRINCIPAL EM DESTAQUE */}
              <Link
                to={`/blog/${ARTICLES_DATA[1].id}`}
                className="flex flex-col group cursor-pointer mb-4 block bg-white p-3 border border-gray-200 rounded-xs hover:border-gray-300 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 block rounded-xs">
                  <img
                    src={ARTICLES_DATA[1].image}
                    alt={`Dicas e Truques: ${ARTICLES_DATA[1].title}`}
                    width={500}
                    height={312}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                      {ARTICLES_DATA[1].category}
                    </span>
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors mt-2.5">
                  {ARTICLES_DATA[1].title}
                </h4>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center space-x-1.5">
                  <span>por {ARTICLES_DATA[1].author || 'Redação'}</span>
                  <span>•</span>
                  <span>{ARTICLES_DATA[1].date}</span>
                </div>
              </Link>

              {/* LISTA DE 3 POSTS PEQUENOS */}
              <div className="flex flex-col divide-y divide-gray-100 bg-white border border-gray-200 rounded-xs p-2">
                <Link
                  to={`/blog/${ARTICLES_DATA[2].id}`}
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[2].title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {ARTICLES_DATA[2].date}
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[3].id}`}
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[3].title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {ARTICLES_DATA[3].date}
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[4].id}`}
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[4].title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {ARTICLES_DATA[4].date}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* COLUNA 2: PROJETO */}
            <div className="flex flex-col">
              <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-3.5 bg-brandBlue inline-block rounded-xs"></span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                    Projeto
                  </h3>
                </div>
                <Link
                  to="/categoria/startups"
                  className="text-xs font-medium text-gray-500 hover:text-brandBlue transition-colors flex items-center gap-1 min-h-[32px]"
                >
                  <span>Ver projetos</span>
                  <i className="fa-solid fa-angle-right text-[10px]"></i>
                </Link>
              </div>

              {/* POST PRINCIPAL EM DESTAQUE (PS4) */}
              <Link
                to="/blog/10-awesome-things-ps4"
                className="flex flex-col group cursor-pointer mb-4 block bg-white p-3 border border-gray-200 rounded-xs hover:border-gray-300 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 block rounded-xs">
                  <img
                    src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80"
                    alt="10 coisas incríveis para experimentar no seu PS4 agora mesmo"
                    width={500}
                    height={312}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                      Games
                    </span>
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors mt-2.5">
                  10 coisas incríveis para experimentar no seu PS4 agora mesmo
                </h4>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center space-x-1.5">
                  <span>por Redação</span>
                  <span>•</span>
                  <span>30 de julho de 2020</span>
                </div>
              </Link>

              {/* LISTA DE 3 POSTS PEQUENOS */}
              <div className="flex flex-col divide-y divide-gray-100 bg-white border border-gray-200 rounded-xs p-2">
                <Link
                  to="/blog/current-trends-tablet-applications"
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      Tendências atuais e perspectivas futuras para aplicativos em tablets
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>

                <Link
                  to="/blog/apple-jul-announcement-macbooks"
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      Anúncio de julho da Apple: que atualização para os MacBooks
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>

                <Link
                  to={`/blog/${ARTICLES_DATA[0].id}`}
                  className="py-2.5 px-2 flex items-center space-x-3 group cursor-pointer hover:bg-gray-50 transition-colors rounded-xs block"
                >
                  <div className="w-18 h-14 sm:w-20 sm:h-15 flex-shrink-0 overflow-hidden bg-gray-100 aspect-[4/3] rounded-xs border border-gray-150">
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
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[0].title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1">
                      30 de julho de 2020
                    </span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* SECÇÃO: LEIA MAIS (Estilo Editorial Limpo) */}
          <div className="mt-8 sm:mt-10 flex flex-col">
            <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-3.5 bg-brandBlue inline-block rounded-xs"></span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                  Leia Mais
                </h3>
              </div>
              <Link
                to="/categoria/artigos"
                className="text-xs font-medium text-gray-500 hover:text-brandBlue transition-colors pb-1 flex items-center gap-1 min-h-[32px]"
              >
                <span>Ver mais matérias</span>
                <i className="fa-solid fa-angle-right text-[10px]"></i>
              </Link>
            </div>

            {/* LISTA VERTICAL DE ARTIGOS */}
            <div className="flex flex-col space-y-4">
              
              {/* Artigo 1 */}
              <Link
                to={`/blog/${ARTICLES_DATA[0].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-start group cursor-pointer bg-white border border-gray-200 p-3.5 sm:p-4 rounded-xs hover:border-gray-300 transition-colors block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 block rounded-xs">
                  <img
                    src={ARTICLES_DATA[0].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[0].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                      {ARTICLES_DATA[0].category}
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h4 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[0].title}
                  </h4>
                  <div className="text-xs text-gray-400 mt-1 flex items-center space-x-1.5">
                    <span>por</span>
                    <span className="text-gray-700 font-medium">{ARTICLES_DATA[0].author}</span>
                    <span>•</span>
                    <span>{ARTICLES_DATA[0].date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                    Descubra como o novo recurso do navegador Opera transforma qualquer página com modo escuro automático e economia de bateria.
                  </p>
                </div>
              </Link>

              {/* Artigo 2 */}
              <Link
                to={`/blog/${ARTICLES_DATA[1].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-start group cursor-pointer bg-white border border-gray-200 p-3.5 sm:p-4 rounded-xs hover:border-gray-300 transition-colors block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 block rounded-xs">
                  <img
                    src={ARTICLES_DATA[1].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[1].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                      {ARTICLES_DATA[1].category}
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h4 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[1].title}
                  </h4>
                  <div className="text-xs text-gray-400 mt-1 flex items-center space-x-1.5">
                    <span>por</span>
                    <span className="text-gray-700 font-medium">{ARTICLES_DATA[1].author}</span>
                    <span>•</span>
                    <span>{ARTICLES_DATA[1].date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                    Guia completo com os melhores computadores portáteis avaliados para produtividade, estudo e desenvolvimento em diversas faixas de preço.
                  </p>
                </div>
              </Link>

              {/* Artigo 3 */}
              <Link
                to={`/blog/${ARTICLES_DATA[2].id}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-start group cursor-pointer bg-white border border-gray-200 p-3.5 sm:p-4 rounded-xs hover:border-gray-300 transition-colors block"
              >
                <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 block rounded-xs">
                  <img
                    src={ARTICLES_DATA[2].image}
                    alt={`Artigo de leitura: ${ARTICLES_DATA[2].title}`}
                    width={480}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                      {ARTICLES_DATA[2].category}
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-7 flex flex-col justify-start">
                  <h4 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors">
                    {ARTICLES_DATA[2].title}
                  </h4>
                  <div className="text-xs text-gray-400 mt-1 flex items-center space-x-1.5">
                    <span>por</span>
                    <span className="text-gray-700 font-medium">{ARTICLES_DATA[2].author}</span>
                    <span>•</span>
                    <span>{ARTICLES_DATA[2].date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
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
