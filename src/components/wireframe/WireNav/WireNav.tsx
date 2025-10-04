import styles from './WireNav.module.css';

export interface WireNavProps {
  items?: string[];
  position?: 'top' | 'bottom';
  className?: string;
}

export function WireNav({
  items = ['Item 1', 'Item 2', 'Item 3'],
  position = 'top',
  className = '',
}: WireNavProps) {
  const classNames = [
    styles['wire-nav'],
    styles[`wire-nav--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classNames}>
      <div className={styles['wire-nav__container']}>
        {items.map((item, index) => (
          <div key={index} className={styles['wire-nav__item']}>
            {item}
          </div>
        ))}
      </div>
    </nav>
  );
}
