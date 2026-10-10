import logoSitePng from '../assets/logo/logo-site.png';

/**
 * Configuração centralizada para otimização e gestão dos caminhos de ativos (assets).
 * Este arquivo padroniza os caminhos de imagens, logos e recursos visuais da aplicação.
 */

export interface LogoAssets {
  primary: string;
  mark: string;
  png: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AssetsConfig {
  logo: LogoAssets;
  placeholders: {
    hero: string;
    sub1: string;
    sub2: string;
    sub3: string;
    sub4?: string;
  };
  authors: Record<string, string>;
}

export const ASSETS_CONFIG: AssetsConfig = {
  logo: {
    primary: logoSitePng,
    png: logoSitePng,
    mark: logoSitePng,
    alt: 'Themarteeny',
    width: 500,
    height: 67,
  },
  placeholders: {
    hero: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    sub1: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    sub2: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    sub3: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80',
    sub4: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  },
  authors: {
    osvaldo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    devTech: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    backendTeam: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    equipaGames: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
};

/**
 * Função utilitária para resolver e otimizar caminhos relativos ou absolutos de ativos.
 * Adiciona suporte para URLs remotas, caminhos de CDN ou caminhos locais na pasta /public.
 */
export function resolveAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Normalização de barra inicial
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized;
}

export default ASSETS_CONFIG;

