import type { ComponentType, SVGProps } from 'react';
import styles from './WireButton.module.css';

export interface WireButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function WireButton({
  label = 'Button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
}: WireButtonProps) {
  const classNames = [
    styles['wire-button'],
    styles[`wire-button--${variant}`],
    styles[`wire-button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {Icon && iconPosition === 'left' && (
        <Icon className={styles['wire-button__icon']} />
      )}
      {label}
      {Icon && iconPosition === 'right' && (
        <Icon className={styles['wire-button__icon']} />
      )}
    </div>
  );
}
