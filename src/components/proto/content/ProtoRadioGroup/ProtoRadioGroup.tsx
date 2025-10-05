import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoRadioGroup.module.css';

export interface ProtoRadioGroupProps {
  /** Radio group legend/label */
  legend?: string;
  /** Radio buttons */
  children?: ReactNode;
  /** Direction */
  direction?: 'row' | 'column';
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoRadioGroup - Radio group container
 *
 * @example
 * ```tsx
 * <ProtoRadioGroup legend="Choose option" direction="column">
 *   <ProtoRadio label="Option 1" checked />
 *   <ProtoRadio label="Option 2" />
 *   <ProtoRadio label="Option 3" />
 * </ProtoRadioGroup>
 * ```
 */
export function ProtoRadioGroup({
  legend,
  children,
  direction = 'column',
  gap = 'md',
  className,
}: ProtoRadioGroupProps) {
  return (
    <fieldset className={cn(styles['proto-radio-group'], className)}>
      {legend && (
        <legend className={styles['proto-radio-group__legend']}>
          {legend}
        </legend>
      )}
      <div
        className={cn(
          styles['proto-radio-group__options'],
          styles[`proto-radio-group__options--${direction}`],
          styles[`proto-radio-group__options--gap-${gap}`]
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}
