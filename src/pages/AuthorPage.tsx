import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByAuthor } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { useJsonLd, BASE_URL } from '../hooks/useJsonLd';

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { authorName, articles } = getArticlesByAuthor(slug || '');

  useDocumentTitle(slug && authorName ? `Artigos de ${authorName} | The Marteeny` : 'Autor não encontrado | The Marteeny');
  useMetaDescription(
    slug && authorName
      ? `Confira os artigos publicados por ${authorName} no The Marteeny.`
      : 'O autor procurado não foi encontrado no The Marteeny. Explore matérias e outros autores em nosso portal.'
  );
  useCanonical(slug && authorName ? `https://themarteeny.pages.dev/autor/${slug}` : null);

  // Schema JSON-LD para ProfilePage com Person
  const profileSchema = useMemo(() => {
    if (!slug || !authorName) return null;
    const authorUrl = `${BASE_URL}/autor/${slug}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: authorUrl,
      name: `Artigos de ${authorName} | The Marteeny`,
      mainEntity: {
        '@type': 'Person',
        name: authorName,
        url: authorUrl,
      },
    };
  }, [slug, authorName]);
  useJsonLd('author-profile', profileSchema);

  // Schema JSON-LD para BreadcrumbList
  const breadcrumbSchema = useMemo(() => {
    if (!slug || !authorName) return null;
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
          name: authorName,
          item: `${BASE_URL}/autor/${slug}`,
        },
      ],
    };
  }, [slug, authorName]);
  useJsonLd('breadcrumb', breadcrumbSchema);

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 mb-5">
        <Link to="/" className="hover:text-brandBlue transition-colors flex items-center gap-1">
          <i className="fa-solid fa-house text-[10px]"></i>
          <span>Início</span>
        </Link>
        <span>/</span>
        <span className="text-gray-400">Autores</span>
        <span>/</span>
        <span className="text-brandBlue font-semibold">
          {authorName}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLUNA ESQUERDA: Artigos do Autor */}
        <section className="lg:col-span-2">
          {/* Cabeçalho do Autor com Estilo Editorial */}
          <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2.5 mb-5">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-brandBlue inline-block rounded-xs"></span>
              <h1 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
                Autor: {authorName}
              </h1>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {articles.length} {articles.length === 1 ? 'publicação' : 'publicações'}
            </span>
          </div>

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {articles.map((article, idx) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group flex flex-col bg-white border border-gray-200 overflow-hidden rounded-xs transition-colors"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={article.image}
                    alt={`Artigo de ${authorName}: ${article.title}`}
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
                      {article.title}
                    </h2>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2.5 border-t border-gray-100">
                    <span className="text-gray-600 font-medium">{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
