import type { ComponentType, SVGProps } from 'react';
import styles from './WireIcon.module.css';

export interface WireIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

export function WireIcon({
  icon: Icon,
  size = 'md',
  label,
  className = '',
}: WireIconProps) {
  const classNames = [
    styles['wire-icon'],
    styles[`wire-icon--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles['wire-icon-wrapper']}>
      <Icon className={classNames} />
      {label && <span className={styles['wire-icon__label']}>{label}</span>}
    </div>
  );
}
