import type { ReactNode } from 'react';
import styles from './Section.module.css';

export interface SectionProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  className?: string;
}

export function Section({
  title,
  subtitle,
  children,
  variant = 'default',
  spacing = 'md',
  containerWidth = 'lg',
  centered = false,
  className = '',
}: SectionProps) {
  const sectionClasses = [
    styles.section,
    styles[`section--${variant}`],
    styles[`section--spacing-${spacing}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    styles.section__container,
    styles[`section__container--${containerWidth}`],
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = [
    styles.section__header,
    centered ? styles['section__header--centered'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className={headerClasses}>
            {title && (
              <h2 className={styles.section__title}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={styles.section__subtitle}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={styles.section__content}>
          {children}
        </div>
      </div>
    </section>
  );
}
