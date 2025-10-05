import type { CSSProperties, ComponentType, SVGProps } from 'react';
import { ProtoIcon } from '../ProtoIcon';
import styles from './ProtoImage.module.css';

export interface ProtoImageProps {
  /** Image width */
  width?: string;
  /** Image height */
  height?: string;
  /** Label text */
  label?: string;
  /** Heroicon component to display instead of default camera icon */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Additional CSS classes */
  className?: string;
}

export function ProtoImage({
  width = '100%',
  height = '300px',
  label,
  icon,
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
      <div className={styles['proto-image__icon']}>
        {icon ? <ProtoIcon icon={icon} size="lg" /> : '📷'}
      </div>
      {label && <span className={styles['proto-image__label']}>{label}</span>}
    </div>
  );
}
