import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, ARTICLES_DATA, slugify } from '../data/articles.data';
import Sidebar from '../components/Sidebar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const [copied, setCopied] = useState(false);

  useDocumentTitle(article ? `${article.title} | The Marteeny` : 'Artigo não encontrado | The Marteeny');
  useMetaDescription(
    article
      ? (article.excerpt || `Confira no The Marteeny o artigo completo sobre ${article.title}. Análises, tutoriais e novidades de tecnologia.`)
      : 'O artigo solicitado não foi encontrado no The Marteeny. Explore outros conteúdos e novidades de tecnologia em nossa página inicial.'
  );
  // Canonical oficial de artigos é sempre https://themarteeny.pages.dev/blog/:slug
  useCanonical(article ? `https://themarteeny.pages.dev/blog/${article.id}` : null);

  if (!article) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center text-2xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Artigo não encontrado
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              O artigo com a URL <code className="text-brandBlue font-mono">/blog/{slug}</code> não foi encontrado ou pode ter sido movido.
            </p>
            <Link
              to="/"
              className="px-5 py-2.5 bg-brandBlue hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Voltar à Página Inicial
            </Link>
          </div>
          <Sidebar />
        </div>
      </main>
    );
  }

  const relatedArticles = ARTICLES_DATA
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://themarteeny.pages.dev/blog/${article.id}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const categorySlug = slugify(article.category);
  const authorSlug = slugify(article.author);

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* BREADCRUMB NAVEGAÇÃO */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-5">
        <Link to="/" className="hover:text-brandBlue transition-colors flex items-center gap-1">
          <i className="fa-solid fa-house text-[10px]"></i>
          <span>Início</span>
        </Link>
        <span>/</span>
        <Link to={`/categoria/${categorySlug}`} className="hover:text-brandBlue transition-colors uppercase font-medium">
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-semibold truncate max-w-[200px] sm:max-w-md">
          {article.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLUNA ESQUERDA: Artigo Principal */}
        <article className="lg:col-span-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 sm:p-7 shadow-xs">
          
          {/* Categoria Badge */}
          <div className="mb-3">
            <Link
              to={`/categoria/${categorySlug}`}
              className="inline-block bg-brandBlue text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider hover:bg-blue-600 transition-colors"
            >
              {article.category}
            </Link>
          </div>

          {/* Título Principal */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* Metadados: Autor, Data, Visualizações */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400 pb-4 mb-6 border-b border-gray-100 dark:border-gray-800">
            <Link
              to={`/autor/${authorSlug}`}
              className="flex items-center gap-1.5 hover:text-brandBlue transition-colors font-medium"
            >
              <i className="fa-regular fa-user text-brandBlue"></i>
              <span>Por {article.author}</span>
            </Link>
            <span className="flex items-center gap-1.5">
              <i className="fa-regular fa-clock text-brandBlue"></i>
              <span>{article.date}</span>
            </span>
            {article.views && (
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-fire text-brandBlue"></i>
                <span>{article.views}</span>
              </span>
            )}
          </div>

          {/* Imagem de Capa do Artigo */}
          <div className="relative aspect-[16/9] w-full bg-gray-900 overflow-hidden mb-6 shadow-xs">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conteúdo Textual do Artigo */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-relaxed border-l-3 border-brandBlue pl-3.5 italic bg-blue-50/40 dark:bg-gray-900/60 py-2">
              {article.excerpt ||
                'Descubra como as mais recentes tecnologias e desenvolvimentos impactam o ecossistema digital.'}
            </p>

            <p>
              O avanço contínuo do setor impulsiona novas abordagens em engenharia de software, design de interfaces e arquitetura de sistemas. Profissionais de desenvolvimento e entusiastas acompanham de perto as melhorias de desempenho, estabilidade e usabilidade apresentadas nos lançamentos recentes.
            </p>

            <p>
              Entre os pontos de maior destaque, os dados demonstram ganhos significativos em tempo de resposta e retenção de utilizadores em plataformas que adotam padrões modernos de otimização de renderização e infraestrutura distribuída na nuvem.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 my-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-brandBlue"></i>
                Destaques da Análise
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <li>Otimizações nativas com suporte ampliado a ambientes modernos.</li>
                <li>Redução no consumo de memória e aceleração do carregamento.</li>
                <li>Compatibilidade garantida com padrões abertos da indústria web.</li>
              </ul>
            </div>

            <p>
              Em resumo, acompanhar estas transformações é essencial para manter soluções digitais competitivas, velozes e alinhadas às expectativas mais exigentes do mercado global.
            </p>
          </div>

          {/* Barra de Compartilhamento Social e Ações */}
          <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400 font-semibold mr-1">Compartilhar:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartilhar no Facebook"
                className="w-9 h-9 flex items-center justify-center bg-[#1877F2] text-white hover:opacity-90 transition-opacity active:scale-95"
              >
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartilhar no Twitter"
                className="w-9 h-9 flex items-center justify-center bg-black dark:bg-gray-800 text-white hover:opacity-90 transition-opacity active:scale-95"
              >
                <i className="fa-brands fa-x-twitter text-xs"></i>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartilhar no LinkedIn"
                className="w-9 h-9 flex items-center justify-center bg-[#0A66C2] text-white hover:opacity-90 transition-opacity active:scale-95"
              >
                <i className="fa-brands fa-linkedin-in text-xs"></i>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartilhar no WhatsApp"
                className="w-9 h-9 flex items-center justify-center bg-[#25D366] text-white hover:opacity-90 transition-opacity active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-xs"></i>
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copiar link"
                title="Copiar link"
                className="h-9 px-3 flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-medium cursor-pointer"
              >
                <i className="fa-solid fa-link text-xs"></i>
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <Link
              to="/"
              className="min-h-[38px] px-4 py-2 bg-brandBlue hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left text-[10px]"></i>
              <span>Voltar ao Início</span>
            </Link>
          </div>

          {/* ARTIGOS RELACIONADOS */}
          <div className="mt-10 pt-6 border-t-2 border-brandBlue">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brandBlue flex items-center gap-2">
                <i className="fa-solid fa-newspaper text-xs"></i>
                Artigos Relacionados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.id}`}
                  className="group block bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-brandBlue/50 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-900">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5">
                    <span className="text-[9px] text-brandBlue font-bold uppercase">
                      {rel.category}
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 mt-1 group-hover:text-brandBlue transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 mt-1.5 block">
                      {rel.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* COLUNA DIREITA: Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
