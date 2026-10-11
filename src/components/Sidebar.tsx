import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articles.data';
import AdcashBanner from './AdcashBanner';

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
    <aside className="lg:col-span-1 flex flex-col space-y-7 lg:sticky lg:top-20 mt-8 lg:mt-0">
      {/* 1. SIGA-NOS (Editorial sóbrio e limpo) */}
      <div className="flex flex-col">
        <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-3.5">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
            Siga-nos
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mt-1">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-facebook-f text-xs text-[#1877f2]"></i>
              <span>Facebook</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-x-twitter text-xs text-gray-900"></i>
              <span>Twitter</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-youtube text-xs text-[#ff0000]"></i>
              <span>YouTube</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-instagram text-xs text-[#e1306c]"></i>
              <span>Instagram</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-linkedin-in text-xs text-[#0a66c2]"></i>
              <span>LinkedIn</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-between min-h-[40px] px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors rounded-xs"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-brands fa-github text-xs text-gray-900"></i>
              <span>GitHub</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-gray-400"></i>
          </a>
        </div>
      </div>

      {/* 2. POSTAGENS POPULARES */}
      <div className="flex flex-col">
        <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-3.5">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
            Mais Lidos
          </h3>
        </div>
        <div className="flex flex-col space-y-3">
          {/* 1º Artigo Popular: Foto com sobreposição limpa */}
          {popularArticles[0] && (
            <Link
              to={`/blog/${popularArticles[0].id}`}
              className="relative group cursor-pointer overflow-hidden aspect-[16/10] flex flex-col justify-end bg-gray-900 rounded-xs block"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={popularArticles[0].image}
                  alt={`Capa do artigo popular: ${popularArticles[0].title}`}
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-3.5 flex flex-col justify-end">
                <div>
                  <span className="inline-block bg-brandBlue text-white text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mb-1.5 rounded-xs">
                    {popularArticles[0].category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {popularArticles[0].title}
                </h4>
                <div className="text-[11px] text-gray-300 mt-1 font-normal">
                  por {popularArticles[0].author} • {popularArticles[0].date}
                </div>
              </div>
            </Link>
          )}

          {/* Demais Artigos Populares: Estilo lista editorial */}
          <div className="divide-y divide-gray-100">
            {popularArticles.slice(1).map((art, idx) => (
              <Link
                key={art.id}
                to={`/blog/${art.id}`}
                className="flex items-start space-x-3 group cursor-pointer hover:bg-gray-50/70 p-2 rounded-xs transition-colors"
              >
                <span className="text-xs font-bold text-gray-300 group-hover:text-brandBlue w-4 pt-0.5 select-none">
                  0{idx + 2}
                </span>
                <div className="w-16 aspect-[16/11] flex-shrink-0 bg-gray-100 overflow-hidden rounded-xs">
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
                  <h4 className="text-xs font-semibold text-gray-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <div className="text-[10px] text-gray-400 mt-1">
                    {art.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ÁREA DE ANÚNCIO LATERAL 1 (Espaço Reservado) */}
      <AdcashBanner
        slotName="Barra Lateral - Superior"
        minHeight="min-h-[80px] xs:min-h-[100px]"
        className="my-1"
      />

      {/* 3. CATEGORIAS */}
      <div className="flex flex-col">
        <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-3.5">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
            Categorias
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          <Link
            to="/categoria/desenvolvimento-web"
            className="flex items-center justify-between min-h-[38px] py-1.5 px-2 hover:bg-gray-50/70 transition-colors group rounded-xs"
          >
            <span className="text-xs font-medium text-gray-700 group-hover:text-brandBlue">
              Desenvolvimento Web
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              18
            </span>
          </Link>
          <Link
            to="/categoria/inteligencia-artificial"
            className="flex items-center justify-between min-h-[38px] py-1.5 px-2 hover:bg-gray-50/70 transition-colors group rounded-xs"
          >
            <span className="text-xs font-medium text-gray-700 group-hover:text-brandBlue">
              Inteligência Artificial
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              14
            </span>
          </Link>
          <Link
            to="/categoria/hardware-macbooks"
            className="flex items-center justify-between min-h-[38px] py-1.5 px-2 hover:bg-gray-50/70 transition-colors group rounded-xs"
          >
            <span className="text-xs font-medium text-gray-700 group-hover:text-brandBlue">
              Hardware & MacBooks
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              12
            </span>
          </Link>
          <Link
            to="/categoria/games-emuladores"
            className="flex items-center justify-between min-h-[38px] py-1.5 px-2 hover:bg-gray-50/70 transition-colors group rounded-xs"
          >
            <span className="text-xs font-medium text-gray-700 group-hover:text-brandBlue">
              Games & Emuladores
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              9
            </span>
          </Link>
          <Link
            to="/categoria/seguranca-cloud"
            className="flex items-center justify-between min-h-[38px] py-1.5 px-2 hover:bg-gray-50/70 transition-colors group rounded-xs"
          >
            <span className="text-xs font-medium text-gray-700 group-hover:text-brandBlue">
              Segurança & Cloud
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              7
            </span>
          </Link>
        </div>
      </div>

      {/* 4. ATUALIZAÇÕES */}
      <div className="flex flex-col">
        <div className="w-full border-b border-gray-200 flex items-center justify-between pb-2 mb-3.5">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900">
            Em Tempo Real
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ao Vivo
          </span>
        </div>
        <div className="divide-y divide-gray-100 text-xs">
          <Link
            to="/blog/m4-max-performance-tests"
            className="group block py-2.5 px-1 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-semibold mb-1">
              <span>AGORA MESMO</span>
              <span>•</span>
              <span className="text-gray-400 font-normal">há 12m</span>
            </div>
            <p className="font-medium text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
              Novo review: testes de performance do chip M4 Max surpreendem desenvolvedores.
            </p>
          </Link>

          <Link
            to="/blog/vite-6-released"
            className="group block py-2.5 px-1 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-semibold mb-1">
              <span>ATUALIZAÇÃO</span>
              <span>•</span>
              <span className="text-gray-400 font-normal">há 1h</span>
            </div>
            <p className="font-medium text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
              Vite 6 lançado com suporte ampliado para módulos ESM e build ultraveloz.
            </p>
          </Link>

          <Link
            to="/blog/supabase-integration-serverless"
            className="group block py-2.5 px-1 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center space-x-1.5 text-[10px] text-brandBlue font-semibold mb-1">
              <span>DESENVOLVIMENTO</span>
              <span>•</span>
              <span className="text-gray-400 font-normal">há 3h</span>
            </div>
            <p className="font-medium text-gray-800 group-hover:text-brandBlue transition-colors leading-snug">
              Supabase lança integração aprimorada para rotas e segurança serverless.
            </p>
          </Link>
        </div>
      </div>

      {/* ÁREA DE ANÚNCIO LATERAL 2 (Espaço Reservado) */}
      <AdcashBanner
        slotName="Barra Lateral - Inferior"
        minHeight="min-h-[200px] xs:min-h-[250px]"
        className="my-1"
      />

      {/* Bloco de Newsletter na Sidebar */}
      <div className="bg-white border border-gray-200 p-5 rounded-xs text-center">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 mb-1.5">
          Boletim Informativo
        </h3>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          Receba os melhores artigos e análises tecnológicas no seu e-mail semanalmente.
        </p>
        {sidebarSubscribed ? (
          <div className="bg-emerald-50 border border-emerald-200 py-2.5 px-3 text-xs text-emerald-800 font-medium rounded-xs">
            <i className="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i>
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
              className="w-full min-h-[40px] bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-400 rounded-xs"
            />
            <button
              type="submit"
              className="w-full min-h-[40px] bg-gray-900 hover:bg-black text-white font-semibold text-xs py-2 transition-colors uppercase tracking-wider cursor-pointer rounded-xs"
            >
              Subscrever
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
