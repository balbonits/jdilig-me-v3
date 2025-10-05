import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoInput.module.css';

export interface ProtoInputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'file' | 'color' | 'range' | 'checkbox' | 'textarea';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Show as disabled */
  disabled?: boolean;
  /** Show with error state */
  error?: boolean;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoInput - Form input placeholder covering all input types
 *
 * @example
 * ```tsx
 * <ProtoInput type="text" label="Username" placeholder="Enter username" />
 * <ProtoInput type="email" size="lg" />
 * <ProtoInput type="textarea" label="Message" />
 * ```
 */
export function ProtoInput({
  type = 'text',
  size = 'md',
  placeholder,
  label,
  disabled = false,
  error = false,
  className,
}: ProtoInputProps) {
  const isTextarea = type === 'textarea';
  const isCheckbox = type === 'checkbox';
  const isFile = type === 'file';
  const isColor = type === 'color';
  const isRange = type === 'range';

  return (
    <div className={cn(styles['proto-input-wrapper'], className)}>
      {label && !isCheckbox && (
        <label className={styles['proto-input__label']}>
          {label}
        </label>
      )}

      <div
        className={cn(
          styles['proto-input'],
          styles[`proto-input--${size}`],
          styles[`proto-input--${type}`],
          disabled && styles['proto-input--disabled'],
          error && styles['proto-input--error'],
          isTextarea && styles['proto-input--textarea'],
          isCheckbox && styles['proto-input--checkbox'],
          isFile && styles['proto-input--file'],
          isColor && styles['proto-input--color'],
          isRange && styles['proto-input--range']
        )}
      >
        {placeholder && !isCheckbox && !isColor && !isRange && (
          <span className={styles['proto-input__placeholder']}>
            {placeholder}
          </span>
        )}
        {isCheckbox && (
          <label className={styles['proto-input__checkbox-label']}>
            <div className={styles['proto-input__checkbox-box']} />
            {label && <span>{label}</span>}
          </label>
        )}
        {isFile && !placeholder && (
          <span className={styles['proto-input__placeholder']}>
            Choose file...
          </span>
        )}
        {isColor && (
          <div className={styles['proto-input__color-swatch']} />
        )}
        {isRange && (
          <div className={styles['proto-input__range-track']}>
            <div className={styles['proto-input__range-thumb']} />
          </div>
        )}
      </div>
    </div>
  );
}
