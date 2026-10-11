import { Link } from 'react-router-dom';
import ThemarteenyLogo from '../assets/logo/ThemarteenyLogo';

export default function HeaderBrandArea() {
  return (
    <div
      id="header-brand-area"
      className="w-full bg-[#FFFFFF]"
      style={{
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
      }}
    >
      {/* Contentor de 1111px em desktop com altura de 140px e alinhamento vertical ao centro */}
      <div
        className="mx-auto px-4 md:px-0 w-full md:w-[1111px] md:max-w-[1111px] h-auto min-h-[70px] sm:min-h-[90px] md:h-[140px] flex items-center justify-between py-3 md:py-0 overflow-hidden"
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* LADO ESQUERDO: Logótipo oficial do The Marteeny com link para a página inicial */}
        <div className="flex items-center shrink-0">
          <Link
            to="/"
            aria-label="The Marteeny - Página Inicial"
            className="inline-flex items-center hover:opacity-90 transition-opacity focus:outline-hidden"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
            }}
          >
            <ThemarteenyLogo className="h-10 sm:h-12 md:h-13 w-auto object-contain" />
          </Link>
        </div>

        {/* LADO DIREITO: Card publicitário reservado de 728x98px com preenchimento #F5F6F7, sem bordas, sem contorno e sem sombras */}
        <div
          id="adcash-header-leaderboard"
          data-slot-name="Header Leaderboard"
          className="hidden lg:flex items-center justify-center w-[728px] h-[98px] bg-[#F5F6F7] shrink-0 select-none"
          style={{
            width: '728px',
            height: '98px',
            backgroundColor: '#F5F6F7',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            boxSizing: 'border-box',
          }}
          aria-label="Espaço publicitário reservado 728x98"
        >
          {/* Estrutura reservada para futuro anúncio Adcash, sem IDs inventados e sem scripts duplicados */}
          <div
            className="w-full h-full flex flex-col items-center justify-center text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1">
              Publicidade
            </span>
            <span className="text-[11px] font-normal text-gray-400 tracking-wide leading-none">
              Espaço Reservado (728 × 98px)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
