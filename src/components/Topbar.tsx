import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div
      id="site-topbar"
      className="w-full bg-[#FFFFFF] text-gray-700 overflow-hidden"
      style={{
        boxSizing: 'border-box',
        height: '33px',
        maxHeight: '33px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E9EAED',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 'normal',
      }}
    >
      {/* Contentor com largura de 1111px em desktop, centrado, altura total de 33px via border-box */}
      <div
        className="mx-auto px-2 sm:px-4 md:px-0 flex items-center justify-between w-full md:w-[1111px] md:max-w-[1111px] h-full overflow-hidden"
        style={{
          boxSizing: 'border-box',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: 'normal',
        }}
      >
        {/* LADO ESQUERDO: Links institucionais na ordem exata: Lar, Sobre, Contate-nos */}
        <nav
          aria-label="Navegação Secundária Superior"
          className="flex items-center space-x-2 sm:space-x-4 md:space-x-5 h-full whitespace-nowrap overflow-hidden shrink"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 'normal',
          }}
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-950 transition-colors inline-flex items-center h-full focus:outline-hidden focus:text-gray-950 shrink-0"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 'normal',
            }}
          >
            Lar
          </Link>
          <Link
            to="/sobre"
            className="text-gray-700 hover:text-gray-950 transition-colors inline-flex items-center h-full focus:outline-hidden focus:text-gray-950 shrink-0"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 'normal',
            }}
          >
            Sobre
          </Link>
          <Link
            to="/contacto"
            className="text-gray-700 hover:text-gray-950 transition-colors inline-flex items-center h-full focus:outline-hidden focus:text-gray-950 shrink-0"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 'normal',
            }}
          >
            Contate-nos
          </Link>
        </nav>

        {/* LADO DIREITO: Facebook e Instagram com ícones e nomes */}
        <div
          aria-label="Redes Sociais Oficiais"
          className="flex items-center space-x-2 sm:space-x-4 md:space-x-5 text-gray-700 h-full whitespace-nowrap shrink-0"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 'normal',
          }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook (abre em nova aba)"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-gray-950 transition-colors h-full focus:outline-hidden focus:text-gray-950"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 'normal',
            }}
          >
            <i className="fa-brands fa-facebook-f text-xs leading-none" aria-hidden="true"></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (abre em nova aba)"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-gray-950 transition-colors h-full focus:outline-hidden focus:text-gray-950"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 'normal',
            }}
          >
            <i className="fa-brands fa-instagram text-xs leading-none" aria-hidden="true"></i>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
