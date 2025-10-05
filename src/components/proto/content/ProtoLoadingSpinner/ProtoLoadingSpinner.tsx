import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoLoadingSpinner.module.css';

export interface ProtoLoadingSpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner variant */
  variant?: 'spin' | 'pulse' | 'bounce' | 'dots';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoLoadingSpinner - Loading state indicator with animations
 *
 * @example
 * ```tsx
 * <ProtoLoadingSpinner variant="spin" size="md" />
 * <ProtoLoadingSpinner variant="dots" size="lg" />
 * ```
 */
export function ProtoLoadingSpinner({
  size = 'md',
  variant = 'spin',
  className,
}: ProtoLoadingSpinnerProps) {
  if (variant === 'dots') {
    return (
      <div className={cn(styles['proto-loading'], styles[`proto-loading--${size}`], className)}>
        <div className={cn(styles['proto-loading__dots'])}>
          <div className={styles['proto-loading__dot']} />
          <div className={styles['proto-loading__dot']} />
          <div className={styles['proto-loading__dot']} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles['proto-loading'],
        styles[`proto-loading--${size}`],
        styles[`proto-loading--${variant}`],
        className
      )}
    >
      <div className={styles['proto-loading__spinner']} />
    </div>
  );
}
