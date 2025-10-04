import type { ReactNode } from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
  brand?: ReactNode;
  children?: ReactNode;
  fixed?: 'top' | 'bottom';
  dark?: boolean;
  className?: string;
}

export function Navbar({
  brand,
  children,
  fixed,
  dark = false,
  className = '',
}: NavbarProps) {
  const navbarClasses = [
    styles.navbar,
    fixed && styles[`navbar--fixed-${fixed}`],
    dark && styles['navbar--dark'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={navbarClasses}>
      <div className={styles.navbar__container}>
        {brand && (
          <div className={styles.navbar__brand}>
            {brand}
          </div>
        )}
        {children && (
          <div className={styles.navbar__content}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
