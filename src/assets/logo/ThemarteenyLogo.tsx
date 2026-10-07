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
  alt = 'Themarteeny',
}) => {
  return (
    <img
      src={logoSitePng}
      alt={alt}
      className={`object-contain transition-all duration-200 ${className}`}
      style={height ? { height } : undefined}
      loading="eager"
    />
  );
};

export default ThemarteenyLogo;

