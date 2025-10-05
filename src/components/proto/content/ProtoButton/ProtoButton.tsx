import type { ComponentType, SVGProps } from 'react';
import styles from './ProtoButton.module.css';

export interface ProtoButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function ProtoButton({
  label = 'Button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
}: ProtoButtonProps) {
  const classNames = [
    styles['proto-button'],
    styles[`proto-button--${variant}`],
    styles[`proto-button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {Icon && iconPosition === 'left' && (
        <Icon className={styles['proto-button__icon']} />
      )}
      {label}
      {Icon && iconPosition === 'right' && (
        <Icon className={styles['proto-button__icon']} />
      )}
    </div>
  );
}
