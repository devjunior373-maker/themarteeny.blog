import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategory, slugify } from '../data/articles.data';
import Sidebar from '../components/Sidebar';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categoryName, articles } = getArticlesByCategory(slug || '');

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-5">
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
            <span className="text-xs text-gray-500 dark:text-gray-400 pb-1.5">
              {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-brandBlue/50 overflow-hidden shadow-xs transition-colors"
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
                      {article.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
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
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500">
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
