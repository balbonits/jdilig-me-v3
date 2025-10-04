import type { CSSProperties } from 'react';
import styles from './WireSidebar.module.css';

export interface WireSidebarProps {
  items?: string[];
  position?: 'left' | 'right';
  width?: string;
  className?: string;
}

export function WireSidebar({
  items = ['Item 1', 'Item 2', 'Item 3'],
  position = 'left',
  width = '200px',
  className = '',
}: WireSidebarProps) {
  const style: CSSProperties = {
    width,
  };

  const classNames = [
    styles['wire-sidebar'],
    styles[`wire-sidebar--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={classNames} style={style}>
      {items.map((item, index) => (
        <div key={index} className={styles['wire-sidebar__item']}>
          {item}
        </div>
      ))}
    </aside>
  );
}
