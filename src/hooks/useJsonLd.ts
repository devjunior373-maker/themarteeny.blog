import { useEffect } from 'react';

export const BASE_URL = 'https://themarteeny.pages.dev';
export const SITE_NAME = 'The Marteeny';
export const LOGO_URL = 'https://themarteeny.pages.dev/logo.png';

/**
 * Converte datas em português como "30 de julho de 2020" para ISO 8601 (ex: "2020-07-30T08:00:00+00:00").
 * Se a data for relativa (ex: "há 12m", "há 1h") ou não puder ser confirmada/parseada com precisão,
 * retorna undefined para evitar inventar datas históricas ou usar a data atual indevidamente.
 */
export function parseDateToISO(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;

  const trimmed = dateStr.trim();
  if (!trimmed) return undefined;

  // Se já estiver em formato ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed;
  }

  // Datas relativas como "há 12m", "há 1h", "há 3h" não possuem timestamp absoluto nos dados originais
  if (trimmed.toLowerCase().startsWith('há ')) {
    return undefined;
  }

  const monthsMap: Record<string, string> = {
    janeiro: '01',
    fevereiro: '02',
    março: '03',
    marco: '03',
    abril: '04',
    maio: '05',
    junho: '06',
    julho: '07',
    agosto: '08',
    setembro: '09',
    outubro: '10',
    novembro: '11',
    dezembro: '12',
  };

  // Ex: "30 de julho de 2020"
  const match = trimmed.toLowerCase().match(/^(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = monthsMap[match[2]];
    const year = match[3];
    if (month) {
      return `${year}-${month}-${day}T08:00:00+00:00`;
    }
  }

  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  // Não inventar data se não puder ser confirmada
  return undefined;
}

/**
 * Garante que URLs de imagens e links sejam absolutas e válidas.
 * Se url for vazia ou inválida, retorna undefined.
 */
export function ensureAbsoluteUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '...' || trimmed === '/') return undefined;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const clean = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${BASE_URL}${clean}`;
}

/**
 * Injeta ou atualiza um script JSON-LD no <head> com id determinístico.
 * Se schema for null ou undefined, remove a tag correspondente.
 */
export function setJsonLd(id: string, schema: Record<string, unknown> | null | undefined) {
  if (typeof document === 'undefined') return;

  const scriptId = `json-ld-${id}`;
  const existing = document.getElementById(scriptId);

  if (!schema) {
    if (existing) {
      existing.remove();
    }
    return;
  }

  const jsonString = JSON.stringify(schema, null, 2);

  if (existing) {
    existing.textContent = jsonString;
  } else {
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = jsonString;
    document.head.appendChild(script);
  }
}

/**
 * Hook para gerenciar scripts JSON-LD por página.
 * Suporta remoção no unmount ou atualização quando as dependências mudarem.
 */
export function useJsonLd(id: string, schema: Record<string, unknown> | null | undefined) {
  useEffect(() => {
    setJsonLd(id, schema);
    return () => {
      // Limpeza limpa no unmount para não poluir páginas subsequentes
      if (typeof document !== 'undefined') {
        const el = document.getElementById(`json-ld-${id}`);
        if (el) el.remove();
      }
    };
  }, [id, JSON.stringify(schema)]);
}
