import { useEffect } from 'react';
import { setMetaDescription } from './useMetaDescription';

/**
 * Atualiza dinamicamente a tag <title> do documento conforme a rota e estado atual.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export { setMetaDescription, useMetaDescription, useDocumentMeta } from './useMetaDescription';
