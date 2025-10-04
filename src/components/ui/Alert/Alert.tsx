import { useState } from 'react';
import type { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './Alert.module.css';

export interface AlertProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
  className?: string;
}

export function Alert({
  variant = 'primary',
  dismissible = false,
  onDismiss,
  children,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${styles.alert} ${styles[`alert--${variant}`]} ${className}`} role="alert">
      <div className={styles.alert__content}>
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          className={styles.alert__dismiss}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <XMarkIcon className={styles.alert__icon} />
        </button>
      )}
    </div>
  );
}
