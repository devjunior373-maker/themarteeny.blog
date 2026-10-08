import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { generateSitemapXml } from './sitemap-generator.ts';

export function sitemapPlugin(): Plugin {
  return {
    name: 'themarteeny-sitemap-generator',
    apply: 'build',
    // Antes do build iniciar, gera em public/sitemap.xml para que o Vite copie naturalmente para dist/
    buildStart() {
      const xml = generateSitemapXml();
      const publicDir = path.resolve(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const publicSitemap = path.resolve(publicDir, 'sitemap.xml');
      fs.writeFileSync(publicSitemap, xml, 'utf-8');
    },
    // Ao finalizar o bundle, garante que dist/sitemap.xml está presente e com a versão mais recente
    closeBundle() {
      const xml = generateSitemapXml();
      const distDir = path.resolve(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        const distSitemap = path.resolve(distDir, 'sitemap.xml');
        fs.writeFileSync(distSitemap, xml, 'utf-8');
      }
    },
  };
}
