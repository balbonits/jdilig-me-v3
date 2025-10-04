import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  pill?: boolean;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'primary',
  pill = false,
  children,
  className = ''
}: BadgeProps) {
  const baseClass = 'badge';
  const variantClass = `badge--${variant}`;
  const pillClass = pill ? 'badge--pill' : '';

  const classNames = [
    styles[baseClass],
    styles[variantClass],
    pill && styles[pillClass],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
}
