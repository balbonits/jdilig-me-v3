import type { FC } from 'react';
import styles from './ProtoAvatar.module.css';

export interface ProtoAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  hasStatus?: boolean;
  className?: string;
}

export const ProtoAvatar: FC<ProtoAvatarProps> = ({
  size = 'md',
  shape = 'circle',
  hasStatus = false,
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
      {hasStatus && <span className={styles['proto-avatar__status']} />}
    </div>
  );
};
