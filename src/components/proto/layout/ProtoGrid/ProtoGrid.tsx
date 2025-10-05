import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoGrid.module.css';

export interface ProtoGridProps {
  /** Grid children */
  children?: ReactNode;
  /** Number of columns (mobile, then desktop with md:) */
  cols?: '1' | '2' | '3' | '4';
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoGrid - Grid layout component for prototypes
 *
 * @example
 * ```tsx
 * <ProtoGrid cols="3" gap="md">
 *   <ProtoCard />
 *   <ProtoCard />
 *   <ProtoCard />
 * </ProtoGrid>
 * ```
 */
export function ProtoGrid({
  children,
  cols = '1',
  gap = 'md',
  className,
}: ProtoGridProps) {
  return (
    <div
      className={cn(
        styles['proto-grid'],
        styles[`proto-grid--cols-${cols}`],
        styles[`proto-grid--gap-${gap}`],
        className
      )}
    >
      {children}
    </div>
  );
}
