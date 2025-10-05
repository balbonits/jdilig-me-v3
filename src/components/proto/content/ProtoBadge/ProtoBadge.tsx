import styles from './ProtoBadge.module.css';

export interface ProtoBadgeProps {
  /** Text content (alias for label) */
  text?: string;
  /** Label content (alias for text) */
  label?: string;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export function ProtoBadge({
  text,
  label,
  variant = 'default',
  size = 'md',
  className = '',
}: ProtoBadgeProps) {
  const content = label || text || 'Badge';

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
      {content}
    </span>
  );
}
