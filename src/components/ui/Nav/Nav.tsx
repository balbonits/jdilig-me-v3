import styles from './Nav.module.css';

export interface NavItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface NavProps {
  variant?: 'tabs' | 'pills';
  items: NavItem[];
  vertical?: boolean;
  className?: string;
}

export function Nav({
  variant = 'tabs',
  items,
  vertical = false,
  className = '',
}: NavProps) {
  const navClasses = [
    styles.nav,
    styles[`nav--${variant}`],
    vertical && styles['nav--vertical'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderItem = (item: NavItem, index: number) => {
    const itemClasses = [
      styles.nav__item,
      item.active && styles['nav__item--active'],
    ]
      .filter(Boolean)
      .join(' ');

    const content = item.label;

    if (item.href) {
      return (
        <a
          key={index}
          href={item.href}
          className={itemClasses}
          onClick={item.onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={index}
        className={itemClasses}
        onClick={item.onClick}
        type="button"
      >
        {content}
      </button>
    );
  };

  return (
    <nav className={navClasses}>
      {items.map((item, index) => renderItem(item, index))}
    </nav>
  );
}
