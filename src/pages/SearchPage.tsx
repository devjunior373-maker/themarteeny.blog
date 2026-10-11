import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ARTICLES_DATA, Article } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { useRobotsMeta } from '../hooks/useRobotsMeta';
import { useJsonLd, BASE_URL } from '../hooks/useJsonLd';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);

  // Impedir indexação de páginas de busca interna para poupar crawl budget e evitar conteúdo duplicado/fino
  useRobotsMeta('noindex, follow');

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

  const searchResultsSchema = useMemo(() => {
    const url = queryParam.trim()
      ? `${BASE_URL}/pesquisa?q=${encodeURIComponent(queryParam.trim())}`
      : `${BASE_URL}/pesquisa`;

    return {
      '@context': 'https://schema.org',
      '@type': 'SearchResultsPage',
      name: searchTitle,
      description: searchDescription,
      url,
    };
  }, [queryParam, searchTitle, searchDescription]);
  useJsonLd('search-results', searchResultsSchema);

  const breadcrumbSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Pesquisa',
          item: `${BASE_URL}/pesquisa`,
        },
      ],
    };
  }, []);
  useJsonLd('breadcrumb', breadcrumbSchema);

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
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 mb-5">
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
          {/* Cabeçalho da Pesquisa com Estilo Editorial */}
          <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2.5 mb-5">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-brandBlue inline-block rounded-xs"></span>
              <h1 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                Pesquisa {queryParam ? `: "${queryParam}"` : ''}
              </h1>
            </div>
            {queryParam && (
              <span className="text-xs text-gray-500 font-medium">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </span>
            )}
          </div>

          {/* Barra de Pesquisa Integrada na Página */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex items-center border border-gray-300 bg-white rounded-xs focus-within:border-brandBlue">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Digite palavras-chave, artigos, marcas ou temas..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brandBlue hover:opacity-90 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-opacity cursor-pointer shrink-0 rounded-r-xs"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Listagem de Resultados */}
          {queryParam.trim() ? (
            results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {results.map((article, idx) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="group flex flex-col bg-white border border-gray-200 hover:border-gray-300 overflow-hidden rounded-xs transition-colors"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={article.image}
                        alt={`Resultado da pesquisa: ${article.title}`}
                        width={500}
                        height={312}
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-brandBlue text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h2 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brandBlue transition-colors leading-snug line-clamp-2 mb-2">
                          {highlightMatch(article.title, queryParam)}
                        </h2>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2.5 border-t border-gray-100">
                        <span className="truncate max-w-[120px] text-gray-600 font-medium">
                          Por {article.author}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white border border-gray-200 text-gray-600 rounded-xs">
                <i className="fa-solid fa-magnifying-glass text-gray-300 text-3xl mb-3 block"></i>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                  Não encontramos matérias para "{queryParam}". Tente utilizar palavras-chave mais genéricas.
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
                      className="px-3 py-1 bg-white border border-gray-200 text-xs text-gray-700 hover:text-brandBlue hover:border-gray-300 transition-colors cursor-pointer rounded-xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="p-8 text-center bg-white border border-gray-200 text-gray-600 rounded-xs">
              <i className="fa-solid fa-keyboard text-gray-300 text-3xl mb-3 block"></i>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Explore todo o acervo do The Marteeny
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Digite um termo no campo de busca acima para encontrar análises, notícias e tutoriais.
              </p>
            </div>
          )}
        </section>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
