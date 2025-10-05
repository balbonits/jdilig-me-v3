import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoRadio.module.css';

export interface ProtoRadioProps {
  /** Radio label */
  label?: string;
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
  /** Show as checked */
  checked?: boolean;
  /** Show as disabled */
  disabled?: boolean;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoRadio - Radio button placeholder
 *
 * @example
 * ```tsx
 * <ProtoRadio label="Option 1" checked />
 * <ProtoRadio label="Option 2" />
 * ```
 */
export function ProtoRadio({
  label,
  size = 'md',
  checked = false,
  disabled = false,
  className,
}: ProtoRadioProps) {
  return (
    <label
      className={cn(
        styles['proto-radio'],
        styles[`proto-radio--${size}`],
        disabled && styles['proto-radio--disabled'],
        className
      )}
    >
      <div className={styles['proto-radio__button']}>
        {checked && <div className={styles['proto-radio__dot']} />}
      </div>
      {label && <span className={styles['proto-radio__label']}>{label}</span>}
    </label>
  );
}
