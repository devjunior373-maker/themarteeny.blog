import { Link } from 'react-router-dom';
import ThemarteenyLogo from '../assets/logo/ThemarteenyLogo';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 border-t border-gray-800 py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-xs">
          {/* Canto Esquerdo: Logo do Blog e Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <Link to="/" className="inline-block active:opacity-85 transition-opacity">
              <ThemarteenyLogo className="h-6 sm:h-7 w-auto shrink-0" />
            </Link>
            <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 sm:gap-x-6 gap-y-2 text-gray-300 font-medium">
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

          {/* Canto Direito: Direitos autorais e Desenvolvedor */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-1.5 sm:gap-2 text-gray-400 text-center md:text-right">
            <span>&copy; 2026 Themarteeny.</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span>
              Desenvolvido por <strong className="text-gray-300 font-medium">Osvaldo José</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
