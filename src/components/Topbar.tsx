import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div
      id="site-topbar"
      className="w-full bg-[#FFFFFF] text-gray-700 h-10 border-b border-[#E9EAED]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* LADO ESQUERDO: Links institucionais na ordem exata: Lar, Sobre, Contate-nos */}
        <nav
          aria-label="Navegação Secundária Superior"
          className="flex items-center space-x-3 sm:space-x-5 text-[12px] sm:text-[13px] font-medium tracking-normal"
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-950 transition-colors py-1 focus:outline-hidden focus:text-gray-950"
          >
            Lar
          </Link>
          <Link
            to="/sobre"
            className="text-gray-700 hover:text-gray-950 transition-colors py-1 focus:outline-hidden focus:text-gray-950"
          >
            Sobre
          </Link>
          <Link
            to="/contacto"
            className="text-gray-700 hover:text-gray-950 transition-colors py-1 focus:outline-hidden focus:text-gray-950"
          >
            Contate-nos
          </Link>
        </nav>

        {/* LADO DIREITO: Facebook e Instagram com ícones SVG e nomes */}
        <div
          aria-label="Redes Sociais Oficiais"
          className="flex items-center space-x-3 sm:space-x-5 text-[12px] sm:text-[13px] text-gray-700 font-medium tracking-normal"
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook (abre em nova aba)"
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-950 transition-colors py-1 focus:outline-hidden focus:text-gray-950"
          >
            <i className="fa-brands fa-facebook-f text-xs leading-none" aria-hidden="true"></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (abre em nova aba)"
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-950 transition-colors py-1 focus:outline-hidden focus:text-gray-950"
          >
            <i className="fa-brands fa-instagram text-xs leading-none" aria-hidden="true"></i>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
