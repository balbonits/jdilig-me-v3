import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoList.module.css';

export interface ProtoListProps {
  /** List items */
  children?: ReactNode;
  /** List type */
  type?: 'unordered' | 'ordered' | 'plain';
  /** List style variant */
  variant?: 'default' | 'disc' | 'decimal' | 'alpha' | 'roman' | 'none';
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

/**
 * ProtoList - List container component
 *
 * @example
 * ```tsx
 * <ProtoList type="unordered" variant="disc">
 *   <ProtoListItem>Item 1</ProtoListItem>
 *   <ProtoListItem>Item 2</ProtoListItem>
 * </ProtoList>
 * ```
 */
export function ProtoList({
  children,
  type = 'unordered',
  variant = 'default',
  gap = 'md',
  className,
}: ProtoListProps) {
  const Tag = type === 'ordered' ? 'ol' : 'ul';

  return (
    <Tag
      className={cn(
        styles['proto-list'],
        styles[`proto-list--${type}`],
        styles[`proto-list--${variant}`],
        styles[`proto-list--gap-${gap}`],
        className
      )}
    >
      {children}
    </Tag>
  );
}
