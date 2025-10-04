import type { ReactNode, CSSProperties } from 'react';
import styles from './WireBox.module.css';

export interface WireBoxProps {
  width?: string;
  height?: string;
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  children?: ReactNode;
  className?: string;
}

export function WireBox({
  width = '100%',
  height = '200px',
  label,
  variant = 'dashed',
  children,
  className = '',
}: WireBoxProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  const classNames = [
    styles['wire-box'],
    styles[`wire-box--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {label && <span className={styles['wire-box__label']}>{label}</span>}
      {children}
    </div>
  );
}
