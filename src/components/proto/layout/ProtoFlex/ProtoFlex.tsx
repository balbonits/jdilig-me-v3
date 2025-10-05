import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoFlex.module.css';

export interface ProtoFlexProps {
  /** Flex children */
  children?: ReactNode;
  /** Flex direction */
  direction?: 'row' | 'col';
  /** Align items */
  align?: 'start' | 'center' | 'end';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Flex wrap */
  wrap?: boolean;
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  /** Flex shrink (prevent shrinking) */
  shrink?: boolean;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoFlex - Flexbox layout component for prototypes
 *
 * @example
 * ```tsx
 * <ProtoFlex direction="row" gap="md" wrap>
 *   <ProtoBadge />
 *   <ProtoBadge />
 * </ProtoFlex>
 * ```
 */
export function ProtoFlex({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md',
  shrink = true,
  className,
}: ProtoFlexProps) {
  return (
    <div
      className={cn(
        styles['proto-flex'],
        styles[`proto-flex--${direction}`],
        styles[`proto-flex--align-${align}`],
        styles[`proto-flex--justify-${justify}`],
        wrap && styles['proto-flex--wrap'],
        !shrink && styles['proto-flex--no-shrink'],
        styles[`proto-flex--gap-${gap}`],
        className
      )}
    >
      {children}
    </div>
  );
}
