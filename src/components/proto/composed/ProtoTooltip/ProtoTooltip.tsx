import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoTooltip.module.css';

export interface ProtoTooltipProps {
  /** Tooltip content */
  content?: string | ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Element to show tooltip on */
  children?: ReactNode;
  /** Always show tooltip (for proto purposes) */
  show?: boolean;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoTooltip - Tooltip component
 *
 * @example
 * ```tsx
 * <ProtoTooltip content="Tooltip text" position="top" show>
 *   <ProtoButton label="Hover me" />
 * </ProtoTooltip>
 * ```
 */
export function ProtoTooltip({
  content = 'Tooltip text',
  position = 'top',
  children,
  show = true,
  className,
}: ProtoTooltipProps) {
  return (
    <div className={cn(styles['proto-tooltip'], className)}>
      {children}
      {show && (
        <div
          className={cn(
            styles['proto-tooltip__bubble'],
            styles[`proto-tooltip__bubble--${position}`]
          )}
        >
          {content}
          <div className={styles['proto-tooltip__arrow']} />
        </div>
      )}
    </div>
  );
}
