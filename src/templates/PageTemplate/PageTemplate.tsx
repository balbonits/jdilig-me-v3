import type { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: 'default' | 'centered' | 'full';
}

export function PageTemplate({
  title,
  subtitle,
  children,
  variant = 'default'
}: PageTemplateProps) {
  const containerClasses = {
    default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
    centered: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center',
    full: 'w-full'
  };

  return (
    <div className={containerClasses[variant]}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="content">
        {children}
      </div>
    </div>
  );
}