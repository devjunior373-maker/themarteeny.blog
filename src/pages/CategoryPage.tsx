import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategory, slugify } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import AdcashBanner from '../components/AdcashBanner';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { useJsonLd, BASE_URL } from '../hooks/useJsonLd';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categoryName, articles } = getArticlesByCategory(slug || '');

  useDocumentTitle(categoryName ? `${categoryName} | The Marteeny` : 'Categoria não encontrada | The Marteeny');
  useMetaDescription(
    categoryName
      ? `Confira as últimas notícias, análises e conteúdos publicados na categoria ${categoryName} do The Marteeny.`
      : 'A categoria solicitada não foi encontrada no The Marteeny. Explore outras categorias e matérias em nosso portal.'
  );
  useCanonical(slug ? `https://themarteeny.pages.dev/categoria/${slug}` : null);

  // Schema JSON-LD para CollectionPage com ItemList
  const collectionSchema = useMemo(() => {
    if (!slug || !categoryName) return null;
    const categoryUrl = `${BASE_URL}/categoria/${slug}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${categoryName} | The Marteeny`,
      description: `Confira as últimas notícias, análises e conteúdos publicados na categoria ${categoryName} do The Marteeny.`,
      url: categoryUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BASE_URL}/blog/${article.id}`,
          name: article.title,
        })),
      },
    };
  }, [slug, categoryName, articles]);
  useJsonLd('category-collection', collectionSchema);

  // Schema JSON-LD para BreadcrumbList
  const breadcrumbSchema = useMemo(() => {
    if (!slug || !categoryName) return null;
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
          name: categoryName,
          item: `${BASE_URL}/categoria/${slug}`,
        },
      ],
    };
  }, [slug, categoryName]);
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
        <span className="text-gray-400">Categorias</span>
        <span>/</span>
        <span className="text-brandBlue font-semibold uppercase">
          {categoryName}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLUNA ESQUERDA: Lista de Artigos da Categoria */}
        <section className="lg:col-span-2">
          {/* Banner de Título com Estilo Azul Exclusivo */}
          <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-5">
            <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-folder-open text-xs"></i>
              CATEGORIA: {categoryName}
            </div>
            <span className="text-xs text-gray-500 pb-1.5">
              {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>

          {/* ESPAÇO PUBLICITÁRIO: Topo da Categoria (Espaço Reservado) */}
          <AdcashBanner
            slotName="Categoria - Topo"
            className="mb-5"
          />

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {articles.map((article, idx) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group flex flex-col bg-white border border-gray-200 hover:border-brandBlue/50 overflow-hidden shadow-xs transition-colors"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-900 relative">
                  <img
                    src={article.image}
                    alt={`Imagem do artigo: ${article.title}`}
                    width={500}
                    height={312}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-brandBlue text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brandBlue transition-colors leading-snug line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                    <span className="truncate max-w-[120px]">
                      Por {article.author}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="p-8 text-center bg-gray-50 border border-gray-200 text-gray-500">
              Nenhum artigo encontrado nesta categoria no momento.
            </div>
          )}
        </section>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
