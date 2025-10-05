import type { ReactNode, CSSProperties } from 'react';
import { cn, type ClassNameProp } from '@src/utils';
import styles from './ProtoBox.module.css';

export interface ProtoBoxProps {
  width?: string;
  height?: string;
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  children?: ReactNode;
  /** CSS classes - accepts string or array of strings */
  className?: ClassNameProp;
}

export function ProtoBox({
  width = '100%',
  height = '200px',
  label,
  variant = 'dashed',
  children,
  className,
}: ProtoBoxProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  return (
    <div
      className={cn(
        styles['proto-box'],
        styles[`proto-box--${variant}`],
        className
      )}
      style={style}
    >
      {label && <span className={styles['proto-box__label']}>{label}</span>}
      {children}
    </div>
  );
}
