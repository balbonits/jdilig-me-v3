import type { CSSProperties } from 'react';
import styles from './ProtoImage.module.css';

export interface ProtoImageProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function ProtoImage({
  width = '100%',
  height = '300px',
  label,
  className = '',
}: ProtoImageProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  const classNames = [styles['proto-image'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <div className={styles['proto-image__icon']}>📷</div>
      {label && <span className={styles['proto-image__label']}>{label}</span>}
    </div>
  );
}
