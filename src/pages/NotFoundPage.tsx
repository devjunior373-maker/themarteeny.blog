import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { useRobotsMeta } from '../hooks/useRobotsMeta';

export default function NotFoundPage() {
  useDocumentTitle('Página não encontrada | The Marteeny');
  useMetaDescription('A página que você procura não foi encontrada no The Marteeny. Volte à página inicial para continuar navegando.');
  // Páginas 404 não devem possuir URL canônica para não sugerir indexação
  useCanonical(null);
  // Impedir explicitamente indexação de URLs inexistentes por bots/crawlers
  useRobotsMeta('noindex, nofollow');

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 mb-5">
        <Link to="/" className="hover:text-brandBlue transition-colors flex items-center gap-1">
          <i className="fa-solid fa-house text-[10px]"></i>
          <span>Início</span>
        </Link>
        <span>/</span>
        <span className="text-brandBlue font-semibold">404</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLUNA ESQUERDA: Erro 404 */}
        <section className="lg:col-span-2 bg-white border border-gray-200 p-8 sm:p-12 text-center rounded-xs">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-brandBlue text-2xl font-bold mb-4">
            404
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Página Não Encontrada
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
            O endereço que solicitou não existe, foi removido ou mudou de local. Verifique a URL ou explore as categorias e novidades na página inicial.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 bg-brandBlue hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider transition-opacity inline-flex items-center gap-2 rounded-xs"
            >
              <i className="fa-solid fa-house text-xs"></i>
              <span>Página Inicial</span>
            </Link>
            <Link
              to="/categoria/noticias"
              className="px-5 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs"
            >
              Ver Notícias
            </Link>
          </div>
        </section>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
