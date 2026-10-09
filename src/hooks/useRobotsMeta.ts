import { useEffect } from 'react';

/**
 * Hook para controlar a meta tag robots no documento HTML (ex: noindex, nofollow).
 * Se enabled for true (ou se passar diretivas personalizadas como 'noindex, nofollow'),
 * atualiza ou cria <meta name="robots" content="...">.
 * No unmount ou quando enabled for false, restaura o comportamento padrão indexável
 * (ex: 'index, follow' ou remove a tag restritiva).
 */
export function useRobotsMeta(content: string = 'noindex, nofollow', enabled: boolean = true) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!enabled) {
      const existing = document.querySelector('meta[name="robots"]');
      if (existing) {
        existing.setAttribute('content', 'index, follow');
      }
      return;
    }

    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);

    return () => {
      const el = document.querySelector('meta[name="robots"]');
      if (el) {
        el.setAttribute('content', 'index, follow');
      }
    };
  }, [content, enabled]);
}
