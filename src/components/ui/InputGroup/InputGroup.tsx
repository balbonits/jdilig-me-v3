import type { ReactNode } from 'react';
import styles from './InputGroup.module.css';

export interface InputGroupProps {
  prepend?: ReactNode;
  append?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function InputGroup({
  prepend,
  append,
  children,
  size = 'md',
  className = '',
}: InputGroupProps) {
  const containerClass = [
    styles['input-group'],
    styles[`input-group--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      {prepend && (
        <div className={styles['input-group__prepend']}>{prepend}</div>
      )}
      <div className={styles['input-group__input']}>{children}</div>
      {append && <div className={styles['input-group__append']}>{append}</div>}
    </div>
  );
}
