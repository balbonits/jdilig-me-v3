import type { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ header, footer, children, className = '' }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {header && (
        <div className={styles.card__header}>
          {header}
        </div>
      )}
      <div className={styles.card__body}>
        {children}
      </div>
      {footer && (
        <div className={styles.card__footer}>
          {footer}
        </div>
      )}
    </div>
  );
}
