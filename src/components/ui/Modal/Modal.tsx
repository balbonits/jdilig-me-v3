import type { ReactNode } from 'react';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  footer,
  children,
  size = 'md',
  className = '',
}: ModalProps) => {
  // ESC key listener
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  // Handle backdrop click (close when clicking outside)
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal__overlay} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${styles[`modal--${size}`]} ${className}`}>
        {/* Header */}
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <button
            type="button"
            className={styles.modal__close}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              className={styles.modal__close_icon}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={styles.modal__body}>{children}</div>

        {/* Footer (optional) */}
        {footer && <div className={styles.modal__footer}>{footer}</div>}
      </div>
    </div>
  );
};
