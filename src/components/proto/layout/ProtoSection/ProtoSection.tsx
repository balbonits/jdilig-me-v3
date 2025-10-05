import type { ReactNode } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoSection.module.css';

export interface ProtoSectionProps {
  /** Content to display inside the section */
  children?: ReactNode;
  /** Layout variant */
  layout?: 'center' | 'left' | 'right' | 'grid' | 'flex';
  /** Vertical alignment */
  align?: 'start' | 'center' | 'end';
  /** Horizontal justification */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Gap size between elements */
  gap?: 'sm' | 'md' | 'lg';
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

export function ProtoSection({
  children,
  layout = 'flex',
  align = 'start',
  justify = 'start',
  gap = 'md',
  padding = 'md',
  className,
}: ProtoSectionProps) {
  return (
    <div
      className={cn(
        styles['proto-section'],
        styles[`proto-section--${layout}`],
        styles[`proto-section--align-${align}`],
        styles[`proto-section--justify-${justify}`],
        styles[`proto-section--gap-${gap}`],
        styles[`proto-section--padding-${padding}`],
        className
      )}
    >
      {children}
    </div>
  );
}
