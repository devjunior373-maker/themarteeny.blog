import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ARTICLES_DATA, Article } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);

  const searchTitle = queryParam.trim()
    ? `Pesquisa: ${queryParam.trim()} | The Marteeny`
    : 'Pesquisar | The Marteeny';
  useDocumentTitle(searchTitle);

  const searchDescription = queryParam.trim()
    ? `Resultados de pesquisa por ${queryParam.trim()} no The Marteeny.`
    : 'Pesquise notícias, artigos, dicas e conteúdos sobre tecnologia no The Marteeny.';
  useMetaDescription(searchDescription);

  // A canonical oficial é sempre https://themarteeny.pages.dev/pesquisa sem parâmetros nem alias
  useCanonical('https://themarteeny.pages.dev/pesquisa');

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const results = useMemo<Article[]>(() => {
    const trimmed = queryParam.trim().toLowerCase();
    if (!trimmed) return [];
    return ARTICLES_DATA.filter((article) => {
      const titleMatches = article.title.toLowerCase().includes(trimmed);
      const categoryMatches = article.category.toLowerCase().includes(trimmed);
      const excerptMatches = (article.excerpt || '').toLowerCase().includes(trimmed);
      const authorMatches = article.author.toLowerCase().includes(trimmed);
      return titleMatches || categoryMatches || excerptMatches || authorMatches;
    });
  }, [queryParam]);

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

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-5">
        <Link to="/" className="hover:text-brandBlue transition-colors flex items-center gap-1">
          <i className="fa-solid fa-house text-[10px]"></i>
          <span>Início</span>
        </Link>
        <span>/</span>
        <span className="text-gray-400">Pesquisa</span>
        {queryParam && (
          <>
            <span>/</span>
            <span className="text-brandBlue font-semibold">"{queryParam}"</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLUNA ESQUERDA: Resultados da Pesquisa */}
        <section className="lg:col-span-2">
          {/* Banner de Título com Estilo Azul Exclusivo */}
          <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-4">
            <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
              PESQUISA {queryParam ? `: "${queryParam}"` : ''}
            </div>
            {queryParam && (
              <span className="text-xs text-gray-500 dark:text-gray-400 pb-1.5">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </span>
            )}
          </div>

          {/* Barra de Pesquisa Integrada na Página */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Digite palavras-chave, artigos, marcas ou temas..."
                className="w-full px-4 py-3 text-xs sm:text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brandBlue hover:bg-blue-600 text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Listagem de Resultados */}
          {queryParam.trim() ? (
            results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {results.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="group flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-brandBlue/50 overflow-hidden shadow-none transition-colors"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-gray-900 relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-brandBlue text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-brandBlue transition-colors leading-snug line-clamp-2 mb-2">
                          {highlightMatch(article.title, queryParam)}
                        </h2>
                        <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>Por {article.author}</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <i className="fa-solid fa-circle-question text-3xl text-gray-400 mb-3 block"></i>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1">
                  Nenhum resultado encontrado para "{queryParam}"
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Tente verificar a ortografia ou pesquisar termos mais gerais como "Apple", "Android", "MacBook", "Laptops" ou "Web".
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['Opera', 'MacBook', 'Laptops', 'Vite', 'Android'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchInput(term);
                        setSearchParams({ q: term });
                      }}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs text-brandBlue hover:border-brandBlue transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 text-xs">
              Digite um termo na caixa acima para pesquisar entre os artigos do The Marteeny.
            </div>
          )}
        </section>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
