/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';

// Code splitting nas rotas secundárias para diminuir o JavaScript inicial sem impactar a Home crítica
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AuthorPage = lazy(() => import('./pages/AuthorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Fallback visual discreto com preservação do layout e acessibilidade
const PageLoadingFallback = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[40vh]" role="status" aria-label="Carregando conteúdo">
    <div className="w-8 h-8 rounded-full border-3 border-gray-200 dark:border-gray-800 border-t-brandBlue animate-spin"></div>
  </div>
);

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors duration-200 overflow-x-hidden flex flex-col justify-between">
        <div>
          {/* HEADER PRINCIPAL */}
          <Header />

          {/* ROTAS DO PORTAL */}
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              {/* Página Inicial (síncrona, renderização imediata sem fallback) */}
              <Route path="/" element={<HomePage />} />

              {/* Página de Artigo com Slugs Amigáveis */}
              <Route path="/blog/:slug" element={<ArticlePage />} />
              <Route path="/artigo/:slug" element={<ArticlePage />} />

              {/* Página de Categoria */}
              <Route path="/categoria/:slug" element={<CategoryPage />} />

              {/* Página de Pesquisa */}
              <Route path="/pesquisa" element={<SearchPage />} />
              <Route path="/busca" element={<SearchPage />} />

              {/* Página de Autor */}
              <Route path="/autor/:slug" element={<AuthorPage />} />

              {/* Página 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>

        {/* FOOTER */}
        <Footer />

        {/* BOTÃO FLUTUANTE 'VOLTAR AO TOPO' */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center gap-2 bg-brandBlue hover:bg-blue-600 text-white shadow-xl p-2.5 sm:px-3.5 sm:py-2.5 transition-all duration-300 ease-out cursor-pointer group border border-white/20 hover:scale-105 active:scale-90 ${
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
    </BrowserRouter>
  );
}
