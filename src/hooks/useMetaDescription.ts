import { useEffect } from 'react';

/**
 * Atualiza ou define a tag <meta name="description"> no cabeçalho do documento HTML.
 * Se a tag já existir, atualiza seu atributo `content`.
 * Se não existir, cria a tag e anexa ao <head>.
 * Remove eventuais tags duplicadas de meta description para manter o HTML sem redundâncias.
 */
export function setMetaDescription(description: string) {
  if (typeof document === 'undefined') return;

  const trimmed = description.trim();
  const metas = document.querySelectorAll('meta[name="description"]');

  if (metas.length > 0) {
    // Atualiza a primeira tag encontrada
    metas[0].setAttribute('content', trimmed);
    // Remove tags duplicadas excedentes, se existirem
    for (let i = 1; i < metas.length; i++) {
      metas[i].remove();
    }
  } else {
    // Cria nova tag no head caso não exista
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = trimmed;
    document.head.appendChild(meta);
  }
}

/**
 * Hook do React para gerenciar e sincronizar a meta description da página ativa.
 * Executa na montagem e sempre que a string de descrição mudar.
 */
export function useMetaDescription(description: string) {
  useEffect(() => {
    setMetaDescription(description);
  }, [description]);
}

/**
 * Hook integrado opcional para gerenciar simultaneamente <title> e <meta name="description">.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    setMetaDescription(description);
  }, [title, description]);
}
