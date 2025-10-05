import type { ComponentType, SVGProps } from 'react';
import styles from './ProtoIcon.module.css';

export interface ProtoIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

export function ProtoIcon({
  icon: Icon,
  size = 'md',
  label,
  className = '',
}: ProtoIconProps) {
  const classNames = [
    styles['proto-icon'],
    styles[`proto-icon--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles['proto-icon-wrapper']}>
      <Icon className={classNames} />
      {label && <span className={styles['proto-icon__label']}>{label}</span>}
    </div>
  );
}
