import type { ReactNode } from 'react';

interface HeroTemplateProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
  backgroundImage?: string;
  children?: ReactNode;
}

export function HeroTemplate({
  title,
  subtitle,
  ctaText,
  ctaAction,
  backgroundImage,
  children
}: HeroTemplateProps) {
  return (
    <div className="relative">
      <div
        className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined};
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              {subtitle}
            </p>
          )}
          {ctaText && ctaAction && (
            <button
              onClick={ctaAction}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              {ctaText}
            </button>
          )}
        </div>
        {backgroundImage && (
          <div className="absolute inset-0 bg-black opacity-40"></div>
        )}
      </div>
      {children && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      )}
    </div>
  );
}