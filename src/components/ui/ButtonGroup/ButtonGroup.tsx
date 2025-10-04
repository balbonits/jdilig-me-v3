import type { ReactNode } from 'react';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
}

export function ButtonGroup({
  children,
  vertical = false,
  className = '',
}: ButtonGroupProps) {
  const groupClasses = [
    styles['button-group'],
    vertical && styles['button-group--vertical'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses}>
      {children}
    </div>
  );
}
