import type { ReactNode, CSSProperties } from 'react';
import styles from './ProtoBox.module.css';

export interface ProtoBoxProps {
  width?: string;
  height?: string;
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  children?: ReactNode;
  className?: string;
}

export function ProtoBox({
  width = '100%',
  height = '200px',
  label,
  variant = 'dashed',
  children,
  className = '',
}: ProtoBoxProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  const classNames = [
    styles['proto-box'],
    styles[`proto-box--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {label && <span className={styles['proto-box__label']}>{label}</span>}
      {children}
    </div>
  );
}
