import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles.data';

export default function Sidebar() {
  const [sidebarEmail, setSidebarEmail] = useState<string>('');
  const [sidebarSubscribed, setSidebarSubscribed] = useState<boolean>(false);

  const handleSidebarSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarEmail.trim()) {
      setSidebarSubscribed(true);
      setTimeout(() => {
        setSidebarSubscribed(false);
        setSidebarEmail('');
      }, 3500);
    }
  };

  const popularArticles = ARTICLES_DATA.slice(0, 6);

  return (
    <aside className="lg:col-span-1 flex flex-col space-y-6 sm:space-y-7 lg:sticky lg:top-20 mt-8 lg:mt-0">
      {/* 1. SIGA-NOS (Estilo Azul Exclusivo) */}
      <div className="flex flex-col">
        <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
          <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
            SIGA-NOS
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mt-2.5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-[#3b5998] hover:bg-[#324b80] text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-facebook-f text-sm"></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-[#14171a] hover:bg-black text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-x-twitter text-sm"></i>
            <span>Twitter</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-youtube text-sm"></i>
            <span>YouTube</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-instagram text-sm"></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-[#0077b5] hover:bg-[#005f91] text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-linkedin-in text-sm"></i>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://skype.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Skype"
            className="flex items-center justify-between min-h-[42px] px-3 py-2 bg-[#00aff0] hover:bg-[#0096ce] text-white text-xs font-semibold transition-transform active:scale-95 shadow-xs"
          >
            <i className="fa-brands fa-skype text-sm"></i>
            <span>Skype</span>
          </a>
        </div>
      </div>

      {/* 2. POSTAGENS POPULARES (Estilo Azul Exclusivo) */}
      <div className="flex flex-col">
        <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3.5">
          <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider">
            POSTAGENS POPULARES
          </div>
        </div>
        <div className="flex flex-col mt-3 space-y-3">
          {/* 1º Artigo Popular: Foto Grande com Texto Sobreposto */}
          {popularArticles[0] && (
            <Link
              to={`/blog/${popularArticles[0].id}`}
              className="relative group cursor-pointer overflow-hidden aspect-[16/10] flex flex-col justify-end bg-black shadow-xs active:scale-[0.99] transition-transform block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={popularArticles[0].image}
                  alt={`Capa do artigo popular: ${popularArticles[0].title}`}
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3 sm:p-3.5 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-[#0080ff] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide mb-1.5 shadow-xs">
                    {popularArticles[0].category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline">
                  {popularArticles[0].title}
                </h4>
                <div className="text-[10px] text-gray-300 mt-1 font-normal">
                  por <strong className="font-semibold text-white">{popularArticles[0].author}</strong> - {popularArticles[0].date}
                </div>
              </div>
            </Link>
          )}

          {/* Demais Artigos Populares: Thumbnail à Esquerda e Título à Direita */}
          {popularArticles.slice(1).map((art, idx) => (
            <Link
              key={art.id}
              to={`/blog/${art.id}`}
              className={`flex items-start space-x-2.5 sm:space-x-3 group cursor-pointer active:bg-gray-100/60 p-1 -mx-1 rounded-xs transition-colors ${
                idx > 0 ? 'pt-2.5 border-t border-gray-100' : 'pt-1'
              }`}
            >
              <div className="w-20 sm:w-24 aspect-[16/11] flex-shrink-0 bg-gray-900 overflow-hidden shadow-xs">
                <img
                  src={art.image}
                  alt={`Miniatura do artigo: ${art.title}`}
                  width={96}
                  height={66}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-start flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                  {art.title}
                </h4>
                <div className="text-[10px] text-gray-400 mt-1 font-normal">
                  {art.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ÁREA DE ANÚNCIO LATERAL 1 (Área limpa e preparada, sem texto) */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full min-h-[80px] xs:min-h-[100px] bg-white border border-gray-200 transition-colors"></div>
      </div>

      {/* 3. CATEGORIAS (Estilo Azul Exclusivo) */}
      <div className="flex flex-col">
        <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
          <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-folder-open text-xs"></i>
            CATEGORIAS
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-3 sm:p-4 shadow-xs">
          <div className="flex flex-col space-y-1.5 sm:space-y-2 text-xs">
            <Link
              to="/categoria/desenvolvimento-web"
              className="flex items-center justify-between min-h-[42px] py-2 px-2.5 hover:bg-gray-200/60 active:bg-brandBlue/10 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-brandBlue">
                Desenvolvimento Web
              </span>
              <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                18
              </span>
            </Link>
            <Link
              to="/categoria/inteligencia-artificial"
              className="flex items-center justify-between min-h-[42px] py-2 px-2.5 hover:bg-gray-200/60 active:bg-brandBlue/10 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-brandBlue">
                Inteligência Artificial
              </span>
              <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                14
              </span>
            </Link>
            <Link
              to="/categoria/hardware-macbooks"
              className="flex items-center justify-between min-h-[42px] py-2 px-2.5 hover:bg-gray-200/60 active:bg-brandBlue/10 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-brandBlue">
                Hardware & MacBooks
              </span>
              <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                12
              </span>
            </Link>
            <Link
              to="/categoria/games-emuladores"
              className="flex items-center justify-between min-h-[42px] py-2 px-2.5 hover:bg-gray-200/60 active:bg-brandBlue/10 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-brandBlue">
                Games & Emuladores
              </span>
              <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                9
              </span>
            </Link>
            <Link
              to="/categoria/seguranca-cloud"
              className="flex items-center justify-between min-h-[42px] py-2 px-2.5 hover:bg-gray-200/60 active:bg-brandBlue/10 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-brandBlue">
                Segurança & Cloud
              </span>
              <span className="text-[10px] bg-brandBlue/10 text-brandBlue font-bold px-2 py-0.5">
                7
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. ATUALIZAÇÕES (Estilo Azul Exclusivo) */}
      <div className="flex flex-col">
        <div className="w-full border-b-2 border-brandBlue flex items-end justify-between mb-3">
          <div className="bg-brandBlue text-white text-xs sm:text-sm font-bold uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bolt text-xs"></i>
            ATUALIZAÇÕES
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold uppercase pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Ao Vivo
          </span>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-3 sm:p-4 shadow-xs">
          <div className="flex flex-col space-y-3 text-xs">
            <Link
              to="/blog/m4-max-performance-tests"
              className="group block py-1 active:opacity-80 transition-opacity"
            >
              <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                <span>AGORA MESMO</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">há 12m</span>
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
                Novo review: testes de performance do chip M4 Max surpreendem desenvolvedores.
              </p>
            </Link>

            <Link
              to="/blog/vite-6-released"
              className="group block pt-2.5 border-t border-gray-200/60 active:opacity-80 transition-opacity"
            >
              <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                <span>ATUALIZAÇÃO</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">há 1h</span>
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
                Vite 6 lançado com suporte ampliado para módulos ESM e build ultraveloz.
              </p>
            </Link>

            <Link
              to="/blog/supabase-integration-serverless"
              className="group block pt-2.5 border-t border-gray-200/60 active:opacity-80 transition-opacity"
            >
              <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-bold mb-0.5">
                <span>DESENVOLVIMENTO</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">há 3h</span>
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
                Supabase lança integração aprimorada para rotas e segurança serverless.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ÁREA DE ANÚNCIO LATERAL 2 (Área limpa e preparada, sem texto) */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full min-h-[200px] xs:min-h-[250px] bg-white border border-gray-200 transition-colors"></div>
      </div>

      {/* Bloco de Newsletter na Sidebar */}
      <div className="bg-brandBlue text-white p-4 sm:p-5 shadow-xs text-center">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5 sm:mb-2">Fique Atualizado</h3>
        <p className="text-[11px] sm:text-xs text-white/90 mb-3.5 sm:mb-4 leading-relaxed">
          Receba os artigos mais recentes diretamente no seu e-mail semanalmente.
        </p>
        {sidebarSubscribed ? (
          <div className="bg-white/20 py-2.5 px-3 text-xs text-white font-medium animate-fadeIn">
            <i className="fa-solid fa-circle-check mr-1.5"></i>
            Inscrição confirmada com sucesso!
          </div>
        ) : (
          <form onSubmit={handleSidebarSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              required
              value={sidebarEmail}
              onChange={(e) => setSidebarEmail(e.target.value)}
              placeholder="O seu e-mail..."
              className="w-full min-h-[44px] bg-white text-gray-800 placeholder-gray-400 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
              type="submit"
              className="w-full min-h-[44px] bg-gray-900 hover:bg-black text-white font-semibold text-xs py-2.5 transition-colors uppercase tracking-wider cursor-pointer active:scale-[0.99]"
            >
              Subscrever
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
