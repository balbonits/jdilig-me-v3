import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoListItem.module.css';

export interface ProtoListItemProps {
  /** List item content */
  children?: ReactNode;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoListItem - List item component
 *
 * @example
 * ```tsx
 * <ProtoListItem>List item content</ProtoListItem>
 * ```
 */
export function ProtoListItem({
  children,
  className,
}: ProtoListItemProps) {
  return (
    <li className={cn(styles['proto-list-item'], className)}>
      {children}
    </li>
  );
}
