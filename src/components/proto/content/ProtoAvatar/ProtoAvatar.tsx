import type { FC } from 'react';
import styles from './ProtoAvatar.module.css';

export interface ProtoAvatarProps {
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shape variant */
  shape?: 'circle' | 'square';
  /** Show status indicator */
  hasStatus?: boolean;
  /** Optional label/initials to display */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

export const ProtoAvatar: FC<ProtoAvatarProps> = ({
  size = 'md',
  shape = 'circle',
  hasStatus = false,
  label,
  className = '',
}) => {
  const avatarClass = [
    styles['proto-avatar'],
    styles[`proto-avatar--${size}`],
    styles[`proto-avatar--${shape}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={avatarClass}>
      {label && <span className={styles['proto-avatar__label']}>{label}</span>}
      {hasStatus && <span className={styles['proto-avatar__status']} />}
    </div>
  );
};
