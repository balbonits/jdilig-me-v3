import styles from './ProtoBadge.module.css';

export interface ProtoBadgeProps {
  text?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProtoBadge({
  text = 'Badge',
  variant = 'default',
  size = 'md',
  className = '',
}: ProtoBadgeProps) {
  const badgeClasses = [
    styles['proto-badge'],
    styles[`proto-badge--${variant}`],
    styles[`proto-badge--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses}>
      {text}
    </span>
  );
}
