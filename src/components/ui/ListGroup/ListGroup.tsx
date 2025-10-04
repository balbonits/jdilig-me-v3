import type { ReactNode } from 'react';
import styles from './ListGroup.module.css';

export interface ListGroupItem {
  label: string | ReactNode;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  badge?: string | ReactNode;
}

export interface ListGroupProps {
  items: ListGroupItem[];
  flush?: boolean;
  className?: string;
}

export function ListGroup({ items, flush = false, className = '' }: ListGroupProps) {
  const listGroupClass = [
    styles['list-group'],
    flush ? styles['list-group--flush'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderItem = (item: ListGroupItem, index: number) => {
    const itemClass = [
      styles['list-group__item'],
      item.active ? styles['list-group__item--active'] : '',
      item.disabled ? styles['list-group__item--disabled'] : '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        <span className={styles['list-group__label']}>{item.label}</span>
        {item.badge && (
          <span className={styles['list-group__badge']}>{item.badge}</span>
        )}
      </>
    );

    // Render as link if href is provided
    if (item.href && !item.disabled) {
      return (
        <a
          key={index}
          href={item.href}
          className={itemClass}
          aria-current={item.active ? 'true' : undefined}
        >
          {content}
        </a>
      );
    }

    // Render as button if onClick is provided
    if (item.onClick && !item.disabled) {
      return (
        <button
          key={index}
          type="button"
          onClick={item.onClick}
          className={itemClass}
          aria-current={item.active ? 'true' : undefined}
        >
          {content}
        </button>
      );
    }

    // Render as div for static items or disabled items
    return (
      <div
        key={index}
        className={itemClass}
        aria-current={item.active ? 'true' : undefined}
        aria-disabled={item.disabled ? 'true' : undefined}
      >
        {content}
      </div>
    );
  };

  return (
    <div className={listGroupClass} role="list">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}
