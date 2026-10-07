/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ASSETS_CONFIG } from './config/assets.config';
import ThemarteenyLogo from './assets/logo/ThemarteenyLogo';
import { ARTICLES_DATA, Article } from './data/articles.data';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarEmail, setSidebarEmail] = useState<string>('');
  const [sidebarSubscribed, setSidebarSubscribed] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('Início');
  const navItems = ['Início', 'Startups', 'Notícias', 'Eventos', 'Artigos', 'Mundo'];

  // Filtragem de artigos por título ao digitar no input
  const filteredArticles = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return [];
    return ARTICLES_DATA.filter((article) => {
      const titleMatches = article.title.toLowerCase().includes(trimmed);
      const categoryMatches = article.category.toLowerCase().includes(trimmed);
      return titleMatches || categoryMatches;
    });
  }, [searchQuery]);


  // Destaque visual do termo pesquisado no título do artigo
  const highlightMatch = (text: string, query: string): React.ReactNode => {
    const trimmed = query.trim();
    if (!trimmed) return text;
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === trimmed.toLowerCase() ? (
        <mark
          key={index}
          className="bg-brandBlue/20 text-brandBlue font-extrabold px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // Inicialização do tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (initialDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Foco ao abrir busca
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Fechar busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Monitorar rolagem da página para exibir/ocultar botão 'Voltar ao topo'
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSidebarSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarEmail.trim()) {
      setSidebarSubscribed(true);
      setTimeout(() => {
        setSidebarSubscribed(false);
        setSidebarEmail('');
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors duration-200 overflow-x-hidden">

      {/* HEADER PRINCIPAL (Mobile First) */}
      <header className="w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between relative">
          
          {/* ESQUERDA: Menu Hambúrguer (Mobile) + Logotipo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="md:hidden flex items-center">
              <button
                id="mobile-menu-toggle"
                aria-label="Abrir Menu"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsSearchOpen(false);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 focus:outline-none cursor-pointer"
              >
                <i className="fa-solid fa-bars text-lg sm:text-xl"></i>
              </button>
            </div>

            <div
              id="logo-container"
              className="flex items-center"
            >
              <a href="#" className="flex items-center">
                <ThemarteenyLogo className="h-7 sm:h-8 md:h-9 w-auto" />
              </a>
            </div>
          </div>

          {/* CENTRO: Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs font-semibold tracking-wide">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav(item);
                  }}
                  className={`uppercase transition-colors cursor-pointer ${
                    isActive
                      ? 'text-brandBlue font-bold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-brandBlue'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* DIREITA: Lupa de Busca */}
          <div id="right-actions" className="flex items-center">
            <div className="flex items-center relative">
              <button
                ref={searchButtonRef}
                id="search-toggle"
                aria-label="Pesquisar"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-brandBlue transition-colors p-2 focus:outline-none cursor-pointer"
              >
                <i className="fa-solid fa-magnifying-glass text-base sm:text-lg"></i>
              </button>

              {isSearchOpen && (
                <div
                  ref={searchBoxRef}
                  id="small-search-box"
                  className="absolute right-0 flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 sm:py-1.5 w-40 sm:w-44 md:w-48 lg:w-52 z-30 shadow-none"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    id="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar..."
                    className="w-full bg-transparent text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none px-1"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar texto"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 mr-0.5 text-xs cursor-pointer flex-shrink-0"
                    >
                      <i className="fa-solid fa-circle-xmark text-xs"></i>
                    </button>
                  )}
                  <button
                    id="search-close"
                    aria-label="Fechar"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 focus:outline-none cursor-pointer flex-shrink-0"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>

                  {/* Dropdown de Resultados da Filtragem (Abaixo do cabeçalho, sem sombra, sem cobrir o menu) */}
                  {searchQuery.trim().length > 0 && (
                    <div className="absolute right-0 top-full mt-1 w-56 sm:w-64 md:w-72 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-none z-50 max-h-[340px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                      {/* Barra de Contagem */}
                      <div className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800/60 text-[10px] font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between">
                        <span>
                          {filteredArticles.length === 1
                            ? '1 artigo encontrado'
                            : `${filteredArticles.length} artigos encontrados`}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-brandBlue font-bold">
                          Filtro
                        </span>
                      </div>

                      {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                          <div
                            key={article.id}
                            onClick={() => {
                              setSelectedArticle(article);
                              setIsSearchOpen(false);
                            }}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors flex items-start space-x-2 group text-left"
                          >
                            <div className="w-11 sm:w-12 aspect-[16/11] flex-shrink-0 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center space-x-1.5 mb-0.5">
                                <span className="bg-brandBlue text-white text-[8px] font-bold px-1.5 py-0.2 uppercase">
                                  {article.category}
                                </span>
                                <span className="text-[9px] text-gray-400">
                                  {article.date}
                                </span>
                              </div>
                              <h4 className="text-[11px] font-bold text-gray-900 dark:text-white group-hover:text-brandBlue transition-colors line-clamp-2 leading-tight">
                                {highlightMatch(article.title, searchQuery)}
                              </h4>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="font-bold text-gray-800 dark:text-gray-200 text-xs">
                            Nenhum artigo encontrado
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                            Sem resultados para "{searchQuery}".
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 flex flex-wrap items-center justify-center gap-1">
                            <span>Ex.:</span>
                            <button
                              type="button"
                              onClick={() => setSearchQuery('Macbook')}
                              className="text-brandBlue hover:underline font-semibold cursor-pointer"
                            >
                              Macbook
                            </button>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => setSearchQuery('Laptops')}
                              className="text-brandBlue hover:underline font-semibold cursor-pointer"
                            >
                              Laptops
                            </button>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => setSearchQuery('Opera')}
                              className="text-brandBlue hover:underline font-semibold cursor-pointer"
                            >
                              Opera
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MENU MOBILE EXPANSÍVEL (Otimizado para toque) */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-5 py-4 shadow-lg transition-all duration-300 animate-fadeIn"
          >
            {/* Campo de Busca Rápida no Mobile */}
            <div className="mb-3.5 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1.5 border border-gray-300 dark:border-gray-700">
                <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs mr-2"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por título..."
                  className="w-full bg-transparent text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            <nav className="flex flex-col space-y-2.5 text-xs font-semibold tracking-wide">
              {navItems.map((item, index) => {
                const isActive = activeNav === item;
                const isLast = index === navItems.length - 1;
                return (
                  <a
                    key={item}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`uppercase transition-colors py-2 px-1 block cursor-pointer ${
                      isLast ? '' : 'border-b border-gray-100 dark:border-gray-800/60'
                    } ${
                      isActive
                        ? 'text-brandBlue font-bold'
                        : 'text-gray-700 dark:text-gray-200 hover:text-brandBlue'
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ESPAÇO DE ANÚNCIO DO GOOGLE (Área limpa e preparada, sem texto) */}
      <div
        id="google-ads-header-slot"
        className="w-full bg-gray-50/60 dark:bg-gray-900/30 border-b border-gray-200/70 dark:border-gray-800/70 py-2.5 sm:py-3.5 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="w-full max-w-4xl min-h-[90px] sm:min-h-[100px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (Mobile First) */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6">

        {/* FEED DE RESULTADOS DA FILTRAGEM POR BUSCA (Visível quando há termo digitado) */}
        {searchQuery.trim().length > 0 && (
          <section className="mb-8 border border-brandBlue/30 bg-blue-50/40 dark:bg-gray-900/80 p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-brandBlue text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    Filtro Ativo
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    Resultados da pesquisa para: <span className="text-brandBlue">"{searchQuery}"</span>
                  </h2>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {filteredArticles.length === 1
                    ? '1 artigo correspondente encontrado'
                    : `${filteredArticles.length} artigos correspondentes encontrados`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
                <span>Limpar Filtro</span>
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3.5 flex flex-col group cursor-pointer hover:border-brandBlue transition-all duration-300 ease-out hover:scale-105 shadow-xs"
                  >
                    <div className="overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 mb-2.5 relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-brandBlue text-white text-[8px] font-bold px-1.5 py-0.5 uppercase">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {highlightMatch(article.title, searchQuery)}
                    </h3>
                    {article.excerpt && (
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(article);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 self-start text-[11px] font-bold text-brandBlue hover:text-blue-700 dark:hover:text-blue-400 uppercase tracking-wider cursor-pointer group-hover:underline"
                    >
                      <span>Ler Mais</span>
                      <i className="fa-solid fa-arrow-right text-[9px] transition-transform group-hover:translate-x-0.5"></i>
                    </button>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-auto pt-2.5 border-t border-gray-100 dark:border-gray-900">
                      <span className="flex items-center gap-1">
                        <i className="fa-regular fa-clock text-[9px]"></i>
                        {article.date}
                      </span>
                      <span>{article.author}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <i className="fa-solid fa-magnifying-glass text-2xl text-gray-400 mb-2"></i>
                <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                  Nenhum artigo encontrado com o título "{searchQuery}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Tente digitar termos alternativos como "Opera", "Macbook", "Laptops", "Web" ou "Apps".
                </p>
              </div>
            )}
          </section>
        )}

        {/* SECÇÃO DE DESTAQUES (Conforme a Imagem de Referência: Grid 5 Artigos) */}
        <section aria-label="Notícias em Destaque" className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-1.5 items-stretch">
            
            {/* LADO ESQUERDO: Card Principal Grande */}
            <article
              onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
              className="relative group overflow-hidden h-[340px] sm:h-[420px] lg:h-full min-h-[340px] lg:min-h-[462px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={ARTICLES_DATA[0].image}
                  alt={ARTICLES_DATA[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
              </div>

              <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide mb-2 shadow-xs">
                    {ARTICLES_DATA[0].category}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug group-hover:underline">
                  {ARTICLES_DATA[0].title}
                </h2>
                <div className="text-xs text-gray-300 mt-2 font-normal">
                  por <span className="text-gray-200">{ARTICLES_DATA[0].author}</span> - {ARTICLES_DATA[0].date}
                </div>
              </div>
            </article>

            {/* LADO DIREITO: Grade 2x2 com 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5 h-full">
              
              {/* Card 1 (Superior Esquerdo) */}
              <article
                onClick={() => setSelectedArticle(ARTICLES_DATA[1])}
                className="relative group overflow-hidden h-[195px] sm:h-[210px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[1].image}
                    alt={ARTICLES_DATA[1].title}
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
                  <div className="text-[11px] text-gray-300 mt-1 font-normal">
                    {ARTICLES_DATA[1].date}
                  </div>
                </div>
              </article>

              {/* Card 2 (Superior Direito) */}
              <article
                onClick={() => setSelectedArticle(ARTICLES_DATA[2])}
                className="relative group overflow-hidden h-[195px] sm:h-[210px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[2].image}
                    alt={ARTICLES_DATA[2].title}
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
                  <div className="text-[11px] text-gray-300 mt-1 font-normal">
                    {ARTICLES_DATA[2].date}
                  </div>
                </div>
              </article>

              {/* Card 3 (Inferior Esquerdo) */}
              <article
                onClick={() => setSelectedArticle(ARTICLES_DATA[3])}
                className="relative group overflow-hidden h-[195px] sm:h-[210px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[3].image}
                    alt={ARTICLES_DATA[3].title}
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
                  <div className="text-[11px] text-gray-300 mt-1 font-normal">
                    {ARTICLES_DATA[3].date}
                  </div>
                </div>
              </article>

              {/* Card 4 (Inferior Direito) */}
              <article
                onClick={() => setSelectedArticle(ARTICLES_DATA[4])}
                className="relative group overflow-hidden h-[195px] sm:h-[210px] lg:h-[228px] flex flex-col justify-end bg-gray-950 cursor-pointer shadow-xs"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ARTICLES_DATA[4].image}
                    alt={ARTICLES_DATA[4].title}
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
                  <div className="text-[11px] text-gray-300 mt-1 font-normal">
                    {ARTICLES_DATA[4].date}
                  </div>
                </div>
              </article>

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
                <a
                  href="#"
                  className="text-xs sm:text-sm font-medium text-gray-400 hover:text-brandBlue transition-colors pb-1"
                >
                  View all
                </a>
              </div>

              {/* CONTEÚDO DA SECÇÃO TECHNOLOGY (Conforme Imagem de Referência) */}
              <div className="flex flex-col">
                
                {/* 1. ARTIGO PRINCIPAL EM DESTAQUE (Post Amplo com Foto Total, Botão de Play no Canto Superior Direito e Textos Sobrepostos) */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
                  className="relative group cursor-pointer overflow-hidden aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] flex flex-col justify-end bg-black shadow-xs"
                >
                  {/* Foto de Fundo */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={ARTICLES_DATA[0].image}
                      alt={ARTICLES_DATA[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Gradiente Escuro para Leitura Perfeita */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
                  </div>

                  {/* Botão de Play / Vídeo no Canto Superior Direito */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#0080ff] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-play text-[11px] sm:text-xs ml-0.5"></i>
                    </div>
                  </div>

                  {/* Textos Sobrepostos no Canto Inferior Esquerdo */}
                  <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col justify-end">
                    <div>
                      <span className="inline-block bg-[#0080ff] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide mb-2 shadow-xs">
                        {ARTICLES_DATA[0].category}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:underline">
                      {ARTICLES_DATA[0].title}
                    </h2>
                    <div className="text-[11px] sm:text-xs text-gray-300 mt-2 font-normal">
                      por <strong className="font-semibold text-white">{ARTICLES_DATA[0].author}</strong> - {ARTICLES_DATA[0].date}
                    </div>
                  </div>
                </article>

                {/* 2. GRELHA DE 3 CARTÕES (3 Colunas Lado a Lado) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 mt-4 sm:mt-5">
                  
                  {/* Card 1: 11 dos melhores laptops avaliados com base no orçamento */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[1])}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                      <img
                        src={ARTICLES_DATA[1].image}
                        alt={ARTICLES_DATA[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Botão de Play Centralizado */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                          <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                        </div>
                      </div>

                      {/* Tag / Badge Azul no Canto Inferior Esquerdo */}
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
                  </article>

                  {/* Card 2: As 18 práticas para criar aplicativos web responsivos */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[2])}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                      <img
                        src={ARTICLES_DATA[2].image}
                        alt={ARTICLES_DATA[2].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Botão de Play Centralizado */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                          <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                        </div>
                      </div>

                      {/* Tag / Badge Azul no Canto Inferior Esquerdo */}
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
                  </article>

                  {/* Card 3: O MacBook Pro da Apple é o melhor até agora, segundo o consumidor */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[4])}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/10] bg-gray-900 overflow-hidden shadow-xs">
                      <img
                        src={ARTICLES_DATA[4].image}
                        alt={ARTICLES_DATA[4].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Botão de Play Centralizado */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-[#0080ff] group-hover:scale-110 transition-all duration-300 shadow-md">
                          <i className="fa-solid fa-play ml-0.5 text-xs sm:text-sm"></i>
                        </div>
                      </div>

                      {/* Tag / Badge Azul no Canto Inferior Esquerdo */}
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
                  </article>

                </div>
              </div>
            </div>

            {/* ÁREA DE ANÚNCIO (Banner Horizontal limpo e preparado) */}
            <div className="w-full mt-8 sm:mt-10 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl min-h-[90px] sm:min-h-[100px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
            </div>

            {/* SECÇÃO CONFORME A IMAGEM DE REFERÊNCIA: DICAS E TRUQUES & PROJETO (Substitui Nature) */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* COLUNA 1: DICAS E TRUQUES */}
              <div className="flex flex-col">
                {/* CABEÇALHO */}
                <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4">
                  <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                    DICAS E TRUQUES
                  </div>
                  <a
                    href="#"
                    className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1"
                  >
                    Ver tudo
                  </a>
                </div>

                {/* POST PRINCIPAL EM DESTAQUE */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[1])}
                  className="flex flex-col group cursor-pointer mb-4"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                    <img
                      src={ARTICLES_DATA[1].image}
                      alt={ARTICLES_DATA[1].title}
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
                </article>

                {/* LISTA DE 3 POSTS PEQUENOS */}
                <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/80">
                  {/* Item 1 */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[2])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={ARTICLES_DATA[2].image}
                        alt={ARTICLES_DATA[2].title}
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
                  </article>

                  {/* Item 2 */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[3])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={ARTICLES_DATA[3].image}
                        alt={ARTICLES_DATA[3].title}
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
                  </article>

                  {/* Item 3 */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[4])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={ARTICLES_DATA[4].image}
                        alt={ARTICLES_DATA[4].title}
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
                  </article>
                </div>
              </div>

              {/* COLUNA 2: PROJETO */}
              <div className="flex flex-col">
                {/* CABEÇALHO */}
                <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4">
                  <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                    PROJETO
                  </div>
                  <a
                    href="#"
                    className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1"
                  >
                    Ver tudo
                  </a>
                </div>

                {/* POST PRINCIPAL EM DESTAQUE (PS4) */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA.find((a) => a.id === '10-awesome-things-ps4') || ARTICLES_DATA[3])}
                  className="flex flex-col group cursor-pointer mb-4"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                    <img
                      src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80"
                      alt="10 coisas incríveis para experimentar no seu PS4 agora mesmo"
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
                </article>

                {/* LISTA DE 3 POSTS PEQUENOS */}
                <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/80">
                  {/* Item 1: Tablets */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA.find((a) => a.id === 'current-trends-tablet-applications') || ARTICLES_DATA[5])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
                        alt="Tendências atuais e perspectivas futuras para aplicativos em tablets"
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
                  </article>

                  {/* Item 2: Apple Announcement */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA.find((a) => a.id === 'apple-jul-announcement-macbooks') || ARTICLES_DATA[6])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                        alt="Anúncio de julho da Apple: que atualização para os MacBooks"
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
                  </article>

                  {/* Item 3: Opera Browser */}
                  <article
                    onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
                    className="py-3 flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={ARTICLES_DATA[0].image}
                        alt={ARTICLES_DATA[0].title}
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
                  </article>
                </div>
              </div>

            </div>

            {/* SECÇÃO: LEIA MAIS (Estilo Azul Exclusivo) */}
            <div className="mt-8 sm:mt-10 flex flex-col">
              {/* CABEÇALHO DA SECÇÃO: Aba LEIA MAIS */}
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4 sm:mb-6">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                  LEIA MAIS
                </div>
                <a
                  href="#"
                  className="text-xs font-semibold text-gray-500 hover:text-brandBlue dark:text-gray-400 transition-colors pb-1 flex items-center gap-1"
                >
                  <span>Ver tudo</span>
                  <i className="fa-solid fa-angle-right text-[10px]"></i>
                </a>
              </div>

              {/* LISTA VERTICAL DE ARTIGOS */}
              <div className="flex flex-col space-y-5 sm:space-y-6 mt-4 sm:mt-5">
                
                {/* Artigo 1: Opera Browser */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01]"
                >
                  <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                    <img
                      src={ARTICLES_DATA[0].image}
                      alt={ARTICLES_DATA[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                        MAÇÃ
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-col justify-start">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[0].title}
                    </h3>
                    <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                      <span>por</span>
                      <span className="text-brandBlue font-medium hover:underline">
                        Dicas de blog da Sora
                      </span>
                      <span>- 30 de julho de 2020</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      Lorem Ipsum é simplesmente um texto fictício da indústria de impressão e composição tipográfica. Lorem Ipsum foi...
                    </p>
                  </div>
                </article>

                {/* Artigo 2: 11 dos melhores laptops */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[1])}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01]"
                >
                  <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                    <img
                      src={ARTICLES_DATA[1].image}
                      alt={ARTICLES_DATA[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                        MAÇÃ
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-col justify-start">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[1].title}
                    </h3>
                    <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                      <span>por</span>
                      <span className="text-brandBlue font-medium hover:underline">
                        Dicas de blog da Sora
                      </span>
                      <span>- 30 de julho de 2020</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      Lorem Ipsum é simplesmente um texto fictício da indústria de impressão e composição tipográfica. Lorem Ipsum foi...
                    </p>
                  </div>
                </article>

                {/* Artigo 3: As 18 práticas */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[2])}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01]"
                >
                  <div className="sm:col-span-5 relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900 block">
                    <img
                      src={ARTICLES_DATA[2].image}
                      alt={ARTICLES_DATA[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="bg-brandBlue text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                        MAÇÃ
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-col justify-start">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors">
                      {ARTICLES_DATA[2].title}
                    </h3>
                    <div className="text-xs text-gray-400 mt-1.5 flex items-center space-x-1 flex-wrap">
                      <span>por</span>
                      <span className="text-brandBlue font-medium hover:underline">
                        Dicas de blog da Sora
                      </span>
                      <span>- 30 de julho de 2020</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      Lorem Ipsum é simplesmente um texto fictício da indústria de impressão e composição tipográfica. Lorem Ipsum foi...
                    </p>
                  </div>
                </article>

              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Sidebar (Mobile First: Abaixo do conteúdo principal em Mobile, lateral em Desktop) */}
          <aside className="lg:col-span-1 flex flex-col space-y-5 sm:space-y-6 lg:sticky lg:top-20 mt-6 lg:mt-0">
            
            {/* 1. SIGA-NOS (Estilo Azul Exclusivo) */}
            <div className="flex flex-col">
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                  SIGA-NOS
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex items-center justify-between px-3 py-2 bg-[#3b5998] hover:bg-[#324b80] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                  <span>Facebook</span>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex items-center justify-between px-3 py-2 bg-[#14171a] hover:bg-black text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                  <span>Twitter</span>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex items-center justify-between px-3 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <i className="fa-brands fa-youtube text-sm"></i>
                  <span>YouTube</span>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs font-semibold transition-opacity shadow-xs"
                >
                  <i className="fa-brands fa-instagram text-sm"></i>
                  <span>Instagram</span>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex items-center justify-between px-3 py-2 bg-[#0077b5] hover:bg-[#005f91] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <i className="fa-brands fa-linkedin-in text-sm"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  aria-label="Skype"
                  className="flex items-center justify-between px-3 py-2 bg-[#00aff0] hover:bg-[#0096ce] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <i className="fa-brands fa-skype text-sm"></i>
                  <span>Skype</span>
                </a>
              </div>
            </div>

            {/* 2. POSTAGENS POPULARES (Estilo Azul Exclusivo) */}
            <div className="flex flex-col">
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3.5">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
                  POSTAGENS POPULARES
                </div>
              </div>
              <div className="flex flex-col mt-3 space-y-3">
                
                {/* 1º Artigo Popular: Foto Grande com Texto Sobreposto */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[0])}
                  className="relative group cursor-pointer overflow-hidden aspect-[16/10] flex flex-col justify-end bg-black shadow-xs"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={ARTICLES_DATA[0].image}
                      alt={ARTICLES_DATA[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
                  </div>

                  <div className="relative z-10 p-3 sm:p-3.5 flex flex-col justify-end">
                    <div>
                      <span className="inline-block bg-[#0080ff] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                        {ARTICLES_DATA[0].category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                      {ARTICLES_DATA[0].title}
                    </h4>
                    <div className="text-[10px] text-gray-300 mt-1 font-normal">
                      por <strong className="font-semibold text-white">{ARTICLES_DATA[0].author}</strong> - {ARTICLES_DATA[0].date}
                    </div>
                  </div>
                </article>

                {/* 2º Artigo Popular: Thumbnail à Esquerda e Título à Direita */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[1])}
                  className="flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer pt-1"
                >
                  <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[1].image}
                      alt={ARTICLES_DATA[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[1].title}
                    </h4>
                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[1].date}
                    </div>
                  </div>
                </article>

                {/* 3º Artigo Popular */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[2])}
                  className="flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer pt-2.5 border-t border-gray-100 dark:border-gray-800/80"
                >
                  <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[2].image}
                      alt={ARTICLES_DATA[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[2].title}
                    </h4>
                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[2].date}
                    </div>
                  </div>
                </article>

                {/* 4º Artigo Popular */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[3])}
                  className="flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer pt-2.5 border-t border-gray-100 dark:border-gray-800/80"
                >
                  <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[3].image}
                      alt={ARTICLES_DATA[3].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[3].title}
                    </h4>
                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[3].date}
                    </div>
                  </div>
                </article>

                {/* 5º Artigo Popular */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[4])}
                  className="flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer pt-2.5 border-t border-gray-100 dark:border-gray-800/80"
                >
                  <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[4].image}
                      alt={ARTICLES_DATA[4].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[4].title}
                    </h4>
                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[4].date}
                    </div>
                  </div>
                </article>

                {/* 6º Artigo Popular */}
                <article
                  onClick={() => setSelectedArticle(ARTICLES_DATA[5])}
                  className="flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer pt-2.5 border-t border-gray-100 dark:border-gray-800/80"
                >
                  <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                    <img
                      src={ARTICLES_DATA[5].image}
                      alt={ARTICLES_DATA[5].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {ARTICLES_DATA[5].title}
                    </h4>
                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-1 font-normal">
                      {ARTICLES_DATA[5].date}
                    </div>
                  </div>
                </article>

              </div>
            </div>

            {/* ÁREA DE ANÚNCIO LATERAL 1 (Área limpa e preparada, sem texto) */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full min-h-[100px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
            </div>

            {/* 3. CATEGORIAS (Estilo Azul Exclusivo) */}
            <div className="flex flex-col">
              <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
                <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-folder-open text-xs"></i>
                  CATEGORIAS
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-xs">
                <div className="flex flex-col space-y-2 text-xs">
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-brandBlue">
                    Desenvolvimento Web
                  </span>
                  <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                    18
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-brandBlue">
                    Inteligência Artificial
                  </span>
                  <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                    14
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-brandBlue">
                    Hardware & MacBooks
                  </span>
                  <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                    12
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-brandBlue">
                    Games & Emuladores
                  </span>
                  <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                    9
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition-colors group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-brandBlue">
                    Segurança & Cloud
                  </span>
                  <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                    7
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* 4. ATUALIZAÇÕES (Estilo Azul Exclusivo) */}
          <div className="flex flex-col">
            <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
              <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-bolt text-xs"></i>
                ATUALIZAÇÕES
              </div>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold uppercase pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Ao Vivo
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-xs">
              <div className="flex flex-col space-y-3 text-xs">
                <a href="#" className="group block">
                  <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                    <span>AGORA MESMO</span>
                    <span>•</span>
                    <span className="text-gray-400 font-normal">há 12m</span>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brandBlue transition-colors leading-snug">
                    Novo review: testes de performance do chip M4 Max surpreendem desenvolvedores.
                  </p>
                </a>

                <a href="#" className="group block pt-2 border-t border-gray-200/60 dark:border-gray-800/60">
                  <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                    <span>ATUALIZAÇÃO</span>
                    <span>•</span>
                    <span className="text-gray-400 font-normal">há 1h</span>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brandBlue transition-colors leading-snug">
                    Vite 6 lançado com suporte ampliado para módulos ESM e build ultraveloz.
                  </p>
                </a>

                <a href="#" className="group block pt-2 border-t border-gray-200/60 dark:border-gray-800/60">
                  <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                    <span>DESENVOLVIMENTO</span>
                    <span>•</span>
                    <span className="text-gray-400 font-normal">há 3h</span>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brandBlue transition-colors leading-snug">
                    Supabase lança integração aprimorada para rotas e segurança serverless.
                  </p>
                </a>
              </div>
            </div>
          </div>

          {/* 5. AUTORES DO SITE (Estilo Azul Exclusivo) */}
          <div className="flex flex-col">
            <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
              <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-users text-xs"></i>
                AUTORES DO SITE
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 shadow-xs">
              <div className="flex flex-col space-y-3">
                
                {/* Autor 1: Osvaldo José */}
                <div className="flex items-center space-x-3 p-1.5 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 transition-colors">
                  <img
                    src={ASSETS_CONFIG.authors.osvaldo}
                    alt="Osvaldo José"
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      Osvaldo José
                      <span className="bg-brandBlue text-white text-[8px] font-bold px-1.5 py-0.2 uppercase">Lead</span>
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                      Desenvolvedor Full Stack & Fundador
                    </span>
                  </div>
                </div>

                {/* Autor 2: Dev Tech */}
                <div className="flex items-center space-x-3 p-1.5 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 transition-colors border-t border-gray-200/60 dark:border-gray-800/60 pt-2.5">
                  <img
                    src={ASSETS_CONFIG.authors.devTech}
                    alt="Dev Tech"
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Dev Tech
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                      Especialista em React & Frontend
                    </span>
                  </div>
                </div>

                {/* Autor 3: Backend Team */}
                <div className="flex items-center space-x-3 p-1.5 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 transition-colors border-t border-gray-200/60 dark:border-gray-800/60 pt-2.5">
                  <img
                    src={ASSETS_CONFIG.authors.backendTeam}
                    alt="Backend Team"
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Backend Team
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                      Arquitetura de Nuvem & Bancos de Dados
                    </span>
                  </div>
                </div>

                {/* Autor 4: Equipa Games */}
                <div className="flex items-center space-x-3 p-1.5 hover:bg-gray-200/40 dark:hover:bg-gray-800/40 transition-colors border-t border-gray-200/60 dark:border-gray-800/60 pt-2.5">
                  <img
                    src={ASSETS_CONFIG.authors.equipaGames}
                    alt="Equipa Games"
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Equipa Games
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                      Análises de Emuladores & Jogos
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

            {/* ÁREA DE ANÚNCIO LATERAL 2 (Área limpa e preparada 300x250, sem texto) */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full min-h-[250px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 transition-colors"></div>
            </div>

            {/* Bloco de Newsletter na Sidebar */}
            <div className="bg-brandBlue text-white p-4 sm:p-5 shadow-xs text-center">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5 sm:mb-2">Fique Atualizado</h3>
              <p className="text-[11px] sm:text-xs text-white/90 mb-3.5 sm:mb-4 leading-relaxed">
                Receba os artigos mais recentes diretamente no seu e-mail semanalmente.
              </p>
              {sidebarSubscribed ? (
                <div className="bg-white/20 py-2 px-3 text-xs text-white font-medium animate-fadeIn">
                  <i className="fa-solid fa-circle-check mr-1.5"></i>
                  Inscrição confirmada com sucesso!
                </div>
              ) : (
                <form onSubmit={handleSidebarSubscribe} className="flex flex-col space-y-2">
                  <input
                    type="email"
                    required
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    placeholder="O seu e-mail..."
                    className="w-full bg-white text-gray-800 placeholder-gray-400 px-3 py-2 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-black text-white font-semibold text-xs py-2 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Subscrever
                  </button>
                </form>
              )}
            </div>

          </aside>

        </div>
      </main>

      {/* FOOTER (Mobile First: Limpo, Escuro e Adaptável) */}
      <footer className="w-full bg-gray-950 text-gray-400 border-t border-gray-800 py-5 sm:py-6 mt-10 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            {/* Canto Esquerdo: Logo do Blog e Links (Sobre, Termos, Privacidade, Contacto) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <ThemarteenyLogo className="h-6 sm:h-7 w-auto shrink-0" />
              <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-gray-300 font-medium">
                <a href="#" className="hover:text-brandBlue transition-colors py-1">Sobre</a>
                <a href="#" className="hover:text-brandBlue transition-colors py-1">Termos</a>
                <a href="#" className="hover:text-brandBlue transition-colors py-1">Privacidade</a>
                <a href="#" className="hover:text-brandBlue transition-colors py-1">Contacto</a>
              </nav>
            </div>

            {/* Canto Direito: Direitos autorais e Desenvolvedor */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-1 sm:gap-2 text-gray-500 text-center md:text-right">
              <span>&copy; 2026 Themarteeny.</span>
              <span className="hidden sm:inline text-gray-700">•</span>
              <span>
                Desenvolvido por <strong className="text-gray-300 font-medium">Osvaldo José</strong>
              </span>
            </div>
          </div>
        </div>
      </footer>
      {/* MODAL DE LEITURA DO ARTIGO SELECIONADO */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem de Capa do Artigo */}
            <div className="relative aspect-[16/9] w-full bg-gray-950 overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Fechar"
                className="absolute top-2.5 right-2.5 w-8 h-8 bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
              <div className="absolute bottom-2.5 left-2.5">
                <span className="bg-brandBlue text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Conteúdo do Artigo */}
            <div className="p-4 sm:p-6 flex flex-col">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug mb-2.5">
                {selectedArticle.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                <span className="flex items-center gap-1.5">
                  <i className="fa-regular fa-user text-brandBlue"></i>
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-regular fa-clock text-brandBlue"></i>
                  {selectedArticle.date}
                </span>
                {selectedArticle.views && (
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-fire text-brandBlue"></i>
                    {selectedArticle.views}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {selectedArticle.excerpt ||
                  'Este artigo completo traz uma análise aprofundada sobre as novidades do setor, tendências tecnológicas e impactos para desenvolvedores e utilizadores.'}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-gray-400">Compartilhar:</span>
                  <a href="#" className="text-[#1877F2] hover:opacity-80 p-1"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="text-gray-900 dark:text-white hover:opacity-80 p-1"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" className="text-[#0A66C2] hover:opacity-80 p-1"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-3.5 py-1.5 bg-brandBlue hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Fechar Artigo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE 'VOLTAR AO TOPO' */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center gap-2 bg-brandBlue hover:bg-blue-600 text-white shadow-lg p-2.5 sm:px-3.5 sm:py-2.5 transition-all duration-300 ease-out cursor-pointer group border border-white/20 hover:scale-105 active:scale-95 ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <i className="fa-solid fa-arrow-up text-xs sm:text-sm transition-transform duration-300 group-hover:-translate-y-0.5"></i>
        <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">
          Topo
        </span>
      </button>
    </div>
  );
}
