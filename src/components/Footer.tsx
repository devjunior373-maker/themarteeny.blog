import { Link } from 'react-router-dom';
import ThemarteenyLogo from '../assets/logo/ThemarteenyLogo';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 border-t border-gray-800 py-8 sm:py-10 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação Secundária de Categorias no Rodapé */}
        <div className="pb-6 mb-6 border-b border-gray-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Categorias em Destaque:
          </span>
          <nav aria-label="Categorias no Rodapé" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <Link to="/categoria/startups" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Startups
            </Link>
            <Link to="/categoria/noticias" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Notícias
            </Link>
            <Link to="/categoria/eventos" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Eventos
            </Link>
            <Link to="/categoria/artigos" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Artigos
            </Link>
            <Link to="/categoria/mundo" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Mundo
            </Link>
            <Link to="/categoria/desenvolvimento-web" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Desenvolvimento Web
            </Link>
            <Link to="/categoria/inteligencia-artificial" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Inteligência Artificial
            </Link>
            <Link to="/categoria/hardware-macbooks" className="text-gray-300 hover:text-brandBlue transition-colors py-1">
              Hardware & MacBooks
            </Link>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-xs">
          {/* Canto Esquerdo: Logo do Blog e Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <Link to="/" className="inline-block active:opacity-85 transition-opacity" aria-label="The Marteeny - Página Inicial">
              <ThemarteenyLogo className="h-6 sm:h-7 w-auto shrink-0" />
            </Link>
            <nav aria-label="Links Institucionais" className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 sm:gap-x-6 gap-y-2 text-gray-300 font-medium">
              <Link to="/sobre" className="min-h-[38px] flex items-center hover:text-brandBlue active:text-brandBlue transition-colors py-1 px-1">
                Sobre
              </Link>
              <Link to="/termos" className="min-h-[38px] flex items-center hover:text-brandBlue active:text-brandBlue transition-colors py-1 px-1">
                Termos
              </Link>
              <Link to="/privacidade" className="min-h-[38px] flex items-center hover:text-brandBlue active:text-brandBlue transition-colors py-1 px-1">
                Privacidade
              </Link>
              <Link to="/contacto" className="min-h-[38px] flex items-center hover:text-brandBlue active:text-brandBlue transition-colors py-1 px-1">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Canto Direito: Direitos autorais e Desenvolvedor com link para autor */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-1.5 sm:gap-2 text-gray-400 text-center md:text-right">
            <span>&copy; 2026 Themarteeny.</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span>
              Desenvolvido por{' '}
              <Link to="/autor/osvaldo-jose" className="text-gray-300 font-medium hover:text-brandBlue transition-colors underline-offset-2 hover:underline">
                Osvaldo José
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
