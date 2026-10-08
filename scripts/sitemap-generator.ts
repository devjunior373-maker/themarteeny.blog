import fs from 'fs';
import path from 'path';

export const BASE_URL = 'https://themarteeny.pages.dev';

/**
 * Escapa caracteres reservados para garantir XML estritamente válido.
 */
export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Normaliza strings para slugs limpos e amigáveis (idêntico à função em src/data/articles.data.ts).
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Converte data em texto (ex: "30 de julho de 2020") para formato W3C YYYY-MM-DD se for determinística.
 * Se for relativa (ex: "há 12m", "há 1h") ou não parseável, retorna undefined (omitindo lastmod sem inventar).
 */
export function parsePublishDateToW3C(dateStr: string): string | undefined {
  if (!dateStr || typeof dateStr !== 'string') return undefined;

  const normalized = dateStr.trim().toLowerCase();

  // Ignorar datas relativas como "há 12m", "há 1h", "há 3h" para não inventar lastmod fixo/falso
  if (normalized.startsWith('ha') || normalized.startsWith('há')) {
    return undefined;
  }

  const months: Record<string, string> = {
    janeiro: '01',
    fevereiro: '02',
    marco: '03',
    março: '03',
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

  const match = normalized.match(/^(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})$/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = months[match[2]];
    const year = match[3];
    if (month && year) {
      return `${year}-${month}-${day}`;
    }
  }

  return undefined;
}

export interface ParsedArticleRecord {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
}

/**
 * Extrai os artigos reais do arquivo src/data/articles.data.ts de maneira autônoma e segura,
 * sem exigir dependências que falham fora do ambiente bundler (como importação de imagens .png).
 */
export function extractArticlesFromSource(): ParsedArticleRecord[] {
  const filePath = path.resolve(process.cwd(), 'src/data/articles.data.ts');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const articles: ParsedArticleRecord[] = [];

  // Encontrar blocos { id: '...', title: '...', category: '...', author: '...', date: '...' }
  const articleBlockRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]([^'"]+)['"][\s\S]*?author:\s*['"]([^'"]+)['"][\s\S]*?date:\s*['"]([^'"]+)['"]/g;

  let match: RegExpExecArray | null;
  while ((match = articleBlockRegex.exec(fileContent)) !== null) {
    articles.push({
      id: match[1],
      title: match[2],
      category: match[3],
      author: match[4],
      date: match[5],
    });
  }

  return articles;
}

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

/**
 * Gera o conteúdo XML completo e válido do sitemap.
 */
export function generateSitemapXml(): string {
  const articles = extractArticlesFromSource();
  const entries: SitemapEntry[] = [];
  const visited = new Set<string>();

  const addUrl = (relativePath: string, lastmod?: string) => {
    const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    const fullUrl = `${BASE_URL}${normalized === '/' ? '/' : normalized.replace(/\/+$/, '')}`;
    if (!visited.has(fullUrl)) {
      visited.add(fullUrl);
      entries.push({ loc: fullUrl, lastmod });
    }
  };

  // 1. Home
  addUrl('/');

  // 2. Artigos publicados e válidos (/blog/:slug)
  for (const article of articles) {
    if (article.id && article.title) {
      const slug = slugify(article.id);
      const lastmod = parsePublishDateToW3C(article.date);
      addUrl(`/blog/${slug}`, lastmod);
    }
  }

  // 3. Categorias públicas reais mapeadas e com conteúdo
  const categories = [
    'startups',
    'noticias',
    'eventos',
    'artigos',
    'mundo',
    'desenvolvimento-web',
    'inteligencia-artificial',
    'hardware-macbooks',
    'games-emuladores',
    'seguranca-cloud',
  ];
  for (const cat of categories) {
    addUrl(`/categoria/${cat}`);
  }

  // 4. Autores reais encontrados nos dados
  const authors = new Set<string>();
  for (const article of articles) {
    if (article.author && article.author.trim()) {
      authors.add(slugify(article.author));
    }
  }
  for (const authorSlug of Array.from(authors).sort()) {
    addUrl(`/autor/${authorSlug}`);
  }

  // Montagem da árvore XML com conformidade com schema 0.9
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const item of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(item.loc)}</loc>`);
    if (item.lastmod) {
      lines.push(`    <lastmod>${escapeXml(item.lastmod)}</lastmod>`);
    }
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

export function writeSitemapToDisk(): void {
  const xml = generateSitemapXml();

  // Escrever em public/sitemap.xml
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.resolve(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');

  // Escrever em dist/sitemap.xml se pasta dist existir
  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.resolve(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf-8');
  }
}

// Se executado diretamente via node ou tsx
if (process.argv[1] && process.argv[1].endsWith('sitemap-generator.ts')) {
  writeSitemapToDisk();
}
