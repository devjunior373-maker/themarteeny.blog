import { useEffect } from 'react';

export const CANONICAL_BASE_URL = 'https://themarteeny.pages.dev';

/**
 * Normaliza um caminho relativo para URL canônica absoluta sem trailing slash (exceto na raiz).
 * Garante que parâmetros de busca/query string não entrem na URL canônica.
 */
export function buildCanonicalUrl(path: string): string {
  // Limpar qualquer parâmetro ou hash acidental
  const cleanPath = path.split('?')[0].split('#')[0].trim();

  if (!cleanPath || cleanPath === '/' || cleanPath === '') {
    return `${CANONICAL_BASE_URL}/`;
  }

  // Remove barras iniciais e finais extras
  const sanitized = cleanPath.replace(/^\/+|\/+$/g, '');
  return `${CANONICAL_BASE_URL}/${sanitized}`;
}

/**
 * Atualiza, cria ou remove a tag <link rel="canonical"> no cabeçalho do documento HTML.
 * Se url for null ou undefined (ex: páginas de erro 404), remove qualquer canonical existente
 * para evitar indexar páginas inexistentes.
 */
export function setCanonicalUrl(url?: string | null) {
  if (typeof document === 'undefined') return;

  const links = document.querySelectorAll('link[rel="canonical"]');

  if (!url) {
    // Para página 404 ou páginas que não devem ter canonical
    links.forEach(link => link.remove());
    return;
  }

  const cleanUrl = url.trim();

  if (links.length > 0) {
    // Atualiza a primeira tag existente
    links[0].setAttribute('href', cleanUrl);
    // Remove tags duplicadas excedentes, se houver
    for (let i = 1; i < links.length; i++) {
      links[i].remove();
    }
  } else {
    // Cria e anexa nova tag <link rel="canonical">
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = cleanUrl;
    document.head.appendChild(link);
  }
}

/**
 * Hook React para sincronizar a tag canônica da página.
 * Suporta URL absoluta direta, caminho relativo ou undefined/null para remoção (ex: 404).
 */
export function useCanonical(canonicalUrl?: string | null) {
  useEffect(() => {
    setCanonicalUrl(canonicalUrl);
  }, [canonicalUrl]);
}
