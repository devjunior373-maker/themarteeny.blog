import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ThemarteenyLogo from '../assets/logo/ThemarteenyLogo';
import { ARTICLES_DATA, Article } from '../data/articles.data';

interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Startups', to: '/categoria/startups' },
  { label: 'Notícias', to: '/categoria/noticias' },
  { label: 'Eventos', to: '/categoria/eventos' },
  { label: 'Artigos', to: '/categoria/artigos' },
  { label: 'Mundo', to: '/categoria/mundo' },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLFormElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // Filtragem de artigos por título ao digitar no input
  const filteredArticles = useMemo<Article[]>(() => {
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

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Bloquear rolagem do body quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
      navigate(`/pesquisa?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className="w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between relative">
        {/* ESQUERDA: Menu Hambúrguer (Mobile) + Logotipo */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? 'Fechar Menu de Navegação' : 'Abrir Menu de Navegação'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-brandBlue dark:hover:text-brandBlue min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center focus:outline-none cursor-pointer active:scale-95 transition-all"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark text-xl text-brandBlue' : 'fa-bars text-lg sm:text-xl'}`}></i>
            </button>
          </div>

          <div id="logo-container" className="flex items-center">
            <Link
              to="/"
              className="flex items-center active:opacity-85 transition-opacity"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(false);
              }}
            >
              <ThemarteenyLogo className="h-7 xs:h-7.5 sm:h-8 md:h-9 w-auto max-w-[160px] sm:max-w-none" />
            </Link>
          </div>
        </div>

        {/* CENTRO: Navegação Desktop */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs font-semibold tracking-wide">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `uppercase transition-colors cursor-pointer py-2 ${
                  isActive
                    ? 'text-brandBlue font-bold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brandBlue'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* DIREITA: Lupa de Busca */}
        <div id="right-actions" className="flex items-center">
          <div className="flex items-center relative">
            <button
              ref={searchButtonRef}
              id="search-toggle"
              aria-label={isSearchOpen ? 'Fechar Pesquisa' : 'Pesquisar Artigos'}
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setIsMobileMenuOpen(false);
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-brandBlue transition-colors min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center focus:outline-none cursor-pointer active:scale-95"
            >
              <i className={`fa-solid ${isSearchOpen ? 'fa-xmark text-lg text-brandBlue' : 'fa-magnifying-glass text-base sm:text-lg'}`}></i>
            </button>

            {isSearchOpen && (
              <form
                ref={searchBoxRef}
                id="small-search-box"
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white dark:bg-gray-900 border border-brandBlue/40 dark:border-brandBlue/50 px-2.5 py-1.5 sm:py-2 w-[calc(100vw-5rem)] max-w-[280px] sm:w-56 md:w-64 z-30 shadow-none animate-fadeIn"
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
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 mr-0.5 text-xs cursor-pointer flex-shrink-0"
                  >
                    <i className="fa-solid fa-circle-xmark text-xs"></i>
                  </button>
                )}
                <button
                  id="search-close"
                  type="button"
                  aria-label="Fechar"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 focus:outline-none cursor-pointer flex-shrink-0"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>

                {/* Dropdown de Resultados da Filtragem (Sem sombras, limpo e direto) */}
                {searchQuery.trim().length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2.5rem)] max-w-sm sm:w-72 md:w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-none z-50 max-h-[70vh] sm:max-h-[360px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                    {/* Barra de Contagem */}
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800/60 text-[10px] font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between sticky top-0 z-10">
                      <span>
                        {filteredArticles.length === 1
                          ? '1 artigo encontrado'
                          : `${filteredArticles.length} artigos encontrados`}
                      </span>
                      <button
                        type="submit"
                        className="text-[9px] uppercase tracking-wider text-brandBlue hover:underline font-bold cursor-pointer"
                      >
                        Ver todos &rarr;
                      </button>
                    </div>

                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article) => (
                        <Link
                          key={article.id}
                          to={`/blog/${article.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/70 active:bg-gray-100 dark:active:bg-gray-800 cursor-pointer transition-colors flex items-start space-x-2.5 group text-left block"
                        >
                          <div className="w-12 sm:w-14 aspect-[16/11] flex-shrink-0 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                            <img
                              src={article.image}
                              alt={`Ilustração do artigo: ${article.title}`}
                              width={56}
                              height={38}
                              loading="lazy"
                              decoding="async"
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
                            <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 dark:text-white group-hover:text-brandBlue transition-colors line-clamp-2 leading-tight">
                              {highlightMatch(article.title, searchQuery)}
                            </h4>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-xs">
                          Nenhum artigo encontrado
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                          Sem resultados para "{searchQuery}".
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 flex flex-wrap items-center justify-center gap-1.5">
                          <span>Ex.:</span>
                          <button
                            type="button"
                            onClick={() => setSearchQuery('Macbook')}
                            className="text-brandBlue hover:underline font-semibold cursor-pointer p-0.5"
                          >
                            Macbook
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => setSearchQuery('Laptops')}
                            className="text-brandBlue hover:underline font-semibold cursor-pointer p-0.5"
                          >
                            Laptops
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => setSearchQuery('Opera')}
                            className="text-brandBlue hover:underline font-semibold cursor-pointer p-0.5"
                          >
                            Opera
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-14 sm:top-16 bg-black/60 z-40 md:hidden backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="md:hidden w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4 shadow-none relative z-50 transition-all duration-300 animate-fadeIn"
          >
            {/* Campo de Busca Rápida no Mobile */}
            <form onSubmit={handleSearchSubmit} className="mb-3.5 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800/80 px-3 py-2 border border-gray-300 dark:border-gray-700">
                <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs mr-2.5"></i>
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
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>
            </form>

            {/* Lista de navegação com touch target mínimo de 44px */}
            <nav className="flex flex-col space-y-1 text-xs font-semibold tracking-wide">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `uppercase transition-colors min-h-[44px] flex items-center justify-between px-3.5 py-2.5 cursor-pointer active:scale-[0.99] ${
                      isActive
                        ? 'bg-brandBlue/10 text-brandBlue font-bold border-l-4 border-brandBlue'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brandBlue'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider">
                          Ativo
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Links Sociais no Mobile Menu */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Siga Themarteeny:
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <a href="#" aria-label="Facebook" className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:text-[#3b5998]"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:text-black dark:hover:text-white"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" aria-label="YouTube" className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:text-[#ff0000]"><i className="fa-brands fa-youtube"></i></a>
                <a href="#" aria-label="Instagram" className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:text-[#e1306c]"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
