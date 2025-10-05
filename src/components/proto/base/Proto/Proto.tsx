import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './Proto.module.css';

export interface ProtoProps {
  /** Proto component children - only accepts Proto components */
  children?: ReactNode;
  /** Layout direction */
  direction?: 'column' | 'row';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * Proto - Base container for all prototype compositions
 *
 * This is the root element for prototype files. It should only contain
 * Proto* components (ProtoBox, ProtoSection, ProtoCard, etc.) - no raw HTML.
 *
 * @example
 * ```tsx
 * export function MyProto() {
 *   return (
 *     <Proto>
 *       <ProtoBox label="Header">...</ProtoBox>
 *       <ProtoBox label="Content">...</ProtoBox>
 *     </Proto>
 *   );
 * }
 * ```
 */
export function Proto({
  children,
  direction = 'column',
  className,
}: ProtoProps) {
  return (
    <div
      className={cn(
        styles.proto,
        styles[`proto--${direction}`],
        className
      )}
    >
      {children}
    </div>
  );
}
