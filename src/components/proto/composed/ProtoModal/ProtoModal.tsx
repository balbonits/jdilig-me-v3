import type { ReactNode } from 'react';
import styles from './ProtoModal.module.css';

export interface ProtoModalProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hasHeader?: boolean;
  hasFooter?: boolean;
  children?: ReactNode;
  className?: string;
}

export function ProtoModal({
  size = 'md',
  hasHeader = false,
  hasFooter = false,
  children,
  className = '',
}: ProtoModalProps) {
  return (
    <div className={styles.modal__overlay}>
      <div className={`${styles.modal} ${styles[`modal--${size}`]} ${className}`}>
        {hasHeader && (
          <div className={styles.modal__header}>
            {/* Header content placeholder */}
          </div>
        )}

        <div className={styles.modal__content}>
          {children}
        </div>

        {hasFooter && (
          <div className={styles.modal__footer}>
            {/* Footer content placeholder */}
          </div>
        )}
      </div>
    </div>
  );
}
