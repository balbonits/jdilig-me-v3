import type { CSSProperties } from 'react';
import styles from './WireImage.module.css';

export interface WireImageProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function WireImage({
  width = '100%',
  height = '300px',
  label,
  className = '',
}: WireImageProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  const classNames = [styles['wire-image'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <div className={styles['wire-image__icon']}>📷</div>
      {label && <span className={styles['wire-image__label']}>{label}</span>}
    </div>
  );
}
