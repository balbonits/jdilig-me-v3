import type { CSSProperties } from 'react';
import styles from './ProtoSidebar.module.css';

export interface ProtoSidebarProps {
  items?: string[];
  position?: 'left' | 'right';
  width?: string;
  className?: string;
}

export function ProtoSidebar({
  items = ['Item 1', 'Item 2', 'Item 3'],
  position = 'left',
  width,
  className = '',
}: ProtoSidebarProps) {
  const style: CSSProperties = width ? { width } : {};

  const classNames = [
    styles['proto-sidebar'],
    styles[`proto-sidebar--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={classNames} style={style}>
      {items.map((item, index) => (
        <div key={index} className={styles['proto-sidebar__item']}>
          {item}
        </div>
      ))}
    </aside>
  );
}
