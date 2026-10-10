import React, { useEffect, useRef } from 'react';

export interface AdcashBannerProps {
  /**
   * Identificador oficial da zona Adcash Display.
   * Se omitido, o espaço permanece preparado e reservado de forma limpa,
   * sem inventar IDs ou executar requisições desnecessárias.
   */
  zoneId?: string;
  /**
   * Nome do espaço publicitário para identificação técnica e semântica.
   */
  slotName: string;
  /**
   * Classes adicionais de espaçamento ou largura.
   */
  className?: string;
  /**
   * Altura mínima para evitar Cumulative Layout Shift (CLS) e manter responsividade.
   */
  minHeight?: string;
}

/**
 * Componente modular para exibição e reserva controlada de anúncios Display do Adcash.
 * - Integração isolada compatível com o ciclo de vida do React.
 * - Evita reexecuções e banners duplicados durante a navegação em rotas SPA.
 * - Suporta layout responsivo sem overflow horizontal em dispositivos móveis.
 */
export const AdcashBanner: React.FC<AdcashBannerProps> = ({
  zoneId,
  slotName,
  className = '',
  minHeight = 'min-h-[60px] xs:min-h-[75px] sm:min-h-[90px] md:min-h-[100px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Se nenhuma zona configurada para este espaço, apenas mantém a reserva visual
    if (!zoneId || !containerRef.current) {
      return;
    }

    const currentContainer = containerRef.current;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let retryCount = 0;
    const maxRetries = 20; // 20 tentativas * 150ms = 3 segundos de janela de espera para o script global

    const injectBanner = () => {
      if (!isMountedRef.current || !currentContainer) return;

      const globalAclib = (window as unknown as { aclib?: { runBanner?: (opts: { zoneId: string }) => void } }).aclib;

      if (globalAclib && typeof globalAclib.runBanner === 'function') {
        // Limpar qualquer conteúdo residual antes de injetar
        currentContainer.innerHTML = '';

        // Cria o script exatamente com a sintaxe oficial fornecida pelo Adcash
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `
          try {
            if (typeof aclib !== 'undefined' && typeof aclib.runBanner === 'function') {
              aclib.runBanner({ zoneId: '${zoneId}' });
            }
          } catch (e) {
            console.warn('[Adcash Display] Falha ao executar runBanner para zona ${zoneId}:', e);
          }
        `;

        currentContainer.appendChild(script);
      } else if (retryCount < maxRetries) {
        retryCount += 1;
        retryTimer = setTimeout(injectBanner, 150);
      }
    };

    injectBanner();

    return () => {
      isMountedRef.current = false;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [zoneId]);

  return (
    <div
      className={`w-full max-w-full flex flex-col items-center justify-center my-4 sm:my-6 overflow-hidden ${className}`}
      aria-label={`Espaço publicitário: ${slotName}`}
    >
      {/* Rótulo discreto conforme a regra 9 */}
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-1 select-none">
        Publicidade
      </span>

      {/* Caixa delimitadora de publicidade com garantia de contenção e responsividade */}
      <div
        ref={containerRef}
        id={`adcash-slot-${zoneId || 'reserved'}-${slotName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        className={`w-full max-w-4xl ${minHeight} bg-white border border-gray-200 flex items-center justify-center overflow-hidden transition-colors`}
      >
        {!zoneId && (
          <div className="p-3 text-center text-gray-400 select-none">
            <span className="text-[11px] font-medium tracking-wide">
              {slotName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdcashBanner;
