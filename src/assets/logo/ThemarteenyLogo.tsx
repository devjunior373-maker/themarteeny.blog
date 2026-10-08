import React from 'react';
import logoSitePng from './logo-site.png';

interface LogoProps {
  className?: string;
  height?: number | string;
  alt?: string;
}

export const ThemarteenyLogo: React.FC<LogoProps> = ({
  className = 'h-9 sm:h-10 w-auto object-contain',
  height,
  alt = 'The Marteeny - Portal de Tecnologia, IA, Apps e Games',
}) => {
  return (
    <img
      src={logoSitePng}
      alt={alt}
      width={500}
      height={67}
      className={`object-contain transition-all duration-200 ${className}`}
      style={height ? { height } : undefined}
      loading="eager"
      decoding="async"
    />
  );
};

export default ThemarteenyLogo;

